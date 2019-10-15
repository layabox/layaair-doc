#Layair3D 애니메이션

현재 Layaiar3D 엔진은 애니메이션 부분에 대해 다량의 조정을 하고 있지만, 애니메이션 애니메이션에 대한 보류는 했지만 개발자들이 새로운 애니메이션 구성 요소를 사용할 것을 건의했다.새 애니메이션 애니메이터 구성은 로판 애니메이션의 여러 종류를 정합, 분류하지 않고 개발시간을 절약하고, 골격 애니메이션, 재질 애니메이션, 강체 애니메이션, 카메라 애니메이션 등을 포함했다.

애니메이터 애니메이션 구성 지원 유닛이 내보내는 애니메이션, 골격 애니메이션 모형은 유닛 도입 후 통합 편집, 재질 애니메이션, 강체 애니메이션, 유닛 에니메이션 편집, 유닛에서 직접 사용하면 된다.

###캐릭터 골격 애니메이션

게임 캐릭터 복피 골격 애니메이션은 3D 게임에서 대량의 운용으로 캐릭터 애니메이션 모형을 유닛 에디션을 편집한 뒤 리야에이어로 내보내는 것이다.

####애니메이션 편집 절차

1. 모형 가져오기.유닛 자원 관리자에서 오른쪽 단추를 가져오기 (Import New Assets) FBX 형식 자원, 스티커 자원, 모형 끌어당겨서 재질 스티커를 조정하고 저장하고, 이 예에 저장된 장면은'monkey'라고 합니다.

2, 애니메이션 컨트롤러 만들기.유닛 자원 관리자 가운데 오른쪽 버튼을 켜서 메뉴 만들기 (Create) 애니메이션 컨트롤러 (Animmator Controller) 에 따라 애니메이션 이름을 지어서 이 예에 따라 모니메이션 (monkeyAction)

3. 애니메이션 컨트롤러 편집.애니메이션 컨트롤러를 두 번 누르면 애니메이션 컨트롤러 인터페이스 편집, 가져오는 모형 오른쪽'작은 삼각'을 누르면 '재생 태그' 파일을 모형 애니메이션 파일로, 기본적으로 'Take 001' 으로 잡아당겨 애니메이션 컨트롤러 인터페이스 (그림 1) 로 저장합니다.

![1](img/1.png)(图1)</br>


4. 애니메이션 컨트롤러 납치.장면 속 캐릭터 모형을 선택하여 캐릭터 애니메이션 컨트롤을 선택한 모형 애니메이션 구성 요소 (2) 에 부여해 애니메이션 구성 요소를 늘려야 한다. 그렇지 않으면 내보내는 애니메이션은 방영되지 않는다.

![2](img/2.png)(2)</br>>

이상의 절차를 거쳐 우리는 캐릭터 애니메이션을 유닛의 편집을 완성하고 유닛에서 실행 버튼을 누르면 우리는 애니메이션이 방영되는 것을 볼 수 있다.애니메이션 재생에 문제가 없다면 이전'유닛 플러그인 도구 사용'교정 방법에 따라 Layair의 자원을 내보낼 수 있다.

**Tips: 다른 애니메이션은 유닛 처리 방식도 일치하고, 다음과 같은 절차: 장면 모형에 애니메이션 구성 요소인 애니메이션 컨트롤러 만들기 — 애니메이션 콘솔을 애니메이션 컨트롤러에 넣어 모형 애니메이션 구성 요소를 추가합니다.**

####Layair 캐릭터 애니메이션 실현

다음 자원 복사를 항목 BIN 디렉토리로 내보내며, 코드 카탈로그를 통해 캐릭터 자원을 불러오기, 생성 후 자동으로 애니메이션을 재생하고 순환 (도 3) 참고코드:


```typescript

// 程序入口
class Main {
    constructor() {
        //初始化引擎
        Laya3D.init(0, 0);

        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        //开启统计信息
        Laya.Stat.show();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        Laya.Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
            //加载完成后sprite3d 加入场景
            var hero:Laya.Sprite3D = scene.addChild(sp) as Laya.Sprite3D;
            //相机指向角色
            camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0));

        }));
    }
}
new Main();
```


![3](img/3.gif)(2)</br>>



####캐릭터 애니메이션 제어와 분해

**애니메이션 구성 요소 가져오기**

위의 예를 통해 우리는 애니메이션이 자동으로 방영되는 것을 보고 애니메이션은 몇 가지 동작을 포함해 어떻게 애니메이션의 방영을 통제할까?우선 모형상의 애니메이션 구성 요소를 가져야 재생 통제, 멈춰야 한다.

Layaiair 3D 엔진의 3D 모형 Sprite3D 종류는 getCompont () 방법으로 모형 구성 요소를 제공합니다.애니메이션 모형이 새로 생성할 때 엔진은 기본적으로 애니메이터 애니메이터 애니메이션 요소를 부여하기 때문에 다음 코드를 참고할 수 있습니다.

LH 파일을 열기, 애니메이션 구성 요소가 모형에 묶여 있어서 'getChildAt (0)' 을 사용하였습니다.그리고 getComponte(Laya.Animmator)를 통해 애니메이션 구성 요소를 가져옵니다.


```typescript

//获取角色动画组件
var ani:Laya.Animator = hero.getChildAt(0).getComponent(Laya.Animator);
```


**Tips: 때로는 lh 혹은 ls 파일에 여러 부자 차원 관계가 존재하고 애니메이션 구성 요소가 1층에 있을 수 없고 2층이 3층일 수도 있다.따라서 애니메이션 구성 요소를 가져오기 전에 ls 나 lh, 애니메이션 모형이 있는 계층 관계를 확인하고, getChildAt (), getChildByName () 등의 방법으로 모형을 얻은 다음 애니메이션 구성 요소를 가져올 수 있습니다.그렇지 않으면 절차가 틀리게 된다!!**

