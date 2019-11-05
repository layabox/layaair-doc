##3D Character Switching and Animation

###3D case analysis and resource preparation

Through the study of technical documents, we have mastered the basic knowledge of 3D game development. Next, we will explain the comprehensive application of 3D technology through examples.

To observe the following example effect (Figure 1), which is similar to the 3D role selection interface in the game, let's first analyze the components of the 3D game world in the example.



 ![图1](img/1.gif)<br> (Fig. 1)



####Combination of 2D Interface and 3D

In this example, the UI part of the interface is edited by LayaAir IDE, including the resource loading progress page and the control UI page in the game. They are made in exactly the same way as 2D games. If you are not familiar with the editing interface of IDE, you can refer to "Technical Documents - LayaAir IDE Chapter".



####3D scene

In the example, the scenario model is produced and exported into FBX in 3ds max, and then imported into unty to edit. There are two main tasks:

One is to create a scene lighting map for editors, which can produce static shadows, lighting color and atmosphere between models. Therefore, it is very important to enhance the art quality of the game.

Second, edit the material of mobile advertising UV animation. It should be noted that material UV animation in 3ds Max is not supported in unty, so it needs to be made in unity.

For the method of making material UV animation unit, see "Technical Document - LayaAir 3D Engine - Animation II of LayaAir3D"



####3D Characters and Skeletal Animation

Both 3D character model and skeleton animation are edited and exported in 3ds max, and then imported into unity to process animation clips, add animation components, etc.

Note that when making skeletal animation in max, it is better to edit a number of actions at one time on the time axis, edit the actions separately and then make the animation by animation connection. After importing unit, erroneous actions and jitter will easily occur.

In this example, several animation links are made. After linking, there are many problems in the animation, such as jitter and intersection of models. It takes a long time to achieve the above effect.

For editing method of skeletal animation unit, see "Technical Document - LayaAir 3D Engine - Animation I of LayaAir3D"



####3D special effects

The halo effect is rigid animation (transform animation: rotation, displacement, zoom). It can be edited and imported into Unity in 3ds max. However, it is recommended that only 3ds Max be used to make models and animation in Unity, because in unty, animation combining material with rigid body can be made, and the effect is better.

The halo effect unit animation is similar to the process and material animation.



After the above 3D resources are produced in Unity, they are exported into four resource folders through LayaAir export tool, namely, scene resource LayaScene_scene02, two role resources LayaScene_girl and LayaScene_boy, and halo special effect resource LayaScene_effect. Copy the resources to the project H5 directory for use.



###Code Implementation of 3D Instance Function

####Implementation of UI Interface Function

Edit the interface in IDE, and set the VaR and name attributes of the elements in the interface for code invocation, such as (Figure 2) (Figure 3).

Notice that the interface resolution is the same as the resolution set in Laya. init (), and the screen adaptation will be correct.

Resource loading progress interface ProgressBar.ui parsing



 ![图2](img/2.png)<br> (Figure 2)

Role Control Button Interface Control.ui Analysis



 ![图3](img/3.png)<br> (Figure 3)

After editing the above interface, resources are exported in IDE, and corresponding packaged resources and UI classes are generated in the project folder. We build two UI display control classes that inherit from them, respectively. The code is as follows:

The progress UI displays the control class ProgressView, in which we use false progress bars (otherwise, if the initial resources are small, the interface will flash by)


```java

package view
{
	import ui.ProgressUI;
	
  	//继承于IDE导出时产生的UI类
	public class ProgressView extends ProgressUI
	{
		private var progress:int=0;		
		public function ProgressView()
		{
			//进度增加的帧循环
			Laya.timer.loop(30,this,onLoop);
		}		
		/**
		 * 资源加载进度模拟（假进度）
		 */		
		private function onLoop():void
		{
			//进度增加
			progress++;
			//最高100%进度
			if(progress>100)
			{
				progress=100;
				this.tips.text="游戏加载完毕，即将进入游戏..."
                //清除所有事件监听，包括帧循环
				Laya.timer.clearAll(this);
                //进度100%后，自动移除界面
				this.removeSelf();				
			}else
			{
                //更新组件显示进度
				this.pro.value=progress/100;
				this.tips.text="游戏正在加载中，当前进度为："+progress+"%!"
			}
		}
	}
}
```




