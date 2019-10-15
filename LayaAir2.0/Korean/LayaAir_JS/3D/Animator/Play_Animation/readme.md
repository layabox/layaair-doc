#애니메이션

###### *version :2.1.0beta   Update:2019-6-13*

####애니메이션 구성 요소 가져오기

다음 자원 복사 항목`bin/res`디렉토리 아래에 캐릭터 자원을 코드 로 다운로드합니다.화면에 직접 가재되면 애니메이션이 자동으로 방송될 수 있다는 것을 발견할 수 있다.우리 애니메이션 방송 어떻게 조절해야 되지?

Layair 3D 엔진의 Sprite3D 종류를 제공했습니다.`getComponent()`방법으로 모형상의 구성 요소를 가져옵니다.애니메이션 모형이 새로 생성할 때 엔진은 기본적으로 애니메이터 애니메이터 애니메이션 요소를 부여하기 때문에 다음 코드를 참고할 수 있습니다.


```typescript

//获取角色动画组件
var ani= role3D.getChildAt(0).getComponent(Laya.Animator);
```


lh 파일을 열기, 애니메이션 구성 요소가 모형 대상에 묶여 사용하였습니다.`getChildAt(0)`그 가져오기 대상 모델.그리고 통과`getComponent(Laya.Animator)`방법이 애니메이션 구성 요소를 가져오다.

**Tips: 때로는 lh 혹은 ls 파일에 여러 부자 차원 관계가 존재하고 애니메이션 구성 요소가 1층에 있을 수 없고 2층일 수도 있고 3층일 수도 있다.애니메이션 구성 요소에 대한 계급은 미술과 미리 약속한 것이다.단계를 확인한 후 getChildAt (), 또는 getChildByName () 등의 방법으로 모형을 얻은 후 애니메이션 요소를 가져올 수 있습니다.**

애니메이션 구성 요소를 가져오기 전에 ls 나 lh 를 열어 애니메이션 모듈이 있는 계층 관계를 확인하고 모형과 애니메이션 구성 요소를 가져올 수 있다.

####재생 제어

애니메이션 구성 요소를 손에 쥐고 어떻게 그 동작만 틀지?동작에 대한 통제와 전환을 위한 두 가지 방법이 있다.

그리고 이 예에는 유닛에서 애니메이션에 대한 분별이 없었고, 우리는 모형 기본 애니메이션을 사용했다**Take 01**플러그인은 lani 형식의 애니메이션 파일만 내보내는 것이다.

이 때문에 방송 중 한 단락의 애니메이션 제어는 코드 중 사용자 정의 애니메이션 편집을 늘리고 애니메이션 편집 중 시작과 종영률 방식을 설정해야 한다.

애니메이터 애니메이션 구성 요소 보기`play() `방법, 구체적인 방법 인자가 다음과 같다.

[] (img/1.png)<br>(1)

애니메이션의 한 프레임은 기존 애니메이션의 기초에 애니메이션 증가 (단편)`AnimatorState`최신 애니메이터류 제공`addState() `실제 방법으로 개발자가 애니메이션 편집 편집을 허용하고 이름을 정의한 후 플래이 (애니메이션 편집 이름) 을 통해 방영할 수 있다.이것들을 알고 우리는 애니메이션을 방영한다.코드 다음과 같습니다:

**애니메이션 순환은 유닛 편집기 애니메이션 속성에서 선택 설정을 할 수 있으며 내보내기 후 엔진은 그 설정을 따라 애니메이션 재생할 수 있습니다.그림 5, 6, 6, loop Time 선택 상자!애니메이션 애니메이션 상태를 만들거나 isliooping 속성을 true**


```typescript

//获取精灵
var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
this.scene.addChild(monkey);
//获取角色动画组件
var ani = monkey.getChildAt(0).getComponent(Laya.Animator);
//创建一个动画动作状态
var state1 = new Laya.AnimatorState();
//设置动作状态的名称
state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
state1.clipStart = 10/40;
//设置动作状态播放的结束时间
state1.clipEnd = 20/40;
//得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
state1.clip = ani.getDefaultState().clip;
//动画播放是否循环
state1.clip.islooping = true;
//添加动画状态到动画组件里
this.ani.addState(state1);
//播放动画
this.ani.play("hello");
```


번역 후 효과는 다음과 같이 순환적으로 10-20프레임만 재생한 stand 서브 애니메이션 편집.

[] (img/2.gif)<br>(2)

####유닛 에니메이션 편집

유닛은 애니메이션에 대한 단락을 나누고 편집된 단편에 이름을 붙일 수 있다.내보내는 자원은 제어할 때 애니메이션 전환을 통해 개발자들이 사용하기 편리하다.(이런 방식은 자원 내출시 애니메이션 해석 파일을 추가하여 Http 방문 횟수를 증가시켜 어떤 방식의 개발자들을 실제 상황에 따라 스스로 선택할 수 있다)

유닛 애니메이션 단락 방법 다음과 같습니다:

1)、자원관리자 중 모형 파일을 선택하여 오른쪽**inspector**인터페이스 선택**애니메이션**기본 애니메이션**Take 01**사용자 정의 명칭을 클릭하면 애니메이션 단락 증가, 수정 부분의 시작과 끝 프레임 (그림 3).

Tips: 게임에서 애니메이션 순환 재생 이 필요하면 다음 그림을 선택하십시오**Loop Time**옵션

[] (img/3.png)<br>(2)

이 예례에서 총 4개의 동작으로 미술이 제공한 애니메이션 프레임수에 따라 수정하여 4개의 애니메이션 (도 4) 로 늘렸다.

[] (img/4.png)<br>(4)

수정된 후 자원 관리자 모형에도 해당하는 애니메이션 파일을 늘릴 수 있기 때문에 애니메이션 컨트롤을 수정하고 새로 생성된 애니메이션 단락에 애니메이션 컨트롤을 가입하면 완전한 애니메이션 자원 해상 파일을 내보낼 수 없다.

[] (img/5.png)<br>(도 5)

다음 단계를 완성한 후 다시 내보내기 위한 자원 속에서도 4개의 lani 애니메이션 파일이 생성되었다.

예시 코드 수정, 재생 애니메이션 이름 적용, 효과 (그림 6).


```typescript

onComplete(){
.................     
		var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        //加载到场景
       	scene.addChild(monkey);
        //让摄影机指向角色
        camera.transform.lookAt(monkey.transform.position,new Laya.Vector3(0,1,0));
    	//获取动画组件
    	var ani = monkey.getComponent(Laya.Animator);
		//播放攻击状态
        ani.play("attack");
		//等待动画播放完成
        Laya.timer.frameLoop(1,this,function(){
            //如果当前播放state已经播放完了一次
            if(ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                //回到站立状态
                ani.play("stand");
            } 
        });
}

```


[] (img/6.gif)<br>(도 6)
