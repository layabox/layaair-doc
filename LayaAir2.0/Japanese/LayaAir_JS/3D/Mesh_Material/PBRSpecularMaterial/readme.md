# PBRSpecularMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

この材質はPBRStandarMaterialの材質と同じで、物理的に反射された材質ですが、この材質は高い光に基づいています。滑らかな金属感の材質を作るのが一般的です。

#####主な属性と方法

>属性

`albedoColor:Vector4 `反射率の色

`albedoTexture:BaseTexture`拡散反射板

`emissionColor:Vector4`色を放射する。

`enableEmission:Boolean`放射性を有効にしますか？

`enableReflection:Boolean`反射をオンにしますか？

`normalTexture:BaseTexture`法線図解

`normalTextureScale:Number`法線グラフの倍率

`occlusionTexture:BaseTexture`遮蔽パッチ

`occlusionTextureStrength:Number`遮蔽パッチ強度

`parallaxTexture:BaseTexture`視差マップ

`parallaxTextureScale:Number`視差マップのスケーリング係数。

`renderMode:int`[write-only]レンダリングモードを設定します。

`smoothness:Number`平滑度

`smoothnessSource:int`平滑度データソース

`smoothnessTextureScale:Number`平滑度スケーリング係数。

`specularColor:Vector4`ハイライト色

`specularTexture:BaseTexture`ハイライト。

`tilingOffset:Vector4`テクスチャのフラットとオフセット。




