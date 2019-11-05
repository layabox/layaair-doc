#メモリを一括廃棄して放出する

###### *version :2.0.2beta   Update:2019-5-8*

Scene 3 D、Sprite 3 Dが起動しています。`destroy()`その後、精霊が引用した素材やテクスチャ、グリッドは精霊の破壊に従って一緒に破壊されません。これらの残した資源はそれぞれ使う必要があります。`Laya.loader.getRes(url:String)`インターフェースはリソースオブジェクトを取得してから、リソースオブジェクトの呼び出しを行います。`destroy()`方法で廃棄する。しかし、この方法は非常に厄介です。LayaAir 2.0は開発者のために提供されました。`Resource.destroyUnusedResources()`インターフェースの統一廃棄。

​**Tip**注意：Scenee 3 DまたはSprite 3 D関連の資源を整理する必要がある場合、彼の本体の精霊だけでなく、クローンの精霊も廃棄する必要があります。この時`destroyUnusedResources`方法は自動的に釈放されます。使用されていますか？**錠をかける**の資源です。

！[](img/1.png)<br/>(図1)

図1に示すように、私たちの地図にボタンを追加しました。ボタンに以下のイベントを追加しました。

>以下のコードセクションは、公式の例から選択されます。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Resource&name=GarbageCollection))


```typescript

function(e:Event):void {
    _castType++;
    _castType %= 2;
    switch (_castType) {
    case 0: 
    	(e.target as Button).label = "释放显存";
    	loadScene();
    break;
    case 1: 
    	(e.target as Button).label = "加载场景";
    	if (_scene)//_scene不为空表示场景已加载完成
    	garbageCollection();
    break;
}
    
/**
 * @private 销毁场景并且释放资源
 */
public function garbageCollection():void {
   _scene.destroy();//销毁场景
   _scene = null;
   Resource.destroyUnusedResources();//销毁无用资源(没有被场景树引用,并且没有加资源锁的)
}

/**
 * @private 加载场景，并且将该场景添加到stage上
 */
public function loadScene():void {
    Scene3D.load("res/threeDimen/scene/ParticleScene/Example_01.ls", Handler.create(this, function(scene:Scene3D):void {
      	_scene = Laya.stage.addChildAt(scene, 0) as Scene3D;
     	var camera:Camera = scene.addChild(new Camera(0, 0.1, 100)) as Camera;
    	camera.transform.translate(new Vector3(0, 1, 0));
     	camera.addComponent(CameraMoveScript);
    }));
 }
```


私たちはロードシーンをクリックして、状態を見に来ます。

！[](img/2 png)<br/>(図2)

シーンが表示されたら、私たちは**ステージ**パネル内**GPUMemory**明らかな利得があります。

そしてクリックして現存を釈放します。

！[](img/3 png)<br/>(図3)

####リソースのロックについて

何故なら`destroyUnusedResources`界面の放出機構だから、私たちは使用されていない、しかも解放されてはいけない資源が必要です。**錠をかける**。現在の施錠方法は2 Dのため、3 D単一資源のローディングと3 D一括ローディングの違いによって、いくつかの異なるロック方式があります。

​**注意:**鍵をかけるのは実は親に対してです。`Resource`のリソースオブジェクトをロックします。

#####3 D単一資源のロード時、資源はロックされます。

対応するリソースローディング方式でリソースをロードする場合は、コールバックで取得したリソースオブジェクトに直接施錠することで実現します。リソースの読み込みに対応しています。**リソースの読み込み**の**リソースの読み込み**セクションでは、シーンとデフォルトの読み込みは含まれません。単一のシーンとプリセットのローディング・コール値の種類は、それぞれScenee 3 DとSprited 3 Dであり、Resourceからのリソースオブジェクトを継承するものではない。


```typescript

//加载Mesh
Mesh.load("res/threeDimen/skinModel/LayaMonkey2/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function(mesh:Mesh):void {
    //给该网格资源上锁
    mesh.lock = true;
	........
    //中间省略，我们再网格加载完成3秒后对该网格进行销毁
    Laya.timer.once(3000,this,function ():void 
    {
        //销毁了使用该网格的节点
        layaMonkey.destroy();
        //对使用资源进行销毁,注意调用资源destroy的话，就算加锁也是会被销毁的。
        Resource.destroyUnusedResources();
    });
}));
```


