#Model of LayaAir3D

##Model overview

Three-dimensional model is a three-dimensional object which is modeled by three-dimensional software according to the structure of the object. At present, LayaAir3D engine includes two types of model display. One is the general model.**MeshSprite3D**。 2. Skin animation model**Skinned Mesh Sprite 3D**。

The difference is that the skinned animation model refers to the skinned and skeletal animation model added to the production, often used for animated characters. The common model refers to the scene landscape model without animation.

Both of them include model mesh and material.

####Model grid (Mesh):

Model grid is a three-dimensional data composed of points, lines and surfaces. LayaAir engine has a special class of Mesh grid data, which can be displayed in the scene by assigning it to the 3D model display object Mesh Sprite 3D or Skinned Mesh Sprite 3D.

At present, there are many 3D production software, the most mainstream is 3ds Max and Maya software. There are many data formats for 3D models, such as FBX, 3DS, OBJ, etc.

The LayaAir engine provides model export tools FBXTools and Unity3D export plug-ins to generate the required D data format for LayaAir. It is recommended to use the unity export plug-in, and the fbxtools tool will not be updated later.

####Material:

Material description will be introduced in separate chapters, but not in this chapter.



##Create the underlying model that comes with the engine

In the course of Quickly Opening 3D Travel, we have used the BoxMesh box model. In this lesson, we introduce other Sphere Mesh and Cylinder Mesh basic model data provided by LayaAir engine. We create them in turn and move them through the transform attribute. The code is as follows:

Tips: when creating, it should be noted that the engine loaded into the scene has its own model, the axis is in the center of the model, so we use the center of the model as a reference to move, rotate and zoom. When loaded into a scene, the model is placed at the origin of the world coordinates of the scene by default, similar to 2D.


```typescript

var Main = (function () {
    function Main() {

        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        var scene = Laya.stage.addChild(new Laya.Scene3D());

			//创建摄像机（纵横比，进距裁剪，远距裁剪）------
			var camera = new Laya.Camera(0,0.1,1000);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机的位置
			camera.transform.position = new Laya.Vector3(0,3,10);
			//旋转摄像机角度
			camera.transform.rotate(new Laya.Vector3(-15,0,0),true,false);
			//加入摄影机移动控制脚本
			//camera.addComponent();

			//创建方向光
			var light = scene.addChild(new Laya.DirectionLight());
			//移动灯光位置
			light.transform.translate(new Laya.Vector3(0,2,5));
			//调整灯光方向
			light.transform.worldMatrix.setForward(new Laya.Vector3(0.15,-1.0,0.0));
			//设置灯光颜色
			light.color = new Laya.Vector3(0.3,0.3,0.3);
			//设置灯光环境色
			scene.ambientColor = new Laya.Vector3(1,1,1);

			//创建模型
			//创建盒子模型（参数为：长，宽，高，单位：米）
			var boxMesh = new Laya.BoxMesh(2,2,2);
			//创建模型显示对象
			var box3D = new Laya.MeshSprite3D(boxMesh);
			scene.addChild(box3D);

			//创建球体模型（参数为：半径，水平层数，垂直层数）
			var sphereMesh = new Laya.SphereMesh(1,20,20);
			//创建模型显示对象
			var sphere3D = new Laya.MeshSprite3D(sphereMesh);
			//x轴上移动-3米（世界坐标 向左）
			sphere3D.transform.translate(new Laya.Vector3(-3,0,0),false);
			scene.addChild(sphere3D);

			//创建圆柱体模型（参数为：半径，高，圆截面线段数）
			var cylinderMesh = new Laya.CylinderMesh(1,2,20);
			//创建模型显示对象
			var cylinder3D = new Laya.MeshSprite3D(cylinderMesh);
			cylinder3D.transform.translate(new Laya.Vector3(3,0,0),false);
			scene.addChild(cylinder3D);
			//创建材质
			var material = new Laya.PBRStandardMaterial();
			box3D.meshRenderer.material = material;	
			sphere3D.meshRenderer.material = material;
			cylinder3D.meshRenderer.material = material;
    }
    return Main;
} ());

new Main();
```


