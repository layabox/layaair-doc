#기타 설명

##1. 제3방도

LayaNative 밑단에 openGLES 렌더를 사용하여 안드로이드의 GLSufacew 컨트롤과 iOS GLKView 컨트롤을 사용하여 제3자 지도를 지원할 수 없습니다.

##2. 파일 형식

**항목의 텍스트 형식 파일 (예를 들어: ini, xml, html, json, js 등은 모두 utf8 인코딩 형식으로, iOS 장치가 비utf8 형식의 파일을 지원하지 않기 때문이다.**

##3. debug 모드와 release 모드

LayaNative 밑바닥 LOG 는 세 가지로 나뉜다:


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
*1, conch, LayaNative 환경 하에서 호출, 웹 버전에는 conch 정의 가 없기 때문에 존재 여부를 판단해야 합니다.*
*2, as 언어 개발을 사용하면 브라운도우(Browser.window['conch)] 이런 식으로 컨치의 대상을 얻을 수 있다.*

##4. 아이오S 대접 마이크로폰

아이오S 플랫폼 아래에서 마이크로신 SDK, 위신1.77 버전 이후 추가-Objc 인자, 마이크로편지 공식 문서에서 기본값 증가`-Objc -all_load`그러나 이렇게 하면 편집보 오류가 발생할 수 있다.
이런 상황에 부딪히면 인자를 바꿀 수 있다`-Objc -force_load libWeChatSDK.a`설정 후, 그림 1개 보여 주기:

![1](img/1.png)

##5. 아이오스 에뮬레이터

LayaNative iOS 시뮬레이터를 지원하는데, 모의기 실행 효율이 낮기 때문에 개발자가 아이OS 진기 디버깅을 권합니다.

##6. 각종 정보 가져오기

일렉트릭 헤드
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1244getTotalMam () 124대 (하) 운영 장치 총메모리 (하) 를 획득하다
12444getUsedMem () 124타 (가) 현재 응용 메모리 (를) 획득한 (KB) 단위 (KB) 가 너무 정확하지 않지만, 참고로 124코스 (를) 할 수 있다
1.1244getAvalidMem () 가 카타르 메모리 (를) 획득한 (KB) 단위 (KBalidMem) 를 가리키는 것은 정확하지 않지만, 참고로 124테라의 메모리 (를) 할 수 있다
12444getNO = Networktype () 124네오 네트워크 컨디션 (NETu WIFI = NET2G = NET2;NET u 4G = NET u 4G = 4;NET u 4G = 4;NET u UNOWN = 5
12444getRuntimeVersion () 124타임버전 (Runtime 버전) 을 획득한 문자열, 유사한 ios-conch5-0.9.9.android-conch5
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
*1, conch, LayaNative 환경 하에서 호출, 웹 버전에는 conch 정의 가 없기 때문에 존재 여부를 판단해야 합니다.*
*2, as 언어 개발을 사용하면 브라운도우(Browser.window['conch)] 이런 식으로 컨치의 대상을 얻을 수 있다.*

##7. 스크린 프로젝트 중 오류 폭탄틀

항목 실행 과정에서 때때로 잘못된 힌트를 튕기기도 하고, 이 힌트는 프로젝트 중 코드 오류가 발생했습니다.우리의 건의는 이 잘못된 폭탄틀 속의 잘못을 해결하는 것이며, 만약 진정으로 해결되지 않으면 다시 가리지 않는 것이다.오류 폭탄 상자 코드 다음과 같습니다:


```java

window.showAlertOnJsException(false);
```


##8. 엔진이 초기화되거나 스크립트 시작 중 이상처리
LayaNative2.0 버전에서 엔진 초기화, 시작 스크립트 복사 과정에서 이상 (네트워크 불안정) 이 발생한다면 엔진이 자동으로 윈도우. onlayayaInitError (error) 함수를 config.js 중 정의, 코드:

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

개발자는 자신의 요구에 따라 잘못된 정보와 오답을 수정할 수 있다.

##9. 장치 모델 가져오기
LayaNative2.0에서 iOS 는 conch.config.getDeviceInfo () 을 통해 장치 모델을 받을 수 있습니다.아이폰X 에 사용할 헤드커튼이 잘 어울리며 코드 다음과 같습니다:

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
