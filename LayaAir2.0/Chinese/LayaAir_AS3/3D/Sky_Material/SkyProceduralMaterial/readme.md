# SkyProceduralMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

SkyProceduralMaterial程序化天空，这种材质可以实现大气反射，模拟日光，这种材质使用的顶点着色渲染天空。

#### 主要属性与方法

> 属性

`sunDisk:int`  设置太阳状态。

`sunSize:Number` 太阳尺寸,范围是0到1。

`sunSizeConvergence:Number` 太阳尺寸收缩,范围是0到20。

`atmosphereThickness:Number` 大气厚度,范围是0到5。

`skyTint:Vector4 ` 天空颜色。

`groundTint:Vector4` 地面颜色。

`exposure:Number` 曝光强度,范围是0到8。

#### 创建和使用材质

下面的代码对官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_Procedural)）中有所调整，设置好天空盒效果后更新灯光位置来表现日升日落的效果，`SkyDome.instance`是LayaAir3D中内置的一个圆形天空盒网格。

```typescript
//初始化天空渲染器
var skyRenderer:SkyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = SkyDome.instance;
//使用程序化天空盒
var pro_sky:SkyProceduralMaterial = new SkyProceduralMaterial();
//设置太阳大小
pro_sky.sunSize = 0.5;
//设置太阳状态为高质量状态
pro_sky.sunDisk = SkyProceduralMaterial.SUN_HIGH_QUALITY;
//设置天空颜色
pro_sky.skyTint = new Vector4(1, 1, 1, 1);
//设置地面颜色
pro_sky.groundTint = new Vector4(0, 0, 0, 1);

skyRenderer.material = pro_sky;

......
//设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
camera.clearFlag = BaseCamera.CLEARFLAG_SKY;
......
```

![](img/1.gif)<br>(图1)
