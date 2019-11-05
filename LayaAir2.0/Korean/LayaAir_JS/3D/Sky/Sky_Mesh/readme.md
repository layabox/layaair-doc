#하늘 격자

###### *version :2.2.0beta   Update:2019-8-5*

Layaiar3D 안에 설치된 두 개의 스카이박스 격자:`SkyBox`박스 격자`SkyDome`구형 격자.

사용할 때 이 두 칸만 사용해야 돼요.`instance`속성.

>박스형 격자 사용


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyBox.instance;
```


> 구형 격자를 사용하다


```typescript

//初始化天空渲染器
var skyRenderer = scene.skyRenderer;
//创建天空盒mesh
skyRenderer.mesh = Laya.SkyDome.instance;
```


**주의**하늘상자를 사용할 때`Camera`(카메라)의`clearFlag`속성 하나 설정`CLEARFLAG_SKY`;


```typescript

//设置相机的清除标识为天空盒
camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
```


