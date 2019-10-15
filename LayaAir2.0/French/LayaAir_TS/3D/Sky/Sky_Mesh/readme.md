#Sky grille

###### *version :2.2.0beta   Update:2019-8-5*

Dans layaair3d, il y a deux grilles de boîtes spatiales:`SkyBox`Box Grid`SkyDome`Grille sphérique

Utilisez seulement ces deux grilles.`instance`Propriétés.

> utiliser une grille de type boîte


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyBox.instance;
```


> Utilisation de grilles sphériques


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
```


**Attention!**Dans le ciel`Camera`Caméra n.`clearFlag`Attribut & ‧‧;:%`CLEARFLAG_SKY`•


```typescript

//设置相机的清除标识为天空盒
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
```


