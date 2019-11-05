# 资源加载

###### *version :2.0.1beta   Update:2019-3-19*

リソースの種類を説明しました。これらのリソースを実際に操作してロードします。今回のサンプルアドレス([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Resource&name=LoadResourceDemo)）0

###単一リソースローディング

####1.シーンロード

シングルシーンのロード時に使用するScene 3 D.load方法。


```typescript

//3d场景加载
Laya.Scene3D.load("res/TerrainScene/XunLongShi.ls",Laya.Handler.create(null,function(scene){
    //加载完成获取到了Scene3d
    Laya.stage.addChild(scene);
    //获取摄像机
    var camera = scene.getChildByName("Main Camera");
    //清除摄像机的标记
	camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
    
    //添加光照
    var directionLight = scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(1, 1, 1);
    directionLight.transform.rotate(new Laya.Vector3( -3.14 / 3, 0, 0));
}));
```


ロード後の効果を確認します。

！[](img/1.png)<br/>(写真1)

####2.材質のロード

単体の材質をロードする時、私達が使うBaseMaterial.loadの方法。今回の例では、上の例のカメラにスカイボックスを載せました。


```typescript

//材质加载		
Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox2/skyBox2.lmat", Laya.Handler.create(null, function(mat){
    //获取相机的天空渲染器
    var skyRenderer:Laya.SkyRenderer = camera.skyRenderer;
    //创建天空盒的mesh
    skyRenderer.mesh = Laya.SkyBox.instance;
    //设置天空盒材质
    skyRenderer.material = mat;
}));
```


効果を見に来ました（図2）。

！[](img/2 png)<br/>(図2)

####3.テクスチャローディング

単一のテクスチャをロードしてTexture 2 D.load方法を使用します。ここでは正方形体を作成し，そのテクスチャを彼のテクスチャに設定します。この動作は実際には3 D単純例と同様である。


```typescript

//加载纹理
Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(null, function(tex) {
    //使用纹理
    var earth1 = scene.addChild(new Laya.MeshSprite3D(PrimitiveMesh.createSphere(5, 32, 32)));
    earth1.transform.translate(new Laya.Vector3(10, 20, -8));
    var earthMat = new Laya.BlinnPhongMaterial();
    earthMat.albedoTexture = tex;
    earthMat.albedoIntensity = 1;
    earth1.meshRenderer.material = earthMat;
}));
```


効果は以下の通りです。

！[](img/3 png)<br/>(図3)

####4.グリッドの読み込み

単一グリッドのロードに使用するMesh.load方法。


```typescript

//加载Mesh
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(null,function(mesh) {
    var layaMonkey = sprite3D.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(4, 4, 4);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    layaMonkey.transform.translate(new Laya.Vector3(0, 0, 7));
}));
```


ロード完了後の効果(図4):

！[](img/4 png)<br/>(図4)

####5.プリロード

個別のプリセットのロードは、Sprite 3 D.load方法を使用します。


```typescript

//加载精灵
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function(sp){
    var layaMonkey2 = scene.addChild(sp);
    layaMonkey2.transform.localScale = new Laya.Vector3(4, 4, 4);
    layaMonkey2.transform.translate(new Laya.Vector3(-10, 13, 0));
}));
```


ロード完了後の効果(図5):

！[](img/5 png)<br/>(図5)

####6.アニメーションの読み込み

単一のアニメーションローディングは、今回の例で使用したキャラクターのエクスポート時に動画情報があります。エクスポート後に削除します。`.lh`ファイル中のアニメーションに関する情報は、プレゼンテーションのみで使用します。後期に使う時骨格を交替するアニメーションはこのような方式を使うことができます。


```typescript

//加载胖子精灵
Laya.Sprite3D.load("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh", Laya.Handler.create(null, function(sp) {
    pangzi = scene.addChild(sp);
    pangzi.transform.localScale = new Laya.Vector3(4, 4, 4);
    pangzi.transform.translate(new Laya.Vector3(-20, 13, 0));
    //获取动画组件
    pangziAnimator = pangzi.getChildAt(0).getComponent(Laya.Animator);
    //AnimationClip的加载要放在Avatar加载完成之后
   Laya.AnimationClip.load("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani", Laya.Handler.create(null, function(aniClip) {
        //创建动作状态
        var state1 = new Laya.AnimatorState();
        //动作名称
        state1.name = "hello";
        //动作播放起始时间
        state1.clipStart = 0 / 581;
        //动作播放结束时间
        state1.clipEnd = 581 / 581;
        //设置动作
        state1.clip = aniClip;
        //设置动作循环
        state1.clip.islooping = true;
        //为动画组件添加一个动作状态
        pangziAnimator.addState(state1);
        //播放动作
        pangziAnimator.play("hello");
    }));
}));
```


！[](img/6.gif)<br/>(図6)

###一括プリロードリソース

上記の例Scenee.load（）方法は資源の非同期ロードであり、3 Dの資源が大きい場合もあります。プリロードしてスクリーンをアップグレードする必要があります。この時に私達はキャリアでプリロードできます。

2 Dゲームの資源は私達が使うのです。**Laya.loader.load()**方法はプリロードされているが、3 DリソースはLaya.loader.create()という方法を使用しなければならない。ロードが完了したら、直接使用できます。**Laya.loader.getsRes()**この方法は、ロードが完了したリソースを取得する。参考にしてください。[API描述](https://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.net.LoaderManager)。


```typescript

......
//批量预加载方式
PreloadingRes(){
    //预加载所有资源
    var resource:Array = ["res/threeDimen/scene/TerrainScene/XunLongShi.ls",
                          "res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
                          "res/threeDimen/texture/earth.png",                      "res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
                          "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", 
                          "res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
                          "res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani",];
    Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
}

onPreLoadFinish() {
    //初始化3D场景
    _scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/TerrainScene/XunLongShi.ls"));
    //获取相机
    var camera = _scene.getChildByName("Main Camera");
    //设置相机清楚标记，使用天空
    camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
    //调整相机的位置
    camera.transform.translate(new Laya.Vector3(0, 45, -60));
    camera.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
    //相机视角控制组件(脚本)
    camera.addComponent(CameraMoveScript);

    //添加光照
    var directionLight = _scene.addChild(new Laya.DirectionLight());
    //光照颜色
    directionLight.color = new Laya.Vector3(1, 1, 1);
    directionLight.transform.rotate(new Laya.Vector3(-3.14 / 3, 0, 0));

    //使用材质
    var skyboxMaterial = Laya.Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat") as BaseMaterial;
    var skyRenderer = camera.skyRenderer;
    skyRenderer.mesh = Laya.SkyBox.instance;
    skyRenderer.material = skyboxMaterial;

    //关闭场景中的子节点
    (_scene.getChildByName('Scenes').getChildByName('HeightMap') as Laya.MeshSprite3D).active = false;
    (_scene.getChildByName('Scenes').getChildByName('Area') as Laya.MeshSprite3D).active = false;

    //使用纹理
    var earth1 = _scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(5, 32, 32)));
    earth1.transform.translate(new Laya.Vector3(10, 20, -8));

    var earthMat = new Laya.BlinnPhongMaterial();
    earthMat.albedoTexture = Laya.Loader.getRes("res/threeDimen/texture/earth.png");
    earthMat.albedoIntensity = 1;
    earth1.meshRenderer.material = earthMat;

    //获取Mesh资源
    var mesh = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm");
    //为精灵设置Mesh资源
    var layaMonkey = _scene.addChild(new Laya.MeshSprite3D(mesh));
    layaMonkey.transform.localScale = new Laya.Vector3(4, 4, 4);
    layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
    layaMonkey.transform.translate(new Laya.Vector3(0, 3, 7));

    //使用精灵
    var sp = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
    var layaMonkey2 = _scene.addChild(sp);
    layaMonkey2.transform.localScale = new Laya.Vector3(4, 4, 4);
    layaMonkey2.transform.translate(new Laya.Vector3(-10, 13, 0));

    //使用精灵
    pangzi = Laya.Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh") as Sprite3D;
    pangzi = _scene.addChild(pangzi);
    pangzi.transform.localScale = new Laya.Vector3(4, 4, 4);
    pangzi.transform.translate(new Laya.Vector3(-20, 13, 0));
    //获取动画组件
    pangziAnimator = pangzi.getChildAt(0).getComponent(Laya.Animator); 

    var pangAni = Laya.Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani");
    //创建动作状态
    var state1 = new Laya.AnimatorState();
    //动作名称
    state1.name = "hello";
    //动作播放起始时间
    state1.clipStart = 0 / 581;
    //动作播放结束时间
    state1.clipEnd = 581 / 581;
    //设置动作
    state1.clip = pangAni;
    //设置动作循环
    state1.clip.islooping = true;
    //为动画组件添加一个动作状态
    pangziAnimator.addState(state1);
    //播放动作
    pangziAnimator.play("hello");
}
......
```


効果を表示:

！[](img/7 png)<br/>(図7)

**Tips:**プロジェクトの中では、私たちは通常キャリア方式を採用しています。資源の管理がよくできます。