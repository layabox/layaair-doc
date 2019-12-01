#Analyse de la carte de tiled MAP avec le moteur layaair

> Author: Charley

Tiled Map Editor est un éditeur de cartes gratuit qui peut être utilisé pour éditer des cartes de jeu 2D, et le moteur layaair aide à analyser les cartes exportées par tiled map.On trouvera dans le présent document des informations sur l'utilisation de cartes tirées de tiled Map Editor pour le développement du moteur layaair.

> Note: Le présent document s'adresse uniquement aux concepteurs qui connaissent bien et utilisent l'outil de carte tiled - map.Il décrit comment les cartes exportées par tiled Map Editor sont utilisées dans le cadre du projet du moteur layaair et, pour ce qui est du contenu de l'outil tiled Map Editor, consultez le document d'enseignement d'une tierce partie.
]
> certains éléments de ce document sont ajoutés à la version 1.7.7 du moteur layaair, veuillez mettre à jour le moteur à la version 1.7.7 ou au - dessus avant de lire le présent document.



##Carte de tiled - map appuyée par un moteur d 'exportation

###1.1 installation téléchargée tiled - map - editor

Ouvrez la page d'accueil officielle.[http://www.mapeditor.org/](http://www.mapeditor.org/), cliquez directement sur`DownLoad at itch.io`Cliquez sur le bouton pour télécharger le lien ([https://thorbjorn.itch.io/tiled](https://thorbjorn.itch.io/tiled)).Com.NET.CN guanwangwangzaixiangzaixiangzaixiangzaixiangzai.com.NET[http://www.mapeditor.org/download.html](http://www.mapeditor.org/download.html)Trouvez le lien de téléchargement.

Des liens vers la version correspondante du système sont trouvés et téléchargés pour être installés (* La version utilisée dans le présent document est tiled - 1.1.5 *).

**Tips**- Oui.

*Pas de téléchargement, juste pour m'emmener aux downloads, je vous emmène sur un lien téléchargé gratuit.*

* Si la version officielle ne fonctionne pas, github`https://github.com/layabox/layaair-doc`Il y a une version de tiled 1.1.5 * de 64 Windows.



###1.2 format de carte tiled - map supporté par le moteur d'exportation

L 'outil tiled Map est utilisé de manière spécifique, peu parlé dans le présent document, et il est possible de rechercher les documents didactiques pertinents dans la baie ou Google.Et le moteur a un rapport important avec le format.Les développeurs doivent être particulièrement attentifs et les problèmes sont généralement absents ici.

####1.2.1 conditions de présentation des blocs de graphiques lors de la création de la carte

Cliquez sur la nouvelle carte pour définir les paramètres initiaux de la taille de la carte et de la taille du bloc

Cependant, le format des blocs d 'images nécessite une attention particulière, car**Le moteur layaair ne supporte pas le format de bloc de cartes de tiled Map pour base64.**Alors...`创建`Nouvelle carte**Il faut**Pour`CSV格式`Voir la figure 1.

![图1](img/1.png) 


(Figure 1)

**Si vous vous trompez lors de la création**, ou dans le panneau d 'attributs`图块层格式`**Remplacer "CSV" par "XML".**Voir la figure 2.**Le format de base 64 n'est pas approuvé.**

![图2](img/2.png) 


(Figure 2)

####1.2.2 exporter au format json

Dans ce cas, on ouvre directement la carte illustrée de tiled Map Orthogonal - outside.tmx

#####Lors de l 'Export, nous devons choisir le format json.

