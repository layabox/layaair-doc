#Paramètres d 'attribut

Le paramètre d 'attribut est la zone de travail dans laquelle nous voyons et éditons les propriétés du composant actuellement sélectionné.Le composant sélectionné dans l 'éditeur de scène ou dans le gestionnaire de niveaux affiche les propriétés de l' ensemble dans le paramètre d 'attributs pour consultation et édition.

Le panneau de configuration d 'attributs, comme l' indique la figure 1, est habituellement de haut en bas comme suit:**Public**Propriétés**Usage courant**Propriétés**Hauteur et position**,**Rotation et zoom**,**Autres**Attendez un peu!



 ![imgage](img/1.png)<br/>

Figure 1 paquets de panneaux d 'attributs



##1,0`公用`Attributs

Attributs communs`var`,`name`,`renderType`".Comme le montre la figure 2 - 1.

![图2-1](img/2-1.png) <br /> (图2-1)



###1.1 Définition de la variable globale

`Var`: nom d 'une seule variable globale permettant d' appeler le composant en fonction de ce nom dans le Code du projet.

###1.2 Définition du nom d 'identification du composant

`name`: le nom d 'identification du composant est habituellement utilisé pour distinguer les autres composants dans le gestionnaire hiérarchique, et son récipient parent peut également trouver le composant par ce nom.

###1.3 types de fonctions de noeud pour les composants

`renderType`* types de fonctions de noeud: Mask, hit, unhit, render, instance.

####1.3.1 masques

Lorsque le composant est défini comme`mask`Lorsque l 'ensemble est un masque**Ensemble parent**Seules les zones de masquage Mask sont visibles et les effets sont illustrés dans la figure 2 - 2.



　　![动图2-2](img/2-2.gif) <br /> （动图2-2）



####1.3.2 définition des zones de clic et des zones non clichées

Lorsque le composant est défini comme`hit`Lorsque le composant se trouve dans la zone du composant parent, il peut être cliqué.Lorsque le composant est défini comme`unHit`Lorsque le composant se trouve dans la zone du composant parent, la zone du composant n 'est pas cliquée.**Si le composant hit de la zone de point est superposé à un composant unhit de la zone de non - clic**, la priorité est plus élevée dans la zone non cliquée.Comme le montre la figure 2 - 3, aucune zone non cliquée (unhit) dans laquelle se trouve le cercle Vert, y compris la zone de bouche superposée, ne peut être cliquée.Seules les zones de demi - mois rouges de la tête peuvent être consultées.

　　![图2-3](img/2-3.png)< br / > (figures 2 à 3)

####1.3.3 render pour List

Lorsque le composant est configuré pour`render`L 'ensemble peut être rendu à nouveau pour la production de liste list.Dans le mode de réalisation de la liste, il est nécessaire de régler la pluralité de composants en tant que contenants de Box par Ctrl + B après sélection complète.Et définit les propriétés du récipient en tant que render.Ensuite, on utilise Ctrl + B pour définir le box comme list.Comme le montre la figure 2 - 4.

![动图2-4](img/2-4.gif)< br / > (figures 2 à 4)

####1.3.4 Établissement unique

Lorsque le composant est configuré pour`instance`Lorsque l 'ensemble est un seul module, lorsqu' il est réutilisé à plusieurs reprises, l 'ensemble unique n' est mis en oeuvre qu 'une seule fois.économie de performance.



　　

##Deux.`常用`Attributs

Dans les propriétés usuelles, certaines opérations sont communes.On se présente séparément.

###2.1 fonctionnement de la case des neuf palais (sizegrid)

L 'ui est divisé en neuf blocs par quatre lignes linéaires et, en cas d' étirage de l 'ui, la zone intermédiaire est remplie par calcul, tandis que les autres zones resteront inchangées, quelle que soit l' étirage de l 'ui.Est une fonction courante dans le développement du jeu.

Attributs usuels`sizeGrid`Les attributs sont les paramètres de la grille de Jiujiang, en cliquant sur le côté droit de la barre d 'entrée des attributs`grid`Vous pouvez accéder au panneau d 'exploitation visuel de la grille de Jiujiang.Comme le montre la figure 3 - 1.

