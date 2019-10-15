##Material, Light, Color and Mapping of LayaAir3D

###Material Light and Color and Mapping Properties

Standard material attributes are similar to light color attributes of lighting, which are reflected in diffuse reflection, highlight and environmental color attributes, but the material includes more complete and more convenient to adjust the artistic effects of objects, mainly including reflectivity, diffuse reflection color and diffuse reflection mapping, highlight and highlight mapping, environmental color and reflection mapping, normal concave and convex mapping. Let's go through these properties in detail.



####reflectivity

Albedo Color mainly reflects the brightness and color of the material. The higher the value, the brighter the material.

The value of reflectance is a four-dimensional vector. Look at the following code. The four elements in the vector represent red, green, blue and transparent alpha.

Transparent albedo color effect is percentages, 0 is transparent, 1 is opaque. If it needs to be set to translucent or transparent display, only adjusting the reflectance is not enough, but also setting the material's rendering mode as mixed type to achieve the goal (Figure 1).

Modify the code in the Quick Open 3D Tour course to get the effect of Figure 1 as follows:


```java

	//创建标准材质
	var material:BlinnPhongMaterial = new BlinnPhongMaterial();
	//创建漫反射二维纹理贴图
    Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
  		material.albedoTexture = text;
    }));
	//只有设置了渲染模式为透明混合类型才能达到透明效果
	//设置材质蓝色染色及30%半透明
	material.albedoColor=new Vector4(1,1,1,0.3);
	//渲染模式(也可设置数值，5-13等为混合类型，可观察其效果变化)
	material.renderMode =BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
	//为box模型赋材质
	box.meshRenderer.material = material;
```


![图片1](img/1.png)<br>（图1）反射率染色与透明  







####Diffuse Reflective Color and Diffuse Reflective Mapping

The albedo color refers to the single color of the material itself, which can be called the inherent color of the object in the art industry. The albedo texture refers to the inherent texture images of materials, such as wood texture images, brick wall texture images.

The most frequently used in the game is diffuse mapping. The most workload in the game art mapping is diffuse mapping, which can basically reflect the basic texture of objects.

Diffuse reflection color and mapping can also be mixed in LayaAir 3D engine. They have a fusion effect. Diffuse reflection color can dye the illumination surface of the model (the backlight surface will not change). It is similar to the diffuse light source color of the lamp, and produces a more holistic hue (Figure 2).

Modify the code in "Quick Open 3D Tour" course as follows, create a blue diffuse reflection color, bluer by the light surface, see (Figure 2) effect:


```java

	//添加方向光（灯光色会与材质色融合，因此改灯光色为黑白灰色，且不能曝光过度）
	var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	directionLight.color = new Vector3(0.6, 0.6, 0.6);
	directionLight.transform.worldMatrix.setForward(new Vector3(10, -10, 0));
	scene.ambientColor = new Vector3(0.5,0.5,0.5);

	//创建标准材质
	var material:BlinnPhongMaterial = new BlinnPhongMaterial();
 	//创建漫反射二维纹理贴图
Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
	material.albedoTexture = text;
	//设置材质漫反射颜色
	material.albedoColor = new Vector4(0.5,0.5,2,1);
}));
	//为box模型赋材质
	box.meshRenderer.material = material;
```


![图片2](img/2.png)<br> (Figure 2) Diffuse reflection color and texture mixing



####Highlight color and highlight mapping

Specular color is the same as that of light. It refers to the high-light color produced at the corner of the model object or at the light source.

The highlights on the model are affected by both the light and material highlights. If the highlights without light or light are black, the highlights on the model will not appear even if the highlights and highlights are mapped on the material.

Specular Texture is a 2D texture image. The pixel color in the image represents the highlight color and brightness of the corresponding model. The brighter the pixel color is, the brighter the model at the pixel is.

Of course, high-light color and high-light mapping can be used at the same time, the effect may be better, developers can repeatedly test, adjust the desired effect.

Modify the code in "Quick Open 3D Tour" course, load a truck in the scene, observe the use of highlight, highlight mapping, and compare it with the default use of only light highlight, the code is as follows


