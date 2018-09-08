# LayaAir3D之脚本组件

### 父类组件Component3D

在LayaAir 3D引擎中，为了方便显示对象控制及代码的维护，提供了功能强大的组件类Component3D。我们的动画控制组件、碰撞器、脚本、骨骼挂点等都是基于组件功能的延伸扩展，属于它的子类。并且，LayaAir 3D引擎还支持一个3D对象上添加多个组件，使组件控制更加灵活。

在之前的技术档中，我们介绍了动画控制组件与碰撞器组件的基本功能，在此不再多说。本章节中，**我们主要以脚本组件为示例进行讲解**，因为它继承于组件类，但几乎没有自己的扩展功能，主要使用父类Component3D属性与方法，脚本功能后续更新会增加，敬请期待！。



### 组件的主要属性与方法

**owner**：被绑定组件所属的Sprite3D对象。

**enable：**是指组件是否启用，加载组件时，默认情况下是启用状态，如果修改成fasle后，首先会发送激活更改事件，然后组件的更新方法_update()停止执行。

**onAwake()：**组件载入时执行方法，默认无代码。可在继承类中覆盖它，将需要初始化的逻辑代码放入其中。

**onStart()：**加载组件的3D对象实例化完成后，第一次更新时执行，默认无代码。可在继承类中覆盖它，将需要3D对象加载完成后的逻辑代码放入其中。

例如3D显示对象异步加载时就添加了脚本，它的子模型与材质还未加载完成，如果脚本中（如构造方法、`onAwake()`方法中）逻辑代码获取3D显示对象的子对象或贴图就会出现空对象bug。这时就可以把这些逻辑代码入入onStart()方法中而避免空对象bug发生。

又例如克隆一个带脚本的3D对象，如果3D对象中也有较多子对象，脚本克隆会先完成，如果脚本中逻辑不放入onStart()方法中，去获取子对象时也会发生空对象bug。

**onUpdate()：**组件更新方法，相当于帧循环。可在继承类中覆盖它，把需要每帧更新的逻辑代码放入此方法中。



### 组件的相关事件

**COMPONENT_ADDED：**组件被加载完成事件，由组件所有者Sprite3D发送，并且组件作为参数被发送。

**COMPONENT_REMOVED：**组件被移除后事件，由组件所有者Sprite3D发送，并且组件作为参数被发送。

**ENABLE_CHANGED：**组件启用事件，启用属性enable修改后由组件发送，并且启用属性作为参数被发送。



### 脚本组件Script

脚本继承于组件，因此可以用显示对象的addComponent()方法把脚本添加到3D显示对象上。

在官网的3D引擎示例中，很多示例的摄像机都运用到的摄像机移动脚本CameraMoveScript，摄像机添加了此脚本后，就可以通过鼠标控制它旋转及键盘控制它上下左右前后的移动，开发者们从网上下载示例后，可以找到它进行研究和修改使用。添加脚本组件方法代码如下：

```typescript
//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```

当然，在某些逻辑的需要下，也可以把脚本从对象上删除。删除脚本组件方法如下：

```typescript
//获取摄像机上的脚本
var script:CameraMoveScript = camera.getComponent(CameraMoveScript);
//删除
script.destroy();
```



### 创建自己的脚本组件

开发者们可以参考摄像机脚本，创建自己的脚本组件用于控制场景中的对象。

在LayaAir 3D游戏开发中，我们基本都在unity中创建场景、角色、动画，导出场景并在代码中加载后，就可以对场景中不同的对象加上相应的控制脚本组件。

比如主角控制脚本、NPC控制脚本、场景物体控制脚本等，一个游戏关卡就这样诞生了，当游戏加载下一个关卡场景后，脚本还可以复用，项目维护起来方便快捷，并且控制与显示进行了分离。

下列示例中，我们修改技术文档中“快速开启3D之旅”的代码，创建一个控制脚本添加到box上，并且4秒钟后移除脚本组件。

首先创建自定义脚本BoxControlScript，用于修改脚本所属对象box的材质、循环旋转。

```typescript
export default class BoxControlScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
    /**
	 * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
	 */
    public onAwake():void{
        //绑定对象
        this.box = this.owner as Laya.MeshSprite3D;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public onStart():void{
        //获得3d材质
        var material:Laya.PBRSpecularMaterial = this.box.meshRenderer.material as Laya.PBRSpecularMaterial;
        material.albedoColor = new Laya.Vector4(1,0,0,1);
    }
    /**
     * 覆写组件更新方法(相当于循环)
     */
    public onUpdate():void{
        // 所属脚本对象旋转
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
}
```

然后在“快速开启3D之旅”的代码中，为box添加上述脚本类型，并于4秒后去除脚本。

```typescript
// 程序入口
import BoxControlScript from "./BoxControlScript";

class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.PBRSpecularMaterial = new Laya.PBRSpecularMaterial();
		Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
                material.albedoTexture = tex;
                box.meshRenderer.material = material;

                //给box添加自定义脚本
                box.addComponent(BoxControlScript);
        }));
        //4秒后删除组件
        Laya.timer.once(4000,this,function(){
            var script:BoxControlScript = box.getComponent(BoxControlScript);
            // 消除脚本
            // script.destroy();
            //不启用脚本可以有相同的效果（组件onUpdate方法将不会被更新）
            script.enabled=false;
        });
    }
}
new Main();
```

上列代码中，如4秒后开发者们不想移除组件，只是停止使用脚本，可设置脚本启用属性为false。

编译运行上述代码，可以得到以下效果（图1）,移除组件后，模型停止旋转。

![1](img/1.gif)(图1)</br>

