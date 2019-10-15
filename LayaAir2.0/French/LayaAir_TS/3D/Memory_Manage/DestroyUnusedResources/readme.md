#Stock destruction release Memory

###### *version :2.0.2beta   Update:2019-5-8*

Scene3d, sprite3d.`destroy()`Ensuite, les matériaux, les textures, les grilles ne sont pas détruits en même temps que les elfes.Les ressources restantes doivent être utilisées séparément.`Laya.loader.getRes(url:String)`Lorsque l 'interface obtient l' objet ressource, elle l 'appelle.`destroy()`Méthodes de destruction.Mais cette méthode est très difficile.Layaair2.0 pour la commodité du développeur`Resource.destroyUnusedResources()`L 'interface est détruite.

​**Tip**A) Prendre note de la nécessité de nettoyer les ressources associées à un scéne3d ou à sprite3d et de détruire non seulement les Elfes de son corps, mais aussi les elfes clonés;En ce moment`destroyUnusedResources`La méthode libère automatiquement tout ce qui est utilisé et non utilisé.**Verrouillage**Ressources.

[] (IMG / 1.png) <br > (Figure 1)

Comme le montre la figure 1, un bouton a été ajouté à notre carte.Et ajoute l 'événement suivant au bouton.

> la Section de code ci - après est choisie parmi les exemples officiels. ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Resource&name=GarbageCollection)- Oui.


```typescript

function(e:Laya.Event):void {
    this._castType++;
    this._castType %= 2;
    switch (this._castType) {
    case 0: 
    	(e.target as Button).label = "释放显存";
    	this.loadScene();
    break;
    case 1: 
    	(e.target as Button).label = "加载场景";
    	if (this._scene)//_scene不为空表示场景已加载完成
    		this.garbageCollection();
    break;
}
    
/**
 * @private 销毁场景并且释放资源
 */
public garbageCollection():void {
   this._scene.destroy();//销毁场景
   this._scene = null;
   Laya.Resource.destroyUnusedResources();//销毁无用资源(没有被场景树引用,并且没有加资源锁的)
}

/**
 * @private 加载场景，并且将该场景添加到stage上
 */
public loadScene():void {
    Laya.Scene3D.load("res/threeDimen/scene/ParticleScene/Example_01.ls", Laya.Handler.create(this, function(scene:Laya.Scene3D):void {
      	this._scene = Laya.stage.addChildAt(scene, 0) as Laya.Scene3D;
     	var camera = scene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
    	camera.transform.translate(new Laya.Vector3(0, 1, 0));
     	camera.addComponent(CameraMoveScript);
    }));
 }
```


Nous verrons l 'état en cliquant sur la scène de chargement.

[] (IMG / 2.png) <br > (Figure 2)

Quand la scène apparaît, on peut voir**Stat.**Panneau**Gpumemory**Il y a une augmentation plus marquée.

Puis on clique sur l 'affichage de libération.

[] (IMG / 3.ping) <br > (Figure 3)

####Verrouillage de ressources

Parce que`destroyUnusedResources`Mécanisme de libération de l 'interfaceIl nous faut des ressources qui ne sont pas utilisées et qui ne peuvent pas être libérées.**Verrouillage**".Le procédé actuel de verrouillage comporte plusieurs modes de verrouillage différents en raison de la différence entre le chargement de ressources uniques 2D, 3D et le chargement de lots 3D.

​**Attention:**La serrure est en fait pour les pères.`Resource`L 'objet de ressources est verrouillé.

#####Verrouillage de ressources lors du chargement de ressources uniques 3D

Lorsqu 'une ressource est chargée au moyen d' un mode de chargement de ressources correspondant, le verrouillage direct de l 'objet de ressource récupéré est réalisé.Mode de chargement des ressources correspondantes**Ressources**A**Chargement de ressources**Section, non compris la scène et le chargement prévu.Les scénarios individuels et les types de valeurs de retour de charge prédéterminés sont scene3d et sprite3d respectivement, et ne sont pas des objets de ressources hérités de resource.


