##Quickly start a 3D project

Below we will use the LayaAir engine to quickly start a 3D project, and use AS language as a tutorial, a simple demonstration using engine code to achieve a basic 3D application.

###IDE Creates 3D Sample Projects

Download LayaAirIDE, start a new project, select a 3D project as shown in the figure.

![1](img/1.png)<br> (Fig. 1)

Here we choose ActionScript 3.0. After the creation, we found that ide created a 3D template for us. Developers can refer to 2D novice tutorials for project structure introduction. I'm not going to elaborate here.

We can see that the debug window creates a cube by directly clicking F5 (cmd + F5 for MAC system users) or by clicking the run button.

![2](img/2.png)<br> (Figure 2)

LayaAir3D. as is a startup class that constructs a 3D world for us. It also adds several elements necessary for a simple 3D world (scenes, cameras, light sources, 3D models, materials). Follow-up tutorials on these concepts will be introduced in detail, gradually leading you to learn 3D knowledge.

For this simple demo, we find that the cube is static and does not give us the 3D visual sense of WYSIWYG, so we add a few lines of code to make him rotate. First, find the startup class LayaAir3D. as and modify it to the following class. Developers can paste directly into their projects.


```java

package {
	/*
	*@author wenqiang
	*/
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.utils.Handler;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.core.scene.Scene3D;
	import laya.d3.core.material.BlinnPhongMaterial;
	import laya.webgl.resource.Texture2D;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);

			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();

			//添加3D场景
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

			//添加照相机
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄影机位置
			camera.transform.translate(new Vector3(0, 3, 3));
			//旋转摄影机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;
			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
             //灯光的漫反射颜色
			directionLight.diffuseColor = new Vector3(0.6, 0.6, 0.6);
             //灯光的方向（弧度）
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
			//添加自定义模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			//模型旋转方向
			box.transform.rotate(new Vector3(0,45,0),false,false);
			//给自定义的模型创建一个材质球
			box.meshRenderer.material = new BlinnPhongMaterial;
			//创建材质
			var material:BlinnPhongMaterial = new BlinnPhongMaterial();
			//加载材质的漫反射贴图
			Texture2D.load("h5/res/layabox.png", Handler.create(null, function(tex:Texture2D):void {
				//得到返回的Texture2D添加给材质球
				material.albedoTexture = tex;
			}));
			//给模型附上材质
			box.meshRenderer.material = material;
			//这里我们添加旋转逻辑
			var vect:Vector3 = new Vector3(1,1,0);
			//利用时间循环每10毫秒旋转一次
			Laya.timer.loop(10,null,function ():void{
				box.transform.rotate(vect,true,false);
			})
		}		
	}
}
```




![3](img/3.gif)<br> (Figure 3)

Here we use a timer, every 10ms to drive the cube to rotate a bit, specific instructions for developers to read the relevant tutorials and apis, here we are just a simple demonstration, simple code as follows:


```java

            var vect:Vector3 = new Vector3(1,1,0);
			Laya.timer.loop(10,null,function():void{
				box.transform.rotate(vect,true,false)
			})	
```


So far we have been able to run through a simple example and drive the cube to rotate (Figure 3).



###The basic structure of layaair 3D world

From the above code example, we can see that a basic 3D world was born. Of course, the above code is relatively simple, to make a rich and colorful game world, we need to know more about the engine functions.

Figure 4 shows the LayaAir 3D World Visible Elements View. In addition to 3D scenes, cameras, lights and models, animation is also one of the display elements. Later courses will be introduced to you step by step.

![图片4.png](img/4.png)(Fig. 4)



###3D world transformation and simple application of vector

In the example above, we created several key elements modules about display, but we also saw that vector Vector 3 or Vector 4 were used in camera, lighting, model, etc. to assign position, direction, color and so on.

####Modification of coordinate system, position and rotation

In the 2D engine, we directly adjust the X and Y coordinates to control the position and rotation direction of the display object. In the 3D engine, the display object is more complex, and Z axis coordinates are added. So we use Vector 3 three-dimensional vector to represent x, y and Z respectively.

However, the definitions of coordinate directions in various 3D engine and 3D model animation software will be different, so beginners need to master their differences.

LayaAir 3D engine coordinates in technical terms belong to**`右手坐标系`**(Fig. 5). Simply speaking, the right side of the screen is in the positive X-axis direction, the upper side is in the positive Y-axis direction, and the screen is in the positive Z-axis direction to the viewer (the rear direction of the screen is in the negative Z-axis direction). Some 3D engines belong to the left-hand coordinate system, which is not introduced here. Interested beginners can learn from Baidu.

![图片5.png](img/5.png)<br> (Fig. 5) Right-handed coordinate system



The engine is also divided into the world coordinate system and the local coordinate system. The world coordinate system is the coordinate of the 3D scene, and the direction of the three axes will never change (Fig. 5). Local coordinates are the coordinates of the model itself, which can be changed with the rotation of the direction of the model, but we can recognize the coordinate direction by right-hand coordinate gesture (Fig. 6). The hand model in the following figure is the local coordinates of the right-hand coordinate system of the 3D model after rotating along the y-axis to 90 degrees, and the thumb is always the positive X-axis direction of the local coordinates.

![图片6.png](img/6.png)<br> (Fig. 6)

Understanding the above coordinate systems, then you can change them through 3D transformation. In the sample code, transform is a 3D transformation object (Transform 3D), which is very important in the 3D world. It is used in many change logic control codes about display objects.

In the code, we use translat movement and rotate rotation methods in 3D transformation, and use three-dimensional vectors to represent the values of x, y and Z. At the same time, both methods can be set in the parameters whether the local space movement, rotation, beginners can be set in the program to observe the difference between movement and rotation.


```java

            //移动摄像机位置
			camera.transform.translate(new Vector3(0, 3, 3));
          	//旋转摄像机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```


![图片7.png](img/7.png)<br> (Figure 7)

Above is the description of moving and rotating methods in API of Transform 3D. Of course, there are many attributes and methods for transforming objects. We will explain them step by step in future examples.



####The Use of Vectors

Vectors are frequently used in LayaAir 3D engines, and they can be seen everywhere from two-dimensional vectors to four-dimensional vectors. The most basic use is for assignment in this example.

The transformation of moving, rotating and scaling of 3D objects in the code uses three-dimensional vectors as its x, y and Z axis coordinates.

Then on the assignment of various color attributes of light, the values in the three-dimensional vector represent R, G and B respectively. They are red, green and blue. In LayaAir 3D engine, the maximum value of the three colors is 1, which is set by percentage. The larger the overall value, the brighter the color, the darker the color. If the value exceeds 1, the exposure effect will be produced.

As for the color of red, green and blue, beginners can consult and learn from game art designers, such as red plus green for yellow, red plus blue for purple and so on. Generally, in the process of project development, programmers need to adjust color values repeatedly to test good results.

In the example, the following code uses vectors as color assignments:


```java

             //灯光的漫反射颜色
			directionLight.diffuseColor = new Vector3(0.6, 0.6, 0.6);
             //灯光的方向（弧度）
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
```


In the project, there are many more complex uses, which need to use vectors to do some mathematical operations. As an introductory course, this course will not be introduced here for the time being.

