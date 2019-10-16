#마이크로 마이크로 게임 포털 실전

> author: charley

일부 대형 게임에 대해서는 웨이스트 게임의 4M 초청백이 원활하지 않다. 광JS 가 4M을 넘어서기 때문에 2.1의 작은 게임 베이스를 내놓기 전에는 끊임없이 베기 기능을 할 수밖에 없어 JS가 4M보다 작다.(초보자가 있다면 이게 왜?그럼 먼저 기초를 알아보고 본문을 보자.소규모 게임 베이스 라이브러리는 2.1 버전부터 분백을 통한 형식을 지원해 올린 가방을 8M으로 확대하면 어떻게 분백을 진행할 것인가?

**이 편은 분포 방식을 소개할 뿐만 아니라, 소신 소규모 게임은 분배 과정에서 흔한 문제를 만나 실례 DEMO 를 통해 관련 소개를 통해 개발자가 작은 게임의 분포 방식과 주의사항을 이해하도록 돕는다.**



###하나, 정말 나눠야 하나요?

패키지 프로세스나 윈도메인이 익숙하지 않은 개발자라면, 분포가 문제다.또 우리는 배당을 나누기 전에 반드시 자신의 프로젝트를 분석해야 하는 것이 정말 포괄 요구가 있는 것일까?사실 현재 대다수의 제품에 대해 말하자면, 가방을 나누지 않아도 작은 오락 제품에 올라갈 수 있다.

####1, UI 가재 또는 분리 모드를 사용한 적이 있습니까?

Layaiair 엔진의 개발자, UI 대부분 레이어이더를 통해 제작됐다.

F9 의 UI 모드 옵션, 프로젝트 관리자, 오른쪽 UI 페이지에 기본 속성 설정을 설정할 때 내보내는 유형 옵션을 볼 수 있으며, 암재 모드, 복사 모드, 분리 모드, 세 가지 옵션을 볼 수 있습니다.

![图1](img/1.png) 


**기본 내장 모드**이 모드에서 UI 페이지를 내보낼 때 정보 설정 등 콘텐츠를 프로젝트의 코드 파일로 내보낼 것입니다.결국 작은 게임으로 발표될 때는 js 파일입니다.작은 게임의 로컬 포장 부피를 점용했다.그래서**작은 게임의 패키지 크기를 줄이면 UI 모드를 불러오기 모드 또는 분리 모드로 바꿀 수 있다.**이 두 모드 모두 페이지 설정 정보 등을 json 파일로 내보내며 json 파일을 URL 원격 동태를 통해 사용할 수 있으며 로컬 백공간을 점용할 수 없습니다.

>>**Tips:**
>>
>> 1, 다운로드 모드 및 분리모드의 구별은 UI 페이지를 모든 json 파일로 내보내기 위해 json 파일을 분리 모드로 각각 UI 페이지에서 독립된 json 입니다.
>>
> 2, 주의해야 할 것은 모드 및 분리 모드, 내보내는 것은 json 이기 때문에 코드를 사용할 수 있다.내장 모드 필요 없습니다.

어쨌든 패턴과 분리 패턴을 가재 패키지 JS 의 크기를 줄일 수 있다.이런 식으로 해결할 수 있다면, 분포로 해결할 필요는 없을 것이다.구체적인 상황은 항목을 보고 결정한다.

#### **2, 불필요한 JS 코드 삭제**

포맷이 없는 상황에서 HTML 페이지에 인용된 JS 모두 js 파일에 합병됩니다.그렇지 않으면 HTML 페이지 안에 있는 다른 js 는 직접 삭제할 수 있으며, 사용하지 않은 엔진 라이브러리 js.프로젝트 디렉토리 아래에서 직접 삭제할 수 있다. 이렇게 발표할 때도 다시는 나타나지 않는다.

####3, 압축과 혼동

압축 혼동 후 js 코드를 통해 가방이 많이 줄었다.JS 가 4M을 넘지 않았다면 나눠 주지 않아도 된다.자원 등 내용은 URL 동태를 가재할 수 있으며, 첫 가재 후 물리 캐시 내에 50m의 상용 캐시 콘텐츠를 초과하지 않으며, 다음에는 가재할 필요가 없다.



###둘째, 작은 게임 공식 패키지 문서

실전패키지 전에 공식 문서는 보지 못했으니 반드시 자세히 살펴보아야 한다.이것은 매우 유용합니다. 아무리 이해가 되더라도 문서의 요점을 먼저 알아야 더 잘 이해할 수 있습니다.다음과 같이 링크는 먼저 보고 뒤의 절차를 진행하십시오.

[https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html](https://developers.weixin.qq.com/minigame/dev/tutorial/base/subpackages.html)



###셋, 마이크로 게임 공식 패키지

많은 개발자들이 공식 분포 문서를 이미 보았지만, 여기에는 포인트를 주워 넘기는 것이 좋다.

####1. game.json 중 분포와 분포경로 구성된 필드


```json

{
  ...
  "subpackages": [
    {
      "name": "stage1",
      "root": "stage1/" // 可以指定一个目录，目录根目录下的 game.js 会作为入口文件，目录下所有资源将会统一打包
    }, {
      "name": "stage2",
      "root": "stage2.js" // 也可以指定一个 JS 文件
    }
  ]
  ...
}
```


subpackages 에는 여러 개의 name, root, 한 팀당 1점씩 포장, 1점으로 4M을 초과할 수 없고, 모든 게임의 초기 패키지는 8M을 넘지 않으면 된다.

모두 먼저 포장 배치의 구조와 주석 설명을 살펴보고, 초보적으로 이해해 보세요.아직도 이해가 안 된다면 뒤의 실전 배치를 결합하여 이해할 수 있다.

####2, 작은 게임 공식 분포 가재 사례 코드

소규모 게임 공식 제공[wx.loadSubpackage()](https://developers.weixin.qq.com/minigame/dev/document/subpackages/wx.loadSubpackage.html)API 계열백의 다운로드, wx.loadSubpackage 호출 후 감발백의 다운로드와 다운로드를 마운트한 후, wx.loadSubpaccess를 통해 재고합니다.예시 코드 다음과 같습니다:


```javascript

const loadTask = wx.loadSubpackage({
  name: 'stage1', // name 可以填 name 或者 root
  success: function(res) {
    // 分包加载成功后通过 success 回调
  },
  fail: function(res) {
    // 分包加载失败通过 fail 回调
  }
})
```


성공과 동시에 wx.loadsubpackage가 다시 돌아옵니다[LoadSubpackageTask](https://developers.weixin.qq.com/minigame/dev/document/subpackages/LoadSubpackageTask.html)LoadSubpackageTageTak을 통해 현재 다운로드 진도를 얻을 수 있습니다.예시 코드 다음과 같습니다:


```javascript

loadTask.onProgressUpdate(res => {
  console.log('下载进度', res.progress)
  console.log('已经下载的数据长度', res.totalBytesWritten)
  console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
})
```


이 문서는 주로 분배 방법과 개발자가 자주 만나는 window 역으로 인한 분포 문제이다.다운로드 진도는 쉽게 이해하기 쉽고 개발자 피드백 문제에 부딪치지 않았기 때문에 실전 코드에서 언급하지 않았을 때 이 문제에 부딪히면 커뮤니티에서 제출할 수 있다.



###사례 항목 다운로드

간단한 예제 항목을 다운로드 해제 후 defaultDemo 디렉터리에서 패키지를 나누기 전 예제 항목, subPackageDemo 디렉터리에서 패키지를 나누는 사례 항목입니다.개발자는 본 문서를 읽을 수 있는 동시에 분백 전과 분백 후 항목의 차이를 대비해 작은 게임 패키지를 이해하는 데 도움이 된다.

다운로드 주소:[https://github.com/layabox/layaair-doc/raw/master/project/TS/TS_subPackage_Demo.zip](https://github.com/layabox/layaair-doc/raw/master/project/TS/TS_subPackage_Demo.zip)



###5, 실전 포인트

####1, 위신 개발자 도구 및 발표 프로젝트 주의

실전분포의 첫걸음은 반드시 위챗개발자 도구 중 작은 게임 프로그램을 만들기 마련해야 한다.일단 가방을 나눠서 사용하는 것은 작은 게임의 가재 모드로 브라우저에서 달리지 못했기 때문에 모든 디버그 프로세스가 위신개발자 도구에서 완성되었습니다.그래서 여러분들을 위한 예시 항목을 다운로드하기 위해 데플디모 디모의 디렉토리 디렉터리를 열고 작은 게임 버전을 발표합니다.기초 디버그 프로세스를 뚫다.

> Tips:여기에 주의해야 할 것은 다운로드 프로젝트입니다. 기본적으로 발표된 기록은 이미 발표된 디렉터리입니다. 그래서 발표할 때 실제 디렉터리로 바꿨습니다.

####2, 베이스 버전

트위터 개발자 도구의 디버그 베이스 베이스 버전이 무엇인지 반드시 검사해야 한다. 그렇지 않으면 본문 조작을 따라 사용하면 패키지를 지원하지 않는 버전으로 디버깅을 하면 문제가 생긴다.

개발자 도구는 1.02.1806120 및 이상 버전을 사용합니다.

기초 라이브러리는 2.1.0 및 이상 버전을 사용합니다.

이 문서는 2.2.0으로 사용된다.그림 1의 보여 주기:

![图2](img/2.png) 


(2)

####3. 패키지 디렉토리 관련 조작

#####개정 game.json

패키지를 나누기 전에 포괄 디렉터리를 잘 만들어야 하고, game.json 에서 구현한다.

여기에서 우리는 간단히 포괄 디렉터리를 하나 설정합니다.defaultDemo 의 예제 항목 내의 game.json 을 다음으로 바꿀 수 있습니다:


```json

{
  "deviceOrientation": "landscape",
  "showStatusBar": false,
  "networkTimeout": {
    "request": 10000,
    "connectSocket": 10000,
    "uploadFile": 10000,
    "downloadFile": 10000
  },
  "subpackages": [
    {
      "name": "subpackage",
      "root": "js/subpackage/"
    }
  ]
}
```


계획과 완소 게임의 분백 디렉터리를 설치한 후.우리는 분배 디렉터리와 파일을 만들기 위해 간다.

#####root 경로 주의

TS 프로젝트`src`디렉터리 항목 코드 편집 및 발표 시`bin/index.html`인용이 있다.엔진 라이브러리와 함께 code.js 에 합병할 것입니다.없다`bin/index.html`안인용은 직접 복사`js`목록 아래.그래서`root`나의 경로가 js 를 놓치지 마라.제시한 대로.

![图3](img/3.png) 


(그림 3)

#####웅덩이

패키지 할때 TS 항목은 IDE 컴파일에서 유래된 갱이 존재하고 있으며, TS 프로젝트는 매번 새 js bin 디렉토리로 생성된다.그러나 매번 생성된 후에도 자동으로 생성된 js 인용도 index.html 으로 업데이트한다.그러나 방금 index.html 에서 인용된 것은 모두 code.js 에 합병될 수 있는 코드팩의 코드인 것을 원하지 않습니다.그래서 매번 편집 후 작은 게임을 발표하기 전에.index.html 을 열어 보십시오. 분백의 js 가 인용되었는지 확인하십시오.만약 인용되었다면 반드시 주석해야 한다.시계가 네 개처럼 보이다.

![图4](img/4.png) 


(그림 4)

> Tips:앞으로의 버전, 시간이 있으면 IDE 해결을 고려해 해결 전에 주의하세요.반포할 때 인용으로 분포를 실패하는 것은 피하는 것이다.

이런 번번이 반포된 체험이 좋지 않다면.개발자, 분포 내용에 대한 항목을 새로 만들기 건의합니다.메인 프로젝트에 해당하고 하나씩 항목을 책임진다.메인 가방에 다른 패키지를 가재하여 window 도메인을 사용하여 서로 교차한다.

>> 가재와 window 도메인에 대해 본문의 소개를 계속 볼 수 있습니다.



#####game.js 만들기

root 에서 구체적인 js 파일을 입구로 지정할 수 있지만, 분백에 여러 js 가 있을 수 있기 때문에 이 문서의 예례에는 디렉터리의 기본 입구 games를 채택했다.

gam.js 는 바로 bin 디렉토리에 번역한 후 분백 디렉토리를 작성하면 됩니다.game.js 에서 분배 js 경로를 도입하여 다음과 같이 제시합니다.


```javascript

require('b.js');
```




####4. 패키지 시작

1단계 분백 디렉터리와 분백 파일을 생성하면 분백 인코딩을 시작할 수 있습니다.

우선 원칙적으로, 배당을 하려면, 그렇다면.**메인 패키지 및 패키지 논리적 연관성은 최대한 적을수록 좋다**.

물론 어떤 개발자도 피할 수 없는 주파와 분포가 서로 호출되는 관련 수요가 필요하다.그래서 제가 준비한 간단한 예시에는 메인 가방에 있던 논리들을 일부 분백에 넣은 것이다.

defaultDemo 디렉토리에서 예시 항목을 엽니다. 통용된 UI 디스플레이 방법 showUI, 그래픽 업로드 후 Roaded에서 UI 논리를 보류합니다.단추 감청, 페이지 전환 등 논리가 b.ts 안에 있습니다.

구분된 b.ts 코드 다음과 같습니다:


```javascript

/**
* 分包 
*/
module subpackage{

	export class b{
        private GameMain:any;
        private ui:any;
		constructor(){
             //监听按钮btnA的点击事件，触发后处理
            this.GameMain.newUI.btnA.on(Laya.Event.CLICK, this, this.showB);
		}

            //显示B页
        private showB():void
        {
            this.GameMain.showUI(this.ui.bUI,this.GameMain.newUI)

            //监听按钮btnB的点击事件，触发后处理
            this.GameMain.newUI.btnB.on(Laya.Event.CLICK, this, this.showA);
        }

        //显示A页
        private showA():void
        {
           this.GameMain.showUI(this.ui.aUI,this.GameMain.newUI)
        
            //监听按钮btnA的点击事件，触发后处理
            this.GameMain.newUI.btnA.on(Laya.Event.CLICK, this, this.showB);
        }
	}

}
//实例化
new subpackage.b();
```


코드가 배출된 후, 우리는 메인 가방에 마이크로폰 소규모 게임 공식 배당 가재 및 반환 통지법을 잊지 말자.예시 항목에서 우리는 직접 도반에 가재된 반향에 가재할 것이다.그리고 성공한 후에 출력`success`log.예시 코드 다음과 같습니다:


```javascript

//图集加载后回调
private onLoaded():void
{
    this.showUI(ui.aUI);
    
	//小游戏官方的分包加载方式
    const loadTask = wx.loadSubpackage({
        name: 'subpackage', // name 可以填 name 或者 root
        success: function(res) {
            // 分包加载成功后通过 success 回调
            console.log("success");
        },
        fail: function(res) {
            // 分包加载失败通过 fail 回调
            console.log("fail");
        }
    });       
}
```


이 때, 작은 게임 공식 문서, 이론, 포장 프로세스는 이미 끝났어야 합니다. 우리는 작은 게임 코드를 배포할 수 있습니다. 마이크로폰 개발자 도구 중에서 효과를 볼 수 있습니다.

의외의 일이 없을 것이니 틀림없이 잘못된 신문이 있을 것이니, 우리는 계속 문서를 볼 수 있을 것이다.

####5, window 도메인

브라우저에서는 기본적으로 window 도메인에 있습니다.작은 게임은 아니다. 그래서 작은 게임은 여러 js 사이의 호출이 문제가 될 수 있기 때문에 이 문제를 해결하기 위해 IDE 가 발표할 때 모든 항목 js 와 엔진을 함께 code.js로 통합해 현재 패키지 방안을 설정하고 window 도메인에 직면하게 될 것이다.따라서 메인 가방과 분백에 호출 수요가 있을 때 호출된 함수나 변수를 우선 window 도메인에 넣어야 한다.그리고 사용할 때 앞에도 윈도우라는 키워드를 착용해야 한다.우리는 예시 항목으로 실전 체험을 진행한다.

우선 메인 가방에 사용된 유이 종류와 메인 패키지는 모두 window 도메인 패키지에 넣어서 사용할 때 직접 window 에서 꺼내면 됩니다.


```javascript

//把需要被分包中使用的放到window域里
window["ui"] = ui;
window["GameMain"] = new GameMain();
```


패키지 b.ts 에서 window 중 유i와 GameMain 종류를 꺼내야 합니다.다음 코드 추가하기:


```javascript

//从window域里取出
this.ui = window["ui"];
this.GameMain = window["GameMain"];
```


> 구체적인 실전에서 개발자는 분포 전과 분포 후 두 개의 예시 항목을 비교할 수 있다.

이 같은 경우에는 홈 가방에 분백을 사용하면, 윈도메인에 먼저 넣어서 윈도우 키워드를 사용합니다.구체적인 사용은 이렇게 간단하다.window 도메인에 대한 이해를 통해.분포로 만난 window 관련 문제는 해결될 수 있다.

###개발자 실전 건의

개발자는 내가 준 예시 항목을 먼저 나누어 시도할 수 있다. 만약 문제가 생기면, 이 문서와 비교해 준 두 개의 예제 항목의 구별을 볼 수 있다.먼저 웨이터 게임에서 뛰어.진정한 이해분포 후 자유로운 실전 소게임포트.문제가 생기면 커뮤니티에 문제를 보내고, 질문에 예례 DEMO 항목을 올릴 수 있습니다. @ 관리자 charley, 링크를 제공합니다.

후속은 개발자가 분백에 새로운 문제가 있음을 발견한다면, 본편을 다시 갱신할 것이다.



##본문 칭찬

만약 본문은 당신에게 도움이 된다고 생각하시면, 스코드가 작가님을 환영합니다. 당신의 격려는 우리가 더 우수한 문서의 동력입니다.

![wechatPay](../../../wechatPay.jpg)