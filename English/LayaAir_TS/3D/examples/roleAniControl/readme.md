## 3D character switching and animation

### 3D instance analysis and resource preparation

Through the study of technical documents, we basically mastered the basic knowledge of 3D game development. Below we will explain the comprehensive use of 3D technology through examples.

Look at the following example effect (Figure 1), which is similar to the 3D character selection interface in the game. First, let's analyze the 3D game world component in the example.

 ![图1](img/1.gif)<br>（Picture 1）



#### 2D interface and 3D combined

3D scenes are often mixed with the 2D interface. In this example, the interface UI part is edited by LayaAir IDE, including the resource loading progress page and the control UI page in the game. The methods of making them are exactly the same as those of 2D games. If you are not familiar with the editing interface of IDE, you can refer to  “technical documents LayaAir IDE”.



#### 3D scene

In the example, the scene model is exported from 3ds Max to FBX, and then imported into the untiy editor. There are two main tasks:

Creating scene light maps for editors, which can produce static shadows, light colors, and atmosphere between the models, so it's important to enhance the quality of the game's art.

UV animation for editing advertisement moving material. It's important to note that the material UV animation in 3ds Max does not support untiy, so it needs to be made in unity.

Material UV animation unity production methods see “Technical Documentation - LayaAir 3D Engine - LayaAir3D Animation II”



#### 3D character and skeleton animation

3D character models and skeletal animation are all edited and exported in 3ds max, and then imported into unity to process animation clips and animation components.

When the skeleton animation of the character is made in Max, it is better to edit many actions on the time axis at once, and the animation can be easily generated after the unity is imported.

In this case, a number of animation connection method, the animation after the connection has been a lot of problems, the occurrence of jitter, model intersection phenomenon, took a long time to achieve the above results.

Editing methods in skeletal animation unity “Technical document - LayaAir 3D engine - LayaAir3D animation 1”



#### 3D effects

Halo effects for animation (Animation: rigid body transform displacement, rotation, zoom), in the 3ds Max editor into unity, but only on 3DS MAX production model, animation in unity, because the untiy can make material and rigid combination of animation, the effect is better.
  

The unity animation of halo effect is similar to the process and material animation.



After the above 3D resources are finished in unity, they are exported to four resource folders by LayaAir export tools, which are scene resource LayaScene_scene02, two role resources LayaScene_girl and LayaScene_boy, and halo special effect resource LayaScene_effect. And copy the resources to the project H5 directory for use.



### Code implementation of 3D instance function

#### Implementation of UI interface function

Edit the interface in IDE, and set the VaR and name attributes of the elements in the interface for the code call, such as (Figure 2) (Figure 3).

Note that the size of the interface resolution is the same as the resolution set in Laya.init (), and the screen adaptation is correct.

ProgressBar.ui analysis of resource loading progress interface

 ![图2](img/2.png)<br>（Picture 2）

Control.ui analysis of role control button interface

 ![图3](img/3.png)<br>（Picture 3）

After editing the above interface, the resources are exported in IDE, and the corresponding packing resources and UI class are generated in the project folder. We set up two UI display control classes that inherit them separately. The code follows:

The progress UI shows the control class ProgressView, and we use the false progress bar in the class (otherwise, if the initial resource is small, the interface will flash)

```typescript
class ProgressView extends ui.ProgressUI{
    private progress:number = 0;
    constructor() {
        super();
        //进度增加的帧循环
        Laya.timer.loop(30,this,this.onLoop);
    }
    /*资源加载进度模拟（假进度）*/
    private onLoop():void{
        //进度增加
        this.progress++;
        //最高100%进度
        if(this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏...";
            //清除所有事件监听，包括帧循环
            Laya.timer.clearAll(this);
            //进度100%后，自动移除界面
            this.removeSelf();
        }
        else{
            //更新组件显示进度
            this.pro.value = this.progress/100;
            this.tips.text = "游戏正在加载中，当前进度为："+this.progress+"%!";
        }
    }
}
```


Role control UI display control class ControlView, we send the current click button name to the main class through the event.

