## Material overview of LayaAir3D

### Material Overview

Material is the material texture of objects, such as wood, metal, glass, hair, water, etc., their roughness, gloss, reflection, transparency, color, texture and other material attributes are different.

Most 3D engines have separate material classes for program code control, and material processing is also one of the most important parts of 3D production software. Game developers often have a word, in the 3D game scene production, three points to see the model, seven by the material.

There are many kinds of materials, and there are standard materials, multi-dimensional materials, synthetic materials, double-sided materials, ray tracing materials and so on in 3D production software. In the LayaAir 3D engine, the main support is the standard material StandardMatrial.



### Create standard materials

If the model in the code does not assign material, the texture and texture of the model can not be displayed in the 3D view, only the default is pure white.

In the code from the “ quickStart guide for 3D project” article, we created the standard material, added a texture image to the diffuse map, and assigned it to the model.

```java
	// Create standard materials
	var material:StandardMaterial = new StandardMaterial();
	// Creating 2D texture maps with diffuse reflectance
	material.diffuseTexture = Texture2D.load("res/layabox.png");
	//Assign material to box model
	box.meshRender.material = material;
```

Of course, this is just a simple usage, we just use the most important diffuse reflectance map, to achieve better artistic effect, developers need to know the color of the material and mapping properties.



### Material loading

In “LayaAir3D Model”, we introduce the model, which includes two parts: mesh and material. When loading .ls and.lh data, the model will automatically load the corresponding material.

In the latest engine version, the model grid is separated from the material, and the unity export plug-in tool no longer binds the material to the exported.Lm model file. So if the loading .lm format resources, you will need to give the material to display or display only for white mold.

At this point, you can use the exported .lmat material file, load the creation of standard material and assigned to the model, the way similar to the model load.

```java
// Asynchronously load material files to create standard material (also preloaded).
var material:StandardMaterial = StandardMaterial.load("truck/Assets/Materials/truck.lmat");
// Assign material to box model
box.meshRender.material = material;
```



### Get material from the loaded model

In the above example, we created the standard material, but in the actual project use, we rarely use code to model the material, but directly in the 3D software production or creation of materials in unity, and then use the tool export LayaAir format after use.

When used, the engine will automatically load the material on the model, and many times, a model will have more than the standard material, automatic way for us to save a lot of development time. But in this case, what if we need to change and change the material? We first need to get the current material on the model.

The LayaAir 3D engine gives us the MeshRender class for mesh renderers and SkinnedMeshRender, the skinned animated grid renderer that provides their instances on the visual model, which we can use to get the material on the model.

Tips: MeshRender in MeshSprite3D model, SkinnedMeshRender in SkinnedMeshSprite3D model.

The material is divided into two types, one is the material of Material, if the material is changed, only their own models show changes; one is to share SharedMaterial material, because the material is relatively independent, multiple models can use the same material, if the acquisition is to share and modify the material itself, the model display will change, the other part of the model used in this material will change. Therefore, developers need to choose according to the situation.



#### Get and modify your own material

```java
			// Load exported truck model
			var role3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
			// Model and material loading completed listening and callback
			role3D.on(Event.HIERARCHY_LOADED,null,function():void
			{
				// Get the body model （look at .lh file, two objects in the model, the front“head” and the car "body",, they both use the same material）
				var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
				//Get the material from the model
				var material:StandardMaterial=meshSprite3D.meshRender.material;
				//Modify the reflection color of the material, make the model red
				material.albedo=new Vector4(1,0,0,1);				
			});
			scene.addChild(role3D);
```

After compiling and running, as follows, although the body and the front model are used the same material, but only modify the body's own material is red, does not affect the front (Figure 1).

![图片1](img/1.png)<br>（Picture 1）



#### Get and modify shared material

```java
			//Load derived truck model
			var role3D:Sprite3D=Sprite3D.load("LayaScene_truck/truck.lh");
			//Model and material loading completed listening and callback
			role3D.on(Event.HIERARCHY_LOADED,null,function():void
			{
				//Get the body model （look at .lh file, two objects in the model, the front“head” and the car "body",, they both use the same material）
				var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
				//Get shared material from the model
				var sharedMaterial:StandardMaterial=meshSprite3D.meshRender.sharedMaterial;
				//Modify the reflection color of the material, make the model red
				sharedMaterial.albedo=new Vector4(1,0,0,1);
			});
			scene.addChild(role3D);
```
The compiling and running effect is as follows: after modifying the shared material, the material is changed because the front and body models are used (Figure 2).

![图片2](img/2.png)<br>（Picture 2）



#### Get and modify the list of materials

In 3D production software, there is often a model with multiple materials, which we call multidimensional materials. However, after the tool export data is loaded, the engine will automatically create a model of the material list array materials or sharedMaterials, so when modifying the material, you can use the for cycle or recursive way.

The following code provides methods to obtain and modify material for model or model container sub objects. We directly modify the material for all scene sub objects.

```java
	......
	// Loading scene
	var scene:Scene=Scene.load("LayaScene_loveScene/loveScene.ls");
	// Scene model and material loading complete listening and callback
	role3D.on(Event.HIERARCHY_LOADED,null,function():void
	{
          setModelMaterial(model:*)
     });
 }
/**
*Modify model material
* @param model Scene or model
 */		
private function setModelMaterial(model:*):void
{
  //If model meshes display objects
  if (model is MeshSprite3D) 
  {
    //Acquiring model mesh objects
    var meshSprite3D:MeshSprite3D = model as MeshSprite3D;
    //Modify all the material in the model grid
    for (var m:int = 0; m < meshSprite3D.meshRender.materials.length; m++)
    {
      //Get shared material
      var mat:StandardMaterial = meshSprite3D.meshRender.materials[m] as StandardMaterial;
      //Modify material reflection color
      mat.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //If it is skinning model mesh display object
  if (model is SkinnedMeshSprite3D) 
  {
    //Get skin model mesh display object
    var skinnedMeshSprite3D:SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
    //Modify all of the material in the skin model grid
    for (var n:int = 0; n < skinnedMeshSprite3D.skinnedMeshRender.materials.length; n++)
    {
      //Get shared material
      var mat1:StandardMaterial = skinnedMeshSprite3D.skinnedMeshRender.materials[n] as 				  	StandardMaterial;
      //Modify material reflection color
      mat1.albedo=new Vector4(0.5,0.5,1,1);
    }
  }
  //Recursive method to obtain sub objects
  for (var i:int = 0; i < model._childs.length; i++)  setModelMaterial(model._childs[i]);
}
```

After compiling and running, the effect is as follows (Figure 3), and all the model materials in the scene are added with a layer of blue.

![图片3](img/3.png)<br>（Picture 3）
