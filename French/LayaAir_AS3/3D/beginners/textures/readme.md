##Couleur et dessin de matériau layaair3d

###Couleur de matériau et propriétés d 'affichage

Les propriétés standard du matériau sont quelque peu similaires à celles de la lumière lumineuse, telles que les propriétés diffuse reflectance, haute lumière, ambiance, etc.On trouvera ci - après une description détaillée de ces caractéristiques.



####Reflectance

La réflectivité (albedo) reflète principalement la clarté et la couleur du matériau, plus les valeurs sont élevées, plus le matériau est clair.

La valeur de la réflectivité est un vecteur quadridimensionnel qui affiche les codes suivants et dont les quatre éléments représentent respectivement le rouge, le vert, le bleu et l 'Alpha transparent.

L 'effet Alpha transparent est en pourcentage, 0 pour la transparence totale et 1 pour l' opacité.

Modifier le Code du cours de démarrage rapide en 3D pour obtenir les résultats suivants:


```java

	//创建标准材质
	var material:StandardMaterial = new StandardMaterial();
	//创建漫反射二维纹理贴图
	material.diffuseTexture = Texture2D.load("res/layabox.png"); 	

	//只有设置了渲染模式为透明混合类型才能达到透明效果
	//设置材质蓝色染色及30%半透明
	material.albedo=new Vector4(1,1,2,0.3);
	//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
	material.renderMode=StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;;
	//为box模型赋材质
	box.meshRender.material = material;
```


![图片1](img/1.png)< br > reflectance coloration and transparent



####Diffuse reflectance Color and diffuse reflectance

La couleur réfléchissante diffuse (diffusecolor) est la seule couleur propre du matériau, que l 'industrie des beaux - arts peut appeler la couleur intrinsèque de l' objet.Par exemple, les matériaux en bois doivent être texturés en bois et les matériaux en brique doivent être texturés en briques.

The most used in the game is diffuse reflectance Map, the most Work in the Graphics of Game Art is diffuse reflectance Map, that can reflect the Basic Quality of the object.

Les couleurs diffuses réfléchissantes et les dessins peuvent également être utilisés dans les moteurs layaair 3D, avec un effet de fusion, une couleur diffuse réfléchissante colorant la surface d 'éclairage du modèle (la surface de rétroéclairage n' est pas modifiée), qui est semblable à la couleur de source de lumière réfléchissante diffuse de la lumière et produit une couleur plus globale (fig. 2).

Modifier le Code du cours de démarrage rapide 3D pour créer une couleur bleue diffuse réfléchissante qui est bleue par la lumière (voir fig. 2):


```java

	//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
	var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	directionLight.color = new Vector3(1, 1, 1);
	directionLight.direction = new Vector3(0.5, -1, 0);	
	scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

	//创建标准材质
	var material:StandardMaterial = new StandardMaterial();
	//创建漫反射颜色
	material.diffuseColor=new Vector3(.5,.5,2);
	//创建漫反射二维纹理贴图
	material.diffuseTexture = Texture2D.load("res/layabox.png");
	//为box模型赋材质
	box.meshRender.material = material;
```


![图片2](img/2.png)Mélange de couleurs réfléchissantes diffuses et d 'autocollants



####High Light and High Light

Les couleurs à haute lumière (speccular Color) sont, comme les lumières à haute lumière, des couleurs à haute lumière produites au coin de l 'objet modèle ou en direction de la source lumineuse.

La Haute couleur de la lumière sur le modèle est influencée par la couleur de la lumière en même temps que celle du matériau, et si la couleur de la lumière est noire sans la lumière ou la lumière, la lumière élevée sur le modèle n 'apparaît pas même si le matériau est muni d' un timbre haute couleur et haute lumière.

L 'autocollant (specular texture) est une image texturée en 2D dont la couleur de pixel représente la couleur et la luminosité élevées au niveau du modèle correspondant, plus la couleur de pixel brille, plus le modèle au niveau du pixel brille.

Bien entendu, l 'image haute couleur et l' image haute lumière peuvent être utilisées en même temps, l 'efficacité peut être améliorée, les développeurs peuvent tester à plusieurs reprises et ajuster l' effet désiré.

Modifier le Code du cours de démarrage rapide en 3D, charger un camion dans la scène, observer l 'utilisation d' images haute couleur et haute lumière, et comparer l 'utilisation par défaut de la lumière haute, comme suit


```java

......
//创建平行光 -------------------
  var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
//修改灯光方向
light.direction = new Vector3(0.3, -1, 0);

//加载导出的卡车模型
role3D=Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
role3D.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(role3D);

/** 模型与材质加载完成后回调***/		
private function onLoadComplete():void
{
  //获取模型
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取共享材质
  var sharedMaterial:StandardMaterial=meshSprite3D.meshRender.sharedMaterial;
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor=new Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  sharedMaterial.specularTexture=sharedMaterial.diffuseTexture;
  //sharedMaterial.specularTexture=Texture2D.load("LayaScene_truck/Assets/texture/t0200.png");
}	
```

