#Set Filter Effect

> le moteur layaair produit trois effets: un filtre couleur, un filtre électroluminescent (ou ombre) et un filtre flou.Le filtre couleur supporte le mode Canvas et le mode webgl, alors que le filtre Luminescent et le filtre flou ne supportent que le mode webgl en raison de leur forte consommation de performances.



##Paramétrer un filtre couleur

###1.1 aperçu des filtres de couleur API

Le colorfilter color filter est situé dans le paquet laya.filters et modifie les canaux de couleurs par l 'intermédiaire d' une matrice spécifiée (* matrice disposée en 4 x 5 *).

Clic[laya.filters.ColorFilter ](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.ColorFilter)Voir la note API.



###1.2 Mise en place de filtres de couleur

Pour installer un filtre de couleur pour un bitmap, il faut d 'abord définir une matrice de couleurs, puis créer un exemple de filtre de couleur au moyen du procédé colorfilter, comme indiqué dans le code suivant:


```typescript

//颜色滤镜矩阵，红色
var colorMatrix:any = 
  [
  1, 0, 0, 0, 0, //R
  0, 0, 0, 0, 0, //G
  0, 0, 0, 0, 0, //B
  0, 0, 0, 1, 0, //A
];

//创建红色颜色滤镜
var redFilter:Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
```


Enfin, l 'effet du filtre couleur est superposé dans la carte de bits par les propriétés filters de spriter.Nous allons créer une catégorie de main.ts, avec le code suivant:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import ColorFilter = Laya.ColorFilter;
    import Texture = Laya.Texture;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class Main {
        private ApePath: string = "../../res/apes/monkey2.png";

        private apeTexture: Texture;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            Laya.loader.load(this.ApePath, Handler.create(this, this.setup));
        }

        private setup(): void {
            this.normalizeApe();
            this.makeRedApe();
            this.grayingApe();
        }

        private normalizeApe(): void {
            var originalApe: Sprite = this.createApe();

            this.apeTexture = Laya.loader.getRes(this.ApePath);
            originalApe.x = (Laya.stage.width - this.apeTexture.width * 3) / 2;
            originalApe.y = (Laya.stage.height - this.apeTexture.height) / 2;
        }

        private makeRedApe(): void {
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
            var redMat: Array<number> =
                [
                    1, 0, 0, 0, 0, //R
                    0, 0, 0, 0, 0, //G
                    0, 0, 0, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];

            //创建一个颜色滤镜对象,红色
            var redFilter: ColorFilter = new ColorFilter(redMat);

            // 赤化猩猩
            var redApe: Sprite = this.createApe();
            redApe.filters = [redFilter];

            var firstChild: any = Laya.stage.getChildAt(0);
            redApe.x = firstChild.x + this.apeTexture.width;
            redApe.y = firstChild.y;
        }

        private grayingApe(): void {
            //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
            var grayscaleMat: Array<number> = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];

            //创建一个颜色滤镜对象，灰图
            var grayscaleFilter: ColorFilter = new ColorFilter(grayscaleMat);

            // 灰度猩猩
            var grayApe: Sprite = this.createApe();
            grayApe.filters = [grayscaleFilter];

            var secondChild: any = Laya.stage.getChildAt(1);
            grayApe.x = secondChild.x + this.apeTexture.width;
            grayApe.y = secondChild.y;
        }

        private createApe(): Sprite {
            var ape: Sprite = new Sprite();
            ape.loadImage("../../res/apes/monkey2.png");
            Laya.stage.addChild(ape);

            return ape;
        }
    }
}

new laya.Main();
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet de filtre rouge et un bitmap d' effet de filtre gris.Les résultats opérationnels sont indiqués à la figure 1:

![图1](img/1.png)< br / > (Figure 1)





##Set Light and Shadow Filter

###2.1 Aperçu des filtres électroluminescents

Un glowfilter de type filtre électroluminescent, situé dans un paquet laya.filters, peut également être utilisé comme filtre d 'ombre en ajustant l' angle de décalage de la lumière, comme indiqué dans la figure 2.Remarque: le filtre ne fonctionne que dans le mode webgl.

