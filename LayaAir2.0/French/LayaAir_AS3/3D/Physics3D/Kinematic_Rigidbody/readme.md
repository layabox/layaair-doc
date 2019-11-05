#Rigidité cinématique

###### *version :2.1.1   Update:2019-7-19*

Corps rigide de cinématographie**Iskinematic**Sélectionnez le corps rigide à activer.Les rigides cinématiques ne sont pas touchés par la force, la gravité ou la collision.Ils peuvent encore interagir avec d 'autres corps rigides non cinématiques en réglant la position de la transformation ou de l' animation et en faisant pivoter l 'entraînement.

Vous pouvez cocher l 'option is Kinematic lors de l' exportation ou modifier le Code`rigidBody.isKinematic = true`Les propriétés définissent les rigides cinématiques.

[] (IMG / 1.png) <br > (Figure 1)

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)):


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


[] (IMG / 2.gif) <br > (Figure 2)

