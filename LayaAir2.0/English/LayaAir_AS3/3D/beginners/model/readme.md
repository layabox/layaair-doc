##Model of LayaAir3D

###Model overview

Three-dimensional model is a three-dimensional object which is modeled by three-dimensional software according to the structure of the object. At present, LayaAir 3D engine includes two types of model display, one is common model.**MeshSprite3D**2. Skin animation model**Skinned Mesh Sprite 3D**。

The difference is that the skinned animation model refers to the skinned and skeletal animation model added to the production, often used for animated characters. The common model refers to the scene landscape model without animation.

Both of them include model mesh and material.

**Model grid (Mesh):**

Model grid is a three-dimensional data composed of points, lines and surfaces. LayaAir engine has a special class of Mesh grid data, which can be displayed in the scene by assigning it to the 3D model display object Mesh Sprite 3D or Skinned Mesh Sprite 3D.

At present, there are many 3D production software, the most mainstream is 3D Max and Maya software. There are many data formats of 3D model, such as FBX, 3ds, obj, etc.

The LayaAir engine provides model export tools FBXTools and unity3D export plug-ins for generating the 3D data format required by layaAir. It is recommended to use the unity export plug-in, and the fbxtools tool will not be updated later.

**Material:**

Material description will be introduced in separate chapters, but not in this chapter.



###Create the underlying model that comes with the engine

In the course of Quickly Opening 3D Travel, we have used the BoxMesh box model. In this lesson, we introduce other Sphere Mesh and Cylinder Mesh basic model data provided by LayaAir engine. We create them in turn and move them through the transform attribute. The code is as follows:

When creating, it should be noted that the engine loaded into the scene has its own model, and the pivot point is in the center of the model, so we move, rotate and zoom with the reference of the center point of the model. When loaded into a scene, the model is placed at the origin of the world coordinate of the scene by default, similar to 2D.


```java

package {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.webgl.resource.Texture2D;
	import laya.display.Scene;
	import laya.d3.resource.models.SphereMesh;
	import laya.d3.core.material.PBRStandardMaterial;
	import laya.d3.resource.models.CylinderMesh;
	import laya.utils.Handler;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			var scene:Scene3D = Laya.stage.addChild(new Scene3D())as Scene3D;

			//创建摄像机（纵横比，进距裁剪，远距裁剪）------
			var camera:Camera = new Camera(0,0.1,1000);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机的位置
			camera.transform.position = new Vector3(0,3,10);
			//旋转摄像机角度
			camera.transform.rotate(new Vector3(-15,0,0),true,false);
			//加入摄影机移动控制脚本
			//camera.addComponent();

			//创建方向光
			var light:DirectionLight = scene.addChild(new DirectionLight())as DirectionLight;
			//移动灯光位置
			light.transform.translate(new Vector3(0,2,5));
			//调整灯光方向
			light.transform.worldMatrix.setForward(new Vector3(0.15,-1.0,0.0));
			//设置灯光颜色
			light.color = new Vector3(0.3,0.3,0.3);
			//设置灯光环境色
			scene.ambientColor = new Vector3(1,1,1);

			//创建模型
			//创建盒子模型（参数为：长，宽，高，单位：米）
			var boxMesh:BoxMesh = new BoxMesh(2,2,2);
			//创建模型显示对象
			var box3D:MeshSprite3D = new MeshSprite3D(boxMesh);
			scene.addChild(box3D);

			//创建球体模型（参数为：半径，水平层数，垂直层数）
			var sphereMesh:SphereMesh = new SphereMesh(1,20,20);
			//创建模型显示对象
			var sphere3D:MeshSprite3D = new MeshSprite3D(sphereMesh);
			//x轴上移动-3米（世界坐标 向左）
			sphere3D.transform.translate(new Vector3(-3,0,0),false);
			scene.addChild(sphere3D);

			//创建圆柱体模型（参数为：半径，高，圆截面线段数）
			var cylinderMesh:CylinderMesh = new CylinderMesh(1,2,20);
			//创建模型显示对象
			var cylinder3D:MeshSprite3D = new MeshSprite3D(cylinderMesh);
			cylinder3D.transform.translate(new Vector3(3,0,0),false);
			scene.addChild(cylinder3D);
			//创建材质
			var material:PBRStandardMaterial = new PBRStandardMaterial();
			box3D.meshRenderer.material = material;	
			sphere3D.meshRenderer.material = material;
			cylinder3D.meshRenderer.material = material;
		}		 
	}
}
```


