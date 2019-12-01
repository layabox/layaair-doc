#Panneau statistique de performance

Au début de la conception du moteur layaair, dans le premier objectif, a fait un grand nombre d 'optimisations de performances dans le moteur.L 'utilisation rationnelle de bons moteurs, de sorte que les moteurs de jeux et d' autres produits à l 'origine de l' app expérience.Si le développeur ne peut pas utiliser les avantages d 'un bon moteur, alors le jeu sera finalement une expérience de performances ou ne pourra pas en parler.Il est donc nécessaire de maîtriser le jeu et d 'optimiser les moteurs pendant la fabrication du jeu.



> pour comprendre les performances des moteurs, il faut d 'abord comprendre le panneau statistique de performance, qui sera décrit plus en détail ci - dessous.



##Appel d 'un panneau de statistiques de performance

Le panneau de statistiques de performance intégré au moteur layaair permet de détecter les performances actuelles en temps réel.L 'appel à des tableaux statistiques peut varier en fonction de la langue de développement.

La langue ts est entrée directement dans le Code.`Laya.Stat.show(0,0);`Panneau de statistiques de performance

L'exemple demo.ts établit le code suivant:


```typescript

//初始化舞台
Laya.init(1136, 640);
//调用性能统计面板方法，(0,0)为面板位置坐标
Laya.Stat.show(0,0);
```


**Tips**Attention à la taille.



##Présentation concernant le FPS

###2.1 Généralités

Le FPS est un abréviation du nombre de trames de transmission par seconde (Frames Per Second).Si la vitesse de trame du jeu est de 60fps, la durée d 'exécution de chaque trame est de 1 / 60 s pendant le fonctionnement du jeu.Plus la vitesse de trame est élevée, plus la sensation est fluide.

![图1](img/1.png)< br / > (Figure 1)

La trame complète actuelle de PC et d 'appareils tels que les téléphones cellulaires est de 60 trames, comme le montre la figure 1, mais certains jeux ne nécessitent pas un débit d' image élevé ou peuvent utiliser un procédé de limitation de vitesse de trame de moteur`Stage.FRAME_SLOW`, limite la vitesse de trame FPS à 30 trames maximum.

Comme l 'environnement de fonctionnement réel est dans le navigateur, les performances dépendent également de l' efficacité du décodeur Javascript, de sorte que les valeurs FPS du même jeu peuvent varier d 'un navigateur à l' autre.Cette partie n 'est pas déterminée par l' développeur, qui peut utiliser autant que possible les bons moteurs et optimiser les éléments afin d 'améliorer la vitesse de trame FPS dans des dispositifs de bas de gamme ou des navigateurs à faible performance.

####2.2 Le FPS selon différents modes

Le moteur layaair supporte les deux modes de rendu Canvas et webgl.Donc, en regardant la vitesse de la trame FPS, il faut savoir dans quel mode,`FPS(Canvas)`Note: la vitesse de trame en mode Canvas est indiquée dans la figure 1;`FPS(WebGL)`Note: la vitesse de trame en mode webgl est indiquée dans la figure 2.

![图片2.png](img/2.png)< br / > (Figure 2)

####2.3 Description des valeurs du FPS

Figure 1 et figure 2, première valeur jaune du FPS`60`Actuel**Vitesse de trame FPS**Le plus haut est le mieux.

Second Yellow value`16`Pour**Temps de rendu par trame**, l 'unité est milliseconde, cette valeur est la plus petite.

Si ces deux valeurs ne sont pas maintenues dans la trame complète, des changements peuvent se produire au cours du fonctionnement du produit, comme le montre la figure 3.

![动图3](img/3.gif) <br /> (动图3)











##Introduction de Sprite

Sprite calcule le nombre de tous les noeuds de rendu (y compris les conteneurs) dont la taille peut influer sur le nombre de fois où les noeuds du moteur sont parcourus, organisés et rendus.Plus le nombre est bas, mieux c 'est.Il est donc recommandé de réduire au minimum les noeuds de rendu lors de la conception du projet.





##Introduction de drawcall


 **Le nombre de drawcall est un indicateur important de la performance.**, située à la troisième ligne du tableau de bord statistique, comme le montre la figure 4.Drawcall représente un sens différent pour Canvas et webgl, mais le moins possible.**Il est recommandé que l'émetteur soit limité à moins de 100.**".

![图4](img/4.png)< br / > (Figure 4)



####4.1 drawcall sous Canvas

En mode canvas, drawcall indique le nombre de dessins par trame, y compris les images, le texte et les dessins vectoriels.

####4.2 drawcall sous webgl

Dans le mode webgl, drawcall représente un lot de présentation de rendu, chaque fois que les données sont préparées et que l 'unité de rendu est notifiée à l' unité de rendu sous le nom de drawcall.



##Présentation de curmem

En mode webgl, curmem représente l 'occupation de la mémoire et de la mémoire, la valeur étant la plus faible possible.

En mode canvas, il n 'y a pas de concept de présence et curmem ne représente que l' occupation de la mémoire, la valeur la plus faible étant la meilleure.



##Présentation de Shader

Shader est un indicateur de performance unique du modèle webgl, qui indique le nombre de soumissions par trame Shader, la valeur étant la plus faible possible.



##Présentation par Canvas

Il y a trois valeurs ici, Canvas. Comme le montre la figure 5, le service n'a de valeur qu'après avoir défini le cacheas, par défaut.`0/0/0`".Le sens des valeurs de gauche à droite est le suivant:`每帧重绘的画布数量`/`缓存类型为“normal”类型的画布数量`/`缓存类型为“bitmap”类型的画布数量`".


![图5](img/5.png) <br /> (图5)



**Tips**: pour une présentation plus optimisée de casheas, on peut consulter le document "Optimisation de cache statique de casheas"










 