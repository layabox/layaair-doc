#Description détaillée des propriétés de l 'ensemble Animation

> Parce que de nombreux attributs de composant sont génériques, communs et communs`属性设置器`Une présentation est faite dans le document.Avant de lire ce texte, lisez le document attributs.



##Ensemble animation primitive cognitive

L 'ensemble animation est un ensemble d' animation qui permet de créer facilement une animation d 'image ou d' utiliser une animation Ani créée par layaairide.Voir figure 1.

![动图1](img/1.gif) 


(Figure 1)

Présentation de l'API de l'animation[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation)



##Création d 'un ensemble animation par layaairide

###2.1 création d'animation

L'animation n'est pas un composant ui courant ni un composant de conteneur.Pour créer un composant animation, il faut d 'abord`组件库`Il est entré directement dans l'unité d'animation.`场景编辑器`B.Voir figure 2.

![动图2](img/2.gif) 


(Figure 2)




###2.2 réception de la source de données d 'animation par l' attribut source

Après la création de l 'ensemble animation dans la layaairide, la source de données d' animation doit être reçue par les attributs de source avant d 'être utilisée.Les attributs source peuvent recevoir des ensembles d 'images (une pluralité d' images, généralement des trames de séquences), des fichiers d 'images (.Atlas ou.json) et des fichiers d' animation (.Ani).

####2.2.1 création d 'images de trames de séquences

Ouvre.`资源管理器`On va faire des beaux - arts.`同时选中`Oui.`拖拽`A.`source`Barre d 'attributs, puis sélectionnez l' animation animée qui vient d 'être créée dans la scène, appuyez sur`回车`Pour prédire l 'effet de lecture d' animation.Voir figure 3.

![动图3](img/3.gif) 


(Figure 3)

**Tips**：使用该类型创建的动画不会被缓存到动画模版缓存池中，如果需要缓存，要使用loadImages()方法。

####Création de fichiers d 'Atlas

Si on met les fichiers d 'Atlas`资源管理器`Table des matières, vous pouvez également envoyer directement un fichier d 'Atlas`拖拽`A.`source`Barre d 'attributs, puis sélectionnez l' animation animée qui vient d 'être créée dans la scène, appuyez sur`回车`Pour prédire l 'effet de lecture d' animation.Voir figure 4.

![动图4](img/4.gif) 


(Figure 4)

**Tips**: le modèle d 'animation créé à l' aide de ce type n 'est pas mis en cache dans la mémoire cache du modèle d' animation et, s' il est nécessaire de le mettre en antémémoire ou de créer un retour terminé, le procédé loadatlas () est utilisé.

####Création de fichiers animés

Le fichier d 'animation d' axe temporel créé (ci - après dénommé Ani) peut également être une source de données pour l 'ensemble d' animation d 'animation d' animation d 'animation d' animation d 'animation d' animation d 'animation d' animation d 'animation, comme indiqué à la figure 5, directement`拖拽`A.`source`Barre d 'attributs, puis sélectionnez l' animation animée qui vient d 'être créée dans la scène, appuyez sur`回车`Pour prédire l 'effet de lecture d' animation.

![动图5](img/5.gif) 


(Figure 5)

###2.3 mode de lecture des animations commandées

Les attributs du mode de lecture d 'animation wrapmode ont trois valeurs facultatives, la valeur par défaut est 0, et la lecture séquentielle.Sélectionnez 1, à l 'envers.Quand vous choisissez 2, le mode PINGPONG (ping - pong) est un peu plus direct qu 'un autre.Voici un ensemble de ressources d 'images séquentielles qui illustrent les différences de lecture selon les différents modes.

####2.3.1 lecture en mode séquentiel

Par défaut, les attributs wrapmode ne sont pas définis ou les attributs wrapmode sont définis comme mode de lecture séquentielle lorsque les valeurs d 'attributs wrapmode sont définies comme zéro.C 'est - à - dire que les images séquentielles sont lues dans l' ordre antérieur.

Comme le montre la figure 6, les images séquentielles sont diffusées successivement de la figure Phoenix 0001 à la figure Phoenix 0025.À la fin de la lecture, la retransmission est répétée depuis le début de la séquence jusqu 'à la fin de la séquence.

![动图6](img/6.gif) 


(Figure 6)

####2.3.2 lecture en mode inverse

Définit la valeur d 'attribut wrapmode à 1 heure pour le mode de lecture inverse.C 'est - à - dire l' ordre dans lequel les images séquentielles sont lues après l 'entrée.Contrairement au mode de lecture orthogonale.

Comme le montre la figure 7, les images séquentielles sont diffusées successivement de la figure Phoenix 0025 à la figure Phoenix 0001.À la fin de la lecture, la lecture est répétée depuis Phoenix 0025 jusqu 'à la fin de Phoenix 0001.


![动图7](img/7.gif) 


(Figure 7)

####2.3.3 lecture en mode PINGPONG (ping - pong)

En regardant attentivement, on peut constater qu 'il n' y a pas de séquence ou d 'ordre, et que ce groupe de Phoenix ne fonctionne pas bien.La raison en est qu 'au moment de la conception de l' ensemble, les beaux - arts n 'ont conçu que des ailes qui volent du haut vers le bas, de sorte que la trame d' action manquait et que l 'action ne semblait pas fluide.

Le problème peut être résolu par l 'application d' une valeur d 'attribut wrapmode au mode Pingpong de 2 heures, avec le même ensemble d' actions dont l 'ordre de lecture s' achève de phoenix0001 à phoenix0025, non pas directement à la retransmission de Phoenix 0001, mais à l' inverse de Phoenix 0024 à phoenix0001.Ce qui rend l 'action plus lisse et plus complète.Par conséquent, le modèle Pingpong est aussi l 'un des modèles fréquemment utilisés dans le jeu et peut réduire considérablement les ressources artistiques, tout en préservant l' efficacité.Les résultats sont présentés dans la figure 8.

![动图8](img/8.gif) 


(Figure 8)

####2.4 intervalle de trames (Interval) pour la lecture d 'animations

`interval`Les propriétés peuvent définir un intervalle de trame (Unité: millisecondes) pour la lecture animée, la valeur par défaut étant de 50 millisecondes.Par exemple, nous allons doubler le Programme d'animation Phoenix, qui vient d'être diffusé, et le mettre en place pour 100 millisecondes.Les résultats sont présentés à la figure 9.


![动图9](img/9.gif) 


(Figure 9)

**Tips**- Oui.*Si l 'animation est en lecture, la durée de démarrage du minuteur de boucle de trame est remplacée par la durée actuelle, c' est - à - dire si l 'interfal est fréquemment configuré, l' intervalle de temps de mise à jour de la trame d 'animation sera plus lent, voire inexistant que prévu.*



####2.5 mise en place d'une lecture automatique (autoplay)

Les attributs autoplay peuvent définir si la lecture est automatique, par défaut false, et non automatique.Si vous êtes configuré pour vrai, l 'animation est créée et ajoutée à la scène et automatiquement diffusée.Les paramètres d 'attribut ne peuvent pas être prévisualisés instantanément dans l' IDE et doivent être affichés lors de l 'émission.



####2.6 autoanimation

Il peut y avoir plusieurs ensembles d 'animations dans un fichier d' animation à axe temporel créé dans layaair IDE (.Ani) et l 'un des noms d' animation peut être sélectionné pour être diffusé par l 'intermédiaire d' une propriété autoanimation.

**Tips**- Oui.

##- dans layaairide,`autoAnimation`Les attributs ne peuvent être attribués qu 'à la source de données`source`Les attributs (.Ani) d 'un fichier d' animation à axe temporel peuvent être définis. `autoAnimation`Valeur d 'attribut`时间轴动画`éditeur`帧属性`Panneau`动效名称`Nom de fichier



####2.7 emplacement initial de la lecture (Index)

Les attributs index peuvent spécifier un index de trame pour l 'animation, l' index par défaut étant 0, et peuvent être définis comme n 'importe quelle trame dans l' animation.Une fois les paramètres définis, vous sauterez sur la trame d 'animation définie.

Tips: Cette propriété n 'est utilisée que pour la désignation statique, par exemple pour le transfert manuel de trames d' animation au moyen d 'un code ou d' un événement de clic.Si vous êtes configuré pour une lecture automatique, la lecture commencera à partir de la première trame, sans rapport avec les paramètres de l 'index.



####2.8 Mise en place du modèle de mélange (blendmode)

Mode hybride`blendMode`Les attributs ne sont pas ouverts par défaut et le mode de mélange est activé lorsque les options Lighter sont définies.Les effets postérieurs à l 'ouverture sont indiqués dans la figure 10.

![动图10](img/10.gif) <br />


(Figure 10)

**Tips**- Oui.*Le mode hybride doit se situer dans la toile de scène.Par exemple, il n'est pas possible d'obtenir un mode hybride en configurant uniquement laya.stage.bgcolor.La figure 10 indique le rectangle des graphics.*



