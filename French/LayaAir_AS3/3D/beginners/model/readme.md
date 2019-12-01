##Modèle layaair3d

###Description du modèle

Le modèle 3D est un objet stéréoscopique 3D formé selon la modélisation structurelle de l'objet par un logiciel 3D.À l'heure actuelle, le moteur layaair 3D comprend deux types d'affichage de modèles, l'un étant un modèle ordinaire.**Meshsprite3d**Modèle d 'animation**Skinnedmeshsprite3d**".

La différence est que le modèle d 'animation de la peau est un modèle d' animation de la peau et du squelette qui est souvent utilisé dans les personnages animés.Les modèles ordinaires sont des modèles de paysages sans animation, etc.

Ils comprennent des grilles de modèles et des matériaux.

**Grille de modèle (Mesh):**

Les grilles de modèle sont des données tridimensionnelles composées de points, de lignes et de surfaces, et le moteur layaair comporte une catégorie de données de grille Mesh spécifique, qui peut être affichée dans la scène après avoir été assignée à l 'objet d' affichage du modèle 3D, meshsprite3d ou skinnedmeshsprite3d.

À l'heure actuelle, les logiciels 3D sont plus nombreux, les plus courants étant les logiciels 3ds Max et maya.Les modèles 3D présentent également un plus grand nombre de formats de données, tels que Fbx, 3ds, obj, etc.

Le moteur layaair fournit des outils d 'exportation de modèle fbxtools et des Inserts d' exportation unity3d pour générer le format de données 3D requis pour layaair.L 'outil fbxtools ne sera pas mis à jour ultérieurement.

**Matériaux (Material):**

Il est indiqué dans le présent chapitre que nous le présenterons dans une section distincte.



###Créer un modèle de base pour un moteur

Nous avons utilisé le modèle boxmesh dans le cours de démarrage rapide du voyage 3D, qui présente d 'autres modèles de base spheremesh et cylindermesh fournis par le moteur layaair, que nous avons créés successivement et que nous avons déplacés par l' attribut Transform, comme suit:

Lors de la création, il est important de noter que le moteur a été chargé dans la scène avec un modèle à bande libre, l 'axe étant au Centre du modèle, nous sommes donc en déplacement, rotation et zoom par référence au point central du modèle.Lorsqu 'il est chargé dans la scène, le modèle est placé par défaut sur le point de coordonnées mondiales de la scène, comme le 2D.


```java

package {

	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.resource.models.CylinderMesh;
	import laya.d3.resource.models.SphereMesh;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D_Model
	{
		
		public function LayaAir3D_Model() 
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景-----------------------
			var scene:Scene = new Scene();
			Laya.stage.addChild(scene);
			
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)-----
			var camera:Camera = new Camera( 0, 0.1, 1000);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(0, 3, 10);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -17, 0, 0), true, false);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			
			//创建方向光 ------------------------
			var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//移动灯光位置
			light.transform.translate(new Vector3(0,2,5));
			//调整灯光方向
			light.direction = new Vector3(0.5, -1, 0);
			//设置灯光颜色
			light.color = new Vector3(0.3, 0.3, 0.3);
          
          	//设置灯光环境色
			scene.ambientColor = new Vector3(1, 1, 1); 
			
			
			//创建模型-------------------------------
			//创建盒子模型(参数为：长、宽、高，单位：米)
			var boxMesh:BoxMesh=new BoxMesh(2,2,2);
			//创建模型显示对象
			var box3D:MeshSprite3D=new MeshSprite3D(boxMesh);
			scene.addChild(box3D);
			
			//创建球体模型(参数为：半径、水平层数、垂直层数)
			var sphereMesh:SphereMesh=new SphereMesh(1,8,8);
			//创建模型显示对象
			var sphere3D:MeshSprite3D=new MeshSprite3D(sphereMesh);
			//x轴上移动-3米（世界座标 向左）
			sphere3D.transform.translate(new Vector3(-3,0,0),false);
			scene.addChild(sphere3D);
			
			//创建圆柱体模型(参数为：半径、高、圆截面线段数)
			var cylinderMesh:CylinderMesh=new CylinderMesh(1,2,8);
			//创建模型显示对象
			var cylinder3D:MeshSprite3D=new MeshSprite3D(cylinderMesh);
			//x轴上移动3米（世界座标 向右）
			cylinder3D.transform.translate(new Vector3(3,0,0),false);
			scene.addChild(cylinder3D);
			
			//创建材质----------------------------------
			var material:StandardMaterial = new StandardMaterial();
			//为模型赋材质（单个材质可赋给多个模型）
			box3D.meshRender.material = material;
			
		}		 
	}
}
```