À tiled.`文件`Dans le menu`另存为`, enregistrer la carte tiled achevée en tant que type de fichier json, cet exemple s' appelle orthogonal.json (le nom de fichier est donné au hasard par l 'développeur de nom de fichier, puis cliquez sur`保存`, à**Liste des projets**(cet exemple est`项目根目录\bin\h5\res\TiledMap\`(voir la figure 3.

![图3](img/3.png) 


(Figure 3)

###1.3 modification de la trajectoire d 'images et reproduction des ressources tiled

#####Il ne suffit pas d 'enregistrer les fichiers json, nous devons également modifier le trajet absolu image en tant que trajet relatif.

On a passé l'id, on a ouvert ce qui vient d'être enregistré.`orthogonal.json`, cliquez sur le mot clé`"image"`Nous trouverons le chemin image par défaut dans le répertoire d 'installation de tiled.Comme le montre la figure 4.

![图4](img/4.png) 


(Figure 4)

#####Le chemin est dans le catalogue de l'installation de tiled.

Nous devons donc d'abord copier cette image (* Buch - outdoor.png *) dans le catalogue des projets.**, et enregistré antérieurement`orthogonal.json`De même.****


如图5所示。

![图5](img/5.png) 



#####(Figure 5)
****
Et ensuite, je vais mettre orthogonal.json.`image`**Modifier le trajet pour le trajet relatif * *`"image":"buch-outdoor.png",`

La phase de préparation est terminée et nous allons passer à la phase de codage.



##Le moteur layaair utilise la carte tiled Map

###2.1 création de la carte tiledmap

####2.1.1 description createmap - API

Le procédé createmap dans la catégorie laya.map.tiledmap permet de créer une carte tiledmap.Les paramètres de base sont indiqués à la figure 6.

![图6](img/6.png) 


(Figure 6)

####2.1.2 création d'exemples de cartes


```javascript

//初始化舞台
Laya.init(Laya.Browser.width,Laya.Browser.height,Laya.WebGL);
//创建TiledMap实例
this.tMap = new Laya.TiledMap();
//创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0,0,Laya.Browser.width,Laya.Browser.height);
//创建TiledMap地图
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect);
```


La compilation du Code d 'exécution, dont les effets sont illustrés à la figure 7, montre que la carte a été créée avec succès.

![图7](img/7.png) 


(Figure 7)

###2.2 cartes de contrôle

La carte de commande doit d 'abord être chargée sur la carte json, puis contrôlée dans le procédé de retour.On trouvera ci - après des exemples d'utilisation pertinents.

####2.2.1 zoom des cartes

`laya.map.TiledMap`Classe`scale`Les attributs permettent de contrôler le rapport d 'agrandissement de la carte.Nous suivons l 'exemple précédent, dans le procédé createmap, ajoutons le retour et utilisons`scale`L 'attribut zoom la carte.

L'exemple est le suivant:


```typescript

//初始化舞台
Laya.init(Laya.Browser.width,Laya.Browser.height,Laya.WebGL);
//创建TiledMap实例
this.tMap = new Laya.TiledMap();
//创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0,0,Laya.Browser.width,Laya.Browser.height);
//创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect,Laya.Handler.create(this,onMapLoaded));

function onMapLoaded(){
    //将原地图放大2倍
    this.tMap.scale = 2;
}
```


Les résultats sont présentés à la figure 8.

![图8](img/8.png) 


(Figure 8)

####2.2.2 définition de points centraux pour l'échelonnement des cartes

Il est clair que les effets de la figure 8 ne sont pas ce que nous voulons.Zoom.Une partie n 'est pas visible.Le point central de l 'agrandissement par défaut est créé dans la zone centrale de la vue.

####Zone d 'affichage et emplacement de point central par défaut

La zone d 'affichage est définie dans le deuxième paramètre de la méthode de création de carte (* createmap *),


```javascript

//创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0,0,Laya.Browser.width,Laya.Browser.height);
//创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect,Laya.Handler.create(this,onMapLoaded));
```


En regardant le Code, on découvre que l 'image est configurée pour une largeur physique du navigateur.`Laya.Browser.width, Laya.Browser.heigh`).La valeur par défaut de setviewport pivotbyscale est de 0,5.La position du point central est indiquée dans la figure 9 - 1.

![图9-1](img/9-1.png) 


(Figure 9 - 1)

Quand la carte est deux fois plus grande`tMap.scale = 2;`) l 'agrandissement produit l' effet de la figure 9 - 2 en raison de l 'agrandissement effectué au Centre des axes X et y de la zone d' affichage.

![图9-2](img/9-2.png) 


(Figure 9 - 2)

On trouvera ci - après une meilleure compréhension du point central de l 'attribut Scale en modifiant la figure 9 - 3 de 0,1 à 2 fois le rapport de l' original.

![动图9-3](img/9-3.gif) 


(Figure 9 - 3)

####Paramétrage d 'un point central de zoom au moyen d' un procédé setviewport pivotbyscale

L 'effet central par défaut est décrit ci - dessus.Comment installer et modifier le Centre de zoom?Oui.`laya.map.TiledMap`Classe`setViewPortPivotByScale()`Le procédé peut définir un point central de la vue.La note de base de l'API figure à la figure 10.

![图10](img/10.png) 


(Figure 10)

`setViewPortPivotByScale()`Le premier paramètre du procédé, scalex, est le rapport de coordonnées de zoom dans le sens de l 'axe X, et scaley, le rapport de coordonnées de zoom dans le sens de l' axe Y.

Par exemple:


```java

