import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import portrait, scaled
from peelcore import Peeler
m=json.load(open('assets/rig/alan/parts.json'))['parts']
P=portrait(blur=1.0); H,W=P.shape[:2]
L=json.load(open(SP+'/head_layers.json'))['layers']
comp=np.zeros((H,W,4),np.float32)
for k,p in L:
  q=scaled(k,p['s'],p['flip']); h,w=q.shape[:2]; x,y=p['px'],p['py']
  x0,y0=max(0,x),max(0,y); x1,y1=min(W,x+w),min(H,y+h)
  if x1<=x0 or y1<=y0: continue
  src=q[y0-y:y1-y,x0-x:x1-x]; a=src[:,:,3:4]/255
  comp[y0:y1,x0:x1,:3]=src[:,:,:3]*a+comp[y0:y1,x0:x1,:3]*(1-a)
  comp[y0:y1,x0:x1,3:4]=np.maximum(comp[y0:y1,x0:x1,3:4],a)
good=(comp[:,:,3]>0.9)&(np.abs(cv2.GaussianBlur(comp[:,:,:3],(0,0),1.0)-P).max(axis=2)<40)
cov=good.astype(np.float32)
used={k for k,_ in L}
def is_face(k): x,y=m[k]['rect'][:2]; return x<340 and y<300
cands={k:[2.05,2.09,2.13] for k,v in m.items() if v['rect'][0]<1100 and v['rect'][1]<700 and not is_face(k) and k not in used}
cands['p104']=[1.45,1.55,1.65,2.0,2.09]; cands['p096']=[1.45,1.55,1.65,2.0,2.09]
open(SP+'/peel_hair2.log','w').close()
pl,rest=Peeler(P,cov,minvis=0.3,log=SP+'/peel_hair2.log').run(cands,40)
json.dump({'placed':pl,'unplaced':rest},open(SP+'/peel_hair2.json','w'))
print(len(pl),'placed;',len(rest),'left:',sorted(rest))