```typescript

//加载Mesh
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey2/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh:Laya.Mesh):void {
    //给该网格资源上锁
    mesh.lock = true;
	........
    //中间省略，我们再网格加载完成3秒后对该网格进行销毁
    Laya.timer.once(3000,this,function ():void 
    {
        //销毁了使用该网格的节点
        layaMonkey.destroy();
        //对使用资源进行销毁,注意调用资源destroy的话，就算加锁也是会被销毁的。
        Laya.Resource.destroyUnusedResources();
    });
}));
```


[] (IMG / 4.png) <br > (fig. 4) avant de faire appel à la libération automatique

[] (IMG / 5.png) <br > (fig. 5) après avoir appelé à la libération automatique

Comme on peut le voir, la libération de gpumemory après verrouillage des ressources d 'appel n' a pas diminué.

Chargement`.lh`Et`.ls`Dans la pratique, les fichiers sont automatiquement chargés sur les fichiers qu 'ils utilisent`.lmat`Documents de fond`.lani`Fichier d 'animation`.lm`Fichiers de grilleLe verrouillage des ressources de cette ressource nécessite l 'obtention d' un noeud de ressource correspondant par le biais du scene3d et du sprite3d récupérés.


```typescript

//加载精灵
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, function(sp:Laya.Sprite3D):void {
    //获取蒙皮网格精灵
    var skinnedmesh = sp.getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D;
    //对预设的网格上锁
    skinnedmesh.meshFilter.sharedMesh.lock = true;
    //对预设所有的材质上锁
    for (var i:int = 0; i < skinnedmesh.skinnedMeshRenderer.sharedMaterials.length;i++ ){
    	skinnedmesh.skinnedMeshRenderer.sharedMaterials[i].lock = true;
    }
}));
```


#####Verrouillage de ressources lors du chargement en 3D

Il n 'est pas possible d' obtenir une valeur de retour lorsque les ressources sont chargées en lots.Il faut que le développeur passe.`Laya.loader.getRes(url)`Pour obtenir les ressources correspondantes pour verrouiller.


```typescript

//批量预加载方式
public PreloadingRes():void {
//预加载所有资源
var resource:Array = [
    "res/threeDimen/scene/TerrainScene/XunLongShi.ls",
    "res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
    "res/threeDimen/texture/earth.png", 
    "res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
    "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", 
    "res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
    "res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani"
];
    
    //开始加载
    Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
}

//加载完成回调
public onPreLoadFinish():void {
    //获取需要上锁的资源
    var skyboxMaterial = Laya.Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat") as Laya.BaseMaterial;
    //资源上锁
    skyboxMaterial.lock = true;
    .......
    //获取需要上锁的资源
    var mesh = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm") as Laya.Mesh;
    //资源上锁 
	mesh.lock = true;
	.......
}
```


#####Verrouillage de ressources

Dans le 2D, l 'image utilise`Texture`Texture (attention n 'est pas dans 3D)`Texture2D`).Mais, en fait, texture est le réemballage de texture2d, texture.`bitmap`Les attributs sont texture2d, texture elle - même enregistrant les attributs UV de texture2 pour réaliser l 'affichage d' une image unique dans l 'image.

Ainsi, dans le 2D, une pluralité de textures différentes dans le même ensemble est un bitmap commun.Un tel mécanisme pourrait induire en erreur le concepteur dans la gestion de la mémoire: « si un texture en 2D a été détruit, la présence qu'il occupe devrait également être libérée ».

​**Ce n 'est pas bien.Etant donné que plusieurs textures renvoient à la même bitmap et que la texture n 'est pas une vraie existence, bitmap est l' objet réel.La destruction de texture n'est pas synonyme de destruction de bitmap, de sorte qu'à ce moment - là, il n'est pas possible de libérer les stocks.**

Ainsi, l 'image 2D est verrouillée avec la ressource d' image et, en fait, avec le bitmap correspondant de texture.Après chargement de l 'image`Laya.loader.getRes(url)`Obtenez une texture texture texture dans l 'Atlas et Verrouillez - la par l' attribut bitmap de texture.


```typescript

private init():void {
	//加载场景
	Laya.loader.load('res/atlas/comp.atlas',Laya.Handler.create(this,this.onComplete));
}

private onComplete():void{
	//获取图集中的一个单图
	var a = Laya.loader.getRes('comp/button.png') as Laya.Texture;
	//通过单图的bitmap对图集加锁
	a.bitmap.lock = true;
}
```

