#HScrollBar Component Reference



##I. Creating HScrollBar Components through LayaAirIDE

###1.1 Create HscrollBar

The HScrollBar component is a horizontal scrollbar component.
When there is too much data to accommodate the display area, the end user can use the HScrollBar component to control the data portion displayed.
The scrollbar consists of four parts: a track map, a slider button and two arrow buttons.
Click on the HScrollBar component in the Resource Panel and drag it into the page editing area to add the HScrollBar component to the page.
Refer to the script interface for HScrollBar components[HScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HScrollBar)。
Examples of image resources for HScrollBar components:

​![图片0.png](img/1.png)<br/>
(Fig. 1)

​![图片0.png](img/2.png)<br/>
(Figure 2)

​![图片0.png](img/3.png)<br/>
(Figure 3)

​![图片0.png](img/4.png)<br/>
(Figure 4)

Drag and drop HScrollBar into the editor area to display the effect:

​![图片0.png](img/5.png)<br/>
(Figure 5)

After setting the value of attribute max of HScrollBar to 10, the value of attribute min to 0, and the value of attribute value to 3, the display effect is as follows:

​![图片0.png](img/6.png)<br/>
(Fig. 6)

When running the program, you can drag the slider or click the arrow button to control the value of the progress bar:

​![图片0.gif](gif/1.gif)<br/>
(Figure 7)

Set the value of showButtons of HScrollBar to false:

​![图片0.png](img/7.png)<br/>
(Figure 8)

The effect of running a program:

​![图片0.gif](gif/2.gif)<br/>
(Figure 9)



 



###1.2 Common attributes of HScrollBar components

​![图片0.png](img/8.png)<br/>
(Figure 10)

A kind of**attribute**A kind of**Function description**A kind of
| ------------------------------------------------------------------------------------------------------------------------------------------------------|
| Skin | scrollbar image resource address. A kind of
| SizeGrid | Scroll Bar Track Map Resource Scales Grid Data Effectively (Nine-Palace Data). Runtime
| runtime||
| visible||



 



##2. Creating HScrollBar Components by Code

When we write code, we can't help but control the UI and create`UI_ScrollBar`Class, imported in code`laya.ui.HScrollBar`The package of HScrollBar and the related attributes of HScrollBar are set by code.

**Run the example effect:**
​![5](gif/4.gif)<br/>
(Figure 11) Create HScrollBar through code

Other attributes of HScrollBar can also be set by code. The following example demonstrates how to create HScrollBar by code. Interested readers can set HScrollBar by code and create HScrollBar that meets their needs.

**Sample code:**


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
		/***水平滚动条资源**/
		private var skins:Array=["../../../../res/ui/hscroll.png", 
							 	 "../../../../res/ui/hscroll$bar.png", 
								 "../../../../res/ui/hscroll$down.png",
								 "../../../../res/ui/hscroll$up.png"];

		/***提示信息文本框**/
		private var promptText:Text;		
		/****水平滚动条****/
		private var hScrollBar:HScrollBar;		
		
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
			//创建水平滚动条
			createHScroller();
		}
		
		/***创建水平滚动条***/
		private function createHScroller():void 
		{
			//实例化垂直滚动条
			hScrollBar= new HScrollBar();
			//加载皮肤资源（其他资源根据规范命名后，会自动加载）
			hScrollBar.skin = "../../../../res/ui/hscroll.png";
			//设置宽度
			hScrollBar.width = 400;
			//设置位置
			hScrollBar.pos(150, 170);
			//最低滚动位置数字
			hScrollBar.min = 0;
			//最高滚动位置数字
			hScrollBar.max = 100;
			//滚动变化事件回调
			hScrollBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(hScrollBar);
			
			//创建提示信息
			createPromptText(hScrollBar)
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
			promptText.pos(scrollBar.x,scrollBar.y-50);
		}
		
		/***滚动条位置变化回调***/
		private function onChange(value:Number):void 
		{
			promptText.text= "滚动条的位置： value=" + value;
		}
	}
}
```


