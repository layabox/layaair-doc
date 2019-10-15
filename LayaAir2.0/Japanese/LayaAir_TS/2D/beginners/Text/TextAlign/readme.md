#テキストの配置&自動改行

配置モードに関しては、主に従来の水平方向の配置が垂直方向に配置されており、テキスト領域の中央にテキストが表示されます。まずAPIのパラメータ説明を理解して、サンプルコードを通して紹介します。laya.display.textにおけるテキストスタイルに関するAPIパラメータ：

![1](img/1.png)<br/>

![2](img/2.png)<br/>

![3](img/3.png)<br/>

![4](img/4.png)<br/>

フォントスタイルを設定してくれるコードの中で、まずこのテキストにテキスト範囲を設定してから、テキスト範囲の水平方向の中央揃えと垂直方向の中央揃えにテキストを設定します。テキスト領域を直接設定しないと、テキストの水平方向の配置と垂直方向の配置は効果がありません。


```typescript

module laya {
	import Stage = Laya.Stage;
	import Text = Laya.Text;
	import Browser = Laya.Browser;
	import WebGL = Laya.WebGL;

export class HelloLayabox {

	constructor() {
		// 不支持WebGL时自动切换至Canvas
		Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#232628";

        var txt:Laya.Text = new Laya.Text();
        //设置文本内容
        txt.text = "hello_world";
         //设置文本区背景
        txt.bgColor = "#c30c30";
         //设置文本的宽高
        txt.width = 400;
        txt.height = 400;
        //设置文本水平居中
        txt.align = "center";
        //设置文本垂直居中
        txt.valign = "middle";
        Laya.stage.addChild(txt);
		
	}
  }
}
new laya.HelloLayabox();
```


![5](img/5.png)<br/>

実際の符号化で他の配置モードが必要な場合は、APIにおけるalignとvalignの値を参照して、プロジェクトに適した水平配置モードと垂直配置モードを見つけてください。

テキストの内容が私達が設定したテキストエリアを超えていると、舞台の内容を超えて表示されません。この時は自動的に改行してテキストを表示する必要があります。

APIパラメータ:

![6](img/6.png)<br/>

上のコードでtxtのテキストの内容を多く設定し、自動改行のコードを追加します。

テキスト範囲の幅と高さを設定すると、テキストはデフォルトのテキストの幅で自動的に改行されます。コードは以下の通りです。


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;

    export class HelloLayabox { 
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";

            var txt:Laya.Text = new Laya.Text();
            //设置文本内容
            txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
            //设置文本区背景
            txt.bgColor = "#c30c30";
            //设置文本的宽高
            txt.width = 400;
            txt.height = 400;
            //设置文本水平居中
            txt.align = "center";
            //设置文本垂直居中
            txt.valign = "middle";
            //设置自动换行
            txt.wordWrap = true;
            Laya.stage.addChild(txt);            
        }
    }
}
new laya.HelloLayabox();
```


![7](img/7.png)<br/>

ここに行くと、私たちが設定した自動改行が実現され、すべてのテキストがこのテキスト領域に表示されます。