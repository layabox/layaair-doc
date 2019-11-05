#PBRStandard Material Material Material Details

###### *version :2.1.0beta   Update:2019-5-14*

Based on the physical common reflection material, hard surface (that is, building material) and designed, generally used to make rough texture material.

#####Main attributes and methods

> attribute

`albedoColor:Vector4`Diffuse reflection color.

`albedoTexture:BaseTexture`Diffuse reflection mapping.

`emissionColor:Vector4`Radiation color.

`emissionTexture:BaseTexture`Radiographic mapping.

`enableEmission:Boolean`Whether to activate the radiation properties.

`enableReflection:Boolean`Whether reflection is turned on.

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

`tilingOffset:Vector4`Texture tiling and migration.

#####Create and use materials

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo))


```typescript

//实例PBR材质
var mat:PBRStandardMaterial = new PBRStandardMaterial();
//反射贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_AlbedoTransparency.png', Handler.create(this, function(texture:Texture2D):void {
    mat.albedoTexture = texture;
}));

//法线贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Normal.png', Handler.create(this, function(texture:Texture2D):void {
    mat.normalTexture = texture;
}));

//金属光滑度贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_MetallicSmoothness.png', Handler.create(this, function(texture:Texture2D):void {
    mat.metallicGlossTexture = texture;
}));

//遮挡贴图
Texture2D.load('res/threeDimen/scene/PBRMaterialScene/Assets/PBR Barrel/Materials/Textures/Barrel_Occlusion.png', Handler.create(this, function(texture:Texture2D):void {
    mat.occlusionTexture = texture;
}));

//反射颜色
mat.albedoColor = new Vector4(1, 1, 1, 1);
//光滑度缩放系数
mat.smoothnessTextureScale = 1.0;
//遮挡贴图强度
mat.occlusionTextureStrength = 1.0;
//法线贴图缩放系数
mat.normalScale = 1;
//光滑度数据源:从金属度贴图/反射贴图获取。
mat.smoothnessSource = PBRStandardMaterial.SmoothnessSource_MetallicGlossTexture_Alpha;

var barrel:MeshSprite3D = scene.getChildByName("Wooden_Barrel") as MeshSprite3D;
var barrel1:MeshSprite3D = scene.getChildByName("Wooden_Barrel (1)") as MeshSprite3D;
var barrel2:MeshSprite3D = scene.getChildByName("Wooden_Barrel (2)") as MeshSprite3D;
var barrel3:MeshSprite3D = scene.getChildByName("Wooden_Barrel (3)") as MeshSprite3D;

barrel.meshRenderer.sharedMaterial = mat;
barrel1.meshRenderer.sharedMaterial = mat;
barrel2.meshRenderer.sharedMaterial = mat;
barrel3.meshRenderer.sharedMaterial = mat;
```


![] (img/1.png)<br> (Figure 1)

