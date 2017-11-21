## LayaAir3D skeletal bone point

### Skeletal bone point overview

Skeletal bone points are commonly used in the binding of 3D models to bones. For example, the weapon moves with the movement of the hand, so we can bind the weapon to the skeleton of the hand as the sub level of the hand skeleton.

The binding 3D model can also be used to remove the binding or replace the 3D model by code, which also implements the reloading function of weapons or equipment.



### Setting up skeletal bone points in Unity





![图片1](img/1.png)<br>（Picture 1）



### Creating a model for 3D software generation

These three basic models are mainly used for developer learning tests. Most of the models in the game are three-dimensional software, after the introduction of unity editor edit splicing, and then use the layaAir export tool transformation generation, and then through the 3D scene or model display class loading use.

Here, let's explain again the exported resource class and how the file is used.

Export folder contains more resources (Figure 2), there are scenes, 3D model container, 3D model, 3D material and other analytical files, as well as light maps, texture maps and other data files.

![图片2](img/2.png)<br>（Picture 2）

**loveScene Folder** The folder created after creating the lighting map in untiy is the same as the scene name created in untiy, and the illumination map has been introduced in the scene Scene.

**Materials Folder** When you import the FBX model in unity, you create the folder of the material ball, and the exported resource is the corresponding LayaAir material data parsing file. The file is stored in the rendering mode of material, the path of mapping resources, and the various light and color attributes of material.

**Texture Folder** is created in the unity store map folder, which is the material resources mapping file, is a series of picture files in the LayaAir engine we use JPG or PNG format, can be used to export other format images automatically transformed into JPG or PNG, please developers must pay attention to.



#### *.ls format Scene data file

Export scenario Scene type data file, we have already explained in the previous courses, but not much explanation.




#### *.lh Format Sprite3D data file

The exported 3D display object container Spirte3D type data file, JSON format code, is the layaAir export plug-in selection export in unity3D ”Sprite3D“ Class generation, internal storage ratio *.ls Format less light map, all the others are the same.

“*.lh” Format loading is similar to scenario loading by asynchronous loading Sprite3D.load() or preload Laya.loader.create() Method loading reference code：

```java
......
//Add 3D scene
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//Method 1: direct asynchronous loading
//var sprite3D:Sprite3D = Sprite3D.load("res/room.lh");
//scene.addChild(sprite3D);

//Method two: preloading,.Lh defaults to create Sprite3D type objects and put them into the object pool
Laya.loader.create("res/room.lh",Handler.create(this,onCreateComplete));
//预加载完成后回调
private function onCreateComplete():void
{ 
  //Instantiate, load, and create a good 3D object
  var sprite3D:Sprite3D=Laya.loader.getRes("res/room.lh");
  scene.addChild(sprite3D);
}
```



#### *.lm Format data file

Either export ”Scene“ File or ”Sprite3D“ file type, a series is included in the exported resource folder*.lm Format file, in this project model Folder as unity folder that stores the FBX model built by the developer, as shown in Figure 2, generates the corresponding folder and .lm resource file when exporting.

![图片3](img/3.png)<br>（图3）

"*.lm" file is the model data file, which can generate the grid data Mesh of MeshSprite3D or SkinnedMeshSprite3D type display object, including the vertex position, normal line, vertex color, vertex UV and other information of the model grid.

Load asynchronously by loading MeshSprite.load () or pre loading Laya.loader.create () method. The reference code is as follows:

```java
......
//添加3D场景
var scene:Scene = new Scene();
Laya.stage.addChild(scene);

//方法一：直接异步加载
//	var mesh:Mesh=Mesh.load("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
//	var meshSprite3D:MeshSprite3D = new MeshSprite(mesh);

//方法二：预加载，.lm默认创建为Mesh类型
Laya.loader.create("LayaScene_01/Assets/model/loveScene_jianzhu.lm",Handler.create(this,onCreateComplete));    
//预加载完成后回调
private function onCreateComplete():void
{ 
  //创建预加载的模型网格 
  var mesh:Mesh=Laya.loader.getRes("LayaScene_01/Assets/model/loveScene_jianzhu.lm");
  //创建3D模型
  var meshSprite3D:MeshSprite3D=new MeshSprite3D(mesh);
  scene.addChild(meshSprite3D);
}
```

