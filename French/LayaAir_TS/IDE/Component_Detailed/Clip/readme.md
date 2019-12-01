# Clip 组件参考



##Création d 'un composant clip par layaairide

###1.1 Création de clip
L 'ensemble clip peut être utilisé pour afficher une animation de bitmap.Le clip peut combiner une image avec un nombre de clipx divisé horizontalement, un nombre de clipy divisé verticalement ou une largeur de clipwidth de chaque tranche transversale, et une hauteur de clipy height qui divise verticalement chaque tranche, de gauche à droite et de haut en bas en une animation de coupe.

L 'ensemble clip peut être utilisé pour reproduire une animation de tranches et pour afficher une image de trame de l' animation de tranches.
Cliquez sur l 'ensemble clip dans le panneau de ressources et faites glisser - le dans la zone d' édition de page, ce qui permet d 'ajouter l' ensemble tab à la page.
Références d 'interface de script clip[Clip API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Clip)

Exemples de ressources du module clip:

​![图片0.png](img/1.png)< br / >
(Figure 1)

Définit la valeur des propriétés clipx pour un effet d 'affichage après 10:

​![图片0.png](img/2.png)<br/>

(Figure 2)

Définit la valeur des propriétés index comme un effet d 'affichage après 1:

​![图片0.png](img/3.png)< br / >
(Figure 3)

###1.2 caractéristiques communes des composants clip

​![图片0.png](img/4.png)< br / >
(Figure 4)

- 124.**Attribut**- 124.**Description fonctionnelle**- 124.
124 --------------------------------------------------------------------------------------------
La valeur \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
La largeur de chaque lame est divisée latéralement.- 124.
Lorsque les ressources d 'image sont divisées longitudinalement, la hauteur de chaque lame.- 124.
Le nombre d 'éléments de coupe à large largeur est égal à celui des ressources d' image divisées latéralement par 124.- 124.
Lorsque la ressource d 'image est divisée longitudinalement par- 124.
L 'index de la trame d' animation active est affiché sous forme d 'animation en lames.- 124.
124 Interval \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.
Données de grille valides (données de la grille de la neuvième maison) pour les ressources d 'images.- 124.
La ressource d 'image \ \ \ \ \ \ \ \ \ \ \ \ \ \- 124.



##Création d 'un composant clip par Code

Quand on écrit un code d 'écriture, on ne peut pas forcément contrôler l' ui par le Code, créer`UI_Clip`Classe, les propriétés associées à clip sont déterminées par Code.

**Exécution de l 'exemple:**

​	![1](gif/1.gif)<br/>

Figure 5 création de compteurs par Code

​![1](img/5.png)< br / >
(Figure 6)

D 'autres attributs de clip peuvent également être définis au moyen d' un code, l 'exemple ci - dessus montre comment chaque seconde de mise à jour de clip.clipx peut être obtenue au moyen d' un minuteur, la fonction de l 'horloge peut être réalisée au moyen d' une mise à jour numérique par seconde, et le lecteur intéressé peut créer lui - même un clip correspondant aux besoins de son projet par l 'intermédiaire d' un code.

**Exemple:**


```typescript

module laya {
    import Stage = Laya.Stage;
    import Button = Laya.Button;
    import Clip = Laya.Clip;
    import Image = Laya.Image;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class UI_Clip {
        private buttonSkin: string = "res/ui/button-7.png";
        private clipSkin: string = "res/ui/num0-9.png";
        private bgSkin: string = "res/ui/coutDown.png";

        private counter: Clip;
        private currFrame: number;
        private controller: Button;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(800, 600, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";
			//预加载资源
            Laya.loader.load([this.buttonSkin, this.clipSkin, this.bgSkin], Laya.Handler.create(this, this.onSkinLoaded));
        }

        private onSkinLoaded(): void {
            this.showBg();
            this.createTimerAnimation();
            this.showTotalSeconds();
            this.createController();
        }

        private showBg(): void {
            var bg: Image = new Image(this.bgSkin);
            bg.size(224, 302);
            bg.pos(Laya.stage.width - bg.width >> 1, Laya.stage.height - bg.height >> 1);
            Laya.stage.addChild(bg);
        }

        private createTimerAnimation(): void {
            this.counter = new Clip(this.clipSkin, 10, 1);
            this.counter.autoPlay = true;
            this.counter.interval = 1000;

            this.counter.x = (Laya.stage.width - this.counter.width) / 2 - 35;
            this.counter.y = (Laya.stage.height - this.counter.height) / 2 - 40;

            Laya.stage.addChild(this.counter);
        }

        private showTotalSeconds(): void {
            var clip: Clip = new Clip(this.clipSkin, 10, 1);
            clip.index = clip.clipX - 1;
            clip.pos(this.counter.x + 60, this.counter.y);
            Laya.stage.addChild(clip);
        }

        private createController(): void {
            this.controller = new Button(this.buttonSkin, "暂停");
            this.controller.labelBold = true;
            this.controller.labelColors = "#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF";
            this.controller.size(84, 30);

            this.controller.on('click', this, this.onClipSwitchState);

            this.controller.x = (Laya.stage.width - this.controller.width) / 2;
            this.controller.y = (Laya.stage.height - this.controller.height) / 2 + 110;
            Laya.stage.addChild(this.controller);
        }

        private onClipSwitchState(): void {
            if (this.counter.isPlaying) {
                this.counter.stop();
                this.currFrame = this.counter.index;
                this.controller.label = "播放";
            }
            else {
                this.counter.play();
                this.counter.index = this.currFrame;
                this.controller.label = "暂停";
            }
        }
    }
}
new laya.UI_Clip();
```








 