**재생 제어**

애니메이션 구성 요소가 생겨서 왜 그 중 하나밖에 안 나와?동작에 대한 통제와 전환을 위한 두 가지 방법이 있다.

####1. 코드 정의 애니메이션 편집

유닛에서 애니메이션에 대한 구분을 하지 않았고, 우리는 모형적인 기본 애니메이션 Take 001, 플러그인은 한 개만 가져왔다.

이 때문에 방송 중 한 단락의 애니메이션 제어는 코드 중 사용자 정의 애니메이션 편집을 늘리고 애니메이션 편집 중 시작과 종영률 방식을 설정해야 한다.

애니메이터 애니메이션 구성 요소 중 play () 방법 보기, 구체적인 방법은 다음과 같습니다:

**Tips:1.7.10판 후 play () 방법은 순환, 시작 프레임율, 엔딩률 인자를 취소했습니다.애니메이션 순환 여부는 유닛 편집기 애니메이션 속성에서 선택 설정을 진행하고 내보내면 엔진은 그 설정을 따라 애니메이션 재생합니다.그림 5, 6, 6, loop Time 선택 상자!**


```java

/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
 
```


**애니메이션 같은 한 프레임은 기존 애니메이션 편집을 늘리기 위한 애니메이션 클립을 만들기 위해 애니메이션 클립을 최신 애니메이션 Clip () 종류는 addClip () 의 실례 방법을 제공해 애니메이션 편집 편집을 허용할 수 있으며, 플래이 (애니메이션 클립) 을 통해 방영된다.**


```java

/**
* 添加动画片段。
* @param	clip 动画片段。
* @param	playName 动画片段播放名称，如果为null,则使用clip.name作为播放名称。
* @param   开始帧率。
* @param   结束帧率。
*/
public function addClip(clip:AnimationClip, playName:String = null, startFrame:int = 0, endFrame:int = 4294967295
```


예제 중 코드 수정:


```typescript

 //添加自定义模型
Laya.Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
            //加载完成后sprite3d 加入场景
            var hero:Laya.Sprite3D = scene.addChild(sp) as Laya.Sprite3D;
            //相机指向角色
            camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0));
            //获取角色动画组件
            var ani:Laya.Animator = hero.getChildAt(0).getComponent(Laya.Animator);
            //创建一个动画动作状态
            var state_1:Laya.AnimatorState = new Laya.AnimatorState();
            //设置动作状态名称
            state_1.name = "hello";
         //设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
            state_1.clipStart = 10/40;
            //设置动作状态播放的结束时间
            state_1.clipEnd = 20/40;
            //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
            state_1.clip = ani.getDefaultState().clip;
            //动画播放是否循环
            state_1.clip.islooping = true;
            //添加动画状态到动画组件里
            ani.addState(state_1);
            //播放动画
            ani.play("hello");
        }));
```


번역 후 효과는 다음과 같이 순환적으로 10-20프레임만 재생한 stand 서브 애니메이션 편집.

![动图4](img/4.gif)< br > (그림 4)



####2.유닛 에니메이션 편집

유닛은 애니메이션에 대한 단락을 나누고 편집된 단편에 이름을 붙일 수 있다.내보내는 자원은 제어할 때 애니메이션 전환을 통해 개발자들이 사용하기 편리하다.(이런 방식은 자원 내출시 애니메이션 해석 파일을 늘려 Htp 방문 횟수를 늘리며 어떤 방식의 개발자들을 경우 자체적으로 고려할 수 있다)

유닛 애니메이션 단락 방법 다음과 같습니다:

1)、자원관리자 중 모형 파일을 선택하여 오른쪽 inspectoor 인터페이스에서 애니메이션을 선택하여 기본 애니메이션 Take 01을 클릭하여 사용자 정의 이름을 클릭하여 애니메이션 세션을 늘리며 플릿을 수정하는 시초와 종정 프레임 (그림 5)

Tips: 게임에서 애니메이션 재생 이 필요하면 다음 그림을 선택하십시오.

![5](img/5.png)(도 5)</br>>

이 예례에서 동작을 일격해 미술이 제공한 애니메이션 프레임수에 따라 수정하여 4개의 애니메이션 (도 6) 로 늘렸다.

![6](img/6.png)(도 6)</br>>

2), 수정 후 자원 관리자 모형에서도 해당되는 애니메이션 파일을 늘릴 수 있기 때문에 애니메이션 컨트롤을 수정하고 새로 생성된 애니메이션에 애니메이션 콘텐츠에 가입하면 완전한 애니메이션 자원 해석 파일 (7)

![7](img/7.png)(7)</br>>

다음 단계를 완성한 후 다시 내보내기 위한 자원 속에서도 4개의 lani 애니메이션 파일이 생성되었다.

예시 코드 수정, 재생 애니메이션 이름 적용, 효과 (그림 8)


```typescript

......
Laya.Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
            //加载完成后sprite3d 加入场景
            var hero:Laya.Sprite3D = scene.addChild(sp) as Laya.Sprite3D;
            //相机指向角色
            camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0));
 			//获取角色动画组件
            var ani:Laya.Animator = hero.getChildAt(0).getComponent(Laya.Animator);
            //监听默认动画完成后播放站立动画
          	ani.on(Laya.Event.COMPLETE,this,this.onAniComplete,[ani]);
         	//播放攻击动画
         	ani.play("attack");
}));

/***当前动画播放完成后回调***/
private onAniComplete(ani:Laya.Animator):void
{
  //切换站立动画
  this.ani.play("stand");
}
```


![8](img/8.gif)(그림 8)</br>>