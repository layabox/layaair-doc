# 	关于官网下载的DEMO如何使用

新しい例は全部テストして、検出してから新しい公式例を発表します。したがって、新しい文書が使用されている例は、一時的に公式サイトの例では確認できません。

この問題を一時的に解決するためには、新しい例を使ってソースのgitアドレスを添付します。開発者が自分で住所を設定する必要があります。

新しい例が正式に発表されたら、文書は同期して更新されます。

ここではダウンロードしたデモの使い方について説明します。

**Tip:**開発者がダウンロードを実行する例は常に一つのアイテムを使用することを提案します。それは資源の住所を何度も変えなくてもいいです。例で使用するリソースアドレスのルートディレクトリ:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)。

ここで使っています**グラフィックベース編のTransform**例をあげます[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/js/LayaAir3D_Sprite3D/TransformDemo.js%3E)を選択します。

コードを取得したら、ideで作成したサンプル項目を開きます。私たちはダウンロードしたリソースを置く。`bin/res`目次の下。

！[](img/1.png)<br/>(図1)

そして`src/script`フォルダの下に新しいファイルを作成します。名前には注意が必要です。`地址中复制`。（ここの名前はTrans form Demo.jsです。）

！[](img/2 png)<br/>(図2)

加えてこの時は私達があげます。`TransformDemo`デフォルトのエクスポートタイプを追加します。他の場所での参照に便利です。


```javascript

export default class TransformDemo
//注意注释掉本js底端的这段代码
//new TransformDemo();
```


`CameraMoveScript`このスクリプトは開発者が例を観察するために用意されたカメラ操作スクリプトです。（w前に移動して、sは後退して、aは左に移動して、dは右に移動して、左ボタンを押してマウスをドラッグして画角を調整することができます。）スクリプトを追加する必要があれば、使用を見ることができます。**カメラ？スクリプト**。そうでなければ直接コメントすればいいです。（ここで直接コメントしたカメラの台本）

！[](img/3 png)<br/>(図3)

この最後のステップでは、書き直すだけです。`Main.js`ファイルを実行できます。デモには様々な初期化が用意されていますので、直前のMainロジックを直接管理しなくても大丈夫です。修正後のMainを見てみます。


```typescript

import TransformDemo from "./script/TransformDemo"
class Main {
	constructor() {
		new TransformDemo();
	}
}
//激活启动类
new Main();
```


そしてF 5を運転すると効果が見られます。

！[](img/4 png)<br/>(図4)

##カメラのスクリプトを使う

カメラのスクリプトを使うには、モニタフォルダの下の`CameraMoveScript.js`カメラのスクリプトをコピーします。`script`ディレクトリでは、カメラスクリプトにデフォルトのエクスポートクラスを設定します。


```typescript

export default class CameraMoveScript extends Laya.Script3D
```


！[](img/5 png)<br/>(図5)

そして私たちは`TransformDemo`に取り入れる`CameraMoveScript`。


```javascript

import CameraMoveScript from "./CameraMoveScript"
export default class TransformDemo{
    //....省略
}
```


追加してからコメントを開けばテストできます。

**新しい例を追加するには、scriptフォルダの下でサンプルコードを追加し続けて、Mainで調べればいいです。**