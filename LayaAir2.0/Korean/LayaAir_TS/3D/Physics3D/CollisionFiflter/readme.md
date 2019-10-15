#충돌기 필터

###### *version :2.1.1   Update:2019-7-19*

충돌기 필터 필터는 강체와 물리 충돌기까지 있는 속성이다.실제 개발 과정에서 모든 물체는 다른 물체와 충돌할 수 없다. 예를 들면 주인공이 발사한 총탄과 자신은 충돌을 허용하지 않는다. 또는 자신의 총알은 팀에 대해서도 상처를 주지 않는다.탄알이 그 물체와 부딪칠 수 있는 것을 필터로 해야 한다.

충돌기 필터에 대한 Physicscollider와 RigidBody3D 를 사용하십시오:

일.`collisionGroup:int`한 소속 충돌조.

이.`canCollideWith:int`—부딪치는 충돌조는 이 두 속성이 있다.

충돌기 설정 그룹 설정[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils)하나의 물체가 같은 시간 소속 충돌 분조는 유일한 것이다.

충돌이 발생할 수 있는 충돌 그룹에 대한 속성에 관해 한 그룹과 부딪치면 Physicsss3DUtils 분류를 사용하면 된다.

여러 팀과 충돌이 필요하면 비트 조작이 필요하다.

이하 코드 는 공식 예시 의 절선 이다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)무엇예를 들어 레드 구체에 캔콜리드 속성만 설정했습니다.다른 충돌체는 각각 다르다.


```typescript

//红色球体设置
//创建刚体碰撞器
var rigidBody = sphere.addComponent(Laya.Rigidbody3D);
//创建球形碰撞器
rigidBody.isKinematic = true;
//设置可以与其发生碰撞的碰撞组
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3 | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5;//只与自定义组135碰撞(如果多组采用位操作）
.......
//给圆锥体添加刚体组件
var rigidBody:Laya.Rigidbody3D = cone.addComponent(Laya.Rigidbody3D);
//给该刚体划分碰撞组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;//自定义组3
......
//给胶囊体添加刚体
var rigidBody:Laya.Rigidbody3D = capsule.addComponent(Laya.Rigidbody3D);
//设置胶囊体的碰撞分组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;//自定义组2,会跳过碰撞
......
```


>> 그룹 정보: 상자-사용자 정의 그룹 1, 캡슐체-사용자 정의 구성 2, 원추체-사용자 정의 구성 3, 원주체-사용자 정의 구성 그룹 4, 작은 공-사용자 정의 그룹 5

[] (img/1.gif)<br>(1)

사진2중 레드볼이 원주체와 캡슐체를 통과하는 것을 뚜렷하게 볼 수 있어 볼 수 있다.다른 기하체 사이에는 또 서로 충돌이 있다.

canCollidewith 속성에 관해 여러 개의 충돌조 증가 방식을 제외하고도 배제법을 사용할 수 있다.예를 들어: 사용자 정의 그룹과 1, 2조 이외의 그룹에서 충돌이 발생했습니다.


```typescript

//排除的方法
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```

