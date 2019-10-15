#다중 충돌기 모양

###### *version :2.1.1   Update:2019-7-19*

`ColliderShape`충돌기 모양은 강체와 충돌기의 속성이며 모형이 3D 세계에서 물리 연산과 충돌하는 형태 상자다.ColliderShap은 모든 충돌함 부류입니다.과[API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.shape.ColliderShape)차다

[] (img/1.png)<br>(1)

현재 Layair3D에서 지원하는 모든 충돌기 모양을 소개합니다.

####(1) BoxColliderShape 상자

상자형은 기본적인 사각형 충돌 원형이다.상자는 크기가 다른 장방체로 조절되어 벽체, 문 등 정방방측의 충돌, 차량 등 교통수단을 대체할 수 있는 껍데기를 만들어 충돌을 계산할 수 있다.상자나 상자에 쓰일 뿐이라면 더욱 완벽해졌다.

[] (img/2.png)<br>(2)


```typescript

//随机生成坐标值
var sX:int = Math.random() * 0.75 + 0.25;
var sY:int = Math.random() * 0.75 + 0.25;
var sZ:int = Math.random() * 0.75 + 0.25;
//创建盒型MeshSprite3D
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))) as MeshSprite3D;
//创建刚体碰撞器
var rigidBody:Rigidbody3D = box.addComponent(Rigidbody3D);
//创建盒子形状碰撞器
var boxShape:BoxColliderShape = new BoxColliderShape(sX, sY, sZ);
//设置盒子的碰撞形状
rigidBody.colliderShape = boxShape; 
//设置刚体的质量
rigidBody.mass = 10;
```


####(2) Sphere Collidershape 공

구체는 기본적인 구체 모양의 원형 충돌함이다.반경을 설치하여 구체를 조정할 수 있다.구형 물체에 자주 사용하는 충돌 검사.

[] (img/3.png)<br>(2)


```typescript

//随机生成半径大小
var radius:Number = Math.random() * 0.2 + 0.2;
//创建球型MeshSprite3D
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))) as MeshSprite3D;
//添加刚体碰撞器
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//创建球型碰撞器
var sphereShape:SphereColliderShape = new SphereColliderShape(radius);
//设置刚体碰撞器的形状
rigidBody.colliderShape = sphereShape;
//设置刚体的质量
rigidBody.mass = 10;
```


####(3) CapsuleCollidershape 캡슐

캡슐체는 원주체로 두 개의 반구체를 연결한다.캐릭터 컨트롤러나 다른 그룹과 불규칙 형태로 사용된다.

플레이어는 스스로 반경과 고도로 캡슐체를 조정할 수 있다.

[] (img/4.jpg)<br>(4)

[] (img/5.png)<br>(도 5)


```typescript

var raidius:int = Math.random() * 0.2 + 0.2;
var height:int = Math.random() * 0.5 + 0.8;
//创建胶囊MeshSprite3D
var capsule:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createCapsule(raidius, height))) as MeshSprite3D;
//创建刚体碰撞器
var rigidBody:Rigidbody3D = capsule.addComponent(Rigidbody3D);
//创建球型碰撞器
var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(raidius, height);
//设置刚体碰撞器的形状
rigidBody.colliderShape = sphereShape;
//设置刚体碰撞器的质量
rigidBody.mass = 10;
```


####(4) Cylindercollidershape 원주

원주체는 광경의 기둥 등 원주체의 물체가 부딪친다.원주체의 반경과 높이가 충돌체를 조정할 수 있다.

[] (img/6.png)<br>(도 6)


```typescript

var raidius:int = Math.random() * 0.2 + 0.2;
var height:int = Math.random() * 0.5 + 0.8;
//创建圆锥MeshSprite3D
var cylinder:MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCylinder(raidius, height));
scene.addChild(cylinder);
//创建刚体碰撞器
var rigidBody:Rigidbody3D = cylinder.addComponent(Rigidbody3D);
//创建球型碰撞器
var cylinderShape:CylinderColliderShape = new CylinderColliderShape(raidius, height);
//设置刚体碰撞器的形状
rigidBody.colliderShape = cylinderShape;
//设置刚体碰撞器的质量
rigidBody.mass = 10;
```


####(5) ConeCollidershape 원추

원추체는 원추의 높이와 반경과 함께 충돌체를 조정할 수 있다.

[] (img/7.png)<br>(7)


```typescript

var raidius:int = Math.random() * 0.2 + 0.2;
var height:int = Math.random() * 0.5 + 0.8;
//创建圆锥MeshSprite3D
var cone:MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCone(raidius, height));
scene.addChild(cone);
//设置材质
cone.meshRenderer.material = mat4;
//设置位置
cone.transform.position = new Vector3(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
var rigidBody:Rigidbody3D = cone.addComponent(Rigidbody3D);
//创建球型碰撞器
var coneShape:ConeColliderShape = new ConeColliderShape(raidius, height);
//设置刚体碰撞器的形状
rigidBody.colliderShape = coneShape;
//设置刚体碰撞器的质量
rigidBody.mass = 10;	
```


