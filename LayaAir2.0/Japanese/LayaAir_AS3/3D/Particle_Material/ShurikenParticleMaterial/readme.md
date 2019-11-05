#Shuriken Partice Materialの材質は詳しく説明します。

###### *version :2.1.0beta   Update:2019-5-14*

ShurikeenPartcle Material粒子の材質は、すべての粒子がこの材質を使用しています。エクスポート時には、すべての粒子が強制的に修正されます。

####主な属性と方法の詳細：

>属性

`renderMode:int`[write-only]レンダリングモードを設定します。

`color:Vector4`色

`tilingOffset:Vector4`テクスチャフラットとオフセットを取得します。

`texture:BaseTexture`拡散反射板

`depthWrite:Boolean`深さを書き込みますか？

`cull:int`取り除く方法。

`blend:int`ハイブリッド方式

`blendSrc:int`混合源

`blendDst:int`混合目標

`depthTest:int`深さテスト方式。

####効果のプレビュー:

([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Particle3D&name=Particle_BurningGround))

！[](img/1.gif)<br/>(図1)

