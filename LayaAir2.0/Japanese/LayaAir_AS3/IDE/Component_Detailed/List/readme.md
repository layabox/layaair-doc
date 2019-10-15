#Listコンポーネント参照



##一、LayaAirIDEでListコンポーネントを作成する

Listコンポーネントはプロジェクトリストを表示することができます。デフォルトは垂直方向のリストです。UIエディタでリストをカスタマイズできます。Listリストの各リストは通常同じですが、エディタを使って異なるスタイルのリストの内容項目をカスタマイズすることもできます。
Listは通常2つの部分から構成される。リストレンダリング項目（セル）、スクロールバー。
Listコンポーネントのスクリプトインターフェースを参照してください。[List API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.List)。



 



###1.1 Listコンポーネントの作成

####1.リスト項目を編集します。

リスト項目は、BoxオブジェクトまたはView(ページ)または他のカスタムページオブジェクトとすることができます。ここではBoxオブジェクトを例にします。
​**a.**資源パネルからLabelコンポーネントを選択して、編集エリアのインターフェースにLabel属性nameを設定します。またLabelの表示に関する属性を設定してもっと綺麗にしてください。
​**b.**Labelオブジェクトを選択し、ショートカットキーCtrl+Bまたは選択を使用します。**メニューバー->編集->コンテナに変換**を選択して、容器設定パネルに変換し、容器の種類をBoxにし、決定ボタンをクリックしてBox容器の追加を完了します。

​![图片0.png](img/1.png)<br/>
（図1）





 ####2.List容器に変換します。

リストレンダリング項目のオブジェクトを選択し、ショートカットキーCtrl+Bまたは選択を使用します。**メニューバー->編集->コンテナに変換**を選択して、容器設置パネルに変換し、容器の種類をListに選択し、決定ボタンをクリックして容器Listの追加を完了します。
​![图片0.png](img/2.png)<br/>
（図2）
####3.Listのリストレンダリング項目を指定します。
方法1：ListオブジェクトをダブルクリックしてList内部に入り、Listリストレンダリング項目の属性nameの値をレンダーとして設定します。**ここでレンダリング項目の属性nameの値はレンダーでなければなりません。**

方法2：ListオブジェクトをダブルクリックしてList内部に入り、Listリストレンダリング項目の属性レンダリングタイプの値をレンダーとします。


​![图片0.png](img/3.png)<br/>

（図3）

####4.Listにスクロールバーのコンポーネントを追加します。
方法1：資源パネルからVcrollBarのコンポーネントを選んで、Listコンポーネントの内部にドラッグして、VcrollBarコンポーネントのオブジェクトの属性nameの値をscrollBarとします。***注意：ここのスクロールバーの属性nameの値はscrollBarでなければなりません。***

方法2：listコンポーネントを選択して、右側の属性パネルはよく使う中でvScrrollBarrSkinが現れて、資源パネルの中からVcrollBarrコンポーネントを選んでドラッグしてこのskin属性の中に来て、すぐにスクロールバーを生成します。

​![图片0.png](img/4.png)<br/>
（図4）

####5.ドラッグ設定Listの幅の高さ
属性repeat Xの値を1に設定し、repeat Yの値を6に設定します。Listオブジェクトのグローバル参照名、すなわち属性varを設定する値はmulistである。
​![图片0.png](img/5.png)<br/>
（図5）

####6.コードにListオブジェクトに値を割り当てます。



```javascript

 var data:Array =[];

   for(var m:int =0;m<20;m++){

        data.push({m_label:"No."+m});
}
m_list.array = data;
```



####7.プログラム内で実行して効果を確認します。
​![图片0.gif](gif/1.gif)<br/>
（図6）

####8.コードにスクリプトを追加し、スクロールバーを隠し、ドラッグの輪ゴム効果を設定します。

```javascript

 m_list.scrollBar.hide = true;//隐藏列表的滚动条。
 m_list.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
 m_list.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离。
```


####9.プログラム内で実行して効果を確認します。
​![图片0.gif](gif/2.gif)<br/>
（図7）


###1.2 Listコンポーネントの一般的な属性

​![图片0.png](img/6.png)<br/>
（図8）

