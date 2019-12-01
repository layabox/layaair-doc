#Couleur et dessin de matériau layaair3d

###Couleur de matériau et propriétés d 'affichage

Les propriétés standard du matériau sont quelque peu similaires à celles de la lumière, telles que les propriétés diffuse reflectance, haute lumière, ambiance, etc.On trouvera ci - après une description détaillée de ces caractéristiques.



###Reflectance

La réflectivité (albedo) reflète principalement la clarté et la couleur du matériau, plus les valeurs sont élevées, plus le matériau est clair.

La valeur de la réflectivité est un vecteur quadridimensionnel qui affiche les codes suivants et dont les quatre éléments représentent respectivement le rouge, le vert, le bleu et l 'Alpha transparent.

L 'effet Alpha transparent est en pourcentage, 0 pour la transparence totale et 1 pour la transparence totale, et si l' affichage doit être translucide ou entièrement transparent, il ne suffit pas d 'ajuster la réflectivité, il faut également définir un mode de rendu du matériau en tant que type de mélange pour atteindre l' objectif visé (fig. 1).

Modifier le Code du cours de démarrage rapide en 3D pour obtenir les résultats suivants:


```typescript

//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//只有设置了渲染模式为透明混合类型才能达到透明效果
//设置材质蓝色染色及30%半透明
material.albedo=new Laya.Vector4(1,1,2,0.3);
//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
material.renderMode = Laya.StandardMaterial.RENDERMODE_DEPTHREAD_TRANSPARENTDOUBLEFACE;;
//为box模型赋材质
box.meshRender.material = material;
```


![1](img/1.png)Figure 1 coloration et transparence de la réflectivité < / BR >



###Diffuse reflectance Color and diffuse reflectance

La couleur réfléchissante diffuse (diffusecolor) est la seule couleur propre du matériau, que l 'industrie des beaux - arts peut appeler la couleur intrinsèque de l' objet.Par exemple, les matériaux en bois doivent être texturés en bois et les matériaux en brique doivent être texturés en briques.

The most used in the game is diffuse reflectance Map, the most Work in the Graphics of Game Art is diffuse reflectance Map, that can reflect the Basic Quality of the object.

Les couleurs diffuses réfléchissantes et les dessins peuvent également être utilisés dans les moteurs layaair3d, avec un effet de fusion, une couleur diffuse réfléchissante colorant la surface d 'éclairage du modèle (la surface de rétroéclairage n' est pas modifiée), qui est semblable à la couleur de source de lumière réfléchissante diffuse de la lumière et produit une couleur plus globale (fig. 2).

Modifier le Code du cours "démarrer rapidement 3D" pour créer une couleur de réflexion diffuse bleue qui est bleue par la lumière.Voir (Fig. 2) Effets:


```typescript

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0, 0, 0);
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射颜色
material.diffuseColor=new Laya.Vector3(.5,.5,2);
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```


![2](img/2.png)(Figure 2) mélange de couleurs réfléchissantes diffuses et de dessins



###High Light and High Light

Les couleurs à haute lumière (speccular Color) sont, comme les lumières à haute lumière, des couleurs à haute lumière produites au coin de l 'objet modèle ou en direction de la source lumineuse.

La Haute couleur de la lumière sur le modèle est influencée par la couleur de la lumière en même temps que celle du matériau, et si la couleur de la lumière est noire sans la lumière ou la lumière, la lumière élevée sur le modèle n 'apparaît pas même si le matériau est muni d' un timbre haute couleur et haute lumière.

L 'autocollant (specular texture) est une image texturée en 2D dont la couleur de pixel représente la couleur et la luminosité élevées au niveau du modèle correspondant, plus la couleur de pixel brille, plus le modèle au niveau du pixel brille.

Bien entendu, l 'image haute couleur et l' image haute lumière peuvent être utilisées en même temps, l 'efficacité peut être améliorée, les développeurs peuvent tester à plusieurs reprises et ajuster l' effet désiré.

Modifier le Code du cours « démarrer rapidement le voyage en 3D » en chargeant un camion dans la scène pour observer l 'utilisation d' un autocollant à haute couleur et haute lumière et pour comparer l 'utilisation par défaut d' une lumière à haute intensité, comme suit:


```typescript

//创建平行光 -------------------
var light = scene.addChild(new Laya.DirectionLight());
//修改灯光方向
light.direction = new Laya.Vector3(0.3, -1, 0);
//设置高光色为白色
light.specularColor = new Laya.Vector3(1,1,1);
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
scene.addChild(this.role3D);
this.scene.addChild(this.role3D);
/** 模型与材质加载完成后回调***/        
function onLoadComplete()
{
  //获取模型
  var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
  //从模型上获取共享材质
  var sharedMaterial = meshSprite3D.meshRender.sharedMaterial;
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor = new Laya.Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  sharedMaterial.specularTexture = sharedMaterial.diffuseTexture;
  //sharedMaterial.specularTexture = Laya.Texture2D.load("LayaScene_truck/Assets/texture/t0200.png");
}
```


