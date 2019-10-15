#Play animation

###### *version :2.1.0beta   Update:2019-6-13*

####Getting animation components

Copy the exported resource to the project`bin/res`Under the directory, the role resources are loaded through code. If loaded directly into the scene, you will find that the animation will play automatically. How do we control the playback of animation?

The Prite3D class of LayaAir 3D engine provides`getComponent()`Method to get the components on the model. Animator animation component is given by default by the engine when the animated model is loaded and created, so we can get it, refer to the following code.


```typescript

//获取角色动画组件
var ani= role3D.getChildAt(0).getComponent(Laya.Animator);
```


Open the. LH file to view, and the animation component is bound to the sub-object of the model, so it uses`getChildAt(0)`Get the sub-object model through it. Then pass`getComponent(Laya.Animator)`Method Get the animation component.

**Tips: Sometimes in. LH or. LS files, there are multiple parent-child hierarchies. It's impossible for animation components to be on the first level, maybe on the second level, maybe on the third level. Most of the levels of animation components are agreed with art in advance. After confirming the hierarchy, we can get the model through getChildAt (), or getChildByName (), and then get the animation component.**

Another alternative is to open. LS or. LH to see the hierarchical relationship of the animated component model before acquiring the animated component, and then to get the model and the animated component.

####Playback control

How can you play only one action when you get the animation component? There are two ways to control and switch actions.

And in this example, the animation is not split in Unity. We use the default animation of the model.**Take 001**The plug-in only exports an animation parsing file in. LaNi format.

Therefore, in order to control the playback of one of the animations, we need to add custom animation clips in the code, and set the start and end frame rates in the animation clips.

View Animator Animation Components`play() `METHODS The specific parameters of the method are as follows:

![] (img/1.png)<br> (Figure 1)

If you need to play a frame of animation to a frame, you can create additional animation state (fragments) based on the original animation.`AnimatorState`The latest Animator class provides`addState() `Instance method, which allows developers to create animation clips and define names, and then play through the play (animation clip name) method. After that, let's play the animation. The code is as follows:

**Whether the animation cycle can be checked in the animation properties of the Unity editor, and the engine will follow its settings for animation playback after export. See loop time selection boxes in Figures 5 and 6! Or create an AnimatorState animation status setting isliooping property to true**


```typescript

//获取精灵
var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
this.scene.addChild(monkey);
//获取角色动画组件
var ani = monkey.getChildAt(0).getComponent(Laya.Animator);
//创建一个动画动作状态
var state1 = new Laya.AnimatorState();
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
this.ani.addState(state1);
//播放动画
this.ani.play("hello");
```


After compiling and running, the effect is as follows: only 10-20 frames of Stand stand animation clips are played in a loop.

![] (img/2.gif) <br> (Figure 2)

####Define animation clip playback in Unity

Unity can segment the animation and name the clip. When the exported resources are controlled, they can be animated by name, which is convenient for developers to use. (This method increases the number of Http accesses by adding animation parsing files when resources are exported. Developers can choose which method to use according to the actual situation.)

The segmentation method of animation fragments in unit is as follows:

1) Select the model file in Resource Manager, on the right**Inspector**Selection in Interface**Animations**The default animation appears**Take 001**Click to edit the custom name, click the plus sign to add the animation fragment, and modify the start and end frames of the fragment (Figure 3).

Tips: If you want to play animation in the game, please check the figure below.**Loop Time**Options.

![] (img/3.png) < br > (fig. 3)

In this example, a total of four actions, according to the number of animation frames provided by the art, are modified and increased to four animation fragments (Figure 4).

![] (img/4.png)<br> (Figure 4)

After the modification, the corresponding animation files will be added to the resource manager model, so the animation controller needs to be modified to add the newly generated animation fragments to the animation controller, otherwise the complete animation resource parsing file can not be exported (Fig. 5).

![] (img/5.png)<br> (Fig. 5)

After completing the above steps, we re-export and generate 4. Lani animation parsing files in the exported resources.

Modify the sample code and use the way of playing the animation name. The effect is as follows (Figure 6).


```typescript

onComplete(){
.................     
		var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        //加载到场景
       	scene.addChild(monkey);
        //让摄影机指向角色
        camera.transform.lookAt(monkey.transform.position,new Laya.Vector3(0,1,0));
    	//获取动画组件
    	var ani = monkey.getComponent(Laya.Animator);
		//播放攻击状态
        ani.play("attack");
		//等待动画播放完成
        Laya.timer.frameLoop(1,this,function(){
            //如果当前播放state已经播放完了一次
            if(ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                //回到站立状态
                ani.play("stand");
            } 
        });
}

```


![] (img/6.gif) < br > (fig. 6)
