## 3D多场景运用示例

### 多场景的运用

3D场景不仅可以和2D混合使用，同时在舞台上也可以有多个3D场景，并且还能2D中嵌入3D场景，通过场景中的摄像机视口控制显示场景画面的大小和位置。

在游戏中我们经常也会这么运用，例如角色装备属性界面，界面中显示了3D角色的模型与动画，装备栏中更换装备图标后，角色模型还可进行换装变化。

下例中我们对装备属性界面进行了简单模拟（图1），功能为双击屏幕打开装备界面，显示3D角色待机动画及身上装备展示，点击按住界面标题可拖动界面，内部的3D场景、角色也跟随移动。

![图片1](img/1.gif)<br> （图1）



### 开发思路与代码

1、背景为3D主场景，加载游戏场景地图；

2、在IDE中创建一个简单Dialog类型UI（Dialog可以设置拖动）并发布（图2）。建立RolePropView类继承于UI，并且设置为单例模式（大多数UI都为单例）。在界面之中创建添加另一个3D场景用于显示角色，并设置摄像机视口与2D界面大小一致或更小。

![图片2](img/2.png)<br> （图2）

3、界面添加后，鼠标在界面上按下或移动时主场景中摄像机脚本失效，界面移除或鼠标不在界面上按下后有效。可通过脚本组件的enable属性进行设置。

4、添加界面拖动事件监听，拖动界面时，界面场景中摄像机视口ViewPort跟随一起移动（否则3D场景角色会在最初位置）。

主类LayaAir3D_MultiScene参考代码如下：

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

界面类RolePropView，内部创建3D场景、角色、摄像机，参考代码如下：

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

编译运行上述代码，效果如图1。

