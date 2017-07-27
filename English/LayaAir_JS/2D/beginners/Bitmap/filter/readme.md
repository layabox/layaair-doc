# 设置滤镜效果

> LayaAir引擎提供了颜色滤镜、发光（或阴影）滤镜、模糊滤镜三种效果。其中颜色滤镜支持Canvas与WebGL模式，而发光滤镜与模糊滤镜由于对性能的消耗较大，因此仅支持WebGL模式。



## 1、设置颜色滤镜

### 1.1 颜色滤镜 API 简述

颜色滤镜类 ColorFilter位于laya.filters包中，通过指定矩阵（*排列成4 x 5 的矩阵*）改变各颜色通道。

点击   [laya.filters.ColorFilter ](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.ColorFilter) 查看API说明。



### 1.2 设置颜色滤镜

如果要给一个位图设置颜色滤镜，需要先设置一个颜色矩阵，然后用ColorFilter方法创建一个颜色滤镜实例，如下面的代码所示：

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

最后通过Spriter的filters属性将颜色滤镜效果叠加到位图中。下面我们创建一个Main.js类，编写代码如下：

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

在上面的代码中，我们创建了一个原始位图、一个红色滤镜效果位图、一个灰色滤镜效果位图。运行效果如图1所示：

![图1](img/1.png) <br /> (图1)





## 2、设置发光与阴影滤镜

### 2.1 发光滤镜 API 简述

发光滤镜类 GlowFilter位于laya.filters包中，通过调整发光的偏移角度也可以当成阴影滤使用，参数说明如图2所示。注意：该滤镜只支持WebGL模式下有效。

![图2](img/2.png) <br /> (图2)

点击   [laya.filters. GlowFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.GlowFilter)  查看API说明。



### 2.2 设置发光滤镜与阴影滤镜

发光与阴影滤镜的设置比较简单，我们直接通过编码查看示例效果，

先创建一个Main.js类，编写代码如下：

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

在上面的代码中，我们创建了一个原始位图、一个发光滤镜效果位图、一个阴影滤镜效果位图。运行效果如图3所示：

![图3](img/3.png) <br /> (图3)



## 3、设置模糊滤镜

### 3.1 模糊滤镜 API 简述

模糊滤镜类 BlurFilter位于laya.filters包中，通过调整strength参数设置模糊滤镜的强度，值越大，越糊滤。参数说明如图4所示。注意：该滤镜只支持WebGL模式下有效。

![图4](img/4.png) <br /> (图4)

点击   [laya.filters. BlurFilter](http://layaair.ldc.layabox.com/api/index.html?category=Filter&class=laya.filters.BlurFilter)  查看API说明。



### 3.2 设置模糊滤镜

模糊滤镜的设置比较简单，创建一个模糊滤镜实例，然后设置模糊强度，叠加给位图即可，我们直接通过编码查看示例效果。

先创建一个Main.js类，编写代码如下：

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

在上面的代码中，我们创建了一个原始位图、一个模糊滤镜效果位图。运行效果如图5所示：

![图5](img/5.png) <br /> (图5)



