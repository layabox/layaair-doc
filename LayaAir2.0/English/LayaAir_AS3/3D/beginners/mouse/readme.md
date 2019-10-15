##Mouse Interaction in LayaAir3D

###Overview of Mouse Interaction

In LayaAir 2D engine, the object of 2D display has mouse events for us to use, and the logic is simple and convenient to write. This function is not implemented in LayaAir 3D engine. 3D space is more complex. There are many relationships among objects in space, such as depth, distance, cascade, tailoring, father and son, and the space is changing constantly. Therefore, the 3D engine uses collider, layer and physical ray detection, collision information to make mouse judgment. Let's first understand their concepts and functions.



####Collider Collider

Collider is a kind of physical component, which can be added to 3D display objects. It is mainly used for collision detection of objects in 3D space. According to the shape of 3D display objects, it can also be divided into different types.

There are three types of colliders currently supported by the LayaAir3D engine.**Sphere Collider**,**Box Collider**,**Mesh Collider**。 from**Accuracy of collision detection**and**Consumption performance**Sphere Collider-Box Collider-Mesh Collider is the order from low to high, and the suitable collider can be selected according to the development needs of the game.

The method of adding collider components to 3D display object code is as follows (Engine Version 2.0). It is suggested that developers do not add quadrate tests with code. It is more troublesome to add collision components to Unity directly.

Tips: Colliders must be added to display objects of type MeshSprite3D, not Sprite3D objects, otherwise they will fail.


```java

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/

//给模型添加盒子碰撞器
var boxCollider:PhysicsCollider =  box.addComponent(PhysicsCollider)as PhysicsCollider;
var boxShape:BoxColliderShape = new BoxColliderShape(1,1,1);

//给模型添加球碰撞器
var sphereCollider:PhysicsCollider = sphere.addComponent(PhysicsCollider)as PhysicsCollider;
var sphereShape:SphereColliderShape = new SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//给模型添加碰撞组件
var meshCollider:PhysicsCollider = meshSprite3D.addComponent(PhysicsCollider);
//创建网格碰撞器
var meshShape:MeshColliderShape = new MeshColliderShape();
//获取模型的mesh
meshShape.mesh = meshSprite3D.meshFilter.sharedMesh as Mesh
//设置模型的碰撞形状
meshCollider.colliderShape = meshShape;	
```


Starting with engine version 1.7.12 and export plug-in version 1.7.0, Collider added to the 3D model in Unity can be exported and the engine is automatically loaded and created.

After adding BoxCollider and Sphere Collider to the model in Unity, the size of the collision box or collision ball can also be set according to the requirements. The collision box can be smaller or larger than the actual model, and the location can also be changed to facilitate developers'logical processing.



####Layer Layer

There are 32 layers in the default scenario, and you can choose to throw the 3D wizard in any layer. For the camera, the camera can be tailored according to the level.**In collision detection, we can control which layer we collide with and which layer we don't collide with.**。

The method of specifying the 3D Elf Layer is as follows:


```java

		//指定3D精灵的层
		plane.layer = 10;
		
```




####Ray Ray

Radiation is a data type, not a display object. It has the attributes of origin and direction.

In the game, because the view space often changes, in order to simulate the mouse's position in the 3D space, the LayaAir3D engine provides the camera Camera to create a ray, which produces a ray perpendicular to the screen.

The camera creates rays as follows:


```java

//射线初始化（必须初始化）
ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));

//获取鼠标在屏幕空间位置
var point:Vector2 = new Vector2();
point.elements[0] = Laya.stage.mouseX;
point.elements[1] = Laya.stage.mouseY;

camera.viewportPointToRay(point,ray);
		
```




####Physical Radiation Detection

When we create colliders for 3D display objects in the scene, layers are set for them (default is layer 0) and rays are created, physical ray collisions can be used to detect intersection. Developers can make their own logical judgments according to their needs, such as mouse pickup, selection, creation and so on.

Physics physics class is used in physical ray detection. It provides us with two methods: rayCast (), the first collider information method to detect collisions, and rayCastAll () method to detect all collider information to obtain collisions. They are static methods. Developers can choose to use them according to their needs, such as API (Figure 1).



 ![图1](img/1.png)<br> (Fig. 1)



####Collision Information HitResult

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


