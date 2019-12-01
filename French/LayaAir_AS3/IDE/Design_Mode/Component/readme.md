# LayaAir IDE组件库

###Aperçu de la liste des composants

Les composants de layaairide sont stockés dans l'inventaire des composants de l'IDE.Les composants de base 2D, les vecteurs Graphics, les ensembles utilitaires ui et quelques grandes catégories.Comme le montrent les figures 1, 2 et 3.

![图1](img/1.png)< br / >

Figure 1 composants de base 2D

![图2](img/2.png)< br / >

Figure 2 Ensemble vecteur Graphics

![图3](img/3.png)< br / >

Figure 3 Composants courants UI



###Différences entre les bibliothèques de composants et les gestionnaires de ressources

####2.1 emplacement de stockage

Tous les composants de la Bibliothèque de composants sont stockés dans le Répertoire de layaairide et sont communs à tous les éléments.

Les composants du gestionnaire de ressources sont stockés dans le catalogue des articles uniquement pour l 'article actif.

####2.2 différences de peau

Les composants stockés dans la Bibliothèque de composants ne portent pas de peau par défaut.Définissez la peau manuellement en fonction des besoins après l 'entrée de l' éditeur de scène.

Le gestionnaire de ressources stocke une ressource de peau de composant, qui est placée dans l 'éditeur de scène, identifie le composant correspondant au moyen d' un préfixe de ressource et utilise la ressource entrante comme ressource de peau de composant.

####2.3 types de composants

La Bibliothèque de composants comprend un ensemble ui, un ensemble vecteur Graphics et un ensemble base 2d (objet d 'affichage).

Seuls les composants ui sont stockés dans le gestionnaire de ressources.



###Références de documents se rapportant à d 'autres composants

Les composants personnalisés peuvent également être stockés et affichés dans la Bibliothèque de composants, et les composants personnalisés peuvent être consultés`使用IDE创作`Classification`《自定义组件的制作与使用》`".



Description de chaque composant dans une bibliothèque de composants`设计模式基础`Classification`《属性设置器文档》`Et`IDE组件属性详`La classification est décrite en détail.



`资源管理器`Il y a également dans le document des règles de désignation de composant telles que des présentations concernant les composants UI`设计模式基础`Classification`《资源管理器介绍》`".



