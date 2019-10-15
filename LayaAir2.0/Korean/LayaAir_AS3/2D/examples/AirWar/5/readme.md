#게임 주인공 및 조작

###게임 캐릭터 개요

지난 몇 과목에서 우리는 IDE 로 UI 를 만들었고, 게임의 프로세스 관리와 UI 논리 기능을 실현했다.그러나 가장 중요한 역할은 아직 가입하지 않고, 사유 지도도에 따라 분석하는 게임의 진정한 핵심 논리(도 1).이번 수업에서 우리는 게임 주인공의 일부 기능을 실현하여 주인공이 조작할 수 있게 할 것이다.

![思维导图.png](img/1.png)< br / > (그림 1)

이 시간의 제작 아이디어:

1. 기초 캐릭터를 구축하면 초기화 방법을 통해 캐릭터를 분류해 캐릭터 유형에 따라 다른 애니메이션을 방영할 수 있다.
2. 주류에서 실제 주인공을 예화하고 주인공의 통제 방법을 실현하여 주인공을 이동시킨다.
3. 주역 갱신 방법을 세우고 국경 검사로 주인공이 스크린을 옮기지 못하게 했다.




###게임 기초 캐릭터 구성

src 디렉토리 아래에 하나의 캐릭터 종류 Role.as, 계승류 Sprite (laya.display.Sprite) 를 추가합니다.

캐릭터 중에서 우리는 주로 논리를 실현한다:

1. 캐릭터의 기본 속성: 캐릭터 타입 type, 혈량 hp, 스피드 스페이드.

2. 캐릭터 애니메이션 상대 로레애니:애니메이션, 아이디가 편집하는 캐릭터 애니메이션에 사용된다.
주: 캐릭터 도집 자원을 불러오기 시작하는 페이지 논리에서 완성되었기 때문에 IDE 편집 애니메이션 자원 게이메일만 불러야 합니다.

3. 캐릭터 초기화 공공법 init(), 캐릭터 유형, 혈량, 속도 초기화, 캐릭터 분류.

4. 캐릭터 애니메이션 재생 방법 playaction(action:String)은 캐릭터 유형과 애니메이션 상태를 전환할 수 있다.

구체적인 코드 다음과 같습니다:



```

package
{
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	
	/**
	 * @author CHENZHENG
	 * 角色类，飞机、敌人、子弹、道具
	 */	
	public class Role extends Sprite
	{
		/***角色的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
		public var type:String;
		/***角色的血量***/
		public var hp:Number=0; 
		/***角色的速度***/
		private var speed:Number=0;		
		
		/***角色的动画***/
		private var roleAni:Animation;
		/***当前动画动作***/
		private var action:String;
		
		public function Role()
		{
			//实例化动画
			roleAni=new Animation();
			//加载IDE编辑的动画文件
			roleAni.loadAnimation("GameRole.ani");
		}
		
		/**
		 * 角色初始化
		 * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp   血量
		 * @param speed  速度
		 */		
		public function init(type:String,hp:Number,speed:Number):void
		{
			//初始化角色属性
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			//加载动画对象
			this.addChild(roleAni)
			//播放默认飞行动画
			playAction("fly");
		}
		
		/**
		 * 播放动画 
		 * @param action 动画状态："fly"、"hit"、"die"
		 */	
		public function playAction(action:String):void
		{
			this.action=action;
			//播放角色动画,name=角色类型_动画状态，如：hero_fly
			roleAni.play(0,true,this.type+"_"+action);
		} 
		
}
```



우리가 배역을 잘 만들면 주류에서 주인공 비행기를 만들 수 있다.우리는 main 종류에 이하 논리에 가입해야 합니다:

1. 단독 캐릭터층 용기 롤레리어, 모든 캐릭터가 포함돼, 후기 역할 관리를 편리하게 하기 위해 캐릭터 충돌 논리 등이다.물론 게임이 끝날 때 gamover () 방법에서 배역층을 비우고 다음 게임에 준비를 해야 한다.

2. 주인공 전역 변수 hero 만들기, 게임 gammeInit() 방법에서 실제 주인공으로, 캐릭터 층에서 나타난다.

3. 게임라인으로 묶는 방법 gamover()에서 배역을 제거한다.다시 사실화할 때 모든 캐릭터는 모두 제거하고 다음 게임을 위해 준비한다.

코드 참조 다음과 같습니다:


```

		......
		/**角色层容器***/
		private var roleLayer:Sprite;
		/**玩家主角***/
		private var hero:Role;
		......

		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			......
			//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
			roleLayer||=new Sprite();
			Laya.stage.addChild(roleLayer)
				
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();			
			//加载到舞台
			Laya.stage.addChild(play);
						
			//实例化主角(如果已实例化，不需要重新new)
			hero||=new Role()
			//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置
			hero.init("hero",10,0);
			//主角位置修改
			hero.pos(360,800);
			//角色加载到角色层中
			roleLayer.addChild(hero);
			......
		}
		
        /**
		 游戏结束
		 */
		private function gameOver():void
		{
			......
			//清空角色层子对象
			roleLayer.removeChildren(0,roleLayer.numChildren-1);
			//移除角色层
			roleLayer.removeSelf();
			......
		}
		
```




이러한 논리적 코드를 마친 후, 우리는 주인공의 비행기가 스크린에 이미 가재된 것을 발견하고 비행 애니메이션을 방영했다.



###게임 주인공의 조작

앞서 ‘비행기 대전’ 게임 코스에서 손가락이 미끄러져 주인공이 자동으로 손가락을 맞추어 이동한다.이런 조작은 뚜렷한 부족점이 하나 있다. 게이머는 손가락이 굵으면 비행기가 가려져 관찰하기에 불리하다.손가락이 떠나 다른 위치를 만지면 비행기는 순식간에 이동할 수 있고, 상리에 맞지 않는다.

따라서 내 이 수업에서 조작 방식을 손가락으로 바꾸고 비행기는 손가락 아래로 이동하지 않을 것이며 이동 방향과 속도에 따라 자신의 좌표를 변경할 것이다.

주: Layaiair 엔진은 플래쉬 같은 터치 이벤트 (Touchevent) 를 독립시키지 않고 마우스 이벤트 감청 (Mousevent) 의 방식으로 플레이어를 만지작거린다.그것은 여러 가지 터치 속성을 포함한다.

배역 사망 때문에 조종 시간 연장을 위해 주류 gamInit() 방법에서 모의 3초 지연 게임이 끝나면 30초로 수정된다.


```

		//模拟游戏结束，30秒时间
		Laya.timer.once(30000,this,gameOver);
```


다른 논리적 사고는 다음과 같습니다:

1. 두 개의 속성 moveX, movey, 매번 손가락으로 이동하는 것을 기록한 후 위에 있는 터치 위치를 사용합니다.

2. gameInit() 방법에서 무대 마우스를 누르고 마우스 이동, 마우스 이동, 마우스가 감청 사건을 들어올렸다.또한 눌렀을 때 마우스 이동을 감지하고 이동 감청을 제거합니다.물론 게임이 끝나면 무대 감청을 모두 제거해야 한다.

3. 마우스에서 이동하는 방법 onMouseMove()에서 주인공 위치를 업데이트하고 이동하는 위치는 현재 터치 위치로 이전 프레임의 터치를 감지하는 위치입니다.

4. 캐릭터 중 업데이트 방법 update(), 이 방법에서 잠시 주인공의 경계 검사에 가입하여 스크린 밖으로 이동할 수 없게 한다.앞으로 다른 논리가입, 캐릭터 혈량 검사, 적기가 국경 처리를 뛰어넘는 것으로 나타났다.

Main 중 참고 코드 수정:


```

		......
        /**鼠标上一帧x座标** */		
		private var moveX:Number;
		/**鼠标上一帧y座标** */	
		private var moveY:Number;
		
		......
		/**
		 游戏中，游戏初始化
		 */
		private function gameInit():void
		{
			......
			//角色加载到角色层中
			roleLayer.addChild(hero);
			
			//鼠标按下监听
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
			//鼠标抬起监听
			Laya.stage.on(Event.MOUSE_UP,this,onMouseUp);
			......			
		}
		
		/**
		 按下后开始触发移动
		 */	
		private function onMouseDown():void
		{
			//鼠标按下时的位置，用于计算手指移动量
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
			//开始移动监听
			Laya.stage.on(Event.MOUSE_MOVE,this,onMouseMove);
		}
		
		/**
		 主角跟随鼠标移动
		 */	
		private function onMouseMove():void
		{
			//计算角色移动量(上一帧的位置—当前移动到的位置)
			var xx:Number=moveX-Laya.stage.mouseX;
			var yy:Number=moveY-Laya.stage.mouseY;
			//更新移动位置
			hero.x-=xx;
			hero.y-=yy;
			//更新前一帧位置的座标
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
		}
		/**
		 鼠标抬起、关闭移动监听
		 */		
		private function onMouseUp():void
		{
			Laya.stage.off(Event.MOUSE_MOVE,this,onMouseMove) ;
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除所有舞台事件，鼠标操控
			Laya.stage.offAll();
			......
		}
```