𞓜**機能説明**𞓜**属性**𞓜
|------------------------------------------|
|水平方向に表示されるセルの数。ヽoo。ツ
|垂直方向に表示されるセルの数。ヽoo。ツ
|水平方向に表示されるセル間の間隔（ピクセル単位）。124 spaceX 124
|垂直方向に表示されるセル間の間隔（ピクセル単位）。124 spaceY 124
皮膚を縦に転がす。|vScrrollBarSkin|
|の水平方向に皮膚を転がす。|h ScrrollBarSkin|



  



###1.3 Tips:

1.Listにスクロールバーを追加するには、2つの方法があります。1つは直接List内部にスクロールバーをドラッグ＆ドロップし、スクロールバーの名前をscrollBarとして設定し、もう1つはListの属性vScrlBarSkin、hScrrollBarSkinの値をスクロールバーのリソースアドレスとして設定します。

2.Listのリストレンダリング項目は、Boxオブジェクトであっても良いし、ページオブジェクトであっても良い。

​


##二、コードによるListコンポーネントの作成

コードを書く時は、コード制御UIを通じてUUUUUUUUUUnistクラスを作成し、コードに導入することが避けられません。`laya.ui.List`のパケットをコードで設定し、Listに関する属性を設定します。

**実行例の効果:**
​![5](gif/3.gif)<br/>
（図9）コードによるListの作成

Listの他の属性もコードで設定できます。コードによって異なる肌（スタイル）を作成するListがどのように実演されますか？興味のある読者は自分でコードを通してListを設定して、自分のニーズに合ったリストを作成できます。

**サンプルコード:**


```javascript

package
{
	import laya.display.Stage;
	import laya.ui.Box;
	import laya.ui.Image;
	import laya.ui.List;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_List
	{
		//列表对应图片的路径
		private var data:Array = [  "../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg",
									"../../../../res/ui/listskins/1.jpg",
									"../../../../res/ui/listskins/2.jpg",
									"../../../../res/ui/listskins/3.jpg",
									"../../../../res/ui/listskins/4.jpg",
									"../../../../res/ui/listskins/5.jpg"];
		
		public function UI_List()
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

			//创建列表
			createList();			
		}
		
		/***创建list列表**/
		private function createList():void
		{
			//实例化列表
			var list:List = new List();
			//设置列表渲染单元格为Item类（注：必须是类，不能是实例化对象，Item需类继承于Box）
			list.itemRender =Item;
			//列表显示区单元格的列数
			list.repeatX = 1;
			//列表显示区单元格的行数
			list.repeatY = 4;
			//设置列表位置
			list.x = (Laya.stage.width - Item.WID) / 2;
			list.y = (Laya.stage.height - Item.HEI * list.repeatY) / 2;
			
			// 使用但隐藏垂直滚动条
			list.vScrollBarSkin = "";
			//滚动在头或底回弹时间
			list.scrollBar.elasticBackTime = 500;
			//滚动在头或底最大距离
			list.scrollBar.elasticDistance = 200;
			
			//设置为可以选择
			list.selectEnable = true;
			//选择单元格时回调方法
			list.selectHandler = new Handler(this, onSelect);
			//渲染单元格时的回调方法
			list.renderHandler = new Handler(this, updateItem);
			//为列表赋值
			list.array = data;
			//加载到舞台
			Laya.stage.addChild(list);
		}
		
		/***渲染单元格时的回调方法***/
		private function updateItem(cell:Item, index:int):void 
		{
			//用获得的数据给图片更换皮肤
			cell.img.skin=cell.dataSource;
		}
		
		/***选择单元格回调***/
		private function onSelect(index:int):void
		{
			trace("当前选择的索引：" + index);
		}
	}
}


//单元格类，继承于Box
import laya.ui.Box;
import laya.ui.Image;

class Item extends Box
{
	/***单元格宽***/
	public static var WID:int = 375;
	/***单元格高***/
	public static var HEI:int = 85;
	/***单元格中图片***/
	public var img:Image;
	
	public function Item()
	{
		//设置大小宽高
		size(WID, HEI);
		//实例化图片
		img = new Image();
		//加载到单元格中
		addChild(img);
	}
}

```


