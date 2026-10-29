import json,cv2,numpy as np
R='assets/rig/alan/'
BG=np.array([255,0,255],np.float32)
def flatten(im):
  a=im[:,:,3:4]/255.0; return im[:,:,:3]*a+BG*(1-a)
def portrait(name='default',blur=1.2):
  im=cv2.imread(f'assets/expressions/alan/{name}.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
  f=flatten(im)
  return cv2.GaussianBlur(f,(0,0),blur) if blur else f
_cache={}
def part(name):
  if name not in _cache: _cache[name]=cv2.imread(R+'parts/'+name+'.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
  return _cache[name]
def scaled(name,s,flip=0,blur=1.2):
  p=part(name)
  if flip: p=cv2.flip(p,1)
  h,w=p.shape[:2]
  q=cv2.resize(p,(max(1,round(w*s)),max(1,round(h*s))),interpolation=cv2.INTER_CUBIC if s>1 else cv2.INTER_AREA)
  q=np.clip(q,0,255)
  return q
def match(img,name,s,flip=0,region=None,thr=0.6):
  q=scaled(name,s,flip)
  a=q[:,:,3:4]/255.0
  mask=(a>thr).astype(np.float32)
  # erode mask 1px so blurred edges don't dominate
  if mask.sum()>200: mask=cv2.erode(mask[:,:,0],np.ones((3,3)))[:,:,None]
  tpl=cv2.GaussianBlur(q[:,:,:3],(0,0),1.2)
  x0=y0=0
  if region:
    x0,y0,x1,y1=region; img=img[y0:y1,x0:x1]
  if img.shape[0]<tpl.shape[0] or img.shape[1]<tpl.shape[1] or mask.sum()<4: return None
  res=cv2.matchTemplate(img,tpl,cv2.TM_SQDIFF,mask=np.repeat(mask,3,axis=2))
  res=np.nan_to_num(res,nan=1e18,posinf=1e18)
  mn,_,loc,_=cv2.minMaxLoc(res)
  return float(max(mn,0)/(mask.sum()*3))**0.5, loc[0]+x0, loc[1]+y0
