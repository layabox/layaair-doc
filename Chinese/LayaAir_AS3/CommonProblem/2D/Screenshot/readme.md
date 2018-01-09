# 如何截屏

在项目开发的过程中经常会有截屏的需求，例如：截取屏幕上的内容进行显示、分享以及二次绘制等。

在LayaAir中的Sprite类中提供了drawToCanvas方法来实现截屏的需求。API如图1所示：

![1](img\1.png)(图1)

从API中我们可以看出drawToCanvas一共有两种使用方式。一种是**将绘制的图片当做图片源，绘制到其他Sprite中**；一种是**获取原始图片数据，分享到网上，从而实现截图效果**。接下来我们将用代码示例来实现这两种功能。

### 1、将截出来的图片绘制到其他Sprite中

在stage上实例化两个Sprite，一个用来显示原始的图片，一个用来显示截取的图片；全部代码如下所示：

```typescript
package
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.resource.HTMLCanvas;
	import laya.resource.Texture;
	import laya.webgl.WebGL;

	/**
	 *截屏 
	 * @author mengjia
	 * 
	 */	
	public class ScreenshotMain
	{
		private var sp:Sprite;
		public function ScreenshotMain()
		{
			//初始化引擎
			Laya.init(800,600,WebGL);
			//实例化一个sprite，用来显示原始图片
			sp = new Sprite();
			sp.loadImage("res/a.png");
			Laya.stage.addChild(sp);
			
			//给stage添加一个点击事件，点击之后截取原始图片中的一部分
			Laya.stage.on(Event.CLICK,this,onClick);
		}
		
		private function onClick():void
		{
			//定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
			var htmlC:HTMLCanvas = sp.drawToCanvas(100,100,0,0);
			//获取截屏区域的texture
			var interceptT:Texture = new Texture(htmlC);
			var spDeposit:Sprite = new Sprite();
			//绘制截取的纹理
			spDeposit.graphics.drawTexture(interceptT,0,0,100,100);
			//设置显示容器的坐标
			spDeposit.x = 300;
			Laya.stage.addChild(spDeposit);
		}
	}
}
```

运行效果如动图2所示：

![2](img\2.gif)(图2)



### 2、保存分享截屏数据

将图片数据保存发送给服务器。全部代码如下所示：

```typescript
package
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.resource.HTMLCanvas;
	import laya.webgl.WebGL;

	/**
	 *截屏 
	 * @author mengjia
	 * 
	 */	
	public class ScreenshotMain
	{
		private var sp:Sprite;
		public function ScreenshotMain()
		{
			//初始化引擎
			Laya.init(800,600,WebGL);
			//实例化一个sprite，用来显示原始图片
			sp = new Sprite();
			sp.loadImage("res/a.png");
			Laya.stage.addChild(sp);
			
			//给stage添加一个点击事件，点击之后截取原始图片中的一部分
			Laya.stage.on(Event.CLICK,this,onClick);
		}
		
		private function onClick():void
		{
			//定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
			var htmlC:HTMLCanvas = sp.drawToCanvas(100,100,0,0);
			//获取原生的canvas对象
			var canvas:* = htmlC.getCanvas();
			//打印图片base64信息，可以发给服务器或者保存为图片
			trace(canvas.toDataURL("image/png"));
		}
	}
}
```

点击stage之后我们可以在看到输出的base64信息，如动图3所示：

![3](img\3.gif)(图3)



在LayaNative下实现截屏请跳转至[这里](https://ldc.layabox.com/doc/?nav=zh-as-7-2-7)