#JSONPがドメインをまたいでデータを読み出す

webの開発者は基本的にJSONPを使ったことがあります。じゃ、JSONPとは何ですか？これもデータ形式ですか？JSONと何の関係がありますか？LayaAir支はJSONPをサポートしていますか？これらの問題について逐一答えます。



###一、JSONPとは

JSONP（JSON With Padding）はJSONの「使用モード」であり、他のドメイン名（ウェブサイト）から資料、すなわちドメインをまたいでデータを読み取ることができます。なぜ私たちは異なるドメイン（サイト）からデータを訪問するには特殊な技術（JSONP）が必要ですか？これは同源戦略のためです。同じソースポリシーは、Netscapeによって提案された有名なセキュリティポリシーです。今はJavaScriptをサポートするすべてのブラウザがこのポリシーを使用します。

定義からJSONはデータ交換形式であり、JSONPはクロスドメインデータ相互作用プロトコルであることがわかる。一つは情報を記述するフォーマットであり、一つは情報伝達の双方が約束した方法であり、主流ブラウザのクロスドメインデータアクセスの問題を解決するために用いることができる。同ソースポリシーのため、一般的にxxx.comに位置するウェブページはxxx.comではないサーバと通信できません。HTMLのDOM元素は例外です。一般的にはsrc属性を持つDOM元素はドメイン間の制限を受けません。このScriptタグのsrcを利用して、他のソースから動的に発生するJSON資料が得られます。いわゆるJSONP。JSONPで捕まえた資料はJSONではなく、任意のJavaScriptで、JSON解析ではなくJavaScriptの翻訳器で実行します。



###二、どう使いますか？

1.クライアントがJSONPサポートを提供するURL Serviceを呼び出し、JSONPフォーマットデータを取得する。

お客様がhttp://www.layabox.com/？jsop=calbackFunctionに訪問したい場合

もしお客様がJSONデータに戻ることを望むなら、[data 1]，data 2]

では、本当にクライアントに戻ったScript Tags：calbackFunction(["data 1]，"data 2")

したがって、クライアントは、このように書くことができる。

あなたのhtmlページに以下のタグを付けます。


```javascript

<script type = "text/javascript" src = ">
```


あなたのJavaScriptファイルのこのコールバック方法はこのように書くことができます。


```javascript

<script type = "text/javascript">
function callbackFunction(data1,data2)
{
  //这里写你的回调逻辑
}
</script>
```


LayaAirではどう書きますか？実は簡単です。ここではサーバーを使って効果を見ることができます。サーバーはnodejsを選んで簡単なサーバーを構築します。nodejsのインストールはここで詳しく説明しません。nodejs公式サイトまたは自分で資料を検索することができます。

nodejsのインストールが完了したら、簡単なjsスクリプトを書いて簡単なサーバーを作ることができます。コードは以下の通りです


```javascript

var http = require("http");
var sever = http.createServer(function(req,res){
  res.end("LayaSample.onComplete()");
});
sever.listen(9090)
```



```javascript

res.end("LayaSample.onComplete()");
```


この言葉はサーバがクライアントのLayaSample.onComplee()に返送してこの関数を実行するという意味です。

いくつかの行のコードで簡単なサーバーを作成し、コマンドラインを開いて、このjsファイルまたはスクリプトをnodejsで実行します。サーバーの起動が見えます。



これから先のロジックを書きます。LayaAirのIDEを開いて空の項目を作成します。言語はas 3を選択します。具体的なコードは下記の通りです。


```java

class LayaSample {
    constructor() {
        Laya.init(100,100);
        var script:any = Laya.Browser.createElement("script");
        Laya.Browser.document.body.appendChild(script);
        script.src = "http://localhost:9090/?a=1";
    }
    public static onComplete():void{
        console.log("JSONP执行到这里");
    }
}
new LayaSample();
```



```java

var script:any = Laya.Browser.createElement("script");//这句话的含义是创建一个脚本的标签，原生的所有dom元素都可以通过这个方法创建。
```



```java

Laya.Browser.document.body.appendChild(script);//是把创建的script标签添加到body上。
```



```java

script.src = "http://localhost:9090/?a=1";//设置script的远程访问地址。这句话就可以请求到我们刚才创建的那个服务器。用谷歌打开LayaAirIDE生成的二维码地址。
```


![1](img/1.png)<br/>

そしてF 12はGoogleのコンソールを開いて、「JSONPはここまで実行します」と出力していることを発見しました。つまり、私達のComppleteという関数を実行しました。これでJSONPの機能が完成しました。