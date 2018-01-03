# Label Component



## 1. create a Label component through LayaAirIDE

###     1.1 Create a Label

​        Label component is used to display a paragraph of text, the text can be a system font or BMFont font.

​        lick the Resource Panel Label component, drag and drop to the page editing area, you can add a Label component to the page.
​        Label Please refer to the component's script interface [Label API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Label)。

​        Label example of resource for components：

​        ![图片0.png](img/1.png)<br/>
​    （Picture 1）

​        After the Label component is dragged to the edit area, the value of setting the text attribute is LayaAir IDE, and the display effect is as follows:

​        ![图片0.png](img/2.png)<br/>
​    （Picture 2）

 

 

###  1.2 Label attribute

​        ![图片0.png](img/3.png)<br/>
​    （Picture 3）

 

| **attribute**      | Functional description                            |
| ----------- | -------------------------------- |
| text        | Text content string.                       |
| align       | Horizontal alignment of text. Optional value left,center,right. |
| valign      | Vertical alignment of text. Optional value top,middle,bottom. |
| color       | Color value of text. The default is black.                    |
| bgColor     | Text background color.                          |
| font        | Font name of text.                         |
| fontSize    | Font size of text.                         |
| bold        | whether is text bold                     |
| italic      | Text Italic                       |
| wordWrap    | text wrap                          |
| stroke      | text of the stroke width                         |
| strokeColor | Text color                         |
| asPassword  | text displayed as a password                     |
| leading     | Vertical line spacing of text。                        |
| padding     | Text margins                           |

 

## 2. Creating Label components through code

 	When we write code, we can't control UI by code, create `UI_Label` class, import `laya.ui.Label` package in code, and set Label related attributes by code.

**Run example effect:**
​	![5](img/4.png)<br/>
​	(Picture 5) Creating Label through code

​	Other attributes of Label can also be set up by code. The following example code demonstrates how to create Label of different skins (styles) by code, and the interested readers can set up Label by themselves to create the text effect that suits their own needs.

​	More text effects can be seen in the text section of the 2D basic chapter.

**Sample code：**

```javascript
package 
{
	import laya.display.Stage;
	import laya.ui.Label;
	import laya.webgl.WebGL;
	
	public class UI_Label
	{
		public function UI_Label()
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

			//创建多个label文本
			createMoreLabel();			
		}

		/***创建多个label文本***/
		private function createMoreLabel():void
		{
			//创建各种文本效果并设置位置
			createLabel("#FFFFFF", null).pos(30, 50);
			createLabel("#00FFFF", null).pos(290, 50);
			createLabel("#FFFF00", "#FFFFFF").pos(30, 100);
			createLabel("#000000", "#FFFFFF").pos(290, 100);
			createLabel("#FFFFFF", "#00FFFF").pos(30, 150);
			createLabel("#0080FF", "#00FFFF").pos(290, 150);
		}
		
		/**
		 * 创建Label文本
		 * @param color 	         文字颜色
		 * @param strokeColor  文字描边颜色
		 */		
		private function createLabel(color:String, strokeColor:String):Label
		{
			//实例化label文本
			var label:Label = new Label();
			//设置文本字体
			label.font = "Microsoft YaHei";
			//设置文本内容
			label.text = "SAMPLE DEMO";
			//设置文本字体大小
			label.fontSize = 30;
			//设置文本字体颜色
			label.color = color;
			
			//如果有描颜色参数
			if (strokeColor)
			{
				//文本描边宽度为4
				label.stroke = 4;
				//设置文本描边颜色
				label.strokeColor = strokeColor;
			}
			//加载到舞台
			Laya.stage.addChild(label);
			
			return label;
		}
	}
}
```



 	