###주역 국경 검사 업데이트

편역은 화면에서 손가락이 움직이는 것을 발견할 때 비행기도 움직였으며 손가락 아래로 달려오지 않았다.그러나 새 문제도 등장했다. 주인공의 비행기가 동시적으로 손가락을 맞추지 않았기 때문에 이동한 시간이 지나면 비행기가 스크린에서 날아갈 수 있다.

역할에서 경계 검사 기능을 늘리고, update () 방법, 구체적인 코드:


```

		......
		
		/**
		 * 角色更新,边界检查
		 */		
		public function update():void
		{
        	//主角边界检查
			if(this.type=="hero")
			{
				//需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
				//判断是否左右超出
				if(this.x<roleAni.width/2)
				{
					this.x=roleAni.width/2;
				}
				else if(this.x>720-roleAni.width/2)
				{
					this.x=720-roleAni.width/2;
				}
				//判断是否上下超出
				if(this.y<roleAni.height/2)
				{
					this.y=roleAni.height/2;
				}
				else if(this.y>1280-roleAni.height/2)
				{
					this.y=1280-roleAni.height/2;
				}
			}
		}
		......
```




캐릭터에서 업데이트 방법을 늘린 뒤 메인 마인 주류 루프()에서 주역 update()를 수행하는 방법, 매 프레임마다 초계를 판단하고 있다.


```

		......
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新
			play.update(hp,level,score)
				
			//调用主角更新，边界检查等
			hero.update();
		}

		......
```




여기에서 편집 실행 후, 우리가 필요한 효과는 달성되었습니까?세심한 동창이 발견됐는지, 캐릭터가 경계로 이동할 때, 애니메이션 중심점 밖의 부분이 아니면 스크린 밖을 넘어서게 되었는지, 그렇다면 이것은 무엇일까?우리는 분명히 국경 검사를 할 때 캐릭터 애니메이션의 절반 폭이나 높이를 감수하였으나 운행이 무효했다.

