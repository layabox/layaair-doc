#Layaiar3D 자원 석방

###왜 자원을 석방합니까

Layaiar3D 게임 개발에서 자원 석방이 중요하다.3D 자원은 모형, 스티커, 재질, 애니메이션 등을 포함해 좋은 화면 효과를 위해 파일이 2D보다 많을 것이며, 3D 엔진은 기본적으로 GPU 에 넣어서 렌더를 계산하기 때문에 많은 현존을 점용한다.게임의 관람카드가 계속 가재되고, 게임이 끊임없이 깊숙이 들어가 있는 자원이 갈수록 늘어나고, 자원을 방출하지 않으면 게임이 결국 무너진다.

메모리 같지 않고 메모리 쓰레기 회수 메커니즘이 있으며, 현존이 다르므로 수동적으로 석방되어야 하기 때문에 현존하는 자원 석방은 중요시되어야 합니다!

관찰도 1, 도 2중 통계 도구 중 현존 크기

1 게임이 시작된 후 가재된 첫 장면은 30527으로 69.2m를 점용한다.

![1](img/1.png)(1)</br>>

2 게임에 게재된 2장면, 면수는 7455 정도였지만 재재 후 현존자원은 118.91m이다.이게 무슨 이유죠?낯이 적고, 장면이 작고, 스티커도 사실 1 중 장면이 적고, 사진만 찍는 것만으로도 작지만, 자원이 더 커졌다!

첫 번째 장면의 자원이 석방되지 않았기 때문에 자원이 아직 남아 있어 현존점용이 커졌다.만약 수동적으로 제거하지 않으면, 게임은 다른 장면을 계속 전환하고 일정량에 이르렀을 때 휴대폰의 현존이 소모된다. 게임카드사, 드라이브, 발열 등의 현상이 빈번하게 나타날 것이다.

![2](img/2.png)(图2)</br>







###자원 재생 시 처리 원칙

Google은 Layaiar3D 엔진을 통해 자원과 현존하는 관계를 볼 수 있습니다. 게임 성능 최적화 목적을 달성하기 위해 자원을 가재할 때도 원칙에 주의해야 합니다.

1. 자원을 연산할 때 모든 자원을 한꺼번에 모두 가재 하지 말고 필요한 자원 (분대화 모드)3D 자원을 다운로드하면 자원 접미사 이름에 따라 3D 디스플레이를 직접 생성할 수 있으며, 예를 들어 ls 는 Sprite3D 대상 등을 생성할 것이며, 좋은 대상 자원을 생성할 것이고, 무대에 놓지 않았더라도 직접 보관 중 자원이 많이 남아 있다.

2, 합리적 관리 현존, 자주 사용하는 자원은 현존에 석방할 필요가 없으며, 반복하지 않는 자원은 사용이 완료되고 즉시 성능을 절약합니다.예를 들어 주역 자원, 3D 소품 자원, 게이머들이 자주 사용하여 항상 메모 중, 추출 속도가 빠르고, 일부 대형 장면은 교환할 때 자원을 방출할 수 있으며, 장면 관경 체크 스티커, 모형 자원이 커서, 석방 후 수십 조 크기의 현존 비용을 절약할 수 있다.



###현존 자원 방출 방법

재고자원을 방출하는 방법은 두 가지 방법이다. 일종의 대상을 통해 현존자원을 풀려나지만 자원 대상이 너무 귀찮아서 추천하지 않는다.또 한 가지 자원 주소를 통해 현존자원을 풀고 자원 관리 차원에서 자원 주소를 통해 더 유연해 JSON 데이터 리스트를 설정할 수 있다.

####광경과 자원의 과도 인터페이스를 전환합니다.

자원과 화면 전환을 가재할 때, IDE 에서 디스플레이 인터페이스를 설정할 때, 그림 3에 표시하는 것처럼

![3](img/3.png)(2)</br>>

IDE 발표 후 제어 종류를 작성하고 논리적 코드 참조:


```typescript

var AssetLoadView = (function(_super){
    function AssetLoadView(){
        AssetLoadView.super(this);
    }
    Laya.class(AssetLoadView,"AssetLoadView",_super);
    /*初始化，进度计时*/
    AssetLoadView.prototype.init = function(){
        this.progress = 0;
        //进度增加的帧循环
        Laya.timer.loop(20,this,this.onLoop);
    }
    AssetLoadView.prototype.onLoop = function(){
        //进度增加
        this.progress++;
        //最高100%进度
        if(this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏...";
            Laya.timer.clearAll(this);
            this.removeSelf();
        }
        else{
            this.pro.value = this.progress/100;
            this.tips.text = "游戏正在加载中，当前进度为："+this.progress+"%!";
        }
    }
    return AssetLoadView;
})(ui.ProgressBarUI);
```




####자원 주소 표 를 통해 현존 자원 을 방출 하다

주류에서 우리는 마우스 복식 무대 방식으로 장소를 바꾸고 자원 주소를 사용하여 현존자원을 풀고 새로운 장면을 가재합니다.

자원 경로 목록을 통해 유연하게 설정된 방식을 통해 표에서 자원을 삭제하는 것도 편리하다.예를 들어 미술을 내보내면 JSON 시계를 새로 지어서 이 장면을 바꿀 때 필요한 자원 경로를 J 시계에 넣어두면 유용한 자원 자원이 불입되지 않으면 자원이 풀리지 않는다. 예를 들어 일부 공용된 NPC, 도구, 특효 등 게임 원소 자원을 사용한다.

