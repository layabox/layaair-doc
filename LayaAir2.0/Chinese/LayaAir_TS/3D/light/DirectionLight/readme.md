### DirectionLight介绍

​	DirectionLight(平行光)与点光区别较大，它有固定的一个方向，可通过弧度值设定，并且也没有衰减和光照范围，会对全场景所有模型进行照亮。3D世界中经常用来模拟固定方向的太阳光。

```typescript
//创建方向光
var directionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
//方向光的颜色
directionLight.color = new Laya.Vector3(1, 1, 1);
//设置平行光的方向
var mat = directionLight.transform.worldMatrix;
mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
directionLight.transform.worldMatrix=mat;
```

​	**setForward** 平行光的方向，分别代表x、y、z轴上的方向，负数为负轴，正数为正轴，值的范围为-1—0—1，超过范围后为-1或1，初学者们可以在这个范围内设值观察方向的变化。

![](img/1.png)<br>(图1)

