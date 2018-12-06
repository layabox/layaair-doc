## LayaAir3D之摄像机Camera

LayaAir中的摄像机可以理解成拍摄电影或者电视剧时候的摄像机，用来捕捉三维世界画面，然后呈现到屏幕上，如果在场景中没有摄像机，那么游戏画面不会显示任务物体。场景中的摄像机还可以放到场景中的子节点中，比如添加到主角角色模形中同样可以呈现3D画面。

同时，LayaAir 3D引擎中还增加了VR摄像机，开发者们可以用它开发VR立体应用或游戏。

当然，摄像机还有其他比较重要的属性，下面将一一介绍它的功能。



### 从Unity中导出摄像机

引擎1.7.10版与unity导出插件1.5.0版发布后，在unity中所创建的摄像机可以被导出了！并且导出文件保留了摄像机在3D空间中的位置、视角、背景颜色、载剪、视野等参数，当加载了导出后的场景，显示的画面效果与unity中完全一致，方便了开发者们对摄像机视角的控制。

同时，因为LayaAir 3D引擎支持多摄像机，因此也可以在unity中设置多个摄像机并导出，关于多摄像机的视口设置请查看本课最后的“多摄像机使用”小节。

那么，如果在unity中创建了摄像机并导出，在代码中加载导出文件后，我们怎么去获取摄像机呢？这可以通过场景的子节点索引或名称来获取，获取后我们还可以对它进行移动旋转、设置天空盒、添加脚本等操作。

代码如下：

```java
package {
	import laya.d3.core.Camera;
	import laya.d3.core.scene.Scene;
	import laya.display.Stage;
	import laya.utils.Handler;
	import laya.utils.Stat;
  
	public class LayaAir3D
	{
		public function LayaAir3D() 
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();			
			//预加载角色动画资源
			Laya.loader.create("monkey/monkey.ls",Handler.create(this,onSceneOK));
		}		
		
		private function onSceneOK():void
		{
			//添加3D场景
			var scene:Scene3D = Laya.loader.getRes("monkey/monkey.ls");
			Laya.stage.addChild(scene);  
          
         	//从场景中获取摄像机
            var camera:Camera = scene.getChildByName("Main Camera") as Camera;
          	//后续对摄像机的逻辑操作.......
        }
	}
}
			
```

  在Untiy中，摄像机默认名为“Main Camera"，因此在上述代码中，通过scene的getChildByName(“Main Camera")方法得到了摄像机，以供后续逻辑操作。开发者们也可以在unity中自定义摄像机的名字。



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
var scene:Scene3D = new Scene();
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
	camera.clearColor = new Vector4(0.5,0.5,0.6,1);
```

**天空盒**

场景中大多时候需要表现天空远景，比如蓝天白云、黄昏、星空等，在LayaAir 3D引擎中，是通过在摄像机属性上添加天空盒（SkyBox）的方式创建。

不过如果摄像机使用了正交投影，天空盒将达不到所要效果，开发者们可以偿试。

天空盒是由一个立方体模型及6张可以无缝相接的材质贴图构成，有点类似于360全景地图，随着视角的旋转改变，我们可以观察到四面八方都有远景效果。

下列代码中“skyCube.ltc"中用JSON格式存储了6张贴图的路径

```java
	//创建天空盒
	var skyBox:SkyBoxMaterial=new SkyBoxMaterial();
	//清除标记，使用天空（必须设置，否者无法显示天空）
	camera.clearFlag=BaseCamera.CLEARFLAG_SKY;
	//天空盒加载（测试资源可能有更新与文档截图不一致，以实际为准）
	BaseMaterial.load("https://layaair.ldc.layabox.com/demo2/h5/res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Handler.create(null, function(mat:SkyBoxMaterial):void {
				var skyRenderer:SkyRenderer = new SkyRenderer();
				skyRenderer.mesh = SkyBox.instance;
				skyRenderer.material = mat;
				camera.skyRenderer = skyRenderer;
				var exposureNumber:Number = 0;
				Laya.timer.frameLoop(1, this, function():void {
					mat.exposure = Math.sin(exposureNumber += 0.01) + 1;
					mat.rotation += 0.01;
				});
			}))
```

![图片5](img/5.png)<br>（图5）使用天空盒



### 多摄像机的使用

在同一个场景中，可以使用多个摄像机，当加载到场景中后，它们会产生各自的游戏视图画面。在我们以前遇到的游戏中，如双人3D游戏就使用了两个3D摄像机，左半屏幕显示一个玩家，右半屏幕显示另一个，极大的丰富了游戏性。

不过多摄像机的缺点是非常耗性能，模型三角面数与DrawCall数量会成倍上升，多几个摄像机就会多出几倍性能损耗，因此开发者们需酌情考虑。

3D场景的显示大小与位置与2D游戏不太一样，主要是靠摄像机的视口（ViewPort）来控制，通过它来进行屏幕的分割。

下例中我们加载一个3D场景，并通过ViewPort进行左右视口分离，代码如下：

```java
package
{
	import laya.d3.core.Camera;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Viewport;
	import laya.display.Stage;
	import laya.utils.Handler;
	import laya.utils.Stat;

	public class LayaAir3D_MultiCamera
	{
		public function LayaAir3D_MultiCamera()
		{
			//初始化引擎
			Laya3D.init(1280, 720,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();			
			//加载3D资源
			Laya.loader.create("LayaScene_loveScene/loveScene.ls",Handler.create(this,on3DComplete));
		}
		
		private function on3DComplete():void
		{
			//创建场景
			var scene:Scene3D=Scene.load("LayaScene_loveScene/loveScene.ls");
			Laya.stage.addChild(scene);
			
			//创建摄像机1添加到场景
			var camera1:Camera=new Camera();
			scene.addChild(camera1);
			//摄像机1添加控制脚本
			camera1.addComponent(CameraMoveScript);
			//修改摄像机1位置及角度
			camera1.transform.translate(new Vector3(0,2,8),true);
			camera1.transform.rotate(new Vector3(-23,0,0),true,false);
			//设置视口为左半屏
			camera1.viewport=new Viewport(0,0,640,720);
			
			//创建摄像机2添加到场景
			var camera2:Camera=new Camera();
			scene.addChild(camera2);
			//修改摄像机2位置及角度
			camera2.transform.rotate(new Vector3(-45,0,0),false,false);
			camera2.transform.translate(new Vector3(0,0,25),true);
			//设置视口为右半屏
			camera2.viewport=new Viewport(640,0,640,720);
		}
	}
}
```

编译运行上述代码，运行效果如图6。开发者们同时也可以测试，在单摄像机下时，DrawCall与三角面数会少一半。

![图片6](img/6.png)<br>（图6）双摄像机分屏 

