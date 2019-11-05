#ComboBox Component Reference



## 一、通过LayaAirIDE创建ComboBox组件
###1.1 Create ComboBox
ComboBox is a drop-down list option box component.
Click on the ComboBox component in the Resource Panel and drag it into the page editing area to add the ComboBox component to the page.
ComboBox script for interface reference[ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)。

Examples of image resources for ComboBox components:

​![图片0.png](img/1.png)<br/>
(Fig. 1)

After setting the labels value of ComboBox's attribute to "label 1, label 2", the display effect is as follows:
Normal:

​![图片0.png](img/2.png)<br/>
(Figure 2)

Click to display a list of drop-down options:

​![图片0.png](img/3.png)<br/>
(Figure 3)

After selecting Item1 in the drop-down option:

​![图片0.png](img/4.png)<br/>
(Figure 4)



###1.2 Common attributes of ComboBox components

​![图片0.png](img/5.png)<br/>
(Fig. 5)

A kind of**attribute**A kind of**Function description**A kind of
| ---------------------------------------------------------------------------------------------------------------------------------------------------|
| The labels | drop-down box's label text content collection string, separated by commas. A kind of
| VisibleNum | The maximum number of rows that can be displayed in the drop-down list. A kind of
| scroll BarSkin | scroll bar image resource in drop-down list. A kind of
| Selected Index | represents the index of the currently selected item. A kind of
| sizeGrid | Effective scaling of grid data (nine-grid data) for image resources in drop-down lists. A kind of
| Skin | Drop-down list of image resources. A kind of



 



###1.3 ComboBox Component Dropdown Options Related Properties
​![图片0.png](img/6.png)<br/>

(Fig. 6)

​![图片0.png](img/7.png)<br/>
(Figure 7)

A kind of**attribute**A kind of**Function description**A kind of
| -----------------------------------------------------------------------------------------------------------------------------------------------------|
| itemColors | Set of label text color values for each state of a drop-down list item. Refer to API for details. A kind of
| itemSize | The font size of the label text of the drop-down list item. A kind of



 

 



###1.4 ComboBox Component Dropdown Button Related Properties

​![图片0.png](img/8.png)<br/>
(Figure 8)

​![图片0.png](img/9.png)<br/>
(Figure 9)

A kind of**attribute**A kind of**Function description**A kind of
| -----------------------------------------------------------------------------------------------------------------------------------------------------|
| The label text of the label Bold | drop-down button is shown in bold. A kind of
| labelColor | Set of text color values in various states of the drop-down button. Refer to API for details. A kind of
| LabelFont | Drop-down button text font. A kind of
| label Padding | Text margin of drop-down button. Refer to API for details.|
| The text font size of the labelSize | drop-down button. A kind of



 



##2. Creating ComboBox Components through Code

When we write code, we inevitably control UI through code and create it.`UI_ComboBox`Class that sets ComboBox-related properties through code.

**Effect of running example:**
​![1](gif/1.gif)<br/>
(Fig. 10)

Other attributes of ComboBox can also be set by code. The following example demonstrates how to create drop-down options in the check box by code and get which option you click on by clicking. Interested readers can set up ComboBox by their own code and create drop-down boxes that meet their needs.


```javascript

module laya {
    import Stage = Laya.Stage;
    import ComboBox = Laya.ComboBox;
    import Handler = Laya.Handler;
    import WebGL = Laya.WebGL;

    export class UI_ComboBox {
        private skin: string = "res/ui/combobox.png";

        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(800, 600, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";

            Laya.loader.load(this.skin, Handler.create(this, this.onLoadComplete));
        }

        private onLoadComplete(): void {
            var cb: ComboBox = this.createComboBox(this.skin);
            cb.autoSize = true;
            cb.pos((Laya.stage.width - cb.width) / 2, 100);
            cb.autoSize = false;
        }

        private createComboBox(skin: String): ComboBox {
            var comboBox: ComboBox = new ComboBox(this.skin, "item0,item1,item2,item3,item4,item5");
            comboBox.labelSize = 30;
            comboBox.itemSize = 25;
            comboBox.selectHandler = new Handler(this, this.onSelect, [comboBox]);
            Laya.stage.addChild(comboBox);

            return comboBox;
        }

        private onSelect(cb: ComboBox): void {
            console.log("选中了： " + cb.selectedLabel);
        }
    }
}
new laya.UI_ComboBox();
```


