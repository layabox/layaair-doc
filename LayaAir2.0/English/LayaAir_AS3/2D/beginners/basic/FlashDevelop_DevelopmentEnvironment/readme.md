#Configuration of Flash Develop Development Environment

###Step 1: LayaAir Engine Download

####1.1 Engine Download

With LayaAirIDE development, downloading LayaAirIDE will bring its own engine package. If developers use third-party tools to develop, they need to download the engine first. In the home page of the official website or the developer center menu, there is a link entry for engine download. After opening the link, there will be a list of downloads for each version of the engine. Each version provides AS3, TS, JS three development languages. Select the corresponding development language packages and download them to the official website.

####1.2 Engine Pack Directory Structure

Since this article describes the Flash Development development environment, we download the AS3 version of the engine package. After downloading and decompressing, you can see the directory structure of AS3 version as follows:

​![图片1.jpg](img/1.png)<br/>

Map (1)

- "jslibs" and "libs" are engine code directories in which LayaAir engine library code is located.

- "laya.js.exe" is an AS3 code compiler under Windows system, which is used to compile AS3 code into JS code.

- "Layajs" is the AS3 code compiler under Apple's MAC system, which is used to compile AS3 code into JS code.

​




###Step 2 Install Google Chrome Browser

When AS3 code compilation is executed, Chrome browser is called by default to open the running project, which needs to be installed for project debugging. This step can be skipped for installed.



 



###The third step is to configure the AS3 compilation environment in Flash Development

​**Step one**: open flash development, find the macro in the menu bar and open the edit macro panel.

​![blob.png](img/2.png)<br/>

Map (2)

​**Step two**First click "Add" to add a macro command, then select the macro command just added, change the menu name of the macro command to "LayaCompiler" in the "Label" column, and set the macro menu shortcut key to "Alt + F5" in the "Shortcut" column (shortcut key settings are for reference only, do not conflict with other shortcuts).

​![blob.png](img/3.png)<br/>
Map (3)

​**Step three**On the right side of the Entries bar, click on the (...) operation area and open the String Collection Editor window.

​![blob.png](img/4.png)<br/>
Map (4)

​**Step four**In the String Collection Editor panel, enter macro instructions:


```

SaveAllModified
RunProcessCaptured|D:\layaide2.0\layaairide\resources\app\out\vs\layaEditor\laya\libs\2.0.0beta1\as\layajs.exe;"$(ProjectPath)";iflash=false;quickcompile=true;out=bin/js/bundle.js;subpath=
```


If the compiler does not start Google Browser, add chromerun = false to it.


```

SaveAllModified
RunProcessCaptured|D:\layaide2.0\layaairide\resources\app\out\vs\layaEditor\laya\libs\2.0.0beta1\as\layajs.exe;"$(ProjectPath)";iflash=false;chromerun=false;quickcompile=true;out=bin/js/bundle.js;subpath=
```


​![blob.png](img/5.png)<br/>
Map (5)

**Tips: "D: layaide2.0 layaairide resources app out vs layaEditor laya libs 2.0.0beta1 as laya.js.exe" should be the actual path of laya.js.**




​**Step five**Click to confirm that the macro command "LayaJsCompiler" has been fully configured after completing the macro command configuration. It will take effect immediately. Just click the "Close" button.


  



**So far, the LayaAir engine download, browser download and AS3 compiler configuration under Flash Development environment are over before the project is established. Developers are welcome to continue learning in other chapters.**

