#인터페이스

응용 프로그램이 시작할 때 필요한 html, js, 그림을 불러야 할 때 인터페이스 디스플레이, LayaPlayer 가 프로그램을 실행할 때, 기본적으로 LoadingView 인터페이스를 사용하면 애니메이션이 완료되면 게임에 들어갈 수 있습니다.

​![图1](img/1.png)< br >>


##1. 진도 제어

개발자는 config.js 에서 Loading View의 배경색, 글꼴, Tips 등을 제어할 수 있다.

config.js 위치:

```

Android: 工程目录下的assets/scripts/config.js  
IOS:工程目录下的resources/scripts/config.js  
```


config.js 내용은 다음과 같이 개발자는 자신의 수요에 따라 수정할 수 있습니다:


```javascript

var loadingView=window.loadingView;
if(loadingView)
{
    loadingView.loadingAutoClose=true;//true代表当动画播放完毕，自动进入游戏。false为开发者手动控制
    loadingView.bgColor("#FFFFFF");//设置背景颜色
    loadingView.setFontColor("#000000");//设置字体颜色
    loadingView.setTips(["新世界的大门即将打开","敌军还有30秒抵达战场","妈妈说，心急吃不了热豆腐"]);//设置tips数组，会随机出现
}
```


##2. 진도 제어 실례

실제 개발 과정에서 일반적으로 Loadingview의 숨겨진 숨기와 디스플레이를 정확하게 제어하려면 개발자는 config.js 에서 이렇게 loadingview.loadingAutoClose 값을 false
그 다음 항목에서 종료된 상황에 따라 진도 표시 진도를 설정하고 호출 함수는 다음과 같습니다:
`loadingView.loading(nPercent);//参数为0-100的整数值，当值为100的时候LoadingView自动关闭`  

항목의 위조 코드 다음과 같습니다:

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


##3. 개발자 자신의 로고 교체
개발자가 자신의 로고를 사용하고 싶다면 개발자는 자신의 logo 그림 logo.png 복사 디렉터리에 복사하면 됩니다:


```

Android: assets/logo/logo.png
IOS:resource/logo/logo.png
```

이 때 layabox 애니메이션이 아닌 logo.png 을 표시할 수 있으며, config.js 설정을 통해 배경색, 글꼴 색상, tips 를 설정할 수 있습니다.

**Tips:**  
*1, logo png 형식*
*2, 개발자 자신의 로고.
*3. 개발자 자신의 로고.*

##4. 모든 텍스트 보이기 지우기

LayaPlayer-0.9.6 이후의 버전은 모든 텍스트를 제거할 수 있으며, tips 와 백분율 을 포함하여 config.js 수정, showTextInfo 를 false 로 설정하면 됩니다.

```javascript

loadingView.showTextInfo=true;//改成false
```


##5. 강현진도를 제작한다

실제 프로젝트에서 자신이 좋아하는 강현한 진도 를 만들어 내고 싶다면 레이야폴레이어의 기존 방안이 만족스럽지 않다는 의견이다. 개발자는 리야아-JS 엔진과 필수적인 사진을 빠르게 가재해 레이야아아아일을 통해 현의 진도를 실현할 것을 권장한다.

##6. 화이트 리스트 기능

리야박스는 리스트 메커니즘을 추가할 수 있다. 개발자가 권한을 주거나 레이야박스와 공동 운영 제품을 구입하면 Layabox 로고를 제거할 수 있다. 만약 없다면 리야박스의 로고를 강제로 늘려야 한다.엔진 내부에는 검출 메커니즘이 있고 랜덤 검사를 하지 않으면 게임에 들어갈 수 없습니다.

##7. app 을 포장하기 (테스트판)

현재 Layaiair-IDE 지원 APP-테스트판 기능**주의: 개발자 또는 구축 공사 방식을 사용하여 일부 IOS 와 android 의 기본 지식을 학습할 것을 건의합니다**) config.js 또는 로고를 바꾸려면 다음 그림 2, 그림 3개

![2](img/2.png)< br >>
그림 (2)

단계 2: 고급 옵션, 스크립트 설정 및 로고 시작

![3](img/3.png)< br >>
그림 (3)
