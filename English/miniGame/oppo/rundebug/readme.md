#OPPO Game Publishing and Debugging Guide

> update: 2019-07-06
>

##1. OPPO Game Publishing and Debugging Environment Preparations

1. OPPO brand mobile phones.

2. Download and install OPPO real machine to test APP "Fast Application" (OPPO game debugger)

Go to OPPO Official Documents（[https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)) We found it.`安装 runtime.apk 包到 OPPO 手机上`This column is usually downloaded by selecting a new version.

Note that the version of the debugger is documented with the minimum platform version number. When LayaAirIDE is released, it should correspond to the minimum platform version number here.

3. Chrome browser of PC and data connection line of mobile phone.

4. Install the nodejs environment. It is recommended to install stable version 8.x[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

It's easy to download and install, and it's not detailed. Calling NPM commands from the command line is a success.

5. LayaAir IDE Centralized Development Environment, LayaAir 1.8.3 beta or above[ 官网下载: [https://ldc.layabox.com/layadownload/?type=layaairide](https://ldc.layabox.com/layadownload/?type=layaairide)]

6. Installation of ADB

When OPPO was released, the RPK package was pushed to the game directory of the mobile phone through ADB, so this must be installed.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

> Hint, download ADB Kits, download the compressed package, recommend decompression to a directory with a simpler path (such as:`D:\adb`(2) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1. Remember to add environment variables (Baidu can add environment variables on its own if you don't know how to add them).
>

##2. OPPO Game Publishing and Accessing Complete Process

###1. Preparatory work inspection before release.

In order to release OPPO smoothly, there are some checks we need to do.

First, in PC, node environment, ADB, Chrome and so on must be installed.

Second, in OPPO's mobile phone, enter`设置-> 其它设置-> 开发者选项`Developer options and USB debugging must be turned on, as shown in Figure 1.

![图1](img/1.png) 


(Fig. 1)

In addition, make sure that the OPPO game debugging environment is installed "fast application", as shown in Figure 2.

![图2](img/2.png) 


(Figure 2)

Third, PC computer and mobile phone are connected by USB data line. In computer, the same interface as Figure 3 can appear. For example, click OPPO R9m in the upper left corner of Figure 3 to access the mobile storage.

![图3](img/3.png) 


(Figure 3)

In the mobile phone, it should be noted that the screen remains bright and open. When the PC's IDE releases OPPO games, if there is a request for authorization information on the mobile phone, it must be certain to allow it. As shown in Figure 4.

![图4](img/4.png) 


(Figure 4)

###2. Publish OPPO Game Pack (xx.rpk)

LayaAirIDE publishing function, built-in OPPO game publishing function, need to first LayaAir engine project, through the publishing function into. RPK suffix package. About the use of publishing functions. This is not repeated here. No, you can check the official documents before.

Links:[[https://ldc.layabox.com/doc/?nav=zh-as-2-0-4](https://ldc.layabox.com/doc/?nav=zh-as-2-0-4)] (https://ldc2.layabox.com/doc/?Nav=zh-ts-2-0-6)

###3. Real-time debugging and Chrome output

OPPO debugging must be based on real-time debugging, PC chrome can only output information, can not see the screen.

If there is no problem with preparation, normally after the successful release of OPPO games in Laya AirIDE, the package of RPK will automatically appear in the OPPO game list of fast games (IDE pushes it to the specified directory by calling ADB), as shown in Figure 5.

![图5](img/5.png) 


(Fig. 5)

In Figure 5`OPPO测试`It's the name of the game we filled in when we released it. If we see the name of the game, it means that the normal release has been successful. Click on seconds to open the game we released.

If you want to see debugging information. Then you need to open the chrome browser. Then enter in the input field:


```

chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=10.10.82.111:12345/00010002-0003-4004-8005-000600070008
```


The IP address of the above example`10.10.82.111`Replace it with IP on your mobile phone. IP address do not know how to check, Baidu. The key point here is that the PC computer must be in the same LAN environment as the mobile phone.

If that's OK, the effect is shown in Figure 6.

![图6](img/6.png) 


(Fig. 6)

Publishing and debugging, if successful, will be completed.

###5. Release unsuccessful experience.

Publishing documents only talks about the use of functions. The above documents are the process under smooth conditions. However, developers may not be so smooth, so let's talk about experience here.

####No game is seen in the debug list. What's the situation?

If we can't automatically send RPK to the fast game directory when we publish it, we can't directly see the newly released games in the list in Figure 5.

At this point, you can use ADB to confirm the environment.

Input in IDE terminal or CMD`adb devices`Directives.

#####1. Connection abnormality:

![图7-1](img/7-1.png)  


(Figure 7-1)

At this point, the developer needs to check whether the mobile phone connection and privileges are correct.

#####2. Under normal connection conditions:

![图7-1](img/7-2.png)  


(Figure 7-2)

This means that the mobile phone has been successfully connected, and the developer mode and USB debugging have been started. At this point, you can try to restart oppo's fast application apk, and then view the list information.

**In case of normal connection**If problems arise again. It may have something to do with Windows permissions, and you need to make sure that you start LayaAirIDE with administrator permissions.

Developers can learn about issues related to ADB or mobile phone rights by themselves.

-----

On the other hand, we can use the manual mode to copy the RPK package to the game directory stored in the mobile phone. If there is no game directory, we can create it by ourselves.

The RPK package is located in the release/oppogame/quickgame/dist directory of the project, as shown in Figure 8.

![图8](img/8.png)  


(Figure 8)

Copy the generated RPK file to the game directory stored in the mobile phone, as shown in Figure 9.

![图9](img/9.png)  


(Figure 9)

This method is more stable.

stay`.rpk`In the case of successful file generation, the publishing process is actually over.

If there is a problem with the packaging process, you can feed it back to the Layabox official team, which will work with the OPPO team.

Finally, let me remind you that this document is applicable to the LayaAir2.x engine and IDE release process.

If it's a 1.x engine,

You need to introduce the adapter library manually and initialize it manually, which is different from 2. X.


```typescript

//TS或JS初始化
Laya['QGMiniAdapter'].init();//需要引入aya.quickgamemini.js

//as3初始化
QGMiniAdapter.init();//需要 import laya.qg.mini.QGMiniAdapter;
```


In addition, there are other things to be noted, as well as the details of the process. Welcome to watch the free video of OPPO access.

Video address:[https://ke.qq.com/course/409332](https://ke.qq.com/course/409332)

##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)

