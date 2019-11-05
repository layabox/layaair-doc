#6. 적기 생성 및 역할 충돌



지난 수업에서 우리는 주인공의 가재와 조작을 실현하고 국경 점검에 가입했다.이 수업을 우리는 주인공에게 압력을 가하고, 한 무리의 적기 한 무리가 주인공으로 날아올라, 주인공이 더 이상 외롭지 않게 할 것이다.물론 주인공이 충돌 당하면 피가 죽어 간다.



###적기 를 생성하여 그들 을 비행 하게 하다

코드 사고는 다음과 같다:

1. Main 류에서 적법 창건을 위한 creatEnemy(), 다른 적을 생성할 수 있다.

2. Main 류의 주순환 loop()에 적기 논리 코드 를 만들기 위해 정기적으로 가입한다.

3. 캐릭터 Role 류에 캐릭터 사망 방법 die(), 무대 이제, 사건 이제, 대상 회수 등

4. 캐릭터 로플류에서 업데이트 방법 update(), 역할은 프레임마다 속도에 따라 이동한다.주역 밖의 다른 캐릭터 경계 검사를 늘리고 스크린을 내보내며 사라지고 대상 지환수됐다.



####적기 방법 만들기

Main 주류 열기, creatEnemy () 방법 만들기


```

		/**
		 *  创建敌人
		 * @param index 	敌人编号
		 * @param hp   		敌人血量
		 * @param speed		敌人速度
		 * @param num		敌人数量
		 */
		private function createEnemy(index:Number,hp:Number,speed:Number,num:Number):void 
		{
			for (var i: int = 0; i < num; i++)
			{
				//创建敌人，从对象池创建
				var enemy:Role = Pool.getItemByClass("role", Role);
				//初始化角色类型，血量与速度
				enemy.init("enemy" + (index+1), hp, speed);
				//从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示
				enemy.visible=true;
				//随机位置
				enemy.pos(Math.random() *(720-80)+50, -Math.random() * 100);
				//添加到舞台上
				roleLayer.addChild(enemy);
			}
		}
```


이상의 코드를 관찰하여 우리는 적들을 만들 때 '대상 지' 방식에 쓰였으니 상세한 상황은 API 참고하십시오.


```

		//创建敌人，从对象池创建
		var enemy:Role = Pool.getItemByClass("role", Role);
```


정상적인 상황에서 적기가 대량으로 창출한 후에 파괴되어 사라졌다. 이 과정에서 메모리 소모가 매우 커지고, 게임의 성능은 점점 낮아질 것이다.Layair가 제공한 대상 회수 재활용 방법으로 이 문제를 효과적으로 해결했다.



####정기적으로 적을 세우다

Main 종류에 속성: 적기 혈량표 hps, 적기 속도표 speds, 적기 수량 표 nums, 게임 수치 사용 및 조정에 사용합니다.


```

		/****敌机血量表****/
		private var hps: Array = [1, 6, 15];
		/***敌机生成数量表**/
		private var nums:Array = [2, 1, 1];
		/***敌机速度表***/
		private var speeds: Array = [3, 2, 1];
```


주 순환 loop () 에 정기적으로 생성 코드 를 추가합니다.현재 프레임수에 따라 지연 시간에 맞춰 적기가 생긴다.

주역 갱신 방법 hero.update () 을 배역층으로 바꾸어 모든 캐릭터 (주역과 적기) 를 갱신, 국경검사 등이다.


```

		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新
			play.update(hp,level,score)
		
			//遍历所有飞机，更改飞机状态
			for (var i: int = roleLayer.numChildren - 1; i > -1; i--) 
			{
				var role:Role = roleLayer.getChildAt(i) as Role;
				//角色自身更新
				role.update();
			}
			
			//创建敌机,不同类型飞机创建的间隔时间不一样
            //生成小敌机（每80帧生成一次）
            if (Laya.timer.currFrame % 80== 0)
            {
           		 createEnemy(0, hps[0],speeds[0], nums[0]);
            }
            //生成中型敌机（每160帧生成一次）
            if (Laya.timer.currFrame % 160== 0) 
            {
          		  createEnemy(1 , hps[1],speeds[1], nums[1]);
            }
            //生成boss敌机（每1000帧生成一次）
            if (Laya.timer.currFrame % 1000== 0) 
            {
         	   createEnemy(2, hps[2],speeds[2], nums[2]);
            }
			
		}
```




