#Description générale du matériel de layaair3d

###Description des matériaux

Le matériau est la qualité du matériau de l 'objet.Par exemple, le bois, les métaux, le verre, les cheveux, l 'eau, etc., ont des propriétés différentes: rugosité, brillance, réflexion, transparence, couleur, texture, etc.

Dans la plupart des moteurs 3D, il existe des catégories distinctes de matériaux pour le contrôle des codes de programme, et le traitement des matériaux dans les logiciels de fabrication 3D est l'un des éléments les plus importants.Les concepteurs de jeux d 'art ont souvent une phrase selon laquelle, dans la création d' une scène de jeux en 3D, les modèles sont trois fois vus et les sept points sont faits de matériaux.

Il existe également de nombreuses sortes de matériaux, dans le logiciel de production en trois dimensions, il existe des matériaux standard, multi - dimensionnels, composites, double face Materials, matériaux de suivi de la lumière, et ainsi de suite.À l'heure actuelle, le moteur layaair3d appuie principalement le Standard Material standard matrial.



###Création de matériaux standard

Si le modèle dans le Code n 'a pas de matériau d' appoint, il n 'est pas possible d' afficher la texture, la texture, etc., du modèle dans la vue 3D, mais seulement par défaut en blanc pur.

Dans le Code du cours « démarrer rapidement le voyage en 3D », nous avons créé un matériau standard et ajouté une image texturée à l 'affiche diffuse réfléchissante et donné des modèles.


```typescript

//创建标准材质
var material:Laya.StandardMaterial = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


Bien entendu, il s' agit d 'une simple utilisation, nous n' utilisons pour l 'instant que les images les plus importantes, pour obtenir de meilleurs résultats artistiques, les développeurs doivent également connaître la couleur et les propriétés du matériau.



###Chargement de matériaux

Dans le document layaair3d, nous avons présenté un modèle qui comprend deux parties de grille et de matériau et qui chargera automatiquement le matériau correspondant au modèle.

Dans la dernière version du moteur, la grille du modèle est séparée du matériau, et l 'outil d' exportation Unity ne relie plus le matériau au fichier de modèle.lm exporté.Par conséquent, si les ressources de format.lm sont chargées, il est nécessaire de les réaménager pour qu 'elles soient pleinement affichées, faute de quoi elles ne sont affichées qu' en mode blanc.

Le fichier de matériau.lmat produit après l 'exportation peut alors être utilisé pour charger le matériau standard et l' attribuer au modèle de la même manière que celui - ci.


```typescript

//异步加载材质文件创建标准材质（也可以预加载）
var material:Laya.StandardMaterial = Laya.StandardMaterial.load("truck/Assets/Materials/t0200.lmat");
//为box模型赋材质
box.meshRender.material = material;
```




###Acquisition de matériaux à partir de modèles chargés

Dans l'exemple ci - dessus, nous avons créé des matériaux standard, mais dans le cadre d'un projet pratique, nous avons rarement utilisé des codes pour doter les modèles de matériaux, et nous avons créé des matériaux directement dans le logiciel 3D ou dans l'Unity, puis exporté le format layaair à l'aide d'outils.

Le moteur d 'utilisation sera automatiquement chargé de matériaux sur le modèle, et dans de nombreux cas un modèle aura plusieurs matériaux standard, de manière automatique nous a permis d' économiser beaucoup de temps de développement.Mais dans ces conditions, et si nous devons changer et changer de matériaux?Nous devons d'abord obtenir le matériel actuel sur le modèle.

Les moteurs layaair3d nous ont fourni des présentateurs de grille meshrender et skinnedmeshrender, des illustrations sur des modèles visuels par lesquels nous pouvons obtenir des matériaux sur des modèles.

Tips: meshsprite3d pour meshrender et skinnedmeshsprite3d pour skinnedmeshrender.

Les matériaux obtenus sont de deux sortes: le Material qui, s' il est modifié, ne peut être modifié que par son propre modèle; et le matériau sharedmaterial, qui est relativement indépendant, permet d 'utiliser plusieurs modèles avec le même matériau.Les parties qualitatives changent aussi.Les développeurs doivent donc choisir en fonction des circonstances.



###Acquisition et modification de son propre matériau


```typescript

