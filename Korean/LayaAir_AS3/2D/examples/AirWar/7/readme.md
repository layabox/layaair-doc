#일곱, 주역 사격과 낙락 도구



‘비행기 대전’ 게임은 이미 대부분 완성되었다.사격 게임에 있어서 사격탄은 적을 격파하고 도구를 빼앗는 것이 게임의 핵심 장난이다.이 수업을 우리는 주로 이 두 개의 핵심 기능을 실현한다.



###주역 사격 으로 주인공 을 독살시켰다

예전 교정에서 우리는 사격을 주류 Main 에 넣었지만, 주류에서는 주로 논리적이고, 코드가 많고, 사격은 캐릭터의 한 행위이기 때문에 이 례에서 사격법을 캐릭터 Role 류에 방치했다.

Role 류에서 사격 간격 시간 shootInterval 과 다음 사격 시간 shootTime 속성, 캐릭터는 총알 유형 isBullet 속성 여부.그리고 새 방법 shoot()

사격법에서 사격간격으로 총탄을 생성하고 총알 대상도 역할 대상이고, 구별은 비행 상태만 있고, 부상 사망 상태는 없다.

####사격법 만들기


```

		......
		/***射击间隔***/
		public var shootInterval: Number= 300;
		/***下次射击时间***/
		public var shootTime: Number= 300;
		......
		/**
		 角色射击，生成子弹
		 */		
		public function shoot():void
		{
			//获取当前时间
			var time:Number = Browser.now() ;
			//如果当前时间大于下次射击时间
			if (time >this.shootTime)
			{
				//更新下次子弹射击的时间
				this.shootTime = time + this.shootInterval ; 
				//从对象池里面创建一颗子弹
				var bullet: Role = Pool.getItemByClass("role",Role);
				//初始化子弹信息
				//子弹阵营与发射者相同
				bullet.init("bullet2",1,-10,1,this.camp)
				//角色类型为子弹类型
				bullet.isBullet = true;
				//对象池中对象死亡时会被隐藏，重新显示
				bullet.visible=true;
				//设置子弹发射初始化位置
				bullet.pos(this.x, this.y-80);
				//添加到角色层中
				this.parent.addChild(bullet);
			}
		}
```




####혈액 제거 방법 을 수정 하다

총알이 사망 애니메이션이 없기 때문에 총알에 적기를 격파한 후, 게이머가 적분을 늘려야 한다.따라서 lostHp () 방법 중 코드 수정을 합니다.

/ *
* 배역 실혈
*
public function lostHp (lostHp:Number): void
{
감혈
this.hp -=lostHp;
/혈량에 따라 판단하다
if (this.hp > 0)
{
/ 죽지 않았다면, 공격 애니메이션
this.playaction('hit')
} else
{
/ 죽으면 폭발 애니메이션
총알 사망
if (this.is Bullet)
{
/ update () 방법 중 숨은 뒤 회수
this.visible = false;
} else
{
사망 애니메이션 추가
this.playaction('die')
/ 피사망자를 부딪치면 캐릭터와 총알이 아니다
if (this.type! = "hero"&&&this.is.is Bullet)
{
게임 포인트 추가
Main.score + +;
}
}
}
}
상술한 코드를 완성한 후, 특히 주의를 기울여, 캐릭터 종류 초기화 init() 방법 중 반드시 다시 가입해야 한다**isBullet = false**그렇지 않으면 대상지에서 만든 대상자가 사망애니메이션을 틀지 않을 수 있다. 이들의 아이슬블릿은 트루엘이 될 수도 있다.

####주류 주 순환 수정

Main 류의 주순환로op()에서 주역 사격 방법에 합류하고 코드를 수정하여 캐릭터가 사망한 후 사격을 하지 않는다.


```

		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//本局游戏数据更新
			play.update(hero.hp,level,score)
			//如果主角死亡
			if(hero.hp<=0)
			{
				//玩家飞机死亡后延迟时间，100帧后弹出游戏结束界面
				this.deathTime++
				if (this.deathTime>=100)
				{
					this.deathTime=0;
					//游戏结束
					gameOver();
					//本方法内后续逻辑不执行
					return;
				}
			}else
			{
				//主角未死亡将持续射击
				hero.shoot();
			}
		    ......
```


모든 코드를 수정하고 총알이 창건된 것을 보고 발사됩니다!그리고 총알은 적과 충돌한 후 적을 다치거나 격파시켰다.동시에 UI 중적 점수도 증가한다.

