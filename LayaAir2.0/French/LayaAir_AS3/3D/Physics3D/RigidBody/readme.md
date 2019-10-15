#Corps rigide

###### *version :2.1.1   Update:2019-7-19*


 **Rigidbody3d**Le corps rigide est un collisionneur dynamique.Tout objet qui souhaite être affecté par la gravité, par la force appliquée par le script ou qui interagit avec d'autres objets par l'intermédiaire d'un moteur physique doit comprendre un composant rigide.Pour plus de détails sur l 'utilisation, vous pouvez consulter des documents rigides:[地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.d3.physics.Rigidbody3D)•

####1) Création et ajout de corps rigides au moyen de codes

En cas de besoin, on peut ajouter un corps rigide à l 'objet par la création de code.

Dans le Code de l 'exemple suivant, nous avons simplement créé une balle et ajouté un collisionneur et un rigide à la balle.


```typescript

//新建一个球体模型并添加到舞台上
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(1))) as MeshSprite3D;
//新建一个球形的碰撞盒
var sphereShape:SphereColliderShape = new SphereColliderShape(1);
//给球添加刚体
var sphereRigid:Rigidbody3D = sphere.addComponent(Rigidbody3D);
//将碰撞盒添加到刚体上
sphereRigid.colliderShape = sphereShape;
```


Différents modèles sont simplement nécessaires pour créer des grilles Mesh et des boîtes collidershape différentes.

####2) Acquisition de corps rigides sur des modèles d 'exportation

Après l 'Export du modèle, il peut être nécessaire de modifier les effets physiques du corps rigide, auquel cas il faut l' obtenir de l 'objet.

Le Code de l 'exemple suivant est un paramètre de modification du corps rigide après acquisition du corps rigide.


```typescript

//加载模型
Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
    //获取到Meshsprite3d
    var cube:MeshSprite3D = scene.addChild（sp.getChildAt(0)） as MeshSprite3D;
    //获取刚体
    var cubeRigid:Rigidbody3D = cube.getComponent(Rigidbody3D);
}));
```

