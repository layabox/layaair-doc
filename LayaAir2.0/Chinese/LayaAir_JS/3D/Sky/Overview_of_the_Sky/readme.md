# 天空概述

###### *version :2.2.0beta   Update:2019-10-30*

​	**Skybox** 天空盒也就是3D世界中的天空。目前引擎提供常见的两种天空盒网格：**立方体** 和 **球形** 。其中立方体网格更为常用。

​	盒型天空是由一个立方体模型及6张可以无缝相接的贴图构成。球形天空是一个球形模型及一张对应的贴图构成。天空盒随着视角的旋转改变，我们可以观察到四面八方都有远景效果。目前提供的这两种网格中，盒型天空的顶点数据要更少，所以这种天空的性能要更好一些。

​	如果需要使用`SkyProceduralMaterial`程序化天空，那么只能使用球形天空。因为这种材质使用的顶点着色，需要跟精细的顶点信息。

​	关于天空盒使用的材质`SkyProceduralMaterial` 程序化天空材质 与` SkyBoxMaterial`天空盒材质在前面的 **Material材质** 篇已讲解（天空盒材质：[SkyProceduralMaterial](https://ldc2.layabox.com/doc/?nav=zh-as-4-13-0)，[SkyBoxMaterial](https://ldc2.layabox.com/doc/?nav=zh-as-4-13-1)）。

