#Description générale du matériel de layaair3d

###Description des matériaux

Le matériau est la qualité du matériau de l 'objet.Par exemple, le bois, les métaux, le verre, les cheveux, l 'eau, etc., ont des propriétés différentes: rugosité, brillance, réflexion, transparence, couleur, texture, etc.

Dans la plupart des moteurs 3D, il existe des catégories distinctes de matériaux pour le contrôle des codes de programme, et le traitement des matériaux dans les logiciels de fabrication 3D est l'un des éléments les plus importants.Les concepteurs de jeux d 'art ont souvent une phrase selon laquelle, dans la création d' une scène de jeux en 3D, les modèles sont trois fois vus et les sept points sont faits de matériaux.

Il existe également de nombreuses sortes de matériaux, dans le logiciel de production en trois dimensions, il existe des matériaux standard, multi - dimensionnels, composites, double face Materials, matériaux de suivi de la lumière, et ainsi de suite.À l'heure actuelle, le moteur layaair3d appuie principalement le matériel standard pbrstandard matrial.



###Création de matériaux standard

Si le modèle dans le Code n 'a pas de matériau d' appoint, il n 'est pas possible d' afficher la texture, la texture, etc., du modèle dans la vue 3D, mais seulement par défaut en blanc pur.

Dans le Code du cours « démarrer rapidement le voyage en 3D », nous avons créé un matériau standard et ajouté une image texturée à l 'affiche diffuse réfléchissante et donné des modèles.


```typescript

//创建材质
var material:Laya.PBRStandardMaterial = new Laya.PBRStandardMaterial();
//加载漫反射贴图
Laya.Texture2D.load("../../../../res/threeDimen/texture/earth.png", Laya.Handler.create(null, function(texture:Laya.Texture2D):void {
				//设置漫反射二维纹理贴图
				material.albedoTexture = texture;
				//为box模型赋材质
				box.meshRenderer.material = material;
			}));
```


Bien entendu, il s' agit d 'une simple utilisation, nous n' utilisons pour l 'instant que les images les plus importantes, pour obtenir de meilleurs résultats artistiques, les développeurs doivent également connaître la couleur et les propriétés du matériau.



###Chargement de matériaux

Dans le document layaair3d, nous avons présenté un modèle qui comprend deux parties de grille et de matériau et qui chargera automatiquement le matériau correspondant au modèle.

Dans la dernière version du moteur, la grille du modèle est séparée du matériau, et l 'outil d' exportation Unity ne relie plus le matériau au fichier de modèle.lm exporté.Par conséquent, si les ressources de format.lm sont chargées, il est nécessaire de les réaménager pour qu 'elles soient pleinement affichées, faute de quoi elles ne sont affichées qu' en mode blanc.

Le fichier de matériau.lmat produit après l 'exportation peut alors être utilisé pour charger le matériau standard et l' attribuer au modèle de la même manière que celui - ci.


```typescript

//异步加载材质文件创建标准材质（也可以预加载）
Laya.BlinnPhongMaterial.load("truck/Assets/Materials/t0200.lmat",Laya.Handler.create(this,function(mat):void{
  	box.meshRenderer.material = mat;
}));
```




###Acquisition de matériaux à partir de modèles chargés

Dans l'exemple ci - dessus, nous avons créé des matériaux standard, mais dans le cadre d'un projet pratique, nous avons rarement utilisé des codes pour doter les modèles de matériaux, et nous avons créé des matériaux directement dans le logiciel 3D ou dans l'Unity, puis exporté le format layaair à l'aide d'outils.

Le moteur d 'utilisation sera automatiquement chargé de matériaux sur le modèle, et dans de nombreux cas un modèle aura plusieurs matériaux standard, de manière automatique nous a permis d' économiser beaucoup de temps de développement.Mais dans ces conditions, et si nous devons changer et changer de matériaux?Nous devons d'abord obtenir le matériel actuel sur le modèle.

Les moteurs layaair3d nous ont fourni des présentateurs de grille meshrender et skinnedmeshrender, qui donnent des exemples sur des modèles visuels, grâce auxquels nous pouvons obtenir des matériaux sur des modèles.

Tips: meshsprite3d pour meshrender et skinnedmeshsprite3d pour skinnedmeshrender.

Les matériaux obtenus sont de deux sortes: le Material qui, s' il est modifié, ne peut être modifié que par son propre modèle; et le matériau sharedmaterial, qui est relativement indépendant, permet d 'utiliser plusieurs modèles avec le même matériau.Les parties qualitatives changent aussi.Les développeurs doivent donc choisir en fonction des circonstances.



