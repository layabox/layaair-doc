#天空のグリッド

###### *version :2.2.0beta   Update:2019-8-5*

LayaAir 3 Dには2つのスカイボックスのグリッドが内蔵されています。`SkyBox`ボックスのグリッドと`SkyDome`球形メッシュ

この二つのグリッドを使うだけです。`instance`属性だけでいいです。

>箱型グリッドを使う


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyBox.instance;
```


>球形グリッドを使用する


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
```


**注意します**スカイボックスを使う時`Camera`（カメラ）の`clearFlag`属性を1点に設定します。`CLEARFLAG_SKY`;


```typescript

//设置相机的清除标识为天空盒
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
```


