#III. Game UI Process Control

###Overview of game process control

In the previous section, we produced all the visual resources and generated UI display classes. At the beginning of this lesson, we enter the formal game logic code editing. On the one hand, we are familiar with the process and ideas of game development, and on the other hand, we learn the realization of LayaAir UI function.

According to the previous needs analysis, the process of Aircraft Warfare is relatively simple, the beginning of the game - the game is in progress - the role is dead - the end of the game - the beginning of the game - the game is in progress.... So in this lesson, we mainly realize the basic process of the game, but the focus is how to achieve the UI function of the game, which is also a continuation of the previous lesson.

Demonstration Address of Interface Process Effect: (with Links or Two-Dimensional Codes)



###New Game Main Class

Switch IDE to code-based mode, create a new Main class in the SRC folder. First, initialize the LayaAir engine with a resolution of 720*1280 (the same size as the page in IDE). Then load the game resources and start pages as the first step of our game.

Here I recommend using Flash Builder or Flash Develop to write code. LayaAir's support for AS3 is not perfect, and the function of code prompt is weak.

Add the following code to the Main class:


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


The LayaAir engine requires that the required resources be loaded before the program loads the UI page. In the last two lectures, we mentioned that the edited UI resources in IDE will be automatically packaged after they are released. The address of the UI resources generated is "bin/h5/res/atlas/".

After the resource loading is completed, the start page is instantiated in the completed callback function and loaded into the stage. Compile the project, and you can see that the start page is displayed.

But because the size is too large, the browser display is not complete, so we can add screen adaptation under the engine initialization method LAYA. Init() to make the game full screen, and the size is consistent with the browser size. (See API for details of screen adaptation settings)


```

	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```




###Game process control

According to the previous mind map analysis, we first write the overall process control of the game, which can make our development ideas clearer, and if it is a large project, it can also make the work division clearer. Next we will build a basic process cycle system for the game.

First, we add process page global variables, a total of four pages.

Then we use three methods as the main process of the game: game start (), game init (), game over (), responsible for the display and switching of the game process page.

In gameInit () method, because there is no role added for the time being, it is impossible to call gameOver () method with the death of the protagonist, so a time delay is added to simulate the process call.

**Note:**Because gameInit () and gameOver () methods are run repeatedly during the game (in-game-end-game-end-game-end-game....), students can find that maps, game-in-game UIs and game-end UIs are created repeatedly, which results in unnecessary memory overhead.

So we have two ways to solve it:
One is to modify the UI to a singleton mode, so that there is only one instance UI in the game.
The second is to judge whether it has been instantiated. You can use the "|=" operator, if the object has an instance, then use it directly, if not, and then instance it again.
For example: play |= new GamePlayUI (), which is equivalent to play = play | | new GamePlayUI ()

The code is as follows:


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


After the above code is compiled, the basic process of the game runs.

Of course, there are many details are not perfect, such as the start page of the game loading progress update display, the page and buttons have no animation effect, these can be achieved through the page class code itself, the next lesson we will start to write page code logic.

