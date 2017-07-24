# JSONP跨域读取数据

web的开发者基本都用过JSONP。那什么是JSONP呢？它是不是也是一种数据格式呢？和JSON有什么关系呢？LayaAir支不支持JSONP呢？下面就这些问题逐一解答。



### 一、什么是JSONP

JSONP（JSON with Padding）是JSON的一种“使用模式”，可以让网页从别的域名（网站）获取到资料，即跨域读取数据。为什么我们从不同的域（网站）访问数据需要一个特殊的技术（JSONP）呢？这是因为同源策略。同源策略，它是由Netscape提出的一个著名的安全策略，现在所有支持JavaScript的浏览器都会使用这个策略。

从定义可以看出JSON是一种数据交换格式，而JSONP是一种跨域数据交互协议。一个是描述信息的格式，一个是信息传递双方约定的方法，可用于解决主流浏览器的跨域数据访问的问题。由于同源策略，一般来说位于xxx.com的网页无法与非xxx.com的服务器沟通，而HTML的DOM元素是一个例外，一般来讲凡是带有src属性的DOM元素不受跨域的限制，由此我们想到了<script>标签的src，利用这个src网页可以得到从其他来源动态产生的JSON资料，而这种使用模式就是所谓的JSONP。用JSONP抓到的资料并不是JSON，而是任意的JavaScript，用JavaScript执译器执行而不是用JSON解析器解析。



### 二、如何使用？

1.在客户端调用提供JSONP支持的URL Service，获取JSONP格式数据。

如果客户想访问http://www.layabox.com/?jsonp=callbackFunction

假设客户期望返回JSON数据：[“data1”，data2]

那么真正返回到客户端的Script Tags:callbackFunction(["data1","data2"])

因此，客户端可以这样写：

在你的html页面加上如下的标签：

```javascript
<script type = "text/javascript" src = ">
```

你的JavaScript文件的这个回调方法可以这样写：

```javascript
<script type = "text/javascript">
function callbackFunction(data1,data2)
{
  //这里写你的回调逻辑
}
</script>
```

那么在LayaAir中怎么写和使用呢？其实很简单，这里我们需要借助一个服务器才可以看到效果。服务器我们选择nodejs搭建一个简单的服务器，nodejs的安装这里不再详细解释。可以参考nodejs官网或者自己搜索资料。

安装完成nodejs后我们写一段简单的js脚本就可以创建一个简单的服务器。代码如下：

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

这句话的意思是服务器回传给客户端LayaSample.onComplete()并且执行这个函数。

通过几行代码就创建了一个简单的服务器，然后打开命令行，用nodejs运行这个js文件或者脚本。就可以看到服务器启动了。



接下来我们写前端的逻辑。打开LayaAir的IDE创建一个空项目，语言选择as3，具体代码如下所示：

```java
package
{
	import laya.utils.Browser;

	public class LayaSample
	{
		public function LayaSample()
		{
			Laya.init(100,100);
			var script:* = Browser.createElement("script");
			Browser.document.body.appendChild(script);
			script.src = "http://localhost:9090/?a=1";
		}
		public static function onComplete():void{
			trace("JSONP执行到这里");
		}
	}
}
```

```java
var script:* = Browser.createElement("script");//这句话的含义是创建一个脚本的标签，原生的所有dom元素都可以通过这个方法创建。
```

```java
Browser.document.body.appendChild(script);//是把创建的script标签添加到body上。
```

```java
script.src = "http://localhost:9090/?a=1";//设置script的远程访问地址。这句话就可以请求到我们刚才创建的那个服务器。用谷歌打开LayaAirIDE生成的二维码地址。
```

![1](img/1.png)<br/>

然后F12打开谷歌的控制台，发现输出了“JSONP执行到这里”；也就是执行了我们的onComplete这个函数。这样就完成了JSONP的功能。