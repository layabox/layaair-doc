# PBRSpecularMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

这个材质与PBRStandardMaterial的材质一样是基于物理反射的材质，但是这种材质是基于高光的。常用语制作光滑金属感的材质。

##### 主要属性和方法

> 属性

`albedoColor:Vector4 ` 反射率颜色。

`albedoTexture:BaseTexture` 漫反射贴图。

`emissionColor:Vector4` 放射颜色。

`enableEmission:Boolean` 是否激活放射属性。

`enableReflection:Boolean` 是否开启反射。

`normalTexture:BaseTexture` 法线贴图。

`normalTextureScale:Number` 法线贴图缩放系数。

`occlusionTexture:BaseTexture` 遮挡贴图。

`occlusionTextureStrength:Number` 遮挡贴图强度。

`parallaxTexture:BaseTexture` 视差贴图

`parallaxTextureScale:Number` 视差贴图缩放系数。

`renderMode:int`  [write-only] 设置渲染模式。

`smoothness:Number` 光滑度。

`smoothnessSource:int` 光滑度数据源。

`smoothnessTextureScale:Number` 光滑度缩放系数。

`specularColor:Vector4` 高光颜色。

`specularTexture:BaseTexture` 高光贴图。

`tilingOffset:Vector4` 纹理平铺和偏移。




