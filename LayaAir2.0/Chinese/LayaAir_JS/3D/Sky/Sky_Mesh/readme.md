# 天空网格

###### *version :2.2.0beta   Update:2019-8-5*

在LayaAir3D中有内置的2个天空盒网格:`SkyBox`盒型网格 与 `SkyDome` 球形网格。

在使用时只需要使用这个两个网格的`instance`属性就行。

> 使用盒型网格

```typescript
//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyBox.instance;
```

> 使用球形网格

```typescript
//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
```

**注意 !** 在使用天空盒时`Camera`(摄像机)的 `clearFlag`属性一点要设置为 `CLEARFLAG_SKY`;

```typescript
//设置相机的清除标识为天空盒
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
```

