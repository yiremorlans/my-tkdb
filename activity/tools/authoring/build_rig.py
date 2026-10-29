# One-off authoring aid: turns the fitted placements into assets/rig/alan/rig.json.
import sys,json,numpy as np
SP=sys.argv[1]
R='assets/rig/alan/'
parts=json.load(open(R+'parts.json'))['parts']
M=np.load(SP+'/p2s.npy'); PS=float(np.hypot(M[0,0],M[1,0]))
def p2r(x,y): return (float(M[0,0]*x+M[0,1]*y+M[0,2]), float(M[1,0]*x+M[1,1]*y+M[1,2]))
def size(pid): return parts[pid]['rect'][2:]
def rnd(v): return round(v,2)

world={}   # id -> world pivot (ref)
out=[]
def bone(id,parent,x,y,**kw):
  world[id]=(x,y)
  px,py=world[parent] if parent else (0,0)
  out.append(dict(id=id,parent=parent,position=[rnd(x-px),rnd(y-py)],**kw))
def layer(id,parent,pid,left,top,s,flip,z,pivot=(0.5,0.5),**kw):
  sx,sy=s if isinstance(s,(tuple,list)) else (s,s)
  w,h=size(pid); W,H=w*sx,h*sy
  ppx=(1-pivot[0]) if flip else pivot[0]
  wx,wy=left+ppx*W,top+pivot[1]*H
  world[id]=(wx,wy)
  bx,by=world[parent]
  e=dict(id=id,parent=parent,image=f'parts/{pid}.png',position=[rnd(wx-bx),rnd(wy-by)],pivot=list(pivot),z=z)
  if sx!=sy: e['scale']=[round(sx,4),round(sy,4)]
  elif abs(sx-0.70)>1e-6: e['scale']=round(sx,4)
  if flip: e['flipX']=True
  e.update(kw); out.append(e)

body=json.load(open(SP+'/body.json'))
def B(name,id,parent,z,**kw):
  b=body[name]; layer(id,parent,b['id'],b['px'],b['py'],b['s'],b['flip'],z,**kw)

# --- skeleton ---------------------------------------------------------------
bone('root',None,0,0)
bone('hips','root',384,640)
bone('torso','hips',384,640)
bone('neck','torso',384,262,limits={'rotation':[-4,4]})
bone('head','neck',384,212,limits={'rotation':[-7,7]})
for side,sx,ex,wx in (('r',262,250,236),('l',506,518,532)):
  bone(f'shoulder_{side}','torso',sx,300)
  lim={'r':{'upper':[-12,22],'fore':[-110,12],'hand':[-35,35]},'l':{'upper':[-22,12],'fore':[-12,110],'hand':[-35,35]}}[side]
  bone(f'upper_arm_{side}',f'shoulder_{side}',sx,300,limits={'rotation':lim['upper']})
  bone(f'forearm_{side}',f'upper_arm_{side}',ex,480,limits={'rotation':lim['fore']})

# --- body layers ------------------------------------------------------------
B('leg_r_p180','leg_r','hips',100); B('leg_l_p181','leg_l','hips',101)
B('hips_p191','pants_top','hips',105)
# its shorts hems fade into the legs (derived/pants_top_faded.png, bottom 30%)
next(e for e in out if e['id']=='pants_top')['image']='derived/pants_top_faded.png'
# Legs start under the vest (y 600) and stretch to the boot tops (y 1215),
# so their flat top edges never show below the vest.
for lid,lx in (('leg_r',-60),('leg_l',60)):
  e=next(e for e in out if e['id']==lid); w,h=size(e['image'][6:-4])
  e['pivot']=[0.5,0.0]; e['scale']=[0.86,round(615/h,4)]; e['position']=[lx,600-640]
  # top 8% fades into the pants top so the leg's flat, wider top never shows
  e['image']=f'derived/{lid}_faded.png'
