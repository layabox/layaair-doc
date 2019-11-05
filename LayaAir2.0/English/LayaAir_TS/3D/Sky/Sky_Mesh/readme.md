#Sky grid

###### *version :2.2.0beta   Update:2019-8-5*

There are two built-in sky box grids in LayaAir3D:`SkyBox`Box grid and`SkyDome`Spherical mesh.

You only need to use the two grid's`instance`Property will do.

> Using box grids


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyBox.instance;
```


> Using Spherical Mesh


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
```


**Be careful!**When using Sky Box`Camera`(camera)`clearFlag`Attribute point should be set to`CLEARFLAG_SKY`;


```typescript

//设置相机的清除标识为天空盒
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
```


