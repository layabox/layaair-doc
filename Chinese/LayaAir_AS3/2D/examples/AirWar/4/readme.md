# 四、游戏UI功能实现



### 编辑页面逻辑时注意事项

​	在上例中，我们直接实例化并显示了IDE编辑器生成的四个页面类。并实现了游戏的界面流程。

​        本节课我们将逐步实现四个页面类的UI功能，以开始页面类GameStartUI.as为例，打开这个类，路径为”...\src\ui\GameStartUI.as“，可以看到下例代码，页面中组件变量定义会生成该类的公共全局变量，所以开始游戏按钮btn_start在gameStart()方法中我们也能直接调进行事件监听。文本框txt_load我们也可以调用用于更新加载进度。

​       那么有的同学会问了，是不是可以直接在这个类里加逻辑代码呢？笔者的回答是：一定不要！！因为当我们在IDE中修改页面再次发布时，会自动覆盖原来生成的类，你写的逻辑代码会全部消失......

 	因此我们在开发逻辑功能的时候需要新建一个它的派生类，在派生类中去编辑代码。笔者初学时在此也上过大当，所以同学们一定引以为戒！:)

```
/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 
	import laya.display.Text;

	//IDE自动创建生成的页面显示类（开始页面）
	public class GameStartUI extends Dialog 
	{
	    //IDE编辑器中设置的进度显示变量定义
		public var txt_load:Text;
		//IDE编辑器中设置的开始游戏按钮变量定义
		public var btn_start:Box;

		//IDE生成的页面布局JSON数据
		public static var uiView:Object ={"type":"Dialog","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"gameUI/bg.jpg","sizeGrid":"4,4,4,4","height":1280}},{"type":"Image","props":{"y":378,"x":179,"skin":"gameUI/logo.png"}},{"type":"Text","props":{"y":587,"x":20,"width":681,"var":"txt_load","text":"游戏资源加载进度","height":29,"fontSize":"30","font":"SimHei","color":"#1c1c1c","align":"center"}},{"type":"Text","props":{"y":1200,"x":20,"width":681,"text":"LayaAir1.7.3引擎教学演示版","height":29,"fontSize":"26","font":"SimHei","color":"#7c7979","bold":true,"align":"center"}},{"type":"Box","props":{"y":960,"x":240,"visible":true,"var":"btn_start"},"child":[{"type":"Button","props":{"y":0,"x":0,"width":240,"visible":true,"stateNum":"2","skin":"gameUI/btn_bg.png","sizeGrid":"20,20,20,20","height":80}},{"type":"Image","props":{"y":19,"x":41,"skin":"gameUI/start.png"}}]}]};
		
		//根据JSON数据创建页面子对象
		override protected function createChildren():void
        {
			View.regComponent("Text",Text);
			super.createChildren();
			createView(uiView);
		}
	}
}
```

​	

### “开始页面”逻辑功能

在src目录下新建一个开始页面类GameStart.as，继承IDE生成的GameStartUI.as。

开始页面中我们主要实现逻辑为：

1.游戏资源加载。使用了Loader.load()中加载完成和加载进度回调方法。加载进度方法中更新UI中进度文本框，完成方法中显示“开始游戏”按钮。
注：如果游戏除开始页面的其他资源较小，进度会很快到100%，因此也可以制作一个假的进度，时间至少1.5秒，符合人眼视觉停留的观察时间。

2.隐藏和显示开始按钮功能。在资源未完成前先隐藏，以免未加载完就点击进入游戏报错；

3.开始页面动画效果。按钮显示时缓动动画出现效果；页面弹出动画效果，Dialog页面有打开和关闭的缓动动画。

在主类中，我们修改类名GameStartUI为GameStart。

因为Dialog页面有打开和关闭动画功能，所以修改Laya.stage.addChild(start)为start.popup()。

在游戏初始化函数中加入start.close()动画关闭方法。


```
    private function gameStart():void
    {
        //实例化开始页面
        start=new GameStart();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog类型才可用
        start.popup();
        //监听开始游戏开始按钮事件,点击后进入游戏中
        start.btn_start.on(Event.MOUSE_UP,this,gameInit)
    }

    /**
    游戏中，游戏初始化
    */
    private function gameInit():void
    {
        //缓动动画关闭效果。IDE中页面为Dialog类型才可用
        start.close();
        ...
```
开始页面移除舞台和消毁，需要在关闭动画结束时再调用，因此还需在GameStart.as中添加一个关闭事件监听与回调方法。

开始界面全部代码：