```typescript
class ControlView extends ui.ControlUI {
    constructor() {
        super();
        //监听UI鼠标点击事件
        this.on(Laya.Event.MOUSE_DOWN,this,this.onClick);
    }
    private onClick(e:Laya.Event):void{
        //发送点击的组件名称
        this.event("btn_action",e.target.name);
    }
}
```



#### Combination of 2D and 3D

3D scene Scene class is inherited from the 2D display object Sprite class, so it can be as 2D display object loaded to the stage, and through the setChildIndex () method to adjust its hierarchy, processing it and the background, the interface of the upper and lower occlusion relationship.

In this case, the resource loading progress interface and the role control interface need to be set to the upper level of the 3D scene. We can use the above method to implement the code Laya.stage.setChildIndex (scene, 0). The code for loading the interface and scene in the main class is as follows:

```typescript
class Example_roleChange {
    /*****3D场景******/
    private scene: Laya.Scene;
    /*****角色控制界面******/
    private control: ControlView;
    /*****角色资源名数组******/
    private roleArray: Array<any> = ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];

    constructor() {
        //初始化引擎
        Laya3D.init(1280, 720, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //加载2D界面资源
        Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, this.onUIComplete));
    }
    /*界面资源加载完成后*/
    private onUIComplete(): void {
        //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
        Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
        { url: this.roleArray[0] }, { url: this.roleArray[1] },
        { url: "LayaScene_effect/effect.lh" }
        ], Laya.Handler.create(this, this.onSceneOK));
        //创建角色控制界面
        this.control = new ControlView();
        Laya.stage.addChild(this.control);
        //创建资源载入界面
        var assetLoad: ProgressView = new ProgressView();
        Laya.stage.addChild(assetLoad);
    }
    /**
     * 场景角色加载完成后回调
     */
    private onSceneOK(): void {
        //创建加载场景
        this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
        Laya.stage.addChild(this.scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(this.scene, 0);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)
        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
        //加载到场景
        this.scene.addChild(camera);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
        //设置摄像机视野范围（角度） 
        camera.fieldOfView = 33;
    }
}
new Example_roleChange;
```

Compiling and running the above code, we can see that after the resource interface is finished, the 3D scene appears, and the control interface is above the 3D scene.

3D scene has material UV animation, after loading.Ls, animation will be automatically loaded and play out, if you need to control animation, you can according to the following role of animation control method, first access to animation components, and then through animation components to control.



#### 3D Role creation and control

The most important thing in character animation control is the need to obtain animation components, because the pre loading is used in this example, so the role can be obtained directly from the role model.
Tips：If you do not use pre loading, directly use Sprite.load () asynchronous loading, you need to add monitoring resources to complete the completion of the event after the animation component, otherwise it will be wrong.

**Create roles**

Add the role related global attributes to the main class, including the current role resource, the current role animation component, the current role action name, etc., and add the method of creating roles. The code is as follows:


```typescript
class Example_roleChange {
    /*****3D场景******/
    private scene: Laya.Scene;
    /*3D角色*/
    private role3D:Laya.Sprite3D;
    /*****角色控制界面******/
    private control: ControlView;
    /*****角色资源名数组******/
    private roleArray: Array<any> = ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
    /*当前场景中角色资源*/
    private currentRole:string = "LayaScene_girl/girl.lh";
    /*当前角色动画组件*/
    private roleAni:Laya.Animator;
    /*当前角色动作名*/
    private currentActive:string = "stand";
    /*3D特效*/
    private effect3D:Laya.Sprite3D;
    constructor() {
        //初始化引擎
        Laya3D.init(1280, 720, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //加载2D界面资源
        Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, this.onUIComplete));
    }
    /*界面资源加载完成后*/
    private onUIComplete(): void {
        //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
        Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
        { url: this.roleArray[0] }, { url: this.roleArray[1] },
        { url: "LayaScene_effect/effect.lh" }
        ], Laya.Handler.create(this, this.onSceneOK));
        //创建角色控制界面
        this.control = new ControlView();
        Laya.stage.addChild(this.control);
        //创建资源载入界面
        var assetLoad: ProgressView = new ProgressView();
        Laya.stage.addChild(assetLoad);
    }
    /**
     * 场景角色加载完成后回调
     */
    private onSceneOK(): void {
        //创建加载场景
        this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
        Laya.stage.addChild(this.scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(this.scene, 0);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)
        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
        //加载到场景
        this.scene.addChild(camera);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
        //设置摄像机视野范围（角度） 
        camera.fieldOfView = 33;

        //创建角色
        this.createRole3D();
    }
    /*创建角色并获取动画组件*/
    private createRole3D():void{
        //创建角色
        this.role3D = Laya.loader.getRes(this.currentRole);
        //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
        this.roleAni = (this.role3D.getChildAt(0) as Laya.Sprite3D).getComponentByType(Laya.Animator) as Laya.Animator;
        //监听动画完成事件
        this.roleAni.on(Laya.Event.COMPLETE,this,this.onAniComplete);
        //播放上一个角色的当前动作
        this.roleAni.play(this.currentActive);
        //角色位置
        this.role3D.transform.position = new Laya.Vector3(-3,0,1);
        this.scene.addChild(this.role3D);
    }
    /*动画播放完成后回调*/
    private onAniComplete():void{
        //如果当前的完成动画剪辑名为“play”击球
        if(this.roleAni.currentPlayClip.name == "play"){
            //完成击球后播放准备动作动画
            this.roleAni.play("ready");
            this.currentActive = "ready";
        }
    }
}
new Example_roleChange;
```

