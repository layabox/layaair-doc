#HSlider 구성 요소 참조



##1, HSlider 구성 요소 알아보기

###1.1 HSlider 역할과 효과

HSlider 와 VSlider 구성 요소는 모두 Slider 구성 요소의 하위 클래식과 세로 슬라이드사용자는 슬라이더 궤도 사이를 통해 슬라이더를 선택할 수 있다.재생기 진도 제어, 음량 크기 제어, UI 의 수치 조정 등 일반적으로 사용됩니다.

HSlider 구성 요소가 수평 방향을 채택합니다.슬라이더 궤도는 왼쪽에서 오른쪽으로 확장되어 있으며, 슬라이드 위치의 탭을 궤도에 위치한 상부에 보이면 숨길 수 있습니다.



​      ![图片1.gif](img/1.gif)< br >>
(그림 1)



###1.2 HSlider 구성된 피부 (skin) 규범

HSlider 자원 이름 (hsliser) 를 접두사 이름으로, 기본 자원 3개로 각각 슬라이드 자원`hslider$bar.png`진도 자원`hslider$progress.png`원도 자원`hslider.png`.

자원은 적어도 두 개, 한 원도 자원, 미끄럼 자원 하나, 그렇지 않으면 미끄럼 기능을 실현할 수 없다.진도 자원 구성 요소가 부족하면 틀림없다. 진도를 표시하지 않을 뿐이다.

진도 자원`hslider$progress.png`원도 자원`hslider.png`교환 후 진도 반전 가능.

![图片0.png](img/1.png)< br >>
(2)



###1.3 HSlider 구성된 API 소개

HSlider API 소개 참고해주세요.[http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HSlider](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.ui.HSlider).



##2, LayairIDE 를 통해 HSlider 구성 요소 만들기

###1.1 HSlider 만들기

자원 패널에 있는 HSlider 구성 자원을 누르고 페이지 편집 영역에 끌면 HSlider 구성 요소를 페이지에 추가할 수 있습니다.

HSlider 가 편집기 영역에 끌어 넣은 후 sizegrid 구궁격의 속성을 설정하여 확대 후 끌어올리지 않고 크기 조정 후 효과를 보이기:

​![图片2.png](img/2.png)< br >>
(2)

###1.2 HSlider 구성 속성

HSlider 의 속성 max 값을 20, 속성 min 의 값은 0, 속성 value 의 값을 5로 표시한 후 다음과 같습니다:

​![图片3.png](img/3.png)< br >>
(그림 3)

**max:**HSlider 슬라이더가 가장 오른쪽으로 끌 때 최대 값은 100;

**min:**HSlider 슬라이더가 가장 왼쪽으로 끌 때 최소값으로 기본값은 0;

**value:**슬라이더가 현재 위치의 수치는 max 혹은 min, 또는 그것들 사이의 값이다.

​![图片4.png](img/4.png)< br >>
(그림 4)

발표 후 컴파일이 실행되면 효과가 아래와 같습니다. 슬라이더를 끌어 선택할 수 있습니다.

​![图片5.gif](img/5.gif)< br >>
(그림 5)



###1.3 HSlider 구성 특수 기타 속성

기타 속성 설정기 '속성 설정기' 에 대한 자세한 소개가 있습니다. 다음은 HSlider 구성에 관한 특수 속성입니다.

124대**속성**124대**기능 설명**124대
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
"1244 allowClick Back"의 한 부르 (BallowClick Back) 가 클릭 클릭을 통해 Value (Value) 를 변경할 수 있도록 지정합니다.124대
1, 12444 showLabel (124) 브라르치에서 슬라이드 위쪽에 숨겨진 Value 값을 표시할 지 지정합니다.124대
일렉트로닉 (1244사) 활동조각도 수치는 슬라이더 (Value) 가 매번 끌 때마다 늘어나는 Value 수치를 가리킨다.기본값은 1입니다.124대


 
