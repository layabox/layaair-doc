# WaterPrimaryMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

WaterPrimaryMaterial是水初级材质。靠法线贴图来实现波纹的效果。

##### 主要属性与方法

> 属性

`horizonColor:Vector4` 地平线颜色，水面反射颜色。

`mainTexture:BaseTexture` 主贴图，水面颜色贴图。

`normalTexture:BaseTexture` 法线贴图，水面波纹的法线贴图。

`waveScale:Number` 波动缩放系数。

`waveSpeed:Vector4` 波动速率。

##### 创建和使用材质

水初级材质我们推荐的是从Unity中调好再导出使用。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=WaterPrimaryMaterialDemo))

![](img/1.gif)<br>(图1)

