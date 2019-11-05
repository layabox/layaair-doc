#PBRStandard Material Material Material Details

###### *version :2.1.0beta   Update:2019-5-14*

Based on the physical common reflection material, hard surface (that is, building material) and designed, generally used to make rough texture material.

#####Main attributes and methods

> attribute

`albedoColor:Vector4`Diffuse color.

`albedoTexture:BaseTexture`Diffuse reflection mapping.

`emissionColor:Vector4`Radiation color.

`emissionTexture:BaseTexture`Radiographic mapping.

`enableEmission:Boolean`Whether to activate the radiation properties.

`enableReflection:Boolean`Whether to turn on reflex or not.

`metallic:Number`Metal degree.

`metallicGlossTexture:BaseTexture`Metal smoothness mapping.

`normalTexture:BaseTexture`Normal mapping.

`normalTextureScale:Number`Normal mapping scaling factor.

`occlusionTexture:BaseTexture`Occlusion maps.

`occlusionTextureStrength:Number`Occlusion map strength.

`parallaxTexture:BaseTexture`Parallax mapping.

`parallaxTextureScale:Number`Parallax map scaling coefficient.

`renderMode:int`[write-only] Sets the rendering mode.

`smoothness:Number `Smoothness.

`smoothnessSource:int`Smoothness data source.

`smoothnessTextureScale:Number`Smoothness scaling coefficient.

`tilingOffset:Vector4`Texture tiling and offsetting.

#####Create and use materials

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo))


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


![] (img/1.png)<br> (Figure 1)

