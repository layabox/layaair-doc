#3D 캐릭터 전환과 애니메이션

###3D 실례 분석 및 자원 준비

기술 문서의 학습을 통해 우리는 기본적으로 3D 게임 개발의 기초지식을 파악했다.다음으로 우리는 3D 기술의 종합 운용을 실례를 통해 설명할 것이다.

이하 예례 효과 (도 1) 를 관찰하는 것은 게임 중 3D 캐릭터가 인터페이스를 선택하고, 우선 예시의 3D 게임 세계로 구성된 부분을 분석해 보자.

![1](img/1.gif)(图1)</br>



####2D 인터페이스 3D와 결합

3D 장면은 2D 인터페이스와 자주 섞여 사용되고, 이 예에서 UI 부분은 LayairiDE 편집으로, 자원 가재 공급 페이지와 게임에서 UI 페이지를 제어합니다.그들의 제작 방법은 2D 게임과 완전히 일치하여 IDE 편집 인터페이스에 익숙하지 않다면 "기술 문서인 LayairIDE 편" 을 참고할 수 있다.



####3D 장면

예를 들어 장면 모형은 3ds max 중 FBX 로 내보내며 유틸리티에서 편집한 다음 두 개의 작업이 있습니다:

스크린샷을 편집하기 위해 스티커를 생성하면 모형 사이의 정적 음영, 빛깔, 분위기를 연출할 수 있는 효과는 매우 중요하다. 게임의 미술 품질을 강화할 수 있다.

2위 광고 이동 소재 UV 애니메이션 편집.3ds max 소재 UV 애니메이션이 유틸리티에서 지원하지 않는 것이 주의가 필요해 유닛에서 만들어야 한다.

재질 UV 애니메이션 유닛 제작 방법'기술 문서-Layaiair 3D 엔진-Layair3D 애니메이션 2'



####3D 캐릭터와 골격 애니메이션

3D 캐릭터 모형과 골격 애니메이션은 모두 3ds max 에서 내보내며 유닛 에니메이션 편집, 애니메이션 증가 요소 등을 도입한다.

캐릭터에 주의하는 골격 애니메이션은 max 안에서 제작할 때 시간축에서 한 번에 여러 동작을 편집하고 애니메이션 연결 방식으로 만들어진 애니메이션을 도입하고 유닛 이후에 오류 동작 및 디더현상이 쉽게 나타난다.

이 사례는 여러 개의 애니메이션 연결 방식으로 제작되어 연결된 후 애니메이션이 많은 문제가 생겨 디더링 현상과 모형 상납 현상이 발생해 오랜 시간이 걸렸다.

뼈 애니메이션 유닛 편집 방법 "기술 문서 — Layaiair 3D 엔진 — Layair3D 애니메이션 1"



####3D 효과

큐빅 필터는 강체 애니메이션(변환, 회전, 위축, 축소), 3ds max 에서 유닛으로 가져오는 것을 편집할 수 있지만 3ds max 중에서 모형을 만드는 것을 권장합니다. 유닛에서 제작할 수 있습니다. 유닛에서 재질이 강체와 결합된 애니메이션을 만들 수 있기 때문입니다.

큐빅 특효의 유닛 애니메이션 제작 방식과 유사하다.

이상 3D 자원이 유닛에서 완성된 후 리야아 내보내기 도구를 통해 각각 네개의 자원 폴더로 내보내며 각각 광경 자원 레이레이페이스neu sce02, 두 캐릭터 자원 Layasceneu girl, Layascenu boy, 광환 특정 자원 Layasceu efecect.그리고 자원 복사를 항목 h5 디렉토리에 사용할 수 있습니다.



###3D 실례 기능 코드 실현

####UI 인터페이스 기능 실현

IDE 에서 인터페이스를 편집하고, 인터페이스에 대한 요소를 var 및 name 속성 설정을 사용하여, 코드 호출, 그림 3.

인터페이스 해상도 크기와 Laya.init () 에 설치된 해상도 크기가 일치하면 화면이 적당히 맞출 수 있습니다.

자원 플러스 인터페이스 ProgressBar.ui 해상

![2](img/2.png)(图2)</br>


캐릭터 제어 단추 인터페이스 Control.ui 해석

![3](img/3.png)(2)</br>>

