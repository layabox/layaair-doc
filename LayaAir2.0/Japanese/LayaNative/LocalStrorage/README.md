#Local Strageについて

LayaNativeはLocal Strageの使用をサポートしていますが、フォーマット上の要求があります。getItem（）、setItem（）を使用して保存し、値を取る必要があります。

###ASの下の用法


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###JSとTSの使い方


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###間違った使い方:

以下のjs文法の使い方はPC端末のブラウザやモバイル端末（ブラウザ裸走）でサポートしていますが、LayaNativeではサポートされていません。


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```



