#四、ゲームUI機能の実現



###ページ論理を編集する際の注意事項

上記の例では、IDEエディタが生成した4つのページクラスを直接的に実例化して表示しました。ゲームのインターフェースフローを実現しました。

本セクションでは、ページタイプのGameStartUID.asを開始するための四つのページのUI機能を段階的に実現します。このクラスを開くと、パスは「…」となります。事件傍受テキストボックスtxtuloadは、ロードの進捗を更新するためにも呼び出すことができます。

この種類のリガの論理コードに直接にいることができますか？筆者の答えは、絶対いらない！IDEでページを修正して再発行すると、元のクラスを自動的に上書きしますので、あなたが書いた論理コードは全部消えてしまいます。

したがって、論理機能を開発するには、その派生クラスを新規に作成し、派生クラスでコードを編集する必要があります。私は初心者の時にここで大きな仕事をしたことがあるので、学生たちはきっと戒めとしています。:


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

###「開始ページ」論理機能

Srcディレクトリの下にスタートページタイプのGameStart.asを新たに作成し、IDEが生成したGameStartUID.asを引き継ぐ。

開始ページの中で私達は主に論理を実現します。

1.ゲームリソースのロード。Loader.load()でのロード完了と読み込み進捗のフィードバック方法を使用しました。ローディング進捗方法では、UI中の進捗テキストボックスを更新し、完了方法では「ゲーム開始」ボタンを表示します。
注：ゲームは開始ページの他の資源が小さい場合を除き、進行度が100%に近くなりますので、虚偽の進捗状況を作ってもいいです。時間は少なくとも1.5秒で、視覚的な観察時間に合わせて。

2.スタートボタン機能を隠して表示します。リソースが完了していない前に隠してください。ロードが完了していない時にクリックしてゲームのエラーに入らないようにします。

3.ページアニメーション効果を開始します。ボタンの表示時に動画の効果を遅くします。ページが動画の効果を上げます。Dialogページには開いたり閉じたりする動画があります。

メインクラスでは、GameStartUIの名前を変えてGameStartとします。

Dialogページはアニメ機能のオンとオフがあるので、Laya.stage.addChildをstart.popsp()に修正します。

ゲーム初期化関数にstart.close()アニメーションのクローズ方法を追加します。



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

開始ページはステージの削除と破棄を行い、アニメーション終了時に呼び出す必要があるため、イベントの傍受とコールバックの方法をGameStart.asに追加する必要があります。

開始画面のすべてのコード:

注：コードの中でasetArはゲームの資源配列で、ゲームの図録、音楽を含みます。したがって、音楽ファイルは「bin/h 5」ディレクトリにコピーしなければなりません。


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




###「地図ページ」論理機能

地図のページの中の論理は比較的に少なくて、現在私達は主に背景を転がし始めます。GameMap.asクラスを確立し、GameBgUID.asに引き継がれます。

メインクラスMainのGameBgUI類の名前を変更するとGameMapとなります。

以下はGameMapのコードで、一つの方法しかないudateMap()地図を上に移動し続けます。この方法はゲームのメインループで呼び出さなければなりません。


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

メインクラスのgameInit()メソッドにゲームフレームサイクルイベントとコールバック方法loop()を追加して、各フレームごとに地図を更新して、後で書く多くの論理コードはこのコールバック方法で実行されます。メインループで地図の更新方法を呼び出してゲーム地図の移動を観察します。速度は合理的ですか？


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




###「ゲーム中のページ」論理機能

ゲーム中のページ型GamePlay.asを確立し、GamePlayUID.asに引き継ぎ、メインクラスMainのGamePlayUIをGamePlayとして修正します。

「ゲーム中」ページの主な機能は以下の通りです。

1.ゲームを一時停止し、一時停止ページを表示します。LayaAirエンジンでは時間の対象は全体的になっていますので、ゲームの時間を0に拡大できます。ゲームは停止します。すべてのキャラクターの動画、背景マップの移動、ゲームのメインループなどが含まれます。

2.ゲームを続けて、ページを一時停止して消えて、ゲームの時間は1に拡大縮小して、ゲームは続けます。

3.ゲームの数値の変化、主人公の血液量、ゲームのレベルを更新して、点数を獲得します。アップデート方法を確立してデータを更新します。

メインクラスにゲームの主役の血量、ステージ、得点の大域静的変数（他のクラスでも変更できます）を追加し、メインループで呼び出します。


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


GamePlayクラスの具体的なコードは以下の通りです。


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




###「終了ページ」論理機能

ページクラスのGameOver.asを確立し、GameOverUID.asに引き継ぎ、メインクラスのMainのGameOverUIをGameOverに変更します。

「ゲーム終了」ページの主な機能は以下の通りです。

1.「ボタンを押してイベントを再起動し、前回の授業でページ要素のためにアニメーション効果を追加するという話をしました。名前はaniture startです。ここでプログラムを呼び出すことができます。をクリックして、ボタンを押してアニメーションを再生します。ボタンを押してアニメーションが終わったら、再びゲームを開始します。

2.モニターボタンを押してアニメーションを完成させ、アニメーションが完成したら、ゲーム開始イベントをメインクラスのモニターに送信し、ゲームを再開します。

3.Main類のgameOver()の方法を修正します。マウスの待ち受けをイベントの傍受に変更します。


```

	//重新开始游戏按钮监听,点击后进入游戏中
	over.btn_restart.on(Event.MOUSE_DOWN,this,gameInit);
```

変更先:

```

	//重新开始事件监听,点击后进入游戏中
	over.on("reStart",this,gameInit);
```

GameOver.as類のすべてのコードは以下の通りです。


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


ここで、私達のページの論理コードは全部完成しました。ゲームをコンパイルして実行します。最終的な効果を見てください。



###Mainクラスのすべてのコード


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




