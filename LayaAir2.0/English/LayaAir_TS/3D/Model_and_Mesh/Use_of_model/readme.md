# 模型的功能介绍

###### *version :2.0.2beta   Update:2019-4-26*

In some cases, 3D models are composed of multiple sub-model objects, such as scene model. ls, which are basically composed of multiple object models and materials. The outer layer is a Sprite 3D container, while the inner part is the real model Mesh Sprite 3D or Skinned Mesh Sprite 3D. There may also be multiple levels of nesting.

####Getting Subobject Model Grid

When writing game logic, some models need to be modified, either to switch and delete models, or to add components to models, or to obtain animation components on models and modify the material of models. All of these need to get sub-objects from the loaded model, which we can use.**GetChildAt (), getChildByName ()**Method to get sub-objects, which is the same as the method of getting sub-objects by the 2D engine.

Now let's load a scenario's. LS file and get its subobjects. Before obtaining child objects, it is recommended to open the. LS file to see the parent-child hierarchy of the model, because when making the model, we can not determine how many child object models the model consists of, and their naming rules.

**Tips**When modeling in 3ds max, it is recommended to name the sub-objects of the model and formulate the resource naming rules of the project, instead of using the default model name.


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
//获取球型精灵
var sphere = scene.getChildByName("Sphere");
//获取精灵的mesh
var sphereMesh = sphere.meshFilter.sharedMesh;
//此时已经拿到了场景中的球体的网格
```




####Modifying Subobject Model Grid

When getting sub objects, you should also pay attention to the problem that the model and material are not loaded completely, so you cannot get sub objects. Therefore, you need to pre load resources, or listen for completion events when loading asynchronously. Pre-used in this demo`Laya.loader.create`To preload resources.

In the game, we often build role changing systems, sometimes changing models, sometimes changing maps, sometimes changing both. Because the Material Mapping section will be explained in subsequent chapters, we will only introduce the method of replacing the model grid in this chapter.

Model Mesh Sprite 3D or Skinned Mesh Sprite 3D has**MeshFilter**Attribute, which is an instance of a grid filter class, in this attribute**SharedMesh**It is the grid of the model that can be recreated, replaced and destroyed.

In the following example, we add a click event to the button. Each time the index value is added, the model grid obtained from the scene LS is modified according to the index value.


```typescript

//新建四个mesh
var box = Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5);
var capsule = Laya.PrimitiveMesh.createCapsule(0.25, 1, 10, 20);
var cylinder = Laya.PrimitiveMesh.createCylinder(0.25, 1, 20);
var cone = Laya.PrimitiveMesh.createCone(0.25, 0.75);
var index = 0;

//.............按钮点击事件 监听
changeMeshButton.on(Laya.Event.CLICK, this, function(){
    index++;
    if (index % 5 === 1 ){
        //切换mesh
        sphere.meshFilter.sharedMesh = box;
    }
    else if (index % 5 === 2){
        //切换mesh
        sphere.meshFilter.sharedMesh = capsule;
    }
    else if(index % 5 === 3){
        //切换mesh
        sphere.meshFilter.sharedMesh = cylinder;
    }
    else if(index % 5 === 4){
        //切换mesh
        sphere.meshFilter.sharedMesh = cone;
    }
    else{
        //切换mesh
        sphere.meshFilter.sharedMesh = sphereMesh;
    }
});
```


The effect is shown in Figure 1:

![] (img/1.gif) <br> (Fig. 1)