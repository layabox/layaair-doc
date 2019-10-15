##3 Dキャラクタースクリプト制御と衝突検出



###需要分析

この章の授業では、3 Dエンジンの総合的な運用について初心者に説明し、3 Dシーンの処理とロード、キャラクター衝突検出と動画のコントロールの切り替えなど、RPGゲームのステージの基礎となる開発例を開発者に示します。

基本的な需要は以下の通りです

1、スティックコントローラーでキャラクターをコントロールしてシーン中を歩き回り、レバーコントローラーが解放されたら、キャラクターは移動を停止して待機します。
2、攻撃ボタンを通じてキャラクターの攻撃動画に切り替えることができます。ボタンを押し続けて攻撃し続けて、一回のボタンをクリックして少なくとも一回の完全な攻撃動画を再生します。終了後に再生する前の動画では、スイングより攻撃ボタンの優先度が高いです。
3、シーンにはブロックが必要で、一部の地方のキャラクターが歩けなくなり、キャラクターがブロックまで歩いた時に移動を停止します。
4、同じキャラクターを一つクローンして、二つのキャラクターは同時にコントロールされます。その中の一つがブロック停止された後、もう一つのキャラクターは影響を受けません。

参考効果は下図1のようです。

![图1](img/1.gif)<br/>(図1)



###必要なエンジン技術案の分析

1、スティックを振る：2 Dエンジンのマウスモニター方式を採用し、2 Dエンジンのマウスイベントは多点タッチをサポートし、携帯電話の多点操作に適応する。

2、キャラクターコントロール：LayaAir 3 Dエンジンはコンポーネント式開発モデルをサポートしていますので、キャラクターコントロールはシナリオコンポーネント方式を採用して、効果的にコントロールと表示を分離します。

3、シーン：ドキュメント作成時に、3 Dエンジンの高級地型が完備されていますので、シーン中のブロックは走行エリアの衝突器と放射線検出方式で判断します。

美術は3 Dシーンでキャラクター可搬エリアの個別モデルを作ることができます。図2のようにエクスポート時にはレンダリングは行われませんが、コードにはグリッド衝突器を追加する必要があります。キャラクターの前行位置から放射線を発生し、衝突情報がないとキャラクターが歩けません。もちろん、逆にしてもいいです。走行不可エリアでモデルを作ります。

高級なタイプの機能が整ったら、技術文書を詳しく紹介します。そして、開発者に高級なタイプを使って、性能がもっといいと勧めます。

![图2](img/2.png)<br/>(図2)



###スティックコントローラと攻撃ボタン

ローディング進捗ページは、「技術文書－3 Dキャラクターの切り替えと動画」の例とほぼ同じであり、ここでは説明しない。

スティックコントローラーと攻撃ボタンのインターフェイスは2 D、3 Dゲームに使われていますが、開発者たちは参考にして使ってもいいです。LayaAir IDEに二つのインターフェースを作成し、Rocker.ui、Attack.uiと名づけました。Rocker.uiはタッチポイント画像と背景図から構成されています。Attack.uiは一つの攻撃ボタンから構成されています。中には他の技能ボタンを入れて拡張することもできます。画面は下図3、図4のようです。

![图3](img/3.png)<br/>(図3)

![图4](img/4.png)<br/>(図4)



IDEがリソースをエクスポートした後、プロジェクトのuiフォルダにRockerUID.as、AttackUID.as類が発生します。私たちはviewフォルダを作成し、RockerView、AttackView類を作成して継承します。ここでスイング制御、攻撃ロジックコードを作成します。例は以下の通りです。


