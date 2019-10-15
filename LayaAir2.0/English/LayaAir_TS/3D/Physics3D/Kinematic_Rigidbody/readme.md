# 运动学刚体

###### *version :2.1.1   Update:2019-7-19*

The kinematic rigid body is**IsKinematic**Option enabled rigid body. Kinematic rigid bodies are not affected by force, gravity or collision. They can still interact with other non-kinematic rigid bodies by setting the positions of transformations or animations and rotating explicit drivers.

You can check the is Kinematic option or code modification when exporting`rigidBody.isKinematic = true`Property to set the kinematic rigid body.

![] (img/1.png)<br> (Figure 1)

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)):


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


![] (img/2.gif) <br> (Figure 2)

