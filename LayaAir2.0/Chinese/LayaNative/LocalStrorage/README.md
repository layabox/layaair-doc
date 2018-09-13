# 关于LocalStorage

LayaNative支持LocalStorage的使用，但是有格式要求，必须使用getItem()、setItem()来存储值以及取值

### AS下的用法

```java
//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```



### JS和TS下的用法

```java
//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```



### 错误的用法：

下面js语法的用法在PC端浏览器或者移动端（浏览器裸跑）支持，但是LayaNative下不支持

```java
//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```


