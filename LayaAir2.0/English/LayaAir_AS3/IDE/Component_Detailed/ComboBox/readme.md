#ComboBox Component Reference



##1. Creating ComboBox Components through LayaAirIDE
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
| scroll BarSkin | scroll bar image resource in drop-down list. A kind of
| Selected Index | represents the index of the currently selected item. A kind of
| sizeGrid | Effective scaling of grid data (nine-grid data) for image resources in drop-down lists. A kind of
| Skin | Drop-down list of image resources. A kind of
| runtime||
| visible||



 



###1.3 ComboBox Component Dropdown Options Related Properties
​![图片0.png](img/6.png)<br/>
(Fig. 6)

​![图片0.png](img/7.png)<br/>
(Figure 7)

A kind of**attribute**A kind of**Function description**A kind of
| -----------------------------------------------------------------------------------------------------------------------------------------------------|
| itemColors | Set of label text color values for each state of a drop-down list item. Refer to API for details. A kind of
| itemSize | The font size of the label text of the drop-down list item. A kind of



 

 



###1.4 properties related to combobox component pull-down button

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

When we write code, we inevitably control UI through code and create it.`UI_ComboBox`Class, imported in code`laya.ui.ComboBox`The package of ComboBox and the properties related to ComboBox are set by code.

**Run the example effect:**
​![1](gif/1.gif)<br/>
(Fig. 10)

Other attributes of ComboBox can also be set by code. The following example demonstrates how to create drop-down options in the check box by code and get which option you click on by clicking. Interested readers can set up ComboBox by their own code and create drop-down boxes that meet their needs.


```javascript

package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.ComboBox;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ComboBox	
	{
		/***下边列表美术资源**/
		private var skin:String = "../../../../res/ui/combobox.png";
		/***下拉列表**/
		private var comboBox:ComboBox 
		/***提示信息文本框**/
		private var promptText:Text;
		
		public function UI_ComboBox() 
		{
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
			Laya.loader.load(skin, Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete(e:*=null):void
		{
			//实例化下拉列表
			comboBox= new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
			//按钮标签字体大小
			comboBox.labelSize = 30;
			//列表项标签字体大小
			comboBox.itemSize = 25;
			//下拉列表选择触发处理回调
			comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
			//加载到舞台
			Laya.stage.addChild(comboBox);
			//自动计算宽高
			comboBox.autoSize = true;
			//设置位置
			comboBox.pos((Laya.stage.width - comboBox.width) / 2, 150);
			//自动计算宽高关闭（在设置位置时，需获取列表宽度，获取后关闭）
			comboBox.autoSize = false;
			
			//创建选择提示信息框
			createPromptText()
		}
		
		/***创建提示信息***/
		private function createPromptText():void
		{
			//实例化提示信息
			promptText=new Text();
			//提示框字体
			promptText.font="黑体";
			//提示框字体大小
			promptText.fontSize=26;
			//提示框字体颜色
			promptText.color="#FFFFFF";
			//提示框初始文本
			promptText.text="您的选择是： ";
			//加载到舞台
			Laya.stage.addChild(promptText);
			//设置提示框位置
			promptText.pos(comboBox.x,comboBox.y-40);
		}
		
		/***下拉列表选择事件回调***/
		private function onSelect(comboBox:ComboBox):void
		{
			promptText.text="您的选择是： " + comboBox.selectedLabel;
		}
	}
}
```


