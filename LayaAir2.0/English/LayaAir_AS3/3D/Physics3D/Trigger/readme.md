#Object Trigger

###### *version :2.1.1   Update:2019-7-19*

The collider is the carrier of the trigger, and the trigger is only an attribute of the collider.

Flip-flops are not controlled by physical engines, but they emit three unique trigger messages when collisions occur. It should be noted that two triggers collide with each other, one of which must contain a rigid body. A trigger collides with an ordinary collider, one of which must be attached to a rigid body.

There is also no physical feedback when the object with trigger is collided.

The method of setting triggers for objects without rigid bodies is as follows:


```typescript

//创建盒型MeshSprite3D
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))) as MeshSprite3D;
//创建物理碰撞器
var staticCollider:PhysicsCollider = box.addComponent(PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```


The method of setting trigger for objects with rigid body is as follows:


```typescript

//创建一个球体
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))) as MeshSprite3D;
//给球体添加刚体
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```


**Tip: when the rigid body istrigger = false, collision with other triggers will trigger their own trigger methods.**

