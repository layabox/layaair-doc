## LayaAir3D之材质概述

###Description des matériaux

Les matériaux sont la qualité des matériaux des objets, tels que le bois, les métaux, le verre, les cheveux, l 'eau, etc., et leurs propriétés matérielles, telles que la rugosité, la brillance, la réflexion, la transparence, la couleur, la texture, etc.

Dans la plupart des moteurs 3D, il existe une catégorie distincte de matériaux pour le contrôle des codes de programme, le traitement des matériaux dans les logiciels de fabrication 3D est également l 'un des éléments les plus importants.

Il existe également de nombreuses sortes de matériaux, dans le logiciel de production en trois dimensions, il existe des matériaux standard, multi - dimensionnels, composites, double face Materials, matériaux de suivi de la lumière, et ainsi de suite.À l'heure actuelle, le moteur layaair 3D appuie principalement le matériau standard pbrstandard material.



###Création de matériaux standard

Si le modèle dans le Code n 'a pas de matériau d' appoint, il n 'est pas possible d' afficher la texture, la texture, etc., du modèle dans la vue 3D, mais seulement par défaut en blanc pur.

Dans le Code du cours « démarrer rapidement le voyage en 3D », nous avons créé un matériau standard et ajouté une image texturée à l 'affiche diffuse réfléchissante et donné des modèles.


```java

//创建材质
var material:PBRStandardMaterial = new PBRStandardMaterial();
//加载漫反射贴图
Texture2D.load("../../../../res/threeDimen/texture/earth.png", Handler.create(null, function(texture:Texture2D):void {
	//设置漫反射二维纹理贴图
	material.albedoTexture = texture;
	//为box模型赋材质
	box.meshRenderer.material = material;
}));
```


Bien entendu, il s' agit d 'une simple utilisation, nous n' utilisons pour l 'instant que les images les plus importantes, pour obtenir de meilleurs résultats artistiques, les développeurs doivent également connaître la couleur et les propriétés du matériau.



###Chargement de matériaux

Dans la section "modèle layaair3d", nous avons présenté le modèle qui comprend les éléments de la grille et du matériau et qui chargent les données.

Dans la dernière version du moteur, la grille du modèle est séparée du matériau, et l 'outil d' exportation Unity ne relie plus le matériau au fichier de modèle.lm exporté.Par conséquent, si les ressources de format.lm sont chargées, il est nécessaire de les réaménager pour qu 'elles soient pleinement affichées, faute de quoi elles ne sont affichées qu' en mode blanc.

Le fichier de matériau.lmat produit après l 'exportation peut alors être utilisé pour charger le matériau standard et l' attribuer au modèle de la même manière que celui - ci.


```java

//异步加载材质文件创建标准材质（也可以预加载）
box .meshRenderer.material = BlinnPhongMaterial.load("truck/Assets/Materials/t0200.lmat");
```




###Acquisition de matériaux à partir de modèles chargés

Dans l'exemple ci - dessus, nous avons créé des matériaux standard, mais dans le cadre d'un projet pratique, nous avons rarement utilisé des codes pour doter les modèles de matériaux, et nous avons créé des matériaux directement dans le logiciel 3D ou dans l'Unity, puis exporté le format layaair à l'aide d'outils.

Le moteur d 'utilisation sera automatiquement chargé de matériaux sur le modèle, et dans de nombreux cas un modèle aura plusieurs matériaux standard, de manière automatique nous a permis d' économiser beaucoup de temps de développement.Mais dans ces conditions, si nous devons changer et changer de matière?Nous devons d'abord obtenir le matériel actuel sur le modèle.

Les moteurs layaair 3D nous ont fourni des présentateurs de grille meshrender et skinnedmeshrender, qui donnent des exemples sur des modèles visuels, grâce auxquels nous pouvons obtenir des matériaux sur des modèles.

Tips: meshsprite3d pour meshrender et skinnedmeshsprite3d pour skinnedmeshrender.

Le matériau obtenu se divise en deux catégories: le Material qui, s' il est modifié, ne peut être modifié que par son propre modèle; et le matériau partagé sharedmaterial, qui est relativement indépendant, permet d 'utiliser plusieurs modèles avec le même matériau.Les parties qualitatives changent aussi.Les développeurs doivent donc choisir en fonction des circonstances.



