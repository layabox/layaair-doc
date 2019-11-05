#게임 UI 프로세스 제어

###게임 프로세스 컨트롤

이전 과정에서 우리는 모든 시각화 자원을 만들어 UI 디스플레이 종류를 생성했다.이 수업은 본격적인 게임 논리 코드 편집 중 게임 개발의 흐름, 사고를 익히기 시작했고, Layair UI 기능을 배우기 시작했다.

이전의 수요에 따르면 ‘비행기 대전’의 게임의 흐름은 상대적으로 간단하고 게임 시작 — 역할 사망 — 게임 종료 — 게임 종료 — 게임 종료 — 게임 진행 중... 따라서 이 시간에 우리는 게임의 기본 흐름을 주로 실현하는데, 게임 UI 기능을 어떻게 이뤄낼지, 이는 지난 시간의 수업의 연장이다.

인터페이스 프로세스 효과 표시 주소: (링크 또는 QR코드)



###새 게임 마스터

IDE 에서 코드 기초 모드를 바꾸고 src 폴더에서 Main 종류를 새로 짓고, 우선 Layair 엔진을 초기화하고, 해상률은 720 *1280 (IDE 쪽 크기와 같은), 게임 자원과 페이지를 추가하여 우리게임의 첫 번째 단계를 가재합니다.

이 필자는 Flash Builder 또는 Flash Develop 을 사용하여 작성 코드 를 쓰는 것을 추천합니다. Layair는 AS3 에 대한 지원은 아직 완벽하지 않고 코드 힌트 기능이 약합니다.

Main 종류에 다음 코드를 추가합니다:


```

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import view.TestView;
	//游戏主类，游戏入口
	public class Main 
	{
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);

			//加载游戏页面资源(如果界面资源太多太大[超过50k],建议开始页面单独建立文件夹打包)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		/**
		 资源加载完成后，实例并加载游戏开始界面
		 */
		private function gameStart():void
		{
            //实例化开始页面
			var start:GameStartUI=new GameStartUI();
			//将开始页面加载到舞台
			Laya.stage.addChild(start)
		}
	}
}
```


Layaiair 엔진은 프로그램에 UI 페이지를 불러오기 전에 필요한 자원을 가재해 주어야 표시할 수 있습니다.지난 두 과목에서 IDE 에서 편집한 인터페이스 자원이 발표되면 자동화된 패키지, UI 자원이 생성된 주소는 ‘ bin/h5/res/atlas / 아래.

자원이 다운로드된 후 완료된 조정함수에서 실예화하여 페이지를 시작하여 무대에 가재합니다.번역 프로젝트는 시작된 페이지가 이미 드러나는 것을 볼 수 있다.

그러나 크기가 너무 커서 브라우저가 보이기 때문에 엔진 초기화 방법 Laya.init () 아래에 스크린을 합류하여 게임의 전체 화면 크기와 브라우저 크기가 일치합니다.(자세한 화면 설정을 조정하여 API)


```

	//全屏不等比缩放模式
	Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
```




###게임 프로세스 제어

앞서 사유 지도도 분석에 따르면 우리는 먼저 게임의 전체 프로세스를 작성해 우리의 개발 사고방식을 더욱 명확하게 할 수 있다. 대형 프로젝트라면 업무 분업이 더욱 명확하게 할 수 있다.다음은 게임을 위해 기본적인 흐름 순환 체계를 세웁니다.

우선 프로세스 페이지 전체 변수를 추가하여 총 네 페이지입니다.

그리고 우리는 게임의 주요 프로세스를 세 가지 방법으로 사용합니다: 게임은 개미스타트 (), 게임에서 개미닛 (), 게임 종료 gamomeOver (), 게임 프로세스 페이지 표시와 전환을 담당합니다.

gameInit() 방법에서 당분간 캐릭터 가입이 없기 때문에 주역 사망으로 가meOver()방법을 동원할 수 없어 시간을 늦춰 모의프로세스를 적용할 수 있다.

