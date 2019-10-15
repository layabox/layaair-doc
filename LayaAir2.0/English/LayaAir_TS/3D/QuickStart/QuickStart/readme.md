#Quickly start a LayaAir3D project

Next, we will start a 3D project quickly with layaair engine, and take as language as a tutorial to demonstrate a basic 3D application with engine code.

##IDE Creates 3D Sample Projects

Download LayaAirIDE, start a new project, select a 3D project as shown in the figure.

![图](img/1.png)(图1)


Here we choose**TavaScript**Language. After the creation, we found that ide created a 3D template for us. Developers can refer to 2D novice tutorials for project structure introduction. I'm not going to elaborate here.

##Fast display of 3D scene

If we go directly to F6 (mac system users may want CMD + F6) or click the run button, we can see the 3D scene of the sample project running.

![图](img/2.png)(Fig. 2)

In the Runtime class of GameUI.js, the start page, we build a 3D world, and add several essential elements (scenes, cameras, lights, models, materials) for a simple 3D world. The following code excerpt is from GameUI.js.


```typescript

//添加3D场景
var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

//添加照相机
var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
camera.transform.translate(new Laya.Vector3(0, 3, 3));
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

//添加方向光
var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

//添加自定义模型
var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
    material.albedoTexture = tex;
}));
box.meshRenderer.material = material;
```


##### 	