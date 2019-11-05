#Clip Component Reference



##I. create clip components through layaairide

###1.1 Create Clip
Clip components can be used to display bitmap slice animation. Clip can divide a picture by the number of clipX, clipY, clipWidth and clipH8, from left to right, from top to bottom, and combine the segmentation into a slice animation.

Clip components can be used to play slice animation and display a frame of slice animation.
Clip the Clip component in the resource panel and drag it into the page editing area to add the Tab component to the page.
Clip script interface reference[Clip API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Clip)

Resource examples of Clip components:



​        ![图片0.png](img/1.png)<br/>
(Fig. 1)

Setting the value of clipX attribute to 10 will show the effect:

​![图片0.png](img/2.png)<br/>
(Figure 2)

The display effect after setting the value of index attribute to 1:

​![图片0.png](img/3.png)<br/>
(Figure 3)

###1.2 Common attributes of Clip components

​![图片0.png](img/4.png)<br/>
(Figure 4)

A kind of**attribute**A kind of**Function description**A kind of
| -------------------------------------------------------------------------------------------------------------------------------------------|
| The autoPlay | Boolean value indicates whether the current slice animation is automatically played. A kind of
| ClipWidth | The width of each slice when the image resource is segmented horizontally. A kind of
| clipH8 | Vertical segmentation of image resources, the height of each slice. A kind of
| ClipX | Number of equal-width cuts for horizontal segmentation of image resources. A kind of
| ClipY | The number of equal-cut portions in vertical segmentation of image resources. A kind of
| Index | Slice animation currently displays animation frame index. A kind of
| Interval | Slice animation playback interval. A kind of
| sizeGrid | Effective grid data for image resources (nine-grid data). A kind of
| Skin | tab button image resource. A kind of



##2. Creating Clip Components through Code

When we write code, we inevitably control UI through code and create it.`UI_Clip`Class, which sets Clip-related properties through code.

**Run the example effect:**

​	![1](gif/1.gif)<br/>
(Figure 5) Create counters by code

​![1](img/5.png)<br/>
(Fig. 6)

Clip's other attributes can also be set by code. The above example demonstrates how to get clip. clipX slices updated every second through a timer and realize the function of a timer by updating numbers every second. Interested readers can set Clip by code themselves and create Clip that meets the needs of their projects.

**Sample code:**


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








 