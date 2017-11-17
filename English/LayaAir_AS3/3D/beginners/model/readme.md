## LayaAir3D Model

### Model overview

3D model refers to the 3D object formed by 3D software modeling according to object structure. Currently two types of model display are included in LayaAir 3D engine, one is the general model **MeshSprite3D**, and the other is the skin animation model **SkinnedMeshSprite3D**。

The difference is that the skinning animation model refers to the model of skinning and skeletal animation, which is often used in animation. The ordinary model refers to the scene without animation, such as landscape or static model.

Both include mesh and the material data.

**Mesh:**

Mesh is a three-dimensional data composed of points, lines and triangles. In the LayaAir engine, there is a special Mesh grid data class, which is given to the 3D model to display objects MeshSprite3D or SkinnedMeshSprite3D, and then can be displayed in the scene.

Now 3D production software is more popular, and the most mainstream are 3ds Max and Maya software. 3D model data format more spread are FBX, 3DS, OBJ.

The LayaAir engine provides model export tools FBXTools and unity3D export plug-ins, which are used to generate 3D data formats needed for layaAir. It is recommended to use the unity export plug-in, and the FBXTools will not be updated in the future.

**Material:**

Material Description we will be introduced in a separate article, and will not be described here.



### Creating the basic model of the engine

 We've used the BoxMesh model previously in quickStart guide article, and in this lesson we'll cover the other SphereMesh, CylinderMesh base model data provided by the LayaAir engine. We create in turn and move their position through the transform property, Specific code is as follows :

When you create, you need to pay attention to, the engine is loaded into the scene with the model, the axis point in the center of the model, so we are based on the center point of the model for reference, move, rotate, zoom. When loaded into the scene, the model defaults to the world coordinate origin of the scene, similar to 2D.

```java
package {

	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.resource.models.CylinderMesh;
	import laya.d3.resource.models.SphereMesh;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D_Model
	{
		
		public function LayaAir3D_Model() 
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景-----------------------
			var scene:Scene = new Scene();
			Laya.stage.addChild(scene);
			
			
			//创建摄像机(横纵比，近距裁剪，远距裁剪)-----
			var camera:Camera = new Camera( 0, 0.1, 1000);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.position=new Vector3(0, 3, 10);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -17, 0, 0), true, false);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			
			//创建方向光 ------------------------
			var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//移动灯光位置
			light.transform.translate(new Vector3(0,2,5));
			//调整灯光方向
			light.direction = new Vector3(0.5, -1, 0);
			//设置灯光环境色
			light.ambientColor = new Vector3(1, 1, 1); 
			//设置灯光漫反射颜色
			light.diffuseColor = new Vector3(0.3, 0.3, 0.3);
			
			
			//创建模型-------------------------------
			//创建盒子模型(参数为：长、宽、高，单位：米)
			var boxMesh:BoxMesh=new BoxMesh(2,2,2);
			//创建模型显示对象
			var box3D:MeshSprite3D=new MeshSprite3D(boxMesh);
			scene.addChild(box3D);
			
			//创建球体模型(参数为：半径、水平层数、垂直层数)
			var sphereMesh:SphereMesh=new SphereMesh(1,8,8);
			//创建模型显示对象
			var sphere3D:MeshSprite3D=new MeshSprite3D(sphereMesh);
			//x轴上移动-3米（世界座标 向左）
			sphere3D.transform.translate(new Vector3(-3,0,0),false);
			scene.addChild(sphere3D);
			
			//创建圆柱体模型(参数为：半径、高、圆截面线段数)
			var cylinderMesh:CylinderMesh=new CylinderMesh(1,2,8);
			//创建模型显示对象
			var cylinder3D:MeshSprite3D=new MeshSprite3D(cylinderMesh);
			//x轴上移动3米（世界座标 向右）
			cylinder3D.transform.translate(new Vector3(3,0,0),false);
			scene.addChild(cylinder3D);
			
			//创建材质----------------------------------
			var material:StandardMaterial = new StandardMaterial();
			//为模型赋材质（单个材质可赋给多个模型）
			box3D.meshRender.material = material;
			
		}		 
		
	}
}
```

上面的代码中，创建了摄像机与灯光，并添加了三种基本几何体模型，它们使用了最基本的默认材质。显示效果如图1。

![图片1](img/1.png)<br>（图1）



### 创建三维软件生成的模型

上述三种基本模型主要用于开发者学习测试。游戏中的模型大都是三维软件制作后，导入unity编辑器中编辑拼接，再用layaAir导出工具转化产生，然后通过3D场景或模型显示类加载使用。

在此我们再次来说明一下导出的资源类别与文件使用方法。

导出的文件夹中，包括的资源较多（图2），有场景、3D模型容器、3D模型、3D材质等解析文件，还有光照贴图、材质贴图等数据文件。

![图片2](img/2.png)<br>（图2）

**loveScene文件夹**是在untiy中创建光照贴图后产生的文件夹，与在untiy中创建的场景名相同，光照贴图在场景Scene篇已有介绍。

**Materials文件夹**是在unity中导入FBX模型时创建材质球的文件夹，导出后的资源为对应的LayaAir材质数据解析文件，文件中存储着材质的渲染模式、贴图资源路径、材质的各种光色属性等。

**Texture文件夹**是在unity中创建的存放贴图的文件夹，其中资源为材质的贴图文件，是一系列的图片文件，在LayaAir引擎中我们使用jpg或png格式的图片，可使用导出工具把其他格式图片自动转化jpg或png，请开发者们一定注意。



#### *.ls格式Scene数据文件