In the above code, the camera and light are created, and three basic geometric models are added, which use the most basic default material. The display effect is shown in Figure 1.

![1](img/1.png)(Fig. 1) </br>



##Creating the Model of Three-dimensional Software Generation

The three basic models mentioned above are mainly used for developer learning test. Most of the models in the game are created by three-dimensional software, then imported into the Unity editor to edit and stitch, then transformed by LayaAir export tool, and then loaded by 3D scene or model display class.

Again, let's explain the categories of resources exported and how to use the files.

In the exported folder, there are many resources (Figure 2). There are parsing files such as scene, 3D model container, 3D model, 3D material, and data files such as illumination mapping and material mapping.

![2](img/2.png)(图2)</br>


**LoveScene folder**It is a folder created by creating illumination maps in Unity. It has the same name as the scene created in Unity. Illumination maps have been introduced in Scene.

**Materials folder**When importing FBX model into Unity, the folder of material ball is created. The exported resource is the corresponding LayaAir material data parsing file, which stores the rendering mode of material, mapping resource path, various light and color attributes of material, etc.

**Texture folder**It is a folder that stores textures created in Unity. The resource is texture file, which is a series of picture files. In LayaAir engine, we use JPG or PNG format pictures. We can use export tools to automatically convert other format pictures into JPG or png. Developers should pay attention to it.

####* Scene data file in. LS format

Scene-type data files for the exported scenarios have been explained in previous courses, but not much here.

####* Sprite3D data file in.Lh format

The exported 3D display object container sprite3D type data file, coded in JSON format, is generated by the LayaAir export plug-in in Unity3D, which chooses to export "Sprite3D" category. The internal storage is less illumination mapping than *. LS format, and the others are all the same.

"*.ls" format loading is similar to scene loading method, which is loaded by asynchronous loading Sprite3D. load () or preloading Laya. loader. create () method. Reference code:


```javascript

......
//添加3D场景-----------------------
var scene = Laya.stage.addChild(new Laya.Scene3D());

//方法一：直接异步加载
//直接异步加载
Laya.Sprite3D.load("res/room.lh",Laya.Handler.create(this,function(sp){
		var sprite3D = scene.addChild(sp);
}));

//方法二：预加载，创建为Sprite3D类型
 Laya.loader.create("res/room.lh",Laya.Handler.create(this,onCreateComplete));
//预加载完成后回调
private onCreateComplete():void{
  //实例化加载并创建好的3D对象
  	var sprite3D = Laya.loader.getRes("res/room.lh");
 	scene.addChild(sprite3D);
}
```


####*. LM format data file

Whether you export "Scene" file or "Sprite3D" file type, the exported resource folder contains a series of *. LM format files. The model folder in this project is the FBX model folder built by the developer in Unity. As shown in Figure 2, the corresponding folders and. LM resource files are generated at the time of export.

![3](img/3.png)(Fig. 3) </br>

The *. LM file is a model data file, which can generate mesh data Mesh of Mesh Sprite 3D or Skinned Mesh Sprite 3D type display objects, including vertex location, normal, vertex color, vertex UV and other information of the model mesh.

MeshSprite. load () is loaded asynchronously or Laya. loader. create () is preloaded. The reference code is as follows:


```typescript

......
//添加3D场景-----------------------
var scene = Laya.stage.addChild(new Laya.Scene3D());

//方法一：直接异步加载
//Laya.Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Laya.Handler.create(this,function(m){
// 	var meshSprite3D = new Laya.MeshSprite3D(m);
// 	scene.addChild(meshSprite3D);
// }))

//方法二：预加载，创建为Sprite3D类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Laya.Handler.create(this,this.onCreateComplete));
//预加载完成后回调
private onCreateComplete():void
{ 
  //创建预加载的模型网格 
  var mesh= Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
  //创建3D模型
  var meshSprite3D = new Laya.MeshSprite3D(mesh);
  this.scene.addChild(meshSprite3D);
}
```


