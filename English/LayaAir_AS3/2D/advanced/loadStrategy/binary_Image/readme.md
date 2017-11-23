## Picture and binary

​	In the era of page tour, in order to prevent the theft of resources, the usual way is to encrypt the pictures and other resources. The so-called encryption is to disrupt the original storage bytes of resources, or interspersed with something. But in the HTML5 era, found basically are loaded directly pictures, why and page tour era practice is not the same? Is HTML5 unable to load decoded binary images? Of course not. The reason why we do not encrypt this layer operation, mainly our project source code is completely exposed to the browser side, there is no secret at all, even if encrypted, write a script execution, you can get your source code. But in order to meet the needs of developers in this regard, we simply say, HTML5 is how to binary image manipulation.

### XMLHttpRequest as evidence

​	Speaking of loading documents, have to mention about `XMLHttpRequest`, Here we briefly introduce the detailed tutorial please move to `HttpRequest` chapter. XMLHttpRequest is an interface to the browser that allows Javascript to do HTTP (S) communications. This is the core of Ajax that we often mention. The standard XMLHttpRequest is divided into Level1 and Level2. Here we are talking about the html5 range, so Level1 is of little significance for us, here we attribute him to Html4, Html5 our main concern is Level2. In order to facilitate developers to understand our team compared these two standards:

​	**Level1 main drawback :**

- Due to the same origin policy, you can not send cross-domain requests.

- Can not send binary files (such as pictures, videos, audio, etc.), can only send plain text data;

- In the process of sending and obtaining data, it is impossible to obtain the progress information in real time, but only to judge whether it is completed or not.

   **Level2 Relative to Level1 improvement:**

- Can send cross-domain requests, in the case of the server allows;

- Support sending and receiving binary data;

- Add formData object, support sending form data;

- Send and get data, you can get progress information;

- You can set the requested timeout period;

One of the most important concerns from the above comparisons is to support **sending and receiving binaries**. This is a major breakthrough, and this allows us to remotely load binary images as possible.

### 如何加载

​	About how to load, here we start with native, and then transition to the Layaair engine, so that developers can understand the meaning of it. Loading in binary streams, where we use XMLHttpRequest binary stream to load. With regard to the operation of XMLHttpRequest, we are not presenting it here, and we will explain it in separate chapters. Let's try it in binary mode. Here we start with the JS script. Code is as follows:

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

​	This method is to use the method to provide their own browser converted into binary images, pictures, in fact there are many methods such as binary conversion, binary loading, decoding into Base64, and then assigned to you in img or binary data with canvas draw pictures, and then assigning toDataURL to your img Src. And many methods, here we use the most simple and effective way to convert images.

​	After the image is loaded, instantiate a XMLHttpRequest object XHR, the `responseType` property is set to `arraybuffer`, instantiate a Blob object `blob`, to create an img tag, `window.URL.createObjectURL(blob)` create a URL to this parameter object. Add the created img object to the body of the web page for display. Embed this code into the index.html file and run it to see that the page has shown our picture properly.

### How to use it in Laya?

​	The simple example above is written with the JS script, so how to use it in the project and how to use the IMG of the DOM element in the project. We'll illustrate with the AS project below.

​	Create a new Laya AS project with the following code:

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

second step, we can draw a texture to display:

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

third step, we create a texture directly

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

The above method is binary processing, in fact, there are many methods, such as remote picture resources processing into base64+ data, front end loading is completed, the direct decryption to remove the doped data. Here we use one of these methods to load and display on the stage.

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

The above example we are using the `HttpRequest` to load, developers can also use the `Laya.loader.load`method to load a page, please move to the relevant `Laya.loader.load` detailed tutorial document. This is not a statement.

​	The above example we are using `HttpRequest` and single thread loading in HTML5, there are multiple threads, in order to prevent jerky displayed page without response, improve the user experience, we can enable the worker to load, the tutorials we will explain in section worker.