导出的场景Scene类型数据文件，在之前的课程中我们已有讲解，在此不多作说明。




#### *.lh格式Sprite3D数据文件

导出的3D显示对象容器Spirte3D类型数据文件，JSON格式编码，是unity3D中layaAir导出插件选择导出”Sprite3D“类别生成，内部存储比*.ls格式少了光照贴图，其他全部相同。

“*.lh” Format loading is similar to scenario loading, which is loaded by asynchronous loading Sprite3D.load() or pre loaded Laya.loader.create() method, and reference code:

```java
//Add 3D scene
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//Method 1: direct asynchronous loading
var sprite3D:Sprite3D = Sprite3D.load("res/room.lh");

//Method two: preload to create a Sprite3D type
Laya.loader.create("res/room.lh",Handler.create(this,function():void{ 
				var sprite3D:Sprite3D=Laya.loader.getRes("res/room.lh");
  				scene.addChild(sprite3D);
				}),null,Sprite3D);
```



#### *.lm Formatted data file

Whether it is derived from ”Scene“ file or file type ”Sprite3D“ a series of *.lm format files are included in the derived Resources folder, FBX storage model for unity developers built the model folder in the project folder, as shown in Figure 2, created the corresponding folder and.Lm resource file when exporting.

![图片3](img/3.png)<br>（picture 3）

"*.lm" The file is the model data file, which can generate the grid data Mesh of MeshSprite3D or SkinnedMeshSprite3D type display object, including the vertex position, normal line, vertex color, vertex UV and other information of the model grid.

Load asynchronously by MeshSprite.load() or pre loading Laya.loader.create() method. The reference code is as follows:

```java
//添加3D场景
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//方法一：直接异步加载
var mesh:Mesh=Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
var meshSprite3D:MeshSprite3D = new MeshSprite(mesh);

//方法二：预加载，创建为MeshSprite3D类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",                   
                   Handler.create(this,function():void{
                  //创建预加载的模型网格 
                  var mesh:Mesh=Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
                  //创建3D模型
                  var meshSprite3D:MeshSprite3D=new MeshSprite3D(mesh);
                  scene.addChild(meshSprite3D);
                     
				   }),null,Mesh);
```

With the three methods mentioned above, the model can be displayed in the game screen, and the material map engine will automatically load onto the model. In the project, we can use the above three methods according to the situation, fixed scene, we can use .ls format to load, and active items can be loaded by .ls或 or lm mode. 



### Obtain child object model and mesh properties

The 3D model is sometimes composed of multiple sub model objects, such as the scene model .ls, which is basically made up of multiple object models and materials. The outer layer is a Sprite3D container, and the inside is the real model MeshSprite3D or SkinnedMeshSprite3D. And there may be multiple levels nested.

#### Get child object model

When writing game logic, some models need to be modified, or to switch and delete the model, add components, or to obtain the animation components of the model and the material of the modified model. We all need to get the child object from the loaded model, and we can get the child object by the **getChildAt(), getChildByName()** method, which is the same as the 2D engine getting the child object method.

Let's load a.lh file of the truck model, and then get its child object. Before getting a child object, it is recommended to open the.lh file to see the parent-child hierarchy of the model, because we cannot determine how many sub object models are formed and their naming rules when making the model.

Tips: when modeling in 3ds max, it is recommended to name the sub objects of the model, and to formulate the resource naming rules of the project, instead of using the default model name.

The following example loads the truck.lh truck exported from unity. After opening it, you can see through the JSON structure that the outer layer is a Sprite3D container (the equivalent of unity scene) and inside is a Sprite3D container (equivalent to the truck in the unity). In the truck container are two sub-object models MeshSprite3D (front and body models). So we need call twice getChildAt () method to get the model MeshSprite3D.

```java
			//加载导出的卡车模型
			var truck3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
			//模型与材质加载完成后回调
			truck3D.on(Event.HIERARCHY_LOADED,null,function():void
			{
				//获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
				var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
                //输出模型的名字
                trace(meshSprite3D.name); //输出“body”
		});
			scene.addChild(truck3D);
```

Compile the sample code, we can see the model is displayed (Figure 4), open the console by pressing F12 in the browser, we can see that the model name is output “body”, indicating that the model was successful.

![图片4](img/4.png)<br>（Picture 4） 



#### Get Mesh properties

In the game, we often create the character dressup system, sometimes for the model, sometimes for the map, and sometimes both change. Because the material texture part will be explained in the following chapters, we only introduce the method of replacing the model mesh in this chapter.

The model MeshSprite3D or SkinnedMeshSprite3D has a **meshFilter** property, which is a grid filter class instance. The **sharedMesh** in this property is the mesh of the model, which can be recreated, replaced, and destroyed.

See the example below. After loading the truck model for 2 seconds, we create a new car head mesh object to replace the original body mesh, and the effect is as follows (Figure 4).

```java
			//加载导出的卡车模型
			var truck3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
			//模型与材质加载完成后回调
			truck3D.on(Event.HIERARCHY_LOADED,null,function():void
			{
				//获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body"）
				var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
				//输出模型的名字
                trace(meshSprite3D.name); //输出“body”
				
				//2秒后更换模型网格
				Laya.timer.once(2000,null,function():void{
					
					//创建模型网格并更换原始网格
					meshSprite3D.meshFilter.sharedMesh = Mesh.load("LayaScene_truck/Assets/truck-head.lm");
					//因使用了卡车头网格，位置会重合，因此进行位置移动
					meshSprite3D.transform.translate(new Vector3(0,0,-8));
				});
			});
			scene.addChild(truck3D);
```

![图片5](img/5.gif)<br>（Picture 5） 