###Acquisition et modification de son propre matériau


```typescript

......
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck/truck.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
    var truck:Laya.Sprite3D = scene.addChild(sp)as Laya.Sprite3D;
    //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
    var meshSprite3D:Laya.MeshSprite3D = truck.getChildAt(1).getChildAt(0) as Laya.MeshSprite3D;
    //从模型上获取自身材质
	var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.material as Laya.BlinnPhongMaterial;
    //修改材质的反射颜色，让模型偏红
	material.albedoColor = new Laya.Vector4(1,0,0,1); 
}));
```


Après l 'opération de compilation ci - après, bien que la carrosserie et le modèle de tête aient utilisé le même matériau, seuls les matériaux propres de la carrosserie ont été modifiés en rouge, sans préjudice de la tête (fig. 1)

![1](img/1.png)(Figure 1) < / BR >



###Acquisition et modification de matériaux partagés


```typescript

......
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck/truck.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
    var truck:Laya.Sprite3D = scene.addChild(sp)as Laya.Sprite3D;
    //获取车身模型（查看.lh文件，模型	中两个对象，车头“head”与车身"body",它们都用同一个材质）
    var meshSprite3D:Laya.MeshSprite3D = truck.getChildAt(1).getChildAt(0) as Laya.MeshSprite3D;
    //从模型上获取自身材质
	var material:Laya.BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
    //修改材质的反射颜色，让模型偏红
	material.albedoColor = new Laya.Vector4(1,0,0,1); 
}));
```


Les effets de compilation sont les suivants: les matériaux partagés ont été modifiés car les modèles de carrosserie et de carrosserie ont été utilisés et leur contenu a été modifié (fig. 2).

![2](img/2.png)(图2)</br>







###Acquisition et modification de la liste de matériaux

Dans le logiciel 3D, il y a souvent un modèle avec plusieurs matériaux que nous appelons matériaux multidimensionnels.Cependant, après le chargement des données d 'exportation de l' outil, le moteur crée automatiquement des matrices Materials ou sharedmaterials de liste de matériaux de modélisation, ce qui permet de modifier le matériau de manière cyclique ou récursive.

Le code ci - après permet d 'obtenir et de modifier un matériau pour un modèle ou un sous - objet d' un conteneur modèle, et nous modifions directement tous les sous - objets de scène.


```typescript

......
......
//加载场景
Laya.Scene3D.load("LayaScene_loveScene/loveScene.ls",Laya.Handler.create(this,function(s:*):void{
	var scene:Laya.Scene3D = Laya.stage.addChild(s)as Laya.Scene3D;
    this.setModelMaterial(scene);
}))
....
/**
*修改模型材质
* @param model 场景或模型
 */		
private setModelMaterial(model):void
{
  //如果是模型网格显示对象
  if (model instanceof Laya.MeshSprite3D) 
  {
    //获取模型网格对象
    var meshSprite3D:Laya.MeshSprite3D = model as Laya.MeshSprite3D;
    for(var i :number = 0; i < meshSprite3D.meshRenderer.sharedMaterials.length;i++)
	{
		//根据下标获取模型共享材质组中的共享材质
		var material:Laya.BlinnPhongMaterial = materials.skinnedMeshRenderer.sharedMaterials[i] as             Laya.BlinnPhongMaterial;
		material.albedoColor = new Laya.Vector4(0,0,1,1)
	}
  }
  //如果是蒙皮模型网格显示对象
  if (model instanceof Laya.SkinnedMeshSprite3D) 
  {
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D:Laya.SkinnedMeshSprite3D = model as Laya.SkinnedMeshSprite3D;
	for(var i :number = 0; i < skinnedMeshSprite3D.skinnedMeshRenderer.materials.length;i++)
    {
      //根据下标获取模型共享材质组中的共享材质
      var material:Laya.BlinnPhongMaterial = materials.meshRenderer.sharedMaterials[i] as Laya.BlinnPhongMaterial;
      material.albedoColor = new Laya.Vector4(0,0,1,1)
    }
  }
  //递归方法获取子对象
	for (var i:number = 0; i < model._children.length; i++)
 	{
    	this.setModelMaterial(model._children[i]);
    }
}
```


L 'effet après compilation est le suivant (fig. 3) et tous les matériaux de maquette de la scène sont bleus.

![3](img/3.png)(图3)</br>