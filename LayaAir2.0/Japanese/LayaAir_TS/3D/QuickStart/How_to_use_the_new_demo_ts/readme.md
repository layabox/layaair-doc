#公式サイトからダウンロードしたDEMOについてどう使いますか？

新しい例は全部テストして、検出してから新しい公式例を発表します。したがって、新しい文書が使用されている例は、一時的に公式サイトの例では確認できません。

この問題を一時的に解決するためには、新しい例を使ってソースのgitアドレスを添付します。開発者が自分で住所を設定する必要があります。

新しい例が正式に発表されたら、文書は同期して更新されます。

ここではダウンロードしたデモの使い方について説明します。

**Tip:**開発者がダウンロードを実行する例は常に一つのアイテムを使用することを提案します。それは資源の住所を何度も変えなくてもいいです。例で使用するリソースアドレスのルートディレクトリ:[资源](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/tree/master/h5/res/threeDimen%3E)。

ここで使っています**グラフィックベース編のTransform**例をあげます[地址](http://localhost/LayaAir2_Auto/%3Chttps://github.com/layabox/layaair-demo/blob/master/h5/3d/ts/LayaAir3D_Sprite3D/TransformDemo.ts%3E)を選択します。

コードを取得したら、ideで作成したサンプル項目を開きます。私たちはダウンロードしたリソースを置く。`bin/res`目次の下。

！[](img/1.png)<br/>(図1)

そして`src/script`フォルダの下に新しいファイルを作成します。名前には注意が必要です。**アドレスにコピー**。（ここの名前はTrans form Demo.ts）

！[](img/2 png)<br/>(図2)

コピーしたコードをコピーします。`git`取得したファイルをクローンしてそのままフォルダの下に置くことができます。当然この時には多くの新聞の誤報があります。

先にTrans formDemoにデフォルトのエクスポートを設定します。


```typescript

export default class TransformDemo
    
    ///同时需要注释掉最顶层的
    // new TransformDemo();
```


直したら、まだ間違いがあります。

！[](img/3 png)<br/>(図3)

簡単な処理方法はこの行と図4の行を直接注釈して実行することができます。このスクリプトはカメラ移動スクリプトであり、開放者が様々な角度から観察しやすい例である。（w前進移動、s後退移動、aは左に移動、dは右に移動、マウスの左ボタンはドラッグで画角を調整できます）。

！[](img/4 png)<br/>(図4)

あるいは私達はcomonフォルダの下から見つけます。`CameraMoveScript.ts`コピーします`scrpit/common`ファイルの下。

！[](img/5 png)<br/>(図)

この最後に、書き換えだけが必要です。`Main.ts`ファイルを実行できます。デモには様々な初期化が用意されていますので、直前のMainロジックを直接管理しなくても大丈夫です。修正後のMainを見てみます。


```typescript

import TransformDemo from "./script/TransformDemo";
class Main {
	constructor() {
		new TransformDemo();
	}

}
//激活启动类
new Main();
```


そしてF 5を運転すると効果が見られます。

！[](img/6.png)<br/>(図6)

**新しい例を追加するには、scriptフォルダの下でサンプルコードを追加し続けて、Mainで調べればいいです。**