**주:**gamit()와 gamover()방법은 게임에서 반복적으로 실행됩니다(게임 종료 — 게임 종료 — 게임 종료......) 학생들이 발견할 수 있습니다. 지도와 게임 중 UI 및 게임 종료 UI 및 게임 종료 UI 가 반복적으로 창설될 수 있습니다. 이렇게 하면 불필요한 메모리 지출을 초래합니다.

그러면 우리는 두 가지 방법이 해결된다.
UI 모두 단례 모드로 수정하였습니다. 게임에서 하나의 실례 UI 하나밖에 없습니다.
둘째는 실예화 시 이미 실예화되었는지 판단하는 것이다."1244사 =" 연산부로 사용할 수 있습니다. 만약 대상이 있으면 직접 사용하고, 없다면 다시 실례합니다.
예컨대: play 1244가 = new GamePlayUI () 이것은 play = play = 124대 네w GamePlayUI ()

모든 코드 다음과 같습니다:


```

package {
	
	import laya.display.Stage;
	import laya.events.Event;
	import laya.net.Loader;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	import ui.GameBgUI;
	import ui.GameOverUI;
	import ui.GamePlayUI;
	import ui.GameStartUI;
	
	public class Main
	{
		/**开始页面***/
		private var start:GameStartUI
		/**地图页面***/
		private var map:GameBgUI
		/**游戏中界面***/
		private var play:GamePlayUI
		/**游戏结束页面***/
		private var over:GameOverUI
		
		public function Main()
		{
			//初始化引擎，建议增加WebGl模式
			Laya.init(720, 1280,WebGL);
			//全屏不等比缩放模式
			Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
			
			//加载游戏页面资源(如果界面资源太多[图集超过50k],建议开始页面单独建立文件夹打包图集并加载)
			Laya.loader.load("res/atlas/gameUI.atlas",Handler.create(this,this.gameStart))
		}
		
		/**
		 资源加载完成后，加载游戏开始界面
		 */
		private function gameStart():void
		{
			//实例化开始页面
			start=new GameStartUI();
			//监听开始游戏开始按钮事件,点击后进入游戏中（IDE中设置的变量定义）
			start.btn_start.on(Event.MOUSE_UP,this,gameInit)
			//将开始页面加载到舞台
			Laya.stage.addChild(start);
		}
		
		/**
		 游戏中，游戏初始化，地图、游戏中UI
		 */
		private function gameInit():void
		{
			//实例化地图背景页面(如果已实例化，不需要重新new)
			map||=new GameBgUI();
			//加载到舞台
			Laya.stage.addChild(map);
			
			//实例化游戏中UI页面(如果已实例化，不需要重新new)
			play||=new GamePlayUI();
			//加载到舞台
			Laya.stage.addChild(play);
			
			//模拟游戏结束，3秒时间延迟...
			Laya.timer.once(3000,this,gameOver)
		}
		
		/**
		 游戏结束
		 */
		private function gameOver():void
		{
			//移除地图背景
			map.removeSelf();
			//移除游戏中UI
			play.removeSelf();
			
			//实例化游戏结束页面(如果已实例化，不需要重新new)
			over||=new GameOverUI();
			//游戏积分显示
			over.txt_score.text=score.toString();
			//重新开始游戏按钮监听,点击后进入游戏中（IDE中设置的变量定义）
			over.btn_restart.on(Event.MOUSE_UP,this,gameInit);
			//加载到舞台
			Laya.stage.addChild(over)
		}
	}
}
```


이상 코드 컴파일을 통과한 후 게임의 기본 프로세스를 모두 달린다.

물론 세부 부분은 완벽하지 않았는데, 예를 들어 페이지 중 게임에 진도 업로드, 페이지와 버튼이 애니메이션 효과를 보지 못했으며, 이것들은 페이지 종류를 통해 자신의 코드를 실현할 수 있으며, 다음 수업은 페이지 코드 논리에 들어가도록 하겠습니다.

