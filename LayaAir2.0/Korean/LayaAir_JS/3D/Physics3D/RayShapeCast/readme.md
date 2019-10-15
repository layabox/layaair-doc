#물리 형상 스캐너 검사

###### *version :2.1.1   Update:2019-7-19*

물리 형태 스캐너 검사는 장면 중 한 가지 선택의 모양에 따라 한 단락으로 충돌을 점검하는 것이다.이 검사는 있다`shapeCastAll`과`shapeCast`두 인터페이스, 전자는 모든 충돌의 물체로 되돌아가고, 후자는 충돌하는 첫 번째 물체로 돌아갔다.이런 스캔 검사는 항상 사용자 정의 모양의 사선 검측에 쓰여 모양의 탄도의 충돌을 나타낸다.

아래의 코드 는 예례 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_RayShapeCast)차다


```typescript

//创建球型碰撞器
var sphereCollider = new Laya.SphereColliderShape(0.5);
//使用球型碰撞器进行形状检测
if (this.castAll) {
    //进行形状检测,检测所有碰撞的物体
    this.scene.physicsSimulation.shapeCastAll(sphereCollider, this.from, this.to, this.hitResults);
    for (i = 0, n = this.hitResults.length; i < n; i++)
        this.hitResults[i].collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
} else {
    //进行形状检测,检测第一个碰撞物体
    if (this.scene.physicsSimulation.shapeCast(sphereCollider, this.from, this.to, this.hitResult))
        this.hitResult.collider.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);
}
```


>> 이 예시에는 사선 진열된 모형은 코드 사용으로 만든 것이며, 관찰과 모양의 스캐너 검사를 편리하게 하기 위해서입니다.
>>

[] (img/1.png)<br>(1)