>** 앞의 이 다섯 가지 충돌기 모양을 일반적으로 원형으로 부른다.예시 표시[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_BaseCollider)효과를 볼 수 있다.******

[] (img/8.png)<br>(8)

####(6) MesshColliderShape 눈금형

격자 모양은 격자 자원을 이용하여 그 위에 만들어졌다.복잡한 망사 모양의 충돌 검사에 대해서는 원형 충돌기보다 훨씬 정확하다.격자형은 앞의 원형과 가장 큰 차이는 격자를 사용자 정의 충돌 범위를 규정할 수 있으며, 이것은 격격자형을 더욱 활성화시킨다.실제로 앞의 원형도 특수한 격격자형으로, 레이이아르 3D 내치의 기본 충돌 형태다.

[] (img/9.png)<br>
****
**convex 속성: 2.0.1 BATE 는 이 속성을 지원하지 않고 향후 버전으로 지원합니다.**

아래의 코드 는 관방 에서 예례 를 나타낸다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_MeshCollider))예로 두 도마뱀을 정적 충돌기로 무작위 강체에 떨어지는 효과를 선보였다.


```typescript

var lizard:MeshSprite3D = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
//给对象添加物理碰撞器组件
var lizardCollider:PhysicsCollider = lizard.addComponent(PhysicsCollider);
//实例化一个网格碰撞盒
var meshShape:MeshColliderShape = new MeshColliderShape();
//设置网格碰撞盒的网格
meshShape.mesh = mesh;
//设置碰撞盒为网格型
lizardCollider.colliderShape = meshShape;
//设置摩擦力
lizardCollider.friction = 2;
//设置弹力
lizardCollider.restitution = 0.3;
```


[] (img/10.png)<br>(10)

####(7) CompoundCollidershape 복합형

복합형은 여러 원형 조합으로 만들어진 충돌기 모양입니다.충돌기에서 복잡한 격자를 사용했으며, 격자 충돌기를 사용하지 않을 때 복합형은 좋은 선택이다.복합 충돌기를 생성하면 복합형 충돌기 대상을 만들어서 원형 충돌기를 추가한다.단순히 이동하고 회전하거나 신축되는 모든 충돌기를 허용하는 것은 각자의 독립이다.

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CompoundCollider)') 코드에는 보이스콜리드 샤퍼를 5개 사용해 테이블을 만들었다.


```typescript

Mesh.load("res/threeDimen/Physics/table.lm", Handler.create(this, function(mesh:Mesh):void {
    //....省略中间
    //读取导出的桌子模型
    var table:MeshSprite3D = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
	//给桌子加刚体并且设置刚体属性
    var rigidBody:Rigidbody3D = table.addComponent(Rigidbody3D) as Rigidbody3D;
    rigidBody.mass = 10;
    rigidBody.friction = 1;
	//实例化一个组合型碰撞器形状
    var compoundShape:CompoundColliderShape = new CompoundColliderShape();
	//组合一张桌子
    
  	var boxShape:BoxColliderShape = new BoxColliderShape(0.5, 0.4, 0.045);
    //获取本地偏移
    var localOffset:Vector3 = boxShape.localOffset;
    //修改偏移
    localOffset.setValue(0, 0, 0.125);
    boxShape.localOffset = localOffset;
    //往组合碰撞器形状中添加该碰撞器形状
    compoundShape.addChildShape(boxShape);

    var boxShape1:BoxColliderShape = new BoxColliderShape(0.1, 0.1, 0.3);
    boxShape1.localOffset = new Vector3(-0.2, -0.148, -0.048);
    compoundShape.addChildShape(boxShape1);

    var boxShape2:BoxColliderShape = new BoxColliderShape(0.1, 0.1, 0.3);
    var localOffset2:Vector3 = boxShape2.localOffset;
    localOffset2.setValue(0.2, -0.148, -0.048);
    boxShape2.localOffset = localOffset2;
    compoundShape.addChildShape(boxShape2);

    var boxShape3:BoxColliderShape = new BoxColliderShape(0.1, 0.1, 0.3);
    var localOffset3:Vector3 = boxShape3.localOffset;
    localOffset3.setValue(-0.2, 0.153, -0.048);
    boxShape3.localOffset = localOffset3;
    compoundShape.addChildShape(boxShape3);

    var boxShape4:BoxColliderShape = new BoxColliderShape(0.1, 0.1, 0.3);
    var localOffset4:Vector3 = boxShape4.localOffset;
    localOffset4.setValue(0.2, 0.153, -0.048);
    boxShape4.localOffset = localOffset3;
    compoundShape.addChildShape(boxShape4);

    rigidBody.colliderShape = compoundShape;

}));

```


[] (img/11.png)<br>(11)