경계 검사소에 trace (# 역할 너비 '+ roleAni.with, roleAni.height) 코드를 입력한 후, F12 단축키를 누르고 디버깅 모드를 열어 컨트롤 콘텐츠의 수출은' 역할 너비: 0 '(그림 2) 를 볼 수 있다.

![思维导图.png](img/2.png)< br / > (그림 2)

7,000프레임 후에도 0,0,0,000, 그렇다면 어떤 원인일까?

애니메이션 가재 후 애니메이션 완성을 하고 애니메이션 대상 사각의 경계를 얻는 방법으로 넓은 속성을 얻을 수 있기 때문이다.그럼 우리가 처리하는 방법은: 캐릭터 종류 초기화 인it() 방법에 배역'애니메이션 방송 완성'감청 사건에 합류하고 재조정 방법을 세워 폭이 높습니다!코드 참조 다음과 같습니다:


```

			......
			
			//加载动画对象
			this.addChild(roleAni)
						
			//监听动画播放完成事件
			roleAni.on(Event.COMPLETE,this,onComplete)
			//播放默认飞行动画
			playAction("fly");

		}
		
		/***动画完成后回调方法***/
		private function onComplete():void
		{
			//如果角色还未有宽，获得角色宽高	
			if(roleAni.width==0)
			{
				//获得动画矩形边界
				var bounds:Rectangle=roleAni.getBounds();
				//角色宽高赋值
				roleAni.size(bounds.width,bounds.height)
			}
		}
		
		......	
```


이상 코드 가입 후 번역 실행, 게임 주인공은 완벽한 제어를 받 고, 더 이상 국경을 넘지 않!

![思维导图.png](img/3.png)< br / > (그림 1)



이 수업 수정 후 모든 코드 다음과 같습니다:

###메인 메이스 코드


```

package {
	
	import laya.display.Sprite;
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
		
		/**角色层容器***/
		private var roleLayer:Sprite;
		/**玩家主角***/
		private var hero:Role;
		
		
		/**鼠标上一帧x座标** */		
		private var moveX:Number;
		/**鼠标上一帧y座标** */	
		private var moveY:Number;
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart));
				
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
			start.btn_start.on(Event.MOUSE_UP,this,gameInit);
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
			
			//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
			roleLayer||=new Sprite();
			Laya.stage.addChild(roleLayer);
				
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();			
			//加载到舞台
			Laya.stage.addChild(play);
						
			//实例化主角(如果已实例化，不需要重新new)
			hero||=new Role();
			//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置
			hero.init("hero",10,0);
			//主角位置修改
			hero.pos(360,800);
			//角色加载到角色层中
			roleLayer.addChild(hero);
			
			//鼠标按下监听
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
			//鼠标抬起监听
			Laya.stage.on(Event.MOUSE_UP,this,onMouseUp);
			
			
			//模拟游戏结束，15秒时间
			Laya.timer.once(15000,this,gameOver);
			//游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		
		/**
		  按下后开始触发移动
		 */	
		private function onMouseDown():void
		{
			//记录鼠标按下时的位置，用于计算鼠标移动量
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
			//
			Laya.stage.on(Event.MOUSE_MOVE,this,onMouseMove);
		}
		
		/**
		 主角跟随鼠标移动
		 */	
		private function onMouseMove():void
		{
			//计算角色移动量
			var xx:Number=moveX-Laya.stage.mouseX;
			var yy:Number=moveY-Laya.stage.mouseY;
			//更新移动位置
			hero.x-=xx;
			hero.y-=yy;
			//更新本帧的移动座标
			moveX=Laya.stage.mouseX;
			moveY=Laya.stage.mouseY;
		}
		/**
		 鼠标抬起、关闭移动监听
		 */		
		private function onMouseUp():void
		{
			Laya.stage.off(Event.MOUSE_MOVE,this,onMouseMove) ;
		}
		
		
		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap();
			//本局游戏数据更新
			play.update(hp,level,score);
				
			//如果主角未死亡，调用主角更新，边界检查
			if(hero.hp>0)
			{
				hero.update();
			}
		}

		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除所有舞台事件，鼠标操控
			Laya.stage.offAll();
			
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//清空角色层子对象
			roleLayer.removeChildren(0,roleLayer.numChildren-1);
			//移除角色层
			roleLayer.removeSelf();
			
			//去除游戏主循环
			Laya.timer.clear(this,loop);
			
			//实例化游戏结束页面
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




###캐릭터 클래식 코드


```

package
{
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Handler;
	
	/**
	 * @author CHENZHENG
	 * 角色类，飞机、敌人、子弹、道具
	 */	
	public class Role extends Sprite
	{
		/***飞机的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
		public var type:String;
		/***飞机的血量***/
		public var hp:Number=0; 
		/***飞机的速度***/
		private var speed:Number=0;		
		
		/***角色的动画资源***/
		private var roleAni:Animation;
		/***当前动画动作***/
		private var action:String;
		
		public function Role()
		{
			//实例化动画
			roleAni=new Animation();
			//加载IDE编辑的动画文件
			roleAni.loadAnimation("GameRole.ani");
		}
		
		/**
		 * 角色初始化
		 * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp   血量
		 * @param speed  速度
		 */		
		public function init(type:String,hp:Number,speed:Number):void
		{
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			//加载动画对象
			this.addChild(roleAni)
			
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onComplete)
			//播放默认飞行动画
			playAction("fly");

		}
		
		/***动画完成后回调方法***/
		private function onComplete():void
		{
			//如果角色还未有宽，获得角色宽高	
			if(roleAni.width==0)
			{
				//获得动画矩形边界
				var bounds:Rectangle=roleAni.getBounds();
				//角色宽高赋值
				roleAni.size(bounds.width,bounds.height)
			}
		}
		
		/**
		 * 播放动画 
		 * @param action 动画状态   "fly"、"hit"、"die"
		 */	
		public function playAction(action:String):void
		{
			this.action=action;
			//播放角色动画,name=角色类型_动画状态，如：hero_fly
			roleAni.play(0,true,this.type+"_"+action);
		} 
		
		/**
		 * 角色更新,边界检查
		 */		
		public function update():void
		{
			//主角边界检查
			if(this.type=="hero")
			{
				//需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
				//判断是否左右超出
				if(this.x<roleAni.width/2)
				{
					this.x=roleAni.width/2;
				}
				else if(this.x>720-roleAni.width/2)
				{
					this.x=720-roleAni.width/2;
				}
				//判断是否上下超出
				if(this.y<roleAni.height/2)
				{
					this.y=roleAni.height/2;
				}
				else if(this.y>1280-roleAni.height/2)
				{
					this.y=1280-roleAni.height/2;
				}
			}
		}
	}
}
```
