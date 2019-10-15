##LayaAir and native DOM

In development projects, developers inevitably encounter DOM element support, but LayaAir does not support or support imperfections. So in this section, let's look at some of the techniques we encountered in development.

###SVG of LayaAir

What is svg? Maybe most developers have heard of this term, or know that it is the description format of vector images prescribed by W3C. Some definitions and history of SVG are not stated here. Interested developers can refer to [here] (). But it's rarely really used in projects. But the strength of SVG can not be ignored, some simple graphics, a few lines of text can be described, without the need to load the network. For example, rich artistic words, such as strange shapes of graphics, such as the perspective effect of the text and so on, if implemented by the program, may be much more difficult. For example, here's one

![0](img/0.png)

What if there is such a text in your project? Maybe what we think about is the art of making pictures. Is there a simpler way? Here we choose to use SVG for processing. We know that div + CSS style is the easiest and quickest way to display this effect in DOM elements. So we also use the CSS style to show this effect. Now let's see how a simple script can achieve this effect.


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


How does it work? Open Google Browser, open a blank page randomly, F12, paste the above code into the console, and then return to see the effect of the screenshot above. Or create a new HTML to paste the code in and open it with a browser. Is it simple? Then we can modify the displayed text at will. Developers can modify and try to see the effect. Let's briefly introduce this code. Data is the data format of svg, which can refer to the definition and description of svg.


```javascript

<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">
  这里是重点，文字的效果我们是通过svg支持的css样式来设置 text-shadow设置的是文字的css样式效果，假如开发者想改变文字的样式，可以修改style即可。
```


The above is shown in JavaScript with the native DOM element img, so what do we want to do in the game? This is actually very simple. Now that we have displayed the IMG on the page, what we need to do next is how to apply and display the IMG in the project. We're building a new project. Here we use AS language to create the project. The code is as follows:


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


The method engine that passes data as a URL to loadImage loads and decodes the display for us. The parameters in the loadImage method receive not only URLs in address form, but also Base64 and SVG formats. Compiling and running the above code, we see the effect of the following figure.![1](img/1.png)

Summary: The above code gives us a good inspiration, in the project, our special art words can be used in this way more simple and convenient. Developers can find some more gorgeous effects on their own, such as 3D perspective, text mixing, shadows, reflections, and so on. This method not only reduces the bandwidth of the network, but also facilitates us to modify it from time to time. Set up a style that can be applied everywhere in the project. If the above method is used instead of bitmap font, is it more efficient and fast?

Related links:

Https://codepen.io/pen/;

Https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas;

###Image of the DOM element of LayaAir

In HTML 5, image tags are powerful. We don't want to introduce their features too much. Here we introduce some simple and commonly used forms.

####QR code

A common function is to display the current two-dimensional code address in the project. User long press can be identified. Here we generate two-dimensional codes. We use the third party's JS class library to generate two-dimensional codes. The class library code can be downloaded from GitHub. Here I use this[地址](https://github.com/davidshimjs/qrcodejs)。