The role control UI displays the control class ControlView, which sends the name of the button currently clicked to the main class by event.


```java

package view
{
	import laya.events.Event;
	
	import ui.ControlUI;
	
	public class ControlView extends ControlUI
	{
		public function ControlView()
		{
			//监听UI鼠标点击事件
			this.on(Event.MOUSE_DOWN,this,onClick);
		}		
		private function onClick(e:Event):void
		{
			//发送点击的组件名称（需在IDE中设置组件的名字）
			this.event("btn_action",e.target.name);
		}
	}
}
```




####Realization of the Combination of 2D and 3D

The Scene class of 3D scene is inherited from the Sprite class of 2D display object, so it can be loaded onto the stage like a 2D display object, and its hierarchy is adjusted by setChildIndex () method to deal with its occlusion relationship with the upper and lower layers of background and interface.

In this example, the resource loading progress interface and the role control interface need to be set to the upper level of the 3D scene. We can use the above method to achieve the code of Laya. stage. setChildIndex (scene, 0). The code of loading interface and scene in the main class is as follows:

```java

	public class Example_roleChange
	{
		/*****3D场景******/
		private var scene:Scene;
		/*****角色控制界面******/
		private var control:ControlView;
      	/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];

		public function Example_roleChange()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//加载2D界面资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onUIComplete));
		}		
		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
          	//加载3D场景与角色资源（根据资源后缀名，会创建默认3D显示对象类型）
			Laya.loader.create([{url:"LayaScene_scene02/scene02.ls"},
								{url:roleArray[0]},	{url:roleArray[1]},	
                                {url:"LayaScene_effect/effect.lh"}
							   ],Handler.create(this,onSceneOK));
          
			//创建角色控制界面
			control=new ControlView();
			Laya.stage.addChild(control);
			
			//创建资源载入界面
			var assetLoad:ProgressView=new ProgressView();
			Laya.stage.addChild(assetLoad); 
		}

		/**
		 * 场景角色加载完成后回调
		 */	
		private function onSceneOK():void
		{
			//创建加载场景
			scene=Laya.loader.getRes("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			//设置场景在2D界面最后（最底层为第0层）
			Laya.stage.setChildIndex(scene,0);
          
          	//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000); 
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(-3, 1.5, 6);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -6, 0, 0), true, false);
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=33;
		}
	}
```


By compiling and running the above code, we can see that after the end of the resource interface, there is a 3D scene, and the control interface is above the 3D scene.

There is material UV animation in 3D scene. After loading. ls, the animation will be loaded and played automatically. If you need to control the animation, you can control the animation according to the following character's animation control mode, first get the animation component, then control it through the animation component.



####Creation and Control of 3D Characters

The most important thing for character animation control is to obtain animation components. Because preloading is used in this example, when creating a character, you can directly obtain it from the character model.
Tips: If you don't use preloading, use Sprite. load () to load asynchronously directly. You need to add listening resources to load events before you can get the animation components, otherwise you will report an error.

**Create roles**

In the main class, add the global attributes related to roles, including current role resources, current role animation components, current role action names, and add the method of creating roles. The code is as follows:


