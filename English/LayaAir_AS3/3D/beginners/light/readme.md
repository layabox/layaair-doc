## LayaAir3D之光源

Lighting is very important in the 3D world. 3D objects produce three-dimensional light and shade change, color hue change, projection and so on, which can be used in lighting settings.

## Lighting category

There are many kinds of lights. Different light sources have different effects, and different parameters can be set. In the 3D project created by IDE, we can modify the code to see the different types of lighting effects.

### Light (PointLight)

Point light is the light source that emits light from all directions, also known as omnidirectional or spherical light. In reality, point light sources, such as light bulbs and candles, can sense that the light source is of intensity, color and attenuation radius.

```java
	//创建点光
	var light:PointLight = scene.addChild(new PointLight()) as PointLight;
	//移动灯光位置
	light.transform.translate(new Vector3(-3,5,0));
	//设置点光照亮范围
	light.range=6;
	//设置点光的衰减
	light.attenuation = new Vector3(0.01,.01,.03);
```
Range to set the scope of the point light source, the radiation range equivalent to a point of light, the greater the value, the greater the illumination range, in Figure 1 by the illumination range setting is therefore not to be light where the black figure 2 light beyond the light and model distance, so all is light.


![图片1](img/1.png)（图1）  ![图片2](img/2.png)（图2）

In order to set the point light source attenuation, the smaller the attenuation value, the less attenuation, so the brightness of the object in the light range is higher.




### Parallel light (DirectionLight)

Parallel light is different from point light. It has a fixed direction, can be set by radian value, and there is no attenuation and illumination range. It will illuminate all the models in the whole scene. The 3D world is often used to simulate the fixed direction of the sun.

```java
	//创建平行光
	var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
	//设置平行光的方向
	light.direction = new Vector3(0.5, -1, 0);
```

Direction is the direction of parallel light, representing the direction on the axis of X, y and Z respectively, negative number is negative axis, positive number is positive axis, the range of value is -1 - 0 - 1, beyond the range is -1 or 1, beginners can set the value in this range to observe the change of direction.



### spotlight (SpotLight)

Focus refers to the direction of light emitted from a specific light, such as a flashlight, stage lights and. The illumination area gradually enlarges according to the distance factor, and the edge of the illumination region also has attenuation phenomenon.

```java
	//添加聚光
	var light:SpotLight=scene.addChild(new SpotLight()) as SpotLight;
	//设置聚光的位置
	light.transform.position=new Vector3(0,5,0)
	//设置聚光的衰减
	light.attenuation = new Vector3(0.1, 0, 0.1);
	//设置聚光的方向
	light.direction=new Vector3(0, -1, 0);
	//设置聚光范围
	light.range=5;
	//设置聚光值
	light.spot=5;
```

attenuation The focus attenuation, the smaller the set value, the smaller the concentration aperture blur, and the greater the aperture.

direction Concentration, and the setting of the direction is consistent with the parallel light.

range Similar to the point light, the difference is only the direction of the spotlight, and the point light has no direction.

spot For the concentration value, the smaller the value, the stronger the light, the weaker the contrast. The concentration in Figure 3 is 5, and the concentration value in Figure 4 is 50. The developer can adjust himself according to the demand.

![图片3](img/3.png)（图3）  ![图片4](img/4.png)（Picture 4）



## Light color elements

All the 3D models in the light range will have an impact when lights are used in the scene, and the lights in the LayaAir 3D engine include the following features to adjust the brightness, color, etc. in the scene.

### Environmental color(ambientColor)

Environment color can simply understand the atmosphere of the scene color. For the model in the scene, the bright and dark surfaces of the model will be affected by the environmental color at the same time. The brighter the ambient color is, the higher the overall brightness of the model is. Of course, the environment is also commonly used in color tone processing, through the whole environment colors red orange yellow green blue purple atmosphere etc..

The code setting environment is as follows: Yellow environment light is generated, and the model is covered with a layer of yellow (Figure 5).

Before the course we introduced the three-dimensional vector can be used to set the color values, we again look at the vector of three elements in representing the red, green and blue color, which combined the myriads of changes color, the highest value of each color is more than 1, will produce the exposure effect.

```java
//设置灯光的环境色为纯黄色（计算机中，红+绿=黄）
light.ambientColor = new Vector3(1,1,0);
```

![图片5](img/5.png)（图5）  



### Diffuse reflectance color (diffuseColor)

Also known as the light source color, the light is affected by the brightness and color of the model affected by the light, such as the simulation of candle light, the color of the light source can be adjusted yellow, then the model will be added yellow color by the smooth surface.

The following code, we set the light source color is pure red, then the model will be affected by the light part of the red impact, because we set the environment before the yellow light, so the smooth surface is red + Yellow + orange color mixing (Figure 6).

```java
//设置灯光的漫反射色为纯红色
light.ambientColor = new Vector3(1,0,0);
```

![图片6](img/6.png)（Picture 6） 

Turn off the ambient light, and we can see (Figure 7) the effect, because without the Yellow environmental color, the light of the model is all turned into a light source color. Therefore, in the process of project development, we have to take into account the mixed effects of various light color attributes of lighting.

