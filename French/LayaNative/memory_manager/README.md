# 显存池管理

Afin d 'éviter le risque que des applications soient directement tuées par le système en raison d' une surreprésentation ou du fait que le développeur a oublié de les libérer, il existe un mécanisme de gestion de la mémoire à layaplayer, dont les principes sont exposés dans la figure 1 ci - après:


![图1](img/1.jpg)  




**Pourquoi la gestion automatique de la mémoire, les premiers dispositifs iOS (iphone4s, IPAD2) ou les premiers dispositifs Android n 'ont que 512 mb de mémoire, lorsque la mémoire d' une application atteint environ 270 MB, l 'application est directement kill par le système, l' expérience de l 'utilisateur est très mauvaise, et la ressource photographique est la ressource la plus importante utilisée dans le jeu.**

###Configuration



####Paramètres par défaut

Size de la cellule de mémoire, l 'développeur doit établir une valeur par défaut à l' intérieur de layaplayer, en fonction de la mémoire du dispositif, avant l 'exécution de l' application, si l 'développeur ne l' a pas établie, comme suit:

```javascript

var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```




####1.2 Constitution de l'émetteur
L'développeur peut également être configuré en fonction de ses propres besoins et doit être configuré dans le config.js, avec le code suivant:


```javascript

var loadingView= window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;
    loadingView.bgColor("#ffffff");
    loadingView.setFontColor("#000000");
    loadingView.setTips(["新世界的大门即将打开", "敌军还有30秒抵达战场", "妈妈说，心急吃不了热豆腐"]);
}
//在这进行设定
var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.maxTextureMemSize = 80 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.maxTextureMemSize = 200 * 1024 * 1024;
}
```


**La configuration de la cellule de mémoire Size doit être placée au début de l 'application, la configuration non dynamique dans le programme, config.js est le JS qui sera exécuté immédiatement après le démarrage de layaplayer, c' est pourquoi il est le plus sûr.**



####1.3 où est config.js?

Édition IOS: ressources dans l'Annuaire des travaux
Version Android: Assets dans le catalogue des travaux



###Il y a eu de graves scintillations à l'écran et à l'écran.

Le projet est exécuté sous layaplayer, en cas de panne grave ou de scintillation de l 'écran.Le dispositif peut alors être connecté à l 'ordinateur pour visualiser log si celui - ci est régulièrement imprimé comme suit:


```verilog

freeRes(0):Total:8,left:5,clearedMem:115620
```


Comme le montre la figure 2 ci - dessous:
![图1](img/2.jpg)  


Cette situation s' explique par le fait que, dans l 'image actuelle, le nombre d' images dessinées dépasse déjà le nombre maximal Size de la Cellule d 'affichage, qui déclenche la fonction de nettoyage tout en risquant de scintiller.


###Comment y remédier

####3.1 Élargissement de la taille des dépôts

Si vous n 'imprimez pas le log des freeres de manière régulière, et que le clignotement de l' écran n 'existe pas, prouvez que le problème de l' existence, vous serez peut - être mieux d 'humeur à ce moment - là.

####3.2 s'attaquer aux causes profondes du problème

Si l 'on veut résoudre le problème sous - jacent, le développeur doit contrôler rigoureusement le cycle de vie de l' image, sa taille et l 'image résiduelle.
#####3.2.1 mode de calcul de l'affichage d'une image
Un.`1024*1024`La taille de l 'image est la suivante:`1024 * 1024 * 4 = 4MB`".
Un.`768*890`La taille de l 'image est la suivante:`1024 * 1024 * 4 = 4MB`La taille de la texture de création doit être de 2 n sous - puissance, tous`768*890`Dans la carte`1024*1024`Pour créer
3) Il est vivement recommandé aux beaux - arts, lors de la production d 'une image, d' exiger que la taille de celle - ci soit n sous - puissance de 2, si elle est large ou supérieure à 512 pixels, en gardant à l 'esprit que les dimensions 513 et 1025 ne doivent pas apparaître, et que les moteurs layaplayer, qui sont inférieurs à 512 pixels, traitent automatiquement les images fusionnées.
#####Mémoire d 'image
![图3](img/3.jpg)  


**Légende:**
Une image`768*890`, la taille du fichier est 420kb.
2) Chargement en réseau par fonction loader avec un débit de consommation de 420 KB.
Utilisation de la mémoire par décodage PG en imagebitmapdata`768*890*4=2.73MB`".
4) pour dessiner l 'image à l' écran, il faut d 'abord créer une texture sur la carte de visualisation, la taille de cette texture étant de 2 n sous - puissance, donc créer une`1024*1024`Les données imagebitmapdata sont ensuite téléchargées sur une carte à puce et mémorisées sur une copie affichée.
En ce moment`1024*1024*4=4MB`Affiche, les données d 'image sont automatiquement libérées dans le moteur après la copie de la mémoire à la carte.
6) Si une image est préchargée mais qu 'elle n' est pas dessinée depuis longtemps, la mémoire est toujours occupée et le moteur layaplayer libère par défaut la mémoire de l 'image 20 secondes après son chargement, puis le recharge du disque dur lorsque cela est nécessaire.

#####3.2.3 images précontraintes
Beaucoup d 'applications utilisent une fonction de préchargement et de Préchargement de nombreuses images à l' avance, mais ces images ne sont pas dessinées à ce moment - là, la mémoire est plus tendue et le moteur layaplayer efface par défaut ces ressources après 20 secondes de chargement.Il faut donc contrôler le nombre d 'images préchargées.
Si les besoins du projet sont simplement liés au téléchargement des images sur le site et à leur utilisation, cela peut se faire sous forme de paquets de ressources ou de layadcc.
En tout état de cause, il faut faire attention au nombre d 'images précontraintes.
L 'heure de suppression d' une image mémorisée peut être définie par le code suivant:


```javascript

conch.config.setImageReleaseSpaceTime(15000);//单位为毫秒，默认是20000
```

Log Output`JCImageManager::setReleaseSpaceTime=15000`Configuration réussie

**Il est préférable que la fonction "setimagereleasespacetime" soit également mentionnée dans config.js.**

#####3.2.4 problèmes de survie dus à la non - suppression de certains noeuds

Dans de nombreux projets, il est normal de commencer à entrer dans l 'interface de l' écran d 'entrée du jeu, mais de changer plusieurs interfaces ou d' entrer dans plusieurs scènes pour revenir, et de découvrir que l 'interface de l' écran d 'entrée est scintillante et log Imprime les freeres.
Cette situation s' explique en grande partie par le fait que certains noeuds n 'ont pas été supprimés et que l' image continue d 'être affichée, mais seulement masquée par l' interface principale, ce qui permet de s' assurer que votre application contrôle le mécanisme de suppression et de masquage des noeuds.


###Moyens de mise en route

Si vous avez un phénomène de 3.2.4 dans le projet, le moteur layaplayer offre un petit moyen de configurer toutes les images en translucidité, ce qui permet d 'identifier les problèmes de mise en évidence qui résultent de l' absence de masquage ou de suppression des images de noeuds.


```javascript

if( window.conch )
{
    window.conch.config.setTransparentMode();
}
```

**Tips**  
* 1, NCH n 'est disponible que dans l' environnement de layaplayer, il n 'y a pas de définition de Concord dans la version Web et tous les éléments doivent être évalués.*
*Si vous utilisez la langue as pour développer`Browser.window['conch'] `Ceci permet d 'obtenir l' objet Concord.*

Comme le montre la figure 4:

![图3](img/4.jpg)  

