#On Local Storage

LayaNative supports the use of Local Storage, but with formatting requirements, you must use getItem (), setItem () to store and fetch values.

###Usage under AS


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###Usage under JS and TS


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###Wrong usage:

The following usage of JS syntax is supported in PC browser or mobile (browser naked running), but not in Laya native


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```



