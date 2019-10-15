#Script de choc physique et script de déclencheur

###### *version :2.1.1   Update:2019-8-2*

L 'événement émis par le déclencheur peut être surveillé par l' développeur sur l 'objet du déclencheur (script3d).Les méthodes d'interception sont décrites à la figure 1 ci - après:

[] (IMG / 1.png) <br > (Figure 1)

Les impacts peuvent aussi déclencher des événements.Les méthodes d'écoute sont les suivantes:

[] (IMG / 2.png) <br > (Figure 2)

Voici comment ces interfaces sont utilisées, cette section du Code est choisie parmi les exemples officiels et peut être consultée plus en détail: ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_TriggerAndCollisionEvent)- Oui.


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


Figure 3 Résultats opérationnels

[] (IMG / 3.ping) <br > (Figure 3)



####Tactile information and Trigger information Rules

Pour les règles d 'impact, vous pouvez consulter le tableau ci - dessous.

Le message de déclenchement est:`onTriggerStay`Oui.`onTriggerStay`Oui.`onTriggerExit`Trois fonctions.

Informations relatives à l'impact`onCollisionEnter`Oui.`onCollisionStay`Oui.`onCollisionExit`Trois fonctions.

]*Il y a une détection de collision après la collision et des informations sur la collision.*

124 \ \ \ 124 \ \ 124 \ \ rigidbody \ \ 124 \ \ 124 \ \ 124 \ \ Kinematic rigidbody \ \ 124 \ \ 124
- - -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ibid., p. 124.
124. Physicscolider \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124
124. Rigidbody \ \ 124y \ \ 1244y \ \ 124a
124. Kenematic rigidbody \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124
124. Physicscolider trigger \ \ 124 \ \ 124 \ \ 124 \ \ \ 124 \ \ 126
124. Rigidbody trigger \ \ 124 \ \ 124 \ \ 124 \ \ 124 \ \ 124
124C Kinematic rigidbody trigger \ \ 124 \ \ 124 \ \ 124 \ \ 124

]*Il y a un message de déclenchement après la collision.*

124 \ \ \ 124 \ \ 124 \ \ rigidbody \ \ 124 \ \ 124 \ \ 124 \ \ Kinematic rigidbody \ \ 124 \ \ 124
- - -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ibid., p. 124.
124, physicscolider \ \ 124, \ \ 124, \ \ 124, \ \ 124, \ \ 124y \ \ 124
124. Rigidbody \ \ 124 \ \ 124 \ \ 124 \ \ y \ \ 124 \ \ y \ \ 124
124. Kenematic rigidbody \ \ 124 \ \ 124 \ \ 124 \ \ y \ \ 124 \ \ 12
124, physicscolider, Trigger, 124, y, 124, y, 124, Y.
124. Rigidbody trigger \ \ 124 y \ \ 124 y \ \ 124 y \ \ 124 y \ \ 124 y \ \ 124 y
124y \ \ 124 y \ \ 124 y \ \ 124 y

