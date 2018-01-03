## Animation with LayaAir3D (part 1)

At present, the LayaAir3D engine has made a lot of adjustments to the animation part, although the old version of the animation has been retained, but it is recommended that developers use the new animation component mode. The new animation Animator component integrates several types of old animation, without classification to create, save the development time, including skeletal animation, material animation, steel animation, camera animation, etc..

Animator animation component supports unity export animation, skeletal animation model can be integrated and edited after importing unity, material animation, steel body animation can be directly edited in unity, and then exported to use.



### Character skeleton animation

The game character skinning skeleton animation is widely used in 3D games. The character animation model can be imported into unity and edited, and then exported to LayaAir.

#### Animation editing steps in unity

1. Import model. In the unity explorer, right-click the (Import New Assets) FBX format model resources, map resources, and drag the model to the scene, adjust the texture map and save, in this case, save the scene name “monkey”。

2. Creating animation controllers. In the unity explorer, right-click the menu to create (Create) animation controller (Animator Controller), and named according to animation, this example named "monkeyAction"。

3. Edit animation controller. Double-click to open the animation controller, the view area will appear animation controller edit interface; point open import the right side of the model “small triangle”，In which the “play mark” file is the animation file of the model, the default name is “Take 001”, drag it to the animation controller editing interface (Figure 1), and save it.

![图片1](img/1.png)<br>

（Picture 1）

4. Bind animation controller. Select the role model in the scene, and assign the role animation controller to the animation component of the selected model (Figure 2). If there is no animation component, you need to increase, otherwise the derived animation can not be played.

![图片2](img/2.png)<br>（Picture 2）

Through the above steps, we completed the role animation in unity editing, click the unity button, then we can see the animation played. If there is no problem with animation playback, you can export the required resources for LayaAir by using the "unity plug-in tool" tutorial method.

**Tips：Other animations are handled the same way in unity, which requires the following steps: adding animated components on the scene model - creating animation controllers - adding animation to the animation controller - adding animation controllers to the animation component of the model**



#### Realization of the character animation

Exported in the resource copy to the project h5 directory, through the code to load the role of resources, will automatically play the animation created and loop (Figure 3), the reference code is as follows

```typescript
// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //预加载角色动画资源
        Laya.loader.create("monkey/monkey.lh",Laya.Handler.create(this,this.onModelOK),null,Laya.Sprite3D);
    }
    private onModelOK():void{
        //添加3D场景
        var scene:Laya.Scene = new Laya.Scene();
        Laya.stage.addChild(scene);
        //创建摄像机（纵横比，近距裁剪，远距裁剪）
        var camera:Laya.Camera = new Laya.Camera(0,0.1,1000);
        //加载到场景
        scene.addChild(camera);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-25,0,0),false,false);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(0,5,10);
        //加入摄像机移动控制脚本
        camera.addComponent(CameraMoveScript);

        //添加蒙皮动画角色模型
        var role3D:Laya.Sprite3D = Laya.loader.getRes("monkey/monkey.lh");
        //加载到场景
        scene.addChild(role3D);
    }
}
new LayaAir3D();
```

![动图3](img/3.gif)<br>（Picture 3）



#### Control and decomposition of character animation

**Get the animation component**

Through the above example, we see animation automatically play, animation includes a few actions, then how to control the playback of animation? First of all, you need to get the animation components on the model before you can control, play, stop, and so on.

The 3D model of the LayaAir 3D engine Sprite3D class provides the getComponentByType () method to obtain components on the model. The animated model, when loaded, creates the Animator animation component by default, so we can get it and refer to the following code.

Open the.lh file to see that the animation component is bound to the child of the model, so the getChildAt (0) is used to obtain the child object model. The animation component is then obtained by using the getComponentByType (Animator) method

```typescript
//获取角色动画组件
var ani:Laya.Animator=role3D.getChildAt(0).getComponentByType(Laya.Animator) as Laya.Animator;
```

**Tips：Sometimes there are multiple parent-child hierarchies in.Lh or.Ls files, and animation components can't all be on the first level, possibly every two layers, possibly third layers. So before you can get the animation component, you can open.Ls or.Lh to see the hierarchical relationship of the animation component model, and then obtain the model by getChildAt (), or getChildByName () and other methods, and then get the animation component. Otherwise, the program will be wrong!!**



