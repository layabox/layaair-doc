#Overview of LayaNative






LayaNative是LayaAir引擎针对移动端原生App的开发、测试、发布的一套完整的开发解决方案，但不局限于LayaAir引擎。LayaNative以LayaPlayer为核心运行时的基础上，利用反射机制、渠道对接方案提供开发者在原生App上进行二次开放和渠道对接，并提供测试器、构建工具，为开发者将html5项目打包、发布成原生App提供便利。

**Be careful:**
**LayaNative 2.0-Android, requiring the minimum version of the system to be 4.0**
**LayaNative 2.0-iOS, requiring the minimum version of the system to be 10.0** 



 



##   **LayaNative includes the following:**


###1. Tester:
After downloading and installing the tester, developers can quickly see the running effect on the mobile side by scanning the two-dimensional code of the URL, which saves a lot of time for repeated packaged tests.

  
  



###2. Building tools:
Build tools can help developers quickly build mobile app project projects, and then use Android Studio, Eclipce, XCode and other development tools to open - > build - > run;



###3. Reflection mechanism:
Through the reflection mechanism, developers can realize the interaction between JavaScript and native language (Android/Java or iOS/Objective-C). Through the reflection mechanism, developers can easily extend the application program twice.



###4. ConhMarket:
Channel docking tools include APIs commonly used in channel docking, such as login, sharing, replenishment, friendship chain, etc.



###5. Laya Player:
LayaPlayer is the core part of LayaNative. It is a cross-platform engine based on JavaScript scripting engine + openGLES hardware acceleration rendering. By optimizing the memory and rendering process, it accelerates the performance of multimedia applications, games and other products based on HTML5, WEBGL, and makes them comparable to native Native-APP. LayaPlayer is written in C++ language. It can be embedded in browser or operating system and run independently.



###6. Principle and development process of LayaNative
(1) Projects developed using LayaAir are ready to be released into app versions (ios or android).
(2) LayaNative will use the core engine LayaPlayer for acceleration.
(3) Developers can use testers to quickly install them on mobile devices for simple testing.
(4) Finally, through the command line or IDE, build IOS or Android project, compile and execute.
(5) If it needs to be published to major channels (e.g. Baidu, 360, AppStroe, Google, etc.), it needs to be re-developed through reflection mechanism (i.e. SDK of docking channels, login, recharge, share, etc.).
(6) Finally, build app to install, test and publish.

The flow chart is shown in Figure 1.

​![blob.png](img/1.png)
Figure (1)


