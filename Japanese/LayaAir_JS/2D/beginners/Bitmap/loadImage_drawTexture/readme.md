#画像の表示と切り替え

>画像の表示はゲーム開発の基礎であり、本編ではAPIから例に至るまで、それぞれSprite.loadImageとGraphics.drawTextureの2種類の画像を表示する方法を紹介します。

##1、loadImage方法で画像を表示し、切り替えする

###1.1 loadImage APIの概要

APIドキュメントでlaya.display.Spriteを検索すると、図1に示すように、loadImage（）の方法が見つけられます。まず、この方法のパラメータを熟知してみます。

![图1](img/1.png) <br /> (图1)



###1.2 loadImageで表示画像をロードする例

Main.jsエントリクラスを作成し、コードを作成します。


```javascript

//初始化舞台
Laya.init(1334, 750);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
var img = new Laya.Sprite();
//加载显示图片，坐标位于100,50
img.loadImage("res/img/monkey1.png",100,50);
//添加到舞台
Laya.stage.addChild(img);
```


サンプルコードには、「`100,50`」は、画像の表示座標情報です。コードの実行例の効果は図2-1に示す通りです。

![图2-1](img/2-1.png)<br/>(図2-1)

###1.3 loadImageで画像を切り替える例

画像の切り替えは、表示画像の上に空の描画を追加し、コードロジックを介して新たな画像リソースを取得して再描画します。具体的なコード説明は、コード注釈およびAPIを参照して、インスタンスに関連して体験を実行することができる。

下記のようにMain.jsクラスでコードを修正します。


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey1 = "res/img/monkey1.png";
this.monkey2 = "res/img/monkey2.png";
//切换状态
this.flag = false;

//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
this.img = new Laya.Sprite();
//显示绘制的图片
switchImg();
//侦听switchImg中图片区域的点击事件，触发后执行switchImg切换图片
this.img.on(Laya.Event.CLICK,this,switchImg);
//添加到舞台
Laya.stage.addChild(img);

function switchImg(){
    //清空图片
    this.img.graphics.clear();
    //获得要切换的图片资源路径
    var imgUrl = (this.flag = !this.flag)? this.monkey1:this.monkey2;
    //加载显示图片，坐标位于100,50
    this.img.loadImage(imgUrl, 100, 50);
}
```


動作コードの効果は、図2-2に示すように、

![动图2-2](img/2-2.gif)<br/>(図2-2)







##2、DRawTexture方法で画像を表示し、切替する

###2.1 drawTexture APIの概要

APIドキュメントでlaya.display.Graphicsを検索すると、drawTexture（）方法が見つかるほか、laya.net.Loader Managerのロード（）方法とgetsRes（）方法、laya.utils.Handlerのcreate（方法）、各方法のパラメータ図3、図5、図6

![图3](img/3.png)<br/>(図3)

![图4](img/4.png)<br/>(図4)

![图2](img/5.png)<br/>(図5)

![图2](img/6.png)<br/>(図6)



###2.2 DRawTextureで表示画像をロードする例

loadImage（）方法は外部画像リソースを即時にロードしてもいいし、バッファから画像リソースを読み取ることもできます。drawTexture（）方法はまず画像をロードしてから舞台に追加する必要があります。したがって、コード例ではロードに使用する必要があります。`Laya.loader.load()`）とコールバック（`Handler.create()`）の方法は、以下の簡単な例示的なコードを通して画像をロードして表示します。コードの説明はコードの注釈部分と関連APIの説明を見てください。

Main.jsクラスを作成し、コードを作成します。


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey2 = "res/img/monkey2.png";

//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//先加载图片资源，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
Laya.loader.load(this.monkey2,Laya.Handler.create(this,graphicsImg));
function graphicsImg(){
    var img = new Laya.Sprite();
    //获取图片资源，绘制到画布
    img.graphics.drawTexture(Laya.loader.getRes(this.monkey2),100,50);
    //添加到舞台
    Laya.stage.addChild(img);
}
```


コード運転効果を図7-1に示します。

![图7-1](img/7-1.png) <br /> (图7-1)











###2.3 drawTextureで画像を切り替える例

画像の切り替えは、表示画像の上に空の描画を追加し、コードロジックを介して新たな画像リソースを取得して再描画します。具体的なコード説明は、コード注釈およびAPIを参照して、インスタンスに関連して体験を実行することができる。

下記のようにMain.jsクラスでコードを修正します。


```javascript

//初始化舞台
Laya.init(1334, 750);

//需要切换的图片资源路径
this.monkey1 = "res/img/monkey1.png";
this.monkey2 = "res/img/monkey2.png";
//切换状态
this.flag = false;
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//加载多张图片，在图片资源加载成功后，通过回调方法绘制图片并添加到舞台
Laya.loader.load([this.monkey1,this.monkey2],Laya.Handler.create(this,graphicsImg));
function graphicsImg(){
    //创建一个实例
    this.img = new Laya.Sprite();
    //添加到舞台
    Laya.stage.addChild(this.img);
    //显示初始化绘制的图片
    switchImg();
    //侦听switchImg中图片区域的点击事件，触发后执行switchImg切换纹理绘制
    this.img.on(Laya.Event.CLICK,this,switchImg);			

    //设置图片坐标s
    this.img.pos(100,50);
}
function switchImg(){
    //清空绘制
    this.img.graphics.clear();
    //获得要切换的图片资源路径
    var imgUrl = (this.flag = !this.flag)? this.monkey2:this.monkey1;
    //获取图片资源
    var texture = Laya.loader.getRes(imgUrl);
    //绘制纹理
    this.img.graphics.drawTexture(texture);                        
    //设置纹理宽高
    this.img.size(texture.width, texture.height);   
}
```


コード運転効果を図7-2に示します。

![动图7-2](img/7-2.gif)<br/>(図7-2)