```java

package view
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Point;
	import laya.maths.Rectangle;
	import laya.utils.Browser;	
	import ui.RockerUI;	
	/**
	 * 摇杆控制器
	 */	
	public class RockerView extends RockerUI
	{
		/***触摸区域****/
		private var touchRect:Sprite;
		/***控制器中心点****/
		private var originPiont:Point;
		/***摇杆与中心点的x轴距离****/
		private var deltaX:Number;
		/***摇杆与中心点的y轴距离****/
		private var deltaY:Number;
		
		/***当前多点触摸id****/
		private var curTouchId:int=0;
		/***手指（鼠标）是否按下****/
		private var isDown:Boolean=false;
		
		/***摇杆的角度****/
		public var angle:int=-1;		
		/***摇杆的弧度****/
		public var radians:int=-1;
		/***是否左手遥控****/
		public var isleftControl:Boolean=true;		
		/**
		 * 摇杆控制器
		 * @param touchSp  触摸区域
		 */		
		public function RockerView(touchSp:Sprite)
		{
			touchRect = touchSp;
			//鼠标按下事件监听
			touchRect.on(Event.MOUSE_DOWN, this, onMouseDown);
			//鼠标抬起事件监听
			touchRect.on(Event.MOUSE_UP,this,onMouseUp);
			//鼠标是否移出屏幕事件监听
//			touchRect.on(Event.MOUSE_OUT,this,onBlur);
			
			//控制器中心点位置初始化
			originPiont=new Point(this.width/2,this.height/2);
			//默认为控制器不显示
			this.visible=false;
		}		
		/**
		 *鼠标按下事件回调 
		 * @param e 按下事件
		 */
		private function onMouseDown(e:Event):void 
		{
			//左右手遥控
			if(isleftControl)
			{
				//如果按下时是右边屏幕位置或已经按下鼠标，则返回
				if(e.stageX>Laya.stage.width/2 || isDown) return;
			}else
			{
				//如果按下时是左边屏幕位置或已经按下鼠标，则返回
				if(e.stageX<Laya.stage.width/2 || isDown) return;
			}

			//记录当前按下id
			curTouchId=e.touchId;
			//已按下
			isDown=true;
			
			//更新摇杆到屏幕按下位置
			this.pos(Laya.stage.mouseX-(this.width/2),Laya.stage.mouseY-(this.height/2));
			//初始化摇杆控制点位置
			this.knob.pos(this.width/2,this.height/2);
			//按下后显示摇杆
			this.visible=true;
			
			//摇杆移动控制事件监听
			touchRect.on(Event.MOUSE_MOVE,this,onMove)
		}		
		/**
		 *鼠标抬起事件回调 
		 * @param e 抬起事件
		 */		
		private function onMouseUp(e:Event):void
		{
			//如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
			if(e.touchId!=curTouchId) return;
			isDown=false;
			this.visible=false;
			//移除摇杆移动事件监听
			touchRect.off(Event.MOUSE_MOVE,this,onMove);
			//修改摇杆角度与弧度为-1（代表无角度）
			radians=angle=-1;
		}
		/**
		 * 鼠标移动事件回调 
		 * @param e 移动事件
		 */		
		private function onMove(e:Event):void
		{
			//如果不是上次的点击id，返回（避免多点移动，以第一次按下后的移动为准）
			if(e.touchId!=curTouchId) return;
			
			//将移动时的鼠标屏幕坐标转化为摇杆局部坐标
			var locationPos:Point = this.globalToLocal(new Point(Laya.stage.mouseX,Laya.stage.mouseY),false);
			//更新摇杆控制点位置
			this.knob.pos(locationPos.x,locationPos.y);
			
			//更新控制点与摇杆中心点位置距离
			deltaX = locationPos.x - originPiont.x;
			deltaY = locationPos.y - originPiont.y;
			
			//计算控制点在摇杆中的角度
			var dx:Number=deltaX*deltaX;
			var dy:Number=deltaY*deltaY;
			angle = Math.atan2(deltaX, deltaY) * 180 / Math.PI;
			if (angle < 0) angle += 360;
			//对角度取整
			angle=Math.round(angle) ;
			//计算控制点在摇杆中的弧度
			radians= Math.PI / 180 * angle;
			
			//强制控制点与中心距离不超过80像素
			if (dx + dy >= 80 * 80)
			{
				//控制点在半径为80像素的位置（根据弧度变化）
				var x:int = Math.floor(Math.sin(radians) * 80 + originPiont.x);
				var y:int = Math.floor(Math.cos(radians) * 80 + originPiont.y);
				this.knob.pos(x, y);
			}else
			{
				//不超过80像素取原坐标
				this.knob.pos(locationPos.x, locationPos.y);
			}
		}
	}
}
```