```java

		/*****3D场景******/
		private var scene:Scene;
		/*****3D角色******/
		private var role3D:Sprite3D;
		/*****角色控制界面******/
		private var control:ControlView;
		/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];
		/*****当前场景中角色资源******/
		private var currentRole:String="LayaScene_girl/girl.lh";
		/*****当前角色动画组件******/
		private var roleAni:Animator;
		/*****当前角色动作名******/
		private var currentAction:String="stand";
		/*****3D特效******/
		private var effect3D:Sprite3D;

		......
        /**
		 * 场景角色加载完成后回调
		 */		
		private function onSceneOK():void
		{
            ......
              
			//创建角色
			createRole3D();
		}
		/**
		 * 创建角色并获取动画组件
		 */
		private function createRole3D():void
		{
			//创建角色
			role3D=Laya.loader.getRes(currentRole);
			//获取角色动画组件（.lh格式会把secen当作一层Sprite3D导出，因此组件是在子对象上）
			roleAni=Sprite3D(role3D.getChildAt(0)).getComponentByType(Animator) as Animator;
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onAniComplete);
			//播放上个角色的当前动作
			roleAni.play(currentAction);
			//角色位置
			role3D.transform.position=new Vector3(-3,0,1);
			scene.addChild(role3D);
		}
		/**
		 * 动画播放完成后回调
		 */		
		private function onAniComplete():void
		{
			//如果当前的完成的动画剪辑名为play“击球”
			if(roleAni.currentPlayClip.name=="play")
			{
				//完成击球后播放准备动作动画
				roleAni.play("ready");
				currentAction="ready";
			}
		}
		......
```


In the above code, we also add callbacks after animation playback.`roleAni.on(Event.COMPLETE,this,onAniComplete)`It is basically the same as 2D animation. It refers to the scheduling of an animation clip after playback. It can judge which animation is completed by the name of current PlayClip. name of the current animation clip. It is convenient for developers to edit the game logic.



**Character animation control**

Role control is controlled by clicking on buttons in UI. We add monitor event callback of control interface in main class.`control.on("btn_action",this,onBtnAction)`Control roles.

The role switching method is to change role resources and recreate roles, but when Laya. loader. create () loads resources, roles are created according to type and put into the object pool. Therefore, when the role switching method createRole3D () is called repeatedly, there is no need to worry about performance problems, it will be created directly from the object pool.

Animation switching mainly through animation components to play, stop, switch action. The code modification was added as follows:


```java

		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
          	......
			//创建角色控制界面
			control=new ControlView();
			//监听控制界面按钮信息
			control.on("btn_action",this,onBtnAction);
			Laya.stage.addChild(control);
			......
		}
            
        /**
		 * 控制界面动作监听回调
		 * @param action 当前执行的控制名称
		 */		
		private function onBtnAction(action:String):void
		{
			if(action=="change")
			{
				//切换角色
				changeRole();
			}else if(action=="playAni")
			{
				//播放当前动作
				roleAni.play(currentAction);
			}else if(action=="stopAni")
			{
				//停止动画
				roleAni.stop();
			}else if(action=="stand"||action=="go"||action=="ready"||action=="play")
			{
				//播放动作
				roleAni.play(action);
				currentAction=action;
			}
		}

		/**
		 * 切换角色
		 */		
		private function changeRole():void
		{
			//移除角色
			role3D.removeSelf();
			//移除所有事件监听
			roleAni.offAll();
			//当前角色索引
			var index:int=roleArray.indexOf(currentRole);
			//下一个角色
			index++;
			if(index>roleArray.length-1) index=0;
			currentRole=roleArray[index];
			//创建角色
			createRole3D();
		}
```




####Creation of special effects animation

Special effects animation calls are fairly simple. We don't need to control it here, so we can load it directly into the foot of the character. The code is as follows:


```java

		/**
		 * 创建特效
		 */		
		private function createEffect3D():void
		{
			//创建特效
			effect3D=Laya.loader.getRes("LayaScene_effect/effect.lh");
			scene.addChild(effect3D);
			//特效位置
			effect3D.transform.position=new Vector3(-3,0.01,1.2);
			//特效缩放
			effect3D.transform.localScale=new Vector3(0.15,0.15,0.15);
		}
```


After compiling and running, the effect is shown in Figure 1.



####The final code of the main class