####캐릭터 사망과 회수

캐릭터 종류에서 캐릭터 사망 방법die(), 주의대상 지성 회수 방법 Pool.recover('role', this), 역할은 회수 후에야 대상지에서 생성할 수 있다.


```

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
```


####역할 업데이트

역할 갱신 방법 update(), 캐릭터 증가 속도 이동에 따라 변경 처리를 초과하고 사망 회수 가입.

주: 주역 사망 후 회수 하지 않 고 새 대상 사용 대상 창설, 주인공 속성 수정 문제 가 발생 했 다.


```

		/**
		 * 角色更新,边界检查
		 */		
		public function update():void
		{
			//如果角色隐藏，角色消亡并回收
			if(!this.visible)
			{
				//主角不死亡回收，只隐藏，以免其他对象以主角回收对象创建，发生引用修改
				if(this.type!="hero") 	this.die();
				return;
			}
			//角色根据速度飞行
			this.y += this.speed;
			
			//如果移动到显示区域以外，则隐藏
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
```




이상 코드를 수정하고 편집을 마친 후, 우리는 적기 무리의 한 무리가 화면에 나타나 아래쪽으로 비행하는 것을 발견하였다.물론, 아직 충돌 검사를 하지 않았기 때문에 급우들의 주인공은 아직 무적 상태이기 때문에 안심하고 대담하게 날라!

![思维导图.png](img/1.png)< br / > (그림 1)



###충돌 검사 및 역할 상태 전환

다음은 충돌 검출 논리에 가입하기 시작했고 적기가 주인공에 부딪히면 쌍방이 상태를 바꾸고 부상을 당하고, 생명치가 0 시 작았을 때 비행기가 폭파되었다.대략 사고로:

1. 캐릭터를 위해 반경 hit Radisius와 진영 캠프 속성.init () 방법에 두 개의 인자를 추가합니다.충돌 검사 때 같은 캠프는 충돌 검사를 하지 않아도 되고, 각 진영의 캐릭터가 겹치고, 두 반경의 화와 거리가 작고, 즉 충돌을 판단하는 것이다.

속성을 더하면 Main 류에서 주인공과 적기를 만드는 init() 방법을 수정해야 한다.

2. 캐릭터를 위해 피를 신증시키는 방법 lostHp(), 충돌 후 피가 떨어지고 캐릭터가 부상, 죽음, 애니메이션 전환을 판단한다.

3. main 류의 주순환에 충돌 검출 논리에 합류해 충돌이 성공하면 캐릭터 탈혈 방법을 호출한다.



####새로운 캐릭터 충돌 관련 속성


```

		......
		/***飞机的被攻击半径***/
		public var hitRadius:Number;
		/***飞机的阵营（敌我区别）***/
		public var camp:Number;
		......
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
			//角色初始化属性
			this.type=type;
			this.hp=hp;
			this.speed=speed;
			this.hitRadius=hitRadius;
			this.camp=camp;
			
			//加载动画对象
			this.addChild(roleAni)
		......
```


Main 류에서 적기가 반경 데이터표 radisus를 새로 찍히고 주역과 적기 실례를 수정한 후 초기화 init () 방법으로 반경과 진영에 합류하고 주역 진영은 0, 적기는 1이다.


```

		/***敌机被击半径表***/
		private var radius: Array = [20, 35, 80];
```



```

		//初始化角色类型、血量，速度0,半径30,阵营为0
		hero.init("hero",10,0,30,0);
```



```

		//初始化敌人,碰撞半径为读半径数据表
		enemy.init("enemy" + (index+1), hp, speed,radius[index],1);
```