![图2](img/2.png) <br /> (图2)


Clic[laya.filters. GlowFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.GlowFilter)Voir la note API.



###2.2 installation de filtres électroluminescents et de filtres d 'ombre

Les filtres lumineux et les filtres d 'ombre sont plus faciles à installer, nous visons directement les effets de l' exemple par codage.

Créer d 'abord une catégorie main.ts, dont le code sera rédigé comme suit:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import GlowFilter = Laya.GlowFilter;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class Main{
        private apePath: string = "../../res/apes/monkey2.png";

        private ape: Sprite;
        private apeGlow:Sprite;
        private apeShadow:Sprite;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#aabbcc";

            Laya.loader.load(this.apePath, Handler.create(this, this.setup));
        }

        private setup(): void {
             this.ape=this.createApe();
             this.ape.pos(100,50);
             this.apeGlow = this.createApe();
             this.apeGlow.pos(250,50);
             this.apeShadow = this.createApe();
             this.apeShadow.pos(400,50);
             this.GlowFilter();
             this.ShadowFilter();
        }
 
        private createApe(): Sprite {
            var ape = new Sprite();
            ape.loadImage(this.apePath);
            Laya.stage.addChild(ape);
            return ape;
        }

        private GlowFilter(): void {
            //创建一个发光滤镜
            var glowFilter: GlowFilter = new GlowFilter("#ffff00", 10, 0, 0);
            //设置滤镜集合为发光滤镜
            this.apeGlow.filters = [glowFilter];
        }
        private ShadowFilter(): void {
            //创建一个发光滤镜
            var shadowFilter: GlowFilter = new GlowFilter("#000000", 8, 8, 8);
            //设置滤镜为阴影滤镜
            this.apeShadow.filters = [shadowFilter];
        }
    }
}
new laya.Main();
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet de filtre électroluminescent et un bitmap d' effet de filtre d 'ombre.Les résultats opérationnels sont indiqués à la figure 3:

![图3](img/3.png) <br /> (图3)







##Installer un filtre flou

###3.1 brève description des filtres ambigus API

Le type de filtre flou blurfilter est situé dans le paquet laya.filters et, en réglant la résistance du filtre flou par rapport au paramètre Strength, la valeur est plus grande que le filtre flou.Les paramètres sont indiqués à la figure 4.Remarque: le filtre ne fonctionne que dans le mode webgl.

![图4](img/4.png)< br / > (Figure 4)

Clic[laya.filters. BlurFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.BlurFilter)Voir la note API.



###3.2 installation de filtres flous

La configuration du filtre flou est relativement simple, on crée un exemple de filtre flou, puis on définit la résistance du flou et on le superpose à un bitmap.

Créer d 'abord une catégorie main.ts, dont le code sera rédigé comme suit:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import BlurFilter = Laya.BlurFilter;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class Main {
        private apePath: string = "../../res/apes/monkey2.png";

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            Laya.loader.load(this.apePath, Handler.create(this, this.createApe));
        }

        private createApe(): void {
            var ape: Sprite = new Sprite();
            ape.loadImage(this.apePath);

            ape.pos(100,50);
            
            var apeBlur:Sprite = new Sprite();
            apeBlur.loadImage(this.apePath);
            apeBlur.pos(250,50);

            Laya.stage.addChild(ape);
            Laya.stage.addChild(apeBlur);

            this.applayFilter(apeBlur);
        }

        private applayFilter(ape: Sprite): void {
            var blurFilter: BlurFilter = new BlurFilter();
            blurFilter.strength = 5;
            ape.filters = [blurFilter];
        }
    }
}
new laya.Main();
```


Dans le code ci - dessus, nous avons créé un bitmap original, un bitmap d 'effet filtre flou.Les résultats opérationnels sont indiqués à la figure 5:

![图5](img/5.png)< br / > (Figure 5)



