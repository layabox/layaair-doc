#런타임 사용

LayairIDE 자원 패널 아래에서 모든 구성 요소는 runtime 속성이 있으며, runtime 실행 시 논리적 종류입니다. 같은 구성 요소는 같은 runtime 종류를 사용하여 같은 기능을 실현할 수 있으며, 같은 페이지에 같은 구성 요소가 같은 기능이 필요합니다.**주의해야 할 것은 구성 요소의 runtime 논리류가 부속되지 않는다면, 계승의 대상에는 이 구성의 속성이 없을 때, 이 속성은 실패할 수 있다.**

**runtime 스크립트는 스크립트 스크립트와 비슷하며, 다른 것은 runtime 스크립트를 실현하고, 페이지, 배경, 구성 요소, 논리를 실현합니다.IDE 안에 장면을 설치하는 Runtime 속성은 장면 또는 대상과 연관된다**

##--**script 스크립트 방식에 비하면 속성 (IDE 내 var 속성 정의를 통해 this.tipll, this.scorell, this.scorelbl, 코드팁 효과가 있다.script 스크립트는 this.owner.getChildByName ('xxx)' 등의 방식으로 노드를 얻을 수 있습니다.** **건의: 페이지급의 논리라면 페이지 안에 여러 요소를 자주 방문하여 runtime 상속식 쓰기를 사용합니다. 독립 모듈, 기능 단일, script 스크립트 스크립트 방법으로 IDE 새 2d 사례 항목을 참고하십시오**

**이 글은 두 페이지의 Image 구성 요소에 같은 runtime 논리 종류를 설정하여 같은 기능을 실행할 수 있으며, 실행 효과는 동영상 0에 표시됩니다:**

![0](img\0.gif)(그림 0)

###페이지 구성 요소 설정 runtime 종류

페이지 관리 디렉터리에 UI 페이지 두 개를 생성하고, 각각 몬키패지와 BGPage 라고 합니다.아래와 같이

주의!!이 형식을 분리모드로 내보내며, 비파일 모드로 UI 스크립트를 생성할 수 있으며, 기본값은 파일 모드, 파일 모드에서 페이지를 생성할 수 없습니다.

![1](img\ide1.png)

두 개의 UI 페이지 중 각각 Image 구성 요소를 끌어들여 runtime 속성을 game.ImageRunTime 속성으로 설정합니다.(스크립트를 runtime script 아이콘에 끌어당기다.그림 1, 2, 3 소시: (주의!이 형식을 분리모드로 내보내며, 배경 코드 파일을 생성할 수 있습니다. 기본값은 파일 모드, 파일 모드, 비파일 모드가 아니라면, new 이 페이지는 1도 2의 보여 줄 수 없습니다.

![1](img\ide3.png)(그림 1)

![2](img\ide2.png)(2)

설정이 완료된 후 F12 로 내보내기 UI 저장에 따라 논리 코드를 작성하기 시작합니다.



###2, 코드 논리 처리

코드 모드로 전환

그리고 ImageRunTime 에서 우리가 실현하고 싶은 효과를 작성하고, 예를 들어 크기 조정 (비슷한 단추) 을 누르면 모든 코드가 다음과 같습니다:


```typescript


    /*
    ImageRunTime逻辑类 
    */
    export default class ImageRunTime extends Laya.Image{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        private scaleBig():void
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},this.scaleTime);
		}
		private scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
		}
    }

```


이 두 UI 인터페이스를 주행 종류에서 실행할 수 있습니다. 다음과 같습니다:


```typescript

import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景, 如果在编辑器中制作场景就打开下面一行注释，把实例页面的代码注掉
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);

		 //实例化BGPageUI页面
		 var bgPage: ui.BGPageUI = new ui.BGPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(bgPage);
		 //实例化MonkeyPageUI页面
		 var monkeyPage: ui.MonkeyPageUI = new ui.MonkeyPageUI();
		 //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
		 monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
		 //添加到stage
		 Laya.stage.addChild(monkeyPage);
		 //设置第二个页面的坐标
		 monkeyPage.x = 350;

	}
}
//激活启动类
new Main();
```


지금까지 1.0을 호환한 코드였습니다.

2.0 도 다음 방식으로 mainscene 을 만들 수 있으며, 두 페이지를 배경 색상 을 설정하고 다음 그림

주의: 페이지 배경 색상 색상 설정, 디자인 장면 때 참조, 실제 실행, 무효, 페이지에 rect 를 그려야 효과가 있다

이 방식은 임의로 내보내는 4가지 모드를 사용할 수 있다.

![2](img\ide4.png)

그리고 코드 주석에 따라 소개하는 방법, 장면 관리 방법으로 프로젝트 실행

최종 실행 효과



###3, runtime 논리적 상속 대상 비자체 구성 요소

이상 코드에서 자신의 구성 요소 Image 를 계승하는 효과를 보여줬고, 만약 Button 구성 요소를 계승하면 어떤 경우일까?우리가 조작해서 보자.코드 및 실행 효과는 다음과 같습니다:


```typescript

module game {
    /*
    ImageRunTime逻辑类 
    */
    export class ImageRunTime extends Laya.Button{
        public scaleTime:number = 100;
        constructor() {
            super();
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
        }
        ......
    }
}
```


![5](img\5.gif)(图5)


이때 UI 페이지에 있는 자원이 이상하게 나타났을 때 버튼을 누르는 skin 은 기본적으로 3상태로 Image 의 runtime 논리류가 Button 그룹을 계승한 후 아이메이지 요소가 아닌 Button 구성 요소다.

