#ProgressBar Component Reference



##1. Creating ProgressBar Components through LayaAirIDE

###1.1 Create ProgressBar

ProgressBar is often used to show the progress of an operation in a game, such as the progress of loading resources, role experience or blood volume.
Click on the ProgressBar component in the Resource Panel and drag it into the page editing area to add the ProgressBar component to the page.
Reference to the script interface of ProgressBar[ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)。

Examples of resources for ProgressBar components:

​![图片0.png](img/1.png)<br/>
(Fig. 1)

​![图片0.png](img/2.png)<br/>
(Figure 2)

After setting the value of the property value of the ProgressBar component to 0.3, the display effect is as follows:

​![图片0.png](img/3.png)<br/>
(Figure 3)



  



###1.2 common properties of ProgressBar component

​![图片0.png](img/4.png)<br/>
(Figure 4)

A kind of**attribute**A kind of**Function description**A kind of
| ----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Effective scaling of grid data for image resources of sizeGrid | progress bar. A kind of
| Skin | progress bar image resource. A kind of
| Value | Progress bar progress value, 0 to 1. A kind of



 



##2. Creating ProgressBar by Code

When we write code, we inevitably control UI through code, create UI_ProgressBar class, and import it into code.`laya.ui.ProgressBar`The package of ProgressBar and the related properties of ProgressBar are set by code.

**Run the example effect:**
​![5](gif/1.gif)<br/>
(Figure 5) Create ProgressBar from code

Other attributes of ProgressBar can also be set by code. The above example demonstrates how to create different skin (style) ProgressBar by code. Interested readers can set ProgressBar by code themselves and create progress bars that meet their needs.

**Sample code:**


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


