#Pictures and Binary

In the era of page-browsing, in order to prevent resources from being stolen, the usual way is to encrypt pictures and other resources. The so-called encryption is to disrupt the resource's original memory bytes, or to interpolate something. But in the age of HTML 5, it was found that most of the images were loaded directly. Why is it different from the way in the age of page-surfing? Can't HTML 5 load and decode binary pictures? Of course not. The reason why we don't encrypt this layer of operation is that the source code of our project is completely exposed in the browser, there is no secret at all. Even if encrypted, you can get your source code by writing a script to execute. But in order to meet the needs of developers, let's briefly talk about how HTML 5 operates on binary images.

###Have to say XMLHttpRequest

When it comes to loading files, what I have to say is`XMLHttpRequest`Here's a brief introduction. Please move on to the detailed tutorial.`HTTPRequest`Chapter. XMLHttpRequest is an interface of browser, which enables JavaScript to communicate with HTTP (S). This is the core of Ajax that we often talk about. The standard of XMLHttpRequest is divided into Level 1 and Level 2. Here we are talking about the scope of HTML 5, so Level 1 is of little significance to us. Here we put it down to HTML 4, HTML 5. Our main concern is Level 2. For developers to understand, we compare the two standards:

**The main drawbacks of Level are:**

##- Due to the limitation of the Same-Origin policy, cross-domain requests cannot be sent.Binary files (such as picture, video, audio, etc.) cannot be sent, but plain text data can only be sent;
- In the process of sending and acquiring data, it is impossible to obtain progress information in real time, and only can judge whether it is completed or not.

**The improvements of Level 2 relative to Level are as follows:**

##- Trans-domain requests can be sent with the permission of the server.Support for sending and receiving binary data;
##- FormData object is added to support the sending of form data.When sending and acquiring data, progress information can be obtained.
- The request timeout can be set.

One of the things that we are most concerned about from the above comparison is**Support for sending and receiving binary.**This is a major breakthrough, which makes it possible for us to load binary images remotely.

###How to load

As for how to load, here we start from the original and then transit to the LayaAir engine, so that developers can understand what it means. Loading in the form of binary stream, here we use the way of XMLHttpRequest binary stream to load. The operation of XMLHttpRequest will not be stated here, but will be explained in a separate chapter. Let's try loading in binary mode first. Here we first use js script to operate. The code is as follows:


```JavaScript

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


The above method uses the method provided by the browser itself to convert binary into pictures. There are many ways to convert binary into pictures, such as loading binary, decoding it into base64, assigning binary data to your img, or drawing pictures with canvas, then assigning the SRC of your img to the data URL, and so on. There are many ways. Here we use the simplest and most effective way to convert pictures.

When the image is loaded, a ZMLHttpRequest object XHR is instantiated.`responseType`Property set to`arraybuffer`Instantiate a Blob object`blob`To create an img tag,`window.URL.createObjectURL(blob)`Create a URL pointing to the parameter object and add the created img object to the body of the Web page for display. Embedding this code in the index. HTML file, you can see that the web page has displayed our pictures properly.

###How to use it in Laya?

The simple example above is written in JS script, so how to use img of DOM element in the project? Let's explain below.

Create an empty project and write the following code:


```javascript

//初始化引擎
Laya.init(1136,640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/monkey2.png","","get","arraybuffer");
function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
  	var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(url){

}
```


Second, we can draw a texture to display:


```JavaScript

function completeHandler(data){
  	//加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([data], { type: "image/png" });
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象；
    ////我们先用第一种方式显示图片到舞台；
    var sp = new Laya.Sprite();
    sp.loadImage(url);
    Laya.stage.addChild(sp);//添加到舞台 //用loader来加载url
    Laya.loader.load(url,Laya.Handler.create(this,showImg,[url]),null,Laya.Loader.IMAGE);
}
function errorHandler(url){
    var t = new Laya.loader.getRes(url);
    var ape = new Laya.Sprite();
    ape.graphics.drawTexture(t,0,0);
    Laya.stage.addChild(ape);
    ape.pos(200,0);
}
```


Third, we directly create a texture to display:


```javascript

function completeHandler(data){
    //加载完成返回的data是arraybuffer
    //......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片前面写入了四个字节的数据
    //......解密逻辑开始处理数据
    var byte = new Laya.Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob = new Laya.Browser.window.Blob([byte.buffer],{type:"image/png"});
    var url = Laya.Browser.window.URL.createObjectURL(blob);//创建一个url对象
    var htmlImg = Laya.HTMLImage.create(url);//这里创建HTMLImage，这里要用HTMLImage.create
    htmlImg.onload = function(){
        var t = new Laya.Texture(htmlImg);
        var ape = new Laya.Sprite();
        ape.graphics.drawTexture(t,0,0);
        Laya.stage.addChild(ape);
        ape.pos(200,0);
    }
}
```


The above method is the binary processing method, in fact, there are many other methods, such as remote image resources processing into Base64 + data, front-end loading, direct decryption to remove the doped data. Next we use one of these methods to load the display onto the stage.


```javascript

//初始化引擎
Laya.init(1336, 640);
var sp = new Laya.Sprite();
var xhr = new Laya.HttpRequest();
xhr.once(Laya.Event.COMPLETE,this,completeHandler);
xhr.once(Laya.Event.ERROR,this,errorHandler);
xhr.send("res/data.data","","get","text");

function completeHandler(data){
    //......加载完成，把base64字符串的图片数据提取出来；
    //......提取base64字符串；
    //......假设得到的数据是data；
    var sp = new Laya.Sprite();
    sp.loadImage(data);
    Laya.stage.addChild(sp);//添加到舞台
}
function errorHandler(e){

}
```


All the examples above are used by us.`HttpRequest`To load, developers can also use`Laya.loader.load`Method loading, about`Laya.loader.load`For detailed use, please move to the relevant tutorial documentation. It is not stated here.

In the above example, we use`HttpRequest`With single-threaded loading, there are actually multi-threaded in HTML 5. In order to prevent the page from being unresponsive and improve the user experience, we can use worker to load. The related tutorials will be explained in the section of worker.