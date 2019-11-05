#How to create a ray from a camera

###### *version :2.0.1beta   Update:2019-3-19*

In the front**Basic Concept of Graphic System**There is a basic tool for explaining radiation. Here we create a ray from the camera using Camera's.**Viewportpointtoray**Method. This ray is generated from a point near the cutting surface of the camera and a point far from the cutting surface. The reverse extension of this ray passes through the origin of the ray machine.

![] (img/1.png)<br> (Figure 1)


```typescript

//创建一个点
var point:Vector2 = new Vector2();
//创建一个射线
var ray: Ray= new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
//以鼠标点击的点作为原点
point.x = Laya.stage.mouseX;
point.y = Laya.stage.mouseY;
//计算一个从屏幕空间生成的射线
camera.viewportPointToRay(point, ray);
```


In the example ([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay)) In this method, a cube is created at the collision point between the floor and the ray by the ray created from the camera.