```java

Scene3D.load("h5/LayaScene_monkey/monkey.ls",Handler.create(this,function(s:Scene3D):void{
  scene = Laya.stage.addChild(s)as Scene3D;

  //添加照相机
  camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
  camera.transform.translate(new Vector3(0, 3, 3));
  camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
  camera.clearColor = null;

  //添加方向光
  var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
  directionLight.color = new Vector3(0.6, 0.6, 0.6);
  directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
//对场景的所有物体进行循环
  for(var i:int = (scene.numChildren-1);i>-1;i--)
  {
    //如果模型为meshsprite3D
    if(scene.getChildAt(i)is MeshSprite3D)
    {
      trace(scene.getChildAt(i).name);
      //获取模型的MeshSprite3D
      var meshSprite3D:MeshSprite3D = scene.getChildAt(i)as MeshSprite3D;
      //给模型添加碰撞组件
      var meshCollider:PhysicsCollider = meshSprite3D.addComponent(PhysicsCollider);
      //创建网格碰撞器
      var meshShape:MeshColliderShape = new MeshColliderShape();
      //获取模型的mesh
      meshShape.mesh = meshSprite3D.meshFilter.sharedMesh as Mesh
        //设置模型的碰撞形状
        meshCollider.colliderShape = meshShape;
    }
  }
}))
  //射线初始化（必须初始化）
  	ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
	addMouseEvent();
}	
public function addMouseEvent():void{
  //鼠标事件监听
  Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
}
public var _outHitResult:HitResult = new HitResult();
public function onMouseDown():void{
	posX = point.elements[0] = MouseManager.instance.mouseX;
	posY = point.elements[1] = MouseManager.instance.mouseY;
  //产生射线
  camera.viewportPointToRay(point,ray);
  //拿到射线碰撞的物体
  scene.physicsSimulation.rayCast(ray,_outHitResult);
  //如果碰撞到物体
  if (_outHitResult.succeeded)
  {
    //删除碰撞到的物体
    _outHitResult.collider.owner.removeSelf();
    trace("碰撞到物体！！")
  }
```


####Override script:

**The onMouseDown mouse that directly overrides script3D listens for events and is triggered when the mouse clicks on the model.**


```java

package common{
  import laya.components.Script;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.material.RenderState;
  import laya.d3.core.material.PBRStandardMaterial;
  import laya.d3.math.Vector4;
  import laya.d3.math.Vector3;
  import laya.d3.core.material.PBRSpecularMaterial;
  import laya.events.Event;
  import laya.d3.component.Script3D;
  import laya.d3.loaders.MeshReader;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.d3.physics.Collision;

  public class SceneScript extends Script3D{
    //**************** wq *****************************************
    public var box :MeshSprite3D ;
    public function SceneScript() {
    }
    /**
		 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
		 */
    override public function onAwake():void{
      box = this.owner as MeshSprite3D;
    }
    /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
    override public function onUpdate():void{

    }
    //物体必须拥有碰撞组件（Collider）
    //当被鼠标点击
    override public function onMouseDown(e:Event):void{
      trace("点击到了我box");
      //从父容器销毁我自己
      box.removeSelf();
    }
    //当产生碰撞
    override public function onCollisionEnter(collision:Collision):void {
      (box.meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(0.0,0.0,0.0,1.0);
      // box.removeSelf();

    }

  }
}
```


Compile the code to get the following effect (Figure 2). Click the mouse to get the car and remove the car model from the scene.



 ![图2](img/2.gif)<br> (Figure 2)



###Mouse Creates Placement Objects

In the game, we often use mouse control to place game items, such as nurturing games to place buildings, characters, props on the ground.

The method of placing objects with mouse is similar to that of picking up objects. It also needs to use 3D elements and methods such as collider, ray, ray detection, collision information, etc.

When creating an item, clicking on the model ray intersects with it, we can get the location of the click through the collision information rayCastHit. point, and then place the created item here. And we used cloning to create objects, and developers paid attention to it.

In the pickup example, we used the box Collider BoxCollider. In the creation example, we used the grid Collider Mesh Collider, which is more accurate.

The main class code is modified as follows:

Create a truck model and add grid collider components to the truck body.