![图3-1](img/3-1.png) <br / > (图3-1)


Après l 'ouverture de la grille de la neuvième maison, le côté gauche est la zone de prévisualisation d' effet et le côté droit la zone de visualisation de la grille de la neuvième maison.Modifier la zone de remplissage de la case Jiujiang en faisant glisser la souris pour obtenir un aperçu immédiat et ajuster la détermination du clic.Comme indiqué dans la figure 3 - 2.

![动图3-2](img/3-2.gif)< br / > (Figure 3 - 2)

###2.2 paramètres cutanés (Skin)

`skin`Les propriétés peuvent définir la peau du composant modifié.Outre l 'entrée manuelle de la peau dans la barre d' attributs, les ressources peuvent être directement entraînées à partir du gestionnaire de ressources.`skin`Barre d 'entrée d' attributs permettant un transfert rapide de la peau.En outre, cliquez sur le côté droit de la barre d 'entrée d' attributs`skin按钮`, vous pouvez localiser rapidement les ressources existantes à partir d 'une grande quantité de ressources.Comme indiqué dans la figure 3 - 3.

![动图3-3](img/3-3.gif)< br / > (figures 3 à 3)



###2.3 coupe de la peau (statenum)

Dans l 'utilisation de composants tels que button, checkbox, la ressource cutanée du composant est constituée d' une disposition verticale polymorphe, comme le montrent les figures 3 à 4.

![图3-4](img/3-4.png) <br /> (图3-4)



####Coupe - peau:

Les trois états divisent les images de la peau en trois parties dans une direction verticale, divisées en parts égales, comme le montre la figure 3 - 4.**De haut en bas**Successivement`弹起或离开状态`Peau`经过状态`Peau`按下和选中`(* maintenez le bouton ∗) état de la peau, les trois états étant souvent utilisés dans le navigateur PC.

Sur un dispositif mobile, l 'image est généralement coupée en deux parties dans une direction verticale, la partie supérieure étant`弹起或离开状态状态`Peau n.`经过和按下以及选中状态`(* maintenez le bouton ∗) sur la peau.

Il n 'y a qu' un seul état de peau qui reste inchangé.

####Spécifie que la peau doit être coupée en plusieurs états:

Pour les composants de la distinction d 'état de présence, la valeur d' attribut de statenum détermine le mode de découpe de l 'image de ressource cutanée.La valeur d 'attribut statenum par défaut est de 3, c' est - à - dire que le rapport est divisé en trois parties par défaut.Dans le cas d 'un bouton bimodal, la valeur d' attribut de statenum doit être fixée à 2, le rapport étant coupé en deux parties.Le bouton monoforme est fixé à 1, sans coupure.

Notez ici que l 'état du bouton doit correspondre à celui de la peau du bouton.Si c 'est un bouton tridimensionnel sur la peau, statenum est fixé à 2, après coupure, comme le montre la figure 3 - 5, ce qui est erroné.

![图3-5](img/3-5.png)< br > (figures 3 - 5)



###2.4 attributs Runtime puissants

`runtime`Est une fonction d 'extension de composant très puissante dans le gestionnaire d' attributs.En définissant une classe logique dans l 'attribut Runtime, l' instance n 'est plus une classe visuelle du composant mais une classe logique spécifiée dans l' attribut Runtime.Il est nécessaire de spécifier un chemin complet pour la classe logique, par exemple "game.user.player".



###2.5 paramètres de couleurs visuels

Lorsque les attributs du Color sont définis, vous pouvez saisir manuellement une valeur de couleur ou cliquer sur le bouton de réglage de couleur du côté droit pour spécifier la couleur dans le panneau de réglage de couleurs, puis cliquer sur n 'importe quelle zone située à l' extérieur du panneau pour terminer le réglage de couleurs visualisées, comme le montre la figure 3 - 6.

![动图3-6](img/3-6.gif) <br />（动图3-6）



###2.6 ajustement des chiffres

Si la valeur de propriété est un nombre, il y a un panneau de réglage de traction sur le bord de la zone d 'entrée.De nombreux développeurs n 'ont pas remarqué cette petite technique qui permet d' ajuster les nombres en cliquant sur le panneau de réglage par le bouton gauche de la souris, puis en les faisant glisser vers le haut ou en le tirant vers le bas, et les composants correspondants de l 'éditeur de scène peuvent produire des changements de Visualisation instantanés.Voir les figures 3 à 7.

