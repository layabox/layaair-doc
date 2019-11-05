#Couleur et dessin de matériau layaair3d

###Couleur de matériau et propriétés d 'affichage

Les propriétés standard du matériau sont quelque peu similaires à celles de la lumière, telles que les propriétés diffuse reflectance, haute lumière, ambiance, etc.On trouvera ci - après une description détaillée de ces caractéristiques.



###Reflectance

La réflectivité (albedocolor) reflète principalement la clarté et la couleur du matériau, plus les valeurs sont élevées, plus le matériau est clair.

La valeur de la réflectivité est un vecteur quadridimensionnel qui affiche les codes suivants et dont les quatre éléments représentent respectivement le rouge, le vert, le bleu et l 'Alpha transparent.

L 'effet Alpha transparent est en pourcentage, 0 pour la transparence totale et 1 pour la transparence totale, et si l' affichage doit être translucide ou entièrement transparent, il ne suffit pas d 'ajuster la réflectivité, il faut également définir un mode de rendu du matériau en tant que type de mélange pour atteindre l' objectif visé (fig. 1).

Modifier le Code du cours de démarrage rapide en 3D pour obtenir les résultats suivants:


```typescript

//创建材质
var material = new Laya.PBRSpecularMaterial();
//创建漫反射二维纹理贴图
Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
  material.albedoTexture = text;
}));
//只有设置了渲染模式为透明混合类型才能达到透明效果
//设置材质蓝色染色及30%半透明
 material.albedoColor=new Laya.Vector4(1,1,1,0.3);
//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
 material.renderMode =Laya.PBRSpecularMaterial.RENDERMODE_TRANSPARENT;
box.meshRenderer.material = material;
```


![1](img/1.png)Figure 1 coloration et transparence de la réflectivité < / BR >



###Diffuse reflectance Color and diffuse reflectance

La couleur réfléchissante diffuse (diffusecolor) est la seule couleur propre du matériau, que l 'industrie des beaux - arts peut appeler la couleur intrinsèque de l' objet.Par exemple, les matériaux en bois doivent être texturés en bois et les matériaux en brique doivent être texturés en briques.

The most used in the game is diffuse reflectance Map, the most Work in the Graphics of Game Art is diffuse reflectance Map, that can reflect the Basic Quality of the object.

Les couleurs diffuses réfléchissantes et les dessins peuvent également être utilisés dans les moteurs layaair3d, avec un effet de fusion, une couleur diffuse réfléchissante colorant la surface d 'éclairage du modèle (la surface de rétroéclairage n' est pas modifiée), qui est semblable à la couleur de source de lumière réfléchissante diffuse de la lumière et produit une couleur plus globale (fig. 2).

Modifier le Code du cours "démarrer rapidement 3D" pour créer une couleur de réflexion diffuse bleue qui est bleue par la lumière.Voir (Fig. 2) Effets:


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
scene.ambientColor = new Laya.Vector3(0.5,0.5,0.5);   
//创建材质
var material = new Laya.PBRSpecularMaterial();
//创建漫反射二维纹理贴图
Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
  material.albedoTexture = text;
  //设置材质漫反射颜色
  material.albedoColor = new Laya.Vector4(0.5,0.5,2,1);
})); 
box.meshRenderer.material = material;
```


![2](img/2.png)(图2)漫反射颜色与贴图混合</br>







###High Light and High Light

Les couleurs à haute lumière (speccular Color) sont, comme les lumières à haute lumière, des couleurs à haute lumière produites au coin de l 'objet modèle ou en direction de la source lumineuse.

La Haute couleur de la lumière sur le modèle est influencée par la couleur de la lumière en même temps que celle du matériau, et si la couleur de la lumière est noire sans la lumière ou la lumière, la lumière élevée sur le modèle n 'apparaît pas même si le matériau est muni d' un timbre haute couleur et haute lumière.

L 'autocollant (specular texture) est une image texturée en 2D dont la couleur de pixel représente la couleur et la luminosité élevées au niveau du modèle correspondant, plus la couleur de pixel brille, plus le modèle au niveau du pixel brille.

Bien entendu, l 'image haute couleur et l' image haute lumière peuvent être utilisées en même temps, l 'efficacité peut être améliorée, les développeurs peuvent tester à plusieurs reprises et ajuster l' effet désiré.

Modifier le Code du cours « démarrer rapidement le voyage en 3D » en chargeant un camion dans la scène pour observer l 'utilisation d' un autocollant à haute couleur et haute lumière et pour comparer l 'utilisation par défaut d' une lumière à haute intensité, comme suit:


```typescript


  //获取模型
  var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
  //从模型上获取共享材质
  var sharedMaterial =meshSprite3D.meshRenderer.sharedMaterial;
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor = new Laya.Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
      sharedMaterial.specularTexture = text;
  }));