Compilez le code ci - dessus et utilisez des images de haute couleur et haute lumière pour obtenir de meilleurs résultats (fig. 3).(Figure 4) la couleur blanche par défaut de la lampe est élevée, avec un effet général.

![3](img/3.png)(Figure 3) < / BR >

![4](img/4.png)Figure 4 < / BR >



###Environmental Color and Environmental Map

La couleur ambiante (Ambient) est, comme la couleur ambiante de la lumière, une couleur de fusion des couleurs du matériau qui tend vers une certaine couleur tout en permettant d 'éclairer le matériau et de simuler l' effet lumineux de la lampe.

Le masque ambiant (Ambiente texture) est également une image de texture 2D dont l 'impact sur le modèle a été temporairement supprimé dans le moteur layaair, et une version ultérieure sera remplacée par un autocollant électroluminescent.

Modifier le Code du cours de démarrage rapide en 3D comme suit (Figure 6):


```typescript

//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0, 0, 0);
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//设置环境色，提亮模型
material.ambientColor =new Laya.Vector3(2,2,2);
//为box模型赋材质
box.meshRender.material = material;
```


![5](img/5.png)Figure 5 les matériaux n 'utilisent pas de couleur ambiante < br > sous les lampes fixes

![6](img/6.png)Figure 6. Les matériaux sont éclairés par des couleurs ambiantes < br > sous des lampes fixes



###Reflection Color and Reflectance

La couleur réfléchissante (reflectcolor) est similaire à la couleur de l 'environnement, ce qui permet de colorer l' ensemble du matériau par fusion de couleurs.

Nous utilisons généralement un ensemble de dessins texturés en boîte, texturecube, qui consiste à envelopper le modèle dans son ensemble et à simuler les effets de l 'environnement périphérique sur le modèle.

L 'effet d' affichage de l 'écran réfléchissant est également associé à la réflectivité albedo, le mode de rendu rendermode.

Le mode de rendu doit être remplacé par une opacité bidirectionnelle pour afficher l 'image réfléchissante.

Plus la valeur albedo de réflectivité est élevée, moins l 'effet d' application est faible, plus l 'effet d' application diffuse est fort, peut être ajusté en fonction de l 'effet réel du matériau de modélisation, tel que la surface d' eau, la surface miroir, la surface métallique peut ajuster différents réflectances Pour répondre à la demande.

Modifier le Code du cours de démarrage rapide en 3D comme suit, en utilisant un modèle sphérique pour mieux observer les effets réfléchissants.Résultats obtenus après l 'exécution (fig. 7):


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0.5, 0.5, 0.5);//为球体增加高光
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//添加自定义模型
var sphere = scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh()));
sphere.transform.rotate(new Laya.Vector3(0,45,0),false,false);
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//降低反射率，加强反射贴图反射
material.albedo = new Laya.Vector4(0.2,0.2,0.2,0);
//设置渲染模式为双面不透明(否者无法显示反射贴图)
material.renderMode = Laya.StandardMaterial.RENDERMODE_OPAQUEDOUBLEFACE;
//创建反射贴图，用立方体全视角贴图进行赋值（类似于360全景包裹）
material.reflectTexture = Laya.TextureCube.load("skyBox/skyCube.ltc");
//为球型模型赋材质
sphere.meshRender.material = material;
```


![7](img/7.png)(图7)反射贴图</br>







###Gravure Diagram

Les dessins en relief de ligne (normaltexture) jouent un rôle très important en 3D, le degré de précision de la présentation du modèle est principalement influencé par les dessins de ligne.Bien entendu, si l 'on utilise des cartes de ligne, les performances du matériel doivent être améliorées en conséquence.

Les maquettes d 'art sont produites de deux façons, l' une consistant à faire bouillir des maquettes à haut module dans des logiciels de fabrication en 3D, avec une grande charge de travail, et l 'autre à convertir des maquettes à réflexion diffuse en maquettes à faible charge de travail, avec un effet légèrement inférieur à celui de la méthode de cuisson.Comme le montre la figure 8, l 'effet de l' image de ligne est transformé par l 'image de réflexion diffuse.

![8](img/8.png)(图8)</br>


S'il est nécessaire d'utiliser une feuille de route, les questions suivantes devront être prises en compte:

Les données du modèle sont assujetties à un certain nombre d'exigences dans le cadre d'une feuille de route, et l'absence d'informations de coupure sur le modèle n'aurait pas d'effet d'évidence.Par exemple, les types de grilles de mess que le moteur layaair - 3D porte lui - même, boxmesh, spheremesh, cylindermesh, etc., ne contiennent pas d 'informations linéaires et ne présentent pas de contour dans l' affichage même si l 'on utilise une carte de ligne.

Lorsqu'il est nécessaire d'utiliser des cartes graphiques et que les modèles sont exportés par l'intermédiaire de l'interface layaair, il faut veiller à ne pas cocher l'option de la grille Mesh - setting, par exemple (fig. 9).

![9](img/9.png)(图9)</br>


S'il est nécessaire d'utiliser des cartes de circuit, il faut utiliser la lumière dans les scènes de jeu, faute de quoi le modèle n'aurait pas d'effet concave.

Nous avons créé un modèle cube à partir d 'unity3d (informations de coupure du Modèle créé dans l' Unity) et exporté et utilisé des données à partir d 'un insert d' Export layaair après application d 'un masque de réflexion diffuse et d' un masque de ligne, qui est automatiquement chargé sur le modèle.Modifier le Code du cours "démarrage rapide en 3D" comme suit, et voir l 'effet concave (fig.


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.ambientColor = new Laya.Vector3(0.5, 0.5, 0.5);
directionLight.specularColor = new Laya.Vector3(0.5, 0.5, 0.5);//为球体增加高光
directionLight.diffuseColor = new Laya.Vector3(1, 1, 1);
directionLight.direction = new Laya.Vector3(0.5, -1, 0);    
//创建unity中导出的模型
this.box = Laya.Sprite3D.load("layaScene_box/box.lh");
//模型与材质加载完成事件监听
box.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
//也可以代码加载法线贴图
//加载到场景中
scene.addChild(this.box);
/** 模型与材质加载完成后回调***/        
function onLoadComplete()
{
  //也可以代码加载法线贴图
  //从模型中获取meshSprite3D对像
  //var meshSprite3D = this.box.getChildAt(0);
  //获取模型的材质实例
  //var material = meshSprite3D.meshRender.material;
  //为材质添加法线贴图
  //material.normalTexture = Laya.Texture2D.load("layaScene_box/Assets/texture/layabox_normal.png");
}
```


