#SkyProcesdural Material素材詳細

###### *version :2.1.0beta   Update:2019-5-14*

SkyProceduralMaterialは空をプログラム化して、このような材質は大気反射を実現することができて、日光を模擬して、このような材質の使う頂点は着色して空を誇張します。

####主な属性と方法

>属性

`sunDisk:int`太陽の状態を設定します。

`sunSize:Number`太陽のサイズは、0から1までの範囲です。

`sunSizeConvergence:Number`太陽のサイズが収縮し、範囲は0から20までです。

`atmosphereThickness:Number`大気の厚さは、0から5までの範囲です。

`skyTint:Vector4 `空の色

`groundTint:Vector4`地上色

`exposure:Number`露出強度は、0から8の範囲です。

####材質の作成と使用

以下のコードの公式例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_Procedural)）に調整があり、スカイボックスの効果を設定してから照明の位置を更新し、日の入り効果を表現します。`SkyDome.instance`LayaAir 3 Dに内蔵されたラウンドスカイボックスのメッシュです。


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


！[](img/1.gif)<br/>(図1)
