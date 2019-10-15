#シーン環境反射

###### *version :2.0.1beta   Update:2019-3-19*

シーンの環境反射は2種類あり、空の箱は反射してカスタマイズして反射します。反射効果があるためには、必ずShaderの中に反射材がないと効果がありません。デフォルトのBlinnPhongはサポートされていません。PBR材質は環境反射をサポートしています。環境反射についてはユニティに設定してからエクスポートするのがオススメです。

空の箱は反射します。直接反射とは材質が直接に空のボールを反射する環境反射です。これはまだ実現されていません。今後のバージョンでサポートされます。

####Unityを使って環境反射を設定するにはどうすればいいですか？

まず私たちが準備した材質のボールを見に来ます。

！[](img/1.png)<br/>(図1)

この素材のボールにはLayaAir 3 D提供のPBR標準材を使用しています。設定でチェックしました。`Enable Reflection`環境反射オプションをオンにしますか？環境反射効果をより良く観察するために、素材の`MetallicGloss`金属度が最高に達する。設定後、素材のボールをオブジェクトに追加します。

！[](img/2 png)<br/>(図2)

そして私たちはシーンにスカイボックスを追加します。開く**Window**--**ライティング**--**セッティング**インターフェース

！[](img/3 png)<br/>(図3)

環境にやさしいスカイボールの材質を設定し、`Environment Reflections`環境反射におけるSourceはCustomのカスタム反射に設定されています。Cubemapは現在のスカイボールのcubemapを選択します。

セットアップしたらユニティに効果が見られます。その後にエクスポートして使います。

！[](img/4 png)<br/>(図4)

####コードを使って環境反射を設定します。

コードセクションの一部は、公式の例から選択されます。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Scene3D&name=EnvironmentalReflection)を選択します。


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


！[](img/5 png)<br/>(図5)



