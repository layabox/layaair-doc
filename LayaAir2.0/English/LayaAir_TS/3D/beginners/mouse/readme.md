#Mouse interaction of layaair3d

###Overview of Mouse Interaction

In LayaAir 2D engine, the object of 2D display has mouse events for us to use, and the logic is simple and convenient to write. This function is not implemented in LayaAir 3D engine. 3D space is more complex. There are many relationships among objects in space, such as depth, distance, cascade, tailoring, father and son, and the space is changing constantly. Therefore, the 3D engine uses collider, layer and physical ray detection, collision information to make mouse judgment. Let's first understand their concepts and functions.



####Collider Collider

Collider is a kind of physical component, which can be added to 3D display objects. It is mainly used for collision detection of objects in 3D space. According to the shape of 3D display objects, it can also be divided into different types.

There are three types of colliders currently supported by the LayaAir3D engine.**Sphere Collider**,**Box Collider**,**Mesh Collider**。 from**Accuracy of collision detection**and**Consumption performance**Sphere Collider-Box Collider-Mesh Collider is the order from low to high, and the suitable collider can be selected according to the development needs of the game.

The method of adding collider component to 3D display object code is as follows. It is suggested that developers do not add quadratic test with code. It is more troublesome to add collision component export directly in Unity.

Tips: Colliders must be added to display objects of type MeshSprite3D, not Sprite3D objects, otherwise they will fail.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加碰撞器组件并获取
var meshCollider:Laya.PhysicsCollider = meshSprite3d1.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
var boxShape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
//获取模型的Mesh网格
boxShape.mesh = meshSprite3d1.meshFilter.sharedMesh as Laya.Mesh;
//把Mesh网格添加到碰撞器
meshCollider.colliderShape = boxShape;

//添加碰撞器组件并获取
var sphereCollider:Laya.PhysicsCollider = meshSprite3d2.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建球型碰撞器
var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//添加碰撞器组件并获取
var boxCollider:Laya.PhysicsCollider = meshSprite3d3.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建盒型碰撞器
var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
boxCollider.colliderShape = boxShape;	
```


Starting with engine version 1.7.12 and export plug-in version 1.7.0, Collider added to the 3D model in Unity can be exported and the engine is automatically loaded and created.

After adding BoxCollider and Sphere Collider to the model in Unity, the size of the collision box or collision ball can also be set according to the requirements. The collision box can be smaller or larger than the actual model, and the location can also be changed to facilitate developers'logical processing.



###Layer Layer

There are 32 layers in the default scenario, and you can choose to throw the 3D wizard in any layer. For the camera, the camera can be tailored according to the level.**In collision detection, we can control which layer we collide with and which layer we don't collide with.**。

The method of specifying the 3D Elf Layer is as follows:


```typescript

//指定3D精灵的层
meshSprite3d1.layer = 10
```




###Ray Ray

Radiation is a data type, not a display object. It has the attributes of origin and direction.

In the game, because the view space often changes, in order to simulate the mouse's position in the 3D space, the LayaAir3D engine provides the camera Camera to create a ray, which produces a ray perpendicular to the screen.

The camera creates rays as follows:


```typescript

//射线初始化（必须初始化）
 this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
//获取鼠标在屏幕空间位置
 private point:Laya.Vector2 = new Laya.Vector2();
 this.point.elements[0] = Laya.MouseManager.instance.mouseX;
 this.point.elements[1] = Laya.MouseManager.instance.mouseY;
//详设计产生射线方法，通过2D坐标获取与屏幕垂直的一条射线
this.camera.viewportPointToRay(this.point,this.ray);
```




###Physical Radiation Detection

When we create colliders for 3D display objects in the scene, layers are set for them (default is layer 0) and rays are created, physical ray collisions can be used to detect intersection. Developers can make their own logical judgments according to their needs, such as mouse pickup, selection, creation and so on.

Physics physics class is used in physical ray detection. It provides us with two methods: rayCast (), the first collider information method to detect collisions, and rayCastAll () method to detect all collider information to obtain collisions. They are static methods. Developers can choose to use them according to their needs, such as API (Figure 1).

![1](img/1.png)(图1)</br>







###Collision Information HitResult

The collision information of X-ray detection must be initialized before detection. If the X-ray intersects with the 3D display object, the information of intersecting object, intersecting spatial position, intersecting triangular vertices and so on can be obtained from the RayCastHit attribute of the collision information.

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

// 程序入口
class Main {
  private scene:Laya.Scene3D;
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private hitresult:Laya.HitResult = new Laya.HitResult();
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    Laya.Scene3D.load("LayaScene_monkey/monkey.ls",Laya.Handler.create(this,function(s:Laya.Sprite3D):void{
      this.scene = Laya.stage.addChild(s) as Laya.Scene3D;

      //添加照相机
      this.camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
      this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
      this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
      this.camera.clearColor = null;

      //添加方向光
      var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
      // 添加自定义模型(box)
      var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1))) as Laya.MeshSprite3D;
      box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
      box.transform.translate(new Laya.Vector3(3,2,2));
      //给模型添加碰撞器前需要先给模型添加碰撞组件
      var boxCollider:Laya.PhysicsCollider =  box.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
      var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
      //创建物理刚体组件
      var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
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
      var planeMat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
      Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this, function(tex:Laya.Texture2D):void {
        planeMat.albedoTexture = tex;
        box.meshRenderer.material = planeMat;
      }));
    }));
	//射线初始化（必须初始化）
    this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    //鼠标事件监听
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  private onMouseDown():void{
    //获取鼠标位置
    this.point.elements[0] = Laya.MouseManager.instance.mouseX;
    this.point.elements[1] = Laya.MouseManager.instance.mouseY;
	//产生射线
    this.camera.viewportPointToRay(this.point,this.ray);
    //拿到射线碰撞的物体
    this.scene.physicsSimulation.rayCast(this.ray,this.hitresult);
	//如果碰撞到物体
    if (this.hitresult.succeeded)
    {
      //删除碰撞到的物体
      this.hitresult.collider.owner.removeSelf();
      console.log("碰撞到物体！！")
    }
  }
}
new Main();
```


