## 3D角色脚本控制与碰撞检测



###requirement analysis

This chapter mainly explains the comprehensive application of 3D engine to beginners, including the processing and loading of 3D scenes, role collision detection and animation control switching, etc. It shows developers a basic development example similar to RPG game level.

The basic needs are:

1. The rocker controller controls the role to move back and forth in the scene. When the rocker controller is released, the role stops moving and standby.
2. Attack button can be switched to character attack animation by pressing the button all the time. At least once a button is clicked to play a complete attack animation. After playing the animation before, the priority of attack button is higher than that of rocker. If rocker is still pressed, mobile animation will be played and displaced after the attack stops.
3. The scene needs to be blocked. In some places, the characters can not walk. When the characters walk to the blocking area, they stop moving.
4. Clone a same role, two roles are controlled at the same time. If one of them encounters blocking stop, the other role will not be affected.

The reference effect is shown in Figure 1 below.

![图1](img/1.gif)<br>（图1）







###Analysis of Engine Technical Scheme Required

1. Rocker: Using 2D engine mouse monitoring mode, 2D engine mouse events support multi-touch, to adapt to the complex operation of mobile phones.

2. Role control: LayaAir3D engine supports component-based development model, so role control uses script component to effectively separate control from display.

3. Scene: When the document is written, the advanced type of 3D engine is being perfected, so the obstruction in the scene is judged by walking area Collider and ray detection temporarily.

Art can create a separate model of the walkable area of a character in a 3D scene, as shown in Figure 2. When the character is exported, it is not rendered, but a grid collider is added to the code. A ray is generated from the forward position of the character to detect the collision with the collider. If there is no collision information, the character can not walk, and the role with collision information can walk. Of course, you can also make a model in the non-walkable area.

When the advanced terrain function is improved, the technical documentation will be introduced in detail, and developers are recommended to use the advanced terrain for better performance.

![图2](img/2.png)<br> (Figure 2)



###Rocker Controller and Attack Button

The loading progress page is basically the same as the interface and code in the "Technical Document - 3D Role Switching and Animation" example, which is not explained much here.

The interface between rocker controller and attack button is commonly used in 2D and 3D games. Developers can use it for reference. Create two interfaces in LayaAir IDE, named Rocker. UI and Attack. ui. Rocker. UI is composed of touch point pictures and background pictures. Attack. UI is composed of an attack button, which can be extended by adding other skill buttons. The interface is shown in Figures 3 and 4 below.

![图3](img/3.png)<br> (Figure 3)

![图4](img/4.png)<br> (Figure 4)



After IDE publishes the export resources, RockerUI. as and AttackUI. as classes will be generated in the project UI folder. We build the view folder and create RockerView and AttackView classes to inherit it. We write rocker control and attack logic code in it. The examples are as follows:


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




###Sample main class

In the main class of the example, there is basically no logic of control, and the same is to create scenes, cameras, and roles. In the example, no lighting will be used, and light mapping will be enough. It is suggested that developers can use transparent mapping model for role shadows if there is no dynamic light in the scene and no lighting is added.

In a scenario, we need to get the moving area model from the scenario model, which can be set as non-rendering and coded as`moveArea.meshRender.enable=false`And add Mesh Collider to it. Mesh Collider is more accurate and consistent with the model itself. The hollow area will not be detected. Of course, performance overhead will be high.

Rocker, attack button and camera movement are set to static to facilitate the use and control of role control scripts.

The main class code is as follows:


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




###Role Control Script Component

Components are powerful, and scripts inherit from components. For the important attributes and methods, please refer to "Technical Documents - LayaAir3D Scripting Components"

The script component development mode provides us with another way of thinking. Unlike inheritance, it is more flexible and changeable. It can add, remove and combine components at any time to achieve the desired effect, and it can also achieve complete separation of control and display. Developers can try this method for more money.

In this case, we use the script component approach to role control. In the script, we mainly perform the following functions.

1. Get the character animation component of the script for controlling the animation. Get the animation component in the override component _start() method.

2. Character animation, separation of walking, standby and attack methods, role animation to complete event monitoring.

3. Role collision detection. In the script updating method _update(), the role position ray collides with the walking area to determine whether the role is blocked.

4. Character updating. In the script updating method _update(), the rocker angle, attack button and character animation switching are acquired and controlled according to their attributes.

5. The displacement of the camera following the role movement is updated synchronously.

The script code is as follows:


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


For example, characters such as walking go, standing stand, attack play animation, when the script is added to the object, it can be controlled as the protagonist. That's the flexibility of the script.

Compile and run the code to get the demonstration effect of Figure 1.