this.tMap.setViewPortPivotByScale(0.1,0.5);
```


**Description de code**- Oui.

La taille de la vue est de 800 * 600.

- valeur scalex`0.1`Les coordonnées du Centre de zoom de l 'axe X sont 80 (800 * 0,1).

- scaley.`0.5`Coordonnées du Centre de zoom de l 'axe Y: 300 (600 * 0,5)

Lors de l 'exécution du Code, les coordonnées du point central de la vue sont alignées sur l' axe x 80 et l 'axe y 300.



####Positionner le point central de l 'échelle en angle supérieur gauche de la vue

Lorsque setviewport pivotbyscale, le point central de l 'échelle est défini comme`0,0`Dans le coin supérieur gauche de la vue.Continue de coder comme suit l 'exemple précédent:


```javascript

//初始化舞台
Laya.init(Laya.Browser.width,Laya.Browser.height,Laya.WebGL);
//创建TiledMap实例
this.tMap = new Laya.TiledMap();
//创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0,0,Laya.Browser.width,Laya.Browser.height);
//创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect,Laya.Handler.create(this,onMapLoaded));

function onMapLoaded(){
    //设置缩放中心点为视口的左上角
    this.tMap.setViewPortPivotByScale(0,0); 
    //将原地图放大2倍
    this.tMap.scale = 2;
}
```


Lorsque le point central de l 'échelle est positionné dans le coin supérieur gauche de la vue, deux fois plus grand, nous pouvons mettre un écran complet sur le dispositif Iphone6 sans côté noir.Les résultats sont présentés à la figure 11.

![图11](img/11.png) 


(Figure 11)



###2.3 Cartes remorquées

Lorsque la carte est agrandie, il n 'est pas possible de l' afficher entièrement.Il faudra alors faire glisser la carte pour tout voir.

En plus de la méthode décrite plus haut, il est nécessaire d 'utiliser une carte glissante`moveViewPort()`Procédé et appareil (d 'affichage mobile)`changeViewPort()`(changer la taille de la vue)Les notes de base des deux API sont présentées dans les figures 12 - 1 et 12 - 2.

![图12-1](img/12-1.png) 


(Figure 12 - 1)


![图12-2](img/12-2.png) 


(Figure 12 - 2)

On trouvera ci - après un aperçu des codes utilisés pour les deux méthodes.


```javascript

//初始化舞台
Laya.init(Laya.Browser.width,Laya.Browser.height,Laya.WebGL);
//创建TiledMap实例
this.tMap = new Laya.TiledMap();
//创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0,0,Laya.Browser.width,Laya.Browser.height);
//创建TiledMap地图，加载orthogonal.json后，执行回调方法onMapLoaded()
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect,Laya.Handler.create(this,onMapLoaded));

function onMapLoaded(){
    //设置缩放中心点为视口的左上角
    this.tMap.setViewPortPivotByScale(0,0); 
    //将原地图放大3倍
    this.tMap.scale = 3;
    this.MapX = 0;
    this.MapY = 0;

    Laya.stage.on(Laya.Event.RESIZE,this,resize);
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,mouseDown);
    Laya.stage.on(Laya.Event.MOUSE_UP,this,mouseUp);
    resize();
}
/**
 * 移动地图视口
 */