Compilez le code ci - dessus et utilisez des images de haute couleur et haute lumière pour obtenir de meilleurs résultats (fig. 3).(fig. 4) Seules les lumières sont utilisées par défaut de couleur blanche élevée, avec un effet général.

![图片3](img/3.png)< br > (Figure 3)

![图片4](img/4.png)< br > (Figure 4)



####Environmental Color and Environmental Map

La couleur ambiante (Ambient) est, comme la couleur ambiante de la lumière, une couleur de fusion des couleurs du matériau qui tend vers une certaine couleur tout en permettant d 'éclairer le matériau et de simuler l' effet lumineux de la lampe.

Le masque ambiant (Ambiente texture) est également une image de texture 2D dont l 'impact sur le modèle a été temporairement supprimé dans le moteur layaair, et une version ultérieure sera remplacée par un autocollant électroluminescent.

Modifier le Code du cours de démarrage rapide en 3D comme suit (Figure 6):


```java

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");
//设置环境色，提亮模型
material.ambientColor =new Vector3(2,2,2);
//为box模型赋材质
box.meshRender.material = material;
```


![图片5](img/5.png)< br > le matériau n 'utilise pas de couleur d' environnement sous les lampes fixes

![图片6](img/6.png)< br > le matériau est éclairé par une couleur ambiante sous une lumière fixe



####Reflection Color and Reflectance

La couleur réfléchissante (reflectcolor) est similaire à la couleur de l 'environnement, ce qui permet de colorer l' ensemble du matériau par fusion de couleurs.

Nous utilisons généralement un ensemble de dessins texturés en boîte, texturecube, qui consiste à envelopper le modèle dans son ensemble et à simuler les effets de l 'environnement périphérique sur le modèle.

L 'effet d' affichage de l 'écran réfléchissant est également associé à la réflectivité albedo, le mode de rendu rendermode.

Le mode de rendu doit être remplacé par une opacité bidirectionnelle pour afficher l 'image réfléchissante.

Plus la valeur albedo de réflectivité est élevée, moins l 'effet d' application est faible, plus l 'effet d' application diffuse est fort, peut être ajusté en fonction de l 'effet réel du matériau de modélisation, tel que la surface d' eau, la surface miroir, la surface métallique peut ajuster différents réflectances Pour répondre à la demande.

Modifier le Code du cours de démarrage rapide en 3D comme suit, en utilisant un modèle sphérique pour mieux observer les effets réfléchissants.Résultats obtenus après l 'exécution (fig. 7):


```java

//添加方向光
//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//添加自定义模型
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh())) as MeshSprite3D;
sphere.transform.rotate(new Vector3(0,45,0),false,false);

//创建标准材质
var material:StandardMaterial = new StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Texture2D.load("res/layabox.png");

//降低反射率，加强反射贴图反射
material.albedo=new Vector4(0.2,0.2,0.2,0);
//设置渲染模式为双面不透明(否者无法显示反射贴图)
material.renderMode=StandardMaterial.RENDERMODE_OPAQUEDOUBLEFACE;
//创建反射贴图，用立方体全视角贴图进行赋值（类似于360全景包裹）
material.reflectTexture = TextureCube.load("skyBox/skyCube.ltc");

//为球型模型赋材质
sphere.meshRender.material = material;
```


![图片7](img/7.png)< br > diagramme réfléchissant



####Gravure Diagram

Les dessins en relief de ligne (normaltexture) jouent un rôle très important en 3D, le degré de précision de la présentation du modèle est principalement influencé par les dessins de ligne.Bien entendu, si l 'on utilise des cartes de ligne, les performances du matériel doivent être améliorées en conséquence.

Les maquettes d 'art sont produites de deux façons, l' une consistant à faire bouillir des maquettes à haut module dans des logiciels de fabrication en 3D, avec une grande charge de travail, et l 'autre à convertir des maquettes à réflexion diffuse en maquettes à faible charge de travail, avec un effet légèrement inférieur à celui de la méthode de cuisson.Comme le montre la figure 8, l 'effet de l' image de ligne est transformé par l 'image de réflexion diffuse.

![图片8](img/8.png)< br > (Figure 8)



S'il est nécessaire d'utiliser une feuille de route, les questions suivantes devront être prises en compte:

Les données du modèle sont assujetties à un certain nombre d'exigences dans le cadre d'une feuille de route, et l'absence d'informations de coupure sur le modèle n'aurait pas d'effet d'évidence.Par exemple, les types de grilles de mess que le moteur layaair - 3D porte lui - même, boxmesh, spheremesh, cylindermesh, etc., ne contiennent pas d 'informations linéaires et ne présentent pas de contour dans l' affichage même si l 'on utilise une carte de ligne.

Lorsqu'il est nécessaire d'utiliser des cartes graphiques et que les modèles sont exportés par l'intermédiaire de l'interface layaair, il faut veiller à ne pas cocher l'option de la grille Mesh - setting, par exemple (fig. 9).

