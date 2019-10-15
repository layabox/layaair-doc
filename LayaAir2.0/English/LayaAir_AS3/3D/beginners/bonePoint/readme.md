##Skeletal Hanging Point of LayaAir3D

###Summary of Skeletal Hanging Points

Bone hang point technology is widely used in 3D games. For example, if the weapon changes with the action of the character's hand, then we can bind the weapon to the bone on the hand. As a sub level of the hand bone, the weapon can naturally change with the action of the hand.

Of course, the binded 3D model can also be removed by code or replaced by another 3D model, which can realize the replacement function of weapons or equipment.



###Setting Bone Hanging Points in Unity

Skeletal hangpoints are very convenient to set up in Unity and can be directly operated in the resource level of the scene. The following figure (Fig. 1)

The objects that need to be bound can be a 3D container or just a 3D model. After adjusting their positions, dragging them under the specified skeleton as a sub-level, they can be bound successfully. When playing the animation, we can find that it changes with the skeleton animation.

Sometimes, we need to be weapon-free at the beginning, but also need a hang point to prepare for future weapons change. Then we can put an empty node container GameObject under the skeleton and add different 3D models or multiple models to it when needed.

![图1](img/1.png)<br>(Figure 1)

**Tips: When our skeleton hangpoints are set up, skeleton and hangpoint objects are automatically exported to. LS or. LH files, which can be obtained by the getChildByName () method. However, it should be noted that if only empty container objects are bound to skeleton hangpoints for dynamic addition of child objects in the future, then Ignore Null Game Objects in GameObject Setting cannot be checked in the export plug-in to ignore empty node settings, otherwise empty container hangpoint objects will not be exported to. LS or. lh.**  



###Implementing Skeletal Hanging Points in Code

Normally, we add skeletal hangpoints to Unity. However, the layaair engine also provides the way of code hanging points, which can flexibly add and remove bone hanging points.

Animator animation component class provides two example methods**LinkSprite3D ToAvatarNode ()**And**UnLinkSprite3D ToAvatarNode ()**The addition and removal of hangpoints can be realized (Figures 2 and 3).

Tips: Before adding skeletal animation to the code, you need the art to provide the names of the skeletal nodes that need to be associated.

![图2](img/2.png)<br> (Figure 2)

![图3](img/3.png)<br> (Figure 3)

Specific code references are as follows:

Get the skeleton animation model from the scene - get the animation component of the model - create the hang-point object - bind the skeleton and hang-point object through the animation component.


```typescript

  //从场景中获取动画模型
  var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
  //获取动画模型中动画组件
  var monkeyAni:Animator=monkey.getComponentByType(Animator) as Animator;

  //需要挂点的3D对象
  var box:MeshSprite3D=new MeshSprite3D(new BoxMesh(1,1,1));
  //将3D对象加载到角色中（一定要加入到角色的Animator模型上）
  monkey.getChildAt(0).addChild(box);
  //将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
  monkeyAni.linkSprite3DToAvatarNode("RHand",box);

  //将挂点物品从骨骼上移除（美术提供骨骼的名称）
  //monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```




###Examples of Skeletal Hanging Points

Let's show you how to use the skeleton hanging point with a simple example of magic attack (Figure 4).

![图4](img/4.gif)<br> (Figure 4)

Firstly, in Figure 1, set the magic aperture to the child node level of the right-hand bone in Unity, change the name of the right-hand bone to "RHand" and the magic aperture to "weapon", and export it to. LS resource file. After exporting, we can find that hand bones and apertures appear in the sub-level file of the model (Fig. 5), which can be obtained by name when needed.

![图5](img/5.png)<br> (Fig. 5)

According to the magic attack effect of Fig. 4, it can be achieved by two classes. One is the main class Laya3D_BonePoint.as, which is used to play animation and generate magic weapons. The scheme is that when the attack animation is played to about 36 frames, a new magic weapon similar to the hanging point weapon is cloned, and a weapon script is added for flight. The original hanging point weapon is temporarily hidden, after the animation is finished. Re-display, the simulation produces magic and throws magic effect.

WeaponScript. as is a weapon script for magic flight and destruction. The code is as follows:


```typescript

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
  import laya.d3.component.Animator;
  import laya.d3.component.Script3D;
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

      Laya.timer.frameLoop(1,this,function():void{
        onFrame();
      })
    }));
  }
  private function onFrame():void{ 
    //当动画播放到百分之五十到六十之间时进行克隆
    if (0.6>(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.5)
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
}
```



```typescript

package {
	import laya.components.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.RenderState;
	import laya.d3.core.material.PBRStandardMaterial;
	import laya.d3.math.Vector4;
	import laya.d3.math.Vector3;
	import laya.d3.core.material.PBRSpecularMaterial;
	import laya.d3.component.Script3D;

	public class WeaponScript extends Script3D {
		//**************** wq *****************************************
        //被脚本绑定的物体
        private var weapon:MeshSprite3D;
        //武器生命周期
        public var lifeTime:int = 30;
		public function WeaponScript() {

        }
        /**
		 * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
		 */
        override public function onAwake():void{
            //得到3D对象
            weapon  = this.owner as MeshSprite3D;
        }
        /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
        override public function onUpdate():void{
            //所属脚本对象旋转更新
            weapon .transform.rotate(new Vector3(0,0.5,0),false,false);
            weapon.transform.translate(new Vector3(0,0,0.2),false);
            lifeTime--;
            if (lifeTime<0)
            {
                lifeTime = 100;
                //直接销毁脚本保定对象会报错（对象销毁后脚本还会在更新一次，找不到绑定对象会错误）
                //因此延迟一帧销毁
                Laya.timer.frameOnce(1,this,function():void{
                    weapon.destroy();
                })
            }
        }
    }
}
```
