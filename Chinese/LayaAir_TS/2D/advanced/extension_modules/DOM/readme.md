# LayaAir和原生Dom

在开发项目中，开发者难免遇到dom元素支持，但是LayaAir中不支持或者支持的不完善。那么本节我们就来看下在开发中遇到的一些技巧。

### LayaAir之SVG

什么是svg？可能大部分开发者听说过这个名词，或者也知道它是w3c规定的矢量图像描述格式。关于svg的一些定义和历史这里我们不再陈述，感兴趣的开发者可以参考[这里](https://ldc.layabox.com/doc/?nav=zh-as-3-4-1)。但是在项目中真正用到它的地方很少。但是svg的强大是不容忽视的，有些简单的图形，几行文本就可以描述出来，不必进行网络的加载。比如丰富的艺术字，比如奇形怪状的图形，比如文字的透视效果等等假如用程序实现，可能会困难重重，比如下面这个：

![1](img/1.png)</br>

假如你的项目中有这种文字如何处理呢？可能我们想到的是美术出图片。那有没有更简单的方法呢？这里我们选择用svg来进行处理。我们知道在dom元素中用div+css样式来显示这种效果是最简单快捷的方法。那么我们来借助css样式来展示这种效果。下面我们看下简单的脚本怎么实现这种效果。

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

怎么运行上边这段代码呢？打开谷歌浏览器，随便打开一个空白网页，F12，把上面的代码粘贴到控制台，然后回车，就能看到上面截图的效果。或者新建个html把代码粘贴进去，用浏览器打开。是不是很简单呢？然后我们可以任意修改显示的文字。开发者可以修改试试看效果。我们简单的介绍下这段代码。其中data是svg的数据格式，这个可以参考svg的定义和描述。

```javascript
<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">
//这里是重点，文字的效果我们是通过svg支持的css样式来设置 text-shadow设置的是文字的css样式效果，假如开发者想改变文字的样式，可以修改style即可。
```

上面是在JavaScript中，用原生的dom元素img来进行显示，那么在游戏中我们想用的话该怎么办呢？这个其实很简单，现在我们已经用img显示到页面上了，那么接下来我们要做的是如何在项目中应用和显示这个img。我们新建个项目。代码如下所示：

```typescript
class LayaUISample {
    constructor() {
        //初始化引擎
        Laya.init(600, 400);
      	Laya.stage.bgColor = "#ffcccc";
        var data: string = "data:image/svg+xml," + '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
            '<em>I</em> like ' +
            '<span style="color:white; text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;">' +
            'cheese</span>' +
            '</div>' +
            '</foreignObject>' +
            '</svg>';
        var sp: Laya.Sprite = new Laya.Sprite();
        sp.loadImage(data, 0, 0, 200, 200);
        Laya.stage.addChild(sp);
    }
}
new LayaUISample;
```

通过data来当做url传递给loadImage这个方法引擎就会帮我们加载并解码显示出来。loadImage这个方法中的参数不仅仅有接收地址的url还接收base64和svg的格式。编译运行上面的代码我们看到下图中的效果。

![2](img/2.png)</br>

总结：上面的代码给我们很好的启示，在项目中我们的特殊艺术字可以用这种方法更加简单方便。开发者可以自行找一些更加绚丽的效果，比如3D的透视效果，图文混排，阴影，倒影等等。这种方法不仅仅减少了网络的宽带，更重要的是方便我们时时修改。设置好一种样式，项目中导出都可以应用。假如用上面的方法代替位图字体的做法是不是更加高效快捷呢。

相关链接：

[https://codepen.io/pen/；](https://codepen.io/pen/%EF%BC%9B)

[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas；](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas%EF%BC%9B)



### LayaAir之Dom元素Image

在html5中，image标签功能强大，这里我们不想过多的介绍其特性，这里我们介绍简单的击中常用形式。

#### 二维码

比较常见的一种功能是在项目中显示当前的二维码地址。用户长按可以识别。这里生成二维码，我们借助第三方的js类库来生成二维码。类库代码可以再GitHub上下载，这里用的是这个[地址](https://github.com/davidshimjs/qrcodejs)。

新建个项目，把下载的qrcode.js添加到index.html中。qrcode的api请参考[地址](https://github.com/davidshimjs/qrcodejs)。具体的逻辑代码如下：

```typescript
class Main {
    //二维码对象
    private qrcode:any;
    private qrcodeSp:Laya.Sprite;
    constructor() {
        //初始化引擎
        Laya.init(600,400);
      	Laya.stage.bgColor = "#ffcccc";
        var div:any = Laya.Browser.document.createElement("div");
        this.qrcode = new Laya.Browser.window.QRCode(div,{
            width:100,
            height:100
        });
        var url:string = "http://layabox.com/";
        this.qrcode.makeCode(url);
        Laya.stage.once("click",this,this.clickHandler);
        this.qrcodeSp = new Laya.Sprite();
        Laya.stage.addChild(this.qrcodeSp);
    }
    private clickHandler():void{
        var url:string = this.qrcode._oDrawing._elImage.src;//获取，注意这里是异步的，开发者可以加个延时在获取。
        this.qrcodeSp.loadImage(url,0,0,100,100);
    }
}
new Main;
```

编译运行上面的代码，然后点击舞台可以看到，二维码已经显示到了舞台上，可以用手机扫下，发现手机已经跳转到了官网。**注意：这个时候生成的二维码在微信或者浏览器中长按没有任何反应，因为qrcode生成的是canvas标签而不是image标签。**所以要想长按弹出识别的选项，只有用image标签才可以。这个开发者可以自行扩展。



### LayaAir之Dom元素video

#### 视频直播

在html5时代，视频播放基本用的是video标签来播放，视频播放假如没有丰富的经验，最好的选择是用成熟的播放插件来实现。目前流行的是[video.js](https://github.com/videojs/video.js), [hls.js](https://github.com/video-dev/hls.js), [plyr.js](https://github.com/Selz/plyr)。无论在兼容性，体验和性能方面都是非常优秀的。这些插件的官方都给出了的demo。比如[https://plyr.io/，http://video-dev.github.io/hls.js/demo/，http://codepen.io/sampotts/pen/JKEMqB。](https://plyr.io/%EF%BC%8Chttp://video-dev.github.io/hls.js/demo/%EF%BC%8Chttp://codepen.io/sampotts/pen/JKEMqB%E3%80%82)

下面我们就以[Plyr + hls.js](http://codepen.io/sampotts/pen/JKEMqB)来为例子，看看在LayaAir中我们应该怎么写。

新建个AS的空项目。同时在index.html文件中加入如下代码：

![3](img/3.png)</br>

`<link rel="stylesheet" href="https://cdn.plyr.io/1.8.2/plyr.css">`播放器的样式文件，

`<video preload="none" id="player" autoplay controls crossorigin></video>`添加video标签。命名id为“player”，这个一会我们在程序中会用到。

`<script src="https://cdn.plyr.io/1.8.2/plyr.js"></script>`
`<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.js"></script>`

这是播放器用到的类库。开发者在生产环境中记得下载到自己的项目中或者服务器中。

 下面是主类的逻辑：

```typescript
class LayaUISample {
    constructor() {
        //初始化引擎
        Laya.init(0,0);
        var Hls:any = Laya.Browser.window.Hls;//获取对Hls的引用。
        var plyr:any = Laya.Browser.window.plyr;//获取对plyr的引用
        //获取video对象，就是页面上命名为“player”的标签
        var video:any = Laya.Browser.document.querySelector('#player');
        if(Hls.isSupported()){
            var hls:any = new Hls();
            //加载m3u8源
            hls.loadSource('http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED,function():void{
                    video.play();
            });
        }
        plyr.setup(video);
    }
}
new LayaUISample;
```

编译运行代码，发现网页已经可以播放视频了。开发者可能注意到这里我们初始化引擎的时候是这样的：

`Laya.init(0,0);//初始化引擎`;设置尺寸为0，因为这里我们没有和舞台的交互。所以我们这里设置为0，我们甚至可以不初始化。假如开发者项目中含有和舞台交互的逻辑，可以设置适合自己的尺寸。

 在播放的过程中开发者可以F12 打开谷歌的控制台，切换到Network标签看下我们的视频是一段段的ts文件。

![4](img/4.png)</br>

随着播放的进行，发现文件的个数越来越多。其实这就是基于[hls](https://developer.apple.com/streaming/)协议的播放。该技术基本原理是将视频文件或视频流切分成小片(ts)并建立索引文件(m3u8)。更深层次的原理，比如视频解码，视频帧数据，开发者可以参考如下：

[https://developer.apple.com/streaming/。](https://developer.apple.com/streaming/%E3%80%82)

[https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource。](https://developer.mozilla.org/zh_CN/docs/Web/API/MediaSource%E3%80%82)

[https://github.com/nickdesaulniers/netfix](https://github.com/nickdesaulniers/netfix)

[https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

上面的例子我们使用hls+plyr来进行播放。其他的方法请开发者参考本教程进行扩展。

#### 摄像头

 html5的video做摄像头浏览器的支持度是有限的，而且需要**https的协议**谷歌和新版的微信支持度还是不错的。假如你的兼容性不要求那么高，可以尝试下添加摄像头的功能。

下面我们先来看下mdn上给的例子。

[https://mdn.github.io/webaudio-examples/stream-source-buffer/](https://mdn.github.io/webaudio-examples/stream-source-buffer/)

开发者用手机或者微信打开这个地址测试下你手机的支持度。

![5](img/5.png)</br>

这个是个测试的连接，协议也是https的，开发者在调用摄像头的时候要注意这一点。自己的远端地址一定要https。

 更多的资料可以参考这里:[https://github.com/mdn/webaudio-examples.。这里的链接是mdn给出的声音和视频的例子。](https://github.com/mdn/webaudio-examples.%E3%80%82%E8%BF%99%E9%87%8C%E7%9A%84%E9%93%BE%E6%8E%A5%E6%98%AFmdn%E7%BB%99%E5%87%BA%E7%9A%84%E5%A3%B0%E9%9F%B3%E5%92%8C%E8%A7%86%E9%A2%91%E7%9A%84%E4%BE%8B%E5%AD%90%E3%80%82)

 LayaAir关于摄像头也有相应的封装，下面我们来看下用法。

```typescript
class Main {
    private video:Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(Laya.Browser.width,Laya.Browser.height);
        if(Laya.Media.supported() === false){
            alert("当前浏览器不支持");
        }
        else{
            this.showMessage();
            var options:any = {
                audio:true,
                video:{
                    facingMode: { exact: "environment" },    // 后置摄像头，默认值就是，不设至也可以。
                    width: Laya.stage.width,
                    height:Laya.stage.height
                }
            };
            Laya.Media.getMedia(options,Laya.Handler.create(this,this.onSuccess),Laya.Handler.create(this,this.onError));
        }
    }
    private showMessage():void{
        var tex:Laya.Text = new Laya.Text();
        Laya.stage.addChild(tex);
        tex.text = "单击舞台播放和暂停";
        tex.color = "#ffffff";
        tex.fontSize = 100;
        tex.valign = "middle";
        tex.align = "center";
        tex.size(Laya.stage.width,Laya.stage.height);
    }
    private onSuccess(url:string):void{
        this.video = new Laya.Video(Laya.stage.width,Laya.stage.height);
        this.video.load(url);
        Laya.stage.addChild(this.video);
        Laya.stage.on("click",this,this.onStageClick);
    }
    private onerror(error:Error):void{
        alert(error.message);
    }
    private onStageClick():void{
        //切换播放和暂停
        if(!this.video.paused){
            this.video.pause();
        }
        else{
            this.video.play();
        }
    }
}
new Main;
```

编译运行上面的例子，发现打不开。这很正常，运行这个例子要自己搭建一个https的服务器。然后用手机打开这个地址对应的index.html。搭建一个简单的htpps服务器也很简单。这里我们借助Laya的命令行工具就可以。

- 首先下载node。下载地址[https://nodejs.org/en/，进行安装。](https://nodejs.org/en/%EF%BC%8C%E8%BF%9B%E8%A1%8C%E5%AE%89%E8%A3%85%E3%80%82)
- 安装完成之后 打开cmd 命令行，输入 npm install -g layacmd 等待安装完成。
- 找到我们刚才编译的那个index.html。按住shift+右键 在此处打开cmd窗口 输入layacmd open ，然后就会启动一个http和htpps的静态服务器，根据命令行输出的地址，然后我们用手机谷歌浏览器或者微信访问这个地址 比如我们这里是[https://10.10.20.34:8001/index.html。](https://10.10.20.34:8001/index.html%E3%80%82)

### LayaAir之dom元素File

在项目开发中我们可能会用到让用户上传图片的需求。这个我们需要借助html5的file标签（**微信的要用微信提供的接口，后面的教程我们专门在微信教程中讲。其他浏览器也可能存在兼容性问题**）。下面我们写的简单的例子。

```typescript
class Main {
    private video:Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(100,100);
        var file:any = Laya.Browser.document.createElement("input");
        file.type = "file";
        file.style.position = "absolute";
        file.style.zIndex = 999;
        Laya.Browser.document.body.appendChild(file);//添加到舞台
        var fileReader:any = new  Laya.Browser.window.FileReader();
        file.onchange = function(e:any):void
        {
            if(file.files.length){
                fileReader.readAsDataURL(file.files[0]);
            }
        };
        fileReader.onload = function(evt):void
        {  
            if(Laya.Browser.window.FileReader.DONE == fileReader.readyState)
            {
                var sp:Laya.Sprite = new Laya.Sprite();
                sp.loadImage(fileReader.result,0,0,300,300);
                Laya.stage.addChild(sp);
            }
        }
    }
}
new Main;
```

编译上面的代码，点击按钮。选择一个图片文件或者相机进行拍照，发现图片已经显示到舞台上了。那么一个简单的调用相册或者相机的程序就这样完成了。但是我们发现这个“按钮”非常丑陋。那么怎么改变这个按钮样式呢?这个就需要借助css样式来处理下。传统的做法就是把这个按钮的透明值设置为0，然后在放一个和他重合的按钮来代替。通过这样的假象来改变他的样式，其实实际点击的还是他。只不过用户感觉不到。那么我们就来修改下，看看怎么改变样式。

```typescript
//创建隐藏的file并且把它和按钮对齐。达到位置一致，这里我们默认在0点位置
var file:any = Laya.Browser.document.createElement("input");
//设置file样式
file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
file.type ="file";//设置类型是file类型。
file.accept="image/png";//设置文件的格式为png；
file.style.position ="absolute";
file.style.zIndex = 999;
```

下面看下完整的代码：

```typescript
class Main {
    private video:Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(100,100);
        var skins:any = ["res/a.png"];
        Laya.loader.load(skins,Laya.Handler.create(this,this.onUIAssetsLoaded));
    }
    private onUIAssetsLoaded():void{
        var btn:Laya.Button = new Laya.Button("res/a.png");
        Laya.stage.addChild(btn);

        //创建隐藏的file并且把它和按钮对齐。达到位置一致，这里我们默认在0点位置
        var file:any = Laya.Browser.document.createElement("input");
        //设置file样式
        file.style="filter:alpha(opacity=0);opacity:0;width: 150px;height:60px;";
        file.type ="file";//设置类型是file类型。
        file.accept="image/png";//设置文件的格式为png；
        file.style.position ="absolute";
        file.style.zIndex = 999;
        Laya.Browser.document.body.appendChild(file);//添加到页面；
        var fileReader:any = new  Laya.Browser.window.FileReader();
        file.onchange = function(e:any):void
        {
            if(file.files.length>0)
            {
                fileReader.readAsDataURL(file.files[0]);
            }
        };
        fileReader.onload = function(evt):void
        {  
            if(Laya.Browser.window.FileReader.DONE == fileReader.readyState)
            {
                var sp:Laya.Sprite = new Laya.Sprite();
                sp.loadImage(fileReader.result,0,0,100,100);
                Laya.stage.addChild(sp);
            }
        };
    }
}
new Main;
```

编译运行代码，可以看到，那个丑陋的dom按钮不见了。我们点击我们自定义的按钮，一样可以选择图片，显示到舞台上。

上面的例子我们是把它在原点重合，设置透明度为0,伪装成了不可见。开发者可以试着放到其他的位置来测试下，本节教程不在具体实现。关于file的其他api请参考mdn和w3c相关说明。除了显示到舞台上，可能还有上传服务器的操作，这时候可以用FormData。这个开发者可以尝试下。

### LayaAir之dom元素script标签

 有时候我们项目的js文件很多，很大，一次性的全部加载进来不仅仅是流量的浪费，还会造成页面的卡顿，导致极差的用户体验。用压缩混淆的方式虽然能减小些，但是稍微大一点的项目，代码量就会很大。或者地方的js文件，首屏加载时不必要的，这时候我们就需要自适当的时候在加载，因此拆分文件和模块非常必要。拆分文件，就会涉及到即用即加载。那么这时候script标签就会派上用场。

 通过script的src来加载远端脚本，可以实现这种功能。也可以通过设置script的innerHTML来实现，当然还有第三种eval。下面我们就这几种情况分别说明下用法。

#### 通过设置src来实现

 script的创建可以手动添加到页面，也可以代码动态的创建。这里我们以代码创建为例子进行说明。我们先上代码.

代码逻辑如下：

```typescript
class Main {
    private video:Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(500,500);
        var script:any = Laya.Browser.document.createElement("script");
        script.src = "demo1.js";
        script.onload = function():void{
            //加载完成函数，开始调用模块的功能。
            //new一个js中的对象
            var client:any = new Laya.Browser.window.Demo1();
            client.start();
        }
        script.onerror = function():void{
            //加载错误函数
        }
        Laya.Browser.document.body.appendChild(script);
    }
}
new Main;
```

然后再新建一个js文件，简单代码如下：

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

下面我们简单的讲解下这两段代码。

`var script:any = Laya.Browser.document.createElement("script");`创建一个script标签。

`script.src = "demo1.js";`设置要加载的js的路径。

`script.onload = ......`和`script.onerror =....`分别是加载完成和加载失败的回调函数。

`Laya.Browser.document.body.appendChild(script);`把创建的script标签添加到页面。

`var client:any = new Laya.Browser.window.Demo1();`实例化js声明的那个类。

`client.start();`调用实例的函数。

编译运行上面的代码。打开谷歌的控制台，可以看到输出：

**“我被加载进来了”**

**“调用方法”**

#### 通过script的innerHTML设置

 设置innerHTML其实就是把js的文本格式赋值给innerHTML。这个我们可以通过加载文件的格式把远端加载的文件转换成文本内容赋值给标签。下面看下例子。

```typescript
class Main {
    private video:Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(500,500);
        var httpreq:Laya.HttpRequest = new Laya.HttpRequest();
        httpreq.on(Laya.Event.COMPLETE,this,this.completeHandler);
        httpreq.on(Laya.Event.ERROR,this,this.errorHandler);
        httpreq.send("demo1.js");
    }
    private completeHandler(e:any):void{
        var script:any = Laya.Browser.document.createElement("script");
        Laya.Browser.document.body.appendChild(script);
        script.innerHTML = e;
        var client:any = new Laya.Browser.window.Demo1();
        client.start();
    }
    private errorHandler(e:any):void{
        
    }
}
new Main;
```

编译运行上面的代码，可以看到效果和用src加载的效果是一样的。这个例子是用HttpRequest来加载文件然后把加载的内容赋值给script.innerHTML。标签自行解析执行js。当然本例子是用的HttpRequest来加载，开发者也可以用Laya.loader.load的方法来进行加载。

#### eval方法进行加载

```typescript
private completeHandler(e:any):void{
  Laya.Browser.window.eval(e);
  var client:any = new Laya.Browser.window.Demo1();
  client.start();
}
```

我们把前面的加载完成函数改上面的 `Laya.Browser.window.eval(e);` 然后编译，打开控制台，发现效果是一样的。这个和script标签已经没有什么关系了。

 总结:上面的三种常用的方法都可以实现动态加载js文件。三种方法有什么不同呢？

- script标签src的方式加载的是js文件，这个js文件可以和当前页面不同源，也就是说可以跨域加载。

- script.innerHTML的方法接收的是一段js文件的文本格式，用的是XMLHttpRequest方式进行加载，所以文件不能跨域，或者说允许加载才可以，优点就是这个js文件可以自定义格式，比如进行加密，穿插别的格式，然后用二进制的格式进行加载，在程序中在解码成真正的js。

- eval的方法和script.innerHTML的方式基本差不多。加载的内容也是很随意。不过不推荐eval这种方式，eval是快被废弃的方法，无论在性能还是安全性方面都是不推荐使用的。具体的原因请看mdn的解释

  [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval%E3%80%82)

  **其实加载的方式我们还可以放到worker中去，这样更加的减少了页面的渲染压力和卡顿现象。开发者可以阅读worker的教程进行发散。**

### LayaAir之dom元素声音

 说起html5的声音，开发者可能第一个想到的是audio标签，但是audio标签对于开发项目极其鸡肋，今天我们讲到的是另一个接口，HTML5提供给JavaScript编程用的Audio API则让我们有能力在代码中直接操作原始的音频流数据，对其进行任意加工再造。音频的api，w3c给我提供了足够的[接口](https://www.w3.org/TR/webaudio/)，在[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext)上面介绍的也比较详细。在支持比较完善的浏览器上，声音的api能做出的视觉效果极其丰富。由于声音的api极其丰富，我们这里就抛砖引玉，简单介绍下用法，至于音频的合成，混音，音效，音频数据进行频谱分析，音频加上滤镜比如提高音色等开发者可以查阅mdn或者相关资料。

 我们先看下mdn上的一个例子。在这个例子中, 创建一个2秒的缓冲器,并用白噪音填充它, 然后通过[`AudioBufferSourceNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioBufferSourceNode)来播放它. 注释里说明了它的功能。

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

运行上面的js代码，单击页面就会听到声音播放出来了。那么用LayaAir怎么写呢？

```typescript
class Main {
    private video: Laya.Video;
    constructor() {
        //初始化引擎
        Laya.init(500, 500);
        Laya.stage.bgColor = "#ff0000";
        var audioCtx: any = new (Laya.Browser.window.AudioContext || Laya.Browser.window.webkitAudioContext)();
        //Stereo
        var channels: number = 2;
        // Create an empty two-second stereo buffer at the
        // sample rate of the AudioContext
        var frameCount: number = audioCtx.sampleRate * 2.0;
        var myArrayBuffer: any = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);
        Laya.stage.on(Laya.Event.CLICK, this, function (): void {
            // Fill the buffer with white noise;
            //just random values between -1.0 and 1.0
            for (var channel: number = 0; channel < channels; channel++) {
                // This gives us the actual ArrayBuffer that contains the data
                var nowBuffering: Object = myArrayBuffer.getChannelData(channel);
                for (var i: number = 0; i < frameCount; i++) {
                    // Math.random() is in [0; 1.0]
                    // audio needs to be in [-1.0; 1.0]
                    nowBuffering[i] = Math.random() * 2 - 1;
                }
            }
            // Get an AudioBufferSourceNode.
            // This is the AudioNode to use when we want to play an AudioBuffer
            var source: any = audioCtx.createBufferSource();
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
new Main;
```

编译运行上面的例子，单击舞台，就会听到声音播放出来。这个例子很简单，就是在内存中构建出一个声音。那么外部加载的怎么办呢？

下面这个例子我们就外部加载一个声音文件。顺便把声音的频谱我们画出来。

```typescript
class Main {
    private AudioContext:any;
    private audioContext:any;
    private analyser:any;
    private audioBufferSourceNode:any;
    constructor() {
        //初始化引擎
        Laya.init(500, 500);
        AudioContext = Laya.Browser.window.AudioContext || Laya.Browser.window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        Laya.stage.once(Laya.Event.CLICK,this,this.clickHandler);
    }
    private clickHandler(e:any):void
    {
        var http:Laya.HttpRequest = new Laya.HttpRequest();
        http.on(Laya.Event.COMPLETE,this,this.completeHandler);
        http.send("res/3.mp3","","get",Laya.Loader.BUFFER);
    }
    private completeHandler(e:any):void
    {
        this.audioContext.decodeAudioData(e,this.decodeAudioData.bind(this));
    }
    private decodeAudioData(buffer:any):void
    {
        this.audioBufferSourceNode = this.audioContext.createBufferSource();
        this.audioBufferSourceNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.audioBufferSourceNode.buffer = buffer;
        this.audioBufferSourceNode.start(0);
        Laya.timer.loop(1,this,this.drawHandler);
    }
    private drawHandler():void
    {
        Laya.stage.graphics.clear();
        var dataArray:Uint8Array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        var step:number = Math.round(dataArray.length / 60);
        for (var i:number = 0; i < 40; i++) {
            var energy:number = (dataArray[step * i] / 256.0) * 50;
            for (var j:number = 0; j < energy; j++) {
                Laya.stage.graphics.drawLine(20 * i + 2, 200 + 4 * j,20 * (i + 1) - 2, 200 + 4 * j,"#ff0000",1);
                Laya.stage.graphics.drawLine(20 * i + 2, 200 - 4 * j,20 * (i + 1) - 2, 200 - 4 * j,"#ffff00",1);
            }
            Laya.stage.graphics.drawLine(20 * i + 2, 200,20 * (i + 1) - 2, 200,"#ff0000",1);
        }
    }
}
new Main;
```

编译运行上面的项目，点击舞台可以看到，声音的频谱就显示出来了。如下图所示：

![6](img/6.gif)</br>

总结:可以看到 web的声音功能越来越强大，假如不考虑某些低端机的兼容性，完全可以做一个web的播放器。这里只是做出了一个频谱的效果，开发者可以试试混音，给声音加滤镜等等功能。相关的api可以查阅下mdn。

### LayaAir之dom元素iframe

在插入三方的一些网站的时候我们一般会用到iframe，甚至三方的渠道基本都是用iframe嵌入一个应用。我们项目中也会遇到用iframe的情况。下面的例子就是演示在项目中应用iframe。

代码如下所示：

```typescript
class Main {
    constructor() {
        //初始化引擎
        Laya.init(500, 500);
        Laya.stage.once(Laya.Event.CLICK,this,this.clickHandler);
    }
    private clickHandler():void{
        var iframe:any = Laya.Browser.document.createElement("iframe");
        iframe.style.position ="absolute";//设置布局定位。这个不能少。
        iframe.style.zIndex = 100;//设置层级
        iframe.style.left ="100px";
        iframe.style.top ="100px";
        iframe.src = "http://ask.layabox.com/";
        Laya.Browser.document.body.appendChild(iframe);
    }
}
new Main;
```

 这里面需要提醒开发者的就是定位和层级要记得设置。很多开发者不注意导致iframe跑到游戏层的下面儿看不见。