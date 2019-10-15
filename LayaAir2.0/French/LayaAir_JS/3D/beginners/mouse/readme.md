#Interaction de souris layaair3d

###Aperçu de l 'interaction de la souris

Dans le moteur layaair2d, l 'objet 2D affiche des événements de souris pour nous permettre d' élaborer une logique simple et pratique.Cette fonction n 'a pas été réalisée dans le moteur layaair 3D, l' espace 3D est plus complexe et montre que l 'objet a une relation lointaine, superposée, découpée, paternelle, etc., et que l' espace continue de changer.Par conséquent, les moteurs 3D ont utilisé des impacts, des couches et des rayons physiques pour la détection et l 'information sur les impacts de souris.



###Collider

Le collisionneur est un ensemble physique qui peut être ajouté à un objet d 'affichage 3D, principalement pour la détection de collision d' un objet dans l 'espace 3D, selon la forme de l' objet affiché 3D et selon différents types.

Il y a trois types de collisionneurs que le moteur layaair3d appuie actuellement.**Spherecollider**Oui.**Boxcollider**Oui.**Dispositif de collision de grille**".De...**Précision de détection de collision**Et**Consommation**De bas en haut, spherecollider - boxcollider - meshcollider; un collimateur approprié peut être sélectionné en fonction des besoins de développement du jeu.

Le procédé d 'affichage 3D d' un code d 'objet pour ajouter un composant de collision est le suivant (version 1.7.12 du moteur) et il est conseillé à l' concepteur de ne pas essayer l 'ajout de code, ce qui est plus difficile, en ajoutant directement l' ensemble collision à l 'unité.

Le collisionneur doit être ajouté à l 'objet d' affichage du type meshsprite3d et ne peut pas être ajouté à l 'objet sprite3d, faute de quoi il ne fonctionne pas.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//给模型添加盒子碰撞器
var boxCollider = box.addComponent(Laya.PhysicsCollider);
var boxShape = new Laya.BoxColliderShape(1,1,1);

//给模型添加球型碰撞器
var sphereCollider = sphere.addComponent(Laya.PhysicsCollider);
var sphereShape = new Laya.SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//给模型添加MESH碰撞器
var meshCollider = meshSprite3D.addComponent(Laya.PhysicsCollider);
var meshShape = new Laya.MeshColliderShape();
meshShape.mesh = meshSprite3D.meshFilter.shareMesh;
meshCollider.colliderShape = meshShape;
            
```


A partir de la version 1.7.12 du moteur et de la version 1.7.0 du module d 'Export, Collider ajouté au modèle 3D dans l' Unity peut être exporté et le moteur peut charger automatiquement la création.

Après l 'ajout de boxcollider et spherecollider au modèle dans l' Unity, la taille de la boîte de collision ou de la boule de collision peut également être réglée en fonction de la demande, la boîte de collision peut être plus petite ou plus grande que le modèle réel et la position peut être modifiée pour faciliter le traitement logique des développeurs.

###Layer

Il y a 32 étages dans la scène par défaut, vous pouvez choisir de laisser les elfes 3D dans n 'importe quelle couche.Sur la caméra, la caméra peut être découpée en fonction du niveau;**Pour la détection de collision, il est possible de contrôler la couche de collision et non la couche de collision.**".

Le procédé de désignation d 'une couche elfe 3D est le suivant:


```typescript

//指定3D精灵的层
plane.layer = 10;
```




###Ray.

Le rayon est un type de données qui n 'est pas un objet d' affichage, il a des propriétés originelles et directionnelles.

Dans le jeu, comme l 'espace de visualisation change souvent, et pour simuler la position de la souris dans l' espace 3D, le moteur layaair3d propose un procédé de création de rayons par caméra camera qui produit un rayon perpendiculaire à l 'écran.

Les procédés de création de rayons par caméra sont les suivants:


```typescript

//射线初始化（必须初始化）
 this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
