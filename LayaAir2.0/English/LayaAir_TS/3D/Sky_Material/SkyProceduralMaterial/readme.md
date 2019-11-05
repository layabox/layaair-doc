#SkyProcedural Material Material Material Details

###### *version :2.1.0beta   Update:2019-5-14*

SkyProcedural Material programmed sky, this material can achieve atmospheric reflection, simulate sunlight, this material uses vertex shading to render the sky.

####Main attributes and methods

> attribute

`sunDisk:int`Set the state of the sun.

`sunSize:Number`The size of the sun ranges from 0 to 1.

`sunSizeConvergence:Number`The sun shrinks in size from 0 to 20.

`atmosphereThickness:Number`The atmospheric thickness ranges from 0 to 5.

`skyTint:Vector4 `Sky color.

`groundTint:Vector4`Ground color.

`exposure:Number` 曝光强度,范围是0到8。

####Create and use materials

The following code is for the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_Procedural)) After setting the Skybox effect, the lighting position is updated to show the effect of sunrise and sunset.`SkyDome.instance`It is a circular sky box grid built in LayaAir3D.


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
//使用程序化天空盒
var pro_sky = new Laya.SkyProceduralMaterial();
//设置太阳大小
pro_sky.sunSize = 0.5;
//设置太阳状态为高质量状态
pro_sky.sunDisk = Laya.SkyProceduralMaterial.SUN_HIGH_QUALITY;
//设置天空颜色
pro_sky.skyTint = new Laya.Vector4(1, 1, 1, 1);
//设置地面颜色
pro_sky.groundTint = new Laya.Vector4(0, 0, 0, 1);

skyRenderer.material = pro_sky;

......
//设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
......
```


![] (img/1.gif) <br> (Fig. 1)
