# 三、游戏UI流程控制

###游戏流程控制概述

​	在前一节课程中，我们制作了所有的可视化资源，并生成了UI的显示类。这节课开始我们进入正式的游戏逻辑代码编辑中，一方面熟悉游戏开发的流程、思路，一方面学习LayaAir UI功能的实现。

​       根据之前的需求分析，《飞机大战》的游戏的流程相对简单，游戏开始—游戏进行中—角色死亡—游戏结束—重新开始—游戏进行中.....因此在本节课中，我们主要实现游戏的基本流程，但重点是如何实现游戏UI功能，这也是上一堂课的的个延续。

界面流程效果演示地址：（加链接或二维码）



### 新建游戏主类

切换IDE到代码基础模式，在src文件夹中新建一个Main类，首先初始化LayaAir引擎，分辨率为720*1280（需与IDE中页面尺寸相同），然后加载游戏资源与开始页面，做为我们游戏的第一步。

这里笔者推荐使用Flash Builder或FlashDevelop进行书写代码，LayaAir对于AS3的支持还不是很完善，代码提示的功能还比较弱。

在Main类中加入以下代码：

```
package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import view.TestView;
	//游戏主类，游戏入口
	public class Main 
	{
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);

			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		/**
		 资源加载完成后，实例并加载游戏开始界面
		 */
		private function gameStart():void
		{
            //实例化开始页面
			var start:GameStartUI=new GameStartUI();
			//将开始页面加载到舞台
			Laya.stage.addChild(start)
		}
	}
}
```

LayaAir引擎要求在程序加载UI页面前，需先对所需资源进行加载完成才会显示。在上两节课中我们说到IDE中编辑的界面资源发布后会自动图集打包，UI资源生成的地址为"bin/h5/res/atlas/"下。

 资源加载完成后，在完成的回调函数中实例化开始页面，并加载到舞台中。编译项目，可以看到开始页面已经显示出来了。

但因尺寸太大，浏览器显示不全，因此我们可以在引擎初始化方法Laya.init()下方加入屏幕适配，让游戏全屏，大小与浏览器大小保持一致。（详细屏幕适配设置请查API）

```
	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```



### 游戏流程控制

根据之前思维导图分析，我们先编写游戏的整体流程控制，可以让我们的开发思路更加清晰，如果是大型项目也可以让工作分工更明确。下面我们就为游戏建立一个基本的流程循环体系。

首先我们添加流程页面全局变量，一共四个页面。

然后我们用三个方法来作为游戏的主要流程：游戏开始gameStart()、游戏中gameInit()、游戏结束gameOver()，负责游戏流程页面的显示与切换。

在gameInit()方法中，因为暂时没有角色加入，无法用主角死亡来调用gameOver()方法，因此加入一个时间延迟来模拟流程调用。

**注：**因为gameInit()与gameOver()方法在游戏过程中会被反复运行（游戏中—游戏结束—游戏中—游戏结束.....），同学们可以发现，地图、游戏中UI及游戏结束UI就会被反复创建，这样就造成不必要的内存开销。

那么我们有两种方法解决：
一是把UI都修改成单例模式，这样在游戏中就只存在一个实例UI。
二是在实例化时判断是否已被实例化。可以用“||=”运算符，如果对象已有实例，那么就直接使用，没有的话再实例出来。
例如：play||=new GamePlayUI()，它等同于play=play||new GamePlayUI()

全部代码如下：

```
package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.GameBgUI;
	import ui.GameOverUI;
	import ui.GamePlayUI;
	import ui.GameStartUI;
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStartUI
		/**地图页面***/
		private var map:GameBgUI
		/**游戏中界面***/
		private var play:GamePlayUI
		/**游戏结束页面***/
		private var over:GameOverUI
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			
			//加载游戏页面资源(如果界面资源太多[图集超过50k],建议开始页面单独建立文件夹打包图集并加载)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStartUI();
			//监听开始游戏开始按钮事件,点击后进入游戏中（IDE中设置的变量定义）
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
			//将开始页面加载到舞台
			Laya.stage.addChild(start);
		}
		
		/**
		 游戏中，游戏初始化，地图、游戏中UI
		 */
		private function gameInit():void
		{
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameBgUI();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlayUI();
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间延迟...
			Laya.timer.once(3000,this,gameOver)
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//实例化游戏结束页面(如果已实例化，不需要重新new)
			over||=new GameOverUI();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//重新开始游戏按钮监听,点击后进入游戏中（IDE中设置的变量定义）
			over.btn_restart.on(Event.MOUSE_UP,this,gameInit);
			//加载到舞台
			Laya.stage.addChild(over)
		}
	}
}
```

以上代码通过编译后，游戏的基本流程全部跑通。

当然，还有很多细节部分并未完善，比如开始页面中游戏加载进度更新显示，页面与按钮未有动画效果，这些都可以通过页面类自身的代码去实现，下一课我们再开始进入页面代码逻辑的编写。

