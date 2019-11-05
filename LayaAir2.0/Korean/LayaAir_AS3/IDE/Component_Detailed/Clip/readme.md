#Clip 구성 요소 참조



##하나, LayairirIDE를 통해 Clip 구성 요소 만들기

###1.1 Clip 만들기
Clip 구성 요소는 비트맵 필름 애니메이션에 사용할 수 있습니다.Clip 은 가로 분리된 수량 clipX, 세로 분리 수량 clipy, 가로 분할할 수 있는 크기의 clipwidth, 세로 분할할 수 있는 크기의 clipHeight, 왼쪽으로 오른쪽으로 오른쪽으로 오른쪽으로, 아래로 분할 할 수 있습니다.

Clip 구성 요소는 슬라이스 애니메이션과 스크립트 애니메이션 을 보여 주는 한 프레임 그림입니다.
자원 패널에 있는 Clip 구성 요소를 누르면 페이지 편집 영역에 끌려 Tab 구성 요소를 페이지에 추가할 수 있습니다.
Clip 스크립트 인터페이스 참조[Clip API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Clip)

Clip 구성 요소의 자원 예제:

​![图片0.png](img/1.png)< br >>
(그림 1)

clipX 속성의 값을 10 후 디스플레이 효과:

​![图片0.png](img/2.png)< br >>
(2)

index 속성의 값을 1 후 표시 효과:

​![图片0.png](img/3.png)< br >>
(그림 3)

###1.2 Clip 구성의 상용 속성

​![图片0.png](img/4.png)< br >>
(그림 4)

124대**속성**124대**기능 설명**124대
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
사진 자원을 가로 분할할 때 각 부분의 넓이가 있다.124대
124사 클리pHeet 124테가 사진을 분할할 때, 각 절단의 높이입니다.124대
124대 clipX 124대 가로획 사진 자원을 분할할 때, 넓게 절단하는 몫이다.124대
사진 자원을 124테로 분할할 때 높은 절단된 몫.124대
현재 애니메이션 프레임 인덱스124대
테크릭 (구글) 의 유효한 인터넷 네티즌 데이터 (구궁 칸 데이터) 다.124대
124사 스킨은 선항소 버튼124대
124대 group
124테르untime
124사이클



##둘째, 코드 로 Clip 구성 요소 만들기

우리가 쓴 코드를 쓸 때, 코드 제어 UI, 생성할 수 없다`UI_Clip`종류, 코드 중 가져오기`laya.ui.Clip`패키지는 코드를 통해 Clip 관련 속성을 설정합니다.

**실행 실례 효과:**

​	![1](gif/1.gif)< br >>
(그림 5) 코드를 통해 카운터 만들기

​![1](img/5.png)< br >>
(그림 6)

Clip 의 다른 속성도 코드 를 통해 설정할 수 있으며, 이 같은 예례는 시간기 를 통해 1초당 clip.clipX 절편을 갱신하고, 1초당 숫자를 업데이트하는 디자이너 기능을 통해 흥미가 있는 독자들은 코드 설정을 통해 Clip 을 만들어 자기 프로젝트에 맞게 필요한 Clip 을 만들 수 있다.

**예시 코드:**


```javascript

package
{
	import laya.display.Stage;
	import laya.events.Event;
	import laya.ui.Button;
	import laya.ui.Clip;
	import laya.ui.Image;
	import laya.utils.Handler;
	import laya.webgl.WebGL;
	
	public class UI_Clip
	{
		/***控制器按钮资源***/
		private var buttonSkin:String = "../../../../res/ui/button-7.png";
		/***切片资源***/
		private var clipSkin:String = "../../../../res/ui/num0-9.png";
		/***背景资源***/
		private var bgSkin:String = "../../../../res/ui/coutDown.png";
		
		/***计数器***/
		private var counter:Clip;
		/***计数器当前索引***/
		private var currentIndex:int;
		/***控制器按钮***/
		private var controller:Button;
		
		public function UI_Clip()
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
			Laya.loader.load([buttonSkin, clipSkin, bgSkin], 
                             laya.utils.Handler.create(this,onSkinLoaded));
		}
		
		/***加载资源完成***/
		private function onSkinLoaded(e:*=null):void
		{
			//显示背景图
			showBg();
         	//创建计数器
			createCounter();
            //显示总数
			showTotal();
            //创建控制按钮
			createController();
		}
		
		/***显示背景***/
		private function showBg():void 
		{
			//实例化背景图
			var bg:Image = new Image(bgSkin);
			//设置图片大小
			bg.size(224, 302);
			//位置居舞台中间
			bg.pos(Laya.stage.width - bg.width >> 1, Laya.stage.height -bg.height >> 1);
			//加载到舞台
			Laya.stage.addChild(bg);
		}
		
		/***创建计数器切片***/
		private function createCounter():void
		{
			//实例化计数器切片
			counter = new Clip(clipSkin, 10, 1);
			//自动播放
			counter.autoPlay = true;
			//播放间隔时间1秒
			counter.interval = 1000;			
			//计数器切片位置
			counter.x = (Laya.stage.width - counter.width) / 2 - 35;
			counter.y = (Laya.stage.height - counter.height) / 2 - 40;
			//加载到舞台
			Laya.stage.addChild(counter);
		}
		
		/***显示总数切片***/
		private function showTotal():void 
		{
			//实例化总数切片
			var clip:Clip = new Clip(clipSkin, 10, 1);
			//总数切片索引为最后一个
			clip.index = clip.clipX - 1;
			//总数切片位置
			clip.pos(counter.x + 60, counter.y);
			//加载到舞台
			Laya.stage.addChild(clip);
		}
		
		/***创建控制按钮***/
		private function createController():void 
		{
			//实例化控制按钮
			controller = new Button(buttonSkin, "暂停");
			//标签字体为粗体
			controller.labelBold = true;
			//按钮标签字体颜色的四种状态
			controller.labelColors = "#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF";
			//按钮大小
			controller.size(84, 30);
			//按钮点击事件——计数器状态控制
			controller.on(Event.CLICK, this, onClipState);
			//按钮位置
			controller.x = (Laya.stage.width - controller.width) / 2;
			controller.y = (Laya.stage.height - controller.height) / 2 + 110;
			//加载到舞台
			Laya.stage.addChild(controller);
		}
		
		/***计数器状态***/
		private function onClipState(e:*=null):void 
		{
			//如果计数器为播放状态
			if (counter.isPlaying)
			{
				//停止播放动画
				counter.stop();
				//记录当前播放索引（如果不记录，重新播放时，索引会从0开始）
				currentIndex = counter.index;
				//按钮标签改变
				controller.label = "播放";
			}
			else//计数器为停止状态
			{
				//播放动画
				counter.play();
				//从当前记录的索引播放
				counter.index = currentIndex;
				//按钮标签改变
				controller.label = "暂停";
			}
		}	
	}
}
```








 