#Configuration of Flash Builder Development Environment

###Step 1: LayaAir Engine Download

####1.1 Engine Download

With LayaAirIDE development, downloading LayaAirIDE will bring its own engine package. Each version provides three development languages: AS3, TS and JS, and chooses the corresponding development language package.

####1.2 Engine Pack Directory Structure

We download the AS3 version of the engine package. After downloading and decompressing, you can see the directory structure of AS3 version as follows:

![图1](img/1.png) <br/>  （图1） 


- "jslibs" and "libs" are engine code directories in which LayaAir engine library code is located.

- "laya.js.exe" is an AS3 code compiler under Windows system, which is used to compile AS3 code into JS code.

- "LayaJSMac" is an AS3 code compiler under Apple MAC system, which is used to compile AS3 code into JS code.

​


###Step 2 Install Google Chrome Browser

When AS3 code compilation is executed, Chrome browser is called by default to open the running project, which needs to be installed for project debugging. Installed can skip this step.



###The third step is to configure the AS3 compilation environment in Flash Builder

​**Step one**Open Flash Builder, find "External Tool Configuration" and open the configuration window.

​![2.jpg](img/2.jpg)<br/>
Figure (2)


​**Step two**In the configuration window, right-click "Program", click "New" and open the new configuration window.

​![3.jpg](img/3.jpg)<br/>
Figure (3)



**Step three**:

First, change the external program name to“`LayaCompiler`"

Then click "Browse File System" to find it.“`laya.js.exe`” Or copy it directly.`laya.js.exe`” Paste the path to the Location input bar.

Finally, type in the "Independent Variables" column`"${project_loc}\.actionScriptProperties;iflash=false;chromerun=true;quickcompile=true;out=bin/js/bundle.js;subpath="`, click "application" to complete the configuration.

If we don't want to start a new Google Browser process every time we compile, create an external program again in the way we just configured it, just change the argument parameter to`"${project_loc}\.actionScriptProperties;iflash=false;chromerun=false;quickcompile=true;out=bin/js/bundle.js;subpath="`Figures 4 and 5 are shown.

![4](img/4.png)< br / > (Figure 4)

![图5](img/5.png)<br/> (Fig. 5)


 



**Tips: "D: layaide 2.0 layaairide resources app out vs layaEditor laya libs 2.0.0beta as laya.js.exe" should be the actual path of laya.js. Under the MAC system is ""userPath" layaairide resources app out vs layaEditor laya libs 2.0.0 beta as LayaJSMac"**



So far, the LayaAir engine download, browser download and AS3 compiler configuration under Flash Builder environment are over before the project is established. Developers are welcome to continue learning in other chapters.