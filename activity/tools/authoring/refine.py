# Sub-pixel refinement of every visible rig part against the reference sprite,
# layered exactly as drawn. Writes per-part deltas (ref px) and scale factors.
import sys,json,time,cv2,numpy as np
SP=sys.argv[1]
F=2
ref=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)/255
ref=cv2.resize(ref,None,fx=F,fy=F,interpolation=cv2.INTER_CUBIC).clip(0,1)
T=np.concatenate([ref[...,:3]*ref[...,3:4],ref[...,3:4]],-1)  # premultiplied
H,W=T.shape[:2]
parts=json.load(open(SP+'/dump.json'))
for p in parts:
  im=cv2.imread(p['image'],cv2.IMREAD_UNCHANGED).astype(np.float32)/255
  p['img']=np.concatenate([im[...,:3]*im[...,3:4],im[...,3:4]],-1)
  a,b,c,d,tx,ty=p['m']; p['M']=np.array([[a,c,tx],[b,d,ty]],np.float64)
  p['dx']=p['dy']=0.0; p['kx']=p['ky']=1.0
FIXED=lambda p: p['id'].startswith(('hair_','skin_'))
def cur(p):
  h,w=p['img'].shape[:2]
  M=p['M'].copy(); c=M@np.array([w/2,h/2,1])
  S=np.array([[p['kx'],0,c[0]*(1-p['kx'])+p['dx']],[0,p['ky'],c[1]*(1-p['ky'])+p['dy']]])
  return np.vstack([S,[0,0,1]])@np.vstack([M,[0,0,1]])
def bbox(M,img,pad=0):
  h,w=img.shape[:2]; pts=M[:2]@np.array([[0,w,0,w],[0,0,h,h],[1,1,1,1]])
  x0,y0=np.floor(pts.min(1)*F).astype(int)-pad; x1,y1=np.ceil(pts.max(1)*F).astype(int)+pad
  return max(0,x0),max(0,y0),min(W,x1),min(H,y1)
def warp(p,M,roi):
  x0,y0,x1,y1=roi
  A=(np.diag([F,F,1])@M)[:2]; A[:,2]-=[x0,y0]
  return cv2.warpAffine(p['img'],A,(x1-x0,y1-y0),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
def over(top,bot): return top+bot*(1-top[...,3:4])
def composite(layers,roi):
  x0,y0,x1,y1=roi; acc=np.zeros((y1-y0,x1-x0,4),np.float32)
  for q in layers:
    bx=bbox(cur(q),q['img'])
    if bx[2]<=x0 or bx[0]>=x1 or bx[3]<=y0 or bx[1]>=y1: continue
    acc=over(warp(q,cur(q),roi),acc)
  return acc
def err(p,below,above,roi):
  x0,y0,x1,y1=roi
  C=over(above,over(warp(p,cur(p),roi),below))
  return float(((C-T[y0:y1,x0:x1])**2).sum())
t0=time.time(); total0=None
for passno in range(2):
  for i,p in enumerate(parts):
    if FIXED(p): continue
    roi=bbox(cur(p),p['img'],pad=10*F)
    if roi[2]-roi[0]<4 or roi[3]-roi[1]<4: continue
    below=composite(parts[:i],roi); above=composite(parts[i+1:],roi)
    base=err(p,below,above,roi); best=(base,p['dx'],p['dy'],p['kx'],p['ky'])
    def trial(dx,dy,kx,ky):
      global best
      p['dx'],p['dy'],p['kx'],p['ky']=dx,dy,kx,ky
      e=err(p,below,above,roi)
      if e<best[0]-1e-6: best=(e,dx,dy,kx,ky)
    _,bdx,bdy,bkx,bky=best
    for dx in np.arange(-3,3.01,0.5):
      for dy in np.arange(-3,3.01,0.5): trial(bdx+dx if passno else dx,bdy+dy if passno else dy,bkx,bky)
    _,bdx,bdy,bkx,bky=best
    for kx in (0.96,0.98,1.0,1.02,1.04):
      for ky in (0.96,0.98,1.0,1.02,1.04): trial(bdx,bdy,bkx*kx if passno else kx,bky*ky if passno else ky)
    _,bdx,bdy,bkx,bky=best
    for dx in np.arange(-0.5,0.51,0.25):
      for dy in np.arange(-0.5,0.51,0.25): trial(bdx+dx,bdy+dy,bkx,bky)
    e,p['dx'],p['dy'],p['kx'],p['ky']=best
    if passno==1 or abs(p['dx'])+abs(p['dy'])>0.01 or p['kx']!=1 or p['ky']!=1:
      pass
  print('pass',passno,'done',round(time.time()-t0),'s',flush=True)
out={p['id']:dict(dx=round(p['dx'],2),dy=round(p['dy'],2),kx=round(p['kx'],4),ky=round(p['ky'],4)) for p in parts if not FIXED(p)}
json.dump(out,open(SP+'/refine.json','w'),indent=0)
big=sorted(out.items(),key=lambda kv:-(abs(kv[1]['dx'])+abs(kv[1]['dy'])))[:15]
for k,v in big: print(k,v)
