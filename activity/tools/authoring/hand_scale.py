# Sprite gloves measure ~3% larger than the atlas hands (silhouette h 145 vs 143,
# area +3.5%); scale every hand image, pose swaps included.
import json
R='assets/rig/alan/rig.json'; rig=json.load(open(R)); K=1.03
def up(s): return [round(v*K,4) for v in s] if isinstance(s,list) else round(s*K,4)
for p in rig['parts']:
  if p['id'] in ('hand_r','hand_l'): p['scale']=up(p.get('scale',rig['scale']))
for h in rig['hands'].values():
  for pose in h['poses'].values(): pose['scale']=up(pose.get('scale',rig['scale']))
json.dump(rig,open(R,'w'),indent=2); open(R,'a').write('\n')
