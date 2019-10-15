#물리 충돌 스크립트와 터치 스크립트

###### *version :2.1.1   Update:2019-8-2*

트리플이 발생한 사건에 개발자는 터치 물체에 추가된 스크립트 (Script3D) 감청할 수 있다.감청할 수 있는 방법은 그림 1의 제시와 같다:

[] (img/1.png)<br>(1)

충돌기도 사건 발급.감청 방법 2:

[] (img/2.png)<br>(2)

다음은 구체적으로 이 인터페이스를 어떻게 사용할 것인지, 이번 코드가 공식 예례를 절충하고, 더 상세한 상황을 살펴볼 수 있습니다: (()[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_TriggerAndCollisionEvent)차다


```typescript

/**
 * 当其他碰撞器进入绑定物体碰撞器时触发（子弹进入物品时）
 * 此处当触发器进入时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为绿色
 * 注：如相对移动速度过快，可能直接越过
 */
override public function onTriggerEnter(other:PhysicsComponent):void {
	((owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(0.0, 1.0, 0.0, 1.0);
}

/**
 * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹在物品内时）
 * 注：如相对移动速度过快，可能直接越过
 */	
override public function onTriggerStay(other:PhysicsComponent):void {}

/**
 * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
 * 此处当触发器退出时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为白色
 * 注：如相对移动速度过快，可能直接越过
 */	
override public function onTriggerExit(other:PhysicsComponent):void {
	((owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(1.0, 1.0, 1.0, 1.0);
}

/**
 *碰撞器事件与触发器事件对应
 * 碰撞器进入时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为黑色
 */
override public function onCollisionEnter(collision:Collision):void {
	if (collision.other.owner === kinematicSprite)
		((owner as MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(0.0, 0.0, 0.0, 1.0);
}
	
override public function onCollisionStay(collision:Collision):void {}
	
override public function onCollisionExit(collision:Collision):void {}

```


실행 효과도 3 시:

[] (img/3.png)<br>(2)



####메시지와 촉발 정보 규칙

충돌 규칙에 대해서는 아래쪽 표식을 볼 수 있다.

촉진 메시지는 바로:`onTriggerStay`,`onTriggerStay`,`onTriggerExit`세 개의 함수.

충돌 정보:`onCollisionEnter`,`onCollisionStay`,`onCollisionExit`세 개의 함수.

>>*충돌 후 충돌 검사 및 충돌 정보*

1244444 Physicscollider (RigidBody) Rigidbody (Rigitodbody) Phycscollider Trider Triger
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124사 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양
리지드보이디
키네마tic RigidBody
124사 Physicscollider Trigger
리기드보이 트릭지
키네마tic RigidBody Trigger 124테오

>>*충돌 후 촉발 메시지*

1244444 Physicscollider (RigidBody) Rigidbody (Rigitodbody) Phycscollider Trider Triger
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124사 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양 (하) 양
리지드보이디
키네마tic RigidBody
124사 샤샤샤 코르데르 트rigger
리지드바디 트릭지
키네마tic RigidBody Trigger (44 Y) 양

