# 图片与二进制

ページ遊びの時代には、資源の盗掘を防ぐために、絵などの資源を暗号化するのが一般的です。暗号化とは、リソースの本来の記憶バイトを混乱させたり、何かを挿入したりすることです。しかし、httml 5時代になると、ほとんどが直接に読み込まれている写真なのに、なぜページ遊びの時代とは違っているのですか？httml 5はバイナリピクチャを復号できませんか？もちろんです。暗号化を行わない理由は、主に私たちのプロジェクトのソースコードがブラウザの端に完全に暴露されています。しかし開発者のこの方面の需要を満たすために、私達は簡単に言って、html 5のはどのようにバイナリのピクチャーの操作を行います。

###言わざるを得ないXMLHttp Request

ファイルを読み込むというと、言わざるを得ないのは`XMLHttpRequest`ここで簡単に紹介します。詳しい教程はここに移動してください。`HTTPRequest`章節XMLHttpRequestは、JavaScriptがHTTP（S）通信を行うことができるように、ブラウザのインタフェースです。これは私たちがよく取り上げているAjaxの核心です。XMLHttpRequestの基準はLevel 1とLevel 2に分けられています。ここで私達が話しているのはhtml 5の範囲です。だから、Level 1は私達にはあまり意味がありません。ここでhtml 4にまとめました。html 5は主にLevel 2に注目しています。開発者が理解しやすいように、この二つの基準を比較します。

**レベルの主な欠点：**

##−同一ソースポリシーの制限を受けて、ドメイン間の要求を送信できない。バイナリファイル（画像、ビデオ、オーディオなど）を送信できません。テキストデータのみ送信できます。
-データの送信と取得中は、進捗情報をリアルタイムで取得できず、完了したかどうかを判断するしかない。

**レベル2はレベルに対して改善されたところ：**

##-ドメイン間要求を送信することができ、サーバーが許可している場合。バイナリデータの送信と受信をサポートします。
##-フォームデータの送信をサポートするformDataオブジェクトを追加します。データの送信と取得は、進捗情報を取得することができます。
-要求のタイムアウト時間を設定できます。

上記の比較の中で私達が最も注目している点は**バイナリの送信と受信をサポートします。**これは重大なブレークスルーです。これは私たちにバイナリ画像をリモートでロードすることが可能になりました。

###読み込み方法

どうやってロードするかについては、ここでまず原生から始めて、その後LayaAirエンジンに移行します。このように開発者はその意味を理解できます。バイナリストリームでロードします。ここではXMLtpRequestバイナリストリームの方式でロードします。XMLHttpRequestの操作についてはここでは説明しません。単独の章ドキュメントに置いて説明します。まずバイナリでロードしてみます。ここではまずjsスクリプトで操作します。コードは以下の通りです


```JavaScript

var xhr = new XMLHttpRequest();
xhr.open("get", "res/atlas/comp.png", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    if (this.status == 200) {
        var blob = new Blob([this.response], { type: "image/png" });
        var img = document.createElement("img");
        img.onload = function (e) {
            window.URL.revokeObjectURL(img.src); // 清除释放;
        };
        img.src = window.URL.createObjectURL(blob);
        document.body.appendChild(img);
    }
}
xhr.send();
```


上記の方法は、ブラウザ自身が提供した方法で、バイナリを画像に変換し、バイナリを画像に変換する方法です。例えば、バイナリをロードしてbase 64に復号して、値をあなたのために割り当てたり、バイナリデータをcanvasで画像を描き、toData URLをあなたのsrcに割り当てたりする方法があります。方法が多いです。ここでは一番簡単で効果的な方法で写真を変えます。

画像のロードが完了したら、ZMLttpRequestオブジェクトxhrを実装します。`responseType`属性を設定します`arraybuffer`を選択します。`blob`をクリックして、ラベルを作成します。`window.URL.createObjectURL(blob)`このパラメータオブジェクトに向けたURLを作成し、作成したオブジェクトをウェブページのbodyに追加して表示します。このコードをindex.htmlファイルに埋め込み、実行するとウェブページが正常に表示されています。

###Layaではどう使いますか？

上記の簡単な例はjsスクリプトで書きましたが、プロジェクトではdom要素はどう使いますか？これから説明します。

新しい空のプロジェクトを作成して、下記のコードを作成します。


```javascript

//初始化引擎
Laya.init(1136,640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/monkey2.png","","get","arraybuffer");
function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
  	var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(url){

}
```


二つ目はテクスチャを描画して表示できます。


```JavaScript

function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台 //用loader来加载url
    Laya.loader.load(url,Laya.Handler.create(this,showImg,[url]),null,Laya.Loader.IMAGE);
}
function errorHandler(url){
    var t = new Laya.loader.getRes(url);
    var ape = new Laya.Sprite();
    ape.graphics.drawTexture(t,0,0);
    Laya.stage.addChild(ape);
    ape.pos(200,0);
}
```


第三のテクスチャを直接作成して表示します。


```javascript

function completeHandler(data){
    //加载完成返回的data是arraybuffer
    //......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片前面写入了四个字节的数据
    //......解密逻辑开始处理数据
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([byte.buffer],{type:"image/png"});
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象
    var htmlImg = Laya.HTMLImage.create(url);//这里创建HTMLImage，这里要用HTMLImage.create
    htmlImg.onload = function(){
        var t = new Laya.Texture(htmlImg);
        var ape = new Laya.Sprite();
        ape.graphics.drawTexture(t,0,0);
        Laya.stage.addChild(ape);
        ape.pos(200,0);
    }
}
```


以上の方法はバイナリの処理方法ですが、実は長距離の画像資源をbase 64＋データに処理して、先端ロードが完了して、ドーピングデータを直接解読します。次に私たちはその一つの方法で舞台にロードして表示します。


```javascript

//初始化引擎
Laya.init(1336, 640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/data.data","","get","text");

function completeHandler(data){
    //......加载完成，把base64字符串的图片数据提取出来；
    //......提取base64字符串；
    //......假设得到的数据是data；
    var sp = new Laya.Sprite();
    sp.loadImage(data);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(e){

}
```


以上の例は全部使っています。`HttpRequest`を選択します。`Laya.loader.load`メソッドをロードします。`Laya.loader.load`詳細な使用は関連教程文書に移動してください。ここでは述べていません。

上の例を使っています。`HttpRequest`単スレッドのローディングと、httml 5にはマルチスレッドがありますが、ページのキャノン応答を防止するために、ユーザー体験を向上させるために、ワーカーを使ってローディングすることができます。