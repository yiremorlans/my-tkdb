# Registers an outfit's reference sprite to the rig's shared head.
#
#   python register_head.py <sprite.png> <head_reference.png> <out.png> \
#       [--box x0,y0,x1,y1] [--blend y0,y1]
#
# A second outfit's sprite can draw the head a little differently from the
# sprite the shared head was fitted to (alan_room.png: 1.3% smaller, ~6 px
# lower). The head is shared, so the sprite moves instead: an ECC affine
# fit of its head (inside --box) onto the reference's head, applied fully
# above --blend's first row, not at all below its second, and eased across
# the neck in between. The body keeps its own pixels. The output is the
# outfit's `referenceImage` for fitting and sprite skins; the source sprite
# stays as it is.
import sys,cv2,numpy as np

def opt(name,default):
  return [float(v) for v in (sys.argv[sys.argv.index('--'+name)+1] if '--'+name in sys.argv else default).split(',')]

src_file,ref_file,out_file=sys.argv[1:4]
x0,y0,x1,y1=[int(v) for v in opt('box','290,40,480,235')]
b0,b1=opt('blend','225,262')

def gray(im):
  a=im[...,3:]/255.0
  return cv2.cvtColor((im[...,:3]*a+128*(1-a)).astype(np.uint8),cv2.COLOR_BGR2GRAY).astype(np.float32)/255

src=cv2.imread(src_file,cv2.IMREAD_UNCHANGED).astype(np.float32)
ref=cv2.imread(ref_file,cv2.IMREAD_UNCHANGED).astype(np.float32)
H,W=src.shape[:2]
mask=np.zeros((H,W),np.uint8); mask[y0:y1,x0:x1]=1
# M maps a rig (reference) point to where that point is in the sprite.
M=np.eye(2,3,dtype=np.float32)
_,M=cv2.findTransformECC(gray(ref),gray(src),M,cv2.MOTION_AFFINE,
  (cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,500,1e-7),mask,5)

ys,xs=np.mgrid[0:H,0:W].astype(np.float32)
k=np.clip((b1-ys)/(b1-b0),0,1); k=k*k*(3-2*k)  # 1 above the neck, 0 below
mx=xs+k*(M[0,0]*xs+M[0,1]*ys+M[0,2]-xs)
my=ys+k*(M[1,0]*xs+M[1,1]*ys+M[1,2]-ys)
# premultiplied, so edge pixels don't pick up the transparent black
pm=src.copy(); pm[...,:3]*=src[...,3:]/255.0
out=cv2.remap(pm,mx,my,cv2.INTER_CUBIC,borderMode=cv2.BORDER_CONSTANT,borderValue=0)
out=np.clip(out,0,255); a=out[...,3:]
out[...,:3]=np.where(a>0,out[...,:3]*255.0/np.maximum(a,1e-3),0)
# rows below the blend are the sprite's own pixels, untouched
out[int(np.ceil(b1)):]=src[int(np.ceil(b1)):]
cv2.imwrite(out_file,np.clip(out+0.5,0,255).astype(np.uint8))

err=lambda im:np.abs(gray(im)-gray(ref))[y0:y1,x0:x1].mean()
print('head affine',M.round(4).tolist())
print(f'head diff vs reference: {err(src):.4f} before, {err(out):.4f} after')
