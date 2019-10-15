#Background reflection

###### *version :2.0.1beta   Update:2019-3-19*

The Scene Environment Reflection is two, the Sky Box reflectance and the Self - Definition reflection.Pour avoir un effet réfléchissant, il faut que le matériau réfléchissant dans le Shader soit inefficace s' il n 'y a pas de matériau réfléchissant, et que le matériau PBR supporte la réflexion environnementale par défaut.Pour ce qui est des réflexes environnementaux, il est recommandé de les installer dans l 'unité avant de les exporter.

Reflectance of the Sky Box: Direct reflectionThis is not realized, will be supported in the Subsequent Edition.

####How to use Unity set Environmental reflectance

Voyons d 'abord ce qu' on a préparé.

[] (IMG / 1.png) <br > (Figure 1)

Dans cette boule de matériau, nous utilisons le matériau standard PBR fourni par layaair3d.On a sélectionné les paramètres.`Enable Reflection`Si vous ouvrez les options de réflexe environnemental, en même temps, pour mieux observer l 'impact environnemental`MetallicGloss`Max metalAprès réglage, nous ajoutons un objet à la boule de matériau.

[] (IMG / 2.png) <br > (Figure 2)

Et on ajoute une boîte au ciel à la scène.Ouvre.**Window.**- Non.**Lighting**- Non.**Setting**Interface

[] (IMG / 3.ping) <br > (Figure 3)

Mettre en place un environnement pour la sphère du ciel`Environment Reflections`Source est définie comme une réflexion personnalisée de Custom dans la réflexion environnementale.Cubemap sélectionne la balle spatiale actuelle.

Une fois que les paramètres ont été installés, les effets peuvent être vus dans l 'Unity, puis exportés.

[] (IMG / 4.png) <br > (Figure 4)

####Réflexe environnemental utilisant des paramètres de code

Cette section de code partielle est sélectionnée parmi les exemples officiels ()[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Scene3D&name=EnvironmentalReflection)).


```js

//设置场景的反射模式(全局有效),场景的默认反射模式也是custom模式
scene.reflectionMode = Laya.Scene3D.REFLECTIONMODE_CUSTOM;

//天空盒
Laya.BaseMaterial.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Laya.Handler.create(null, function(mat) {
    //获取相机的天空盒渲染体
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //设置天空盒mesh
    skyRenderer.mesh = Laya.SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
    //设置场景的反射贴图
    scene.customReflection = mat.textureCube;
    //设置曝光强度
    var exposureNumber:Number = 0;
    mat.exposure = 0.6 + 1;
}));

.....

//加载Mesh
Laya.Mesh.load("res/threeDimen/staticModel/teapot/teapot-Teapot001.lm", Laya.Handler.create(null, function(mesh) {
    teapot = scene.addChild(new Laya.MeshSprite3D(mesh));
    teapot.transform.position = new Laya.Vector3(0, 1.75, 2);
    teapot.transform.rotate(new Laya.Vector3(-90, 0, 0), false, false);
}));

//实例PBR材质
var pbrMat = new Laya.PBRStandardMaterial();
//开启该材质的反射
pbrMat.enableReflection = true;
//设置材质的金属度，尽量高点，反射效果更明显
pbrMat.metallic = 1;

//加载纹理
Laya.Texture2D.load("res/threeDimen/pbr/jinshu.jpg", Handler.create(null, function(tex){
    //pbrMat.albedoTexture = tex;
    teapot.meshRenderer.material = pbrMat;
}));
```


[] (IMG / 5.png) <br > (Figure 5)



