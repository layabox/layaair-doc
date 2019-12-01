##Exemples d 'application multiscène 3D

###Application de scénarios multiples

La scène 3D peut être utilisée non seulement en combinaison avec la scène 2D, mais aussi en plusieurs scènes 3D sur la scène, et peut également être incorporée dans la scène 2D pour contrôler la taille et l 'emplacement de l' image de scène affichée par l 'intermédiaire de la vue caméra de la scène.

On l 'utilise aussi souvent dans les jeux, par exemple dans les interfaces d' attributs de l 'équipement de rôle, où sont affichés des modèles et des animations de personnages 3D, et où les modèles de personnages peuvent être modifiés après le remplacement des icônes d' équipement dans la barre d 'équipement.

Dans l 'exemple suivant, nous avons procédé à une simulation simple de l' interface d 'attribut de l' équipement (fig. 1), fonctionnant pour ouvrir l 'interface de l' équipement en double cliquant sur l 'écran, afficher l' animation de personnages 3D en attente et l 'affichage de l' équipement sur le corps, cliquer sur le titre de l 'interface pour faire glisser l' interface et déplacer la scène 3D interne, le personnage suivi.

![图片1](img/1.gif)< br > (Figure 1)



###Development Thought and Code

Arrière - plan de la scène principale en 3D, chargez la carte de la scène de jeu;

Créer un simple type de dialog ui (dialog peut paramétrer les glissières) dans l 'IDE et le publier (fig. 2).Crée la classe rolepview héritée de l 'ui et configure celle - ci en un seul mode (la plupart des ui sont des exemples uniques).Crée une autre scène 3D dans l 'interface pour afficher un rôle et définit une fenêtre de caméra dont la taille est égale ou inférieure à celle de l' interface 2D.

![图片2](img/2.png)< br > (Figure 2)

Après ajout d 'interface, le script de caméra est désactivé lorsque la souris est enfoncée ou déplacée sur l' interface et que l 'interface est retirée ou que la souris n' est pas enfoncée sur l 'interface.Les paramètres peuvent être définis par les propriétés enable de l 'ensemble script.

Ajoutez une interface pour faire glisser l 'événement, et faites glisser l' interface, l 'écran de caméra viewport se déplace en même temps que la scène d' interface (sinon le rôle de scène 3D sera dans sa position initiale).

Le Code de référence principal layaair3d \ \ u multiscene est le suivant:


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


Rolepropview, catégorie d 'interface, création interne de scène 3D, rôle, caméra, Code de référence, comme suit:


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


Compiler et exécuter le code ci - dessus, avec les résultats indiqués à la figure 1.

