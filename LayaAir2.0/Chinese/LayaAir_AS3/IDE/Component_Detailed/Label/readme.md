# Label 组件参考



## 一、通过LayaAirIDE创建Label组件

###     1.1 创建Label

​        Label 组件用来显示一段文字，文字可以是系统字体或者 BMFont 字体。

​        点击资源面板里的 Label 组件，拖放到页面编辑区，即可添加 Label 组件到页面上。
​        Label 组件的脚本接口请参考 [Label API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?version=2.9.0beta&type=2D&category=UI&class=laya.ui.Label)。

​        Label 组件的资源示例：

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​        Label组件拖放到编辑区后，设置 text 属性的值为 LayaAir IDE 后的显示效果如下：

​        ![图片0.png](img/2.png)<br/>
​    （图2）

 

 

###  1.2 Label 属性

​        ![图片0.png](img/3.png)<br/>
​    （图）

 

| **属性**   | 功能说明                             |
| -------- | -------------------------------- |
| text     | 文本内容字符串。                         |
| color    | 文本的颜色值。默认为黑色。                    |
| bold     | 文本是否为粗体字显示。                      |
| font     | 文本的字体名称。                         |
| fontSize | 文本的字体大小。                         |
| align    | 文本的水平对齐方式。可选值有left、center、right。 |
| overflow |                                  |
| runtime  |                                  |
| visible  |                                  |

 

## 二、通过代码创建Label组件

 	在我们进行书写代码的时候，免不了通过代码控制UI，创建`UI_Label`类，在代码中导入`laya.ui.Label`的包，并通过代码设定Label相关的属性。

**运行示例效果:**
​	![5](img/4.png)<br/>
​	(图5)通过代码创建Label

​	Label的其他属性也可以通过代码来设置，下述示例代码演示了如何通过代码创建不同皮肤（样式）的Label，有兴趣的读者可以自己通过代码设置Label，创建出符合自己需要的文字效果。

​	更多的文字效果可以去查看2D基础篇中的文本部分。

**示例代码：**

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



 	