이상의 인터페이스를 편집한 후 ID에서 자원을 내보내며 프로젝트 폴더에 해당하는 패키지 자원과 UI 종류가 발생했습니다.우리는 두 개의 UI 디스플레이 제어 종류가 각각 그것들을 계승하고, 코드 다음과 같습니다:

진도 UI 제어류 Progressview, 종류 중 우리는 가짜 진도 (만약 초기 자원이 작다면 인터페이스가 반짝반짝 지나가)


```typescript

var ProgressView = (function(_super){
    function ProgressView(){
        ProgressView.super(this);
        this.progress = 0;
        //进度增加的帧循环
        Laya.timer.loop(30,this,this.onLoop);
    }
    Laya.class(ProgressView,"ProgressView",_super);
    var _proto = ProgressView.prototype;
    /*资源加载进度模拟（假进度）*/
    _proto.onLoop = function(){
        //进度增加
        this.progress++;
        //最高100%进度
        if(this.progress > 100){
            this.progress = 100;
            this.tips.text = "游戏加载完毕，即将进入游戏...";
            //清除所有事件监听，包括帧循环
            Laya.timer.clearAll(this);
            //进度100%后，自动移除界面
            this.removeSelf();
        }
        else{
            //更新组件显示进度
            this.pro.value = this.progress/100;
            this.tips.text = "游戏正在加载中，当前进度为："+this.progress+"%!";
        }
    }
    return ProgressView;
})(ui.ProgressUI);
```


캐릭터 제어 UI 컨트롤 컨트롤 ContorlView 를 표시하며 현재 눌렀던 단추 이름 을 주류로 보냅니다.


```typescript

var ControlView = (function(_super){
    function ControlView(){
        ControlView.super(this);
        //监听UI鼠标点击事件
        this.on(Laya.Event.MOUSE_DOWN,this,this.onClick);
    }
    Laya.class(ControlView,"ControlView",_super);
    var _proto = ControlView.prototype;
    _proto.onClick = function(e){
        //发送点击的组件名称
        this.event("btn_action",e.target.name);
    }
    return ControlView;
})(ui.ControlUI);
```


2D와 3D 결합 실현

3D 장면 Scene 은 2D의 디스플레이 대상인 Sprite 클래스를 계승하기 때문에 2D 디스플레이 대상처럼 무대에 가재할 수 있으며 setChildIndIndIndex () 방법으로 그 등급을 조정하여 배경, 인터페이스 상위 차단 관계를 처리할 수 있다.

이 때 자원 추가 진도 인터페이스 및 역할 제어 인터페이스는 3D 장면까지 설치되어 있는 상층을 사용하여 가능합니다. 이 방식을 사용하여 가능합니다. Laya.stage.setChildIndIndeex (scene, 0) 에 인터페이스와 장면을 가재할 수 있습니다.


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray= ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;
}
```


상술한 코드를 번역하면 자원 인터페이스가 끝난 후에야 3D 장면이 나타났고, 인터페이스는 3D 장면을 제어하고 있다.

3D 장면에는 소재 UV 애니메이션이 있으며 ls 를 가재한 후 애니메이션이 자동으로 재생되고 있으며 애니메이션에 대한 통제가 필요하다면 캐릭터의 애니메이션 제어 방식을 누르고 애니메이션 요소를 가져오고 애니메이션을 통해 컨트롤을 진행한다.



####3D 역할의 생성 및 제어

캐릭터 애니메이션 컨트롤이 가장 중요한 것은 애니메이션 구성 요소를 가져야 하기 때문이다. 이 예를 들어 예약 가재를 적용해 캐릭터 모형에서 직접 얻을 수 있기 때문이다.

Tips: 미리 다운로드 방식을 사용하지 않으면 Sprite.load() 비즈니스를 사용하여 감청자원 가재 작업을 마친 후에야 애니메이션 구성 요소를 얻을 수 있다. 그렇지 않으면 오류가 발생한다.

#####역할 생성:

주류에 배역 관련 전역 속성 포함 현재 캐릭터 자원, 현재 캐릭터 애니메이션 구성 요소, 현재 캐릭터 동작 이름 등을 포함, 캐릭터 만들기 방법을 추가하여 다음과 같습니다:


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray= ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
/*当前场景中角色资源*/
this.currentRole = "LayaScene_girl/girl.lh";
/*当前角色动作名*/
this.currentActive = "stand";
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas","res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    this.createRole3D();
}
/*创建角色并获取动画组件*/
function createRole3D(){
    //创建角色
    this.role3D = Laya.loader.getRes(this.currentRole);
    //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
    this.roleAni = (this.role3D.getChildAt(0)).getComponentByType(Laya.Animator);
    //监听动画完成事件
    this.roleAni.on(Laya.Event.COMPLETE,this,this.onAniComplete);
    //播放上一个角色的当前动作
    this.roleAni.play(this.currentActive);
    //角色位置
    this.role3D.transform.position = new Laya.Vector3(-3,0,1);
    this.scene.addChild(this.role3D);
}
/*动画播放完成后回调*/
function onAniComplete(){
    //如果当前的完成动画剪辑名为“play”击球
    if(this.roleAni.currentPlayClip.name == "play"){
        //完成击球后播放准备动作动画
        this.roleAni.play("ready");
        this.currentActive = "ready";
    }
}
```


