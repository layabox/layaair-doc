# 角色碰撞器

如果想制作一个类似人的角色那就使用角色控制器。这可以是第三人称平台游戏、第一人称射击游戏的主要角色或任何敌对角色。

在LayaAir3D中的角色碰撞器是具有刚体物理特性，同时还结合人物的特性。例如人物是无法摔倒，也就是有一个Up向量(upAxis)，而且人物在行走是会有个能跨过的最高高度(stepHeight)。所以通常来说所有类似人的角色都用角色控制器来执行。

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
var character:CharacterController = monkey.addComponent(CharacterController);
//创建胶囊碰撞器
var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```

![](img/3.png)<br>(图3)

