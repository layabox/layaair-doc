#Physical collision script and trigger script

###### *version :2.1.1   Update:2019-8-2*

Events emitted by triggers allow developers to listen to scripts (script3D) added to trigger objects. The method of monitoring is shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

Colliders also dispatch events. The monitoring method is shown in Figure 2 below.

![] (img/2.png)<br> (Figure 2)

Now let's look at how to use these interfaces. This code excerpt is from the official example. More details can be seen:（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_TriggerAndCollisionEvent))


```typescript

/**
 * 当其他碰撞器进入绑定物体碰撞器时触发（子弹进入物品时）
 * 此处当触发器进入时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为绿色
 * 注：如相对移动速度过快，可能直接越过
 */
public onTriggerEnter(other:Laya.PhysicsComponent):void {
	((this.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Laya.Vector4(0.0, 1.0, 0.0, 1.0);
}

/**
 * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹在物品内时）
 * 注：如相对移动速度过快，可能直接越过
 */	
public onTriggerStay(other:Laya.PhysicsComponent):void {}

/**
 * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
 * 此处当触发器退出时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为白色
 * 注：如相对移动速度过快，可能直接越过
 */	
public onTriggerExit(other:Laya.PhysicsComponent):void {
	((this.owner as Laya.MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
}

/**
 *碰撞器事件与触发器事件对应
 * 碰撞器进入时将脚本的owner（所属节点）第一个实例材质的漫反射颜色改为黑色
 */
public onCollisionEnter(collision:Laya.Collision):void {
	if (collision.other.owner === this.kinematicSprite)
		((this.owner as MeshSprite3D).meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0.0, 0.0, 0.0, 1.0);
}
	
public onCollisionStay(collision:Laya.Collision):void {}
	
public onCollisionExit(collision:Laya.Collision):void {}

```


The operation effect is shown in Figure 3.

![] (img/3.png) < br > (fig. 3)



####Touch Information and Trigger Information Rules

For collision rules, you can see the table below.

Trigger information refers to:`onTriggerStay`,`onTriggerStay`,`onTriggerExit`Three functions.

Collision information refers to:`onCollisionEnter`,`onCollisionStay`,`onCollisionExit`Three functions.

>*Collision detection and collision information after collision*

|| Physics Collider | RigidBody | Kinematic RigidBody | Physics Collider Trigger | RigidBody Trigger | Kinematic RigidBody Trigger|
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Physics Collider | | Y|||||
| RigidBody | Y | Y | Y | Y||||
| Kinematic RigidBody | | Y|||||
| Physics Collider Trigger|||||||
| Rigid Body Trigger|||||||
| Kinematic Rigid Body Trigger|||||||

>*There is trigger information after collision*

|| Physics Collider | RigidBody | Kinematic RigidBody | Physics Collider Trigger | RigidBody Trigger | Kinematic RigidBody Trigger|
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Physics Collider | | | | | | | | | Y | Y|
| RigidBody | | | | | | Y | Y | Y | Y|
| Kinematic RigidBody | | | | | | Y | Y | Y | Y|
| Physics Collider Trigger | | Y | Y | Y | | Y | Y | Y|
| RigidBody Trigger | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y|
| Kinematic RigidBody Trigger | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y|

