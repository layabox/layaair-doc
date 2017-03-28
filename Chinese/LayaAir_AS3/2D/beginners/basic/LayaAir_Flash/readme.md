# LayaAir项目发布Flash版本

发布时间：2016-12-29

### 一、环境准备

1.下载LayaAirIDE最新的稳定版本。

官网地址：[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27](http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=27) 

2.下载最新的Adobe Flex Sdk。

下载地址：[https://www.adobe.com/devnet/flex/flex-sdk-download.html](https://www.adobe.com/devnet/flex/flex-sdk-download.html)

3.下载Debug调试所需的flash debug player。

下载地址：[https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe](https://fpdownload.macromedia.com/pub/flashplayer/updaters/22/flashplayer_22_sa_debug.exe)

 

### 二、编译发布设置

测试例子暂时以官网提供的samples为参考。

1.在项目中引入 LayaAir 的 ActionScript3.0 版本引擎包和运行Flash版本的Flash运行源码包里的src目录。
​        LayaAir 的 AS3 版本引擎包源码地址：[http://ldc.layabox.com/index.php?m=content&c=index&a=lists&catid=28](https://github.com/layabox/layaair/tree/master/bin/as/libs/src)
​        Flash 运行库源码地址：[https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src](https://github.com/layabox/layaair/tree/master/bin/as/LayaAirFlash/flash/src)
​        *注意：此处引入包路径时，需要先引入 LayaAir 的 as 版本引擎包，再引入运行Flash版本的 flash源码包。*
​        2.找到flash引入包的目录，把目录下的的库glsl2agal.swc添加到项目。
​        地址：[https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc](https://github.com/layabox/layaair/blob/master/bin/as/LayaAirFlash/flash/glsl2agal.swc)

3.设置debug启动关联的flash debug player版本，目前要求版本为最低11.9以上。

FlashDevelop设置：

​        ![图片9.png](img/1.png)<br/>
​    图（1）

FlashBuilder：

​        ![图片10.png](img/2.png)<br/>
​    图（2）


4.添加playerglobal.swc文件。

项目编译用到了很多 Stage3D 相关的类，需要用 11.9 以上的 playerglobal.swc 文件，此步骤仅 FlashBuilder 需要设置。找到 FlashBuilder 的安装目录下的 playerglobal.swc 路径，这里以“D:\Program Files\Adobe Flash Builder 4.7 (64 Bit)\sdks\4.6.0\frameworks\libs\player\12.0” 做参考，如果你没有 11.9 对应的 playerglobal.swc ，可以复制 12.0 的目录为 11.9 目录，然后添加 playerglobal.swc ：

​        ![图片11.png](img/3.png)<br/>
​    图（3）


### 三、发布Flash版本

 

1.将LayaAir提供的 samples 例子复制到新建立的项目里，然后新建立一个文档启动类，我们这里以Main.as为例：

```javascript
package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
   Window.start(this,Animation_Altas);
  }
 }
}
```

在文档类构造函数里通过 Window.start 方法将测试例子发布为Flash，这里以 Animation_Altas 为例；

**注意**：如果考虑将此项目发布为H5版本，需要在Main类顶部增加上‘/*[IF-FLASH]*/’编译宏，用意就是在发布 H5 版本时忽略此类的编译。代码如下：

```javascript
/*[IF-FLASH]*/package
{
 import flash.display.Sprite;
 import laya.flash.Window;
 public class Main extends Sprite
 {
  public function Main(){
   Window.start(this,Animation_Altas);
  }
 }
}
```

### 四、注意事项与常见错误：

1.如果项目内引入了JS库，则无法输出当前的项目到 Flash 版本。

2.因为用到了部分 Flash 的高版本API，Flash 的输出版本要求最低是11.9。

3.运行项目过程中偶尔会出现项目内函数调用参数数目与实际参数数目不一致的以情形。如：

```javascript
[Fault] exception, information=ArgumentError: Error #1063: Animation_Altas/createAnimation() 的参数数量不匹配。应该有 0 个，当前为 1 个。
```

这是因为 Flash 对函数调用比 JS 有更加严格的限制，我们可以在多参数的地方加入类似于 e:*=null 这样的参数。

在调用函数比函数原型参数少的地方，修改函数的原型参数为默认参数，比如p=null。

4.Error: Definition flash.display3D:Context3D could not be found.

输出目标平台的版本过低，Flash编译器找不到 Stage3D 相关的引入类。确保最低的输出平台为 Flash 11.9。

5. (高级功能) 项目内如果有自定义的 LayaAir GLSL Shader，需要把自定的 GSLS文件 Embed 到 FlashMain 文件内，并在 Window.start 之前初始化这些 Shader，类似于如下的代码：

 

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

6.使用LayaAir的laya.net.Socket类来使用WebSocket时，相应消息处理回调函数内的参数类型必须设置为 * 号类型，如:

```javascript
private function onMessage(e:Event=null):void {}
```

必须修改为:

```javascript
private function onMessage(e:*=null):void {}
```

否则在运行时会提示类型转换错误!

