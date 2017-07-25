# 快速开始一个3D项目

以下我们将用LayaAir引擎快速开始一个3D项目，并且以TS语言为教程，简单演示用引擎代码实现一个基本的3D应用。

### IDE创建3D示例项目

下载LayaAirIDE，启动新建项目选择3D项目。如下图所示：

![1](img/1.png)</br>(图1)

这里我们选择JavaScript语言。创建完成之后我们发现IDE为我们创建好了一个3D的模板。关于项目的结构介绍开发者可以参考2D的新手教程。这里不再赘述。

然后按快捷键F5或者点击运行按钮，我们可以看到调试窗口显示出了一个方体。如下图所示：

![2](img/2.png)</br>(图2)

LayaAir3D.ts这个启动类为我们构建出了一个3D的世界。并且添加了一个简单的3D世界所必须的几个要素（场景、摄像机、光源、3D模型、材质）。关于这些概念支持后续教程我们会详细的介绍，逐步带领大家学习3D知识。

对于这个简单点的Demo，我们发现这个方体是静态的，不能给我们带来3D那种所见即所得的立体视觉感，那么我们添加简单的几行代码让它转动起来。首先找到启动类LayaAir3D.ts，修改成如下代码：

```typescript
// 程序入口
class LayaAir3D {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0, true);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.specularColor = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.diffuseColor = new  Laya.Vector3(1.6, 1.6, 1.6);
        directionLight.direction = new Laya.Vector3(1, -1, 0);

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.StandardMaterial = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        box.meshRender.material = material;

        //这里我们添加转动的逻辑-------------------------------
        //旋转方向与角度设置
        var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
        //每10毫秒旋转一次
        Laya.timer.loop(10,null,function(){
            box.transform.rotate(vect,true,false);
        });
    }
}
new LayaAir3D();
```

![3](img/3.gif)</br>(动图3)

这里我们用了一个计时器，每10ms驱动这个方体转动一下，具体的讲解请开发者阅读相关的教程和API，这里我们只是简单的演示，简单的代码如下所示：

```typescript
var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
//每10毫秒旋转一次
Laya.timer.loop(10,null,function(){
  box.transform.rotate(vect,true,false);
});
```

到此我们已经能够跑通一个简单的例子了，并且驱动这个方体进行旋转（动图3）。



### LayaAir3D世界的基本构成

通过上面的代码示例我们可以看到一个基本的3D世界诞生了。当然，上面的代码还比较简单，要做出丰富多彩的游戏世界，我们还需要了解引擎更多的功能。

图4位LayaAir3D世界可见要素视图。除了3D场景、摄像机、灯光和模型外，动画也是可显示要素之一。后期课程我们将逐步向大家介绍。

![4](img/4.png)</br>(图4)



### 3D世界变换与向量的简单运用

在以上示例中，创建了有关显示的几大要素模块，但我们还看见在摄像机、灯光、模型上运用到了向量Vector3或Vector4等，用它们去为对象的位置、方向、色彩等赋值。

#### 坐标系及位置、旋转修改

在2D引擎中我们是直接调整x、y坐标来控制显示对象的位置与旋转方向，3D引擎中显示对象较为复杂，加入了z轴坐标，因此我们用到了Vector3三维向量，用它的值分别代表着x、y、z。

但是，各种3D引擎和3D模型动画制作软件对坐标方向的定义会有所不同，因此需初学者们掌握它们的区别。

LayaAit3D引擎坐标用专业术语来说属于`右手坐标系`（图5），简单的来说，屏幕右侧为正X轴方向，上方为正Y轴方向，屏幕向观察者方向为正Z轴方向（屏幕后方向为负Z轴方向）。有的3D引擎属于左手坐标系，在此不做介绍，有兴趣的初学者可以百度了解。

![5](img/5.png)</br>(图5)右手系坐标

引擎中也分为世界坐标与局部坐标系，世界坐标系是3D场景的坐标，三轴方向永远不变（图5）。局部坐标为模型本身坐标，可以随着模型方向的旋转变化而改变，但我们可以通过右手坐标系手势去识别坐标方向（图6），下图中手的模型为沿Y轴旋转-90度后的3D模型右手坐标系局部坐标，大拇指永远为局部坐标的正X轴方向。

![6](img/6.png)</br>(图6)

了解了上述坐标系，那么就可以通过3D变换来改变它们了，在示例代码中，transform是一个3D变换对象（Transform3D），它在3D世界中非常重要，有关显示对象很多变化逻辑控制的代码都会用到它。

代码中我们用到了3D变换中的translate移动及rotate旋转方法，并用三维向量代表x、y、z的值。同事，两种方法都可以在参数中设置是否是局部空间移动、旋转，初学者们可以在程序中设置，观察移动旋转有什么不同。

```typescript
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 3, 3));
//旋转摄像机方向（角度）
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```

![7](img/7.png)</br>(图7)

以上为Transform3D的API中移动、旋转方法描述。当然，变换对象还有很多属性与方法，我们在以后示例中逐步讲解。

#### 向量的使用

向量在LayaAir3D引擎中使用非常频繁，从二维向量到四维向量导出都会看到他们的身影。最基础的用法就是本示例中用于赋值使用。

代码中3D对象的移动、旋转、缩放等变换用三维向量作为了它的x、y、z轴向坐标赋值。

那么在灯光的各种颜色属性赋值长，三维向量中的值又分别代表了R、G、B三种颜色，分别为红、绿、蓝，LayaAir3D引擎中，三个颜色的最大值为1，是按百分比的方式设置的。整体值越大，颜色越亮，越小颜色越暗，如果值超过1将会产生曝光效果。

至于红、绿、蓝能组合成什么样的颜色，初学者们可以向游戏美术设计师们咨询学习，比如红加绿为黄、红加蓝为紫等等。一般在项目开发过程中，程序员需要反复调整颜色值去实验好的效果。

示例中一下代码运用了向量作为颜色赋值：

```javascript
//灯光的环境色
directionLight.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
//灯光的高光色
directionLight.specularColor = new Laya.Vector3(0.6, 0.6, 0.6);
//灯光的漫反射颜色
directionLight.diffuseColor = new Laya.Vector3(1.6, 1.6, 1.6);
```

在项目中，还有许多比较复杂的用法，需要运用向量做一些数学运算，本课程作为入门课程，在此暂时不多做介绍。