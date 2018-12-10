# AS3与JS混合编码

　　AS3与JS交互是一种常见的需求，flash插件提供了一个简单的接口函数`ExternalInterface.call`和`ExternalInterface.addCallback`与JS交互。但是发布HTML5，这个flash的接口就不能用了。

　　作为支持AS3语言编写HTML5的引擎，LayaAir可以通过`Browser.windows`和`__JS__`方法来和JS交互，并且LayaAir引擎的AS编译器还支持特有的宏编译，帮助AS3开发者实现更加复杂的AS3与JS混合编码。

### 1. 初识AS3与浏览器交互

　　假设我们创建了一个名为JSDemo.as的启动类文件，在AS3代码中实现JS的原生alert弹窗效果。示例代码如下：

**方式一：**

```java
package 
{
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() 
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			Browser.window.alert('我是alert');			
		}		
	}
}
```

**方式二：**

```java
package 
{
	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			__JS__('alert("我是alert")');
		}
	}
}
```

　　以上两种方式从运行的结果上看，是完全一致的，如图1所示。

![1](1.jpg) <br />
（图1）

　　那两种方式的区别在哪里呢？

　　`Browser.window`这是对浏览器window的引用，浏览器的全局函数都是挂载在`window`上，因此可以用Browser.window.alert唤起弹窗的函数。所有window上所有的函数和属性均可以通过这种方式进行。

　　`	__JS__`是LayaCompiler编译器提供的一个宏编译函数，　`	__JS__()`函数内的代码将不被编译，会直译成js代码。



### 2. AS3与浏览器交互进阶

　LayaAir引擎与浏览器的交互远不止于alert那么简单，下面通过示例代码进一步了解AS与浏览器的交互。

**方式一：**

```java
package 
{
	import laya.utils.Browser;

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
	
			var Height:int = Browser.window.innerHeight;
			var width:int = Browser.window.innerWidth;
			Browser.window.console.log("Console Log：浏览器高："+ Height + " 浏览器宽：" + width);
		}
	}
}
```

**方式二：**

```java
package 
{

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			
			var BrowserInfo:String = __JS__('"Console Log：浏览器高：" + window.innerHeight + " 浏览器宽："+ window.innerWidth');
			trace(BrowserInfo);
		}
	}
}
```

　　以上两种方式从运行的结果上看，是完全一致的，如图2所示。

![2](2.jpg) <br />
（图2）

　　以上两种方式相对而言，我们推荐采用`Browser.window`方式交互，`__JS__`方式由于是以字符串内写JS代码，如果不小心写错，也没有报错提示，会增加查错成本。



### 3.  AS3与JS混合编码

　　在项目中我们难免会用到第三方的js类库来辅助开发。那么在AS项目中我们怎么处理呢？下面我们就拿最常用的jquery.js来进行讲解。

