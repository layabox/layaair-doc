#캐릭터 충돌기

###### *version :2.1.1   Update:2019-7-19*

비슷한 사람의 캐릭터를 만들고 싶다면 충돌하면 캐릭터 컨트롤을 사용할 수 있다.이런 충돌기는 주로 3인칭 게임, 1인칭 게임의 역할 통제에 쓰인다.

Layaiar3D에서 캐릭터 충돌기는 강체 물리적 특성을 지녔으며 캐릭터 컨트롤러의 특성을 결합시킨다.

1. 인물은 넘어질 수 없고, 하나 있다`upAxisUp`(Up 벡터.

2. 인물이 걷고 있는데'건너뛰기'가 있다.`stepHeight`최고도.

그래서 일반적으로 유사한 모든 캐릭터는 캐릭터 컨트롤로 통제할 수 있다.

>> 여기서 말한 것은 넘어지지 않는 것은 인물의 충돌기가 무너지지 않는다는 뜻이다.Up 벡터는 이 컨트롤기의 회전축을 확정하고, 규정된 컨트롤러는 이 축에 따라 회전할 수 있다.

**Tip**캐릭터 충돌기 일반적으로 사용하는 충돌함은 캡슐 충돌함이다.

[] (img/1.png)<br>(1)

캐릭터 충돌기 또한 아주 좋은 방법: 이동과 점프 같다.

[] (img/2.png)<br>(2)

그리고 더 많은 캐릭터 충돌기 사용 방식은 API 에서 볼 수 있어요.[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.CharacterController)무엇

####(1) 코드 사용 캐릭터 충돌기 만들기

**플러그인은 현재 캐릭터 충돌기를 지원하지 않고 내보내며 사용할 때 코드를 사용해야 합니다.**

다음의 이 부호 는 공식 예제 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Character)차다


```typescript

//为精灵添加角色控制器
var character:CharacterController = monkey.addComponent(CharacterController);
//创建胶囊碰撞器
var sphereShape:CapsuleColliderShape = new CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```


[] (img/3.png)<br>(2)