```java

package view
{
	import laya.events.Event;	
	import ui.attackUI;
	
	public class attackView extends attackUI
	{
		/****是否按下攻击按钮****/
		public var isAttack:Boolean=false;
		/****按下时的多点触摸ID****/
		private var touchId:int;
		
		public function attackView()
		{
			//按钮按下与抬起事件监听
			this.btn_attack.on(Event.MOUSE_DOWN,this,onAttack);
			this.stage.on(Event.MOUSE_UP,this,onUp);
		}	
      	/****抬起攻击按钮事件回调****/
		private function onUp(e:Event):void
		{
			//如果抬起时的ID与按下时的相同     则为不攻击
			if(e.touchId==touchId) isAttack=false;
		}		
		/****按下攻击按钮事件回调****/
		private function onAttack(e:Event):void
		{
			//获取按下时的id
			touchId=e.touchId;
			//获取事件传参值
			isAttack=true;
		}
	}
}
```




###メインクラスの例

メインクラスの例では、制御のためのロジックがほとんどなく、シーン、カメラ、キャラクターを作成します。例では照明を使わずに、光で写真を撮ってもいいです。開発者たちはシーンにダイナミックな光がないように、照明を追加しなくてもいいです。性能は高くなります。役割の影は透明なチップを使ってもいいです。

シーンモデルから走行エリアモデルmoveAreaを取得する必要があります。レンダリングしないように設定できます。コードは`moveArea.meshRender.enable=false`メッシュ衝突器MeshColliderを加えて、メッシュ衝突器の検出は比較的正確であり、モデル自体と一致して、透かしの領域は検出されないであろう。もちろん、性能上のオーバーヘッドは大きいです。

スティック、攻撃ボタン、カメラの移動量を静的に設定し、キャラクターコントロールスクリプトの使用と制御を容易にします。

メインクラスのすべてのコードは以下の通りです。


```java

package
{
	import laya.d3.component.Script;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.webgl.WebGL;	
	import view.ProgressView;
	import view.RockerView;
	import view.attackView;
	
	 /**3D角色控制与碰撞检测示例****/
	public class Example_roleControl 
	{
		/***3D场景***/
		private var scene:Scene;
		/***3D角色***/
		private var role:Sprite3D;
		/****3D摄像机***/
		public var camera:Camera;		
		/**摇杆控制器****/	
		public static var rocker:RockerView;
		/**攻击按钮控制器****/
		public static var attack:attackView;
		/**摄像机移动向量****/
		public static var cameraTranslate:Vector3=new Vector3();		
		
		public function Example_roleControl() 
		{
			//初始化引擎
			Laya3D.init(1334, 750 ,true);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_FIXED_AUTO;
			//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
			Laya.stage.screenMode = "horizontal";		
			//加载2D资源
			Laya.loader.load("res/atlas/myAssets.atlas",Handler.create(this,on2DComplete));
		}		
		/**
		 * 加载2D资源完成回调
		 */	
		private function on2DComplete():void
		{
			//实例化摇杆控制器
			rocker=new RockerView(Laya.stage);
			Laya.stage.addChild(rocker);			
			//实例化攻击按钮
			attack=new attackView();
			Laya.stage.addChild(attack);			
			//实例化加载进度页面
			var progress:ProgressView=new ProgressView();
			Laya.stage.addChild(progress);			
			//加载3D资源
			Laya.loader.create([{url:"LayaScene_scene03/scene03.ls"},
							    {url:"LayaScene_girl/girl.lh"}
							   ],Handler.create(this,on3DComplete));
		}
		/**
		 * 加载3D资源完成回调
		 */		
		private function on3DComplete():void
		{
			//创建3D场景
			createScene();
			//创建3D摄像机
			createCamera();
			//创建3D角色
			createRole();
			//游戏帧循环
			Laya.timer.frameLoop(1,this,onFrameLoop);
		}
		/**
		 * 创建3D场景
		 */		
		private function createScene():void
		{
			//实例化场景
			scene=Laya.loader.getRes("LayaScene_scene03/scene03.ls");;
			Laya.stage.addChild(scene);
			//将场景层级调至最低（UI界面后面）
			Laya.stage.setChildIndex(scene,0);
			//获取场景模型中的角色移动碰撞区模型
			var moveArea:MeshSprite3D=scene.getChildAt(0).getChildByName("MoveArea") as MeshSprite3D;
			//设置为不渲染
			moveArea.meshRender.enable=false;
			//加载网格碰撞器组件
			moveArea.addComponent(MeshCollider);
		}		
		/**
		 * 创建3D摄像机
		 */	
		private function createCamera():void
		{
			//实例化摄像机
			camera=new Camera();
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 4.5, 12));
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=25;			
			scene.addChild(camera);
		}		
		/**
		 * 创建3D角色
		 */	
		private function createRole():void
		{
			//实例化角色
			role=Laya.loader.getRes("LayaScene_girl/girl.lh");
			scene.addChild(role);
			//角色位置
			role.transform.position=new Vector3(0,0,1);
			//加入角色控制器脚本
			role.addComponent(RoleControlScript);			
			//摄像机对准角色模型附近位置
			camera.transform.lookAt(new Vector3(0,0.5,1),new Vector3(0,0,0));			
			//克隆一个角色（克隆包括子对象、组件、脚本等。注：用此方法克隆Sprite3D继承类会有问题）
			var role1:Sprite3D=Sprite3D.instantiate(role);
			scene.addChild(role1);
          	//角色位置
			role.transform.position=new Vector3(-1,0,1);
		}		
		/**
		 * 游戏帧循环
		 */		
		private function onFrameLoop():void
		{
			//摄像机位置改变（数据为角色控制脚本修改）
			camera.transform.translate(cameraTranslate,false);
		}
	}
}
```




