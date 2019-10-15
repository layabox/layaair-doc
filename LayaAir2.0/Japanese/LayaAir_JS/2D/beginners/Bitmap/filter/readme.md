#フィルタ効果の設定

>LayaAirエンジンは、カラーフィルタ、発光（または影）フィルタ、ぼかしフィルタの3つの効果を提供します。カラーフィルタは、CanvasとWebGLモードをサポートしていますが、発光フィルタとボケフィルタは、性能の消耗が大きいため、WebGLモードのみに対応しています。



##1、カラーフィルタの設定

###1.1色フィルタAPIの概要

カラーフィルタ類のColorFilterはlaya.filtersパッケージにあり、指定行列（*4 x 5に配列されたマトリックス*）により各カラーチャンネルを変更します。

クリック[laya.filters.ColorFilter ](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.ColorFilter)APIの説明を見る。



###1.2カラーフィルタの設定

ビットマップにカラーフィルタを設定するには、まずカラー行列を設定し、次にコードで示すように、ColorFilter方法でカラーフィルタの例を作成します。


```java

//颜色矩阵，红色
var colorMatrix = 
  [
  1, 0, 0, 0, 0, //R
  0, 0, 0, 0, 0, //G
  0, 0, 0, 0, 0, //B
  0, 0, 0, 1, 0, //A
];

//创建颜色滤镜
var redFilter = new Laya.ColorFilter(colorMatrix)
```


最後にSpriterのfilters属性によってカラーフィルタ効果を所定の位置に重ね合わせます。下記のようにMain.jsクラスを作成します。コードを作成します。


```javascript

(function()
{
	var Sprite      = Laya.Sprite;
	var Stage       = Laya.Stage;
	var ColorFilter = Laya.ColorFilter;
	var Texture     = Laya.Texture;
	var Browser     = Laya.Browser;
	var Handler     = Laya.Handler;
	var WebGL       = Laya.WebGL;

	var ApePath = "../../res/apes/monkey2.png";

	var apeTexture;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(ApePath, Handler.create(this, setup));
	})();

	function setup()
	{
		normalizeApe();
		makeRedApe();
		grayingApe();
	}

	function normalizeApe()
	{
		var originalApe = createApe();

		apeTexture = Laya.loader.getRes(ApePath);
		originalApe.x = (Laya.stage.width - apeTexture.width * 3) / 2;
		originalApe.y = (Laya.stage.height - apeTexture.height) / 2;
	}

	function makeRedApe()
	{
		//由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
		var redMat =
			[
				1, 0, 0, 0, 0, //R
				0, 0, 0, 0, 0, //G
				0, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
			];

		//创建一个颜色滤镜对象,红色
		var redFilter = new ColorFilter(redMat);

		// 赤化猩猩
		var redApe = createApe();
		redApe.filters = [redFilter];

		var firstChild = Laya.stage.getChildAt(0);
		redApe.x = firstChild.x + apeTexture.width;
		redApe.y = firstChild.y;
	}

	function grayingApe()
	{
		//由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
		var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
	
		//创建一个颜色滤镜对象，灰图
		var grayscaleFilter = new ColorFilter(grayscaleMat);
		
		// 灰度猩猩
		var grayApe = createApe();
		grayApe.filters = [grayscaleFilter];

		var secondChild = Laya.stage.getChildAt(1);
		grayApe.x = secondChild.x + apeTexture.width;
		grayApe.y = secondChild.y;
	}

	function createApe()
	{
		var ape = new Sprite();
		ape.loadImage("../../res/apes/monkey2.png");
		Laya.stage.addChild(ape);

		return ape;
	}
})();
```


上のコードでは、元のビットマップ、赤フィルタ効果のビットマップ、灰色フィルタ効果のビットマップを作成しました。運転効果は図1に示します。

![图1](img/1.png)<br/>(図1)





##2、発光と影フィルタの設定

###2.1発光フィルタAPIについて簡単に説明する。

発光フィルタ類GlowFilterはlaya.filtersパッケージにあり、発光のオフセット角度をシャドウフィルタとしても使用でき、パラメータ説明は図2に示すようになっている。注意：このフィルターはWebGLモードでのみ有効です。

