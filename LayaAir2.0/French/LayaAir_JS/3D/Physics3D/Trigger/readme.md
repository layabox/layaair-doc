#Trigger

###### *version :2.1.1   Update:2019-7-19*

The Collider is the Carrier of the trigger, and the trigger is only a attribut on the collider.

Le déclencheur n 'est pas contrôlé par un moteur physique, mais il envoie trois messages de déclenchement distincts en cas de collision.Il convient de noter qu 'un événement de collision se produit lors d' une collision entre deux déclencheurs, dont l 'un doit contenir un corps rigide.Un trigger et un collisionneur normal, dont l 'un doit être rigide.

En outre, lorsqu 'un objet est équipé d' un déclencheur, il n 'y a pas de réaction physique en cas de collision.

Le procédé de mise en place d 'un déclencheur pour un objet sans corps rigide est le suivant:


```typescript

//创建盒型MeshSprite3D
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX, sY, sZ)));
//创建物理碰撞器
var staticCollider = box.addComponent(Laya.PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```


Le procédé de mise en place d 'un déclencheur pour un objet rigide est le suivant:


```typescript

//创建一个球体
var sphere = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(radius)));
//给球体添加刚体
var rigidBody = sphere.addComponent(Laya.Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```


**TIP: en cas de collision avec d 'autres déclencheurs, on déclenche son propre procédé de déclenchement.**