Create a new project and add the downloaded qrcode. JS to index. html. Refer to the API for QRcode[地址](https://github.com/davidshimjs/qrcodejs)。 The specific logic code is as follows:


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


Compile and run the above code, then click on the stage to see that the two-dimensional code has been displayed on the stage, can be scanned by the mobile phone, found that the mobile phone has jumped to the official website.**Note: The generated two-dimensional code at this time did not respond to Chang'an in Wechat or browser, because QRcode generated canvas tags instead of img tags.**。 So if you want to press the pop-up recognition option for a long time, you can only use the img tag. This developer can expand itself.

###The DOM element video of LayaAir

####Live video

In the era of HTML 5, video broadcasting is basically played with video tags. If video broadcasting has no rich experience, the best choice is to use mature playback plug-ins. What's popular now is[video.js](https://github.com/videojs/video.js),[hls.js](https://github.com/video-dev/hls.js),[plyr.js](https://github.com/Selz/plyr)。 It is excellent in compatibility, experience and performance. Officials of these plug-ins give demo. For example, https://plyr.io/, http://video-dev.github.io/hls.js/demo/, http://codepen.io/sampotts/pen/jkemqb.

Now let's take a look at the following[Plyr + hls.js](http://codepen.io/sampotts/pen/JKEMqB)Let's take an example and see what we should do in LayaAir.

New AS empty project. At the same time, add the following code in the index. HTML file:

![2](img/2.png)

`<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">`Player style file,

`<video preload="none" id="player" autoplay="" controls="" crossorigin=""></video>`Add a video tag. Name the ID "player", which we will use in the program later.

`<script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>`
`<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>`

This is the class library used by the player. Developers in production environments remember to download to their own projects or servers.

The following is the logic of the main class:


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


Compile the running code and find that the web page can play the video. Developers may notice that here we initialize the engine like this:

`Laya.init(0,0);//初始化引擎`Set the size to 0, because we don't interact with the stage here. So let's set it to 0 here, and we can't even initialize it. If the developer project contains logic for interacting with the stage, you can set your own size.

In the process of playback, developers can open the console of Google in F12 and switch to the Network tab to see that our video is a segment of TS file.

![3](img/3.png)

As the playback proceeds, more and more files are found. In fact, this is based on[hls](https://developer.apple.com/streaming/)Play the protocol. The basic principle of this technology is to divide the video file or video stream into small pieces (TS) and build index file (m3u8). Deeper principles, such as video decoding, video frame data, developers can refer to the following:

Https://developer.apple.com/streaming/.

Https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource.

Https://github.com/nickdesaulners/netfix

Https://developer.mozilla.org/en-US/docs/Web/API/HTML Media Element

In the above example, we use HLS + plyr to play. Other methods are extended by referring to this tutorial.

####Camera

The support of HTML 5 video as a camera browser is limited, and needs**HTTPS protocol**Google and the new version of Microsoft support is still good. If your compatibility is not that high, you can try adding the camera function.

Let's first look at the example given on MDN.

Https://mdn.github.io/webaudio-examples/stream-source-buffer/

Developers use mobile phones or Wechat to open this address to test the support of your phone.
[L!`6Q322IAT7251L4{J1PWW](img/L`6Q322IAT7251L4 {J1P]WW.png.

This is a test connection and the protocol is https. Developers should pay attention to this when calling cameras. Your remote address must be https.

More information can be found here: https://github.com/mdn/webaudio-examples. The links here are examples of sound and video given by mdn.

LayaAir also has a camera package, so let's see how to use it.


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


Compile and run the examples above, and find that they can not be opened. This is normal. To run this example, you need to build your own HTTPS server. Then use your mobile phone to open the index. HTML corresponding to this address. It's also easy to build a simple htpps server. Here we can use Laya's command line tool.

- First download node. Download the address https://nodejs.org/en/, and install it.

- After the installation is complete, open the CMD command line and enter NPM install-g layacmd to wait for the installation to complete.

- Find the index. HTML we just compiled. Hold Shift + right-click here to open the CMD window and enter layacmd open. Then a static server of HTTP and htpps will be launched. According to the address output from the command line, we can access this address with mobile Google browser or Wechat, such as https://10.10.20.34:8001/index.html.



###The DOM element File of LayaAir

In project development, we may use the need for users to upload pictures. This we need to use HTML 5 file tags（**Wechat should use the interface provided by Wechat. We will talk about it in the following tutorial. Other browsers may also have compatibility**) Let's write a simple example.


```java

package {
    import laya.display.Sprite;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(100,100);
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


Compile the above code and click the button. Choose a picture file or camera to take a picture and find that the picture has been displayed on the stage. So a simple program for calling albums or cameras is done. But we found this "button" very ugly. So how to change the button style? This needs to be handled with the help of CSS style. The traditional method is to set the transparency value of the button to 0, and then place a button that coincides with him instead. To change his style through such an illusion, it is he who actually clicks on it. It's just that the user doesn't feel it. So let's revise it and see how to change the style.


```javascript

 var file:Object = Browser.document.createElement("input");
 file.style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;";
 file.type ="file";
 file.style.position ="absolute";
 file.style.zIndex = 999;

```


Look at the complete code below:


```java

package {
    import laya.display.Sprite;
    import laya.ui.Button;
    import laya.utils.Browser;
    import laya.utils.Handler;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
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


Compile and run the code. You can see that the ugly DOM button is missing. When we click on our custom button, we can also select pictures and display them on the stage.

In the example above, we overlap it at the origin, set the transparency to 0, and camouflage it as invisible. Developers can try to put it in other places to test, but this tutorial is not implemented. Refer to the MDN and W3C instructions for other APIs of file. In addition to being displayed on the stage, there may also be upload server operations, at which time FormData can be used. This developer can try.

###DOM element script label of layaair

Sometimes our project has a lot of JS files, which are very large. It is not only a waste of traffic to load all of them at one time, but also a carton of pages, which leads to a very bad user experience. Compression obfuscation can reduce the amount of code, but a slightly larger project will have a large amount of code. Or local JS files, the first screen load is not necessary, at this time we need to load from the appropriate time, so it is necessary to split files and modules. Splitting files involves immediate loading. Then script tags will come in handy.

This function can be achieved by loading remote scripts through script's src. It can also be realized by setting the innerHTML of script. Of course, there is a third type of eval. Next, we will explain the usage of these cases separately.

####By setting SRC

The creation of script can be added to the page manually or created dynamically. Here we take code creation as an example to illustrate. Let's start with the code.

To create a new project in as language, the code logic is as follows:


```java

package {
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
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


Then create a new JS file, the simple code is as follows:


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


Let's briefly explain these two pieces of code.

`var script:Object = Browser.document.createElement("script");`Create a script tag.

`script.src = "demo1.js";`Set the path of the JS to load.

`script.onload  = ......`and`script.onerror =.... `Callback functions for load completion and load failure, respectively.

`Browser.document.body.appendChild(script);`Add the created script tag to the page.

`var client:Object = new Browser.window.Demo1();`Instantiate the class declared by js.

`client.start();`Call the function of the instance.

Compile and run the above code. Open Google's console and you can see the output:

**"I'm loaded in."**

**Call Method**

####Setting of innerHTML through script

Setting innerHTML is actually assigning the text format of JS to innerHTML. This allows us to convert remote loaded files into text content and assign labels by loading the file format. Let's look at an example.


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;
    
    public class Main {
        public function Main() {
            //初始化引擎
            Laya.init(500,500);
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


By compiling and running the above code, you can see that the effect is the same as that of SRC loading. This example uses HttpRequest to load the file and assign the loaded content to script. innerHTML. The tag parses itself and executes JS. Of course, this example is loaded with HTTP Request, and developers can also use Laya. loader. load method to load.

####Eval method for loading


```java

        private function completeHandler(e:Object):void
        {
            Browser.window.eval(e);
            var client:Object = new Browser.window.Demo1();
            client.start();
            
        }
```


We changed the previous load completion function to the previous one.`Browser.window.eval(e);`Then compile, open the console, and find that the effect is the same. This has nothing to do with script tags.

Summary: The above three common methods can achieve dynamic loading of JS files. What's the difference between the three methods?

- The script tag SRC loads the JS file, which can be different from the current page, that is to say, it can be loaded across domains.

- The script.innerHTML method receives the text format of a JS file, which is loaded in the way of XMLHttpRequest, so the file can not be cross-domain or allowed to load. The advantage is that the JS file can be customized format, such as encryption, interpolation of other formats, and then loaded in the binary format, which is decoded into the real JS in the program.

- Eval's approach is basically the same as script. innerHTML's. Loading content is also very arbitrary. However, Eval is not recommended. Eval is a fast-abandoned method, and it is not recommended in terms of performance and security. See the explanation of MDN for specific reasons

Https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval.


  **In fact, the way we load can also be put into the worker, which further reduces the page rendering pressure and Carton phenomenon. Developers can diverge by reading worker's tutorials.**

###Dom Elemental Sound of LayaAir

When it comes to the voice of html5, developers may think of the audio tag first, but the audio tag is extremely chicken ribs for the development project. Today we are talking about another interface. The Audio API provided by HTML5 for JavaScript programming enables us to manipulate the original audio stream data directly in the code and reproduce it arbitrarily. Audio api, W3C gives me enough[接口](https://www.w3.org/TR/webaudio/)In[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)The above description is also more detailed. In browsers that support better performance, the sound API can make a very rich visual effect. Because of the abundant API of sound, we will give a brief introduction to the usage here. For audio synthesis, mixing, sound effect, frequency spectrum analysis of audio data, audio plus filters, such as improving the tone color, developers can consult MDN or related information.

Let's start with an example on mdn. In this example, create a 2-second buffer, fill it with white noise, and then pass through[`AudioBufferSourceNode`] (https://developer.mozilla.org/zh-CN/docs/Web/API/AudioBufferSourceNode) to play it. The annotations show its functions.


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


Run the JS code above and click on the page to hear the sound playing out. So how to write in LayaAir?


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


Compile and run the example above, click on the stage, and you will hear the sound playing out. The simple example is to build a voice in memory. So what about external loading?

In the following example, we load a sound file externally. By the way, let's draw the spectrum of sound.



 
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


Compile and run the above project, click on the stage to see, the sound spectrum is displayed. The following diagram.

![6](img/6.gif)

Summary: We can see that the voice function of the web is becoming more and more powerful. If we do not consider the compatibility of some low-end computers, we can make a web player. Here is just to make a spectrum effect. Developers can try mixing, adding filters to sound and other functions. Related APIs can be consulted under mdn.


###The DOM element iframe of LayaAir

When inserting some websites of three parties, we usually use iframe, and even the channels of three parties basically use iframe to embed an application. We will also encounter the use of iframe in our projects. The following example demonstrates the application of iframe in a project.

Create a new empty project with ide. The code is as follows:


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


It's important to remind developers that location and hierarchy should remember settings. Many developers fail to notice that iframe runs beneath the game layer and is invisible.