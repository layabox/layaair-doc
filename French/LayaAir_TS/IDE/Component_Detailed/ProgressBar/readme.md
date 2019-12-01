#Références de composants progressbar



##Création d 'un module progressbar par layaairide

###1.1 Création de progressbar

Progressbar est souvent utilisé pour afficher l 'avancement d' une opération dans un jeu, par exemple l 'avancement des ressources chargées, l' expérience du rôle ou l 'avancement du volume sanguin.
Cliquez sur l 'ensemble progressbar dans le panneau de ressources de sélection et faites glisser - le dans la zone d' édition de page, ce qui permet d 'ajouter l' ensemble progressbar à la page.
Référence d 'interface de script de progressbar[ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)".

Exemples de ressources du module progressbar:

​![图片0.png](img/1.png)< br / >
(Figure 1)

​![图片0.png](img/2.png)< br / >
(Figure 2)

Après avoir défini une valeur de valeur de 0,3 pour les propriétés de l 'ensemble progressbar, l' effet s' affiche comme suit:

​![图片0.png](img/3.png)< br / >
(Figure 3)



  



###1.2 caractéristiques communes des composants progressbar

​![图片0.png](img/4.png)<br/>

(Figure 4)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 -----------------------------------------------------------------------------------------------------------
Les données de grille sont mises à l 'échelle de manière efficace pour les ressources d' image de la barre d 'avancement.- 124.
La ressource d 'image de la barre d' avancement.- 124.
La valeur de progression de la barre d 'avancement \ \ \ \ \ \ \ \ \ \ \ \ \ - 124.



 



##Création de progresbar par Code

Quand on écrit le Code, on contrôle l 'ui par le Code, on crée la classe Ui U progressbar, on l' introduit dans le Code.`laya.ui.ProgressBar`Et définit les attributs associés au progressbar par l 'intermédiaire du Code.

**Exécution de l 'exemple:**
​![5](gif/1.gif)< br / >
Figure 5 création de progressbar par Code

D 'autres attributs de progressbar peuvent également être définis au moyen d' un code qui montre comment créer un progressbar à partir d 'un code pour différentes peaux (Styles), les lecteurs intéressés pouvant définir eux - mêmes le progresbar au moyen du Code pour créer une barre de progression adaptée à leurs besoins.

**Exemple:**


```javascript

module laya {
    import Stage = Laya.Stage;
    import ProgressBar = Laya.ProgressBar;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class UI_ProgressBar {
        private progressBar: ProgressBar;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(800, 600, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";

            Laya.loader.load(["res/ui/progressBar.png", "res/ui/progressBar$bar.png"], Handler.create(this, this.onLoadComplete));
        }

        private onLoadComplete(): void {
            this.progressBar = new ProgressBar("res/ui/progressBar.png");

            this.progressBar.width = 400;

            this.progressBar.x = (Laya.stage.width - this.progressBar.width) / 2;
            this.progressBar.y = Laya.stage.height / 2;

            this.progressBar.sizeGrid = "5,5,5,5";
            this.progressBar.changeHandler = new Handler(this, this.onChange);
            Laya.stage.addChild(this.progressBar);

            Laya.timer.loop(100, this, this.changeValue);
        }

        private changeValue(): void {

            if (this.progressBar.value >= 1)
                this.progressBar.value = 0;
            this.progressBar.value += 0.05;
        }

        private onChange(value: number): void {
            console.log("进度：" + Math.floor(value * 100) + "%");
        }
    }
}
new laya.UI_ProgressBar();
```