![动图3-7](img/3-7.gif)< br / > (figures 3 à 7)

### 



##Largeur et propriétés de position

Les propriétés de position et de largeur jouent un rôle important dans la production ui.Pour ajuster la position et l 'adaptation de l' écran ui (fig. 4).

![图片1.png](img/4.png)< br / > (Figure 4)

###3.1 propriétés X et y

Les propriétés X et y sont les coordonnées des axes X et y du composant dans l 'éditeur de scène.

Angle supérieur gauche de l 'éditeur de scène`（0, 0）`".Axe X s' étend à droite pour augmenter les coordonnées positives et axe y vers le bas pour augmenter les coordonnées positives.

Oui.`场景编辑器`Vous pouvez modifier la position des axes X et y en maintenant la souris enfoncée dans le composant sélectionné, ou fixer une valeur fixe dans la zone d 'entrée d' attributs.



###3.2 propriété large et haute propriété

Sans modifier la taille du composant, la hauteur du composant est calculée automatiquement, mais ne s' affiche pas dans le panneau d 'attributs.Lorsque le composant est replacé à l 'échelle par l' intermédiaire d 'un cadre de contrainte ou d' un paramètre de valeur fixe, les propriétés de largeur élevée sont affichées et un ajustement de traction numérique peut être effectué.

Lorsque aucun composant n 'est sélectionné, la largeur actuelle est supérieure à la largeur de page.

*Les composants partiels ne peuvent être modifiés que pour modifier la taille de la zone de contrainte, et le composant réel ne peut pas être agrandi, mais la zone de clic de la souris est réduite à la taille de la zone de contrainte, telle que checkbox.*



###3.3 propriétés d'adaptation UI

`left、right、top、bottom`Les quatre attributs sont principalement utilisés pour adapter le composant à la position de distance du bord de la page.

`centerX、centerY`Les deux attributs sont principalement utilisés pour adapter le composant à la position centrale de la page.

Dans le développement du jeu, il est impossible de tenir compte de toutes les résolutions de l 'écran, que ce soit à haute résolution ou à faible résolution.Si l 'Adaptation d' écran complet est utilisée dans le Code de l 'élément de jeu, le composant fixe sa position, ce qui entraîne une erreur de positionnement du composant ui sous un écran à différentes résolutions.Nous devons procéder aux ajustements suivants.

####3.3.1 adaptation des marges

**Objectif**Affiche une image dans le coin supérieur droit du jeu et maintiens toujours les bords supérieur et droit de l 'écran à 50px.

**Effet d 'erreur**- Oui.

Si l 'on fixe les valeurs x et y du composant en fonction d' une résolution d 'écran, l' effet de la figure 5 - 1 apparaît.Non conforme à l 'objectif de la conception.

![图5-1](img/5-1.gif) <br />

Lorsque des valeurs fixes sont fixées pour les composants X et y, différentes résolutions d 'écran sont appliquées.

**Effet correct**- Oui.

`left、right、top、bottom`Les quatre attributs sont basés respectivement sur le bord gauche, le bord droit, le bord supérieur et le bord inférieur du récipient parent.Pour réaliser l 'effet droit d' une cohabitation avec une résolution d 'écran différente, il faut définir des valeurs d' attribut right et top, que nous réglons tous en 50 pixels.L 'effet de fonctionnement après paramétrage est indiqué dans la figure 5 - 2.

![动图5-2](img/5-2.gif)< br / > (Figure 5 - 2)

**Influence of Screen adaptation on Edge set**- Oui.

Une attention particulière est accordée ici:`left、right、top、bottom`L 'effet attribut est basé sur les bords du récipient parent (page) et non sur les bords de l' écran.La résolution du récipient paternel (page) doit être la même que celle du projet laya.init () et, si elle n 'est pas identique, l' effet de fonctionnement du diagramme 5 - 2 ne peut être réalisé.



####3.3.2 Adaptation d 'étirage des marges