**Play control**

With animation components, how do you only play one of these actions? There are two ways to control and switch actions.

1. Play animation frame mode.

For example, in unity did not split the animation, we use the default animation model Take 001 plug-in, only derived animated cartoon files in a .lani format.

Therefore, it is necessary to set the “start frame” and “end frame” mode to play a part of the animation.

See the play () method in the Animator animation component, and the specific method parameters are as follows:

```java
/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
 
```

**To play an animation frame to a certain frame, based on the original animation to create an animation clip (clip) AnimationClip, the latest Animator class provides addClip () instance method that allows developers to create animation clips and Define the name and play it by the play (movie clip name) method. **

```java
/**
* 添加动画片段。
* @param	clip 动画片段。
* @param	playName 动画片段播放名称，如果为null,则使用clip.name作为播放名称。
* @param   开始帧率。
* @param   结束帧率。
*/
public function addClip(clip:AnimationClip, playName:String = null, startFrame:int = 0, endFrame:int = 4294967295
```

The code in the modified example is as follows:

```java
......
//添加蒙皮动画角色模型
var role3D:Laya.Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
//加载到场景
this.scene.addChild(role3D);
//获取角色动画组件
var ani:Laya.Animator=role3D.getChildAt(0).getComponentByType(Animator) as Laya.Animator;

//加载一个动画文件创建动画剪辑（可以是已有的动画，也可以是此角色需增加的新动画文件）
//var clip:Laya.AnimationClip=AnimationClip.load("monkey/Assets/monkey-Take_001.lani");
//从现有的动画中获取动画剪辑（默认根据.lani文件创建的动画剪辑）
var clip:Laya.AnimationClip=ani.clip;

//增加一个动画剪辑引用，从clip中的0-34帧创建名为stand的动画剪辑
ani.addClip(clip,"stand",0,34);
//增加一个动画剪辑引用，从clip中的40-70帧创建名为move的新动画剪辑
ani.addClip(clip,"move",40,70);

//播放某个动画剪辑
ani.play("move");
//可获取动画剪辑总数
console.log("当前动画剪辑总数为："+ani.getClipCount());
```


After compiling and running, the effect is as follows: only 0-34 frames of standing animation are cycled.

![动图4](img/4.gif)<br>（Picture 4）



2. The name of the animation clip (animation clip)

In unity, you can segment the animation and name the clips. The exported resources can be animated by name in control, which is convenient for developers to use. (In this way, the animation parsing file is added to the resource export to increase the number of Http accesses, and in which way developers can consider themselves according to the situation)

Unity animation fragment segmentation method is as follows：

1. In the “Resource Manager”, select the model file, select the Animations in the right inspector interface, appear the default animation Take 001, click Edit custom name, click the plus sign to increase the animation fragment, and modify the start and end frames of the fragment (Figure 5).

![图5](img/5.png)<br>（Picture 5）

In this example, a total of four actions, according to art to provide the number of animation frames, modified to increase into 4 animation sequences  (Figure 6).

![图6](img/6.png)<br>（Picture 6）

2. After the modification is completed, the corresponding animation files will be added in the Explorer model, so it is necessary to modify the animation controller and add the newly generated animation fragments into the animation controller, otherwise, the complete animation resource parsing file can not be exported (Fig. 7).

![图7](img/7.png)<br>（Picture 7）

After the above steps are completed, 4 parsing files of .lani animation are generated in the derived resource.

Modify the sample code, use the animation name method, the effect is as follows (Figure 8).

```typescript
......
//添加蒙皮动画角色模型
var role3D:Laya.Sprite3D=Laya.loader.getRes("monkey/monkey.lh");
//加载到场景
scene.addChild(role3D);
//获取角色动画组件
this.ani = role3D.getChildAt(0).getComponentByType(Laya.Animator) as Laya.Animator;            
//监听默认动画完成后播放站立动画
this.ani.on(Laya.Event.COMPLETE,this,this.onAniComplete);
//播放攻击动画
this.ani.play("attack");
/***当前动画播放完成后回调***/
private onAniComplete():void
{
  //切换站立动画
  this.ani.play("stand");
}
```

![图8](img/8.gif)<br>（Picture 8）