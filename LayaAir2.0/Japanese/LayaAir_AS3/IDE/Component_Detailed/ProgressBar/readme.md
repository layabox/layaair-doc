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
|--------------------------|
|sizeGrid進行バーの画像リソースの効果的なスケーリンググリッドデータ。𞓜
|skin 124;プログレスバーの画像リソース。𞓜
|runtime124;
124 visible 12464;



 



##二、コードでProgessBarを作成する

コードを書く時は、コード制御UIを通じてUUUICUProgressBarクラスを作成し、コードに導入します。`laya.ui.ProgressBar`のパッケージを作成し、コードでProgessBarに関する属性を設定します。

**実行例の効果:**
​![5](gif/1.gif)<br/>
（図5）コードによるProgessBarの作成

PrograessBarの他の属性もコードで設定できますが、上記の例ではコードを使って皮膚の異なるPrograessBarを作成する方法を示しています。興味のある読者は自分でコードを通してProgessBarを設定し、自分のニーズにあったプログレスバーを作成することができます。

**サンプルコード:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.ProgressBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ProgressBar
	{
		private var progressBar:ProgressBar;
		
		public function UI_ProgressBar()
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
			
			//加载资源
			Laya.loader.load(["../../../../res/ui/progressBar.png", "../../../../res/ui/progressBar$bar.png"], Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete():void
		{
			//实例化进度条
			progressBar = new ProgressBar("../../../../res/ui/progressBar.png");
			//设置宽度
			progressBar.width = 400;
			//设置显示位置，在舞台居中
			progressBar.x = (Laya.stage.width - progressBar.width ) / 2;
			progressBar.y = Laya.stage.height / 2;
			
			//设置九宫格边距，以防变形
			progressBar.sizeGrid = "5,5,5,5";
			//数据改变时回调方法
			progressBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(progressBar);
			
			//时间间隔循环，每100毫秒改变一次数据
			Laya.timer.loop(100, this, changeValue);
		}
		
		/***时间间隔循环回调，更新进度条***/
		private function changeValue():void
		{
			//最大为1，每次间隔更新5%
			if (progressBar.value >= 1)
				progressBar.value = 0;
			progressBar.value += 0.05;
		}
		
		/***进度条数据改变回调***/
		private function onChange(value:Number):void
		{
			trace("进度：" + Math.floor(value * 100) + "%");
		}
	}
}
```