Both of the above methods can display the model in the game screen, and the Material Mapping Engine will automatically load the model. In the project, we can use the above two methods according to the situation. Fixed scenarios can be loaded in. LS format, while active items can be loaded in. LS or. LM mode.

##Getting Subobject Model and Grid

In some cases, 3D models are composed of multiple sub-model objects, such as scene model. ls, which are basically composed of multiple object models and materials. The outer layer is a Sprite 3D container, while the inner part is the real model Mesh Sprite 3D or Skinned Mesh Sprite 3D. There may also be multiple levels of nesting.

####Getting Subobject Model

When writing game logic, some models need to be modified, either to switch and delete models, or to add components to models, or to obtain animation components on models and modify the material of models. This is all about getting sub-objects from the loaded model, which we can use**GetChildAt ()**,**GetChildByName ()**Method to get sub-objects, which is the same as the method of getting sub-objects by the 2D engine.

Now let's load a truck model's. LH file and get its child objects. Before we get the child objects, we suggest opening the. LS file to see the parent-child hierarchy of the model, because when we make the model, we can't determine how many sub-object models the model is made up of, and their naming rules.

Tips: when modeling in 3ds max, it is recommended to name the sub-objects of the model and formulate the resource naming rules for the project, instead of using the default model name.

The following example loads truck. lh, which is derived from unit. When opened, it can be seen through JSON structure that the outer layer is a Sprite3D container (equivalent to the unit scene), the inner part is a Sprite3D container (equivalent to the truck in the unit scene), and the two sub-object models in the bus container are MeshSprite3D (head and body model). So we need two getChildAt () ways to get the model MeshSprite3D.

When acquiring sub-objects, we should also pay attention to the problem that the model and material are not loaded, so it is impossible to obtain sub-objects. Therefore, we need to pre-load resources or listen for loading completion events when loading asynchronously.


```javascript

......
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck.lh",Laya.Handler.create(this,function(s){
	var truck3D = scene.addChild(s);
    console.log(this.truck3D);
    //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身“body”，暂取其中一个模型）
  	var meshSprite3D = this.truck3D.getChildAt(0).getChildAt(0)
    //输出模型的名字(输出“body”)
 	 console.log(meshSprite3D.name);
}))
```


When compiling the code in the above example, we can see that the model is displayed (Figure 4). Press F12 under the browser to open the console, and we can see that the name of the output model is "body", indicating that the model is successful.

![4](img/4.png)(Fig. 4) </br>



####Getting Mesh of Model Grid

In the game, we often build role changing systems, sometimes changing models, sometimes changing maps, sometimes changing both. Because the Material Mapping section will be explained in subsequent chapters, we will only introduce the method of replacing the model grid in this chapter.

Model Mesh Sprite 3D or Skinned Mesh Sprite 3D has**MeshFilter**Property, which is an instance of the grid filter class. The**SharedMesh**It is the grid of the model that can be recreated, replaced and destroyed.

Looking at the following example, after loading the truck model for 2 seconds, we create a new header grid object to replace the original body grid, as shown in Figure 4.


```javascript

......
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck.lh",Laya.Handler.create(this,this.onLoaded));
......

//模型与材质加载完成后回调
var _proto = Main.prototype;
_proto.onLoaded = function(s){
    var truck3D = scene.addChild(s);
    console.log(this.truck3D);
    //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身“body”，暂取其中一个模型）
    this.meshSprite3D = this.truck3D.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
    //输出模型的名字(输出“body”)
    console.log(this.meshSprite3D.name);
    //2秒后更换模型网格
    Laya.timer.once(2000,this,this.onTimerOnce); 
}

_proto.onTimerOnce = function(){
  //创建模型网格并更换原始网格
Laya.Mesh.load("LayaScene_truck/Assets/truck-head.lm",Laya.Handler.create(this,function(m){
  	this.meshSprite3D.meshFilter.sharedMesh = m;
  	this.meshSprite3D.transform.translate(new Laya.Vector3(0,0,-8));
}));
}
......
```


![5](img/5.gif)(Fig. 5) </br>