Outre les effets d 'adaptation situés sur un bord, les valeurs d' attributs left, right, top, bottom sont définies simultanément, et les composants peuvent être étirés sur différents écrans.Par exemple, nous réglons les valeurs d 'attributs left, right, top, bottom à 100, comme indiqué dans la figure 5 - 3.

![动图5-3](img/5-3.gif) <br > (动图5-3)


*Le réglage de la marge adaptée à l 'étirage doit normalement être réalisé en combinaison avec la cellule de la neuvième maison.*



####3.3.3 adaptation de la position centrale

L 'adaptation centrale est souvent utilisée pour démarrer le logo sur la base d' un jeu au milieu de l 'écran, pour éjecter la boîte d' affichage et ainsi de suite.Nous pouvons utiliser le Centre X et le Centre y, comme le montrent les figures 6 - 1, 6 - 2.

![图片1.png](img/6-1.png)<br />（图6-1）



![图片1.png](img/6-2.png)<br />（图6-2）







##Propriétés de rotation et de zoom

Les attributs de rotation et de zoom sont souvent utilisés dans le jeu ui, en particulier dans la production d 'animations par l' IDE.

####4.1 modification des axes

« point d 'axe »: point central de rotation ou de mise à l' échelle d 'un composant, par défaut, dans le composant`（0,0）`Point Position

Les quatre propriétés de pivot X, pivoty, anchorx et anchory sont utilisées pour modifier la position du point d 'axe.

