#Introduction to Point Light

###### *version :2.0.1beta   Update:2019-3-30*

Point Light is a source of light that emits light in all directions, also known as omnidirectional light or spherical light. Point light sources in reality, such as light bulbs and candles, can feel that point light sources have properties of intensity, color and attenuation radius.


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


**Range**In order to set the range of point light source, which is equivalent to the irradiation range of point light, the larger the value, the larger the illumination range.

In Figure 1, because the illumination range is not large and the location of the point light source is problematic, the area not illuminated is black.

![] (img/1.png)<br> (Figure 1)

