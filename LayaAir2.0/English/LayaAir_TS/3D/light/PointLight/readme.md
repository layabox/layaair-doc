# PointLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

Point Light is a source of light that emits light in all directions, also known as omnidirectional light or spherical light. Point light sources in reality, such as light bulbs and candles, can feel that point light sources have properties of intensity, color and attenuation radius.


```javascript

//创建点光源
var pointLight = scene.addChild(new Laya.PointLight()) as Laya.PointLight;
//设置点光源位置
pointLight.transform.position = new Laya.Vector3(0.4, 0.4, 0.0);
//设置点光源的范围
pointLight.range = 6.0;
```


**Range**In order to set the range of point light source, which is equivalent to the irradiation range of point light, the larger the value, the larger the illumination range.

In Figure 1, because the illumination range is not large and the location of the point light source is problematic, the area not illuminated is black.

![] (img/1.png)<br> (Figure 1)