function mouseMove(){
    var moveX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
    var moveY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
    //移动地图视
    this.tMap.moveViewPort(moveX,moveY);
}
function mouseUp(){
    this.MapX = this.MapX - (Laya.stage.mouseX - this.mLastMouseX);
    this.MapY = this.MapY - (Laya.stage.mouseY - this.mLastMouseY);
    Laya.stage.off(Laya.Event.MOUSE_MOVE, this, mouseMove);
}
function mouseDown(){
    this.mLastMouseX = Laya.stage.mouseX;
    this.mLastMouseY = Laya.stage.mouseY;
    Laya.stage.on(Laya.Event.MOUSE_MOVE,this,mouseMove);
}
/**
 *  改变视口大小
 *  重设地图视口区域
 */	
function resize(){
    //改变视口大小
    this.tMap.changeViewPort(this.MapX,this.MapY,Laya.Browser.width,Laya.Browser.height);
}
```


L 'effet d' exécution du Code est indiqué à la figure 13.

![动图13](img/13.gif) 


(Figure 13)



##Optimisation de l 'utilisation de tiled - map

###3.1 cartes détruites

Lorsque tiled mapa a cessé d'être utilisé, il a fallu procéder à la destruction en utilisant la méthode Destroy () pour récupérer la mémoire occupée.

Par exemple:


```java

this.tMap.destroy();
```




###3.2 corrélation cache

####3.2.1 ouverture et désactivation du cache automatique

Lorsque le moteur layaair utilise tiledmap, le bloc non animé est automatiquement mis en cache par défaut et le type de cache est par défaut normal.


```java

//自动缓存没有动画的地块
this.tMap.autoCache = true;
//自动缓存的类型,地图较大时建议使用normal
this.tMap.autoCacheType = "normal";
//消除缩放导致的缝隙,也就是去黑边，1.7.7版本新增的优化属性
this.tMap.antiCrack = true;
```


Les attributs de code ci - dessus sont les valeurs par défaut du moteur et, dans la plupart des cas, les valeurs par défaut peuvent être maintenues sans qu 'il soit nécessaire d' ajouter des paramètres.

Pourquoi vous le présentez encore?

Parce que parfois, la carte de tiled cache le côté noir.Bien que des attributs Anticrack aient été ajoutés à la version 1.7.7, la plupart des bords noirs dus au cache normal peuvent être éliminés.Mais si le problème noir que j'ai maintenant n'est pas résolu.Le problème du bord noir (fente) peut être résolu par désactivation du cache automatique.

####3.2.2 définir la taille des blocs de mémoire cache

####Recommandation de réglage de blocs de mémoire cache

Les cartes de tiledmap sont composées d'un assemblage de blocs.Si la taille d 'origine est maintenue lors de la mise en antémémoire, la performance est affectée lorsque les blocs d' images sont nombreux.Il est donc recommandé d 'activer les réglages de blocs de mémoire cache et de fixer la taille des blocs de mémoire cache à environ 512 pixels, le nombre entier de blocs de diagrammes primaires devant être maintenu.

Par exemple, la taille des blocs monographiques dans l 'exemple de ce document est`16*16`, le bloc de cache peut alors être fixé à 16 fois 32 fois, c 'est - à - dire`512*512`".

Si le diagramme est`15*15`, le bloc cache peut être défini comme`510*510`(34 fois), et ainsi de suite, autant que possible, avec un nombre entier de blocs d 'origine multiplié par 512.Recommander`为512*512`".

####Procédé de réglage spécifique de blocs de mémoire cache

Le réglage des blocs de mémoire cache est nécessaire au moment de la création de la carte.Définit un quatrième paramètre gridsize, par exemple:


```javascript

//为第二个参数创建Rectangle实例，视口区域
var viewRect = new Laya.Rectangle(0, 0, Laya.Browser.width, Laya.Browser.height);

//为第四个参数gridSize创建一个512*512大小的Point对象实例
var gridSize = new Laya.Point(512, 512);

