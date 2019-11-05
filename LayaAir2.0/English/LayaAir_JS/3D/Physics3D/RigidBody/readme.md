#Physical rigid body

###### *version :2.1.1   Update:2019-7-19*


 **Rigidbody3D**Rigid bodies are dynamic colliders. Any object that wants to be affected by gravity, by forces imposed by scripts, or to interact with other objects through a physical engine must contain a rigid body component. More detailed usage can be seen in the rigid body documentation:[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D);

####(1) Using code to create and add rigid bodies

In case of need, we can add rigid bodies to objects by creating code.

In the following example code, we simply create a ball and add Collider and rigid body to the ball.


```typescript

//新建一个球体模型并添加到舞台上
var sphere = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1)));
//新建一个球形的碰撞盒
var sphereShape = new Laya.SphereColliderShape(1);
//给球添加刚体
var sphereRigid = sphere.addComponent(Laya.Rigidbody3D);
//将碰撞盒添加到刚体上
sphereRigid.colliderShape = sphereShape;
```


Different models just need to create different Mesh grids and Collider Shape collision boxes.

####(2) Obtaining Rigid Bodies on the Derived Model

After the model is derived, the physical effect of the rigid body may need to be modified. At this time, the rigid body needs to be obtained from the object.

The following example code is to modify the parameters of the rigid body after obtaining the rigid body.


```typescript

//加载模型
Laya.Sprite3D.load("Conventional/shoot.lh",Laya.Handler.create(this,function(sp){
    //获取到Meshsprite3d
    var cube = scene.addChild（sp.getChildAt(0);
    //获取刚体
    var cubeRigid = cube.getComponent(Laya.Rigidbody3D);
}));
```

