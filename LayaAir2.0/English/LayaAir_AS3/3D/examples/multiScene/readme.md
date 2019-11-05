##3D multi scene application example

###Application of multi-scene

Not only can 3D scenes be used in combination with 2D, but also there can be multiple 3D scenes on the stage. Moreover, 3D scenes can be embedded in 2D, and the size and location of scene pictures can be controlled by the camera viewport in the scene.

In games, we often use this method, such as the role equipment attribute interface, which shows the model and animation of 3D characters. After replacing the equipment icon in the equipment bar, the role model can also be changed.

In the following example, we simulate the equipment attribute interface (Fig. 1). The function is to double-click the screen to open the equipment interface, display the 3D character waiting animation and the equipment display on the body, click and hold the title of the interface to drag the interface, and the internal 3D scenes and roles follow the movement.

![图片1](img/1.gif)<br> (Fig. 1)



###Development ideas and codes

1. The background is 3D main scene, loading game scene map;

2. Create a simple Dialog type UI in the IDE (Dialog can set drags) and publish it (Figure 2). Create a RolePropView class that inherits from the UI and is set to the singleton mode (most UIs are singletons). Create another 3D scene in the interface to display roles, and set the camera viewport to be the same size or smaller as the 2D interface.

![图片2](img/2.png)<br> (Figure 2)

3. After the interface is added, when the mouse is pressed or moved on the interface, the camera script in the main scene fails, and the interface is removed or the mouse is not pressed on the interface. The enable property of the script component can be set.

4. Adding interface drag event monitoring, dragging interface, the camera viewport in the interface scene moves with it (otherwise the 3D scene character will be in the initial position).

The main class LayaAir3D_MultiScene reference code is as follows:


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


The interface class RolePropView creates 3D scenes, roles and cameras internally. The reference code is as follows:


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


Compile and run the above code, the effect is shown in Figure 1.

