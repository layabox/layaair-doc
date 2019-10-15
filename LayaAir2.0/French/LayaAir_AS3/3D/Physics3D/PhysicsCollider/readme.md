#Collisionneur physique

###### *version :2.1.1   Update:2019-7-19*

Dans layaair3d.**Physicscollider**Un collisionneur physique est un collisionneur statique.Il reste toujours un endroit où il ne bouge jamais.Je viens de l'apprendre, mais je ne peux pas le bouger.

Quand Unity exporte, si seulement`Collider`Il n'y a pas de rigidité. Après l'exportation.`PhysicsCollider`ComposantCet ensemble est souvent utilisé pour fabriquer des objets immobiles dans des scènes ou est souvent utilisé comme déclencheur.

####1) Création de collimateurs physiques au moyen de codes

Ici, on ajoute un collisionneur physique à l 'aide d' un code.Le code ci - dessous crée simplement un plan.Comme le montre la figure 1.


```typescript

//平面
var plane:MeshSprite3D = scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(10, 10, 10, 10))) as MeshSprite3D;
//新建材质
var planeMat:BlinnPhongMaterial = new BlinnPhongMaterial();

Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(null, function(tex:Texture2D):void {
    	planeMat.albedoTexture = tex;
}));
//设置纹理平铺和偏移
planeMat.tilingOffset = new Vector4(10, 10, 0, 0);
//设置材质
plane.meshRenderer.material = planeMat;

//平面添加物理碰撞体组件
var planeStaticCollider:PhysicsCollider = plane.addComponent(PhysicsCollider);
//创建盒子形状碰撞器
var planeShape:BoxColliderShape = new BoxColliderShape(10, 0, 10);
//物理碰撞体设置形状
planeStaticCollider.colliderShape = planeShape;
//物理碰撞体设置摩擦力
planeStaticCollider.friction = 2;
//物理碰撞体设置弹力
planeStaticCollider.restitution = 0.3;
```


[] (IMG / 1.png) <br > (Figure 1)

####2) acquisition d 'un collisionneur physique sur un modèle d' exportation

Après l 'exportation, il peut être nécessaire d' ajuster certaines propriétés du collisionneur physique.Il faut donc obtenir un collisionneur physique à partir du modèle exporté.


```typescript

//加载模型
Sprite3D.load("Conventional/shoot.lh",Handler.create(this,function(sp:Sprite3D):void{
    var cube:MeshSprite3D = sp.getChildAt(0) as MeshSprite3D;
    //获取物理碰撞器
    var cubeCollider:PhysicsCollider = cube.getComponent(PhysicsCollider);
}));
```