![思维导图.png](img/1.png)< br / > (그림 1)

#### 

###게임 도구 떨어뜨리고 도구 먹기

틈새는 비행기가 폭발한 후, 우리는 몇몇 적의 기회가 소품에 떨어질 수 있다.우리 미술 자원 중 두 가지 도구 를 설치 한 일종 의 총알 등급 이 충분 한 뒤 동시에 총알 을 동시 해 두 알 의 총알 을 추가 혈량 을 설치 했 다.

####도구 생성 방법 만들기

Role 류에서 lostProp() 만드는 방법은 enemy 3의 적기만이 소품에 빠질 수 있으며 도구도 하나의 캐릭터로, 도구를 생성 도구와 다른 캐릭터를 생성하는 방법과 같다.


```

		
		/**角色死亡掉落物品**/
		private function lostProp():void
		{
			//只有boss才能掉落道具
			if(this.type!="enemy3") return;
			//从对象池里面创建一个道具
			var prop:Role =Pool.getItemByClass("role",Role);
			
			//生成随机道具类型
			var r:Number=Math.random();
			var num:int=(r<0.7)?1:2;
			
			//重新初始化道具属性,阵营为敌方（能与主角发生碰撞）
			prop.init("ufo"+num,1,2,30,1);
			//强制显示
			prop.visible=true;
			//生成的位置为死亡者位置
			prop.pos(this.x,this.y);
			//加载到父容器
			this.parent.addChild(prop);
		}
```


####애니메이션 완성 '의 반전 방법 을 수정 하다

캐릭터가 사망 애니메이션을 방영한 후, lostProp () 방법을 호출할 수 있기 때문에 Role 종류에서 onComplete () 방법을 수정합니다.

/***애니메이션 완료 후 반전 방법***
private function onComplete ():void
{
/ 배역 이 아직 넓지 않았다면 역할 이 넓다
if (roleAni.width = 0)
{
/ 애니메이션 사각형 경계를 획득하다
var bounds: Rectangle = roleAni.getBounds();
/ 역할 폭 고부가치
roleAni.size (bounds.width, bounds.height)
}
사망 애니메이션 재생 완료
if (this.action = "die")
{
/ update () 방법 중 숨은 뒤 회수
this.visible = false;
/ 사망 후 아이템
this.lostprop();
}
...


번역 실행, 우리는 보스 적기(enemy 3)를 격파하기 위해 도구가 나타났다!하지만 소품이 다른 진영이기 때문에 총탄에 의해 파괴될 수 있다는 점을 발견했다. 또한 주역과 소품의 충돌이 일어나면 서로 피가 떨어질 수도 있다.

![思维导图.png](img/1.png)< br / > (그림 1)



####캐릭터 만들기 도구 먹는 법.

발생한 문제를 해결하기 위해 탄약을 먹은 후 탄환이 업그레이드 기능이 있다.

우리는 Role 류에서 도구 유형, 탄기 등급, 동시에 사격의 총탄 수, 총탄의 위치 이동 속성을 추가해야 한다.

도구를 먹는 방법 eatProp (), 그리고 Main 류의 주순환에서 비행기와 도구의 충돌 판단을 받게 된다.


```

		/***道具类型 0:飞机或子弹，1:子弹箱，2:血瓶***/
		public var propType:int=0;
		/***子弹级别（吃子弹道具后升级）***/
		public var bulletLevel: Number = 0;
		/***同时射击子弹数量***/
		public var shootNum: Number= 1;
		/***子弹偏移的位置***/
		private var bulletPos: Array = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
		......
		
		/**
		 * 角色吃到道具，加血或子弹
		 */		
		public function eatProp(prop:Role):void
		{
			//如果调用者不是主角或prop不是道具，则返回
			if(this.type!="hero"||prop.propType==0) return;
				
			//吃子弹箱
			if(prop.propType==1) 
			{
				//积分增加
				Main.score++;
				//子弹级别增加
				this.bulletLevel++
                //子弹每升2级，子弹数量增加1，最大数量限制在4个
                this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
				//子弹级别越高，发射频率越快
				this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
			}
			else if(prop.propType==2)//吃血
			{
				//血量增加
				this.hp+=2;
                //积分增加
				Main.score+=1;
			}
			//道具死亡
			prop.hp=0；
			//道具吃完后消失，下一帧回收
			prop.visible=false;
		}
			......
