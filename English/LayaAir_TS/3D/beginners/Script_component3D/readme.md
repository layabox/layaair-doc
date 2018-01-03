## LayaAir3D script component


### Parent Class Component Component3D

In the LayaAir 3D engine, a powerful component class Component3D is provided to facilitate the display of object control and maintenance of code. Our animation control components, colliders, scripts, skeletal hanging points, etc. are all extensions based on component functionality, which belong to its subclass. And the LayaAir 3D engine also supports adding multiple components on a 3D object to make the component control more flexible.

In the previous technical files, we introduced the basic functions of the animation control components and collider components, no longer said here. In this chapter, **We mainly use script component as an example to explain**. Because it inherits component class, but almost without its own expansion function, the main use of the parent class Component3D properties and methods, the script function will be updated later,  so stay tuned! 



### The main components of the properties and methods

**owner**：The bound component belongs to the Sprite3D object.

**enable：** When the component is loaded, it is enabled by default. If you change it to fasle, you will first send the enable change event, and then the component update method _update () stops executing.

**_load(owner:Sprite3D)：** The component executes when it is loaded and defaults to no code. You can override it in the inheritance class and put in it the logic code that needs to be initialized.

**_start(state:RenderState)：** The 3D object instantiation of the loaded component is executed after the first update, and defaults to no code. You can override it in the inheritance class and put the logical code that needs to be loaded after the 3D object is loaded.

For example, when a 3D display object is loaded asynchronously, a script is added, and its sub model and the material are not loaded, if the script（such as the construction method, `_load()` function）, empty object bugs appear when logic code fetches sub-objects or textures of 3D display objects. At this point you can put the logic code _start () method to avoid the empty object bug occurs.

For example, cloning a script 3D object, if there are more objects in the 3D object, the script clone will be completed first, if the logic in the script does not put into the _start () method, to obtain the sub object, the empty object bug will also occur.

**_update(state:RenderState)：** Component update method, equivalent to frame cycle. You can override it in the inheritance class and put the logical code that needs to be updated per frame into this method.



### Component related events

**COMPONENT_ADDED：** The component is loaded to complete the event, sent by the component owner Sprite3D, and the component is sent as a parameter.

**COMPONENT_REMOVED：** After the component is removed, the event is sent by the component owner Sprite3D, and the component is sent as a parameter.

**ENABLE_CHANGED：** Component enabled event, enabled property enable modified, sent by component, and enabled property to be sent as a parameter.



### Script component

The script inherits from the component, so the script can be added to the 3D display object using the addComponent () method of the display object.

In the official website of the 3D engine for example, many of the examples are applied to the camera camera mobile camera script CameraMoveScript, add this script, you can control it through the mouse and keyboard control rotating it up and down and move around before and after the developers from the Internet to download the sample, you can find it to study and modify the use of. Add script component method code as follows:

```typescript
//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```

Of course, in some logic, scripts can be removed from objects, and scripts can be removed by using the removeComponentByType () method of 3D display objects.

```typescript
//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```



### Create your own script components

Developers can refer to camera scripts to create their own script components to control objects in the scene.

In the LayaAir 3D game development, we basically create scenes, roles, animation, export scenarios in unity, and load the code in the code, you can control the different objects in the scene with the corresponding control script components.

For example, the protagonist control script and NPC control script, scene control script, a game was born, when the game is loading the next level scene, scripts can also be reused, maintenance is convenient, and the separation and display control.

In the following example, we modify the technical document “QuickStart guide for 3d project” code, create a control script to add to the box, and remove script components after 4 seconds.

First, create custom script BoxControlScript to modify the material, cycle rotation of the object box of the script.


```typescript
class BoxControlScript extends Laya.Script {
    /*脚本所属的3D对象*/
    private box:Laya.MeshSprite3D;
    constructor() {
        super();
    }
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    public _load(owner:Laya.Sprite3D):void{
        //获取脚本所属对象
        this.box = owner as Laya.MeshSprite3D;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public _start(state:Laya.RenderState):void{
        //获取模型上的材质
        var material:Laya.StandardMaterial = this.box.meshRender.material as Laya.StandardMaterial;
        //修改材质的反射率颜色，让模型偏红
        material.albedo = new Laya.Vector4(1,0,0,1);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    public _updata(state:Laya.RenderState):void{
        //所属脚本对象旋转更新
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
}
```

Then add the script type to box in the code of “QuickStart guide for 3d project”, and remove the script after 4 seconds.


```typescript
class LayaAir3D_Script  {
    private box:Laya.MeshSprite3D;
    private boxScript:Laya.Script;
    constructor() {
        //初始化引擎
        Laya3D.init(0,0,true);
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene:Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;
        //添加摄像机
        var camera:Laya.Camera = (scene.addChild(new Laya.Camera(0,0.1,100))) as Laya.Camera;
        //移动摄像机位置
        camera.transform.translate(new Laya.Vector3(0,2,3));
        //旋转摄像机方向（角度）
        camera.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
        //设置背景颜色
        camera.clearColor = null;

        //添加平行光
        var directionLight:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //灯光的环境色
        directionLight.ambientColor = new Laya.Vector3(0.6,0.6,0.6);
        //灯光的高光色
        directionLight.specularColor = new Laya.Vector3(0.6,0.6,0.6);
        //灯光的漫反射颜色
        directionLight.diffuseColor = new Laya.Vector3(1.6,1.6,1.6);
        //灯光的方向（弧度）
        directionLight.direction = new Laya.Vector3(0.3,-1,0);

        //添加自定义模型
        this.box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1))) as Laya.MeshSprite3D;
        //模型旋转方向
        // box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
        //创建模型的材质
        var material:Laya.StandardMaterial = new Laya.StandardMaterial();
        //材质的漫反射贴图
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        //为模型赋上材质
        this.box.meshRender.material = material;

        //添加自定义脚本并实例化脚本对象
        this.box.addComponent(BoxControlScript);
        //可在添加组件时获取组件对象
        // this.boxScript = box.addComponent(BoxControlScript);
        //添加定时4秒执行一次回调函数
        Laya.timer.once(4000,this,this.onLoop);
    }
    //4秒后回调函数，移除脚本组件
    private onLoop():void{
        //移除BoxControlScript类型脚本组件
        this.box.removeComponentsByType(BoxControlScript);
        //移除所有组件
        // this.box.removeAllComponent();
        //如果不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
        // this.boxScript.enable = false;
    }
}
new LayaAir3D_Script;
```


In the code above, such as 4 seconds later, developers don't want to remove components, just stop using scripts, and you can set scripts to enable properties to be false.

When you compile the above code, you can get the following effect (Figure 1). After the component is removed, the model stops rotating.

![图1](img/1.gif)<br>（Picture 1）


