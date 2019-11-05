#カメラからどのように放射線を作成しますか？

###### *version :2.0.1beta   Update:2019-3-19*

前の方にあります**グラフィックシステムの基礎概念**放射線という基礎的なものを説明しました。ここでカメラから放射線を作ります。カメラを使っています。**viewpoint Point ToRay**方法。この放射線はカメラの近裁断面の点から、遠裁断面の点に向かって発生します。この放射線の逆延長線は放射線機の原点を通ります。

！[](img/1.png)<br/>(図1)


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


例では[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Camera&name=CameraRay)）において、カメラから作成された放射線により、床と放射線の衝突点において立方体を作成します。