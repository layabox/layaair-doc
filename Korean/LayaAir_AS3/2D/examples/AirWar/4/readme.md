#게임 UI 기능 실현



###페이지 논리 편집 시 주의사항

상례에서는 IDE 편집기가 생성된 네 페이지를 직접 예화하고 있습니다.게임의 인터페이스 프로세스를 이루었다.

이 수업은 네개의 페이지의 UI 기능을 단계적으로 실현할 것입니다. 페이지 종류 GameStartUI.as 를 시작으로 이 종류를 열고 경로를 열기 위해 "...사건 감청.텍스트 상자 txtu load 우리도 업데이트할 수 있습니다.

그렇다면 어떤 동창회는 직접 이 종류에 논리적 코드를 가질 수 있는 것이 아닌가?필자의 대답은 꼭 싫어!!Google은 IDE 에서 페이지를 다시 개정할 때 생성된 종류를 자동으로 덮어 줍니다. 당신이 쓴 논리적 코드가 모두 사라질 수 있기 때문입니다.

따라서 우리는 논리적 기능을 개발할 때 새로운 파생류가 필요해 파생류에서 코드를 편집해야 한다.필자가 초학할 때 이곳에서도 과대당을 했기 때문에 학우들이 반드시 경계로 삼아야 한다.)


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

###'페이지 시작'논리적 기능

src 디렉토리에 페이지 종류 Gamestart.as, IDE 생성을 계승하는 GametUI.as.

시작 페이지에서 우리는 주로 논리를 실현합니다:

1. 게임 자원 가재.Loader.load () 에서 다운로드와 진도 조정 방법을 사용했습니다.진도 방법 중 UI 진도 텍스트 상자를 업데이트, 완료 방법 중 '게임 시작' 단추를 표시합니다.
주: 게임 시작 페이지의 다른 자원이 작다면 진도가 100% 빠르기 때문에 가짜 진도를 만들 수 있다. 시간 최소 1.5초, 사람의 시각에 부합되는 관찰 시간.

2. 숨기고 시작 단추 기능을 표시합니다.자원이 완료되기 전에 미리 숨기고, 다운로드가 끝나지 않으면 게임 오류를 클릭합니다.

3. 페이지 애니메이션 효과를 시작한다.단추를 표시할 때 애니메이션이 나타납니다. 페이지가 애니메이션 효과를 나타내며, Dialog 페이지는 열고 닫는 완화입니다.

주류에서 GameStartui를 개정합니다.

Dialog 페이지에 열기와 애니메이션 닫기 기능이 있기 때문에 Laya.stage.adChild (start.popup) 을 수정합니다.

게임 초기화 함수에 start.close() 애니메이션 폐쇄 방법을 추가합니다.



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

페이지 이동과 소각을 시작하면 애니메이션 종료 시 호출이 필요하기 때문에 Gamestart.a에 이벤트 감청과 재조정 방법을 추가해야 한다.

인터페이스 모든 코드 시작:

주: 코드 중 asetArr는 게임 자원 그룹으로 게임 도집, 음악을 포함한다.따라서 음악 파일은'bin/h5'디렉토리에 복사해야 한다. 그렇지 않으면 게재가 잘못된다.


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




###지도 페이지 논리 기능

지도 페이지의 논리는 상대적으로 적지만, 현재 우리는 주로 배경을 굴리게 하면 된다.GameMap.as 종류를 세워 GameBgui.a에 계승한다.

메인 Main 중 GameBgui에서 GameMap 이름을 수정합니다.

다음은 GameMap 코드 중 하나뿐입니다. updateMap () 지도가 계속 이동하고 있습니다. 이 방법은 게임 주 순환에서 호출해야 합니다.


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

주류 gameInit () 방법에 게임 프레임 순환 사건과 메아리 방법 loop () 각 프레임 업데이트, 앞으로 쓴 많은 논리적 코드들이 이 조정 방법으로 실행됩니다.주순환에서 지도를 업데이트 방법으로 게임 지도가 이동할지 여부를 관찰하고 속도가 합리적인지 여부를 살펴본다.


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




###게임 중 페이지 논리적 기능

게임의 페이지 클래식 GamePlay.as, GamePlayUI.as 를 계승하며 메인 Main 중 GamePlayUI 를 GamePlay 로 변경합니다.

게임 중 '페이지 주요 기능:

1. 게임은 잠시 멈추고 페이지를 표시합니다.Layaiair 엔진에서 시간 대상은 전역에 있기 때문에 게임 시간을 0 으로 줄일 수 있습니다. 그러면 게임은 중단됩니다.모든 캐릭터 애니메이션, 배경지도 이동, 게임주 순환 등을 포함한다.

2. 게임은 계속되고, 페이지가 사라지고, 게임 시간은 1, 게임으로 줄여진다.

3. 게임 수치 변화, 주역 혈량, 게임 카드, 점수 획득.update () 방법 업데이트

주류에 게임의 주역 혈량, 관문, 점수 전역 정적 변수(다른 종류에서도 수정), 주류의 주 순환에서 호출된다.


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


GamePlay 종류 구체적인 코드 다음과 같습니다:


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




###페이지 종료 '논리적 기능

페이지 종료 GameOver.as 를 세우고 GameOverUI.as를 계승하며 메인 마스터 중 GameOverUI GameOver 입니다.

게임 끝 '페이지 주요 기능:

1. “버튼 클릭 이벤트를 다시 시작하고, 지난 과정 중 우리는 페이지 원소로 애니메이션 효과를 늘리며 Niu restart 로 이름을 붙여 여기에 프로그램으로 호출할 수 있다.논리는 클릭 후 재생 버튼 애니메이션 애니메이션 종료 후 다시 게임을 시작한다.

2. 감청 버튼 동영상 완료 사건, 애니메이션 완성 후 다시 게임 시작 이벤트 시작

3. Main 류 중 gamover() 방법을 수정합니다.마우스 감청을 사건 감청으로 수정합니다.


```

	//重新开始游戏按钮监听,点击后进入游戏中
	over.btn_restart.on(Event.MOUSE_DOWN,this,gameInit);
```

변경:

```

	//重新开始事件监听,点击后进入游戏中
	over.on("reStart",this,gameInit);
```

GameOver.as 종류는 다음과 같습니다:


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


여기에서 우리 페이지 논리 코드 모두 완료, 번역 실행 게임, 최종 효과를 보세요.



###Main 종류 모든 코드


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




