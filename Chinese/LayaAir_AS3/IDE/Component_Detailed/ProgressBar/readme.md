# ProgressBar 组件参考



##  一、通过LayaAirIDE创建ProgressBar组件

### 	1.1 创建ProgressBar

​        ProgressBar 经常被用于显示游戏中某个操作的进度，例如加载资源的进度、角色经验或血量的进度。
​        点击选择资源面板里的 ProgressBar 组件，拖放到页面编辑区，即可添加 ProgressBar 组件到页面上。
​        ProgressBar 的脚本接口参考 [ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)。

​        ProgressBar 组件的资源示例：

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​        ![图片0.png](img/2.png)<br/>
​    （图2）

​        设置 ProgressBar 组件的属性 value 的值为 0.3 后，显示效果如下所示：

​        ![图片0.png](img/3.png)<br/>
​    （图3）

  

### 1.2 ProgressBar 组件的常用属性

​        ![图片0.png](img/4.png)<br/>
​    （图4）

 

| **属性**   | **功能说明**           |
| -------- | ------------------ |
| sizeGrid | 进度条的图像资源的有效缩放网格数据。 |
| Skin     | 进度条的图像资源。          |
| value    | 进度条的进度值，0到1之间。     |

 

##  二、通过代码创建ProgressBar

​	在我们进行书写代码的时候，免不了通过代码控制UI，创建UI_ProgressBar类，在代码中导入`laya.ui.ProgressBar`的包，并通过代码设定ProgressBar相关的属性。

**运行示例效果:**
​	![5](gif/1.gif)<br/>
​	(图5)通过代码创建ProgressBar

​	ProgressBar的其他属性也可以通过代码来设置，上述示例演示了如何通过代码创建不同皮肤（样式）的ProgressBar，有兴趣的读者可以自己通过代码设置ProgressBar，创建出符合自己需要的进度条。

**示例代码：**

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

