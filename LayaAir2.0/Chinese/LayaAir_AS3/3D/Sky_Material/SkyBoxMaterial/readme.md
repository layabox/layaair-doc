# SkyBoxMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

SkyBoxMaterial天空盒材质是一个6个面的立方体，包围整个场景，看起来像天空一样。

#### 主要属性和方法

> 属性

`tintColor：Vector4` 颜色。

`exposure：Number` 曝光强度。

`textureCube:TextureCube` 天空盒纹理。

#### 创建和使用材质

下面的代码来自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_SkyBox)），`SkyBox.instance` 是LayaAir3D中内置的一个天空盒网格。

```typescript
//设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
//天空盒
BaseMaterial.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Handler.create(this, function(mat:SkyBoxMaterial):void {
    //获取相机的天空渲染器
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
    //用于记录曝光强度
    var exposureNumber:Number = 0;
    Laya.timer.frameLoop(1, this, function():void {
        //设置曝光强度
        mat.exposure = Math.sin(exposureNumber += 0.01) + 1;
        mat.rotation += 0.01;
    });
}));
```

![](img/1.gif)<br>(图1)