#운동학 강체

###### *version :2.1.1   Update:2019-7-19*

운동학 강체**iskinematic**옵션 활성화된 강체.운동학의 강체는 힘을 받지 않고 중력이나 충돌의 영향을 받는다.그것들은 변환이나 애니메이션의 위치와 회전식 드라이브를 설정하여 여전히 다른 비동동학의 강체와 호응할 수 있다.

내보낼 때 is Kimematic 옵션, 또는 코드 수정`rigidBody.isKinematic = true`속성은 운동학 강체를 설치한다.

[] (img/1.png)<br>(1)

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Kinematic)）：


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


[] (img/2.gif)<br>(2)

