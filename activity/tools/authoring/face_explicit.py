import sys,json,cv2,numpy as np
SP=sys.argv[1]; sys.path.insert(0,SP)
from fit import portrait
from peelcore import Peeler
m=json.load(open('assets/rig/alan/parts.json'))['parts']
P=portrait('default',blur=1.0); H,W=P.shape[:2]
pk=Peeler(P,np.zeros((H,W),np.float32),minvis=0.0)
S=[1.4,1.45,1.5,1.55]
# part: [(cx,cy) candidates], radius ; centers in portrait px
spec={
 'p117':([(283,365)],40),'p093':([(140,360),(430,360)],35),'p094':([(140,360),(430,360)],35),
 'p048':([(268,385)],20),
 'p052':([(215,328),(355,325)],18),'p055':([(215,328),(355,325)],18),
 'p053':([(213,327),(355,324)],14),'p054':([(213,327),(355,324)],14),
 'p042':([(200,315),(345,315)],20),'p045':([(200,315),(345,315)],20),
 'p026':([(190,285),(340,290)],25),'p029':([(190,285),(340,290)],25),'p020':([(190,285),(340,290)],25),
 'p018':([(215,345),(355,343)],15),'p019':([(215,345),(355,343)],15),'p022':([(215,345),(355,343)],15),'p027':([(215,345),(355,343)],15),
 'p091':([(285,468)],15),'p085':([(285,478)],12),'p081':([(285,478)],12),
 'p031':([(213,327),(355,324)],14),'p036':([(213,327),(355,324)],14),'p060':([(213,327),(355,324)],14),
 'p104':([(285,150)],50),'p096':([(285,200)],60),
}
out={}
for k,(centers,r) in spec.items():
  w,h=m[k]['rect'][2:]
  best=None
  for (cx,cy) in centers:
    for sc in S:
      for f in (0,1):
        tw,th=round(w*sc),round(h*sc)
        res=pk.score(k,sc,f,(cx-tw//2-r,cy-th//2-r,cx-tw//2+r,cy-th//2+r))
        if res and (best is None or res['err']<best['err']): best=dict(res,center=(cx,cy))
  out[k]=best
  print(k,round(best['err'],1),best['s'],best['flip'],best['px'],best['py'],best['center'])
json.dump(out,open(SP+'/face.json','w'))
