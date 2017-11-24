## LayaAir and native DOM

​	In the development project, developers inevitably encounter DOM element support, but LayaAir does not support or support the imperfect. So we'll look at some of the techniques that we've developed in this section.

### LayaAir with SVG

​	What is SVG? Probably most developers have heard this term, or they know it's the description format of vector images prescribed by W3C, and some definitions and history about SVG are not here, and the developers who are interested can refer to them[Here](). But there are few places to actually use it in a project. But the SVG is powerful and can not be ignored, some simple graphics, a few lines of text can be described, need not network loading. Such as rich art words, such as strange shapes, such as the perspective of the text effect, etc.  If the program to achieve, may be much more difficult. For example, the following one.

![0](img/0.png)

What do you do if you have this kind of text in your project? Maybe we're thinking of pictures coming out of art. Is there a simpler way to do that? Here we choose to use SVG for processing. We know that using div+css style to display this effect in DOM elements is the simplest and fastest way. Then we also use CSS style to show this effect. Let's see how a simple script can do this.

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

How do you run it? Open the Google browser, literally open a blank page, F12, paste the above code to the console, and then enter the car, you can see the effect of screenshot above. Or build a new HTML, paste the code in, and open it with a browser. Is it very simple?. Then we can modify the displayed text arbitrarily. Developers can modify, try to see the effect. We simply introduce this code. Where data is the data format of SVG, which can refer to the definition and description of svg.

```javascript
<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">
  这里是重点，文字的效果我们是通过svg支持的css样式来设置 text-shadow设置的是文字的css样式效果，假如开发者想改变文字的样式，可以修改style即可。
```

​	The above is in JavaScript, with the original DOM element img to display, so what do we want to do in the game? This is actually very simple, and now we've shown it on the page with img, so what we're going to do next is how to apply and display this img in the project. We have a new project. Here, AS language is used to create the project. Code is as follows:

```java
package {
	import laya.display.Sprite;

	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400);
			Laya.stage.bgColor ="#cccccc";
			var data:String= "data:image/svg+xml,"+'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
           '<foreignObject width="100%" height="100%">' +
           '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
             '<em>I</em> like ' + 
             '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
             'cheese</span>' +
           '</div>' +
           '</foreignObject>' +
           '</svg>';
            var sp:Sprite = new Sprite();
            sp.loadImage(data,0,0,200,200);
            Laya.stage.addChild(sp);

		}
	}
}
```

Passing the data as URL to loadImage, the method engine will help us load and decode it. The parameters of the loadImage method not only receive the address form of URL, but also accept the format of Base64 and svg. When you compile and run the code above, we see the effect in the diagram below.![1](img/1.png)

​	Conclusion: the above code gives us good inspiration. In the project, our special artistic words can be more convenient and convenient in this way. Developers can find some more beautiful effects, such as 3D's perspective effect, graphic layout, shadow, reflection, and so on. This method not only reduces the bandwidth of the network, but more importantly, it is convenient for us to modify constantly. Set up a style that can be used everywhere in the project. Is it more efficient to replace bitmap fonts by using the above method instead.

Related links:

https://codepen.io/pen/；

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas；

### DOM element LayaAir of Image

​	In HTML5, image tags are powerful. We don't want to introduce their features here. Here we introduce several simple forms.

#### QR code

