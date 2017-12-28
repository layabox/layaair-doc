# LayaNative Summary


LayaNative is a complete set of development solutions for the development, test, and release of the LayaAir engine for the mobile terminal App, but not limited to the LayaAir engine.  Based on LayaPlayer as the core runtime, LayaNative uses the reflection mechanism and channel docking solution to provide developers with a second open and channel match on the native App and provide testing tools, packaging tools, building tools for developers, HTML5 project package, released into the native App to facilitate.



##   **LayaNative contains the following content:**


### 1. test tools:

Through the way of simulating browser, input URL to run in the address bar to help developers to quickly see the operating results on the mobile terminal, save a lot of time for repeated packaging test.



### 2. Android Packaging Tools:



Android package tools to help developers quickly generate mobile Android apk installation package (the icon of the APK, the application name, whether to package resources such as developers can freely customize)



### 3. Build tools:



Building tools can help developers to quickly build mobile terminal APP project, and then use the Android Studio、Eclipse、XCode and other development tools->build->run；



### 4. Reflection mechanism:



Through the reflection mechanism, developers can implement the mutual invocation JavaScript and native languages (Android / Java or iOS / Objective-C), and the developers of the reflection mechanism can conveniently extend the applications to two times.



### 5. Channel docking tool (conchMarket):



Channel docking tools are embedded with channels commonly used for docking API, such as: login, sharing, recharge, friendship chain and so on.



### 6. LayaPlayer：



LayaPlayer is the core part of the LayaNative, which is a cross-platform engine based on JavaScript scripting engine + openGLES hardware accelerated rendering. It accelerates the memory and rendering process based on HTML5, WEBGL-based multimedia applications, games and other products to make Its performance is comparable to native Native-APP. LayaPlayer is written in the C++ language, which can be embedded in a browser or operating system and can run independently.  



### 7.LayaNative principle and development process




（1）. The project developed using LayaAir is ready to be released into the app Version (IOS or Android).
（2）. LayaNative will use the core engine LayaPlayer to speed up.
（3）. Developers can use test tools or packaging tools to quickly install on mobile devices for a simple test.
（4）. Finally through the command line or IDE, build ios or android project, compiling and execute.  
（5）. If it needs to be released to all major channels (such as Baidu, 360, AppStore, Google, etc.), it needs to develop through the reflection mechanism for two times, that is, SDK, login, recharge, share and so on. 
（6）. Finally, it is built into app to install, test and publish.

Process shown in Figure 1：

​	![blob.png](img/1.png)
​	Picture（1）


