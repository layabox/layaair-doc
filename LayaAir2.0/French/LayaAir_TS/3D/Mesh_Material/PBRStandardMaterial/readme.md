#Pbrstandard Material

###### *version :2.1.0beta   Update:2019-5-14*

Les matériaux de réflectance physique ordinaire, conçus pour des surfaces dures (c 'est - à - dire des matériaux de construction) sont généralement utilisés pour la fabrication de matériaux de texture rugueuse.

#####Principales propriétés et méthodes

Attributs

`albedoColor:Vector4`Diffuse reflectance color

`albedoTexture:BaseTexture`Diffuse reflectance

`emissionColor:Vector4`Radiocouleur.

`emissionTexture:BaseTexture`Radiogramme.

`enableEmission:Boolean` 是否激活放射属性。

`enableReflection:Boolean`Réfléchissez.

`metallic:Number`Métal.

`metallicGlossTexture:BaseTexture`Metal Smooth

`normalTexture:BaseTexture`Maquette.

`normalTextureScale:Number`Coefficient of Regression

`occlusionTexture:BaseTexture`Cache - toi.

`occlusionTextureStrength:Number`Masque la résistance de l 'écran.

`parallaxTexture:BaseTexture`Parallaxe.

`parallaxTextureScale:Number`Zoom coefficient

`renderMode:int`[Write - only] définit un mode de rendu.

`smoothness:Number `Lisse.

`smoothnessSource:int` 光滑度数据源。

`smoothnessTextureScale:Number`Coefficient of Smooth

`tilingOffset:Vector4`Pavage et décalage de texture.

#####Création et utilisation de matériaux

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)).


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


[] (IMG / 1.png) <br > (Figure 1)

