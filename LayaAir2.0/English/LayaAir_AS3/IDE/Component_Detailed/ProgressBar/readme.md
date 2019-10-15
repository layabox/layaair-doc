#ProgressBar Component Reference



##I. create ProgressBar component through layaairide

###1.1 Create ProgressBar

ProgressBar is often used to show the progress of an operation in a game, such as the progress of loading resources, role experience or blood volume.
Click on the ProgressBar component in the Resource Panel and drag it into the page editing area to add the ProgressBar component to the page.
Reference to the script interface of ProgressBar[ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)。

Examples of resources for ProgressBar components:



​        ![图片0.png](img/1.png)<br/>
(Fig. 1)

​![图片0.png](img/2.png)<br/>
(Figure 2)

After setting the value of the property value of the ProgressBar component to 0.3, the display effect is as follows:

​![图片0.png](img/3.png)<br/>
(Figure 3)



  



###1.2 Common properties of ProgressBar components

​![图片0.png](img/4.png)<br/>
(Figure 4)

A kind of**attribute**A kind of**Function description**A kind of
| ----------------------------------------------------------------------------------------------------------------------------------------|
| Effective scaling of grid data for image resources of sizeGrid | progress bar. A kind of
|Skin | image resource of progress bar. A kind of
| runtime||
| visible||



 



##2. Creating ProgressBar by Code

When we write code, we inevitably control UI through code, create UI_ProgressBar class, and import it into code.`laya.ui.ProgressBar`The package of ProgressBar and the related properties of ProgressBar are set by code.

**Run the example effect:**
​![5](gif/1.gif)<br/>
(Figure 5) Create ProgressBar from code

Other attributes of ProgressBar can also be set by code. The above example demonstrates how to create different skin (style) ProgressBar by code. Interested readers can set ProgressBar by code themselves and create progress bars that meet their needs.

**Sample code:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.ProgressBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ProgressBar
	{
		private var progressBar:ProgressBar;
		
		public function UI_ProgressBar()
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
			Laya.loader.load(["../../../../res/ui/progressBar.png", "../../../../res/ui/progressBar$bar.png"], Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete():void
		{
			//实例化进度条
			progressBar = new ProgressBar("../../../../res/ui/progressBar.png");
			//设置宽度
			progressBar.width = 400;
			//设置显示位置，在舞台居中
			progressBar.x = (Laya.stage.width - progressBar.width ) / 2;
			progressBar.y = Laya.stage.height / 2;
			
			//设置九宫格边距，以防变形
			progressBar.sizeGrid = "5,5,5,5";
			//数据改变时回调方法
			progressBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(progressBar);
			
			//时间间隔循环，每100毫秒改变一次数据
			Laya.timer.loop(100, this, changeValue);
		}
		
		/***时间间隔循环回调，更新进度条***/
		private function changeValue():void
		{
			//最大为1，每次间隔更新5%
			if (progressBar.value >= 1)
				progressBar.value = 0;
			progressBar.value += 0.05;
		}
		
		/***进度条数据改变回调***/
		private function onChange(value:Number):void
		{
			trace("进度：" + Math.floor(value * 100) + "%");
		}
	}
}
```


