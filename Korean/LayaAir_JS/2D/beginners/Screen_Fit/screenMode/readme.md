#화면 방향: 자동 화면 및 자동 세로 화면 설정

> author:charley
>>

###1, 화면 방향 설정 API 개요



打开引擎的API文档，搜索laya.display.Stage，找到[screenMode属性](https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Stage%3Ch1%3EscreenMode).그림 하나 그대로.![图1](img/1-1.png) 


(그림 1)

####1.1 기본값 none 또는 screenMode 속성을 설정하지 않기

기본 값은 none 이나 screenMode 속성을 설정하지 않을 때 화면 방향을 어떻게 회전하든, 게임 수준의 방향은 화면을 따라 돌아가는 변화가 생기지 않습니다.

예를 들어 2-1과 그림 2-2의 효과:

![图2-1](img/2-2.png) 


(2-1) 핸드폰 세로 화면을 설정할 때 screenMode 효과를 설정하지 않음

![图2-2](img/2-1.png) 


(2-2) 휴대폰 가로막에 screenMode 효과를 설정하지 않음

####1.2 screenMode 속성은 horizontal 때 자동화면


```java

//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = "horizontal";
```


screenMode 속성치를 horizontal 설정할 때 스크린의 방향을 어떻게 회전하든 게임 수준의 방향은 스크린에서 가장 짧은 쪽과 수직으로 유지된다.3-1과 그림 3-2의 시범.

![图3-1](img/3-2.png) 


(사진 3-1) 휴대폰 세로 화면 때 screenMode 속성은 horizontal 효과

![图3-2](img/3-1.png) 


(사진 3-2) 휴대폰 가로막에 screenMode 속성이 horizontal 효과



####1.3 screenMode 속성은 vertical 때 자동으로 세로 화면


```java

//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
Laya.stage.screenMode = "vertical";
```


screenMode 속성치를 vertical 설정할 때 스크린의 방향을 어떻게 회전하든, 게임 수준의 방향은 스크린보다 긴 변과 수직으로 유지된다.4-1과 그림 4-2의 시범.

![img](img/4-1.png) 


(사진 4-1) 핸드폰 세로 화면 때 screenMode 속성은 vertical 효과

![img](img/4-2.png)  


(사진 4-2) 휴대폰 가로 화면에 screenMode 속성이 vertical 효과



##2, 자동 화면 및 세로 화면 표시 원본

이 데이는 직접 사례 원본 코드를 붙이고 개발자는 로컬 리야a.stage.screenMode 속성치의 구별을 체험할 수 있다.

>> 신규 개발자에 대한 직접 복사 원코드를 팔지 않으면 스크린모드와 무관한 코드.ScreenMode 속성 차이를 체험하고 이해하는 것이 포인트.원코드에 관련된 그림 자원은 임의png 자원을 대신하여 저장할 수 있다`项目根目录/bin/res`디렉터리 아래 자원 경로와 자원 명칭을 확보해야 한다.

####screenModeDemo.ts 예제 코드 다음과 같습니다:


```javascript

function showScreen()
{
//图片
var img = new Laya.Image();
img.centerX = 0;
img.centerY = -70;
img.skin = "res/monkey2.png";
Laya.stage.addChild(img);

//文字
var text = new Laya.Label();
text.text = "游戏的水平方向";
text.color = "gray";
text.fontSize = 100;
text.centerX = 0;
text.centerY = 50;
Laya.stage.addChild(text);
}

Laya.init(0, 0, Laya.WebGL);
Laya.stage.scaleMode = "full";
Laya.stage.bgColor = "#232628";

//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = "horizontal";
//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
//Laya.stage.screenMode = "vertical;

showScreen();
```




####상량에 대한 쓰기:

개발자가 screenMode 의 속성치를 기억하지 못하면 상량의 방식을 통해 도구의 코드를 얻을 수 있다.

screen 상량 값은 그림 5개처럼 표시됩니다:

![图5](img/5.png) 


(그림 5)

예제 쓰기:


```java

//自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;;
//自动竖屏，游戏的水平方向始终与浏览器屏幕较长边保持垂直
//Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
```




예례에 사용된 그림 자원:

![monekey2](img/monkey2.png) 


monkey2.png

