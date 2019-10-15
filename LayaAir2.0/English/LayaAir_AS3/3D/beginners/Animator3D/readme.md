#                   Laya2.0模型动画的使用

In Laya 2.0, the 3D model animation has been deeply modified and optimized, resulting in some functions different from the use of 1.0 or adding deletion interfaces, etc. This document is a summary of the problems of suspension of monitoring events in the playback of 3D model animation, which has received more feedback from developers recently.

###I. The pause of animation

In 1.0, our 3D system's active pause for animation playback is based on skinani. Player. Stop (); this stop method directly pauses animation. In 2.0, we modified the playback speed parameters of 3D animation to optimize! Developers can use the playback speed of animation directly to control the pause and playback of animation, so we canceled the stop method in 1.0.

2.0 3D animation pause changed to Animator. speed = 0; Figure 1


```javascript

//添加蒙皮动画角色模型
Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
//加载到场景
var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
//让摄影机指向角色
camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
//获取角色动画组件
var ani:Animator = hero.getChildAt(0).getComponent(Animator);
ani.speed = 0;//暂停动画播放	
}));
```


(Fig. 1)

###Second, the broadcast of animation listening events!

In the use of 3D character animation, we often monitor the animation playing status of a character to achieve the desired attack or walking effect! In 2.0, we present two new ways to monitor animation.

#####1. Percentage of current animation play

![1](img/1.png)  


(Fig. 2)

#####When the animation is non-circular

If the comment is the same as the animation is**Non circulation**When playing, the normalized Time will return a number of 0.0-1, which means that the current animation has been played to 100% or has been played. This number can be understood as the percentage of the current animation playing, and 0.1 is the current 10%.

##### **When the animation is played in a loop**

This value will be + 1 after each playback, that is, how many times has the integer bit finished playing the current playback animation, and the decimal bit is the percentage of the current playback animation. For example, if the circular animation is played three times, the number should be 3.0. When the fourth time is played half, the number should be 3.5.

After understanding the meaning of the return value, we can animate the status monitoring example based on the return value: Figure 3

The animation I monitor is a circular animation. When the animation reaches 60% to 50%, I make the character generate a box.


```javascript

	public class LayaAir3D {
		public var box :MeshSprite3D;
		public var scene:Scene3D;
		public var weaponIsClone:Boolean = false;
		public var heroAni:Animator;
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			scene = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			//添加照相机
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			camera.transform.translate(new Vector3(0, 3, 3));
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			camera.clearColor = null;

			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

			box = new MeshSprite3D(new BoxMesh(0.3,0.3,0.3));

			Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
				var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
				hero.getChildAt(0).addChild(box);
				heroAni = hero.getChildAt(0).getComponent(Animator)
				heroAni.linkSprite3DToAvatarNode("Dummy002",box);
				
				Laya.timer.frameLoop(1,this,onFrame)
			}));
		}
		private function onFrame():void{ 
		trace(heroAni.getCurrentAnimatorPlayState(0).normalizedTime);
		//当动画播放到百分之五十到六十之间时进行克隆
		if (0.6>(heroAni.getCurrentAnimatorPlayState(0).normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0).normalizedTime))>0.5)
			{
				if(weaponIsClone)return;
				trace("sssssss")
				//克隆模型（位置，矩阵，等信息全被克隆）
				var weaponClone:Sprite3D = Sprite3D.instantiate(this.box);
				//为模型添加在定义脚本
				weaponClone.addComponent(WeaponScript);		
				//把克隆的武器放入场景中
				scene.addChild(weaponClone);
				weaponIsClone = true;
			}
			else if ((heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.98)
			{
				weaponIsClone = false;
			}
			
		}
	}
```


(Fig. 3)

###3. Setting Animation Events in Unity

In Unity's animator, we can add the animation trigger event AAA as shown in Figure 4.

This event means that when the animation is played to this location, it will trigger the method of our AAA name.

Set up the event in Unity, Apply it, and finally export the animation model.

![2](img/2.png) 


(Fig. 4)

In laya, we can create a script to receive this event method.

First, we create a script in laya. The script name does not affect the trigger of the event, so we name it randomly. In the script, we create a method named AAA. The method name should be the same as the event name set in unit, as shown in Figure 5.

![3](img/3.png) 


(Fig. 5)

Then we just need to add the script to the animation node (* must be the animation node, which is the object node where you hang the animator component in the unit *) as shown in Figure 6.

![4](img/4.png) 


(Fig. 6)