상술한 코드에서 우리는 애니메이션 재생 완료된 반전을 첨가했다`this.roleAni.on(Laya.Event.COMPLETE,this,this.onAniComplete);`이는 2D 애니메이션과 기본적으로 애니메이션 편집이 완료된 뒤의 조절을 가리키며 현재 애니메이션 이름 currentPlayClip.name 판단이 어느 부분 애니메이션이 완성되었는지, 개발자들의 게임 논리를 편집할 수 있다.



#####캐릭터 애니메이션 제어

역할 컨트롤은 UI 중 버튼을 통해 제어하는 것을 누르고, 우리는 주류에 인터페이스를 첨가한 감청 이벤트 조정`this.control.on("btn_action",this,this.onBtnAction)`캐릭터를 통제하다.

캐릭터 전환 방법은 캐릭터 자원을 바꾸고 다시 생성할 수 있다고 생각하지만, Laya.loader.create() 카탈로그에 따라 이미 유형에 따라 캐릭터를 만들었고, 대상지에 배역을 넣고 캐릭터 만들기 방법을 반복적으로 바꾸기 위해 createRole3D()를 만들 때, 심성 문제를 부담 없이 대상 영역에서 창건할 수 있다.

애니메이션 전환은 주로 애니메이션 구성을 통해 재생, 정지, 동작을 전환한다.코드 수정 다음과 같이:


```typescript

/*界面资源加载完成后*/
function onUIComplete() {
    ......
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //监听控制界面按钮信息
    this.control.on("btn_action", this, onBtnAction);
    ......
}
/*控制界面动作监听回调
action：当前执行的控制名称
*/
function onBtnAction(action) {
    if (action == "change") {
        //切换角色
        this.changeRole();
    } else if (action == "playAni") {
        //播放当前动作
        this.roleAni.play(this.currentActive);
    } else if (action == "stopAni") {
        //停止动画
        this.roleAni.stop();
    } else if (action == "stand" || action == "go" || action == "ready" || action == "play") {
        //播放动作
        this.roleAni.play(action);
        this.currentActive = action;
    }
}
/*切换角色*/
function changeRole() {
    //移除角色
    this.role3D.removeSelf();
    //移除所有事件监听
    this.roleAni.offAll();
    //当前角色索引
    var index = this.roleArray.indexOf(this.currentRole);
    //下一个角色
    index++;
    if (index > this.roleArray.length - 1) {
        index = 0;
    }
    this.currentRole = this.roleArray[index];
    //创建角色
    this.createRole3D();
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    this.createRole3D();
}
```




####특효 애니메이션 만들기

특효 애니메이션 호출은 상당히 간단합니다. 이 곳에서 제어할 필요는 없습니다. 따라서 직접 캐릭터 발바닥으로 가재되면 코드가 다음과 같습니다.


```typescript

/*创建特效*/
function createEffect3D() {
    //创建特效
    this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
    this.scene.addChild(this.effect3D);
    //特效位置
    this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
    //特效缩放
    this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
}
```


스크린에서 다운로드 완료된 조정에 특효법을 추가하여 번역 실행 후 효과 (그림 1) 가 제시한 것이다.



####주류 최종 코드


