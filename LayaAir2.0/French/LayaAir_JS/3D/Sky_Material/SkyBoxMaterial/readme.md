# SkyBoxMaterial材质详解

###### *version :2.1.0beta   Update:2019-5-14*

Skyboxmaterial Sky box is a cube of Six faces, encerclez tout le paysage et ressemblez au ciel.

####Principales propriétés et méthodes

Attributs

`tintColor：Vector4`Couleur.

`exposure：Number`L 'exposition.

`textureCube:TextureCube`Skybox texture

####Création et utilisation de matériaux

Le code ci - dessous est issu de l 'exemple officiel.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Sky&name=Sky_SkyBox)]`SkyBox.instance`C 'est une grille de boîtes à ciel dans layaair3d.


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


[] (IMG / 1.gif) <br > (Figure 1)