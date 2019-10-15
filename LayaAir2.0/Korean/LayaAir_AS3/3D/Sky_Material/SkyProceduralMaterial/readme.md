#SkyProceduralmaterial 소재 상세

###### *version :2.1.0beta   Update:2019-5-14*

SkyProceduralmaterial 프로그램화 하늘로, 이 소재는 대기반사, 아날로그 일광을 실현할 수 있으며 이런 재질의 정점에 착색으로 하늘을 물들인다.

####주요 속성과 방법

> 속성

`sunDisk:int`태양 상태를 설정하다.

`sunSize:Number`태양 사이즈는 0~1.

`sunSizeConvergence:Number`태양 사이즈 수축, 범위는 0~20입니다.

`atmosphereThickness:Number`대기 두께는 0~5입니다.

`skyTint:Vector4 `하늘색.

`groundTint:Vector4`지면색.

`exposure:Number`노출 강도, 범위는 0~8이다.

####재질 만들기

아래의 코드 는 공식 예례 를 표시한다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_Procedural)) 중 조정 을 하 고 하늘 의 효과 를 설치 후 조명 위치 를 업데이트 해 해가 지는 효과 를 표현 했 다.`SkyDome.instance`레이어3D 안에 들어있는 둥근 하늘박스 격자입니다.


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


[] (img/1.gif)<br>(1)
