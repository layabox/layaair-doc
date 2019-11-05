#LayaAirと原生Dom

開発プロジェクトでは、開発者がdom元素のサポートに遭遇するのは避けられないが、LayaAirではサポートされていないか、またはサポートされていないかの不備があります。今回は開発で出会ったテクニックを見てみます。

###LayaAirのSVG

svgとは何ですか？ほとんどの開発者はこの名詞を聞いたことがあるか、またはw 3 cに規定されたベクトル画像記述フォーマットであることを知っているかもしれない。svgに関するいくつかの定義と歴史についてはここでは述べません。興味のある開発者は参考にしてもいいです。[这里](https://ldc.layabox.com/doc/?nav=zh-as-3-4-1)。しかし、プロジェクトで本当に使うところは少ないです。しかし、svgの強大さは無視できないもので、簡単な図形があります。テキストは数行で説明できます。ネットのロードは必要ありません。例えば、豊富な芸術文字、例えば奇形の図形、例えば文字の透視効果など、プログラムで実現すれば、次のような困難がたくさんあります。

![1](img/1.png)<br/>

もしあなたのプロジェクトにこのような文字があったら、どう処理しますか？たぶん私たちが思い付いたのは美術の写真です。もっと簡単な方法がありますか？ここではsvgで処理することを選択します。dom元素の中でdiv+cssスタイルでこの効果を表示するのが最も簡単で速い方法であることを知っています。この効果をcss様式によって示します。簡単なシナリオを見て、どうやってこの効果を実現しますか？


```javascript

var data = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>I</em> like ' + 
             '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
             'cheese</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';
var DOMURL = window.URL || window.webkitURL || window;
var img = new Image();
var svg = new Blob([data], {type: 'image/svg+xml'});
var url = DOMURL.createObjectURL(svg);
img.src = url;
img.style.position ="absolute";
img.style.zIndex = 99999
document.body.appendChild(img);
```


上のコードはどうやって実行しますか？Googleのブラウザーを開けて、勝手に空白のホームページを開けて、F 12、上のコードをコンソールに貼り付けて、車に戻って、上のスクリーンショットの効果が見られます。または新規のhtmlコードを貼り付けてブラウザで開きます。簡単ですか？そして、表示されているテキストは任意に変更できます。開発者は効果を変えてみてもいいです。このコードを簡単に紹介します。ここでdataはsvgのデータフォーマットであり、これはsvgの定義と説明を参照することができる。


```javascript

<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">
//这里是重点，文字的效果我们是通过svg支持的css样式来设置 text-shadow设置的是文字的css样式效果，假如开发者想改变文字的样式，可以修改style即可。
```


上はJavaScriptの中に原生のdom元素で表示されていますが、ゲームで使いたいならどうすればいいですか？これは実は簡単です。今はもう既に画面に表示されていますが、これからはどのようにプロジェクトに適用し、これを表示しますか？私たちは新しいプロジェクトを作ります。コードは以下の通りです。


```typescript

//初始化引擎
Laya.init(600, 400, Laya.WebGL);
Laya.stage.bgColor = "#ffcccc";
var data = "data:image/svg+xml," + '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
    '<foreignObject width="100%" height="100%">' +
    '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
    '<em>I</em> like ' +
    '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
    'cheese</span>' +
    '</div>' +
    '</foreignObject>' +
    '</svg>';
var sp = new Laya.Sprite();
sp.loadImage(data, 0, 0, 200, 200);
Laya.stage.addChild(sp);
```


dataを通じてurlとしてloadImageに渡す方法はエンジンがロードしてデコードしてくれます。この方法のloadImageのパラメータは、受信アドレスのurlだけでなく、base 64とsvgのフォーマットも受信する。上のコードをコンパイルして実行します。下の図の効果を見ます。

![2](img/2.png)<br/>

総括：上のコードは私達に良い啓発を与えてくれます。プロジェクトの中で私達の特殊な芸術文字はこの方法を使ってもっと簡単で便利です。開発者は自分でいくつかのより美しい効果を探すことができます。例えば、3 Dの透視効果、図文の混成、影、倒影などです。この方法はネットのブロードバンドを減らすだけではなく、もっと重要なのは便利です。スタイルを設定して、アイテムのエクスポートは適用できます。上の方法でビットマップのフォントを代用すれば、より効率的に速くなりますか？

関連リンク:

[https://codepen.io/pen/；](https://codepen.io/pen/%EF%BC%9B)

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas；](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas%EF%BC%9B)



###LayaAirのDom元素Image

html 5では、イメージタグの機能が強いので、ここではその特性を多く紹介したいとは思いません。ここでは簡単なヒット常用形式を紹介します。

####二次元コード

一般的な機能を比較すると、現在の二次元コードアドレスがプロジェクトに表示されます。ユーザー長押しで識別できます。ここで二次元コードを生成して、第三者のjsクラスを介して二次元コードを生成します。クラスコードはGitHubでダウンロードできます。ここで使うのはこれです。[地址](https://github.com/davidshimjs/qrcodejs)。

新規プロジェクトを作成して、ダウンロードのqrceode.jsをindex.に追加します。qrceodeのアプリを参考にしてください。[地址](https://github.com/davidshimjs/qrcodejs)。具体的な論理コードは以下の通りです。


```typescript

//初始化引擎
Laya.init(600,400);
Laya.stage.bgColor = "#ffcccc";
var div = Laya.Browser.document.createElement("div");
this.qrcode = new Laya.Browser.window.QRCode(div,{
    width:100,
    height:100
});
var url = "http://layabox.com/";
this.qrcode.makeCode(url);
Laya.stage.once("click",this,clickHandler);
this.qrcodeSp = new Laya.Sprite();
Laya.stage.addChild(this.qrcodeSp);

function clickHandler(){
    var url = this.qrcode._oDrawing._elImage.src;//获取，注意这里是异步的，开发者可以加个延时在获取。
    this.qrcodeSp.loadImage(url,0,0,100,100);
}
```


上のコードをコンパイルして実行し、ステージをクリックすると、二次元コードがすでにステージに表示されています。携帯で掃き落とすことができます。携帯は公式サイトにジャンプしていることが分かりました。**注意：このとき生成された二次元コードは、WeChatやブラウザで長押しすると何の反応もありません。**ですから、ポップアップで認識するオプションを長押しするには、イメージタグを使うしかないです。この開発者は自分で拡張できます。



###LayaAirのDom元素video

####動画リスト

httml 5時代にはビデオ再生は基本的にvideoタグで放送されていました。動画再生は経験が豊富でなければ、成熟したプラグインで実現するのが一番いいです。今流行っているのは[video.js](https://github.com/videojs/video.js)を選択します。[hls.js](https://github.com/video-dev/hls.js)を選択します。[plyr.js](https://github.com/Selz/plyr)。互換性も経験も性能も優れています。これらのプラグインの公式はデモを提供しています。たとえば[https://plyr.io/，http://video-dev.github.io/hls.js/demo/，http://codepen.io/sampotts/pen/JKEMqB。](https://plyr.io/%EF%BC%8Chttp://video-dev.github.io/hls.js/demo/%EF%BC%8Chttp://codepen.io/sampotts/pen/JKEMqB%E3%80%82)

これから私たちは[Plyr + hls.js](http://codepen.io/sampotts/pen/JKEMqB)例として、LayaAirではどう書くべきかを見てみましょう。

新しいASの空き項目を作成します。同時にindex.ファイルに下記のコードを入れます。

![3](img/3.png)<br/>

`<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">`プレーヤーのスタイルファイル、

`<video preload="none" id="player" autoplay="" controls="" crossorigin=""></video>`videoタグを追加します。IDは「player」です。この後はプログラムで使います。

`<script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>`
`<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>`

これはプレーヤーが使うクラスです。開発者は生産環境で自分のプロジェクトやサーバーにダウンロードしたことを覚えています。

次はメインクラスの論理です。


```typescript

//初始化引擎
Laya.init(0, 0);
var Hls = Laya.Browser.window.Hls;//获取对Hls的引用。
var plyr = Laya.Browser.window.plyr;//获取对plyr的引用
//获取video对象，就是页面上命名为“player”的标签
var video = Laya.Browser.document.querySelector('#player');
if (Hls.isSupported()) {
    var hls = new Hls();
    //加载m3u8源
    hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });
}
plyr.setup(video);
```


コードをコンパイルして実行して、ウェブページがすでにビデオを再生することができることを発見しました。開発者がここに気づいたかもしれません。エンジンを初期化する時はこうです。

`Laya.init(0,0);//初始化引擎`;舞台との対話がないので、設定サイズは0です。ですから、ここで0に設定します。初期化しなくてもいいです。開発者項目に舞台と対話するロジックが含まれていれば、自分に合うサイズを設定することができます。

再生中に開発者はF 12でGoogleのコンソールを開き、Networkタグに切り替えて、私達のビデオはセグメントのtsファイルです。

![4](img/4.png)<br/>

再生が進むにつれて、ファイルの個数が増えていることがわかった。実はこれがベースです。[hls](https://developer.apple.com/streaming/)プロトコルの再生この技術の基本原理は、ビデオファイルまたはビデオストリームをスライス（ts）に分割し、インデックスファイル（m 3 u 8）を作成することである。より深いレベルの原理、例えばビデオ復号、ビデオフレームデータ、開発者は以下を参照することができる。

[https://developer.apple.com/streaming/。](https://developer.apple.com/streaming/%E3%80%82)

[https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource。](https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource%E3%80%82)

[https://github.com/nickdesaulniers/netfix](https://github.com/nickdesaulniers/netfix)

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

上の例はhls+plyrを使って放送します。他の方法は開発者が本教程を参考にして拡張してください。

####カメラ

httml 5のvideoはカメラブラウザのサポート度が限られています。**httpsの契約**Googleと新版のWeChatの支持度はいいです。あなたの互換性がそんなに高くないなら、カメラの機能を追加してみてもいいです。

まずmdnからの例を見てみます。

[https://mdn.github.io/webaudio-examples/stream-source-buffer/](https://mdn.github.io/webaudio-examples/stream-source-buffer/)

開発者は携帯電話やWeChatでこのアドレスを開けて、あなたの携帯電話のサポート度をテストします。

![5](img/5.png)<br/>

これはテストの接続です。プロトコルもhttpsです。開発者はカメラを呼び出す時にこの点に注意してください。自分の住所はhttpsでなければなりません。

もっと多くの資料はここを参照できます。[https://github.com/mdn/webaudio-examples.。这里的链接是mdn给出的声音和视频的例子。](https://github.com/mdn/webaudio-examples.%E3%80%82%E8%BF%99%E9%87%8C%E7%9A%84%E9%93%BE%E6%8E%A5%E6%98%AFmdn%E7%BB%99%E5%87%BA%E7%9A%84%E5%A3%B0%E9%9F%B3%E5%92%8C%E8%A7%86%E9%A2%91%E7%9A%84%E4%BE%8B%E5%AD%90%E3%80%82)

LayaAirはカメラのパッケージについてもあります。使い方を見てみます。


```typescript

//初始化引擎
Laya.init(Laya.Browser.width, Laya.Browser.height);
if (Laya.Media.supported() === false) {
    alert("当前浏览器不支持");
}
else {
    showMessage();
    var options = {
        audio: true,
        video: {
            facingMode: { exact: "environment" },    // 后置摄像头，默认值就是，不设至也可以。
            width: Laya.stage.width,
            height: Laya.stage.height
        }
    };
    Laya.Media.getMedia(options, Laya.Handler.create(this, onSuccess), Laya.Handler.create(this, onError));
}
function showMessage() {
    var tex = new Laya.Text();
    Laya.stage.addChild(tex);
    tex.text = "单击舞台播放和暂停";
    tex.color = "#ffffff";
    tex.fontSize = 100;
    tex.valign = "middle";
    tex.align = "center";
    tex.size(Laya.stage.width, Laya.stage.height);
}
function onSuccess(url) {
    this.video = new Laya.Video(Laya.stage.width, Laya.stage.height);
    this.video.load(url);
    Laya.stage.addChild(this.video);
    Laya.stage.on("click", this, onStageClick);
}
function onError(error) {
    alert(error.message);
}
function onStageClick() {
    //切换播放和暂停
    if (!this.video.paused) {
        this.video.pause();
    }
    else {
        this.video.play();
    }
}
```


上記の例をコンパイルして実行しますが、開けられないことが分かりました。これは正常です。この例を実行するには自分でhttpsのサーバーを構築します。このアドレスに対応するindex.を携帯で開きます。簡単なhttppsサーバーを作るのも簡単です。ここではLayaの命令で道具を作ればいいです。

##-まずnodeをダウンロードします。ダウンロード[https://nodejs.org/en/，进行安装。](https://nodejs.org/en/%EF%BC%8C%E8%BF%9B%E8%A1%8C%E5%AE%89%E8%A3%85%E3%80%82)インストールが完了したらcmdコマンドラインを開き、npm install-g layacmdを入力してインストールが完了するまで待つ。
-先ほどコンパイルしたindex.を見つけました。shift+右ボタンを押してここでcmdウィンドウを開けてlayacmd openを入力します。httpとhttppsの静的なサーバーを起動します。命令行によって出力された住所を携帯電話のGoogleブラウザやWeChatでこの住所を訪問します。[https://10.10.20.34:8001/index.html。](https://10.10.20.34:8001/index.html%E3%80%82)

###LayaAirのdom元素File

プロジェクト開発では、ユーザーに画像をアップロードさせる必要があるかもしれません。これはhttml 5のfileタグを借りる必要があります。**WeChatはWeChatで提供するインターフェースを使います。後の教程はWeChat教程で専門的に話します。他のブラウザにも互換性の問題があります。**を選択します。簡単な例を書きます。


```typescript

//初始化引擎
Laya.init(100, 100);
var file = Laya.Browser.document.createElement("input");
file.type = "file";
file.style.position = "absolute";
file.style.zIndex = 999;
Laya.Browser.document.body.appendChild(file);//添加到舞台
var fileReader = new Laya.Browser.window.FileReader();
file.onchange = function (e) {
    if (file.files.length) {
        fileReader.readAsDataURL(file.files[0]);
    }
};
fileReader.onload = function (evt) {
    if (Laya.Browser.window.FileReader.DONE == fileReader.readyState) {
        var sp = new Laya.Sprite();
        sp.loadImage(fileReader.result, 0, 0, 300, 300);
        Laya.stage.addChild(sp);
    }
}
```


上のコードをコンパイルして、ボタンをクリックします。写真ファイルまたはカメラを選択して写真を撮ったら、写真がもう舞台に表示されました。簡単にアルバムやカメラを呼び出すプログラムがこのように完了します。しかし、私たちはこのボタンがとても醜いことを発見しました。このボタンのスタイルはどう変えますか？これはcssスタイルで処理してください。伝統的な方法はこのボタンの透明値を0に設定し、彼と重なるボタンを押して代用することです。このような仮説で彼のスタイルを変えますが、実際にクリックしたのは彼です。ユーザーが感じられないだけです。じゃ、スタイルの変更方法を見てみます。


```typescript

//设置file样式
file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
file.type ="file";//设置类型是file类型。
file.accept="image/png";//设置文件的格式为png；
file.style.position ="absolute";
file.style.zIndex = 999;
```


以下は完全なコードを参照してください。


```typescript

//初始化引擎
Laya.init(100,100);
var skins = ["res/a.png"];
Laya.loader.load(skins,Laya.Handler.create(this,onUIAssetsLoaded));
function onUIAssetsLoaded(){
    var btn = new Laya.Button("res/a.png");
    Laya.stage.addChild(btn);

    //创建隐藏的file并且把它和按钮对齐。达到位置一致，这里我们默认在0点位置
    var file = Laya.Browser.document.createElement("input");
    //设置file样式
    file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
    file.type ="file";//设置类型是file类型。
    file.accept="image/png";//设置文件的格式为png；
    file.style.position ="absolute";
    file.style.zIndex = 999;
    Laya.Browser.document.body.appendChild(file);//添加到页面；
    var fileReader = new  Laya.Browser.window.FileReader();
    file.onchange = function(e)
    {
        if(file.files.length>0)
        {
            fileReader.readAsDataURL(file.files[0]);
        }
    };
    fileReader.onload = function(evt)
    {  
        if(Laya.Browser.window.FileReader.DONE == fileReader.readyState)
        {
            var sp = new Laya.Sprite();
            sp.loadImage(fileReader.result,0,0,100,100);
            Laya.stage.addChild(sp);
        }
    }
}
```


コードをコンパイルして実行すると、その醜いdomボタンがなくなります。私たちは自分で作ったボタンをクリックして、写真を選んで、舞台に表示します。

上記の例は原点に重ねて透明度を0に設定し、見えないように装っています。開発者は他の場所に置いてテストしてみてもいいです。本節の教程は具体的に実現されていません。fileの他のアプリについてはmdnとw 3 cを参照してください。ステージに表示される以外にも、サーバーをアップロードする操作があるかもしれません。この開発者は試してみてもいいです。

###LayaAirのdom元素scriptタグ

私達のプロジェクトのjsファイルが多くて、とても大きくて、一回のすべてのロードは流量の浪費だけではなくて、またページのカードトンをもたらして、きわめて悪いユーザーの体験を招きます。圧縮混淆方式を使うと、少し小さくなりますが、少し大きい項目では、コード量が大きくなります。また、場所のjsファイルは、最初のスクリーンローディング時に必要ではないので、適切な時にロードする必要があります。したがって、ファイルとモジュールを分割する必要があります。ファイルを分割すると、すなわち読み込みに関連します。この時はscriptタグが役に立ちます。

スクリプトのScript Srcによるリモートスクリプトのロードにより、この機能を実現することができます。scriptを設定したinnerHTMLでも実現できます。もちろん第三のevalもあります。これらの状況について、それぞれ用法を説明します。

####Src設定により実現

スクリプトの作成は、手動でページに追加することができます。コードの動的作成もできます。ここではコードの作成を例に説明します。まずコードをつけます

コードロジックは以下の通りです。


```typescript

//初始化引擎
Laya.init(500,500);
var script = Laya.Browser.document.createElement("script");
script.src = "demo1.js";
script.onload = function(){
    //加载完成函数，开始调用模块的功能。
    //new一个js中的对象
    var client = new Laya.Browser.window.Demo1();
    client.start();
}
script.onerror = function(){
    //加载错误函数
}
Laya.Browser.document.body.appendChild(script);
```


次にjsファイルを新規作成します。簡単なコードは以下の通りです。


```typescript

var Demo1 = (function () {
    function Client() {
    }
    Client.prototype.start = function () {
        // body...
        console.log("调用方法");
    };
    return Client;
})();
console.log("我被加载进来了");
```


この二つのコードを簡単に説明します。

`var script = Laya.Browser.document.createElement("script");`スクリプトタグを作成します。

`script.src = "demo1.js";`ロードするjsのパスを設定します。

`script.onload = ......`和`script.onerror =....`それぞれがロード完了とロード失敗のコールバック関数です。

`Laya.Browser.document.body.appendChild(script);`作成したスクリプトラベルをページに追加します。

`var client = new Laya.Browser.window.Demo1();`js声明のそのクラスを実装します。

`client.start();`インスタンスの関数を呼び出します。

上のコードをコンパイルして実行します。Googleのコンソールを開けば、出力が見えます。

**「ロードされました」**

**「呼び出し方法」**

####scriptのinnerHTMLで設定します。

innerHTMLを設定するということは、jsのテキストフォーマットをinners HTMLに値付けするということです。これはファイルをロードするフォーマットによって、遠端にロードされたファイルをテキストの内容に変換して、ラベルに値を付けることができます。次の例を見ます。


```typescript

//初始化引擎
Laya.init(500,500);
var httpreq = new Laya.HttpRequest();
httpreq.on(Laya.Event.COMPLETE,this,completeHandler);
httpreq.on(Laya.Event.ERROR,this,errorHandler);
httpreq.send("demo1.js");
function completeHandler(e){
    var script = Laya.Browser.document.createElement("script");
    Laya.Browser.document.body.appendChild(script);
    script.innerHTML = e;
    var client = new Laya.Browser.window.Demo1();
    client.start();
}
function errorHandler(e){

}
```


上のコードをコンパイルして実行すると、効果はSrcでロードされるのと同じです。この例はHttpRequestを使ってファイルをロードし、ロードされたコンテンツをscript.innersHTMLに値付けします。ラベルは自分で解析してjsを実行します。もちろん、この例はHttpRequestでロードされています。開発者はLaya.loader.loadの方法でロードすることもできます。

####eval方法でロードする


```typescript

function completeHandler(e){
    Laya.Browser.window.eval(e);
    var client = new Laya.Browser.window.Demo1();
    client.start();
}
```


前の荷重完了関数を上のものに変えます。`Laya.Browser.window.eval(e);`コンパイルしてコンソールを開くと、効果は同じです。これはscriptタグとはもう関係ないです。

まとめ：上記の3つの一般的な方法は、jsファイルを動的にロードすることができます。3つの方法は何が違いますか？

-scriptタグsrcの方式でロードされているのはjsファイルで、このjsファイルは現在のページとは異なるソース、つまりドメインをまたいでロードすることができます。

-script.inners HTMLの方法で受信したのはjsファイルのテキストフォーマットで、XMLHttpRequest方式でロードしていますので、ファイルはドメインをまたぐことができません。あるいはロードが許可されています。このjsファイルはカスタムフォーマットができます。例えば、暗号化したり、プラグインしたりして、バイナリ形式でロードして、プログラム中で本物のjsに復号します。

-evalの方法とscript.innerHTMLの方式は大体同じです。ロードした内容も自由です。ただし、エヴァはこのような方式を勧めません。エヴァはすぐに廃棄される方法です。性能や安全性の面では使用を勧められません。具体的な原因はmdnの説明を見てください。


  [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval%E3%80%82)


  **実はロードの方式は私達はまたworkerの中に置いていくことができて、このように更にページのレンダリングの圧力とカートンの現象を減らしました。開発者はウォーカーの教程を読んで発散できます。**

###LayaAirのdom元素音

httml 5の音と言えば、開発者が最初に考えたのはaudioタグかもしれませんが、audioタグは開発プロジェクトにとって非常に人気があります。今日は別のインターフェースです。HTML 5はJavaScriptプログラミング用のAudio APIを提供してくれます。コードの中で元のオーディオストリームデータを直接操作して、任意の加工を再構築します。オーディオのアプリ、w 3 cは十分提供してくれました。[接口](https://www.w3.org/TR/webaudio/)を選択します[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)上で紹介したのも比較的に詳しいです。完璧なブラウザをサポートする上で、音声のアプリで視覚効果が非常に豊富です。音声のアプリが非常に豊富なので、ここではれんがを投げて玉を引くことにします。使い方を簡単に紹介します。オーディオの合成、ミックス、サウンド効果、オーディオデータはスペクトル分析を行います。オーディオにフィルターをかけます。例えば、音色を上げるなどの開発者はmdnまたは関連資料を調べられます。

まずmdnの例を見ます。この例では、1つの2秒のバッファを作成し、それをホワイトノイズで満たしてから［`AudioBufferSourceNode`」（https://developer.mozila.org/zh-CSN/docs/Web/API/AudioBufferSourceNode）で再生します。コメントにはその機能が説明されています。


```javascript

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Stereo
var channels = 2;
// Create an empty two-second stereo buffer at the
// sample rate of the AudioContext
var frameCount = audioCtx.sampleRate * 2.0;
var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
window.onclick = function() {
  // Fill the buffer with white noise;
  //just random values between -1.0 and 1.0
  for (var channel = 0; channel < channels; channel++) {
   // This gives us the actual ArrayBuffer that contains the data
   var nowBuffering = myArrayBuffer.getChannelData(channel);
   for (var i = 0; i < frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     nowBuffering[i] = Math.random() * 2 - 1;
   }
  }
  // Get an AudioBufferSourceNode.
  // This is the AudioNode to use when we want to play an AudioBuffer
  var source = audioCtx.createBufferSource();
  // set the buffer in the AudioBufferSourceNode
  source.buffer = myArrayBuffer;
  // connect the AudioBufferSourceNode to the
  // destination so we can hear the sound
  source.connect(audioCtx.destination);
  // start the source playing
  source.start();
}
```


上のjsコードを実行して、ページをクリックすると音が聞こえます。LayaAirではどう書きますか？


```typescript

//初始化引擎
Laya.init(500, 500);
Laya.stage.bgColor = "#ff0000";
var audioCtx = new (Laya.Browser.window.AudioContext || Laya.Browser.window.webkitAudioContext)();
//Stereo
var channels = 2;
// Create an empty two-second stereo buffer at the
// sample rate of the AudioContext
var frameCount = audioCtx.sampleRate * 2.0;
var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
Laya.stage.on(Laya.Event.CLICK, this, function () {
    // Fill the buffer with white noise;
    //just random values between -1.0 and 1.0
    for (var channel = 0; channel < channels; channel++) {
        // This gives us the actual ArrayBuffer that contains the data
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        for (var i = 0; i < frameCount; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
            nowBuffering[i] = Math.random() * 2 - 1;
        }
    }
    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();
    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;
    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);
    // start the source playing
    source.start();
});
```


上記の例をコンパイルして実行します。ステージをクリックすると、音が聞こえます。この例は簡単です。メモリの中に音を作るということです。外部にロードされているのはどうすればいいですか？

以下の例については外部から音声ファイルをロードします。ついでに音のスペクトルをかきます。


```typescript

//初始化引擎
Laya.init(500, 500);
AudioContext = Laya.Browser.window.AudioContext || Laya.Browser.window.webkitAudioContext;
this.audioContext = new AudioContext();
this.analyser = this.audioContext.createAnalyser();
this.analyser.fftSize = 256;
Laya.stage.once(Laya.Event.CLICK, this, clickHandler);
function clickHandler(e) {
    var http = new Laya.HttpRequest();
    http.on(Laya.Event.COMPLETE, this, completeHandler);
    http.send("res/3.mp3", "", "get", Laya.Loader.BUFFER);
}
function completeHandler(e) {
    this.audioContext.decodeAudioData(e, decodeAudioData.bind(this));
}
function decodeAudioData(buffer) {
    this.audioBufferSourceNode = this.audioContext.createBufferSource();
    this.audioBufferSourceNode.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.audioBufferSourceNode.buffer = buffer;
    this.audioBufferSourceNode.start(0);
    Laya.timer.loop(1, this, drawHandler);
}
function drawHandler() {
    Laya.stage.graphics.clear();
    var dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    var step = Math.round(dataArray.length / 60);
    for (var i = 0; i < 40; i++) {
        var energy = (dataArray[step * i] / 256.0) * 50;
        for (var j = 0; j < energy; j++) {
            Laya.stage.graphics.drawLine(20 * i + 2, 200 + 4 * j, 20 * (i + 1) - 2, 200 + 4 * j, "#ff0000", 1);
            Laya.stage.graphics.drawLine(20 * i + 2, 200 - 4 * j, 20 * (i + 1) - 2, 200 - 4 * j, "#ffff00", 1);
        }
        Laya.stage.graphics.drawLine(20 * i + 2, 200, 20 * (i + 1) - 2, 200, "#ff0000", 1);
    }
}
```


上記のアイテムをコンパイルして実行し、ステージをクリックすると、音のスペクトルが表示されます。下図のように：

![6](img/6.gif)<br/>

まとめ：webの音声機能がますます強くなることが見られます。もしいくつかのローエンドマシンの互換性を考慮しないなら、ウェブのプレーヤーを作ることができます。ここではスペクトルの効果を作り出しただけです。開発者はミキサーを試したり、音にフィルターをかけたりします。関連アプリはmdnを調べられます。

###LayaAirのdom元素iframe

サードパーティのいくつかのウェブサイトを挿入する時、私達は普通iframeを使って、甚だしきに至っては3つのルートは基本的にiframeで一つのアプリケーションを埋め込みます。私たちのプロジェクトでもiframeを使う場合があります。以下の例はプロジェクトにiframeを適用したプレゼンテーションです。

コードは以下の通りです。


```typescript

//初始化引擎
Laya.init(500, 500);
Laya.stage.once(Laya.Event.CLICK, this, clickHandler);
function clickHandler() {
    var iframe = Laya.Browser.document.createElement("iframe");
    iframe.style.position = "absolute";//设置布局定位。这个不能少。
    iframe.style.zIndex = 100;//设置层级
    iframe.style.left = "100px";
    iframe.style.top = "100px";
    iframe.src = "http://ask.layabox.com/";
    Laya.Browser.document.body.appendChild(iframe);
}
```


この中で開発者に注意したいのは、位置付けとレベル設定を覚えておくことです。多くの開発者がうっかりしてゲーム層の下に来て見えなくなりました。