####Acquisition et modification de son propre matériau


```java

......
//加载导出的卡车模型
Sprite3D.load("LayaScene_truck/truck.lh",Handler.create(this,function(sprite:Sprite3D):void{
    var truck:Sprite3D = scene.addChild(sprite)as Sprite3D;
    //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
    var meshSprite3D:MeshSprite3D = truck.getChildAt(1).getChildAt(0) as MeshSprite3D;
    //从模型上获取自身材质
	var material:BlinnPhongMaterial = meshSprite3D.meshRenderer.material as BlinnPhongMaterial;
    //修改材质的反射颜色，让模型偏红
	material.albedoColor = new Vector4(1,0,0,1); 
}));
```


Après l 'opération de compilation ci - après, bien que la carrosserie et le modèle de tête aient utilisé le même matériau, seuls les matériaux propres de la carrosserie ont été modifiés en rouge, sans préjudice de la tête (fig. 1).

![图片1](img/1.png)< br > (Figure 1)



####Acquisition et modification de matériaux partagés


```java

......
//加载导出的卡车模型
Sprite3D.load("LayaScene_truck/truck.lh",Handler.create(this,function(sprite:Sprite3D):void{
    var truck:Sprite3D = scene.addChild(sprite)as Sprite3D;
    //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
    var meshSprite3D:MeshSprite3D = truck.getChildAt(1).getChildAt(0) as MeshSprite3D;
    //从模型上获取自身材质
	var material:BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as BlinnPhongMaterial;
    //修改材质的反射颜色，让模型偏红
	material.albedoColor = new Vector4(1,0,0,1); 
}));
```

L 'effet de compilation est le suivant: le matériau partagé a été modifié parce que la tête et le modèle de carrosserie ont été utilisés et que leur matériau a été modifié (fig. 2).

![图片2](img/2.png)< br > (Figure 2)



####Acquisition et modification de la liste de matériaux

Dans le logiciel 3D, il y a souvent un modèle avec plusieurs matériaux que nous appelons matériaux multidimensionnels.Cependant, après le chargement des données d 'exportation de l' outil, le moteur crée automatiquement des matrices Materials ou sharedmaterials de liste de matériaux de modélisation, ce qui permet de modifier le matériau de manière cyclique ou récursive.

Le code ci - après permet d 'obtenir et de modifier un matériau pour un modèle ou un sous - objet d' un conteneur modèle, et nous modifions directement tous les sous - objets de scène.


```java

......
//加载场景
Scene3D.load("LayaScene_loveScene/loveScene.ls",Handler.create(this,function(s:*):void{
	var scene:Scene3D = Laya.stage.addChild(s)as Scene3D;
    setModelMaterial(scene)
}))
/**
*修改模型材质
* @param model 场景或模型
 */		
private function setModelMaterial(model:*):void
{
  //如果是模型网格显示对象
  if (model is MeshSprite3D) 
  {
    //获取模型网格对象
    var meshSprite3D:MeshSprite3D = model as MeshSprite3D;
   for(var i :int = 0; i < meshSprite3D.meshRenderer.materials.length;i++)
	{
	//根据下标获取模型共享材质组中的共享材质
	var material:BlinnPhongMaterial = materials.meshRenderer.sharedMaterials[i] as                 BlinnPhongMaterial;
	material.albedoColor = new Vector4(0,0,1,1)
	}
  }
  //如果是蒙皮模型网格显示对象
  if (model is SkinnedMeshSprite3D) 
  {
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D:SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
for(var i :int = 0; i < skinnedMeshSprite3D.skinnedMeshRenderer.materials.length;i++)
	{
	//根据下标获取模型共享材质组中的共享材质
	var material:BlinnPhongMaterial = materials.meshRenderer.sharedMaterials[i] as BlinnPhongMaterial;
	material.albedoColor = new Vector4(0,0,1,1)
	}
  }
  //递归方法获取子对象
for (var i:int = 0; i < model._children.length; i++)
  {
    setModelMaterial(model._children[i]);
  }
```


L 'effet après compilation est le suivant (fig. 3) et tous les matériaux de maquette de la scène sont bleus.

![图片3](img/3.png)< br > (Figure 3)