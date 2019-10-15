#Sprite3D add components or scripts

###### *version :2.0.1beta   Update:2019-4-13*

**Component**Components are the base classes attached to the content of all 3D objects. When adding components to an object, you need the object to use`addComponent`Method.

![] (img/1.png)<br> (Figure 1)

**Script3D**This is a script in the 3D world. It inherits self-assembly and is a component. This class is defined as an'abstract class', and instances are not allowed. This class provides a series of virtual methods. Detailed use can be viewed in API（[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.component.Script3D)In the development of the 3D world, script classes will be used in many places. This component will be explained in detail in later script chapters. In this article, we will simply explain how to add a script to Sprite3D.

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=ScriptSample))

> main class:
>


```typescript

public function ScriptSample() {
    //初始化引擎
    Laya3D.init(0, 0);
    Laya.stage.scaleMode = Stage.SCALE_FULL;
    Laya.stage.screenMode = Stage.SCREEN_NONE;

    //预加载所有资源
    var resource:Array = ["res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"];
    Laya.loader.create(resource, Handler.create(this, onComplete));
}

private function onComplete():void {
    //记载场景
    var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

    //加载相机
    var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
    camera.transform.translate(new Vector3(0, 0.8, 1.5));
    camera.transform.rotate(new Vector3(-15, 0, 0), true, false);

    //创建平行光
    var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
    directionLight.color = new Vector3(0.6, 0.6, 0.6);

    //加载精灵
    var monkey:Sprite3D = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
    //精灵添加脚本
    monkey.addComponent(MonkeyScript);
    scene.addChild(monkey);
}
```


> script class: (the script rotates the object that added the script)
>


```typescript

import laya.d3.component.Script3D;
import laya.d3.core.Sprite3D;
import laya.d3.math.Vector3;

class MonkeyScript extends Script3D {
	private var rotation:Vector3 = new Vector3(0, 0.03, 0);
	
	override public function onAwake():void {
		trace("onAwake");
	}
	
	override public function onStart():void {
		trace("onStart");
	}
	
	override public function onUpdate():void {
		(owner as Sprite3D).transform.rotate(rotation, false);
	}
	
	override public function onLateUpdate():void {
		trace("onLateUpdate");
	}
}

```


So the script is added, and we can see the effect after running:

![] (img/2.gif) <br> (Figure 2)
