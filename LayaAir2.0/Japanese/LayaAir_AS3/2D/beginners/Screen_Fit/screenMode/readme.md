#画面方向：自動横画面と自動縦画面の設定

>author：charley
>

###1、画面の方向に設置されたAPIの概要

エンジンのAPIファイルを開けて、laya.display.Stageを探して、見つけます。[screenMode属性](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Stage%3Ch1%3EscreenMode)。図1に示すように。![图1](img/1-1.png) 


（図1）

####1.1デフォルト値noneまたはscreenMode属性を設定しない

デフォルト値noneまたはscreenMode属性が設定されていない場合、画面の向きに関係なく、ゲームの水平方向は画面の回転に従って変化しません。

例えば、図2−1および図2−2の効果：

![图2-1](img/2-2.png) 


（図2-1）スマートフォンの縦画面の場合、screenModeの効果は設定されていません。

![图2-2](img/2-1.png) 


（図2-2）携帯の横画面の場合、screenModeの効果は設定されていません。

####1.2 screenMode属性がhorizontalの場合、自動横画面


```java

//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = "horizontal";
```


screenMode属性値がhorizontalに設定されている場合、画面の向きにかかわらず、ゲームの水平方向は画面の一番短い側と常に垂直に維持されます。図3-1と図3-2に示すように。

![图3-1](img/3-2.png) 


（図3-1）スマートフォンの縦画面の場合、screenMode属性はhorizontalの効果です。

![图3-2](img/3-1.png) 


（図3-2）携帯電話の横画面の場合、screenMode属性はhorizontalの効果です。



####1.3 screenMode属性がverticalの場合、自動的に縦画面になります。


```java

//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
Laya.stage.screenMode = "vertical";
```


screenMode属性値がverticalに設定されている場合、画面の向きに関係なく、ゲームの水平方向は画面の長い側と常に垂直に維持されます。図4−1と図4−2に示すように。

![img](img/4-1.png) 


（図4-1）スマートフォンの縦画面の場合、screenMode属性はverticalの効果です。

![img](img/4-2.png)  


（図4-2）携帯の横画面の場合、screenMode属性はverticalの効果です。



##2、自動横画面と縦画面のソースコードの例

このセクションでは、ソースの例を直接貼り付けて、開発者は、ローカルでLaya.stage.screenMode属性値の変更を体験することができます。

>初心者開発者に対しては、直接ソースをコピーすればいいです。screenModeとは関係のないコードに注目する必要はありません。ポイントは体験と理解のscreenMode属性の違いです。ソースに関連する画像資源は任意のpng資源で代替できます。`项目根目录/bin/h5/res`ディレクトリでは、リソースパスとリソース名が正しいことを確認するように注意してください。

####screenMode.asの例コードは以下の通りです。


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.Image;
	import laya.ui.Label;
	import laya.webgl.WebGL;

	public class screenMode
	{
		public function screenMode()
		{
			Laya.init(0, 0, WebGL);
			Laya.stage.scaleMode = "full";
			Laya.stage.bgColor = "#232628";
		
			//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
			Laya.stage.screenMode = "horizontal";
			//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
			//Laya.stage.screenMode = "vertical";
			
			showScreen();
		}
		
		private function showScreen():void
		{
			//图片
			var img:Image = new Image();
			img.centerX = 0;
			img.centerY = -70;
			img.skin = "res/monkey2.png";
			Laya.stage.addChild(img);
		
			//文字
			var text:Label = new Label();
			text.text = "游戏的水平方向";
			text.color = "gray";
			text.fontSize = 100;
			text.centerX = 0;
			text.centerY = 50;
			Laya.stage.addChild(text);
		}
	}
}
```




####定数の書き方について：

開発者がscreenModeの属性値を覚えられないなら、定数でツールのコードヒントを得ることができます。

screen定数値は図5に示すように、

![图5](img/5.png) 


（図5）

例の書き方：


```java

//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
//Laya.stage.screenMode = Stage.SCREEN_VERTICAL;
```




例で使用する画像リソース:

![monekey2](img/monkey2.png) 


mokey 2.png