## LayaAir3D之摄像机Camera

LayaAir中的摄像机可以理解成拍摄电影或者电视剧时候的摄像机，用来捕捉三维世界画面，然后呈现到屏幕上。同时，LayaAir 3D引擎中还增加了VR摄像机，开发者们可以用它开发VR立体应用或游戏。

当然，摄像机还有其他比较重要的属性，下面将一一介绍它的功能。

### 摄像机移动与旋转

摄像机继承于Sprite3D，因此还可以对它进行3D变换的操作，通过transform属性在3D场景中移动旋转变化，多角度取景，使观众或游戏者获得更真实的空间体验。

设置相机的旋转：

```java
//实例化一个相机，设置纵横比，0为自动匹配。0.1最近看到的距离，100最远看到的距离。
var camera:Camera = new Camera(0, 0.1, 100)
//移动相机，设置相机的向z轴移动3米。true代表是局部坐标，false是相对世界坐标。 
camera.transform.translate(new Vector3(0, 0, 3),false);
//加载到场景
scene.addChild(camera);
```
设置相机的旋转

```java
//欧拉角旋转相机。局部坐标，弧度制（false为角度制）。
camera.transform.rotate(new Vector3(0, 0, 3), true, true);
```



### 摄像机正交投影与透视投影

在我们观察世界的时候，看到的都是带有“近大远小”透视效果的世界，在3D引擎中，为了更好的模拟人眼所看到的世界，默认的摄像机带着“透视投影”的效果。

![图片1](img/1.png)<br>（图1）默认透视投影

但有很大一部分游戏，特别是斜45度视角的2D、3D混合游戏，游戏画面是不能带透视效果的，那么这个时候，我们需要设置摄像机为“正交投影”，使它不产生近大远小的透视效果。

```javascript
	//正交投影属性设置
	camera.orthographicProjection = true;
	//正交垂直矩阵距离,控制3D物体远近与显示大小
	camera.orthographicVerticalSize = 7;
	//移动摄像机位置
	camera.transform.translate(new Vector3(0, 26.5, 45));
	//旋转摄像机角度
	camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```

![图片2](img/2.png)<br>（图2）正交投影 



### 摄像机裁剪与视野

**远近距离的裁剪**

摄像机还可以设置远近距离的裁剪，只显示远近距离之间的场景模型，之外的模型不进行渲染显示。它最大的优势在于提高游戏的性能。

创建摄像机时，摄像机构造函数会默认剪切为近距0.3米，远距为1000米（图1）。开发者可以在构造函数中设置或通过摄像机属性进行设置。

![图片3](img/3.png)<br>（图3）

```javascript
	//创建摄像机时初始化裁剪(横纵比，近距裁剪，远距裁剪)
	var camera:Camera = new Camera( 0, 0.1, 100);
	//近距裁剪
	camera.nearPlane=0;
	//远距裁剪
	camera.farPlane=100;
```

tips：一般在游戏中，我们会把雾效与摄像机剪切同时使用，雾效远距以外的地方基本都看不清楚，这时就可以设置远距离剪切，提高游戏渲染性能。

**摄像机视野**

摄像机视野类似于焦距，通过视野参数的调整，可以看到视图中的场景范围、透视的近大远小变化，它是通过角度值进行调整，角度越大，视野范围越大，开发者可以根据自己的需求进行设置。

  ```java
//设置相机的视野范围90度
camera.fieldOfView = 90;
  ```



### 摄像机捕捉目标

在创建摄像机时，我们经常需要调整摄像机的位置，用于对准显示某个三维物体，或显示某个区域。对于初学者来说，空间思维还未形成习惯，调整位置所花的时间会很多。

LayaAir 3D引擎3D变换提供了一个lookAt()方法，用于捕捉目标，自动调整3D对象对准目标点。摄像机也可以使用它达到我们的调整视角的目的。代码如下

lookAt（target 观察目标向量，up 向上向量，isLocal 是否局部空间）

```java
//添加场景
var scene:Scene = new Scene();
Laya.stage.addChild(scene);
//添加自定义模型
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
scene.addChild(box);
//添加摄像机
var camera:Camera = (scene.addChild(new Camera())) as Camera;
//摄像机捕捉模型目标
camera.transform.lookAt	(box.transform.position,new Vector3(0,-1,0));
```
我们把相机的up设置为（0,-1,0）的方向，摄像机的y向为负数，会在Y轴上倒转，所以画面变成了倒置的方体（图4）。其他几个方向初学者们可以多作尝试。

![图片4](img/4.png)<br>（图4）捕捉目标



### 摄像机背景色与天空盒

**背景色**

在3D场景中，背景颜色我们是用摄像机去控制的，通过设置摄像机clearColor属性来改变3D空间的背景色，颜色使用三维向量Vector3(红,绿,蓝)方式赋值调整，引擎默认设为纯黑色。

```java
	//设置背景颜色
	camera.clearColor = new Vector3(0.5,0.5,0.6);
```

**天空盒**

场景中大多时候需要表现天空远景，比如蓝天白云、黄昏、星空等，在LayaAir 3D引擎中，是通过在摄像机属性上添加天空盒（SkyBox）的方式创建。

不过如果摄像机使用了正交投影，天空盒将达不到所要效果，开发者们可以偿试。

天空盒是由一个立方体模型及6张可以无缝相接的材质贴图构成，有点类似于360全景地图，随着视角的旋转改变，我们可以观察到四面八方都有远景效果。

下列代码中“skyCube.ltc"中用JSON格式存储了6张贴图的路径，在此不多作介绍，我们将在天空盒详解中介绍制作天空盒贴图的方法及“skyCube.ltc"配置。

```java
	//创建天空盒
	var skyBox:SkyBox=new SkyBox();
	//清除标记，使用天空（必须设置，否者无法显示天空）
	camera.clearFlag=BaseCamera.CLEARFLAG_SKY;
	//绑定天空盒对象到摄像机
	camera.sky=skyBox;
	//为天空盒加载贴图文件
	skyBox.textureCube=TextureCube.load("skyBox/skyCube.ltc");
```

![图片5](img/5.png)<br>（图5）使用天空盒





