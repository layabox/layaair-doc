# 碰撞器过滤

###### *version :2.1.1   Update:2019-7-19*

Collider filtering is a property of both rigid and physical colliders. In the actual development process, it is impossible for all objects to collide with any other objects, such as the bullet launched by the protagonist himself and not allowed to collide with himself, or the bullet itself does not harm the teammates. This requires filters to set which objects a bullet can collide with and which can't.

For collider filtering, you need to use physicscollider and rigidbody3d's:

One`collisionGroup:int`The collision group belongs to.

Two`canCollideWith:int`- collision groups that can produce collisions, these two attributes.

For setting up Collider groups, you can see:[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils)The collision group of an object at the same time is unique.

As for the collision group that can generate collision, if you can only collide with a single group, you can use the group assignment of physics3dutils.

If you need to collide with multiple groups, you need to use bit operations.

The following code is an excerpt from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)) In the example, we only set the canCollideWith property for the red sphere. Other collider groups are different.


```typescript

//红色球体设置
//创建刚体碰撞器
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//创建球形碰撞器
rigidBody.isKinematic = true;
//设置可以与其发生碰撞的碰撞组
rigidBody.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5;//只与自定义组135碰撞(如果多组采用位操作）
.......
//给圆锥体添加刚体组件
var rigidBody:Rigidbody3D = cone.addComponent(Rigidbody3D);
//给该刚体划分碰撞组
rigidBody.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;//自定义组3
......
//给胶囊体添加刚体
var rigidBody:Rigidbody3D = capsule.addComponent(Rigidbody3D);
//设置胶囊体的碰撞分组
rigidBody.collisionGroup = Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;//自定义组2,会跳过碰撞
......
```


> Group Information: Box-Custom Group 1, Capsule-Custom Group 2, Cone-Custom Group 3, Cylinder-Custom Group 4, Ball-Custom Group 5

![] (img/1.gif) <br> (Fig. 1)

In Figure 2, it is obvious that the red ball passes through the cylinder and capsule, and collides with the sphere and the box at the same time. Other geometries collide with each other.

For the cancolliewith attribute, in addition to this way of adding multiple collision groups, you can also use the exclusion method. For example, collisions occur with groups other than the customized group 1 or 2.


```typescript

//排除的方法
rigidBody.canCollideWith = Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```

