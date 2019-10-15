#Web Storage Data Storage

HTML5 provides two new ways to store data on the client side:

**Localstorage - data storage without time limit**

**Session Storage - Data Storage for a Session**

The data stored in the session store is cleared at the end of the browsing session, when the browser is closed.

Previously, these were done by cookies. However, the size of cookies is limited to 4K, which is not suitable for the storage of large amounts of data, and they are delivered by each request to the server, which makes cookies slow and inefficient. Cookies are used to interact with servers and exist as part of the HTTP specification, while web storage is only used to "store" data locally.

In HTML5, data is not passed by each server request, but only when requested. It makes it possible to store large amounts of data without affecting website performance.

For different websites, data is stored in different areas, and a website can only access its own data. So we can use Local Storage to store local data. The layaair engine simply encapsulates localstorage, and the corresponding class is localstorage. Here's a simple example of how it works.


```java

package
{
	import laya.net.LocalStorage;
	import laya.utils.Browser;

	public class LayaSample
	{
		public function LayaSample()
		{
			Laya.init(100,100);
			LocalStorage.setItem("key","hello");
			var data:Object = {"index":0,"index1":1};
			var str:String = JSON.stringify(data);
			LocalStorage.setItem("data","hello");
			LocalStorage.setItem("item",str);
		}
	}
}
```


After running in chrome, press the shortcut key F12, and the results are as follows:

![1](img/1.png)<br/>


From the figure, we can see that all the data we have just stored are in it.

Next, we clean up the data. The code is as follows:


```java

LocalStorage.setItem("key","hello");
var data:Object = {"index":0,"index1":1};
var str:String = JSON.stringify(data);
LocalStorage.setItem("data","hello");
LocalStorage.setItem("item",str);
LocalStorage.removeItem("data");//清除数据
```


By adding the code LocalStorage. removeItem ("data"); clearing the data whose key value is data, the data is lost after compiling and running. As shown in the following figure:

![2](img/2.png)<br/>

If we need to clean up all the data, we can add a line of code at the end of the original code.


```java

LocalStorage.clear();
```


After compiling, you will find that all the data stored in the previous domain name has disappeared, as shown in the following figure:

![3](img/3.png)<br/>


Session Storage is not encapsulated in LayaAir engine for the time being, but it can be used directly. Here's how to use sessionstorage in layaair. The following example is a page counter that counts the number of times a user visits a page in the current session:

Open LayaAirIDE to create an empty project. The specific code is as follows:


```java

package
{
	import laya.utils.Browser;

	public class Test
	{

		public function Test()
		{
			Laya.init(100,100);
			var sessionStorage:* = Browser.window.sessionStorage;
			if(sessionStorage.pagecount){
				sessionStorage.pagecount = parseInt(sessionStorage.pagecount)+1;
			}
			else{
				sessionStorage.pagecount = 1;
			}
			trace(sessionStorage.pagecount);
		}
	}
}
```


Var session Storage:* = Browser. window. session Storage; this sentence means to get the session Storage session object in the current page.



The logic here is to determine whether the current session object has pagecount attribute. If it does not exist, it will be set to 1 for the first time. If it exists, it will be opened and accumulated. And output the cumulative number of times. Compile this file and run it with Google. F12 opens the console and finds that the output is 1. Then we refresh the page and find that the output is accumulating. Then we shut down Google Browser and reopen the page to find that the output is 1, and the number of page refreshes is accumulating. From this we can see that session Storage is a session-level storage object. Close the browser and it will disappear.