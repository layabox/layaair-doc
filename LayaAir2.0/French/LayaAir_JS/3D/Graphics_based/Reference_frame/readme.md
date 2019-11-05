#Système de coordonnées layaair3d

Dans le moteur 2D, nous réglons directement les coordonnées x et y pour contrôler la position et la direction de rotation de l 'objet d' affichage, le moteur 3D étant plus complexe, les coordonnées de l 'axe Z étant ajoutées, nous utilisons le vecteur 3D de Vector 3, dont les valeurs représentent respectivement X, y et Z.

Toutefois, les différents moteurs 3D et les logiciels de modélisation 3D définissent différemment la direction des coordonnées, ce qui oblige les premiers chercheurs à en comprendre les différences.

Les coordonnées du moteur layaair 3D appartiennent en termes professionnels.**Système de coordonnées de la main droite**(Figure 1) En résumé, l 'écran est orienté vers l' observateur dans la direction de l 'axe Z positif (Direction de l' axe Z négatif derrière l 'écran), vers la droite de l' écran dans la direction positive de l 'axe X et au - dessus de l' axe Y.Certains moteurs 3D appartiennent au système de coordonnées de la main gauche, ne sont pas présentés ici, les débutants intéressés peuvent comprendre.

​![图](img/1.png)Coordonnées de la main droite

Le moteur est également divisé en systèmes mondiaux de coordonnées et de coordonnées locales:

​**Système mondial de coordonnées**Les coordonnées de la scène 3D ne changeront jamais dans la direction des trois axes (fig. 1).

​**Système de coordonnées locales**Est un système de coordonnées avec le point d 'origine de l' objet comme point d 'origine, dans la même direction que le système mondial de coordonnées.Les coordonnées locales varient en fonction de la rotation de l'objet (par rapport aux coordonnées mondiales), mais elles ne changent pas pour l'objet lui - même.On peut donc identifier la direction des coordonnées locales par le geste du système de coordonnées de la main droite (fig. 2).

![图](img/2.png)< br > (Figure 2)

