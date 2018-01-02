# Display and toggle pictures

> Picture are the elementrary display for game development, this article will introduce Sprite.loadImage and Graphics.drawTexture class, two ways to display pictures.

## 1 . Display and switch pictures with loadImage method

### 1.1 loadImage API overview

In API documentation can find laya.display.Sprite, you can find loadImage() method, as shown in Figure 1. Let's familiarize with the parameters.

![图1](img/1.png) <br /> (Picture 1)

### 1.2 LoadImage to load an example of displaying a picture

Create a Main.js entry class and set it as the default application. Write the code as follows:

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

In the sample code, "100,50" is the display coordinate information of the picture. The example code runs as shown in figure 2-1:

![图2-1](img/2-1.png) <br /> (picture2-1)

### 1.3 Example of switching pictures with loadImage

  Switching pictures is based on displaying pictures, adding empty drawing, and then drawing new picture resources through code logic. Specific code can refer to the code notes and API for further more description. here is an implementation example :

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

Run the code as shown in Figure 2-2:

![动图2-2](img/2-2.gif) <br /> (picture 2-2)







## 2. Use drawTexture method to display and switch pictures

### 2.1  drawTexture API overview

In the API documentation about laya.display.Graphics, you can find the drawTexture () method, in addition, also need to understand the load (laya.net.LoaderManager) method, getRes (create) method, and laya.utils.Handler () method, the parameters of the method Figure 3, Figure 4, Figure 5, Figure 6 shows:

![图3](img/3.png) <br /> (picture 3)

![图4](img/4.png) <br /> (picture 4)

![图2](img/5.png) <br /> (picture 5)

![图2](img/6.png) <br /> (picture 6)



### 2.2 use drawTexture to load an example of a display picture

​     LoadImage () method can instantly load external image resources, you can also read picture resources from the buffer (drawTexture) method, you must first load the data, and then add to the stage to draw. In the example code to load（`Laya.loader.load()`）and callback (`Handler.create()`) method. Please see the code in the comments section and related API instructions.

Create a Main.js entry class and set it as the default application. Write the code as follows:

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

The code runs as shown in Figure 7-1

![图7-1](img/7-1.png) <br /> (picture 7-1)





### 2.3 Example of switching a picture with a drawTexture

 Switching pictures is based on displaying pictures, adding empty drawing, and then drawing new picture resources through code logic. Specific code description, you can refer to the code notes and API, combined with examples of running experience.

Here we modify the code in the Main.js entry class as follows:

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

The code runs as shown in Figure 7-2.


![动图7-2](img/7-2.gif) <br /> (picture 7-2)





