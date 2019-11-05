#PrimitiveMeshによって簡単なMeshを作成します。

###### *version :2.0.2beta   Update:2019-4-26*

急速に3 Dの旅を始める課程の中で、私達はすでに使いました。**Primitive Mesh**の**createBox**方法は箱の模型を作ります。このクラスで紹介して、他の基礎モデルを作ります。そして、トレイを使って位置を調整します。もっと詳しい使用状況は大丈夫です。[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh)。

作成時の注意点としては、シーンにロードされたエンジンはモデルの真ん中にあります。したがって、モデルの中心点を参考に移動、回転、スケーリングを行います。シーンにロードすると、モデルはデフォルトでシーンの世界座標の原点に置かれます。


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
var cylinder = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCylinder(0.25, 1, 20)));
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


効果は図1の通りです

！[](img/1.png)<br/>(図1)

