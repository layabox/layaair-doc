# AS3 and JS mixed coding

　　Interaction between AS3 and JS is a common requirement. Flash Plug-in provides a simple interface function `ExternalInterface.call` AND `ExternalInterface.addCallback`interact with JS. But publishing HTML5, the flash interface can't be used.

　　As an engine to support AS3 programming, LayaAir can interact with JS through `Browser.windows` and `__JS__` methods, and the AS compiler of LayaAir engines supports unique macros to help AS3 developers implement more complex AS3 and JS hybrid coding schemes for HTML5 developers.

### 1. The first AS3 interacts with the browser

　　Suppose we create a startup class file named JSDemo.as that implements JS's native alert popups in AS3 code. Sample code is as follows:

**method 1 :**

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

**Method 2 : **

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

　　The above two methods from the operation of the results point of view, is exactly the same, as shown in Figure 1.

![1](1.jpg) <br />
（Picture 1）

　　Where is the difference between the two ways?

　　`Browser.window` this is a reference to the browser window, the browser's global function is mounted on the  `window`, so you can use Browser.window.alert to evoke the pop-up function. All functions and attributes on all window can be done in this way.

　　`	__JS__` is a macro compiler function provided by the LayaCompiler compiler,　`	__JS__()` code inside the function will not be compiled, and it will be translated into JS code.



### 2. Advanced interaction between AS3 and browser

　Interaction between LayaAir engine and browser is much more than that of alert. Here is an example code to further understand the interaction between AS and browser.

**Method 1: **

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

**Method 2: **

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

　　The above two methods from the results of the operation point of view, is exactly the same, as shown in Figure 2.

![2](2.jpg) <br />
（Picture 2）

　　Relatively speaking, the above two methods, we recommend to use `Browser.window` way to interact, `__JS__` way because it is written in a string of JS code, if you accidentally wrong, there is no error message, will increase troubleshooting costs.



### 3.  AS3 and JS mixed coding

　　In the project we will inevitably use third-party js library to assist in the development. So how do we deal with AS projects? Here we take the most commonly used jquery.js to explain.

​	First of all get jQuery from  [[official website download](http://jquery.com/download/)jquery.js Version, we use the example `jquery-3.2.0.min.js`. At the entry of the project index.html page（ Located under directory “`bin\h5\`”） Add to`<script type="text/javascript" src="jquery-3.2.0.min.js"></script>`。

​	*Tips: Third-party library import must be added prior to the introduction of the LayaAir engine library.*

​	After adding a reference to the library on the portal page, we write the following code in the AS3 entry library:

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

After compiling and running, we can see that the pop-up window is successful, indicating that the call has succeeded. We successfully implemented hybrid encoding in the AS3 project.



### 4. JS calls the AS interface

　　Sometimes we develop projects to cross with web developers. By using the above method, we can call the JS method of web developers, so how can web developers call the logic we write? In fact, developers can further think: we use AS3 to develop H5, in fact, is compiled directly through the compiler generated JS, therefore, only need to expose the interface, so that web developers directly call our JS code on it. Here's a simple sample code to illustrate the usage.

**JSDemo.as Code is as follows: **

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

​	Compile and run, and then we open the browser console, and then enter `JSDemo.getGameName()` to find the output of `"myGame"` as shown in figure 3. Indicates that the call is successful, thus enabling interaction with the web developer.

![图片](3.jpg)<br />
（Picture 3）



​	The above example just defines a static method, and we can even open all of the internal methods and properties,
JSDemo.as code is modified as follows:

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

​	Compile and run, open the browser console, as entered `app`,`app.name`,`app.getVersion()`, can see the effect as shown in Figure 4, which has reached the effect of our call. From this, we can see that the AS development of LayaAir engine and web developers interact seamlessly.

![图4](4.jpg) <br />
（Picture 4）



### 5. Code intelligence prompt

​	In the example above, we call the JS native method very simple, but the native JS method does not have code hints in the AS3 project. Therefore, we combine the macro compilation method to manually add function declarations, so as to obtain code prompts.

For example, we create a window class（*`window.as`*）, that encapsulates the functions commonly used by browsers.

window.as Code is as follows:

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

`/*[IF-FLASH]*/` LayaCompiler compiler macros, the subsequent class will not be compiled to JS, do not understand this, please first understand [Macro compiler tutorial document](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)。



With this class, we can write window directly, and there is a hint （*premise is to use the function, must be packaged in advance*）

Here we write a direct js method `alert()`，

JSDemo.as code show as below.

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

Compile and run effect is shown in Figure 5, and alert is successfully executed. So we can encapsulate the commonly used methods of Window developers. So, after mixing code with JS, the code smart tips will be there.

![图5](5.jpg) <br />

（Picture 5）





### 6. AS writes Nodejs

​	First create a new AS project, this project is AS native project can be, LayaAir the class library can be ignored temporarily, the project's startup class is set to Main.as; Then create a new `require.as`。

require.as code show as below：

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

Project startup class Main.as code is as follows ：

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

​	*Tips: create the node api server can move to [https://nodejs.org/](https://nodejs.org/)*



　　`Main.as` Creates a dynamic server with a port of  8989, the server receives a request from the client and returns a Hello Laya

　　`require.as` class uses the macro compilation of the LayaCompiler compiler, `/*[IF-FLASH-BEGIN]*/` and `/*[IF-FLASH-END]*/` The code between the two tags is used for syntax prompts and does not participate in compilation（if any misunderstanding, please go to refer [Macro compiler tutorial document](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)）。

​	**Compile this project: **

​	Use node to start the project compiled js file. Open the command line input in the current directory `node Main.max.js`. Then enter in the browser [http://localhost:8989/](http://localhost:8989/)You can see the page is displayed ：Hello Laya

​	So far, we have successfully written a dynamic server with AS code.
