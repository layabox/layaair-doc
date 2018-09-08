# LayaAir3D之鼠标交互

### 鼠标交互概述

在LayaAir2D引擎中，2D显示对象都有鼠标事件供我们使用，编写逻辑简单方便。在LayaAir 3D引擎中并未实现这种功能，3D空间更为复杂，显示对象在空间中有纵深远近、层叠、裁剪、父子等关系，并且空间还在不断变换。因此3D引擎采用了碰撞器、层与物理射线检测、碰撞信息的方式进行鼠标判断，下面先让我们来先了解它们的概念与作用。



### 碰撞器Collider

碰撞器是一种物理组件，可以添加到3D显示对象上，主要用于3D空间中的物体进行碰撞检测，根据3D显示对象的形状不同，也分为了不同的类型。

LayaAir3D引擎现支持的碰撞器有三种类型，分别是**球型碰撞器SphereCollider**，**盒型碰撞器BoxCollider**，**网格碰撞器MeshCollider**。从**碰撞检测精确度**和**消耗性能**从低到高依次为SphereCollider—BoxCollider—MeshCollider；可以根据游戏中开发需求，选择适合的碰撞器。

3D显示对象代码添加碰撞器组件的方法如下（引擎1.7.12版），建议开发者不要用代码添加方试，较麻烦，可直接在Unity中添加碰撞组件导出使用。

Tips：碰撞器必须添加到MeshSprite3D类型的显示对象上，不能添加到Sprite3D对象上，否则会失效。

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

在引擎1.7.12与导出插件1.7.0版开始，在Unity中添加到3D模型上的Collider可以导出并且引擎自动加载创建。不过目前暂时不支持MeshCollider的导出，将在后续版本中完善该功能。 

在Unity中为模型添加了BoxCollider与SphereCollider后，还可以根据需求对碰撞盒或碰撞球的大小进行设置，碰撞盒可以比实际模型偏小或者偏大，位置也可更改，方便开发者们逻辑处理。

Tips：在Unity编辑器中，一个3D物体可支持多个碰撞器，但LayaAir导出插件（1.7.0版）目前只支持第一个碰撞器的导出，它请开发者们注意。如果希望在模型上添加多可碰撞器，可在制作模型时分解成多个子网格模型，在子网格模型上各自添加碰撞器用于检测。在后续的1.7.13版本中，我们将支持无子网格的3D物体多个碰撞器导出。

### 层Layer

默认场景中有32层，你可以选择把3D精灵扔在任意层内。用在摄像机上，摄像机可以根据层级进行裁剪；**用在碰撞检测上，可以控制碰撞什么层，不碰撞什么层**。

指定3D精灵层的方法如下：

```typescript
//指定3D精灵的层
plane.layer = 10;
```



### 射线Ray

射线是一个数据类型，并不是显示对象，它有原点origin、方向direction的属性。

在游戏中，因为视图空间经常变化，为了模拟鼠标的在3D空间中的位置，LayaAir3D引擎提供了摄像机Camera创建射线的方法，它产生了一条与屏幕垂直的一条射线。

摄像机创建射线方法如下：

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



### 物理射线检测

当我们为场景中3D显示对象创建了碰撞器，为它们设置了层（默认在第0层），并创建了射线后，就可以用物理射线碰撞来进行是否相交检测了，开发者可以根据需求进行自己的逻辑判断，比如鼠标拾取、选择、创建等。

物理射线检测我们使用了Physics物理类，它提供了我们两个方法，检测获取发生碰撞的第一个碰撞器信息方法rayCast()，和检测获取发生碰撞的所有碰撞器信息rayCastAll()方法，它们都是静态方法，开发者可以根据需求选择使用，API如（图1）

![1](img/1.png)(图1)</br>



### 碰撞信息HitResult

射线检测的碰撞信息在检测前必须初始化，如果射线与3D显示对象相交了，可以从碰撞信息HitResult属性中获得相交对象、相交的空间位置、相交的三角面顶点等各种信息。

HitResult.collider.owner即是相交的Node对象。

point为射线与模型相交的点的空间位置。

succeeded 是否与物体相交，相交即为true。

normal 是碰撞的物体法线（Vector3）。



### 鼠标拾取示例（射线 / 覆写脚本）

#### 射线：

根据以上的概念和方法，我们来制作一个鼠标射线拾取的示例，按以下步骤进行：

1、在unity场景中创建几个3D物品，以三辆汽车为例，通过导出导出插件使用。

2、建立场景Scene的实例。

3、获取模型的Mesh,利用Mesh给模型添加碰撞器。

4、初始化一条射线。

5、加入鼠标点击事件，如果点击了鼠标且又与3D物品相交，那么我们就让3D物品消失并提示获取信息。

主类代码如下：

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

脚本类SceneScript代码如下：

#### 覆写脚本：

**直接覆写Script3D的onMouseDown鼠标监听事件，当鼠标点击到模型时会被触发。**

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

编译上示代码，可以得到以下效果（图2），鼠标点击获得汽车，并从场景中移除汽车模型。

![2](img/2.gif)(图2)</br>



### 鼠标创建放置物体

在游戏中我们还经常使用鼠标控制放置游戏物品，比如养成类游戏在地面放置建筑、角色、道具等。

鼠标放置物体与拾取物体大致方法差不多，同样需要使用碰撞器、射线、射线检测、碰撞信息等3D元素与方法。 

而创建物品时，点击模型射线与之相交后，我们可以通过碰撞信息rayCastHit.point获得点击的位置，然后将创建的物品放置此处。并且，创建物品时我们使用了克隆的方式，开发者们注意其方法。

在拾取示例中我们使用了盒型碰撞器BoxCollider，在创建示例中我们使用网格碰撞器MeshCollider，它更精确。

主类代码修改如下：

创建货车模型，并为货车车身添加网格碰撞器组件。

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

场景子类代码修改如下：

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

编译运行上示代码，我们可以看见可以通过鼠标点击创建物体了（图3），并且射线与模型相交时显示了模型相交处的三角面。

![3](img/3.gif)(图3)</br>