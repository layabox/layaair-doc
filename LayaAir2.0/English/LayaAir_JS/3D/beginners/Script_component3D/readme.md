#LayaAir3D script component

###Component 3D, a parent component

In LayaAir 3D engine, Component 3D, a powerful component class, is provided to facilitate display object control and code maintenance. Our animation control components, colliders, scripts, skeleton hangpoints and so on are extensions based on component functions and belong to its subclasses. In addition, the LayaAir 3D engine also supports adding multiple components to a 3D object to make component control more flexible.

In the previous technical documentation, we introduced the basic functions of the animation control component and the collider component, and we will not talk more about them here. In this chapter,**We'll focus on the script component as an example.**Because it inherits from component classes, but hardly has its own extension function. It mainly uses the parent class Component 3D attributes and methods. The script function will be updated in the future. Please look forward to it!



###Main attributes and methods of components

**Owner**Prite3D object to which the bound component belongs.

* ***Enable:**When a component is loaded, it is enabled by default. If it is changed to false, the enabled change event will be sent first, and then the update method _update() of the component will stop executing.

**OnAwake ():**Components are created and executed only once, with no code by default. It can be overridden in inheritance classes and will need to be initialized with logical code.

**OnStart ():**After the instantiation of the 3D object of the loading component is completed, it is executed on the first update, and no code is defaulted. It can be overridden in inheritance classes, and the logical code after loading 3D objects will be put into it.

Another example is to clone a 3D object with script. If there are more sub-objects in the 3D object, script cloning will be completed first. If the logic in the script is not put into onStart () method, empty object bugs will occur when the sub-objects are retrieved.

**OnUpdate ():**Component update method is equivalent to frame loop. It can be overridden in inheritance classes, putting the logical code that needs to be updated per frame into this method.



###Component-related events

** COMPONENT_ADDED:**Components are loaded to complete the event, sent by Sprite3D, the component owner, and sent as parameters.****
****
**The event after the COMPONENT_REMOVED:** component is removed is sent by Sprite3D, the component owner, and the component is sent as a parameter.



###Script Component

The script inherits from the component, so you can add the script to the 3D display object using the addComponent () method of the display object.

Camera MoveScript is used in many examples of cameras in official website's 3D engine example. After adding this script, cameras can control its rotation and keyboard to control its movement around and around. After developers download the example from the Internet, they can find it for research and modification. Add the script component method code as follows:


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


Of course, scripts can also be deleted from objects when some logic requires them. The removeComponentByType () method for displaying objects in 3D can be used to remove scripts.


```typescript

//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```




###Create your own script component

Developers can refer to camera scripts and create their own script components to control objects in the scene.

In the development of LayaAir 3D game, we basically create scenes, characters, animations in unit, export scenes and load them in code, then we can add corresponding control script components to different objects in the scene.

For example, the protagonist control script, NPC control script, scene object control script, etc., a game level was born. When the game loads the next level scene, the script can be reused, the project maintenance is convenient and fast, and the control and display are separated.

In the following example, we modify the "Quick Open 3D Travel" code in the technical document, create a control script to add to the box, and remove the script component in four seconds.

First, create a custom script, BoxControlScript, to modify the material of the object box to which the script belongs and rotate around.


```typescript

export default class BoxControlScript extends Laya.Script3D{
  constructor(){super();}
  /**
	 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	 */
  onAwake(){
    // this.owner
  }
  /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
  onStart(){
    //得到3D对象的材质
    var material = this.owner.meshRenderer.material;
    //更改3D对象的材质反射率 （偏红）
    material.albedoColor = new Laya.Vector4(1,0,0,1);
  }
  /**
	 * 覆写组件更新方法（相当于帧循环）
	 */
  onUpdate(){
    this.owner.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
  }
}
```


Then in the "Quick Open 3D Trip" code, add the script type mentioned above to the box and remove the script after 4 seconds.


```typescript

import BoxControlScript from "./BoxControlScript";
var Main = (function () {
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene = Laya.stage.addChild(new Laya.Scene3D());

    //添加照相机
    var camera = (scene.addChild(new Laya.Camera( 0, 0.1, 100)));
    //移动摄影机位置
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    //旋转摄影机方向
    camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    //设置背景颜色
    camera.clearColor = null;

    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    //设置灯光漫反射颜色
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    //设置灯光的方向（弧度）
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    //添加自定义模型
    var box= scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1),"MOs"));
    //设置模型的旋转
    box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
    //创建材质
    var material = new Laya.PBRSpecularMaterial();
    //加载模型的材质贴图
    Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
      material.albedoTexture = text;
      //给模型添加材质
      box.meshRenderer.material = material;

      //给box添加自定义脚本组件
      box.addComponent(BoxControlScript);
    }))
    //4秒后删除自定义组件
    Laya.timer.once(4000,this,this.onLoop,[box]);
  }
  var _proto = Main.prototype;
  _proto.onLoop = function(box){
    // 获取到组件
    var boxContro = box.getComponent(BoxControlScript);
    // 移除组件
    // boxContro.destroy();
    //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
    boxContro.enabled = false;
  }
  return Main;
} ());
new Main();

```


In the above code, if the developer does not want to remove the component after 4 seconds, just stop using the script, the script enablement property can be set to false.

By compiling and running the above code, the following results can be achieved (Figure 1). After removing the components, the model stops rotating.

![1](img/1.gif)(Fig. 1) </br>