With the two methods mentioned above, the model can be displayed in the game screen, and the material map engine will automatically load onto the model. In the project, we can use the above two methods according to the situation, fixed scene, we can use.Ls format to load, and active items can be loaded by .ls or .lm mode.



### Get the child object model and grid

The 3D model is sometimes composed of multiple sub model objects, such as the scene model .ls, which is basically made up of multiple object models and materials. The outer layer is a Sprite3D container, and the inside is the real model MeshSprite3D or SkinnedMeshSprite3D. There may be multiple levels nested.

#### Get child object model

When writing game logic, some models need to be modified, or to switch and delete the model, or to model add components, or to obtain the animation components of the model and the material of the modified model. We all need to get the child object from the loaded model, and we can go through **getChildAt()、getChildByName()** Method to get the child object, which is the same as the 2D engine acquires the child object method.

Let's load a.Lh file of the truck model, and then get its child object. Before getting a child object, it is recommended to open the .lh file to see the parent-child hierarchy of the model, because we cannot determine how many sub object models are formed and their naming rules when making the model.

tips：When modeling in 3ds max, it is recommended to name the sub object of the model, and to formulate the resource naming rules of the project, instead of using the default model name.

Under the loading cases derived from the unity truck.lh truck, see open through the JSON structure, the outer layer is a Sprite3D container (equivalent to unity, internal scene) is a container of Sprtie3D (equivalent to unity in the scene, the container truck truck) is the two sub object model MeshSprite3D (head and body model). So we need two getChildAt () methods to get the model MeshSprite3D.

When you get a child object, you should also pay attention to a problem, that is, the model and the material are not loaded, it is impossible to obtain the child object, so the need for resource preloading, or asynchronous event listener to complete the load.

```java
......
//加载导出的卡车模型
truck3D = Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成事件监听
truck3D.on(Event.HIERARCHY_LOADED,this,onLoded);
scene.addChild(truck3D);

//模型与材质加载完成后回调
private function onLoded():void
{
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body",暂取其中一个模型）
  var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //输出模型的名字
  trace(meshSprite3D.name); //输出“body”
}
```

Compile the sample code, we can see the model is displayed (Figure 4), open the console by pressing F12 in the browser, we can see that the model name is output “body”, indicating that the model was successful.

![图片4](img/4.png)<br>（Picture 4） 



#### Get the Mesh

In the game, we often create the character dressup system, sometimes for the model, sometimes for the map, and sometimes both change. Because the material texture part will be explained in the following chapters, we only introduce the method of replacing the model mesh in this chapter.

Available in Model MeshSprite3D or SkinnedMeshSprite3D **meshFilter** Property, which is an instance of a grid filter class in this property **sharedMesh** Is the model of the grid, it can be re-created to replace and destroy it.

See the example below. After loading the truck model for 2 seconds, we create a new car head grid object to replace the original car body grid, the effect is as shown in Figure 4.

```java
......
//加载导出的卡车模型
truck3D=Sprite3D.load("LayaScene_truck/truck.lh");
scene.addChild(truck3D);
//模型与材质加载完成后回调
truck3D.on(Event.HIERARCHY_LOADED,this,onLoded);

//模型与材质加载完成后回调
private function onLoded():void
{
  //获取模型（查看.lh文件，有两个子对象模型，一为车头“head”，一为车身"body"）
  meshSprite3D=truck3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //输出模型的名字
  trace(meshSprite3D.name); //输出“body”
  //2秒后更换模型网格
  Laya.timer.once(2000,this,onTimerOnce);
}

//2秒后更换模型网格
private function onTimerOnce():void
{
  //创建模型网格并更换原始网格
  meshSprite3D.meshFilter.sharedMesh = Mesh.load("LayaScene_truck/Assets/truck-head.lm");
  //因使用了卡车头网格，位置会重合，因此进行位置移动
  meshSprite3D.transform.translate(new Vector3(0,0,-8));
}
```

![图片5](img/5.gif)<br>（Picture 5） 
