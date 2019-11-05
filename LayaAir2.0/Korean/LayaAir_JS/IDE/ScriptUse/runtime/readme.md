#런타임 사용

LayairIDE 자원 패널 아래에서 모든 구성 요소는 runtime 속성이 있으며, runtime 실행 시 논리적 종류입니다. 같은 구성 요소는 같은 runtime 종류를 사용하여 같은 기능을 실현할 수 있으며, 같은 페이지에 같은 구성 요소가 같은 기능이 필요합니다.**주의해야 할 것은 구성 요소의 runtime 논리류가 부속되지 않는다면, 계승의 대상에는 이 구성의 속성이 없을 때, 이 속성은 실패할 수 있다.**

**runTime 스크립트 상속 페이지, 장면 또는 구성 요소 종류, 논리를 실현합니다.IDE 안에 장면을 설치하는 Runtime 속성은 장면 또는 대상과 연관된다**

##--**script 스크립트 방식에 비해 상속식 페이지 클래스를 직접 사용할 수 있는 속성 (IDE 내 var 속성 정의) 을 통해 this.tipll, this.scorelbl, 코드 힌트 효과** **건의: 페이지급 논리라면 페이지 안에 여러 요소를 자주 방문하여 runtime 상속식 쓰기를 사용합니다. 독립 모듈, 기능 단일, script 스크립트 스크립트 방법을 권장합니다**


**이 글은 두 페이지의 Image 구성 요소에 같은 runtime 논리 종류를 설정하여 같은 기능을 실행할 수 있으며, 실행 효과는 동영상 0에 표시됩니다:**

![0](img\0.gif)(그림 0)

###페이지 구성 요소 설정 runtime 종류

페이지 관리 디렉터리에 두 개의 scene 장면을 생성하고, 각각 MonkeyPage 와 BGPage, 다음은 src 디렉터리에 개미백을 만들고, 개미백에 ImageRunTime 종류를 만들고, 두 개의 scene 에서 각각 Image 구성 요소 설정 runtime. Imageruntime 속성을 gime.ImageRuntime (스크립트를 끌 수 있는 script 아이콘 아이콘에 끌어들인다.그림 1, 2, 3 소시: (주의!형식을 분리모드로 내보내며, 장면 코드 파일을 생성할 수 있으며, 기본값은 파일 모드로 생성되지 않습니다)

![1](img\ide1.png)(그림 1)

![1](img\ide3.png)(2)

![2](img\ide2.png)(그림 3)

설정이 완료된 후 UI 내보내기, 논리 코드를 작성하기 시작합니다.



###2, 코드 논리 처리

코드 모드로 전환

다음으로 src 디렉토리에 개미백을 생성하고, gam백에 ImageRunTime 종류를 만들고, 생성 후 실례화UI 페이지는 틀리지 않습니다.

![4](img\4.png)(그림 4)

그리고 ImageRunTime 에서 우리가 실현하고 싶은 효과를 작성하고, 예를 들어 크기 조정 (비슷한 단추) 을 누르면 모든 코드가 다음과 같습니다:


```typescript

export default class ImageRunTime extends Laya.Image{
	constructor(){
			super();
			this.scaleTime = 100;
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
		}
       scaleBig()
        {		
            //变大还原的缓动效果
            Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall()
        {	
            //缩小至0.8的缓动效果
            Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
}
```


이 두 UI 인터페이스를 주행 종류에서 실행할 수 있습니다. 다음과 같습니다:


```typescript

import GameConfig from "./GameConfig";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded() {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded() {
		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	}
}
//激活启动类
new Main();

```


편집 모드에서 f9 를 패널을 설치하는 엔진 미리 보기 프로그램에서 시작하는 장면을 mainscene 으로 설정합니다

![5](img\ide5.png) 


최종 실행 효과



###3, runtime 논리적 상속 대상 비자체 구성 요소

이상 코드에서 자신의 구성 요소 Image 를 계승하는 효과를 보여줬고, 만약 Button 구성 요소를 계승하면 어떤 경우일까?우리가 조작해서 보자.코드 및 실행 효과는 다음과 같습니다:


```typescript

export default class ImageRunTime extends Laya.Button{
	constructor(){
			super();
			...
		}
	...
	...
	...
```


![5](img\5.gif)(그림 5)

이때 UI 페이지에 있는 자원이 이상하게 나타났을 때 버튼을 누르는 skin 은 기본적으로 3상태로 Image 의 runtime 논리류가 Button 그룹을 계승한 후 아이메이지 요소가 아닌 Button 구성 요소다.