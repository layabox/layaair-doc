### PointLight介绍

​	PointLight(点光)是向四面八方发射光线的光源，又称全向光或者球状光，现实中的点光源比如灯泡、蜡烛，可以感觉到点光源是有强度、颜色和衰减半径属性。

```javascript
//创建点光源
this.pointLight = this.scene.addChild(new Laya.PointLight());
//设置点光源颜色
this.pointLight.color = new Laya.Vector3(1.0, 0.5, 0.0);
//设置点光源位置
this.pointLight.transform.position = new Laya.Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
this.pointLight.range = 3.0;
```

**range** 为设置点光源的范围，相当于点光的照射范围，数值越大，光照范围越大。

图1中因光照范围设置不大，且点光源的位置问题，因此没被光照的地方为黑色。

![](img/1.png)<br>(图1)

