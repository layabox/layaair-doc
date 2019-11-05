# 通过PrimitiveMesh创建简单Mesh

###### *version :2.0.2beta   Update:2019-4-26*

In the course of fast start 3D tour, we have used**Primitive Mesh**Of**CreateBox**Method Create a box model, which is introduced in this lesson to create other basic models, and use transform to adjust the position. More detailed usage can be[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh)。

When creating, it should be noted that the engine loaded into the scene has its own model, and the pivot point is in the center of the model. Therefore, we use the center point of the model as the reference to move, rotate and scale. When loaded into a scene, the model is placed at the origin of the world coordinate of the scene by default.


```typescript

//创建一个空节点用来防止各模型
sprite3D = scene.addChild(new Sprite3D()) as Sprite3D;

//正方体
var box:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createBox(0.5, 0.5, 0.5))) as MeshSprite3D;
box.transform.position = new Vector3(2.0, 0.25, 0.6);
box.transform.rotate(new Vector3(0, 45, 0), false, false);

//球体
var sphere:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.25, 20, 20))) as MeshSprite3D;
sphere.transform.position = new Vector3(1.0, 0.25, 0.6);

//圆柱体
var cylinder:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createCylinder(0.25, 1, 20))) as MeshSprite3D;
cylinder.transform.position = new Vector3(0, 0.5, 0.6);

//胶囊体
var capsule:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createCapsule(0.25, 1, 10, 20))) as MeshSprite3D;
capsule.transform.position = new Vector3(-1.0, 0.5, 0.6);

//圆锥体
var cone:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createCone(0.25, 0.75))) as MeshSprite3D;
cone.transform.position = new Vector3(-2.0, 0.375, 0.6);

//平面
var plane:MeshSprite3D = sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(6, 6, 10, 10))) as MeshSprite3D;
```


The effect is shown in Figure 1:

! [] (IMG / 1. PNG) < br > (Figure 1)