Pivotx et pivoty (point d 'axe) modifient la position du point d' axe en modifiant la valeur fixe des coordonnées XY du point d 'axe du composant.

L 'anchorx et l' anchory (point d 'ancrage) calculent la position du point d' axe en calculant la position du point d 'axe en pourcentage de la largeur ou de la hauteur de l' ensemble des axes X et y, et, comme le montre la figure 7, la position du point d 'ancrage est la même que celle du point d' ancrage calculée à 50% de la largeur et de la hauteur.

![图7](img/7.png)<br />（图7）


**Tips**- Oui.*Le point d 'ancrage est un moyen très pratique et rapide de régler l' axe.Le point d 'ancrage ne peut cependant être fixé qu' à un point d 'axe pour un ensemble ui et à un point d' axe pour un ensemble Graphics et des éléments de base 2D tels que Sprite.`pivotX与pivotY`Mise en oeuvre.*

####4.2 modification de l'angle d'inclinaison

Skewx et skewy sont inclinés horizontalement et verticalement au centre de l 'axe, et l' effet d 'attribut de modification est indiqué dans la figure 8.

![动图8](img/8.gif)<br />（动图8） 







####4.3 modification de la taille des composants

Scalex et scaley sont centrés sur l 'axe pour l' échelle horizontale et verticale.

Par défaut 1, pas de mise à l 'échelle; plus la valeur positive est grande, plus la taille de l' échelle est grande.

À zéro, invisible;

`-1`Pour**Miroir**, comme le montre la figure 9.Plus le nombre négatif est grand, plus le miroir est grand.

![动图8](img/9.gif)< br / > (Figure 9)

**Tips**- Oui.*Si l 'axe est au Centre, le miroir in situ peut être réalisé, par exemple dans les deux directions du rôle, au moyen de la même ressource.*



##Autres attributs communs

Layaairide a fourni un grand nombre de composants qui ont toutes les mêmes propriétés communes, car la plupart d 'entre eux sont hérités de groupes de composants component.Nous présenterons ici la partie générique des autres attributs, les caractéristiques particulières du composant lui - même, que nous présenterons dans la présentation de chaque composant individuel.

Les attributs génériques comprennent les catégories suivantes

Afficher les attributs de corrélation: alpha, visible

Attributs de cache

Propriétés associées à l 'opération de la souris: Disabled, Gray, httestprior, mouseenabled, Mouse through

Propriétés apparentées de label: labelalign, labelcolors, labelbold, labelfont, labelpadding, labelsize, labelstroke, labelstrokecolor, strokecolor



###5.1 affichage des attributs de corrélation

Afficher les attributs de corrélation est relativement facile à comprendre et les objets affichés possèdent les attributs alpha et visible.

`alpha`L 'ajustement affiche la transparence de l' objet, les valeurs étant comprises entre 0 - 1, 0 pour la transparence totale, 1 pour l 'opacité, avec des degrés de transparence variables à l' intérieur de la zone.

**Tips**: affiche le nombre alpha de l 'objet, quel que soit son nombre, et si la souris est mise en écoute, elle supporte l' événement de la souris, même si Alpha est zéro.

`visible`L 'ensemble de commande affiche si la propriété est une valeur booléenne, la valeur par défaut une valeur True et un affichage normal.Lorsque la valeur est FALSE, le composant ne s' affiche pas et l 'événement de la souris n' a pas d 'effet.

*Le fait de ne pas afficher lorsqu 'il s' agit d' une false signifie qu 'il ne s' agit pas d' un affichage dans un navigateur et que le réglage de la False dans l 'IDE ne provoque pas de changement de masquage instantané.*



###5.2 caractéristiques de la mémoire cache

En ce qui concerne les propriétés d 'optimisation de mémoire tampon, casheas et staticcache recommandent de ne pas utiliser un seul composant et de réutiliser les pages complexes qui ne changent pas souvent.



**Quand il y a un grand nombre d 'ui dans le jeu et qu' un ui a plusieurs noeuds qui changent plus tard, nous recommandons d 'utiliser les casheas (la plupart des ui sont disponibles).**

Par exemple, nous utilisons le logiciel layaairide, de nombreux panneaux dans le logiciel, tels que les paramètres d 'attributs, les gestionnaires de ressources, les gestionnaires de projets, etc.



**Pour les ui complexes qui changent souvent, l 'ui peut être divisé en deux couches, une couche moins variable utilisant des casheas, et une couche qui change fréquemment n' est pas utilisée.**Par exemple, lorsque l'ui est affiché dans le compte à rebours, on peut le diviser en une partie de compte à rebours et en une autre partie de compte à rebours, les autres parties de compte à rebours n'étant pas incluses dans le compte à rebours.



L 'utilisation de casheas dans le développement nécessite un apprentissage rigoureux de la compréhension, une mauvaise compréhension et l' utilisation de mécanismes de mémoire cache réduisent les performances.On trouvera ci - après une description détaillée des deux principales caractéristiques:

**Cacheas:**

Ensemble de mémoire cache, le cache est - il une image statique et l 'action rationnelle permet d' améliorer les performances?Il est possible de choisir les valeurs "non", "normal" et "bitmap".

**"Aucune option":**Aucun cache

**"normal选项"：**

La mémoire cache de toile est réalisée en mode Canvas: elle permet de mettre en cache l 'ui composé de plusieurs sous - objets en un bitmap, et de rendre chaque image du jeu uniquement en rendant les bitmap cache au lieu de rendre tous les sous - objets une seule fois, ce qui permet d' économiser les frais de rendu et d 'améliorer les performances.

La mémoire cache de commande en mode webgl: elle est égale à une mémoire cache uniquement le processus de parcourissement d 'un sous - objet et l' Organisation de commande de programme, non pas en tant que bitmap, mais en tant que rendu de chaque trame du jeu, elle ne permet pas d 'effectuer de nouveau l' exploration d 'un sous - objet, mais de rendre directement le Sous - objet à un niveau de visualisation correspondant à un niveau de répétition élevé.

**Tips**- Oui.*Les attributs de casheasbitmap fonctionnent de manière identique au mode normal des attributs de casheas, les attributs de casheasbitmap sont conservés pour être compatibles avec l 'ancienne version de l' IDE et il est actuellement recommandé d 'utiliser les paramètres normaux de casheas si les besoins sont satisfaits.*

**"Options bitmap"**- Oui.

En mode canvas, c 'est toujours un cache de toile.

Une mémoire cache de rendertarget est réalisée en mode webgl: elle permet de mettre en mémoire cache l 'ui composé de plusieurs sous - objets en un bitmap et de les présenter à la carte de visualisation pour chaque rendu de trame, ce qui réduit le nombre de mots de passe et permet d' obtenir les performances de rendu les plus élevées.Notez que les bits de mémoire tampon ajoutent une partie de plus de frais de mémoire, plus les bits de mémoire tampon sont importants.Et la taille du bitmap de cache ne doit pas dépasser 2048.Ce mode augmente également le coût de l 'UC lors de la reconfiguration continue.

**Tips*** Lorsque le caceas sélectionne "normal" et "bitmap", les sous - objets changent, ils sont automatiquement réinscriptibles et peuvent être appelés manuellement pour mettre à jour le cache.*



**Staticcache:**

Cette valeur n 'est valide que si le casheas est défini comme non "none", staticcache = true lorsque le Sous - objet change sans mise à jour automatique de la mémoire tampon, mais uniquement manuellement en appelant recache.

Par exemple, lorsque l 'ui ouvre les données de lecture, il peut être mis à jour sans interruption lorsqu' il affiche les données, ce qui permet de configurer staticcache comme vrai, puis de lire et de mettre à jour les données en une seule fois par le biais du procédé recache.

Pour des exemples concrets, veuillez consulter le document technique - 2d progress - caseas Performance Optimization



###5.3 propriétés associées aux opérations de la souris

Description des attributs associés à l 'opération de la souris et effets de démonstration

- 124.**Autres propriétés**- 124.**Description fonctionnelle**- 124.
124 -------------------------------------------------------------------------------------------------------------------
{\ 1ch00ffff} 124.Si vous écoutez l 'événement de la souris, les valeurs de l' objet et du noeud parent sont automatiquement définies comme vrai (si le noeud parent est configuré manuellement pour false, aucune modification n 'est apportée).- 124.
12.124 ci Disabled \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
12.124 \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.

![动图10](img/10.gif)<br />（动图10） 


**Mouset through:**

Module mousseenabled = est - ce perméable lorsque la souris True est disponible?Si la valeur par défaut est FALSE, cliquez sur la zone vide pour la traverser et ne fonctionne que pour vous - même.

**Hitteprior:**

C 'est une priorité.Par défaut false, la détection de collision de la souris est la détection prioritaire du sous - objet, puis la bulle s' étend sur l 'objet parent, et si la souris hitteprior = true frappe l' objet en priorité, l 'objet n' est détecté qu 'une fois atteint.Pour les récipients de taille connue (en particulier les récipients racine), la valeur est FALSE par défaut, et la valeur est TRUE, ce qui permet de réduire les collisions de noeuds et d 'améliorer les performances.

Par exemple, un box plus complexe, avec plusieurs sous - objets à l 'intérieur, mais nous n' avons besoin que d 'une surveillance de la souris sur Box lui - même.

*Tips: ui View module hittestprior par défaut de propriété est vrai.*



###5.4 propriétés associées de label

L 'intérieur de nombreux composants contient des étiquettes label telles que button, checkbox, Tab, etc.Leurs autres attributs contiennent les mêmes paramètres d 'attributs label.

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -----------------------------------------------------------------------------------------------------------------------
Le mode d 'alignement de l' étiquette \ \ \ \ \ \ \ \ \ \ \ \ \ \Note: non valable dans checkbox \ \ 124.
La couleur du texte dans chaque état de l 'étiquette.Format: "upcolor, overcolor, downcolor, disablecolor".Par défaut "bleu, vert".- 124.
$124lbold \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
Le nom de la police de l 'étiquette textuelle est exprimé sous forme de chaîne de caractères.Sélectionnez.- 124.
La distance de l 'étiquette textuelle est indiquée par & ‧‧; 124 & ‧‧Format: "distance supérieure, droite, inférieure, gauche".- 124.
La taille de la police de l 'étiquette textuelle est indiquée par \ \ 124.- 124.
La largeur de bordure du texte \ \ \ \ \ \ \ \ \ \ \ \ \ \La valeur par défaut 0 indique que les bords ne sont pas décrits.- 124.
La couleur de bordure du texte correspond à la chaîne de caractères.Par défaut#0000000 « (noir); \ \ 124u
{\ 1ch00ffff}Format: "upcolor, overcolor, downcolor, disablecolor".- 124.

*Tips: les propriétés du tableau ci - dessus ne contiennent pas de label dans l 'ensemble label, mais fonctionnent de manière parfaitement cohérente, par exemple`labelAlign`Attributs et composants label`align`Les propriétés sont identiques.*