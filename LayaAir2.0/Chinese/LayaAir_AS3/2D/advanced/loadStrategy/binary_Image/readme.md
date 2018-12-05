## 图片与二进制

​	在页游时代，为了防止资源被盗取，通常的做法就是把图片等资源进行加密。所谓的加密就是打乱资源本来的存储字节，或者穿插一些东西。但是到了html5时代，发现基本都是直接加载的图片，为什么和页游时代做法不一样了呢？是不是html5不能加载解码二进制图片？当然不是。之所以不进行加密这层操作，主要是我们项目的源码完全暴露在浏览器端，根本没有什么秘密可言，即便加密了，写个脚本执行下就能拿到你的源码。但是为了满足开发者这方面的需求，我们来简单说下，html5是如何进行二进制图片操作的。

### 不得不说的XMLHttpRequest

​	说起加载文件，不得不说的是`XMLHttpRequest`，这里我们简单介绍下，详细的教程请移步到`HttpRequest`章节。XMLHttpRequest是浏览器的一个接口，使得Javascript可以进行HTTP(S)通信。这个就是我们经常提起的Ajax的核心。XMLHttpRequest的标准分为Level1和Level2。这里我们讲的是html5范围，所以Level1对于我们意义不大，我们这里把他归结到Html4，Html5我们主要关注的是Level2。为了开发者便于理解我们队这两个标准进行对比下：

​	**Level1的主要缺点：**

- 受同源策略的限制，不能发送跨域请求；

- 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；

- 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；

   **Level2相对于Level1改进的地方：**

- 可以发送跨域请求，在服务端允许的情况下；

- 支持发送和接收二进制数据；

- 新增formData对象，支持发送表单数据；

- 发送和获取数据时，可以获取进度信息；

- 可以设置请求的超时时间；

从上面对比中我们最关注的一点就是支持**发送和接收二进制**。这是一个重大的突破，这个就让我们远程加载二进制图片成为了可能。

### 如何加载

​	关于如何加载，这里我们先从原生开始，然后在过渡到Layaair引擎，这样开发者可以理解其中的含义。以二进制流的方式加载，这里我们采用XMLHttpRequest二进制流的方式来加载。关于XMLHttpRequest的操作我们这里不再陈述，会放到单独的一章节来讲解。我们先按照二进制的方式来加载试试。这里我们先用js脚本进行操作。代码如下：

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

​	上面这个方法是用了浏览器自身提供的方法来把二进制转换成图片，二进制转换成图片其实还有很多种方法，比如加载进来二进制，解码成base64，然后在赋值给你img，或者把二进制数据用canvas绘制出图片，然后toDataURL赋值给你img的src等等，方法很多，我们这里就用最简单有效的办法转换图片。

​	图片加载完成之后，实例化一个XMLHttpRequest对象xhr ，`responseType`属性设置成`arraybuffer`，实例化一个Blob对象`blob`，用来创建一个img标签，`window.URL.createObjectURL(blob)`创建一个指向该参数对象的URL，把创建的img对象我们添加到网页的body上进行显示。把这段代码嵌入到index.html文件中，运行可以看到网页已经正常的显示我们的图片。

### Laya中如何使用？

​	上面的简单例子我们是用的js脚本书写，那么在项目中怎么使用，项目中怎么使用dom元素的img。下面我们用AS的项目进行说明。

​	新建一个Laya的AS项目，代码如下：

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

第二种我们可以绘制一个纹理来显示：

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

第三种我们直接创建一个纹理来

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

以上方法就是二进制的处理方法，其实还有很多方法，比如远程的图片资源处理成base64+数据，前端加载完成，直接解密去掉掺杂的数据。下面我们用其中一种方法来加载显示到舞台上。

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

以上的例子我们用的都是`HttpRequest`来加载，开发者也可以用`Laya.loader.load`方法来加载，关于`Laya.loader.load`详细使用请移步到相关教程文档。这里不再陈述。

​	上面的例子我们用的是`HttpRequest`和单线程的加载，在html5中其实还有多线程，为了防止页面的卡顿无响应，提高用户体验，我们可以启用worker来加载，相关教程我们会在worker章节讲解。

