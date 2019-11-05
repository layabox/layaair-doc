#HttpRequest詳細

プロジェクトの中でhttp要求を送る需要があります。LayaAirエンジンの中でHttpRequestは私達が要求を送る基本的な種類です。HttpRequest類は実は包装しています。`XMLHttpRequest `開発者がこのクラスをより深く理解するために、まずXMLHttpRequestから始めます。

##原生XMLtpRequest

####簡単に述べる

XMLHttpRequest中国語は、拡張可能なハイパーテキスト送信要求として解釈することができる。クライアントとサーバの間でデータを転送する機能を提供します。URLからデータを取得する簡単な方法を提供し、ページ全体を更新しません。これはウェブページを一部のページだけ更新させ、ユーザーに迷惑をかけないようにします。

###属性

|属性124;タイプ124;記述𞓜
|----------------------------------------------------------------------|
|onreadystatechange𞓜function|JavaScript関数オブジェクトは、readyState属性が変化すると呼び出されます。𞓜
|readyState 124; unsigned shart 124;要求の5つの状態
レスポンスエンティティのタイプは、`responseType 来指定，`はい、いいです`ArrayBuffer`を選択します`Blob`を選択します`Document`」（https://developer.mozila.org/zh-CSN/docs/Web/API/Dcument）、Java Scriptオブジェクト（すなわち「json」）、または文字列。要求が未完了または失敗した場合、その値は`null`𞓜
今回の要求の応答はテキストであるか、要求が成功していないか、または送信されていない場合は`null`**読み取り専用です。**𞓜
レスポンスタイプを変えることができる値を設定します。サーバーにあなたが望む応答フォーマットを教えます。𞓜
|status 124;`unsigned short`|この要求の応答状態コード（例えば、`状态码`200は成功のお願いを表します。**読み取り専用**𞓜
𞓜`statusText`𞓜`DOMString`|この要求の応答状態情報は、状態コードと原因フレーズ（例えば、「`200 OK`読み取り専用
𞓜`upload`𞓜`XMLHttpRequestUpload`|がいてもいいです`upload 上添加一个事件监听来跟踪上传过程。`𞓜
𞓜`withCredentials`𞓜`boolean`|は、クロスステーション（cross-site）のアクセス制御（Access-Coontrol）要求を行う際に、認証情報（たとえば、cookieまたは許可されたheader）が使用されるかどうかを示す。デフォルト`false。`𞓜
|timeout𞓜number 124;がタイムアウト時間を要求した。
​`withCredentials`この属性は一般的にはあまり使われていません。ここで簡単に紹介します。ウェブでは、同じドメインの要求ブラウザを送信します。`cookie`自動加算`request header`ただし、クロスドメイン要求を送信する際は携帯しません。ここにいるからです`CORS`標準で規定されていますが、デフォルトではドメイン間要求を送信する際にブラウザから認証情報を送信することはできません。`credentials`）のようです`cookies`和「と」`HTTP authentication schemes`「です。ない限り`xhr.withCredentials`を選択します`true`(`xhr`オブジェクトに属性があります。`withCredentials`を選択します。標準値は`false`を選択します。ですから開発者がドメインをまたいでクッキーを送れない場合はこれを参考にしてください。

###方法

####abort()

要求がすでに送信された場合、要求は直ちに中止されます。

####get All ResonseHeaders()

すべての応答ヘッダ情報（応答ヘッダと値）を返します。応答ヘッダがまだ受け付けられていない場合、戻ります。`null`..。

####get ResonseHeader()

指定された応答ヘッダの値を返します。応答ヘッダがまだ受け入れられていない場合、または応答ヘッダが存在しない場合、nullに戻ります。

####open()

要求を初期化します。

###### 参数

を選択します。`method`

要求に使用するHTTP方法、例えば「GET」、「POST」、「PUT」、「DELETE」など、次のパラメータが非HTTP（S）のURLであれば、このパラメータは無視される。

を選択します。`url`

この要求がアクセスするURL

を選択します。`async`

オプションのブール値パラメータは、デフォルトはtrueであり、非同期動作を実行するかどうかを意味し、値がfalseであれば、send()方法はサーバからのリターンデータを受け取るまで何も返さない。値がtrueであれば、開発者に対して透明な通知が関連イベントの傍受者に送信されます。この値はtrueでなければなりません。multiiPad属性がtrueであれば、意外なことがあります。

を選択します。`user`

ユーザ名、オプションのパラメータは許可のために使用します。デフォルトのパラメータは空のstringです。

を選択します。`password`
パスワード、オプションのパラメータは許可のために使用されます。デフォルトのパラメータは空のstring.パスワード、オプションのパラメータは許可のために使用されます。デフォルトのパラメータは空のstringです。
####overrideMimeType()

サーバから返されたMIME typeを書き換えます。これは、例えば、サーバーがデータが指定されていなくても、応答ストリームを「text/xml」として処理し、解析するために使用されても良い。なお、この方法はsend()の前に呼び出されなければならない。

####send()

要求を送信します。要求が非同期モード（デフォルト）であれば、この方法はすぐに戻ります。逆に要求が同期モードであれば、要求の応答が完全に受け入れられるまで、この方法は戻ります。ここで、sendのパラメータの種類は以下の通りです。

を選択します。`ArrayBuffer`

を選択します。`Blob`

を選択します。`Document`

を選択します。`DOMString`

を選択します。`FormData`

を選択します。`null`

####set Request Header()

指定されたHTTP要求ヘッダに値を割り当てます。その前に、呼び出しを確認しなければなりません。`open()`」（https://developer.mozila.org/zh-CSN/docs/Web/API/XMLtpRequest#open)方法はurlを開いた。

###イベント

基本的な事件は大体次の通りです。

を選択します。`onloadstart`

を選択します。`onprogress`

を選択します。`onabort`

を選択します。`ontimeout`

を選択します。`onerror`

を選択します。`onload`

を選択します。`onloadend`

私たちがよく使うのは基本的に進捗事件、完成事件、エラー事件などです。

一つずつ`XMLHttpRequest`中には全部一つあります`upload`プロパティ`upload`一つです`XMLHttpRequestUpload`オブジェクト`XMLHttpRequest`和`XMLHttpRequestUpload`同じものを受け継ぐ`XMLHttpRequestEventTarget`インターフェースですので、上記のイベントもあります。

##layaではどう使いますか？

ラヤではXMLHttpRequestをHttpRequestで簡単にカプセル化しました。HttpRequestはEvent Dispactchを継承しています。イベント配布の機能があります。簡単な例を書いて、使い方を見てみます。


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var xhr:HttpRequest = new HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.on(Event.PROGRESS,this,processHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function processHandler(data:Object):void
        {
            trace(data);
        }
        private function completeHandler(data:Object):void
        {
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


上記の例はget方式である簡単な要求を送りました。遠端のファイルを取得するには、テキストの書式を設定します。もし私達が動的に遠端データを要求すれば、次のようなフォーマットに変更できます。


```

 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
```


以下ではpost方法で一つのデータ方式を要求します。


```

 xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```


ここのポイントはsend関数で、このsend関数はXMLtpRequestのsend領域と分離します。パラメータを見てください。

###### 参数

##を選択します。`url`要求のリモートアドレスdataが送ったデータ;一般的なpostメソッドは、このパラメータを転送します。get方法のパラメータとurlをつなぎ合わせます。
##-methodデータを送信する方法はデフォルトでgetとなります。レスポンスTypeメッセージの戻りタイプ
-headersが指定したHTTP要求ヘッダに値を割り当てます。


###### 属性

##を選択します。`http`：元のXMLHttpRequestの引用により、XMLHttpRequestのいくつかの属性を設定して、timeout、xhr.http.timeout=10000を設定して、10秒のタイムアウトを設定できます。 `data`: 请求返回的数据。

を選択します。`url`：お願いのurl。

###拡張HttpRequest

開発中にHttpRequestはファイルをアップロードするなど、タイムアウト時間を設定します。例えば、フォームデータを操作するなど、私達の要求を満たすことができないかもしれません。HttpRequestを拡張するのは簡単です。HttpRequestを継承したり、HttpRequestを自分で書き直したりしてもいいです。これは開発者のニーズを見て、HttpRequestを書き直して、直接Event Dispactchを継承することを提案します。書き換えとは、XMLtpRequestという種類を再包装することです。以下は簡単な継承のモデルです。


```java

package
{
    import laya.net.HttpRequest;
    
    public class HttpRequestExtension extends HttpRequest
    {
        public function HttpRequestExtension()
        {
            super();
        }
        public override function send(url:String, data:*=null, method:String="get", responseType:String="text", headers:Array=null):void
        {
            super.send(url,data,method,responseType,headers);
            this._http.upload.onprogress= function(e:Object):void
            {
                //上传进度
            }
            this._http.upload.onload= function(e:Object):void
            {
                
            }
            this._http.upload.onerror= function(e:Object):void
            {
                
            }
            this._http.upload.onabort = function(e:Object):void
            {
                
            }
        }
    }
}
```


上記はファイルをアップロードするモデルで、XMLHttpRequestのuploadのイベントを追加しました。ここのsuper.sendは簡単に父の種類の方法を使っています。

##おわりに

XMLHttpRequestという原生の類は実はとても巨大で、機能がとても強いです。layaのパッケージは基本的な需要を満たすだけで、いくつかの特殊な需要は自分で拡張する必要があります。

##-詳細`XMLHttpRequest`を参照してください[W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/); `XMLHttpRequest`いろいろなタイプのデータを送るので、参考にしてください。[发送数据](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)和[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
##-了解`XMLHttpRequest`基本的な使い方は参考にできます。[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest);クロスドメイン要求を知りたいなら、参考にしてもいいです。[W3C的 cors 标准](https://www.w3.org/TR/cors/);




