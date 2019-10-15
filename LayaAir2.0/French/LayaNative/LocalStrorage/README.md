#Au sujet de localstorage

Layanative appuie l 'utilisation de local storage, mais il existe des conditions de forme qui exigent que les valeurs soient stockées et évaluées au moyen de getitem (), setitem ().

###Utilisation sous as


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###Sous JS et ts


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###Erreur:

L 'utilisation de la grammaire JS ci - dessous est prise en charge par un navigateur d' extrémité PC ou par une extrémité mobile (navigateur nu), mais pas par layanative.


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```