```


Compilez le code ci - dessus et utilisez des images de haute couleur et haute lumière pour obtenir de meilleurs résultats (fig. 3).(Figure 4) la couleur blanche par défaut de la lampe est élevée, avec un effet général.

![3](img/3.png)(Figure 3) < / BR >

![4](img/4.png)Figure 4 < / BR >



###Couleur de l 'environnement

La couleur ambiante (ambiencolor) est une couleur de fusion des couleurs des matériaux dans les scènes, ce qui permet d 'éclairer les matériaux tout en simulant la couleur du ciel et l' intensité de la lumière.

Modifier le Code du cours de démarrage rapide en 3D comme suit (Figure 6):


```typescript

//添加3D场景
var scene = Laya.stage.addChild(new Laya.Scene3D());
//设置环境色，提亮模型
scene.ambientColor = new Laya.Vector3(0.5,0.5,0.5);
```


![5](img/5.png)Figure 5 les matériaux n 'utilisent pas de couleur ambiante < br > sous les lampes fixes

![6](img/6.png)Figure 6. Les matériaux sont éclairés par des couleurs ambiantes < br > sous des lampes fixes



###Reflectance

Nous utilisons généralement un ensemble de dessins texturés en boîte texturecube, qui enveloppe le modèle dans son ensemble et simule l 'effet de l' environnement périphérique sur le modèle.

L 'effet d' affichage de l 'écran réfléchissant est également associé à la réflectivité albedocolor, le mode de rendu rendermode.

Le mode de rendu doit être remplacé par une opacité bidirectionnelle pour afficher l 'image réfléchissante.

Plus l 'indice albedocolor est élevé, moins l' effet d 'autocollage est faible, plus l

Modifier le Code du cours de démarrage rapide en 3D comme suit, en utilisant un modèle sphérique pour mieux observer les effets réfléchissants.Résultats obtenus après l 'exécution (fig. 7):


```typescript

//添加方向光
var directionLight = scene.addChild(new Laya.DirectionLight());
directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
scene.ambientColor = new Laya.Vector3(0.5,0.5,0.5);
//添加自定义模型（球）
var box = scene.addChild(new Laya.MeshSprite3D(new Laya.SphereMesh(1)));
box.transform.translate(new Laya.Vector3(0,1,-3));
Laya.timer.loop(10,this,function(){
  box.transform.rotate(new Laya.Vector3(0, 1, 0), true, false);
})
//创建材质
var material = new Laya.PBRSpecularMaterial();
//创建漫反射二维纹理贴图
Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(this,function(text){
  material.albedoTexture = text;
  //设置材质漫反射颜色
  // material.albedoColor = new Laya.Vector4(0.5,0.5,2,1);
  //修改材质的高光颜色，让高光处偏红
  // material.specularColor = new Laya.Vector4(1,0,0,1);
})); 	
//获取反射贴图（用立方体全视角贴图进行赋值（类似于360全景包裹））
Laya.TextureCube.load("LayaScene_test/Assets/1v1Scene/NewCubemap.ltc",Laya.Handler.create(this,function(cube){
  //设置反射贴图
  scene.customReflection = cube;
  //设置反射贴图的反射率
  scene.reflectionIntensity = 1;
}));
//设置渲染模式为不透明（否则无法显示反射贴图）
material.renderMode = Laya.PBRSpecularMaterial.RENDERMODE_OPAQUE
//降低材质的反射率，加强反射贴图反射
material.albedoColor=new Laya.Vector4(0.1,0.1,0.1,0);
//为模型赋材质
box.meshRenderer.material = material;
```


![7](img/7.png)Figure 7 diagrammes de réflexion < br >



###Gravure Diagram

Les dessins en relief de ligne (normaltexture) jouent un rôle très important en 3D, le degré de précision de la présentation du modèle est principalement influencé par les dessins de ligne.Bien entendu, si l 'on utilise des cartes de ligne, les performances du matériel doivent être améliorées en conséquence.

Les maquettes d 'art sont produites de deux façons, l' une consistant à faire bouillir des maquettes à haut module dans des logiciels de fabrication en 3D, avec une grande charge de travail, et l 'autre à convertir des maquettes à réflexion diffuse en maquettes à faible charge de travail, avec un effet légèrement inférieur à celui de la méthode de cuisson.Comme le montre la figure 8, l 'effet de l' image de ligne est transformé par l 'image de réflexion diffuse.

![8](img/8.png)(图8)</br>


S'il est nécessaire d'utiliser une feuille de route, les questions suivantes devront être prises en compte:

Les données du modèle sont assujetties à un certain nombre d'exigences dans le cadre d'une feuille de route, et l'absence d'informations de coupure sur le modèle n'aurait pas d'effet d'évidence.Par exemple, les types de grilles de mess que le moteur layaair - 3D porte lui - même, boxmesh, spheremesh, cylindermesh, etc., ne contiennent pas d 'informations linéaires et ne présentent pas de contour dans l' affichage même si l 'on utilise une carte de ligne.

Lorsqu'il est nécessaire d'utiliser des cartes graphiques et que les modèles sont exportés par l'intermédiaire de l'interface layaair, il faut veiller à ne pas cocher l'option de la grille Mesh - setting, par exemple (fig. 9).

![9](img/9.png)(Figure 9) < / BR >

S'il est nécessaire d'utiliser des cartes de circuit, il faut utiliser la lumière dans les scènes de jeu, faute de quoi le modèle n'aurait pas d'effet concave.

Nous avons créé un modèle cube à partir d 'unity3d (informations de coupure du Modèle créé dans l' Unity) et exporté et utilisé des données à partir d 'un insert d' Export layaair après application d 'un masque de réflexion diffuse et d' un masque de ligne, qui est automatiquement chargé sur le modèle.Modifier le Code du cours "démarrage rapide en 3D" comme suit, et voir l 'effet concave (fig.


```typescript

