#Introduction of Material Function

###### *version :2.1.0beta   Update:2019-5-14*

###1. Obtaining materials from models

When using the derived model, the engine automatically loads the material on the model, and many times there are multiple standard materials on a model, which saves us a lot of development time. But in this case, what if we need to change and change the material? We first need to get the current material on the model.

LayaAir 3D engine provides us with mesh renderer Mesh Renderer class and skinned animation mesh renderer Skinned Mesh Renderer, and provides examples of them on visual models through which we can get the material on the model.

​**Tips**Mesh Sprite 3D model is meshRenderer, Skinned Mesh Sprite 3D model is skinned Mesh Renderer.

######These two classes are mostly common interfaces inherited from the'parent class'. You can see the'parent class'.**BaseRenderer**API ([API地址](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=3D&class=laya.d3.core.render.BaseRender))

Material acquired can be divided into two types:

Self Material**Material**If the material is modified, only the model is displayed to change.

Shared Material**Shared Material**Because the material is relatively independent, multiple models can use the same material. If the material is shared and modified, the model display will change, and the parts of other models that use this material will also change.

! [] (IMG / 1. PNG) < br >! [] (IMG / 2. PNG) < br >

How to use it, developers need to choose according to specific needs.

Here are the excerpts for demodemo（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Material&name=MaterialDemo))

! [] (IMG / 3. PNG) < br > (Figure 3)

> Material Material Acquisition on the Model by a Grid Render


```typescript

//初始化3D场景
var scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
//从场景获取球型精灵
this.sphere = scene.getChildByName("Sphere");
//获取球型精灵自带的BlinnPhong材质
billinMaterial = this.sphere.meshRenderer.material;
```


> After we get the material, we can modify the material or use it for other models. Here we add the material above to the newly created ball:
>


```typescript

//代码创建一个球体
var sphere2 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.5)));
//将创建的球放置在导出球的同一点
this.sphere2.transform.position =  this.sphere.transform.position;
//将创建的球平移
this.sphere2.transform.translate(new Laya.Vector3(0, 1.3, 0),false);
//将从导出球上拿到的材质 贴给代码创建的球
this.sphere2.meshRenderer.material = billinMaterial;
```


Then you can see the effect, as shown in Figure 4.

![] (img/4.png)<br> (Figure 4)

###2. Modify the material on the model

Since we can get the material, we can also change the material.

The same goes for the grid wizard.`meshRenderer`The mesh renderer is modified.


```typescript

......
//创建一个新的PBRStandard材质
this.pbrStandardMaterial = new Laya.PBRStandardMaterial();
//获取新的纹理
this.pbrTexture = Laya.Loader.getRes("res/threeDimen/texture/earth.png");
//为PBRStandard材质设置漫反射贴图
this.pbrStandardMaterial.albedoTexture = this.pbrTexture;
//修改导出球的材质
this.sphere.meshRenderer.material = this.pbrStandardMaterial;
```


![] (img/5.png)<br> (Fig. 5)

###3. Can we accept shadows?

Shadows in front**Lighting chapter**Of**How to add shadows to lights**The section has an introduction.（[地址](https://ldc2.layabox.com/doc/?nav=zh-js-4-6-4)) Only the corresponding properties that need to be set in the material are explained here.

In the renderer class`castShadow`Whether Shadows and Shadows Can Be Produced`receiveShadow`Can you accept shadows?

> The following code comes from an example of Shadows


```typescript

//前面给灯光设置好阴影参数之后，获取猴子模型与地板模型并且分别设置产生阴影与接受阴影
//地面接收阴影
var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh"));
//设置地板可以接受阴影
grid.getChildAt(0).meshRenderer.receiveShadow = true;

//获取一个静态网格猴子
var staticLayaMonkey = this.scene.addChild(new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm")));

//省略调整猴子的代码.....

//设置静态网格猴子产生阴影
staticLayaMonkey.meshRenderer.castShadow = true;

//获取蒙皮网格猴子
var layaMonkey = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"));

//设置蒙皮网格猴子可以产生阴影
layaMonkey.getChildAt(0).getChildAt(0).skinnedMeshRenderer.castShadow = true;
```


![] (img/6.png)<br> (fig. 6)

###4. Material optimization

When loading the scene, the engine merges the objects, which greatly improves the performance of the scene. The merging principle is the same material model, so developers try to use the same material when editing the scene model, and the fewer the better. In this way, the most basic conditions for future performance optimization can be achieved. More specific will be explained in the future performance optimization chapter.