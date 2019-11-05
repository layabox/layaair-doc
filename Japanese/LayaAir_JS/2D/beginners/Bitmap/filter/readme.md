# 设置滤镜效果

>LayaAirエンジンは、カラーフィルタ、発光（または影）フィルタ、ぼかしフィルタの3つの効果を提供します。カラーフィルタは、CanvasとWebGLモードをサポートしていますが、発光フィルタとボケフィルタは、性能の消耗が大きいため、WebGLモードのみに対応しています。



##1、カラーフィルタの設定

###1.1色フィルタAPIの概要

カラーフィルタ類のColorFilterはlaya.filtersパッケージにあり、指定行列（*4 x 5に配列されたマトリックス*）により各カラーチャンネルを変更します。

クリック[laya.filters.ColorFilter ](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.ColorFilter)APIの説明を見る。



###1.2カラーフィルタの設定

ビットマップにカラーフィルタを設定するには、まずカラー行列を設定し、次にコードで示すように、ColorFilter方法でカラーフィルタの例を作成します。


```java

//颜色矩阵，红色
var colorMatrix = 
  [
  1, 0, 0, 0, 0, //R
  0, 0, 0, 0, 0, //G
  0, 0, 0, 0, 0, //B
  0, 0, 0, 1, 0, //A
];

//创建颜色滤镜
var redFilter = new Laya.ColorFilter(colorMatrix)
```


最後にSpriterのfilters属性によってカラーフィルタ効果を所定の位置に重ね合わせます。下記のようにMain.jsクラスを作成します。コードを作成します。


```javascript

//初始化舞台
Laya.init(1334, 750,Laya.WebGL);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//原始位图
createImg(100,50);
//红色滤镜
creteRedFilter();
//灰色滤镜
createGrayFilter();

/**创建位图**/
function createImg(w,h){
    var Img = new Laya.Sprite(); 
			 
    //添加到舞台
    Laya.stage.addChild(Img);   
    
    //加载显示图片
    Img.loadImage("res/img/monkey1.png",w,h);  
    
    return Img;
}
/**创建红色滤镜位图**/
function creteRedFilter(){
    //颜色滤镜矩阵,红色
    var colorMatrix = 
        [
            1, 0, 0, 0, 0, //R
            0, 0, 0, 0, 0, //G
            0, 0, 0, 0, 0, //B
            0, 0, 0, 1, 0, //A
        ];
    
    //创建红色颜色滤镜
    var redFilter = new Laya.ColorFilter(colorMatrix);
        
    //在坐标280,50位置创建一个位图
    var img = createImg(280,50); 
    //添加红色颜色滤镜效果
    img.filters = [redFilter];
}
/**创建灰色滤镜位图**/
function createGrayFilter(){
    //颜色滤镜矩阵,灰色
    var colorMatrix = 
        [
            0.3086, 0.6094, 0.0820, 0, 0,  //R
            0.3086, 0.6094, 0.0820, 0, 0, //G
            0.3086, 0.6094, 0.0820, 0, 0,  //B
            0, 0, 0, 1, 0, //A
        ];
    //创建灰色颜色滤镜
    var GrayFilter = new Laya.ColorFilter(colorMatrix);
    
    //在坐标460,50位置创建一个位图
    var img = createImg(460,50); 	
    //添加灰色颜色滤镜效果
    img.filters = [GrayFilter];
}
```


上のコードでは、元のビットマップ、赤フィルタ効果のビットマップ、灰色フィルタ効果のビットマップを作成しました。運転効果は図1に示します。

![图1](img/1.png)<br/>(図1)





##2、発光と影フィルタの設定

###2.1発光フィルタAPIについて簡単に説明する。

発光フィルタ類GlowFilterはlaya.filtersパッケージにあり、発光のオフセット角度をシャドウフィルタとしても使用でき、パラメータ説明は図2に示すようになっている。注意：このフィルターはWebGLモードでのみ有効です。

![图2](img/2.png)<br/>(図2)

クリック[laya.filters. GlowFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.GlowFilter)APIの説明を見る。



###2.2発光フィルタと影フィルタの設定

発光と影フィルタの設定は比較的簡単で、符号化によって直接的に効果の例を確認します。

まずMain.jsクラスを作成します。コードは以下の通りです。


```javascript

//初始化舞台
Laya.init(1334,750,Laya.WebGL);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//原始位图
createImg(100,50);
//发光滤镜
createGlowFilter();
//阴影滤镜
createShadeFilter();

/**创建位图**/
function createImg(w,h){
    var Img = new Laya.Sprite();
    //添加到舞台
    Laya.stage.addChild(Img);
    //加载显示图片，坐标位于100,50
    Img.loadImage("res/img/monkey1.png",w,h);
    return Img;
}
/**创建发光滤镜位图**/
function createGlowFilter(){
    //创建发光滤镜位图
    var glowFilter = new Laya.GlowFilter("#ff0000",15,0,0);
    //在坐标280,50创建位图
    var img = createImg(280,50);
    //添加发光滤镜
    img.filters = [glowFilter];
}
/**创建阴影滤镜位图**/
function createShadeFilter(){
    //创建阴影滤镜
    var glowFilter = new Laya.GlowFilter("#000000",8,8,8);
    //在坐标460,50创建位图
    var img = createImg(460,50);
    //添加阴影滤镜
    img.filters = [glowFilter];
}
```


上のコードでは元のビットマップ、発光フィルタ効果のビットマップ、影フィルタ効果のビットマップを作成しました。運転効果は図3に示す通りです。

![图3](img/3.png) <br /> (图3)







##3、ぼかしフィルタの設定

###3.1あいまいフィルタAPIの簡単な説明

ぼかしフィルタ類BlurFilterはlaya.filtersパッケージにあり、streengthパラメータを調整することによってぼかしフィルタの強度を設定し、値が大きいほど、ペーストフィルタをかけます。パラメータ説明は図4に示されています。注意：このフィルターはWebGLモードでのみ有効です。

![图4](img/4.png) <br /> (图4)


クリック[laya.filters. BlurFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.BlurFilter)APIの説明を見る。



###3.2ぼかしフィルタの設定

ぼかしフィルタの設定は簡単で、ぼかしフィルタの例を作成し、ぼかし強度を設定してビットマップに重畳すればいいです。私たちは直接に符号化によって効果の例を確認します。

まずMain.jsクラスを作成します。コードは以下の通りです。


```javascript

//初始化舞台
Laya.init(1334,750,Laya.WebGL);
//设置舞台背景色
Laya.stage.bgColor = "#ffffff";
//原始位图
createImg(100,50);
//模糊滤镜
createBlurFilter();


/**创建位图**/
function createImg(w,h){
    var Img = new Laya.Sprite();
    //添加到舞台
    Laya.stage.addChild(Img);
    //加载显示图片，坐标位于100,50
    Img.loadImage("res/img/monkey1.png",w,h);
    return Img;
}
/**创建糊滤滤镜位图**/
function createBlurFilter(){
    //创建模糊滤镜实例
    var blurFilter = new Laya.BlurFilter();
    //设置模糊强度
    blurFilter.strength = 5;
    //在坐标280,50创建位图
    var img = createImg(280,50);
    //添加滤镜效果
    img.filters = [blurFilter];
}
```


上のコードの中で、オリジナルのビットマップとボケフィルタ効果のビットマップを作成しました。運転効果は図5に示す通りです。

![图5](img/5.png) <br /> (图5)