//获取鼠标在屏幕空间位置
this.point = new Laya.Vector2();	
this.point.elements[0] = Laya.MouseManager.instance.mouseX;
this.point.elements[1] = Laya.MouseManager.instance.mouseY;
//详设计产生射线方法，通过2D坐标获取与屏幕垂直的一条射线
this.camera.viewportPointToRay(this.point,this.ray);
```




###Détection de rayonnement physique

Une fois que nous avons créé un collisionneur pour les objets d 'affichage 3D dans la scène, que nous avons installé une couche (par défaut au niveau 0) et que nous avons créé un rayon, la détection de l' intersection peut être effectuée au moyen d 'une collision avec un rayon physique, et l' développeur peut faire ses propres jugements logiques en fonction de la demande, tels que la capture, la sélection, la création, etc.

La détection physique des rayons ionisants nous fournit deux méthodes: la détection de l 'acquisition d' informations sur le premier collisionneur qui a eu lieu et la détection de l 'acquisition d' informations sur tous les collisions qui se sont produites.

![1](img/1.png)(Figure 1) < / BR >



###Informations sur les collisions

Les informations de collision détectées par rayons doivent être initialisées avant la détection et, si le rayonnement interagit avec l 'objet d' affichage 3D, diverses informations, telles que les propriétés hitresult de l 'information de collision, la position spatiale de l' intersection, le Sommet triangulaire de l 'intersection peuvent être obtenues à partir de l' information de collision.

Hitlesult.collider.owner est l'objet Node qui se croise.

Point est la position spatiale du point d 'intersection des rayons et du modèle.

Le fait de savoir si le succeeded interagit avec un objet est réel.

Normal est la ligne de droit de l 'objet (vector3).



###Exemple de capture de souris

####Rayons:

Sur la base du concept et de la méthode ci - dessus, nous allons produire un exemple de prise de rayons de la souris en procédant comme suit:

Créer plusieurs objets 3D dans une scène d 'Unity, par exemple trois voitures, à l' aide d 'une fiche d' exportation.

Exemple de scéne.

Pour obtenir le modèle Mesh, ajouter un collisionneur au modèle à l 'aide du Mesh.

Initialiser un rayon.

Ajoutez l 'événement de clic de la souris et si vous cliquez sur la souris et entrez avec l' article 3D, nous laisserons l 'article 3D disparaître et suggérerons d' obtenir des informations.

Les codes principaux sont les suivants:


```typescript

import SceneScript from "./SceneScript";

var Main = (function () {
  var ray;
  var point;
  var camera;
  var stage;
  var _outHitResult;
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    Laya.Scene3D.load("LayaScene_monkey/monkey.ls",Laya.Handler.create(this,function(s){
      this.scene = Laya.stage.addChild(s);
      //添加照相机
      this.camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100)));
      this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
      this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
      this.camera.clearColor = null;

      //添加方向光
      var directionLight = this.scene.addChild(new Laya.DirectionLight());
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

      //添加自定义模型
      var box = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
      box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
      box.transform.translate(new Laya.Vector3(3,2,2));

      var boxCollider = box.addComponent(Laya.PhysicsCollider);
      var boxShape = new Laya.BoxColliderShape(1,1,1)
      //创建物理刚体组件
      var rigidBody = box.addComponent(Laya.Rigidbody3D);
      //刚体质量
      rigidBody.mass = 10;
      //刚体的摩擦力
      rigidBody.friction = 0.4;
      //刚体的弹力
      rigidBody.restitution = 0.2;
      //刚体碰撞器的形状
      rigidBody.colliderShape = boxShape;
      //给box添加脚本组件
      box.addComponent(SceneScript);
      //给box添加材质
      var planeMat = new Laya.BlinnPhongMaterial();
      Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this,function(tex) {
        planeMat.albedoTexture = tex;
        box.meshRenderer.material = planeMat;
      }));
	  //射线初始化（必须初始化）
      this.ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
      this.point = new Laya.Vector2();
      //鼠标事件监听
      Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
    }));
    var _proto =Main.prototype;
    _proto.onMouseDown = function(){
      this.point.elements[0] = Laya.MouseManager.instance.mouseX;
      this.point.elements[1] = Laya.MouseManager.instance.mouseY;
      //必须先把outhitresult实例化
      this._outHitResult = new Laya.HitResult();
      //产生射线
      this.camera.viewportPointToRay(this.point,this.ray);
      //拿到射线碰撞的物体
      this.scene.physicsSimulation.rayCast(this.ray,this._outHitResult);
      //如果碰撞到物体
      if (this._outHitResult.succeeded)
      {
        //删除碰撞到的物体
        this._outHitResult.collider.owner.removeSelf();
        trace("碰撞到物体！！")
      }
    }
  }
  return Main;
} ());

new Main();

```


Les codes scénescript de la catégorie de scripts sont les suivants:

####Écris le script:

**L 'événement d' écoute de la souris omousedown qui répond directement à l 'écriture script3d est déclenché lorsque la souris clique sur le modèle.**


```typescript

