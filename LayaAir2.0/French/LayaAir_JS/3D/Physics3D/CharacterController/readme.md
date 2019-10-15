#Role Collider

###### *version :2.1.1   Update:2019-7-19*

Si l 'on veut créer un rôle similaire, on peut utiliser un contrôleur de rôle.Ce collisionneur est principalement utilisé pour commander le rôle d 'un jeu de troisième nom et d' un jeu de premier nom.

Un Collisionneur de rôle dans la layaair3d possède des propriétés physiques rigides, mais aussi des caractéristiques du Contrôleur de personnages, telles que:

Un personnage ne peut pas tomber, c 'est - à - dire qu' il y en a un.`upAxisUp`(vecteur up).

Il y a une personne qui peut traverser.`stepHeight`Altitude maximale.

Ainsi, en règle générale, tous les rôles similaires peuvent être contrôlés par un contrôleur de rôle.

> ce qui est dit ici ne tombe pas signifie que le percuteur du personnage ne tombe pas.Le vecteur up détermine l 'axe de rotation du Contrôleur, selon lequel le Contrôleur ne peut tourner que sur cet axe.

**Tip**: la boîte de collision généralement utilisée pour les collisions de personnages est la boîte de collision de capsules.

[] (IMG / 1.png) <br > (Figure 1)

Il existe d 'autres méthodes très utiles pour les collisions de rôles: Comme le déplacement et le saut.

[] (IMG / 2.png) <br > (Figure 2)

Il y a d'autres outils de collision de rôle que l'API peut consulter.[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.CharacterController)).

####1) Création d 'un collimateur de rôle à l' aide d 'un code

**Pour l 'instant, le connecteur ne supporte pas l' Export du collimateur de rôle et doit être utilisé pour créer un code.**

Le code suivant est un exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_Character)- Oui.


```typescript

//为精灵添加角色控制器
var character = monkey.addComponent(Laya.CharacterController);
//创建胶囊碰撞器
var sphereShape = new Laya.CapsuleColliderShape(1.0, 3.4);
//设置Shape的本地偏移
sphereShape.localOffset = new Laya.Vector3(0, 1.7, 0);
//设置角色控制器的碰撞形状
character.colliderShape = sphereShape;
```


[] (IMG / 3.ping) <br > (Figure 3)

