# Sharp neck patch from pose screenshot 0 (2.26x the sprite), warped into the
# sprite frame at full screenshot resolution, colour-matched to the sprite.
import sys,glob,cv2,numpy as np
SP=sys.argv[1]
hi=cv2.imread('assets/rig/alan/poses/hires/pockets.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
M0=np.load(SP+'/s2shot_0.npy')            # sprite -> screenshot
# The hires cutout is the screenshot cropped; find the crop offset by
# matching it to the sprite warped into screenshot space (head region).
spr0=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
warped=cv2.warpAffine(spr0[...,:3],M0,(1640,2360))
face=hi[200:700, :, :3]
res=cv2.matchTemplate(warped,face,cv2.TM_SQDIFF)
_,_,(ox,oy),_=cv2.minMaxLoc(res); ox,oy=ox,oy-200
print('crop offset',ox,oy)
shot=np.zeros((2600,1800,3),np.float32)
h,w=hi.shape[:2]; shot[oy:oy+h,ox:ox+w]=hi[...,:3]
S=float(np.hypot(M0[0,0],M0[1,0]))
spr=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED).astype(np.float32)
x0,y0,x1,y1=338,192,432,254
W,H=round((x1-x0)*S),round((y1-y0)*S)
D2S=np.array([[1/S,0,x0],[0,1/S,y0],[0,0,1]])
A=(np.vstack([M0,[0,0,1]])@D2S)[:2]       # dst -> shot
patch=cv2.warpAffine(shot,A,(W,H),flags=cv2.INTER_CUBIC|cv2.WARP_INVERSE_MAP,borderMode=cv2.BORDER_REFLECT)
# skin mask in sprite space: skin and skin-shadow colours (r>g>b, warm)
box=spr[y0:y1,x0:x1]
b,g,r,a=[box[...,k] for k in range(4)]
skin=((r>g+8)&(g>b)&(r>140)&(a>250)).astype(np.uint8)
n,lab,st,_=cv2.connectedComponentsWithStats(skin,8); skin=(lab==1+np.argmax(st[1:,4])).astype(np.uint8)
m=cv2.resize(skin.astype(np.float32),(W,H),interpolation=cv2.INTER_LINEAR)
m=cv2.erode((m>0.5).astype(np.uint8),np.ones((3,3)))
alpha=cv2.GaussianBlur(m.astype(np.float32),(0,0),1.6)
alpha=np.minimum(alpha*1.6,1)*m.astype(np.float32)+cv2.GaussianBlur(m.astype(np.float32),(0,0),1.6)*(1-m)
# fade out over the bottom 10 sprite rows so the patch leaves no edge
fade=np.clip((H-np.arange(H))/(10*S),0,1)[:,None]
alpha=alpha*fade
# colour match to the sprite: per-channel gain from blurred means over the mask
sp_up=cv2.resize(box[...,:3],(W,H),interpolation=cv2.INTER_CUBIC)
sel=m>0
gain=(sp_up[sel].mean(0)+1)/(patch[sel].mean(0)+1)
patch=np.clip(patch*gain,0,255)
out=np.dstack([patch,alpha*255]).astype(np.uint8)
cv2.imwrite('assets/rig/alan/derived/neck_hires.png',out)
print('size',W,H,'scale',round(1/S,5),'gain',gain.round(3),'pos',x0-384,y0-640)
