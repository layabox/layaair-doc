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

`smoothnessSource:int`平滑度データソース

`smoothnessTextureScale:Number`平滑度スケーリング係数。

`tilingOffset:Vector4`テクスチャのフラットとオフセット。

#####材質の作成と使用

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=PBRStandardMaterialDemo)を選択します。


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


！[](img/1.png)<br/>(図1)

