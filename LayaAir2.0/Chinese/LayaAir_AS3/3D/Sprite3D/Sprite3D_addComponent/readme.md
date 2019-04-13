# Sprite3D添加组件或脚本 

###### *version :2.0.1beta   Update:2019-4-13*

**Component** 组件，是附加到所有3D对象的内容的基类。在给物体添加组件时，需要物体使用`addComponent`方法。

![](img/1.png)<br>(图1)

**Script3D** 这是3D世界中的脚本，继承自组件，是组件的一种。该类被定义为 '抽象类' ,不允许实例。该类提供了一系列虚方法。详细使用可以去API中查看（[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.component.Script3D)），在3D世界的开发中脚本类会在很多地方被使用，该组件将会在后面的脚本篇中详细的讲解，在本篇只是简单的讲解如何给Sprite3D添加一个脚本。

以下代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=ScriptSample)）。

> 主类：
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

> 脚本类：(该脚本旋转了添加了这个脚本的物体)
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

这样脚本就添加完成了，我们可以看下运行之后的效果：

![](img/2.gif)<br>(图2)