B('boot_r','boot_r','hips',120); B('boot_l','boot_l','hips',121)
B('neck','neck_skin','torso',190)
B('shirt','shirt','torso',200)
B('necklace_chain','necklace','torso',205); B('necklace_tag','necklace_tag','torso',206)
for s in 'rl':
  B(f'sleeve_inner_{s}',f'sleeve_inner_{s}',f'upper_arm_{s}',210)
  B(f'forearm_{s}',f'forearm_skin_{s}',f'forearm_{s}',214,pivot=(0.5,0.0))
  next(e for e in out if e['id']==f'forearm_skin_{s}')['scale']=[0.71,0.86]
  B(f'sleeve_lower_{s}',f'sleeve_lower_{s}',f'forearm_{s}',216,mesh={'bend':True,'zone':0.35})
  B(f'sleeve_upper_{s}',f'sleeve_upper_{s}',f'upper_arm_{s}',218)
  B(f'cuff_{s}',f'cuff_{s}',f'forearm_{s}',220)
hb={}
for s in 'rl':
  b=body[f'hand_{s}']; w,h=size(b['id'])
  layer(f'hand_{s}',f'forearm_{s}',b['id'],b['px'],b['py'],b['s'],b['flip'],230,pivot=(0.5,0.05),limits={'rotation':[-35,35]})
B('bracelet_l','bracelet_l','forearm_l',232)
B('vest','vest','torso',300)
B('pocket_chain_b','pocket_chain','torso',305); B('pocket_chain_v','pocket_chain_drop','torso',306); B('pocket_fob','pocket_fob','torso',307)
for i,(bx,by) in enumerate(json.load(open(SP+'/buttons.json'))):
  layer(f'vest_button_{i}','torso',('p138','p139','p141','p142')[i],bx,by,0.70,0,302+i*0.1)
B('collar_r','collar_r','torso',310); B('collar_l','collar_l','torso',311)

# --- head -------------------------------------------------------------------
names={'p117':'face_base','p093':'ear_r','p094':'ear_l','p097':'jaw','p048':'nose','p085':'lip_shade','p081':'lip_shade_b',
 'p055':'eye_white_r','p052':'eye_white_l','p054':'iris_r','p053':'iris_l','p031':'iris_shine_r','p036':'iris_shine_l','p060':'iris_shine_l_b',
 'p042':'lash_r','p045':'lash_l','p018':'lid_r','p019':'lid_r_b','p022':'lid_l','p027':'lid_l_b','p026':'brow_r','p029':'brow_l','p091':'mouth'}
L=json.load(open(SP+'/head_layers.json'))['layers']
face=[(k,p) for k,p in L if k in names]
hair=[(k,p) for k,p in L if k not in names]
h2=json.load(open(SP+'/peel_hair2.json'))['placed']
keep2={'p127','p005','p119','p114','p100','p009','p116','p147'}
hair=[(p['id'],p) for p in reversed(h2) if p['id'] in keep2]+hair  # back strands first
# later passes: side strands (hair3) and dark under-strands (hair4) go behind
extra=[(p['id'],p) for p in json.load(open(SP+'/hair3.json'))['placed']]
under=[(p['id'],p) for p in json.load(open(SP+'/hair4.json'))['placed'] if p['id']!='p132']  # p132 fit across the face
hair=extra+hair
# The back-of-head cap is hidden almost everywhere, so no match can place
# it; set by geometry behind the face: centered, top at the crown.
CAPS=2.09; cw,ch=size('p104')
back_cap=dict(px=round(285-cw*CAPS/2),py=40,s=CAPS,flip=0)
z=400
FJ=json.load(open(SP+'/face.json'))
for k,p in face:
  if k=='p117': p=dict(p,py=p['py']-14)
  if k in ('p055','p052'): p=FJ[k]  # whites flattened to the eye-open shape
  sc=(p['s']*PS,p.get('sy',p['s'])*PS)
  l,t=p2r(p['px'],p['py']); layer(names[k],'head',k,l,t,sc,p['flip'],z); z+=1
  if k=='p027':
    for lid in ('lowlid_r','lowlid_l'):
      q=FJ[lid]; l,t=p2r(q['px'],q['py']); layer(lid,'head',q['id'],l,t,q['s']*PS,q['flip'],z); z+=1
