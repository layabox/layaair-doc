#Introduction to Point Light

###### *version :2.0.1beta   Update:2019-3-30*


​	PointLight(点光)是向四面八方发射光线的光源，又称全向光或者球状光，现实中的点光源比如灯泡、蜡烛，可以感觉到点光源是有强度、颜色和衰减半径属性。


```javascript

//创建点光源
var pointLight:PointLight = scene.addChild(new PointLight()) as PointLight;
//设置点光源位置
pointLight.transform.position = new Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
pointLight.range = 6.0;
```


**Range**In order to set the range of point light source, which is equivalent to the irradiation range of point light, the larger the value, the larger the illumination range.

In Figure 1, because the illumination range is not large and the location of the point light source is problematic, the area not illuminated is black.

![] (img/1.png)<br> (Figure 1)

