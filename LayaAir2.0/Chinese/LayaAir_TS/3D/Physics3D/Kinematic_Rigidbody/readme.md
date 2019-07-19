# 运动学刚体

###### *version :2.1.1   Update:2019-7-19*

运动学刚体是 **isKinematic** 选项启用的刚体。运动学刚体不受力，重力或碰撞影响。它们通过设置变换或动画的位置和旋转显式驱动，它们仍然可以与其他非运动学刚体互动。

可以在导出时勾选 is Kinematic 选项，或者代码修改 `rigidBody.isKinematic = true` 属性来设置运动学刚体。

![](img/1.png)<br>(图1)

下面的代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)）：

```typescript
.....
//创建刚体碰撞器
var rigidBody:Laya.Rigidbody3D = sphere.addComponent(Laya.Rigidbody3D);
//设置刚体为Kinematic，仅可通过transform属性移动物体
rigidBody.isKinematic = true;
......

//在场景上添加的loop事件
private onKeyDown():void {
    Laya.KeyBoardManager.hasKeyDown(87) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, 0, -0.2));//W
    Laya.KeyBoardManager.hasKeyDown(83) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, 0, 0.2));//S
    Laya.KeyBoardManager.hasKeyDown(65) && this.kinematicSphere.transform.translate(new Laya.Vector3(-0.2, 0, 0));//A
    Laya.KeyBoardManager.hasKeyDown(68) && this.kinematicSphere.transform.translate(new Laya.Vector3(0.2, 0, 0));//D
    Laya.KeyBoardManager.hasKeyDown(81) && this.kinematicSphere.transform.translate(new Vector3(0, 0.2, 0));//Q
    Laya.KeyBoardManager.hasKeyDown(69) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, -0.2, 0));//E
}
```

![](img/2.gif)<br>(图2)

