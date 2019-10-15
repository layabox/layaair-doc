# 通过PrimitiveMesh创建简单Mesh

###### *version :2.0.2beta   Update:2019-4-26*

Nous l'avons déjà utilisé dans le cours d'un voyage en 3D rapide.**Primitive Mesh**A**Createbox**Method for create a Box Model, this class is introduced to create other Basic Models and Using Transform to adjust position.Plus de détails sur l 'utilisation[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh)".

Lors de la création, il convient de noter que le moteur a été chargé dans la scène du modèle auto - bande, le point d 'axe au Centre du modèle positif, de sorte que nous sommes basés sur le point central du modèle pour le déplacement, la rotation et l' agrandissement.Lorsqu 'il est chargé dans la scène, le modèle est placé par défaut sur l' emplacement des coordonnées mondiales de la scène.


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


Les résultats sont les suivants:

[] (IMG / 1.png) <br > (Figure 1)

