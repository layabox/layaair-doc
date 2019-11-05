##3D 다신 운용 사례

###다신 의 운용

3D 장면은 2D와 혼합할 수 있을 뿐만 아니라, 무대에서도 3D 장면도 있고, 2D에서 3D 장면을 포함해 장면의 카메라 시구로 화면의 크기와 위치를 조절할 수 있다.

게임에서 우리는 항상 이렇게 운용할 수 있다. 예를 들면 캐릭터 장비 속성 인터페이스, 인터페이스 3D 캐릭터의 모형과 애니메이션, 장비란에서 장비 아이콘 교체 후 캐릭터 모형은 변환할 수 있다.

다음에는 장비 속성 인터페이스에 대한 간단한 시뮬레이션 (그림 1) 기능을 쌍 스크린으로 장비 인터페이스를 열어 3D 역할 대기 및 체중 장비 전시를 보이며 인터페이스를 누르면 인터페이스를 끌 수 있으며 내부의 3D 장면도 이동한다.

![图片1](img/1.gif)< br > (그림 1)



###사고 및 코드 개발

1, 배경 3D 메인 장면, 게임 배경 지도

2, IDE 에서 간단한 Dialog 유형 UI (Dialog 드라이버 설정) 을 만들고 발표합니다.RolePropview 종류가 UI 계승하고, 단례 모드 (대다수 UI 모두 단례로 설정합니다.인터페이스에 다른 3D 장면을 추가하여 캐릭터를 나타내는 데 쓰이는 데다 카메라의 인터페이스와 2D 인터페이스 크기가 일치하거나 더 작다.

![图片2](img/2.png)< br > (그림 2)

3, 인터페이스 추가 후 마우스가 인터페이스에서 눌렀거나 이동할 때 홈 스크립트가 잘못되면 인터페이스를 제거하거나 마우스가 인터페이스에서 누르지 않으면 유효합니다.스크립트 구성 요소를 통해 설정할 수 있습니다.

4. 인터페이스 드래그 이벤트 감청 추가, 인터페이스의 경우 인터페이스 비디오 Viewport 따라이동(그렇지 않으면 3D 장면 캐릭터가 최초 위치에 있다).

메인 레이어리에이어3Du MultiScene 참고 코드 다음과 같습니다:


```java

package
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Viewport;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	import view.RolePropView;

	/**多场景实例主类***/
	public class LayaAir3D_MultiScene
	{
		/**游戏主摄像机***/
		private var camera:Camera;	
		/**角色装备展示界面***/
		private var roleProp:RolePropView;
		/**主摄像机控制脚本***/
		private var cameraScript:CameraMoveScript;
		
		public function LayaAir3D_MultiScene()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
//			Stat.show();
			//加载3D资源
			Laya.loader.create([{url:"LayaScene_loveScene/loveScene.ls"},
								{url:"LayaScene_girl/girl.lh"}],Handler.create(this,on3DComplete));
		}
		
		private function on3DComplete():void
		{
			//创建场景
			var scene:Scene=Scene.load("LayaScene_loveScene/loveScene.ls");
			Laya.stage.addChild(scene);
			//创建摄像机添加到场景
			camera=new Camera();
			scene.addChild(camera);
			//修改摄像机位置与方向
			camera.transform.translate(new Vector3(0,2,8),true);
			camera.transform.rotate(new Vector3(-23,0,0),true,false);
			//添加摄像机脚本并获取
			cameraScript=camera.addComponent(CameraMoveScript) as CameraMoveScript;		
			
			//加载2D界面资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,on2DComplete));
		}
		
		private function on2DComplete():void
		{
			//双击舞台创建角色属性UI
			Laya.stage.on(Event.DOUBLE_CLICK,this,createRoleUI);
		}
		
		private function createRoleUI():void
		{
			//创建角色属性UI（单例模型，预防打开多个）
			roleProp = RolePropView.getInstance();
			Laya.stage.addChild(roleProp);
			//界面拖动事件监听
			roleProp.on(Event.DRAG_MOVE,this,onDragMove);
			//鼠标在界面上按下时摄像机控制脚本失效
			roleProp.on(Event.MOUSE_DOWN,this,onScriptFalse);
			
			//界面移除或鼠标抬起后摄像机脚本启用
			roleProp.on(Event.REMOVED,this,onScriptTrue);	
			Laya.stage.on(Event.MOUSE_UP,this,onScriptTrue);
		}
		
		/**界面拖动回调****/		
		private function onDragMove():void
		{
			//摄像机控制脚本失效
			onScriptFalse();
			//界面中摄像机视口跟随移动
			roleProp.camera.viewport=new 	
              Viewport(roleProp.x,roleProp.y,roleProp.width,roleProp.height);
		}
		
		/**摄像机控制脚本启用****/	
		private function onScriptTrue():void
		{
			//摄像机控制脚本启用
			cameraScript.enable=true; 
		}
		/**摄像机控制脚本失效****/	
		private function onScriptFalse():void
		{
			//摄像机控制脚本失效
			cameraScript.enable=false;
		}
	}
}
```


인터페이스 RolePropView, 내부 3D 장면, 캐릭터, 카메라, 참고코드 다음과 같습니다:


```java

package view
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Viewport;
	import laya.events.Event;
	
	import ui.RolePropUI;
	
	/**
	 * 角色装备UI界面（包括3D场景与角色）
	 */	
	public class RolePropView extends RolePropUI
	{
		/**界面实例***/		
		private static var instance:RolePropView;
		/**界面中的3D场景***/
		private var UIScene:Scene;
		/**界面中的摄像机***/
		public var camera:Camera
		/**界面中的3D角色***/
		private var role:Sprite3D;
		
		/**界面中在舞台水平居中位置***/
		private var xx:Number=0;
		/**界面中在舞台垂直居中位置***/
		private var yy:Number=0;
		
		/**
		 * 角色装备UI界面单例方法
		 */
		public static function getInstance():RolePropView
		{
			if(instance==null) 	instance=new RolePropView();
			return instance;
		}
		
		public function RolePropView()
		{
			//设置UI位置为居中显示
			xx=(1280-this.width)/2; 
			yy=(720-this.height)/2;
			this.pos(xx,yy);
			
			//与UI搭配的3D场景
			UIScene=new Scene();
			this.addChild(UIScene);
			
			//在对话框中，鼠标可点击触发拖动的区域
			this.dragArea="0,0,520,80";
			
			//创建角色
			role=Laya.loader.getRes("LayaScene_girl/girl.lh");
			UIScene.addChild(role);
			//修改角色位置（超出摄像机视口后将不会显示）
			role.transform.translate(new Vector3(0,0,0),false)
			
			//创建摄像机
			camera=new Camera();
			UIScene.addChild(camera);
			//设置摄像机视口大小与UI一致
			camera.viewport=new Viewport(xx,yy,this.width,this.height);
			//摄像机位置
			camera.transform.translate(new Vector3(0,1.2,3),false);
			//关闭按钮事件监听
			this.btn_close.on(Event.MOUSE_DOWN,this,onClose);
			
		}
		
		/**关闭按钮事件回调***/		
		private function onClose():void
		{
			//移除UI界面
			Laya.stage.removeChild(this);
			//恢复UI位置为居中显示
			this.pos(xx,yy);			
			//恢复摄像机视口大小与位置
			camera.viewport=new Viewport(xx,yy,this.width,this.height);
		}
	}
}
```


상술한 코드를 편집해서 실행하려면 효과 1과 같습니다.

