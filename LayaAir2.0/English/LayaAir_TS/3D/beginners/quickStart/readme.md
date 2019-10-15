#Quickly start a 3D project

Below we will use the LayaAir engine to quickly start a 3D project, and with TS language as a tutorial, a simple demonstration using engine code to achieve a basic 3D application.

###IDE Creates 3D Sample Projects

Download LayaAirIDE and start a new project to select a 3D project. As shown in the following figure:

![1](img/1.png)</br> (Fig. 1)

Here we choose the JavaScript language. After the creation, we found that IDE created a 3D template for us. Developers can refer to 2D novice tutorials for project structure introduction. I will not repeat it here.

Then press F5 or click the Run button, and we can see that the debug window shows a cube. As shown in the following figure:

![2](img/2.png)</br> (Fig. 2)

Main. ts, the startup class, constructs a 3D world for us. In addition, several essential elements (scenes, cameras, light sources, 3D models, materials) are added to a simple 3D world. We will introduce these concepts in detail in the follow-up tutorial, and gradually lead you to learn 3D knowledge.

For this simpler Demo, we find that the cube is static and does not give us the WYSIWYG stereo vision of 3D, so we add a few lines of code to make it rotate. First, find the startup class Main. ts and modify it to the following code:


```typescript

// 程序入口
class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        //摄像机位置
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        //摄像机角度
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        //设置背景颜色
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        //灯光颜色
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        //灯光的方向
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
       var box:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1));
       //将box添加到sence上
       scene.addChild(box);
       //给模型一个旋转角度
       box.transform.rotate(new Laya.Vector3(0,45,0),false,false);

       //给模型创建一个材质球
       box.meshRenderer.material = new Laya.BlinnPhongMaterial;
       //创建材质
       var  material:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
       //加载材质的漫反射贴图
       Laya.Texture2D.load("res/layabox.png",Laya.Handler.create(null,function(texture:Laya.Texture2D):void{
           //将得到的Texture2d添加给材质球
           material.albedoTexture = texture;
       }));
       //给模型添加材质
       box.meshRenderer.material = material;

       //给box添加旋转
       var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
       //每10ms旋转一次
       Laya.timer.loop(10,this,function(){
           box.transform.rotate(vect,true,false);
       });
    }
}
new Main();
```


![3](img/3.gif)</br> (Motion 3)

Here we use a timer, every 10ms to drive the cube to rotate, specific instructions for developers to read the relevant tutorials and APIs, here we are just a simple demonstration, simple code as follows:


```typescript

var vect:Laya.Vector3 = new Laya.Vector3(1,1,0);
//每10毫秒旋转一次
Laya.timer.loop(10,null,function(){
  box.transform.rotate(vect,true,false);
});
```


So far we have been able to run through a simple example and drive the cube to rotate (Motion 3).



###Basic Composition of LayaAir3D World

From the above code example, we can see that a basic 3D world was born. Of course, the above code is relatively simple, to make a rich and colorful game world, we need to know more about the engine functions.

Figure 4 LayaAir3D World Visible Elements View. In addition to 3D scenes, cameras, lights and models, animation is also one of the display elements. Later courses will be introduced to you step by step.

![4](img/4.png)</br> (Fig. 4)



###3D World Transform and Simple Use of Vectors

In the above examples, we have created several key elements modules about display, but we also see that vector Vector 3 or Vector 4 are used in camera, lighting, model, etc. to assign position, direction, color and so on.

####Modification of coordinate system, position and rotation

In the 2D engine, we directly adjust the X and Y coordinates to control the position and rotation direction of the display object. In the 3D engine, the display object is more complex, and Z axis coordinates are added. So we use Vector 3 three-dimensional vector to represent x, y and Z respectively.

However, the definitions of coordinate directions in various 3D engine and 3D model animation software will be different, so beginners need to master their differences.

LayaAit3D engine coordinates belong in technical terms`右手坐标系`(Fig. 5). Simply put, the right side of the screen is in the positive X-axis direction, the top is in the positive Y-axis direction, and the screen is in the positive Z-axis direction to the viewer (the rear direction of the screen is in the negative Z-axis direction). Some 3D engines belong to the left-handed coordinate system, which is not introduced here. Interested beginners can learn from Baidu.

![5](img/5.png)</br>(图5)右手系坐标


The engine is also divided into the world coordinate system and the local coordinate system. The world coordinate system is the coordinate of the 3D scene, and the direction of the three axes will never change (Fig. 5). Local coordinates are the coordinates of the model itself, which can change with the rotation of the direction of the model, but we can recognize the coordinate direction by right-hand coordinate gesture (Fig. 6). The hand model in the figure below is the local coordinates of the right-hand coordinate system of the 3D model after rotating along the Y-axis to 90 degrees, and the thumb is always the positive X-axis direction of the local coordinates.

![6](img/6.png)</br> (Fig. 6)

Understanding the above coordinate systems, then you can change them through 3D transformation. In the sample code, transform is a 3D transformation object (Transform 3D), which is very important in the 3D world. It is used in many change logic control codes about display objects.

In the code, we use the translate movement and rotate rotation methods in 3D transformation, and use 3D vectors to represent the values of X, y, Z. Colleagues, both methods can be set in the parameters whether the local space movement, rotation, beginners can be set in the program to observe the difference between mobile rotation.


```typescript

//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 3, 3));
//旋转摄像机方向（角度）
camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
```


![7](img/7.png)</br> (Fig. 7)

The above is the description of the moving and rotating methods in the API of Transform 3D. Of course, there are many attributes and methods for transforming objects, which we will explain step by step in future examples.

####The Use of Vectors

Vectors are frequently used in LayaAir3D engines. They can be seen from two-dimensional vectors to four-dimensional vectors. The most basic use is for assignment in this example.

The transformation of moving, rotating and scaling of 3D objects in the code uses three-dimensional vectors as its x, y and Z axis coordinates.

Then in the light of various color attributes assignment long, three-dimensional vector values represent R, G, B three colors, respectively, red, green, blue, LayaAir3D engine, the maximum value of three colors is 1, is set by percentage. The larger the overall value, the brighter the color, and the smaller the color, the darker the color. If the value exceeds 1, the exposure effect will be produced.

As for the color of red, green and blue, beginners can consult and learn from game art designers, such as red plus green for yellow, red plus blue for purple, and so on. Generally, in the process of project development, programmers need to adjust the color values repeatedly to experiment good results.

In the example, the following code uses vectors as color assignments:


```javascript

//灯光的漫反射颜色
directionLight.diffuseColor = new Laya.Vector3(1.6, 1.6, 1.6);
```


In the project, there are many more complex uses, need to use vectors to do some mathematical operations, this course as an introductory course, not to do more introduction here.