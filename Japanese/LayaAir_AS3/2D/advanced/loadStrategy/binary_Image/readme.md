##画像とバイナリ

ページ遊びの時代には、資源の盗掘を防ぐために、絵などの資源を暗号化するのが一般的です。暗号化とは、リソースの本来の記憶バイトを混乱させたり、何かを挿入したりすることです。しかし、httml 5時代になると、ほとんどが直接に読み込まれている写真なのに、なぜページ遊びの時代とは違っているのですか？httml 5はバイナリピクチャを復号できませんか？もちろんです。暗号化を行わない理由は、主に私たちのプロジェクトのソースコードがブラウザの端に完全に暴露されています。しかし、開発者のニーズを満たすために、html 5はどのようにバイナリ画像を操作しますか？

###言わざるを得ないXMLHttp Request

ファイルを読み込むというと、言わざるを得ないのは`XMLHttpRequest`ここで簡単に紹介します。詳しい教程はここに移動してください。`HttpRequest`章節XMLHttpRequestは、JavascriptがHTTP（S）通信を行うことができるように、ブラウザのインタフェースです。これは私たちがよく取り上げているAjaxの核心です。XMLHttpRequestの基準は、レベル1とレベル2に分かれています。ここで私達が話しているのはhttml 5の範囲です。だから、Level 1は私達にとってあまり意味がないです。ここで彼をHtml 4にまとめました。Html 5は私達が主に注目しているのはLevel 2です。開発者が私たちのチームの二つの基準を理解しやすいように比較します。

​**レベル1の主要な欠点：**

−同一ソースポリシーの制限を受けて、ドメイン間の要求を送信できない。

-バイナリファイル（画像、ビデオ、オーディオなど）を送信できません。テキストデータのみ送信できます。

-データの送信と取得中は、進捗情報をリアルタイムで取得できず、完了したかどうかを判断するしかない。


   **レベル2はレベル1に対して改善されたところ：**

-ドメイン間要求を送信することができ、サービスが許可されている場合。

-バイナリデータの送信と受信をサポートします。

-フォームデータの送信をサポートするformDataオブジェクトを追加します。

-データの送信と取得は、進捗情報を取得することができます。

-要求のタイムアウト時間を設定できます。

上記の比較から私達が最も関心を持っているのは支持です。**バイナリの送信と受信**。これは重大なブレークスルーです。これは私たちにバイナリ画像をリモートでロードすることが可能になりました。

###読み込み方法

どうやってロードするかについては、ここでまず原生から始めて、その後Layaairエンジンに移行します。このように開発者はその意味を理解できます。バイナリストリームでロードします。ここではXMLtpRequestバイナリストリームの方式でロードします。XMLHttpRequestの操作についてはここで述べていません。別の章に置いて説明します。まずバイナリでロードしてみます。ここではまずjsスクリプトで操作します。コードは以下の通りです


```javascript

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


上記の方法は、ブラウザ自身が提供した方法で、バイナリを画像に変換し、バイナリを画像に変換する方法があります。例えば、バイナリをロードしてbase 64に復号し、値を付けてあなたに渡す方法や、バイナリデータをcanvasで画像を描き、toData URLをあなたのsrcに割り当てる方法などがたくさんあります。最も簡単で効果的な方法で画像を変換します。

画像のロードが完了したら、XMLttpRequestオブジェクトxhrを実装します。`responseType`属性を設定します`arraybuffer`を選択します。`blob`をクリックして、ラベルを作成します。`window.URL.createObjectURL(blob)`このパラメータオブジェクトに向けたURLを作成し、作成したオブジェクトをウェブページのbodyに追加して表示します。このコードをindex.htmlファイルに埋め込み、実行するとウェブページが正常に表示されています。

###Layaではどう使いますか？

上記の簡単な例はjsスクリプトで書いていますが、プロジェクトではどうやって使えばいいですか？プロジェクトではdom要素はどう使いますか？ASのプロジェクトを使って説明します。

新規のLayaのASプロジェクトのコードは以下の通りです。


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
			var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/monkey2.png","","get","arraybuffer");
		}
        private function completeHandler(data:Object):void
        {
            //加载完成返回的data是arraybuffer；
          	//.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
            //.......解密逻辑开始处理数据。
            var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
            byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
            var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
            var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
            ////我们先用第一种方式显示图片到舞台；
            var sp:Sprite = new Sprite();
            sp.loadImage(url);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


二つ目はテクスチャを描画して表示できます。


```java

  private function completeHandler(data:Object):void
  {
      //加载完成返回的data是arraybuffer；
      //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
      //.......解密逻辑开始处理数据。
      var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
      byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
      var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
      var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
      //用loader来加载url
      Laya.loader.load(url, Handler.create(this,showImg,[url]),null,Loader.IMAGE);
  }
 private function showImg(url:String):void
 {
     var t:Texture = Laya.loader.getRes(url);
     var ape:Sprite = new Sprite();
     ape.graphics.drawTexture(t,0,0);
     Laya.stage.addChild(ape);
     ape.pos(200, 0);
 }
```


第三のテクスチャを直接作成します。


```java

private function completeHandler(data:Object):void
{
    //加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
    var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
  
    var htmlImg:HTMLImage = HTMLImage.create(url);//这里创建HTMLImage 这里要用HTMLImage.create；
    htmlImg.onload = function():void
    {
      var t:Texture =new Texture(htmlImg);
      var ape:Sprite = new Sprite();
      ape.graphics.drawTexture(t,0,0);
      Laya.stage.addChild(ape);
      ape.pos(200, 0);
    }
}
```


以上の方法はバイナリの処理方法ですが、実は長距離の画像資源をbase 64＋データに処理して、先端ロードが完了して、ドーピングデータを直接解読します。次に私たちはその一つの方法で舞台にロードして表示します。


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function completeHandler(data:String):void
        {
            //.....加载完成 把base64字符串的图片数据提取出来；
            //.....提取base64字符串；
            //.......假设得到的数据是data；
            var sp:Sprite = new Sprite();
            sp.loadImage(data);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


以上の例は全部使っています。`HttpRequest`を選択します。`Laya.loader.load`メソッドをロードします。`Laya.loader.load`詳細な使用は関連教程文書に移動してください。ここでは述べていません。

上の例を使っています。`HttpRequest`単スレッドのローディングと、httml 5にはマルチスレッドがありますが、ページのキャノン応答を防止するために、ユーザー体験を向上させるために、ワーカーを使ってローディングすることができます。

