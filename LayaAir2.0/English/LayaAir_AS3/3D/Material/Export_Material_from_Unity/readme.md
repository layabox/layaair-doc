# 从Unity中导出材质

###### *version :2.1.0beta   Update:2019-5-14*

Material will be exported along with the export scenario and presupposition.

In Figure 1, here is a scenario we exported:

! [] (IMG / 1. PNG) < br > (Figure 1)

***.lmat**Documents are material files: Json files, including basic material information such as lighting, mapping, rendering mode, etc.

####Part on Material Export Support

Supports all Shaders in the LayaAir3D directory in the Shader list.

If you use a non-LayaAir3D Shader, it will be forced to convert to the default Shader of LayaAir3D, which may lead to unpredictable errors.

![] (img/2.jpg)<br> (Figure 2)