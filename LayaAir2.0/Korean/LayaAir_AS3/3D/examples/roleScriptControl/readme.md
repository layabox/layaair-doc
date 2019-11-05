##3D 역할 스크립트 제어와 충돌 검사



###수요 분석

본장 과정은 주로 초학자들에게 3D 엔진의 종합 운용을 설명하고 3D 장면의 처리와 가재, 캐릭터 충돌 검사와 애니메이션의 제어 전환 등을 포함해 개발자들에게 RPG 게임의 가장 기초적인 개발 사례를 보여 준다.

기본 수요:

1. 로봇 컨트롤 캐릭터를 통해 장면을 오가며 흔들 컨트롤러가 풀어지자 역할은 이동을 멈추고 대기를 대기한다.
2, 공격 버튼을 통해 캐릭터 공격 애니메이션으로 전환할 수 있다. 버튼을 누르면 최소 한 번의 완정한 공격 애니메이션 을 켜고, 종영 전 애니메이션, 공격 버튼 우선순위는 록이 계속 누르고, 공격 정지 후 이동 애니메이션을 누르고 이동한다.
3, 장면 중 차단이 필요합니다. 어느 지방 캐릭터가 걷지 못하고, 캐릭터가 막힐 때 이동을 멈춰야 합니다.
4, 클론 같은 캐릭터, 두 캐릭터가 동시에 통제되고, 그 중 하나가 정지된 후 다른 캐릭터는 영향을 받지 않는다.

참고 효과 아래 그림 1

![图1](img/1.gif)< br > (그림 1)



###수요의 엔진 기술 방안 분석

1, 록: 2D 엔진 마우스 감청 방식을 사용하여 2D 엔진 엔진 마우스 이벤트를 지원하여 여러 가지 터치 에 적응하여 휴대폰의 여러 가지 복잡한 조작에 적응한다.

2, 역할 컨트롤: Layaiar3D 엔진 지원 구성 요소 개발 모형을 지원하기 때문에 역할 컨트롤은 스크립트 구성 방식을 사용하여 제어와 디스플레이를 효과적으로 조절합니다.

3. 장면: 문서를 작성할 때 3D 엔진의 고급지형 이 완비되어 있어 장경의 가로막은 당분간 행주구 충돌기와 사선 검사 방식으로 판단한다.

미술은 3D 장면에서 하나의 캐릭터를 실행할 수 있는 단독 모형을 만들 수 있다. 그림 2, 내보내면 렌더를 하지 않지만, 코드에서 격격충돌기를 추가해야 한다. 캐릭터 전행 위치와 부딪치는 측면이 생기면, 충돌 정보가 없다면, 충돌 메시지를 걷지 못하고, 충돌 정보 캐릭터가 움직일 수 있다.물론, 반대로 갈 수 있고, 걷는 영역을 모형을 만들어서는 안 된다.

고급 지형 기능이 완비된 후 기술 문서를 상세하게 소개하고 개발자들이 고급 지형을 사용하여 성능이 더 좋다.

![图2](img/2.png)< br > (그림 2)



###록 컨트롤러 및 공격 버튼

진도 페이지와 '기술 문서 — 3D 캐릭터 전환과 애니메이션' 사례 중 인터페이스와 코드 기본 일치로 설명을 하지 않습니다.

록 컨트롤러 및 공격 버튼 인터페이스는 2D, 3D 게임에 통용돼 개발자들은 참고할 수 있다.Layaiair IDE 에서 두 개의 인터페이스를 생성하고 라cker.ui, Attack.ui, Rocker.ui, Rocker.ui 는 터치 그림과 배경 그림 구성, Attack.ui는 하나의 공격 버튼으로 구성되어 있어 다른 기능버튼을 추가하여 확장할 수 있다.인터페이스는 아래도 3, 도 4 와 같다.

![图3](img/3.png)< br > (그림 3)

![图4](img/4.png)< br > (그림 4)



IDE 내보내기 자원을 발표하면 프로젝트 ui 폴더에서 RockerUI.as, AttackUI.as 종류, 우리는 view 폴더를 만들고 RockerView, AttackView 류를 상속시키며 로봇 제어, 공격 논리 코드 를 작성하여 다음과 같습니다:


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




###예시 주류

예주의 종류 중 기본적으로 제어 분야의 논리가 없다. 마찬가지로 장면, 카메라, 캐릭터를 창건한다.예를 들어 불빛을 사용하지 않고 빛으로 스티커를 비추면, 개발자들의 경우 동태빛이 없다면 불빛을 첨가하지 않으면 성능이 높고, 캐릭터 그림자는 투명 스티커를 사용할 수 있다.

장면 은 광경 모형 에서 실행 영역 모형 모형 모브 Area 를 설정할 수 있다`moveArea.meshRender.enable=false`네일렉트릭 충돌기까지 더하면 메시콜리더와 격격격충돌기 검사가 정확하고 모형 자체와 일치하여 펀칭 지역이 검출되지 않을 것이다.물론 성능상 지출이 비교적 클 것이다.

흔들, 공격 버튼 및 카메라 이동량은 정태로 설정되어 캐릭터 제어 스크립트 사용 및 제어.

주 종류 모든 코드 다음과 같습니다:


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




###역할 제어 스크립트 구성 요소

구성 요소 기능은 비교적 강하지만 스크립트가 구성 요소에 상속된다.이 중 중요 속성 과 방법 은 "기술 문서 — Layaiair3D 스크립트 구성 요소" 를 찾아보십시오

스크립트 요소 개발 패턴은 다른 사고방식을 제공하고, 상속과 달리 더 융통성 다변화, 수시로 이동, 그룹 구성 요소를 추가할 수 있으며, Google의 효과에 도달할 수 있으며, 제어와 디스플레이를 철저히 분리시킬 수 있다.개발자들은 이 방법을 많이 보상해 볼 수 있다.

이 예에서 배역은 우리가 스크립트 구성 요소를 사용하는 방법을 제어하고 스크립트에서 우리는 주로 아래의 기능을 수행한다.

1. 스크립트 소속 캐릭터 애니메이션 구성 요소를 제어하기 위해 애니메이션으로 구성된 구성 요소를 전복합니다.

2, 캐릭터 애니메이션, 걷기, 대기, 공격법 분리, 캐릭터 애니메이션 완료 사건 감청.

3. 캐릭터 충돌 검사, 스크립트 업데이트 방법 유update()에서 캐릭터 위치 사선과 행주구 충돌 검사, 캐릭터 차단 여부를 판단한다.

4, 캐릭터 업데이트, 스크립트 업데이트 방법, 유update()에서 흔들 각도, 공격 버튼을 가져와 속성 제어 캐릭터 애니메이션 전환.

5, 카메라는 캐릭터를 따라 이동하는 이동량을 동시 업데이트한다.

스크립트 모든 코드 다음과 같습니다:


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


캐릭터 행진 go, 스탠드, 공격 플레이 애니메이션, 스크립트 가입 대상이 되면 주인공처럼 통제될 수 있다.이것이 바로 각본의 영활한 곳이다

컴파일을 실행하면 그림 1의 시사효과를 얻을 수 있다.