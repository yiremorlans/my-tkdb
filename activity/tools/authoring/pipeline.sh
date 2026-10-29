set -e
cd /Users/Yire/Documents/apps/my-tkdb
${DATA:-activity/tools/authoring/data}/venv/bin/python ${DATA:-activity/tools/authoring/data}/build_rig.py ${DATA:-activity/tools/authoring/data} >/dev/null
node activity/tools/build-overlays.js alan >/dev/null
node activity/tools/build-portrait-hair.js alan >/dev/null
node ${DATA:-activity/tools/authoring/data}/dump_rig.mjs ${DATA:-activity/tools/authoring/data}/dump.json >/dev/null
${DATA:-activity/tools/authoring/data}/venv/bin/python ${DATA:-activity/tools/authoring/data}/refine.py ${DATA:-activity/tools/authoring/data} >/dev/null
${DATA:-activity/tools/authoring/data}/venv/bin/python ${DATA:-activity/tools/authoring/data}/apply_refine.py ${DATA:-activity/tools/authoring/data}
${DATA:-activity/tools/authoring/data}/venv/bin/python ${DATA:-activity/tools/authoring/data}/hand_scale.py
node activity/tools/build-sprite-skin.js alan
