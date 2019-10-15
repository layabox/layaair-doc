# UI组件的分类与继承关系

>author:charley version:2.0.1 update:2019-04-02

구성 요소는 Layair 엔진의 게임 설계 기반이 거의 없다.Layaiair ID에서 2D 기초 구성 요소 (2D), 필터 구성 요소 (Filters), 그림 구성 요소 (Graphics), 물리 구성 요소 (physics), UI 구성 요소 (UI), 공공 구성 요소 (common) 이 보여 준다.개발자도 사용자 정의 구성 요소.이 편은 UI 구성 요소를 둘러싸고 소개할 예정이다.

![图1](img/1.png) 


(그림 1)



##1, UI 구성 요소의 분류

구성 요소 자체의 구조와 기능에 따라 UI 구성 요소를 세 종류로 나눌 수 있다.각각 보기 구성 요소, 용기 구성 요소, 기초 디스플레이 요소입니다.

###1.1 기초 디스플레이 구성 요소

기본 디스플레이 구성 요소는 페이지 편집에서 가장 자주 사용하는 UI 디스플레이 구성 요소입니다.자원 관리자 (Assets) 나 기초 구성 요소 라이브러리 (Bascs) 를 통해 장면 편집기에서 가시화 작업을 실행할 수 있습니다.ᄅ 수 있다,...`属性设置器`속성치를 설정한 후 장면 편집기에서 직접 보기 효과를 보십시오.

기본 디스플레이 요소는: Sprite, Button, Clip, ColorPicker, Combobox, FontClip, HScrollbar, HSlider, Image, Label, TextArea, TextInput, Radio, Progresbar, Slider, Scrollbar, VScrollbar, WXOpendataviewer.

 > Tips: X Sprite 는 특별합니다. 즉 기본적으로 도형 표시 노드 표시, 또한 용기입니다.UI 구성 요소를 남용하기 위해 구성 요소에 따라 이름을 짓지 않은 구성 요소는 Image 구성 요소로 인식하지 않고 기본적으로 Sprite 로 인식하는 것은 성능이 가장 우수한 사용 방식이다.

###1.2 용기 종류 구성 요소

Sprite, Box, Box, UI 구성 요소는 용기 종류에 속한다. 이 컨테이너 종류 요소는 일반적으로 자원 이름으로 구성 요소를 식별할 필요가 없으며, 하나, 여러 개의 기초 구성 요소가 용기로 변환되는 방식으로 생성된다.IDE 에서 통과할 수 있어요.`Ctrl+B`단축키는 여러 개의 기초 구성 요소를 용기 구성 요소로 변환합니다.동도 2 개처럼.

![动图3](img/2.gif) 


(동도 2)

용기 종류는: Sprite, Box, List, Tab, Radiogroup, Viewstack, Panel, HBox, Vbox, Tree.

###1.3 보기 구성 요소

보기 종류 구성 요소는 페이지급 디스플레이 대상 용기입니다.Layaiaiair IDE UI 시스템에서 모든 디스플레이 요소를 표시하는 데 사용되며 Layair의 보기 구성 요소는 Sce, View, Dialog, 생성 장면을 생성할 때 사용합니다.

![图3](img/3.png) 


상대 레이아웃을 사용할 필요가 없을 때 기본적으로 Scene 을 사용합니다. 상대 레이아웃이 필요할 때 View 를 사용할 수 있습니다.Dialog 은 탄창 페이지를 만드는 데 사용됩니다.



##2, 구성 요소 상속관계

Sprite 종류는 Layair 엔진에서 가장 기초적인 디스플레이 컨테이너 종류, 모든 UI 구성 요소는 기본적인 Sprite, 그 중 기본 디스플레이 구성 요소와 용기 구성 요소가 Sprite 의 자류 UICompont에 상속된다.Sprite 의 하위 Scene은 보기 종류, view 는 scen, Dialog 이 view 를 계승한다.구체적인 구성 부품 상속관계는 4 개처럼 보인다.

![图4](img/4.png)



##3, 구성 요소 속성 상해 입구

각 구성 요소의 명명 규칙과 구성 요소의 사용을 구체적으로 파악하려면 2.0의 문서인 'IDE 구성 요소 속성 상세 (IDE)

TS 버전 링크 주소:[https://ldc2.layabox.com/doc/?nav=zh-ts-2-3-0](https://ldc2.layabox.com/doc/?nav=zh-ts-2-3-0)

AS 판 링크:[https://ldc2.layabox.com/doc/?nav=zh-as-2-3-1](https://ldc2.layabox.com/doc/?nav=zh-as-2-3-1)

JS 버전 링크지: https://ldc2.layabox.com/doc/? nav=zh-js-2-3-1





##본문 칭찬

만약 본문은 당신에게 도움이 된다고 생각하시면, 스코드가 작가님을 환영합니다. 당신의 격려는 우리가 더 우수한 문서의 동력입니다.

![wechatPay](../../../../wechatPay.jpg) 