In the code above, we also added the animation playback callback `roleAni.on(Event.COMPLETE,this,onAniComplete)`. It is basically the same as 2D animation, which refers to the scheduling after the completion of an animation clip, which can be judged by the current animation clip name currentPlayClip.name, which is convenient for developers to edit game logic.



**Role animation control**

Role control is controlled by button clicks in UI. We add a monitor event callback to the main class to add control interfaces `control.on("btn_action",this,onBtnAction)` To control the role.

Role switching method is to replace the role of resources and re create the role, but in the Laya.loader.create() has been loading resources according to the type of create role, into the object pool, so called repeatedly to switch roles to create roles createRole3D() method, do not have to worry about performance problems, it will be created directly from the object pool.

Animation switch mainly through animation components to play, stop, switch action. Code modification is added as follows:

```typescript
/*界面资源加载完成后*/
private onUIComplete(): void {
  ......
  //创建角色控制界面
  this.control = new ControlView();
  Laya.stage.addChild(this.control);
  //监听控制界面按钮信息
  this.control.on("btn_action", this, this.onBtnAction);
  ......
}
  /*控制界面动作监听回调
     action:当前执行的控制名称
    */
  private onBtnAction(action: string): void {
    if (action == "change") {
      //切换角色
      this.changeRole();
    } else if (action == "playAni") {
      //播放当前动作
      this.roleAni.play(this.currentActive);
    }else if(action == "stopAni"){
      //停止动画
      this.roleAni.stop();
    }else if(action == "stand"||action == "go"||action == "ready"||action == "play"){
      //播放动作
      this.roleAni.play(action);
      this.currentActive = action;
    }
  }
  /*切换角色*/
  private changeRole():void{
    //移除角色
    this.role3D.removeSelf();
    //移除所有事件监听
    this.roleAni.offAll();
    //当前角色索引
    var index:number = this.roleArray.indexOf(this.currentRole);
    //下一个角色
    index++;
    if(index>this.roleArray.length-1){
      index = 0;
    }
    this.currentRole = this.roleArray[index];
    //创建角色
    this.createRole3D();
  }
  /**
     * 场景角色加载完成后回调
     */
  private onSceneOK(): void {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    this.createRole3D();
  }
```



#### Creating special effects animation

The special animation call is quite simple. We don't need to control it here, so we can load it directly to the foot of the character. The code is as follows:

```typescript
/*创建特效*/
private createEffect3D():void{
  //创建特效
  this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
  this.scene.addChild(this.effect3D);
  //特效位置
  this.effect3D.transform.position = new Laya.Vector3(-3,0.01,1.2);
  //特效缩放
  this.effect3D.transform.localScale = new Laya.Vector3(0.15,0.15,0.15);
}
```

在场景加载完成的回调中加入创建特效方法，编译运行后，效果如（图1）所示。



