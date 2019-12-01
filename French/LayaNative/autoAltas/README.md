#Système d 'Atlas automatique

##Généralités

Afin d 'optimiser l' efficacité de l 'application et de réduire le nombre de drawcall, un système de gestion d' Atlas automatisé est en place à layanative.Lorsque la largeur et la hauteur de l 'image sont inférieures à 512, l' image est automatiquement fusionnée dans l 'ensemble de majuscules, mais la méthode utilisée par le développeur n' a pas besoin d 'être modifiée.

Crée le nombre d 'Atlas automatiques de grande taille, layanative configure par défaut certains paramètres en fonction de la mémoire du dispositif.

Les paramètres par défaut sont les suivants:


```javascript

var nMem = conchConfig.getTotalMem();
if (nMem <= 524288) {
    conchConfig.atlasNum = 10;//10张 每张为1024*1024
    conchConfig.maxTextureMemSize = 64 * 1024 * 1024;
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 16;//16张 每张为1024*1024
    conchConfig.maxTextureMemSize = 84 * 1024 * 1024;
}
else if (nMem > 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
    conchConfig.maxTextureMemSize = 128 * 1024 * 1024;
}
```



##Comment configurer les agrégats de graphiques

Compte tenu des spécificités de chaque projet, le développeur peut également, en fonction de ses propres besoins, procéder à une configuration config.js, dont le Code est le suivant:


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
    conchConfig.atlasNum = 15;//15张 每张为1024*1024
}
else if (nMem > 524288 && nMem <= 1048576) {
    conchConfig.atlasNum = 20;//20张 每张为1024*1024
}
else if (nMem > 1048576) {
     conchConfig.atlasNum = 30;//30张 每张为1024*1024
}
```


**La configuration de la cellule de mémoire Size doit être placée au début de l 'application, la configuration non dynamique dans le programme, config.js est le JS qui sera exécuté immédiatement après le démarrage de layaplayer, c' est pourquoi il est le plus sûr.**  


##Où est renfig.js?

Édition IOS: ressources dans l'Annuaire des travaux
Version Android: Assets dans le catalogue des travaux


##Mise en place de limites de taille pour l'affichage d'images dans l'ensemble autographique

Comme indiqué plus haut, lorsque la largeur de l 'image et la hauteur sont inférieures à 512, elles sont automatiquement fusionnées dans l' ensemble des grandes cartes.

```javascript

conchConfig.pushAtlasLimitSize = 256;//当图片size小于256的时候，合并到大图合集中
```



##Notes spéciales

Remarque & ‧‧;: lorsque l 'image est fusionnée avec l' image principale, l 'affichage n' est pas immédiatement libéré lorsque l 'image est supprimée, car l' ensemble de l 'image contient d' autres images qui ne peuvent pas être effacées immédiatement de la carte.Cependant, le gestionnaire d 'Atlas automatisé gère automatiquement les cycles de vie de ces grands ensembles afin de s' assurer que le nombre d' images affichées est constant.Par exemple, la taille de l 'Atlas est de 1024 * 1024 et l' occupation est de 40mb.
