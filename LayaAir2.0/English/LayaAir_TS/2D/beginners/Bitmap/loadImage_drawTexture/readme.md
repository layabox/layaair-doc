#Display and Switch Pictures

> Picture display is the basis of game development. This article introduces two methods of displaying pictures, Sprite. loadImage and Graphics. drawTexture, from API to examples.

##1. Display and switch pictures with loadimage method

###1.1 Overview of the loadImage API

Searching for laya. display. Sprite in the API document, you can find the loadImage () method. As shown in Figure 1, let's familiarize ourselves with the parameters of this method.

![图1](img/1.png)<br/> (Fig. 1)

###1.2 An example of loading images with loadImage

Create a Sprite_DisplayImage.ts class and write the following code:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Texture = Laya.Texture;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class Sprite_DisplayImage {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#ffffff";
            this.showApe();
        }
         private showApe(): void {
            // 方法1：使用loadImage
            var ape: Sprite = new Sprite();
    	    ape.pos(100,50);
            Laya.stage.addChild(ape);
            ape.loadImage("../../res/apes/monkey3.png");
        }
    }
}
new laya.Sprite_DisplayImage();
```


In the sample code, "`100,50`” It is the display coordinate information of the picture. The example code runs as shown in Figure 2-1:

![图2-1](img/2-1.png)<br/> (Figure 2-1)

###1.3 Examples of switching pictures with loadImage

Switching pictures is based on displaying pictures, adding empty drawing, and then getting new picture resources through code logic to redraw. Specific code description can refer to code annotations and API, combined with the example running experience.

Next, we modify the code in the Sprite_SwitchTexture. TS class as follows:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Texture = Laya.Texture;
    import Handler = Laya.Handler;
    import Browser= Laya.Browser;
    import WebGL = Laya.WebGL;

    export class Sprite_SwitchTexture {
        private texture1: string = "../../res/apes/monkey2.png";
        private texture2: string = "../../res/apes/monkey3.png";
        private flag: boolean = false;
        private ape: Sprite;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER; 
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#ffffff";

            Laya.loader.load([this.texture1, this.texture2], Handler.create(this, this.onAssetsLoaded));
        }
        private onAssetsLoaded(): void {
            this.ape = new Sprite();
            Laya.stage.addChild(this.ape);
            this.ape.pivot(55, 72);
            this.ape.pos(100,50);

            // 显示默认纹理
            this.switchTexture();

            this.ape.on("click", this, this.switchTexture);
        }

        private switchTexture(): void {
            var textureUrl: string = (this.flag = !this.flag) ? this.texture1 : this.texture2;

            // 更换纹理
            this.ape.graphics.clear();
            var texture: Texture = Laya.loader.getRes(textureUrl);
            this.ape.loadImage(textureUrl);

            // 设置交互区域
            this.ape.size(texture.width, texture.height);
        }
    }
}

new laya.Sprite_SwitchTexture();
```


The effect of running the code is shown in Figure 2-2.

![动图2-2](img/2-2.gif)<br/> (Motion 2-2)







##2. Display and Switch Pictures by DraTexture Method

###2.1 DraTexture API Overview

Searching for laya. display. Graphics in API documents can find the drawTexture () method. In addition, you need to understand the load () method and getRes () method in laya. net. Loader Manager, and the create () method in laya. utils. Handler. The parameters of each method are shown in Figures 3, 4, 5 and 6.

![图3](img/3.png)<br/> (Figure 3)

![图4](img/4.png)<br/> (Figure 4)

![图2](img/5.png)<br/> (Fig. 5)

![图2](img/6.png)<br/> (Fig. 6)



###2.2 Examples of loading and displaying pictures with drawTexture

The loadImage () method can load external image resources in real time, or read image resources from the buffer. The drawTexture () method must first load the image, then draw it and add it to the stage, so it needs to be used in the sample code to load the image resources.（`Laya.loader.load()`) and callback（`Handler.create()`) Here we show a picture through simple sample code loading. Please see the comment section of the code and the related API instructions.

Create a Sprite_DisplayImage.ts class and write the following code:


```typescript


module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Texture = Laya.Texture;
    import Browser = Laya.Browser;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class Sprite_DisplayImage {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#ffffff";

            this.showApe();
        }
 
        private showApe(): void {
        
            // 方法2：使用drawTexture
            Laya.loader.load("../../res/apes/monkey2.png", Handler.create(this, function(): void {
                var t: Texture = Laya.loader.getRes("../../res/apes/monkey2.png");
                var ape: Sprite = new Sprite();
                ape.graphics.drawTexture(t, 0, 0);
                Laya.stage.addChild(ape);
                ape.pos(100, 50);
            }));
        }
    }
}
new laya.Sprite_DisplayImage();
```


The code runs as shown in Figure 7-1.

![图7-1](img/7-1.png)<br/> (Figure 7-1)





###2.3 Examples of switching pictures with drawTexture

Switching pictures is based on displaying pictures, adding empty drawing, and then getting new picture resources through code logic to redraw. Specific code description can refer to code annotations and API, combined with the example running experience.

Next, we modify the code in the Main. as entry class as follows:


```typescript

module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import Texture = Laya.Texture;
    import Handler = Laya.Handler;
    import Browser= Laya.Browser;
    import WebGL = Laya.WebGL;

    export class Sprite_SwitchTexture {
        private texture1: string = "../../res/apes/monkey2.png";
        private texture2: string = "../../res/apes/monkey3.png";
        private flag: boolean = false;

        private ape: Sprite;

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            Laya.loader.load([this.texture1, this.texture2], Handler.create(this, this.onAssetsLoaded));
        }
        private onAssetsLoaded(): void {
            this.ape = new Sprite();
            Laya.stage.addChild(this.ape);
            this.ape.pivot(55, 72);
            this.ape.pos(100,50);
            // 显示默认纹理
            this.switchTexture();
            this.ape.on("click", this, this.switchTexture);
        }
        private switchTexture(): void {
            var textureUrl: string = (this.flag = !this.flag) ? this.texture1 : this.texture2;
            // 更换纹理
            this.ape.graphics.clear();
            var texture: Texture = Laya.loader.getRes(textureUrl);
            this.ape.graphics.drawTexture(texture, 0, 0);
            // 设置交互区域
            this.ape.size(texture.width, texture.height);
        }
    }
}
new laya.Sprite_SwitchTexture();
```


The code runs as shown in Figure 7-2.

![动图7-2](img/7-2.gif)<br/> (Figure 7-2)





