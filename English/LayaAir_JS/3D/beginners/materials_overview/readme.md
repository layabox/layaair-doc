## Material overview of LayaAir3D

### Material Overview

Material is the material texture of objects, such as wood, metal, glass, hair, water, etc., their roughness, gloss, reflection, transparency, color, texture and other material attributes are different.

Most 3D engines have separate material classes for program code control, and material processing is also one of the most important parts of 3D production software. Game developers often have a word, in the 3D game scene production, three points to see the model, seven by the material.

There are many kinds of materials, and there are standard materials, multi-dimensional materials, synthetic materials, double-sided materials, ray tracing materials and so on in 3D production software. In the LayaAir 3D engine, the main support is the standard material StandardMatrial.



### Create standard materials

If the model in the code does not assign material, the texture and texture of the model can not be displayed in the 3D view, only the default is pure white.

In the code from the “ quickStart guide for 3D project” article, we created the standard material, added a texture image to the diffuse map, and assigned it to the model.

```typescript
//创建标准材质
var material = new Laya.StandardMaterial();
//创建漫反射二维纹理贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为box模型赋材质
box.meshRender.material = material;
```

Of course, this is just a simple usage, we just use the most important diffuse reflectance map, to achieve better artistic effect, developers need to know the color of the material and mapping properties.



### Material loading

In “LayaAir3D Model”, we introduce the model, which includes two parts: mesh and material. When loading .ls and.lh data, the model will automatically load the corresponding material.

In the latest engine version, the model grid is separated from the material, and the unity export plug-in tool no longer binds the material to the exported.Lm model file. So if the loading .lm format resources, you will need to give the material to display or display only for white mold.

At this point, you can use the exported .lmat material file, load the creation of standard material and assigned to the model, the way similar to the model load.

```typescript
//异步加载材质文件创建标准材质（也可以预加载）
var material = Laya.StandardMaterial.load("truck/Assets/Materials/t0200.lmat");
//为box模型赋材质
box.meshRender.material = material;
```



### Get material from the loaded model

In the above example, we created the standard material, but in the actual project use, we rarely use code to model the material, but directly in the 3D software production or creation of materials in unity, and then use the tool export LayaAir format after use.

When used, the engine will automatically load the material on the model, and many times, a model will have more than the standard material, automatic way for us to save a lot of development time. But in this case, what if we need to change and change the material? We first need to get the current material on the model.

The LayaAir 3D engine gives us the MeshRender class for mesh renderers and SkinnedMeshRender, the skinned animated grid renderer that provides their instances on the visual model, which we can use to get the material on the model.

Tips: MeshRender in MeshSprite3D model, SkinnedMeshRender in SkinnedMeshSprite3D model.

The material is divided into two types, one is the material of Material, if the material is changed, only their own models show changes; one is to share SharedMaterial material, because the material is relatively independent, multiple models can use the same material, if the acquisition is to share and modify the material itself, the model display will change, the other part of the model used in this material will change. Therefore, developers need to choose according to the situation.



#### Get and modify your own material

```typescript
......
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
function onLoadComplete(){
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，他们都用同一个材质）
  var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
  //从模型上获取自身材质
  var material = meshSprite3D.meshRender.material;
  //修改材质的反射颜色，让模型偏红
  material.albedo = new Laya.Vector4(1,0,1,1);
}
```

After compiling and running, as follows, although the body and the front model are used the same material, but only modify the body's own material is red, does not affect the front (Figure 1).

![图片1](img/1.png)<br>（Picture 1）



#### Get and modify shared material

```typescript
//加载导出的卡车模型
this.role3D = Laya.Sprite3D.load("LayaScene_truck/truck.lh");
//模型与材质加载完成监听与回调
this.role3D.on(Laya.Event.HIERARCHY_LOADED,this,onLoadComplete);
this.scene.addChild(this.role3D);
//模型与材质加载完成后回调
function onLoadComplete(){
  //获取车身模型（查看.lh文件，模型中两个对象，车头“head”与车身“body”，它们都用同一个材质）
  var meshSprite3D = this.role3D.getChildAt(0).getChildAt(0);
  //从模型上获取共享材质
  var shareMaterial = meshSprite3D.meshRender.material;
  //修改材质的反射颜色，让模型偏红
  shareMaterial.albedo = new Laya.Vector4(1,0,0,1);
}
```

The compiling and running effect is as follows: after modifying the shared material, the material is changed because the front and body models are used (Figure 2).

![图片2](img/2.png)<br>（Picture 2）



#### Get and modify the list of materials

In 3D production software, there is often a model with multiple materials, which we call multidimensional materials. However, after the tool export data is loaded, the engine will automatically create a model of the material list array materials or sharedMaterials, so when modifying the material, you can use the for cycle or recursive way.

The following code provides methods to obtain and modify material for model or model container sub objects. We directly modify the material for all scene sub objects.

```typescript
......
//加载场景
this.scene = Laya.Scene.load("LayaScene_01/loveScene.ls");
Laya.stage.addChild(this.scene);
//场景模型与材质加载完成监听与回调
this.scene.on(Laya.Event.HIERARCHY_LOADED,this,function(){
  setModelMaterial(this.scene);
});
//修改模型材质(场景或模型)
function setModelMaterial(model){
  //如果是模型网格显示对象
  if(model instanceof Laya.MeshSprite3D){
    //获取模型网格对象
    var meshSprite3D = model;
    //获取材质列表数组
    var materials = meshSprite3D.meshRender.materials;
    //对模型网格中的所有材质进行修改
    for(var m = 0;m < materials.length;m++){
      //获取共享材质
      var mat = materials[m];
      //修改材质反射颜色
      mat.albedo = new Laya.Vector4(0.5,0.5,1,1);
    }
  }
  //如果是蒙皮模型网格显示对象
  if(model instanceof Laya.SkinnedMeshSprite3D){
    //获取蒙皮模型网格显示对象
    var skinnedMeshSprite3D = model;
    //获取材质列表数组
    var materials1 = skinnedMeshSprite3D.skinnedMeshRender.materials;
    //对蒙皮模型网格中的所有材质进行修改
    for(var n = 0;n < materials1.length;n++){
      //获取共享材质
      var mat1 = materials1[n];
      //修改材质反射颜色
      mat1.albedo = new Laya.Vector4(0.5,0.5,1,1);
    }
  }
  //递归方法获取子对象
  for(var i = 0;i < model._childs.length;i++){
    setModelMaterial(model._childs[i]);
  }
}
```

After compiling and running, the effect is as follows (Figure 3), and all the model materials in the scene are added with a layer of blue.

![图片3](img/3.png)<br>（Picture 3）