```java


  //获取模型
  var meshSprite3D:MeshSprite3D=role3D.getChildAt(0).getChildAt(0) as MeshSprite3D;
  //从模型上获取共享材质
  var sharedMaterial:BlinnPhongMaterial = meshSprite3D.meshRenderer.sharedMaterial
  //修改材质的高光颜色，让高光处偏红
  sharedMaterial.specularColor = new Vector4(1,0,0,1);
  //加载高光贴图（与漫反射一致，也可单独制作高光贴图）
  Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
      sharedMaterial.specularTexture = text;
  }));
```

Compiling the above code, (Figure 3) using material highlight color and highlight mapping, the effect is better. (Fig. 4) The default white highlight of the light is used only, and the effect is general.

![图片3](img/3.png)<br>（图3）



![图片4](img/4.png)<br> (Figure 4)



####Environmental color

Ambient Color (ambient color) is a color fusion dyeing of the material in the scene, which makes the material tend to a certain color tone. At the same time, it can brighten the material, simulate the sky tone and light intensity.

Modify the code in the Quick Open 3D Tour course as follows (Fig. 6):


```java

//添加3D场景
var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;
//设置环境色，提亮模型
scene.ambientColor = new Vector3(0.5,0.5,0.5);
```


![图片5](img/5.png)<br> (Fig. 5) Scene without ambient color under fixed light

![图片6](img/6.png)<br> (Fig. 6) Under fixed lighting, the scene is brightened with ambient color.



####Reflection Mapping

Custom Reflection. We usually use a set of box texture mapping TextureCube, which wraps the whole model and simulates the effect of the surrounding environment reflected on the model.

Reflective mapping display effect is also related to albedoColor, renderMode rendering mode.

Rendering mode must be changed to double-sided opacity to display the Reflective Map (RENDERMODE_OPAQUE).

The higher the albedoColor value, the smaller the reflection mapping effect and the stronger the diffuse reflection mapping effect. It can be adjusted according to the actual model material effect, such as water surface, mirror surface and metal surface, which can adjust different reflectivity to meet the demand.

Modify the code in the "Quick Open 3D Tour" course as follows. To better observe the reflection effect, use a spherical model. After operation, the effect can be obtained (Figure 7):


```java

//添加方向光
var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
directionLight.color = new Vector3(0.6, 0.6, 0.6);
directionLight.transform.worldMatrix.setForward(new Vector3(0, -100, 0));
//设置场景的环境光颜色
scene.ambientColor = new Vector3(0.5,0.5,0.5);
//创建一个球
var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh(1)))as MeshSprite3D;
	sphere.transform.translate(new Vector3(0,1,-3))
	Laya.timer.loop(10,this,function():void{
		sphere.transform.rotate(new Vector3(0,1,0),true,false)
	});
//创建材质
var material:PBRSpecularMaterial = new PBRSpecularMaterial();
//创建漫反射二维纹理贴图
Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
				material.albedoTexture = text;
			})); 	
//获取反射贴图（用立方体全视角贴图进行赋值（类似于360全景包裹））
TextureCube.load("h5/LayaScene_test/Assets/1v1Scene/NewCubemap.ltc",Handler.create(this,function(cube:TextureCube):void{
		//设置反射贴图
		scene.customReflection = cube;
		//设置反射贴图的反射率
		scene.reflectionIntensity = 1;
	}));
//设置渲染模式为不透明（否则无法显示反射贴图）
material.renderMode =PBRSpecularMaterial.RENDERMODE_OPAQUE
//降低材质的反射率，加强反射贴图反射
material.albedoColor=new Vector4(0.1,0.1,0.1,0);

//为模型赋材质
sphere.meshRenderer.material = material;
```


![图片7](img/7.png)<br> (Figure 7) Reflective mapping



####normal map

Normal Texture plays a very important role in 3D. The precision of model performance is mainly affected by normal texture. It can simulate the details of high-precision and high-area models, and greatly improve the quality of game pictures. Of course, if normal mapping is used, the performance requirements of hardware will be improved accordingly.

Normal mapping is provided for art designers. They make it by two methods. One is the normal mapping of High-Model baking low-model using in 3D production software. The other is the normal mapping of diffuse reflection mapping transformed into normal mapping through some tools. The workload is small, but the effect is slightly worse than that of baking method. The normal mapping effect is shown in Figure 8. It is converted from diffuse reflection mapping.

