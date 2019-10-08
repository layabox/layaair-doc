# 快速开始一个LayaAir3D项目

以下我们将用LayaAir引擎快速开始一个3D项目，并且以AS语言为教程，简单演示用引擎代码实现一个基本的3D应用。

## IDE创建3D示例项目

下载LayaAirIDE，启动新建项目选择3d项目如图所示。

![图](img/1.png)(图1)

这里我们选择**JavaScript**语言。创建完成我们发现ide为我们创建好了一个3d的模板。关于项目的结构介绍开发者可以参考2D的新手教程。这里不在赘述。

## 快速显示3D场景

我们直接F6（mac系统用户可能要cmd+F6）或者点击运行按钮，我们可以看到示例项目运行起来的3D场景了。

![图](img/2.png)(图2)

​	在GameUI.js这个开始页面的Runtime类里为我们构建了一个3D的世界，并且添加了一个简单的3D世界所必须要的几个要素（场景，摄像机，灯光，模型，材质）。以下的代码节选自GameUI.js。

```typescript
//加载场景文件
this.loadScene("test/TestScene.scene");

//添加3D场景
var scene = Laya.stage.addChild(new Laya.Scene3D());

//添加照相机
var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
camera.transform.translate(new Laya.Vector3(0, 3, 3));
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
camera.clearColor = null;

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1)));
box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
var material = new Laya.BlinnPhongMaterial();
Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex) {
    material.albedoTexture = tex;
}));
box.meshRenderer.material = material;
```

##### 	