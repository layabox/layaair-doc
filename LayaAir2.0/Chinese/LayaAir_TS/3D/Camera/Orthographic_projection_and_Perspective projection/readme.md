# 摄像机的正交投影和透视投影

###### *version :2.2.0   Update:2019-10-14*

​	在我们观察世界的时候，看到的都是带有“近大远小”透视效果的世界，在3D引擎中，为了更好的模拟人眼所看到的世界，默认的摄像机带着“透视投影”的效果。

![](img/1.png)<br>(图1)默认投影的效果图

但有很大一部分游戏，特别是斜45度视角的2D、3D混合游戏，游戏画面是不能带透视效果的，那么这个时候，我们需要设置摄像机为“正交投影”，使它不产生近大远小的透视效果。

```typescript
//正交投影属性设置
camera.orthographic = true;
//正交垂直矩阵距离,控制3D物体远近与显示大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 26.5, 45));
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
```

![](img/2.png)<br>(图2)正交投影的效果图

