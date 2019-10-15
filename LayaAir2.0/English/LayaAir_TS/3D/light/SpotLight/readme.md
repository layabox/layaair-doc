#Introduction to SpotLight

###### *version :2.0.1beta   Update:2019-3-30*


聚光指的是从特定光源方向射出的光，比如手电筒，舞台筒灯等。光照区域根据距离因素逐渐放大，同时光照区域边缘也有衰减现象。


```typescript

//聚光灯
var spotLight = scene.addChild(new Laya.SpotLight()) as Laya.SpotLight;
//设置聚光灯颜色
spotLight.color = new Laya.Vector3(1, 1, 0);
//设置聚光灯位置
spotLight.transform.position = new Laya.Vector3(0.0, 1.2, 0.0);
//设置聚光灯方向
var mat = spotLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(0.15, -1.0, 0.0));
spotLight.transform.worldMatrix = mat;
//设置聚光灯范围
spotLight.range = 6.0;
//设置聚光灯锥形角度
spotLight.spotAngle = 32;
```


**Range**The range of illumination for focusing light is similar to that of point light, except that the focusing light has a direction, while the point light has no direction.

**SpotAngle**For the conical angle of the spotlight, the smaller the value set, the smaller the focusing aperture, and vice versa.

![] (img/1.png)<br> (Figure 1)

