#Interaction de souris layaair3d

###Aperçu de l 'interaction de la souris

Dans le moteur layaair2d, l 'objet 2D affiche des événements de souris pour nous permettre d' élaborer une logique simple et pratique.Cette fonction n 'a pas été réalisée dans le moteur layaair 3D, l' espace 3D est plus complexe et montre que l 'objet a une relation lointaine, superposée, découpée, paternelle, etc., et que l' espace continue de changer.Par conséquent, les moteurs 3D ont utilisé des impacts, des couches et des rayons physiques pour la détection et l 'information sur les impacts de souris.



####Collider

Le collisionneur est un ensemble physique qui peut être ajouté à un objet d 'affichage 3D, principalement pour la détection de collision d' un objet dans l 'espace 3D, selon la forme de l' objet affiché 3D et selon différents types.

Il y a trois types de collisionneurs que le moteur layaair3d appuie actuellement.**Spherecollider**Oui.**Boxcollider**Oui.**Dispositif de collision de grille**".De...**Précision de détection de collision**Et**Consommation**De bas en haut, spherecollider - boxcollider - meshcollider; un collimateur approprié peut être sélectionné en fonction des besoins de développement du jeu.

Le procédé d 'ajout d' un ensemble collisionneur à un code d 'objet 3D est le suivant: il est conseillé à l' développeur de ne pas essayer avec l 'ajout de code, ce qui est plus difficile et d' ajouter directement l 'ensemble collision à l' unité.

Le collisionneur doit être ajouté à l 'objet d' affichage du type meshsprite3d et ne peut pas être ajouté à l 'objet sprite3d, faute de quoi il ne fonctionne pas.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加碰撞器组件并获取
var meshCollider:Laya.PhysicsCollider = meshSprite3d1.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
var boxShape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
//获取模型的Mesh网格
boxShape.mesh = meshSprite3d1.meshFilter.sharedMesh as Laya.Mesh;
//把Mesh网格添加到碰撞器
meshCollider.colliderShape = boxShape;

//添加碰撞器组件并获取
var sphereCollider:Laya.PhysicsCollider = meshSprite3d2.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建球型碰撞器
var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//添加碰撞器组件并获取
var boxCollider:Laya.PhysicsCollider = meshSprite3d3.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建盒型碰撞器
var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
boxCollider.colliderShape = boxShape;	
```


A partir de la version 1.7.12 du moteur et de la version 1.7.0 du module d 'Export, Collider ajouté au modèle 3D dans l' Unity peut être exporté et le moteur peut charger automatiquement la création.

Après l 'ajout de boxcollider et spherecollider au modèle dans l' Unity, la taille de la boîte de collision ou de la boule de collision peut également être réglée en fonction de la demande, la boîte de collision peut être plus petite ou plus grande que le modèle réel et la position peut être modifiée pour faciliter le traitement logique des développeurs.



###Layer

Il y a 32 étages dans la scène par défaut, vous pouvez choisir de laisser les elfes 3D dans n 'importe quelle couche.Sur la caméra, la caméra peut être découpée en fonction du niveau;**Pour la détection de collision, il est possible de contrôler la couche de collision et non la couche de collision.**".

Le procédé de désignation d 'une couche elfe 3D est le suivant:


```typescript

//指定3D精灵的层
meshSprite3d1.layer = 10
```




###Ray.

Le rayon est un type de données qui n 'est pas un objet d' affichage, il a des propriétés originelles et directionnelles.

Dans le jeu, comme l 'espace de visualisation change souvent, et pour simuler la position de la souris dans l' espace 3D, le moteur layaair3d propose un procédé de création de rayons par caméra camera qui produit un rayon perpendiculaire à l 'écran.

Les procédés de création de rayons par caméra sont les suivants:


```typescript

//射线初始化（必须初始化）
 this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
//获取鼠标在屏幕空间位置
 private point:Laya.Vector2 = new Laya.Vector2();
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

Les informations de collision détectées par les rayons doivent être initialisées avant la détection et, si les rayons sont en contact avec l 'objet d' affichage 3D, on peut obtenir des informations telles que les propriétés raycasthit des informations de collision, la position spatiale de l 'intersection, le Sommet triangulaire de l' intersection, etc.

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

// 程序入口
class Main {
  private scene:Laya.Scene3D;
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private hitresult:Laya.HitResult = new Laya.HitResult();
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    Laya.Scene3D.load("LayaScene_monkey/monkey.ls",Laya.Handler.create(this,function(s:Laya.Sprite3D):void{
      this.scene = Laya.stage.addChild(s) as Laya.Scene3D;

      //添加照相机
      this.camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
      this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
      this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
      this.camera.clearColor = null;

      //添加方向光
      var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
      // 添加自定义模型(box)
      var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1))) as Laya.MeshSprite3D;
      box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
      box.transform.translate(new Laya.Vector3(3,2,2));
      //给模型添加碰撞器前需要先给模型添加碰撞组件
      var boxCollider:Laya.PhysicsCollider =  box.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
      var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
      //创建物理刚体组件
      var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
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
      var planeMat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
      Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this, function(tex:Laya.Texture2D):void {
        planeMat.albedoTexture = tex;
        box.meshRenderer.material = planeMat;
      }));
    }));
	//射线初始化（必须初始化）
    this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    //鼠标事件监听
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  private onMouseDown():void{
    //获取鼠标位置
    this.point.elements[0] = Laya.MouseManager.instance.mouseX;
    this.point.elements[1] = Laya.MouseManager.instance.mouseY;
	//产生射线
    this.camera.viewportPointToRay(this.point,this.ray);
    //拿到射线碰撞的物体
    this.scene.physicsSimulation.rayCast(this.ray,this.hitresult);
	//如果碰撞到物体
    if (this.hitresult.succeeded)
    {
      //删除碰撞到的物体
      this.hitresult.collider.owner.removeSelf();
      console.log("碰撞到物体！！")
    }
  }
}
new Main();
```


####Écris le script:

**L 'événement d' écoute de la souris omousedown qui répond directement à l 'écriture script3d est déclenché lorsque la souris clique sur le modèle.**


```typescript

