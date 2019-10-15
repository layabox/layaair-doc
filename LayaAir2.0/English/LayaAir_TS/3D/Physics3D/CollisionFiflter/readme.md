#Collider filtration

###### *version :2.1.1   Update:2019-7-19*

Collider filtering is a property of both rigid and physical colliders. In the actual development process, it is impossible for all objects to collide with any other objects, such as the bullet launched by the protagonist himself and not allowed to collide with himself, or the bullet itself does not harm the teammates. This requires a filter to set up which bullets can collide with those objects and which cannot.

For Collider filtering, you need to use Physics Collider and Rigid Body3D:

One`collisionGroup:int`The collision group belongs to.

Two`canCollideWith:int`- Collision groups that produce collisions, these two properties.

For setting up Collider groups, you can see:[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils)The collision grouping of an object at the same time is unique.

As for the property of collision group that can produce collision, if only collision with a single group, then using Physics3D Utils'group assignment will do.

If you need to collide with multiple groups, you need to use bit operations.

The following code is an excerpt from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)) In the example, we only set the canCollideWith property for the red sphere. Other collider groups are different.


```typescript

//红色球体设置
//创建刚体碰撞器
var rigidBody = sphere.addComponent(Laya.Rigidbody3D);
//创建球形碰撞器
rigidBody.isKinematic = true;
//设置可以与其发生碰撞的碰撞组
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5;//只与自定义组135碰撞(如果多组采用位操作）
.......
//给圆锥体添加刚体组件
var rigidBody:Laya.Rigidbody3D = cone.addComponent(Laya.Rigidbody3D);
//给该刚体划分碰撞组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;//自定义组3
......
//给胶囊体添加刚体
var rigidBody:Laya.Rigidbody3D = capsule.addComponent(Laya.Rigidbody3D);
//设置胶囊体的碰撞分组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;//自定义组2,会跳过碰撞
......
```


> Group Information: Box-Custom Group 1, Capsule-Custom Group 2, Cone-Custom Group 3, Cylinder-Custom Group 4, Ball-Custom Group 5

![] (img/1.gif) <br> (Fig. 1)

In Figure 2, it is obvious that the red ball passes through the cylinder and capsule, and collides with the sphere and the box at the same time. Other geometries collide with each other.

With regard to the canCollideWith attribute, in addition to this way of adding multiple collision groups, exclusion can also be used. For example, collisions occur with groups other than the customized group 1 or 2.


```typescript

//排除的方法
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```

