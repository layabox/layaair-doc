#android 의 후퇴 버튼
LayaNative 에서 이 두 함수를 사용할 수 있으며, conch.setOnBack PressedFunction(onBack)과 conch.exit()를 관리하여'후퇴키'처리 방식을 누르십시오.관람setOnBackPressedFunction 후 사용자가 후퇴 키를 누르면 이 함수를 실행합니다.

이 함수를 호출시키면 엔진에서 기본적으로 두 번 하차하는 기능을 누르고 싶다면 응용을 사용하려면 exit () 함수를 호출할 수 있습니다.


**Tips**  
*1, conch, LayaNative 환경에서만 호출할 수 있으며, 웹 버전에서는 conch 가 정의되지 않았기 때문에 존재를 판단해야 합니다.*
*2, as 언어를 사용하여 개발할 때, 브라운도.window['conch'] 이런 식으로 conch 대상을 얻을 수 있다.*
*3, LayaNative Android 판만 함수가 있습니다.*


js 예례는 다음과 같다:

```javascript

var n=3;
if(window.conch){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
        else{
            //用户自己的代码，例如返回上层页面
        }
    });
}
```
