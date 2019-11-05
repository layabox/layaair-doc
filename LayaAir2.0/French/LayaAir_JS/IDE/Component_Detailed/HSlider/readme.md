#Références de composants hslider



##Comprendre l 'ensemble hslider

###1.1 démonstration du rôle et des effets de hslider

Les ensembles hslider et vslider sont des sous - catégories des ensembles Slider qui indiquent respectivement une barre de glissement latérale et une barre de glissement longitudinale.L 'utilisateur peut sélectionner une valeur en déplaçant le curseur entre les rails de glissière.Used in such as the Control of the Progress of the player, the Control of Volume and size, the Numerical Adjustment on Some ui.

L 'ensemble hslider suit une direction horizontale.La piste de glissière s' étend de gauche à droite, tandis que l 'étiquette qui affiche la valeur de position du bloc de glissement est située au - dessus de la piste et peut être masquée.

​![图片1.gif](img/1.gif)< br / >
(Figure 1)



###1.2 spécifications pour la peau (Skin) des composants hslider

Hslider resource name Gauge with hsliser as a préfixe, its pass Resource total three, respective slide Resources`hslider$bar.png`Barre de progression`hslider$progress.png`Ressources de diagramme`hslider.png`".

La ressource doit avoir au moins deux ressources, une ressource de diagramme de base et une ressource de glissière, faute de quoi la fonction de glissement ne peut être réalisée.L 'absence de l' ensemble de ressource de bande de progression n 'est pas incorrecte, mais ne permet pas d' afficher l 'état d' avancement.

Tips: ressources de barres de progression`hslider$progress.png`Ressources de base`hslider.png`Le rythme de commutation peut être inversé.

![图片0.png](img/1.png)<br/>

(Figure 2)



###1.3 présentation API des composants hslider

Pour la présentation de l'API de hslider, voir[http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HSlider](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HSlider)".



##Création d 'un composant hslider par layaairide

###1.1 Création de hslider

Cliquez sur les ressources du module hslider dans le panneau de ressources de sélection et faites glisser - les dans la zone d 'édition de page pour ajouter le module hslider à la page.

Après avoir glissé le hslider dans la zone d 'édition, définissez les propriétés de la grille sizegrid de sorte qu' elles ne s' étirent pas après l 'agrandissement et affichent les effets suivants:



​        ![图片2.png](img/2.png)< br / >
(Figure 2)

###1.2 caractéristiques usuelles des composants hslider

Définit la valeur max de l 'attribut hslider pour 20, la valeur min de l' attribut pour 0, et la valeur valeur valeur valeur valeur value de l 'attribut pour 5.

​![图片3.png](img/3.png)< br / >
(Figure 3)

**Max:**HSlider滑块拖动到最右边时的最大值，默认数值为100；

**Min:**La valeur minimale lorsque le curseur hslider glisse vers la gauche la plus proche, par défaut 0;

**Valeur:**La valeur actuelle des glissières doit être égale à Max ou min ou entre elles.

​![图片4.png](img/4.png)< br / >
(Figure 4)

Vous pouvez glisser le curseur pour sélectionner une valeur:

​![图片5.gif](img/5.gif)< br / >
(Figure 5)



###1.3 autres caractéristiques particulières des composants hslider

D 'autres attributs génériques sont décrits en détail dans le paramètre d' attributs, ci - après les propriétés particulières associées à l 'ensemble hslider.

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 --------------------------------------------------------------------------------------------------------------
12.124 ~ arrowclickback \ \ 124 \ \ à partir d 'une valeur booléenne, spécifie si la valeur d' attribut value peut être modifiée en cliquant sur la barre de glissement.- 124.
La valeur booléenne \ \ 124 \ \ showlabel \ \ 124 détermine si l 'étiquette affiche la valeur value au - dessus du curseur.- 124.
La valeur d 'échelle de la barre coulissante \ \ \ \ \ \ \ \ \ \ \ \ \ \ \La valeur par défaut est 1.- 124.


 