# hair locks: imageless bones, pivot at each lock's top centre
def lock_of(p):
  w,h=size(p[0]); cx=p[1]['px']+w*p[1]['s']/2; cy=p[1]['py']+h*p[1]['s']/2
  if cx<190: return 'hair_side_r'
  if cx>390: return 'hair_side_l'
  if cy>200: return 'hair_front'
  return 'hair_crown'
groups={}
for item in hair: groups.setdefault(lock_of(item),[]).append(item)
for lock,items in groups.items():
  xs=[];ys=[]
  for k,p in items:
    w,h=size(k); l,t=p2r(p['px'],p['py']); xs+=[l,l+w*p['s']*PS]; ys.append(t)
  bone(lock,'head',(min(xs)+max(xs))/2,min(ys),limits={'rotation':[-8,8]})
z=500
for k,p in hair:
  l,t=p2r(p['px'],p['py']); layer(f'hair_{k}',lock_of((k,p)),k,l,t,p['s']*PS,p['flip'],z); z+=1

# --- atlas moods ------------------------------------------------------------
moods_fit=json.load(open(SP+'/moods.json'))
blink=[]
bl={p['id']:p for p in moods_fit['blush']}
b=bl['p151']; l,t=p2r(b['px'],b['py']); layer('blush_l','head','p151',l,t,b['s']*PS,b['flip'],506,hidden=True)
w,h=size('p151'); cxr=b['px']+w*b['s']/2; cy=b['py']+h*b['s']/2; cxl=2*282-cxr
w2,h2=size('p150'); l,t=p2r(cxl-w2*b['s']/2,cy-h2*b['s']/2); layer('blush_r','head','p150',l,t,b['s']*PS,True,506.5,hidden=True)
sw=moods_fit['sweat'][0]; l,t=p2r(sw['px'],sw['py']); layer('sweat','head','p107',l,t,sw['s']*PS,sw['flip'],507,hidden=True)
open_eye=['lowlid_r','lowlid_l','eye_white_r','eye_white_l','iris_r','iris_l','iris_shine_r','iris_shine_l','iris_shine_l_b','lash_r','lash_l','lid_r','lid_r_b','lid_l','lid_l_b']

hx,hy=world['head']; ox,oy=p2r(0,0)
pose_imgs={'relaxed':'p207','curled':'p176','loose':'p178','back':'p208','open':'p196','fist':'p197','fist_side':'p200','spread':'p209'}
def hand_poses(side):
  base=next(e for e in out if e['id']==f'hand_{side}')
  ps={}
  for name,pid in pose_imgs.items():
    e={'image':f'parts/{pid}.png','pivot':[0.5,0.05],'scale':base.get('scale',0.7)}
    if side=='l': e['flipX']=True
    ps[name]=e
  return {'part':f'hand_{side}','default':'relaxed','poses':ps}

