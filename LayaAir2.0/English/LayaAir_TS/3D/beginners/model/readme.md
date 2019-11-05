#Model of LayaAir3D

##Model overview

Three-dimensional model is a three-dimensional object which is modeled by three-dimensional software according to the structure of the object. Currently, there are two types of model display in Laya air3d engine. One is the general model.**MeshSprite3D**。 2. Skin animation model**Skinned Mesh Sprite 3D**。

The difference is that the skinned animation model refers to the skinned and skeletal animation model added to the production, often used for animated characters. The common model refers to the scene landscape model without animation.

Both of them include model mesh and material.

####Model grid (Mesh):

Model grid is a three-dimensional data composed of points, lines and surfaces. LayaAir engine has a special class of Mesh grid data, which can be displayed in the scene by assigning it to the 3D model display object Mesh Sprite 3D or Skinned Mesh Sprite 3D.

At present, there are many 3D production software, the most mainstream is 3ds Max and Maya software. There are many data formats for 3D models, such as FBX, 3DS, OBJ, etc.

The LayaAir engine provides model export tools FBXTools and Unity3D export plug-ins to generate the required D data format for LayaAir. It is recommended to use Unity export plug-ins. The FBX Tools tool will not be updated in the future.

####Material:

Material description will be introduced in separate chapters, but not in this chapter.



##Create the underlying model that comes with the engine

In the course of Quickly Opening 3D Travel, we have used the BoxMesh box model. In this lesson, we introduce other Sphere Mesh and Cylinder Mesh basic model data provided by LayaAir engine. We create them in turn and move them through the transform attribute. The code is as follows:

Tips: when creating, it should be noted that the engine loaded into the scene has its own model, the axis is in the center of the model, so we use the center of the model as a reference to move, rotate and zoom. When loaded into a scene, the model is placed at the origin of the world coordinates of the scene by default, similar to 2D.


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
        var scene:Laya.Scene3D = new Laya.Scene3D();
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
        light.transform.worldMatrix.setForward(new Laya.Vector3(0.5, -1, 0));
        //设置灯光漫反射颜色
        light.diffuseColor = new Laya.Vector3(0.3, 0.3, 0.3);
        //设置灯光环境色
        scene.ambientColor = new Laya.Vector3(1, 1, 1); 
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
        var material:Laya.PBRStandardMaterial = new Laya.PBRStandardMaterial();
        //为模型赋材质（单个材质可赋给多个模型）
        box3D.meshRenderer.material = material;

    }
}
new LayaAir3D();
```


In the above code, the camera and light are created, and three basic geometric models are added, which use the most basic default material. The display effect is shown in Figure 1.

![1](img/1.png)(Fig. 1) </br>



##Creating the Model of Three-dimensional Software Generation

The three basic models mentioned above are mainly used for developer learning test. Most of the models in the game are created by three-dimensional software, then imported into the Unity editor to edit and stitch, then transformed by LayaAir export tool, and then loaded by 3D scene or model display class.

Again, let's explain the categories of resources exported and how to use the files.

In the exported folder, there are many resources (Figure 2). There are parsing files such as scene, 3D model container, 3D model, 3D material, and data files such as illumination mapping and material mapping.

![2](img/2.png)(Fig. 2) </br>

**LoveScene folder**It is a folder created by creating illumination maps in Unity. It has the same name as the scene created in Unity. Illumination maps have been introduced in Scene.

**Materials folder**When importing FBX model into Unity, the folder of material ball is created. The exported resource is the corresponding LayaAir material data parsing file, which stores the rendering mode of material, mapping resource path, various light and color attributes of material, etc.

**Texture folder**It is a folder that stores textures created in Unity. The resource is texture file, which is a series of picture files. In LayaAir engine, we use JPG or PNG format pictures. We can use export tools to automatically convert other format pictures into JPG or png. Developers should pay attention to it.

####* Scene data file in. LS format

Scene-type data files for the exported scenarios have been explained in previous courses, but not much here.

####* Sprite3D data file in.Lh format

The exported 3D display object container sprite3d type data file, encoded in JSON format, is generated by the layaair export plug-in in unity3d by choosing to export the "sprite3d" category. The internal storage is less than the *. LS format in light map, and the others are all the same.

"*.ls" format loading is similar to scene loading method, which is loaded by asynchronous loading Sprite3D. load () or preloading Laya. loader. create () method. Reference code:


```javascript

......
//添加3D场景-----------------------
this.scene = new Laya.Scene3D();
Laya.stage.addChild(this.scene);

//方法一：直接异步加载
Laya.Sprite3D.load("res/room.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
    var sprite3D:Laya.Sprite3D = this.scene.addChild(sp) as Laya.Sprite3D;
}));

