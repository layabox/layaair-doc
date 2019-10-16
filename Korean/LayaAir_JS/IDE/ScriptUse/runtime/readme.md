#런타임 사용

LayairIDE 자원 패널 아래에서 모든 구성 요소는 runtime 속성이 있으며, runtime 실행 시 논리적 종류입니다. 같은 구성 요소는 같은 runtime 종류를 사용하여 같은 기능을 실현할 수 있으며, 같은 페이지에 같은 구성 요소가 같은 기능이 필요합니다.**주의해야 할 것은 구성 요소의 runtime 논리류가 부속되지 않는다면, 계승의 대상에는 이 구성의 속성이 없을 때, 이 속성은 실패할 수 있다.(View 와 Dialog 페이지에서 사용할 수 없음)**

**runTime 스크립트와 비슷한 스크립트와 유사한 것은 runtime 구성에 새 속성을 추가할 수 없습니다.확장 스크립트 사용 추천**

**이 글은 두 페이지의 Image 구성 요소에 같은 runtime 논리 종류를 설정하여 같은 기능을 실행할 수 있으며, 실행 효과는 동영상 0에 표시됩니다:**

![0](img\0.gif)(그림 0)

###페이지 구성 요소 설정 runtime 종류

페이지 관리 디렉터리에 UI 페이지 두 개를 생성하고, 각각 몬키패지와 BGPage 라고 합니다.두 개의 UI 페이지 중 각각 Image 구성 요소를 끌어들여 runtime 속성을 game.ImageRunTime 속성으로 설정합니다.그림 1도 2의 시:

![1](img\1.png)(그림 1)

![2](img\2.png)(2)

설정이 완료된 후 UI 내보내기, 논리 코드를 작성하기 시작합니다.



###2, 코드 논리 처리

코드 모드로 바꾸기 위해 layaUI.max.all.js 파일을 여는 후 안에 등록된 종류를 발견할 수 있습니다.

![3](img\3.png)(图3)


이 종류는 UI 편집 모드에서 runtime 속성에 추가된 논리적 종류입니다. 개발자가 수동적으로 이런 종류를 만들어야 합니다. 만약 생성하지 않으면 실제 예화 UI 페이지가 잘못됩니다.

다음으로 src 디렉토리에 개미백을 생성하고, gam백에 ImageRunTime 종류를 만들고, 생성 후 실례화UI 페이지는 틀리지 않습니다.

![4](img\4.png)(图4)


그리고 ImageRunTime 에서 우리가 실현하고 싶은 효과를 작성하고, 예를 들어 크기 조정 (비슷한 단추) 을 누르면 모든 코드가 다음과 같습니다:


```typescript

var game;
(function(game){
    var ImageRunTime = (function(_super){
        var scaleTime = 100;
        function ImageRunTime(){
            ImageRunTime.super(this);
            //设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Laya.Event.MOUSE_DOWN,this,this.scaleSmal);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Laya.Event.MOUSE_UP,this, this.scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Laya.Event.MOUSE_OUT,this, this.scaleBig);
        }
        Laya.class(ImageRunTime,"game.ImageRunTime",_super);
        ImageRunTime.prototype.scaleBig = function()
		{
			//变大还原的缓动效果
			Laya.Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		ImageRunTime.prototype.scaleSmal = function()
		{
			//缩小至0.8的缓动效果
			Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
        return ImageRunTime;

    })(Laya.Image);
})(game || (game = {}));
```


이 두 UI 인터페이스를 주행 종류에서 실행할 수 있습니다. 다음과 같습니다:


```typescript

//初始化引擎
Laya.init(800, 700);
//预加载资源
Laya.loader.load("res/atlas/test.atlas", Laya.Handler.create(this, onLoaded));

function onLoaded() {
    //实例化BGPageUI页面
    var bgPage = new ui.BGPageUI();
    //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
    bgPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
    //添加到stage
    Laya.stage.addChild(bgPage);

    //实例化MonkeyPageUI页面
    var monkeyPage = new ui.MonkeyPageUI();
    //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
    monkeyPage.graphics.drawRect(0, 0, 300, 300, "#ffcccc");
    //添加到stage
    Laya.stage.addChild(monkeyPage);
    //设置第二个页面的坐标
    monkeyPage.x = 350;
}
```


최종 실행 효과



###3, runtime 논리적 상속 대상 비자체 구성 요소

이상 코드에서 자신의 구성 요소 Image 를 계승하는 효과를 보여줬고, 만약 Button 구성 요소를 계승하면 어떤 경우일까?우리가 조작해서 보자.코드 및 실행 효과는 다음과 같습니다:


```typescript

var game;
(function(game){
    var ImageRunTime = (function(_super){
        var scaleTime = 100;
        function ImageRunTime(){
            ImageRunTime.super(this);
            ......
        }
        Laya.class(ImageRunTime,"game.ImageRunTime",_super);
        ......
        return ImageRunTime;

    })(Laya.Button);
})(game || (game = {}));
```


![5](img\5.gif)(그림 5)

이때 UI 페이지에 있는 자원이 이상하게 나타났을 때 버튼을 누르는 skin 은 기본적으로 3상태로 Image 의 runtime 논리류가 Button 그룹을 계승한 후 아이메이지 요소가 아닌 Button 구성 요소다.