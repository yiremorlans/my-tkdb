import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import portrait, scaled
from peelcore import Peeler
m=json.load(open('assets/rig/alan/parts.json'))['parts']
P=portrait(blur=1.0); H,W=P.shape[:2]
L=json.load(open(SP+'/head_layers.json'))['layers']
h2=json.load(open(SP+'/peel_hair2.json'))['placed']
keep2={'p127','p005','p119','p114','p100','p009','p116','p147'}
L=L+[[p['id'],p] for p in h2 if p['id'] in keep2]+[[p['id'],p] for p in json.load(open(SP+'/hair3.json'))['placed']]
comp=np.zeros((H,W,4),np.float32)
for k,p in L:
  q=scaled(k,p['s'],p['flip']); h,w=q.shape[:2]; x,y=p['px'],p['py']
  x0,y0=max(0,x),max(0,y); x1,y1=min(W,x+w),min(H,y+h)
  if x1<=x0 or y1<=y0: continue
  src=q[y0-y:y1-y,x0-x:x1-x]; a=src[:,:,3:4]/255
  comp[y0:y1,x0:x1,:3]=src[:,:,:3]*a+comp[y0:y1,x0:x1,:3]*(1-a)
  comp[y0:y1,x0:x1,3:4]=np.maximum(comp[y0:y1,x0:x1,3:4],a)
explained=(comp[:,:,3]>0.9)&(np.abs(cv2.GaussianBlur(comp[:,:,:3],(0,0),1.0)-P).max(axis=2)<40)
# only hair-dark pixels are worth explaining; skin and background count as covered
lum=P.mean(axis=2); hairish=(lum<75)
cov=(explained|~hairish).astype(np.float32)
pk=Peeler(P,cov,minvis=0.25,log=SP+'/hair4.log')
open(SP+'/hair4.log','w').close()
cands={k:[1.95,2.05,2.15] for k in 'p051 p069 p073 p078 p095 p096 p104 p108 p130 p132 p134'.split() if k in m and k not in {kk for kk,_ in L}}
pl,rest=pk.run(cands,60)
json.dump({'placed':pl},open(SP+'/hair4.json','w'))
for p in pl: print(p['id'],round(p['err'],1),p['s'],p['flip'],p['px'],p['py'],round(p['vis'],2))
print('left',sorted(rest))
