#Create the first Wechat game

>*Author: Charley version: LayaAir 2.0 update: 2018-10-27*

###I. Prepare the Development Environment

####1. Download and install LayaAirIDE integrated development environment

LayaAirIDE is an integrated development environment of LayaAir engine. It integrates LayaAir engine with sample projects, UI, animation and other visual editing tools, project code writing and management tools.**Developers can directly use LayaAirIDE to create and publish Wechat game projects.**

**Download Address on Official Website**:[http://ldc2.layabox.com/layadownload/?type=layaairide](http://ldc2.layabox.com/layadownload/?type=layaairide)



####2. Download and install Wechat Developer Tools

Wechat developer tools are mainly used for preview and debugging of small game products, real machine testing, upload submission, etc. It is a necessary tool for the development of small games.

**Development Tool Download Address**:
[https://developers.weixin.qq.com/minigame/dev/devtools/download.html](https://developers.weixin.qq.com/minigame/dev/devtools/download.html)

![3](img/3.png)  







####3. Create an enterprise developer account for a small program and get the developer ID (AppID)

Although you can develop and debug without an AppID, the functionality is limited. So before development, it's better to go to Wechat Public Platform to create a small program developer account.

#####Relevant precautions before registering an account

One**Registered as a personal developer does not need a version number, but it can not access the buy-in (payment) function.**The traffic can be realized by accessing advertisements. When accessing advertisements, personal information or company information can be filled in.
2. If in the game**When it comes to payment functions, it is necessary to use enterprise developer accounts.**。 And submit the version number.
3. When registering Weixin public platform account, the classification should remember the game classification, otherwise the registered account can only develop small programs, not small games.
4. Small game in-house purchasing is currently only available in Android version, and both Android and iOS can be accessed in AD cash.

**Registered address**:[https://mp.weixin.qq.com/wxopen/waregister?action=step1](https://mp.weixin.qq.com/wxopen/waregister?action=step1)

After registering the developer account, you can see the AppID in the development settings of the settings menu. As shown in the figure below, the developer needs to record well and use it when creating a small game project.

![图2-2](img/2-2.png)

###

###II. Creating and Publishing Wechat Game Project with LayaAirIDE

####1. Create a small game sample project with LayaAirIDE

Open LayaAirIDE and click`新建`Pop up the panel for the new project. Select any project type in the list of project types on the left side of the panel, and set the project name, project path, development language type and engine version on the right side of the panel. You can create a small game project, for Weixin small game project, do not forget to check`增加微信小游戏支持`As shown in the figure below.

![img](img/4.png)



####2. Project Development

This part of project development will not be described in detail, the use of related engines and IDE can see other documents. Since we chose to create a sample project, we could go directly into the release of the mini-game.

####3. Published as Wechat Game

Click on the project release button, in the pop-up release project interface, choose the release platform for Wechat games.

If you haven't compiled in the project, you can check whether to recompile the project and then recompile it at publication time.

File extraction is critical because of the limitation of Weixin 4M package upload and submission. Through the file extraction function, only the files in 4M package can be copied to the designated Wechat game project directory. As shown in the figure below.

> Inclusion restriction, subcontracting up to 8M, related content is introduced in other documents. This article is only for novices to quickly familiarize themselves with the release process of small games.

![img](img/2-3.png) 



![图：文件提取](img/2-4.png) 

(Figure: File extraction function, click browse, you can filter only copy the checked 4M package files)

**Tips**:

> Click on the question mark icon on the right side of the publishing platform to see the detailed description of each option.

After configuring the content needed for publishing. Finally click Publish. It can generate the Wechat game project.



###3. Creating Small Game Projects with Wechat Developer Tools

####1. Developer account login, select project type

Open the "Wechat Web Developer Tool" and log in with the developer's Wechat Sweep Code. Then choose**Small program project**Click to enter the project settings.

![img](img/8.png) 



####2. Create small game projects

After clicking on the widget project, in the pop-up panel, click the plus sign in the lower right corner, you can pop up the panel created by the widget project. As shown in the figure below.

![img](img/8-1.png)  


`项目目录`It's better to select the local package directory that you just copied through the extract function. If you are not familiar with this function. Just for the sake of running the process, you can also temporarily select the directory of the game just released by LayaAirIDE (release wxgame, usually in the project root directory).

`AppID`Just click on the AppID input you saw from the Wechat Public Platform before, and you can develop and debug without input, but the function will be limited. So it's better to enter AppID.



####3. Compilation of Wechat Developer Tools

After the creation of the small game project, you can preview the effect and debug in the tool.

![13](img/9.png) 







####4. Testing and debugging of real machine

Because LayaAirIDE can also debug project effects, unless it is appropriate for related issues, basically there will be no inconsistency between the two sides of the effect. So the most important thing here is to click**preview**Function: scan code through mobile wechat, test and debug the real machine in wechat.

![img](img/14.png) 


**Tips:**

When you go to the fax machine, by default, you can't exceed 4M and configure subcontracting can't exceed 8M. Therefore, under the IDE publishing directory, the LIBS directory of the sample project can be deleted directly. Because what this example project can use has been integrated into code. js. Otherwise, it may not upload because it exceeds 4M. This problem will also be optimized in the new version.







After using Wechat to scan the code, we start the small program project. Click the floating window button in the upper right corner to open the debugging and performance monitoring panel.

![img](img/10.png)

After opening the debugging and performance monitoring panel of the real machine, the following figure is shown.

![img](img/11.png) 




So far, a complete small game development process is over. Is it simple? The small game project developed by LayaAirIDE is basically seamless for the Weixin small game project.