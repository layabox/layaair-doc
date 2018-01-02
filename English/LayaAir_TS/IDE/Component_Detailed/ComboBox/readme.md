# ComboBox Component



## 1. Creating ComboBox components through LayaAirIDE
###1.1 Creating ComboBox
​        ComboBox is a drop-down list Options box component.
​        Click on the ComboBox component in the resource panel, drag and drop to the page edit area, and then add the ComboBox component to the page.
​        ComboBox script, please refer to the interface [ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)。

​        ComboBox examples of image resources for components:

​        ![图片0.png](img/1.png)<br/>
​    （Picture 1）

​        After setting the attribute of ComboBox, the value of labels is “label1,label2” , the display effect is as follows:
​        Normal behavior ：

​        ![图片0.png](img/2.png)<br/>
​    （Picture 2）

​        Click to show the drop-down options list：

​        ![图片0.png](img/3.png)<br/>
​    （Picture 3）

​        After selecting Item1 in the drop down option：

​        ![图片0.png](img/4.png)<br/>
​    （Picture 4）



### 1.2 ComboBox Common attributes of components

​        ![图片0.png](img/5.png)<br/>
​    （Picture 5）

 

| **attribute**        | **Functional description**                  |
| ------------- | ------------------------- |
| labels        | The label text collection string of the drop-down box, separated by commas   |
| visibleNum    | The maximum number of rows that can be displayed in a drop down list            |
| scrollBarSkin | Scrollbar image resource of drop-down list             |
| selectedIndex | Index representing the currently selected item              |
| sizeGrid      | Efficient scaling of grid data from drop-down list image resources (sizeGrid) |
| skin          | Dropdown list image resources                 |

 

### 1.3 ComboBox Component pull down options properties
​        ![图片0.png](img/6.png)<br/>
​    （Picture 6）

​        ![图片0.png](img/7.png)<br/>
​    （Picture 7）

 

| **attribute**     | **Function description**                      |
| ---------- | ----------------------------- |
| itemColors | The label text color value set of each state of the drop-down list item. For details, please refer to API. |
| itemSize   | The font size of the tag text for the drop-down list item              |

 

 

### 1.4 ComboBox Component pull down button properties

​        ![图片0.png](img/8.png)<br/>
​    （Picture 8）

​        ![图片0.png](img/9.png)<br/>
​    （Picture 9）

 

| **Attribute**       | **Functional description**                    |
| ------------ | --------------------------- |
| labelBold    | The label text of the drop down button is bold.             |
| labelColor   | The collection of text color values in each state of the drop button. For details, please refer to API. |
| labelFont    | The text font of the drop-down button.                 |
| labelPadding | Text margins of the drop down button. For details, please refer to API          |
| labelSize    | The size of the text font of the drop button.                |

 

## 2. Create ComboBox components through code

 	When we write code, we can't avoid creating UI by code `UI_ComboBox` Class, import in code `laya.ui.ComboBox` Package, and set ComboBox related attributes through code.

**Run example effect：**
​	![1](gif/1.gif)<br/>
​	（Picture 10）

​	Other properties of running ComboBox can also be set up by code. The following example demonstrates how to create a drop-down option in the selection box by code, and which option is clicked to get your own click. Interested readers can set up ComboBox by themselves to create a drop-down box that suits their own needs.

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

