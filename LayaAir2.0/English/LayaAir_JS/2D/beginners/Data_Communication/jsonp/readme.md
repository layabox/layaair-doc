#JSONP reads data across domains

Web developers have basically used JSONP. So what is JSONP? Is it also a data format? What does it have to do with JSON? Does LayaAir support JSONP? The following questions are answered one by one.



###I. What is JSONP

JSONP (JSON with Padding) is a "usage mode" of JSON, which allows web pages to obtain data from other domain names (websites), that is, cross-domain reading of data. Why do we need a special technology (jsonp) to access data from different domains (websites)? This is because of the homology strategy. Homologous Policy, a well-known security policy proposed by Netscape, is now used by all JavaScript-enabled browsers.

It can be seen from the definition that JSON is a data exchange format, while JSONP is a cross-domain data exchange protocol. One is the format of describing information, the other is the method agreed by both sides of information transmission, which can be used to solve the problem of cross-domain data access in mainstream browsers. Because of the same origin policy, generally speaking, the web page located at xxx.com cannot communicate with the server not at xxx.com, while the DOM element of HTML is an exception. Generally speaking, the DOM element with SRC attribute is not limited by cross domain. Therefore, we think of the SRC with < script > tag. Using this SRC web page, we can get JSON data generated dynamically from other sources. This mode of use is So-called JSONP. The data captured with JSONP is not JSON, but arbitrary JavaScript, which is executed with a JavaScript translator rather than parsed with a JSON parser.



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


So how to write and use it in LayaAir? In fact, it's very simple. Here we need a server to see the effect. Server we choose nodejs to build a simple server. The installation of nodejs will not be explained in detail here. You can refer to the nodejs website or search for your own information.

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


```javascript

var LayaSample = (function(){
    function LayaSample(){
        Laya.init(100,100);
        var script = Laya.Browser.createElement("script");
        Laya.Browser.document.body.appendChild(script);
        script.src = "http://localhost:9090/?a=1";
    }
    LayaSample.onComplete = function(){
        console.log("JSONP执行到这里");
    }
    return LayaSample;
})();
new LayaSample();
```



```java

var script = Laya.Browser.createElement("script");//这句话的含义是创建一个脚本的标签，原生的所有dom元素都可以通过这个方法创建。
```



```java

Laya.Browser.document.body.appendChild(script);//是把创建的script标签添加到body上。
```



```java

script.src = "http://localhost:9090/?a=1";//设置script的远程访问地址。这句话就可以请求到我们刚才创建的那个服务器。用谷歌打开LayaAirIDE生成的二维码地址。
```


![1](img/1.png)<br/>


Then F12 opens Google's console and finds that it outputs "JSONP executes here"; that is, it executes our onComplete function. This completes the function of JSONP.