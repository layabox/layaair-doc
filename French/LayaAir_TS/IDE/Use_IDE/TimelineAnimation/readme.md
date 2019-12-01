#Time axe Animation Editor

*Note: ce programme est basé sur la version layaairide 1.73 et, en cas de divergence, sur la version la plus récente de layaairide.*

> l 'éditeur d' animation d 'axe temporel est le module central de layaairide, qui produit automatiquement des trames d' animation en mouvement en produisant des trames clefs sur l 'axe temporel, ce qui permet d' obtenir rapidement des effets d 'animation tels que la transparence Alpha dans le jeu, le déplacement, la rotation, la mise à l' échelle, etc.Une grande partie du temps des producteurs a été économisée, ce qui a permis d 'améliorer l' efficacité du développement.This paper from creating time axis animation to Coding application, An Introduction of the Function and use of Time axis Animation Editor.
]



#Création d 'une animation à axe temporel

　**Il y a deux façons de créer une animation d 'arbre de temps**".Créer`.ani`L 'animation de l' axe temporel du fichier, l 'autre sur la page ui ((`.ui`Créer une animation d 'axe temporel

Les deux fichiers produisent l'animation de l'axe temporel de la même manière.**Distinction**Seulement`.ani`L 'animation de l' axe temporel créée dans le fichier peut être utilisée sur d 'autres pages ui, tandis que l' animation de l 'axe temporel créée sur la page ui ne peut être utilisée que sur la page ui active.

Pour l 'animation d' axe temporel universel`.ani`Créer dans le fichierCet article`.ani`Le mode de fichier est un exemple.

**Tips**- Oui.

Si vous créez une animation d'axe temporel sur la page ui, vous devez d'abord`场景编辑器`Sélectionnez l 'ensemble d' animation à éditer, puis cliquez sur`动画编辑模式`, puis une opération d 'édition d' animation.

- production d'animations d'axes temporels sur la page ui;`动画编辑模式`Lorsque vous cochez l 'état, vous ne pouvez pas glisser le composant directement dans l' état`场景编辑器`Il faut se retirer.`动画编辑模式`, glisser l 'ensemble ui à utiliser avant`场景编辑器`Et puis on y retourne.`动画编辑模式`Édition.

​

###Créer un fichier d 'animation à axe temporel Ani

**Mesure 1**: dans le gestionnaire de projets,`右键`Dans le menu`新建`- >`动画`Voir la figure 1.

![1](img/1.png)<br/>(图1)




**Mesure 2**: cliquez sur le bouton gauche`动画`Après, l 'animation de l' axe temporel est projetée pour créer le panneau.Sélectionner le type graphicenimation dans le panneau`动画名称`, cliquez`确定`Voir la figure 2.

![2](img/2.png)< br / > (Figure 2)

*Tips: description des colonnes dans le panneau, prière de se référer au document "pour plus de détails sur les pages ui, les particules, l 'animation, le nouveau panneau de script"*

Cliquez sur OK, c 'est terminé.`TimeLine.ani`Créer un fichier d 'animation et l' ouvrir automatiquement pour entrer dans le mode d 'édition d' animation.Comme le montre la figure 3.

![3](img/3.png)<br/>(图3)


**Tips**- Oui.

- ouvre.`.ani`Ou`.ui`Documentation`时间轴`Panneau`帧属性`Le panneau est situé par défaut en dessous de l 'idee, la réalisation de l' animation de l 'axe temporel, les deux panneaux doivent être utilisés ensemble, si vous ne trouvez pas ou ne l' éteignez pas accidentellement, appuyez sur le raccourci clavier`F3`Restaure la disposition du panneau par défaut.

- Oui.`.ani`Dans le fichier, les coordonnées initiales de la zone d 'édition de scène`0,0`) le point est situé au centre de l 'intersection des deux lignes rouges.À la différence du coin supérieur gauche du document ui, il faut faire attention.


###  

###1.2 Création d 'une animation d' axe temporel décalée

####1.2.1 modification du nom de l'axe temporel

![4](img/4.png)<br/>(图4)


Vous pouvez gérer plusieurs effets d 'animation dans un panneau d' axe temporel, par défaut avec ani1, ani2...Pour faciliter la distinction de mémoire, nous devons modifier le nom de l 'effet mobile, par exemple en créant l' effet mobile du déplacement.Les modifications n'ont pas besoin d'être actualisées et entrent en vigueur immédiatement, comme le montre la figure 5.

![5](img/5.png)< br / > (Figure 5)



####1.2.2 accès au mode d 'édition des animations

L 'effet d' animation actuel ne peut être édité que si le mode d 'édition d' animation est sélectionné.Lorsque vous entrez dans le mode d 'édition, par défaut sur une trame zéro, comme le montre la figure 6.* Les animations d 'axe temporel commencent par zéro trame *.

![6](img/6.png)< br / > (Figure 6)



####1.2.3 importation de ressources d 'animation

Dans le panneau de ressources, la ressource de bitmap (ensemble image) est traînée dans le panneau d 'édition d' animation et une trame clef est créée automatiquement sur une trame zéro.Comme le montre la figure 7.

![7](img/7.png)< br / > (Figure 7)

Figure 7`GraphicNode:2`Représente chaque noeud d 'animation sélectionné`第0帧`Je vois.`2`Est la valeur de l 'objet cible.



####1.2.4 création de trames clefs

Il y a trois façons de créer une trame clé.Crée automatiquement une touche droite dans un panneau hiérarchique, crée une touche droite dans un éditeur de scène, et modifie toute valeur d 'attribut du composant.

**Création d 'un panneau de niveau**

Après avoir sélectionné une trame, sélectionnez un noeud de composant dans le panneau hiérarchique,`右键`- >`创建关键帧`Voir la figure 8 - 1.
![8-1](img/8-1.png)< br / > (Figure 8 - 1)

**Création de touche droite dans l 'éditeur de scène**

Dans l 'éditeur de scène, sélectionnez les composants de la scène`右键`- >`创建关键帧` 

![8-2](img/8-2.png)< br / > (figures 8 et 2)



**Création automatique**

Dans l 'éditeur de scène, le composant sélectionné crée automatiquement la trame clé en modifiant toute valeur d' attribut du composant.

Dans ce cas, nous utilisons le troisième mode de création.Sélectionnez d 'abord avec la souris`第20帧`, puis modifier la propriété de l 'axe X comme suit:`160`, une trame clé est générée automatiquement dans la vingtième trame et un axe X est créé avec succès à partir de la vingtième trame.`0`A.`160`Animation de déplacement d 'axe temporelComme le montrent les figures 8 à 3.

![8-3](img/8-3.png)<br/>(图8-3)







####1.2.5 animation d'axes temporels

Les boutons de l 'animation sont successivement les suivants:`首帧`Bouton`上一帧`Bouton`播放/暂停`Bouton`下一帧`Bouton`尾帧`(* dernière trame clé *)`循环播放`BoutonLes effets de l 'animation sur différents boutons sont indiqués dans la figure 9.

![9](img/9.gif)<br/>(动图9)


**Bouton de démarrage**: la première trame du pointeur de lecture après clic vers l 'axe temporel (* trame 0 *).

**Bouton de la précédente trame**: le pointeur de lecture après clic se déplace vers la trame précédente de la trame active.Si la trame active est la première, le pointeur de lecture est déplacé vers la dernière trame de la trame principale.

**Pause.**: après clic, l 'effet d' animation commence à être diffusé à partir de l 'emplacement de la trame courante et s' arrête à la dernière trame critique.Cliquez sur le bouton pour suspendre la lecture de l 'animation, cliquez à nouveau sur le lecteur, et la lecture se poursuivra à partir de la trame où la pause est suspendue.

**Bouton de trame suivant**: après clic, le pointeur de lecture se déplace vers la trame suivante de la trame actuelle.Si la trame active est la dernière trame de la trame principale, le pointeur de lecture est déplacé vers la première trame.

**Bouton de trame arrière**: le pointeur de lecture après clic est déplacé vers la dernière trame de la trame clé de l 'axe temporel.

**Bouton de lecture**Lorsque vous cliquez sur le bouton de lecture, l 'animation est répétée et le clic du bouton de recyclage annule l' état de lecture cyclique.







　　



###1.3 animation par panneau d 'attributs

Dans le panneau d 'attributs du composant, il existe un certain nombre d' attributs associés à la réalisation d 'un effet d' animation.

####1.3.1 augmentation de l 'effet d' animation rotative

Par exemple, nous produisons un effet d 'animation de rotation mobile en modifiant le point d' axe et l 'angle de rotation sur la base de l' animation du dernier déplacement.Comme le montre la figure 10.

![10](img/10.gif)< br / > (Figure 10)

**Étapes opérationnelles:**

Sélectionnez la dernière trame clé (la vingtième trame), sélectionnez l 'ensemble pour modifier la valeur du panneau d' attributs:`x`Valeur 235,`y`100.`pivotX`50.`pivotY`100.`rotation`Valeur: 270.Cliquez sur lecture.

**Description des attributs:**

`x`Et`y`Est la coordonnées de position du composant.

`pivotX`Et`pivotY`Est les coordonnées axiales X et y de l 'ensemble.

`rotation`Est l 'angle de rotation du composant.



####1.3.2 augmentation de l'effet d'animation à l'échelle

Sur la base de l 'animation précédente, on peut voir l' effet d 'agrandissement de l' animation de l 'axe temporel en modifiant le rapport d' agrandissement, comme le montre la figure 11.

![11](img/11.gif)<br/>(动图11)


**Étapes opérationnelles:**

Sélectionnez la dernière trame clé (la vingtième trame), sélectionnez l 'ensemble, modifiez la valeur du panneau d' attribut`scaleX`Et`scaleY`La valeur est égale à 0,3.Will`rotation`Modifier pour 360

**Description des attributs:**

`scaleX`是组件的水平方向缩放，默认值为1，不缩放。

`scaleY`Est l 'agrandissement vertical de l' ensemble, la valeur par défaut est 1, sans agrandissement.



####1.3.3 augmentation de l 'effet graduel transparent de l' animation

Les effets graduels transparents sont également l 'un des effets d' animation usuels, et la modification des valeurs Alpha permet facilement d 'obtenir des effets graduels transparents tels que le dilatation.Nous continuons sur la base de la dernière animation.Les résultats sont présentés dans la figure 12.

![12](img/12.gif)<br/>(动图12)


**Étapes opérationnelles:**

Sélectionnez la dernière trame clé (la vingtième trame), sélectionnez l 'ensemble, modifiez la valeur du panneau d' attribut`scaleX`Et`scaleY`Modifier la valeur pour 0,2.Will`rotation`Modifier pour 720.`alpha`Définit comme 0.

**Description des attributs:**

`alpha`Est la propriété de transparence, par défaut 1, opaque.0 pour une transparence totale, la plage de valeurs des propriétés est de 0 à 1.



####1.3.4 paramètres d 'effet d' animation de point d 'axe

#####Créer une nouvelle animation d 'axe temporel

Pour distinguer les effets de déplacement qui viennent d 'être observés, nous cliquerons sur l' icône plus pour créer une animation d 'axe temporel, comme le montre la figure 13 - 1.

![13-1](img/13-1.png)<br/>(图13-1)


Après la création, changer le nom de l 'animation en pivot, nous pouvons voir la nouvelle création dans la liste des animations`pivot`Animation et original`move`L 'animation, comme le montre la figure 13 - 2, permet de Commuter les différentes animations en cliquant sur les noms de la liste.

![13-2](img/13-2.png)< br / > (Figure 13 - 2)



#####Créer une animation centrée sur le point central

Lorsque le point d 'axe n' est pas fixé, l 'axe est par défaut situé dans l' angle supérieur gauche de l 'ensemble, lorsque nous faisons une rotation, comme le montre la figure 14 - 1.

![14-1](img/14-1.gif)< br / > (Figure 14 - 1)

Si l 'on veut que la rotation du point central de l' image fonctionne, on peut la réaliser de deux façons.

**Mise en oeuvre par ancrage**

Le point d 'ancrage est réglé en proportion de la longueur maximale de l' axe X ou y du composant, la valeur d 'extraction étant`0-1`Entre nous`anchorX`Et`anchorY`Tous les attributs`0.5`, les coordonnées de point d 'axe sont obtenues à 50% de la longueur de l' axe X et de l 'axe Y.Ainsi, une valeur d 'angle de rotation est définie dans la trame de queue d' axe temporel`rotation为360`Ainsi, on obtient un effet de rotation centré sur le point central, comme le montre la figure 14 - 2.

![14-2](img/14-2.gif)<br/>(动图14-2)


**Tips**- Oui.*Le point d 'ancrage est un moyen très pratique et rapide de régler l' axe.Cependant, le mode d 'ancrage ne permet de fixer que des points d' axe pour l 'ensemble ui, et le point d' axe pour l 'ensemble Graphics et les éléments de base 2D tels que Sprite ne peut être réalisé que par un second mode.*



**Second type: Implementation through axial point attributs**

Nous voulons faire pivoter l 'axe par le point central, mais aussi par le Centre de l' ensemble d 'attributs de point d' axe.`110*145`Alors, on divise la largeur initiale de 2 et on obtient la position centrale.`pivotX`Valeur d 'attribut`55`Oui.`pivotY`Valeur d 'attribut`72.5`".L 'animation est ensuite projetée, comme le premier procédé.Comme le montre la figure 14 - 3.

![14-3](img/14-3.gif)<br/>(动图14-3)


**Tips**- Oui.*Le point central est un point d 'axe qui nécessite un calcul simple et un peu plus difficile que le point d' ancrage.Cependant, l 'application de l' approche axiale est plus large et permet non seulement de configurer les composants, mais aussi de configurer les récipients et les Sprite.*



####1.3.5 paramètres d 'effet d' animation à angle d 'inclinaison

#####Système de coordonnées d 'attributs d' inclinaison

Les coordonnées skewx et skewy sont différentes des coordonnées habituelles.**Horizontal y, vertical X**".Comme le montre la figure 15.

![15](img/15.png)< br / > (Figure 15)

Pour faciliter la compréhension des variations d 'angle d' inclinaison entre skewx et skewy.Nous utilisons directement l 'animation de l' axe temporel.

#####Démonstration d 'effet d' inclinaison de skewx

Opération`第0帧`Aucun effet.`第20帧`Définir skewx comme`30`, l 'arbre skewx du composant est déformé dans le sens inverse de l' aiguille horaire après clic sur lecture.Comme le montre la figure 16 - 1.

![16-1](img/16-1.gif)< br / > (Figure 16 - 1)

**Tips**- Oui.*Si la valeur skewx est négative, l 'axe X de l' ensemble est déformé dans le sens de l 'aiguille temporelle.*

#####Démonstration d 'effet d' inclinaison de skewy

Opération`第0帧`Aucun effet.`第20帧`Définir skewy comme`30`Après avoir cliqué sur la lecture, l 'arbre skewy du composant est déformé dans le sens de l' aiguille horaire.Comme le montre la figure 16 - 2.

![16-2](img/16-2.gif)<br/>(动图16-2)


**Tips**- Oui.*Si la valeur skewy est négative, le bord de l 'axe y de l' ensemble est déformé dans le sens inverse de l 'aiguille temporelle.*

#####Skewy et skewy.

Opération`第0帧`Aucun effet.`第20帧`Définir skewx comme`30`, skewy définit comme`20`Lorsque vous cliquez sur la lecture, l 'aiguille skewx du composant se déplace, l' axe skewy se déplace dans le sens de l 'aiguille temporelle, et l' ensemble Extrusion est déformé.Comme le montre la figure 16 - 3.

![16-3](img/16-3.gif)< br / > (figures 16 à 3)

#####Animation inclinée sans déformation

Les exemples précédents sont des effets de déformation résultant d 'un changement d' angle d 'inclinaison lorsque la valeur d' attribut skew est positive, et si la valeur d 'attribut skew est négative, la direction de la déformation est inverse.Ainsi, lorsque le skewx utilise le même angle numérique que le skewy, l 'une des propriétés est positive et l' autre négative.Ainsi, l 'angle d' inclinaison et la direction sont identiques sans déformation.Voici un simple effet d 'horloge pour montrer l' effet d 'animation incliné sans déformation.

Opération`第0帧`Set`skewX`Pour`-50`Oui.`skewY`Pour`50`".Trame 15`skewX`Pour`10`Oui.`skewY`Pour`-10`".Trame 30`skewX`Et`skewY`La valeur est conforme à la première trame.Cliquez sur l 'effet de lecture après paramétrage, comme le montre la figure 16 - 4.

![16-4](img/16-4.gif)<br/>(动图16-4)







##Présentation par l'éditeur d'animation

Il y a deux concepts fondamentaux dans l 'éditeur d' animation: afficher la couche de noeud et la couche d 'attribut de noeud.Comme le montre la figure 17,`GraphicNode`Pour afficher le noeud, le nombre suivant est l 'id de l' objet cible, chaque élément d 'animation supplémentaire dans la scène d' animation ajoutant un noeud d 'affichage correspondant à l' axe temporel.Cliquez sur le bouton d 'extension à gauche de la couche de noeud (* Triangle *) pour voir toutes les propriétés d' animation du noeud`skewY`Et`skewX`Est une propriété d 'animation inclinée à réaliser dans l' animation d 'axe temporel, chaque attribut d' animation supplémentaire étant ajouté à la couche de noeud d 'affichage.

![17](img/17.png)< br / > (Figure 17)

###2.1 animations ajoutées et supprimées

L'exemple précédent a été adopté.`+号`Le bouton affiche de nouvelles opérations d 'animation d' axe temporel vides, mais nous pouvons également ajouter une nouvelle animation comme l 'animation originale qui peut être étendue et ajustée sur la base de l' animation originale en répétant le bouton d 'animation.Comme on peut le voir dans la liste des animations de la figure 18, le nouveau nom d 'animation est reproduit de la manière suivante. "`原动画名_0,原动画名_1,.....`Par exemple, à la figure 18,`skew_0`Et`skew_1`Copier`skew`Oui.`skew_0_0_0`Copier`skew_0_0`".Vous pouvez également modifier le nom d 'animation par défaut dans le panneau d' attributs de trame.

![18](img/18.png)< br / > (Figure 18)

Cliquez sur le bouton Supprimer pour indiquer si l 'animation active est supprimée et cliquez sur la confirmation, comme le montre la figure 19 - 1.

![19-1](img/19-1.png)< br / > (Figure 19 - 1)

**Tips**- Oui.**Notez que la suppression de l 'animation de l' axe temporel ne fait que supprimer les effets et les attributs de l 'animation sur l' axe temporel, sans supprimer les noeuds d 'animation dans la scène**".En particulier, lorsque nous supprimons également la dernière animation, il apparaît plus clairement que le noeud n 'a pas été supprimé, comme le montre la figure 19 - 2.

![19-2](img/19-2.png)< br / > (figures 19 - 2)



###2.2 ajout et suppression d 'animations multinoeuds

####2.2.1 nouvelles couches de noeuds et désignation de noeuds

Une démonstration d 'animation d' axe temporel a été effectuée jusqu 'à présent par un noeud, et maintenant nous répétons une nouvelle animation skew, puis nous glissons un nouveau composant sur la scène.Ajouter automatiquement une nouvelle couche de noeud

Comme plusieurs noeuds apparaissent en parallèle, il est difficile de distinguer les noeuds qui fonctionnent dans la scène.C 'est pourquoi nous avons sélectionné le noeud pour définir la valeur d' attribut du nom dans le gestionnaire d 'attributs, comme le montre la figure 20.

![20](img/20.png)< br / > (Figure 20)

####2.2.2 animation multinodale

Sur la couche de noeud supplémentaire, nous pouvons configurer des trames clefs à des emplacements complètement différents de ceux de la couche de noeud précédente, en fonction des besoins réels, par exemple, notre couche de noeud produit une animation transversale qui positionne intentionnellement la deuxième trame clef à l 'emplacement de la treizième trame.Une fois l 'animation terminée, l' effet est indiqué dans le diagramme 21.* Les opérations de base décrites ci - dessus ne seront plus précisées *.

![21](img/21.gif)< br / > (Figure 21)

**Tips**: Puisque l 'animation transversale de l' invention se trouve dans la zone de coordonnées négatives.Il convient ici de préciser.`时间轴动画的负坐标区域内，无法触发点击事件`, si l 'interaction d' événements de clic est nécessaire, l 'animation X et y doit être située dans la zone de coordonnées positives, c' est - à - dire la zone inférieure droite de l 'intersection de la Croix Rouge.

####2.2.3 supprimer les nœuds

![22-1](img/22-1.png)< br / > (figures 22 - 1)

Si nous choisissons le noeud, le bouton droit`删除`, le noeud actif ne peut pas être supprimé comme les attributs de noeud supprimés, mais seulement les effets d 'animation et les attributs de noeud produits dans le noeud actif.Comme le montre la figure 22 - 2.

![22-2](img/22-2.png)< br / > (figures 22 - 2)

Comment supprimer le noeud?Avoir besoin de`层级`Sélectionnez le noeud à supprimer dans le panneau, puis appuyez sur le bouton droit`删除`Voir les figures 22 à 3.Afficher`是否删除`Clic`确定`Ça suffit.Mais si**Il y a plusieurs animations dans la liste des animations**Il est important de savoir si les noeuds que vous avez supprimés sont également utilisés dans d 'autres animations, car la suppression des composants affecte toutes les animations.**Une fois supprimé, le noeud et l 'animation dans les autres animations disparaissent également.**

![22-3](img/22-3.png)< br / > (figures 22 - 3)





###2.3 caractéristiques du noeud et paramètres d 'effet de ralentissement

Sous la couche de noeud est une couche d 'attribut de noeud, sélectionnez une trame d' attribut de noeud pour voir les propriétés de trame détaillées, comme le montre la figure 23.

![23](img/23.png)< br / > (Figure 23)

####Description des propriétés de trame d 'un noeud

`x`: X est le nom d 'attribut et - 260 la valeur de la trame active.Si vous sélectionnez skin, le nom d 'attribut skin et la valeur correspondante sont affichés.Cette colonne ne peut pas être modifiée.

`标签label`: lorsque la barre est réglée, la trame peut être manipulée au moyen d 'un code par l' intermédiaire d 'un nom d' étiquette dans un article.Lorsque l 'étiquette est réglée, la trame de l' étiquette présente un point de cercle rouge, comme le montre la figure 24.

![24](img/24.png)<br/>(图24)


`是否缓动`: Vous pouvez sélectionner si vous utilisez ou non l 'effet de ralentissement, par défaut l' état de sélection.

`缓动类型`: par défaut, linearnone ralentit, d 'autres développeurs d' effet ralenti peuvent l 'utiliser dans leur propre expérience.

**Tips**- Oui.*L 'effet de ralentissement intervient dans l' emplacement de base de la trame de démarrage de l 'animation active, une attention particulière étant accordée à ceux qui doivent changer le type de ralentissement.*



###2.4 animation par trame

L 'animation par trame est également l' une des animations usuelles du jeu.Il existe deux modes de réalisation d 'animation par trame dans l' axe temporel.

#####Un premier mode de création continue de trames clés

Première étape: glisser l 'ensemble de la première trame dans l' éditeur de scène.Deuxième étape: création continue de trames clefs dans l 'axe temporel.Comme le montre la figure 25 - 1.

![25-1](img/25-1.png)<br/>(图25-1)


Troisième étape: remplacer les propriétés Skin (peau) de chaque trame, comme le montre la figure 25 - 2.Puis cliquez sur la lecture pour voir l 'effet de l' animation.

![25-2](img/25-2.gif)< br / > (Figure 25 - 2)

**Tips**- Oui.*Si l 'ensemble est traîné par lots sur l' axe temporel, plusieurs noeuds d 'animation apparaissent dans la scène.Pas l 'effet d' animation par trame souhaitée.*

#####Second mode: création en une seule fois

L 'ensemble sélectionné par lots est traîné sur l' arbre temporel, ce qui crée directement une animation par trame complète, ce qui est plus rapide.Comme indiqué dans l 'animation 25 - 3.

![25-3](img/25-3.gif)<br/>(动图25-3)







###2.5 barres fonctionnelles de base

![26](img/26.png)< br / > (Figure 26)

Dans la barre de fonction inférieure de l 'éditeur d' animation d 'axe temporel, spécifiez ce qui suit:

`帧率：`24 trames par défaut, la vitesse de trame de lecture peut être modifiée en modifiant le débit de trame.

`加载后：`Sélectionnez une action différente et exécutez l 'opération correspondante après le chargement.Les trois options de non - lecture, d 'une lecture et d' une lecture cyclique, par défaut.

*Tips: Cette disposition n 'est valable que pour l' édition d 'animation dans l' axe temporel de l 'ui et non pour l' édition animée du fichier Ani.*

`帧：`Affiche la trame active par défaut, saisissez le nombre de trames cibles et retournez à la voiture, et sautez directement sur le nombre de trames cibles.

`圆形滑动条：`Pour régler l 'espacement d' affichage entre la trame sur l 'axe temporel et la trame.Voir la figure 27 - 1.

![27-1](img/27-1.gif)< br / > (Figure 27 - 1)

`矩形滑动条：`Glisser le curseur pour déplacer l 'axe temporel afin de glisser la trame sur l' axe temporel d 'affichage.Voir la figure 27 - 2.

![27-2](img/27-2.gif)< br / > (Figure 27 - 2)







##Utiliser l 'axe temporel d' animation

###3.1 animation d 'axes temporels exportés

Appuyez sur le raccourci FDE F12 ou Ctrl + F12 pour produire une animation d 'axe temporel,`.ani`Fichier généré`项目根目录/bin/`Table des matièresEmplacement de l 'Atlas des ressources utilisées dans l' animation`项目根目录/bin/res/atlas/`Voir la figure 28.

![28](img/28.png)< br / > (Figure 28)

###3.2 utilisation d'animations à axes temporels dans les projets

L 'utilisation de l' animation de l 'axe temporel dans le projet se divise en trois étapes.

Première étape: charger l 'Atlas requis pour l' animation.


```typescript

//加载图集成功后，执行onLoaded回调方法
Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,this.onLoaded));
```


Deuxième étape: création d 'un exemple d' animation chargé d 'un fichier d' animation


```typescript

//创建一个Animation实例
var tl:Laya.Animation = new Laya.Animation();
//加载动画文件
tl.loadAnimation("TimeLine.ani");
```


Troisième étape: ajouter l 'animation à la scène


```typescript

//添加到舞台
Laya.stage.addChild(tl);
//播放Animation动画
tl.play();
```


L'exemple complet est le suivant:

**Entrées gamemain.ts**


```typescript

// 程序入口
class GameMain{
    constructor()
    {
        //初始化引擎
        Laya.init(1334,750,Laya.WebGL);
        //设置舞台背景色
        Laya.stage.bgColor = "#ffffff";
        //加载图集成功后，执行onLoaded回调方法
        Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //创建一个Animation实例
        var tl:Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl.loadAnimation("planCrashed.ani");
        //添加到舞台
        Laya.stage.addChild(tl);
        //播放Animation动画
        tl.play();
    }
}
new GameMain();
```


L'effet de fonctionnement du Code est indiqué dans la figure 29:

![29](img/29.gif)< br / > (Figure 29)

###3.3 animation à plusieurs axes temporels

Comment peut - on charger d 'autres animations?La valeur du nom de l 'animation apparaît alors.Procédé de lecture par défaut`play()`Par défaut est la première animation.Si vous souhaitez utiliser d 'autres animations, définissez le nom de l' animation au troisième paramètre.`play()`Les paramètres API de la méthode sont décrits dans la figure 30.

![图30](img/30.png)< br / > (Figure 30)

Modifier pour utiliser les codes illustratifs suivants:

**Entrées gamemain.ts** 


```typescript

// 程序入口
class GameMain{
    constructor()
    {
        //初始化引擎
        Laya.init(1334,750,Laya.WebGL);
        //设置舞台背景色
        Laya.stage.bgColor = "#ffffff";
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //创建一个Animation实例
        var tl:Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl.loadAnimation("planCrashed.ani");
        //添加到舞台
        Laya.stage.addChild(tl);
        //播放Animation动画
        tl.play();

        //创建一个新的Animation实例
        var tl2:Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl2.loadAnimation("TimeLine.ani");
        //添加到舞台
        Laya.stage.addChild(tl2);
        //播放Animation动画的pivot动画
        tl2.play(0,true,"pivot");
        //动画的显示位置
        tl2.pos(300,0);
    }
}
new GameMain();
```


L 'effet d' exécution de l 'exemple de code est illustré à la figure 31:

![31](img/31.gif)<br/>(动图31)



###3.4 utiliser l 'animation d' axe temporel dans l 'ui puis l' appeler dans le Code du projet.

####3.4.1 créer la page ui en ajoutant une animation animée sur la scène.

On va en créer un.`TimeLine.ui`Sur la page ui, puis faites glisser directement`planCrashed.ani`Dans la scène, comme le montre la figure 32.

![图32](img/32.png) <br /> (图32)







####3.4.2 définition des propriétés de l 'animation animée

Sélectionnez l 'animation dans la scène ui, avec une pluralité de valeurs d' attributs pouvant être réglées.On va régler ça.`var`Cette valeur doit être définie, sinon l 'animation ne peut pas être appelée.Définissez ensuite une valeur X de la propriété de position égale à 500, y à 0 (* égale à la valeur pos définie dans le code *) afin d 'éviter le chevauchement avec l' animation précédente.Les autres valeurs d 'attribut ne sont pas présentées, et le déplacement de la souris vers le nom de l' attribut donne une présentation correspondante.Comme le montre la figure 33.

![图33](img/33.png) <br /> (图33)







####3.4.3 appel d 'animations dans l' ui dans le projet

Après l 'exportation F12, ajouter un code directement dans l' exemple précédent.Les exemples de code sont les suivants:

**Entrées gamemain.ts** 


```typescript

// 程序入口
class GameMain{
    constructor()
    {
        //初始化引擎
        Laya.init(1334,750,Laya.WebGL);
        //设置舞台背景色
        Laya.stage.bgColor = "#ffffff";
        //加载图集成功后，执行onLoad回调方法
        Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //创建一个Animation实例
        var tl:Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl.loadAnimation("planCrashed.ani");
        //添加到舞台
        Laya.stage.addChild(tl);
        //播放Animation动画
        tl.play();

        //创建一个新的Animation实例
        var tl2:Laya.Animation = new Laya.Animation();
        //加载动画文件
        tl2.loadAnimation("planCrashed.ani");
        //添加到舞台
        Laya.stage.addChild(tl2);
        //播放Animation动画的pivot动画
        tl2.play(0,true,"pivot");
        //动画的显示位置
        tl2.pos(300,0);

        //创建一个UI实例
        var plan:ui.TimeLineUI = new ui.TimeLineUI()
        //添加到舞台
        Laya.stage.addChild(plan);
        //播放UI场景中的动画
       plan.crashed.play();
    }
}
new GameMain();
```


Les effets de fonctionnement sont indiqués dans la figure 34:

![动图34](img/34.gif)< br / > (Figure 34)

L 'animation utilisée dans l' ui peut être facilement commandée directement dans le gestionnaire d 'attributs de l' ui.Par exemple, nous voulons faire baisser la vitesse d'explosion de l'avion.Alors, nous pouvons sélectionner l 'animation directement dans l' ui et définir la valeur d 'attribut d' interval.Interval commande l 'intervalle de temps de lecture de l' animation (en millisecondes) sans réglage, par défaut de 50 millisecondes.Nous pouvons faire baisser la vitesse d 'explosion de l' avion.Comme le montre la Figure 35.

![图35](img/35.png)< br / > (Figure 35)

Les modifications sont exportées en F12, puis compilées directement sans avoir à modifier le code d 'article, ce qui permet de voir que les effets d' expédition ont changé, comme le montre la figure 36.

![图36](img/36.gif)< br / > (Figure 36)



Ainsi, la production et l 'utilisation d' animation à axe temporel ont été présentées.Utilisation de l 'API pour l' animation d 'axes temporels[Animation API文档](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.display.Animation)".