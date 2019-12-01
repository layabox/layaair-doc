# Image 组件参考



## 一、通过LayaAirIDE创建Image组件

###1.1 Création d'image

Image est l 'ensemble d' images d 'affichage le plus courant dans l' UI pour afficher des images bitmap.Les propriétés Skin de l 'ensemble image peuvent être définies pour modifier l' image présentée par l 'ensemble image.L 'ensemble image supporte les réglages de données de la grille de Jiujiang afin d' obtenir un effet de non - distorsion de l 'affichage d' image après l 'agrandissement de l' image.

Cliquez sur l 'ensemble image dans le panneau de ressources et faites glisser - le dans la zone d' édition de page, ce qui permet d 'ajouter l' ensemble image à la page.Cliquez sur l 'image sélectionné pour définir la valeur des attributs communs image dans le panneau d' attributs.
Interface de script d 'un composant image[Image API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Image)".

​**Exemples de ressources pour le module Image:**



​        ![图片0.png](img/1.png)< br / >
(Figure 1)

​**Le module image affiche l 'effet après l' avoir glissé dans la zone d 'édition:**

​![图片0.png](img/2.png)< br / >
(Figure 2)

###1.2 caractéristiques communes des composants image

​![图片0.png](img/3.png)< br / >
(Figure 3)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 - - - - - [124 - - - [124] - - - - [124 -------------------------------------------------------------------------
Les données de la grille sont mises à l 'échelle de manière efficace (données de la grille de 9ème étage).- 124.
La ressource du bitmap.- 124.

Après ajout de l 'ensemble image, l' image de ressource d 'affichage de l' ensemble image peut être modifiée en tirant la ressource d 'image du panneau de ressources vers la zone d' attribut skin d 'image.

##Création d 'un composant image par Code

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_Image`Classe, les attributs associés à image sont définis par Code.

**Exécution de l 'exemple:**
​![5](img/4.png)<br/>

Figure 5 création d 'image par Code

D 'autres attributs de l' image peuvent également être définis par un code qui montre comment créer des images différentes de la peau (Styles) au moyen d 'un code.

Les lecteurs intéressés peuvent définir eux - mêmes l 'image par Code et créer des images qui répondent à leurs besoins.

**Exemple:**


```javascript

module laya {
	import Stage = Laya.Stage;
	import Image = Laya.Image;
	import WebGL = Laya.WebGL;

	export class UI_Image {
		constructor() {
			// 不支持WebGL时自动切换至Canvas
			Laya.init(550, 400, WebGL);

			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;

			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			Laya.stage.bgColor = "#232628";

			this.setup();
		}

		private setup(): void {
			var dialog: Image = new Image("res/ui/dialog (3).png");
			dialog.pos(165, 62.5);
			Laya.stage.addChild(dialog);
		}
	}
}
new laya.UI_Image();
```