```java

package 
{
	import laya.d3.component.Animator;
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;
	
	import view.ProgressView;
	import view.ControlView;
	
	/**
	 *角色切换示例 
	 */	
	public class Example_roleChange
	{
		/*****3D场景******/
		private var scene:Scene;
		/*****3D角色******/
		private var role3D:Sprite3D;
		/*****角色控制界面******/
		private var control:ControlView;
		/*****角色资源名数组******/
		private var roleArray:Array=["LayaScene_girl/girl.lh","LayaScene_boy/boy.lh"];
		/*****当前场景中角色名******/
		private var currentRole:String="LayaScene_girl/girl.lh";
		/*****当前角色动画组件******/
		private var roleAni:Animator;
		/*****当前角色动作名******/
		private var currentAction:String="stand";
		/*****3D特效******/
		private var effect3D:Sprite3D;
			
		public function Example_roleChange()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
	
			//加载2D界面资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onUIComplete));
		}
		
		/**
		 * 界面资源加载完成后
		 */		
		private function onUIComplete():void
		{
            //加载3D场景与角色资源（根据资源后缀名，会创建默认3D显示对象类型）
			Laya.loader.create([{url:"LayaScene_scene02/scene02.ls"},
								{url:roleArray[0]},	{url:roleArray[1]},	
                                {url:"LayaScene_effect/effect.lh"}
							   ],Handler.create(this,onSceneOK));
			//创建角色控制界面
			control=new ControlView();
			//监听控制界面按钮信息
			control.on("btn_action",this,onBtnAction);
			Laya.stage.addChild(control);
			
			//创建资源载入界面
			var assetLoad:ProgressView=new ProgressView();
			Laya.stage.addChild(assetLoad); 
		}
		
		/**
		 * 场景角色加载完成后回调
		 */		
		private function onSceneOK():void
		{
			//创建加载场景
			scene=Laya.loader.getRes("LayaScene_scene02/scene02.ls");
			Laya.stage.addChild(scene);
			//场景在2D界面最后
			Laya.stage.setChildIndex(scene,0);
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 1000); 
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(-3, 1.5, 6);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -6, 0, 0), true, false);
			//设置摄像机视野范围（角度） 
			camera.fieldOfView=33;
			
			//创建角色
			createRole3D();
			
			//创建特效
			createEffect3D();
		}
		
		/**
		 * 控制界面动作监听回调
		 * @param action 当前执行的控制名称
		 */		
		private function onBtnAction(action:String):void
		{
			if(action=="change")
			{
				//切换角色
				changeRole();
			}else if(action=="playAni")
			{
				//播放当前动作
				roleAni.play(currentAction);

			}else if(action=="stopAni")
			{
				//停止动画
				roleAni.stop();
			}else if(action=="stand"||action=="go"||action=="ready"||action=="play")
			{
				//播放动作
				roleAni.play(action);
				currentAction=action;
			}
		}

		/**
		 * 创建特效
		 */
		private function createEffect3D():void
		{
			//创建特效
			effect3D=Laya.loader.getRes("LayaScene_effect/effect.lh");
			scene.addChild(effect3D);
			//特效位置
			effect3D.transform.position=new Vector3(-3,0.01,1.2);
			//特效缩放
			effect3D.transform.localScale=new Vector3(0.15,0.15,0.15);
		}
		
		/**
		 * 创建角色
		 */
		private function createRole3D():void
		{
			//创建角色
			role3D=Laya.loader.getRes(currentRole);
			//获取角色动画组件
			roleAni=Sprite3D(role3D.getChildAt(0)).getComponentByType(Animator) as Animator;
			//监听动画完成事件
			roleAni.on(Event.COMPLETE,this,onAniComplete);
			//播放上个角色的当前动作
			roleAni.play(currentAction);
			//角色位置
			role3D.transform.position=new Vector3(-3,0,1);
			scene.addChild(role3D);
		}
		/**
		 * 动画播放完成后回调
		 */		
		private function onAniComplete():void
		{
			//如果当前的完成的动画剪辑名为“击球”
			if(roleAni.currentPlayClip.name=="play")
			{
				//完成击球后播放准备动作动画
				roleAni.play("ready");
				currentAction="ready";
			}
		}
		
		/**
		 * 换角色
		 */		
		private function changeRole():void
		{
			//移除角色
			role3D.removeSelf();
			//移除所有事件监听
			roleAni.offAll();
			//当前角色索引
			var index:int=roleArray.indexOf(currentRole);
			//下一个角色
			index++;
			if(index>roleArray.length-1) index=0;
			currentRole=roleArray[index];
			//创建角色
			createRole3D();
		}
	}
}
```




