#Guidelines for release and debugging of vivo games

> update: 2019-07-01
>
> The release of vivo Games must use LayaAirIDE. For the download of IDE, please check the relevant documents, which are not covered in this article.

##1. Preparing for release and debugging environment of vivo games

1. Mobile phones of vivo brand

2. Download and install vivo's debugging APP and download pages:[https://minigame.vivo.com.cn/documents/](https://minigame.vivo.com.cn/documents/#/download/debugger)#[/download/debugger](https://minigame.vivo.com.cn/documents/#/download/debugger)

Once you enter the page, you can download and install it by clicking on it immediately. As for how to install vivo to debug APP, this is not covered here.

3. Download vivo game engine

current**Debugging APP**The built-in version of the vivo engine is 1034. There is a known BUG in this version. We have to go to the official website of vivo games to download the latest version of the small game engine apk.

The download page is:

Https://minigame.vivo.com.cn/documents/#/ Download/engine

The current recommended version is 1041. After downloading and installing, we can see the platform version number of the vivo Fast Application Debugger, which is also shown in 1041.

4. Chrome browser of PC and data connection line of mobile phone.

5. Installing nodejs environment[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

It's easy to download and install, and it's not detailed. Calling NPM commands from the command line is a success.

6. LayaAir IDE Centralized Development Environment, LayaAir IDE 1.8.4 beta or above[ 官网下载: [https://ldc.layabox.com/layadownload/?type=layaairide](https://ldc2.layabox.com/layadownload/?type=layaairide)]

7. Installation of ADB

ADB can be used for authorization, publishing and pushing, etc. It can be downloaded and installed on ADB's official website.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

> A simple hint, download ADB Kits, download the compressed package, it is recommended to decompress and put into a directory with a simpler path (such as:`D:\adb`(2) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1. Remember to add environment variables (Baidu can add environment variables on its own if you don't know how to add them).
>

##2. The whole process of publishing and accessing vivo games

###1. Publish the vivo game package (xx.rpk)

LayaAirIDE release function, built-in vivo game release function, need to first LayaAir engine project, through the release function into. RPK suffix package. About the use of publishing functions. This is not repeated here. No, you can check the official documents before.

Before publishing, make sure that the adapter code TS is added before engine initialization, JS is Laya. VVMiniAdapter. init (); as is VVMiniAdapter. init ();

Links:[[https://ldc.layabox.com/doc/?nav=zh-ts-2-0-4](https://ldc.layabox.com/doc/?nav=zh-ts-2-0-4)] (https://ldc2.layabox.com/doc/?Nav=zh-ts-2-0-6)

###2. Retain the publishing two-dimensional code interface.

After publishing, there will be a two-dimensional code interface, as shown in Figure 1. This interface should not be turned off. The back mobile phone scanner needs to be used.

![图1](img/1.png) 


(Fig. 1)

###3. Start the chrome debugging environment

####3.1 Install and enter Fast Application Debugger

To start the chrome debugging environment of PC, we need to install the debugging APP (Fast Application Debugger) of vivo games, as shown in Figure 3. Then click Enter.

![图3](img/3.png) 


(Figure 3)

####3.2 Install the RPK package of vivo games in the interface of fast application debugger

After entering the fast application debugger, we can see the APP interface shown in Figure 4.

![图4](img/4.png)  


(Figure 4)

At this point, we click on the scanner installation in Figure 4 to scan the two-dimensional code on the publishing interface in LayaAir IDE. Mobile phones can run in a real environment.

> Here's a reminder: the mobile network and PC in the same LAN segment (with 4G network sweep LAN code is certainly not feasible).

If you pass the RPK package in the publishing directory / dist directory to your mobile phone, you can click`本地安装`Button to install, is also possible. But it is recommended to install scanner, because the steps of scanner are more convenient and fast.

####3.3 Maintaining physical connection and authorization

For developers with relative experience, this step can be skipped to ensure that the physical line of the USB mobile phone connection line is connected and that the USB debugging authorization is okay.

#####The relevant operations are as follows:

1. Maintain the physical connection between the mobile phone and the PC by using the mobile phone connection line.

2. On the previously opened command line, enter the ADB shell, as shown in Figure 5-1. It is not authorized by USB debugging mode.

![图5-1](img/5-1.png) 


(Fig. 5-1)

At this point, we need to pay attention to the mobile phone, whether there is a prompt as shown in Figure 5-2, and if so, point to determine whether USB debugging is allowed.

![图5-2](img/5-2.png) 


(Fig. 5-2)

3. Verify the authorization again.

When the USB debugging mode is authorized successfully, we enter the ADB shell again, as shown in Figure 5-3.

![图5-3](img/5-3.png) 


(Fig. 5-3)

In short, in this link, we need to ensure that the PC is authorized to debug this mobile device.

####3.4 Start the chrome debugging environment

After the previous scanner installation, it will automatically enter the newly installed game or DEMO.

To start debugging, you have to exit first.

Then, as shown in Figure 6, Click**Start debugging**Enter the debugging mode of vivo games.

![图6](img/6.png) 


(Fig. 6)

After the real machine enters the debugging mode, we go to the PC to open the chrome browser.

At this time, don't forget, to connect USB data lines, mobile devices and PCs, the issue of authority has been said above, no longer repeat.

We need to find the IP of the mobile phone (Baidu) and remember it. It is important to note that the mobile phone network and the PC network are always in the same LAN segment.

Enter in the input field of Chrome Browser:


```

chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws={IP}:5086/00010002-0003-4004-8005-000600070008
```


Replace {IP} with the mobile IP address, as shown in Figure 7.

![图7](img/7.png)(Figure 7)



So far, the complete process from release to start chrome debugging has been introduced. If you want to know more about the access process and documentation of vivo games, remember this website:

Https://minigame.vivo.com.cn



##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)

