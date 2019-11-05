#Classification and Heritage Relationship of ui Components

> Author: Charley > version: 2.0.1 > update: 2019 - 04 - 02

L 'ensemble est la base de conception du jeu du moteur layaair, presque partout.Le layaair IDE comporte lui - même un ensemble de base 2D, un ensemble filtre (filters), un ensemble de dessin (Graphics), un ensemble physique (physics), un ensemble ui (ui) et un ensemble commun (Common), comme le montre la figure 1.L 'développeur peut également définir le composant.Cet article s'articule autour du module ui.

![图1](img/1.png) 


(Figure 1)



##Classification des composants UI

Les composants ui peuvent être divisés en trois grandes catégories selon leur structure et leurs fonctions propres.Sont respectivement des ensembles d 'affichage, des ensembles de récipients et des ensembles d' affichage de base.

###1.1 ensembles d'affichage de base

L 'ensemble d' affichage de base est l 'ensemble d' affichage ui le plus couramment utilisé dans l 'édition de page.Les opérations de visualisation sont faites par glisser le gestionnaire de ressources (Assets) ou la Bibliothèque de composants de base (Basics) vers l 'éditeur de scène.Oui.`属性设置器`Définit la valeur de ses attributs et affiche l 'effet d' affichage directement dans l 'éditeur de scène.

Les ensembles d 'affichage de base sont les suivants: Sprite, button, checkbox, clip, colorpicker, ComboBox, fontclip, hscrollbar, hscrollbar, hsslider, image, label, textarea, textinput, radio, progressbar, Slider, vslider, scrollbar, vcrollbar, wxopendadataviewer.

> Tips: ∗ Sprite est plus spécifique, c 'est - à - dire un noeud de liste d' affichage d 'une image d' affichage de base et un récipient.Pour éviter l 'utilisation abusive d' un composant ui, un composant qui n 'a pas été nommé conformément aux règles du composant n' est plus identifié comme composant image et une identification par défaut comme Sprite est l 'un des modes d' utilisation les plus performants.

###1.2 emballages

Sprite, Box et les composants ui hérités de Box appartiennent à la catégorie des récipients, qui ne nécessitent généralement pas l 'identification de l' ensemble par le nom de ressource, mais sont générés par un ou plusieurs composants de base transformés en récipients.On peut passer dans l'IDE.`Ctrl+B`Raccourcis clavier convertit un ou plusieurs éléments de base en ensembles de récipients.Voir figure 2.

![动图3](img/2.gif) 


(Figure 2)

Les emballages comprennent: Sprite, Box, list, Tab, Radio Group, viewstack, Panel, hbox, vbox, tree.

###1.3 ensembles d 'affichage

L 'ensemble de classe D' affichage est un récipient d 'objet affiché au niveau de la page.Dans le système ui de layaair, les pages sont utilisées pour afficher tous les composants d 'affichage, les modules de classe D' affichage layaair étant scene, view et dialog, respectivement, utilisés pour créer des scènes, comme le montre la figure 3.

![图3](img/3.png) 


Lorsque la configuration relative n 'est pas nécessaire, l' utilisation de scene par défaut peut être utilisée lorsque la disposition relative est nécessaire.Dialog est utilisé pour créer une page de fenêtre.



##Relation de succession d 'un composant

La classe Sprite est la catégorie de récipients d 'objets d' affichage la plus élémentaire du moteur layaair, tous les composants ui étant hérités de la classe de base Sprite, dans laquelle l 'ensemble d' affichage de base et l 'ensemble de récipients sont hérités de la Sous - catégorie uimponent de la classe Sprite.La Sous - classe de Sprite est la classe de base de l 'ensemble de visualisation, view hérite de scene et dialog de view.La figure 4 illustre la relation de succession spécifique des composants.

![图4](img/4.png)



##Attributs du composant

Pour avoir une idée précise des règles de désignation des composants et de leur utilisation, consultez directement le document de 2.0.

Adresse du lien:[https://ldc2.layabox.com/doc/?nav=zh-ts-2-3-0](https://ldc2.layabox.com/doc/?nav=zh-ts-2-3-0)

La version as est reliée à la terre:[https://ldc2.layabox.com/doc/?nav=zh-as-2-3-1](https://ldc2.layabox.com/doc/?nav=zh-as-2-3-1)

Http: / / ldc2.layabox.com / DOC /? Nav = ZH - JS - 2 - 3 - 1





##Appreciation

Si vous trouvez cet article utile pour vous, bienvenue à l 'auteur du Code de balayage, votre motivation est de nous pousser à écrire plus de documents de qualité.

![wechatPay](../../../../wechatPay.jpg) 