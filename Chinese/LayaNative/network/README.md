
# 关于网络状态监听
由于移动设备网络环境不太稳定，当网络发生变化的时候，项目中经常需要给用户一些提示，在LayaPlayer中有两种方法，可以获得网络环境变化。

## 1.监听方式

开发者可以使用注册监听函数的方式进行监听网络变化，代码如下：

JS代码如下
```javascript
if( conch )
{
    conch.setNetworkEvtFunction(function(type)
    {
	    alert(type)
    });
}
```
AS代码如下：
```javascript
if ( Render.isConchApp)
{
    Browser.window["conch"].setNetworkEvtFunction(function(type):void
    {
        alert(type)
    });
}
```

**返回值类为int类型**
```
NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```
**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*  
*3、或者使用if(Render.isConchApp )进行判断都可以。*  

## 2.查询方式

开发者还可以通过主动查询的方式，查询网络状态，代码如下：

```javascript
if( conch )
{
    var nType = conch.config.getNetworkType();
}
```

**返回值类为int类型**
```
NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_UNKNOWN=5
```



