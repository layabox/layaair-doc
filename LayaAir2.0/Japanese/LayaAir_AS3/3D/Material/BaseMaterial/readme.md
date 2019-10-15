#BaseMaterialベース素材

###### *version :2.1.0beta   Update:2019-5-14*

`BaseMaterial`すべての材質の親で、彼はいくつかのよく使う属性を定義しました。例えば、いくつかのよく使うレンダリングモード、対応するローディングインターフェース、またよく使うレンダリングモードがあります。

！[](img/1.png)<br/>(図1)

一般的なレンダリングモードは、＊＊RENDERQUEUEUEUHUOPAQUEである。**不透明**RENDERQUEUEST**透明裁断、**RENDERQUEUHUEUEULULUESANSPARENT＊透明、この3つのモード。

>サブ素材の`rendermode`インターフェースは、親クラスのBaseMaterialレンダリングモードのパッケージと実装だけで、開発者自身が対応するAPIインターフェースを確認する必要があります。

材質の基礎機能を説明しました。後でいろいろな常用の材質を詳しく紹介します。
