#구성 요소 자원 이름 규칙

레이어이어IDE에서 그림 및 구성 요소, 편집기는 자원 접두사에 따라 대응하는 구성 요소를 인식합니다.예를 들어 btnxxxxx 이름이 버튼으로 인식됩니다. tabu xxx xxx 이름이 Tab 구성 요소로 인식됩니다.

###기본 구성 요소 이름 규칙:

다음 편집기 기본 구성 요소 자원 대응 규칙 (대소문자 구분 없음):

`Label`구성 요소 (텍스트 상자):label xx;

`TextInput`구성 요소 (입력 상자):input xxx 또는 textinput u xxxx;

`TextArea`구성 요소 (텍스트 영역, 스크롤 링크):area xxx 또는 textarea

`Button`구성 요소 (단추):btnxxx 또는 button u xxxx;

`CheckBox`구성 요소 (다선 상자): checkxx 또는 checkbox

`Radio`구성 요소 (모듈):radio 또는 radio, u xxx;

`Tab`구성 요소 (탭 그룹):tabu xxx;

`RadioGroup`구성 요소 (단선 상자 단추 그룹):radiogroupu xxx;

`VSlider`구성 요소 (수직 슬라이드): vslider xxx;

`HSlider`구성 요소 (수평 슬라이드): hslider xxx;

`Clip`구성 요소 (비트 절편):clipu xxx;

`ProgressBar`구성 요소 (프로세스):progressu xxx 또는 progressbaru xxx;

`ComboBox`구성 요소 (하락 상자):combou xxx 또는 comboxu xxxx;

`VScrollBar`구성 요소 (수직 스크롤):vscrollu xxx 또는 vscrollbaru xxx;

`HScrollBar`구성 요소 (수평 스크롤):hscrollu xxx 또는 hscrollbaru xxxx;

`Image`구성 요소 (그래픽 구성 요소): 이상 규칙이 아니라 Image 구성 요소로 인식됩니다.



다음은 예례 구성 요소 그림:

![1](img\1.png)(그림 1)

자원 관리자에 대한 응답:

![2](img\2.png)(2)



###특수 구성 요소:

특수 구성 요소는 여러 장의 그림으로 구성되어 있으며, 명명 규칙은 위 규칙을 준수하는 기초에 $구분을 증가하고, 주로 세 개의 구성 요소: Scrollbar, Progressbar, Slider.

특수 구성 요소 이름 규칙:

![3](img\3.png)(图3)



![4](img\4.png)(그림 4)

![5](img\5.png)(그림 5)



###용기 구성 요소

용기 구성 요소 (Box, List, Tab, Radiogroup, Viewstack, Panel, HBox, VBox, Tree) 기본적으로 지원할 필요는 없습니다. 단축키 키를 통해 Ctrl + B 를 바꿀 수 있습니다.그림 아래에 제시한 것처럼:

![6](img\6.png)(图6)



