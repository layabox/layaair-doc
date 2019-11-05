#Role Collider

###### *version :2.1.1   Update:2019-7-19*

If you want to create a human-like character, the role controller can be used in the collision. This collider is mainly used to control the role of the third person game and the first person game.

The role Collider in LayaAir3D has rigid physical properties, and also combines the characteristics of the character controller, such as:

1. Characters can't fall, that is, there is one.`upAxisUp`(Up vector).

2. Characters have an ability to "cross" while walking.`stepHeight`(Maximum height).

So in general, all human-like roles can be controlled by role controllers.

> The term "not falling" here refers to the fact that a person's collider does not fall. The up vector determines the rotation axis of this controller, and specifies that the controller can only rotate according to this axis.

**Tip**Character colliders usually use capsule collision boxes.

![] (img/1.png)<br> (Figure 1)

The role collider also has some very useful methods: like moving and jumping.

![] (img/2.png)<br> (Figure 2)

There are more ways to use role colliders that can be viewed from the API（[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.CharacterController))

####(1) Use code to create role Colliders

**The plug-in currently does not support role collider export and needs to be created using code.**

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Character))


```typescript

//为精灵添加角色控制器
var character = monkey.addComponent(Laya.CharacterController);
//创建胶囊碰撞器
var sphereShape = new Laya.CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Laya.Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```


![] (img/3.png) < br > (fig. 3)

