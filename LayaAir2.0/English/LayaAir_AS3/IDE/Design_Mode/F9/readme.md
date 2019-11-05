# F9！项目设置介绍


> 本篇采用LayaAirIDE 2.0.1 bate 截图，如有不同，请下载最新的LayaAirIDE，以最新版本IDE为准。

##Summary

F9 is the most common and indispensable function of LayaIDE. Developers familiar with Laya know the importance of F9, which has been well known by developers since 1.0. It is impossible to use F9 in 2.0 engines. However, many developers who have just come into contact with Laya do not understand the functions of F9, so this article will introduce them to you. (You can ignore this passage if you are familiar with it.)





###Preview settings

The first page of the project settings is the preview settings, where the main settings are the start scenario (the program starts the first loading scenario, choosing the current scenario is where the editor's last focus is), and other settings. This settings will affect the automatic generation class GameConfig of IDE. Manual modification of this class is invalid and can only be set in IDE.

![] (img/1.png)



GameConfig is shown below:

![] (img/7.png)

The corresponding start current scenario code. In the main class, developers can also not use the default start settings according to their own needs. ![] (img/8.png)



###Class Library Settings

In order to reduce the size of the code package, developers can only introduce the class libraries used, and the functions that are not used need not occupy the size of the code package.

Class library setup is a very common function. In the case of checking Webgl library, engine initialization is webgl mode, and vice versa, canvas mode.

Other class libraries can be chosen according to actual needs. If the class library is not checked but the class library function is used, an error will be reported.



![] (img/2.png)



###3. Scene Settings

In order to reduce the size of the code package of the game, the IDE uniformly defaults to file mode.

The differences between the four models are as follows:


 **Embedded Mode**: the embedded mode will generate a scene class code file from the UI content of the editor. The code script contains the UI scene information created by the IDE. When the mini game and light game have not come out yet, it is unnecessary to consider the size of JS. It is the most commonly used option for normal development of H5, and it does not involve the asynchronous loading and opening of the page.

**Loading mode**Loading mode also generates scene classes, other UI data information will be placed in a ui.json, which needs to be loaded when using. Similarly, this JSON is not often used in the era of no small games. Scene information can not be in js, which can save the size of JS package and more space for 4m package of small games. When used, it can be loaded as a resource.

**Separation mode**Separation mode is based on loading mode. It also generates scene class, but it generates a separate scene data file for each scene. It loads scene file individually each time, which is different from loading mode, which loads all scenarios at one time. After 2.0, the development of small games or light games, in order to reduce the size of the main package and improve the loading speed are commonly used mode.

**File mode**File mode is unique to 2.0. It is created for the development of small games. It does not generate scene classes, that is to say, it can further reduce the size of JS packages. It is loaded in Scene. load mode. The biggest difference between the first three modes is that file mode can not directly call variables in the scene, and it needs getchild to get them and then operate. Variables are declared in the first three scenario classes, and code prompts allow you to manipulate internal variables directly.



#####It should be noted that when choosing JS language development, there is no difference between separate mode and file mode, and there is no scene class.



! [] (IMG / 3. PNG)



###IV. Atlas Setting

Atlas settings can set rules for automatically packaging atlases, and catalogues are best left unchanged.

! [] (IMG / 4. PNG)



###Editorial settings

As shown in the figure, this is not introduced too much.

![] (img/5.png)