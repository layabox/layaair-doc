#Présentation fonctionnelle du modèle

###### *version :2.0.2beta   Update:2019-4-26*

Les modèles 3D sont parfois composés de plusieurs sous - objets, tels que les modèles de scène. LS, qui sont essentiellement des modèles d'objets et des matériaux, l'extérieur est un conteneur sprite3d et l'intérieur un véritable modèle meshsprite3d ou skinnedmeshsprite3d.Et il peut y avoir plusieurs niveaux d 'emboîtement.

####Acquisition d 'une grille de modèle de sous - Objet

Lors de l 'élaboration de la logique de jeu, certains modèles doivent être modifiés, soit en commutant et en supprimant le modèle, soit en ajoutant un module au modèle, soit en obtenant un composant d' animation sur le modèle et un matériau modifiant le modèle.Il faut trouver un sous - objet dans le modèle de chargement.**Getchildat (), getchildbyname ()**Le procédé d 'acquisition d' un sous - objet est le même que celui d 'acquisition d' un sous - objet par un moteur 2D.

Nous allons charger un fichier & ‧‧; LS & ‧‧;, puis obtenir son Sous - objet.Avant d 'obtenir des sous - objets, il est recommandé d' ouvrir. LS pour voir la relation de parenté du modèle, car lors de la fabrication du modèle, on ne peut pas non plus déterminer avec certitude le nombre de modèles de sous - objets et leurs règles de désignation.

**Tips**Lors de la modélisation 3ds Max, il est recommandé d 'appeler les sous - objets du modèle et d' établir des règles de désignation des ressources du projet sans utiliser de nom de modèle par défaut.


```typescript

//初始化3D场景
var scene:Scene3D = Laya.stage.addChild(Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls")) as Scene3D;
//获取球型精灵
var sphere:MeshSprite3D = scene.getChildByName("Sphere") as MeshSprite3D;
//获取精灵的mesh
var sphereMesh:Mesh = sphere.meshFilter.sharedMesh;
//此时已经拿到了场景中的球体的网格
```




####Modifier la grille d 'un sous - Objet

Lors de l 'acquisition d' un sous - objet, il faut également tenir compte du fait que le modèle et le matériau ne sont pas remplis et qu 'il n' est pas possible d 'obtenir le Sous - objet et qu' il est donc nécessaire de précharger les ressources ou d 'effectuer une surveillance d' événements lorsque le chargement est asynchrone.Je l'ai déjà utilisé dans ce Demo.`Laya.loader.create`Pour précharger des ressources.

Dans les jeux, on crée souvent des systèmes de changement de rôle, parfois des modèles, parfois des autocollants, parfois les deux.Comme la partie maquette du matériau n 'est expliquée que dans le chapitre suivant, nous n' avons présenté dans ce chapitre que la méthode de remplacement de la grille du modèle.

Dans les modèles meshsprite3d ou skinnedmeshsprite3d**Meshfilter**Attribut, c 'est un exemple de type filtre de grille**Sharedmesh**Est la grille du modèle qui peut être réinitialisée et détruite.

Dans l 'exemple suivant, nous ajoutons un événement de clic au bouton.Chaque fois que vous cliquez sur la valeur Index, ajoutez - la et modifiez la grille de modèle obtenue à partir de la scène LS en fonction de la valeur index.


```typescript

//新建四个mesh
var box:Mesh = PrimitiveMesh.createBox(0.5, 0.5, 0.5);
var capsule:Mesh = PrimitiveMesh.createCapsule(0.25, 1, 10, 20);
var cylinder:Mesh = PrimitiveMesh.createCylinder(0.25, 1, 20);
var cone:Mesh = PrimitiveMesh.createCone(0.25, 0.75);
var index:int = 0;

//.............按钮点击事件 监听
changeMeshButton.on(Event.CLICK, this, function():void{
    index++;
    if (index % 5 === 1 ){
        //切换mesh
        sphere.meshFilter.sharedMesh = box;
    }
    else if (index % 5 === 2){
        //切换mesh
        sphere.meshFilter.sharedMesh = capsule;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cylinder;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cone;
    }
    else{
        //切换mesh
        sphere.meshFilter.sharedMesh = sphereMesh;
    }
});
```


Les résultats sont les suivants:

[] (IMG / 1.gif) <br > (Figure 1)