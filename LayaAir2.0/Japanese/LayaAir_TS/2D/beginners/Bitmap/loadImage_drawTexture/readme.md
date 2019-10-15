#画像の表示と切り替え

>画像の表示はゲーム開発の基礎であり、本編ではAPIから例に至るまで、それぞれSprite.loadImageとGraphics.drawTextureの2種類の画像を表示する方法を紹介します。

##1、loadImage方法で画像を表示し、切り替えする

###1.1 loadImage APIの概要

APIドキュメントでlaya.display.Spriteを検索すると、図1に示すように、loadImage（）の方法が見つけられます。まず、この方法のパラメータを熟知してみます。

![图1](img/1.png)<br/>(図1)

###1.2 loadImageで表示画像をロードする例

Sprite_DisplayImage.ts類を作成し、コードを作成するには以下の通りです。


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


サンプルコードには、「`100,50`」は、画像の表示座標情報です。コードの実行例の効果は図2-1に示す通りです。

![图2-1](img/2-1.png)<br/>(図2-1)

###1.3 loadImageで画像を切り替える例

画像の切り替えは、表示画像の上に空の描画を追加し、コードロジックを介して新たな画像リソースを取得して再描画します。具体的なコード説明は、コード注釈およびAPIを参照して、インスタンスに関連して体験を実行することができる。

次に私達はSpritechwitch Texture.tsの中でコードを修正します。以下の通りです。


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


動作コードの効果は、図2-2に示すように、

![动图2-2](img/2-2.gif)<br/>(図2-2)







##2、DRawTexture方法で画像を表示し、切替する

###2.1 drawTexture APIの概要

APIドキュメントでlaya.display.Graphicsを検索すると、drawTexture（）方法が見つかるほか、laya.net.Loader Managerのロード（）方法とgetsRes（）方法、laya.utils.Handlerのcreate（方法）、各方法のパラメータ図3、図5、図6

![图3](img/3.png)<br/>(図3)

![图4](img/4.png)<br/>(図4)

![图2](img/5.png)<br/>(図5)

![图2](img/6.png)<br/>(図6)



###2.2 DRawTextureで表示画像をロードする例

loadImage（）方法は外部画像リソースを即時にロードしてもいいし、バッファから画像リソースを読み取ることもできます。drawTexture（）方法はまず画像をロードしてから舞台に追加する必要があります。したがって、コード例ではロードに使用する必要があります。`Laya.loader.load()`）とコールバック（`Handler.create()`）の方法は、以下の簡単な例示的なコードを通して画像をロードして表示します。コードの説明はコードの注釈部分と関連APIの説明を見てください。

Sprite_DisplayImage.ts類を作成し、コードを作成するには以下の通りです。


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


コード運転効果を図7-1に示します。

![图7-1](img/7-1.png)<br/>(図7-1)





###2.3 drawTextureで画像を切り替える例

画像の切り替えは、表示画像の上に空の描画を追加し、コードロジックを介して新たな画像リソースを取得して再描画します。具体的なコード説明は、コード注釈およびAPIを参照して、インスタンスに関連して体験を実行することができる。

下記のようにMain.asエントリクラスでコードを修正します。


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


コード運転効果を図7-2に示します。

![动图7-2](img/7-2.gif)<br/>(図7-2)





