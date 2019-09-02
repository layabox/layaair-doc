# 角色碰撞器

###### *version :2.1.1   Update:2019-7-19*

如果想制作一个类似人的角色，那碰撞就可以使用角色控制器。这种碰撞器主要用于对第三人称游戏、第一人称游戏的角色控制。

在LayaAir3D中的角色碰撞器是具有刚体物理特性，同时还结合人物控制器的特性，例如：

1.人物是无法摔倒，也就是有一个`upAxisUp` (Up向量)。

2.人物在行走有一个能 “ 跨过 ” 的`stepHeight` (最高高度)。

所以通常来说，所有类似人的角色都可以用角色控制器来控制。

> 此处所说的不会摔倒是指人物的碰撞器不会倒。Up向量确定了这个控制器的旋转轴，规定控制器只能根据这个轴旋转。

**Tip**：角色碰撞器一般使用的碰撞盒是胶囊体碰撞盒。

![](img/1.png)<br>(图1)

角色碰撞器还有一些非常好用的方法：像移动与跳跃。

![](img/2.png)<br>(图2)

还有更多角色碰撞器的使用方式可以从API查看（[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.CharacterController)）。

#### (1) 使用代码创建角色碰撞器

**插件目前暂不支持角色碰撞器导出，使用时需要使用代码创建。**

下面这段代码来自官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Character)）

```typescript
//为精灵添加角色控制器
var character:Laya.CharacterController = monkey.addComponent(Laya.CharacterController);
//创建胶囊碰撞器
var sphereShape:Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Laya.Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```

![](img/3.png)<br>(图3)