Le code ci - dessus crée une caméra et une lumière et ajoute trois modèles géométriques de base qui utilisent le matériau par défaut le plus élémentaire.Affiche les résultats comme la figure 1.

![图片1](img/1.png)< br > (Figure 1)



###Création d 'un modèle de génération de logiciel 3D

Les trois modèles de base ci - dessus sont principalement utilisés pour les tests d'apprentissage par les concepteurs.La plupart des modèles du jeu sont réalisés en 3D, puis importés dans l 'éditeur Unity pour l' assemblage, puis transformés avec un outil d 'Export layaair, puis chargés par affichage en 3D ou modèle.

Dans ce contexte, nous voudrions une fois de plus préciser les catégories de ressources exportées et la manière dont les documents sont utilisés.

Le dossier exporté comprend plus de ressources (fig. 2), des fichiers d 'analyse tels que des scènes, des conteneurs de modèles 3D, des modèles 3D, des matériaux 3D, etc., ainsi que des fichiers de données tels que des autocollants optiques, des autocollants de matériaux, etc.

![图片2](img/2.png)< br > (Figure 2)

**Dossier lovescene**Est le dossier généré par la création d 'un autocollant lumineux dans unty, le même nom de scène que celui qui a été créé dans unty, et l' autocollant lumineux est présenté dans le chapitre scéne.

**Dossier Materials**Les ressources exportées sont des fichiers d 'analyse de données de matériau layaair correspondant contenant des modes de rendu du matériau, des itinéraires de ressource d' image, diverses propriétés optiques du matériau, etc.

**Dossier texture**Dans le moteur layaair, nous utilisons des images sous forme de JPG ou de PG, et utilisons des outils d 'Export pour convertir automatiquement les images sous d' autres formats en JPG ou PNG.



####* fichiers de données scene au format LS

Les fichiers de données scénographiques de type scene sont exportés, nous les avons expliqués dans les cours précédents, et nous n 'en avons pas beaucoup parlé ici.




####* fichier de données sprite3d au format LH

Les fichiers de données de type spirte3d du conteneur d 'objet 3D exporté, codés en format json, sont sélectionnés pour exporter le module d' exportation layaair dans unity3d.

* Le format "LH" est chargé de la même manière que la méthode de chargement de scène et est chargé par la méthode de chargement asynchrone sprite3d.load () ou par la méthode de préchargement laya.loader.create (), Code de référence:


```java

......
//添加3D场景
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//方法一：直接异步加载
//var sprite3D:Sprite3D = Sprite3D.load("res/room.lh");
//scene.addChild(sprite3D);

//方法二：预加载，.lh默认会创建为Sprite3D类型对象，并放入对象池中
Laya.loader.create("res/room.lh",Handler.create(this,onCreateComplete));
//预加载完成后回调
private function onCreateComplete():void
{ 
  //实例化加载并创建好的3D对象
  var sprite3D:Sprite3D=Laya.loader.getRes("res/room.lh");
  scene.addChild(sprite3D);
}
```




####* fichiers de données au format LM

Les fichiers de format * LM sont inclus dans le dossier de ressources exporté, que ce soit pour l 'exportation ou le type de fichier "scène" fichier "ou" fichier "sprite3d".

![图片3](img/3.png)< br > (Figure 3)

*. LM est un fichier de données de modèle qui génère des données de grille pour des objets d 'affichage de type meshsprite3d ou skinnedmeshsprite3d, et qui contient des informations telles que la position du Sommet, la ligne de droite, la couleur du Sommet, le point d' accès, le point d 'accès, etc.

Le Code de référence est le suivant:


```java

......
//添加3D场景
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//方法一：直接异步加载
//	var mesh:Mesh=Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
//	var meshSprite3D:MeshSprite3D = new MeshSprite(mesh);

//方法二：预加载，.lm默认创建为Mesh类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Handler.create(this,onCreateComplete));    
//预加载完成后回调
private function onCreateComplete():void
{ 
  //创建预加载的模型网格 
  var mesh:Mesh=Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
  //创建3D模型
  var meshSprite3D:MeshSprite3D=new MeshSprite3D(mesh);
  scene.addChild(meshSprite3D);
}
```


Les deux procédés décrits ci - dessus permettent d 'afficher le modèle sur l' image de jeu et le moteur d 'autocollage du matériau est automatiquement chargé sur le modèle.Dans le cadre du projet, nous pouvons utiliser les deux méthodes ci - dessus, selon le cas, et nous pouvons utiliser le format LS pour le chargement des objets actifs.



