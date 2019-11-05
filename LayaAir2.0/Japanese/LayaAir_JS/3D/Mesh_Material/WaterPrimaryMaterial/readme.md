# WaterPrimaryMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

WaterPrimary Materialは水のジュニア素材です。法線スタンプで波紋の効果を実現します。

#####主な属性と方法

>属性

`horizonColor:Vector4`地平線の色、水面の反射色。

`mainTexture:BaseTexture`メインスタンプ、水面の色スタンプ。

`normalTexture:BaseTexture`法線図解、水面波紋の法線図解。

`waveScale:Number`変動スケーリング係数

`waveSpeed:Vector4`変動速度

#####材質の作成と使用

水ジュニアの素材はユニティから調合してからエクスポートして使うのがオススメです。([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=WaterPrimaryMaterialDemo))

！[](img/1.gif)<br/>(図1)

