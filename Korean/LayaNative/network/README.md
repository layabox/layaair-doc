#네트워크 상태 감청
모바일 네트워크 환경이 불안정하기 때문에 네트워크 변화가 발생할 때 프로그램에서는 사용자에게 자주 힌트를 주며 LayaPlayer 중 두 가지 방법이 있어 네트워크 환경변화를 얻을 수 있다.

##1. 감청 방식

개발자는 등록 감청 함수를 사용하는 방식으로 감청 네트워크 변화를 진행하며 코드 다음과 같습니다:

JS 코드 다음과 같다

```javascript

if( conch )
{
    conch.setNetworkEvtFunction(function(type)
    {
	    alert(type)
    });
}
```

AS 코드 다음과 같습니다:

```javascript

if ( Render.isConchApp)
{
    Browser.window["conch"].setNetworkEvtFunction(function(type):void
    {
        alert(type)
    });
}
```


**반복 값 종류 int 형식**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```

**Tips**  
*1, conch, LayaPlayer 환경에서만 호출됩니다. 웹 버전에서는 conch 가 정의되지 않습니다. 존재 여부를 판단해야 합니다.*
*2, as 언어를 사용하여 개발할 때, 브라운도.window['conch'] 이런 식으로 conch 대상을 얻을 수 있다.*
*3, 또는 if(Render.isconchApp을 사용해 판단해도 된다.*

##2. 조회 방식

개발자는 또 능동적인 조회 방식을 통해 네트워크 상태 조회, 코드 다음과 같습니다:


```javascript

if( conch )
{
    var nType = conch.config.getNetworkType();
}
```


**반복 값 종류 int 형식**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```




