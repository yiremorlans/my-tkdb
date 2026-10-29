# Shared front-to-back peeling fit. Target P (HxWx3 float), candidates with
# scale lists; returns placements in front-to-back order.
import sys,json,time,cv2,numpy as np
from fit import scaled
def corr(img,t): return cv2.matchTemplate(img,t,cv2.TM_CCORR)
class Peeler:
  def __init__(s,P,covered,minvis=0.35,blur=1.0,log=None):
    s.P=P; s.H,s.W=P.shape[:2]; s.cov=covered; s.minvis=minvis; s.blur=blur; s.log=log
    s.tpl={}
  def template(s,k,sc,flip):
    key=(k,sc,flip)
    if key not in s.tpl:
      q=scaled(k,sc,flip); a=(q[:,:,3]/255.0>0.5).astype(np.float32)
      T=cv2.GaussianBlur(q[:,:,:3],(0,0),s.blur) if s.blur else q[:,:,:3]
      s.tpl[key]=(a,T)
    return s.tpl[key]
  def score(s,k,sc,flip,win=None):
    a,T=s.template(k,sc,flip); th,tw=a.shape
    if a.sum()<6 or th>=s.H or tw>=s.W: return None
    x0,y0,x1,y1=0,0,s.W,s.H
    if win:
      x0=max(0,win[0]); y0=max(0,win[1]); x1=min(s.W,win[2]+tw); y1=min(s.H,win[3]+th)
      if x1-x0<tw or y1-y0<th: return None
    P=s.P[y0:y1,x0:x1]; w=(1-s.cov[y0:y1,x0:x1]).astype(np.float32)
    cnt=corr(w,a); num=np.zeros_like(cnt)
    for c in range(3):
      I=P[:,:,c]; t=T[:,:,c]
      num+=corr(w,a*t*t)-2*corr(w*I,a*t)+corr(w*I*I,a)
    vis=cnt/a.sum()
    err=np.where(vis>=s.minvis,np.sqrt(np.maximum(num,0)/np.maximum(cnt*3,1)),1e9)
    mn,_,loc,_=cv2.minMaxLoc(err)
    return dict(err=float(mn),px=int(loc[0]+x0),py=int(loc[1]+y0),s=sc,flip=flip,w=tw,h=th,vis=float(vis[loc[1],loc[0]]))
  def best(s,k,scales,flips=(0,1),near=None,R=24):
    best=None
    for flip in flips:
      for sc in scales:
        win=None
        if near: win=(near['px']-R,near['py']-R,near['px']+R,near['py']+R)
        r=s.score(k,sc,flip,win)
        if r and (best is None or r['err']<best['err']): best=r
    return best
  def run(s,cands,thr,dup=()):
    t=time.time()
    cache={(k,0):s.best(k,sc) for k,sc in cands.items()}
    s.say(f'init {time.time()-t:.0f}s')
    placed=[]
    while cache:
      key=min(cache,key=lambda k:cache[k]['err'] if cache[k] else 1e9)
      b=cache.pop(key)
      if not b or b['err']>thr: break
      k,inst=key
      placed.append(dict(b,id=k,inst=inst))
      a,_=s.template(k,b['s'],b['flip'])
      x0,y0=b['px'],b['py']; reg=s.cov[y0:y0+b['h'],x0:x0+b['w']]
      np.maximum(reg,a[:reg.shape[0],:reg.shape[1]],out=reg)
      if inst==0 and k in dup: cache[(k,1)]=s.best(k,cands[k],flips=(1-b['flip'],))
      for j,c in list(cache.items()):
        if c and not (c['px']>x0+b['w'] or c['px']+c['w']<x0 or c['py']>y0+b['h'] or c['py']+c['h']<y0):
          cache[j]=s.best(j[0],cands[j[0]],flips=(c['flip'],) if j[1] else (0,1),near=c)
      s.say(f"{len(placed)} {k} {inst} err={b['err']:.1f} s={b['s']} f={b['flip']} @{b['px']},{b['py']} vis={b['vis']:.2f}")
    s.say(f'done {time.time()-t:.0f}s {len(placed)} placed')
    return placed,{k[0]:v for k,v in cache.items()}
  def say(s,msg):
    if s.log:
      with open(s.log,'a') as f: f.write(msg+'\n')
