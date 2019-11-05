##Layair3D 장면 씬씬 Scene

장면은 레이야아 엔진의 3D 세계용기를 위한 게임의 3D 화면과 각종 3D 화면을 가재하며, 게임의 카메라, 조명, 인물, 물품 등을 모두 화면에 놓아야 화면을 보여 줄 수 있으며, 게임 3D 플레이어나 3D 보기에 해당한다.

Scene 의 상속관계를 통해 Sprite 류를 계승하는 것을 볼 수 있다.그래서 간단하게 2D의 디스플레이 대상으로 볼 수 있습니다.

Layair 엔진에서 3D와 2D를 섞어 사용할 수 있으며, Scen 3D 장면과 Sprite 2D 용기나 원소는 무대에 함께 가재할 수 있다.

'3D의 여단'과정 중 기본적인 3D 응용을 세웠고, 그 중 주요 구성 요소를 합류하고, 이번 수업에서 장면의 안개 효능을 깊게 소개하고, 유닛에서 리야아 내보내기 도구 생성된 장면 파일을 게재합니다.

###장면 자원 추가

다음 코드에서 'LayaScene 01 / lovescen.ls' 파일은 유닛y3D에서 레이어어르 내보내기 플러그인' Scene '유형 생성, 파일의 확장은 laya scene.내부 배경에 필요한 광사진 스티커, 포함된 여러 개 혹은 단일 모델 파일 등이 저장되어 있다.Scene.load () 방법으로 장면에 직접 가재하여 표시할 수 있습니다.


```typescript

//初始化引擎
Laya3D.init(0, 0, true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();
//加载插件导出的场景。
var scene: Laya.Scene = Laya.Scene.load("LayaScene_01/loveScene.ls");
Laya.stage.addChild(scene);
//创建摄像机(横纵比，近距裁剪，远距裁剪)
var camera: Laya.Camera = new Laya.Camera(0, 0.1, 1000);
//加载到场景
scene.addChild(camera);
//移动摄像机位置
camera.transform.position = new Laya.Vector3(0, 5, 23);
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3(-17, 0, 0), true, false);
//设置摄像机视野范围（角度）
camera.fieldOfView = 35;
//设置背景颜色
camera.clearColor = new Laya.Vector4(0, 0, 0.6, 1);
//加入摄像机移动控制脚本
camera.addComponent(CameraMoveScript);
//创建方向光 -------------------
var light: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
//移动灯光位置
light.transform.translate(new Laya.Vector3(0, 2, 5));
//调整灯光方向
light.direction = new Laya.Vector3(0, -.5, 1);
//设置灯光环境色
light.color = new Laya.Vector3(1, 1, 1);
```


디버깅 사례 코드가 화면에 예쁜 장면을 보여 줄 수 있다.

![1](img/1.png)< br > (그림 1)

###장면 자원 추가

위의 예를 들어 Scene.load () 방법은 자원의 비동기 다운로드, 때로는 3D의 자원이 비교적 커서, 다음 화면을 높이는 체험이 필요합니다.이때 우리는 가재기로 선재할 수 있다.2D 게임 자원은 Laya.loader.loader.load () 방법으로 가재, 3D 자원은 Laya.loader.create () 이 방법을 사용하여 참고하는 AP 설명을 요청합니다.


```typescript

//单个资源
Laya.loader.create("res/Cube.ls",Laya.Handler.create(this,this.completeHandler));
//批量加载
Laya.loader.create(["res/Cube1.ls","res/Cube2.ls","res/Cube3.ls"],Laya.Handler.create(this,this.completeHandler));
//批量加载 并创建不同的类型；
Laya.loader.create([{url:"res/Cube1.ls"，"type":Laya.Scene},{url:"res/Cube2.lh","type":Laya.Sprite3D},{url:"res/Cube3.lm","type":Laya.MeshSprite3D}],Laya.Handler.create(this,this.completeHandler));
```


프로젝트에서는 일반적으로 우리는 모두 가재기의 방식을 채택하여 자원에 좋은 관리를 할 수 있다.

코드 다음과 같습니다:


