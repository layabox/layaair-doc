# Panel组件参考

Panel是一个带有裁剪功能的面板容器类，常用来设置元素的显示区域。可以直接将要显示的元素添加到Panel容器中，Panel的宽高就是元素将要显示的宽高。

### 一、通过LayaAirIDE创建Panel组件

**1.1以拖拽的形式将Panel组件拖拽到页面编辑区**

从IDE资源管理右侧组件面板的UI文件夹中，将Panel组件拖拽到UI页面中。如动图1所示：

![1](img\1.gif)</br>(图1)

给Panel设置宽高（例如：100*100）。双击UI界面中的Panel组件，放入一张图片。显示效果以及层级结构图如图2所示：

![2](img\2.png)</br>(图2)

由图2可以看出放入的图片被裁剪了，图片最终所显示的宽高就是Panel容器的宽高。这样我们就可以直接调整图片的坐标让其显示的内容发生改变了。



**1.2将显示元素直接转为Panel容器**

在UI界面上准备一张图片，选中该图片按快捷键Ctrl+B转为Panel容器。如图1-1所示：

![1-1](img\1-1.png)</br>(图1-1)

点击确定之后给Panel设置宽高为100*100（转换之后图片会自动转为Panel的子级）。显示效果及层级结构如图2所示

**1.3添加滚动条显示**

Panel组件还可以设置滚动条；**除list组件外，Panel是唯一一个可以设置滚动条的容器组件**。在此我们可以对Panel设置一个滚动条看下效果。

为Panel设置滚动条，如图3所示：

![3](img\3.png)</br>(图3)

Ctrl+F12（或F12）导出UI界面，在代码中预加载资源并实例化该UI界面。最终显示效果如动图4所示：

![4](img\4.gif)</br>(图4)



## 二、通过代码创建Panel组件

panel组件除了可以直接在UI界面中可视化的操作之外，在代码中实现出上面的效果也是很简单的。

用代码实现的效果如动图5所示：

![5](img\5.gif)</br>(图5)

**示例代码：**

```typescript
package
{
	import laya.ui.Image;
	import laya.ui.Panel;
	import laya.utils.Handler;

	public class PanelTest
	{
		public function PanelTest()
		{
			//初始化引擎
			Laya.init(800,600);
			//预加载所需资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onLoaded));
		}
		
		private function onLoaded():void
		{
			//实例化Panel组件
			var panel:Panel = new Panel();
			//给panel添加背景色
			panel.graphics.drawRect(0,0,100,100,"#ffcccc");
			//给panel设置宽高
			panel.size(100,100);
			//给panel设置滚动条皮肤
			panel.vScrollBarSkin = "comp/vscroll.png";
			//将panel添加到stage上
			Laya.stage.addChild(panel);
			
			//实例化Image组件
			var img:Image = new Image();
			//给image添加皮肤
			img.skin = "comp/image.png";
			//将image添加到panel组件中
			panel.addChild(img);
		}
	}
}
```

