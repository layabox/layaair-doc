# 显示与切换图片

> 图片的显示是游戏开发基础，本篇从API到示例分别介绍Sprite.loadImage与Graphics.drawTexture两种显示图片的方法。

## 1、用loadImage方法显示与切换图片

### 1.1 loadImage API概述

在API文档中搜索laya.display.Sprite，可以找到loadImage()方法，如图1所示，我们先熟悉一下该方法的参数。

![图1](img/1.png) <br /> (图1)

### 1.2 用loadImage加载显示图片的示例

创建一个Main.js入口类，编写代码如下：

```javascript
(function()
{
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		showApe();
	})();

	function showApe()
	{
		// 方法1：使用loadImage
		var ape = new Sprite();
		Laya.stage.addChild(ape);
		ape.loadImage("../../res/apes/monkey3.png");		
	}
})();
```

在示例代码里，“`100,50`”是图片的显示坐标信息。示例代码运行效果如图2-1所示：

![图2-1](img/2.png) <br /> (图2-1)

### 1.3 用loadImage切换图片的示例

  切换图片是在显示图片的基础之上，增加了清空绘制，然后通过代码逻辑获得新的图片资源重新绘制。具体的代码说明可以参考代码注释及API，结合实例运行体验。

下面我们在Main.js类中修改代码为如下所示：

```javascript
(function()
{
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;

	var texture1 = "../../res/apes/monkey2.png";
	var texture2 = "../../res/apes/monkey3.png";
	var flag = false;

	var ape;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		Laya.loader.load([texture1, texture2], Handler.create(this, onAssetsLoaded));
	})();

	function onAssetsLoaded()
	{
		ape = new Sprite();
		Laya.stage.addChild(ape);
		ape.pivot(55, 72);
		ape.pos(200, 200);

		// 显示默认纹理
		switchTexture();

		ape.on("click", this, switchTexture);
	}

	function switchTexture()
	{
		var textureUrl = (flag = !flag) ? texture1 : texture2;

		// 更换纹理
		ape.graphics.clear();
		ape.loadImage(textureUrl);
		var texture = Laya.loader.getRes(textureUrl);
	}
})();
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

创建一个Main.js类，编写代码如下：

```javascript
(function()
{
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		showApe();
	})();

	function showApe()
	{
		//方法2：使用drawTexture
		Laya.loader.load("../../res/apes/monkey2.png", Handler.create(this, function()
		{
			var t = Laya.loader.getRes("../../res/apes/monkey2.png");
			var ape = new Sprite();
			ape.graphics.drawTexture(t, 0, 0);
			Laya.stage.addChild(ape);
			ape.pos(200, 0);
		}));
	}
})();
```

代码运行效果如图7-1所示。

![图7-1](img/7.png) <br /> (图7-1)





### 2.3 用drawTexture 切换图片的示例

 切换图片是在显示图片的基础之上，增加了清空绘制，然后通过代码逻辑获得新的图片资源重新绘制。具体的代码说明可以参考代码注释及API，结合实例运行体验。

下面我们在Main.js类中修改代码为如下所示：

```javascript
(function()
{
	var Sprite  = Laya.Sprite;
	var Stage   = Laya.Stage;
	var Texture = Laya.Texture;
	var Browser = Laya.Browser;
	var Handler = Laya.Handler;
	var WebGL   = Laya.WebGL;

	var texture1 = "../../res/apes/monkey2.png";
	var texture2 = "../../res/apes/monkey3.png";
	var flag = false;

	var ape;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		Laya.loader.load([texture1, texture2], Handler.create(this, onAssetsLoaded));
	})();

	function onAssetsLoaded()
	{
		ape = new Sprite();
		Laya.stage.addChild(ape);
		ape.pivot(55, 72);
		ape.pos(200, 200);

		// 显示默认纹理
		switchTexture();

		ape.on("click", this, switchTexture);
	}

	function switchTexture()
	{
		var textureUrl = (flag = !flag) ? texture1 : texture2;

		// 更换纹理
		ape.graphics.clear();
		var texture = Laya.loader.getRes(textureUrl);
		ape.graphics.drawTexture(texture, 0, 0);

		// 设置交互区域
		ape.size(texture.width, texture.height);
	}
})();
```

代码运行效果如图7-2所示。

![动图7-2](img/7-2.gif) <br /> (动图7-2)





