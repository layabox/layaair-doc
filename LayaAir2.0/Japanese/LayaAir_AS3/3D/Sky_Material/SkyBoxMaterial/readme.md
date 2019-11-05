#SkyBoxMaterial材質詳細

###### *version :2.1.0beta   Update:2019-5-14*

SkyBoxMaterialスカイボックスの材質は6つの面の立方体で、全体のシーンを包囲して、空のように見えます。

####主な属性と方法

>属性

`tintColor：Vector4`色です。

`exposure：Number`露出強度

`textureCube:TextureCube`スカイボックスの模様。

####材質の作成と使用

以下のコードは公式の例から来ています。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_SkyBox)を選択します`SkyBox.instance`LayaAir 3 Dに内蔵されたスカイボックスのメッシュです。


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


！[](img/1.gif)<br/>(図1)