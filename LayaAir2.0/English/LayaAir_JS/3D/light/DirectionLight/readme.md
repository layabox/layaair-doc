# DirectionLight介绍

###### *version :2.0.1beta   Update:2019-3-30*

DirectionLight (parallel light) differs greatly from point light in that it has a fixed direction, can be set by radian value, and has no attenuation and illumination range. It can illuminate all models in the whole scene. In the 3D world, it is often used to simulate sunlight in a fixed direction.


```typescript

//创建方向光
this.directionLight = this.scene.addChild(new Laya.DirectionLight());
//设置灯光颜色
this.directionLight.color = new Laya.Vector3(1, 1, 1);
//设置灯光方向
var mat = this.directionLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
this.directionLight.transform.worldMatrix = mat;
```


​**SetForward**The direction of parallel light represents the direction of x, y and Z axes respectively. Negative axes are negative axes, positive axes are positive axes. The range of values is -1-0-1. Beginners can set values in this range to observe the change of direction.

![] (img/1.png)<br> (Figure 1)

