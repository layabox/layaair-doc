# 图集动画运用

### 1. 图集动画概述

游戏开发中，动画的运用基本无处不在，LayaAir引擎提供了功能强大的的Animation动画类，它可以使用多种动画资源生成游戏动画。

我们可以用LayaAir IDE创建时间轴动画的方式生成后缀名为“`.ani`”的动画资源，也可以用图集打包动画帧图片的方式，创建后缀名为“`.atlas`”的图集资源，然后赋给动画类去加载使用。

本篇将对图集动画的制作方式进行介绍，如图1所示，示例中实现了图集动画中常用的操作。

![动图1.gif](img/1.gif)<br/>（图1）



### 2.播放图集动画

#### 2.1 图集资源准备

动画图集资源需注意一些情况，像角色类动画因为帧数较多，一般是一套角色图一个资源，在命名上根据动作名称加帧序号命名（图2）。

![图片2.png](img/2.png)<br/>（图2）

**Tips**：

- IDE中的图集打包工具，会将每一个目录打包为一个图集，详情参考文档《图集制作与使用详解》
- 特效类动画因为每个特效帧数量不多可以多个特效组合成一张图集资源(放在一个目录内)。

通过IDE打包后，会生成3个文件，分别为“.atlas”、“.json”、".png"文件（图3）。动画类Animation通过加载“.atlas”或“.json”文件获得图像资源。建议使用“.atlas”文件（*使用时不需要加入类型设置代码*）。

![图片3.png](img/3.png)<br/>（图3）



#### 2.2 加载动画图集资源

通过`laya.display.Animation`类的`loadAtlas()`方法加载角色的图集动画资源，该方法的基础说明如图4所示。

![图4](img/4.png)<br/>（图4）

##### 示例代码：

创建入口类AtlasAniDemo.ts，并编写代码如下：

```typescript
// 程序入口
class AtlasAniDemo{
    private roleAni:Laya.Animation;
    constructor()
    {
        //初始化舞台
        Laya.init(1334,750,Laya.WebGL);
        //创建动画实例
        this.roleAni = new Laya.Animation();
        //加载动画图集，加载成功后执行回调方法
        this.roleAni.loadAtlas("res/atlas/role.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //添加到舞台
        Laya.stage.addChild(this.roleAni);
    }
}
new AtlasAniDemo();
```

运行代码，如图5所示。动画已加载到舞台上，默认是未播放状态的。

![图5](img/5.png) 

(图5)

#### 2.3 播放图集动画

图集动画使用loadAtlas()方法加载后，需要使用play()方法才可以播放。play()方法的API参数说明如图6所示。

![图片6.png](img/6.png)<br/>（图6）

我们继续沿用之前的示例，在onLoaded方法中添加play()。

onLoaded方法中的代码如下所示

```typescript
 private onLoaded():void{
   //添加到舞台
   Laya.stage.addChild(this.roleAni);
   //播放动画
   this.roleAni.play();
 }
```

运行完整的代码如动图7所示

![动图7](img/7.gif) 

(动图7)

#### 2.4 用createFrames创建动画模板来播放图集中指定的动画。

如果图集中是独立的序列帧动画，直接使用play()方法就可以播放了。但是，将多个动画打包到一个图集里，如果要播放指定的动画，那就需要通过创建动画模板来实现。动画模板的方法是`Animation.createFrames()`， 如图8所示。

![图片8](img/8.png)<br/>（图8）

##### 创建动画模板的作用

我们回顾一下`play()`方法的第三个参数`name`。当我们将图集中的某组动画资源创建为动画模版，并给予模板命名后，`play()`方法的name参数就可以使用动画模版的命名，然后通过指定动画模板的名称来实现指定动画的播放。

下面我们继续沿用之前的示例，通过创建动画模板来实现只播放图集中的眩晕效果。

代码编写如下：

