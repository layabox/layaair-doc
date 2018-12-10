## LayaAir3D之场景Scene

场景即为LayaAir引擎的3D世界容器，用于呈现游戏的3D画面和加载各种3D元素，游戏中的摄像机，灯光，人物，物品等都需要放到场景中才能展示出画面，相当于一个游戏3D播放器或者3D视图。

通过Scene的继承关系我们可以看到它是继承于Sprite类。所以简单的可以把它当做2D中的显示对象来对待。

在LayaAir引擎中，3D和2D可以混合使用，创建的Scene 3D场景和Sprite 2D容器或元素可以同时加载到舞台上。

在“快速开启3D之旅”课程中，我们建立了一个基本的3D应用，并在其中加入了主要构成要素，本次课中我们将深入介绍场景的雾效功能，及unity中LayaAir导出工具生成的场景文件加载方法。

### 加载场景资源

下列代码中”LayaScene_01/loveScene.ls”文件是unity3D中layaAir导出插件选择导出”Scene“类别生成，文件的扩展名为.ls（理解成laya scene 简写）。内部存储了场景所需的光照贴图、包含的多个或单个模型文件等。用Scene3D.load()方法可以直接加载到场景中并显示出来。

```typescript
//初始化引擎
Laya3D.init(0, 0, true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();
//加载插件导出的场景。
Laya.Scene3D.load("LayaScene_01/loveScene.ls",Laya.Handler.create(null,function(scene){
    Laya.stage.addChild(scene);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(0, 5, 23);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-17, 0, 0), true, false);
    //设置摄像机视野范围（角度）
    camera.fieldOfView = 35;
    //设置背景颜色
    camera.clearColor = new Laya.Vector4(0, 0, 0.6, 1);
    //加入摄像机移动控制脚本
    camera.addComponent(CameraMoveScript);
    //创建方向光 -------------------
    var light = scene.addChild(new Laya.DirectionLight());
    //移动灯光位置
    light.transform.translate(new Laya.Vector3(0, 2, 5));
    //调整灯光方向
    light.transform.worldMatrix.setForward(new Laya.Vector3(0, -0.5, 0));
    //设置灯光环境色
    light.color = new Laya.Vector3(1, 1, 1);
}));

```

编译调试示例代码可以看到屏幕上显示了一个漂亮的场景（图1）。

![1](img/1.png)<br>(图1)

### 场景资源预加载

上面的例子Scene3D.load()方法是资源的异步加载，有时候3D的资源比较大，需要预加载来来提升首屏的体验。这时候我们可以用加载器预加载。2D游戏资源我们是用Laya.loader.load()方法预加载，而3D资源必须用Laya.loader.create()这个方法,请参考的相关的AP描述。

```typescript
//单个资源
Laya.loader.create("res/Cube.ls",Laya.Handler.create(this,completeHandler));
//批量加载
Laya.loader.create(["res/Cube1.ls","res/Cube2.ls","res/Cube3.ls"],Laya.Handler.create(this,completeHandler));
//批量加载 并创建不同的类型；
Laya.loader.create([{url:"res/Cube1.ls"},{url:"res/Cube2.lh"},{url:"res/Cube3.lm"}],Laya.Handler.create(this,completeHandler));
```

在项目中，一般我们都会采用加载器的方式，可以对资源有很好的管理。

代码如下:

```typescript
//初始化引擎
Laya3D.init(0, 0, true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();
//因为只有一个资源 所以我们传进去字符串就可以，队列的话可以传递一个数组队列。
Laya.loader.create("LayaScene_01/loveScene.ls",
    Laya.Handler.create(this, this.completeHandler));
function completeHandler() {
    // 第一种方法 获取场景
    // var scene=Laya.Scene3D.load("LayaScene_01/loveScene.ls");
    // 第二种方法，缓存后加载方式
    var scene = Laya.loader.getRes("LayaScene_01/loveScene.ls");
    Laya.stage.addChild(scene);
}
```

### 场景的雾化

雾化效果在项目中起着重要的作用，雾化效果就相当于开启大气的效果，看起来有种朦朦胧胧的感觉，让场景更真实。LayaAir 3D引擎可以设置场景的雾效可见距离（相当于浓度）及雾效的颜色。雾化使用的恰当不但可以提升游戏性能，还可以增加游戏的体验。

```typescript
//开启雾化效果
scene.enableFog = true;
//设置雾化的颜色
scene.fogColor = new Laya.Vector3(0,0,0.6);
//设置雾化的起始位置，相对于相机的距离
scene.fogStart = 10;
//设置雾化最浓处的距离。
scene.fogRange = 40;
```

添加上面的逻辑代码到上面的例子中编译运行，发现场景中笼罩着一层蓝色的雾效（图2），越远处越浓，到距离摄像机40米后会全部被雾笼罩。

![2](img/2.png)</br>(图2)

### 场景光照贴图

光照贴图是场景中3D模型产生的投影、阴影过渡、灯光氛围、模型材质与材质之间的颜色影响等。

很少有3D游戏场景是靠灯光与模型即时渲染产生投影及颜色影响，这是非常耗性能的方式，特别又是手机游戏，手机的显卡功能并不强大，全部用即时光影游戏会变得很卡顿。

场景光照贴图就是为了解决这个问题，它是以贴图的方式模拟游戏场景的光影光色，减少大量的即时运算。

光照贴图建议通过unity3D 编辑器渲染光照贴图并导出使用，加载场景时，引擎会自动加载光照贴图达到较好的效果，图1与图2中就使用了unity导出的光照贴图。

如果unity中并未渲染光照贴图，导出后引擎也不会加载报错，但游戏的效果会大打折扣。图3是未使用光照贴图效果，图4是使用了光照贴图效果，汝好汝坏一目了然。光照贴图也经常用于模拟阳光、夜景、游戏气氛烘托等效果，增强了游戏的体验性。

![3](img/3.png)(图3)

![4](img/4.png)(图4)

关于光照贴图的渲染方法在此不多做说明，成熟的3D游戏美术设计师基本都会制作光照贴图。

我们打开上面示例代码所导出的资源树目录（图5）。

**loveScene文件夹的名称为unity中创建了光照贴图后根据场景名生成，其中的资源为场景光照贴图，原始的光照贴图为exr格式，需转换成layaAir引擎中使用的jpg或png格式，最好在photoShop中手动转化一下，可设置为8位颜色，并存储成png格式，可有效减小资源大小，减少游戏资源加载的时间。**

如果在unity中未创建光照贴图，则不会生成文件夹。

![5](img/5.png)</br>(图5)

如果需要用文件更小的jpg图片格式，转化成jpg格式后，还需修改.ls配置文件中的光照贴图路径，如（图6）中，打开场景导出的数据文件”loveScene.ls”，把.exr格修改成.jpg，否则编译运行时引擎会自动去查找png格式的图片加载，而不会去加载jpg格式图片。

![6](img/6.png)</br>(图6)