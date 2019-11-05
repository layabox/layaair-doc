# LayaAir组件类与组件类型介绍

>> 레이어이더의 UI, 애니메이션 등 시각화 설정에서 구성 요소는 거의 없다.구성 요소마다 모두 자신의 속성, 방법과 사건에 속한다.구성 요소를 사용하면 프로그래밍과 인터페이스 디자인을 분리시켜 부호화를 높일 수 있습니다.구성 요소를 깊이 이해해야 IDE 개발 효율을 더 높일 수 있다.



##1, 구성 요소 상속관계

###1.1 구성 요소 기류 Compont

Layaiairide의 자체 테이프 구성 요소는 모두 laya.ui 가방에 위치하고,**모든 구성 요소를 직접 또는 간접적으로 Compont에서 계승합니다**(구성 요소 기류.Layaiair 엔진의 API 문서에서 UI 분류를 누르면 그림 1의 보여 줍니다.[laya.ui.Component类](http://layaair.ldc.layabox.com/api/index.html?category=UI&class=laya.ui.Component).관련 구성 요소 API 설명을 볼 수 있습니다.

![图1](img/1.png) <br /> (图1)







###1.2 구성 요소 상속관계

Sprite 종류는 Layair 엔진에서 가장 기초적인 디스플레이 컨테이너 종류입니다.Compont 종류는 Sprite 류에서 계승하여 구성 요소의 통용 기초 속성, 방법, 인터페이스, 구성 요소의 생명주기 등 확장 기능을 추가했다.

구성 요소의 기류, 보x, Button, Clip, ColorPicker, Combobox, Image, Label, Progresbar, Scrollbar, Slider, TipManager 모두`laya.ui.Component`자류.구성 부품의 상속구조는 그림 2개처럼 보인다.

![图2](img/2.png) <br /> (图2)


*Tips: 2의 계속적인 관계와 같이 IDE 에서 자주 사용하는 UI 페이지 Dialog 종류가 View 류에 이어 View 종류가 Box 종류로 이어지고 있다.다른 구성 상속관계 건의 이해 및 기억해*



##2, 구성 요소의 분류

구성 요소 자체의 구조와 기능에 따라 레이야유를 포함한 구성 요소를 3가지로 나눌 수 있다.각각 보기 구성 요소, 용기 구성 요소, 기초 구성 요소다.

###2.1 기초 구성 요소

기초 구성 요소는 페이지 편집에서 가장 자주 쓰는 구성 요소다.통과하다`资源管理器`혹은`组件库`장면 편집기에서 끌어당겨 가시화 조작을 합니다.ᄅ 수 있다,...`属性设置器`속성치를 설정한 후 장면 편집기에서 직접 보기 효과를 보십시오.

기본 구성 요소: Label, TextInput, TextArea, Button, Image, Checkbox, Radio, Clip, ProgressBar, Slider, VSlider, Slider, Scrollbar, HScrollbar, Combox.

*Tips: 이 기초 구성 요소에 대한 상세한 설명을 참고할 수 있습니다.*

###2.2 용기 종류 구성 요소

용기 종류 구성 요소는 하나나 여러 개의 기초 구성 요소를 용기로 전환하는 방식으로 생성된다.IDE 에서 통과할 수 있어요.`Ctrl+B`단축키는 여러 개의 기초 구성 요소를 용기 구성 요소로 변환합니다.동도 3 개처럼.

![动图3](img/3.gif)< br / > (동영상 3)

용기 구성 요소는: Box, List, Tab, Radiogroup, Viewstack, Panel, HBox, VBox, Tree, Sprite 등이 포함되어 있다.

###2.3 보기 구성 요소

보기 종류 구성 요소는 페이지급 디스플레이 대상 용기입니다.Layaiaiair IDE UI 시스템에서 모든 디스플레이 요소를 표시하는 데 사용할 수 있습니다. Layaiair의 보기 구성 요소는 오직 있습니다.`View`과`Dialog`.

### 