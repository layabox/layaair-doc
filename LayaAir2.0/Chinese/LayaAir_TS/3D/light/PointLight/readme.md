# PointLight介绍

###### *version :2.7.0beta   Update:2020-6-11*

​	PointLight(点光)是向四面八方发射光线的光源，又称全向光或者球状光，现实中的点光源比如灯泡、蜡烛，可以感觉到点光源是有强度、颜色和衰减半径属性。

```javascript
//创建点光源
var pointLight = scene.addChild(new Laya.PointLight()) as Laya.PointLight;
//设置点光源位置
pointLight.transform.position = new Laya.Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
pointLight.range = 6.0;
```

**range** 为设置点光源的范围，相当于点光的照射范围，数值越大，光照范围越大。

图1中因光照范围设置不大，且点光源的位置问题，因此没被光照的地方为黑色。

![](img/1.png)<br>(图1)

