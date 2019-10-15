#物理衝突シナリオとトリガースクリプト

###### *version :2.1.1   Update:2019-8-2*

トリガーから発生したイベントは、開発者がトリガーオブジェクトに追加したスクリプト（Script 3 D）を傍受することができます。傍受の方法は、図1に示すように、

！[](img/1.png)<br/>(図1)

衝突器も事件を送ることができます。傍受方法は下図2の通りです。

！[](img/2 png)<br/>(図2)

これらのインターフェースを具体的にどのように使うかを見てみます。今回のコード・セクションは公式の例から選びました。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_TriggerAndCollisionEvent))


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


運転効果図3に示します。

！[](img/3 png)<br/>(図3)



####タッチ情報とトリガ情報ルール

衝突規則については、下の表が表示されます。

トリガ情報とは、`onTriggerStay`を選択します。`onTriggerStay`を選択します。`onTriggerExit`三つの関数

衝突情報とは：`onCollisionEnter`を選択します。`onCollisionStay`を選択します。`onCollisionExit`三つの関数

>*衝突後に衝突検出があり、衝突情報があります。*

|𞓜Pysics Collider RigidBody𞓜Kinmatic RigidBody𞓜Physic Collider Trigger RigidBody Trigger
|---------------------------------------------------------------------------------------------------------------------------------|
|Physics Collider𞓜Y 124124; 124; 124124; 124;
|RigidBody𞓜Y 124124; Y 124124; Y 124124124;
𞓜nematicRigidBody𞓜𞓜Y 124124;𞓜𞓜𞓜
|Physics Collider Trigger𞓜𞓜124; 124; 124;
| RigidBody Trigger           |                 |           |                     |                         |                   |                             |
𞓜nematicRigidBody Trigger𞓜𞓜124124;𞓜𞓜

>*衝突後にトリガ情報があります。*

|𞓜Pysics Collider RigidBody𞓜Kinmatic RigidBody𞓜Physic Collider Trigger RigidBody Trigger
|---------------------------------------------------------------------------------------------------------------------------------|
|Physics Collider𞓜𞓜Y 124;
| RigidBody                   |                 |           |                     | Y                       | Y                 | Y                           |
| Kinematic RigidBody         |                 |           |                     | Y                       | Y                 | Y                           |
|Physics Collider Trigger𞓜Y𞓜Y 124; Y 124; Y 124;
|RigidBodyTrigger𞓜Y 124; Y 124124; Y 124124;
𞓜nematicRigidBody Trigger𞓜Y 124; Y𞓜Y𞓜Y 124; Y𞓜Y 124;

