#Physical rigid body

###### *version :2.1.1   Update:2019-7-19*


 **Rigidbody3D** 刚体就是动态碰撞器。任何物体想要受重力影响，受脚本施加的力的作用，或通过物理引擎来与其他物体交互，都必须包含一个刚体组件。更详细的使用情况可以查看刚体的文档：[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D);

####(1) Using code to create and add rigid bodies

In case of need, we can add rigid bodies to objects by creating code.

In the following example code, we simply create a ball and add a collider and a rigid body to the ball.


```typescript

//新建一个球体模型并添加到舞台上
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(1))) as MeshSprite3D;
//新建一个球形的碰撞盒
var sphereShape:SphereColliderShape = new SphereColliderShape(1);
//给球添加刚体
var sphereRigid:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//将碰撞盒添加到刚体上
sphereRigid.colliderShape = sphereShape;
```


Different models just need to create different mesh meshes and collidershape collision boxes.

####(2) Obtaining Rigid Bodies on the Derived Model

After the model is exported, you may want to modify the physical effect of the rigid body. In this case, you need to get the rigid body from the object.

The following example code is to modify the parameters of the rigid body after obtaining the rigid body.


```typescript

//加载模型
Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
    //获取到Meshsprite3d
    var cube:MeshSprite3D = scene.addChild（sp.getChildAt(0)） as MeshSprite3D;
    //获取刚体
    var cubeRigid:Rigidbody3D = cube.getComponent(Rigidbody3D);
}));
```