####Overwrite scripts:

**The onMouseDown mouse that directly overrides script3D listens for events and is triggered when the mouse clicks on the model.**


```typescript

export default class SceneScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
     /**
     * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
     */
    public onAwake():void{
        this.box = this.owner as Laya.MeshSprite3D;
    }
    //物体必须拥有碰撞组件（Collider）
    public onMouseDown():void{
        console.log("点到我了");
        this.box.removeSelf();
    }

    public onCollisionEnter(conllision):void{
        
        (this.box.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0,0,0,1);
    }
}
```


Compile the code to get the following effect (Figure 2). Click the mouse to get the car and remove the car model from the scene.

![2](img/2.gif)(图2)</br>







###Mouse Creates Placement Objects

In the game, we often use mouse control to place game items, such as nurturing games to place buildings, characters, props on the ground.

The method of placing objects with mouse is similar to that of picking up objects. It also needs to use 3D elements and methods such as collider, ray, ray detection, collision information, etc.

When creating an item, clicking on the model ray intersects with it, we can get the location of the click through the collision information rayCastHit. point, and then place the created item here. And we used cloning to create objects, and developers paid attention to it.

In the pickup example, we used the box Collider BoxCollider. In the creation example, we used the grid Collider Mesh Collider, which is more accurate.

The main class code is modified as follows:

Create a truck model and add grid collider components to the truck body.


```typescript

import SceneScript from "./SceneScript";

// 程序入口
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
    scene.addComponent(SceneScript);

    //添加方向光
    var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    var b:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10,1,10)))as Laya.MeshSprite3D;
    var bcollider:Laya.PhysicsCollider = b.addComponent(Laya.PhysicsCollider);
    var bshape:Laya.BoxColliderShape = new Laya.BoxColliderShape(10,1,10);
    bcollider.colliderShape = bshape;
    //创建货车模型，加载到场景中
    Laya.Sprite3D.load("LayaScene_willhero/chengqiang35.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
      var cheng:Laya.MeshSprite3D = scene.addChild(sp.getChildAt(0))as Laya.MeshSprite3D;
      var chengCollider:Laya.PhysicsCollider = cheng.addComponent(Laya.PhysicsCollider);
      //添加网格型碰撞器组件
      var chengshape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
      //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
      chengshape.mesh = cheng.meshFilter.sharedMesh as Laya.Mesh; 
      chengCollider.colliderShape = chengshape;
    }));
  }
}
new Main();
```


The scenario script control class code was modified as follows:


```typescript

export default class SceneScript extends Laya.Script3D{
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private _HitCastResult:Laya.HitResult;
  private box:Laya.MeshSprite3D;
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor(){
    super();
  }

  public onStart():void {
    //添加一个摄影机
    this.camera =this.owner.addChild(new Laya.Camera(0,0.1,100)) as Laya.Camera;
    this.camera.transform.translate(new Laya.Vector3(0,3,3));
    this.camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    this.camera.clearColor = null;
    
	//初始化一条射线
    this.ray= new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    this._HitCastResult = new Laya.HitResult();
    this.box = this.owner.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5))) as Laya.MeshSprite3D;
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  public onMouseDown():void{
    //获取鼠标位置
    this.point.x = Laya.MouseManager.instance.mouseX;
    this.point.y = Laya.MouseManager.instance.mouseY;
    //发射射线
    this.camera.viewportPointToRay(this.point,this.ray);
    (this.owner as Laya.Scene3D).physicsSimulation.rayCast(this.ray,this._HitCastResult);

    if (this._HitCastResult.succeeded)
    {
      //克隆一个货物模型
      var cloneBox:Laya.MeshSprite3D = Laya.Sprite3D.instantiate(this.box) as Laya.MeshSprite3D;
      //给物体添加碰撞组件
      var meshCollider:Laya.PhysicsCollider = cloneBox.addComponent(Laya.PhysicsCollider);
      var cloneMesh:Laya.BoxColliderShape = new Laya.BoxColliderShape(0.5,0.5,0.5);
      meshCollider.colliderShape = cloneMesh;
		
      //把物体添加到场景
      this.owner.addChild(cloneBox);
      //把物体移动到射线点击的位置
      cloneBox.transform.position = this._HitCastResult.point;
    }
  }
}
```


By compiling and running the code, we can see that the object can be created by clicking on the mouse (Figure 3), and the triangle at the intersection of the model is displayed when the ray intersects the model.

![3](img/3.gif)(Fig. 3) </br>