```java

package
{
  import laya.d3.component.physics.MeshCollider;
  import laya.d3.core.Camera;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.scene.Scene;
  import laya.display.Stage;
  import laya.display.Text;
  import laya.events.Event;
  import laya.utils.Handler;

  public class LayaAir3D_MouseInteraction
  {
    /**自定义场景**/		
    private var gameScene:GameScene;

    public function LayaAir3D_MouseInteraction()
    {
      //初始化引擎
      Laya3D.init(1000, 500,true);

      //适配模式
      Laya.stage.scaleMode = Stage.SCALE_FULL;
      Laya.stage.screenMode = Stage.SCREEN_NONE;

      //加载3D资源
      Laya.loader.create([{url:"LayaScene_truck/truck.lh"},
                          {url:"LayaScene_box/box.lh"}],Handler.create(this,onComplete));	
    }

    private function onComplete():void
    {
      //创建3D场景
      var scene:Scene3D=new Scene3D();
      //初始化场景（摄像机、碰撞相关对象、添加碰撞器等）
      Laya.stage.addChild(scene);
      //为场景添加控制脚本
      scene.addScript(SceneScript);
      //创建货车模型，加载到场景中
      Sprite3D.load("h5/LayaScene_willhero/chengqiang35.lh",Handler.create(this,function(sp:Sprite3D):void{
        var cheng:MeshSprite3D = scene.addChild(sp.getChildAt(0))as MeshSprite3D;
        var chengCollider:PhysicsCollider = cheng.addComponent(PhysicsCollider);
        //添加网格型碰撞器组件
        var chengshape:MeshColliderShape = new MeshColliderShape();
        //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
        chengshape.mesh = cheng.meshFilter.sharedMesh as Mesh; 
      }))
    }
  }
}
```


The scenario script control class code was modified as follows:


```java

package common{
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.material.RenderState;
  import laya.d3.core.material.PBRStandardMaterial;
  import laya.d3.math.Vector4;
  import laya.d3.math.Vector3;
  import laya.d3.core.material.PBRSpecularMaterial;
  import laya.events.Event;
  import laya.d3.component.Script3D;
  import laya.d3.loaders.MeshReader;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.d3.physics.Collision;
  import laya.d3.core.scene.Scene3D;
  import laya.d3.core.Camera;
  import laya.d3.math.Ray;
  import laya.d3.physics.HitResult;
  import laya.d3.resource.models.BoxMesh;
  import laya.physics.Physics;
  import laya.d3.math.Vector2;
  import laya.events.MouseManager;
  import laya.d3.physics.PhysicsCollider;
  import laya.d3.physics.shape.BoxColliderShape;

  public class SceneScript extends Script3D{
    //**************** wq *****************************************
    public var scene:Scene3D;
    public var camera:Camera;
    public var ray:Ray;
    public var rayCastHit:HitResult = new HitResult();
    public var box :MeshSprite3D;

    public var point:Vector2 = new Vector2();

    public function SceneScript() {
    }
    override public function onAwake():void
    {
      scene = owner as Scene3D
    }
    override public function onStart():void
    {
      //添加照相机
      camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
      camera.transform.translate(new Vector3(0, 3, 3));
      camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
      camera.clearColor = null;

      ray = new Ray(new Vector3(0,0,0),new Vector3(0,0,0));

      //创建一个货物模型
      box = scene.addChild(new MeshSprite3D(new BoxMesh(0.5,0.5,0.5)))as MeshSprite3D;
      Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
    }
    override public function onUpdate():void{

    }
    private function onMouseDown():void{
      point.x = MouseManager.instance.mouseX;
      point.y = MouseManager.instance.mouseY;

      camera.viewportPointToRay(point,ray);
      scene.physicsSimulation.rayCast(ray,rayCastHit);

      if (rayCastHit.succeeded)
      {
        //克隆一个货物模型
        var cloneBox:MeshSprite3D = Sprite3D.instantiate(box) as MeshSprite3D;
        //给物体添加碰撞组件
        var meshCollider:PhysicsCollider = cloneBox.addComponent(PhysicsCollider);
        var cloneMesh:BoxColliderShape = new BoxColliderShape(0.5,0.5,0.5);
        meshCollider.colliderShape = cloneMesh;

        scene.addChild(cloneBox);
        cloneBox.transform.position = rayCastHit.point;
      }
    }
  }
}
```




By compiling and running the code, we can see that the object can be created by clicking on the mouse (Figure 3), and the triangle at the intersection of the model is displayed when the ray intersects the model.

![图3](img/3.gif)<br> (Figure 3)