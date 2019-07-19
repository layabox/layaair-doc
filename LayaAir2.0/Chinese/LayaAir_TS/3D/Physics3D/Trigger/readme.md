# 物体触发器

###### *version :2.1.1   Update:2019-7-19*

碰撞器是触发器的载体，而触发器只是碰撞器身上的一个属性。

触发器不受物理引擎控制，但是触发器在 发生碰撞时会发出三个独特的触发信息。需要注意的是两个触发器碰撞时发出碰撞事件，其中一个必须包含刚体。一个触发器和一个普通碰撞器碰撞，其中之一必须附加刚体。

**触发器的触发条件**：两个可以碰撞的物体，其中一个勾选了 **isTrigger** 或者 `isTrigger = true`;

还有就是设置了触发器的物体时在碰撞发生时，是没有物理反馈的。

没有刚体的物体设置触发器的方法如下：

```typescript
//创建盒型MeshSprite3D
var box = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(sX, sY, sZ))) as Laya.MeshSprite3D;
//创建物理碰撞器
var staticCollider:Laya.PhysicsCollider = box.addComponent(Laya.PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```

有刚体的物体设置触发器的方法如下：

```typescript
//创建一个球体
var sphere = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createSphere(radius))) as Laya.MeshSprite3D;
//给球体添加刚体
var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```

**Tip：刚体 isTrigger = false 的情况下，与其他触发器发生碰撞也是会触发出自己的触发器方法的。**

