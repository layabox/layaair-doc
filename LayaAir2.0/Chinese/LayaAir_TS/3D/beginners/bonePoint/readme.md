## LayaAir3D之骨骼挂点

### 骨骼挂点概述

骨骼挂点技术在3D游戏中运用非常普遍，比如武器要随着角色的手的动作而变化，那么我们就可以把武器与手上骨骼进行挂点绑定，武器作为手骨骼的子层级，自然就可以跟随手的动作而变化。

当然，绑定后的3D模型也可以通过代码来移除绑定或者更换另外的3D模型，通过这种方式可以实现武器或装备的换装功能。

### 在Unity中设置骨骼挂点

骨骼挂点在Unity中设置非常方便，可以在场景的资源层级中直接操作。如下图（图1）

需要绑定的对象可以是一个3D容器，也可以只是一个3D模型，调整好它们的位置后，把它们拖入到指定骨骼下作为子层级就挂点绑定成功了，播放动画时，我们可以发现它跟随骨骼动画而变化了。

有的时候，我们需要在刚开始的时候无武器，但又需要挂点，为以后换武器作准备，那么我们也可以在骨骼下放入一个空节点容器GameObject，需要的时候再往里添加不同的3D模型或是多个模型。
![1](img\1.png)</br>

(图1)

**Tips：当我们的骨骼挂点设置好后，骨骼与挂点对象会自动导出到.ls或.lh文件中，我们可以通过getChildByName()方法获取到它们。不过要特别注意：如果骨骼挂点时只绑定了空的容器对象，用于以后动态添加子对象，那么在导出插件中不能勾选GameObject Setting 中的 Ignore Null Game Objects忽略空节点设置，否则空容器挂点对象不会被导出到.ls或.lh中。**

### 在代码中实现骨骼挂点

一般情况，我们都是在Unity中去添加骨骼挂点。不过LayaAir引擎也提供了代码的挂点方式，可以灵活的添加和移除骨骼挂点。

Animator动画组件类提供了两个实例方法**linkSprite3DToAvatarNode()**与**unLinkSprite3DToAvatarNode()**可以实现挂点的添加与移除（图2、图3）。

Tips：代码添加骨骼动画之前，需要美术提供需要关联骨骼节点的名字。

![2](img\2.png)</br>

(图2)

![3](img\3.png)</br>

(图3)

具体使用的代码参考如下：

从场景中获取骨骼动画模型—获取模型的动画组件—创建挂点对象—通过动画组件绑定骨骼与挂点对象。

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

### 骨骼挂点运用示例

下面我们以一个魔法攻击的简单示例来为大家演示一下骨骼挂点的运用（图4）。

![4](img\4.gif)</br>
(图4)

首先如图1中，在Unity中设置魔法光圈为右手骨骼的子节点层级，将右手骨骼名字改为“RHand”，魔法光圈为“weapon”，并导出成.ls资源文件。导出后，我们可以发现手骨骼与光圈出现在模型的子层级文件中（图5），需用时可以根据名字去获取到它们。

![5](img\5.png)</br>
(图5)

按照图4魔法攻击效果，可以通过两个类来实现，一个是主类Main.ts，用于实现动画播放和生成魔法武器，方案为：在攻击动画播放至36帧左右时，克隆出一个与挂点武器相同的新魔法武器，并添加武器脚本用于飞行，原始挂点武器暂时隐藏，动画播放完成后再重新显示，模拟产生魔法并扔出魔法的效果。

武器脚本WeaponScript.ts实现魔法飞行和销毁。全部代码如下：

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