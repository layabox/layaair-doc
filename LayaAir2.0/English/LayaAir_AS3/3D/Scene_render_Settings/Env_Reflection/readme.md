#Scene Environmental Reflection

###### *version :2.0.1beta   Update:2019-3-19*

There are two kinds of scene environment reflection, sky box reflection and custom reflection. If you want to have reflection effect, you must have no effect if there is no reflection material in shader. The default blinnphong does not support it, and PBR material supports environment reflection. More about environmental reflection is recommended to be set up in Unity before exporting.

Skybox Reflections: Direct Reflections refer to material reflections directly from the current environment of the celestial sphere. This is not implemented yet. It will be supported in later versions.

####How to use Unity to set up environmental reflection

First, let's look at a material ball we have prepared.

![] (img/1.png)<br> (Figure 1)

In this shader, we use the PBR standard material provided by layair3d. In the settings we checked`Enable Reflection`Whether to turn on the environmental reflection option, and in order to better observe the environmental reflection effect, we will material the`MetallicGloss`Maximum metallicity. After setting up, we add an object to the material ball.

! [] (IMG / 2. PNG) < br > (Figure 2)

Then we add sky boxes to the scene. open**Window**--**Lighting**--**Setting**Interface.

![] (img/3.png) < br > (fig. 3)

Set the skyball material for the environment, and then`Environment Reflections`Source in environmental reflection is set to Custom custom reflection. Cubemap selects the cubemap of the current sky sphere.

Once set up, you can see the effect in Unity, and then export it for use.

![] (img/4.png)<br> (Figure 4)

####Setting up environmental reflection with code

This section of code is excerpted from the official example（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Scene3D&name=EnvironmentalReflection))


```typescript

//设置场景的反射模式(全局有效),场景的默认反射模式也是custom模式
scene.reflectionMode = Scene3D.REFLECTIONMODE_CUSTOM;

//天空盒
BaseMaterial.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Handler.create(null, function(mat:SkyBoxMaterial):void {
    //获取相机的天空盒渲染体
    var skyRenderer:SkyRenderer = camera.skyRenderer;
    //设置天空盒mesh
    skyRenderer.mesh = SkyBox.instance;
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
Mesh.load("res/threeDimen/staticModel/teapot/teapot-Teapot001.lm", Handler.create(null, function(mesh:Mesh):void {
    teapot = scene.addChild(new MeshSprite3D(mesh)) as MeshSprite3D;
    teapot.transform.position = new Vector3(0, 1.75, 2);
    teapot.transform.rotate(new Vector3(-90, 0, 0), false, false);
}));

//实例PBR材质
var pbrMat:PBRStandardMaterial = new PBRStandardMaterial();
//开启该材质的反射
pbrMat.enableReflection = true;
//设置材质的金属度，尽量高点，反射效果更明显
pbrMat.metallic = 1;

//加载纹理
Texture2D.load("res/threeDimen/pbr/jinshu.jpg", Handler.create(null, function(tex:Texture2D):void {
    //pbrMat.albedoTexture = tex;
    teapot.meshRenderer.material = pbrMat;
}));
```


![] (img/5.png)<br> (Fig. 5)



