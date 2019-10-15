# VScrollBar 组件参考



##I. create vscrollbar component through layaairide

###1.1 Create VScrollBar

The VScrollBar component is a vertical scrollbar component.
When there is too much data to accommodate the display area, the end user can use the VScrollBar component to control the data portion displayed.
The scrollbar consists of four parts: a track map, a slider button and two arrow buttons.
Click on the VScrollBar component in the Resource Panel and drag it into the page editing area to add the VScrollBar component to the page.
Refer to the script interface for the VScrollBar component[VScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VScrollBar)。
Examples of image resources for VScrollBar components:

​![图片0.png](img/1.png)<br/>

(Fig. 1)

​![图片0.png](img/2.png)<br/>
(Figure 2)
​![图片0.png](img/3.png)<br/>
(Figure 3)

​![图片0.png](img/4.png)<br/>
(Figure 4)

Drag and drop VScrollBar into the editor area to display the effect:

​![图片0.png](img/5.png)<br/>
(Fig. 5)

After setting the value of attribute max of VScrollBar to 10, the value of attribute min to 0, and the value of attribute value to 3, the display effect is as follows:

​![图片0.png](img/6.png)<br/>
(Fig. 6)

When running the program, you can drag the slider or click the arrow button to control the value of the progress bar:

​![图片0.gif](gif/1.gif)<br/>
(Figure 7)

Set the value of showButtons of VScrollBar to false:

​![图片0.png](img/7.png)<br/>
(Figure 8)

The effect of running a program:

​![图片0.png](gif/1.gif)<br/>
(Figure 9)

###1.2 Common attributes of VScrollBar components

​![图片0.png](img/8.png)<br/>
(Figure 10)

A kind of**attribute**A kind of**Function description**A kind of
| -----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Skin | scrollbar image resource address. A kind of
| SizeGrid | Scroll Bar Track Map Resource Scales Grid Data Effectively (Nine-Palace Data). A kind of
| Value | Number indicating the current scrolling position. A kind of
| min | A number representing the lowest scrolling position. A kind of
| Max | A number representing the highest scrolling position. A kind of
| scrollSize | represents the increment of page scroll when the scrollbar track is pressed. A kind of
| mouseWheelEnable | A Boolean value that specifies whether the pulley is rolling or not, and the default value is true. A kind of
| touchScrollEnable | A Boolean value that specifies whether to turn on the touch, with the default value of true. A kind of
| AutoHide | A Boolean value that specifies whether the scrollbar is automatically hidden (without scrolling), and the default value is false. A kind of
| ShowButton | A Boolean value that specifies whether the up and down buttons are displayed. The default value is true. A kind of



 

 



##2. Creating VScrollBar Components by Code

When we write code, we inevitably control the UI through code and create it.`UI_ScrollBar`Class, and set VScrollBar-related properties through code.

**Run the example effect:**
​![5](gif/3.gif)<br/>
(Figure 11) Create VScrollBar from code

Other attributes of VScrollBar can also be set by code. The following sample code demonstrates how to create VScrollBar by code. Interested readers can set VScrollBar by code and create scrollbars that meet their needs.

**Sample code:**


```javascript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import HScrollBar = Laya.HScrollBar;
    import ScrollBar = Laya.ScrollBar;
    import VScrollBar = Laya.VScrollBar;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;
    export class UI_ScrollBar {
        /***垂直滚动条资源**/
		private skins:Array<string>=["res/ui/vscroll.png", 
								"res/ui/vscroll$bar.png", 
								"res/ui/vscroll$down.png",
								"res/ui/vscroll$up.png"];
        /***提示信息文本框**/
        private promptText:Text;      	
		/****垂直滚动条****/
		private vScrollBar:VScrollBar;
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(800, 600, WebGL);
            //画布垂直居中对齐
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            //画布水平居中对齐
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            //等比缩放
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            //背景颜色
            Laya.stage.bgColor = "#232628";
            //加载资源
            Laya.loader.load(this.skins, Handler.create(this, this.onSkinLoadComplete));
        }
         /***加载资源完成***/
        private onSkinLoadComplete(e:any=null):void
        {
            //创建垂直滚动条
			this.createVScroller();
        }
        /***创建水平滚动条***/
        private createVScroller():void 
        {
            //实例化垂直滚动条
            this.vScrollBar= new VScrollBar();
            //加载皮肤资源（其他资源根据规范命名后，会自动加载）
            this.vScrollBar.skin = "res/ui/vscroll.png";
            //设置宽度
            this.vScrollBar.width = 400;
            //设置位置
            this.vScrollBar.pos(150, 170);
            //最低滚动位置数字
            this.vScrollBar.min = 0;
            //最高滚动位置数字
            this.vScrollBar.max = 100;
            //滚动变化事件回调
            this.vScrollBar.changeHandler = new Handler(this, this.onChange);
            //加载到舞台
            Laya.stage.addChild(this.vScrollBar);
            //创建提示信息
            this.createPromptText(this.vScrollBar)
        }        
        /***创建提示信息***/
        private createPromptText(scrollBar:ScrollBar):void
        {
            //实例化提示信息
            this.promptText=new Text();
            //提示框字体
            this.promptText.font="黑体";
            //提示框字体大小
            this.promptText.fontSize=26;
            //提示框字体颜色
            this.promptText.color="#FFFFFF";
            //提示框初始文本
            this.promptText.text="您的选择是： ";
            //加载到舞台
            Laya.stage.addChild(this.promptText);
            //设置提示框位置
            this.promptText.pos(scrollBar.x,scrollBar.y-50);
        }
        /***滚动条位置变化回调***/
        private onChange(value:Number):void 
        {
            this.promptText.text= "滚动条的位置： value=" + value;
        }
    }
}
new laya.UI_ScrollBar();
```


