# 通过PrimitiveMesh创建简单Mesh

###### *version :2.0.2beta   Update:2019-4-26*

​	在快速开启3D之旅的课程中，我们已用到了 **PrimitiveMesh** 的 **createBox** 方法创建一个盒子模型，本节课中介绍该类来创建其他的基础模型，并且使用transform来调整位置。更详细的使用情况可以[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh)。

创建时需注意的是，加载到场景中的引擎自带模型，轴心点在模型正中心，因此我们是以模型中心点为参考进行移动、旋转、缩放。加载到场景中时，模型默认会放置到场景的世界座标原点上。

```typescript
//创建一个空节点用来放置各模型
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

效果如图1:

![](img/1.png)<br>(图1)