```


도구를 만들 때 도구 속성 proptype, lostProp () 방법을 수정합니다.


```

		/**角色死亡掉落物品**/
		private function lostProp():void
		{
			if(this.type!="enemy2") return;
			//从对象池里面创建一个道具
			var prop:Role =Pool.getItemByClass("role",Role);
			
			//生成随机道具类型
			var r:Number=Math.random();
			var num:int=(r<0.7)?1:2;
			
			//重新初始化道具属性,阵营为敌方（只与主角发生碰撞）
			prop.init("ufo"+num,1,2,30,1);
			//道具类型
			prop.propType=num;
			......
```


Role 종류 init () 방법을 수정하고 초기화 시 도구 속성을 0 으로 사용합니다.


```

		/**
		 * 角色初始化
		 * @param type  角色类型：“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp      血量
		 * @param speed   速度
		 * @param hitRadius   碰撞半径
		 * @param camp    阵营
		 */		
		public function init(type:String,hp:Number,speed:Number,hitRadius:Number,camp:Number):void
		{
			......
			//对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
			this.isBullet=false;
			
			//道具属性初始为0
			this.propType=0;
			......
```


이상 코드를 수정한 후, 우리는 주류 Main 중에서 충돌 판단을 할 수 있다.



####캐릭터와 아이템 충돌 판단

맨류의 주순환에서 충돌 코드를 수정한 후 운행하면 도구를 먹을 수 있다는 것을 발견했다.


```

			//游戏碰撞逻辑
			//遍历所有飞机，更改飞机状态
			for (var i: int = roleLayer.numChildren - 1; i > -1; i--) 
			{
				//获取第一个角色
				var role:Role = roleLayer.getChildAt(i) as Role;
				//角色自身更新
				role.update();				
				//如果角色死亡，下一循环
				if(role.hp<=0) continue;
				//碰撞检测
				for(var j:int=i-1;j>-1;j--)
				{	//获取第二个角色
					var role1:Role=roleLayer.getChildAt(j) as Role;
					//如果role1未死亡且不同阵营
					if(role1.hp>0&&role1.camp!=role.camp)
					{
						//获取碰撞半径
						var hitRadius:int=role.hitRadius+role1.hitRadius;
						//碰撞检测
						if(Math.abs(role.x-role1.x)<hitRadius&&Math.abs(role.y-role1.y)<hitRadius)
						{
							//如果某一个碰撞体是道具，则吃道具，否则掉血
							if(role.propType!=0||role1.propType!=0)
							{
								//无法判断哪个是道具，因此都相互吃吃试一试
								role.eatProp(role1);
								role1.eatProp(role);
							}else
							{
								//角色相互掉血
								role.lostHp(1);
								role1.lostHp(1);
							}
					}
				}
			}
```




####소품 을 먹고 탄환 을 업그레이드 하다

Role 종류에서 총탄을 발사하는 방법 shoot () 수정 도구를 먹은 후 총탄급이 증가하고 총탄수를 발사하면 코드 다음과 같다


```

		/**
		 角色射击，生成子弹
		 */		
		public function shoot():void
		{
			//获取当前时间
			var time:Number = Browser.now() ;
			//如果当前时间大于下次射击时间
			if (time >this.shootTime)
			{
				//获得发射子弹的位置数组
				var pos:Array=bulletPos[this.shootNum-1]
				for(var i:int=0;i<pos.length;i++)
				{
					//更新下次子弹射击的时间
					this.shootTime = time + this.shootInterval ; 
					//从对象池里面创建一个子弹
					var bullet: Role = Pool.getItemByClass("role",Role);
					//初始化子弹信息
					bullet.init("bullet2",1,-10,1,this.camp)
					//角色类型为子弹类型
					bullet.isBullet = true;
					//子弹消失后会不显示，重新显示
					bullet.visible=true;
					//设置子弹发射初始化位置
					bullet.pos(this.x+pos[i], this.y-80);
					//添加到角色层
					this.parent.addChild(bullet);
				}
			}
		}
```


번역 운행 게임, 두 세 개의 열쇠 상자 도구 완료 후, 탄알 급이 상승, 또 또 다른 총알 (도 2)을 동시에 발사, 공격력 폭발!

![思维导图.png](img/2.png)< br / > (그림 2)



###대상지의 사용 주의사항

레이어로 게임 개발, 대상 지폴 창건과 회수 메커니즘이 불가피하게 되면 대상을 축소할 수 있다.특히 ‘비행기 대전’과 같은 사격 게임은 대량의 총알, 항공기, 빠른 속도로 소멸하면 대상지를 더 필요로 한다.

초보자에게는 인식이 잘 되지 않으면 프로그램 버그가 생기기 쉬울 뿐만 아니라 디버그 해결 문제를 찾기 어렵다.사용할 때 다음 몇 시에 주의하십시오:

1. 대상자에 저장된 것은 회수 대상의 인용이다.만약 당신의 전역에 대한 실례가 회수된 후, 예를 들어 비행기대전 중의 주인공 hero 가 사망 대상지에 의해 회수된 후, 새로운 대상자에게 사용될 수도 있고, 총알이 한 발일 수도 있어 적기일 수도 있다.그 속성이 바뀌었다면, 주인공인 헤로도 수정될 것이다.게임에 이름 없는 버그 가 나타날 수 있기 때문에 전체 대상자가 대상에 회수되지 않기를 권장한다.

2. 대상자에 따라 창립된 대상은 속성이 다시 개시되어야 한다.예를 들어 항공기 대전의 적기와 총알이 사망할 때, 그들의 vible은 false, 총알의 isBullet true, 적기 역할의 isBullet false 가 필요하다.새 개체를 새로 만들 때, 수정된 속성을 다시 초기화하고 수정을 잊어버리면 논리적 부분에 사용되면 문제가 생길 수 있다.

예를 들어 캐릭터가 사망 애니메이션 재생 여부를 판단할 때 아이슬블릿으로 판단하면 적기라면 사망애니메이션이 방영된다.그러나 총알을 회수대상으로 만든 적기라면 이때 isBullet true, isBullet 가 초기화되지 않았다면 총알이라고 착각돼 죽음의 애니메이션을 방송하지 않을 것이다.

물론, 또 하나의 방식은 회수할 때, 표식 분류를 진행하고, 총알과 비행기를 분류하고, 몇 줄 코드 많이 써서 논리적 허점을 피하는 것이다.



수정 후 Main 류와 Role 코드 전부코드를 모두 보여 드리겠습니다.

###메인 메이스 코드


```

 package {
	
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.utils.Pool;
	import laya.utils.Stat;
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
		
		/**游戏关卡数***/
		public static var level:int=1;
		/**玩家得分***/
		public static var score:int=0;
		
		/**角色层容器***/
		private var roleLayer:Sprite;
		/**玩家主角***/
		private var hero:Role;
		
		
		/**鼠标上一帧x座标** */		
		private var moveX:Number;
		/**鼠标上一帧y座标** */	
		private var moveY:Number;
		
		
		/****敌机血量表****/
		private var hps: Array = [1, 7, 15];
		/***敌机生成数量表**/
		private var nums:Array = [2, 1, 1];
		/***敌机速度表***/
		private var speeds: Array = [3, 2, 1];
		/***敌机被击半径表***/
		private var radius: Array = [20, 35, 80];
		
		/****主角死亡后游戏结束时间***/
		private var deathTime:int=0
		
		
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
			
			
			//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
			roleLayer||=new Sprite();
			Laya.stage.addChild(roleLayer);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlay();			
			//加载到舞台
			Laya.stage.addChild(play);
			
			//实例化主角(如果已实例化，不需要重新new)
			hero||=new Role();
			//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置,阵营为0
			hero.init("hero",10,0,30,0);
			//死亡后会隐藏，重新开始后需显示
			hero.visible=true;
			//主角位置修改
			hero.pos(360,800);
			//角色加载到角色层中
			roleLayer.addChild(hero);
			
			//鼠标按下监听
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
			//鼠标抬起监听
			Laya.stage.on(Event.MOUSE_UP,this,onMouseUp);
			
			
			//模拟游戏结束，30秒时间
//			Laya.timer.once(30000,this,gameOver);
			//游戏主循环
			Laya.timer.frameLoop(1,this,loop);
		}
		
		/**
		 点击开始触发移动
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
			//本局游戏数据更新
			play.update(hero.hp,level,score)
			//如果主角死亡
			if(hero.hp<=0)
			{
				//玩家飞机死亡后延迟时间，100帧后弹出游戏结束界面
				this.deathTime++
				if (this.deathTime>=100)
				{
					this.deathTime=0;
					//游戏结束
					gameOver();
					//本方法内后续逻辑不执行
					return;
				}
			}else
			{
				//主角未死亡将持续射击
				hero.shoot();
			}

			//地图滚动更新
			map.updateMap()
				
			//游戏碰撞逻辑
			//遍历所有飞机，更改飞机状态
			for (var i: int = roleLayer.numChildren - 1; i > -1; i--) 
			{
				//获取第一个角色
				var role:Role = roleLayer.getChildAt(i) as Role;
				//角色自身更新
				role.update();				
				//如果角色死亡，下一循环
				if(role.hp<=0) continue;
				//碰撞检测
				for(var j:int=i-1;j>-1;j--)
				{	//获取第二个角色
					var role1:Role=roleLayer.getChildAt(j) as Role;
					//如果role1未死亡且不同阵营
					if(role1.hp>0&&role1.camp!=role.camp)
					{
						//获取碰撞半径
						var hitRadius:int=role.hitRadius+role1.hitRadius;
						//碰撞检测
						if(Math.abs(role.x-role1.x)<hitRadius&&Math.abs(role.y-role1.y)<hitRadius)
						{
							//如果某一个碰撞体是道具，则吃道具，否则掉血
							if(role.propType!=0||role1.propType!=0)
							{
								//无法判断哪个是道具，因此都相互吃试试
								role.eatProp(role1);
								role1.eatProp(role);
							}else
							{
								//角色相互掉血
								role.lostHp(1);
								role1.lostHp(1);
							}
						}
					}
				}
			}
			
			//创建敌机,不同类型飞机创建的间隔时间不一样
			//生成小敌机
			if (Laya.timer.currFrame % 80== 0)
			{
				createEnemy(0, hps[0],speeds[0], nums[0]);
			}
			//生成中型敌机
			if (Laya.timer.currFrame % 160== 0) 
			{
				createEnemy(1 , hps[1],speeds[1], nums[1]);
			}
			//生成boss敌机
			if (Laya.timer.currFrame % 1000== 0) 
			{
				createEnemy(2, hps[2],speeds[2], nums[2]);
			}

		}

		/**
		 *  创建敌人
		 * @param index 	敌人编号
		 * @param hp   		 敌人血量
		 * @param speed		敌人速度
		 * @param num		敌人数量
		 */
		private function createEnemy(index:Number,hp:Number,speed:Number,num:Number):void 
		{
			for (var i: int = 0; i < num; i++)
			{
				//创建敌人，从对象池创建
				var enemy:Role = Pool.getItemByClass("role", Role);
				//初始化敌人
				enemy.init("enemy" + (index+1), hp, speed,radius[index],1);
				//从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示，否则新创建角色不会显示出来
				enemy.visible=true;
				//随机位置
				enemy.pos(Math.random() *(720-80)+50, -Math.random() * 100);
				//添加到舞台上
				roleLayer.addChild(enemy);
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




###Role 종류 모든 코드:


```

package
{
	import laya.display.Animation;
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.utils.Browser;
	import laya.utils.Handler;
	import laya.utils.Pool;
	
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
		
		/***飞机的被攻击半径***/
		public var hitRadius:Number;
		/***飞机的阵营（敌我区别）***/
		public var camp:Number;
		
		/***角色的动画资源***/
		private var roleAni:Animation;
		/***当前动画动作***/
		private var action:String;
		
		/***射击间隔***/
		public var shootInterval: Number= 300;
		/***下次射击时间***/
		public var shootTime: Number= 300;
		/***是否是子弹***/
		public var isBullet:Boolean = false;
		
		/****道具类型 0:飞机或子弹，1:子弹箱，2:血瓶***/
		public var propType:int=0;
		/***子弹级别（吃子弹道具后升级）***/
		public var bulletLevel: Number = 0;
		/***同时射击子弹数量***/
		public var shootNum: Number= 1;
		/***子弹偏移的位置***/
		private var bulletPos: Array = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
		
		
		public function Role()
		{
			//实例化动画
			roleAni=new Animation();
			//加载IDE编辑的动画文件
			roleAni.loadAnimation("GameRole.ani");
		}
		
		/**
		 * 角色初始化
		 * @param type  角色类型 ---“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
		 * @param hp      血量
		 * @param speed   速度
		 * @param hitRadius   碰撞半径
		 * @param camp    阵营
		 */		
		public function init(type:String,hp:Number,speed:Number,hitRadius:Number,camp:Number):void
		{
			//角色初始化属性
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			this.hitRadius=hitRadius;
			this.camp=camp;
			
			//对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
			this.isBullet=false;
			//道具属性初始为0
			this.propType=0;
			
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
				//角色 宽高赋值
				roleAni.size(bounds.width,bounds.height)
			}
			//如果死亡动画播放完成
			if(this.action=="die")
			{
				//update()方法中，隐藏后进行回收
				this.visible=false;
				this.lostProp();
			}
			else if(this.action=="hit")//如果是受伤动画，下一帧播放飞行动画
			{
				this.playAction("fly");
			}
		}
		
		/**
		 * 角色失血
		 */		
		public function lostHp(lostHp:Number):void 
		{
			//减血
			this.hp -= lostHp;
			//根据血量判断
			if (this.hp > 0) 
			{
				//如果未死亡，则播放受击动画
				this.playAction("hit");
			}else 
			{
				//如果死亡，则播放爆炸动画
				if (this.isBullet) 
				{
					//隐藏，下一帧回收
					this.visible=false;
				}else 
				{
					//添加死亡动画
					this.playAction("die");
					//如果碰撞掉血死亡者不是角色和子弹
					if(this.type!="hero"&&!this.isBullet)
					{
						//增加游戏积分
						Main.score++;
					}
				}
			}
		}
		
		/**角色死亡掉落物品**/
		private function lostProp():void
		{
			if(this.type!="enemy3") return;
			//从对象池里面创建一个道具
			var prop:Role =Pool.getItemByClass("role",Role);
			
			//生成随机道具类型
			var r:Number=Math.random();
			var num:int=(r<0.7)?1:2;
			
			//重新初始化道具属性,阵营为敌方（只与主角发生碰撞）
			prop.init("ufo"+num,1,2,30,1);
			//道具类型
			prop.propType=num;
			
			//强制显示
			prop.visible=true;
			//生成的位置为死亡者位置
			prop.pos(this.x,this.y);
			//加载到父容器 
			this.parent.addChild(prop);
		}
		/**
		 * 角色吃到道具，加血或子弹
		 */		
		public function eatProp(prop:Role):void
		{
			//如果调用者不是主角或prop不是道具，则返回
			if(this.type!="hero"||prop.propType==0) return;
			
			//添加吃强化道具音效					
			//吃子弹箱
			if(prop.propType==1) 
			{
				//积分增加
				Main.score++;
				//子弹级别增加
				this.bulletLevel++
				//子弹每升2级，子弹数量增加1，最大数量限制在4个
				this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
				//子弹级别越高，发射频率越快
				this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
			}
			else if(prop.propType==2)//吃血
			{
				//血量增加
				this.hp+=2;
				//积分增加
				Main.score+=1;
			}
			//道具死亡
			prop.hp=0;
			//道具吃完后消失，下一帧回收
			prop.visible=false;
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
			//如果角色隐藏，角色消亡并回收
			if(!this.visible)
			{
				//主角不死亡回收，只隐藏，以免其他对象以主角回对象创建，发生引用修改
				if(this.type!="hero") 	this.die();
				return;
			}
			//角色根据速度飞行
			this.y += this.speed;
			
			//如果移动到显示区域以外，则移除
			if (this.type!="hero"&&(this.y > 1280+100||this.y<-150))
			{
				this.visible=false;
			}
			
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

		/**
		 角色射击，生成子弹
		 */		
		public function shoot():void
		{
			//获取当前时间
			var time:Number = Browser.now() ;
			//如果当前时间大于下次射击时间
			if (time >this.shootTime)
			{
				//获得发射子弹的位置数组
				var pos:Array=bulletPos[this.shootNum-1]
				for(var i:int=0;i<pos.length;i++)
				{
					//更新下次子弹射击的时间
					this.shootTime = time + this.shootInterval ; 
					//从对象池里面创建一个子弹
					var bullet: Role = Pool.getItemByClass("role",Role);
					//初始化子弹信息
					bullet.init("bullet2",1,-10,1,this.camp)
					//角色类型为子弹类型
					bullet.isBullet = true;
					//子弹消失后会不显示，重新初始化
					bullet.visible=true;
					//设置子弹发射初始化位置
					bullet.pos(this.x+pos[i], this.y-80);
					//添加到角色层
					this.parent.addChild(bullet);
				}
			}
		}
		
		/**角色死亡并回收到对象池**/
		public function die():void
		{
			//角色动画停止
			this.roleAni.stop(); 
			//去除所有动画监听
			this.roleAni.offAll();
			//从舞台移除
			this.removeSelf();
			//回收到对象池
			Pool.recover("role", this);
		}
	}
}
```
