#Sky grid

###### *version :2.2.0beta   Update:2019-8-5*


在LayaAir3D中有内置的2个天空盒网格:`SkyBox`Box grid and`SkyDome`Spherical mesh.

You only need to use the two grid's`instance`Property.

> Using box grids


```typescript

//初始化天空渲染器
var skyRenderer:SkyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = SkyBox.instance;
```


> Using Spherical Mesh


```typescript

//初始化天空渲染器
var skyRenderer:SkyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = SkyDome.instance;
```


**Be careful!**When using Sky Box`Camera`(camera)`clearFlag`Attribute point should be set to`CLEARFLAG_SKY`;


```typescript

//设置相机的清除标识为天空盒
camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
```


