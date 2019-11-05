#SkyBoxmaterial 소재 상세

###### *version :2.1.0beta   Update:2019-5-14*

SkyBoxmaterial 하늘박스 소재는 6개 면의 입방체로 전체를 둘러싸고 하늘처럼 보인다.

####주요 속성과 방법

> 속성

`tintColor：Vector4`색깔.

`exposure：Number`노출 강도.

`textureCube:TextureCube`하늘갑 무늬.

####재질 만들기

아래의 코드 는 공식 예례 () 에서 나온다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_SkyBox),`SkyBox.instance`Layaiar3D 안에 설치된 하늘상자 격자입니다.


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


[] (img/1.gif)<br>(1)