......
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
private onLoadComplete():void{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，它们都用同一个材质）
  var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //从模型上获取自身材质
  var material:Laya.StandardMaterial = meshSprite3D.meshRender.material as Laya.StandardMaterial;
  //修改材质的反射颜色，让模型偏红
  material.albedo = new Laya.Vector4(1,0,1,1);
}
```


Après l 'opération de compilation ci - après, bien que la carrosserie et le modèle de tête aient utilisé le même matériau, seuls les matériaux propres de la carrosserie ont été modifiés en rouge, sans préjudice de la tête (fig. 1)

![1](img/1.png)(Figure 1) < / BR >



###Acquisition et modification de matériaux partagés


```typescript

//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
private onLoadComplete():void{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，它们都用同一个材质）
  var meshSprite3D:Laya.MeshSprite3D = this.role3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //从模型上获取共享材质
  var shareMaterial:Laya.StandardMaterial = meshSprite3D.meshRender.shareMaterial as Laya.StandardMaterial;
  //修改材质的反射颜色，让模型偏红
  shareMaterial.albedo = new Laya.Vector4(1,0,0,1);
}
```


Les effets de compilation sont les suivants: les matériaux partagés ont été modifiés car les modèles de carrosserie et de carrosserie ont été utilisés et leur contenu a été modifié (fig. 2).

![2](img/2.png)(图2)</br>







###Acquisition et modification de la liste de matériaux

Dans le logiciel 3D, il y a souvent un modèle avec plusieurs matériaux que nous appelons matériaux multidimensionnels.Cependant, après le chargement des données d 'exportation de l' outil, le moteur crée automatiquement des matrices Materials ou sharedmaterials de liste de matériaux de modélisation, ce qui permet de modifier le matériau de manière cyclique ou récursive.

Le code ci - après permet d 'obtenir et de modifier un matériau pour un modèle ou un sous - objet d' un conteneur modèle, et nous modifions directement tous les sous - objets de scène.


```typescript

......
//加载场景
this.scene = Laya.Scene.load("LayaScene_loveScene/loveScene.ls");
Laya.stage.addChild(this.scene);
//场景模型与材质加载完成监听与回调
this.scene.on(Laya.Event.HIERARCHY_LOADED,this,function():void{
	this.setModelMaterial(this.scene);
});
//修改模型材质(场景或模型)
private setModelMaterial(model:any):void{
  //如果是模型网格显示对象
  if(model instanceof Laya.MeshSprite3D){
  //获取模型网格对象
  var meshSprite3D:Laya.MeshSprite3D = model as Laya.MeshSprite3D;
  //获取材质列表数组
  var materials:Array<any> = meshSprite3D.meshRender.materials;
  //对模型网格中的所有材质进行修改
  for(var m:number = 0;m < materials.length;m++){
  //获取共享材质
  var mat:Laya.StandardMaterial = materials[m] as Laya.StandardMaterial;
  //修改材质反射颜色
  mat.albedo = new Laya.Vector4(0.5,0.5,1,1);
  }
  }
  //如果是蒙皮模型网格显示对象
  if(model instanceof Laya.SkinnedMeshSprite3D){
  //获取蒙皮模型网格显示对象
  var skinnedMeshSprite3D:Laya.SkinnedMeshSprite3D = model as Laya.SkinnedMeshSprite3D;
  //获取材质列表数组
  var materials1:Array<any> = skinnedMeshSprite3D.skinnedMeshRender.materials;
  //对蒙皮模型网格中的所有材质进行修改
  for(var n:number = 0;n < materials1.length;n++){
  //获取共享材质
  var mat1:Laya.StandardMaterial = materials1[n] as Laya.StandardMaterial;
  //修改材质反射颜色
  mat1.albedo = new Laya.Vector4(0.5,0.5,1,1);
  }
  }
  //递归方法获取子对象
  for(var i:number = 0;i < model._childs.length;i++){
  	this.setModelMaterial(model._childs[i]);
  }
}
```


L 'effet après compilation est le suivant (fig. 3) et tous les matériaux de maquette de la scène sont bleus.

![3](img/3.png)(Figure 3) < / BR >