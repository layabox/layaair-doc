

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

These functions belong to the conch.config class function, invoke the instance:

```javascript
if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```

**Tips**
*1、conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version.*
*2. If you use the as language to develop, you can get conch objects in this way through Browser.window['conch']*

## 7. AssistantTouch

A AssistantTouch is embedded in the LayaPlayer engine, as shown in the following figure:

![2](img/2.png)</br>

Developers can display and hide them through the following functions

```javascript
if( window.conch )
{
    window.conch.showAssistantTouch(false);
}
```
**Tips：**
*1. If AssitantTouch disappears earlier, it can be set up in config.js*
*2. In the previous version of LayaPlayer-0.9.5, the default was open, after the 0.9.5 version, the default is turned off*

## 8. About LocalStorage

LayaNative supports the use of LocalStorage, but there is a formatting requirement that you have to use getItem()、setItem() to store values and get value.

### AS usage

```java
//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```



### JS and TS usage

```java
//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```



### Wrong usage : 

The following JS grammar usage in the PC browser or mobile client (browser support) support, but does not support LayaNative

```java
//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```



## 9. Security project error box reported

In the course of the project, some wrong tips are sometimes popped up, all of which are code miswritten in the project. Our suggestion is to get rid of the errors in the wrong box, if it is not to be solved. Report error box code as follows:

```java
window.showAlertOnJsException(false);
```

## 10. Set slow mode (30 frame)
LayaPlayer FPS default is 60, but for many games that do not require real-time performance, it can be refreshed to 30 frames. this time can be set through the following functions
```javascript
conch.config.setSlowFrame(true);
```
**Tips**  
**1. Conch can only be called under the LayaPlayer environment, and there is no conch definition in the web version.**  
**2. If you use the as language to develop, you can get conch objects in this way through Browser.window['conch'] **


## 11. Take over the back button of the Android
（LayaNative版本 >=0.9.8）  
Previous versions of LayaNative, the treatment of the back button is to press the back button twice in a row to exit the App. After 0.9.8, LayaNative introduced two functions
conch.setOnBackPressedFunction(onBack) 和conch.exit(), 可以在脚本中接管对后退键的处理。接口定义为：  

```javascript
interface conch {
    ...
    setOnBackPressedFunction(onBack:()=>void);
    exit():void;
    ...
}
```

*setOnBackPressedFunction(f)*  
f is a function that is executed when the user presses the back key.
Once the function is invoked, the function of the two exit is blocked. At this point, if you want to quit the application, it can only be realized by calling the exit () function.

*exit()*    
Call this function directly from the App.

*note*
Only Android version has these two functions.

js example :  
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
## 12. Exception handling during engine initialization or loading startup scripts
After LayaPlayer-0.9.11  version, when the engine initializes and loads the startup script, if there is an exception occurs (such as network instability), the engine will automatically call the window.onLayaInitError(error) function, which is defined in config.js by default. The code is as follows:
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
