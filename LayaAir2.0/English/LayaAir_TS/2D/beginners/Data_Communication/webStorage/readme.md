#Web Storage Data Storage

HTML5 provides two new ways to store data on the client side:

**Local Storage - Data Storage without Time Limits**

**Session Storage - Data Storage for a Session**

The data stored in the session store is cleared at the end of the browsing session, when the browser is closed.

Previously, these were done by cookies. But the size of cookies is limited to 4k, which is not suitable for storing large amounts of data, and they are transmitted by each request to the server, which makes cookies slow and inefficient. Cookie's role is to interact with the server as part of the HTTP specification, while Web Storage is only created to "store" data locally.

In HTML5, data is not passed by each server request, but only used when requested. It makes it possible to store large amounts of data without affecting the performance of the website.

For different websites, data is stored in different areas, and a website can only access its own data. So we can use Local Storage to store local data. The LayaAir engine simply encapsulates the Local Storage, and the corresponding class is Local Storage. Here's a simple example of how it works.


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        Laya.LocalStorage.setItem("key","hello");
        var data:any = {"index":0,"index1":1};
        var str:string = JSON.stringify(data);
        Laya.LocalStorage.setItem("data","hello");
        Laya.LocalStorage.setItem("item",str);
    }
}
new LayaSample();
```


After running in chrome, press the shortcut key F12, and the results are as follows:

![1](img/1.png)<br/>

From the figure, we can see that all the data we have just stored are in it.

Next, we clean up the data. The code is as follows:


```java

Laya.LocalStorage.setItem("key","hello");
var data:any = {"index":0,"index1":1};
var str:string = JSON.stringify(data);
Laya.LocalStorage.setItem("data","hello");
Laya.LocalStorage.setItem("item",str);
Laya.LocalStorage.removeItem("data");//清除数据
```


By adding the code LocalStorage. removeItem ("data"); clearing the data whose key value is data, the data is lost after compiling and running. As shown in the following figure:

![2](img/2.png)<br/>

If we need to clean up all the data, we can add a line of code at the end of the original code.


```java

Laya.LocalStorage.clear();
```


After compiling, you will find that all the data stored in the previous domain name has disappeared, as shown in the following figure:

![3](img/3.png)<br/>


Session Storage is not encapsulated in LayaAir engine for the time being, but it can be used directly. Here's how to use session Storage in LayaAir. The following example is a page counter that counts the number of times a user visits a page in the current session:

Open LayaAirIDE to create an empty project. The specific code is as follows:


```java

// 程序入口
class LayaSample{
    constructor()
    {
        Laya.init(100,100);
        var sessionStorage:any = Laya.Browser.window.sessionStorage;
        if(sessionStorage.pagecount){
            sessionStorage.pagecount = parseInt(sessionStorage.pagecount)+1;
        }
        else{
            sessionStorage.pagecount = 1;
        }
        console.log(sessionStorage.pagecount);
        
    }
}
new LayaSample();
```


Var session Storage: any = Laya. Browser. window. session Storage; this sentence means to get the session Storage session object in the current page.



The logic here is to determine whether the current session object has pagecount attribute. If it does not exist, it will be set to 1 for the first time. If it exists, it will be opened and accumulated. And output the cumulative number of times. Compile this file and run it on Google. F12 opens the console and finds that the output is 1. Then we constantly refresh the page and find that the output is accumulating. Then we shut down Google Browser and reopen the page to find that the output is 1, and the number of page refreshes is accumulating. From this we can see that session Storage is a session-level storage object. Close the browser and it will disappear.