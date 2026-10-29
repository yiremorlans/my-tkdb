# Cuts Alan out of the pose screenshots using the scene's clean background
# (assets/bg/darkwick/Darkwick_Corridor_3.png) registered to each shot, and
# writes transparent sprites aligned to alan_academy.png's 768x1366 frame.
import sys,glob,os,cv2,numpy as np
SP=sys.argv[1]
NAMES=['pockets','arms_crossed','hand_neck']
fs=sorted(glob.glob('assets/rig/alan/screenshot/*.png'))
bg=cv2.imread('assets/bg/darkwick/Darkwick_Corridor_3.png').astype(np.float32)
spr=cv2.imread('assets/rig/alan/source/alan_academy.png',cv2.IMREAD_UNCHANGED)
SW,SH=spr.shape[1],spr.shape[0]
core_s=(spr[...,3]>250).astype(np.uint8); core_s[:, :272]=0; core_s[:, 498:]=0
core_s=cv2.erode(core_s,np.ones((9,9),np.uint8))
LEG_Y,LEG_X0,LEG_X1=700,268,502
BOOT_Y=1000
MIN_PIECE=3000  # hires px; railing specks are far smaller
os.makedirs('assets/rig/alan/poses/hires',exist_ok=True)
for i,name in enumerate(NAMES):
  img=cv2.imread(fs[i]).astype(np.float32); h,w=img.shape[:2]
  plate=cv2.warpPerspective(bg,np.load(SP+f'/bg2shot_{i}.npy'),(w,h),flags=cv2.INTER_CUBIC)
  valid=np.zeros((h,w),bool); valid[:,158:1482]=True
  M=np.vstack([np.load(SP+f'/s2shot_{i}.npy'),[0,0,1]])
  core=cv2.warpPerspective(core_s,M,(w,h),flags=cv2.INTER_NEAREST)>0
  # Bent arms leave gaps inside the core columns; the scene shows through
  # as dark blue railing, which is never Alan (not teal hair, not pants).
  B_,G_,R_=img[...,0],img[...,1],img[...,2]
  railing=((B_+G_+R_)/3<110)&(B_>R_+18)&(B_>G_+10)
  railing=cv2.dilate(railing.astype(np.uint8),np.ones((7,7),np.uint8))>0
  core&=~railing
  # compare at the plate's (upscaled, softer) detail level
  d=np.abs(cv2.GaussianBlur(img,(0,0),1.6)-cv2.GaussianBlur(plate,(0,0),1.0)).max(axis=2)
  gc=np.full((h,w),cv2.GC_PR_BGD,np.uint8)
  gc[d>40]=cv2.GC_PR_FGD
  gc[d<14]=cv2.GC_BGD
  gc[cv2.dilate((d>70).astype(np.uint8),np.ones((3,3)))>0]=cv2.GC_PR_FGD
  gc[core]=cv2.GC_FGD
  gc[~valid]=cv2.GC_BGD
  ys,xs=np.where(gc!=cv2.GC_BGD); y0,y1,x0,x1=max(0,ys.min()-20),min(h,ys.max()+20),max(0,xs.min()-20),min(w,xs.max()+20)
  sub=np.clip(img[y0:y1,x0:x1],0,255).astype(np.uint8); m=gc[y0:y1,x0:x1].copy()
  b=np.zeros((1,65)); f=np.zeros((1,65))
  cv2.grabCut(sub,m,None,b,f,5,cv2.GC_INIT_WITH_MASK)
  fg=np.zeros((h,w),np.uint8); fg[y0:y1,x0:x1]=((m==cv2.GC_FGD)|(m==cv2.GC_PR_FGD))
  # keep every sizable piece: a forearm can separate from the body where its
  # cuff crosses a bright window
  n,lab,st,_=cv2.connectedComponentsWithStats(fg,8); fg=np.isin(lab,1+np.where(st[1:,4]>=MIN_PIECE)[0]).astype(np.uint8)
  # close small notches (white sleeve over bright window)
  fg=cv2.morphologyEx(fg,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(13,13)))
  # Legs below the wrists are the reference sprite's legs in every pose,
  # and dark stairs behind dark pants defeat the difference: take the mask
  # there from the sprite's own alpha.
  legs_s=np.zeros(spr.shape[:2],np.uint8); legs_s[LEG_Y:, LEG_X0:LEG_X1]=1
  legs=cv2.warpPerspective(legs_s,M,(w,h),flags=cv2.INTER_NEAREST)>0
  sa=cv2.warpPerspective(spr[...,3],M,(w,h),flags=cv2.INTER_LINEAR)
  fg[legs]=(sa[legs]>128)
  legs_alpha=sa.astype(np.float32)/255
  inv=1-fg; n,lab,st,_=cv2.connectedComponentsWithStats(inv,4)
  border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))
  for k in range(1,n):
    if k not in border and st[k,4]<6000: fg[lab==k]=1
  # difference matting across a 4px edge band
  inner=cv2.erode(fg,np.ones((7,7),np.uint8)); outer=cv2.dilate(fg,np.ones((5,5),np.uint8))
  band=(outer>0)&(inner==0)
  _,idx=cv2.distanceTransformWithLabels((1-inner).astype(np.uint8),cv2.DIST_L2,5,labelType=cv2.DIST_LABEL_PIXEL)
  iy,ix=np.where(inner>0); lut=np.zeros((idx.max()+1,2),int); lut[idx[iy,ix]]=np.stack([iy,ix],1)
  F=img[lut[idx][...,0],lut[idx][...,1]]
  FB=F-plate; den=(FB*FB).sum(2)
  al=np.clip(((img-plate)*FB).sum(2)/np.maximum(den,1),0,1)
  a=fg.astype(np.float32)
  use=band&(den>400)
  a[use]=al[use]
  soft=cv2.GaussianBlur(fg.astype(np.float32),(0,0),0.8); a[band&~use]=soft[band&~use]
  a[legs]=legs_alpha[legs]
  # background bits caught in gaps (railing under a raised arm): pixels that
  # match the plate, away from the body core and legs
  # Only the scene's dark blue (stair railing) is removed: a plate-match
  # rule would also eat white sleeve over white window.
  near_core=cv2.dilate(core.astype(np.uint8),np.ones((9,9),np.uint8))>0
  a[railing&~legs]=0
  # Thin slivers (railing seen through the arm/vest gap) outside the core
  # and below the head: an opening drops anything narrower than ~15 px.
  keep=(a>0.05).astype(np.uint8)
  opened=cv2.morphologyEx(keep,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(15,15)))
  below_s=np.zeros(spr.shape[:2],np.uint8); below_s[205:]=1
  below=cv2.warpPerspective(below_s,M,(w,h),flags=cv2.INTER_NEAREST)>0
  thin=(keep>0)&(opened==0)&below&~near_core&~legs
  a[thin]=0; keep[thin]=0
  n,lab,st,_=cv2.connectedComponentsWithStats(keep,8); keep=np.isin(lab,1+np.where(st[1:,4]>=MIN_PIECE)[0]).astype(np.uint8)
  a[keep==0]=0
  # fill interior holes (fully enclosed, small)
  inv=1-keep; n,lab,st,_=cv2.connectedComponentsWithStats(inv,4)
  border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))
  for k in range(1,n):
    if k not in border and st[k,4]<6000: a[lab==k]=1
  a[~valid]=0
  col=np.where(band[...,None],F,img)
  rgba=np.dstack([np.clip(col,0,255),a*255])
  ys,xs=np.where(a>0.01); hy0,hy1,hx0,hx1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
  cv2.imwrite(f'assets/rig/alan/poses/hires/{name}.png',rgba[hy0:hy1,hx0:hx1].astype(np.uint8))
  pm=rgba.copy(); pm[...,:3]*=pm[...,3:4]/255
  pm=cv2.GaussianBlur(pm,(0,0),0.9)
  out=cv2.warpPerspective(pm,np.linalg.inv(M),(SW,SH),flags=cv2.INTER_LINEAR)
  A=out[...,3:4]; out[...,:3]=np.where(A>0,out[...,:3]*255/np.maximum(A,1e-3),0)
  # legs: the reference sprite's own pixels, blended in over 24 rows
  ramp=np.clip((np.arange(SH)-LEG_Y)/24,0,1)[:,None,None]
  cols=np.zeros((SH,SW,1)); cols[:,LEG_X0:LEG_X1]=1
  cols[BOOT_Y:]=1   # boots are wider than the leg columns
  wgt=ramp*cols
  out=out*(1-wgt)+spr.astype(np.float32)*wgt
  cv2.imwrite(f'assets/rig/alan/poses/{name}.png',np.clip(out,0,255).astype(np.uint8))
  print(name,'fg',int(fg.sum()),'matted',int(use.sum()),'/',int(band.sum()))