In the above code, the camera and light are created, and three basic geometric models are added, which use the most basic default material. The display effect is shown in Figure 1.

![图片1](img/1.png)<br> (Fig. 1)



###Creating the Model of Three-dimensional Software Generation

The three basic models mentioned above are mainly used for developer learning test. Most of the models in the game are created by three-dimensional software, then imported into the Unity editor to edit and stitch, then transformed by layaAir export tool, and then loaded by 3D scene or model display class.

Here again, we will explain the resource categories and file usage of the export.

In the exported folder, there are many resources (Figure 2). There are parsing files such as scene, 3D model container, 3D model, 3D material, and data files such as illumination mapping and material mapping.

![图片2](img/2.png)<br>（图2）


**LoveScene folder**It is a folder created by creating illumination maps in untiy. It has the same name as the scene created in untiy. Illumination maps are introduced in Scene.

**Materials folder**When importing FBX model into Unity, the folder of material ball is created. The exported resource is the corresponding LayaAir material data parsing file, which stores the rendering mode of material, mapping resource path, various light and color attributes of material, etc.

**Texture folder**It is a folder that stores textures created in Unity. The resource is texture file, which is a series of picture files. In LayaAir engine, we use JPG or PNG format pictures. We can use export tools to automatically convert other format pictures into JPG or png. Developers should pay attention to it.



####* Scene data file in. LS format

Scene-type data files for the exported scenarios have been explained in previous courses, but not much here.




####* Sprite3D data file in.Lh format

The exported 3D display object container Spirte3D type data file, coded in JSON format, is selected by layaAir export plug-in in Unity3D to export "Sprite3D" category generation. The internal storage is less light mapping than *. LS format, the other are all the same.

"*.lh" format loading is similar to scene loading method, which is loaded by asynchronous loading Sprite3D. load () or preloading Laya. loader. create () method. Reference code:


```java

......
//添加3D场景
var scene:Scene3D = new Scene3D();
Laya.stage.addChild(scene);

//方法一：直接异步加载
//Sprite3D.load("res/room.lh",Handler.create(this,function(sp:Sprite3D):void{
//	var sprite3D:Sprite3D = scene.addChild(sp)as Sprite3D;
//}));

//方法二：预加载
Laya.loader.create("res/room.lh",Handler.create(this,function():void{
	var sprite3D:Sprite3D = Laya.loader.getRes("res/room.lh");
	scene.addChild(sprite3D);
}));
```




####*. LM format data file

Whether you export "Scene" file or "Sprite3D" file type, the exported resource folder contains a series of *. LM format files. In this project, the model folder is a folder built by the developer in Unity to store FBX model. As shown in Figure 2, the corresponding folder and. LM resource files are generated at the time of export.

![图片3](img/3.png)<br> (Figure 3)

The *. LM file is a model data file, which can generate mesh data Mesh of Mesh Sprite 3D or Skinned Mesh Sprite 3D type display objects, including vertex location, normal, vertex color, vertex UV and other information of the model mesh.

MeshSprite. load () is loaded asynchronously or Laya. loader. create () is preloaded. The reference code is as follows:


```java

......
//添加3D场景
var scene:Scene3D = new Scene3D();
Laya.stage.addChild(scene);

//方法一：直接异步加载
//Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Handler.create(this,function(m:*):void{
	//var meshSprite3D:MeshSprite3D = new MeshSprite3D(m);
	//scene.addChild(meshSprite3D);
//}));

//方法二：预加载，.lm默认创建为Mesh类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Handler.create(this,function():void{		                         varmesh:Mesh=Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
	var meshSprite3D:MeshSprite3D = new MeshSprite3D(mesh);
	scene.addChild(meshSprite3D);
}));
```


