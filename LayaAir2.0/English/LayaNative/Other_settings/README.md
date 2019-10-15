#Other instructions

##1. About Third Party Maps

LayaNative's underlying rendering uses open GLES, android's GLSurfaceView control and iOS's GLKView control, so it can't support third-party maps, such as Baidu Map.

##2. About file format

**Text format files in the project (such as ini, xml, html, json, js, etc.) must be utf8 encoding format, because iOS devices do not support files encoded in non-UTF8 format.**

##3. debug mode and release mode

LayaNative bottom LOG is divided into three types:


```java

LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```


In the JS script, developers can set Debug mode through the following functions:


```javascript

if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```


**Tips**
*1. Conh can only be invoked in LayaNative environment. There is no conch definition in the web version, so we need to judge whether it exists or not.*
*2. When developing in as language, conch objects can be obtained through Browser. window ['conch'].*

##4. On iOS Docking Wechat

Docking with Wechat SDK on iOS platform, the parameters of - Objc need to be added after version 1.77 of Wechat. The official documents of Wechat are increased by default.`-Objc -all_load`But this can lead to compilation errors.
In this case, the parameters can be changed into`-Objc -force_load libWeChatSDK.a`After configuration, as shown in Figure 1:

![1](img/1.png)

##5. About iOS Simulator

LayaNative supports iOS simulator, but because of the low efficiency of the simulator, developers are advised to use iOS real-time debugging.

##6. Access to various information

| Function Name | Function Description | Return Value Description | Remarks|
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getTotalMem ()| Gets the total memory of the running device | in KB||
| getUsedMem () | Getting the memory occupied by the current application | in KB | is not very accurate, but it can be used as a reference.|
| getAvalidMem () | Getting the available memory | in KB | is not very accurate, but it can be used as a reference.|
| getNetworkType () | Gets network status | Returns int value, NET_NO = 0; NET_WIFI = 1; NET_2G = 2; NET_3G = 3; NET_4G = 4; NET_UNKNOWN = 5||
|Getruntimeversion() | get the version of runtime | the return value is a string, similar to ios-conch5-0.9.2 and android-conch5-0.9 |.|
| getOS ()| Gets the current system | Returns a value similar to "Conch-ios" and "Conch-android" strings||
| getAppVersion ()| Gets the version number of iOS-App | Returns the version number of the string 1.1 | iOS-app, through which you can make an update prompt for APP. A kind of
| getAppLocalVersion ()| Gets the Local version number of iOS-App | Returns the version number of the string 1.2 | iOS-app, through which you can make an update prompt for APP. A kind of

These functions belong to the conch.config class and call instances:


```javascript

if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```


**Tips**
*1. Conh can only be invoked in LayaNative environment. There is no conch definition in the web version, so we need to judge whether it exists or not.*
*2. When developing in as language, conch objects can be obtained through Browser. window ['conch'].*

##7. Error-reporting frame in shielding project

Sometimes in the process of running a project, some wrong prompts pop up, which are all code errors in the project. Our suggestion is to eliminate the mistakes in the bullet box, if they are really not solved, then remove the shield. The error-reporting cartridge code is as follows:


```java

window.showAlertOnJsException(false);
```


##8. Exception handling during engine initialization or loading startup scripts
In LayaNative 2.0, when the engine initializes and loads the startup script, if an exception occurs (such as network instability), the engine automatically calls the window.onLayaInitError (error) function, which is defined by default in config.js. The code is as follows:

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

Developers can modify the error information and mode according to their own needs.

##9. Obtain equipment model
In LayaNative 2.0, iOS can get the device model by calling conch. config. getDeviceInfo (). It can be used to fit the curtain of the iPhone X. The code is as follows:

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
