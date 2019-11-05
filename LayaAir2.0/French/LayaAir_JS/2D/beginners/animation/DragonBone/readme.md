# LayaAir引擎播放DragonBones动画

> Cet article est basé sur la version layaairide 2.0.0 de l 'illustration.

L 'animation squelette dragonbones est l' une des animations squelettiques fréquemment utilisées dans le jeu.



###Export of the original dragonbones Skeletal Animation

####1.1 Les paramètres de texture au moment de l'exportation doivent être des ensembles de textures

L 'outil de conversion dragonbones de layaairide ne supporte que la conversion d' animation squelettique de dragonbones en mode graphique, de sorte qu 'il doit être exporté à l' aide de l 'outil d' édition d 'animation squelettique dragonbones.`纹理设置`A`纹理类型`Options`纹理集`Voir la figure 1.

![图1](img/1.png) 


(Figure 1)

####1.2 version dragonbones exportée

La conversion n'est pas toujours appuyée par toutes les versions de dragonbones.Les numéros de version sont à layaairide.`龙骨转换工具`Affiche le panneau, comme le montre la figure 2.

![图2](img/2.png) 


(Figure 2)

A la fin de ce document, dragonbones avait pris en charge la version 5.1 à partir de la version 4.5.Le layaairide est suivi d 'une mise à jour régulière du support de la version dragonbones, et les développeurs peuvent s' intéresser à la modification de l' état de support de la version sur le tableau d 'outils de conversion.



###Conversion de l 'animation dragonbones en format d' identification du moteur layaair

####2.1 ouverture du panneau d 'outils de conversion

À layaairide.`设计模式`, cliquez sur la barre de menu`工具`]`龙骨动画转换`, vous pouvez l 'ouvrir comme le montre la figure 3.`DragonBones格式转换`Des outils.

![图3](img/3.png) 


(Figure 3)



####2.2 création de fichiers d 'animation squelettique avec un suffixe SK

Ouvre.`龙骨格式转换`Liste des ressources exportées par dragonbones après le panneau d 'outils`拖入`Sur le panneau de conversion ou cliquer`浏览`Le bouton sélectionne le Répertoire de ressources exporté par dragonbones.Puis cliquez`确定`, c 'est - à - dire qu' elle peut être générée dans le Répertoire de ressources d 'origine`.png`Et`.sk`Suffixe de deux fichiers identiques.Comme le montre la figure 4.

![图4](img/4.png) 


(Figure 4)



###Affichage de chargement d 'animations dragonbones

####3.1 copier les ressources d'animation dragonbones converties dans le répertoire correspondant au projet.

On a créé le même nom que l'outil de transformation des os de dragon.`.sk`Et`.png`Les fichiers de suffixe sont copiés dans la table des matières des articles, comme le montre la figure 5.* Les fichiers originaux exportés par l'outil de dragon ne sont pas utilisés, mais seulement pour les outils de conversion.*

![图5](img/5.png) 


(Figure 5)

####3.2 exemples d'animation dragonbones

L 'exemple suivant sera utilisé`laya.ani.bone.Skeleton`Catégorie, l 'API précise que les liens peuvent être consultés directement:[https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton](https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton)

Crée dragonbonesdemo.js, Code rédigé comme suit:


```java

//初始化舞台
Laya.init(1334,750);
//创建一个Skeleton对象
var skeleton = new Laya.Skeleton();
//添加到舞台
Laya.stage.addChild(skeleton);

skeleton.pos(600,350);

//通过加载直接创建动画
skeleton.load("res/DragonBones/rooster/Rooster_Ani.sk");
```

Les effets de fonctionnement sont indiqués à la figure 6.

![动图6](img/6.gif) 


(Figure 6)