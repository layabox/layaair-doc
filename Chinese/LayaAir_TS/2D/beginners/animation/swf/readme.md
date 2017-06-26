# SWF动画在LayaAir引擎中使用

### 1、在LayaAir引擎中使用SWF动画的前提

为了支持Flash页游项目快速移植到HTML5项目中，LayaAir引擎提供了SWF文件的转换工具，将原生的SWF文件转换为LayaAir引擎可识别的格式，但是转换工具**不支持在SWF文件中包含文本、形状渐变、遮罩、代码这样的特殊内容**。如果包括了上述的内容，转换后将无法达到原SWF中的效果或转换失败。



> 如果开发者并不熟悉Flash以及swf动画文件的制作与导出相关知识，不必继续阅读本文，推荐使用LayaAirIDE制作动画。
>



### 2、将SWF动画转换为LayaAir引擎识别的格式

先准备好符合SWF转换规范的动画文件，然后打开LayaAirIDE的设计模式。

选择菜单 `工具` --> `SWF转换` 就可以打开SWF转换工具面板，如图1所示。

![图1](img/1.png) 

（图1）

在新打开的 `SWF转换` 面板中，如动图2所示，拖入符合转换规范SWF动画或文件夹。

![动图2](img/2.gif)  

（动图2）

点击`开始转换`， 如动图3所示。默认会在swf的同级目录生成一个`output`目录，转换成功后会在output目录内生成一个新的swf和图集文件，以及一个图片文件夹（*勾选打包图集的选项后，图片文件夹不用管，非图集模式才会用*）。

![动图2](img/3.gif)   



（动图3）

**Tips**：

- 如果是复杂的swf文件会生成多张位图，因此建议在`开始转换`前确认勾选 `是否打包为图集` 。

- 默认生成在output目录，开发者可以在输入路径栏，点击`更改`改变输出目录。

- 转换工具生成的新swf不可以再次转换。

  ​



### 3、使用转换后的swf动画

#### 3.1 复制转换后的swf资源到项目

在使用swf动画之前，我们先将转换工具生成的`.swf`格式文件和`图集文件`复制到项目的资源目录（*本例为项目根目录下的res/swf/目录*），如动图4所示。

![图4](img/4.gif)  

(动图4)

**Tips**：

- 动图4中的文件夹，按本例中的操作则不用复制，如果没有采用图集方式，会只生成一个swf和一个图片资源文件夹，这时才需要将文件夹复制过去。
- 需要注意的是，LayaAirIDE里不支持文件夹拖动复制，如果复制文件夹，需要打开系统的资源管理器，在系统内复制粘贴。



#### 3.2 了解播放swf动画的API： MovieClip

LayaAir引擎中使用转换后的swf动画，需要使用**MovieClip类**，API说明如图5所示，API链接：[https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip](https://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ani.swf.MovieClip)

![图5](img/5.png) 

（图5）

#### 3.3 用代码实现swf动画的播放

播放swf动画的示例，如下面代码所示：

入口类MovieClipSample.as

```typescript
module LayaDEMO { 
{
  	import MovieClip = Laya.MovieClip;
	
	export class MovieClipSample 
	{
		
		constructor() 
		{
			//初始化舞台
			Laya.init(1334, 750);
			
			//创建一个 MovieClip 实例
			var mc:MovieClip = new MovieClip();
			
			//加载swf资源,load方法的第二个参数不设置为散图模式加载，设置为true是采用图集方式加载。
			mc.load("res/swf/monkey.swf",true);
			
			//添加到舞台
			Laya.stage.addChild(mc);

		}
	}
}
```
