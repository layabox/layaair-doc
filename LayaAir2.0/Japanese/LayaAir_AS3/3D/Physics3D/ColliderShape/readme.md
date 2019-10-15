#複数の衝突器の形状

###### *version :2.1.1   Update:2019-7-19*

`ColliderShape`衝突器の形状は、剛体と衝突器の属性であり、モデルが3 D世界で物理演算と衝突を行う形状の箱である。Collider Shapeはすべての衝突箱の親類です。([API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.shape.ColliderShape))

！[](img/1.png)<br/>(図1)

次に、LayaAir 3 Dで現在サポートされているすべての衝突器の形状を紹介します。

####（1）BoxCollider Shapeボックス

箱形は基本的な正方形衝突プロトタイプである。箱は異なった大きさの直方体に調節できます。壁やドアなどの真四角な衝突個体を作るために使われます。車両などの交通機関の外郭に取って代わることもできます。衝突を計算します。箱や箱だけに使うなら、もっと完璧です。

！[](img/2 png)<br/>(図2)


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


####（2）スフィアCollider Shapeボール

球体は基本的な球体形状の円形の衝突箱である。半径を設定することで球を調整することができます。球形物体の衝突検出によく使われる。

！[](img/3 png)<br/>(図3)


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


####（3）CapuleCollider Shapeカプセル

カプセルは一つの円柱から二つの半球をつないで構成されている。キャラクターコントローラによく使われます。または他の組み合わせは不規則な形になります。

プレイヤーは自分で半径を調整し、カプセルを高さ調整することができます。

！[](img/4.jpg)<br/>(図4)

！[](img/5 png)<br/>(図5)


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


####（4）Cylinder Collider Shape円柱

円柱は場面の柱などの円柱の物体衝突によく使われる。円柱の半径と高さを設定して衝突体を調整できます。

！[](img/6.png)<br/>(図6)


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


####（5）ConeCollider Shape円錐

円錐体は円錐の高さと半径を過設して衝突体を調整することができる。

！[](img/7 png)<br/>(図7)


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


>***前の5種類の衝突器の形を原型と呼びます。例では[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_BaseCollider))効果が見られます。******

！[](img/8 png)<br>(図8)

####（6）MeshCollider Shapeグリッドタイプ

グリッド形はグリッドリソースを利用して構築されます。複雑なメッシュモデル上の衝突検出については，プロトタイプ衝突器の応用よりもはるかに正確である。グリッド型と前のプロトタイプとの最大の違いは、メッシュをカスタマイズして衝突範囲を決めることができることです。実は前のプロトタイプは特殊なメッシュ型とも言え、LayaAir 3 D内蔵のいくつかの基礎的な衝突形状です。

！[](img/9 png)<br>(図9)
****
**convex属性：2.0.1 BATEはしばらくこの属性をサポートしていません。今後のバージョンでサポートします。＊＊

以下のコードは公式の例に由来します。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_MeshCollider)）2つのトカゲは例として静的衝突器として作用し、ランダム落下剛体は効果を示す。


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


！[](img/10.png)<br/>(図10)

####（7）CompundCollider Shape複合タイプ

複合型は複数のプロトタイプを組み合わせた衝突器形状である。衝突器に複雑なメッシュのセットを使用しており、メッシュ衝突器を使用しない場合、複合体は良い選択である。複合衝突器を作成して、あなたの複合体衝突体にサブオブジェクトを作成し、各サブオブジェクトにプロトタイプ衝突器を追加します。これにより、各衝突器を簡単に動かしたり、回転したり、伸縮したりすることができます。彼らはそれぞれ独立しています。

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CompoundCollider)）コードには、5つのBoxCollider Shapeを使ってテーブルを構成しています。


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


！[](img/11 png)<br/>(図11)

