import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import flatten
from peelcore import Peeler
S=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
P=cv2.GaussianBlur(flatten(S),(0,0),0.6); H,W=P.shape[:2]
cov=np.zeros((H,W),np.float32); yy,xx=np.mgrid[0:H,0:W]
cov[((xx-385)/95)**2+((yy-140)/105)**2<1]=1
m=json.load(open('assets/rig/alan/parts.json'))['parts']
SKIP=set('p179 p186 p194 p195 p204 p210 p211 p213 p150 p151 p107'.split())
cands={k:[0.69,0.70,0.71] for k,v in m.items() if not (v['rect'][0]<1100 and v['rect'][1]<700) and k not in SKIP}
for k in ['p137','p015','p002','p011','p097']: cands[k]=[0.69,0.70,0.71]
open(SP+'/peel_body.log','w').close()
pk=Peeler(P,cov,minvis=0.3,blur=0.6,log=SP+'/peel_body.log')
pl,rest=pk.run(cands,float(sys.argv[2]),dup=set(cands))
json.dump({'placed':pl,'unplaced':rest},open(SP+'/peel_body.json','w'))
