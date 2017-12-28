## QuickStart guide for 3D project 

We will start a 3D project quickly with LayaAir engine, and use AS language as a tutorial, simply demonstrate the implementation of a basic 3D application with engine code.

### IDE creates a 3D sample project

Download LayaAirIDE, start the new project, select the 3D project, as shown in the figure.![1](img/1.png)<br>（Picture 1）

Here we choose the Actionscript3.0 language. Created and we found that ide created a template for 3D for us. About the structure of the project, developers can refer to the 2D novice tutorial. This is not going to go into details

We directly F5 (the MAC system user may want cmd+F5) or click the run button, and we can see that the debug window creates a cube.![2](img/2.png)<br>（Picture 2）

LayaAir3D.as this startup class for us to build a 3D world. And add a few elements necessary for a simple 3D world (scene, camera, light source, 3D model, material). We will introduce these concepts in detail, and gradually lead you to learn 3D knowledge.

For this simple point of demo, we find that this cube is static, and can't bring us the stereoscopic vision of what we see, that's what we get, then we add a few lines of code to 3D. Move it. First find the start class LayaAir3D.as, modified into the following class. Developers can paste directly into their own projects.

```java
package {
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	import laya.d3.resource.Texture2D;
	public class LayaAir3D {
		
		public function LayaAir3D() {

			// Initialize the engine
			Laya3D.init(0, 0,true);
			
			// Adaptation screen mode
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			// Turn on statistics
			Stat.show();
			
			//Add 3D scene---------------------------------
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			
			//Add camera---------------------------------
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
            //Set the camera position
			camera.transform.translate(new Vector3(0, 3, 3));
          	//Rotate camera direction (angle)
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
          	//Set the background color
			camera.clearColor = null;

			//Add parallel light----------------------------------
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
            //Light color of the environment
			directionLight.ambientColor = new Vector3(0.6, 0.6, 0.6);
          	//High light color
			directionLight.specularColor = new Vector3(0.6, 0.6, 0.6);
          	// Diffuse color
			directionLight.diffuseColor = new Vector3(1.6, 1.6, 1.6);
          	//Light direction (radian)
			directionLight.direction = new Vector3(1, -1, 0);

			//Add a custom model------------------------------
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
          	//Model rotation direction
			box.transform.rotate(new Vector3(0,45,0),false,false);
          	//Material to create the model
			var material:StandardMaterial = new StandardMaterial();
          	//Material diffuse texture
			material.diffuseTexture = Texture2D.load("res/layabox.png");
          	//Give the model material
			box.meshRender.material = material;
          
            //Here we add the logic of rotation---------------------------------------
          	//Rotation direction and angle setting
			var vect:Vector3 = new Vector3(1,1,0);
          	//Spin once every 10 milliseconds
			Laya.timer.loop(10,null,function():void{
				box.transform.rotate(vect,true,false)
			})
		}
	}
}
```

![3](img/3.gif)<br>（Picture 3）

Here we use a timer, every 10ms drive this cube rotation under a specific explanation please developers to read the related tutorials and API,  where we are just a simple demo, a simple code as follows:

```java
            var vect:Vector3 = new Vector3(1,1,0);
			Laya.timer.loop(10,null,function():void{
				box.transform.rotate(vect,true,false)
			})	
```

So we've been able to run through a simple example and drive the cube to rotate (Figure 3).



### The basic structure of LayaAir 3D world

Through the code example above, we can see that a basic 3D world was made. Of course, the code is relatively simple, to make a colorful game world, we also need to understand more functions of the engine.

Figure 4 is the world visible factor view of LayaAir 3D. In addition to 3D scenes, cameras, lights, and models, animation is also one of the elements that can be displayed. We will introduce you later in the course.

![图片4.png](img/4.png)（Picture 4）



### 3D world transformation and vector simple use

In this example, create a display of several elements module, but we also saw use of the vector Vector3 or Vector4 in the camera, lighting, model, use them to object position,  orientation, color assignment.

#### Coordinate system and position, rotation modification

In the 2D engine, we directly adjust the X and Y coordinates to control the position and rotation direction of the display object. The display object in the 3D engine is more complex, and the Z axis is added, so we use the Vector3 3D vector uses its values to represent x, y, and Z respectively.

However, the definitions of coordinates in different 3D engines and 3D model animation software are different, so beginners need to master the differences between them.

LayaAir 3D engine coordinates rules into **`right-hand coordinate system`**（Figure 5）, simply the right side of the screen is the positive X-axis direction, the top is the Y-axis direction, the direction of the screen to the observer is positive Z-axis. Some 3D engine belongs to the left-handed coordinate system, this is not for introduction, interested beginners can research on Internet.

![图片5.png](img/5.png)<br>（Picture 5）right hand coordinate system



The engine is also divided into a world coordinate system and a local coordinate system. The world coordinate system is the coordinate of a 3D scene, and the three-axis direction is always unchanged (Figure 5). The local coordinates are the coordinates of the model itself and can change as the model's orientation changes. However, we can identify the direction of the coordinates by using the right hand gesture (Figure 6). The hand model in the figure below is rotated by -90 degrees along the y-axis 3D model of the right-hand coordinate system local coordinates, the thumb is always the local coordinate of the positive X-axis direction.

![图片6.png](img/6.png)<br>（picture 6）

Understand the above coordinate system, then you can change them through the 3D transform, in the sample code, transform is a 3D transform object (Transform3D), it is very important in the 3D world, the code for a lot of changes in the logic of the display object will control Use it.

In code, we use the translation and the rotation method in the 3D transform, and represent the values of X, y and Z with 3D vectors. At the same time, the two methods can be set in the parameter space, whether it is local mobile rotation, beginners can be set in the program, observe the movement and rotation of what is different.

```java
            //Position of mobile camera
			camera.transform.translate(new Vector3(0, 3, 3));
          	//Rotate camera direction (angle)
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```

![图片7.png](img/7.png)<br>（Picture 7）

Above Transform3D API mobile, rotation method description, of course, transform the object there are many properties and methods, we will explain in the future examples.



#### The use of vectors

Vectors are used very often in the LayaAir 3D engine, and they are visible everywhere from 2D vectors to 4D vectors. The most basic usage is used in this example for assignment.

3D objects in the code of the movement, rotation, scaling and other transformation with three-dimensional vector as its x, y, z axis coordinate assignment.

So in a variety of colors of light on the attribute assignment, the value of three-dimensional vector representing the R, G, B in three colors, namely red, green and blue. In LayaAir 3D engine,  the maximum value of three color is 1, is set up according to the percentage of the whole way, the greater the value, the more color the color is bright, dark, if the value exceeds 1 will produce exposure effect.

As for the red, green and blue can be combined into what kind of color, beginners can learn from the game art designers advice, such as red and green to yellow, red and blue to purple and so on, generally in the process of project development. In order to test the effect, programmers need to adjust the color values repeatedly.

The following code in the example uses a vector as a color assignment:

```java
            //Light color of the environment
			directionLight.ambientColor = new Vector3(0.6, 0.6, 0.6);
          	//High light color
			directionLight.specularColor = new Vector3(0.6, 0.6, 0.6);
          	//Diffuse color of light
			directionLight.diffuseColor = new Vector3(1.6, 1.6, 1.6);
```

In the project, there are many more complicated usage, need to use the vector to make some math operation, this course is regarded as introductory course, do not introduce much at this moment.

