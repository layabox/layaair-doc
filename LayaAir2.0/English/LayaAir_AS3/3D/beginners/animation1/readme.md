##Animation I of LayaAir3D

At present, LayaAir3D engine has made a lot of adjustments to the animation part. Although the old version of the animation has been retained, it is recommended that developers use new animation components. The new animation Animator component integrates several types of old animation, and saves development time without classifying. It includes skeleton animation, material animation, rigid animation, camera animation and so on.

Animator animation component supports animation exported by unit. After importing unit, skeleton animation model can be integrated edited. Material animation and rigid animation can be edited directly in unit, and then exported and used.



###Character skeleton animation

Skeletal animation of character skins is widely used in 3D games. The animation model of character can be imported into unit to edit, and then exported to LayaAir for use.

####Animation Editing Steps in Unity

1. Import model. In Unity Explorer, right-click Import New Assets FBX format model resources, mapping resources, and drag the model to the scene, adjust the texture map and save it. In this case, save the scene named "monkey".

2. Create an animation controller. In Unity Explorer, right-click Create Animator Controller and name it according to the animation. In this case, it is called monkey Action.

3. Edit animation controller. Double-click to open the animation controller, the view area will appear animation controller editing interface; click on the right side of the imported model "triangle", where the "playback flag" file is the animation file of the model, the default name is "Take 001", drag it to the animation controller editing interface (Figure 1), and save it.

![图片1](img/1.png)<br>

(Fig. 1)

4. Binding animation controller. Select the role model in the scene and assign the role animation controller to the animation component of the selected model (Figure 2). If there is no animation component, it needs to be added, otherwise the derived animation cannot be played.

![图片2](img/2.png)<br> (Figure 2)

After the above steps, we finished editing the character animation in unit, click the button to run in unit, then we can see the animation playing. If there is no problem with animation playback, you can export the resources required by LayaAir according to the previous "Unity Plug-in Tools Use" tutorial method.

**Tips: Other animations are processed in the same way in Unity. The following steps are needed: adding animation components to scene models - creating animation controllers - adding animation controllers to animation controllers - adding animation controllers to animation components of models.**



####Realization of Character Animation in LayaAir

The exported resources are copied into the project H5 directory, and the role resources are loaded through the code. After creation, the animation is automatically played and looped (Figure 3). The reference code is as follows


```java

package {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.webgl.resource.Texture2D;
	import laya.utils.Handler;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;
			
			//添加照相机
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			camera.transform.translate(new Vector3(0, 3, 3));
			camera.transform.rotate(new Vector3( -10, 0, 0), true, false);
			camera.clearColor = null;

			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
		    //添加蒙皮动画角色模型
			Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
				//加载到场景
				var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
				//让摄影机指向角色
				camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
			}))
		}		
	}
}
```


![动图3](img/3.gif)<br> (Figure 3)



####Control and Decomposition of Character Animation

**Getting animation components**

Through the example above, we can see that the animation is automatically played. The animation includes several actions. So how to control the animation playing? First, we need to get the animation components on the model, then we can control the playback, stop and so on.

The Sprite3D class of the 3D model of the LayaAir 3D engine provides a getComponentByType () method to obtain components on the model. Animator animation component is given by default by the engine when the animated model is loaded and created, so we can get it, refer to the following code.

Open the. LH file to see that the animation component is bound to the sub-object of the model, so "getChildAt (0)" is used to get the sub-object model through it. Then get the animation component by getComponentByType (Animator) method


```java

//获取角色动画组件
var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;
```


**Tips: Sometimes in. LH or. LS files, there are multiple parent-child hierarchies. It's impossible for animation components to be on the first level, maybe on the second level, maybe on the third level. Therefore, before acquiring animation components, you can open. LS or. LH to see the hierarchical relationship of animation component models, and then get the models through getChildAt (), or getChildByName (), etc., before acquiring animation components. Otherwise, the program will report errors!!**



**Playback control**

With animation components, how can you play only one action? There are two ways to control and switch actions.

####1. Code Definition Animation Clip Play

