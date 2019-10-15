#Sprite3D add components or scripts

###### *version :2.0.1beta   Update:2019-4-13*

**Component**Components are the base classes attached to the content of all 3D objects. When adding components to an object, the object needs to be used`addComponent`Method.

![] (img/1.png)<br> (Figure 1)

**Script3D**This is a script in the 3D world. It inherits self-assembly and is a component. This class is defined as an'abstract class', and instances are not allowed. This class provides a series of virtual methods. Detailed use can be viewed in the API（[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.component.Script3D)In the development of the 3D world, script classes will be used in many places. This component will be explained in detail in later script chapters. In this article, we will simply explain how to add a script to Sprite3D.

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sprite3D&name=ScriptSample))

> main class:
>


```typescript

class ScriptSample() {
    constructor(){
        //初始化引擎
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //预加载所有资源
        var resource:Array = ["res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"];
        Laya.loader.create(resource, Laya.Handler.create(this, this.onComplete));    
    }
    
    onComplete(){
        //记载场景
        var scene = Laya.stage.addChild(new Laya.Scene3D());

        //加载相机
        var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
        camera.transform.translate(new Laya.Vector3(0, 0.8, 1.5));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        //创建平行光
        var directionLight = scene.addChild(new Laya.DirectionLight());
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);

        //加载精灵
        var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        //精灵添加脚本
        monkey.addComponent(MonkeyScript);
        scene.addChild(monkey);
    }
}


```


> script class: (the script rotates the object that added the script)
>


```typescript


class MonkeyScript extends Laya.Script3D {
	constructor(){
        super();
        this.rotation = new Laya.Vector3(0, 0.01, 0);
    }
	onAwake() {
		console.log("onAwake");
	}
	
	onStart() {
		console.log("onStart");
	}
	
	onUpdate() {
		this.owner.transform.rotate(this.rotation, false);
	}
	
	onLateUpdate() {
		console.log("onLateUpdate");
	}
}

```


So the script is added, and we can see the effect after running:

![] (img/2.gif) <br> (Figure 2)