Laya.Scene3D.load("LayaScene_test_Light/test_Light.ls",Laya.Handler.create(this,function(s){
  var scene = Laya.stage.addChild(s);
  //也可以代码加载法线贴图
  //从模型中获取meshSprite3D对像
  // var meshSprite3D=s.getChildByName("Cube");
  //获取模型的材质实例
  // var material=meshSprite3D.meshRenderer.material;
  //为材质添加法线贴图
  // Laya.Texture2D.load("LayaScene_test_Light/Assets/LayaPlugin/8.jpg",Laya.Handler.create(this,function(text){
  // 	material.normalTexture= text;
  // }));
})); 
```


![10](img/10.png)(图10)法线贴图</br>







###Fichier de matériau exporté. Modification lmat

Après avoir compris la couleur du matériau et les propriétés de l 'écran, nous avons appris comment modifier les propriétés du matériau et des dessins par l' intermédiaire de codes, et de manière flexible pour contrôler les effets souhaités.

Actuellement, cependant, les effets artistiques sont essentiellement réalisés par l 'éditeur Unity, puis exportés pour être utilisés.Étant donné que le moteur layaair 3D est en cours d'amélioration et que les caractéristiques du moteur H5 ne couvrent pas tous les types de matériaux et les propriétés de l'Unity, les effets dans l'Unity peuvent être différents de ceux du jeu réel.

Dans les versions futures, nous créerons des matériaux standard layaair dans l 'Unity sous forme de fiches à l' usage des concepteurs, de sorte que les effets artistiques produits dans l 'Unity soient parfaitement compatibles avec ceux du jeu et faciles à utiliser par les concepteurs.

Alors, comment pouvons - nous modifier et obtenir des résultats artistiques en attendant?Chaque matériau de l 'Unity est généré lors de son exportation.

Par exemple, on charge une scène par le code suivant, puis on obtient l 'effet nocturne en réglant l' éclairage (fig. 11).


```typescript

Laya.Scene3D.load("LayaScene_test_Light/test_Light.ls",Laya.Handler.create(this,function(s){
  var scene = Laya.stage.addChild(s);
  //设置环境光偏暗蓝色
  scene.ambientColor = new Laya.Vector3(0.2,0.2,1);
  //获取场景灯光
  var light = scene.getChildByName("Directional light");
  //设置灯光光偏暗
  light.color = new Laya.Vector3(0.5,0.5,0.5);
}));
```


![11](img/11.png)(Figure 11) < / BR >

D'après la figure ci - dessus, s'il est nécessaire de transformer le modèle « Love » en luminosité d'une lampe, de modifier les problèmes relatifs par Code, il est relativement simple de modifier le fichier de matériau correspondant. Lmat, ouvre l'observation du fichier de matériau et découvre que le fichier de matériau contient une variété d'attributs de couleur optique et de dessins (fig. 12), nous modifions la couleur ambiante du matériau de couverture de 1.5, 1.2, 1.2 ",2".La mise à jour des fichiers Web permet de voir les effets, et le modèle a changé pour atteindre l 'effet de la lampe (fig. 13).

![12](img/12.png)(Figure 12) < / BR >

![13](img/13.png)(Figure 13) < / BR >

Le procédé décrit ci - dessus permet d 'ajuster les propriétés des différents matériaux de la scène pour obtenir les effets souhaités de l' art.Bien sûr, nous attendons davantage du matériel exclusif layaair dans l 'unité qui suivra et de l' éditeur direct dans l 'unité de l' effet final correspondant au jeu.