#Detailed description of trailing system

###### *version :2.1.1beta   Update:2019-8-2*

​**In LayaAir3D, the trailing system is composed of TrailSprite3D. And tailing here only recommends editing and exporting from Unity.**

Let's look at the trailing interface.

![] (img/1.png)<br> (Figure 1)

Exported attribute details are now supported:

---

`Time`Long tail life

`minVertexDistance`Minimum trailing fragment distance

`width`Tail width settings (can be width curves)

`Color`There are two optional modes to use the colorGradient settings

1. * Fixed * Fixed mode
2. * Blend * Mixed mode

`texture Mode`Texture mode is the same as normal texture mode.

1. * Stretch * Texture maps can be applied along the entire length of the trajectory
2. * Tile * Flattens the texture along the length of the trajectory

`alignment`Trajectory alignment

1. * ALIGNMENT_VIEW* enables the trajectory to be oriented towards the camera
2. * ALIGNMENT_TRANSFORM_Z* Aligns according to the direction of the trajectory transformation component