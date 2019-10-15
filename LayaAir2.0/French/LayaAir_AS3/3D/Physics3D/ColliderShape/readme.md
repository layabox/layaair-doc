#Formes multiples

###### *version :2.1.1   Update:2019-7-19*

`ColliderShape`La forme du collisionneur, qui est la propriété du corps rigide et du collisionneur, est une cartouche de forme pour les opérations physiques et les collisions dans un monde en 3D.Collidershape est le père de toutes les boîtes de collision.([API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.shape.ColliderShape)- Oui.

[] (IMG / 1.png) <br > (Figure 1)

Nous passons maintenant à la présentation de toutes les formes de collisionneurs actuellement soutenues à layaair3d.

####1) boxcollidershape

The Box is a basic Square collision prototype.La boîte peut être réglée en forme de corps rectangulaire de différentes tailles pour la fabrication de murs, de portes et d 'autres corps de collision carrés, et peut également remplacer le boîtier d' un véhicule tel qu 'un véhicule pour calculer les collisions.C 'est plus parfait si c' est pour une boîte ou une boîte.

[] (IMG / 2.png) <br > (Figure 2)


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


####2) spherecollidershape ball

La sphère est une boîte de collision circulaire de forme sphérique de base.La sphère peut être ajustée par réglage du rayon.Détection de collision d 'objets sphériques

[] (IMG / 3.ping) <br > (Figure 3)


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


####3) capsule capsule collidershape

La capsule est constituée d 'un cylindre reliant les deux hémisphères.Est généralement utilisé dans un contrôleur de rôle ou dans une combinaison avec d 'autres formes irrégulières.

Le joueur peut ajuster le rayon et la hauteur de la capsule lui - même.

[] (IMG / 4.jpg) <br > (Figure 4)

[] (IMG / 5.png) <br > (Figure 5)


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


####4) Cylinder collidershape

Le corps cylindrique est souvent utilisé pour la collision d 'objets tels que des cylindres de scènes.Le rayon et la hauteur du cylindre peuvent être fixés pour ajuster le corps de collision.

[] (IMG / 6.png) <br > (Figure 6)


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


####5) conecollidershape

Le cône peut ajuster le corps de collision à un rayon supérieur et supérieur au cône fixé.

[] (IMG / 7.png) <br > (Figure 7)


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


* * * Nous appelons généralement les cinq types de collisionneurs précédents sous la forme de prototypes.Dans l 'exemple[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_BaseCollider)Les effets sont visibles.******

[] (IMG / 8.png) <br> (Figure 8)

####6) grille meshcollidershape

La forme de grille est construite à l 'aide d' une ressource de grille.Pour la détection de collision sur un modèle Maillé complexe, il est beaucoup plus précis que le prototype de collision utilisé.La plus grande différence entre le type de grille et le prototype précédent est que la grille peut être personnalisée pour définir la plage de collision, ce qui rend le type de grille plus souple.En fait, le prototype précédent peut également être considéré comme un modèle de grille spécial, qui est une forme de collision de certains des éléments de base de layaair3d.

[] (IMG / 9.png) <br> (Figure 9)
****
**Propriété Convex: 2.0.1 - bate ne supporte pas cette propriété pour le moment et sera prise en charge dans les versions futures.* *

Le code ci - dessous est tiré de l'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_MeshCollider)) dans l 'exemple, deux lézards sont utilisés comme collisionneurs statiques et tombent de manière aléatoire.


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


[] (IMG / 10.png) <br > (Figure 10)

####7) complexe compoundcollidershape

Le modèle composite est une forme de collisionneur constituée de plusieurs prototypes.Lorsque vous utilisez un ensemble complexe de grilles sur le collisionneur et que vous n 'utilisez pas de Collisionneur de grilles, le type composite est une bonne option.Pour créer un collisionneur composite, il suffit de créer un sous - objet pour l 'objet de collision composite et d' ajouter un prototype de collision à chaque sous - objet.Ceci vous permet de déplacer, de tourner ou de rétrécir simplement chaque sous - collisionneur, chacun étant indépendant.

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CompoundCollider)) Le Code utilise cinq boxcollidershape pour former une table.


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


[] (IMG / 11.png) <br > (Figure 11)

