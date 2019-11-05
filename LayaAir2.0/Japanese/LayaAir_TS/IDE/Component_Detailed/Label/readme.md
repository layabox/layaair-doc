# Label 组件参考



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

コードを書く時は、コード制御UIを通して作成することが避けられません。`UI_Label`クラスはコードでLabel関連の属性を設定します。

**実行例の効果:**
​![5](img/4.png)<br/>
（図5）コードによるLabelの作成

Labelの他の属性もコードで設定できます。コードによって異なる肌（スタイル）を作成するLabelを実演しました。興味のある読者は自分でコード設定Labelを通じて、必要な文字効果を作成します。

より多くのテキスト効果は、2 D基本編のテキスト部分を見ることができます。

**サンプルコード:**


```javascript

module laya {
	import Stage = Laya.Stage;
	import Label = Laya.Label;
	import WebGL = Laya.WebGL;

	export class UI_Label {
		constructor() {
			// 不支持WebGL时自动切换至Canvas
			Laya.init(800, 600, WebGL);

			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			Laya.stage.alignH = Stage.ALIGN_CENTER;

			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			Laya.stage.bgColor = "#232628";

			this.setup();
		}

		private setup(): void {
			this.createLabel("#FFFFFF", null).pos(30, 50);
			this.createLabel("#00FFFF", null).pos(290, 50);
			this.createLabel("#FFFF00", "#FFFFFF").pos(30, 100);
			this.createLabel("#000000", "#FFFFFF").pos(290, 100);
			this.createLabel("#FFFFFF", "#00FFFF").pos(30, 150);
			this.createLabel("#0080FF", "#00FFFF").pos(290, 150);
		}

		private createLabel(color: string, strokeColor: string): Label {
			const STROKE_WIDTH: number = 4;

			var label: Label = new Label();
			label.font = "Microsoft YaHei";
			label.text = "SAMPLE DEMO";
			label.fontSize = 30;
			label.color = color;

			if (strokeColor) {
				label.stroke = STROKE_WIDTH;
				label.strokeColor = strokeColor;
			}

			Laya.stage.addChild(label);

			return label;
		}
	}
}
new laya.UI_Label();
```








 	