Tips: 광경 사진 스티커 lightmap, 소재, lmat, 모형, 다양한 유형 스티커, png, jpg, 애니메이션, 골격.

다음은 자원 리스트 방법을 소개합니다. 우선 자원 파일 목록에서 json 파일을 만들고, 석방할 경로자원을 편집하고, Json 디지털, 이름은 ls 파일과 일치하여 논리적 호출, 이 예를 들어 loveScen.json 입니다.그림 5, 6.

![5](img/5.png)(도 5)</br>>

![6](img/6.png)(도 6)</br>>

Json 이 편집한 후 도구 검출 형식이 올바르지 여부를 검사할 수 있습니다.다음 주 코드 만들기:


```typescript

//初始化引擎
Laya3D.init(1334,750,true);
//画布垂直居中对齐
Laya.static.alignV = Laya.Stage.ALIGN_MIDDLE;
//画布水平居中对齐
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
//等比缩放
Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = "horizontal";
//开启统计信息
Laya.Stat.show();

//加载2D资源
Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,on2DComplete));

/*加载2D资源完成回调*/
function on2DComplete(){
    //实例化加载进度页面
    this.progress = new AssetLoadView();
    this.progress.init();
    this.progress.loadTitle.text = "资源加载与释放示例";
    //加载第一关场景角色3D资源（不能全部加载，否则太占显存）
    Laya.loader.create([{url:"LayaScene_loveScene/loveScene.ls"},
                            {url:"LayaScene_girl/girl.lh"}],Laya.Handler.create(this,on3DComplete));
}
/*加载3D资源完成回调*/
function on3DComplete(){
    //实例化场景
    this.scene = Laya.loader.getRes("LayaScene_loveScene/loveScene.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);

    //实例化摄像机
    this.camera = new Laya.Camera();
    //移动摄像机位置
    this.camera.transform.translate(new Laya.Vector3(-1,2,15));
    //设置摄像机视野范围（角度）
    this.camera.fieldOfView = 25;
    this.camera.transform.lookAt(new Laya.Vector3(-1,0,0),new Laya.Vector3(0,0,0));
    this.scene.addChild(this.camera);

    //实例化角色添加到场景
    this.role = Laya.loader.getRes("LayaScene_girl/girl.lh");
    this.scene.addChild(this.role);
    
    //双击游戏画面切换场景
    Laya.stage.on(Laya.Event.DOUBLE_CLICK,this,onChangeScene);
}
/*加载第二关场景资源，切换场景*/
function onChangeScene(){
    //去除双击事件监听
    Laya.stage.off(Laya.Event.DOUBLE_CLICK,this,this.onChangeScene);
    //切换场景加载界面
    this.progress.init();
    this.progress.loadTitle.text = "正在切换场景，请稍后";
    Laya.stage.addChild(this.progress);

    //移除摄像机与角色
    this.scene.removeChild(this.camera);
    this.scene.removeChild(this.role);

    //列表释放显存资源方法（释放的资源配置表）
    this.assetsDispose("LayaScene_loveScene/loveScene.json");

    //销毁之前场景
    this.scene.destroy();
    
    //加载第二关场景资源到游戏中
    this.scene = Laya.Scene.load("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);

    //摄像机的位置与对准目标
    this.camera.transform.position = new Laya.Vector3(-1,1,8);
    this.camera.transform.lookAt(new Laya.Vector3(-1.5,0.5,0),new Laya.Vector3(0,0,0));

    //添加摄像机与角色到新场景
    this.scene.addChild(this.camera);
    this.scene.addChild(this.role);
    this.role.transform.position = new Laya.Vector3(-1,0,-3.5);

    //设置场景层级在最下层
    Laya.stage.setChildIndex(this.scene,0);

    //现有显存中的资源
    console.log("现有显存中的资源：",Laya.Loader.loadedMap);
}
    /**
 * 列表释放显存资源方法(利用资源表方式，每个场景配置资源路径表)
 * target3D 需要释放资源的对象资源表assetsUrl:String
 */ 
function assetsDispose (assetsUrl){
    //加载盘释放的资源配置表
    Laya.loader.load([{url:assetsUrl,type:Laya.Loader.JSON}],
                            Laya.Handler.create(this,onAssetsOK,[assetsUrl]));
}
/*加载资源释放表完成后*/
function onAssetsOK(assetsUrl){
    //获取加载的数据（Json数组转化成数组）
    var arr = Laya.loader.getRes(assetsUrl);
    for(var i = arr.length - 1;i>-1;i--){
        //根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
        var resource = Laya.loader.getRes(arr[i].url);
        //资源释放
        resource.dispose();
    }
}
```


이 같은 코드의 asetsdispose (asetsul:String) 방법을 관찰해 설정표를 가재한 후 우리는 Laya.loader.getRes(arr[i].url) 방법으로 자원을 직접 취득한 대상(창건할 때 url 후두철에 따라 다른 유형 대상, getRes 방법으로 직접 읽을 수 있으며, 그것들은 Resource 종류 때문에 상대가 dispose() 방법을 사용하면 출자할 수 있다.원천

자원을 풀고 나면 Loader.loade Map 속성을 통해 기존 캐시 중인 자원을 볼 수 있다.

상술한 코드를 번역하는 것은 그림 4 효과를 볼 수 있고, 석방되어 새로운 장면을 가재할 때, 명존은 이전보다 많이 작았다.이전에 자원을 석방하지 않았을 때 118.91m로 석방된 뒤 현존은 59.68m에 불과했다.

![4](img/4.png)