Both of the above methods can display the model in the game screen, and the Material Mapping Engine will automatically load the model. In the project, we can use the above two methods according to the situation. Fixed scenarios can be loaded in. LS format, while active items can be loaded in. LS or. LM mode.



###Getting Subobject Model and Grid

In some cases, 3D models are composed of multiple sub-model objects, such as scene model. ls, which are basically composed of multiple object models and materials. The outer layer is a Sprite 3D container, while the inner part is the real model Mesh Sprite 3D or Skinned Mesh Sprite 3D. There may also be multiple levels of nesting.

####Get sub object model

When writing game logic, some models need to be modified, either to switch and delete models, or to add components to models, or to obtain animation components on models and modify the material of models. All of these need to get sub-objects from the loaded model, which we can use.**Getchildat(), getchildbyname()**Method to get sub-objects, which is the same as the method of getting sub-objects by the 2D engine.

Now let's load a truck model's. LH file and get its subobjects. Before acquiring child objects, it is recommended to open the. LH file to see the parent-child hierarchy of the model, because when making the model, we can not determine how many child object models the model consists of, and their naming rules.

Tips: when modeling in 3ds max, it is recommended to name the sub-objects of the model and formulate the resource naming rules for the project, instead of using the default model name.

The truck truck. LH is loaded from Unity. When opened, it can be seen through JSON structure that the outer layer is a Sprite3D container (equivalent to the scene of Unity) and the inner part is a Sprtie3D container (equivalent to the truck in the scene of Unity). In the truck container, there are two sub-object models, MeshSprite3D (head and body model). So we need two getChildAt () ways to get the model MeshSprite3D.

When acquiring sub-objects, we should also pay attention to the problem that the model and material are not loaded, so it is impossible to acquire sub-objects. Therefore, resource preloading or asynchronous loading are needed to complete event monitoring.


```java

//加载导出的卡车模型
Sprite3D.load("LayaScene_truck.lh",Handler.create(this,function(s:*):void{
	var truck3D:Sprite3D = s as Sprite3D;
    //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
	var meshSprite3D:MeshSprite3D = truck3D.getChildAt(0).getChildAt(0)as MeshSprite3D;
     //输出模型的名字
	trace(meshSprite3D.name);
}))
```


Compiling the above example code, we can see that the model shows (Figure 4). Under the browser, press F12 to open the console. We can see that the name of the output model is "body", which indicates that the model succeeded.

![图片4](img/4.png)<br> (Figure 4)



####Get model mesh

In the game, we often build role changing systems, sometimes changing models, sometimes changing maps, sometimes changing both. Because the Material Mapping section will be explained in subsequent chapters, we will only introduce the method of replacing the model grid in this chapter.

Model Mesh Sprite 3D or Skinned Mesh Sprite 3D has**MeshFilter**Attribute, which is an instance of a grid filter class, in this attribute**SharedMesh**It is the grid of the model that can be recreated, replaced and destroyed.

Looking at the following example, after loading the truck model for 2 seconds, we create a new header grid object to replace the original body grid, as shown in Figure 4.


```java

......
var truck3D:Sprite3D;
var meshSprite3D:MeshSprite3D;
//加载导出的卡车模型
Sprite3D.load("LayaScene_truck.lh",Handler.create(this,function(s:*):void{
	truck3D = s;
    //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
	meshSprite3D = truck3D.getChildAt(0).getChildAt(0)as MeshSprite3D;
     //输出模型的名字
	trace(meshSprite3D.name);
 	Laya.timer.once(2000,this,onTimerOnce);
}))

//2秒后更换模型网格
private function onTimerOnce():void
{
  //创建模型网格并更换原始网格
  Mesh.load("LayaScene_truck/Assets/truck-head.lm",Handler.create(this,function(m:*):void{
		meshSprite3D.meshFilter.sharedMesh = m;
 		 //因使用了卡车头网格，位置会重合，因此进行位置移动
 		 meshSprite3D.transform.translate(new Vector3(0,0,-8));
   }))
}
```


![图片5](img/5.gif)<br>（图5） 