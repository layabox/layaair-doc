# 关于网络状态监听
Because the mobile device network environment is not stable, when the network changes, the project often needs to give users some hints. In LayaNative, there are two ways to get changes in the network environment.

##1. Ways of interception

Developers can use the registered listener function to monitor network changes. The code is as follows:

The JS code is as follows

```javascript

if( conch )
{
    conch.setNetworkEvtFunction(function(type)
    {
	    alert(type)
    });
}
```

The AS code is as follows:

```javascript

if ( Render.isConchApp)
{
    Browser.window["conch"].setNetworkEvtFunction(function(type):void
    {
        alert(type)
    });
}
```


**The return value class is of type int**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_YES = 5;
```

**Tips**  
*1、conch只能LayaNative环境下调用，在网页版本中是没有conch定义的，所以需要判断一下是否存在。*  
* 2. When developing in as language, conch objects can be obtained through Browser. window ['conch']. *
* 3. Or use if (Render. isConchApp) to make judgments. *

##2. Query mode

Developers can also query the network status by active query, the code is as follows:


```javascript

if( conch )
{
    var nType = conch.config.getNetworkType();
}
```


**The return value class is of type int**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_YES = 5;
```




