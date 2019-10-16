#Compboxコンポーネントの参考



##一、LayaAirIDEでCompboboxコンポーネントを作成する
###1.1 Compboxを作成する
Compboxはドロップダウンリストオプションボックスのコンポーネントです。
資源パネルのCompboxコンポーネントをクリックして、ページ編集エリアにドラッグ＆ドロップして、Compboxコンポーネントをページに追加します。
Commboboxのスクリプトはインターフェースを参照してください。[ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox)。

Compboxコンポーネントの画像リソース例：

​![图片0.png](img/1.png)<br/>
（図1）

Commboboxの属性labelsの値を設定して「label 1,label 2」としたら、次のように表示されます。
常態:

​![图片0.png](img/2.png)<br/>
（図2）

クリックしてドロップダウンオプションのリストを表示します。

​![图片0.png](img/3.png)<br/>
（図3）

ドロップダウンオプションでアイテム1を選択した後：

​![图片0.png](img/4.png)<br/>
（図4）



###1.2 CommboBoxコンポーネントの一般的な属性

​![图片0.png](img/5.png)<br/>
（図5）

𞓜**属性**𞓜**機能説明**𞓜
|-------------------------------------|
選択ボックスのラベルテキストの内容セット文字列をカンマで区切ります。𞓜
|visibleNumプルダウンリストに表示される最大行数。𞓜
scrollBarSkinプルダウンリストのスクロールバーの画像リソース。𞓜
|selected Index 124;は現在選択されている項目の索引を表します。𞓜
|sizeGrid𞓜プルダウンリスト画像リソースの有効スケーリンググリッドデータ（九宮格データ）。𞓜
|skin 124;プルダウンリストの画像リソース。𞓜



 



###1.3 Commboboxコンポーネントのドロップダウンオプションに関する属性
​![图片0.png](img/6.png)<br/>
（図6）

​![图片0.png](img/7.png)<br/>
（図7）

𞓜**属性**𞓜**機能説明**𞓜
|------|-----------------------------------------|
|itemColorsプルダウンリスト項目の各状態のラベルテキストの色値セット。詳細はAPIを参照してください。𞓜
|itemSizeプルダウンリスト項目のラベルテキストのフォントサイズ。𞓜



 

 



###1.4 Commboboxコンポーネントドロップボタン関連属性

​![图片0.png](img/8.png)<br/>
（図8）

​![图片0.png](img/9.png)<br/>
（図9）

𞓜**属性**𞓜**機能説明**𞓜
|-----------------------------|
|label Bold|プルダウンボタンのラベルテキストは太字表示です。𞓜
|label Color𞓜プルダウンボタンの各状態におけるテキストの色値のセット。詳細はAPIを参照してください。𞓜
|Label Font𞓜プルダウンボタンのテキストフォント。𞓜
|labelPaddingプルダウンボタンのテキスト余白。詳細はAPI 124を参照してください。
|LabelSizeプルダウンボタンのテキストフォントサイズ。𞓜



 



##二、コードでCoboboxコンポーネントを作成する

コードを書く時は、コード制御UIを通して作成することが避けられません。`UI_ComboBox`クラスをコードにインポート`laya.ui.ComboBox`のカバンをコードで設定し、Cobobox関連の属性を設定します。

**実行例の効果:**
​![1](gif/1.gif)<br/>
（図10）

Compboxの他の属性もコードで設定できます。下記の例では、コードを使って選択ボックスのドロップダウンオプションを作成する方法を示しています。クリックして自分のクリックを取得するには、どのオプションがありますか？興味のある読者は自分でコードを通じてCoboboxを設置し、自分の必要に合うプルダウンフレームを作成することができます。


```javascript

package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.ComboBox;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_ComboBox	
	{
		/***下边列表美术资源**/
		private var skin:String = "../../../../res/ui/combobox.png";
		/***下拉列表**/
		private var comboBox:ComboBox 
		/***提示信息文本框**/
		private var promptText:Text;
		
		public function UI_ComboBox() 
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
			Laya.loader.load(skin, Handler.create(this, onLoadComplete));
		}
		
		/***加载资源完成***/
		private function onLoadComplete(e:*=null):void
		{
			//实例化下拉列表
			comboBox= new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
			//按钮标签字体大小
			comboBox.labelSize = 30;
			//列表项标签字体大小
			comboBox.itemSize = 25;
			//下拉列表选择触发处理回调
			comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
			//加载到舞台
			Laya.stage.addChild(comboBox);
			//自动计算宽高
			comboBox.autoSize = true;
			//设置位置
			comboBox.pos((Laya.stage.width - comboBox.width) / 2, 150);
			//自动计算宽高关闭（在设置位置时，需获取列表宽度，获取后关闭）
			comboBox.autoSize = false;
			
			//创建选择提示信息框
			createPromptText()
		}
		
		/***创建提示信息***/
		private function createPromptText():void
		{
			//实例化提示信息
			promptText=new Text();
			//提示框字体
			promptText.font="黑体";
			//提示框字体大小
			promptText.fontSize=26;
			//提示框字体颜色
			promptText.color="#FFFFFF";
			//提示框初始文本
			promptText.text="您的选择是： ";
			//加载到舞台
			Laya.stage.addChild(promptText);
			//设置提示框位置
			promptText.pos(comboBox.x,comboBox.y-40);
		}
		
		/***下拉列表选择事件回调***/
		private function onSelect(comboBox:ComboBox):void
		{
			promptText.text="您的选择是： " + comboBox.selectedLabel;
		}
	}
}
```


