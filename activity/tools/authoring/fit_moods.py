# Places atlas mood parts against the portrait that shows them, scoring only
# pixels that differ from default.png.
import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import portrait
from peelcore import Peeler
D=portrait('default',blur=0)
FACE=[1.35,1.4,1.45,1.5,1.55,1.6,1.65]
jobs={'close':['p066','p064','p063','p023','p043','p044','p071','p082','p091','p034','p028','p046','p041'],
      'blush':['p150','p151'],'sweat':['p107'],'full_smile':['p091','p066','p064','p063','p023','p071','p082']}
out={}
for mood,parts in jobs.items():
  E=portrait(mood,blur=0)
  ch=(np.abs(E-D).max(axis=2)>20).astype(np.uint8)
  ch=cv2.dilate(ch,np.ones((5,5),np.uint8))
  cov=(1-ch).astype(np.float32)
  pk=Peeler(cv2.GaussianBlur(E,(0,0),1.0),cov,minvis=0.5)
  pl,_=pk.run({k:FACE for k in parts},40)
  out[mood]=pl
  for p in pl: print(mood,p['id'],round(p['err'],1),p['s'],p['flip'],p['px'],p['py'],round(p['vis'],2))
json.dump(out,open(SP+'/moods.json','w'))
