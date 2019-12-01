#Problème de création de fentes pour l 'assemblage d' images webgl

**Si le mode de rendu utilise webgl dans le moteur layaair, il y a souvent des fentes au niveau de l 'assemblage d' images.Comme le montre la figure ci - après:**

![1](img/1.png)< / BR > (Figure 1)

###Causes de la lacune:

1) Le problème de la moitié des pixels dans le monde 3D; webgl est un procédé de rendu accéléré au moyen d 'un matériel de visualisation, un procédé de dessin d' une texture par l 'alignement des valeurs de pixels des UV et des images, et un procédé d' adressage dans le webgl.(cet article n 'explique pas trop la moitié des pixels, il est intéressant de consulter Google)

2) Lorsque les ressources du 2D sont réduites ou augmentées, cette lacune apparaît plus clairement en raison de problèmes de précision.

###Traitement d 'images dans un moteur:

Il existe deux méthodes d 'emballage d' images dans le moteur layaair.L 'une consiste à exporter des ressources directement en mode ui et l' autre à emballer au moyen d 'un outil d' emballage d 'images dans la barre d' outils.Cependant, les deux fonctions ont fait la même chose en combinant les petits dessins avec l 'Atlas, ce qui a permis d' ajouter une marge de protection, comme le montre la figure ci - après:

![2](img/2.png)
(图2)


**(la partie verte représente les pixels les plus marginaux)**

Fusionner dans une majuscule avec une position de 100,00.Les pixels les plus périphériques sont automatiquement élargis lors de leur intégration dans l 'agrandissement, mais quand ils sont réellement dessinés, on prend 100,00 positions.On évite ainsi les fentes, comme le montre le graphique ci - dessous:

![3](img/3.png)< / BR > (Figure 3)

**(la partie bleue est le côté étendu dont la valeur de pixel est la valeur de bord dans la figure 2.**

###Comment modifier la carte?

Par les principes exposés ci - dessus, tout le monde doit comprendre.Mais beaucoup de scènes sont assemblées à l'aide d'outils de tiers, tels que tiled - Map:

**Qu'est - ce qu'il faut faire si tiled - map n'a pas fait une telle protection?**

La méthode la plus simple consiste à réduire chaque valeur de pixel au moment de l 'échantillonnage, par exemple lorsque l' élément de scène est un format de 64 * 64.


```typescript

drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);
```


Il a été écrit de la manière suivante:


```typescript

drawImage(image,128,256,64,64,100,100,64,64);//这种写法就可能会出现缝隙
```


Il faudrait à présent se lire comme suit:


```typescript

drawImage(image,128+1,256+1,64-1,64-1,100,100,64,64);
```


C 'est - à - dire que les ressources sont réduites en cercle au moment de l' échantillonnage, mais qu 'elles sont toujours aussi importantes au moment de la peinture.La plupart de ces procédés ne sont pas visibles (la plupart des jeux sont ainsi traités).

Mais si l 'on veut obtenir de meilleurs résultats, il faut un peu d' effort artistique, par exemple pour dessiner les éléments d 'image, le bord de protection a déjà été dessiné.









