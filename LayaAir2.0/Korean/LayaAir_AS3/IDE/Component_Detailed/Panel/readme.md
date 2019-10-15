#Panel 구성 요소 참조

Panel 은 재단 기능이 있는 패널 용기 종류로 원소의 디스플레이 영역을 자주 설정합니다.Panel 용기에 직접 표시할 수 있는 요소를 Panel 용기에 추가할 수 있으며, Panel 의 폭이 원소로 표시됩니다.

###하나, Layairieride를 통해 Panel 구성 요소 만들기

**1.1 끌어당기는 형식으로 Panel 구성 요소를 페이지 편집지에 끌어당긴다**

IDE 자원에서 오른쪽 구성 요소 패널을 관리하는 UI 폴더에서 Panel 구성 요소를 UI 페이지로 끌어당긴다.그림 1의 보여 주기:

![1](img\1.gif)</br> (그림 1)

Panel 에게 넓이를 설치하다.UI 인터페이스에 있는 Panel 구성 요소를 더블 클릭하여 그림 한 장을 넣습니다.효과 및 계층 구조 그림 2개 표시:

![2](img\2.png)</br>(2)

사진2에서 넣은 그림이 재단되어 그림이 결국 보여준 폭이 Panel 용기의 폭이다.이렇게 하면 그림의 좌표를 직접 조정할 수 있게 하는 내용이 바뀌었다.



**1.2 원소를 직접 Panel 용기로 표시합니다**

UI 인터페이스에 그림 한 장을 준비해 이 그림은 단축키 Ctrl + B 를 Panel 용기로 전환합니다.그림 1-1 시:

![1-1](img\1-1.png)</br>(그림 1-1)

클릭이 확정된 후 폴에게 넓이를 100 * 100 * 100 (변환 후 그림은 Panel 의 자급으로 자동으로 바뀐다.효과 및 계층 구조 보이기

**1.3 스크롤 표시 추가**

Panel 구성 요소는 드라이브를 설정할 수 있습니다;**list 구성 요소를 제외하고 Panel 은 스크롤을 설치할 수 있는 유일한 용기 구성 요소입니다**.여기에서 Panel 에게 스크롤을 설치하여 효과를 볼 수 있습니다.

Panel 을 위한 스크롤 드라이브를 설정합니다. 그림 3개처럼:

![3](img\3.png)</br> (그림 3)

Ctrl + F12 (또는 F12) 가 UI 인터페이스를 내보내며, 코드 중 자원을 불러와 이 UI 인터페이스를 본격화합니다.마지막 효과 표시 그림 4개 표시:

![4](img\4.gif)</br> (그림 4)



##둘째, 코드 를 통해 Panel 구성 요소 만들기

panel 구성 요소는 UI 인터페이스에서 직접 볼 수 있는 조작 외에도 코드에서 위쪽 효과를 실현하는 것도 매우 간단하다.

부호로 이루어지는 효과는 동영상 5개에 표시됩니다:

![5](img\5.gif)</br> (그림 5)

**예시 코드:**


```typescript

package
{
	import laya.ui.Image;
	import laya.ui.Panel;
	import laya.utils.Handler;

	public class PanelTest
	{
		public function PanelTest()
		{
			//初始化引擎
			Laya.init(800,600);
			//预加载所需资源
			Laya.loader.load("res/atlas/comp.atlas",Handler.create(this,onLoaded));
		}
		
		private function onLoaded():void
		{
			//实例化Panel组件
			var panel:Panel = new Panel();
			//给panel添加背景色
			panel.graphics.drawRect(0,0,100,100,"#ffcccc");
			//给panel设置宽高
			panel.size(100,100);
			//给panel设置滚动条皮肤
			panel.vScrollBarSkin = "comp/vscroll.png";
			//将panel添加到stage上
			Laya.stage.addChild(panel);
			
			//实例化Image组件
			var img:Image = new Image();
			//给image添加皮肤
			img.skin = "comp/image.png";
			//将image添加到panel组件中
			panel.addChild(img);
		}
	}
}
```


