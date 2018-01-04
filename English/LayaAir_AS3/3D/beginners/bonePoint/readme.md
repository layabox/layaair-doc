## LayaAir3D skeletal bone point

### Skeletal bone point overview

Skeletal bone points are commonly used in the binding of 3D models to bones. For example, the weapon moves with the movement of the hand, so we can bind the weapon to the skeleton of the hand as the sub level of the hand skeleton.

The binding 3D model can also be used to remove the binding or replace the 3D model by code, which also implements the reloading function of weapons or equipment.



### Setting up skeletal bone points in Unity

Bone hanging points are very convenient to set up in Unity, which can be operated directly in the resource level of the scene. The following diagram (Figure 1)

The object needs to be bound can be a 3D container, or just a 3D model, adjust their position, put them into the designated as a sub level skeleton hanging point binding is successful, the animation, we can find that it follows the change of skeletal animation.

Sometimes, we need no weapons in the beginning, in order to prepare for the future for weapons for customize or upgrade characters, we can also add an empty container node GameObject in the bone, and then when you need to add different 3D models or multiple models.

![图1](img/1.png)<br>（Figure 1）

**Tips: when our skeleton hang points are set up, skeletons and hanging objects will be automatically exported to.Ls or.Lh files. We can get them through getChildByName () method. But you have to pay special attention: if the skeleton hanging point only when bound to the empty container object, used after dynamically add sub object, then it can't check the GameObject Setting Null Game Objects Ignore ignore empty node set in the export plug-in, otherwise empty container hanging point object will not be exported to.Ls or.Lh.**  



### Implement bone hanging point in code

In general, we all add bone hanging points in Unity. But the LayaAir engine also provides the way to hang the code to add and remove the bones of the skeleton flexibly.

The Animator animation component class provides two instance methods **linkSprite3DToAvatarNode()** and **unLinkSprite3DToAvatarNode()** to enable attachment and removal of hanging points (Figure 2, Figure 3).

Tips：Before the code is added to the skeleton animation, you need to provide the name of the bone node that needs to be associated with the skeleton.

![图2](img/2.png)<br>（figure 2）

![图3](img/3.png)<br>（figure  3）

The specific code reference is as follows:

Get a Skeletal Animation Model from a Scene - Get a Model's Animation Component - Create a Drop Point Object - bind the skeleton and the point object through the animation component.

```typescript
  //从场景中获取动画模型
  var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
  //获取动画模型中动画组件
  var monkeyAni:Animator=monkey.getComponentByType(Animator) as Animator;

  //需要挂点的3D对象
  var box:MeshSprite3D=new MeshSprite3D(new BoxMesh(1,1,1));
  //将3D对象加载到scene中（一定要加入到场景）
  scene.addChild(box);
  //将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
  monkeyAni.linkSprite3DToAvatarNode("RHand",box);

  //将挂点物品从骨骼上移除（美术提供骨骼的名称）
  //monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```



### Example of application of bone hanging point

Let's demonstrate the use of bone hangs for you with a simple example of a magic attack (Figure 4).

![图4](img/4.gif)<br>（Picture 4）

First of all, as shown in Figure 1, in Unity, we set the magic node of the child node level of the right-handed skeleton in the Unity, change the name of the right-handed skeleton to “RHand”, the magic aperture is “weapon”, and export it into the.Ls resource file. After exporting, we can find that the hand skeleton and the aperture appear in the sublevel file of the model (Figure 5), wwhich can be retrieved by name when needed.

![图5](img/5.png)<br>（figure 5）

Magic attack in accordance with Figure 4 effect can be achieved through two classes, one is the main class Laya3D_BonePoint.as, used to achieve the animation player and generate magic weapon, the program is: in the attack animation to 36 frames or so, cloned a The same new magic weapon hanging point weapons, and add a weapon script for flight, the original point of hanging weapons temporarily hidden, the animated playback is complete and then re-display, to produce magic and throw magic effect.

WeaponScript WeaponScript.as Magic flying and destruction. All the code is as follows:

```typescript
package
{
	import laya.d3.component.Animator;
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.display.Sprite;
	import laya.display.Stage;
	import laya.events.Event;
	import laya.utils.Handler;
	import laya.utils.Stat;

	public class Laya3D_BonePoint
	{
		public var scene:Scene;		
		/**角色动画组件**/	
		public var monkeyAni:Animator;
		/**骨骼挂点绑定的武器**/		
		public var weapon:Sprite3D;
		/**武器克隆**/	
		public var weaponClone:Sprite3D;
		/**武器是否已克隆**/
		private var weaponIsClone:Boolean=false; 		
		
		public function Laya3D_BonePoint()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;			
			//开启统计信息
			Stat.show();
			
			//加载3D资源
			Laya.loader.create("LayaScene_monkey/monkey.ls",Handler.create(this,onComplete));
		}
		
		//资源加载完成回调
		private function onComplete():void
		{
			//创建场景
			scene=Laya.loader.getRes("LayaScene_monkey/monkey.ls");
			Laya.stage.addChild(scene);
			
			//从场景中获取动画模型
			var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
			//获取动画模型中动画组件
			this.monkeyAni=monkey.getComponentByType(Animator) as Animator;
			
			//获取挂点骨骼(Unity中设置的挂点骨胳会被导出，可获取)
			var handBip:Sprite3D=monkey.getChildByName("RHand") as Sprite3D;
			//获取挂点的武器模型
			this.weapon=handBip.getChildByName("weapon") as Sprite3D;
		 
			//监听动画完成事件
			this.monkeyAni.on(Event.COMPLETE,this,onAniComplete);
			
            //帧循环，用于监控动画播放的当前帧
			Laya.timer.frameLoop(1,this,onFrame);
		}
		
		private function onAniComplete():void
		{
			//动画播放完成后武器激活显示
			this.weapon.active=true;
			//动画播放完成后，设置为未克隆，方便下次克隆新武器
			this.weaponIsClone=false;
		}		
			
		//在攻击动画播放到一定帧时，克隆一个新武器特效
		private function onFrame():void
		{
			//在动画35-37帧之间时克隆一个飞出的武器
			//（不能用==35帧方式，帧率不满时可能跳帧，导致克隆失败。后期版本将支持帧标签事件，可解决此问题）
			if(this.monkeyAni.currentFrameIndex>=35&&this.monkeyAni.currentFrameIndex<=37)
			{
				//确保在35-37帧之间只克隆一次
				if(this.weaponIsClone) return;
				//克隆新武器（模型、位置、矩阵等全被克隆）
				var weaponClone:Sprite3D=Sprite3D.instantiate(this.weapon);
				//为武器特效添加脚本
				weaponClone.addComponent(WeaponScript);
				//将克隆武器放入场景中
				scene.addChild(weaponClone);				
				//设置为已克隆
				this.weaponIsClone=true;				
				//隐藏原始武器
				this.weapon.active=false;
			}
		}		
	}
}
```

```typescript
package
{
	import laya.d3.component.Script;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	
	/**
	 * 武器脚本(飞行与销毁)
	 */	
	public class WeaponScript extends Script
	{
		/**被脚本绑定的武器**/
		public var weapon:Sprite3D;
		/**武器生命周期**/
		public var lifeTime:int=100;
		
		public function WeaponScript()
		{
			super();
		}
		
		//获取绑定对象
		override public function _load(owner:ComponentNode):void
		{
			this.weapon=owner as Sprite3D;
		}
		
		//覆盖组件更新方法，实现武器帧循环
		override public function _update(state:RenderState):void 
		{
			//武器旋转更新
			weapon.transform.rotate(new Vector3(2,2,0),true,false);
			//武器移动更新
			weapon.transform.translate(new Vector3(0,0,0.2),false);
			//生命周期递减
			lifeTime--;
			if(lifeTime<0)
			{
				lifeTime=100;
				//直接销毁脚本绑定对象会报错（对象销毁后脚本还会更新一次，报找不到绑定对象错误），
                //因此延迟一帧以销毁
				Laya.timer.frameOnce(1,this,function(){weapon.destroy();});
			}
		}		
	}
}
```