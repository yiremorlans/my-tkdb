import sys,json,numpy as np
SP=sys.argv[1]; R='assets/rig/alan/rig.json'
rig=json.load(open(R)); dump={d['id']:d for d in json.load(open(SP+'/dump.json'))}; ref=json.load(open(SP+'/refine.json'))
by={p['id']:p for p in rig['parts']}
def under_head(p):
  while p:
    if p['id']=='head': return True
    p=by.get(p['parent'])
  return False
import cv2
n=0
for id,r in ref.items():
  p=by[id]
  if under_head(p): continue
  d=dump[id]; img=cv2.imread(d['image'],cv2.IMREAD_UNCHANGED); h,w=img.shape[:2]
  a,b,c,dd,tx,ty=d['m']; M=np.array([[a,c,tx],[b,dd,ty],[0,0,1]])
  ctr=M@[w/2,h/2,1]
  S=np.array([[r['kx'],0,ctr[0]*(1-r['kx'])+r['dx']],[0,r['ky'],ctr[1]*(1-r['ky'])+r['dy']],[0,0,1]])
  pv=p.get('pivot',[0.5,0.5]); pi=[pv[0]*w,pv[1]*h,1]
  delta=(S@M@pi)[:2]-(M@pi)[:2]
  p['position']=[round(p['position'][0]+delta[0],2),round(p['position'][1]+delta[1],2)]
  s=p.get('scale',rig['scale']); sx,sy=(s if isinstance(s,list) else [s,s])
  sx,sy=sx*r['kx'],sy*r['ky']
  p['scale']=round(sx,4) if abs(sx-sy)<1e-4 else [round(sx,4),round(sy,4)]
  n+=1
json.dump(rig,open(R,'w'),indent=2); open(R,'a').write('\n')
print('applied to',n,'body parts')
