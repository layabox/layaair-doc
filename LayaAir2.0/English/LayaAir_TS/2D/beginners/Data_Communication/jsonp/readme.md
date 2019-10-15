#JSONP reads data across domains

Web developers have basically used JSONP. So what is JSONP? Is it also a data format? What does it have to do with JSON? Does LayaAir support JSONP? The following questions are answered one by one.



###I. What is JSONP

JSONP (JSON with Padding) is a "usage mode" of JSON, which allows web pages to obtain data from other domain names (websites), that is, cross-domain reading of data. Why do we need a special technology (JSONP) to access data from different domains (websites)? This is because of the homology strategy. Homologous Policy, a well-known security policy proposed by Netscape, is now used by all JavaScript-enabled browsers.

It can be seen from the definition that JSON is a data exchange format, while JSONP is a cross-domain data exchange protocol. One is to describe the format of information, the other is the method agreed by both sides of information transmission, which can be used to solve the problem of cross domain data access of mainstream browsers. Owing to the homology strategy, web pages located at xxx.com can not communicate with non-xxx.com servers in general, but DOM elements of HTML are an exception. Generally speaking, DOM elements with SRC attributes are not restricted across domains. So we think of SRC with <script> tag. Using this SRC web page, we can get JSON data dynamically generated from other sources, and this mode of use is So-called JSONP. The data captured with JSONP is not JSON, but arbitrary JavaScript, which is executed with a JavaScript translator rather than parsed with a JSON parser.



###How to use it?

1. Call the URL Service that provides JSONP support on the client side to get the data in JSONP format.

If the customer wants to visit http://www.layabox.com/?Jsonp=callbackFunction

Suppose the customer expects to return JSON data: ["data1, data2]

Then Script Tags: callbackFunction (["data1", "data2"]) that actually returns to the client

Therefore, the client can write as follows:

Add the following label to your HTML page:


```javascript

<script type = "text/javascript" src = ">
```


This callback method for your JavaScript file can be written as follows:


```javascript

<script type = "text/javascript">
function callbackFunction(data1,data2)
{
  //这里写你的回调逻辑
}
</script>
```


So how to write and use it in LayaAir? In fact, it's very simple. Here we need a server to see the effect. Server We chose nodejs to build a simple server. The installation of nodejs is not explained in detail here. You can refer to the nodejs website or search for your own information.

After the installation of nodejs, we can create a simple server by writing a simple JS script. The code is as follows:


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


This means that the server passes back to the client LayaSample. onComplete () and executes the function.

A simple server is created with a few lines of code, then the command line is opened and the JS file or script is run with nodejs. You can see that the server is up.



Next we write the logic of the front end. Open the IDE of LayaAir to create an empty project. Language selection as3. The code is as follows:


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

Then F12 opens Google's console and finds that it outputs "JSONP executes here"; that is, it executes our onComplete function. This completes the function of JSONP.