export default class SceneScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
     /**
     * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
     */
    public onAwake():void{
        this.box = this.owner as Laya.MeshSprite3D;
    }
    //物体必须拥有碰撞组件（Collider）
    public onMouseDown():void{
        console.log("点到我了");
        this.box.removeSelf();
    }

    public onCollisionEnter(conllision):void{
        
        (this.box.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0,0,0,1);
    }
}
```


Le Code de présentation compilé permet d 'obtenir l' effet suivant (fig. 2), de cliquer sur la souris pour obtenir le véhicule et d 'enlever le modèle du véhicule de la scène.

![2](img/2.gif)(图2)</br>







###Créer un objet

Dans les jeux, nous utilisons aussi souvent la souris pour contrôler la mise en place d 'objets de jeu, tels que des jeux de type construction au sol, rôle, accessoires, etc.

La souris pose un objet de la même manière que le procédé de capture d 'un objet, ce qui nécessite également l' utilisation d 'éléments et de procédés 3D tels que des collisions, des rayons, la détection des rayons, des informations de collision, etc.

Lors de la création de l 'article, après avoir cliqué sur les rayons du modèle, nous pouvons obtenir la position de l' objet par l 'information de collision raycasthit.point, puis placer l' article créé ici.En outre, nous utilisons le clonage pour créer des objets, et les développeurs en font attention.

Dans l 'exemple de capture, nous avons utilisé un boxcollider de type boxcollider, et dans l' exemple de création, nous avons utilisé un meshcollider de type grille, qui est plus précis.

Modifier le Code principal comme suit:

Créer un modèle de camion et ajouter un ensemble Collisionneur de grille à la carrosserie du camion.


```typescript

import SceneScript from "./SceneScript";

// 程序入口
class Main {
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
    scene.addComponent(SceneScript);

    //添加方向光
    var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    var b:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10,1,10)))as Laya.MeshSprite3D;
    var bcollider:Laya.PhysicsCollider = b.addComponent(Laya.PhysicsCollider);
    var bshape:Laya.BoxColliderShape = new Laya.BoxColliderShape(10,1,10);
    bcollider.colliderShape = bshape;
    //创建货车模型，加载到场景中
    Laya.Sprite3D.load("LayaScene_willhero/chengqiang35.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
      var cheng:Laya.MeshSprite3D = scene.addChild(sp.getChildAt(0))as Laya.MeshSprite3D;
      var chengCollider:Laya.PhysicsCollider = cheng.addComponent(Laya.PhysicsCollider);
      //添加网格型碰撞器组件
      var chengshape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
      //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
      chengshape.mesh = cheng.meshFilter.sharedMesh as Laya.Mesh; 
      chengCollider.colliderShape = chengshape;
    }));
  }
}
new Main();
```


Modifier le Code de la classe de contrôle du script de scénario comme suit:


```typescript

export default class SceneScript extends Laya.Script3D{
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private _HitCastResult:Laya.HitResult;
  private box:Laya.MeshSprite3D;
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor(){
    super();
  }

  public onStart():void {
    //添加一个摄影机
    this.camera =this.owner.addChild(new Laya.Camera(0,0.1,100)) as Laya.Camera;
    this.camera.transform.translate(new Laya.Vector3(0,3,3));
    this.camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    this.camera.clearColor = null;
    
	//初始化一条射线
    this.ray= new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    this._HitCastResult = new Laya.HitResult();
    this.box = this.owner.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5))) as Laya.MeshSprite3D;
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  public onMouseDown():void{
    //获取鼠标位置
    this.point.x = Laya.MouseManager.instance.mouseX;
    this.point.y = Laya.MouseManager.instance.mouseY;
    //发射射线
    this.camera.viewportPointToRay(this.point,this.ray);
    (this.owner as Laya.Scene3D).physicsSimulation.rayCast(this.ray,this._HitCastResult);

    if (this._HitCastResult.succeeded)
    {
      //克隆一个货物模型
      var cloneBox:Laya.MeshSprite3D = Laya.Sprite3D.instantiate(this.box) as Laya.MeshSprite3D;
      //给物体添加碰撞组件
      var meshCollider:Laya.PhysicsCollider = cloneBox.addComponent(Laya.PhysicsCollider);
      var cloneMesh:Laya.BoxColliderShape = new Laya.BoxColliderShape(0.5,0.5,0.5);
      meshCollider.colliderShape = cloneMesh;
		
      //把物体添加到场景
      this.owner.addChild(cloneBox);
      //把物体移动到射线点击的位置
      cloneBox.transform.position = this._HitCastResult.point;
    }
  }
}
```


Compiler le code d 'affichage ci - dessus permet de voir que l' objet peut être créé par clic de souris (fig. 3) et que les rayons se croisent avec le modèle pour afficher un triangle à l 'intersection du modèle.

![3](img/3.gif)(Figure 3) < / BR >