# 其他说明

##1. 제3방도

LayaPlayer 밑단에 openGLES 렌더를 사용하여 안드로이드의 GLSufacew 컨트롤과 iOS GLKView 컨트롤을 사용하여 제3자 지도를 지원할 수 없습니다.

##2. 파일 형식

**항목의 텍스트 형식 파일 (예를 들어: ini, xml, html, json, js 등은 모두 utf8 인코딩 형식으로, iOS 장치가 비utf8 형식의 파일을 지원하지 않기 때문이다.**

##3. debug 모드와 release 모드

LayaPlayer 밑바닥 LOG 는 세 가지로 나뉜다:


```java

LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```


js 스크립트에서 개발자는 다음 함수를 통해 Debug 모드를 설정할 수 있습니다:


```javascript

if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```


**Tips**
*1, conch, LayaPlayer 환경 하에서 호출, 웹 버전에서 conch 정의 없이 모든 것을 판단해야 합니다.*
*2, as 언어 개발을 사용하면 브라운도우(Browser.window['conch)] 이런 식으로 컨치의 대상을 얻을 수 있다.*

##4. 아이오S 대접 마이크로폰

아이오S 플랫폼 아래에서 마이크로신 SDK, 위신1.77 버전 이후 추가-Objc 인자, 마이크로편지 공식 문서에서 기본값 증가`-Objc -all_load`그러나 이렇게 하면 편집보 오류가 발생할 수 있다.
이런 상황에 부딪히면 인자를 바꿀 수 있다`-Objc -force_load libWeChatSDK.a`설정 후, 그림 1개 보여 주기:

![1](img/1.png)

##5. 아이오스 에뮬레이터

LayaPlayer 는 0.9.5 이후의 버전을 지원하며 아이OS 에뮬레이터가 실행되고, 항목을 구성한 후 모의기를 선택하면 실행할 수 있습니다.

**Tips: LayaPlayer 아이OS 시뮬레이터를 지원하지만 실행 효율은 낮고 개발자가 아이OS 리얼리티 디버깅을 권장합니다.**

##6. 각종 정보 가져오기

일렉트릭 헤드
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1244getTotalMam () 124대 (하) 운영 장치 총메모리 (하) 를 획득하다
12444getUsedMem () 124타 (가) 현재 응용 메모리 (를) 획득한 (KB) 단위 (KB) 가 너무 정확하지 않지만, 참고로 124코스 (를) 할 수 있다
1.1244getAvalidMem () 가 카타르 메모리 (를) 획득한 (KB) 단위 (KBalidMem) 를 가리키는 것은 정확하지 않지만, 참고로 124테라의 메모리 (를) 할 수 있다
12444getNO = Networktype () 124네오 네트워크 컨디션 (NETu WIFI = NET2G = NET2;NET u 4G = NET u 4G = 4;NET u 4G = 4;NET u UNOWN = 5
1244getRuntimeVersion () 12444테오 (LayaPlayer 버전) 을 획득한 문자열은 유사한 ios-conch5-9. 2, android-0. 9 – 0.9
"Conch-android"의 문자열 124테오 "Conch-ios"와 "Condroid"
1244-Apppversion () 가 아이오스-App 의 버전 번호를 획득하여 문자 1.1124대
1244호 (Applocalversion) 이 iOS-App 의 Local 버전 (Local) 호출 (Local) 로 문자열 1.2 (1.2) 로 이 버전을 통해 Appp을 업데이트할 수 있습니다.124대

이 함수는 모두 conch.config 종류의 함수에 속하여 호출 실례:


```javascript

if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```


**Tips**
*1, conch, LayaPlayer 환경 하에서 호출, 웹 버전에서 conch 정의 없이 모든 것을 판단해야 합니다.*
*2, as 언어 개발을 사용하면 브라운도우(Browser.window['conch)] 이런 식으로 컨치의 대상을 얻을 수 있다.*

##7. Assistant Touch

LayaPlayer 엔진에 Asssistant Touch 같은 그림이 새겨져 있습니다:

![2](img/2.png)</br>


개발자는 다음 함수를 통해 디스플레이와 숨길 수 있다


```javascript

if( window.conch )
{
    window.conch.showAssistantTouch(false);
}
```

**Tips:**
*1, 만약 Asssitant Touch가 더 일찍 사라진다면, config.js 에서 설정할 수 있다*
*2. LayaPlayer-0.9.5 이전 버전, 기본적으로 열렸고, 0.9.5 이후 버전, 묵인은 폐쇄*

##8. LocalStoorage에 관해

LayaNative LocalStoorage를 지원하는데, 형식적인 요구가 있으므로 getItem (), setItem () 을 저장하기 위해 저장가치 및 값을 얻기

###AS 의 용법


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###JS 와 TS 아래 사용법


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###잘못된 용법:

다음으로 js 문법의 용법은 PC 브라우저나 이동단 (브라우저 누드) 에서 지원하지만 LayaNative 아래에서 지원하지 않습니다


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```




##9. 스크린 프로젝트 중 오류 폭탄틀

항목 실행 과정에서 때때로 잘못된 힌트를 튕기기도 하고, 이 힌트는 프로젝트 중 코드 오류가 발생했습니다.우리의 건의는 이 잘못된 폭탄틀 속의 잘못을 해결하는 것이며, 만약 진정으로 해결되지 않으면 다시 가리지 않는 것이다.오류 폭탄 상자 코드 다음과 같습니다:


```java

window.showAlertOnJsException(false);
```


##10. 만속 모드 설정 (30프레임)
LayaPlayer 중 FPS 는 기본적으로 60이지만 실시간 요구에 강하지 않은 게임을 많이 겨냥해 30프레임까지 새로 고쳐주시면 됩니다. 이때는 이하 함수를 통해 설정할 수 있습니다.

```javascript

conch.config.setSlowFrame(true);
```

**Tips**  
**1, conch.config 은 LayaPlayer 환경에서만 호출할 수 있으며, 웹 판본에는 conch 정의가 없기 때문에 존재를 판단해야 합니다.**  
**2, as 언어 개발을 사용하면 브라운도우(Browser.window['conch)] 이런 식으로 컨치의 대상을 얻을 수 있다.**

LayaNative-0.9.13과 Layaiaiaiaiaiaiaia-1.7.14 이후 Layanaative, Layair 브라우저 버전의 문법은 통일되었고 앞으로 아래의 쓰기를 최대한 사용하도록 하겠습니다.

```javascript

Laya.stage.frameRate = "slow";//"fast" "slow" "mouse" "sleep"
```


##11. 안드로이드의 후퇴 버튼
(LayaNative 버전)=0.9.8)
기존 버전의 LayaNative, 후퇴 버튼 처리 방식은 2회 연속 후퇴 버튼을 누르면 App 에서 탈퇴한다.0.9.8 이후 LayaNative 두 함수 conch.setOnBack PressedFunction(onBack)과 conch.exit(), 스크립트에서 후퇴키를 연결할 수 있습니다.인터페이스 정의:


```javascript

interface conch {
    ...
    setOnBackPressedFunction(onBack:()=>void);
    exit():void;
    ...
}
```


*setOnBack PressedFunction(f)*
f 는 사용자가 후퇴 키를 눌렀을 때 실행하는 함수입니다.
이 함수를 호출시키면 두 번의 탈퇴 기능을 차단하고, 이때 로그아웃을 하려면 exit () 함수를 통해 실행할 수 있습니다.

*exit()*
이 함수를 사용하여 바로 App 을 종료합니다.

*주의하다*
앤드로이드판만 이 두 함수가 있습니다.

js 예제:

```javascript

var n=3;
if(window.conch && window.conch.setOnBackPressedFunction){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
    });
}
```

##12. 엔진이 초기화되거나 스크립트 시작 중 이상처리
LayaPlayer-0.9.11 버전 이후 엔진 초기화, 시작 스크립트 복사 과정에서 이상이 발생한다면, 엔진이 윈도우. onlayayayaIniterror (error) 함수, 이 함수는 기본적으로 config.js 중 정의, 코드:

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

개발자는 자신의 요구에 따라 잘못된 정보와 오답을 수정할 수 있다.

##13. 장치 모델 가져오기
LayaPlayer-0.9.12 버전 이후 iOS 는 conch.config.getDevice Info () 를 호출할 수 있습니다.iPhone X 에 적용할 수 있으며, 코드 다음과 같습니다:

```javascript

if( window.conch )
{
    var devInfo = JSON.parse(window.conch.config.getDeviceInfo());

    if (devInfo.devicename === 'iPhone10,3' || devInfo.devicename === 'iPhone10,6')
    {
        // iPhone X适配
    }
}
```
