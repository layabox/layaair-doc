#Labelコンポーネントの参考



##一、LayaAirIDEでLabelコンポーネントを作成する

###1.1 Labelの作成

Labelコンポーネントは、テキストの一部を表示するために使用されます。文字はシステムフォントまたはBMFontフォントとすることができます。

資源パネルのLabelコンポーネントをクリックして、ページ編集エリアにドラッグ＆ドロップして、Labelコンポーネントをページに追加できます。
Labelコンポーネントのスクリプトインターフェースを参照してください。[Label API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Label)。

Labelコンポーネントのリソース例：

​![图片0.png](img/1.png)<br/>
（図1）

Labelコンポーネントを編集エリアにドラッグして、text属性の値をLayaAir IDEに設定した後の表示効果は以下の通りです。

​![图片0.png](img/2.png)<br/>
（図2）



 

 



###1.2 Label属性

​![图片0.png](img/3.png)<br/>
（図）

𞓜**属性**|機能説明124;
|--------------------------------------------|
|text𞓜テキストの内容文字列。𞓜
|align𞓜テキストの水平方向の配置。オプション値は、left、センター、rightがあります。𞓜
|valign𞓜テキストの垂直配置。オプションはtop、middle、bottomがあります。𞓜
| color       | 文本的颜色值。默认为黑色。                    |
|bgColor|テキストの背景色。𞓜
|font 124;文字のフォント名。𞓜
|fontSizeテキストのフォントサイズ。𞓜
|bold𞓜文字は太字で表示されていますか？𞓜
|italic𞓜テキストは斜体として表示されていますか？𞓜
|ワードWrap|テキストは改行されますか？𞓜
|strook|テキストの描画幅。𞓜
|strook Colorテキストのエッジ色。𞓜
|asPassword𞓜テキストはパスワードスタイルとして表示されていますか？𞓜
|leading𞓜テキストの垂直行の間隔。𞓜
𞓜paddingのテキストの余白。𞓜



 



##二、コードによるLabelコンポーネントの作成

コードを書く時は、コード制御UIを通して作成することが避けられません。`UI_Label`クラスをコードにインポート`laya.ui.Label`のバッグをコードでLabel関連の属性を設定します。

**実行例の効果:**

​	![5](img/4.png)<br/>
（図5）コードによるLabelの作成

Labelの他の属性もコードで設定できます。コードによって異なる肌（スタイル）を作成するLabelを実演しました。興味のある読者は自分でコード設定Labelを通じて、必要な文字効果を作成します。

より多くのテキスト効果は、2 D基本編のテキスト部分を見ることができます。

**サンプルコード:**


```javascript

package 
{
	import laya.display.Stage;
	import laya.ui.Label;
	import laya.webgl.WebGL;
	
	public class UI_Label
	{
		public function UI_Label()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(800, 600, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#232628";

			//创建多个label文本
			createMoreLabel();			
		}

		/***创建多个label文本***/
		private function createMoreLabel():void
		{
			//创建各种文本效果并设置位置
			createLabel("#FFFFFF", null).pos(30, 50);
			createLabel("#00FFFF", null).pos(290, 50);
			createLabel("#FFFF00", "#FFFFFF").pos(30, 100);
			createLabel("#000000", "#FFFFFF").pos(290, 100);
			createLabel("#FFFFFF", "#00FFFF").pos(30, 150);
			createLabel("#0080FF", "#00FFFF").pos(290, 150);
		}
		
		/**
		 * 创建Label文本
		 * @param color 	         文字颜色
		 * @param strokeColor  文字描边颜色
		 */		
		private function createLabel(color:String, strokeColor:String):Label
		{
			//实例化label文本
			var label:Label = new Label();
			//设置文本字体
			label.font = "Microsoft YaHei";
			//设置文本内容
			label.text = "SAMPLE DEMO";
			//设置文本字体大小
			label.fontSize = 30;
			//设置文本字体颜色
			label.color = color;
			
			//如果有描颜色参数
			if (strokeColor)
			{
				//文本描边宽度为4
				label.stroke = 4;
				//设置文本描边颜色
				label.strokeColor = strokeColor;
			}
			//加载到舞台
			Laya.stage.addChild(label);
			
			return label;
		}
	}
}
```








 	