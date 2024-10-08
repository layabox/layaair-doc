#ProgessBarモジュール参考



##一、LayaAirIDEでProgessBarコンポーネントを作成する

###1.1 ProgessBarを作成する

PrograessBarは、リソースのロードの進捗、キャラクターの経験、または血液量の進行など、ゲーム中のある操作の進捗を表示するためによく使われます。
リソースパネルのプログレスBarコンポーネントをクリックして、ページの編集エリアにドラッグします。プログレスBarコンポーネントをページに追加します。
ProgessBarのスクリプトインターフェースの参考[ProgressBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ProgressBar)。

ProgressBarコンポーネントのリソース例：

​![图片0.png](img/1.png)<br/>
（図1）

​![图片0.png](img/2.png)<br/>
（図2）

ProgressBarコンポーネントの属性valueの値を0.3に設定すると、次のように表示されます。

​![图片0.png](img/3.png)<br/>
（図3）



  



###1.2 ProgessBarコンポーネントの一般的な属性

​![图片0.png](img/4.png)<br/>
（図4）

𞓜**属性**𞓜**機能説明**𞓜
|------------------------------------------|
|sizeGrid進行バーの画像リソースの効果的なスケーリンググリッドデータ。𞓜
|skin 124;プログレスバーの画像リソース。𞓜
|value𞓜プログレスバーの進捗値は、0から1の間です。𞓜



 



##二、コードでProgessBarを作成する

コードを書く時は、コード制御UIを通じてUUUICUProgressBarクラスを作成し、コードに導入します。`laya.ui.ProgressBar`のパッケージを作成し、コードでProgessBarに関する属性を設定します。

**実行例の効果:**

​	![5](gif/1.gif)<br/>
（図5）コードによるProgessBarの作成

PrograessBarの他の属性もコードで設定できますが、上記の例ではコードを使って皮膚の異なるPrograessBarを作成する方法を示しています。興味のある読者は自分でコードを通してProgessBarを設定し、自分のニーズにあったプログレスバーを作成することができます。

**サンプルコード:**


```javascript

(function()
{
	var Stage       = Laya.Stage;
	var ProgressBar = Laya.ProgressBar;
	var Handler     = Laya.Handler;
	var WebGL       = Laya.WebGL;

	var progressBar;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(800, 600, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(["res/ui/progressBar.png", "res/ui/progressBar$bar.png"], Handler.create(this, onLoadComplete));
	})();

	function onLoadComplete()
	{
		progressBar = new ProgressBar("res/ui/progressBar.png");

		progressBar.width = 400;

		progressBar.x = (Laya.stage.width - progressBar.width) / 2;
		progressBar.y = Laya.stage.height / 2;

		progressBar.sizeGrid = "5,5,5,5";
		progressBar.changeHandler = new Handler(this, onChange);
		Laya.stage.addChild(progressBar);

		Laya.timer.loop(100, this, changeValue);
	}

	function changeValue()
	{

		if (progressBar.value >= 1)
			progressBar.value = 0;
		progressBar.value += 0.05;
	}

	function onChange(value)
	{
		console.log("进度：" + Math.floor(value * 100) + "%");
	}
})();
```


