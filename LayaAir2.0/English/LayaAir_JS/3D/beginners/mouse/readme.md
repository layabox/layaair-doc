#Mouse Interaction in LayaAir3D

###Overview of Mouse Interaction

In LayaAir 2D engine, the object of 2D display has mouse events for us to use, and the logic is simple and convenient to write. This function is not implemented in LayaAir 3D engine. 3D space is more complex. There are many relationships among objects in space, such as depth, distance, cascade, tailoring, father and son, and the space is changing constantly. Therefore, the 3D engine uses collider, layer and physical ray detection, collision information to make mouse judgment. Let's first understand their concepts and functions.



###Collider Collider

Collider is a kind of physical component, which can be added to 3D display objects. It is mainly used for collision detection of objects in 3D space. According to the shape of 3D display objects, it can also be divided into different types.

There are three types of colliders currently supported by the LayaAir3D engine.**Sphere Collider**,**Box Collider**,**Mesh Collider**。 from**Accuracy of collision detection**and**Consumption performance**Sphere Collider-Box Collider-Mesh Collider is the order from low to high, and the suitable collider can be selected according to the development needs of the game.

The method of adding collider component to 3D display object code is as follows (engine version 1.7.12). It is suggested that developers do not add quadrate test with code. It is more troublesome to add collision component to Unity directly.

Tips: Colliders must be added to display objects of type MeshSprite3D, not Sprite3D objects, otherwise they will fail.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//给模型添加盒子碰撞器
var boxCollider = box.addComponent(Laya.PhysicsCollider);
var boxShape = new Laya.BoxColliderShape(1,1,1);

//给模型添加球型碰撞器
var sphereCollider = sphere.addComponent(Laya.PhysicsCollider);
var sphereShape = new Laya.SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//给模型添加MESH碰撞器
var meshCollider = meshSprite3D.addComponent(Laya.PhysicsCollider);
var meshShape = new Laya.MeshColliderShape();
meshShape.mesh = meshSprite3D.meshFilter.shareMesh;
meshCollider.colliderShape = meshShape;
            
```


Starting with engine version 1.7.12 and export plug-in version 1.7.0, Collider added to the 3D model in Unity can be exported and the engine is automatically loaded and created.

After adding BoxCollider and Sphere Collider to the model in Unity, the size of the collision box or collision ball can also be set according to the requirements. The collision box can be smaller or larger than the actual model, and the location can also be changed to facilitate developers'logical processing.

###Layer Layer

There are 32 layers in the default scenario, and you can choose to throw the 3D wizard in any layer. For the camera, the camera can be tailored according to the level.**In collision detection, we can control which layer we collide with and which layer we don't collide with.**。

The method of specifying the 3D Elf Layer is as follows:


```typescript

//指定3D精灵的层
plane.layer = 10;
```




###Ray Ray

Radiation is a data type, not a display object. It has the attributes of origin and direction.

In the game, because the view space often changes, in order to simulate the mouse's position in the 3D space, the LayaAir3D engine provides the camera Camera to create a ray, which produces a ray perpendicular to the screen.

The camera creates rays as follows:


```typescript

//射线初始化（必须初始化）
 this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
//获取鼠标在屏幕空间位置
this.point = new Laya.Vector2();	
this.point.elements[0] = Laya.MouseManager.instance.mouseX;
this.point.elements[1] = Laya.MouseManager.instance.mouseY;
//详设计产生射线方法，通过2D坐标获取与屏幕垂直的一条射线
this.camera.viewportPointToRay(this.point,this.ray);
```




###Physical Radiation Detection

When we create colliders for 3D display objects in the scene, set up layers for them (the default is layer 0), and create rays, we can use physical ray collision to detect whether they intersect. Developers can make their own logical judgments according to the needs, such as mouse mark picking, selection, creation, etc.

Physics physics class is used in physical ray detection. It provides us with two methods: rayCast (), the first collider information method to detect collisions, and rayCastAll () method to detect all collider information to obtain collisions. They are static methods. Developers can choose to use them according to their needs, such as API (Figure 1).

![1](img/1.png)(Fig. 1) </br>



###Collision Information HitResult

The collision information of X-ray detection must be initialized before detection. If the X-ray intersects with the 3D display object, the information of intersecting object, intersecting spatial position, intersecting triangular vertices and so on can be obtained from the HitResult attribute of the collision information.

HitResult. collider. owner is the intersecting Node object.

Point is the spatial position of the point where the ray intersects the model.

Whether succeeded intersects with objects or not is true.

Normal is the normal of the colliding object (Vector 3).



###Mouse Pick-up Example (Ray/Overwrite Script)

####Ray:

Based on the above concepts and methods, we will make an example of mouse ray pickup, and follow the following steps:

1. Create several 3D objects in the unity scene. Take three cars as an example, export plug-ins to use.

2. Establish an example of Scene.

3. Get the Mesh of the model and add the Collider to the model by using Mesh.

4. Initialize a ray.

5. Add the mouse click event. If we click the mouse and intersect with the 3D objects, then we will make the 3D objects disappear and prompt for information.

The main class code is as follows:


```typescript

import SceneScript from "./SceneScript";

