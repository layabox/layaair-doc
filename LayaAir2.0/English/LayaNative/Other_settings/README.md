

# 其他说明

## 1. 关于第三方地图

LayaNative底层渲染使用openGLES渲染，使用android的GLSurfaceView控件和iOS的GLKView控件，所以无法支持第三方地图，如百度地图。

## 2. 关于文件格式

**项目中的文本格式文件（例如:ini、xml、html、json、js等）都必须是utf8编码格式，因为iOS设备不支持非utf8格式编码的文件。**

## 3. debug模式和release模式

LayaNative底层LOG分为三种：

```java
LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```

在js脚本中，开发者可以通过以下函数设置Debug模式：

```javascript
if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```

**Tips**
*1、conch只能LayaNative环境下调用，在网页版本中是没有conch定义的，所以需要判断一下是否存在。*
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*

## 4.关于iOS对接微信

在iOS平台下对接微信SDK，微信1.77版本以后需要增加-Objc的参数，微信的官方文档中默认让增加`-Objc -all_load`,但是这样会导致编译报错。
遇到到这种情况可以把参数变成 `-Objc -force_load libWeChatSDK.a`，配置后，如图1所示：

![1](img/1.png)

## 5. 关于iOS模拟器

LayaNative支持iOS模拟器，但是由于模拟器运行效率比较低，建议开发者使用iOS真机调试。

## 6. 获取各种信息

| 函数名称                 | 函数说明               | 返回值说明                                    | 备注                               |
| -------------------- | ------------------ | ---------------------------------------- | -------------------------------- |
| getTotalMem()        | 获得运行设备总内存          | 单位为KB                                    |                                  |
| getUsedMem()         | 获得当前应用程序占用的内存      | 单位为KB                                    | 返回值不太准确，但是可以作为参考                 |
| getAvalidMem()       | 获得可用的内存            | 单位为KB                                    | 返回值不太准确，但是可以作为参考                 |
| getNetworkType()     | 获得网络状态             | 返回int值，NET_NO = 0;NET_WIFI = 1;NET_2G = 2;NET_3G = 3;NET_4G = 4;NET_UNKNOWN=5 |                                  |
| getRuntimeVersion()  | 获得Runtime的版本       | 返回值是一个字符串，类似ios-conch5-0.9.2、android-conch5-0.9 |                                  |
| getOS()              | 获得当前系统             | 返回值类似“Conch-ios” “Conch-android”字符串      |                                  |
| getAppVersion()      | 获得iOS-App的版本号      | 返回字符串 1.1                                | iOS-app的版本号，通过这个版本号，可以做APP的更新提示。 |
| getAppLocalVersion() | 获得iOS-App的Local版本号 | 返回字符串1.2                                 | iOS-app的版本号，通过这个版本号，可以做APP的更新提示。 |

这些函数都属于conch.config类的函数，调用实例：

```javascript
if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```

**Tips**
*1、conch只能LayaNative环境下调用，在网页版本中是没有conch定义的，所以需要判断一下是否存在。*
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*

## 7. 屏蔽项目中报错弹框

项目运行过程中有时会弹出一些错误的提示，这些提示都是项目中有代码写错了。我们的建议是解决掉这些错误弹框里边的错，如果实在是解决不掉再去屏蔽。报错弹框代码如下所示：

```java
window.showAlertOnJsException(false);
```

## 8. 引擎初始化或加载启动脚本过程中的异常处理
在LayaNative2.0版本中，当引擎初始化、加载启动脚本过程中，如果发生异常（如网络不稳定），引擎会自动调用到window.onLayaInitError(error)函数，该函数默认在config.js中定义，代码如下：
```javascript
window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```
开发者可以根据自己需求，修改报错信息和报错方式。

## 9. 获取设备型号
在LayaNative2.0中，iOS可以通过调用conch.config.getDeviceInfo()获取设备型号。可以用于iPhone X的头帘适配，代码如下：
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