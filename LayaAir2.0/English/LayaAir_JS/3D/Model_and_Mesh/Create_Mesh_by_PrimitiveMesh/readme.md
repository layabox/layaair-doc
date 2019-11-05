#Create a simple Mesh through Primitive Mesh

###### *version :2.0.2beta   Update:2019-4-26*

We've used it in the course of Quick Open 3D Travel.**Primitive Mesh**Of**CreateBox**Method Create a box model, which is introduced in this lesson to create other basic models, and use transform to adjust the position. More detailed usage can be[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh)。

It should be noted that the engine loaded into the scene has its own model, and the pivot point is in the center of the model, so we move, rotate and zoom with the reference of the center point of the model. When loaded into a scene, the model is placed at the origin of the world coordinate of the scene by default.


```typescript

//创建一个空节点用来防止各模型
sprite3D = scene.addChild(new Laya.Sprite3D());

//正方体
var box = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)));
box.transform.position = new Laya.Vector3(2.0, 0.25, 0.6);
box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);

//球体
var sphere = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.25, 20, 20)));
sphere.transform.position = new Laya.Vector3(1.0, 0.25, 0.6);

//圆柱体
var cylinder = sprite3D.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createCylinder(0.25, 1, 20)));
cylinder.transform.position = new Laya.Vector3(0, 0.5, 0.6);

//胶囊体
var capsule = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(0.25, 1, 10, 20)));
capsule.transform.position = new Laya.Vector3(-1.0, 0.5, 0.6);

//圆锥体
var cone = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCone(0.25, 0.75)));
cone.transform.position = new Laya.Vector3(-2.0, 0.375, 0.6);

//平面
var plane = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(6, 6, 10, 10)));
```


The effect is shown in Figure 1:

![] (img/1.png)<br> (Figure 1)

