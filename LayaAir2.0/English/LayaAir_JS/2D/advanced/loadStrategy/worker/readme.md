##Multithreaded worker

> The worker in this document is limited to HTML5 mode operation support in browser mode, and worker is not supported in LayaNative Packaging APP scheme for the time being.

Traditionally, browsers are single-threaded, forcing all scripts in an application to run together in a single UI thread. Although you can create the illusion that multiple tasks are running at the same time by using APIs such as Document Object Model (DOM) events and setTimeout, only one compute-intensive task can dramatically reduce the user experience. The function of worker is introduced in HTML 5. By using Web Worker, we can run JavaScript in the browser background without taking up the browser's own thread. Web Worker can improve the overall performance of the application and enhance the user experience. Threads can perform tasks without interfering with the user interface.

###Native worker

There are two kinds of web worker, dedicated web worker and shared web worker. Dedicated web worker ends with the closure of the current page; this means that Dedicated web worker can only be accessed by the page that created it. The corresponding Shared web worker can be accessed by multiple pages. But web worker has some limitations, not all interfaces and methods can be used.

- Web Worker cannot access DOM nodes;

- Web Worker cannot access global variables or functions.

- Web Worker cannot call functions such as alert () or confirm;

- Web Worker cannot access browser global variables such as window and document.


  [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)The page provides a list of global functions supported by worker. Developers can look at the corresponding methods for themselves.

####Method overview

#####Constructor Worker ()

This constructor creates a web worker that executes scripts located on the specified URL. The script must follow[同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript)。

#####PostMessage ():

Pass messages to the worker's internal scope. This method receives a single parameter, which is the data to be passed to the worker. Data can be any value or passed through[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)Algorithmically processed JavaScript objects, in other words, can contain circular references.

###### #parameter

- aMessage

The object passed to the worker; it will be included in the data field of the event object passed to the onmessage handler. You can pass any value or pass through[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)The JavaScript object processed by the algorithm can contain circular references.

- transferList

An optional array of objects to transfer their ownership. If the ownership of an object is transferred, it will not be available in the original context, but only in the transferred worker.

#####Terminate ()

Terminate worker immediately. This method does not leave any chance for the worker to complete the operation; it simply stops immediately.



###attribute

|Property type description|
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
A kind of`onmessage`[`EventListener`] (https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | An event listener function, whenever it has`message属性的MessageEvent`This function is executed when bubbles come out of the worker. Incident`data`Property holds message content. A kind of
A kind of`onerror`[`EventListener`] (https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) | an event listener function whenever the type is`error`Of`ErrorEvent 从 worker 中冒泡出来时就会执行该函数。`A kind of

Now let's use native JS to see how to use it.

Create a new JS file and put it in index. html. The code is as follows:


```typescript

var myWorker = new Worker("my_task.js");
myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```


Create a new my task.js file with the following code:


```typescript

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


This example is to load the file in the worker and pass it to the main process. Running this example, you can see the data output in the browser console.

`var myWorker = new Worker("my_task.js")`Instantiate a worker, pass in a JS file, through`myWorker.postMessage("start")`Notify the worker thread to start.

`self.addEventListener('message',xxx)`Listen for messages notified by the main thread.

`self.postMessage(data);`Send data to the main thread.

Note: Web worker does not support file protocol, so it can not run directly. Developers can cooperate with IDE built-in server, and you can see the effect by running the website. Open the console and you can see that the data has been printed out.



###Application of Laya

In Laya, worker is encapsulated to solve the problem of loading and decoding picture carton. Developers can turn on the switch or customize the worker to solve the problem of CPU consumption in the project. Let's introduce them separately.

A new project, in order to facilitate the display, we create a new UI project. The simple invocation interface is as follows:


```typescript

//初始化引擎
Laya.init(600,400,Laya.WebGL);
//设置Laya提供的worker.js路径
Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启worker线程
Laya.WorkerLoader.enable = true;
//加载引擎需要的资源
Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,onLoaded));

function onLoaded(){
    //实例UI界面
    var testView = ui.test.TestPageUI();
    Laya.stage.addChild(testView);
}
```




 `WorkerLoader.workerPath = "libs/worker.js";`Setting up the worker. JS path, which Laya officially provided, we copied it to our own path, which is in Laya's engine library. I set it under LIBS here.

`WorkerLoader.enable = true;`Opening worker mode to load decoded pictures greatly relieves the pressure of main thread decoding.

The above approach is official decoding, and we can also customize the worker to optimize where CPU is consumed in the project. Here is a simple example to illustrate the usage. We can transplant the JS script from the beginning of the tutorial.


```typescript

//初始化引擎
Laya.init(600,400,Laya.WebGL);
var worker = Laya.Browser.window.Worker("my_task.js");
worker.onmessage = function(oEvent){
    console.log("Called back by the worker!\n");
};
worker.postMessage("start"); // start the worker.
```


The code in my_task.js still loads a file. The code is as follows:


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


Compile and run the code, and you can see that the console output the data we loaded comp. json.

Summary: web worker is generally used to parse and load large files, such as large JSON files, time-consuming calculations, or some resources that do not need to be loaded in real time can be put into the background thread to complete, so that users can not feel the main thread's jam. Enhance project fluency. Improve user experience.

##- detailed`Web Workers`Please look at it.[W3C的xhr 标准](https://www.w3.org/TR/workers/); 详细的api和介绍参考[这里](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
-[workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)The page provides a list of global functions supported by worker.