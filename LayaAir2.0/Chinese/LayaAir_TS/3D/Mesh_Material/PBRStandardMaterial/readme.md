# PBRStandardMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

基于物理普通反射材质，硬质表面（也就是建筑材质）而设计的，一般用于做粗糙质感的材质。

##### 主要属性和方法

> 属性

`albedoColor:Vector4` 漫反射颜色。

`albedoTexture:BaseTexture` 漫反射贴图。

`emissionColor:Vector4` 放射颜色。

`emissionTexture:BaseTexture` 放射贴图。

`enableEmission:Boolean` 是否激活放射属性。

`enableReflection:Boolean` 是否开启反射。

`metallic:Number` 金属度。

`metallicGlossTexture:BaseTexture` 金属光滑度贴图。

`normalTexture:BaseTexture` 法线贴图。

`normalTextureScale:Number` 法线贴图缩放系数。

`occlusionTexture:BaseTexture` 遮挡贴图。

`occlusionTextureStrength:Number` 遮挡贴图强度。

`parallaxTexture:BaseTexture` 视差贴图。

`parallaxTextureScale:Number` 视差贴图缩放系数。

`renderMode:int`  [write-only]  设置渲染模式。

`smoothness:Number `光滑度。

`smoothnessSource:int` 光滑度数据源。

`smoothnessTextureScale:Number` 光滑度缩放系数。

`tilingOffset:Vector4` 纹理平铺和偏移。

##### 创建和使用材质

下面的代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)）。

```typescript
//实例PBR材质
var mat:PBRStandardMaterial = new Laya.PBRStandardMaterial();
//反射贴图
Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_AlbedoTransparency.png', Laya.Handler.create(this, function(texture) {
    mat.albedoTexture = texture;
}));

//法线贴图
Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Normal.png', Laya.Handler.create(this, function(texture) {
    mat.normalTexture = texture;
}));

//金属光滑度贴图
Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_MetallicSmoothness.png', Laya.Handler.create(this, function(texture) {
    mat.metallicGlossTexture = texture;
}));

//遮挡贴图
Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Occlusion.png', Laya.Handler.create(this, function(texture) {
    mat.occlusionTexture = texture;
}));

//反射颜色
mat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
//光滑度缩放系数
mat.smoothnessTextureScale = 1.0;
//遮挡贴图强度
mat.occlusionTextureStrength = 1.0;
//法线贴图缩放系数
mat.normalScale = 1;
//光滑度数据源:从金属度贴图/反射贴图获取。
mat.smoothnessSource = Laya.PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha;

var barrel = scene.getChildByName("Wooden_Barrel") as Laya.MeshSprite3D;
var barrel1 = scene.getChildByName("Wooden_Barrel (1)") as Laya.MeshSprite3D;
var barrel2 = scene.getChildByName("Wooden_Barrel (2)") as Laya.MeshSprite3D;
var barrel3 = scene.getChildByName("Wooden_Barrel (3)") as Laya.MeshSprite3D;

barrel.meshRenderer.sharedMaterial = mat;
barrel1.meshRenderer.sharedMaterial = mat;
barrel2.meshRenderer.sharedMaterial = mat;
barrel3.meshRenderer.sharedMaterial = mat;
```

![](img/1.png)<br>(图1)

