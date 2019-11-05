#WeChatオープンデータドメイン

>langage：アクションScript 3

##一、WeChatオープンデータドメイン展示コンポーネント

WeChatオープンデータドメインの使用はずっと面倒なことです。特殊コードが必要です。また、性能のボトルネックです。また、マウスイベントの不具合が多発しています。LayaAir 2.0から、Laya公式はWeChatオープンドメインUIコンポーネントを提供しています。これらの問題を解決して、より簡単に使用できます。性能がより高いです。

オープンデータドメインコンポーネントは、エンジニアリングツリー内のBaics＞UI＞WXOpenDataViewerで見つけることができます。

![wx1](img/wx1.png) 







###オープンドメイン展示コンポーネントの使用

1.まずオープンデータドメインプログラムを設計します。例えば、サイズは500*500です。

2.メインドメインのIDE内で、WXOpenDataViewerコンポーネントを適切な位置に引き出して、サイズを500*500に設定します。

![wx1](img/wx2.png) 




3.マイクロメッセンジャーで確認すれば、オープンデータエリアの内容が見られます。性能とマウスイベントは最適化されます。

![wx1](img/wx3.png) 




まとめ：新しいWeChatを使ってドメインのデータコンポーネントを開放して、符号化する必要がなくて、オープンドメインの内容を展示することができて、しかも性能とマウスのイベントはすべて最適化を得ることができます。


##二、開放ドメイン透過インターフェースの使用

WeChatオープンドメインでは、ローカルの一枚の画像のロードのみがサポートされていますので、図セットは使えません。そのように使うのは非常に不便です。また、2.0のシーンは自動的に図セットをロードしています。これはwxオープンドメインのエラーを引き起こす可能性があります。この問題を解決するために、ドメイン開発を開放しやすくするために、2.0では透過インターフェースを提供しています。これでサブドメインでjson、図集などのファイルが使えます。

現在は透過をサポートしているファイルタイプには個別の画像、JSONファイル、図集ファイルがあります。

MiniAdapterのインターフェースにそれぞれ対応しています。`sendSinglePicToOpenDataContext`を選択します`sendJsonDataToDataContext`を選択します`sendAtlasToOpenDataContext`。

透過性を使用した例を以下に示す。

####メインドメインの一部抜粋:

対応するファイルを使用する前に、これらのインターフェースを使って、＊マスタドメイン＊にロードされた情報をサブドメインに伝える必要があります。これらの通信インターフェースは、WeChatを使用して提供された主なドメインから子ドメインへの情報伝達インターフェースであり、より多くの情報はMiniAdapterのソースコードとWeChatの公式文書を確認することができます。


```typescript

if(Browser.onMiniGame){
    //加载一个json和图集
Laya.loader.load(["json/reward.json","res/atlas/test.atlas"],Handler.create(this,function(){
    //加载完成
    //使用接口将图集透传到子域
	MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");	
    //使用接口将json投促函到子域
    MiniAdpter.sendJsonDataToDataContext("json/reward.json");
}));
}
```


####サブドメインの一部抜粋:

この部分のコードは2.0.**オープンドメインプロジェクト**サンプルコード。ここには簡単な修正があります。二つのファイルを通して伝達したので、透過確認が必要です。二つのファイルは全部再利用を受け付けます。

透過ファイルを受信するには、WeChatサブドメインを使用する必要があります。`wx.onMessage`インターフェース詳細はWeChatで確認できます。[官方文档](https://developers.weixin.qq.com/minigame/dev/api/wx.onMessage.html)。


```typescript

//用于计数
var mark:int = 0;
if(Browser.onMiniGame)
    Browser.window.wx.onMessage(function(data:*):void{//微信接受信息
        if(data.url == "res/atlas/test.atlas" || data.url == "json/reward.json"){
        	mark ++;
            if(mark == 2)//确认数据全部接收后
            	Laya.loader.load([
               		"res/atlas/test.atlas",
                	"json/reward.json"],Handler.create(this,onComplete));
        }
	}.bind(this));
```


onCompletteの方法は、原版と一部の修正があることに注意します。


```typescript

private function onComplete():void() {
    //获取资源
    var testJosn:* = Laya.loader.getRes("json/reward.json");
    //输出透传过来的json
    console.log('透传的json信息：', testJosn);
    //加载IDE指定的场景
    var big:BigRank = new BigRank();
    big.init();
}
```


WeChat環境でのテストの効果は図1の通りです。

！[](img/1.png)<br/>(図1)

