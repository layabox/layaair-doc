# SpotLight介绍

聚光指的是从特定光源方向射出的光，比如手电筒，舞台筒灯等。光照区域根据距离因素逐渐放大，同时光照区域边缘也有衰减现象。

```typescript
//聚光灯
var spotLight:SpotLight = scene.addChild(new SpotLight()) as SpotLight;
//设置聚光灯颜色
spotLight.color = new Vector3(1, 1, 0);
//设置聚光灯位置
spotLight.transform.position = new Vector3(0.0, 1.2, 0.0);
//设置聚光灯的方向
var mat:Matrix4x4 = spotLight.transform.worldMatrix;
mat.setForward(new Vector3(0.15, -1.0, 0.0));
directionLight.transform.worldMatrix=mat;
//设置聚光灯范围
spotLight.range = 6.0;
//设置聚光灯锥形角度
spotLight.spotAngle = 32;
```

**range** 为聚光的照射范围，与点光类似，区别只是聚光有方向，而点光无方向。

**spotAngle** 为聚光灯的锥形角度，设置的值越小，聚光光圈的越小，反之光圈越大。

![](img/1.png)<br>(图1)