####캐릭터 탈혈 방법과 상태 변화

Role 류에서 혈액 증가 방법 lostHp()


```

		/**
		 * 角色失血
		 * @param lostHp 失血量
		 */		
		public function lostHp(lostHp:Number):void 
		{
			//减血
			this.hp -= lostHp;
			//根据血量判断是否死亡
			if (this.hp > 0) 
			{
				//如果未死亡，则播放受击动画
				this.playAction("hit");
			}else 
			{
				//播放死亡动画
				this.playAction("die");
			}
		}
```


또한 세부 사항을 고려해 부상 애니메이션 방영 후 비행 애니메이션 전환도 필요하다. 사망 애니메이션 방송 후 캐릭터가 소멸된다.그렇다면'애니메이션 완성 이벤트 완성'의 반전 방법에서 실현 가능하며 onComplete() 방법을 수정하고 다음과 같습니다:


```

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
				//update()中，隐藏后进行移除回收
				this.visible=false;
			}
			else if(this.action=="hit")//如果是受伤动画，下一帧播放飞行动画
			{
				this.playAction("fly");
			}
		}
```




####충돌 검사에 가입하여 비행기가 부딪혔다

캐릭터 준비가 전부되면 Main 류의 주순환에 충돌 논리에 합류해 캐릭터의 혈량을 UI 에 표시하고 주순환에서 캐릭터 파트를 바꾼다.코드 다음과 같습니다:


```

		/**
		 游戏主循环
		 */
		private function loop():void
		{
			//地图滚动更新
			map.updateMap()
			//本局游戏数据更新（修改为角色hp）
			play.update(hero.hp,level,score)
				
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
						//是否碰撞成功
						if(Math.abs(role.x-role1.x)<hitRadius&&Math.abs(role.y-role1.y)<hitRadius)
						{
							//相互掉血
							role.lostHp(1);
							role1.lostHp(1);
						}
					}
				}
			}
		......
```


번역 게임, 우리는 주인공과 적기와 충돌을 본 후, 게임 중 UI 는 주역의 혈량 감점, 적기는 부상 애니메이션, 아니면 폭발 격파를 하거나, 주인공의 혈량이 0 시 폭발 애니메이션을 방영한 뒤 사라졌다.

이제 주인공이 죽어, 우리의 게임 흐름 컨트롤도 그에 맞는 변경을 해야 한다.그동안 우리는 30초 연기로 게임을 마쳤으니 이제는 캐릭터 죽음으로 시작해 UI 페이지를 열어 끝낼 수 있다.

Main 류에서 주석하거나 Laya.timer.once (300,000,this, gamover) 코드를 제외하고 순환에서 주역 사망 판단에 가입한다.물론 주인공이 사망할 때 폭발 애니메이션이 방영되지 않았고, 인터페이스를 벗어나 집행을 늦추면 체험감이 훨씬 좋다.코드 는 다음과 같다


```

		/**主角死亡后游戏结束时间***/
		private var deathTime:int=0
		......
		
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
					//后续逻辑不执行(执行会报错，已没有角色层作碰撞检测了)
					return;
				}
			}
			
			......
```


이로써 캐릭터와 충돌 논리를 모두 완료하였습니다. 당신이 굽혀 내려다보는 러닝판만 한다면 이 코드도 충분합니다!!!)

![思维导图.png](img/2.png)< br / > (그림 1)



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
			play.update(hero.hp,level,score);
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
			map.updateMap();
				
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
                            //角色相互掉血
                            role.lostHp(1);
                            role1.lostHp(1);
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
				//播放死亡动画
				this.playAction("die");
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
			//如果角色隐藏，角色消亡并回收
			if(!this.visible)
			{
				//主角不死亡回收，只隐藏，以免其他对象以主角回对象创建，发生引用修改
				if(this.type!="hero") 	this.die();
				return;
			}
			//角色根据速度飞行
			this.y += this.speed;
			
			//角色如果移动到显示区域以外，则移除
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
