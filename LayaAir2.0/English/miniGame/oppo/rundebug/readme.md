# OPPO game release and debugging guide

> update : 2019-07-06
>

## 1、OPPO game release, setup debugging environment

1、OPPO brand mobile phone

2、Download and install OPPO real machine to test APP "Fast Application" (OPPO Game Debugger)

Go to the OPPO official website document（[https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)）我们找到`安装 runtime.apk 包到 OPPO 手机上`这个栏目，通常会选择新版本，进行下载。

Note that the version of the debugger is documented with the minimum platform version number. When LayaAirIDE is released, it should correspond to the minimum platform version number here.

3、PC Chrome browser and mobile phone data connection line.

4、Install the nodejs environment, it is recommended to install the 8.x stable version [node official website：[https://nodejs.org/en/](https://nodejs.org/en/)]

Despite  it is not detailed, download and install remain relatively simple. Being able to call the npm command on the command line is a success.

5、LayaAirIDE centralized development environment. LayaAir 2.1.0 beta or above [ Official website download : [https://ldc2.layabox.com/layadownload/?type=layaairide](https://ldc2.layabox.com/layadownload/?type=layaairide) ]

6、Install ADB

When the OPPO was released, the rpk package was pushed to the phone's games directory via ADB, so this must be installed.

 [ ADB Official website download:  [http://adbshell.com/downloads](http://adbshell.com/downloads) ]

> Prompt, download ADB Kits, download the compressed package, it is recommended to extract to a directory with a simple path (such as: `D:\adb`). Remember to add environment variables
>

## 2、OPPO Game Publishing and Accessing Complete Process      

### 1、Pre-release check before release.

In order to make the release of OPPO smoother, there are some inspections we have to do.

First, in PC, node environment, ADB, Chrome and so on must be installed.

Second, in OPPO's mobile phone, enter `Settings - > Other Settings - > Developer Options', the developer options and USB debugging must be turned on, as shown in Figure 1.

![图1](img/1.png) 

(figure 1)

In addition, make sure that the OPPO game debugging environment is installed "fast application", as shown in Figure 2.

![图2](img/2.png) 

(figure 2)

Third, PC computer and mobile phone are connected by USB data line. In computer, the same interface as Figure 3 can appear. For example, click OPPO R9m in the upper left corner of Figure 3 to access the mobile storage.

![图3](img/3.png) 

(figure 3)

In the mobile phone, it should be noted that the screen remains bright and open. When the PC's IDE releases OPPO games, if there is a request for authorization information on the mobile phone, it must be certain to allow it. As shown in Figure 4.

![图4](img/4.png) 

（figure 4）

### 2、Publish OPPO Game Pack(xx.rpk)

LayaAirIDE publishing function, built-in OPPO game publishing function, need to first LayaAir engine project, through the publishing function into. RPK suffix package. About the use of publishing functions. This is not repeated here. No, you can check the official documents before.

link：[https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6](https://ldc2.layabox.com/doc/?nav=zh-ts-3-0-6)

### 3、Real-time debugging and Chrome output

OPPO debugging must be based on real-time debugging, PC chrome can only output information, can not see the screen.

If there is no problem with preparation, normally after the successful release of OPPO games in Laya AirIDE, the package of RPK will automatically appear in the OPPO game list of fast games (IDE pushes it to the specified directory by calling ADB), as shown in Figure 5.

![图5](img/5.png) 

（figure 5）

The `OPPO test'in Figure 5 is the name of the game we filled in when we released it. If we see the name of the game, it means that the normal release has been successful. Click on seconds to open the game we released.

If you want to see debugging information. Then you need to open the chrome browser. Then type in the input field:

```
chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=10.10.82.111:12345/00010002-0003-4004-8005-000600070008
```

The IP address `10.10.82.111` of the above example is replaced with the IP on your mobile phone. IP address does not know how to check, Baidu. The key point here is that the PC must be in the LAN environment on the same network segment as the mobile phone.

If there is no problem, the effect is shown in Figure 6.

![图6](img/6.png) 

（figure 6）

Release and debug, if it is successful, it will be completed.

### 5、Publish unsuccessful processing experience.

In the release document, only the function is used. The above document is a smooth process. However, developers may not be so smooth, so let's talk about experience here.

#### No game is seen in the debug list. What's the situation?

If we didn't automatically send rpk to the fast game directory when we released it, there is no way to directly see the newly released game in the list in Figure 5.

At this time you can use adb to confirm the environment.

Enter the `adb devices` command in the ide terminal or cmd.

##### 1.Connection abnormal :

![图7-1](img/7-1.png)  

（figure7-1）

At this point, the developer needs to check whether the mobile phone connection and privileges are correct.

##### 2. normal process :

![图7-1](img/7-2.png)  

（figure 7-2）

At this point, the phone has been successfully connected, and the developer mode and usb debugging have been started. At this point, you can try to restart the oppo quick application apk, and then view the list information.

**In case of normal connection**，If problems occurd again. It may have something to do with Windows permissions, and you need to make sure that you start LayaAirIDE with administrator permissions.

Developers can learn about issues related to ADB or mobile phone rights by themselves.

------

Another solution, so that we can use the manual mode, copy the rpk package to the games directory stored in the phone, if you do not have the games directory, create it yourself.

The rpk package is located in the project's release/oppogame/quickgame/dist directory, as shown in Figure 8.

![图8](img/8.png)  

（图8）

Copy the generated rpk file to the games directory stored in the phone, as shown in Figure 9.

![图9](img/9.png)  

（picture 9）

This method is more stable.

In the case where the `.rpk` file is successfully generated, the actual publishing process has ended.

If there is a problem with the packaging process, you can feed it back to the Layabox official team, which will work with the OPPO team.

Finally, let me remind you that this document is applicable to the LayaAir2.x engine and IDE release process.

If it is a 1.x engine version,

Need to manually introduce the adapter library, and manually initialize, this is not the same as 2.x.

```typescript
//TS或JS初始化
Laya['QGMiniAdapter'].init();//需要引入aya.quickgamemini.js

//as3初始化
QGMiniAdapter.init();//需要 import laya.qg.mini.QGMiniAdapter;
```

There are other places to be aware of, as well as details. Welcome to the free video of OPPO access.

Video Address：[https://ke.qq.com/course/409332](https://ke.qq.com/course/409332)

## article feedback

If you find this article helpful, please scan the code to appreciate the author, your feedback is also our motivation to write more quality documents.

![wechatPay](../../../wechatPay.jpg)

