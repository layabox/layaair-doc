#Object Trigger

###### *version :2.1.1   Update:2019-7-19*

The collider is the carrier of the trigger, and the trigger is only an attribute of the collider.

Flip-flops are not controlled by physical engines, but they emit three unique trigger messages when collisions occur. It should be noted that two triggers collide with each other, one of which must contain a rigid body. A trigger collides with an ordinary collider, one of which must be attached to a rigid body.

There is also no physical feedback when collisions occur between objects with triggers.

The method of setting triggers for objects without rigid bodies is as follows:


```typescript

//创建盒型MeshSprite3D
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX, sY, sZ)));
//创建物理碰撞器
var staticCollider = box.addComponent(Laya.PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```


The method of setting flip-flops for rigid objects is as follows:


```typescript

//创建一个球体
var sphere = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(radius)));
//给球体添加刚体
var rigidBody = sphere.addComponent(Laya.Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```


**Tip: In the case of rigid body isTrigger = false, collision with other triggers also triggers its own trigger method.**

