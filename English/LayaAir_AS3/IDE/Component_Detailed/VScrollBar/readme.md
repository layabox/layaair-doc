# VScrollBar Component



## 1. create VScrollBar components through LayaAirIDE

### 1.1 Establish VScrollBar 

 

​        The VScrollBar component is a vertical scrollbar component.
​        When the data is too large to display, the end user can use the VScrollBar component to control the displayed data part.
​        The scroll bar consists of four parts: a track map, a slider button and two arrow buttons.
​        Click on the VScrollBar component in the resource panel, drag and drop to the page edit area, and then add the VScrollBar component to the page.
​        VScrollBar script interface of component is referenced [VScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VScrollBar)。
​        VScrollBar Examples of image resources for components:

​        ![图片0.png](img/1.png)<br/>
​    （Picture 1）

​        ![图片0.png](img/2.png)<br/>
​    （Picture 2）
​        ![图片0.png](img/3.png)<br/>
​    （Picture 3）

​        ![图片0.png](img/4.png)<br/>
​    （Picture 4）

 

​        VScrollBar drag into the editor area to show the effect:

​        ![图片0.png](img/5.png)<br/>
​    （Picture 5）

​        The value of setting VScrollBar attribute Max is 10, the value of attribute min is 0, and the value of attribute value is 3, the display effect is as follows:

​        ![图片0.png](img/6.png)<br/>
​    （Picture 6）

​        When you run the program, you can drag the slider or click the arrow button to control the value of the progress bar:

​        ![图片0.gif](gif/1.gif)<br/>
​    （Picture 7）

​        The display effect of setting VScrollBar attribute showButtons when the value is false:

​        ![图片0.png](img/7.png)<br/>
​    （Picture 8）

​        The runtime effect in a program:

​        ![图片0.png](gif/1.gif)<br/>
​    （Picture 9）

### 1.2 VScrollBar Common attributes of components

​        ![图片0.png](img/8.png)<br/>
​    （Picture 10）

 

| **Attribute**            | **Functional description**                            |
| ----------------- | ----------------------------------- |
| skin              | The image resource address of the scroll bar.                       |
| sizeGrid          | Efficient scaling of grid data on a scroll bar track map resource.          |
| value             | The number that represents the current scroll position.                      |
| min               | The number that represents the minimum rolling position.                       |
| max               | The number that represents the highest rolling position.                        |
| scrollSize        | The increment of page scrolling when the scroll bar is pressed.                  |
| mouseWheelEnable  | A Boolean value that specifies whether or not the pulley is rolled. The default value is true.            |
| touchScrollEnable | A Boolean value that specifies whether to open the touch. The default value is true.            |
| autoHide          | A Boolean value that specifies whether to scroll the scrollbar automatically (without scrolling) and defaults to false. |
| showButton        | A Boolean value that specifies whether to display the up and down buttons with the default value of true.       |

 

 

##  2. Create VScrollBar components through code

​	When we write code, we can't control UI by code, create `UI_ScrollBar`  class, import `laya.ui.VScrollBar `package in code, and set VScrollBar related attributes through code.

**Run example effect :**
​	![5](gif/3.gif)<br/>
​	(Picture 11) creating VScrollBar through code

​	Other properties of VScrollBar can also be set up by code. The following sample code demonstrates how to create VScrollBar through code. Interested readers can set up VScrollBar by themselves to create a scroll bar that matches their own needs.

**Sample code ：**

```javascript
package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.HScrollBar;
	import laya.ui.ScrollBar;
	import laya.ui.VScrollBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	public class UI_ScrollBar
	{
		/***垂直滚动条资源**/
		private var skins:Array=["../../../../res/ui/vscroll.png", 
								"../../../../res/ui/vscroll$bar.png", 
								"../../../../res/ui/vscroll$down.png",
								"../../../../res/ui/vscroll$up.png"];
		/***提示信息文本框**/
		private var promptText:Text;		
		/****垂直滚动条****/
		private var vScrollBar:VScrollBar;
		
		
		public function UI_ScrollBar()
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
			Laya.loader.load(skins, Handler.create(this, onSkinLoadComplete));
		}

		/***加载资源完成***/
		private function onSkinLoadComplete(e:*=null):void
		{
			//创建垂直滚动条
			createVScroller();
		}
		
		/***创建垂直滚动条***/
		private function createVScroller():void 
		{
			//实例化水平滚动条
			vScrollBar= new VScrollBar();
			//加载皮肤资源（其他资源根据规范命名后，会自动加载）
			vScrollBar.skin = "../../../../res/ui/vscroll.png";
			//设置高度
			vScrollBar.height = 200;
			//设置位置
			vScrollBar.pos(400, 200);
			//最低滚动位置数字
			vScrollBar.min = 0;
			//最高滚动位置数字
			vScrollBar.max = 100;
			//滚动变化事件回调
			vScrollBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(vScrollBar);
			
			//创建提示信息
			createPromptText(vScrollBar)
		}

		/***创建提示信息***/
		private function createPromptText(scrollBar:ScrollBar):void
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
			promptText.pos(scrollBar.x-130,scrollBar.y-60);
			
		}
		
		/***滚动条位置变化回调***/
		private function onChange(value:Number):void 
		{
			promptText.text= "滚动条的位置： value=" + value;
		}
	}
}
```

