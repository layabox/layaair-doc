# LayaAir3D之模型

## 模型概述

3D模型是指通过三维软件按照物体的结构建模形成的3D立体对象。目前LayaAir3D引擎中包括了两种模型显示类型。一为普通模型**MeshSprite3D**。二为蒙皮动画模型**SkinnedMeshSprite3D**。

区别是蒙皮动画模型是指在制作时加入了蒙皮与骨骼动画的模型，常用于有动画的角色。而普通模型是指未有动画的场景景观模型等。

它们都包括了模型网格与材质两部分。

#### 模型网格（Mesh）：

模型网格是由点、线、面组成的三维数据，LayaAir引擎中有专门的Mesh网格数据类，将它赋予3D模型显示对象MeshSprite3D或SkinnedMeshSprite3D后就可以在场景中显示出来。

目前3D制作软件较多，最主流的是3ds max与maya软件。3D模型的数据格式也较多，如FBX、3DS、OBJ等。

LayaAir引擎提供了模型导出工具FBXTools与unity3D导出插件，用于生成LayaAir所需要德D数据格式。建议使用unity导出插件，FBXTools工具以后将不会更新。

#### 材质（Material）：

材质说明我们将在独立的章节介绍，在本章节中暂不说明。



## 创建引擎自带的基础模型

在快速开启3D之旅的课程中，我们已用到了BoxMesh盒子模型，本节课中介绍LayaAir引擎提供的其他SphereMesh、CylinderMesh基础模型数据，我们依次创建它们，并通过transform属性去移动它们的位置，具体代码如下：

tips：创建时，需注意的是，加载到场景中的引擎自带模型，轴心点在模型正中心，因此我们是以模型中心点为参考进行移动、旋转、缩放。加载到场景中时，模型默认会放置到场景的世界坐标原点上，与2D类似。

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

        //添加3D场景-----------------------
        var scene:Laya.Scene = new Laya.Scene();
        Laya.stage.addChild(scene);
        //创建摄像机(横纵比，近距裁剪，远距裁剪)-----
        var camera:Laya.Camera = new Laya.Camera( 0, 0.1, 1000);
        //加载到场景
        scene.addChild(camera);
        //移动摄像机位置
        camera.transform.position=new Laya.Vector3(0, 3, 10);
        //旋转摄像机角度
        camera.transform.rotate(new Laya.Vector3( -17, 0, 0), true, false);
        //加入摄像机移动控制脚本
        camera.addComponent(CameraMoveScript);
        //创建方向光 ------------------------
        var light:Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //移动灯光位置
        light.transform.translate(new Laya.Vector3(0,2,5));
        //调整灯光方向
        light.direction = new Laya.Vector3(0.5, -1, 0);
        //设置灯光环境色
        light.ambientColor = new Laya.Vector3(1, 1, 1); 
        //设置灯光漫反射颜色
        light.diffuseColor = new Laya.Vector3(0.3, 0.3, 0.3);
        //创建模型-------------------------------
        //创建盒子模型(参数为：长、宽、高，单位：米)
        var boxMesh:Laya.BoxMesh=new Laya.BoxMesh(2,2,2);
        //创建模型显示对象
        var box3D:Laya.MeshSprite3D=new Laya.MeshSprite3D(boxMesh);
        scene.addChild(box3D);
        //创建球体模型(参数为：半径、水平层数、垂直层数)
        var sphereMesh:Laya.SphereMesh=new Laya.SphereMesh(1,8,8);
        //创建模型显示对象
        var sphere3D:Laya.MeshSprite3D=new Laya.MeshSprite3D(sphereMesh);
        //x轴上移动-3米（世界座标 向左）
        sphere3D.transform.translate(new Laya.Vector3(-3,0,0),false);
        scene.addChild(sphere3D);
        //创建圆柱体模型(参数为：半径、高、圆截面线段数)
        var cylinderMesh:Laya.CylinderMesh=new Laya.CylinderMesh(1,2,8);
        //创建模型显示对象
        var cylinder3D:Laya.MeshSprite3D=new Laya.MeshSprite3D(cylinderMesh);
        //x轴上移动3米（世界座标 向右）
        cylinder3D.transform.translate(new Laya.Vector3(3,0,0),false);
        scene.addChild(cylinder3D);
        //创建材质----------------------------------
        var material:Laya.StandardMaterial = new Laya.StandardMaterial();
        //为模型赋材质（单个材质可赋给多个模型）
        box3D.meshRender.material = material;

    }
}
new LayaAir3D();
```

上面的代码中，创建了摄像机与灯光，并添加了三种基本几何体模型，它们使用了最基本的默认材质。显示效果如图1。

![1](img/1.png)(图1)</br>



## 创建三维软件生成的模型

上述三种基本模型主要用于开发者学习测试。游戏中的模型大都是三维软件制作后，导入unity编辑器中编辑拼接，再用LayaAir导出工具转化产生，然后通过3D场景或模型显示类加载使用。

再次我们再次来说明一下导出的资源类别与文件使用方法。

导出的文件夹中，包括的资源较多（图2），有场景、3D模型容器、3D模型、3D材质等解析文件，还有光照贴图、材质贴图等数据文件。

![2](img/2.png)(图2)</br>

**loveScene文件夹**是在unity中创建光照贴图后产生的文件夹，与在unity中创建的场景名相同，光照贴图在场景Scene篇已有介绍。

**Materials文件夹**是在unity中导入FBX模型时创建材质球的文件夹，导出后的资源为对应的LayaAir材质数据解析文件，文件中存储着材质的渲染模式、贴图资源路径、材质的各种光色属性等。

**Texture文件夹**是在unity中创建的存放贴图的文件夹，其中资源为材质的贴图文件，是一系列的图片文件，在LayaAir引擎中我们使用jpg或png格式的图片，可使用导出工具把其他格式图片自动转化jpg或png，请开发者们一定注意。

#### *.ls格式Scene数据文件

导出的场景Scene类型数据文件，在之前的课程中我们已有讲解，在此不多作说明。

#### *.lh格式Sprite3D数据文件

导出的3D显示对象容器sprite3D类型数据文件，JSON格式编码，是unity3D中LayaAir导出插件选择导出“Sprite3D”类别生成，内部存储比*.ls格式少了光照贴图，其他全部相同。

“*.ls”格式加载与场景加载方法类似，由异步加载Sprite3D.load()或预加载Laya.loader.create()方法加载，参考代码：

```javascript
......
//添加3D场景-----------------------
this.scene = new Laya.Scene();
Laya.stage.addChild(this.scene);