![图片8](img/8.png)<br>（图8） 




If you need to use normal mapping in the development process, you should pay attention to the following issues:

1. Normal mapping has certain requirements for model data, if there is no tangent information on the model, it will not produce the effect of normal concave and convex. For example, the various Mesh mesh types BoxMesh, Sphere Mesh, Cylinder Mesh included in LayaAir 3D engine do not have tangent information, even if normal mapping is used, they will not show concave and convex in the view.

2. If you need to use normal mapping, and the model is exported through the unit plug-in of LayaAir, you should be careful not to check the "ignore tangent" option when setting up Mesh Setting grid, such as (Figure 9).

![图片9](img/9.png)<br> (Figure 9)

3. If normal mapping is needed, lighting must be used in game scenes, otherwise the model will not produce concave and convex effect.



We create a Cube model from Unity3D (the model created in Unity has tangent information), assign diffuse reflection map and normal map, then export data with LayaAir plug-in and use it. Normal map will also be automatically loaded into the model. Modify the code in "Quick Open 3D Tour" course as follows. After compiling and running, see the concave and convex effect (Figure 10).


```java

//创建unity中导出的场景
Scene3D.load("h5/LayaScene_test_Light/test_Light.ls",Handler.create(this,function(s:Scene3D):void{
	var scene:Scene3D = Laya.stage.addChild(s)as Scene3D;
	//也可以代码加载法线贴图
	//从模型中获取meshSprite3D对像
	//var meshSprite3D:MeshSprite3D=s.getChildByName("Cube") as MeshSprite3D;
	//获取模型的材质实例
    //var material:PBRSpecularMaterial=meshSprite3D.meshRenderer.material as PBRSpecularMaterial;
    //为材质添加法线贴图
 //Texture2D.load("layaScene_box/Assets/texture/layabox_normal.png",Handler.create(this,function(text:Texture2D):void{
    //material.normalTexture= text;
// }));
}));
			
```


![图片10](img/10.png)<br> (Fig. 10) Normal mapping



###Exported Material File. lmat Modification

Through the understanding of the material properties of light and color and mapping, we understand how to modify the material properties and mapping of objects through code, flexible to control the desired effect.

However, at present, the effect of art is basically achieved through the unit editor, and then export data for use. Because LayaAir 3D engine is being perfected at present, and because of the characteristics of H5 game engine, it can not completely include all material types and attributes in unit, so the effect in unit will be different from that in actual game.

In future versions, we will use plug-ins to create a dedicated LayaAir standard material in Unity for developers to use, so that the effect of the art produced in Unity is exactly the same as that of the game, which is convenient for developers to use.

So during the waiting period, how can we modify and achieve some artistic effects? In Unity, every material will generate. lmat file when it is exported. We can modify the material. lmat file to adjust the art effect.

For example, we use the following code to load a scene, and then use the lighting settings to achieve the night effect (Figure 11).


```java

Scene3D.load("h5/LayaScene_test_Light/test_Light.ls",Handler.create(this,function(s:Scene3D):void{
	var scene:Scene3D = Laya.stage.addChild(s)as Scene3D;
	//设置环境光偏暗蓝色
	scene.ambientColor = new Vector3(0.2,0.2,1);

    //获取场景灯光
	var light:DirectionLight = scene.getChildByName("Directional light") as DirectionLight;
	//设置灯光光偏暗
	light.color = new Vector3(0.5,0.5,0.5);
}));

```

![图片11](img/11.png)<br> (Figure 11)

According to the figure above, if you need to change the "Love" model into the brightness of the light box, it is relatively difficult to modify the corresponding material file by code. lmat, open the material file to observe, you can find that the material file is stored in a variety of light color attributes and maps (Figure 12). We modify the environmental light color of the cover material to "1.5, 1.2, 1.2", brush. The effect can be seen in the new web page file, and the model brightens up to achieve the effect of the light box (Figure 13).

![图片12](img/12.png)<br> (Figure 12)

![图片13](img/13.png)<br> (Figure 13)

Through the above methods, we can adjust the various material attributes in the scene to achieve the desired effect of art. Of course, we are looking forward to the LayaAir exclusive material in Unity, editing directly in Unity and the final effect of the game.