###キャラクターコントロールスクリプトコンポーネント

コンポーネントの機能は比較的に強いですが、スクリプトはコンポーネントに引き継がれます。その中で重要な属性と方法は「技術文書—LayaAir 3 Dスクリプトコンポーネント」を参照してください。

シナリオコンポーネントの開発モードは私達のためにもう一つの思惟方式を提供してくれました。継承と違って、より柔軟で変化に富むので、いつでも除去、組み合わせのコンポーネントを追加できます。開発者たちはこの方法をたくさん試します。

本例では、キャラクター制御は、シナリオ構成要素式の方法を使用しており、シナリオでは主に以下の機能を実行しています。

1、スクリプトの属するキャラクターアニメーションコンポーネントを取得して、アニメーション用を制御し、上書きコンポーネント（u start）方法でアニメーションコンポーネントを取得する。

2、キャラクターアニメーション、ウォーキング、スタンバイ、攻撃方法が分離され、キャラクターアニメーションはイベントモニターを完成する。

3、キャラクター衝突検出は、スクリプト更新方法_uuudate（）において、キャラクターの位置線と走行エリアが衝突して検出され、キャラクターがブロックされているかどうかを判断する。

4、キャラクターの更新は、スクリプトの更新方法_uuudate（）において、スイング角度、攻撃ボタンを取得し、その属性に応じてキャラクターアニメーションの切り替えを制御します。

5、カメラはキャラクターの移動の変位量に従って同期シフトの更新を行います。

スクリプトのすべてのコードは以下の通りです。


