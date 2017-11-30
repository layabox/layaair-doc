# LayaBox Build tools
　　The build tool is used to generate the LayaPlayer's mobile terminal App project, equivalent to the App project wizard. It is currently supported by Android (Eclipse project, Android studio project) and iOS (XCode project).

## 1. Operating requirements
#### 1.1 Basic development environment

​	Construction projects must be prepared to develop the environment. For example: building a iOS project needs to be ready for Mac computers and XCode, and Android needs to be ready for Eclipse or Android studio.

## 2. user-oriented
　　Whether to build Android or iOS projects, there must be a corresponding Android or iOS base for App development. If you don't, please learn the basic knowledge first



## 3. Open the App build in LayaAirIDE

In [Layabox Official website](Layabox.com)Download layaAirIDE, open LayaAirIDE -->Tools -->app build, as shown in Figure 1:


![图1](1.jpg)

(Picture 1)


Because the library files needed for building tools are relatively large, they are not directly included in LayaAirIDE. When you first use this tool, you will download the SDK package first.

![](0.gif)  

​  (Picture 2)

**note**

This file is relatively large, so be patient while waiting for download.

Once the download is complete,  then the build dialog box will be popped directly when the "app build"  is later.

## 4. Project build interface parameters

Open the project build interface in LayaAirIDE, as shown in Figure 3:

![2](2.jpg)
(Picture 3)

* platform

   Build the type of generated project, Android Eclipse, Android studio or iOS project. If you need to build a Android project, you can select Android-eclipse or Android-studio (as the Google no longer maintain Eclipse, recommended to choose the Android Studio project, we will remove the support for Eclipse in later editions). If you need to generate the XCode (iOS) project, select the iOS option.


* stand-alone version app：

   If this option is checked, the App packaged for the project is a stand-alone version, otherwise it is an online version. The stand-alone version does not need networking, no corresponding URL, and no URL. But the game resources must be provided, otherwise you can't run after the package.

* project name：

   App's name. It is also the output directory of the build project.

* Package names ：

   Application package name, is not visible in the normal case.  The rule of naming anti domain names is generally used (in favor of resolving and avoiding conflicts with existing APP in the system). 

　　for example : com.layabox.runtime.demo   
　　name format of the package must be xxx.yyy.zzz at least two levels, that isxxx.yyy . Otherwise the packaging will fail.

* Game url：

   If you want to package the application is an online project, you need to provide a startup URL, pointing to a HTML page, the entry of the application. And a project that is generated through LayaAir will output a startup page, usually index.html. When testing, for convenience, the local URL address usually used is tested in browser. When typing Android App, there must be a real webserver address.

   for example：  

　　*LAN address：*  

``` 
    http://10.10.20.19:8888/index.html
```
　　*The actual address:*  
``` 
    http://layaair.ldc.layabox.com/layaplayer/index.html
```

​	**note **

​	LayaPlayer has very limited support for html, from [here](https://github.com/layabox/layaair-doc/tree/master/English/LayaNative/native_index);

* Output path:

   Build the generated App project storage address.

* Resource path：

   Resources are assets such as scripts, pictures, sounds, and so on. For online games, as long as the game's URL can run normally, but the resources can be directly entered into the App package, it can avoid network downloading and accelerate the loading speed of resources. If it is a single game, because no game URL is provided, you must give the resource directory and pack all the required resources into the App.
   
   The resources packaged into App can still be updated through our DCC tools (resource cache management).
   If this time did not set the resource path, after building the project, you can still manually add resources, add method reference [LayaDcc Tool](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。  

   **Note : **  

   　　The disadvantage of packaging resources is to increase the size of the package  

   　　The online game for packaging resources must be DCC at the server side, otherwise the advantage of packaging will be lost and all the resources will still be downloaded. How to play DCC, reference [LayaDcc工具](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。



## 5. use of the built project

To build a good App project, two development and packaging operations can be opened with the corresponding development tools.

- Android-eclipe（android）project can be imported and developed using eclipse software.
- Android-studio（android）project can be imported and developed using android-studio software.
- XCode (IOS) project can be imported and developed using Xcode software. After opening the XCode (IOS) project, you need to select a real IOS device for build. (Note: the real device is the armv7, armv7s, arm64 architecture. If IOS Simulator is used, it is X86 architecture. At present, LayaNative has not yet supported X86 architecture on IOS devices, if it is compiled by simulator, it cannot be passed. (0.9.5 version begins to support emulators)



**Reference resources：**

- [Eclipse set up the Android environment](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/setUpAndroidEnvironment_Eclipse)

- [Android Studio usage and configuration](https://github.com/layabox/layaair-doc/tree/master/English/LayaNative/AndroidStudio_ConfigurationAndApplication)

- [IOS package release App detailed process](https://github.com/layabox/layaair-doc/tree/master/English/LayaNative/packagingReleases_IOS)

  ​

## 6. Manual switch and network edition

Once built, you can switch standalone and web versions by modifying the code directly in the project.

1. Android project 

     Open in the build project MainActivity.java, search for `mPlugin.game_plugin_set_option("localize","false");`  
     Stand-alone version needs to be set to "true", Such as `mPlugin.game_plugin_set_option("localize","true");`  
     If you want to set it to the network version, you'll have to change it to : `mPlugin.game_plugin_set_option("localize","false");`,  And set the correct address ：  
     `mPlugin.game_plugin_set_option("gameUrl", "http://YOUR ADDRESS/index.html");`


2. iOS project

   After the completion of the iOS project construction, Under the project directory resource/scripts/index.js At the end of the script, there is a function to execute the loadUrl, home address will be loaded here. Change the address here will be able to switch stand-alone and online version, Stand-alone version of the address fixed as `http://stand.alone.version/index.html`。

   For example, the beginning is the online version, address: 

    `loadUrl(conch.presetUrl||"http://10.10.20.19:7788/index.html");`   
   To change into stand-alone version, modify this sentence ：  
    `loadUrl(conch.presetUrl||"http://stand.alone.version/index.html");`  
   and conversely. 

   **note**   
   Once you modify the url address, the original packaged resources are invalid. At this time, you need to manually delete the contents of the cache directory and reuse the layadcc to generate the packaging resources. See [《LayaDCC Tool》](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。

## 7. Resource refresh

A good project is built through IDE, if you choose a single version and a package resource version. In resource/cache directory, all the resources of the H5 project (including: scripts, pictures, HTML, sound, etc.) are packed into this directory. 
``android directory： assets/cache/  ``  
``iOS directory：  resource/cache/  ``  

However during the development process h5 project has been changing, in order to avoid rebuild the project every time, in the IDE-1.7.6-Beta version, you can refresh through the command line.

Resource package  version calls the command : ``layanative refreshres -u http://testgame.layabox.com/index.html``    
Stand-alone version calls the command : ``layanative refreshres`` 

***Tips***  
**1. you must build the app project directory, execute the command. The most obvious sign is to be in the navtie.json directory, as shown below: **
![](3.jpg)    

About how to install and use layanative command line, please refer to [layanative Command line tools use](https://ldc.layabox.com/doc/?nav=en-as-5-3-0)


## 8. Other attention issues
　　Android studio build is completed, you need to modify android sdk version number according to their own environment, and now set to 23, you need to modify the file is app/build.gradle.
