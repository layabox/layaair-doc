# 如何从摄像机创建一条射线

###### *version :2.7.0beta   Update:2020-6-11*

​	在前面的 **图形系统基础概念** 有讲解过射线这个基础工具。 这里我们从摄像机创建一条射线，使用的是camera的**viewportPointToRay**方法。生成的这条射线是从摄像机的近裁剪面的一点出发，向远裁剪面的一点。这个射线的反向延长线经过射线机的原点。

![](img/1.png)<br>(图1)

```typescript
//创建一个点
var point = new Laya.Vector2();
//创建一个射线
var ray= new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
//以鼠标点击的点作为原点
point.x = Laya.stage.mouseX;
point.y = Laya.stage.mouseY;
//计算一个从屏幕空间生成的射线
camera.viewportPointToRay(point, ray);
```

在示例([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay))中，通过从摄影机创建的射线，在地板与射线碰撞点处创建正方体。