```java

package 
{
	import laya.d3.component.Animator;
	import laya.d3.component.Script;
	import laya.d3.core.Camera;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.events.Event;
	import laya.webgl.WebGLContext;
	
	import view.RockerView;
	import view.attackView;
	
	/**
	 *角色控制器脚本组件（角色3D对象角度切换、状态动画切换、行走区域检测等）
	 */	
	public class RoleControlScript extends Script
	{
		/****角色模型***/
		public var roleModel:Sprite3D;
		/****角色动画组件***/
		public var roleAni:Animator;		
		/****角色当前动作***/
		public var currentAction:String="stand";
		/****角色动画是否完成***/
		public var aniComplete:Boolean=true;
		/****角色移动速度***/
		public var speed:Number=0.04;		
		/****3D摄像机***/
		public var camera:Camera;
		/**摇杆控制器****/	
		private var rocker:RockerView;
		/**攻击按钮控制器****/
		private var attack:attackView;		
		/**摇杆上一帧的角度****/
		private var lastAngle:int=0;
		/**检测移动区碰撞器的射线****/
		private var ray:Ray=new Ray(new Vector3(0,0,0),new Vector3(0,-2,0));
		/**碰撞检测信息****/
		private var outHitInfo:RaycastHit=new RaycastHit(); 
		
		public function RoleControlScript()
		{			
		}		
		/**
		 * 覆写3D组件方法，指3D对象加载组件时执行
		 * @param owner 此组件所属的3D对象
		 */		
		override public function _load(owner:Sprite3D):void 
		{
			//获取控制器UI
			rocker=Example_roleControl.rocker;
			attack=Example_roleControl.attack;
		}		
		/**
		 * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
		 */		
		override public function _start(state:RenderState):void 
		{
			//获取被绑定脚本的模型,需等待角色实例化完成
			//获取有动画组件的内层模型（.lh资源导出时会在角色外包裹一层sprite3D）
			roleModel=owner.getChildByName("girl1") as Sprite3D;
			//模型缩放
			roleModel.transform.localScale=new Vector3(0.8,0.8,0.8);			
			//获取角色动画组件
			roleAni=roleModel.getComponentByType(Animator) as Animator;
			//动画完成事件监听
			roleAni.on(Event.COMPLETE,this,onComplete);
		}		
		/**
		 * 覆写3D组件更新方法（相当于帧循环）
		 * @param state 渲染状态
		 */		
		override public function _update(state:RenderState):void 
		{
			//如果是攻击状态播放击球动画（优先播放击球动画）
			if(attack.isAttack)
			{
				if(currentAction!="play")
				{
					play();
					//摄像机移动向量
					Example_roleControl.cameraTranslate=new Vector3(0,0,0);
				}
			}
			//上次击球动画如果未结束，不执行以下代码
			if(!aniComplete) return;

			//如果摇杆有方向角度
			if(rocker.angle!=-1)
			{
				//摇杆控制角色旋转方向（本帧摇杆的角度-上一帧的角度=本帧应当旋转的角度）
				roleModel.transform.rotate(new Vector3(0,rocker.angle-lastAngle,0),false,false);
				
				//通过弧度和速度计算角色在x、z轴上移动的量
				var speedX:Number =Math.sin(rocker.radians)*speed;  
				var speedZ:Number =Math.cos(rocker.radians)*speed;
				//记录角色本帧的角度
				lastAngle=rocker.angle;
				
				//行走区域碰撞检测，如未与行走区域模型碰撞，则不移动
				//射线原点
				var rayOrigin:Vector3=new Vector3(0,0,0);
				//根据角色位置计算射线原点
				Vector3.add(owner.transform.position,new Vector3(speedX,2,speedZ),rayOrigin);
				//射线原点位置更新
				ray.origin=rayOrigin;
				
				//物理射线与碰撞器相交检测
				Physics.rayCast(ray,outHitInfo,5);
				//如果未有碰撞则返回
				if(outHitInfo.distance<0)  	speedX=speedZ=0;
				
				//更新角色位置
				owner.transform.translate(new Vector3(speedX,0,speedZ),false);

				//播放行走动画
				if(currentAction!="go") go();				
			}else 
			{
				//如果摇杆未有角度则播放待机动画
				if(currentAction!="stand") stand();
			}
			
			//摄像机移动向量
            //注：因为克隆需求，所以提供移动向量给主类，由主类控制摄像机更新。
            //如果只有单一主角，可以直接在脚本中控制摄像机移动。
			Example_roleControl.cameraTranslate=new Vector3(speedX,0,speedZ);
		}		
		/**
		 * 动画播放完成回调
		 */		
		private function onComplete():void
		{
          	//角色动画完成
			aniComplete=true;
          	//如果结束的动画剪辑名为play,则播放站立待机动画
			if(roleAni.currentPlayClip.name=="play")	stand();
		}		
		/**
		 * 角色行走动画
		 */	
		public function go():void
		{
			roleAni.play("go",1.4);
			currentAction="go";
		}		
		/**
		 * 角色待机动画
		 */	
		public function stand():void
		{
			roleAni.play("stand"); 
			currentAction="stand";
		}		
		/**
		 * 角色击球动画
		 */	
		public function play():void
		{
			roleAni.play("play");
			currentAction="play";
			aniComplete=false;
		}
	}
}
```


キャラクターにウォーキングgo、立ちスタント、攻撃プレイ動画があれば、シナリオがこの対象に追加されると、主人公のようにコントロールできます。これが脚本の融通性です。

実行コードをコンパイルすると、図1のデモンストレーション効果が得られます。