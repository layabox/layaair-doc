# 3. Game UI process control

### Game Process Control Overview

​	In the previous section, we made all the visualizations and generated UI's display classes. At the beginning of this lesson, we entered the formal game logic code editing. On the one hand, we were familiar with the game development process and train of thought. On the one hand, we learned the realization of LayaAir UI function.

​       According to the previous needs analysis,  the process of  《Aircraft war》 is relatively simple. The game starts -- the game is going on -- the character death -- the end of the game -- the restart. .. So in this lesson, we mainly implement the basic process of the game, but the focus is on how to implement the game UI function, which is also a continuation of the last lesson.

Interface process effects demo address: (plus links or two-dimensional code)



### New game main class

Switch IDE to code base mode, create a Main class in the src folder, first initialize the LayaAir engine, a resolution of 720 * 1280(the page size in IDE is the same) and then the game resources and the start page are loaded to be the first step of our game.

Here, I recommend using Flash Builder or FlashDevelop to write code, LayaAir's support for AS3 is not perfect, and the function of code prompt is relatively weak.

Add the following code in the Main class:

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

The LayaAir engine requires that the program should be loaded before loading the UI page before the program is loaded. In the last two lessons, we said that the editor's interface resources in IDE will be packaged automatically after the publication of the interface resources, and the UI resource is generated under the "bin/h5/res/atlas/" directory.

 After the resource load is complete, instantiate the start page in the completed callback function and load it into the Stage. Compile the project, you can see the start page has been displayed.

However, due to the size is too large, the browser is not displayed, so we can add a screen adaptation below the engine initialization method Laya.init (), so that the game full screen, size and browser size consistent. (Detailed screen adaptation settings check API)

```
	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```



### Game process control

According to the previous mind map analysis, we first write the whole process control of the game, which can make our development ideas clearer. If it's a large project, it can also make the division of work more clear. Here we build a basic flow cycle system for the game.

First, we add the process page global variable, a total of four pages.

Then we use the three way as the main process of the game: the game starts gameStart (), the game gameInit (), the game ends gameOver (), is responsible for the game process page display and the handover.

In the gameInit () method, because the temporary role is not added, the gameOver () method cannot be invoked by the death of the leading actor, so a time delay is added to simulate the process call.

**Note：** Because the gameInit () and gameOver () methods are repeatedly executed during the game (in game - end of game - in game - end of game .....), students can find that the map, in-game UI, and game over UI It will be repeatedly created, resulting in unnecessary memory overhead.

So we have two ways to solve it:
One is to modify the UI into a single example, so that only one instance, UI, is present in the game.
The two is whether it is instantiated when it is instantiated. You can use “||=”operator, if the object has an example, then used directly, then no instance out.
For example: play||=new GamePlayUI(), which is equivalent to play=play||new GamePlayUI()

The whole code is as follows：

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

After the code is compiled, the basic process of the game is all run through.

Of course, there are a lot of details is not perfect, such as the beginning of the page loading progress game updates page button and no animation, which can be realized by the page class code, written in the next lesson we'll begin to enter the page code logic.

