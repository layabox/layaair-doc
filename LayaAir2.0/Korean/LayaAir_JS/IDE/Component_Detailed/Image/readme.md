#Image 구성 요소 참조



##하나, LayairIDE를 통해 Image 구성 요소 만들기

###1.1 image 생성

Image 는 UI 에서 가장 흔히 볼 수 있는 그림의 구성 요소로 비디오 그림을 표시하는 데 사용됩니다.Image 구성 요소를 설정할 수 있는 skin 속성을 설정하여 Image 구성 요소를 바꿀 수 있는 그림입니다.Image 구성 요소는 구궁 칸 데이터 설정을 지원합니다. 그림 확대 후 이미지가 실화되지 않습니다.

자원 패널에 있는 Image 구성 요소를 누르고 페이지 편집 영역으로 끌면 Image 구성 요소를 페이지에 추가할 수 있습니다.Image 를 선택하면 속성 패널에 Image의 상용 속성을 설정할 수 있습니다.
Image 구성 요소의 스크립트 인터페이스 참조[Image API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.Image).

​**Image 구성 요소의 자원 예제:**

​![图片0.png](img/1.png)< br >>
(그림 1)

​**Image 구성 요소를 편집구에 끌어 놓은 후 효과:**

​![图片0.png](img/2.png)< br >>
(2)

###1.2 Image 구성의 상용 속성

​![图片0.png](img/3.png)< br >>
(그림 3)

124대**속성**124대**기능 설명**124대
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124테크릭 (구글 데이터) 를 124테리어 비트맵의 효과적으로 네트워크 데이터 (구궁 칸 데이터) 를 축소합니다.124대
124사 스킨의 비트맵 자원.124대

Image 구성 요소를 추가한 후 자원 패널에서 Image 자원을 Image 속성상자로 끌어 Image 구성 요소를 수정할 수 있습니다.

##둘째, 코드 를 통해 Image 구성 요소 만들기

우리가 쓴 코드를 쓸 때, 코드 제어 UI, 생성할 수 없다`UI_Image`종류, Image 관련 속성을 코드 설정합니다.

**실행 실례 효과:**
​![5](img/4.png)< br >>
(그림 5) 코드를 통해 Image 만들기

Image 의 다른 속성도 코드 를 통해 설정할 수 있으며, 다음의 예시 코드 코드 를 통해 피부를 어떻게 만들 수 있는지 보여 줍니다.

흥미가 있는 독자들은 자신의 코드를 통해 Image 를 설정하고 자신에게 필요한 그림을 만들 수 있다.

**예시 코드:**


```javascript

(function()
{
	var Stage = Laya.Stage;
	var Image = Laya.Image;
	var WebGL = Laya.WebGL;

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(550, 400, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		setup();
	})();

	function setup()
	{
		var dialog = new Image("res/ui/dialog (3).png");
		dialog.pos(165, 62.5);
		Laya.stage.addChild(dialog);
	}
})();
```


