# Flash Builder IDE configuration

### Step 1: LayaAir Engine Download

#### 1.1 Engine Download

​     If you use LayaAirIDE development, Download LayaAirIDE which include your own engine package. If developers use third party tools, you need to download the engine first. You can get it from the main page of the layabox official website. the link lead you to various versions of the engine from download list, choose among each version of AS3, TS, JS corresponding of your need, and directly click to download.

#### 1.2 Engine package directory structure 

We download the AS3 version pack. After decompressed the download archive, you can see the directory structure of the AS3 version, as shown in the following figure:

![图1](img/1.png) <br/>  (picture 1)

- “LayaAirFlash” directory is the engine code necessary to released Flash version.

- “libs” engine code directory, contain library code in src subdirectory src.

- “laya.js.exe” is the AS3 code compiler for the Windows system, which is used to transcompile AS3 code into JS.

- “LayaJSMac” is the AS3 code compiler for the apple MAC system,  which is used to transcompile AS3 code into JS.

- “playerglobal.swc” is used to replace the AS3 native compiler SDK, removing native API syntax hints, and adding engine API prompts.

- "worker.js" specify the worker.js path, you can use to open WorkerLoader functionaity and decoding pictures, optimize loading part, and others relative view document.

  ​

### Step 2: Install Google Chrome

​    When AS3 code is compiled, Google Chrome browser is called by default to run the project. In order to debugging, you need to install it.



### Step 3 : Configure AS3 compilation environment in Flash Builder

​**    A.** Open Flash Builder, find "external tool configuration" and open the configuration window.

​    ![2.jpg](img/2.jpg)<br/>
​  picture (2)


​**    B.** In the configuration window, right-click the program, click "New", and open the new configuration window.

​    ![3.jpg](img/3.jpg)<br/>
​   picture (3)



**C.**

First modify the external program name for “`LayaCompiler`”。

Then click on the "Browse File System" and find “`laya.js.exe`”, or copy the ”`laya.js.exe`” path directly to the "location" input field.

Finally, in the "argument" column, enter `"${project_loc}\.actionScriptProperties;iflash=false"`, and click "apply" to complete the configuration.

If we don't want to compile at every time  google browser process start,  create an external program according to the configuration with the following parameter `"${project_loc}\.actionScriptProperties;iflash=false;chromerun=false;"` Figures 4 and 5 are shown.。

![4](img/4.png)<br />  picture (4)

![图5](img/5.png) <br/> picture (5)

 

**Tips: “D:\LayaBox\LayaAirAs3_1.7.3_beta\as\laya.js.exe”should be the actual path of laya.js.exe. Under MAC system should be  “D:\LayaBox\LayaAirAs3_1.7.3_beta\as\LayaJSMac”**



At this point, Installation of LayaAir engine, browser, AS3 transcompiler configuration in the Flash Builder environment are complete. Developers are encouraged to continue learning in other chapters.
