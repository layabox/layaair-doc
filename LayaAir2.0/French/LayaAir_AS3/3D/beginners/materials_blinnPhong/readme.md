##Matériau blinnphong de layaair3d

###Résumé des matériaux

Dans la version antérieure du moteur layaair - 3D (avant la version 1.7.12), les matériaux de modélisation ne prenaient en charge que les matériaux standard traditionnels pbrstandard Material et, à l'Unity, les Inserts étaient exportés en tant que matériaux standard (à l'exception des matériaux particulaires), quel que soit le type de shader utilisé pour Les matériaux de modélisation.

Étant donné que les normes et autres matériaux de l'Unity diffèrent de ceux de layaair, l'utilisation par les concepteurs des ressources 3D exportées peut avoir des effets artistiques différents de ceux de l'Unity, et les concepteurs ont du mal à obtenir les effets souhaités en modifiant les paramètres d'attribut des matériaux ou en ajustant les lumières dans le Code.

Afin d 'aligner les performances du moteur layaair sur celles de l' Unity, l 'ajout officiel de matériaux blinnphongmaterial dans les connecteurs d' exportation de l 'Unity et dans les moteurs permet aux concepteurs d' obtenir des résultats immédiats, de réduire le temps nécessaire pour modifier les effets du Code et d 'améliorer l' efficacité du fonctionnement.Il est donc recommandé que ce matériau soit utilisé dans toute la mesure possible lors de la mise au point ultérieure.



###Création de matériaux blinnphong

Le Code crée un matériau blinnphong conforme au matériau standard et peut créer un exemple de celui - ci directement ou créer une ressource de matériau connexe par le biais du procédé blinnphongmaterial.load () et l 'utiliser dans le modèle.Ses propriétés photochromes sont modifiées de la même manière que celles des matériaux standard, à l 'exception de types de matériaux différents.


```java

//添加自定义模型
var box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1)));
box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
//创建材质
var material = new Laya.BlinnPhongMaterial();
Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex) {
  material.albedoTexture = tex;
}));
//加载材质资源方法创建
// var mat = Laya.BlinnPhongMaterial.load("truck/Assets/Materials/t0200.lmat")
//为模型赋材质
box.meshRenderer.material = material;
```




###Utilisation de matériaux blinnphong dans l'Unity

Le moteur layaair supporte la création de matériaux blinnphong à partir de la version 1.7.12 et du module d 'exportation untiy à partir de la version 1.7.0, de sorte que les concepteurs ont besoin de télécharger de nouveaux moteurs et de nouveaux connecteurs pour expérimenter de nouvelles fonctions.L 'étape de montage de 1.7.0 dans l' élément correspond parfaitement à la méthode de montage de la version précédente.

####La scène se transforme en matériaux blinnphong.

Une fois installé le nouveau module, une touche a été ajoutée au menu untiy layaair3d pour convertir le matériau de scène en fonction de matériau blinnphong (fig. 1), et un clic sur l 'option layaair Tool - > Switch Shader to layablinnphong permet de constater que le modèle de l' interface ressources se transforme en violet et que les effets de la scène changent, ce qui montre que le type de matériau a été modifié avec succès.

![图片1](img/1.png)<br>（图1）


La souris sélectionne n 'importe quel modèle dans la scène, et nous voyons apparaître un nouveau type de matériau Shader dans le panneau Inspector à droite (fig. 2).Les propriétés du matériau diffèrent de celles du standard Standard Material de l 'Unity, ce qui simplifie considérablement les choses et supprime certaines des propriétés que layaair ne supporte pas.Nous pouvons modifier l 'affichage du modèle en modifiant ces propriétés.

![图片2](img/2.png)< br > (Figure 2)



####Manuel pour le matériau blinnphong

