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

![1](img\1.gif)(Figure 1)

Une valeur d 'attribut du composant est prédéterminée dans l' ensemble par défaut et, comme l 'exemple l' indique, la valeur d 'attribut directement ((**Attention & ‧‧;: pas d 'espace avant et après**).Comme le montre la figure 2:

![2](img\2.png)(Figure 2)

Les résultats sont les suivants:

![3](img\3.png)(Figure 3)

Si un endroit ne veut pas utiliser des informations prédéfinies, l 'ensemble prédéfini peut être traîné directement sur la page UI pour modifier la valeur d' attribut correspondante dans la barre d 'attributs afin de couvrir la valeur par défaut.

**Avantage & ‧‧;: Vous pouvez configurer un composant avec une grille de neuf miyaux et un type d 'image, vous pouvez définir une couleur de police, un numéro de caractères, puis glisser dans une pluralité d' emplacements**

**Défaut & ‧‧;: seuls les composants individuels peuvent être prédéfinis, pas les attributs des éléments d 'une combinaison personnalisée**



###Configuration du module UI

Nous fabriquons ici un préforme de Box personnalisé qui définit les attributs à utiliser pour les éléments devant être fabriqués en tant que composants prédéfinis, sélectionné dans leur intégralité et assemblé en Box en cliquant sur ctal + B (les développeurs peuvent convertir les composants correspondants en fonction de leurs besoins).Comme le montre la figure 4:

![4](img\4.png)(Figure 4)

Les composants Box convertis sont introduits dans la liste des ressources à partir du catalogue hiérarchique pour générer les composants prédéfinis.Figure 5

![5](img\5.gif)< / BR > (Figure 5)

Comme on peut le voir à la figure 5, lorsque le composant personnalisé est formé en un composant prédéfini, un composant. Prefab est généré dans le panneau de ressources, tandis que la couleur du composant Box dans l 'interface ui change (cette couleur représente le composant prédéfini personnalisé).Enfin, vous pouvez glisser le composant dans une autre page

Si l'on veut modifier la valeur d'attribut d'un composant prédéterminé dans une interface, le composant peut être modifié directement en double cliquant sur l'interface ui.Comme le montre la figure 6:

![6](img\6.png)(图6)


**Avantages: les attributs peuvent être modifiés directement en double - cliquant sur le Sous - étage sur la page active; l 'affichage sur l' interface ui après présélection demeure le composant**

**Défaut & ‧‧;: aucun élément nouveau ne peut être ajouté à l 'intérieur d' un composant prédéterminé, mais seulement les valeurs du panneau d 'attribut du composant peuvent être modifiées**



###Intégration des pages

Dans l'élaboration des projets, il arrive qu'une page ui soit utilisée à plusieurs reprises (sans ajout de Code).Dans layaairide, une page ui peut être tirée directement vers une autre page ui.

Comme le montrent les figures 7 et 8:

![7](img\7.png)(Figure 7)

![8](img\8.gif)(Figure 8)

Dans la figure 8, nous avons placé la page ui produite directement sous forme de remorquage sur une autre page UI

**Vous pouvez ajouter de nouveaux éléments à la page**

**Mauvais: les propriétés d 'un composant ne peuvent pas être modifiées sur une page donnée, mais seulement en double cliquant sur la page uiview pour les modifier; une fois que les modifications sont apportées, tous les emplacements utilisés sont modifiés,**



**Conclusion**

**Trois avantages communs prédéterminés sont la réduction des opérations de modification répétée.Si l 'ensemble prédéterminé (ou la page) est utilisé dans différentes interfaces, il suffit de modifier directement l' ensemble prédéterminé (ou la page) et de modifier l 'emplacement utilisé.Pas besoin de changer un par un.**