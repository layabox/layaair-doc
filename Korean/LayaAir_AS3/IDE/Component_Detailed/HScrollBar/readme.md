#HScrollbar 구성 요소 참조



##하나, LayairID를 통해 HScrollbar 구성 요소 만들기

###1.1 Hscrollbar 만들기

HScrollbar 구성 요소는 수평 방향으로 스크롤 모듈이다.
데이터가 너무 많아서 영역을 볼 수 없을 때, 사용자는 HScrollbar 구성 요소를 사용할 수 있는 데이터를 사용할 수 있습니다.
스크롤링은 네 부분으로 구성되어 있습니다: 한 궤도, 슬라이드 단추와 두 개의 화살표 단추를 누르십시오.
자원 패널에 있는 HScrollbar 구성 요소를 누르고 페이지 편집 영역에 끌면 HScrollbar 구성 요소를 페이지에 추가할 수 있습니다.
HScrollbar 구성된 스크립트 인터페이스 참고해주세요.[HScrollBar API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HScrollBar).
HScrollbar 구성의 그림 자원 예제:

​![图片0.png](img/1.png)< br >>
(그림 1)

​![图片0.png](img/2.png)< br >>
(2)

​![图片0.png](img/3.png)< br >>
(그림 3)

​![图片0.png](img/4.png)< br >>
(그림 4)

HScroll Bar가 편집기 영역에 끌려 있는 후 효과 보이기:

​![图片0.png](img/5.png)< br >>
(그림 5)

HScrollbar 속성 max 값을 10, 속성 min 의 값은 0, 속성 value 의 값을 3으로 표시한 후 다음과 같습니다:

​![图片0.png](img/6.png)< br >>
(그림 6)

프로그램에서 실행할 때 슬라이더나 화살촉 단추를 누르면 진도를 제어할 수 있습니다:

​![图片0.gif](gif/1.gif)< br >>
(그림 7)

HScrollBar 의 속성 showButton의 값을 false 에 표시할 때 효과:

​![图片0.png](img/7.png)< br >>
(그림 8)

프로그램에서 실행할 때 효과:

​![图片0.gif](gif/2.gif)< br >>
(그림 9)



 



###1.2 HScrollbar 구성 속성

​![图片0.png](img/8.png)< br >>
(그림 10)

124대**속성**124대**기능 설명**124대
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
스킨124kin이 스크롤 로그인 주소입니다.124대
일렉트릭 카탈로그 궤도 다이어그램 데이터 (구궁 칸 데이터) 를 유효하게 축소합니다.124대
현재 스크롤 위치의 숫자를 표시합니다.124대
124테민 (1244) 는 가장 낮은 위치의 숫자를 표시한다.124대
1,124테오 max124테가 가장 높은 위치를 굴리는 숫자를 나타낸다.124대
스크롤 코스를 눌렀을 때 스크롤 스크롤러의 증가량을 누르고 있다고 124테는 밝혔다.124대
12444 모모스eWheelEnable (Wheeleelenable) 가 한 개의 부르르값을 지정하여, 기본값은 트루로 지정합니다.124대
"1244 TuchScrollEnable"가 1244 부르치를 지정하며, 기본값은 true 입니다.124대
1, 12444ToHide (DautoHide) 가 자동으로 스크롤을 숨길 수 있는지 지정합니다.124대
1244 showButton 124타 브라르가 위, 아래로 표시 단추를 표시할 지 지정합니다.124대



 



##둘째, 코드 로 HScrollbar 구성 요소 만들기

우리가 쓴 코드를 쓸 때, 코드 제어 UI, 생성할 수 없다`UI_ScrollBar`종류, 코드 중 가져오기`laya.ui.HScrollBar`가방은 HScrollbar 관련 속성을 코드 설정합니다.

**실행 실례 효과:**
​![5](gif/4.gif)< br >>
(그림 11) 코드를 통해 HScrollbar 만들기

HScrollbar의 다른 속성도 코드 를 통해 설정할 수 있으며, 다음은 코드 를 통해 만든 HScrollbar, 흥미로운 독자들은 직접 코드를 통해 HScrollbar 를 설정할 수 있으며, 필요한 HScrollbar 를 만들 수 있다.

**예시 코드:**


```javascript

package
{
	import laya.display.Stage;
	import laya.display.Text;
	import laya.ui.HScrollBar;
	import laya.ui.ScrollBar;
	import laya.ui.VScrollBar;
	import laya.utils.Handler;
	import laya.webgl.WebGL;

	public class UI_ScrollBar
	{
		/***水平滚动条资源**/
		private var skins:Array=["../../../../res/ui/hscroll.png", 
							 	 "../../../../res/ui/hscroll$bar.png", 
								 "../../../../res/ui/hscroll$down.png",
								 "../../../../res/ui/hscroll$up.png"];

		/***提示信息文本框**/
		private var promptText:Text;		
		/****水平滚动条****/
		private var hScrollBar:HScrollBar;		
		
		public function UI_ScrollBar()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(800, 600, WebGL);
			//画布垂直居中对齐
			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
			//画布水平居中对齐
			Laya.stage.alignH = Stage.ALIGN_CENTER;
			//等比缩放
			Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
			//背景颜色
			Laya.stage.bgColor = "#232628";
			
			//加载资源
			Laya.loader.load(skins, Handler.create(this, onSkinLoadComplete));
		}

		/***加载资源完成***/
		private function onSkinLoadComplete(e:*=null):void
		{
			//创建水平滚动条
			createHScroller();
		}
		
		/***创建水平滚动条***/
		private function createHScroller():void 
		{
			//实例化垂直滚动条
			hScrollBar= new HScrollBar();
			//加载皮肤资源（其他资源根据规范命名后，会自动加载）
			hScrollBar.skin = "../../../../res/ui/hscroll.png";
			//设置宽度
			hScrollBar.width = 400;
			//设置位置
			hScrollBar.pos(150, 170);
			//最低滚动位置数字
			hScrollBar.min = 0;
			//最高滚动位置数字
			hScrollBar.max = 100;
			//滚动变化事件回调
			hScrollBar.changeHandler = new Handler(this, onChange);
			//加载到舞台
			Laya.stage.addChild(hScrollBar);
			
			//创建提示信息
			createPromptText(hScrollBar)
		}		
		
		/***创建提示信息***/
		private function createPromptText(scrollBar:ScrollBar):void
		{
			//实例化提示信息
			promptText=new Text();
			//提示框字体
			promptText.font="黑体";
			//提示框字体大小
			promptText.fontSize=26;
			//提示框字体颜色
			promptText.color="#FFFFFF";
			//提示框初始文本
			promptText.text="您的选择是： ";
			//加载到舞台
			Laya.stage.addChild(promptText);
			//设置提示框位置
			promptText.pos(scrollBar.x,scrollBar.y-50);
		}
		
		/***滚动条位置变化回调***/
		private function onChange(value:Number):void 
		{
			promptText.text= "滚动条的位置： value=" + value;
		}
	}
}
```