En règle générale, nous recommandons d 'utiliser une touche dans le menu pour convertir tous les matériaux de la scène en matériaux blinnphong, de sorte que tous les matériaux de la scène soient modifiés et qu' il n 'y ait pas de cas où un matériau n' est pas trouvé ou ignoré, ce qui entraîne des changements.

Bien entendu, lors de la création d 'un nouveau matériau, le matériau standard est généré par défaut, lorsque le type Shader du matériau doit être modifié manuellement par l' développeur sous la forme de blinnphong.Une fois que nous avons installé le module, les options layaair3d apparaissent dans le type Shader du panneau de matériau pour nous permettre de les modifier.(Figure 3)

![图片3](img/3.gif)< br > (Figure 3)





###Mode de rendu de matériaux blinnphong

Le modèle de rendu du matériau rendermode est principalement utilisé pour les performances du matériau, par exemple les différents effets transparents et translucides.

L 'insert d' exportation fournit une interface de modification de matériau blinnphong qui peut modifier directement le mode de rendu et qui est réduite dans le matériau blinnphong, ce qui permet de synthétiser plusieurs types d 'utilisation courante.Grâce à ses modifications, les développeurs peuvent facilement réguler les effets du matériau.

Sélectionnez différents types, et les options Advanced Properties dans le panneau de matériaux blinnphong seront également différentes.

Description du type:

**Opacité du matériau opaque**".Sans effet transparent, le modèle n 'aurait pas d' effet translucide même s' il y avait une transparence dans l 'image.

**Coupe transparente de matériau cutout**".Une découpe transparente est effectuée sur la base de la valeur Alpha des pixels transparents dans l 'autocollant, et les valeurs Alpha transparentes peuvent être ajustées en fonction des circonstances dans l' utniy, avec une transparence partielle inférieure à une certaine valeur Alpha (fig. 4).

Si vous voulez éliminer l 'effet de scie, sélectionnez le type de transparent avec une performance légèrement inférieure.

![图片4](img/4.png)< br > (Figure 4)

**Transparent Materials translucidity**".Le rendu translucide est effectué sur la base des valeurs alpha de pixel dans le diagramme, l 'effet de transparence est compatible avec l' effet alpha de pixel et l 'effet de déconnexion est meilleur.

**Mélange transparent et coloré de matériau addive**".Les couleurs d 'un modèle dont la face positive et la face arrière se recoupent pour obtenir un effet transparent élevé (fig. 5).

![图片5](img/5.png)< br > (Figure 5)



**Effet personnalisé de matériau Custom**".Les quatre modes de rendu comprennent essentiellement la plupart des effets du développement du jeu, et si l 'on ne répond pas aux besoins des concepteurs en matière d' art, on peut également réaliser des réglages de rendu personnalisés custom.

Dans les quatre types de modèles, les options Advanced Properties sont essentiellement des paramètres fixes qui ne peuvent pas être modifiés.Dans la définition de Custom, les développeurs peuvent modifier manuellement leurs valeurs paramétriques, ce qui permet d 'obtenir les effets artistiques souhaités par les développeurs dans les modifications de réglage répétées.

![图片6](img/6.png)< br > (Figure 6)



###Propriétés d 'autocollants photochromes de matériaux blinnphong

Les propriétés de l 'autocollant photochrome du matériau blinnphong sont sensiblement identiques à celles du matériau standard et les caractéristiques suivantes peuvent être ajustées dans l' unité:

**Diffuse reflectance Color and Sheet**".

**Couleur haute lumière et dessin.**La barre de réglage de la plage de lumière élevée est augmentée et la plage de lumière élevée peut être réglée même sans l 'utilisation d' un autocollant.

**Des cartes normales.**

Lorsque l 'affichage de couleur optique ci - dessus est installé dans untiy, il est possible d' exporter directement le chargement ou d 'appuyer sur le bouton layaair Run dans l' insert d 'exportation.On peut constater que les effets des beaux - arts dans le Navigateur sont compatibles avec ceux de la vue de la caméra à l 'Unity.