var Main = (function () {
  var ray;
  var point;
  var camera;
  var stage;
  var _outHitResult;
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    Laya.Scene3D.load("LayaScene_monkey/monkey.ls",Laya.Handler.create(this,function(s){
      this.scene = Laya.stage.addChild(s);
      //添加照相机
      this.camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100)));
      this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
      this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
      this.camera.clearColor = null;

      //添加方向光
      var directionLight = this.scene.addChild(new Laya.DirectionLight());
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

      //添加自定义模型
      var box = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
      box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
      box.transform.translate(new Laya.Vector3(3,2,2));

      var boxCollider = box.addComponent(Laya.PhysicsCollider);
      var boxShape = new Laya.BoxColliderShape(1,1,1)
      //创建物理刚体组件
      var rigidBody = box.addComponent(Laya.Rigidbody3D);
      //刚体质量
      rigidBody.mass = 10;
      //刚体的摩擦力
      rigidBody.friction = 0.4;
      //刚体的弹力
      rigidBody.restitution = 0.2;
      //刚体碰撞器的形状
      rigidBody.colliderShape = boxShape;
      //给box添加脚本组件
      box.addComponent(SceneScript);
      //给box添加材质
      var planeMat = new Laya.BlinnPhongMaterial();
      Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this,function(tex) {
        planeMat.albedoTexture = tex;
        box.meshRenderer.material = planeMat;
      }));
	  //射线初始化（必须初始化）
      this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
      this.point = new Laya.Vector2();
      //鼠标事件监听
      Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
    }));
    var _proto =Main.prototype;
    _proto.onMouseDown = function(){
      this.point.elements[0] = Laya.MouseManager.instance.mouseX;
      this.point.elements[1] = Laya.MouseManager.instance.mouseY;
      //必须先把outhitresult实例化
      this._outHitResult = new Laya.HitResult();
      //产生射线
      this.camera.viewportPointToRay(this.point,this.ray);
      //拿到射线碰撞的物体
      this.scene.physicsSimulation.rayCast(this.ray,this._outHitResult);
      //如果碰撞到物体
      if (this._outHitResult.succeeded)
      {
        //删除碰撞到的物体
        this._outHitResult.collider.owner.removeSelf();
        trace("碰撞到物体！！")
      }
    }
  }
  return Main;
} ());

new Main();

```


The script class SceneScript code is as follows:

####Overwrite scripts:

**The onMouseDown mouse that directly overrides script3D listens for events and is triggered when the mouse clicks on the model.**


```typescript

export default class SceneScript extends Laya.Script3D{
    constructor(){super()}
    //物体必须拥有碰撞组件（Collider）
    //当被鼠标点击
    onMouseDown(e){
        console.log("点击到我了");
        //从父容器销毁我自己
        this.owner.removeSelf();
    }
    onUpdate(){

    }
    //当产生碰撞
    onCollisionEnter(collision){
        this.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(0,0,0,1); 
    }
}
```


Compile the code to get the following effect (Figure 2). Click the mouse to get the car and remove the car model from the scene.

![2](img/2.gif)(Fig. 2) </br>



###Mouse Creates Placement Objects

In the game, we often use mouse control to place game items, such as nurturing games to place buildings, characters, props on the ground.

The method of mouse placement is similar to that of picking up objects. 3D elements and methods such as Collider, ray, ray detection and collision information are also needed.

When creating an item, clicking on the model ray intersects with it, we can get the location of the click through the collision information rayCastHit. point, and then place the created item here. And we used cloning to create objects, and developers paid attention to it.

In the pickup example, we used the box Collider BoxCollider. In the creation example, we used the grid Collider Mesh Collider, which is more accurate.

The main class code is modified as follows:

Create a truck model and add grid collider components to the truck body.


```typescript

import SceneScript from "./SceneScript";

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
    scene.addComponent(SceneScript);
    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    var b = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10,1,10)));
    var bcollider = b.addComponent(Laya.PhysicsCollider);
    var bshape = new Laya.BoxColliderShape(10,1,10);
    bcollider.colliderShape = bshape;
    //添加自定义模型
    Laya.Sprite3D.load("LayaScene_willhero/chengqiang35.lh",Laya.Handler.create(this,function(sp){
      var cheng = scene.addChild(sp.getChildAt(0));
      var chengCollider = cheng.addComponent(Laya.PhysicsCollider);
      //添加网格型碰撞器组件
      var chengshape = new Laya.MeshColliderShape();
      //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
      chengshape.mesh = cheng.meshFilter.sharedMesh; 
      chengCollider.colliderShape = chengshape;
    }))
  }
  return Main;
} ());

Main();

```


The scenario subclass code is modified as follows:


```typescript

export default class SceneScript extends Laya.Script3D{
  constructor(){
    super();
    this.camera = 0;
    this.ray = 0;
    this.point = 0;
    this.rayCastHit = 0;
    this.box = 0;
  }

  onStart(){
    //获取摄像机
    this.camera = this.owner.addChild(new Laya.Camera(0,0.1,100));
    this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
    this.camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    this.camera.clearColor = null;  

    this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    this.point = new Laya.Vector2();
    //创建一个货物模型
    this.box = this.owner.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5)));
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  onMouseDown(){
    this.point.x = Laya.MouseManager.instance.mouseX;
    this.point.y = Laya.MouseManager.instance.mouseY;

    this.camera.viewportPointToRay(this.point,this.ray);
    this.rayCastHit = new Laya.HitResult();
    this.owner.physicsSimulation.rayCast(this.ray,this.rayCastHit);

    if (this.rayCastHit.succeeded)
    {
      //克隆一个货物模型
      var cloneBox = Laya.Sprite3D.instantiate(this.box);
      //给物体添加碰撞组件
      var meshCollider = cloneBox.addComponent(Laya.PhysicsCollider);
      var cloneMesh = new Laya.BoxColliderShape(0.5,0.5,0.5);
      meshCollider.colliderShape = cloneMesh;

      this.owner.addChild(cloneBox);
      cloneBox.transform.position = this.rayCastHit.point;
    }
  }
}
```


When compiling and running the code shown above, we can see that the object can be created by clicking the mouse (Figure 3), and when the ray intersects the model, the triangular surface at the intersection of the model is displayed.

![3](img/3.gif)(Fig. 3) </br>