注：代码中assetArr为游戏资源数组，包括了游戏图集、音乐。因此音乐文件需拷贝至“bin/h5”目录下，否则加载会报错。

```
package
{
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import ui.GameStartUI;
	
	/**
	 * 游戏开始界面
	 */
	public class GameStart extends GameStartUI
	{
		/***游戏资源地址数组***/
		private var assetArr:Array=[{url:"res/atlas/gameRole.atlas"},
									{url:"sound/achievement.mp3", type:Loader.SOUND}, 
									{url:"sound/bullet.mp3", type:Loader.SOUND},
									{url:"sound/game_over.mp3", type:Loader.SOUND},
									{url:"sound/enemy1_die.mp3", type:Loader.SOUND},
									{url:"sound/enemy3_out.mp3", type:Loader.SOUND}
								   ]
		
		/***游戏开始界面***/
		public function GameStart()
		{
			//游戏加载未完成暂时不显示，防止点击出错
			this.btn_start.visible=false;
			//监听界面是否关闭
			this.once(Event.CLOSE,this,onClose);
			
			//加载剩余游戏资源、音乐，加载完成与加载进度回调方法
			Laya.loader.load(assetArr,Handler.create(this,onComplete),Handler.create(this,onProgress))
		}
		
		/**
		 * 游戏资源加载完成
		 */
		private function onComplete():void
		{
			//加载完成
			this.txt_load.text="资源加载完成,开始游戏吧...";
			//游戏开始按钮显示并弹出
			this.btn_start.visible=true;
			//缓动类弹出动画
			Tween.from(this.btn_start,{y:this.btn_start.y+20},1000,Ease.elasticOut);
		}
		
		/**
		 * 游戏资源加载进度
		 * @param loadNum  进度
		 */
		private function onProgress(loadNum:Number):void
		{
			//显示加载进度
			this.txt_load.text="资源加载中，当前进度："+parseInt(loadNum*100)+"%";
		}
		
		/**
		 * 界面关闭
		 */
		private function onClose():void
		{
			//从舞台移除自己
			this.removeSelf();
			//只加载一次，因此直接消毁自己
			this.destroy();
		}
	}
}
```



### “地图页面”逻辑功能

地图页面中的逻辑相对较少，目前我们主要是让背景滚动起来即可。建立一个GameMap.as类，继承于GameBgUI.as。

修改主类Main中GameBgUI类名为GameMap。

以下为GameMap中代码，只有一个方法updateMap()，地图不停向上移动，这个方法需要在游戏主循环中去调用。

```
package
{
	import laya.display.Sprite;
	import ui.GameBgUI;	
	/**
	 游戏背景
	 */	
	public class GameMap extends GameBgUI
	{
		public function GameMap()
		{
		}
		/**
		 游戏背景移动更新
		 */		
		public function updateMap():void
		{
			//地图每帧在y向下移动1像素，根据喜好调整
			this.y+=1;
			//如果背景图到了下面不可见，立即调整位置到上方继续循环
			//游戏舞台高为1280
			if (bg1.y + this.y >= 1280) 
			{ 
				bg1.y -= 1280 * 2;
			}
			if (bg2.y + this.y >= 1280) 
			{
				bg2.y -= 1280 * 2;
			}
		}
	}
}
```
在主类gameInit()方法中加入游戏帧循环事件与回调方法loop()，每帧更新地图，以后写的很多逻辑代码都会在此回调方法中运行。在主循环中调用地图更新方法观察游戏地图是否移动，速度是否合理。

```
			......
			//模拟游戏结束，3秒时间
			Laya.timer.once(3000,this,gameOver);
			//增加游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap();
		}
```



### “游戏中页面"逻辑功能 

建立游戏中页面类GamePlay.as，继承于GamePlayUI.as，修改主类Main中GamePlayUI为GamePlay。

“游戏中”页面主要功能为：

1.游戏暂停，显示暂停页面。在LayaAir引擎中，时间对象是全局的，因此我们可以让游戏时间缩放到0，那么游戏就停止了。包括所有角色动画、背景地图移动、游戏主循环等。

2.游戏继续，暂停页面消失，游戏时间缩放到1，游戏继续。

3.更新游戏数值变化，主角血量，游戏关卡，获得分数。建立一个update()方法更新数据。

   在主类中加入游戏主角血量、关卡、得分全局静态变量（在其他类中也可以修改），并在主类主循环中调用。

```
		/**主角血量***/
		private var hp:int=10;
		/**游戏关卡数***/
		public static var level:int=1;
		/**玩家得分***/
		public static var score:int=0;
		
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			......
```

