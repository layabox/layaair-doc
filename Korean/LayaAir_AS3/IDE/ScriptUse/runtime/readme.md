#런타임 사용

LayairIDE 자원 패널 아래에서 모든 구성 요소는 runtime 속성이 있으며, runtime 실행 시 논리적 종류입니다. 같은 구성 요소는 같은 runtime 종류를 사용하여 같은 기능을 실현할 수 있으며, 같은 페이지에 같은 구성 요소가 같은 기능이 필요합니다.**주의해야 할 것은 구성 요소의 runtime 논리류가 계승하지 않으면 그 구성의 속성이 없을 때, 이 속성은 실효될 수 있다.**

**runTime 스크립트와 비슷한 스크립트와 유사한 것은 runtime 구성에 새 속성을 추가할 수 없습니다.확장 스크립트 사용 추천**

**이 글은 두 페이지의 Image 구성 요소에 같은 runtime 논리 종류를 설정하여 같은 기능을 실행할 수 있으며, 실행 효과는 동영상 0에 표시됩니다:**

![0](img\0.gif)(그림 0)

###페이지 구성 요소 설정 runtime 종류

페이지 관리 디렉터리에 UI 페이지 두 개를 생성하고, 각각 몬키패지와 BGPage 라고 합니다.두 개의 UI 페이지 중 각각 Image 구성 요소를 끌어들여 runtime 속성을 game.ImageRunTime 속성으로 설정합니다.그림 1도 2의 시:

![1](img\1.png)(그림 1)

![2](img\2.png)(2)

설정이 완료된 후 UI 내보내기, 논리 코드를 작성하기 시작합니다.



###2, 코드 논리 처리

FlashBuilder 에서 BGPageUI 와 MonkeyPageUI 종류를 열고 다음 그림의 오류가 발견됩니다. (여기서 BGPageUI 종류, MonkeyPageUI 같은 BGPageUI 종류):

![3](img\3.png)(그림 3)

이 신문은 걱정할 필요가 없다. 프로젝트 중 ImageRunTime 논리류는 개발자가 만들어야 할 것이며, 창립도 하지 않았고, 개me 가방도 없기 때문에 편집기가 찾지 못해 오류가 발생했다.

다음으로 src 디렉터리에 개미백을 생성합니다. gam백에 ImageRunTime 종류를 생성합니다.창건한 후 우리는 BGPageUI 와 MonkeyPageUI 종류의 오류가 사라진 것을 발견할 수 있습니다.

![4](img\4.png)(그림 4)

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
			this.on(Event.MOUSE_DOWN,this,scaleSmal);
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
		private function scaleSmal():void
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
	import laya.utils.Handler;
	import ui.BGPageUI;
	import ui.MonkeyPageUI;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(800, 700);
			//预加载资源
			Laya.loader.load("res/atlas/test.atlas",Handler.create(this,onLoaded));
		}		
		
		private function onLoaded():void
		{
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


![5](img\5.gif)(图5)


이때 우리는 UI 페이지에 있는 자원이 이상하게 나타났다는 것을 발견할 수 있습니다. 버튼의 스킨은 기본적으로 3상태로 Image 의 runtime 논리류가 Button 그룹에서 계승된 후 아이메이지 구성이 아닌 Button 구성 요소입니다.



