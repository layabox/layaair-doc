# 运动刚体

运动学刚体是 **isKinematic** 选项启用的刚体。运动学刚体不受力，重力或碰撞影响。它们通过设置变换或动画的位置和旋转显式驱动，它们仍然可以与其他非运动学刚体互动。

下面的代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)）：

```typescript
.....
//创建刚体碰撞器
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//设置刚体为Kinematic，仅可通过transform属性移动物体
rigidBody.isKinematic = true;
......

//在场景上添加的loop事件
private function onKeyDown():void {
    KeyBoardManager.hasKeyDown(87) && kinematicSphere.transform.translate(new Vector3(0, 0, -0.2));//W
    KeyBoardManager.hasKeyDown(83) && kinematicSphere.transform.translate(new Vector3(0, 0, 0.2));//S
    KeyBoardManager.hasKeyDown(65) && kinematicSphere.transform.translate(new Vector3(-0.2, 0, 0));//A
    KeyBoardManager.hasKeyDown(68) && kinematicSphere.transform.translate(new Vector3(0.2, 0, 0));//D
    KeyBoardManager.hasKeyDown(81) && kinematicSphere.transform.translate(new Vector3(0, 0.2, 0));//Q
    KeyBoardManager.hasKeyDown(69) && kinematicSphere.transform.translate(new Vector3(0, -0.2, 0));//E
}
```

![](img/1.gif)<br>(图1)

