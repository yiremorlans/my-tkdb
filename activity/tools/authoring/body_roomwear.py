# Roomwear body-part fits against the registered room sprite
# (roomwear/derived/alan_room_rig.png, from register_head.py). Same method
# as body_explicit.py: each atlas part is template-matched near a hand-read
# center over a range of scales. Candidates list several parts or flips when
# the atlas has look-alikes (legs, feet, hands), and the best one wins.
# `spec` runs front to back and each fit covers the pixels it explains, so a
# part tucked under another (feet under the cuffs, sleeves under the tee) is
# scored only where it shows (peelcore's peeling, with hand-read centers).
# The sleeve is two pieces: p130, the shoulder cap over the tee's square
# shoulder, and p131, whose darker inner half tucks under the tee.
# Not fitted, because nothing of them shows at rest: p137 (sleeve opening)
# and p127 (pants back panel).
# The shared head (shared_mask.mjs → <data dir>/shared_mask.png) starts out
# covered, since it draws in front of the neck.
#   python body_roomwear.py <data dir> [name ...]
import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP); sys.path.insert(0,__file__.rsplit('/',1)[0])
import fit
fit.R='assets/rig/alan/roomwear/'
from fit import flatten
from peelcore import Peeler
m=json.load(open(fit.R+'parts.json'))['parts']
S=cv2.imread(fit.R+'derived/alan_room_rig.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
P=cv2.GaussianBlur(flatten(S),(0,0),0.6); H,W=P.shape[:2]
head=cv2.imread(SP+'/shared_mask.png',cv2.IMREAD_UNCHANGED)[...,3]/255.0
pk=Peeler(P,(head>0.5).astype(np.float32),minvis=0.15,blur=0.6)
SC=[round(0.66+0.01*i,2) for i in range(7)]
def rotated(k,deg):
  # The part rotated about its center on a grown canvas, so the center stays
  # the center; cached under its own key for fit.part().
  key=f'{k}@{deg}'
  if key not in fit._cache:
    im=fit.part(k); h,w=im.shape[:2]; d=int(np.ceil(np.hypot(w,h)))
    M=cv2.getRotationMatrix2D((w/2,h/2),-deg,1); M[:,2]+=[(d-w)/2,(d-h)/2]
    fit._cache[key]=cv2.warpAffine(im,M,(d,d),flags=cv2.INTER_CUBIC)
    m[key]={'rect':[0,0,d,d]}
  return key
def fit_one(keys,cx,cy,r,flips=(0,1),S=SC,rots=(0,)):
  best=None
  for k in keys:
    for deg in rots:
      kk=rotated(k,deg) if deg else k
      w,h=m[kk]['rect'][2:]
      for sc in S:
        for fl in flips:
          tw,th=round(w*sc),round(h*sc)
          res=pk.score(kk,sc,fl,(cx-tw//2-r,cy-th//2-r,cx-tw//2+r,cy-th//2+r))
          if res and (best is None or res['err']<best['err']): best=dict(res,id=kk,part=k,rot=deg)
  return best
HANDS=['p144','p145','p147','p153','p154','p155','p156']
# name: (candidate parts, center, radius, flips[, rotations in degrees,
# clockwise on screen, applied after the flip])
ROT=tuple(range(-14,15,2))
spec={
 'band_r':(['p134','p136','p140'],(244,563),12,(0,1)),
 'band_r2':(['p135','p138','p142'],(244,578),12,(0,1)),
 'hand_r':(HANDS,(238,705),20,(0,1)),'hand_l':(HANDS,(530,705),20,(0,1)),
 'sleeve_cap_r':(['p130'],(250,330),30,(0,1),ROT),'sleeve_cap_l':(['p130'],(518,330),30,(0,1),ROT),
 'tee':(['p101'],(384,462),30,(0,)),
 'sleeve_r':(['p131'],(250,378),25,(0,1),ROT),'sleeve_l':(['p131'],(518,378),25,(0,1),ROT),
 'forearm_r':(['p152','p146'],(246,560),25,(0,1)),'forearm_l':(['p152','p146'],(522,560),25,(0,1)),
 'upper_arm_r':(['p151'],(254,420),30,(0,1)),'upper_arm_l':(['p151'],(514,420),30,(0,1)),
 'pants_top':(['p126'],(384,725),45,(0,1)),
 'leg_r':(['p128','p129'],(310,1000),30,(0,1)),'leg_l':(['p128','p129'],(458,1000),30,(0,1)),
 'foot_r':(['p132','p150'],(268,1270),40,(0,1),(-8,-4,0,4,8)),'foot_l':(['p132'],(460,1250),40,(0,),(-8,-6,-4,-2,0,2,4,6,8)),
 'neck_line_r':(['p073','p078'],(366,262),15,(0,1)),
 'neck_line_l':(['p073','p078'],(402,262),15,(0,1)),
 'chest_skin':(['p012'],(384,280),20,(0,)),
 'collar_back':(['p079'],(384,262),12,(0,)),
 'neck':(['p006'],(380,245),20,(0,1)),
}
only=sys.argv[2:]
out=json.load(open(SP+'/body_roomwear.json')) if only else {}
for name,(keys,(cx,cy),r,fl,*rots) in spec.items():
  if only and name not in only: continue
  b=fit_one(keys,cx,cy,r,fl,rots=rots[0] if rots else (0,)); out[name]=b
  a,_=pk.template(b['id'],b['s'],b['flip'])
  reg=pk.cov[b['py']:b['py']+b['h'],b['px']:b['px']+b['w']]
  np.maximum(reg,a[:reg.shape[0],:reg.shape[1]],out=reg)
  print(f"{name:14} {b['part']} rot={b['rot']} err={b['err']:.1f} s={b['s']} flip={b['flip']} c=({b['px']+b['w']/2:.0f},{b['py']+b['h']/2:.0f}) vis={b['vis']:.2f}")
json.dump(out,open(SP+'/body_roomwear.json','w'),indent=1)
