# 天空概述

###### *version :2.2.0beta   Update:2019-8-5*

​	skybox天空盒也就是3D世界中的天空。目前常见的天空盒分为两种：立方体型和球形。其中立方体型更常用。

盒型天空盒是由一个立方体模型及6张可以无缝相接的材质贴图构成，有点类似于360全景地图，随着视角的旋转改变，我们可以观察到四面八方都有远景效果。球形就更简单了。

球形天空盒在LayaAir3D中常和 `SkyProceduralMaterial` 程序化天空材质一起使用。所以球形天空盒是没有使用贴图的。由程序化天空材质模拟大气效果来构成天空。

关于天空盒使用的材质`SkyProceduralMaterial` 程序化天空材质 与` SkyBoxMaterial`天空盒材质在前面的 **Material材质** 篇已讲解（天空盒材质：[SkyProceduralMaterial](https://ldc2.layabox.com/doc/?nav=zh-ts-4-13-0)，[SkyBoxMaterial](https://ldc2.layabox.com/doc/?nav=zh-ts-4-13-1)）。