![10](img/10.png)Figure 10 carte de la ligne française < br >



###Fichier de matériau exporté. Modification lmat

Après avoir compris la couleur du matériau et les propriétés de l 'écran, nous avons appris comment modifier les propriétés du matériau et des dessins par l' intermédiaire de codes, et de manière flexible pour contrôler les effets souhaités.

Actuellement, cependant, les effets artistiques sont essentiellement réalisés par l 'éditeur Unity, puis exportés pour être utilisés.Étant donné que le moteur layaair 3D est en cours d'amélioration et que les caractéristiques du moteur H5 ne couvrent pas tous les types de matériaux et les propriétés de l'Unity, les effets dans l'Unity peuvent être différents de ceux du jeu réel.

Dans les versions futures, nous créerons des matériaux standard layaair dans l 'Unity sous forme de fiches à l' usage des concepteurs, de sorte que les effets artistiques produits dans l 'Unity soient parfaitement compatibles avec ceux du jeu et faciles à utiliser par les concepteurs.

Alors, comment pouvons - nous modifier et obtenir des résultats artistiques en attendant?Chaque matériau de l 'Unity est généré lors de son exportation.

Par exemple, on charge une scène par le code suivant, puis on obtient l 'effet nocturne en réglant l' éclairage (fig. 11).


```typescript

//添加3D场景
var scene = Laya.Scene.load("LayaScene_01/loveScene.ls");
Laya.stage.addChild(scene);
//创建摄像机(横纵比，近距裁剪，远距裁剪)
var camera = new Laya.Camera( 0, 0.1, 1000);
//加载到场景
scene.addChild(camera);
//移动摄像机位置
camera.transform.position=new Laya.Vector3(-8, 4, 20);
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3( -8, -25, 0), true, false);
//设置摄像机视野范围（角度） 
camera.fieldOfView=35;
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);
//创建平行光 -------------------
var light = scene.addChild(new Laya.DirectionLight());
//修改灯光方向
light.direction = new Laya.Vector3(0.3, -1, 0);
//设置为无高光
light.specularColor=new Laya.Vector3(0,0,0);
//设置环境光偏暗蓝
light.ambientColor=new Laya.Vector3(0.2,0.2,1);
//设置漫反射光偏暗
light.diffuseColor=new Laya.Vector3(0.5,0.5,0.5);
```


![11](img/11.png)(Figure 11) < / BR >

D'après la figure ci - dessus, s'il est nécessaire de transformer le modèle « Love » en luminosité d'une lampe, de modifier les problèmes relatifs par Code, il est relativement simple de modifier le fichier de matériau correspondant. Lmat, ouvre l'observation du fichier de matériau et découvre que le fichier de matériau contient une variété d'attributs de couleur optique et de dessins (fig. 12), nous modifions la couleur ambiante du matériau de couverture de 1.5, 1.2, 1.2 ",2".La mise à jour des fichiers Web permet de voir les effets, et le modèle a changé pour atteindre l 'effet de la lampe (fig. 13).

![12](img/12.png)(Figure 12) < / BR >

![13](img/13.png)(Figure 13) < / BR >

Le procédé décrit ci - dessus permet d 'ajuster les propriétés des différents matériaux de la scène pour obtenir les effets souhaités de l' art.Bien sûr, nous attendons davantage du matériel exclusif layaair dans l 'unité qui suivra et de l' éditeur direct dans l 'unité de l' effet final correspondant au jeu.