# 物理刚体

###### *version :2.1.1   Update:2019-7-19*

 **Rigidbody3D** 刚体就是动态碰撞器。任何物体想要受重力影响，受脚本施加的力的作用，或通过物理引擎来与其他物体交互，都必须包含一个刚体组件。更详细的使用情况可以查看刚体的文档：[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D)；

#### (1) 使用代码创建和添加刚体

在有需要的情况下，我们可以通过代码创建的方式给对象加上刚体。

下面的示例代码中我们简单的创建了个球，并且给球加上了碰撞器与刚体。

```typescript
//新建一个球体模型并添加到舞台上
var sphere:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createSphere(1))) as Laya.MeshSprite3D;
//新建一个球形的碰撞盒
var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(1);
//给球添加刚体
var sphereRigid:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
//将碰撞盒添加到刚体上
shpereRigid.colliderShape = sphereShape;
```

不同的模型只是需要创建不同的Mesh网格和ColliderShape碰撞盒。

#### (2) 获取导出模型上的刚体

在模型导出后，可能要修改刚体的物理效果，这时候就需要从对象身上获取到刚体。

下面的示例代码就是获取刚体后修改刚体的参数。

```typescript
//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D){
    //获取到Meshsprite3d
    var cube = scene.addChild（sp.getChildAt(0)） as Laya.MeshSprite3D;
    //获取刚体
    var cubeRigid:Laya.Rigidbody3D = cube.getComponent(Laya.Rigidbody3D);
}));
```
