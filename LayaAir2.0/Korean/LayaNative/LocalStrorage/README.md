#Localstorage 관련

LayaNative LocalStoorage를 지원하는데, 형식적인 요구가 있으므로 getItem (), setItem () 을 저장하기 위해 저장가치 및 값을 얻기

###AS 의 용법


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###JS 와 TS 아래 사용법


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###잘못된 용법:

다음으로 js 문법의 용법은 PC 브라우저나 이동단 (브라우저 누드) 에서 지원하지만 LayaNative 아래에서 지원하지 않습니다


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```



