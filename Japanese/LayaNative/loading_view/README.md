#インターフェースを読み込む

アプリケーションが起動する時、必要なhtml、js、画像をロードする必要があります。この時、ロードインターフェースを通じて進捗を表示します。LayaPlayerはプロジェクトを実行する時、デフォルトではLoadingViewインターフェイスがあります。動画再生が完了すると、ゲームに入ることができます。

​![图1](img/1.png)<br/>


##1.進捗バー制御

開発者はconfig.jsでLoadingViewの背景色、フォント色、Tipsなどを制御することができます。

config.jsの位置:

```

Android: 工程目录下的assets/scripts/config.js  
IOS:工程目录下的resources/scripts/config.js  
```


config.jsの内容は以下の通りです。開発者は自分のニーズに応じて修正できます。


```javascript

var loadingView=window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;//true代表当动画播放完毕，自动进入游戏。false为开发者手动控制
    loadingView.bgColor("#FFFFFF");//设置背景颜色
    loadingView.setFontColor("#000000");//设置字体颜色
    loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
}
```


##2.進捗バー制御例

実際の開発過程では、LoadingViewの隠蔽と表示を正確に制御することが一般的であるが、開発者はconfig.jsのようにloadingView.loadingAutoClooseの値をfalseとすることができる。
そしてプロジェクトでは、ロード完了状況に応じて、プログレスバーの表示進捗を設定します。呼び出し関数は以下の通りです。
`loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭`  

プロジェクトの疑似コードは以下の通りです。

```javascript

var nPercent=0;
var image1 = document.createElement('img');
image1.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image1.src = "a.png";

var image2 = document.createElement('img');
image2.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image2.src = "b.png";

var image3 = document.createElement('img');
image3.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image3.src = "c.png";
```


##3.開発者自身のロゴを置き換える
開発者が自分のロゴマークを使いたいなら、開発者は自分のロゴマークのlogo.pngを該当ディレクトリにコピーすればいいです。カタログは以下の通りです。


```

Android: assets/logo/logo.png
IOS:resource/logo/logo.png
```

この場合はlayaboxの動画を読み込まずに、中央にロゴo.pngを表示し、またconfig.jsの設定を通じて、背景色、フォント色、tipsを設定することができます。

**Tips:**  
*1、ロゴはpng形式のみ*
*2、開発者の自分のlogo.pngに置き換え、アニメーションの再生はサポートされていません。*
*3、開発者自身のlogo.pngを置き換えても、loadingView.loading設定によってロード進捗を設定することができます。*

##4.すべてのテキスト表示を削除します。

LayaPlayer-00.96以降のバージョンは、すべての文字の表示を削除し、tipsとロードパーセンテージを含み、config.jsを修正し、show TextInfoをfalseに設定すれば良いです。

```javascript

loadingView.showTextInfo=true;//改成false
```


##5.クールアップスケジュールを作成する

実際のプロジェクトでは、開発者が自分の好きなクールな進捗バーを作りたいなら、LayaPlayerの既存のプランは満足できないです。LayaAir-JSエンジンと必要な画像を素早くロードし、LayaAir自身でクールな進捗状況を実現することを提案します。

##6.ホワイトリスト機能

続いてLayaBoxはホワイトリストの仕組みがあります。開発者が授権やLayaBoxと連携して製品を運営するとLayaBoxのロゴを削除できます。ない場合はLayaBoxのロゴを強制的に増やす必要があります。エンジン内部には検出メカニズムがあり、ランダムに検出されていないとゲームに入れません。

##7.パッケージアプリ（テスト版）

現在LayaAir-DEではパッケージアプリ-テスト版の機能をサポートしています。**注意：開発者はやはり建設工事の方式を使って、IOSとandroidの基本知識を勉強することを提案します。**)config.jsを置換したい場合やロゴを置換する場合は、下図2、図3に示すように、

![2](img/2.png)<br/>
図(2)

ステップ2：高級オプションをクリックして、スクリプトの設定とLOGOの起動を行います。

![3](img/3.png)<br/>
図(3)
