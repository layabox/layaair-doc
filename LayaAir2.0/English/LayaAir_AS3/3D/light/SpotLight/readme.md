#Introduction to SpotLight

###### *version :2.0.1beta   Update:2019-3-30*

Focusing light refers to light emitted from a specific light source direction, such as flashlight, stage lamp, etc. The illumination area is enlarged gradually according to the distance factor, and the edge of the illumination area is also attenuated.


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


**Range**The range of illumination for focusing light is similar to that of point light, except that the focusing light has a direction, while the point light has no direction.

**SpotAngle**For the conical angle of the spotlight, the smaller the value set, the smaller the focusing aperture, and vice versa.

![] (img/1.png)<br> (Figure 1)

