# 纹理的循环模式

###### *version :2.1.0   Update:2019-5-25*

テクスチャの循環パターン（繰り返しまたはクランプ）。LayaAir 3 D対応`WARPMODE_CLAMP`テクスチャのエッジ張りと`WARPMODE_REPEAT`テクスチャを2つのパターンで並べ替えます。LayaAir 3 Dではデフォルトで使用します。`Repeat`モード

なお、例のcubeモデルは、自分で書き換えた箱mesh作成方法を使用しています。

サイクルモードを設定する前の効果図:

！[](img/1.png)<br/>(図1)


```typescript

//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = Laya.BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = Laya.BaseTexture.WARPMODE_REPEAT;
```


設定後（図2）：

！[](img/2 png)<br/>(図2)