```typescript

//初始化引擎
Laya3D.init(0, 0, true);
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
Laya.Stat.show();
//因为只有一个资源 所以我们传进去字符串就可以，队列的话可以传递一个数组队列。
Laya.loader.create("LayaScene_01/loveScene.ls",
    Laya.Handler.create(this, this.completeHandler), null, Laya.Scene);
function completeHandler(): void {
    // 第一种方法 获取场景
    // var scene:Laya.Scene=Laya.Scene.load("LayaScene_01/loveScene.ls");
    // 第二种方法，缓存后加载方式
    var scene: Laya.Scene = Laya.loader.getRes("LayaScene_01/loveScene.ls");
    Laya.stage.addChild(scene);
}
```


###장면 의 안개

안개 효과 는 프로젝트 에서 중요한 작용 을 하 고, 안개 효과 는 대기 를 열어 몽롱하게 보이 는 느낌 을 더욱 리얼 하게 한다.Layaiair 3D 엔진이 장면의 안개 효과를 설정할 수 있는 거리 (농도) 와 안개 효과에 해당하는 색상입니다.안개 사용이 적절한 것은 게임의 성능을 높일 뿐만 아니라 게임의 체험도 증가할 수 있다.


```typescript

//开启雾化效果
scene.enableFog = true;
//设置雾化的颜色
scene.fogColor = new Laya.Vector3(0,0,0.6);
//设置雾化的起始位置，相对于相机的距离
scene.fogStart = 10;
//设置雾化最浓处的距离。
scene.fogRange = 40;
```


위쪽 논리 코드를 첨가하는 예에 컴파일이 운영되고 있으며, 장면에는 파란색 안개가 끼어 있다(2)가 멀리 갈수록 짙어지고, 카메라가 40m에 이르면 안개가 덮인다.

![2](img/2.png)</br>(2)

###광경 사진

조명 스티커는 장면에서 3D 모형이 생기는 투영, 음영 과도, 조명 분위기, 모형 소재와 재질의 색상 영향 등이다.

3D 게임은 불빛과 모형으로 투영과 색깔의 영향을 미치는 경우가 드물다. 특히 휴대전화 게임의 카드 기능이 강하지 않으며, 모두 즉시 스튜디오 게임을 사용하면 카드를 사용하기 쉽다는 것이다.

이 문제를 해결하기 위해 장면의 광채를 비추는 것은 사진의 방식으로 모의게임의 광채를 빛내며 대량의 즉석 운산을 줄인다.

사진을 찍는 사진은 유닛y3D 편집기를 통해 스냅샷을 사용하고 사용을 권장할 때 엔진이 자동으로 빛사진을 가재할 수 있는 효과를 볼 수 있으며, 그림 1과 2중 유닛이 내보내는 빛을 사용하고 있다.

유닛에서 빛을 띤 사진이 없다면 내보내면 엔진이 잘못되지 않지만 게임의 효과는 할인된다.사진 3은 광샷 효과를 사용하지 않았고, 사진4는 빛샷 효과를 사용했고, 여호야 나쁜 일목요연하다.사진사진도 아날로그, 야경, 게임 분위기 부각시키는 데 자주 사용해 게임의 체험성을 증강시켰다.

![3](img/3.png)(그림 3)

![4](img/4.png)(그림 4)

스펙트럼에 대한 보카시 방법에 대해 설명을 많이 하지 않고 성숙한 3D 게임 미술 디자이너 는 기본적으로 빛깔 사진을 만든다.

우리는 예례 코드 내보내는 자원 트리 디렉터리를 엽니다.

**loveScene 폴더의 이름은 유닛에서 빛사진 스티커를 생성한 후 배경 이름에 따라 생성되었으며, 그 중 자원은 광샷, 원시 조명 사진은 exr 형식으로 바꾸고, 게임은 layair 엔진에서 사용하는 jpg 또는 png 형식으로 바꾸는 것이 좋다. photoshop 에서 수동으로 변동시켜 8위 색상으로 저장되며 png 형식으로 저장할 수 있으며, 자원 크기를 줄이고 게임 크기를 줄일 수 있다.자원 가재 시간.**

유닛에서 빛사진 스티커를 만들지 않으면 폴더를 생성할 수 없습니다.

![5](img/5.png)</br> (그림 5)

Jpg 형식으로 파일을 더 작게 하려면 jpg 형식으로 바꾸고, ls 프로필 파일의 빛사진 포트 경로를 수정하고, 예를 들면 (그림 6) 에서 내보내는 데이터 파일 'loveScen.ls' lovesce.ls' 를 수정하고, 그렇지 않으면 자동으로 png 형식의 그림을 찾을 수 있으며, jpg 형식의 그림을 불러올 수 없습니다.

![6](img/6.png)(/ br) (그림 6)