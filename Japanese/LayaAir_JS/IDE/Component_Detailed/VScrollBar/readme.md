#Vcroll Barコンポーネント参考



##一、LayaAirIDEでVcrollBarコンポーネントを作成する

###1.1 Vcroll Barを作成する

VcrollBarコンポーネントは、垂直方向のスクロールバーコンポーネントです。
データが多すぎて表示領域が収容できない場合、最終的にユーザはVcrollBarコンポーネントを使って表示されたデータ部分を制御することができる。
スクロールバーは4つの部分から構成されています。一つのレール図と一つのスライダボタンと二つの矢印ボタンです。
リソースパネルのVcrollBarコンポーネントをクリックして、ページの編集エリアにドラッグします。VcrollBarコンポーネントをページに追加できます。
VcrollBarコンポーネントのスクリプトインターフェースを参照してください。[VScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.VScrollBar)。
VcrollBarコンポーネントの画像リソース例：

​![图片0.png](img/1.png)<br/>
（図1）

​![图片0.png](img/2.png)<br/>
（図2）
​![图片0.png](img/3.png)<br/>
（図3）

​![图片0.png](img/4.png)<br/>
（図4）

VcrollBarをエディタエリアにドラッグした後、効果を表示します。

​![图片0.png](img/5.png)<br/>
（図5）

VcrollBarの属性maxの値を10とし、属性minの値を0とし、属性valueの値を3とした後、次のように表示されます。

​![图片0.png](img/6.png)<br/>
（図6）

プログラムを実行すると、スライダをドラッグしたり、矢印ボタンを押してプログレスバーの値を制御できます。

​![图片0.gif](gif/1.gif)<br/>
（図7）

Vcroll BarのプロパティshowButotonsの値がfalseの場合の表示効果を設定します。

​![图片0.png](img/7.png)<br/>
（図8）

プログラムを実行する時の効果:

​![图片0.png](gif/1.gif)<br/>
（図9）

###1.2 VcrollBarコンポーネントの一般的な属性

​![图片0.png](img/8.png)<br/>
（図10）

𞓜**属性**𞓜**機能説明**𞓜
|-------------------------------------------------|
|skin 124;スクロールバーの画像リソースアドレス。𞓜
|sizeGrid|動バーの軌道図資源の有効スケーリンググリッドデータ（九宮格データ）。𞓜
|value 124;は現在のスクロール位置の数字を表します。𞓜
|min124;は最低スクロール位置の数字を表します。𞓜
|max 124;は最高スクロール位置の数字を表します。𞓜
|scrollSize 124;は、スクロールバーの軌道を押した時のページのスクロールの増分を表します。𞓜
|mouseWheelEnable 124;は、ホイールがスクロールするかどうかを指定し、デフォルトはtrueです。𞓜
タッチをオンするかどうかを指定します。デフォルトはtrueです。𞓜
オートスクロールバーを隠すかどうかを指定します。標準値はfalseです。𞓜
|show Button 124;ブール値は、上向き、下向きのボタンを表示するかどうかを指定し、デフォルトはtrueです。𞓜



 

 



##二、コードによるVcrollBarコンポーネントの作成

コードを書く時は、コード制御UIを通して作成することが避けられません。`UI_ScrollBar`クラスは、VcrollBarに関する属性をコードで設定します。

**実行例の効果:**
​![5](gif/3.gif)<br/>
（図11）コードによるVcrollBarの作成

VcrollBarの他の属性もコードによって設定できます。下記のコード例はコードによって作成されたVcrollBarを実演しました。興味のある読者は自分でコードによってVcrollBarを設定できます。自分の必要に合うスクロールバーを作成します。

**サンプルコード:**


```javascript

var Stage = Laya.Stage;
var Text = Laya.Text;
var HScrollBar = Laya.HScrollBar;
var ScrollBar = Laya.ScrollBar;
var VScrollBar = Laya.VScrollBar;
var Handler = Laya.Handler;
var WebGL = Laya.WebGL;

/***垂直滚动条资源**/
this.skins = ["res/ui/vscroll.png",
    "res/ui/vscroll$bar.png",
    "res/ui/vscroll$down.png",
    "res/ui/vscroll$up.png"];

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
Laya.loader.load(this.skins, Handler.create(this, onSkinLoadComplete));
/***加载资源完成***/
function onSkinLoadComplete(e) {
    //创建垂直滚动条
    createVScroller();
}
/***创建水平滚动条***/
function createVScroller() {
    //实例化垂直滚动条
    this.vScrollBar = new VScrollBar();
    //加载皮肤资源（其他资源根据规范命名后，会自动加载）
    this.vScrollBar.skin = "res/ui/vscroll.png";
    //设置宽度
    this.vScrollBar.width = 400;
    //设置位置
    this.vScrollBar.pos(150, 170);
    //最低滚动位置数字
    this.vScrollBar.min = 0;
    //最高滚动位置数字
    this.vScrollBar.max = 100;
    //滚动变化事件回调
    this.vScrollBar.changeHandler = new Handler(this, onChange);
    //加载到舞台
    Laya.stage.addChild(this.vScrollBar);
    //创建提示信息
    createPromptText(this.vScrollBar)
}
/***创建提示信息***/
function createPromptText(scrollBar) {
    //实例化提示信息
    this.promptText = new Text();
    //提示框字体
    this.promptText.font = "黑体";
    //提示框字体大小
    this.promptText.fontSize = 26;
    //提示框字体颜色
    this.promptText.color = "#FFFFFF";
    //提示框初始文本
    this.promptText.text = "您的选择是： ";
    //加载到舞台
    Laya.stage.addChild(this.promptText);
    //设置提示框位置
    this.promptText.pos(scrollBar.x, scrollBar.y - 50);
}
/***滚动条位置变化回调***/
function onChange(value) {
    this.promptText.text = "滚动条的位置： value=" + value;
}
```


