#물체 터치

###### *version :2.1.1   Update:2019-7-19*

충돌기는 터치기의 반송기이며, 터치기는 충돌기 몸에 있는 속성이다.

촉발기는 물리 엔진 제어를 받지 않지만 터치가 충돌할 때 세 가지 독특한 촉발 메시지를 낸다.주의해야 할 것은 두 터치가 충돌할 때 충돌 사건이 발생할 때, 그 중 하나는 강체를 포함해야 한다.한 터치와 일반 충돌기 중 하나는 반드시 강체를 부가해야 한다.

그리고 터치기를 설치한 물체가 충돌할 때 물리 피드백이 없다.

강체 없는 물체 설정 트리거 방법이 다음과 같습니다:


```typescript

//创建盒型MeshSprite3D
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))) as MeshSprite3D;
//创建物理碰撞器
var staticCollider:PhysicsCollider = box.addComponent(PhysicsCollider);
//标记为触发器,取消物理反馈
staticCollider.isTrigger = true;
```


강체의 물체 설치 터널이 있는 방법은 다음과 같다:


```typescript

//创建一个球体
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))) as MeshSprite3D;
//给球体添加刚体
var rigidBody:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//将刚体设置为触发器
rigidBody.isTrigger = true;
```


**Tip: 강체 isTrigger = false 상황에서 다른 터치와 충돌도 자신의 촉발기를 촉발할 수 있다.**