rig={
 'character':'alan',
 'reference':{'width':768,'height':1366},
 'referenceImage':'source/alan_academy.png',
 'background':'../../bg/vagastrom/Vagastrom_Alan_Room.png',
 'stage':{'landscape':{'top':-20,'bottom':600,'centerX':384},'portrait':{'top':-10,'bottom':800,'centerX':384}},
 'scale':0.7,
 'parts':out,
 'bones':{'torso':'torso','neck':'neck','head':'head','arms':{
   'r':{'upper':'upper_arm_r','fore':'forearm_r','hand':'hand_r','dir':1},
   'l':{'upper':'upper_arm_l','fore':'forearm_l','hand':'hand_l','dir':-1}}},
 'groups':{'hair_locks':[[k] for k in ('hair_front','hair_side_r','hair_side_l','hair_crown') if k in groups]},
 'hands':{'r':hand_poses('r'),'l':hand_poses('l')},
 'expressions':{
   'head':'head','overlayScale':round(PS,5),'overlayOffset':[rnd(ox-hx),rnd(oy-hy)],'overlayZ':505,
   'moods':{
     'default':{},
     'blink':{'source':'overlay','portrait':'close'},
     'smile':{'source':'overlay','portrait':'smile'},
     'full_smile':{'source':'overlay','portrait':'full_smile','noBlink':True},
     'blush':{'source':'atlas','show':['blush_l','blush_r']},
     'smile_blush':{'layers':['smile','blush']},
     'full_smile_blush':{'layers':['full_smile','blush']},
     'surprise':{'source':'overlay','portrait':'surprise'},
     'surprise_blush':{'layers':['surprise','blush']},
     'sweat':{'source':'atlas','show':['sweat']},
     'serious':{'source':'overlay','portrait':'serious'},
     'upset':{'layers':['serious','sweat']},
   }},
 'hotspots':{
   'cheek':{'part':'face_base','rect':[0.12,0.55,0.88,0.82],'reaction':'cheekPoke'},
   'head':{'part':'face_base','rect':[0.0,-0.45,1.0,0.3],'reaction':'headPat'},
   'hand_r':{'part':'hand_r','reaction':'handTap'},
   'hand_l':{'part':'hand_l','reaction':'handTap'}},
 'reactions':{
   'headPat':{'mood':'smile','then':[0.4,'smile_blush'],'duration':2.6},
   'cheekPoke':{'mood':'surprise_blush','duration':2.2},
   'handTap':{'mood':'smile','duration':2.6},
   'upset':{'mood':'upset','duration':4},
   'spendTime':{'mood':'full_smile_blush','duration':3.2}},
 'portraitHair':{
   'portrait':'default','maxY':545,'jawClipY':440,'lumMax':255,'diff':30,'feather':14,'z':500,'lockZ':510,
   'exclude':[],
   'pinToBase':['lash_r','lash_l','lid_r','lid_r_b','lid_l','lid_l_b','lowlid_r','lowlid_l',
               'eye_white_r','eye_white_l','iris_r','iris_l','brow_r','brow_l','mouth','nose'],
   'locks':[
     {'id':'hair_crown','rect':[215,0,335,75],'pivot':[275,75]},
     {'id':'hair_front','rect':[170,195,420,365],'pivot':[295,195]},
     {'id':'hair_side_r','rect':[55,120,175,305],'pivot':[165,135]},
     {'id':'hair_side_l','rect':[400,120,510,315],'pivot':[400,135]}]},
 'spriteSkin':{
   'dilate':3,'skip':['head','hand_r','hand_l','neck_skin'],
   'shades':[{'id':'skin_neck_shade','part':'neck_skin','bone':'torso','minDiff':12,'z':190.5}],
   'groups':[
     {'id':'skin_hips','bone':'hips'},
     {'id':'skin_torso_back','bone':'torso','zRange':[0,209]},
     {'id':'skin_torso_front','bone':'torso','zRange':[250,399]},
     {'id':'skin_upper_arm_r','bone':'upper_arm_r'},
     {'id':'skin_upper_arm_l','bone':'upper_arm_l'},
     {'id':'skin_sleeve_lower_r','bone':'forearm_r','parts':['sleeve_lower_r'],'mesh':{'bend':True,'zone':0.35}},
     {'id':'skin_sleeve_lower_l','bone':'forearm_l','parts':['sleeve_lower_l'],'mesh':{'bend':True,'zone':0.35}},
     {'id':'skin_forearm_r','bone':'forearm_r'},
     {'id':'skin_forearm_l','bone':'forearm_l'}],
   'underlays':[{'id':'skin_head_underlay','from':'head','bone':'neck','belowY':140,'tint':0.55,'z':394}]},
 'annoyance':{'perTap':1,'decayPerSec':0.9,'threshold':5,'recoverSec':4},
 'motion':{'breath':{'speed':0.2,'amount':0.6},'sway':{'speed':0.08,'amount':0.8},'hair':{'enabled':False,'speed':0.4,'amount':3},
   'arms':{'speed':0.25,'amount':0.4},'blink':{'meanInterval':4.0},'bgPan':{'speed':0.022,'amount':0.01}},
}
json.dump(rig,open(R+'rig.json','w'),indent=2)
print('parts',len(out),'hair',len(hair),'locks',{k:len(v) for k,v in groups.items()},'blink',blink)
