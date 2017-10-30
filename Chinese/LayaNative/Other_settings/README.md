

# 其他说明

## 1. 关于第三方地图

LayaPlayer底层渲染使用openGLES渲染，使用android的GLSurfaceView控件和iOS的GLKView控件，所以无法支持第三方地图，如百度地图。

## 2. 关于文件格式

**项目中的文本格式文件（例如:ini、xml、html、json、js等）都必须是utf8编码格式，因为iOS设备不支持非utf8格式编码的文件。**

## 3. debug模式和release模式

LayaPlayer底层LOG分为三种：

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
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*
*2、如果使用as语言开发的时候，可以通过 Browser.window['conch']这种方式获得conch对象。*

## 4.关于iOS对接微信

在iOS平台下对接微信SDK，微信1.77版本以后需要增加-Objc的参数，微信的官方文档中默认让增加`-Objc -all_load`,但是这样会导致编译报错。
遇到到这种情况可以把参数变成 `-Objc -force_load libWeChatSDK.a`，配置后，如图1所示：

![1](img/1.png)

## 5. 关于iOS模拟器

LayaPlayer在0.9.5以后的版本，支持iOS模拟器运行，构建好项目后，选择模拟器便可运行。

**Tips：虽然LayaPlayer支持iOS模拟器，但是运行效率比较低，建议开发者使用iOS真机调试。**

## 6. 获取各种信息

| 函数名称                 | 函数说明               | 返回值说明                                    | 备注                               |
| -------------------- | ------------------ | ---------------------------------------- | -------------------------------- |
| getTotalMem()        | 获得运行设备总内存          | 单位为KB                                    |                                  |
| getUsedMem()         | 获得当前应用程序占用的内存      | 单位为KB                                    | 返回值不太准确，但是可以作为参考                 |
| getAvalidMem()       | 获得可用的内存            | 单位为KB                                    | 返回值不太准确，但是可以作为参考                 |
| getNetworkType()     | 获得网络状态             | 返回int值，NET_NO = 0;NET_WIFI = 1;NET_2G = 2;NET_3G = 3;NET_4G = 4;NET_UNKNOWN=5 |                                  |
| getRuntimeVersion()  | 获得LayaPlayer的版本    | 返回值是一个字符串，类似ios-conch5-0.9.2、android-conch5-0.9 |                                  |
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
开发者可以根据自己需求，修改报错信息和报错方式。