#Primitivemesh를 통해서 간단한 Mesh 를 만들기

###### *version :2.0.2beta   Update:2019-4-26*

빠른 3D 여단 과정 중 우리는 이미 사용되었다**Primitivemesh**의**createbox**방법으로 상자의 모형을 생성하고, 이 수업에서 다른 기초 모형을 만들기, transform 을 사용하여 위치를 조정할 수 있습니다.더 자세한 사용 상황은 가능합니다.[查看API](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.resource.models.PrimitiveMesh).

창건할 때 주의하는 것은 장면 중 엔진 자체 모형을 가재하고, 축센터는 모형 중심에 있으며, 모형 중심점을 참고로 이동, 회전, 축소.장면에 가재할 때, 모형 기본값은 장면의 세계 좌표 원점에 놓여 있다.


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


효과 1:

[] (img/1.png)<br>(1)

