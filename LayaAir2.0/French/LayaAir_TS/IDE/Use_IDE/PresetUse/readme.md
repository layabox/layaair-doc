#Pre - usage

Dans l'élaboration des projets, il arrive souvent que:

L'art définit une série de couleurs de caractères standard, de numéros de caractères et d'applications dans chaque ui. Un jour, l'art dit qu'il faut modifier la couleur de la police par défaut, les numéros de caractères, et que les producteurs d'ui doivent modifier toutes les interfaces une fois, ce qui peut être très difficile.**Dans ce cas, l 'utilisation d' un paramètre d 'attribut par défaut ou d' une présomption permet de s' adapter facilement et de modifier un seul endroit, ce qui peut avoir une incidence globale.**

2) les interfaces, les modules locaux et les codes logiques sont identiques, ce qui est le cas;**Utiliser + + Runtime (classe logique de page) pour répondre facilement**

Les différentes interfaces, qui ont une configuration locale identique, sont censées être modifiées une fois et les multiples interfaces ont changé en conséquence.**L 'utilisation de l' intégration et de la présélection de pages pour faire face à cette situation peut facilement**

Pour répondre à des besoins similaires, layaairide propose trois programmes:

**Paramètres des attributs par défaut des ressources**(définir une valeur par défaut pour un composant unique et modifier l 'effet global)

**2. Prépositionnement des composants UI**(enregistrer les configurations ui locales en tant que présomptions, glisser dans d 'autres pages, modifier les propriétés prédéfinies, avec effet global)

**Intégration des pages**(enregistrer l 'ui local en tant que page, puis glisser dans une autre page pour la Multiplexer avec Runtime

On trouvera ci - après une description de l'utilisation de ces trois hypothèses.

###Paramètres des attributs par défaut des ressources

Sélectionnez une ressource dans le panneau de ressources et double - cliquez pour ouvrir le panneau d 'attributs de ressources, comme indiqué dans la figure d' action I:

![1](img\1.gif)(图1)


Une valeur d 'attribut du composant est prédéterminée dans l' ensemble par défaut et, comme l 'exemple l' indique, la valeur d 'attribut directement ((**Attention & ‧‧;: pas d 'espace avant et après**).Comme le montre la figure 2:

![2](img\2.png)(Figure 2)

Les résultats sont les suivants:

![3](img\3.png)(Figure 3)

Si un endroit ne veut pas utiliser des informations prédéfinies, l 'ensemble prédéfini peut être traîné directement sur la page UI pour modifier la valeur d' attribut correspondante dans la barre d 'attributs afin de couvrir la valeur par défaut.

**Cette caractéristique de mode & ‧‧;: Vous pouvez configurer un composant avec une grille de neuf Palais et un type d 'image, vous pouvez définir une couleur de police, un numéro de caractères, puis glisser dans une pluralité d' emplacements**

**Difference avec d 'autres modes: seuls les composants individuels peuvent être prédéfinis, pas les attributs des éléments d' une combinaison personnalisée**



###Configuration du module UI

Par exemple, nous voulons créer un composant de prédiction Sprite personnalisé qui définit les attributs à utiliser pour les éléments devant être fabriqués en tant qu 'ensembles prédéfinis sur la page.Comme le montre la figure 4:

![4](img\4.png) 


(Figure 4)

Cliquez sur le bouton d 'enregistrement à droite pour enregistrer tous les composants sous le noeud Sprite en tant que présomptions et modifier le nom en cliquant sur détermination, comme le montre la figure 5:

![图5](img/5.png) 


(Figure 5)

Clic`确定`Après enregistrement, un fichier prédéfini. Prefab est généré dans le panneau de fichier de présélection de scène (prefab).Dans le même temps, la couleur du composant dans l 'interface de scène change (cette couleur représente le composant en tant que composant prédéfini personnalisé).Comme le montre la figure 6.

![6](img\6.png)(Figure 6)

Les fichiers prédéfinis de prefab peuvent être introduits directement sur différentes pages et peuvent être modifiés individuellement pour chaque composant prédéfini directement sur l 'interface ui si l' on veut modifier la valeur d 'attribut du composant prédéfini dans une interface.Comme le montre la figure 7.

![图7](img/7.png) 


(Figure 7)

**Les caractéristiques du mode & ‧‧;: seuls les noeuds actifs et les arbres de sous - noeuds peuvent être prédéfinis**

**Écart avec d 'autres modes: Vous pouvez double - cliquer directement sur le Sous - étage pour modifier les propriétés sur la page active.Et la modification des attributs du composant d 'un fichier prédéfini dans chaque page n' est valable que pour lui - même et n 'affecte pas les autres composants prédéfinis**



###Intégration des pages

Dans l'élaboration des projets, il arrive qu'une page ui soit utilisée à plusieurs reprises (sans ajout de Code).Dans layaairide, une page ui peut être tirée directement vers une autre page ui.Comme le montre la figure 8:

![8](img\8.gif) (动图8)


Dans la figure 8, nous avons placé la page ui produite directement sous forme de remorquage sur une autre page UI

**Caractéristiques de mode: des combinaisons plus complexes d 'ensembles de noeuds peuvent être configurées**

**Différence avec d 'autres modes: les propriétés d' un composant ne peuvent pas être modifiées sur une page donnée, mais seulement en double cliquant sur la page uiview pour les modifier; une fois les modifications apportées, tous les emplacements utilisés peuvent être modifiés,**



**Observations finales**

Trois avantages communs prédéterminés sont la réduction des opérations de modification répétée.Si l 'ensemble prédéterminé (ou la page) est utilisé dans différentes interfaces, il suffit de modifier directement l' ensemble prédéterminé (ou la page) et de modifier l 'emplacement utilisé.Pas besoin de changer un par un.