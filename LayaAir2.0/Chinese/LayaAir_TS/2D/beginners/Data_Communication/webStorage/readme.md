# Web Storage数据存储

HTML5提供了两种在客户端存储数据的新方法：

**localStorage - 没有时间限制的数据存储**

**sessionStorage - 针对一个session的数据存储**

存储在sessionStorage里边的数据会在浏览器会话（browsing session）结束时被清除，即浏览器关闭时。

之前，这些都是由cookie完成的。但是Cookie大小限制在4k，不适合大量数据的存储，而且它们由每个对服务器的请求来传递，这使得Cookie速度很慢而且效率也不高。Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在，而Web Storage仅仅是为了在本地“存储”数据而生。

在HTML5中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。

对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。因此本地数据的存储我们完全可以用LocalStorage。LayaAir引擎对LocalStorage进行了简单的封装，对应的类是LocalStorage。下面通过简单的例子来看下它是如何使用的。

```javascript
Laya.init(100,100);
Laya.LocalStorage.setItem("key","hello");
Laya.LocalStorage.setItem("data","hello");

var data = {"index":0,"index1":1};
Laya.LocalStorage.setJSON("item",data);//直接传入Object 接口内部转化为JSON字符串存储
```

在chrome中运行之后按快捷键F12，结果如下图所示：

![1](img/1.png)<br/>

从图中我们可以看到刚才的数据都存储进去了

下面我们对这些数据进行清除，代码如下所示：

```java
Laya.LocalStorage.setItem("key","hello");
var data:any = {"index":0,"index1":1};
var str:string = JSON.stringify(data);
Laya.LocalStorage.setItem("data","hello");
Laya.LocalStorage.setItem("item",str);
Laya.LocalStorage.removeItem("data");//清除数据
```

通过添加代码LocalStorage.removeItem("data");将键值为data的数据进行清空，编译运行之后发现data数据就没有了。如下图所示：

![2](img/2.png)<br/>

如果我们需要把所有的数据都清理掉，在原有代码的最后添加一行代码即可：

```java
Laya.LocalStorage.clear();
```

编译之后就会发现之前域名下存储的所有数据都消失了，如下图所示：

![3](img/3.png)<br/>

sessionStorage在LayaAir引擎中暂时没有封装，但完全可以直接使用。下面展示下在LayaAir中怎么用sessionStorage。下面这个例子就是一个页面计数器，对用户在当前session中访问页面的次数进行计数：

打开LayaAirIDE创建一个空项目。具体代码如下所示：

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

 var sessionStorage:any = Laya.Browser.window.sessionStorage;这句话的意思就是获取当前页面中的sessionStorage会话对象。



这里的逻辑就是判断当前会话对象是否存在pagecount属性，不存在就是第一次打开设置为1，存在的话就是已经打开，进行累加。并且输出累加次数。编译这个文件，然后用谷歌运行，F12打开控制台发现输出的是1，然后我们不断的刷新页面发现输出的次数在不断累加。然后我们关闭谷歌浏览器，重新打开这个页面发现此时输出的又是1，不断刷新页面次数又在累加。由此我们可以看出sessionStorage是会话级别的存储对象。关闭浏览器就会消失。