```typescript
// 程序入口
class AtlasAniDemo{
    private roleAni:Laya.Animation;
    constructor()
    {
        //初始化舞台
        Laya.init(1334,750,Laya.WebGL);
        //创建动画实例
        this.roleAni = new Laya.Animation();
        //加载动画图集，加载成功后执行回调方法
        this.roleAni.loadAtlas("res/atlas/role.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //添加到舞台
        Laya.stage.addChild(this.roleAni);
        //创建动画模板dizziness
        Laya.Animation.createFrames(this.aniUrls("die",6),"dizziness");
        //循环播放动画
        this.roleAni.play(0,true,"dizziness");
    }
    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * aniName  动作的名称，用于生成url
     * length   动画最后一帧的索引值，
     */	
    private aniUrls(aniName:string,length:number):any{
        var urls:any = [];
        for(var i:number = 0;i<length;i++){
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("role/"+aniName+i+".png");
        }
        return urls;
    }
}
new AtlasAniDemo();
```

代码运行效果如动图9所示，只播放了图集中设置了动画模板的动作。

![动图9](img/9.gif) 

(动图9)

Tips：尽管把每一组动作单独打包成图集，也可以直接播放。但是对于动作较少的动画资源去单独打成图集，会增加资源加载量以及增加游戏性能的消耗。所以将帧数不多的多组动画打包到一个图集中，然后分别调用是推荐的方式。



#### 2.5 用loadImages直接播放图集中指定的动画

除了用静态方法`createFrames()`创建动画模板外，还可以用loadImages()方法来实现播放图集中指定的眩晕动画效果。我们先看一下`loadImages()`的方法参数说明，如图10所示。

![图10](img/10.png) 

(图10)

由于loadImages()创建动画模板，urls接收的是图片地址集合，所以我们需要先使用Laya.loader.load()将图集文件先加载进来。下面我们直接看示例代码及注释。

```typescript
// 程序入口
class AtlasAniDemo{
    private roleAni:Laya.Animation;
    constructor()
    {
        //初始化舞台
        Laya.init(1334,750,Laya.WebGL);
        //加载完动画的图集后执行回调方法onLoaded
        Laya.loader.load("res/atlas/role.atlas",Laya.Handler.create(this,this.onLoaded));
    }
    private onLoaded():void{
        //创建动画实例
        this.roleAni = new Laya.Animation();
        //添加到舞台
        Laya.stage.addChild(this.roleAni);
        //通过数组加载动画资源，然后用play方法直接播放。由于loadImages方法返回的是Animation对象本身，可以直接使用“loadImages(...).play(...);”语法。
        this.roleAni.loadImages(this.aniUrls("move",6)).play();
    }
    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * aniName  动作的名称，用于生成url
     * length   动画最后一帧的索引值，
     */	
    private aniUrls(aniName:string,length:number):any{
        var urls:any = [];
        for(var i:number = 0;i<length;i++){
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("role/"+aniName+i+".png");
        }
        return urls;
    }
}
new AtlasAniDemo();
```

代码运行效果如动图11所示

![动图11](img/11.gif) 

(动图11)

**Tips**：

- loadImage方法也可以创建动画模板，例如将上面加载与播放改写为`roleAni.loadImages(aniUrls("move",6),"walk").play();`，第二个参数的值“walk”就是动画模板的名称（*key*）。
- 当被多次使用的时候，使用动画模板可以节省CPU的开销，但是，如果只是偶尔或一次使用，那就不要使用动画模板，因为节省CPU开销是以牺牲一定的内存开销为代价。



### 3、其它说明

#### 3.1 API

图集动画的常用API本篇就介绍到这里，关于其它的Animation动画属性介绍可以查看API文档：

动画播放基类：

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase)

动画类：

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation)



#### 3.2 IDE制作图集动画

关于图集动画可以在IDE设计UI的时候，直接使用Animation组件去制作。这样，可视化的部分会更加直观。关于图集动画的IDE制作部分，可以查看 `Animation组件属性详解`  以及  `用LayaAirIDE制作图集动画` 这两篇文档。