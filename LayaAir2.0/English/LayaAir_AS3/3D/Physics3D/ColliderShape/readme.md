#Multiple Collider Shapes

###### *version :2.1.1   Update:2019-7-19*

`ColliderShape`Collider shape is the property of rigid body and collider. It is the shape box of the model for physical operation and collision in the 3D world. ColliderShape is the parent of all collision boxes. ([API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.shape.ColliderShape))

![] (img/1.png)<br> (Figure 1)

Now let's look at all the collider shapes currently supported in LayaAir3D.

####(1) Box Collider Shape

The box is a basic square collision prototype. The box can be adjusted into cuboids of different sizes, which can be used to make the collision individuals with square walls, doors, etc., and can also replace the shells of vehicles and other means of transportation to calculate the collision. If it's only for boxes or boxes, it's perfect.

![] (img/2.png)<br> (Figure 2)


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


####(2) Sphere Collider Shape ball

A sphere is a circular collision box with a basic spherical shape. The sphere can be adjusted by setting the radius. It is often used for collision detection of spherical objects.

! [] (IMG / 3. PNG) < br > (Figure 3)


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


####(3) Capsule Collider Shape Capsules

The capsule body consists of a cylinder connecting two hemispheres. Usually used in role controllers or other combinations to form irregular shapes.

Players can adjust the radius and height of the capsule by themselves.

! [] (IMG / 4. JPG) < br > (Figure 4)

![] (img/5.png)<br> (Fig. 5)


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


####(4) cylindercollidershape cylinder

Cylinders are often used for collision of cylindrical objects such as columns in scenes. The radius and height of the cylinder can be set to adjust the collision body.

![] (img/6.png)<br> (fig. 6)


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


####(5) Cone Collider Shape Cone

The cone can adjust the collision body by setting the height and radius of the cone.

![] (img/7.png)<br> (fig. 7)


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


> ** We generally refer to the five collider shapes in front of us as prototypes. In the example ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_BaseCollider)) You can see the effect.******

![] (img/8.png)<br> (fig. 8)

####(6) Mesh Collider Shape mesh

A grid is constructed from a grid resource. For collision detection on complex mesh model, it is more accurate than using prototype collider. The biggest difference between the mesh type and the previous prototype is that you can customize the mesh to specify the collision range, which makes the mesh type more flexible. In fact, the front prototype can also be said to be a special mesh type, which is some of the basic collision shapes built into LayaAir3D.

![] (img/9.png)<br> (fig. 9)
****
**Convx attribute: 2.0.1 BATE does not support this attribute for the time being and will be supported in future versions. * *

The following code is derived from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_MeshCollider)In the example, two lizards are used as static colliders to display the effect of random falling rigid bodies.


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


![] (img/10.png)<br> (Fig. 10)

####(7) Compound Collider Shape Composite

The composite type is a collider shape composed of several prototypes. When you use a complex set of grids on the collider and don't use grid colliders, composite is a good choice. To create a composite collider, you just need to create sub-objects for your composite Collider object, and then add prototype colliders for each sub-object. This allows you to simply move, rotate, or scale each sub-collider independently.

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CompoundCollider)The code uses five BoxCollider Shapes to form a table.


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


![] (img/11.png)<br> (Fig. 11)

