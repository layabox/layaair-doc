#대량 판매하여 석방하다.

###### *version :2.0.2beta   Update:2019-5-8*

Sce3D, Sprite3D 호출 중`destroy()`이후 요정이 인용한 소재, 무늬, 네그인은 요정의 소각을 따라다니지 않고 소각한다.이 잔류 된 자원 은 각각 사용해야 한다`Laya.loader.getRes(url:String)`인터페이스 (Resource) 대상 후 자원 대상을 호출`destroy()`방법을 소각하다.그러나 이런 방법은 매우 귀찮다.Layaiar2.0 개발자 편리 위해 제공`Resource.destroyUnusedResources()`인터페이스 통일 소각.

​**Tip**하나 있는 Sce3D 또는 Sprite3D 관련 자원을 깨끗이 청소해야 할 때 (destroy) 의 본체 요정 뿐만 아니라 복제의 요정 또한 소각해야 한다.이때`destroyUnusedResources`방법이 자동으로 풀릴 수 있어요. 사용하지 않고 없습니다.**잠그다**자원의

[] (img/1.png)<br>(1)

그림 1개와 같이 우리 지도에 단추를 추가했다.또한 다음 이벤트를 버튼에 추가했습니다.

> 이하 코드 선정 공식 예제([demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Resource&name=GarbageCollection)차다


```typescript

function(e:Event) {
    this._castType++;
    this._castType %= 2;
    switch (this._castType) {
    case 0: 
    	(e.target as Button).label = "释放显存";
    	this.loadScene();
    break;
    case 1: 
    	(e.target as Button).label = "加载场景";
    	if (this._scene)//_scene不为空表示场景已加载完成
    		this.garbageCollection();
    break;
}
    
/**
 * @private 销毁场景并且释放资源
 */
garbageCollection() {
   this._scene.destroy();//销毁场景
   this._scene = null;
   Laya.Resource.destroyUnusedResources();//销毁无用资源(没有被场景树引用,并且没有加资源锁的)
}

/**
 * @private 加载场景，并且将该场景添加到stage上
 */
loadScene() {
    Laya.Scene3D.load("res/threeDimen/scene/ParticleScene/Example_01.ls", Laya.Handler.create(this, function(scene){
      	this._scene = Laya.stage.addChildAt(scene, 0);
     	var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
    	camera.transform.translate(new Laya.Vector3(0, 1, 0));
     	camera.addComponent(CameraMoveScript);
    }));
 }
```


우리는 가재 장면을 클릭해서 다시 상태를 본다.

[] (img/2.png)<br>(2)

장면 에 나타난 후, 우리 는 볼 수 있다**스테이트**판넬**GPUMEmory**비교적 뚜렷한 상승폭이 있다.

그리고 우리가 석방할 것을 클릭하여 명존한다.

[] (img/3.png)<br>(2)

####자원 상쇄

때문에`destroyUnusedResources`인터페이스의 석방 메커니즘.그래서 저희가 사용할 수 없는 자원에 대해 풀릴 수 없는 자원이 필요합니다.**잠그다**.현재 잠금하는 방법은 2D, 3D 외자원 가재와 3D 대량 가재의 차이 때문에 몇 가지 다른 상쇄 방식이 있기 때문이다.

​**주의:**상쇄는 실제로 부류에 대한 것이다`Resource`자원 대상이 잠기다.

#####3D 단자원 추가 시 자원 잠금

해당하는 자원 가재 방식을 사용하여 자원을 재조정할 때 자원 대상에 대한 직접 자물쇠를 달았다.자원에 대한 다운로드 방식은 볼 수 있다**자원 추가 편**의**자원 추가**명절, 장면과 미리 설치한 가재는 포함되지 않는다.단일 장면과 예비된 카재 조정 종류는 Sce3D와 Sprite3D 로 Resource 의 자원 대상이 아니다.


```typescript

//加载Mesh
Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey2/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function(mesh) {
    //给该网格资源上锁
    mesh.lock = true;
	........
    //中间省略，我们再网格加载完成3秒后对该网格进行销毁
    Laya.timer.once(3000,this,function () 
    {
        //销毁了使用该网格的节点
        layaMonkey.destroy();
        //对使用资源进行销毁,注意调用资源destroy的话，就算加锁也是会被销毁的。
        Laya.Resource.destroyUnusedResources();
    });
}));
```


[] (img/4.png)<br>(2) 호출

[] (img/5.png)<br>(5) 호출 후 자동 석방 후

자물쇠를 붙이고 자원을 호출해 GPUMMEMOrry를 방출하지 않은 것으로 보인다.

가재`.lh`과`.ls`파일은 실제로 사용할 관련 파일을 자동으로 불러올 수 있습니다.`.lmat`재질 파일`.lani`애니메이션 파일`.lm`격자 파일 등.이 자원의 자원에 대한 자물쇠가 재조정된 Sce3D와 Sprite3D 를 통해 자원 노드를 추가해야 합니다.


```typescript

//加载精灵
Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, function(sp) {
    //获取蒙皮网格精灵
    var skinnedmesh = sp.getChildAt(0).getChildAt(0);
    //对预设的网格上锁
    skinnedmesh.meshFilter.sharedMesh.lock = true;
    //对预设所有的材质上锁
    for (var i:int = 0; i < skinnedmesh.skinnedMeshRenderer.sharedMaterials.length;i++ ){
    	skinnedmesh.skinnedMeshRenderer.sharedMaterials[i].lock = true;
    }
}));
```


#####3D 대량 가재 시 자원 잠금

자원을 대량으로 적재할 때, 반환값을 받을 수 없다.이때 개발자 통과가 필요해요.`Laya.loader.getRes(url)`대응하는 자원을 가져오기 위해 자물쇠를 채우다.


```typescript

//批量预加载方式
PreloadingRes() {
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
    Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
}

//加载完成回调
onPreLoadFinish() {
    //获取需要上锁的资源
    var skyboxMaterial = Laya.Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat");
    //资源上锁
    skyboxMaterial.lock = true;
    .......
    //获取需要上锁的资源
    var mesh = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm");
    //资源上锁 
	mesh.lock = true;
	.......
}
```


#####2D 자원 가재, 자원 상쇄

2D에서 그림 사용은`Texture`텍스처`Texture2D`무엇하지만 실질적으로 Texture 는 Texture2D 에 대한 재봉장, Texture`bitmap`속성은 바로 그가 속한 Texture2D, Texture 자체로 Texture2 uv 속성을 기록해 그림에 집중된 그림을 보여준다.

그래서 2D에서 같은 포토그래가 여러 가지 다른 Texture 는 공용된 Bitmap.이 같은 메커니즘은 개발자가 메모리 관리를 할 때 “2D의 Texture 를 소각시키면 그가 차지하는 현존도 풀려야 한다”고 오해했다.

​**이렇게 생각하는 것은 옳지 않다.여러 Texture 같은 bitmap 인용으로 Texture 는 진정한 존재가 아니다. bitmap 이 진정한 명존 대상이다.Texture 를 소각하는 것은 bitmap 소각이 아니라 이 시간에 숨길 수 없는 것이다.**

그래서 2D 그래픽과 이미지 자원에 자물쇠를 붙이는 것은 사실상 상대적인 Texture bitmap 에 잠겨 있습니다.도화를 다운로드한 후에도 사용합니다`Laya.loader.getRes(url)`그림의 Texture 텍스처를 받은 다음 Texture bitmap 속성 자물쇠를 사용합니다.


```js

init() {
	//加载场景
	Laya.loader.load('res/atlas/comp.atlas',Laya.Handler.create(this,this.onComplete));
}

onComplete(){
	//获取图集中的一个单图
	var a = Laya.loader.getRes('comp/button.png');
	//通过单图的bitmap对图集加锁
	a.bitmap.lock = true;
}
```

