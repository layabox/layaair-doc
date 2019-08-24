# 摄像机的背景色和天空盒

###### *version :2.0.1beta   Update:2019-3-19*

#### 背景色

​	在3D场景中，背景颜色我们是用摄像机去控制的，通过设置摄像机clearColor属性来改变3D空间的背景色，颜色使用三维向量Vector3(红,绿,蓝)方式赋值调整，引擎默认设为纯黑色。

```typescript
//相机设置清楚标记,使用固定颜色
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;	
//设置背景颜色
camera.clearColor = new Laya.Vector4(0.5,0.5,0.6,1);
```

#### 天空盒

​	场景中大多时候需要表现天空远景，比如蓝天白云、黄昏、星空等，在LayaAir 3D引擎中，是通过在摄像机属性上添加天空盒（SkyBox）的方式创建。

不过如果摄像机使用了正交投影，天空盒将达不到所要效果，开发者们可以尝试。

天空盒是由一个立方体模型及6张可以无缝相接的材质贴图构成，有点类似于360全景地图，随着视角的旋转改变，我们可以观察到四面八方都有远景效果。

```typescript
//天空盒代码
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox1/skyBox.lmat", this.Handler.create(null, function(mat) {
    //设置相机的清除标识为天空盒
    camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
    //获取相机的天空渲染器
    var skyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = Laya.SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```

![](img/1.png)<br>(图1) 天空盒	

> **注意: **在使用背景色和天空盒时，一定要保证Camera（摄像机）的`clearFlag`清除标记属性，与自己需要的效果对应。