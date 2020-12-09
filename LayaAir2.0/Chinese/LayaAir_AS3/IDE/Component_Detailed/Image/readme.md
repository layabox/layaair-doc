# Image 组件参考



## 一、通过LayaAirIDE创建Image组件

###        1.1 创建image

​	Image 是 UI 里最常见的显示图像的组件，用来显示位图图像。可以设置 Image 组件的 skin 属性来改变 Image 组件呈现的图像。Image 组件支持九宫格数据设定，用于实现图像放大后图像显示不失真的效果。

​        点击资源面板里的 Image 组件，拖放到页面编辑区，即可添加 Image组件到页面上。单击选中 Image ，可以在属性面板里设置 Image 的常用属性的值。
​        Image 组件的脚本接口请参考 [Image API](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?version=2.9.0beta&type=2D&category=UI&class=laya.ui.Image)。

​        **Image 组件的资源示例：**

​        ![图片0.png](img/1.png)<br/>
​    （图1）

​         **Image 组件拖放到编辑区后显示效果：**

​        ![图片0.png](img/2.png)<br/>
​    （图2）

### 1.2 Image 组件的常用属性

​        ![图片0.png](img/3.png)<br/>
​    （图3）

| **属性**   | **功能说明**            |
| -------- | ------------------- |
| sizeGrid | 位图的有效缩放网格数据（九宫格数据）。 |
| skin     | 位图的资源。              |

 

​        添加 Image 组件之后，可以通过从资源面板中拖拽图片资源到 Image 的 skin 属性框，来修改 Image 组件的显示资源图像。

## 二、通过代码创建Image组件

​	在我们进行书写代码的时候，免不了通过代码控制UI，创建`UI_Image`类，在代码中导入`laya.ui.Image`的包，并通过代码设定Image相关的属性。

**运行示例效果:**
​	![5](img/4.png)<br/>
​	(图5)通过代码创建Image

​	Image的其他属性也可以通过代码来设置，下述示例代码演示了如何通过代码创建不同皮肤（样式）的Image，

有兴趣的读者可以自己通过代码设置Image，创建出符合自己需要的图片。

**示例代码：**

```javascript
package
 {
	import laya.display.Stage;
	import laya.ui.Image;
	import laya.webgl.WebGL;
	
	public class UI_Image
	{
		public function UI_Image()
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

			//创建图片
			createImage();			
		}

		/***创建图片***/
		private function createImage():void
		{
			//实例化图片
			var img:Image = new Image("../../../../res/ui/dialog (3).png");
			//设置位置
			img.pos(165, 62.5);
			//加载到舞台
			Laya.stage.addChild(img);
		}
	}
 }
```

