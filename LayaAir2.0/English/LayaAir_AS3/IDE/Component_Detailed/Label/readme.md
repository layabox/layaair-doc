#Label Component Reference



##1. Creating Label Components through LayaAirIDE

###1.1 Create Label

The Label component is used to display a paragraph of text, which can be a system font or a BMFont font.

Click on the Label component in the resource panel and drag it into the page editing area to add the Label component to the page.
Refer to the script interface for the Label component[Label API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Label)。

Resource examples of Label components:

​![图片0.png](img/1.png)<br/>
(Fig. 1)

After dragging and dropping the Label component into the editing area, setting the value of the text attribute to LayaAir IDE shows the following effect:

​![图片0.png](img/2.png)<br/>
(Figure 2)



 

 



###1.2 label properties

​![图片0.png](img/3.png)<br/>
(Figure)

A kind of**attribute**| Functional description|
| ------------------------------------------------------------------------------------------------------------------------------------------------------|
| Text | Text content string. A kind of
| Color | The color value of the text. The default is black. A kind of
| Whether the bold | text is shown in bold. A kind of
| font | text font name. A kind of
| fontSize | font size of text. A kind of
| Horizontal alignment of align | text. Optional values are left, center, right. A kind of
| Overflow||
| runtime||
| visible||



 



##2. Creating Label Components by Code

When we write code, we inevitably control UI through code and create it.`UI_Label`Class, imported in code`laya.ui.Label`And set label related properties through code.

**Run the example effect:**
​![5](img/4.png)<br/>
(Figure 5) Create Labels from code

Other attributes of Label can also be set by code. The following sample code demonstrates how to create different skin (style) Labels by code. Interested readers can set Label by code themselves to create text effects that meet their needs.

More text effects can be seen in the text section of the 2D Foundation.

**Sample code:**


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
			
			//如果有描边颜色参数
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








 	