​	首先在jquery的[官网下载](http://jquery.com/download/)jquery.js版本，示例中我们用`jquery-3.2.0.min.js`。在项目入口的index.html页面（通常位于“`bin\h5\`”目录下）添加`<script type="text/javascript" src="jquery-3.2.0.min.js"></script>`。

​	*Tips: 第三方库引入必须添加在LayaAir引擎库引入之前。*

​	在入口页面添加完库的引用后，我们在AS3入口库中编写如下代码：

```java
package {
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
          	//Browser.window后的$(Browser.document)为第三方库jquery的方法。
			Browser.window.$(Browser.document).ready(function():void{
				
				Browser.window.alert("jquery调用成功");
			});
			
		}
		
	}
}
```

编译运行后，我们可以看到弹窗成功，表明已经调用成功。我们在AS3项目中成功的实现了混合编码。



### 4. JS调用AS接口

　　有时候我们开发项目要和web开发者交叉调用，通过上面的方法我们可以调用web开发者的js方法，那么web开发者怎么调用我们写的逻辑呢？其实开发者可以进一步思考下：我们用as3开发H5，其实是通过编译器直接编译生成了js，因此，只需要把接口暴露出来，让web开发者直接调用我们的js代码就可以了。下面用一个简单的示例代码来说明一下用法。

**JSDemo.as 代码如下:**

```java
package {
	import laya.webgl.WebGL;

	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			
		}
      //定义一个静态函数 对外暴露给web调用者。
		public static function getGameName():String
		{
			return "myGame";
		}
		
	}
}
```

​	编译运行，然后我们打开浏览器控制台，然后输入`JSDemo.getGameName()` 发现输出了`"myGame"`，如图3所示。表明调用成功，由此实现了和web开发者交互。

![图片](3.jpg)<br />
（图3）



​	上面的示例只是定义了一个静态的方法，我们甚至可以开放内部的所有方法和属性，

JSDemo.as代码修改如下：

```java
package {
	import laya.utils.Browser;

	public class JSDemo {
		
		private var name:String = "Game";
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
         	//定义一个命名空间的属性为app；
			Browser.window.app = this;
			
		}
		public static function getGameName():String
		{
			return "myGame";
		}
		public function getVersion():String
		{
			return "1.2.0";
		}
		
	}
}
```

​	编译运行，打开浏览器控制台，先后输入`app`、`app.name`、`app.getVersion()`可以看到的效果如图4所示，已经达到了我们调用的效果。由此看出LayaAir引擎的AS开发和web开发者交互式无缝的。

![图4](4.jpg) <br />
（图4）



### 5. 代码智能提示

​	在上面的示例里，我们调用JS原生方法很简单，但是原生的JS方法，在AS3项目中并没有代码提示。因此，我们结合宏编译方法进行手动添加函数声明，从而获得代码提示。

比如我们创建一个window类（*`window.as`*），把浏览器常用的函数封装起来。

window.as代码如下：

```java
/*[IF-FLASH]*/package
{
	public class window
	{
		public function window()
		{
		}
		public static function alert(msg:Object):void
		{			
		}
	}
}
```

`/*[IF-FLASH]*/`是LayaCompiler的编译宏，其后的类不会被编译为JS，对此不了解的，请先去了解[宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)。



有了这个类，我们就可以直接写window的方法，并且有提示了（*前提是要用到的函数，都要提前封装好*）

下面我们就直接用js方法写一个`alert()`，

JSDemo.as代码如下。

```java
package {
	public class JSDemo {
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			window.alert("我是alert");
		}
	}
}
```

编译运行效果如图5所示，alert被成功执行了。所以，我们可以把常用的Window的方法开发者都封装起来。这样以后与JS混合编码时，代码的智能提示就会有了。

![图5](5.jpg) <br />

（图5）





### 6. AS写Nodejs

​	首先新建一个AS的工程，这个工程就是AS的原生的工程即可，LayaAir的类库暂时可以忽略，项目的启动类这里设置为Main.as ;然后新建一个`require.as`。

require.as 代码如下：

```java
package
{
	/*[IF-FLASH-BEGIN]*/
	public class require
	{
		
		public function require(path:String)
		{
		}
		
	}
	/*[IF-FLASH-END]*/
}
```

​	

项目的启动类Main.as代码如下：

```java
package
{
	public class Main
	{
		public var http:Object = require('http');
		public var net:Object = require('net');
		public var url:Object = require('url');
		public function Main()
		{
			var server:Object = this.http.createServer(clientHandler);
			server.listen(8989);
		}
		private function clientHandler(req:Object,respose:Object):void
		{
			trace("收到消息");
			respose.writeHead(200, {'Content-Type': 'text/plain'});
			respose.end('Hello Laya');
		}
	}
}
```

​	*Tips: 创建node的服务器的api可以移步到[https://nodejs.org/](https://nodejs.org/)*



　　`Main.as` 创建了一个动态服务器，端口为8989，服务器收到客户端的请求，返回一个Hello Laya。

　　`require.as`这个类用到了LayaCompiler编译器的宏编译，`/*[IF-FLASH-BEGIN]*/`和`/*[IF-FLASH-END]*/`这两个标签之间代码用于语法提示，并不参加编译（对此不了解的，请先去了解[宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)）。

​	**编译这个项目：**

​	用node启动该项目编译后的js文件。在当前目录下打开命令行输入`node Main.max.js`。然后在浏览器输入[http://localhost:8989/](http://localhost:8989/)可以看到页面上显示：Hello Laya。

​	至此，表明我们用AS代码成功的写了一个动态服务器。