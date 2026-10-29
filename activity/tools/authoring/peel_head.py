import sys,json,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import portrait
from peelcore import Peeler
P=portrait(blur=1.0); H,W=P.shape[:2]
m=json.load(open('assets/rig/alan/parts.json'))['parts']
EXCL={'p150','p151','p107'}
HAIR=[2.05,2.09,2.13]; FACE=[1.35,1.45,1.55,1.65]
cands={}
for k,v in m.items():
  x,y,w,h=v['rect']
  if x<1100 and y<700 and k not in EXCL:
    cands[k]=FACE if (x<340 and y<300) or k=='p117' else HAIR
open(SP+'/peel_head.log','w').close()
pl,rest=Peeler(P,np.zeros((H,W),np.float32),log=SP+'/peel_head.log').run(cands,float(sys.argv[2]))
json.dump({'placed':pl,'unplaced':rest},open(SP+'/peel_head.json','w'))
