import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import flatten
from peelcore import Peeler
m=json.load(open('assets/rig/alan/parts.json'))['parts']
S=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
P=cv2.GaussianBlur(flatten(S),(0,0),0.6); H,W=P.shape[:2]
pk=Peeler(P,np.zeros((H,W),np.float32),minvis=0.0,blur=0.6)
SC=[0.69,0.70,0.71]
def fit(k,cx,cy,r,flips=(0,1),S=SC):
  w,h=m[k]['rect'][2:]; best=None
  for sc in S:
    for fl in flips:
      tw,th=round(w*sc),round(h*sc)
      res=pk.score(k,sc,fl,(cx-tw//2-r,cy-th//2-r,cx-tw//2+r,cy-th//2+r))
      if res and (best is None or res['err']<best['err']): best=res
  best['id']=k
  print(k,round(best['err'],1),best['s'],best['flip'],best['px'],best['py'],'c',best['px']+best['w']//2,best['py']+best['h']//2)
  return best
out={}
# name: (part, center, radius, flips)
spec={
 'shirt':('p014',(384,357),20,(0,)),'vest':('p126',(384,444),12,(0,)),
 'neck':('p137',(384,300),30,(0,1)),'collar_r':('p154',(342,265),15,(0,)),'collar_l':('p155',(427,265),15,(0,)),
 'sleeve_upper_r':('p203',(259,388),15,(0,)),'sleeve_upper_l':('p203',(509,388),15,(1,)),
 'sleeve_inner_r':('p189',(245,326),15,(0,)),'sleeve_inner_l':('p189',(524,326),15,(1,)),
 'sleeve_lower_r':('p202',(250,515),15,(0,)),'sleeve_lower_l':('p202',(518,515),15,(1,)),
 'cuff_r':('p212',(246,554),12,(0,)),'cuff_l':('p212',(521,554),12,(1,)),
 'forearm_r':('p184',(238,612),15,(0,)),'forearm_l':('p184',(528,605),15,(1,)),
 'hand_r':('p207',(236,696),15,(0,)),'hand_l':('p207',(532,695),15,(1,)),
 'leg_r':('p180',(314,960),20,(0,1)),'leg_l':('p180',(453,965),20,(0,1)),
 'boot_r':('p206',(265,1278),12,(0,)),'boot_l':('p206',(501,1278),12,(1,)),
 'hips':('p191',(398,637),25,(0,1)),'belt':('p173',(385,610),30,(0,1)),
 'necklace_chain':('p109',(385,280),25,(0,1)),'necklace_thick':('p152',(385,285),25,(0,1)),'necklace_tag':('p144',(385,305),20,(0,1)),
 'pocket_chain_a':('p149',(410,540),25,(0,1)),'pocket_chain_b':('p146',(410,540),25,(0,1)),'pocket_chain_v':('p129',(463,562),12,(0,1)),
 'pocket_fob':('p113',(442,582),12,(0,1)),
 'band_r':('p183',(240,585),20,(0,1)),'band_r2':('p192',(240,585),20,(0,1)),'band_r3':('p198',(240,585),20,(0,1)),
 'bracelet_l':('p161',(530,632),20,(0,1)),'bracelet_l2':('p172',(530,632),20,(0,1)),'bracelet_l3':('p166',(530,632),20,(0,1)),
}
for name,(k,(cx,cy),r,fl) in spec.items():
  print(name,end=' '); out[name]=fit(k,cx,cy,r,fl)
json.dump(out,open(SP+'/body.json','w'))