！〔〕（img/4 png）<br/>（図4）呼び出し自動解除前

！[img/5 png]<br/>（図5）呼び出し自動解除後

ロック後にリソースを呼び出してGPUMEMoryを解放することができますが、減少していません。

読み込み`.lh`を選択します`.ls`ファイルは実際に自動的に関連ファイルをロードします。`.lmat`材質ファイル、`.lani`アニメーションファイル、`.lm`グリッドファイルなど。このようなリソースに対するリソースのロックは、チューニング中のSceene 3 DとSpriteDによって取得されるリソースノードによってロックされる必要がある。


```typescript

//加载精灵
Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function(sp:Sprite3D):void {
    //获取蒙皮网格精灵
    var skinnedmesh:SkinnedMeshSprite3D = sp.getChildAt(0).getChildAt(0) as SkinnedMeshSprite3D;
    //对预设的网格上锁
    skinnedmesh.meshFilter.sharedMesh.lock = true;
    //对预设所有的材质上锁
    for (var i:int = 0; i < skinnedmesh.skinnedMeshRenderer.sharedMaterials.length;i++ ){
    	skinnedmesh.skinnedMeshRenderer.sharedMaterials[i].lock = true;
    }
}));
```


#####3 D一括ロードの場合、資源はロックされます。

リソースを大量にロードする場合、コールバックの値がもらえません。この時は開発者が通過する必要があります。`Laya.loader.getRes(url)`を選択します。


```typescript

//批量预加载方式
public function PreloadingRes():void {
//预加载所有资源
var resource:Array = [
    "res/threeDimen/scene/TerrainScene/XunLongShi.ls",
    "res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
    "res/threeDimen/texture/earth.png", 
    "res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
    "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", 
    "res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
    "res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani"
];
    
    //开始加载
    Laya.loader.create(resource, Handler.create(this, onPreLoadFinish));
}

//加载完成回调
public function onPreLoadFinish():void {
    //获取需要上锁的资源
    var skyboxMaterial:BaseMaterial = Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat") as BaseMaterial;
    //资源上锁
    skyboxMaterial.lock = true;
    .......
    //获取需要上锁的资源
    var mesh:Mesh = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm") as Mesh;
    //资源上锁 
	mesh.lock = true;
	.......
}
```


#####2 Dリソースローディング、リソースロック

2 Dでは、画像は`Texture`テクスチャ（3 Dではないので注意してください。`Texture2D`を選択します。しかし、実質的にTextureはTexture 2 Dの再パッケージ、Textureのです。`bitmap`属性は彼の所属するTexture 2 Dであり、Texture自体はTexture 2のuv属性を記録しており、図集の中の単一画像表示を実現する。

したがって、2 Dにおいては、同じセットのうちの複数の異なるTextureは共通のBitmapである。このような仕組みは、開発者がメモリ管理において「2 DのTextureを破壊した場合、彼が占めている現存も解放されるべきだ」と誤解される可能性があります。

​**そう考えるのは間違いです。複数のTextureが同一のbitmapを引用しているため、Textureは本物の現存ではなく、bitmapこそ本当の現存対象である。Textureを破壊することはbitmapを破壊することとイコールではないので、この時は現存しているものを解放できません。**

したがって、2 Dセットとピクチャリソースのロックは、実際には対応するTextureのbitmapに対して施錠されている。図セットを読み込みますか？それとも使用しますか？`Laya.loader.getRes(url)`図集の中の一つのTextureテクスチャを手に入れて、Textureのbitmap属性でロックします。


```typescript

private function init():void {
	//加载场景
	Laya.loader.load('res/atlas/comp.atlas',Handler.create(this,onComplete));
}

private function onComplete():void{
	//获取图集中的一个单图
	var a:Texture = Laya.loader.getRes('comp/button.png');
	//通过单图的bitmap对图集加锁
	a.bitmap.lock = true;
}
```

