# HScrollBar 组件参考



##  一、通过LayaAirIDE创建HScrollBar组件

###         1.1创建HscrollBar

​	HScrollBar 组件是一个水平方向滚动条组件。
​        当数据太多以至于显示区域无法容纳时，最终用户可以使用 HScrollBar 组件控制所显示的数据部分。
​        滚动条由四部分组成：一个轨道图、一个滑块按钮和两个箭头按钮。
​        点击选择资源面板里的 HScrollBar 组件，拖放到页面编辑区，即可添加 HScrollBar 组件到页面上。
​        HScrollBar 组件的脚本接口请参考 [HScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HScrollBar)。
​        HScrollBar 组件的图像资源示例：

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​        ![图片0.png](img/2.png)<br/>
​    （图2）

​        ![图片0.png](img/3.png)<br/>
​    （图3）

​        ![图片0.png](img/4.png)<br/>
​    （图4）

​        HScrollBar 拖放到编辑器区后，显示效果：

​        ![图片0.png](img/5.png)<br/>
​    （图5）

​        设置 HScrollBar 的属性 max 的值为 10、属性 min 的值为0、属性 value 的值为3后，显示效果如下：

​        ![图片0.png](img/6.png)<br/>
​    （图6）

​        在程序中运行时，可以拖动滑块或点击箭头按钮控制进度条的值：

​        ![图片0.gif](gif/1.gif)<br/>
​    （图7）

​        设置 HScrollBar 的属性 showButtons 的值为 false时的显示效果：

​        ![图片0.png](img/7.png)<br/>
​    （图8）

​        在程序里运行时的效果：

​        ![图片0.gif](gif/2.gif)<br/>
​    （图9）

 

### 1.2 HScrollBar 组件常用属性

​        ![图片0.png](img/8.png)<br/>
​    （图10）

 

| **属性**            | **功能说明**                            |
| ----------------- | ----------------------------------- |
| skin              | 滚动条的图像资源地址。                         |
| sizeGrid          | 滚动条轨道图资源的有效缩放网格数据（九宫格数据）。           |
| value             | 表示当前滚动位置的数字。                        |
| min               | 表示最低滚动位置的数字。                        |
| max               | 表示最高滚动位置的数字。                        |
| scrollSize        | 表示按下滚动条轨道时页面滚动的增量。                  |
| mouseWheelEnable  | 一个布尔值，指定是否滑轮滚动，默认值为true。            |
| touchScrollEnable | 一个布尔值，指定是否开启触摸，默认值为true。            |
| autoHide          | 一个布尔值，指定是否自动隐藏滚动条(无需滚动时)，默认值为false。 |
| showButton        | 一个布尔值，指定是否显示向上、向下按钮，默认值为true。       |

 

## 二、通过代码创建HScrollBar组件

​	在我们进行书写代码的时候，免不了通过代码控制UI，在代码中导入`laya.ui.HScrollBar`的包，创建UI HScrollBar,并通过代码设定HScrollBar相关的属性。

**示例代码：**

```javascript
package
{
	import laya.display.Stage;
	import laya.ui.HScrollBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	public class UI_ScrollBar
	{
		public function UI_ScrollBar()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(550, 400, WebGL);

			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;

			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			Laya.stage.bgColor = "#232628";
			
			var skins:Array = [];
			skins.push("../../../../res/ui/hscroll.png", "../../../../res/ui/hscroll$bar.png", "../../../../res/ui/hscroll$down.png", "../../../../res/ui/hscroll$up.png");
			Laya.loader.load(skins, Handler.create(this, placeHScroller));
		}
		
		private function placeHScroller():void 
		{
			var hs:HScrollBar = new HScrollBar();
			hs.skin = "../../../../res/ui/hscroll.png";
			hs.width = 300;
			hs.pos(50, 170);
			
			hs.min = 0;
			hs.max = 100;
			
			hs.changeHandler = new Handler(this, onChange);
			Laya.stage.addChild(hs);
		}
		private function onChange(value:Number):void 
		{
			trace("滚动条的位置： value=" + value);
		}
	}
}
```

**运行结果:**
​	![5](gif/3.gif)<br/>
​	(图11)通过代码创建HScrollBar

​	HScrollBar的其他属性也可以通过代码来设置，上述示例演示了如何通过代码创建的HScrollBar，

有兴趣的读者可以自己通过代码设置HScrollBar，创建出符合自己需要的HScrollBar。