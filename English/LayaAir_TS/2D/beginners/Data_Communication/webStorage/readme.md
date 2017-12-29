# Web Storage store data "locally"

HTML5 provides two new ways to store data on the client side:

**localStorage - There is no explicit time limit for data storage**

**sessionStorage - Data storage for a session**

The data stored inside the sessionStorage is cleared at the end of the browser session (browsing session), i.e., when the browser is closed.

Before that, it was all done by cookie. However, the Cookie size is limited to 4K and is not suitable for storing large amounts of data, and they are passed by each request to the server, which makes Cookie very slow and inefficient. The role of Coolie is to interact with the server and exist as part of the HTTP specification, and Web Storage is just for storing data locally.

In HTML5, data is not passed by each server request, but is used only when data is  requested. It makes it possible to store large amounts of data without affecting the performance of the site.

For different sites, the data is stored in a different area, and a website can only access its own data. So we can use local data storage LocalStorage entirely. The LayaAir engine encapsulates LocalStorage, and the corresponding class is LocalStorage. Here's a simple example to see how it works.

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

After running in chrome, press the shortcut key F12, and the result is shown below:

![1](img/1.png)<br/>

As you can see from the figure, all the data is stored

We'll erase the data below, as shown in the code below:

```java
Laya.LocalStorage.setItem("key","hello");
var data:any = {"index":0,"index1":1};
var str:string = JSON.stringify(data);
Laya.LocalStorage.setItem("data","hello");
Laya.LocalStorage.setItem("item",str);
Laya.LocalStorage.removeItem("data");//清除数据
```

By adding the code LocalStorage.removeItem ("data"); key  value for the data to clear, and compile and run, found data data will be gone. As shown below:

![2](img/2.png)<br/>

If we need to clean up all the data, add a line of code at the end of the original code:

```java
Laya.LocalStorage.clear();
```

After compiling, you will find all data stored in the name of the previous domain disappears, as shown in the following figure:

![3](img/3.png)<br/>

sessionStorage in the LayaAir engine is not encapsulated, and can be used directly. The following shows how to use sessionStorage in the LayaAir. In following example is a page counter that counts the number of times a user visits a page in the current session:

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

 var sessionStorage:any = Laya.Browser.window.sessionStorage; getting the sessionStorage session object in the current page.



The logic here is to determine whether the current session object has an pagecount property, which does not exist. For the first time, it opens to 1. If it exists, it is already open and accumulated.  And outputs the cumulative number of times. Compile this file, and then run with Google, F12 open console, found that the output is 1, and then we constantly refresh the page, found that the number of output is constantly accumulated and increase. Then we closed the Google browser, re opened the page, found that at this time the output is 1, constantly refresh the page, and the cumulative number is added. From this we can see that sessionStorage is a storage object at the session level. Closing the browser disappears/reset