//方法一：直接异步加载
var sprite3D:Laya.Sprite3D = Laya.Sprite3D.load("res/room.lh");

//方法二：预加载，创建为Sprite3D类型
Laya.loader.create("res/room.lh",Laya.Handler.create(this,this.onCreateComplete));
//预加载完成后回调
private onCreateComplete():void{
  //实例化加载并创建好的3D对象
  var sprite3D:Laya.Sprite3D = Laya.loader.getRes("res/room.lh");
  this.scene.addChild(sprite3D);
}
```

#### *.lm格式数据文件

无论是导出”Scene“文件或”Sprite3D“文件类型，在导出的资源文件夹中都包含了系列*.lm格式文件，本项目中model文件夹为unity中开发者自建的存储FBX模型文件夹。如图2，在导出时生成了对应的文件夹和.lm资源文件。

![3](img/3.png)(图3)</br>

“*.lm”文件是模型数据文件，可以生成MeshSprite3D或SkinnedMeshSprite3D类型显示对象的网格数据Mesh，包含了模型网格的顶点位置、法线、顶点色、顶点UV等信息。

通过一部加载MeshSprite.load()或预加载Laya.loader.create()方法加载，参考代码如下：

```typescript
......
//添加3D场景-----------------------
this.scene = new Laya.Scene();
Laya.stage.addChild(this.scene);

//方法一：直接异步加载
// var mesh:Laya.Mesh = Laya.Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
// var meshSprite3D:Laya.MeshSprite3D = new Laya.MeshSprite3D(mesh);