​	One of the more common functions is to display the current two-dimensional code address in the project. User length identification. Here generates two-dimensional code, we use the third party JS class library to generate two-dimensional code. Class library code can be downloaded on GitHub, here I use this [address](https://github.com/davidshimjs/qrcodejs)。

New project, Download qrcode.js add to index.html. qrcode API please refer to [address](https://github.com/davidshimjs/qrcodejs). The specific logic code is as follows:

```java
package {
    import laya.display.Sprite;
    import laya.utils.Browser;
	
	public class Main {
		
        //二维码对象
        private var qrcode:Object;
        private var qrcodeSp:Sprite;
		public function Main() {
			//初始化引擎
			Laya.init(600, 400);
            var div:Object = Browser.document.createElement("div");
           qrcode= new Browser.window.QRCode(div,{
                width : 100,
                height : 100
            });
           var url:String ="http://layabox.com/";
           qrcode.makeCode(url);
           Laya.stage.once("click",this,clickHandler);
           qrcodeSp = new Sprite();
           Laya.stage.addChild(qrcodeSp);
		}
        private function clickHandler():void
        {
            var url:String = qrcode._oDrawing._elImage.src;//获取，注意这里是异步的，开发者可以加个延时在获取。
            qrcodeSp.loadImage(url,0,0,100,100);
        }
	}
}
```

​	Compile and run the above code, and then click on the stage can see that the two-dimensional code has been displayed on the stage, you can use mobile phone scanning, found that the phone has jumped to the official website. **notice: the QR code generated at this time doesn't react in Changan or WeChat in the browser, because QRcode generates the canvas tag instead of the img tag**. So you can only use the IMG tag if you want to click on pop-up tags. This developer can expand itself.

### DOM element LayaAir of video

#### Live video

​	In the HTML5 era, video playback basically uses video tags to play, and if there is no rich experience in video playback, the best choice is to use mature play plug-in to achieve. What's popular now is [video.js](https://github.com/videojs/video.js), [hls.js](https://github.com/video-dev/hls.js), [plyr.js](https://github.com/Selz/plyr). It's excellent in terms of compatibility, experience and performance. These plugins are officially given by demo. such as https://plyr.io/，http://video-dev.github.io/hls.js/demo/，http://codepen.io/sampotts/pen/JKEMqB。

Let's take it as follows [Plyr + hls.js](http://codepen.io/sampotts/pen/JKEMqB) Here's an example of how we should write in LayaAir.

Create a new AS empty project. At the same time, add the following code in the index.html file:

![2](img/2.png)

`<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">` The style file of the player,

`<video preload="none" id="player" autoplay controls crossorigin></video>` Plus video tag. Name ID as “player”, and we'll use it in the program for a while.

`<script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>`
`<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>`

This is the class library used by the player. Developers remember to download to their own projects or servers in the production environment.

​	The following is the logic of the main class:

```java
package {
    import laya.utils.Browser;
	
	public class Main {
		public function Main() {
			//初始化引擎
			Laya.init(0,0);//初始化引擎
            var Hls:Object = Browser.window.Hls;//获取对Hls的引用；
            var plyr:Object = Browser.window.plyr//获取对plyr的引用；
            //获取video对象，就是页面上命名为“player”的标签;
            var video:Object =Browser.document.querySelector('#player');
            if (Hls.isSupported()) {
                var hls:Object = new Hls();
                hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');//加载m3u8源
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED,function():void{
                    video.play();
                });
            }
            plyr.setup(video);
		}
	}
}
```

Compile and run the code and find that the page has already played video. Developers may notice that when we initialize the engine, this is the case:

`Laya.init(0,0);//Initialization engine`;Set size is 0, because we don't have stage interaction here. So we set it here to 0, and we can even not initialize it. If the developer project contains the logic of interaction with the stage, you can set your own size.

​	In the process of playing, developers can F12 open Google console, switch to the Network tab to see, our video is a section of TS file.

![3](img/3.png)

As the play goes on, more and more files are found. In fact, this is based on [hls](https://developer.apple.com/streaming/) Protocol playback. The basic principle of this technique is to cut video files or video streams into small pieces (TS) and establish index files (m3u8). Deeper principles, such as video decoding, video frame data, developers can refer to as follows:

https://developer.apple.com/streaming/。

https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource。

https://github.com/nickdesaulniers/netfix

https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

上面的例子我们使用hls+plyr来进行播放。其他的方法请开发者参考本教程进行扩展。

#### Camera

​	The support of HTML5's video as camera browser is limited, and it needs **https的协议** Google and the new version of WeChat support is still good. If your compatibility does not require that high, you can try to add the camera function.

Let's take a look at the example given on mdn.

https://mdn.github.io/webaudio-examples/stream-source-buffer/

Developers use mobile phones or WeChat to open this address to test your phone's support.
![L`6Q322IAT7251L4{J1PWW](img/L`6Q322IAT7251L4{J1P]WW.png)。

​	This is a test connection, the protocol is also HTTPS, developers pay attention to this when you call the camera. Your remote address must be https.

​	More information is available here:https://github.com/mdn/webaudio-examples. The link here is an example of sound and video given by mdn.

​	LayaAir on the camera also has the corresponding package, below we see the usage.

```java
package
{
    import laya.device.media.Media;
    import laya.device.media.Video;
    import laya.display.Text;
    import laya.utils.Browser;
    import laya.utils.Handler;
    
    public class Main
    {
        private var video:Video;
        
        public function Main()
        {
            Laya.init(Browser.width, Browser.height);
            
            if (Media.supported() === false)
                alert("当前浏览器不支持");
            else
            {
                showMessage();
                
                var options:Object = {
                    audio: true,
                    video: { 
                        facingMode: { exact: "environment" },	// 后置摄像头，默认值就是，不设至也可以。
                        width: Laya.stage.width,
                            height:Laya.stage.height
                    }
                };
                
                Media.getMedia(options, Handler.create(this, onSuccess), Handler.create(this, onError));
            }
        }
        
        private function showMessage():void 
        {
            var text:Text = new Text();
            Laya.stage.addChild(text);
            text.text = "单击舞台播放和暂停";
            text.color = "#FFFFFF";
            text.fontSize = 100;
            text.valign = "middle";
            text.align = "center";
            text.size(Laya.stage.width, Laya.stage.height);
        }
        
        private function onSuccess(url:String):void
        {
            video = new Video(Laya.stage.width, Laya.stage.height);
            video.load(url);
            Laya.stage.addChild(video);
            
            Laya.stage.on('click', this, onStageClick);
        }
        
        private function onError(error:Error):void
        {
            alert(error.message);
        }
        
        private function onStageClick():void
        {
            // 切换播放和暂停。
            if (!video.paused)
                video.pause();
            else
                video.play();
        }
    }
}
```

​	Compile and run the above example, found that can not open. This is normal. Run this example to build a HTTPS server yourself. Then use your mobile phone to open the index.html corresponding to this address. It's also simple to build a simple htpps server. Here we can use the command line tool of Laya.

- Download node first. Download address https://nodejs.org/en/，进行安装。

- When the installation is complete, open the cmd command line, enter  npm install -g layacmd , and wait for the installation to complete.

- Find the index.html we just compiled. Hold the shift+ right here, open the CMD window, enter layacmd open, and then start a static server of HTTP and htpps, according to the command line output address, and then we use mobile phone, Google browser or WeChat to access this address, such as we are here https://10.10.20.34:8001/index.html。



### LayaAir and the DOM element File

​	In project development, we may need to allow users to upload pictures. This we need to use HTML5 file tag（**WeChat micro-channel to provide the interface, the back of the tutorial we specifically talked about in WeChat tutorial. Other browsers may also exist compatibility**）. Let's write a simple example below.

```java
package {
    import laya.display.Sprite;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(100,100);//初始化引擎
            var file:Object = Browser.document.createElement("input");
            file.type ="file";
            file.style.position ="absolute";
            file.style.zIndex = 999;
            Browser.document.body.appendChild(file);//添加到舞台
            file.onchange = function(e):void
            {
                fileReader.readAsDataURL(file.files[0]);
            };
            var fileReader:Object = new  Browser.window.FileReader();
            fileReader.onload = function(evt):void
            {  
                if(Browser.window.FileReader.DONE==fileReader.readyState)
                {
                    var sp:Sprite = new Sprite();
                    sp.loadImage(fileReader.result,0,0,300,300);
                    Laya.stage.addChild(sp);
                   
                }
            }
        }
    }
}
```

​	Compile the code above, click the button. Choose a picture file or camera to take pictures, and find that the picture has been shown on the stage. So, a simple program that calls an album or camera is done. But we found that the  “button” was very ugly. So how do you change the button style? This needs to be handled with the help of the CSS style. The traditional way is to set the button's transparent value to 0, and then replace it with a button. To change his style through this illusion, actually, click on him. Just the user doesn't feel it. So we'll fix it and see how to change the style.

```javascript
 var file:Object = Browser.document.createElement("input");
 file.style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;";
 file.type ="file";
 file.style.position ="absolute";
 file.style.zIndex = 999;

```

See the complete code below:

```java
package {
    import laya.display.Sprite;
    import laya.ui.Button;
    import laya.utils.Browser;
    import laya.utils.Handler;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);//初始化引擎
            var skins:Array = [
                "res/button-1.png"
            ];
            Laya.loader.load(skins, Handler.create(this, onUIAssetsLoaded));
            
        }
        public function onUIAssetsLoaded():void
        {
            var btn:Button = new Button("res/button-1.png");
            Laya.stage.addChild(btn);
            
            //创建隐藏的file并且把它和按钮对齐。达到位置一致，这里我们默认在0点位置；
            var file:Object = Browser.document.createElement("input");
            //设置file的样式
            file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
            file.type ="file";//设置类型是file类型。
          	file.accept="image/png";//设置文件的格式为png；
            file.style.position ="absolute";
            file.style.zIndex = 999;
            Browser.document.body.appendChild(file);//添加到页面；
            file.onchange = function(e):void
            {
                if(file.files.length>0)
                {
                    fileReader.readAsDataURL(file.files[0]);
                }

            };
            var fileReader:Object = new  Browser.window.FileReader();
            fileReader.onload = function(evt):void
            {  
                if(Browser.window.FileReader.DONE==fileReader.readyState)
                {
                    var sp:Sprite = new Sprite();
                    sp.loadImage(fileReader.result,0,0,100,100);
                    Laya.stage.addChild(sp);
                    
                }
            };
            
        }
    }
}
```

Compile and run the code, you can see, that ugly DOM button disappeared. We click on our custom button, and we can also choose the picture and show it on the stage.

In the example above we put it at the origin of coincidence, set the opacity to 0, disguised as a completely invisiable. Developers can try to test it in other places, and this tutorial is not implemented in detail. Refer to MDN and W3C for other file of api. In addition to the display on the stage, there may be upload server operation, this time you can use FormData. This developer can try it out.

### DOM element script tag for LayaAir

​	Sometimes we project a lot of JS files, a large, one-time loading all in is not just the flow of waste, will cause the page Caton, leads to poor user experience. Compressed obfuscation can reduce the amount of code, but a little larger items, the code will be large. Or local JS files, the first screen loading is unnecessary, at this time we need to load from the appropriate time, so it is necessary to split files and modules. Split file will involve instant loading. Then the script tag will come in handy.

​	You can implement this functionality by loading remote scripts with script's src. It can also be implemented by setting up script's innerHTML, and of course, there are third eval. Here we illustrate the use of these circumstances.

#### By setting SRC to achieve

​	The creation of script can be manually added to the page, or the code can be created dynamically. Here we illustrate the code creation as an example. Let's go ahead with the code

A new as language project, code logic is as follows：

```java
package {
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);//初始化引擎
            var script:Object = Browser.document.createElement("script");
            script.src = "demo1.js";
            script.onload = function():void
            {
                //加载完成函数,开始调用模块的功能。
                ///...........
                // new一个js中的对象。
                var client:Object = new Browser.window.Demo1();
                client.start();
            }
            script.onerror = function():void
            {
                //加载错误函数
            }
            Browser.document.body.appendChild(script);
            
        }
        
    }
}
```

Then create a new JS file, the simple code is as follows：

```javascript
var Demo1=(function(){
	function Client()
	{

	}
	Client.prototype.start = function() {
		// body...
		console.log("调用方法");
	};
	return Client;
})();
console.log("我被加载进来了");
```

Here's a brief explanation of these two pieces of code.

` var script:Object = Browser.document.createElement("script");`创建一个script标签。

` script.src = "demo1.js";`设置要加载的js的路径。

` script.onload  = ......`和` script.onerror =.... `分别是加载完成和加载失败的回调函数。

` Browser.document.body.appendChild(script);`把创建的script标签添加到页面。

`var client:Object = new Browser.window.Demo1();`实例化js声明的那个类。

` client.start();`调用实例的函数。

Compile and run the code above. Open the Google Chrome console, you can see the output:

**"It was loaded in"**

**"Call method"**

####Through the script's innerHTML settings

​	Set the innerHTML is actually the js text format assignment to innerHTML. This we can load the file format to convert the remote file loaded into text content assigned to the label. The following example.

```java
package {
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);//初始化引擎
            var httpreq:HttpRequest = new HttpRequest();
            httpreq.on(Event.COMPLETE,this,this.completeHandler);
            httpreq.on(Event.ERROR,this,this.errorHandler);
            httpreq.send("demo1.js");
            
        }
        private function completeHandler(e:Object):void
        {
            var script:Object = Browser.document.createElement("script");
            Browser.document.body.appendChild(script);
            script.innerHTML = e;
            var client:Object = new Browser.window.Demo1();
            client.start();
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
        
    }
}
```

Compile and run the above code, you can see the effect and the effect of loading with src is the same. This example uses HttpRequest to load the file and assign the loaded content to script.innerHTML. Label self-analytical implementation js. Of course, this example is used HttpRequest to load, developers can also use Laya.loader.load method to load.

#### eval method to load

```java
        private function completeHandler(e:Object):void
        {
            Browser.window.eval(e);
            var client:Object = new Browser.window.Demo1();
            client.start();
            
        }
```

​	We put the front of the load function to complete the above `Browser.window.eval(e);` Then compile, open the console and found that the effect is the same. This script has nothing to do with the label.

​	Summary: The above three commonly used methods can be achieved dynamically loaded js file. What is the difference between the three methods?

- Script tag src way to load the js file, the js file can be different from the current page, which means that you can cross-domain loading.

- script.innerHTML method to receive a text format is a js file, using the XMLHttpRequest way to load, so the file can not cross-domain, or allow to load it, the advantage is that the js file can be customized format, such as encryption, interspersed with other Format, and then use the binary format to load, in the process of decoding into a real js.

- The way eval and script.innerHTML basically the same. Loaded content is also very casual. However, this method is not recommended eval, eval is a fast way to discard, both in terms of performance and security are not recommended. Specific reasons please see mdn explanation

  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval。

  **In fact, we can load the way to the worker can go, so more to reduce the page rendering pressure and Caton phenomenon. Developers can read the worker's tutorial to diverge**

### LayaAir the dom element of voice

​	Speaking of HTML5 sounds, developers may first think of audio tags, but audio tags are extremely poor for development projects. Today we are talking about another interface. The Audio API provided by HTML5 for JavaScript programming allows us to The ability to directly manipulate the original audio stream data in the code, any of its processing reengineering. The audio API, w3c gave us enough [interface](https://www.w3.org/TR/webaudio/), in [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)Described above is also more detailed. In support of a more complete browser, the sound of the API can make an extremely rich visual effects. As the voice of the api is extremely rich, we are here to start with, a brief introduction to the usage, as the audio synthesis, mixing, sound effects, audio data for spectrum analysis, audio plus filters such as improving timbre developers can access mdn or related information.

​	Let's look at an example on mdn. In this case, create a 2 second buffer and fill it with white noise, and then pass it through [`AudioBufferSourceNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioBufferSourceNode) To play it. The note explains its function

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

​	Run the JS code above and click the page to hear the sound coming out. So, how do you write with LayaAir?

```java
package
{
    import laya.events.Event;
    import laya.utils.Browser;
    
    public class Main
    {
        public function Main()
        {
              Laya.init(500,500);
              Laya.stage.bgColor ="#ff0000"
             
              var audioCtx:Object = new (Browser.window.AudioContext || Browser.window.webkitAudioContext)();
              // Stereo
              var channels:int = 2;
              // Create an empty two-second stereo buffer at the
              // sample rate of the AudioContext
              var frameCount:int = audioCtx.sampleRate * 2.0;
              
              var myArrayBuffer:Object = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
              Laya.stage.on(Event.CLICK,this,function():void {
                  // Fill the buffer with white noise;
                  //just random values between -1.0 and 1.0
                  for (var channel:int = 0; channel < channels; channel++) {
                      // This gives us the actual ArrayBuffer that contains the data
                      var nowBuffering:Object = myArrayBuffer.getChannelData(channel);
                      for (var i:int = 0; i < frameCount; i++) {
                          // Math.random() is in [0; 1.0]
                          // audio needs to be in [-1.0; 1.0]
                          nowBuffering[i] = Math.random() * 2 - 1;
                      }
                  }
                  
                  // Get an AudioBufferSourceNode.
                  // This is the AudioNode to use when we want to play an AudioBuffer
                  var source:Object = audioCtx.createBufferSource();
                  // set the buffer in the AudioBufferSourceNode
                  source.buffer = myArrayBuffer;
                  // connect the AudioBufferSourceNode to the
                  // destination so we can hear the sound
                  source.connect(audioCtx.destination);
                  // start the source playing
                  source.start();
              });
        }
        
    }
}
```

​	Compile and run the above example, click on the stage, you will hear the sound playing out. This is a simple example of building a sound in memory. What about external loading?

In the following example, we load a sound file externally. By the way, we can draw the spectrum of the sound.

 ```java
package
{
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.net.Loader;
    import laya.utils.Browser;
    
    public class Main
    {
        private var AudioContext:Object;
        private var audioContext:Object;
        private var analyser:Object;
        private var audioBufferSourceNode:Object;
        public function Main()
        {
              Laya.init(500,500);
              AudioContext =Browser.window.AudioContext || Browser.window.webkitAudioContext;
              audioContext = new AudioContext();
              analyser = audioContext.createAnalyser();
              analyser.fftSize = 256;
              Laya.stage.once(Event.CLICK,this,clickHandler);
              
        }
        private function clickHandler(e:Object):void
        {
            var http:HttpRequest = new HttpRequest();
            http.on(Event.COMPLETE,this,completeHandler);
            http.send("489.mp3","","get",Loader.BUFFER);
        }
        private function completeHandler(e:Object):void
        {
            audioContext.decodeAudioData(e,decodeAudioData.bind(this));
        }
        private function decodeAudioData(buffer:Object):void
        {
            audioBufferSourceNode = audioContext.createBufferSource();
            audioBufferSourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
            audioBufferSourceNode.buffer = buffer;
            audioBufferSourceNode.start(0);
            Laya.timer.loop(1,this,this.drawHandler);
        }
        private function drawHandler():void
        {
            Laya.stage.graphics.clear();
            var dataArray:Uint8Array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            var step:int = Math.round(dataArray.length / 60);
            for (var i:int = 0; i < 40; i++) {
                var energy:int = (dataArray[step * i] / 256.0) * 50;
                for (var j:int = 0; j < energy; j++) {
                    Laya.stage.graphics.drawLine(20 * i + 2, 200 + 4 * j,20 * (i + 1) - 2, 200 + 4 * j,"#ff0000",1);
                    Laya.stage.graphics.drawLine(20 * i + 2, 200 - 4 * j,20 * (i + 1) - 2, 200 - 4 * j,"#ffff00",1);
                }
                Laya.stage.graphics.drawLine(20 * i + 2, 200,20 * (i + 1) - 2, 200,"#ff0000",1);
            }
        }
        
    }
}
 ```

Compile and run the above items, click on the stage, you can see, the spectrum of the sound is displayed. The following diagram.

![6](img/6.gif)

​	Summary: you can see that the voice function of web is becoming more and more powerful. If you don't consider the compatibility of some low-end machines, you can make a web player. This is just a spectrum effect, and developers can try mixing, adding sounds, filters, and so on. The related API can be consulted under mdn.


### DOM element LayaAir of iframe

​	When you plug in three party websites, we usually use iframe, and even three party channels are basically embedded with an application iframe. We also encounter iframe in our project. The following example demonstrates the application of iframe in the project.

​	Using ide to create a new empty item. Code is as follows:

```java
package
{
    import laya.device.media.Video;
    import laya.events.Event;
    import laya.utils.Browser;
    
    public class Main
    {
        public function Main()
        {
          Laya.init(500,500);
          Laya.stage.once(Event.CLICK,this,this.clickHandler);
        }
        private function clickHandler():void
        {
            var iframe:Object = Browser.document.createElement("iframe");
            iframe.style.position ="absolute";//设置布局定位。这个不能少。
            iframe.style.zIndex = 100;//设置层级
            iframe.style.left ="100px";
            iframe.style.top ="100px";
            iframe.src = "http://ask.layabox.com/";
            Browser.document.body.appendChild(iframe);
        }
        
    }
}
```

​	What you need to remind developers is positioning and hierarchy, remember to set up. Many developers don't notice the iframe running below the game layer.
