##Skeletal Hanging Point of LayaAir3D

###Summary of Skeletal Hanging Points

Skeletal hang-point technology is widely used in 3D games. For example, the weapon changes with the action of the character's hand. Then we can bind the weapon to the skeleton of the hand. As a sub-level of the skeleton of the hand, the weapon can naturally change with the action of the hand.

Of course, the binded 3D model can also be removed by code or replaced by another 3D model, which can realize the replacement function of weapons or equipment.

###Setting Bone Hanging Points in Unity

Skeletal hangpoints are very convenient to set up in Unity and can be directly operated in the resource level of the scene. The following figure (Fig. 1)

The objects that need to be bound can be a 3D container or just a 3D model. After adjusting their positions, dragging them under the specified skeleton as a sub-level, they can be bound successfully. When playing the animation, we can find that it changes with the skeleton animation.

Sometimes, we need to be weapon-free at the beginning, but also need a hang point to prepare for future weapons change. Then we can put an empty node container GameObject under the skeleton and add different 3D models or multiple models to it when needed.
![1](img\1.png)</br>

(Fig. 1)

**Tips: When our skeleton hangpoints are set up, skeleton and hangpoint objects are automatically exported to. LS or. LH files, which can be obtained by the getChildByName () method. However, it should be noted that if only empty container objects are bound to skeleton hangpoints for dynamic addition of child objects in the future, then Ignore Null Game Objects in GameObject Setting cannot be checked in the export plug-in to ignore empty node settings, otherwise empty container hangpoint objects will not be exported to. LS or. lh.**

###Implementing Skeletal Hanging Points in Code

In general, we add bone hang points in unity. However, the LayaAir engine also provides a way to add and remove skeletal hangpoints flexibly.

Animator animation component class provides two example methods**LinkSprite3D ToAvatarNode ()**And**UnLinkSprite3D ToAvatarNode ()**The addition and removal of hangpoints can be realized (Figures 2 and 3).

Tips: Before adding skeletal animation to the code, you need the art to provide the names of the skeletal nodes that need to be associated.

![2](img\2.png)</br>

(Fig. 2)

![3](img\3.png)</br>

(Fig. 3)

Specific code references are as follows:

Get the skeleton animation model from the scene - get the animation component of the model - create the hang-point object - bind the skeleton and hang-point object through the animation component.


```javascript

//从场景中获取动画模型
var monkey = this.scene.getChildByName("monkey");
//获取动画模型中动画组件
 var ani:Laya.Animator = monkey.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
//需要挂点的3D对象
var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3,0.3,0.3));
//将3D对象加载到角色中（一定要加入到角色的Animator模型上）
 hero.getChildAt(0).addChild(box);
//将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
monkeyAni.linkSprite3DToAvatarNode("RHand",box);
//将挂点物品从骨骼上移除（美术提供骨骼的名称）
//monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```


###Examples of Skeletal Hanging Points

Let's show you how to use the skeleton hanging point with a simple example of magic attack (Figure 4).

![4](img\4.gif)</br>
(Fig. 4)

Firstly, in Figure 1, set the magic aperture to the child node level of the right-hand bone in Unity, change the name of the right-hand bone to "RHand" and the magic aperture to "weapon", and export it to. LS resource file. After exporting, we can find that hand bones and apertures appear in the sub-level file of the model (Fig. 5), which can be obtained by name when needed.

![5](img\5.png)</br>
(Fig. 5)

According to the magic attack effect of Fig. 4, we can achieve it in two classes. One is the main class Main.ts, which is used to play animation and generate magic weapons. The scheme is that when the attack animation is played to about 36 frames, a new magic weapon similar to the hang-point weapon is cloned, and a weapon script is added for flight. The original hang-point weapon is temporarily hidden, and then re-displayed after the animation is played. Show, simulate the effect of magic and throw it out.

WeaponScript. TS implements magic flight and destruction. The code is as follows:


```typescript

/**武器克隆**/import WeaponScript from "./WeaponScript";
// 程序入口
class Main {
  private scene:Laya.Scene3D;
  private ani:Laya.Animator;
  public weaponIsClone:Boolean = false;
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    this.scene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

    //添加照相机
    var camera: Laya.Camera = ( this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight: Laya.DirectionLight =  this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    //创建一个用于放置的cube
    var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3,0.3,0.3));

    Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
      var hero:Laya.Sprite3D =  this.scene.addChild(sp) as Laya.Sprite3D;
      //获取角色动画
      hero.getChildAt(0).addChild(box);
      this.ani = hero.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
      //加cube加入
      this.ani.linkSprite3DToAvatarNode("Dummy002",box);

      Laya.timer.frameLoop(1,this,this.onFrame,[box]);
    }));
  }

  public onFrame(box:Laya.MeshSprite3D){
    //当动画播放到百分之五十到六十之间时进行克隆
    var s:number = (this.ani.getCurrentAnimatorPlayState(0)._normalizedPlayTime-Math.floor(this.ani.getCurrentAnimatorPlayState(0)._normalizedPlayTime));
    if (0.6>s&&s>0.5)
    {
      if (this.weaponIsClone)return;
      //克隆模型（位置，矩阵，等信息全被克隆）
      var weaponClone:Laya.Sprite3D = Laya.Sprite3D.instantiate(box);
      //为模型添加在定义脚本
      weaponClone.addComponent(WeaponScript);
      //把克隆的武器放入场景中
      this.scene.addChild(weaponClone);
      this.weaponIsClone = true;
    }
    else if (s>0.98)
    {
      this.weaponIsClone = false;
    }
  }
}
new Main();
```





```typescript

 export default class WeaponScript extends Laya.Script {
    /**被脚本绑定的武器**/
    public weapon: Laya.Sprite3D;
    /**武器生命周期**/
    public lifeTime: number = 100;
    constructor() {
        super();
    }
    //获取绑定对象
    public onAwake(): void {
        this.weapon = this.owner as Laya.Sprite3D;
    }
    //覆盖组件更新方法，实现武器帧循环
    public onUpdate(): void {
        //武器旋转更新
        this.weapon.transform.rotate(new Laya.Vector3(2, 2, 0), true, false);
        //武器移动更新
        this.weapon.transform.translate(new Laya.Vector3(0, 0, 0.2), false);
        //生命周期递减
        this.lifeTime--;
        if (this.lifeTime < 0) {
            this.lifeTime = 100;
            //直接销毁脚本绑定对象会报错（对象销毁后脚本还会更新一次，报找不到绑定对象错误），
            //因此延迟一帧以销毁
            Laya.timer.frameOnce(1, this, function () { this.weapon.destroy(); });
        }
    }
}
```
