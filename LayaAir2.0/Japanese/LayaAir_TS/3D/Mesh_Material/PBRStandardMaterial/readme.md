#PBRStandarMaterial材質詳細

###### *version :2.1.0beta   Update:2019-5-14*

物理的に普通の反射材质、硬质面（つまり建筑材质）に基づいて设计されたもので、质感の粗いものを作るのに一般的です。

#####主な属性と方法

>属性

`albedoColor:Vector4`拡散反射色

`albedoTexture:BaseTexture`拡散反射板

`emissionColor:Vector4`色を放射する。

`emissionTexture:BaseTexture`放射線写真

`enableEmission:Boolean`放射性を有効にしますか？

`enableReflection:Boolean`反射をオンにしますか？

`metallic:Number`金属度

`metallicGlossTexture:BaseTexture`金属平滑度スタンプ。

`normalTexture:BaseTexture`法線図解

`normalTextureScale:Number`法線グラフの倍率

`occlusionTexture:BaseTexture`遮蔽パッチ

`occlusionTextureStrength:Number`遮蔽パッチ強度

`parallaxTexture:BaseTexture`視差マップ

`parallaxTextureScale:Number`視差マップのスケーリング係数。

`renderMode:int`[write-only]レンダリングモードを設定します。

`smoothness:Number `平滑度

`smoothnessSource:int` 光滑度数据源。

`smoothnessTextureScale:Number`平滑度スケーリング係数。

`tilingOffset:Vector4`テクスチャのフラットとオフセット。

#####材質の作成と使用

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)を選択します。


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


！[](img/1.png)<br/>(図1)

