## Multi thread worker

​	Traditionally, browsers are single threaded, forcing all scripts in the application to run together in a single UI thread. Although you can create an illusion of multiple tasks at the same time by using API, such as document object model (DOM) events and setTimeout, only one computationally intensive task will make the user experience a nosedive. Worker is introduced into HTML5. By using Web Worker, we can run JavaScript in the browser background without taking the browser's own thread. Web Worker can improve the overall performance of the application, and enhance the user experience. Threads can perform tasks without interfering with the user interface.

### Native worker

​	Web worker is divided into two kinds, dedicated thread dedicated web worker, and shared thread shared web worker. Dedicated web worker ends with the closing of the current page; this means that Dedicated web worker can only be created by accessing its pages. Correspondingly, Shared web worker can be accessed by multiple pages. But web worker has some limitations, not all interfaces and methods can make it

- Web Worker cannot access DOM nodes;
- Web Worker cannot access global variables or global functions;
- Web Worker cannot call functions such as alert () or confirm;
- Web Worker  cannot access browser global variables such as window, document, etc.;

 [worker Supported functions](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers) The page provides a list of global functions supported by the worker. Developers can look at the appropriate method.

####Method overview

##### Worker() Constructor

​	he constructor creates a web worker that can execute scripts located on the specified URL. Scripts must follow the [Same-origin policy](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)。

##### postMessage()：

​	Passing messages to the internal scope of the worker. This method receives a single parameter, that is, the data to be passed to the worker. Data can be either a value or a process [Structured copy](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html#transferable)Algorithm processed JavaScript Objects, in other words, can contain circular references.

#######参数

- aMessage

 The object that is passed to the worker; it will be included in the data field of the event object passed to the onmessage processing function. You can pass any value or go through it [Structured copy](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html#transferable) The JavaScript object handled by the algorithm can include circular references.

- transferList

  An optional array of objects for the transfer of their ownership. If the ownership of an object is transferred, it will not be used in the original context, but only within the transferred worker.

#####terminate()

  Immediate termination of worker. This method does not leave worker any chance to complete the operation; it simply stops immediately.

### attribute

| Property    | Type                                     | Description                              |
| ----------- | ---------------------------------------- | ---------------------------------------- |
| `onmessage` | [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | An event listener function, whenever you have it `message 属性的 ``MessageEvent` 从 worker The function is executed when it bubbles out of worker. Event `data` Property holds message content. |
| `onerror`   | [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | An event listener function, whenever the type is  `error `of  `ErrorEvent from worker The function is executed when it bubbles out` |

​	Here we look at how to use the native js.

​	Create a new JS file, put it in index.html, code as follows:

```javascript
var myWorker = new Worker("my_task.js");

myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```

​	Create a new my_task.js file, the code is as follows

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

​	This example is the loading file in worker, the completion of the load passed to the main process, run this example can be seen in the browser console data output.

`var myWorker = new Worker("my_task.js")`;Instantiate a worker, passed in a js file, through `myWorker.postMessage("start")`; Notify the worker thread started.

​	`self.addEventListener('message',xxx)`; Monitor the main thread to inform the news.

​	`self.postMessage(data);` Send data to the main thread.

Note: web worker does not support file protocols, so open it directly is not running, developers can cooperate with IDE built-in server, through the web site to run, you can see the effect. Open the console to see that the data has been printed out.



## Application in Laya

​	In the Laya inside the worker package, solve the loading of decoding pictures Caton phenomenon, developers can turn on the switch, you can also customize the worker, the local cost CPU solve the project, we have the following to introduce.

​	To build a new project, we'll build a new UI project for the convenience of demos. The simple call interface is as follows:

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

​	`WorkerLoader.workerPath = "libs/worker.js";` Set the path to worker.js, the worker.js is officially provided by Laya, and we copy it to the path we set ourselves, which is in the JS engine library of Laya. I'm setting it up under libs.

`WorkerLoader.enable = true;` Open worker mode loading decoding pictures, greatly liberating the main thread decoding pressure.

​	The above method is an official decoding method, and we can also customize worker to optimize the cost of CPU in the project. Here's a simple example of how to use it. We can transplant the JS script at the beginning of the tutorial.

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

​	The code in my_task.js shows loading a file. code show as below:

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

Compile and run the code, you can see the console output data we load comp.json.

Summary: web worker we generally apply to parse large files loaded, such as large JSON files, time-consuming calculation, or not need to load some of the resources can be put into the background thread to complete, so that users can not feel the main thread of Caton. Enhance project fluency. Improve user experience.

- `Web Workers` Detailed , See [W3C xhr standard](https://www.w3.org/TR/workers/);
- Detailed api and introduction reference [here](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
-  [worker Supported functions](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers) The page provides worker list of supported global functions.
