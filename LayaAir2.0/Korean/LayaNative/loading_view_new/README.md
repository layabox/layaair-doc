#인터페이스
개발자를 편리하게 하기 위해 Lading View, LayaNative 원생 기능을 사용한 새로운 Loading View.

응용 프로그램이 시작할 때 필요한 html, js, 그림을 불러올 때 인터페이스 디스플레이, LayaNative 프로그램을 실행할 때, 기본적으로 LoadingView 인터페이스를 사용할 때, 한동안 게임에 들어갈 수 있으며, 그림 1개에 제시할 수 있습니다.

​![图1](img/1.png)< br >>

도

##1. 진도 제어

개발자는 config.js 에서 Loading View의 배경색, 글꼴, Tips 등을 제어할 수 있다.

config.js 위치:

```

Android: 工程目录下的assets/scripts/config.js  
IOS:工程目录下的resources/scripts/config.js  
```


config.js 내용은 다음과 같이 개발자는 자신의 수요에 따라 수정할 수 있습니다:


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    window.loadingView.loadingAutoClose=true;//true代表引擎控制关闭时机。false为开发者手动控制
    window.loadingView.bgColor("#FFFFFF");//设置背景颜色
    window.loadingView.setFontColor("#000000");//设置字体颜色
    window.loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
}
```


##2. 진도 제어 실례

실제 개발 과정에서 일반적으로 Loadingview의 숨겨진 숨기와 디스플레이를 정확하게 제어하려면 개발자는 config.js 에서 이렇게 loadingview.loadingAutoClose 값을 false
그 다음 항목에서 종료된 상황에 따라 진도 표시 진도를 설정하고 호출 함수는 다음과 같습니다:


```javascript

window.loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭
```
구체적인 절차는 다음과 같다.

**단계 1:**… 에`config.js`중간 설정`loadingView.loadingAutoClose`가치`false`


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    window.loadingView.loadingAutoClose=false; // 设置值为false，开发者手动控制加载界面的关闭
    ...
}

```


**단계 2:**전용`loadingView.loading(nPercent)`업데이트 프로세스

위조 코드 다음과 같습니다:


```javascript

var nPercent=0;
var image1 = document.createElement('img');
image1.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image1.src = "a.png";

var image2 = document.createElement('img');
image2.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image2.src = "b.png";

var image3 = document.createElement('img');
image3.onload=function()
{
    if(window.loadingView){
        nPercent+=33;
        window.loadingView.loading(nPercent);
    }
}
image3.src = "c.png";
```


**Tips:**

되다`loadingView.loading(nPercent)`함수 전입 수치는 100시, 인터페이스를 자동으로 닫게 된다.호출 가능합니다.`loadingView.hideLoadingView()`추가 인터페이스를 닫습니다.

##3. 모든 텍스트 보이기

모든 텍스트를 제거할 수 있습니다. tips 와 다운로드, config.js, 수정`showTextInfo`값 설정`false`바로 코드 다음과 같습니다:


```javascript

window.loadingView = new loadingView();
if(window.loadingView)
{
    ...
    window.loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现

    window.loadingView.showTextInfo=false; // 值设置为false

}
```


##4. 인터페이스 및 기능 정의
모든 코드가 공개되므로 개발자는 코드 수정에 따라 사용자 정의 기능을 실현할 수 있다.

##5. 특별설명
화면 시작, 앤드로이드 버전은 원생 자바 개발, iOS 버전으로 Object-C 개발을 사용하여 코드를 모두 개원합니다. 개발자가 사용자 정의 인터페이스를 수정하려면 안드로이드와 아이오S 인터페이스를 작성하지 않으면 배워보세요.

후속 LayaBox 는 화이트 리스트 메커니즘이 있습니다. 만약 개발자가 허가를 받았다면 Layabox Logo 를 제거할 수 있습니다. 구매가 없으면 Layabox 로고를 강제로 늘려야 합니다. 엔진 내부에 검출 메커니즘이 있습니다. 랜덤 검사가 통과되지 않으면 Crash 응용 프로그램을 강제로 할 수 있습니다.

LayaNative 는 원본 엔진이 아니지만, 무료 개발자에게 사용하려면 Layabox 로고를 제거하려면 비용을 내야 합니다.개발자는 Layabox 공중호, 홈페이지 등을 통해 Layabox 비즈니스를 통해 구매할 수 있다.