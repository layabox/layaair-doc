# Save and share screenshot

In the process of project development, there is often a need for screenshots, such as the content of the screenshot on the screen, sharing, and post processing.

The drawToCanvas method is provided in the Sprite class in LayaAir for screen capture. API shown in Figure 1:

![1](img\1.png)(figure 1)

From API we can see that there are two ways of using drawToCanvas in all. One kind is **Draw the picture as a picture source and draw it to other Sprites**. Another is **to get the original image data, share online, in order to achieve the screenshot effect**. Next we will use code examples to achieve these two functions.

### 1. Draw the captured images into other Sprite

On stage, two Sprite are instantiated, one is used to display the original picture, and one is used to display the captured images; the whole code is as follows:

```typescript
// 程序入口
class GameMain {
    private sp: Laya.Sprite;
    constructor() {
        Laya.init(800, 600, Laya.WebGL);
        //实例化一个sprite，用来显示原始图片
        this.sp = new Laya.Sprite();
        this.sp.loadImage("res/a.png");
        Laya.stage.addChild(this.sp);

        //给stage添加一个点击事件，点击之后截取原始图片中的一部分
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
    }
    private onClick(): void {
        //定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
        var htmlC: Laya.HTMLCanvas = this.sp.drawToCanvas(100, 100, 0, 0);
        //获取截屏区域的texture
        var interceptT: Laya.Texture = new Laya.Texture(htmlC);
        var spDeposit: Laya.Sprite = new Laya.Sprite();
        //绘制截取的纹理
        spDeposit.graphics.drawTexture(interceptT, 0, 0, 100, 100);
        //设置显示容器的坐标
        spDeposit.x = 300;
        Laya.stage.addChild(spDeposit);
    }
}
new GameMain();
```


The running effect is shown as shown in Figure 2.

![2](img\2.gif)(figure 2)



### 2. Share screenshot data

Save the image data to the server. The whole code is as follows:

```typescript
// 程序入口
class GameMain {
    private sp: Laya.Sprite;
    constructor() {
        Laya.init(800, 600, Laya.WebGL);
        //实例化一个sprite，用来显示原始图片
        this.sp = new Laya.Sprite();
        this.sp.loadImage("res/a.png");
        Laya.stage.addChild(this.sp);

        //给stage添加一个点击事件，点击之后截取原始图片中的一部分
        Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
    }
    private onClick(): void {
        //定义一个HTMLCanvas来接收截屏返回的HTMLCanvas对象；截取原始图片中从0,0坐标开始的100*100部分图片
        var htmlC: Laya.HTMLCanvas = this.sp.drawToCanvas(100, 100, 0, 0);
        //获取原生的canvas对象
        var canvas:any = htmlC.getCanvas();
        //打印图片base64信息，可以发给服务器或者保存为图片
        console.log(canvas.toDataURL("image/png"));
    }
}
new GameMain();
```

Click the stage after we can see the output of the base64 information, as shown in Figure 3 :

![3](img\3.gif)(Picture 3)



For a screenshot under LayaNative please go to [this page](https://ldc.layabox.com/doc/?nav=en-ts-7-2-7)