GamePlay类具体代码如下：

```
package
{
	import laya.events.Event;	
	import ui.GamePlayUI;	
	
	/**
	 * 游戏内UI,血量、积分、等级显示、暂停等
	 * @author CHENZHENG
	 * 
	 */	
	public class GamePlay extends GamePlayUI
	{
		/**
		 * 游戏内UI,血量、积分、等级显示、暂停等
		 */
		public function GamePlay()
		{
			//监听暂停按钮事件
			this.btn_pause.on(Event.MOUSE_DOWN,this,onPause)
			//隐藏暂停提示，也可在IDE中设置为false
			this.gamePause.visible=false;
		}
		
		/**
		 游戏暂停
		 */	
		private function onPause():void
		{
			//显示暂停界面
			this.gamePause.visible=true;
			//暂停界面加点击监听
			this.gamePause.once(Event.MOUSE_DOWN,this,onContinue)
			//时间对象缩放为0就是停止
			Laya.timer.scale=0;
		}
		
		/**
		 游戏继续
		 */	
		private function onContinue():void
		{
			//隐藏暂停界面
			this.gamePause.visible=false;
			//时间对象缩放为1就是正常速度播放
			Laya.timer.scale=1;
		}
		
		/****角色属性UI更新***/
		public function update(hp:int,level:int,score:int):void
		{
			//角色血量更新
			this.txt_hp.text="HP:"+hp;
			//关卡等级更新
			this.txt_level.text="LEVEL:"+level;
			//游戏分数更新
			this.txt_score.text="SCORE:"+score;
		}
	}
}
```



### “结束页面"逻辑功能 

建立结束页面类GameOver.as，继承于GameOverUI.as，修改主类Main中GameOverUI为GameOver。

“游戏结束”页面主要功能为：

1.监听“重新开始"按钮点击事件，在上一课程中我们讲了为页面元素增加动画效果，取名为ani_restart，在这里我们就可以程序调用了。逻辑为点击后播放按钮动画，按钮动画结束后再真正重新开始游戏。

2.监听按钮动效动画完成事件，动画完成后发送重新游戏开始事件给主类中的监听，并重新开始游戏。

3.修改Main类中gameOver()方法。将鼠标监听修改为事件监听。

```
	//重新开始游戏按钮监听,点击后进入游戏中
	over.btn_restart.on(Event.MOUSE_DOWN,this,gameInit);
```
修改为：
```
	//重新开始事件监听,点击后进入游戏中
	over.on("reStart",this,gameInit);
```
GameOver.as类全部代码如下：

```
package
{
	import laya.events.Event;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import ui.GameOverUI;
	/**
	 * 游戏结束界面
	 * @author CHENZHENG
	 */
	public class GameOver extends GameOverUI
	{
		public function GameOver()
		{
			//"重新开始"按钮按下鼠标事件
			this.btn_restart.on(Event.MOUSE_DOWN,this,onRestart);
		}
		/**
		游戏重新开始
		 */		
		private function onRestart():void
		{
			//播放IDE中编辑的按钮动画
			this.ani_restart.play(0,false);
			//监听动画完成事件
			this.ani_restart.once(Event.COMPLETE,this,AniComplete);
		}
		/**
		 按钮动画播放完成
		 */
		private function AniComplete():void
		{
			//发送重新开始事件，在Main类中监听
			this.event("restart")
            //缓动动画关闭效果。IDE中页面为Dialog类型才可用
			start.close();
		}
	}
}
```

在此，我们的页面逻辑代码全部完成，编译运行游戏，看看最终效果吧。



### Main类全部代码

```
package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStart
		/**地图页面***/
		private var map:GameMap
		/**游戏中界面***/
		private var play:GamePlay
		/**游戏结束页面***/
		private var over:GameOver
		
		/**主角血量***/
		private var hp:int=10;
		/**游戏关卡数***/
		private var level:int=1;
		/**玩家得分***/
		private var score:int=0;
		
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
				
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStart();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			start.popup();
			//监听开始游戏开始按钮事件,点击后进入游戏中
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
		}
		
		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			//缓动动画关闭效果。IDE中页面为Dialog才可用
			start.close();
			
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameMap();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();
			
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间
			Laya.timer.once(3000,this,gameOver);
			//游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新
			play.update(hp,level,score)
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
			over||=new GameOver();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
			over.popup();
			//重新开始事件监听,点击后进入游戏中
			over.on("reStart",this,gameInit);
		}
	}
}
```