//创建TiledMap地图
this.tMap.createMap("res/TiledMap/orthogonal.json",viewRect, Laya.Handler.create(this,onMapLoaded), null, gridSize)
```






###3.3 fusion des couches

####3.3.1 ouverture de la couche de fusion

Lorsqu 'il y a plusieurs couches dans tiledmap, l' ouverture de l 'attribut de la couche graphique combinée, enablemergelayer, permet de fusionner la couche graphique et améliore les performances.

Les modalités d'ouverture sont les suivantes:


```java

//开启图层合并
this.tMap.enableMergeLayer = true;
```


**Tips**- Oui.

Il convient de noter que si la couche graphique avant la fusion doit être manipulée, elle ne peut pas être fusionnée directement.Car la fusion empêche le fonctionnement de la couche graphique avant la fusion.

####3.3.2 regroupement des couches

Si les couches ne sont pas regroupées dans tiledmap, toutes les couches sont fusionnées lorsque les couches sont fusionnées.Il est donc nécessaire de diviser les couches et de les faire fonctionner séparément.Les couches peuvent être groupées dans tiledmap.

####Modèle de groupement de couches tiledmap:

Ouvre l 'éditeur de carte tiledmap, sélectionne la couche d' image à grouper, et ajoute un nom à la barre d 'attributs personnalisée de la couche d' image.`layer`A`string`Propriétés du typeComme le montre la figure 14 - 1.

![图14-1](img/14-1.png) 


(Figure 14 - 1)

Cliquez sur OK, ajoutez toutes les couches d 'image ajoutant les attributs personnalisés après l' ajout.Définit le nom du paquet.

Par exemple, lorsque le nom de groupe de la couche de bloc 2 et de la couche de bloc 3 est défini comme layaair, la couche de motif appelée layaair est intégrée dans la même couche lorsque la couche de bloc 2 est ouverte.Comme le montre la figure 14 - 2.

![图14-2](img/14-2.png) 


(Figure 14 - 2)

Lors de l 'ouverture de la couche graphique combinée, les propriétés Layer peuvent être ajoutées à l' intérieur de celle - ci, et des couches d 'image possédant les mêmes propriétés Layer adjacentes sont fusionnées pour améliorer les performances.

####3.4 retrait de la couverture

Si le revêtement de la couche inférieure est masqué et que le bloc de blocage n 'est pas transparent, la partie masquée est enlevée directement sans être rendue, ce qui permet d' améliorer les performances.

L 'ouverture de la couverture est enlevée de la manière suivante:


```java

//移除被非透明地块覆盖的部分
this.tMap.removeCoveredTile = true;
```


**Tips**- Oui.

Il est impossible de faire fonctionner la partie enlevée après l 'ouverture.Par conséquent, il faut confirmer avant d 'activer la fonction que la partie enlevée n' est plus opérationnelle.

####Conditions préalables à l 'ouverture de removecoveredtile

Si ce n'est pas dans tiled Map,`图块`Set`type`La propriété n 'est donc pas valable même si elle est activée.Par conséquent, avant d 'ouvrir, il est nécessaire d' ajouter un type d 'attribut personnalisé pour le bloc de diagramme dans l' éditeur tiledmap et de le définir comme 1.

**Procédé de réglage d 'un type de bloc de diagramme dans tiled - map**

Dans le panneau de bloc de plan, cliquez sur l 'édition de bloc de diagramme et ouvrez le panneau d' édition de terrain de bloc de diagramme.Comme le montre la figure 15 - 1.

![图15-1](img/15-1.png) 


(Figure 15 - 1)

Dans le panneau d 'édition de terrain de blocs de graphiques, sélectionnez le terrain, dans la barre d' attributs personnalisée, cliquez sur`+`Icône n.`int`Type`type`PropriétésPuis cliquez sur OK pour ajouter.Comme le montre la figure 15 - 2.


![图15-2](img/15-2.png) 


(Figure 15 - 2)

Après ajout, définissez la valeur de propriété type 1.Comme le montre la figure 15 - 3.

![图15-3](img/15-3.png) 


(Figure 15 - 3)

Dès que le type d 'attribut personnalisé est défini comme 1, après l' ouverture de removecoveredtile.Lorsque le masquage est invisible, on peut l 'enlever pour améliorer les performances.





##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../../../wechatPay.jpg)