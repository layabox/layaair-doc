#Application of Atlas Animation

###1. Overview of Atlas Animation

In game development, the use of animation is ubiquitous. LayaAir engine provides a powerful animation class, which can use a variety of animation resources to generate game animation.

We can use LayaAir IDE to create timeline animations to generate suffixes called“`.ani`” Animation resources can also be packaged in an atlas to create a suffix named“`.atlas`” Atlas resources are then assigned to the animation class to load and use.

This article will introduce the way of making Atlas animation. As shown in Figure 1, the common operation of atlas animation is realized in the example.

![动图1.gif](img/1.gif)<br/> (Fig. 1)



###2. Playing Atlas Animation

####2.1 Atlas Resource Preparation

Animation atlas resources need to pay attention to some situations, such as role animation because of the number of frames, generally a set of role maps a resource, naming according to the action name plus frame number (Figure 2).

![图片2.png](img/2.png)<br/>（图2）


**Tips**:

##-The atlas packaging tool in IDE will package each catalog into a atlas. For details, please refer to the document "Atlas production and use details"Special effects animation can be combined into an atlas resource (placed in a directory) because of the small number of special effects per frame.

After packaging through IDE, three files are generated, namely ". atlas", "json", "png" (Figure 3). Animation obtains image resources by loading'.atlas'or'.json' files. It is recommended to use the ".atlas" file (* you do not need to add type setting code *).

![图片3.png](img/3.png)<br/> (Figure 3)



####2.2 Loading Animation Atlas Resources

adopt`laya.display.Animation`Class`loadAtlas()`Method loads the character's cartoon resources. The basic description of this method is shown in Figure 4.

![图4](img/4.png)<br/> (Figure 4)

#####Sample code:

Create the entry class AtlasAniDemo. ts and write the following code:


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


Run the code, as shown in Figure 5. The animation has been loaded onto the stage and is not played by default.

![图5](img/5.png) 


(Fig. 5)

####2.3 Play Atlas Animation

After loadAtlas () method is used to load the set animation, the play () method is needed to play it. The API parameters of the play () method are illustrated in Figure 6.

![图片6.png](img/6.png)<br/>（图6）


We continue with the previous example by adding play () to the onLoaded method.

The code in the onLoaded method is as follows


```typescript

 private onLoaded():void{
   //添加到舞台
   Laya.stage.addChild(this.roleAni);
   //播放动画
   this.roleAni.play();
 }
```


Run the complete code as shown in Figure 7

![动图7](img/7.gif) 


(Fig. 7)

####2.4 Create animation templates with createFrames to play the animations specified in the atlas.

If the atlas is a separate sequence frame animation, play () can be played directly. However, to package multiple animations into one atlas, if you want to play the specified animation, you need to create an animation template. The method of animation template is`Animation.createFrames()`As shown in Figure 8.

![图片8](img/8.png)<br/>（图8）



#####The Role of Creating Animation Templates

Let's look back.`play()`The third parameter of the method`name`。 When we create a group of animation resources in the atlas as animation templates and give them names,`play()`The name parameter of the method can use the name of the animation template, and then specify the name of the animation template to play the specified animation.

Now let's continue with the previous example by creating animation templates to achieve the Vertigo effect of playing only the atlas.

The code is as follows:


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


The effect of the code is shown in Figure 9. Only the action of setting the animation template in the atlas is played.

![动图9](img/9.gif) 


(Fig. 9)

Tips: Although each set of actions is packaged separately into an atlas, they can also be played directly. However, for less action animation resources to make a separate atlas, it will increase the load of resources and increase the consumption of game performance. So it is recommended to pack a small number of animations into a single atlas and then call them separately.



####2.5 Play animations specified in the atlas directly with loadImages

In addition to using static methods`createFrames()`In addition to creating animation templates, loadImages () can also be used to achieve vertigo animation effects specified in the playback atlas. Let's take a look first.`loadImages()`Method parameters are described as shown in Figure 10.

![图10](img/10.png) 


(FIG. 10)

Because loadImages () creates an animation template, URLs receive a collection of image addresses, so we need to load the atlas file first using Laya. loader. load (). Let's look directly at the sample code and comments.


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


The code runs as shown in Figure 11.

![动图11](img/11.gif) 


(FIG. 11)

**Tips**:

##- The loadImage method can also create animation templates, such as rewriting the load and play above to`roleAni.loadImages(aniUrls("move",6),"walk").play();`The value of the second parameter "walk" is the name of the animation template (* key*).When used many times, using animation templates can save CPU overhead, but if used only occasionally or once, do not use animation templates, because saving CPU overhead is at the expense of a certain amount of memory overhead.



###3. Other Descriptions

####3.1 API

This article introduces the common API of Atlas Animation, and you can see the API documentation about other animation attributes:

Animation playback base class:

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.AnimationPlayerBase)

Animation class:

[https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Animation)



####3.2 IDE Making Atlas Animation

With regard to atlas animation, you can use the Animation component directly when designing UI in IDE. In this way, the visual part will be more intuitive. About the IDE production part of the Atlas Animation, you can see`Animation组件属性详解`as well as`用LayaAirIDE制作图集动画`These two documents.