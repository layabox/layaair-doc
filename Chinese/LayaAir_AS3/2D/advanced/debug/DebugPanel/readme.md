# DebugPanel工具

### 1、启用DebugPanel调试面板

DebugPanel调试面板是基于Div的调试窗口，启动调试面板的`DebugPanel.init()`方法位于`laya.debug.DebugPanel`类中，可以在初始化舞台方法`Laya.init()`后的任意代码中增加使用，例如下面代码所示：

```java
package
{
	import laya.debug.DebugPanel;
	import laya.display.Sprite;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);    
			//调用DebugPanel调试面板
			DebugPanel.init();
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff";
			
			var Img:Sprite = new Sprite(); 			 
			//添加到舞台
			Laya.stage.addChild(Img);   
			Img.loadImage("res/img/monkey1.png",200); 	
		}
	}
}
```

运行效果如图1所示

![图1](img/1.png) <br /> (图1)





通过在代码中使用

DebugPanel.init();

来初始化DebugPanel

 ![图片1.png](http://ldc.layabox.com/uploadfile/image/20170218/1487419852551600.png)

上图红框区域就是DebugPanel

DebugPanel上显示了显示对象节点树信息，如下图

 ![图片2.png](http://ldc.layabox.com/uploadfile/image/20170218/1487419871313006.png)

可以点击刷新按钮刷新节点树

通过DivPanel可以方便的选取对象

1.  通过点击节点树中的节点

  2.点击审查元素，然后在舞台上通过鼠标点击选取节点

下图为通过审查元素选取

![图片3.png](http://ldc.layabox.com/uploadfile/image/20170218/1487419912918355.png)

点击审查元素之后，然后将鼠标移到显示对象上方，显示对象就会显示边框，点击就可以选中，选中之后，节点树上也会对应选中，如下图

 ![图片4.png](http://ldc.layabox.com/uploadfile/image/20170218/1487419960436375.png)

在选中对象之后右侧会显示该对象的各种属性信息，并一直刷新显示，如下图

 ![图片5.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420008719427.png)

红框区域就是选中对象的属性信息

可以在输入框中改变属性值来实时改变游戏中的对象属性

还可以点击“打印到控制台”按钮将选中对象输出到控制台以便进一步操作

 ![图片6.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420030134734.png)

点击”enable链”按钮在控制台输出显示对象的enable信息

![图片7.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420056370469.png)

点击”size链”按钮在控制台输出显示对象的size信息

![图片8.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420079841160.png) 

 

![图片9.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420105610735.png)

可以快捷的控制对象是否可见和是否显示边框

除此之外右上角还有三个有用的功能

 ![图片10.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420121581759.png)

 

![图片11.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420156611410.png)

勾选“显示当前cache重绘”将会统计正在重绘的cache

 ![图片12.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420178637382.png)

勾选“显示所有cache区域”将会高亮所有渲染的cache对象

![图片13.png](http://ldc.layabox.com/uploadfile/image/20170218/1487420217105483.png)

 

点击“显示大图合集”在webgl模式下将会显示引擎内部自动合成的大图合集，可以通过不断点击遍历显示所有的合集