![图片9](img/9.png)< br > (Figure 9)

S'il est nécessaire d'utiliser des cartes de circuit, il faut utiliser la lumière dans les scènes de jeu, faute de quoi le modèle n'aurait pas d'effet concave.



Nous avons créé un modèle cube à partir d 'unity3d (informations de coupure du Modèle créé dans l' Unity) et exporté et utilisé des données à partir d 'un insert d' Export layaair après application d 'un masque de réflexion diffuse et d' un masque de ligne, qui est automatiquement chargé sur le modèle.Modifier le Code du cours "démarrage rapide en 3D" comme suit, et voir l 'effet concave (fig.


```java

......
  //添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
  var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(1, 1, 1);
directionLight.direction = new Vector3(0.5, -1, 0);	
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

//创建unity中导出的模型
var box:Sprite3D=Sprite3D.load("layaScene_box/box.lh");
//模型与材质加载完成事件监听
box.on(Event.HIERARCHY_LOADED,this,onLoadComplete);
//也可以代码加载法线贴图

//加载到场景中
scene.addChild(box);
/** 模型与材质加载完成后回调***/		
private function onLoadComplete(role3D:Sprite3D):void
{
  //也可以代码加载法线贴图
  //从模型中获取meshSprite3D对像
  //var meshSprite3D:MeshSprite3D=box.getChildAt(0) as MeshSprite3D;
  //获取模型的材质实例
  //var material:StandardMaterial=meshSprite3D.meshRender.material as StandardMaterial;
  //为材质添加法线贴图
  //material.normalTexture=Texture2D.load("layaScene_box/Assets/texture/layabox_normal.png");
}
			
```


![图片10](img/10.png)<br > (Figure 10)



###Fichier de matériau exporté. Modification lmat

Après avoir compris la couleur du matériau et les propriétés de l 'écran, nous avons appris comment modifier les propriétés du matériau et des dessins par l' intermédiaire de codes, et de manière flexible pour contrôler les effets souhaités.

Actuellement, cependant, les effets artistiques sont essentiellement réalisés par l 'éditeur Unity, puis exportés pour être utilisés.Étant donné que le moteur layaair 3D est en cours d'amélioration et que les caractéristiques du moteur H5 ne couvrent pas tous les types de matériaux et les propriétés de l'Unity, les effets dans l'Unity peuvent être différents de ceux du jeu réel.

Dans les versions futures, nous créerons des matériaux standard layaair dans l 'Unity sous forme de fiches à l' usage des concepteurs, de sorte que les effets artistiques produits dans l 'Unity soient parfaitement compatibles avec ceux du jeu et faciles à utiliser par les concepteurs.

Alors, comment pouvons - nous modifier et obtenir des résultats artistiques en attendant?Chaque matériau de l 'Unity est généré lors de son exportation.

Par exemple, on charge une scène par le code suivant, puis on obtient l 'effet nocturne en réglant l' éclairage (fig. 11).


```java

......	
  //添加3D场景
  var scene:Scene = Scene.load("LayaScene_loveScene/loveScene.ls");
Laya.stage.addChild(scene);

//创建摄像机(横纵比，近距裁剪，远距裁剪)
var camera:Camera = new Camera( 0, 0.1, 1000);
//加载到场景
scene.addChild(camera);
//移动摄像机位置
camera.transform.position=new Vector3(-8, 4, 20);
//旋转摄像机角度
camera.transform.rotate(new Vector3( -8, -25, 0), true, false);
//设置摄像机视野范围（角度） 
camera.fieldOfView=35;
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);

//创建平行光 -------------------
var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
//修改灯光方向
light.direction = new Vector3(0.3, -1, 0);
//设置环境光偏暗蓝
scene.ambientColor=new Vector3(0.2,0.2,1);
//设置灯光光偏暗
light.color=new Vector3(0.5,0.5,0.5);
```

![图片11](img/11.png)< br > (Figure 11)

Comme le montre la figure ci - dessus, si le modèle Love doit être transformé en luminosité d 'un boîtier de lampe, il est relativement simple de modifier le fichier de matériau correspondant. Lmat, ouvre l' observation du fichier de matériau et découvre que le fichier de matériau contient une variété d 'attributs de couleur optique et de dessins (fig. 12), nous modifions la couleur ambiante du matériau de couverture en "1.5,1.2", 1.2, brosse.Les nouveaux fichiers Web permettent de voir les effets, et le modèle a changé pour atteindre l 'effet de la lampe (fig. 13).

![图片12](img/12.png)< br > (Figure 12)

![图片13](img/13.png)< br > (Figure 13)

Le procédé décrit ci - dessus permet d 'ajuster les propriétés des différents matériaux de la scène pour obtenir les effets souhaités de l' art.Bien sûr, nous attendons davantage du matériel exclusif layaair dans l 'unité qui suivra et de l' éditeur direct dans l 'unité de l' effet final correspondant au jeu.

