#六、敵機を創建してキャラクターと衝突する



前の授業では、主人公のローディングと操縦を実現し、境界検査の更新も加えました。この授業は主人公に圧力をかけて、敵機の群れを作って主人公に飛びます。もちろん、主人公が衝撃を受けたら、血を落として死ぬまでです。



###敵機を作って飛行させます。

コードの考え方は以下の通りです。

1.Mainクラスで敵を作る方法を確立し、異なる敵を生成することができます。

2.Main類のメインループloop()に定期的に敵機を作る論理コードを追加します。

3.ロールRole類において、キャラクターの死亡方法die（）を確立し、ステージからの除去、イベントの除去、対象の回収などを含み、

4.キャラクターのRole類の更新方法udate（）を修正し、キャラクターはフレームごとに速度によって移動します。主人公以外のキャラクターの境界チェックを追加し、画面を飛び出したら消え、対象プールに回収されます。



####敵機の創建方法

Mainメインクラスを開けて、creat Eneseを作成する方法


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


上記のコードを観察して、敵を作る時に「対象プール」という方式を使いました。詳細はAPIを参照してください。


```

		//创建敌人，从对象池创建
		var enemy:Role = Pool.getItemByClass("role", Role);
```


通常、敵機は大量に創建され、破壊されて消えます。この過程でメモリの消耗が大きく、ゲームの性能はますます低くなります。LayaAirが提供する対象回収リサイクル方法はこの問題を効果的に解決しました。



####定期的に敵を作る

Mainに属性を追加します。敵機の血量計hps、敵機速度表speeds、敵機数表nums、ゲームの数値使用と調整に使います。


```

		/****敌机血量表****/
		private var hps: Array = [1, 6, 15];
		/***敌机生成数量表**/
		private var nums:Array = [2, 1, 1];
		/***敌机速度表***/
		private var speeds: Array = [3, 2, 1];
```


メインループloop()に定期コードを追加します。現在のフレーム数から計算して、遅延時間によって敵機が発生します。

主人公の更新方法をhero.udate（）を削除して、キャラクター層を巡回して、すべてのキャラクター（主人公と敵機）を更新して、境界検査などを行います。


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




####キャラクターの死亡と回収

キャラクターの死方法die()を作成し、対象プールの回収方法Pool.recover(「role」，this)に注意してください。キャラクターは回収後のみ対象プールから作成できます。


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


####キャラクター更新

キャラクターの更新方法をudate（）に修正し、キャラクターを増やして速度に応じて移動し、境界を超えて処理し、死亡回収を加えます。

注：主人公が死亡した後は回収しないで、新しい対象を使って主人公のオブジェクトを作成しないようにします。


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




以上のコードを修正してコンパイルして実行したら、敵機の一群が画面に現れて、下の方に飛んでいるのを発見しました。もちろん、まだ衝突検査をしていませんので、学生たちの主役はまだ無敵状態です。安心して大胆に飛びましょう。

![思维导图.png](img/1.png)<br/>(図1)



###衝突検出とキャラ状態切り替え

次に、我々は衝突検出ロジックに参加し始めました。もし敵機が主人公に衝突したら、双方は状態を切り替えて、怪我して血を減らします。生命値が0以下の時、飛行機は爆発して壊れます。大体の考えは次の通りです

1.キャラクター類に衝突半径hitRadiusと陣営campの属性を追加します。イニシャルinit()メソッドに2つのパラメータを追加します。衝突検出時には、同じ陣営は衝突検出を必要とせず、異なる陣営の役割が重なり合い、距離が二つの半径の和より小さい、つまり衝突が発生したと判断する。

属性を加えると、Main類に主人公と敵機を作るinit（）の作成方法を修正する必要があります。

2.キャラクターのために血液を落とす方法を追加しました。衝突して血を落とし、キャラクターが負傷しているかどうか、死亡しているかどうかを判断し、アニメーションが切り替わります。

3.メインサイクルに衝突検出ロジックを入れて、衝突成功のように、キャラクターの出血方法を呼び出します。



####キャラクター衝突に関する属性を追加します。


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


Mainクラスでは、敵機の半径データテーブルradiusを追加し、主人公を修正し、敵機のインスタンスを作成した後の初期化init（）方法を変更し、半径と陣営パラメータを追加し、主人公陣営は0で、敵機は1である。


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




####キャラの出血方法と状態が変わります。

Role類に掉血方法lostHp()を追加しました。


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


ここでは、傷を負った動画を再生した後、飛行アニメに切り替え、死亡したアニメを放送した後、キャラクターが消えることも考えられます。では、「アニメ完成イベント」のリスニング方法で実現できます。onComplettee（）の方法は、以下の通りです。


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




####衝突検出を加えて、飛行機を衝突させる。

キャラクターの準備が全部できたら、Mainのメインサイクルに衝突ロジックを入れて、キャラクターの血の量をUIに表示させます。メインサイクルを修正して、キャラクター層の部分を巡回します。コードは以下の通りです


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


ゲームをコンパイルして実行しています。主人公と敵機が衝突した後、ゲーム中のUIに主人公の血の減点が表示されました。敵機は負傷した動画が現れたり、爆発したりします。主人公の血の量が0だったら、爆発動画も放送されました。その後消えることになります。

今は主役が死ぬかもしれません。私たちのゲームの流れをコントロールします。以前は30秒の遅延でゲームを終了しましたが、キャラクターが死亡したので、UIページを開くように変更できます。

MainクラスではLaya.timer.once（30000,this，gameOver）コードを注釈したり削除したりして、ループに主役死亡判定を加えます。もちろん、主人公が死亡した時、爆発アニメは全部放送されていないので、画面から飛び出すのもとても不便です。コードは以下の通りです


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


ここで、キャラクターとキャラクターのぶつかり合いのロジックが全部完成しました。もしあなたは走りの角度のクール版だけを作ったら、これらのコードも十分です。:

![思维导图.png](img/2.png)<br/>(図1)



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




###Roleクラスのすべてのコード:


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