![图片7](img/7.png)（图7） 



### Highlight color (specularColor)

For the model, in the direction of the light source, and the angle is more sharp, smooth place will produce high light, high light brightness and color can be adjusted by the high light color of the light, the default high light color is pure white.

There are two ways to adjust the high light color of the model, one is to set the dimming color on the light, the other is to set up the high light map on the material, most of which are directly on the material to adjust the high light color, processing is more convenient, the effect is more realistic.

Because the box model does not produce high light, we observe it with a smoother sphere model. In Figure 8-1, there is no high light color in the code, and the engine defaults to pure white, so the white dimming is shown. In the following code, we set the high light color to blue, and in Figure 8-2 we can see clearly that the blue light is generated on the sphere, because it is purple with the addition of diffuse red.

```java
//设置高光颜色为蓝
light.specularColor = new Vector3(0.5,0.5,1);
```

![图片8-1](img/8-1.png)（图8-1） ![图片8-2](img/8-2.png)（图8-2） 



### Projection (shadow)

The projection is the immediate shadow produced by the illumination model, and can change with the angle of light, the intensity of light, the position of model, etc.. Projection is one of the most important factors in the 3D world, which can produce a more intense three-dimensional feeling.

Real time shadows are very poor, and can't be used too much, especially in the game scene. The model is large. Generally, we don't use the real-time projection, and use the static light map.

To make projection in the scene, we need to know the following properties of the light：

**shadow：** Do you want to open the projection, Boolean, and set it to true to take effect.

**shadowDistance：** The range of projection is the distance from the camera to the model, and the unit is the meter. Beyond this range, the model will not accept projection and projection, and developers can set it according to the size of the scene.

**shadowResolution：** The quality of projection, through numerical setting quality, the greater the value, the higher the projection quality, the performance loss will also be heightened. The quality value of the projection is set at 2 N power, the default is 512, and can be set to 1024, 2048, etc...



It is not enough to just open and set the light property, and the projection attributes need to be modified on the model, respectively:

**receiveShadow：** Whether the projection is accepted, when the model is true, the light is projected according to the location of the model, the shape of the model grid, and the angle of the light, and then projections are generated on other models. For example, the role of the scene, NPC and other active game elements can open this property.

**castShadow：** Whether the projection is generated, and when the model is true, the projected projection is displayed on this model. In the game, we can set the ground of the scene, and the model castShadow attribute in the moving area in the scene to set to true.

To well understand the projection, we use parallel light in the following example code, and create the box box model and the sphere sphere model loaded into the scene. The sphere is used to receive shadows, and the projection is generated on the box.

```java
package {
	
	import laya.d3.core.BaseCamera;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.d3.resource.models.SphereMesh;
	import laya.display.Stage;
	import laya.utils.Stat;

	public class LayaAir3D 
    {
		public function LayaAir3D()
        {
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();
			
			//添加3D场景
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			 
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			var camera:Camera = new Camera( 0, 0.1, 100);
			//加载到场景
			scene.addChild(camera);
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 4, 8));
			//旋转摄像机角度
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			
			//创建方向光
		    var light:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
		    //移动灯光位置
		    light.transform.translate(new Vector3(0,5,0));
			//设置灯光方向
		    light.direction = new Vector3(0.3, -1, 0);
		    //设置灯光环境色
//		    light.ambientColor = new Vector3(1, 1, 0); 
			//设置灯光漫反射颜色
			light.diffuseColor = new Vector3(1, 0, 0);
			//设置灯光高光色
		    light.specularColor = new Vector3(0, 0.5, 0.5);

		 
		    //添加灯光投影
		    light.shadow=true;
			//产生投影的范围（如过小将不会产生投影）
		    light.shadowDistance=45;
          	//生成阴影贴图数量
			light.shadowPSSMCount = 1;
			//模糊等级,越大越高,效果更好，更耗性能
          	light.shadowPCFType=1;
			//投影质量
		    light.shadowResolution=2048;

			 
			//创建盒子模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1.5,1.5,1.5))) as MeshSprite3D;
			//自身y座标旋转
			box.transform.rotate(new Vector3(0,45,0),true,false);
			//接受阴影
			box.meshRender.receiveShadow=true;
			
			//创建球体模型
			var sphere:MeshSprite3D = scene.addChild(new MeshSprite3D(new SphereMesh())) as MeshSprite3D;
			//按父空间移动球体
			sphere.transform.translate(new Vector3(0,1.5,0),false);
			//产生阴影
			sphere.meshRender.castShadow=true;
			
			//创建材质
			var material:StandardMaterial = new StandardMaterial();
			//材质加载漫反射贴图
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			//为模型赋材质（单个材质可赋给多个模型）
			sphere.meshRender.material = material;
			box.meshRender.material = material;
		}		
	}
}
```



![图片9](img/9.png)（图9）  ![图片10](img/10.png)（Picture 10） 

The above two diagram is the effect of opening before and after the projection. Attention should be paid to the above mentioned attributes in the light and model, and the shadow can not be produced without any link.

