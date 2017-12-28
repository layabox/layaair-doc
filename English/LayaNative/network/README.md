
# About network status monitoring
Because the network environment of mobile devices is not stable, when the network changes, the project often need to give users some tips. in LayaPlayer there are two ways to get the network environment changes.

## 1.Monitor mode

Developers can monitor the network using the method of registered monitor function, the code is as follows:

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

**The return value class is int type**
```
NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```
**Tips**  
*1、Conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version.*  
*2、If you use the as language to develop, you can get conch objects in this way through  Browser.window['conch'] 。*  
*3、Or you can use  - if(Render.isConchApp ) - to evaluate.*  

## 2. Query method

Developers can also query the network status through the active query, the code is as follows:

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
NET_UNKNOWN=5
```



