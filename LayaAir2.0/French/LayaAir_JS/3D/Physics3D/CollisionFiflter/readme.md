# 碰撞器过滤

###### *version :2.1.1   Update:2019-7-19*

Le filtre d 'impact est une propriété à la fois rigide et physique.Il est impossible que tous les objets entrent en collision avec n'importe quel autre objet au cours du développement physique, par exemple les balles tirées par le protagoniste lui - même et qui ne sont pas autorisées à entrer en collision, ou que ses propres balles ne blessent pas les membres de l'équipe.Pour cela, il faut utiliser un filtre pour déterminer si les balles peuvent entrer en collision avec ces objets et ceux qui ne peuvent pas le faire.

En ce qui concerne le filtrage des collisions, il faut utiliser la physicscollider et rigidbody3d:

Un.`collisionGroup:int`- Groupe d'impact.

Deux.`canCollideWith:int`- groupes de collisions pouvant générer des collisions, ces deux propriétés.

Pour les paquets de dispositifs de collision, voir:[Physics3DUtils类](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.utils.Physics3DUtils), le paquet d 'impact d' un objet au même moment est le seul.

Pour ce qui est de la propriété d 'un groupe de collisions pouvant produire des collisions, si l' on ne peut entrer en collision qu 'avec un seul groupe, on utilise l' attribution de paquets physics3dutils.

Il faut utiliser des bits pour entrer en collision avec plusieurs groupes.

Les codes suivants sont des extraits de l'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Physics3D&name=PhysicsWorld_CollisionFiflter)).Dans l 'exemple, nous n' avons défini les propriétés de cancollidewith que pour les sphères rouges.D'autres groupes d'impacts sont différents.


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
var rigidBody = cone.addComponent(Laya.Rigidbody3D);
//给该刚体划分碰撞组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;//自定义组3
......
//给胶囊体添加刚体
var rigidBody = capsule.addComponent(Laya.Rigidbody3D);
//设置胶囊体的碰撞分组
rigidBody.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;//自定义组2,会跳过碰撞
......
```


> informations de paquets: boîtes - groupe personnalisé 1, Capsules - sous - groupe personnalisé 2, cône - sous - groupe personnalisé 3, cylindre - sous - groupe personnalisé 4, sphère - sous - groupe personnalisé 5

[] (IMG / 1.gif) <br > (Figure 1)

La figure 2 montre plus clairement que le ballon rouge traverse le cylindre et la capsule et qu 'il percute le ballon et la boîte.Il y a eu des collisions entre d'autres géométries.

Pour ce qui est de la propriété cancollidewith, il est possible d'utiliser une méthode d'exclusion en plus de cette méthode d'ajout de plusieurs groupes d'impact.Par exemple, il y a collision avec des groupes autres que les groupes 1 et 2 définis par l 'utilisateur.


```typescript

//排除的方法
rigidBody.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1 ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
```

