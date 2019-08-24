# 显示与切换图片

> 图片的显示是游戏开发基础，本篇从API到示例分别介绍Sprite.loadImage与Graphics.drawTexture两种显示图片的方法。

## 1、用loadImage方法显示与切换图片

### 1.1 loadImage API概述

在API文档中搜索laya.display.Sprite，可以找到loadImage()方法，如图1所示，我们先熟悉一下该方法的参数。

![图1](img/1.png) <br /> (图1)

### 1.2 用loadImage加载显示图片的示例

创建一个Main.as入口类，并设置为默认应用程序（推荐用FlashBuilder），编写代码如下：

```java
package
{
	import laya.display.Sprite;
	
	public class Main
	{
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			
			//设置舞台背景色
			Laya.stage.bgColor  = "#ffffff"
			
			var img:Sprite = new Sprite();                  
			//加载显示图片，坐标位于100,50
			img.loadImage("res/img/monkey1.png"); 
			//添加到舞台
			Laya.stage.addChild(img);
		}
	}
}
```

在示例代码里，“`100,50`”是图片的显示坐标信息。示例代码运行效果如图2-1所示：

![图2-1](img/2-1.png) <br /> (图2-1)

### 1.3 用loadImage切换图片的示例

  切换图片是在显示图片的基础之上，增加了清空绘制，然后通过代码逻辑获得新的图片资源重新绘制。具体的代码说明可以参考代码注释及API，结合实例运行体验。

下面我们在Main.as入口类中修改代码为如下所示：

```java
package
{
	import laya.display.Sprite;
	
	public class Main
	{
        //需要切换的图片资源路径
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
      	//切换状态
		private var flag:Boolean = false;
      
		private var img:Sprite;
		
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"                        
			
			img = new Sprite();                        
			
			//显示绘制的图片
			switchImg();
			
			//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换图片
			img.on("click",this,switchImg);
			
			//将图片添加到舞台
			Laya.stage.addChild(img);                        
		}
		
		
		private function switchImg(e:*=null):void
		{                        
			//清空图片
			img.graphics.clear();
			
			//获得要切换的图片资源路径
			var imgUrl:String = (flag = !flag)? monkey1:monkey2;
			
			//加载显示图片，坐标位于100,50
			img.loadImage(imgUrl);
			
		}
	}
}
```

运行代码效果如动图2-2所示：

![动图2-2](img/2-2.gif) <br /> (动图2-2)







## 2 、用drawTexture方法显示与切换图片

### 2.1  drawTexture API 概述

在API文档中搜索laya.display.Graphics，可以找到drawTexture()方法，除此之外，还需要了解laya.net.LoaderManager中的load()方法和getRes()方法，以及laya.utils.Handler中的create()方法，各方法的参数图3、图4、图5、图6所示：

![图3](img/3.png) <br /> (图3)

![图4](img/4.png) <br /> (图4)

![图2](img/5.png) <br /> (图5)

![图2](img/6.png) <br /> (图6)



### 2.2 用drawTexture 加载显示图片的示例

​     loadImage()方法可以即时加载外部图片资源，也可以从缓冲区读取图片资源，drawTexture()方法则必须先加载完图片后，再绘制添加到舞台中来，因此在示例代码中需要使用到加载（`Laya.loader.load()`）与回调(`Handler.create()`)的方法，下面我们通过简单的示例代码加载显示一张图片，代码说明请查看代码中的注释部分以及相关API说明。

创建一个Main.as入口类，并设置为默认应用程序（推荐用FlashBuilder），编写代码如下：

```java
package
{
	import laya.display.Sprite;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey2:String = "res/img/monkey2.png";
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);                
			//设置舞台背景色
			Laya.stage.bgColor = "#ffffff"                        
			
			//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load(monkey2,Handler.create(this,graphicsImg));          
		}
		
		private function graphicsImg():void
		{
			var img:Sprite = new Sprite();
			//获取图片资源，绘制到画布
			img.graphics.drawTexture(Laya.loader.getRes(monkey2),100,50);
			
			//添加到舞台
			Laya.stage.addChild(img);
		}
		
	}
}
```

代码运行效果如图7-1所示。

![图7-1](img/7-1.png) <br /> (图7-1)





### 2.3 用drawTexture 切换图片的示例

 切换图片是在显示图片的基础之上，增加了清空绘制，然后通过代码逻辑获得新的图片资源重新绘制。具体的代码说明可以参考代码注释及API，结合实例运行体验。

下面我们在Main.as入口类中修改代码为如下所示：

```java
package
{
	import laya.display.Sprite;
	import laya.resource.Texture;
	import laya.utils.Handler;
	
	public class Main
	{
		private var monkey1:String = "res/img/monkey1.png";
		private var monkey2:String = "res/img/monkey2.png";
		private var flag:Boolean = false;
		private var img:Sprite;
		
		public function Main()
		{
			//初始化舞台
			Laya.init(1334,750);            
			//设置舞台背景色
			Laya.stage.bgColor        = "#ffffff"                        
			
			//加载多张图片，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
			Laya.loader.load([monkey1,monkey2],Handler.create(this,graphicsImg));                
		}
			
		
		private function graphicsImg(e:*=null):void
		{
          	//创建一个实例
			img = new Sprite();      
          	//添加到舞台
			Laya.stage.addChild(img);                  
			
			//显示初始化绘制的图片
			switchImg();			
          
			//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换纹理绘制
			img.on("click",this,switchImg);			

			//设置图片坐标
			img.pos(100,50);
			
		}
		
		private function switchImg(e:*=null):void
		{                        
			//清空绘制
			img.graphics.clear();
			
			//获得要切换的图片资源路径
			var imgUrl:String = (flag = !flag)? monkey2:monkey1;
			//获取图片资源
			var texture:Texture = Laya.loader.getRes(imgUrl);
			//绘制纹理
			img.graphics.drawTexture(texture);                        
			//设置纹理宽高
			img.size(texture.width, texture.height);        
			
		}
	}
}
```

代码运行效果如图7-2所示。


![动图7-2](img/7-2.gif) <br /> (动图7-2)