###Acquisition de modèles d 'objets secondaires et de grilles

Les modèles 3D sont parfois composés de plusieurs sous - objets, tels que les modèles de scène. LS, qui sont essentiellement des modèles d'objets et des matériaux, l'extérieur est un conteneur sprite3d et l'intérieur un véritable modèle meshsprite3d ou skinnedmeshsprite3d.Et il peut y avoir plusieurs niveaux d 'emboîtement.

####Acquisition d 'un modèle de sous - Objet

Lors de l 'élaboration de la logique de jeu, certains modèles doivent être modifiés, soit en commutant et en supprimant le modèle, soit en ajoutant un module au modèle, soit en obtenant un composant d' animation sur le modèle et un matériau modifiant le modèle.Il faut trouver un sous - objet dans le modèle de chargement.**Getchildat (), getchildbyname ()**Le procédé d 'acquisition d' un sous - objet est le même que celui d 'acquisition d' un sous - objet par un moteur 2D.

On va charger le fichier -Avant d 'obtenir des sous - objets, il est recommandé d' ouvrir la relation de parenté du modèle de visualisation du fichier.

Tips: lors de la modélisation 3ds Max, il est recommandé d 'appeler les sous - objets du modèle et d' établir des règles de désignation des ressources du projet sans utiliser de nom de modèle par défaut.

Dans l'exemple suivant, le camion exporté de l'Unity est transporté par camion truck.lh et, lorsqu'il est ouvert, il apparaît dans la structure json que l'extérieur est un conteneur sprite3d (correspondant à la scène de l'Unity) et à l'intérieur un conteneur sprtie3d (équivalent au camion dans la scène de l'Unity), dans lequel se trouvent deux sous - objets, le modèle meshsprite3d (tête et carrosserie).Nous avons donc besoin de deux fois pour obtenir le modèle meshsprite3d.

Lors de l 'acquisition d' un sous - objet, il faut également tenir compte du fait que le modèle et le matériau ne sont pas remplis et qu 'il n' est pas possible d 'obtenir le Sous - objet et qu' il est donc nécessaire de précharger les ressources ou d 'effectuer une surveillance d' événements lorsque le chargement est asynchrone.


```java

......
//加载导出的卡车模型
truck3D = Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
truck3D.on(Event.HIERARCHY_LOADED,this,onLoded);
scene.addChild(truck3D);

//模型与材质加载完成后回调
private function onLoded():void
{
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
  var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //输出模型的名字
  trace(meshSprite3D.name); //输出“body”
}
```


Pour compiler le Code précédent, on peut voir que le modèle affiche (fig. 4) et que la console s' ouvre sous le navigateur en cliquant sur F12.

![图片4](img/4.png)< br > (Figure 4)



####Acquisition de grille de modèle

Dans les jeux, on crée souvent des systèmes de changement de rôle, parfois des modèles, parfois des autocollants, parfois les deux.Comme la partie maquette du matériau n 'est expliquée que dans le chapitre suivant, nous n' avons présenté dans ce chapitre que la méthode de remplacement de la grille du modèle.

Dans les modèles meshsprite3d ou skinnedmeshsprite3d**Meshfilter**Attribut, c 'est un exemple de type filtre de grille**Sharedmesh**Est la grille du modèle qui peut être réinitialisée et détruite.

Voir l 'exemple suivant: deux secondes après le chargement du modèle de camion, nous avons créé une nouvelle grille de tête d' automobile pour remplacer la grille de carrosserie originale, avec les résultats suivants (fig. 4).


```java

......
//加载导出的卡车模型
truck3D=Sprite3D.load("LayaScene_truck/truck.lh");
scene.addChild(truck3D);
//模型与材质加载完成后回调
truck3D.on(Event.HIERARCHY_LOADED,this,onLoded);

//模型与材质加载完成后回调
private function onLoded():void
{
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body"）
  meshSprite3D=truck3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //输出模型的名字
  trace(meshSprite3D.name); //输出“body”
  //2秒后更换模型网格
  Laya.timer.once(2000,this,onTimerOnce);
}

//2秒后更换模型网格
private function onTimerOnce():void
{
  //创建模型网格并更换原始网格
  meshSprite3D.meshFilter.sharedMesh = Mesh.load("LayaScene_truck/Assets/truck-head.lm");
  //因使用了卡车头网格，位置会重合，因此进行位置移动
  meshSprite3D.transform.translate(new Vector3(0,0,-8));
}
```


![图片5](img/5.gif)< br > (Figure 5)