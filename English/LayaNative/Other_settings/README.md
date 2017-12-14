

# Other instructions

## 1. About third party maps

LayaPlayer rendering is based on openGLES rendering, using GLSurfaceView control of Android and GLKView control of iOS, so it can't support third party map, such as Baidu map.

## 2. About the file format

**Text format files in the project (ini, XML, HTML, JSON, JS, etc.) must be utf8 encoding format, because iOS devices do not support non utf8 format encoded files.**

## 3. Debug mode and release mode

The bottom LOG of LayaPlayer is divided into three kinds:

```java
LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```

In the JS script, the developer can set the Debug mode by the following functions:

```javascript
if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```

**Tips**
*1、conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version.*
*2、If you use the as language to develop, you can get conch objects in this way through Browser.window['conch']*

## 4. About iOS Docking WeChat

In the iOS platform docking micro-channel SDK, WeChat 1.77 version after the need to increase -Objc parameters, WeChat official documentation to increase the `-Objc -all_load`,  but this will cause the compiler error.
Encountered this situation can change the parameter `-Objc -force_load libWeChatSDK.a` after configuration, as shown in Figure 1:

![1](img/1.png)

## 5. On the iOS simulator

The version of LayaPlayer after 0.9.5 supports the run of the iOS emulator, and after building a good project, the selection simulator can run.

**Tips：Although LayaPlayer supports the iOS simulator, but the efficiency is relatively low, that developers use iOS device debugging.**

## 6. Get all kinds of information

| Function name                 | Function description               | Return value description                                    | Remarks                               |
| -------------------- | ------------------ | ---------------------------------------- | -------------------------------- |
| getTotalMem()        | To run the total memory of the device          | The unit is KB                                    |                                  |
| getUsedMem()         | Get the memory occupied by the current application      | The unit is KB                                    | The return value is not accurate, but it can be used as a reference                 |
| getAvalidMem()       | Obtaining available memory          | he unit is KB                                    | The return value is not accurate, but it can be used as a reference                 |
| getNetworkType()     | Getting network state             | Return the int value，NET_NO = 0;NET_WIFI = 1;NET_2G = 2;NET_3G = 3;NET_4G = 4;NET_UNKNOWN=5 |                                  |
| getRuntimeVersion()  | Get a version of LayaPlayer    | The return value is a string, similar to ios-conch5-0.9.2、android-conch5-0.9 |                                  |
| getOS()              | Get the current system             | Return values are similar “Conch-ios” “Conch-android” Character string      |                                  |
| getAppVersion()      | Get the version number of iOS-App      | Return to string 1.1                               | IOS-app version number, through this version number, can be a APP update prompt |
| getAppLocalVersion() | Get the Local version number of iOS-App | Return to string 1.2                                 | The version number of iOS-app, through this version number, can be used as a APP update. |

这些函数都属于conch.config类的函数，调用实例：

```javascript
if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```

**Tips**
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*

## 7. AssistantTouch

LayaPlayer引擎内嵌了一个AssistantTouch，如下图所示：

![2](img/2.png)</br>

开发者可以通过以下函数进行显示和隐藏

```javascript
if( window.conch )
{
    window.conch.showAssistantTouch(false);
}
```
**Tips：**
*1、如果AssitantTouch更早消失，可以在config.js中进行设置*
*2、在LayaPlayer-0.9.5以前的版本，默认是打开的，0.9.5以后的版本，默认就是关闭的*

## 8. 关于LocalStorage

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



## 9. 屏蔽项目中报错弹框

项目运行过程中有时会弹出一些错误的提示，这些提示都是项目中有代码写错了。我们的建议是解决掉这些错误弹框里边的错，如果实在是解决不掉再去屏蔽。报错弹框代码如下所示：

```java
window.showAlertOnJsException(false);
```

## 10. 设置慢速模式（30帧）
LayaPlayer中FPS默认是60，但是针对于很多对实时性要求不强的游戏，刷新到30帧就可以了，这个时候可以通过以下函数进行设置。
```javascript
conch.config.setSlowFrame(true);
```
**Tips**  
**1、conch.config只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。**  
**2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。**


## 11. 接管android的后退按钮
（LayaNative版本 >=0.9.8）  
以前版本的LayaNative，对后退键的处理方式是连续按两次后退键就退出App。 从0.9.8以后，LayaNative引入了两个函数 conch.setOnBackPressedFunction(onBack) 和conch.exit(), 可以在脚本中接管对后退键的处理。接口定义为：  

```javascript
interface conch {
    ...
    setOnBackPressedFunction(onBack:()=>void);
    exit():void;
    ...
}
```

*setOnBackPressedFunction(f)*  
f是当用户按下后退键的时候执行的函数。
一旦调用了这个函数，就屏蔽了两次退出的功能，这时候，如果想要退出应用的话，只能通过调用exit()函数来实现。

*exit()*    
调用这个函数直接退出App。

*注意*
只有Android版有这两个函数。

js示例：  
```javascript
var n=3;
if(window.conch && window.conch.setOnBackPressedFunction){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
    });
}
```
## 12. 引擎初始化或加载启动脚本过程中的异常处理
在LayaPlayer-0.9.11版本以后，当引擎初始化、加载启动脚本过程中，如果发生异常（如网络不稳定），引擎会自动调用到window.onLayaInitError(error)函数，该函数默认在config.js中定义，代码如下：
```javascript
window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```
The developer can modify the false information and the wrong way of reporting according to its own needs.

## 13. Obtain the device model
After LayaPlayer-0.9.12, iOS can get the device model by calling conch.config.getDeviceInfo (). Can be used for iPhone X adaptation, the code is as follows:
```javascript
if( window.conch )
{
    var devInfo = JSON.parse(window.conch.config.getDeviceInfo());

    if (devInfo.devicename === 'iPhone10,3' || devInfo.devicename === 'iPhone10,6')
    {
        // iPhone X适配
    }
}
```
