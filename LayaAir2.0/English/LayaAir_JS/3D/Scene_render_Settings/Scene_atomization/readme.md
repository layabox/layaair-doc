# 场景雾化

###### *version :2.0.1beta   Update:2019-3-19*

雾化效果在项目中起着重要的作用，雾化效果就相当于开启大气的效果，看起来有种朦朦胧胧的感觉，让场景更真实。LayaAir 3D引擎可以设置场景的雾效可见距离（相当于浓度）及雾效的颜色。雾化使用的恰当不但可以提升游戏性能，还可以增加游戏的体验。

#### 使用Unity设置场景雾化

​	在Lighting灯光渲染设置中找到 `Other Setting` 

​	![](img/1.png)<br>(图1)

首先勾选雾化属性，然后调整雾化的颜色。

![](img/2.gif)<br>(图2)

设置完之后就可以拉近或者拉远摄像头查看效果了。如效果图3所示：

![](img/3.gif)<br>(图3)

#### 使用代码设置环境雾化

```typescript
//雾化代码
scene.enableFog = true;
//设置雾化的颜色
scene.fogColor = new Laya.Vector3(0,0,0.6);
//设置雾化的起始位置，相对于相机的距离
scene.fogStart = 10;
//设置雾化最浓处的距离。
scene.fogRange = 40;
```

效果显示（图4）：

![](img/4.png)<br>(图4)

