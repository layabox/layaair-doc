# ShurikenParticleMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

ShurikenParticleMaterial粒子材质，所有的粒子都是用使用的这个材质。在导出时，所有的粒子会强制修改。

#### 主要属性和方法详解：

> 属性

`renderMode:int` [write-only] 设置渲染模式。

`color:Vector4` 颜色

`tilingOffset:Vector4` 获取纹理平铺和偏移。

`texture:BaseTexture` 漫反射贴图。

`depthWrite:Boolean` 是否写入深度。

`cull:int`  剔除方式。

`blend:int` 混合方式。

`blendSrc:int` 混合源。

`blendDst:int` 混合目标。

`depthTest:int` 深度测试方式。

#### 效果预览:

（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Particle3D&name=Particle_BurningGround)）

![](img/1.gif)<br>(图1)

