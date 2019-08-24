## 多线程worker

> 本文档中的worker仅限于浏览器模式中的HTML5模式运行支持，LayaNative打包APP方案中暂不支持worker

​	从传统意义上来说，浏览器是单线程的，它们会强制应用程序中的所有脚本一起在单个 UI 线程中运行。虽然你可以通过使用文档对象模型 (DOM) 事件和 setTimeout等API 造成一种多个任务同时在运行的假象，但只需一个计算密集型任务就会使用户体验急转直下。在html5引入了worker的功能，通过使用Web Worker， 我们可以在浏览器后台运行JavaScript， 而不占用浏览器自身线程。Web Worker可以提高应用的总体性能，并且提升用户体验。线程可以执行任务而不干扰用户界面。

### 原生worker

​	web worker分为两种，专用线程dedicated web worker，以及共享线程shared web worker。 Dedicated web worker随当前页面的关闭而结束；这意味着Dedicated web worker只能被创建它的页面访问。与之相对应的Shared web worker可以被多个页面访问。但是web worker有些限制，并非所有的接口和方法都能使用。

- Web Worker无法访问DOM节点；
- Web Worker无法访问全局变量或是全局函数；
- Web Worker无法调用alert()或者confirm之类的函数；
- Web Worker无法访问window、document之类的浏览器全局变量；

 [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers) 页面提供了一个 worker 支持的全局函数列表。开发者可以自己看下相应的方法。

####方法概述

##### 构造函数Worker()

​	该构造函数创建一个 web worker，它能执行位于指定 URL 上的脚本。脚本必须遵循 [同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)。

##### postMessage()：

​	向 worker 的内部作用域内传递消息。该方法接收一个单独的参数，即要传递给 worker 的数据。数据可以是任何值或者是经过[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html#transferable)算法处理过的 JavaScript 对象，换句话说，可以包含循环引用。

#######参数

- aMessage

  传输给 worker 的对象；它将包含于传递给 onmessage 处理函数的事件对象中的 data 字段内。你可以传递任意值或是经过[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html#transferable)算法处理过的 JavaScript 对象，即可以包含循环引用。

- transferList

  一个可选的对象数组，用于转让它们的所有权。如果一个对象的所有权被转让，那么它在原来的上下文内将不可使用，而只能在转让到的 worker 内可用。

#####terminate()

  立即终止 worker。该方法不会给 worker 留下任何完成操作的机会；就是简单的立即停止

### 属性

| Property    | Type                                     | Description                              |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| `onmessage` | [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | 一个事件监听函数，每当拥有 `message 属性的 ``MessageEvent` 从 worker 中冒泡出来时就会执行该函数。事件的 `data` 属性存有消息内容。 |
| `onerror`   | [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | 一个事件监听函数，每当类型为  `error `的  `ErrorEvent 从 worker 中冒泡出来时就会执行该函数。` |

​	下面我们用原生js看下如何使用。

​	新建一个js文件 ，放到index.html中代码如下：

```javascript
var myWorker = new Worker("my_task.js");

myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```

​	新建一个my_task.js文件，代码如下

```javascript
self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```

​	这个例子是在worker中进行加载文件，加载完毕传给主进程，运行这个例子可以在浏览器控制台看到数据输出来。

`var myWorker = new Worker("my_task.js")`;实例化一个worker，传进去一个js文件，通过`myWorker.postMessage("start")`;通知worker线程启动。

​	`self.addEventListener('message',xxx)`;监听主线程通知的消息。

​	`self.postMessage(data);`发送数据给主线程。

注意：web worker的不支持文件协议，所以直接打开是不能运行的，开发者可以配合IDE内置的服务器，通过网址来运行就可以看到效果.。打开控制台可以看到数据已经打印出来了。



## Laya中应用

​	在Laya中内部封装了worker，解决加载解码图片卡顿现象，开发者可以打开开关，也可以自定义worker，解决项目中耗费cpu的地方，下面我们分别来介绍下。

​	新建一个项目，为了方便演示，我们新建一个ui项目。简单的调用接口如下：

```java
package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import view.TestView;
	import laya.net.WorkerLoader;
	import laya.webgl.WebGL;
	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			//设置Laya提供的worker.js的路径
			WorkerLoader.workerPath = "libs/worker.js";
			//开启worker线程
            WorkerLoader.enable = true;
			//加载引擎需要的资源
			Laya.loader.load([{url: "res/atlas/comp.json", type: Loader.ATLAS}], Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//实例UI界面
			var testView:TestView = new TestView();
			Laya.stage.addChild(testView);
		}
	}
}
```

​	`WorkerLoader.workerPath = "libs/worker.js";`设置worker.js的路径，这个worker.js是Laya官方提供的，我们把他拷贝复制到我们自己设置的路径，这个js在Laya的引擎库当中。我这里设置的是libs下。

`WorkerLoader.enable = true;`开启worker模式加载解码图片，大大解放了主线程解码的压力。

​	上面的方法是官方的解码的做法，我们也可以自定义worker来优化项目当中的耗费cpu的地方。下面通过简单的例子来演示下用法。我们可以把教程开头的js脚本移植过来。

```java
package {
	import laya.utils.Browser;
	import laya.webgl.WebGL;

	public class WokerDemo {
		
		public function WokerDemo() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			var worker:* = Browser.window.Worker("my_task.js");
            worker.onmessage = function (oEvent):void {
                console.log("Called back by the worker!\n");
            };
            worker.postMessage("start"); // start the worker.
		}
	}
}
```

​	my_task.js中的代码还是加载一个文件。代码如下：

```javascript
self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```

编译运行代码，可以看到控制台输出了我们加载comp.json的数据。

总结：web worker我们一般应用到解析加载大的文件，比如大的json文件，比较费时的计算，或者不需要即时加载的一些资源都可以放到后台线程来完成，这样用户基本感受不到主线程的卡顿。增强项目的流畅性。提高用户体验。

- 详细的`Web Workers`，请看 [W3C的xhr 标准](https://www.w3.org/TR/workers/);
- 详细的api和介绍参考[这里](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
- [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers) 页面提供了一个 worker 支持的全局函数列表。