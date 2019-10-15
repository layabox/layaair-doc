##マルチスレッドウォーカー

>本文書のワーカーはブラウザモードのHTML 5モード運転サポートに限られていますが、LayaNativeパッケージAPP案ではworkerはサポートされていません。

従来の意味では、ブラウザは単一スレッドであり、アプリケーション内のすべてのスクリプトは、単一のUIスレッドで一緒に実行されるように強制される。ドキュメントオブジェクトモデル（DOM）イベントやsetTimeoutなどのAPIを使用することにより、複数のタスクが同時に実行されている仮想画像を作成することができますが、密集型タスクを計算するだけで、ユーザは急転直下を体験することができます。httml 5でworkerの機能を導入しました。Web Workerを使うことで、ブラウザのバックグラウンドでJavaScriptを実行できます。ブラウザ自体のスレッドを占有しません。Web Workerは、アプリケーションの全体的な性能を向上させ、ユーザー体験を向上させることができる。スレッドはユーザインタフェースと干渉することなくタスクを実行することができる。

###原生ウォーカー

webウォーカーは、専用スレッドdedicated webウォーカーと、共有スレッドshared webウォーカーの2種類に分けられます。Dedicated web workerは現在のページの閉鎖に伴って終了します。これはDedicated web workerがページアクセスのみを作成することを意味します。これに対応するShared web workerは、複数のページにアクセスすることができる。しかし、web workerには制限があります。すべてのインターフェースと方法が使えるわけではありません。

-Web WorkカーがDOMノードにアクセスできません。

-Web Workカーはグローバル変数またはグローバル関数にアクセスできません。

-Web Workカーはalert（）やconfirmなどの関数を呼び出すことができません。

-Web Workカーはwindow、documentなどのブラウザのグローバル変数にアクセスできません。


  [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)ページはワーカーがサポートするグローバル関数のリストを提供します。開発者は自分でその方法を見ることができます。

####方法の概要

#####構造関数Workカー()

このコンストラクタは、指定されたURLにあるスクリプトを実行するウェブワーカーを作成します。スクリプトは従う必要があります[同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)。

#####postMessage():

workerの内部作用領域にメッセージを送る。この方法は、ワーカーに渡すデータという別のパラメータを受信する。データは任意の値でもいいです。[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)アルゴリズムによって処理されたJavaScriptオブジェクトは、言い換えれば、循環参照を含むことができる。

###### #パラメータ

-aMessage

workerに送信されるオブジェクトは、onmessage処理関数に伝達されるイベントオブジェクトのdataフィールドに含まれる。任意の値や経過を伝えることができます。[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)アルゴリズムによって処理されたJavaScriptオブジェクトは、循環参照を含むことができる。

-トランスファーリスト

オプションのオブジェクト配列は、それらの所有権を譲渡するために使用されます。オブジェクトの所有権が譲渡された場合、元のコンテキストでは使用できなくなり、転送されたウォーカー内でのみ利用できます。

#####terminate()

直ちにウォーカーを終了します。この方法はワーカーに何の完成操作の機会も与えません。すぐに停止します。



###属性

124 Property Type Description|
|------------------------------------------------------------------------------|
𞓜`onmessage`|[`EventListener`」（https://developer.mozlla.org/zh-CSN/docs/Web/API/EventListener）イベントリスニング関数は、毎回持っています。`message属性的MessageEvent`ワーカーから泡が出たらこの関数を実行します。事件の`data`プロパティにメッセージの内容が保存されています。𞓜
𞓜`onerror`|[`EventListener`」（https://developer.mozila.org/zh-CSN/docs/Web/API/EventListener）イベントリスニング関数は、各タイプが`error`の`ErrorEvent 从 worker 中冒泡出来时就会执行该函数。`𞓜

次は原生jsでどうやって使うか見てみます。

新しいjsファイルをindex.htmlに入れます。コードは以下の通りです


```typescript

var myWorker = new Worker("my_task.js");
myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```


mymymutask.jsファイルを新規作成しました。コードは以下の通りです。


```typescript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


この例はワーカーでファイルをロードし、ロードを完了したらメインプロセスに転送します。この例を実行すると、ブラウザコントロールでデータが出力されるのを見ることができます。

`var myWorker = new Worker("my_task.js")`workerを具体化して、jsファイルを転送します。`myWorker.postMessage("start")`ウォーカースレッドの起動を通知します。

`self.addEventListener('message',xxx)`メインスレッドから通知されたメッセージを傍受する。

`self.postMessage(data);`メインスレッドにデータを送信します。

注意：web workerはファイルプロトコルをサポートしていないので、直接開くことはできません。開発者はIDE内蔵のサーバーに協力して、ウェブサイトを通じて実行しても効果が見られます。コンソールを開くと、データが印刷されていることが分かります。



###Layaでの応用

Layaの内部にworkerをカプセル化し、デコード画像のカートン現象を解決し、開発者はスイッチを入れてもいいし、ユーザー定義のworkerもできます。プロジェクトの中でcpuを消費するところをそれぞれ紹介します。

新しいプロジェクトを作って、表示しやすくするために、私達はuiプロジェクトを新築します。簡単な呼び出しインターフェースは以下の通りです。


```typescript

//初始化引擎
Laya.init(600,400,Laya.WebGL);
//设置Laya提供的worker.js路径
Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启worker线程
Laya.WorkerLoader.enable = true;
//加载引擎需要的资源
Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,onLoaded));

function onLoaded(){
    //实例UI界面
    var testView = ui.test.TestPageUI();
    Laya.stage.addChild(testView);
}
```




 `WorkerLoader.workerPath = "libs/worker.js";`worker.jsのパスを設定します。このworker.jsはLayaの公式から提供されたものです。彼を私達が設定したパスにコピーしました。このjsはLayaのエンジンライブラリの中にあります。ここで設定したのはlibsの下です。

`WorkerLoader.enable = true;`ウォーカーモードをオンにして復号画像をロードし、メインスレッド復号の圧力を大きく解放します。

上記の方法は公式の復号方法です。私達はワードローカーをカスタマイズして、プロジェクトの中のcpuを消費するところを最適化することもできます。簡単な例を使って、使い方を説明します。教程の冒頭のjsスクリプトを移植することができます。


```typescript

//初始化引擎
Laya.init(600,400,Laya.WebGL);
var worker = Laya.Browser.window.Worker("my_task.js");
worker.onmessage = function(oEvent){
    console.log("Called back by the worker!\n");
};
worker.postMessage("start"); // start the worker.
```


mycautask.jsのコードはやはりファイルをロードします。コードは以下の通りです


```javascript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


運転コードをコンパイルして、操作台からcomp.jsonをロードするデータが出力されます。

まとめ：web worker私達は一般的に大きなファイルを解析してロードします。例えば、大きいjsonファイルは時間がかかります。あるいは、即時にロードする必要がないいくつかのリソースはバックグラウンドスレッドに入れて完成します。プロジェクトの流暢性を高める。ユーザー体験を高める。

##-詳細`Web Workers`を参照してください[W3C的xhr 标准](https://www.w3.org/TR/workers/); 详细的api和介绍参考[这里](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
を選択します。[workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)ページはワーカーがサポートするグローバル関数のリストを提供します。