![图2](img/2.png)<br/>(図2)

クリック[laya.filters. GlowFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.GlowFilter)APIの説明を見る。



###2.2発光フィルタと影フィルタの設定

発光と影フィルタの設定は比較的簡単で、符号化によって直接的に効果の例を確認します。

まずMain.jsクラスを作成します。コードは以下の通りです。


```javascript

(function()
{
	var Sprite     = Laya.Sprite;
	var Stage      = Laya.Stage;
	var GlowFilter = Laya.GlowFilter;
	var Texture    = Laya.Texture;
	var Browser    = Laya.Browser;
	var Handler    = Laya.Handler;
	var WebGL      = Laya.WebGL;

	var apePath = "../../res/apes/monkey2.png";

	var ape,apeGlow,apeshadow;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(apePath, Handler.create(this, setup));
	})();

	function setup()
	{
		createApe();
		filterGlow();
		filterShadow();
	}

	function createApe()
	{
		ape = new Sprite();
		ape.loadImage(apePath);

		apeGlow = new Sprite();
		apeGlow.loadImage(apePath);

		apeshadow = new Sprite();
		apeshadow.loadImage(apePath);

		ape.pos(100,50);
		apeGlow.pos(250,50);
		apeshadow.pos(400,50);
		

		Laya.stage.addChild(ape);
		Laya.stage.addChild(apeGlow);
		Laya.stage.addChild(apeshadow);
	}

	function filterGlow()
	{
		//创建一个发光滤镜
		var glowFilter = new GlowFilter("#ffff00", 10, 0, 0);
		//设置滤镜集合为发光滤镜
		apeGlow.filters = [glowFilter];
	}
	function filterShadow()
	{
		//创建一个阴影滤镜
		var glowFilter = new GlowFilter("#000000", 8, 8, 8);
		//设置滤镜为阴影滤镜
		apeshadow.filters = [glowFilter];
	}
})();
```


上のコードでは元のビットマップ、発光フィルタ効果のビットマップ、影フィルタ効果のビットマップを作成しました。運転効果は図3に示す通りです。

![图3](img/3.png)<br/>(図3)



##3、ぼかしフィルタの設定

###3.1あいまいフィルタAPIの簡単な説明

ぼかしフィルタ類BlurFilterはlaya.filtersパッケージにあり、streengthパラメータを調整することによってぼかしフィルタの強度を設定し、値が大きいほど、ペーストフィルタをかけます。パラメータ説明は図4に示されています。注意：このフィルターはWebGLモードでのみ有効です。

![图4](img/4.png)<br/>(図4)

クリック[laya.filters. BlurFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.BlurFilter)APIの説明を見る。



###3.2ぼかしフィルタの設定

ぼかしフィルタの設定は簡単で、ぼかしフィルタの例を作成し、ぼかし強度を設定してビットマップに重畳すればいいです。私たちは直接に符号化によって効果の例を確認します。

まずMain.jsクラスを作成します。コードは以下の通りです。


```javascript

(function()
{
	var Sprite     = Laya.Sprite;
	var Stage      = Laya.Stage;
	var BlurFilter = Laya.BlurFilter;
	var Browser    = Laya.Browser;
	var Handler    = Laya.Handler;
	var WebGL      = Laya.WebGL;

	var apePath = "../../res/apes/monkey2.png";

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(apePath, Handler.create(this, createApe));
	})();

	function createApe()
	{
		var ape = new Sprite();
		ape.loadImage(apePath);
		ape.pos(100,50);

		var apeBlur = new Sprite();
		apeBlur.loadImage(apePath);
		apeBlur.pos(250,50);

		Laya.stage.addChild(ape);
		Laya.stage.addChild(apeBlur);

		applayFilter(apeBlur);
	}

	function applayFilter(ape)
	{
		var blurFilter = new BlurFilter();
		blurFilter.strength = 5;
		ape.filters = [blurFilter];
	}
})();
```


上のコードの中で、オリジナルのビットマップとボケフィルタ効果のビットマップを作成しました。運転効果は図5に示す通りです。

![图5](img/5.png)<br/>(図5)



