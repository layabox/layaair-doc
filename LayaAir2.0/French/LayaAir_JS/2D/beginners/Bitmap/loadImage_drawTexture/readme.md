#Afficher et changer

> l 'affichage de l' image est la base du développement du jeu.

##Affichage et transfert d 'images au moyen d' un procédé loadimage

###1.1 Description générale

La recherche laya.display.sprite dans le document API permet de trouver la méthode loadimage () et, comme le montre la figure 1, nous connaissons d 'abord les paramètres de cette méthode.

![图1](img/1.png)< br / > (Figure 1)

###1.2 exemples de téléchargement d'images

Créer une catégorie d 'entrée main.js, dont le code sera rédigé comme suit:


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


"Dans le Code de l'exemple,"`100,50`"Est l 'information des coordonnées d' affichage de l 'image.L 'effet d' exécution de l 'exemple de code est illustré dans la figure 2 - 1:

![图2-1](img/2.png)< br / > (figures 2 - 1)

###1.3 exemples de transfert d 'images au moyen de loadimage

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie main.js, nous modifions le Code comme suit:


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


L'effet du Code d'exécution est illustré dans la figure 2 - 2:

![动图2-2](img/2-2.gif)< br / > (Figure 2 - 2)







##Affichage et transfert d 'images au moyen d' un procédé drawtexture

###2.1 Description générale

La recherche de laya.display.graphics dans le document API permet de trouver la méthode drawtexture () et, en plus, de connaître la méthode load () et la méthode getres () de laya.net.loadermanager, ainsi que la méthode create () de laya.utils.handler, dont les paramètres sont indiqués dans les figures 3, 4, 5 et 6 de chaque méthode:

![图3](img/3.png)< br / > (Figure 3)

![图4](img/4.png)< br / > (Figure 4)

![图2](img/5.png)< br / > (Figure 5)

![图2](img/6.png)< br / > (Figure 6)



###2.2 exemples de téléchargement d 'images

Le procédé loadimage () peut charger instantanément des ressources d 'images extérieures ou lire des ressources d' images à partir de la zone tampon, alors que le procédé drawtexture () doit d 'abord charger l' image, puis dessiner l 'ajout à la scène, de sorte qu' il doit être utilisé dans le Code d 'exemples pour charger (().`Laya.loader.load()`Et le retour`Handler.create()`Pour afficher une image, vous pouvez consulter la partie annotée du Code ainsi que la description API correspondante.

Créer une catégorie main.js, dont le code sera rédigé comme suit:


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


L'effet d'exploitation du Code est indiqué dans la figure 7 - 1.

![图7-1](img/7.png)< br / > (figures 7 - 1)





###2.3 exemples d 'images commutées par drawtexture

Le transfert d 'image est effectué sur la base de l' affichage d 'une image, ce qui permet d' ajouter un dessin vide, puis d 'obtenir une nouvelle ressource d' image qui est reprogrammée au moyen d 'une logique de code.Des descriptions de code spécifiques peuvent être mentionnées dans les notes de code et l 'API, ainsi que dans l' expérience d 'exécution d' exemples.

Dans la catégorie main.js, nous modifions le Code comme suit:


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


L'effet d'exploitation du Code est indiqué dans la figure 7 - 2.

![动图7-2](img/7-2.gif)< br / > (Figure 7 - 2)