export default class SceneScript extends Laya.Script3D{
    constructor(){super()}
    //物体必须拥有碰撞组件（Collider）
    //当被鼠标点击
    onMouseDown(e){
        console.log("点击到我了");
        //从父容器销毁我自己
        this.owner.removeSelf();
    }
    onUpdate(){

    }
    //当产生碰撞
    onCollisionEnter(collision){
        this.owner.meshRenderer.sharedMaterial.albedoColor = new Laya.Vector4(0,0,0,1); 
    }
}
```


Le Code de présentation compilé permet d 'obtenir l' effet suivant (fig. 2), de cliquer sur la souris pour obtenir le véhicule et d 'enlever le modèle du véhicule de la scène.

![2](img/2.gif)(Figure 2) < / BR >



###Créer un objet

Dans les jeux, nous utilisons aussi souvent la souris pour contrôler la mise en place d 'objets de jeu, tels que des jeux de type construction au sol, rôle, accessoires, etc.

La souris pose un objet de la même manière que le procédé de capture d 'un objet, ce qui nécessite également l' utilisation d 'éléments et de procédés 3D tels que des collisions, des rayons, la détection des rayons, des informations de collision, etc.

Lors de la création de l 'article, après avoir cliqué sur les rayons du modèle, nous pouvons obtenir la position de l' objet par l 'information de collision raycasthit.point, puis placer l' article créé ici.En outre, nous utilisons le clonage pour créer des objets, et les développeurs en font attention.

Dans l 'exemple de capture, nous avons utilisé un boxcollider de type boxcollider, et dans l' exemple de création, nous avons utilisé un meshcollider de type grille, qui est plus précis.

Modifier le Code principal comme suit:

Créer un modèle de camion et ajouter un ensemble Collisionneur de grille à la carrosserie du camion.


```typescript

import SceneScript from "./SceneScript";

var Main = (function () {
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene = Laya.stage.addChild(new Laya.Scene3D());
    scene.addComponent(SceneScript);
    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    var b = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10,1,10)));
    var bcollider = b.addComponent(Laya.PhysicsCollider);
    var bshape = new Laya.BoxColliderShape(10,1,10);
    bcollider.colliderShape = bshape;
    //添加自定义模型
    Laya.Sprite3D.load("LayaScene_willhero/chengqiang35.lh",Laya.Handler.create(this,function(sp){
      var cheng = scene.addChild(sp.getChildAt(0));
      var chengCollider = cheng.addComponent(Laya.PhysicsCollider);
      //添加网格型碰撞器组件
      var chengshape = new Laya.MeshColliderShape();
      //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
      chengshape.mesh = cheng.meshFilter.sharedMesh; 
      chengCollider.colliderShape = chengshape;
    }))
  }
  return Main;
} ());

Main();

```


Modifier le Sous - Code de scène comme suit:


```typescript

export default class SceneScript extends Laya.Script3D{
  constructor(){
    super();
    this.camera = 0;
    this.ray = 0;
    this.point = 0;
    this.rayCastHit = 0;
    this.box = 0;
  }

  onStart(){
    //获取摄像机
    this.camera = this.owner.addChild(new Laya.Camera(0,0.1,100));
    this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
    this.camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    this.camera.clearColor = null;  

    this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    this.point = new Laya.Vector2();
    //创建一个货物模型
    this.box = this.owner.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5)));
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  onMouseDown(){
    this.point.x = Laya.MouseManager.instance.mouseX;
    this.point.y = Laya.MouseManager.instance.mouseY;

    this.camera.viewportPointToRay(this.point,this.ray);
    this.rayCastHit = new Laya.HitResult();
    this.owner.physicsSimulation.rayCast(this.ray,this.rayCastHit);

    if (this.rayCastHit.succeeded)
    {
      //克隆一个货物模型
      var cloneBox = Laya.Sprite3D.instantiate(this.box);
      //给物体添加碰撞组件
      var meshCollider = cloneBox.addComponent(Laya.PhysicsCollider);
      var cloneMesh = new Laya.BoxColliderShape(0.5,0.5,0.5);
      meshCollider.colliderShape = cloneMesh;

      this.owner.addChild(cloneBox);
      cloneBox.transform.position = this.rayCastHit.point;
    }
  }
}
```


Compiler le code d 'affichage ci - dessus permet de voir que l' objet peut être créé par clic de souris (fig. 3) et que les rayons se croisent avec le modèle pour afficher un triangle à l 'intersection du modèle.

![3](img/3.gif)(Figure 3) < / BR >