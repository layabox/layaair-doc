#Panel Component Reference

Panel is a panel container class with clipping function, which is often used to set the display area of elements. The element to be displayed can be added directly to the Panel container, and the width of the Panel is the width of the element to be displayed.

###1. Creating Panel Components through LayaAirIDE

**1.1 Drag and drop the Panel component into the page editing area**

Drag and drop the Panel component into the UI page from the UI folder of the component panel on the right side of IDE resource management. As shown in Figure 1:

![1](img\1.gif)</br> (Fig. 1)

Set Panel width and height (e.g. 100*100). Double-click the Panel component in the UI interface and put in a picture. The display effect and hierarchical structure are shown in Figure 2.

![2](img\2.png)</br> (Fig. 2)

As can be seen from Figure 2, the image is clipped, and the width and height shown by the image is the width and height of the Panel container. In this way, we can directly adjust the coordinates of the picture so that the content of its display changes.



**1.2 Converts display elements directly to Panel containers**

Prepare an image on the UI interface, select the image and press Ctrl + B to convert it into a Panel container. As shown in Figure 1-1:

![1-1](img\1-1.png)</br>(图1-1)


After clicking on the confirmation, set the width and height of the Panel to 100*100 (after conversion, the image will automatically be converted to a sub-level of the Panel). The display effect and hierarchical structure are shown in Figure 2.

**1.3 Add scrollbar display**

Panel components can also set scrollbars;**Apart from the list component, Panel is the only container component that can set scrollbars.**。 Here we can set a scroll bar for Panel to see the effect.

Set the scroll bar for Panel, as shown in Figure 3:

![3](img\3.png)</br> (Fig. 3)

Ctrl + F12 (or F12) exports the UI interface, preloads resources in the code and instantiates the UI interface. The final display effect is shown in Figure 4.

![4](img\4.gif)</br> (Fig. 4)



##2. Creating Panel Components by Code

In addition to the operation that can be directly visualized in the UI interface, panel components can also achieve the above effect in the code is very simple.

The effect of code implementation is shown in Figure 5.

![5](img\5.gif)</br>(图5)


**Sample code:**


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


