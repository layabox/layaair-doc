#Guidelines for Release and Debugging of Millet Fast Game

> update: 2019-05-15
>
> The release of Millet Express Game must use LayaAirIDE. For the download of IDE, please refer to the relevant documents, not within the scope of this article.

##1. Preparing for release and debugging environment of millet fast game

1. Millet Brand Mobile Phone (Note must be MIUI version 8.5 or above).

2. Download the test APP for installing millet and download the page:[[https://dev.mi.com/console/doc/detail?pId=1738](https://dev.mi.com/console/doc/detail?pId=1738)] (https://dev.mi.com/console/doc/detail?PId=1704)

After entering the page, Click to download the fast game debugger. You can download and install it. As for how to install and test APP, this is not covered here.

3. Chrome browser of PC and data connection line of mobile phone.

4. Installing nodejs environment[node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

It's easy to download and install, and it's not detailed. Calling NPM commands from the command line is a success.

5. LayaAir IDE Centralized Development Environment, LayaAir 1.8.2 or above[ 官网下载: [https://ldc.layabox.com/layadownload/?type=layaairide](https://ldc.layabox.com/layadownload/?type=layaairide)

6. Installation of ADB

It is recommended to install ADB because sometimes it is authorized or for some other strange reason. This will result in failure to start the chrome online debugging properly. So installing ADB can verify and help the connection authorization between mobile phone and PC. If you ensure that there is no USB debugging authorization problem, you can also not install it.


 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads)]

A simple hint, download ADB Kits, download the compressed package, it is recommended to decompress and put into a directory with a simpler path (such as:`D:\adb`(2) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1) The results of the study are as follows:1. Remember to add environment variables (Baidu can add environment variables on its own if you don't know how to add them).

##2. The whole process of releasing and accessing millet fast game

###1. Publish the Millet Express Game Pack (xx.rpk)

LayaAirIDE release function, built-in release function of millet fast game, need to first LayaAir engine project, through the release function into. RPK suffix package. About the use of publishing functions. This is not repeated here. No, you can check the official documents before.

Before publishing, be sure to add adapter code before engine initialization: ts, JS is Laya. KGMiniAdapter. init ();

As is KGMiniAdapter.init();

Links:[[https://ldc.layabox.com/doc/?nav=zh-as-2-0-4](https://ldc.layabox.com/doc/?nav=zh-as-2-0-4)] (https://ldc2.layabox.com/doc/?Nav=zh-ts-2-0-6)

###2. Retain the publishing two-dimensional code interface.

After publishing, there will be a two-dimensional code interface, as shown in Figure 1. This interface should not be turned off. The back mobile phone scanner needs to be used.

![图1](img/1.png) 


(Fig. 1)

###3. Open the Publishing Folder and Start Command Line Mode

Click on Figure 1`打开发布文件夹`Button to enter the post-release Millet Express Game Project Catalogue. Then hold down`Shift + 右键`You can quickly enter shell or command window mode in the current directory, as shown in the markup section in Figure 2-1 or 2-2.

![图2-1](img/2-1.png) 


(Figure 2-1)

![图2-2](img/2-2.png) 


(Figure 2-2)

Of course, Git can also enter the command line (Git Bash Here) or other ways to enter the command line, and then enter the Millet Express Game Project Directory to complete this step.

This part mainly tells developers how to quickly enter the current release directory in command line mode. Because the debug command to start chrome debugging must operate in the release directory of the millet fast game. Here's a quick look, and keep the command line open. I'll use it later.

###4. Start the chrome debugging environment

####4.1 Install and enter Fast Application Debugger

To start the chrome debugging environment of PC, we need to install the debugging APP (fast application debugger) of millet fast game, as shown in Figure 3. Then click Enter.

![图3](img/3.png) 


(Figure 3)

####4.2 Install RPK package of millet fast game in the interface of fast application debugger

After entering the fast application debugger, we can see the APP interface shown in Figure 4.

![图4](img/4.png) 


(Figure 4)

At this point, we click on the scanner installation in Figure 4 to scan the two-dimensional code on the publishing interface in LayaAir IDE. Mobile phones can run in a real environment.

> Here's a reminder: the mobile network and PC in the same LAN segment (with 4G network sweep LAN code is certainly not feasible).

If you pass the RPK package in the publishing directory / dist directory to your mobile phone, you can click`本地安装`Button to install, is also possible. But it is recommended to install scanner, because the steps of scanner are more convenient and fast.

####4.3 Maintaining physical connection and authorization

For developers with relative experience, this step can be skipped to ensure that the physical line of the USB mobile phone connection line is connected and that the USB debugging authorization is okay.

#####The relevant operations are as follows:

1. Maintain the physical connection between the mobile phone and the PC by using the mobile phone connection line. Turn on the developer mode of the mobile phone, and turn on Usb debugging.

At this point, we need to pay attention to the mobile phone, whether there is a prompt as shown in Figure 5-1, and if so, point to determine whether debugging is allowed.

![图5-1](img/5-1.png) 


(Fig. 5-1)

2. Authentication.

When the USB debugging mode is authorized successfully, we enter ADB devices, which should be shown in Figure 5-3.

![图5-2](img/5-2.png) 


(Fig. 5-2)

In short, in this link, we need to ensure that the PC is authorized to debug this mobile device.

####4.4 Start the chrome debugging environment

The development and debugging environment of millet fast game without tools on PC is connected to mobile device through USB, and then in PC command line mode, through`npm run debug`The command calls up the Chrome debugger (provided that the PC is installed with the Chrome browser) to debug the RPK package of the mobile phone's real environment, as shown in Figure 6.

![图6](img/6.png) 


(Fig. 6)

When we can see`Debugger URL opened in Chrome.`This prompt indicates that chrome has been successfully activated and is consistent with the picture in the real machine. As shown in Figure 7. The various operations in the real machine will be fully synchronized to the PC chrome, so we can debug the millet fast game project according to the chrome debugging method.

![图7](img/7.png) 


(Figure 7)

So far, the whole process from release to start chrome debugging has been introduced.

Finally, the specific debugging method. I won't go into detail in this article.



##This article appreciates

If you think this article is helpful to you, you are welcome to sweep the code and appreciate the author. Your motivation is our motivation to write more high quality documents.

![wechatPay](../../../wechatPay.jpg)