In the example above, the animation is not split in Unity. We use the default animation Take 001 of the model. The plug-in only exports an animation parsing file in. LaNi format.

Therefore, in order to control the playback of one of the animations, we need to add custom animation clips in the code, and set the start and end frame rates in the animation clips.

Look at the play () method in the Animator animation component. The specific method parameters are as follows:

**Tips: After version 1.7.10, play () method cancels loop, start frame rate and end frame rate parameters. Whether the animation is circular or not, please check the settings in the animation properties of Unity Editor. After export, the engine will follow its settings for animation playback. See loop time selection boxes in Figures 5 and 6!**


```java

/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
 
```


**If you want to play a frame of an animation to a frame, you can create an Animation Clip based on the original animation. The latest Animator class provides an example method of addClip (), which allows developers to create an animation clip and define its name, and then play through the play (animation clip name) method.**


```java

//创建一个动画动作状态
    var state1:AnimatorState = new AnimatorState();
    //设置动作状态的名称
    state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
    state1.clipStart = 10/40;
    //设置动作状态播放的结束时间
    state1.clipEnd = 20/40;
    //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
    state1.clip = ani.getDefaultState().clip;
    //动画播放是否循环
    state1.clip.islooping = true;
    //添加动画状态到动画组件里
    ani.addState(state1);
    //播放动画
    ani.play("hello");
```


The code in the modification example is as follows:


```java

//添加蒙皮动画角色模型
Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
	//加载到场景
	var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
    //让摄影机指向角色
    camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
        //获取角色动画组件
        var ani:Animator = hero.getChildAt(0).getComponent(Animator);
    // ani.play("fly");

    //创建一个动画动作状态
    var state1:AnimatorState = new AnimatorState();
    //设置动作状态的名称
    state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
    state1.clipStart = 10/40;
    //设置动作状态播放的结束时间
    state1.clipEnd = 20/40;
    //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
    state1.clip = ani.getDefaultState().clip;
    //动画播放是否循环
    state1.clip.islooping = true;
    //添加动画状态到动画组件里
    ani.addState(state1);
    //播放动画
    ani.play("hello");
}));
```


After compiling and running, the effect is as follows: only 10-20 frames of Stand stand animation clips are played in a loop.

![动图4](img/4.gif)<br>（图4）







####2. Define animation clip playback in Unity

Unity can segment the animation and name the clip. When the exported resources are controlled, they can be animated by name, which is convenient for developers to use. (This method increases the number of Http accesses by adding animation parsing files when resources are exported. Developers can decide which method to use according to the situation.)

The segmentation method of animation fragments in unit is as follows:

1) Select the model file in "Resource Manager" and select Animations in the inspector interface on the right. The default animation Take 001 appears. You can click to edit the custom name, click the plus sign to add the animation fragment, and modify the start and end frames of the fragment (Fig. 5).

Tips: If you want to play animation in the game, please check the "Loop Time" option in the figure below.

![图5](img/5.png)<br>(Figure 5)

In this example, a total of four actions, according to the number of animation frames provided by the art, are modified and increased to four animation fragments (Figure 6).

![图6](img/6.png)<br> (Fig. 6)

2) After the modification, the corresponding animation files will be added to the resource manager model, so the animation controller needs to be modified to add the newly generated animation fragments to the animation controller, otherwise the complete animation resource parsing file can not be exported (Figure 7).

![图7](img/7.png)<br> (Figure 7)

After completing the above steps, we re-export and generate 4. Lani animation parsing files in the exported resources.

Modify the sample code and use the way of playing the animation name. The effect is as follows (Figure 8).


```java

Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
    //加载到场景
    var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
    //让摄影机指向角色
    camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
    //获取角色动画组件
    var ani:Animator = hero.getChildAt(0).getComponent(Animator);
}));
//监听默认动画完成后播放站立动画
ani.on(Event.COMPLETE,this,onAniComplete,[ani]);
//播放攻击动画
ani.play("attack");
/***当前动画播放完成后回调***/
private function onAniComplete(ani:Animator):void
{
  //切换站立动画
  ani.play("stand");
}
```

![图8](img/8.gif)<br> (Figure 8)


