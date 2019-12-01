##Description générale du matériel de layaair3d

###Description des matériaux

Les matériaux sont la qualité des matériaux des objets, tels que le bois, les métaux, le verre, les cheveux, l 'eau, etc., et leurs propriétés matérielles, telles que la rugosité, la brillance, la réflexion, la transparence, la couleur, la texture, etc.

Dans la plupart des moteurs 3D, il existe une catégorie distincte de matériaux pour le contrôle des codes de programme, le traitement des matériaux dans les logiciels de fabrication 3D est également l 'un des éléments les plus importants.

Il existe également de nombreuses sortes de matériaux, dans le logiciel de production en trois dimensions, il existe des matériaux standard, multi - dimensionnels, composites, double face Materials, matériaux de suivi de la lumière, et ainsi de suite.À l'heure actuelle, le moteur layaair 3D appuie principalement le Standard Material standard matrial.



###Création de matériaux standard

Si le modèle dans le Code n 'a pas de matériau d' appoint, il n 'est pas possible d' afficher la texture, la texture, etc., du modèle dans la vue 3D, mais seulement par défaut en blanc pur.

Dans le Code du cours « démarrer rapidement le voyage en 3D », nous avons créé un matériau standard et ajouté une image texturée à l 'affiche diffuse réfléchissante et donné des modèles.


```java

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


Bien entendu, il s' agit d 'une simple utilisation, nous n' utilisons pour l 'instant que les images les plus importantes, pour obtenir de meilleurs résultats artistiques, les développeurs doivent également connaître la couleur et les propriétés du matériau.



###Chargement de matériaux

Dans la section "modèle layaair3d", nous avons présenté le modèle qui comprend les éléments de la grille et du matériau et qui chargent les données.

Dans la dernière version du moteur, la grille du modèle est séparée du matériau, et l 'outil d' exportation Unity ne relie plus le matériau au fichier de modèle.lm exporté.Par conséquent, si les ressources de format.lm sont chargées, il est nécessaire de les réaménager pour qu 'elles soient pleinement affichées, faute de quoi elles ne sont affichées qu' en mode blanc.

Le fichier de matériau.lmat produit après l 'exportation peut alors être utilisé pour charger le matériau standard et l' attribuer au modèle de la même manière que celui - ci.


```java

//异步加载材质文件创建标准材质（也可以预加载）
var material:StandardMaterial = StandardMaterial.load("truck/Assets/Materials/t0200.lmat");
//为box模型赋材质
box.meshRender.material = material;
```




###Acquisition de matériaux à partir de modèles chargés

Dans l'exemple ci - dessus, nous avons créé des matériaux standard, mais dans le cadre d'un projet pratique, nous avons rarement utilisé des codes pour doter les modèles de matériaux, et nous avons créé des matériaux directement dans le logiciel 3D ou dans l'Unity, puis exporté le format layaair à l'aide d'outils.

Le moteur d 'utilisation sera automatiquement chargé de matériaux sur le modèle, et dans de nombreux cas un modèle aura plusieurs matériaux standard, de manière automatique nous a permis d' économiser beaucoup de temps de développement.Mais dans ces conditions, si nous devons changer et changer de matière?Nous devons d'abord obtenir le matériel actuel sur le modèle.

Les moteurs layaair 3D nous ont fourni des présentateurs de grille meshrender et skinnedmeshrender, des illustrations sur des modèles visuels par lesquels nous pouvons obtenir des matériaux sur des modèles.

Tips: meshsprite3d pour meshrender et skinnedmeshsprite3d pour skinnedmeshrender.

Le matériau obtenu se divise en deux catégories: le Material qui, s' il est modifié, ne peut être modifié que par son propre modèle; et le matériau partagé sharedmaterial, qui est relativement indépendant, permet d 'utiliser plusieurs modèles avec le même matériau.Les parties qualitatives changent aussi.Les développeurs doivent donc choisir en fonction des circonstances.



####Acquisition et modification de son propre matériau


```java

......
//加载导出的卡车模型
var role3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete,[role3D]);
scene.addChild(role3D);
/** 模型与材质加载完成后回调***/		
private function onLoadComplete(role3D:Sprite3D):void
{
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取自身材质
  var material:StandardMaterial=meshSprite3D.meshRender.material;
  //修改材质的反射颜色，让模型偏红
  material.albedo=new Vector4(1,0,0,1);	
}
```


Après l 'opération de compilation ci - après, bien que la carrosserie et le modèle de tête aient utilisé le même matériau, seuls les matériaux propres de la carrosserie ont été modifiés en rouge, sans préjudice de la tête (fig. 1).

![图片1](img/1.png)< br > (Figure 1)



####Acquisition et modification de matériaux partagés


```java

......
//加载导出的卡车模型
role3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(role3D);

/** 模型与材质加载完成后回调***/		
private function onLoadComplete():void
{
  //获取模型（查看.lh文件，模型中两个对象，车头“head”与车身"body",它们都用同一个材质）
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取共享材质
  var sharedMaterial:StandardMaterial=meshSprite3D.meshRender.sharedMaterial;
  //修改材质的反射颜色，让模型偏红
  sharedMaterial.albedo=new Vector4(1,0,0,1);	
}
```

L 'effet de compilation est le suivant: le matériau partagé a été modifié parce que la tête et le modèle de carrosserie ont été utilisés et que leur matériau a été modifié (fig. 2).

![图片2](img/2.png)< br > (Figure 2)



####Acquisition et modification de la liste de matériaux

Dans le logiciel 3D, il y a souvent un modèle avec plusieurs matériaux que nous appelons matériaux multidimensionnels.Cependant, après le chargement des données d 'exportation de l' outil, le moteur crée automatiquement des matrices Materials ou sharedmaterials de liste de matériaux de modélisation, ce qui permet de modifier le matériau de manière cyclique ou récursive.

Le code ci - après permet d 'obtenir et de modifier un matériau pour un modèle ou un sous - objet d' un conteneur modèle, et nous modifions directement tous les sous - objets de scène.


```java

......
//加载场景
scene = Scene.load("LayaScene_loveScene/loveScene.ls");
//场景模型与材质加载完成监听与回调
scene.on(Event.HIERARCHY_LOADED,this,function():void
{
    setModelMaterial(scene)
});
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
    //获取材质列表数组
    var materials:Array=meshSprite3D.meshRender.materials;
    //对模型网格中的所有材质进行修改
    for (var m:int = 0; m < materials.length; m++)
    {
      //获取共享材质
      var mat:StandardMaterial = materials[m] as StandardMaterial;
      //修改材质反射颜色
      mat.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //如果是蒙皮模型网格显示对象
  if (model is SkinnedMeshSprite3D) 
  {
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D:SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
    //获取材质列表数组
    var materials1:Array=skinnedMeshSprite3D.skinnedMeshRender.materials;
    //对蒙皮模型网格中的所有材质进行修改
    for (var n:int = 0; n < materials1.length; n++)
    {
      //获取共享材质
      var mat1:StandardMaterial = materials1[n] as StandardMaterial;
      //修改材质反射颜色
      mat1.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //递归方法获取子对象
for (var i:int = 0; i < model._childs.length; i++)
  {
    setModelMaterial(model._childs[i]);
  }
```


L 'effet après compilation est le suivant (fig. 3) et tous les matériaux de maquette de la scène sont bleus.

![图片3](img/3.png)< br > (Figure 3)