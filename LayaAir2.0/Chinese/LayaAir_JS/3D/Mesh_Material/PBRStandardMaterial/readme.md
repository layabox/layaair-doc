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
setTexture(){
    //反射贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_AlbedoTransparency.png', Laya.Handler.create(this, function (texture) {
        this.mat.albedoTexture = texture;
    }));
    //法线贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Normal.png', Laya.Handler.create(this, function (texture) {
        this.mat.normalTexture = texture;
    }));
    //金属光滑度贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_MetallicSmoothness.png', Laya.Handler.create(this, function (texture) {
        this.mat.metallicGlossTexture = texture;
    }));
    //遮挡贴图
    Laya.Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Occlusion.png', Laya.Handler.create(this, function (texture) {
        this.mat.occlusionTexture = texture;
    }));
}

setMaterial(){
        this.mat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        //光滑度缩放系数
        this.mat.smoothnessTextureScale = 1.0;
        //遮挡贴图强度
        this.mat.occlusionTextureStrength = 1.0;
        //法线贴图缩放洗漱
        this.mat.normalScale = 1;
        //光滑度数据源:从金属度贴图/反射贴图获取。
        this.mat.smoothnessSource = Laya.PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha;
        let barrel = this.scene.getChildByName("Wooden_Barrel");
        let barrel1 = this.scene.getChildByName("Wooden_Barrel (1)");
        let barrel2 = this.scene.getChildByName("Wooden_Barrel (2)");
        let barrel3 = this.scene.getChildByName("Wooden_Barrel (3)");
        barrel.meshRenderer.sharedMaterial = this.mat;
        barrel1.meshRenderer.sharedMaterial = this.mat;
        barrel2.meshRenderer.sharedMaterial = this.mat;
        barrel3.meshRenderer.sharedMaterial = this.mat;
}
```

![](img/1.png)<br>(图1)