//方法二：预加载，创建为Sprite3D类型
Laya.loader.create("res/room.lh",Laya.Handler.create(this,this.onCreateComplete));
//预加载完成后回调
private onCreateComplete():void{
  //实例化加载并创建好的3D对象
  var sprite3D:Laya.Sprite3D = Laya.loader.getRes("res/room.lh");
  this.scene.addChild(sprite3D);
}
```


####*. LM format data file

Whether you export "Scene" file or "Sprite3D" file type, the exported resource folder contains a series of *. LM format files. The model folder in this project is the FBX model folder built by the developer in Unity. As shown in Figure 2, corresponding folders and. LM resource files are generated during export.

![3](img/3.png)(Fig. 3) </br>

The *. LM file is a model data file, which can generate mesh data Mesh of Mesh Sprite 3D or Skinned Mesh Sprite 3D type display objects, including vertex location, normal, vertex color, vertex UV and other information of the model mesh.

MeshSprite. load () is loaded asynchronously or Laya. loader. create () is preloaded. The reference code is as follows:


```typescript

......
//添加3D场景-----------------------
this.scene = new Laya.Scene3D();
Laya.stage.addChild(this.scene);

//方法一：直接异步加载
//Laya.Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Laya.Handler.create(this,function(m):void{
//  	 var meshSprite3D:Laya.MeshSprite3D = scene.addChild(m) as Laya.MeshSprite3D;
//}));

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


Both of the above methods can display the model in the game screen, and the Material Mapping Engine will automatically load the model. In the project, we can use the above two methods according to the situation. Fixed scenarios can be loaded in. LS format, while active items can be loaded in. LS or. LM mode.

##Getting Subobject Model and Grid

In some cases, 3D models are composed of multiple sub-model objects, such as scene model. ls, which are basically composed of multiple object models and materials. The outer layer is a Sprite 3D container, while the inner part is the real model Mesh Sprite 3D or Skinned Mesh Sprite 3D. There may also be multiple levels of nesting.

####Getting Subobject Model

When writing game logic, some models need to be modified, either to switch and delete models, or to add components to models, or to obtain animation components on models and modify the material of models. This is all about getting sub-objects from the loaded model, which we can use**GetChildAt ()**,**GetChildByName ()**Method to get sub-objects, which is the same as the method of getting sub-objects by the 2D engine.

Now let's load a truck model's. LH file and get its child objects. Before we get the child objects, we suggest opening the. LS file to see the parent-child hierarchy of the model, because when we make the model, we can't determine how many sub-object models the model is made up of, and their naming rules.

Tips: when modeling in 3ds max, it is recommended to name the sub-objects of the model and formulate the resource naming rules for the project, instead of using the default model name.

The following example loads truck truck.lh exported from unity. After opening it, you can see through the JSON structure that the outer layer is a sprite3d container (equivalent to the unity scene), the inner layer is another sprite3d container (equivalent to the truck in the unity scene), and the two sub object models in the bus container are meshsprite3d (head and body model). So we need two getChildAt () ways to get the model MeshSprite3D.

When acquiring sub-objects, we should also pay attention to the problem that the model and material are not loaded, so it is impossible to obtain sub-objects. Therefore, we need to pre-load resources or listen for loading completion events when loading asynchronously.


```javascript

......
var truck3D:Laya.Sprite3D;
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck.lh",Laya.Handler.create(this,function(sp){
     this.truck3D = sp;
     //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
     var meshSprite3D:Laya.MeshSprite3D = truck.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
  	 //输出模型的名字
	 trace(meshSprite3D.name);
}))
```


When compiling the code in the above example, we can see that the model is displayed (Figure 4). Press F12 under the browser to open the console, and we can see that the name of the output model is "body", indicating that the model is successful.

![4](img/4.png)(Fig. 4) </br>



####Getting Mesh of Model Grid

In the game, we often build role changing systems, sometimes changing models, sometimes changing maps, sometimes changing both. Because the Material Mapping section will be explained in subsequent chapters, we will only introduce the method of replacing the model grid in this chapter.

Model Mesh Sprite 3D or Skinned Mesh Sprite 3D has**MeshFilter**Attribute, which is an instance of a grid filter class, in this attribute**SharedMesh**It is the grid of the model that can be recreated, replaced and destroyed.

Looking at the following example, after loading the truck model for 2 seconds, we create a new header grid object to replace the original body grid, as shown in Figure 4.


```typescript

......
//加载导出的卡车模型
var truck3D:Laya.Sprite3D;
var meshSprite3D:Laya.MeshSprite3D;
//加载导出的卡车模型
Laya.Sprite3D.load("LayaScene_truck.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
  	 truck3D = sp;
  	 //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
     meshSprite3D = truck.getChildAt(0).getChildAt(0) as Laya.MeshSprite3D;
     //输出模型的名字
	 trace(meshSprite3D.name);
  	 Laya.timer.once(2000,this,onTimerOnce);
}));

//2秒后更换模型网络
private onTimerOnce(){
   //创建模型网格并更换原始网格
  	Laya.Mesh.load("LayaScene_truck/Assets/truck-head.lm",Laya.Handler.create(this,function(m:*):void{
		 meshSprite3D.meshFilter.sharedMesh = m;
 		 //因使用了卡车头网格，位置会重合，因此进行位置移动
 		 meshSprite3D.transform.translate(new Vector3(0,0,-8));
   	}));
}
```


![5](img/5.gif)(Fig. 5) </br>