# 碰撞器过滤

###### *version :2.1.1   Update:2019-7-19*

碰撞器过滤是刚体与物理碰撞器都有的属性。在实际开发过程中不可能所有的物体都要和任何其他物体参与碰撞，比如主角自己发射的子弹和自己就不允许碰撞，又或者自己子弹对于队友也没有伤害。这就需要用过滤器，来设置子弹能与那些物体碰撞，哪些不能碰撞。

关于碰撞器过滤就需要使用PhysicsCollider与RigidBody3D的：

1. `collisionGroup:int` — 所属碰撞组。

2. `canCollideWith:int` — 可产生碰撞的碰撞组，这两个属性。

关于设置碰撞器分组可以查看：[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils)，一个物体同一时间所属碰撞分组是唯一的。

关于能产生碰撞的碰撞组这个属性，如果只能与单个组碰撞那么使用Physics3DUtils的分组赋值就行。

如果需要和多个组碰撞就需要使用位操作。

以下代码是官方示例的节选（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)）。示例中我们只对红色球体设置了canCollideWith属性。其他碰撞体分组各不相同。

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

> 分组信息：盒子-自定义组1，胶囊体-自定义分组2，圆锥体-自定义分组3，圆柱体-自定义分组4，小球-自定义分组5

![](img/1.gif)<br>(图1)

在图2中可以比较明显的看到红球穿过了圆柱体与胶囊体，同时撞飞了球体与盒子。其他的几何体之间又有相互碰撞。

关于canCollideWith属性，除了这种增加多个碰撞组的方式外，还可以使用排除法。例如：和自定义分组1,2组以外的组发生碰撞。

```typescript
//排除的方法
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```
