#運動学剛体

###### *version :2.1.1   Update:2019-7-19*

運動学の剛体は**iskinematic**を選択します。運動学的剛体は力，重力または衝突に影響されない。これらは、変換またはアニメーションの位置と回転明示的駆動を設定することにより、他の非運動学的剛体と対話することができます。

エクスポート時にis Kinematicオプションをチェックするか、コード修正ができます。`rigidBody.isKinematic = true`属性を設定します。

！[](img/1.png)<br/>(図1)

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic))


```typescript

.....
//创建刚体碰撞器
var rigidBody = sphere.addComponent(Laya.Rigidbody3D);
//设置刚体为Kinematic，仅可通过transform属性移动物体
rigidBody.isKinematic = true;
......

//在场景上添加的loop事件
onKeyDown(){
    Laya.KeyBoardManager.hasKeyDown(87) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, 0, -0.2));//W
    Laya.KeyBoardManager.hasKeyDown(83) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, 0, 0.2));//S
    Laya.KeyBoardManager.hasKeyDown(65) && this.kinematicSphere.transform.translate(new Laya.Vector3(-0.2, 0, 0));//A
    Laya.KeyBoardManager.hasKeyDown(68) && this.kinematicSphere.transform.translate(new Laya.Vector3(0.2, 0, 0));//D
    Laya.KeyBoardManager.hasKeyDown(81) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, 0.2, 0));//Q
    Laya.KeyBoardManager.hasKeyDown(69) && this.kinematicSphere.transform.translate(new Laya.Vector3(0, -0.2, 0));//E
}
```


！[](img/2 gif)<br/>(図2)

