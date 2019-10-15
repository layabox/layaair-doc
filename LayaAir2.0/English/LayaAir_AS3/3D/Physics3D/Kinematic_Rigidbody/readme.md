#Kinematic Rigid Body

###### *version :2.1.1   Update:2019-7-19*

The kinematic rigid body is**IsKinematic**Option enabled rigid body. Kinematic rigid bodies are not affected by force, gravity or collision. They can still interact with other non-kinematic rigid bodies by setting the positions of transformations or animations and rotating explicit drivers.

You can check the is Kinematic option or code modification when exporting`rigidBody.isKinematic = true`Property to set the kinematic rigid body.

![] (img/1.png)<br> (Figure 1)

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)):


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


! [] (IMG / 2. GIF) < br > (Figure 2)

