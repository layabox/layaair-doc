# 七、主角射击与掉落道具



「飛行機大戦」のゲームはもうほとんど完成しました。射撃ゲームにとっては、銃弾を撃って敵を撃破し、道具を奪うのがゲームの核です。この授業は主にこの二つの核心機能を実現します。



###主役が射撃して主役を怒らせる

以前の教程では私達は射撃をメインクラスのMainに置いたのですが、メインクラスではメインロジックであり、コードが多く、射撃はキャラクターの行為であり、この例では射撃方法をロールクラスに置いています。

Role類には射撃間隔時間のshot Intervalと次の射撃時間のshotTime属性と、キャラクターは銃弾タイプのisBullet属性であるかどうかを追加しました。そして新しい方法shot（）を作成します。

射撃の方法では射撃の間隔によって弾丸を作成します。弾丸の対象は同じキャラクターです。違いは飛行状態のみで、怪我なしで死亡した状態です。

####射撃の創建方法


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




####出血方法を修正する

弾が死亡していないため、敵機を銃弾で撃ち潰した後、プレイヤーポイントが増えます。したがって、lostHp()メソッドのコードを修正します。

/**
*キャラクターの出血
*/
public function lostHp(lostHp:Number)：void
{
//マイナス
this.hp-=lostHp;
//血の量で判断する
if(this.hp>0)
{
//死亡していない場合は、ヒット動画を再生します。
this.playAction；
}else
{
//死んだら、爆発動画を再生する
//弾無死亡
if(this.isBullet)
{
//udate（）方法では、隠してから回収します。
this.visible=false;
}else
{
//死亡動画を追加
this.playAction（「die」）；
//もし血を落としたら死亡者はキャラや弾丸ではないです。
if(this.type！=「hero」&！this.isBullet)
{
//ゲームのポイントを増やす
Main.score＋＋
)
)
)
)
上記のコードを完成したら、特に注意してください。キャラクター初期化init（）方法には、必ず追加してください。**isBullet=false**オブジェクトプールから作成されたオブジェクトは、死亡したアニメーションを再生しないかもしれません。それらのisBulletはtrueかもしれません。

####メインループを変更

Main類のメインループloop（）に主人公の射撃方法を加えて、コードを修正して、キャラクターを死亡させた後に射撃しないようにします。


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


コードを全部修正して、コンパイルして実行すれば、弾が作成されて発射されます。そして弾丸が敵にぶつかり、敵を負傷させたり、撃ったりします。UIにおける積分率も増加する（図1）。

![思维导图.png](img/1.png)<br/>(図1)

#### 

###ゲームアイテムを落としたり、道具を食べたりします。

弾が飛行機に当たって爆発したら、敵のアイテムを落とす機会を設けることができます。私たちの美術資源の中には全部で二つの道具があります。銃弾のレベルが足りたら、同時に複数の銃弾を発射します。一つは血液量を増やすために設置されています。

####生成アイテムの作成方法

RoleクラスでlostProp（）を作成する方法は、enemeny 3タイプの敵機だけがアイテムを落とすことができます。道具も一種のキャラクターです。生成道具は他のキャラクターを生成する方法と同じです。


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


####「アニメーション完了」のコールバック方法を変更します。

キャラクターが死亡した動画を再生したら、ロールプロ（）メソッドを呼び出すことができますので、RoleクラスのonComplettee（）を修正します。

/***アニメーション完了後のコールバック方法***/
prvate function onComplete()：void
{
//キャラクターがまだ幅がない場合、キャラクターの幅が高くなります。
if(roleAni.width==0)
{
//アニメーションの長方形の境界を取得する
var bounds：Rectangle=roleAni.get Bounds（）；
//キャラクターの幅の高さ
roleAni.size（bounds.width，bounds.height）
)
//もし死亡した動画が再生されたら
if（this.action==「die」）
{
//udate（）方法では、隠してから回収します。
this.visible=false;
//死亡後アイテムを落とす
this.lostProp()
)
……


コンパイルして運行して、私達は1隻のボスの敵機（enemi 3）を破壊して、道具が現れたことを発見します！しかし、道具は陣営が違っているため、弾で撃ち潰されたり、主人公と道具がぶつかったりして、お互いに血が落ちたりします。

![思维导图.png](img/1.png)<br/>(図1)



####キャラクターを作成して道具を食べる方法

問題を解決するために、弾を食べたらアップグレード機能があります。

Role類にアイテムタイプ、弾レベル、同時に撃つ弾数、弾の位置ズレ属性を新たに追加する必要があります。

道具を食べる方法を作って、アートプロ（）を作って、メインサイクルで飛行機と道具の衝突判定をします。


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


アイテムを作成する際に、アイテムの属性を追加して、アイテムの種類を変更します。


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


Role類init（）方法を変更し、初期化時に使用するアイテムの属性は0です。


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


以上のコードを修正したら、メインクラスのMainに衝突判定を行います。



####キャラクターとアイテムの衝突判定

Main類のメインサイクルで衝突コードを修正し、修正して実行すると、アイテムが食べられるようになりました。


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




####アイテムを食べたら弾がアップします。

Role類では、銃弾の発射方法shot（）を見直し、道具を食べ終わったら弾レベルが増加し、銃弾数も増加します。コードは以下の通りです。


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


コンパイルしてゲームを実行していると、弾のレベルが2、3個を食べ終わったら、同時に複数の弾を発射することができます。攻撃力が超爆発します。

![思维导图.png](img/2.png)<br/>(図2)



###対象池の使用注意事項

LayaAirでゲームを開発するには、オブジェクトプールPoolの作成と回収メカニズムが不可欠です。特に、「飛行機大戦」のような射撃ゲームは、大量の弾丸、飛行機を迅速に創建し、また迅速に破壊するために対象プールを使う必要があります。

初心者にとっては、認識がよくないとプログラムのバグを起こしやすく、デバッグして解決するのは難しいです。使用する時、以下の点に注意してください。

1.対象プールに格納されているのは、回収対象の参照です。もしあなたのグローバルなインスタンスが回収されたら、例えば「飛行機大戦」の主人公のheroは、対象プールに死亡回収された後、新しい対象に使用されるかもしれません。属性が変わったらヒーローヒーローヒーローも修正されます。ゲームには訳のわからないバグが出てきますので、対象プールに回収しないようにしてください。

2.対象プールによって作成されたオブジェクトの属性は、必ず再初期化されます。たとえば飛行機大戦中の敵機と銃弾、死亡時のvisibleはfalseで、銃弾のisBulletはtrueであるが、敵機の役割のisBulletはfalseである必要がある。新しいオブジェクトを作成するときは、変更された属性を初期化する必要があります。変更を忘れたら、論理部分にいくつかの使用が問題になります。

例えば、キャラクターが死亡した動画を再生するかどうかを判断する時、ISBulletで判断します。ただし、弾を回収対象として作成した敵機であれば、この時のisBulletはtrueであり、isBulletは初期化されていないと、銃弾と間違えられ、死亡アニメは放送されない。

もちろん、もう一つの方法はリサイクルを作成する時、識別分類を行い、弾丸と飛行機を分類し、コードを多く書いて、論理的な脆弱性を避けることです。



修正したMain類とRole類コードの全部のコードを示します。

###メインクラスMain.asのすべてのコード


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




###Roleクラスのすべてのコード:


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
