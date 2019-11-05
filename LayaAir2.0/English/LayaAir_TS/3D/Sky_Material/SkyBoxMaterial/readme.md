#SkyBox Material Material Material

###### *version :2.1.0beta   Update:2019-5-14*

SkyBox Material Sky Box is a six-sided cube that surrounds the whole scene and looks like the sky.

####Main attributes and methods

> attribute

`tintColor：Vector4`Color.

`exposure：Number`Exposure intensity.

`textureCube:TextureCube`Sky box texture.

####Create and use materials

The following code is from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_SkyBox))`SkyBox.instance`It is a sky box mesh built in layaair3d.


```typescript

//设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
//天空盒
Laya.BaseMaterial.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Laya.Handler.create(this, function(mat) {
    //获取相机的天空渲染器
    var skyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = Laya.SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
    //用于记录曝光强度
    var exposureNumber = 0;
    Laya.timer.frameLoop(1, this, function() {
        //设置曝光强度
        mat.exposure = Math.sin(exposureNumber += 0.01) + 1;
        mat.rotation += 0.01;
    });
}));
```


! [] (IMG / 1. GIF) < br > (Figure 1)