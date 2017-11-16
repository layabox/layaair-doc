## LayaAir3D Camera

The camera in LayaAir can be understood as a camera for shooting movies or TV dramas, capturing 3D world pictures and then presenting them to the screen. At the same time, the LayaAir 3D engine also adds VR cameras, developers can use it to develop VR stereo applications or games.

Of course, there are other important properties of the camera, and the following will be introduced its function.

### Camera movement and rotation

The camera inherits from Sprite3D, so it can also be 3D transform operation, through the transform property in the 3D scene to move the rotation change, multi-angle viewfinder, the audience or the player get a more realistic space experience.

Set the camera's rotation:

```java
// Instantiate a camera, set the aspect ratio, 0 for automatic matching. 0.1 recently seen distance, 100 farthest seen distance.
var camera:Camera = new Camera(0, 0.1, 100)
// Move the camera to set the camera to move 3 meters to the z-axis. true represents the local coordinates, false is the relative world coordinates. 
camera.transform.translate(new Vector3(0, 0, 3),false);
// Load to scene
scene.addChild(camera);
```
Set the camera's rotation

```java
// Euler rotation camera. Local coordinate, radian system (false angle system).
camera.transform.rotate(new Vector3(0, 0, 3), true, true);
```



### Orthogonal projection and perspective projection of camera

When we observe the world, see is a "near the small" perspective of the world, in the 3D engine, in order to better simulate the human eye can see the world, the default camera with a "projection" effect.

![图片1](img/1.png)<br> (Figure 1) default perspective projection

But there is a big part of the game, especially the 2D and 3D mixed game oblique angle of 45 degrees, the game screen is not with the perspective effect, so this time, we need to set the camera to the orthogonal projection, so it doesn't produce much smaller near the perspective effect.

```javascript
	//Orthographic Projection Properties setting
	camera.orthographicProjection = true;
	//Orthogonal vertical matrix distance to control 3D object distance and display size
	camera.orthographicVerticalSize = 7;
	//Move the camera position
	camera.transform.translate(new Vector3(0, 26.5, 45));
	//Angle of rotating camera
	camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```

![图片2](img/2.png)<br> (Figure 2) orthogonal projection



### Camera cropping and field of vision

**Clipping distance**

The camera can also set the distance between the crop, showing only the distance between the scene model, the model does not render outside the display. Its biggest advantage is to improve the performance of the game.

When creating a camera, the camera constructor will cut it by default at a distance of 0.3 meters and a distance of 1000 meters (Figure 1). Developers can set in the constructor or set via 

camera properties.


![图片3](img/3.png)<br>（Picture 3）

```javascript
	//Initialize cropping when creating a camera (Aspect ratio, Close crop, Long crop)
	var camera:Camera = new Camera( 0, 0.1, 100);
	//near cropping
	camera.nearPlane=0;
	//Far distance cutting
	camera.farPlane=100;
```

tips：Generally in the game, we will use the fog effect and the camera cut at the same time, the fog effect is far from the basic place are not clear, then you can set the remote cut, improve the game rendering performance.

**Camera view**

Camera field of vision is similar to the focal length, through the adjustment of visual field parameters, you can see the view of the scene range, near-large changes in perspective, it is adjusted by the angle value, the greater the angle, the greater the field of view, developers can Set their own needs.

  ```java
//Set the camera's field of view 90 degrees
camera.fieldOfView = 90;
  ```



### Camera capture target

In creating a camera, we often need to adjust the camera position, for alignment to display a three-dimensional object, or display a region. For beginners, space thinking has not yet formed a habit, the adjustment of the time spent will be a lot.

LayaAir 3D engine 3D transform provides a lookAt () method, used to capture the target, automatically adjust the 3D object alignment point. The camera can also use it to achieve our goal of adjusting the viewing angle. Code is as follows

LookAt (target observation target vector, up upward vector, isLocal local space)

```java
//Add scene
var scene:Scene = new Scene();
Laya.stage.addChild(scene);
//Add a custom model
var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
scene.addChild(box);
//Add camera
var camera:Camera = (scene.addChild(new Camera())) as Camera;
//Camera captures model targets
camera.transform.lookAt	(box.transform.position,new Vector3(0,-1,0));
```
We set the camera's up in the direction of (0, -1,0), and the camera's y direction is negative, and it reverses on the Y axis, so the picture becomes inverted square (Figure 4). Other directions, beginners can try more.

![图片4](img/4.png)<br> (Figure 4) capture the target




### Camera background color and sky box

**background color**

In the 3D scene, we use the camera to control the background color, by setting the camera clearColor property to change the background color of the 3D space, the color using the three-dimensional vector Vector3 (red, green, blue) way to adjust the value, the engine defaults to pure black.

```java
	//Setting background color
	camera.clearColor = new Vector3(0.5,0.5,0.6);
```

**Sky box**

Most of the scenes in the scene need to show sky views, such as blue sky, white clouds, dusk, stars, etc. in the LayaAir 3D engine, it is created by adding a sky box (SkyBox) to the camera property.

But if the camera uses the orthogonal projection, the sky box will not be able to achieve the desired results, developers can try.

The sky box is made up of a cube model and 6 seamless texture maps, which are similar to 360 panoramic maps. With the rotation of the view angle, we can observe the foreground effect in all directions.

The following code “skyCube.ltc" in the JSON format to store 6 maps of the path, here is not much to introduce, we will introduce in the sky box details of the sky box mapping methods and “skyCube.ltc" configuration.

```java
	//Create sky box
	var skyBox:SkyBox=new SkyBox();
	//Clear tags, use the sky (must set, no, can not show the sky)
	camera.clearFlag=BaseCamera.CLEARFLAG_SKY;
	//Bind sky box objects to the camera
	camera.sky=skyBox;
	//Load the map file for the sky box
	skyBox.textureCube=TextureCube.load("skyBox/skyCube.ltc");
```

![图片5](img/5.png)<br>(Figure 5) Use the skybox.