```typescript

//初始化引擎
Laya3D.init(1280, 720, true);
/*****角色资源名数组******/
this.roleArray = ["LayaScene_girl/girl.lh", "LayaScene_boy/boy.lh"];
/*当前场景中角色资源*/
this.currentRole = "LayaScene_girl/girl.lh";
/*当前角色动作名*/
this.currentActive = "stand";
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

//加载2D界面资源
Laya.loader.load(["res/atlas/comp.atlas", "res/atlas/myAssets.atlas"], Laya.Handler.create(this, onUIComplete));

/*界面资源加载完成后*/
function onUIComplete() {
    //加载3D场景与角色资源（资源资源后缀名，会创建默认3D显示对象类型）
    Laya.loader.create([{ url: "LayaScene_scene02/scene02.ls" },
    { url: this.roleArray[0] }, { url: this.roleArray[1] },
    { url: "LayaScene_effect/effect.lh" }
    ], Laya.Handler.create(this, this.onSceneOK));
    //创建角色控制界面
    this.control = new ControlView();
    Laya.stage.addChild(this.control);
    //监听控制界面按钮信息
    this.control.on("btn_action", this, onBtnAction);
    //创建资源载入界面
    var assetLoad = new ProgressView();
    Laya.stage.addChild(assetLoad);
}
/*控制界面动作监听回调
action：当前执行的控制名称
*/
function onBtnAction(action) {
    if (action == "change") {
        //切换角色
        this.changeRole();
    } else if (action == "playAni") {
        //播放当前动作
        this.roleAni.play(this.currentActive);
    } else if (action == "stopAni") {
        //停止动画
        this.roleAni.stop();
    } else if (action == "stand" || action == "go" || action == "ready" || action == "play") {
        //播放动作
        this.roleAni.play(action);
        this.currentActive = action;
    }
}
/*切换角色*/
function changeRole() {
    //移除角色
    this.role3D.removeSelf();
    //移除所有事件监听
    this.roleAni.offAll();
    //当前角色索引
    var index = this.roleArray.indexOf(this.currentRole);
    //下一个角色
    index++;
    if (index > this.roleArray.length - 1) {
        index = 0;
    }
    this.currentRole = this.roleArray[index];
    //创建角色
    this.createRole3D();
}
/**
 * 场景角色加载完成后回调
 */
function onSceneOK() {
    //创建加载场景
    this.scene = Laya.loader.getRes("LayaScene_scene02/scene02.ls");
    Laya.stage.addChild(this.scene);
    //设置场景在2D界面最后（最底层为第0层）
    Laya.stage.setChildIndex(this.scene, 0);
    //创建摄像机(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera(0, 0.1, 1000);
    //加载到场景
    this.scene.addChild(camera);
    //移动摄像机位置
    camera.transform.position = new Laya.Vector3(-3, 1.5, 6);
    //旋转摄像机角度
    camera.transform.rotate(new Laya.Vector3(-6, 0, 0), true, false);
    //设置摄像机视野范围（角度） 
    camera.fieldOfView = 33;

    //创建角色
    createRole3D();
    //创建特效
    createEffect3D();
}
/*创建特效*/
function createEffect3D() {
    //创建特效
    this.effect3D = Laya.loader.getRes("LayaScene_effect/effect.lh");
    this.scene.addChild(this.effect3D);
    //特效位置
    this.effect3D.transform.position = new Laya.Vector3(-3, 0.01, 1.2);
    //特效缩放
    this.effect3D.transform.localScale = new Laya.Vector3(0.15, 0.15, 0.15);
}
/*创建角色并获取动画组件*/
function createRole3D() {
    //创建角色
    this.role3D = Laya.loader.getRes(this.currentRole);
    //获取角色动画组件（.lh格式会把scene当做一层Sprite3D导出，因此组件是在子对象上）
    this.roleAni = (this.role3D.getChildAt(0)).getComponentByType(Laya.Animator);
    //监听动画完成事件
    this.roleAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
    //播放上一个角色的当前动作
    this.roleAni.play(this.currentActive);
    //角色位置
    this.role3D.transform.position = new Laya.Vector3(-3, 0, 1);
    this.scene.addChild(this.role3D);
}
/*动画播放完成后回调*/
function onAniComplete() {
    //如果当前的完成动画剪辑名为“play”击球
    if (this.roleAni.currentPlayClip.name == "play") {
        //完成击球后播放准备动作动画
        this.roleAni.play("ready");
        this.currentActive = "ready";
    }
}
```
