#LayaAir project releases Flash version



###I. environmental preparation

1. Download the latest stable version of LayaAirIDE.

Official address:[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27](http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27) 

2. Download the latest Adobe Flex Sdk.

Download address:[https://www.adobe.com/devnet/flex/flex-sdk-download.html](https://www.adobe.com/devnet/flex/flex-sdk-download.html)

3. Download the flash debug player required for debugging.

Download address:[https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe](https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe)



 







###2. Compiling and publishing settings

####2.1 Introduce engine packages and Flash runtime source code

　　**In the project, the ActionScript version 3.0 engine package and flash runtime source code of layaair are introduced.**

LayaAir's AS3 version engine package source address:[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=28](https://github.com/layabox/layaair/tree/master/bin/as/libs/src)

Flash runtime source address:[https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src](https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src)

　　*Note: When introducing package paths here, you need to first introduce LayaAir as version engine packages, and then introduce flash source packages running Flash version.*

####2.2 add glsl2agal.swc to the project

Find the directory of the flash import package and add the library glsl2agal. SWC under the directory to the project.
Address:[https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc](https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc)

####2.3 Set debug to start associated flash debug player version

Flash debug player is currently required to be at least 11.9.

FlashDevelop settings, as shown in Figure 1:

​![图片9.png](img/1.png)<br/>
Figure (1)

Flash Builder settings, as shown in Figure 2:

​![图片10.png](img/2.png)<br/>
Figure (2)

####2.4 Add playerglobal. SWC file (FB environment only)

Many Stage3D-related classes are used in project compilation, which requires more than 11.9`playerglobal.swc`File, this step is only required for the Flash Builder environment. Find the player global. SWC path under the installation directory of FlashBuilder. For reference, use "D: Program Files Adobe Flash Builder 4.7 (64 Bit) sdks 4.6.0 frameworks libs player 12.0". If there is no 11.9 corresponding player. swc, copy the 12.0 directory to 11.9 directory, and add global.swyerc:

​![图片11.png](img/3.png)<br/>
Figure (3)



###3. Publishing Flash Version

Copy the sample example provided by LayaAir into the newly created project, and then create a new document startup class. Let's take Main. as for example.

Main.as sample source code:


```java

package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
   //通过 Window.start 方法将测试例子Animation_Altas发布为Flash
   Window.start(this,Animation_Altas);
  }
 }
}
```




**Be careful:**If you consider publishing this project to H5, you need to add the`/*[IF-FLASH]*/`Compiling macros is intended to ignore such compilation when releasing H5 versions.

When the H5 version needs to be released, the source code is modified as follows:


```java

/*[IF-FLASH]*/package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
  //通过 Window.start 方法将测试例子Animation_Altas发布为Flash
   Window.start(this,Animation_Altas);
  }
 }
}
```




###Notes and common mistakes:

4.1 If a JS library is introduced into the project, the current project cannot be exported to Flash version.

The Flash version released in 4.2 must be 11.9 or higher. Otherwise, it might happen.`Error: Definition flash.display3D:Context3D could not be found.`Equal reporting error

4.3 Occasionally, the number of function call parameters in a project is not consistent with the actual number of parameters. Such as:


```javascript

[Fault] exception, information=ArgumentError: Error #1063: Animation_Altas/createAnimation() 的参数数量不匹配。应该有 0 个，当前为 1 个。
```


This is because flash has more strict restrictions on function calls than JS. We can add parameters like e: * = null where there are multiple parameters.

Where the calling function has fewer prototype parameters than the function, modify the prototype parameters of the function as default parameters, such as P = null.

4.4 (Advanced Functions) If there is a custom Laaya Air GLSL Shader in the project, you need to embed the custom GSLS file into the FlashMain file and initialize these Shaders before Windows. Start, similar to the following code:



```javascript

public class FlashMain extends Sprite {
 [Embed(source = "./display/MutiAni/shader/aniShader.vs", mimeType = "application/octet-stream")]
 public static var anishader_vs:Class;
 [Embed(source = "./display/MutiAni/shader/aniShader.ps", mimeType = "application/octet-stream")]
 public static var anishader_ps:Class;
  
 public function FlashMain() {
  // 加入项目依赖的shader ，第一个字符串参数与 __INCLUDESTR__ 的参数一致，使用扩展Shader必须使用。
  FlashIncludeStr.addExtraShader("shader/aniShader.vs", new anishader_vs);
  FlashIncludeStr.addExtraShader("shader/aniShader.ps", new anishader_ps);
   
  // 项目代码入口
  Window.start(this, Main);
 }
}
```


4.5 When using LayaAir's laya.net.Socket class to use WebSocket, the parameter type in the corresponding message processing callback function must be set to * type, such as:


```javascript

private function onMessage(e:Event=null):void {}
```


It must be amended to read:


```javascript

private function onMessage(e:*=null):void {}
```


Otherwise, type conversion errors will be prompted at run time!

