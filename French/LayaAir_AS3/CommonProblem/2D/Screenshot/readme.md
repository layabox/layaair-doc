#Comment


在项目开发的过程中经常会有截屏的需求，例如：截取屏幕上的内容进行显示、分享以及二次绘制等。


在LayaAir中的Sprite类中提供了drawToCanvas方法来实现截屏的需求。API如图1所示：

![1](img\1.png)(Figure 1)


从API中我们可以看出drawToCanvas一共有两种使用方式。一种是**Dessiner l 'image en tant que source d' image dans d 'autres Sprite**L 'un est**Acquisition de données d 'image originales et mise en commun sur Internet**".Nous allons ensuite utiliser des exemples de codes pour réaliser ces deux fonctions.

###Dessiner les images interceptées dans d 'autres Sprite

Mise en oeuvre de deux Sprite sur stage, l 'une pour afficher l' image originale et l 'autre pour afficher l' image interceptée; tous les codes sont indiqués comme suit:


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


Les effets de fonctionnement sont indiqués à la figure 2:

![2](img\2.gif)(Figure 2)



###Enregistrement de données d 'interception partagées

Les données d 'image sont enregistrées et transmises au serveur.Tous les codes sont les suivants:


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


Après avoir cliqué sur le stage, nous pouvons voir les informations de base 64 de sortie, comme indiqué dans la figure 3:

![3](img\3.gif)(Figure 3)



Passez à l'écran d'interception sous layanative.[这里](https://ldc.layabox.com/doc/?nav=zh-as-7-2-7)