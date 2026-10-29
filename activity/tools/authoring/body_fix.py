import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import flatten
from peelcore import Peeler
m=json.load(open('assets/rig/alan/parts.json'))['parts']
S=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
P=cv2.GaussianBlur(flatten(S),(0,0),0.6); H,W=P.shape[:2]
pk=Peeler(P,np.zeros((H,W),np.float32),minvis=0.0,blur=0.6)
body=json.load(open(SP+'/body.json'))
def fit(name,k,cx,cy,r,S,flips=(0,1)):
  w,h=m[k]['rect'][2:]; best=None
  for sc in S:
    for fl in flips:
      tw,th=round(w*sc),round(h*sc)
      res=pk.score(k,sc,fl,(cx-tw//2-r,cy-th//2-r,cx-tw//2+r,cy-th//2+r))
      if res and (best is None or res['err']<best['err']): best=res
  best['id']=k; body[name]=best
  print(name,k,round(best['err'],1),best['s'],best['flip'],best['px'],best['py'],'size',best['w'],best['h'])
LS=list(np.round(np.arange(0.90,1.10,0.02),3))
for k in ['p180','p181']:
  fit('leg_r_'+k,k,330,900,30,LS); fit('leg_l_'+k,k,440,900,30,LS)
fit('hips_p191','p191',384,640,30,LS+[0.7,0.8]); fit('hips_p164','p164',384,640,30,LS+[0.7,0.8])
NS=list(np.round(np.arange(0.70,1.06,0.04),3))
fit('neck','p137',384,270,30,NS)
json.dump(body,open(SP+'/body.json','w'))
