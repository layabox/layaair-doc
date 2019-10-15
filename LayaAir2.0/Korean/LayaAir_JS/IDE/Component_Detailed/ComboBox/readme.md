#Combobox 구성 요소 참조



##하나, LayairID를 통해 Combobobox 구성 요소 만들기
###1.1 컴보박스 만들기
Comboboox는 하위 목록 상자 구성 요소입니다.
자원 패널에 있는 Combobox 구성 요소를 누르고 페이지 편집 영역에 끌면 Combobox 구성 요소를 페이지에 추가할 수 있습니다.
Combobox 스크립트 인터페이스 참고해주세요.[ComboBox API](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.ComboBox).

Combobox 구성 요소의 그림 자원 예제:

​![图片0.png](img/1.png)< br >>
(그림 1)

Comboboox 속성 labels 값을 'label1, label2' 로 설정한 후 다음과 같습니다:
상태:

​![图片0.png](img/2.png)< br >>
(2)

클릭 후 하위 옵션 목록 보이기:

​![图片0.png](img/3.png)< br >>
(그림 3)

다음 옵션에서 item1 선택 후:

​![图片0.png](img/4.png)< br >>
(그림 4)



###1.2 Comboox 구성의 상용 속성

​![图片0.png](img/5.png)< br >>
(그림 5)

124대**속성**124대**기능 설명**124대
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1244 labels 124테라의 테마 텍스트 텍스트 내용, 쉼표로 구분합니다.124대
124대 비비시블Num124대
124테의 스크롤롤바스킨 (Scroll BarSkin), 124테라의 하라레타 그림 자원.124대
124대 selectedIndIndIndex (124) 는 현재 선택된 인덱스를 표시합니다.124대
124테네지드 (sizegrid), 124테라라의 그림 (구궁 칸 데이터) 를 축소합니다.124대
124사 스킨 (124사) 다라의 그림 자원.124대



 



###1.3 Combobox 구성 요소 하위 옵션 관련 속성

​        ![图片0.png](img/6.png)< br >>
(그림 6)

​![图片0.png](img/7.png)< br >>
(그림 7)

124대**속성**124대**기능 설명**124대
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124테오 itemColors 124테라의 컨디션의 탭 텍스트 색상 집합.상세하게 API 참고해주세요.124대
124테넷 itemsize124대



 

 



###1.4 Combobox 구성 하부 단추 관련 속성

​![图片0.png](img/8.png)< br >>
(그림 8)

​![图片0.png](img/9.png)< br >>
(그림 9)

124대**속성**124대**기능 설명**124대
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1244 라벨볼드 (LobelBold) 라벨 단추의 탭 텍스트는 굵은 형태입니다.124대
1244 labelColor  124테라 단추 상태의 텍스트 색상 집합.상세하게 API 참고해주세요.124대
"1244 LlabelFont"이 "124테라" 단추를 누르는 텍스트 글꼴입니다.124대
"1244 LabelPadding"에서 줄인 버튼의 텍스트 사이드 간격.자세한 사항은 API1244대 참고해주세요.
"1244 Labelsize"의 텍스트 글꼴 크기.124대



 



##둘째, 코드 를 통해 Combobobox 구성 요소 만들기

우리가 쓴 코드를 쓸 때, 코드 제어 UI, 생성할 수 없다`UI_ComboBox`종류, 코드 설정을 통해 Comboboox 관련 속성을 설정합니다.

**실행 실례 효과:**
​![1](gif/1.gif)< br >>
(그림 10)

Comboboox 다른 속성도 코드를 통해 설정할 수 있으며, 다음은 코드 설정을 통해 선택한 상자의 하위 옵션을 설정할 수 있으며, 클릭을 통해 클릭을 누르면 어떤 옵션입니까?흥미가 있는 독자들은 자신이 코드 설정을 통해 Comboboox, 자신에게 필요한 하위 상자를 만들 수 있다.


```javascript

(function()
{
	var Stage    = Laya.Stage;
	var ComboBox = Laya.ComboBox;
	var Handler  = Laya.Handler;
	var WebGL    = Laya.WebGL;

	var skin = "res/ui/combobox.png";

	(function()
	{
		// 不支持WebGL时自动切换至Canvas
		Laya.init(800, 600, WebGL);

		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;

		Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
		Laya.stage.bgColor = "#232628";

		Laya.loader.load(skin, Handler.create(this, onLoadComplete));
	})();

	function onLoadComplete()
	{
		var cb = createComboBox(skin);
		cb.autoSize = true;
		cb.pos((Laya.stage.width - cb.width) / 2, 100);
		cb.autoSize = false;
	}

	function createComboBox(skin)
	{
		var comboBox = new ComboBox(skin, "item0,item1,item2,item3,item4,item5");
		comboBox.labelSize = 30;
		comboBox.itemSize = 25;
		comboBox.selectHandler = new Handler(this, onSelect, [comboBox]);
		Laya.stage.addChild(comboBox);

		return comboBox;
	}

	function onSelect(cb)
	{
		console.log("选中了： " + cb.selectedLabel);
	}
})();
```