//方法二：预加载，创建为Sprite3D类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Laya.Handler.create(this,this.onCreateComplete));
//预加载完成后回调
private onCreateComplete():void
{ 
  //创建预加载的模型网格 
  var mesh:Laya.Mesh = Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
  //创建3D模型
  var meshSprite3D:Laya.MeshSprite3D = new Laya.MeshSprite3D(mesh);
  this.scene.addChild(meshSprite3D);
}
```

用上述的两种方法都可以在游戏画面中显示出模型，材质贴图引擎也会自动加载到模型上。在项目中我们可以根据情况使用上述两种方法，固定场景我们可以使用.ls格式加载，而活动的物品可以使用.ls或.lm方式加载。

## 获取子对象模型及网格

3D模型在有时候会由多个子模型对象构成，例如场景模型.ls，基本都是由多个物体模型与材质构成，外层是Sprite3D容器，内部才是真正的模型MeshSprite3D或SkinnedMeshSprite3D。并且还可能会有多个层次嵌套。

#### 获取子对象模型

在编写游戏逻辑时，有的模型需要被修改，或者是切换与删除模型、或者是给模型加组件、或者是获取模型上的动画组件及修改模型的材质等。这都是需要从加载的模型中去获取子对象，我们可以通过**getChildAt()**、**getChildByName()**方法去获取子对象，这与2D引擎获取子对象方法一样。

下面我们来加载一个卡车模型的.lh文件，然后获取它的子对象，在获取子对象之前，建议打开.ls文件查看模型的父子层级关系，因为在制作模型时，我们也不能确定模型是又多少个子对象模型构成，及它们的命名规则。

tips：在3ds max中建模时，建议对模型的子对象取名，并且制定项目的资源命名规则，不要用默认的模型名称。

下例加载从unity导出的卡车truck.lh，打开后通过JSON结构可以看到，外层是一个Sprite3D容器（相当于unity场景），内部又是一个Sprite3D容器（相当于unity场景中的卡车），客车容器中的两个子对象模型MeshSprite3D（车头与车身模型）。因此我们需要两次getChildAt()方式才能获取到模型MeshSprite3D。

获取子对象时还应注意一个问题，就是模型与材质未加载完成，是无法获取子对象的，因此需要资源预加载，或异步加载时监听加载完成事件。

```javascript
......
//加载导出的卡车模型
this.truck3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
this.truck3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoded);
this.scene.addChild(this.truck3D);
//模型与材质加载完成后回调
private onLoded():void
{ 
  console.log(this.truck3D);
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身“body”，暂取其中一个模型）
  var meshSprite3D:Laya.MeshSprite3D = this.truck3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //输出模型的名字(输出“body”)
  console.log(meshSprite3D.name);
}
```

编译上例代码，我们可以看到模型显示了（图4），在浏览器下按F12打开控制台，我们可以看到输出了模型的名字为“body”，说明模型获取成功。

![4](img/4.png)(图4)</br>



#### 获取模型网格Mesh

在游戏中，我们经常打造角色换装系统，有时是换模型，有时是换贴图，有时两者都换。因为材质贴图部分在后续章节中才讲解，所以本章节中我们只介绍更换模型网格的方法。

模型MeshSprite3D或SkinnedMeshSprite3D中有**meshFilter**属性，它是一个网格过滤器类实例，这个属性中的**sharedMesh**就是模型的网格，可以对它进行重新创建更换及销毁。

查看以下示例，当加载完卡车模型2秒后，我们创建新的汽车头网格对象更换原有的车身网格，效果如（图4）。

```javascript
......
//加载导出的卡车模型
this.truck3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
this.scene.addChild(this.truck3D);
//模型与材质加载完成事件监听
this.truck3D.on(Laya.Event.HIERARCHY_LOADED,this,this.onLoaded);
//模型与材质加载完成后回调
private onLoaded():void
{ 
  console.log(this.truck3D);
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身“body”，暂取其中一个模型）
  this.meshSprite3D = this.truck3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  //输出模型的名字(输出“body”)
  console.log(this.meshSprite3D.name);
  //2秒后更换模型网格
  Laya.timer.once(2000,this,this.onTimerOnce);
}
private onTimerOnce():void{
  //创建模型网格并更换原始网格
  this.meshSprite3D.meshFilter.sharedMesh = Laya.Mesh.load("LayaScene_truck/Assets/truck-head.lm");
  //因使用了卡车头网格，位置会冲个，所以进行位置移动
  this.meshSprite3D.transform.translate(new Laya.Vector3(0,0,-8));
}
```

![5](img/5.gif)(图5)</br>