#### 主类最终全部代码

```typescript
class Example_roleChange {
    /*****3D场景******/
    private scene: Laya.Scene;
    /*3D角色*/
    private role3D: Laya.Sprite3D;
    /*****角色控制界面******/
    private control: ControlView;
    /*****角色资源名数组******/
    private roleArray: Array<any> = ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
    /*当前场景中角色资源*/
    private currentRole: string = "LayaScene_girl/girl.lh";
    /*当前角色动画组件*/
    private roleAni: Laya.Animator;
    /*当前角色动作名*/
    private currentActive: string = "stand";
    /*3D特效*/
    private effect3D: Laya.Sprite3D;
    constructor() {
        //初始化引擎
        Laya3D.init(1280, 720, true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //加载2D界面资源
        Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/myAssets.atlas"], Laya.Handler.create(this, this.onUIComplete));
    }
    /*界面资源加载完成后*/
    private onUIComplete(): void {
        //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
        Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
        { url: this.roleArray[0] }, { url: this.roleArray[1] },
        { url: "LayaScene_effect/effect.lh" }
        ], Laya.Handler.create(this, this.onSceneOK));
        //创建角色控制界面
        this.control = new ControlView();
        Laya.stage.addChild(this.control);
        //监听控制界面按钮信息
        this.control.on("btn_action", this, this.onBtnAction);
        //创建资源载入界面
        var assetLoad: ProgressView = new ProgressView();
        Laya.stage.addChild(assetLoad);
    }
    /*控制界面动作监听回调
     action:当前执行的控制名称
    */
    private onBtnAction(action: string): void {
        if (action == "change") {
            //切换角色
            this.changeRole();
        } else if (action == "playAni") {
            //播放当前动作
            this.roleAni.play(this.currentActive);
        } else if (action == "stopAni") {
            //停止动画
            this.roleAni.stop();
        } else if (action == "stand" || action == "go" || action == "ready" || action == "play") {
            //播放动作
            this.roleAni.play(action);
            this.currentActive = action;
        }
    }
    /*切换角色*/
    private changeRole(): void {
        //移除角色
        this.role3D.removeSelf();
        //移除所有事件监听
        this.roleAni.offAll();
        //当前角色索引
        var index: number = this.roleArray.indexOf(this.currentRole);
        //下一个角色
        index++;
        if (index > this.roleArray.length - 1) {
            index = 0;
        }
        this.currentRole = this.roleArray[index];
        //创建角色
        this.createRole3D();
    }
    /**
     * 场景角色加载完成后回调
     */
    private onSceneOK(): void {
        //创建加载场景
        this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
        Laya.stage.addChild(this.scene);
        //设置场景在2D界面最后（最底层为第0层）
        Laya.stage.setChildIndex(this.scene, 0);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)
        var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
        //加载到场景
        this.scene.addChild(camera);
        //移动摄像机位置
        camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
        //设置摄像机视野范围（角度） 
        camera.fieldOfView = 33;

        //创建角色
        this.createRole3D();
        //创建特效
        this.createEffect3D();
    }
    /*创建特效*/
    private createEffect3D(): void {
        //创建特效
        this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
        this.scene.addChild(this.effect3D);
        //特效位置
        this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
        //特效缩放
        this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
    }
    /*创建角色并获取动画组件*/
    private createRole3D(): void {
        //创建角色
        this.role3D = Laya.loader.getRes(this.currentRole);
        //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
        this.roleAni = (this.role3D.getChildAt(0) as Laya.Sprite3D).getComponentByType(Laya.Animator) as Laya.Animator;
        //监听动画完成事件
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
        //播放上一个角色的当前动作
        this.roleAni.play(this.currentActive);
        //角色位置
        this.role3D.transform.position = new Laya.Vector3(-3, 0, 1);
        this.scene.addChild(this.role3D);
    }
    /*动画播放完成后回调*/
    private onAniComplete(): void {
        //如果当前的完成动画剪辑名为“play”击球
        if (this.roleAni.currentPlayClip.name == "play") {
            //完成击球后播放准备动作动画
            this.roleAni.play("ready");
            this.currentActive = "ready";
        }
    }
}
new Example_roleChange;
```