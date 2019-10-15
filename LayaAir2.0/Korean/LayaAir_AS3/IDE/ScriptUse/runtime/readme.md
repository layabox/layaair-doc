#런타임 사용

LayairIDE 자원 패널 아래에서 모든 구성 요소는 runtime 속성이 있으며, runtime 실행 시 논리적 종류입니다. 같은 구성 요소는 같은 runtime 종류를 사용하여 같은 기능을 실현할 수 있으며, 같은 페이지에 같은 구성 요소가 같은 기능이 필요합니다.**주의해야 할 것은 구성 요소의 runtime 논리종류가 부속되지 않는다면, 계승의 대상에는 이 구성의 속성이 없을 때, 이 속성은 실패할 수 있다**

**runtime 스크립트는 스크립트 스크립트와 비슷하며, 다른 것은 runtime 스크립트를 실현하고, 페이지, 배경, 구성 요소, 논리를 실현합니다.IDE 안에 장면을 설치하는 Runtime 속성은 장면 또는 대상과 연관된다**

***script 스크립트 방식에 비해 상속식 페이지 클래스를 직접 사용할 수 있는 속성 (IDE 내 var 속성 정의) 을 통해 this.tipll, this.scorelbl, 코드 힌트 효과**
***건의: 페이지급 논리라면 페이지 안에 여러 요소를 자주 방문하여 runtime 상속식 쓰기를 사용합니다. 독립 모듈, 기능 단일, script 스크립트 스크립트 방법을 권장합니다**

**이 글은 두 페이지의 Image 구성 요소에 같은 runtime 논리 종류를 설정하여 같은 기능을 실행할 수 있으며, 실행 효과는 동영상 0에 표시됩니다:**

![0](img\0.gif)(그림 0)

###페이지 구성 요소 설정 runtime 종류

페이지 관리 디렉터리에 UI 페이지 두 개를 생성하고, 각각 몬키패지와 BGPage 라고 합니다.아래와 같이

주의!!이 형식을 분리모드로 내보내며, 비파일 모드에만 UI 스크립트를 생성할 수 있으며, 기본 파일 모드로 UI 종류를 생성할 수 없습니다.

![1](img\ide1.png)



두 개의 UI 페이지 중 각각 Image 구성 요소를 가져와 스크립트 imageRuntime 속성 상자를 끌어 넣습니다.그림 1도 2의 시:

![1](img\ide2.png)(그림 1)

![2](img\ide3.png)(2)

설정이 완료된 후 UI 내보내기, 논리 코드를 작성하기 시작합니다.



###2, 코드 논리 처리

코드 모드에서 GameConfig.as 종류를 열면 속쪽에 보답이 있는 것을 발견할 수 있습니다. 그림 아래에 제시한 것처럼 ():

![3](img\ide5.png)(그림 3)

이 신문은 걱정할 필요가 없다. 프로젝트 중 ImageRunTime 논리류는 개발자가 만들어야 할 것이며, 창립도 하지 않았고, 개me 가방도 없기 때문에 편집기가 찾지 못해 오류가 발생했다.

다음으로 src 디렉터리에 개미백을 생성합니다. gam백에 ImageRunTime 종류를 생성합니다.창건한 후 우리는 GameConfig 종류에 대한 오류가 사라졌다. 그림 4개처럼 보이게 될 것이다.

![4](img\ide6.png)(그림 4)

그리고 ImageRunTime 에서 우리가 실현하고 싶은 효과를 작성하고, 예를 들어 크기 조정 (비슷한 단추) 을 누르면 모든 코드가 다음과 같습니다:


```typescript

package game
{
	import laya.events.Event;
	import laya.ui.Image;
	import laya.utils.Tween;
	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Image
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			//添加鼠标按下事件侦听。按时时缩小按钮。
			this.on(Event.MOUSE_DOWN,this,scaleSmall);
			//添加鼠标抬起事件侦听。抬起时还原按钮。
			this.on(Event.MOUSE_UP,this, scaleBig);
			//添加鼠标离开事件侦听。离开时还原按钮。
			this.on(Event.MOUSE_OUT,this, scaleBig);
		}
		private function scaleBig():void
		{
			//变大还原的缓动效果
			Tween.to(this, {scaleX:1,scaleY:1},scaleTime);
		}
		private function scaleSmall():void
		{
			//缩小至0.8的缓动效果
			Tween.to(this,{scaleX:0.8,scaleY:0.8},scaleTime);
		}
	}
}
```


이 두 UI 인터페이스를 주행 종류에서 실행할 수 있습니다. 다음과 같습니다:


```typescript

package {
    import laya.display.Scene;
    import laya.net.AtlasInfoManager;
    import laya.net.ResourceVersion;
    import laya.utils.Handler;
    import laya.utils.Stat;
    import laya.utils.Utils;
    import laya.d3.core.particleShuriKen.module.StartFrame;
    import laya.display.Sprite;
    import ui.BGPageUI;
    import ui.MonkeyPageUI;
    
    public class Main {
        public function Main() {
            //根据IDE设置初始化引擎      
            if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
            else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            
            //打开调试面板（IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
            if (GameConfig.debug || Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
            if (GameConfig.stat) Stat.show();
            Laya.alertGlobalError = true;
            
            //激活资源版本控制，版本文件由发布功能生成
            ResourceVersion.enable("version.json", Handler.create(this, this.onVersionLoaded), ResourceVersion.FILENAME_VERSION);
        }
        
        private function onVersionLoaded():void {
            //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
            AtlasInfoManager.enable("fileconfig.json", Handler.create(this, this.onConfigLoaded));
        }

        private function onConfigLoaded():void {
            //加载场景
            //GameConfig.startScene && Scene.open(GameConfig.startScene);

            //实例化BGPageUI页面
            var bgPage:BGPageUI = new BGPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            bgPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(bgPage);
            //实例化MonkeyPageUI页面
            var monkeyPage:MonkeyPageUI = new MonkeyPageUI();
            //为了能够清楚的看到这个页面所在的位置，在此设置设置一个背景色
            monkeyPage.graphics.drawRect(0,0,300,300,"#ffcccc");
            //添加到stage
            Laya.stage.addChild(monkeyPage);
            //设置第二个页面的坐标
            monkeyPage.x = 350;
        }
    }
}
```


최종 실행 효과



###3, runtime 논리적 상속 대상 비자체 구성 요소

이상 코드에서 자신의 구성 요소 Image 를 계승하는 효과를 보여줬고, 만약 Button 구성 요소를 계승하면 어떤 경우일까?우리가 조작해서 보자.코드 및 실행 효과는 다음과 같습니다:


```typescript

package game
{
	import laya.display.Sprite;
	import laya.events.Event;
	import laya.maths.Rectangle;
	import laya.ui.Button;
	import laya.ui.Image;
	import laya.utils.Tween;

	/**
	 *ImageRunTime逻辑类 
	 * @author mengjia
	 * 
	 */
	public class ImageRunTime extends Button
	{
		//缩放时间100毫秒
		public var scaleTime:int = 100;
		public function ImageRunTime()
		{
			//设置组件的中心点
			this.anchorX = this.anchorY = 0.5;
			......
		}
		......
	}
}
```


![5](img\5.gif)(그림 5)

이때 우리는 UI 페이지에 있는 자원이 이상하게 나타났다는 것을 발견할 수 있습니다. 버튼의 스킨은 기본적으로 3상태로 Image 의 runtime 논리류가 Button 그룹에서 계승된 후 아이메이지 구성이 아닌 Button 구성 요소입니다.



