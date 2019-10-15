#IOS 응용 구매



IOS 응용에 In Apppurchase, 이하 IAP.

Appstore는 보오와 위신지급 등 제3자 지급 방식을 지원하지 않기 때문에 어떤 엔진이나 도구 개발을 사용하든 결국 Apple 제공된 IAP 방식을 통해 거래를 마칠 필요가 있다.

Layabox 개발자를 돕기 위해 IAP 관련 디버깅 시간을 절약하기 위해 이 부분의 관련 인터페이스를 봉쇄하고 자바스크립트를 통해 개발자에게 직접 호출을 하거나 확장합니다.

IAP 의 프로세스는 매우 간단하고 클라이언트는 바로 Appstore 통신과 거래를 완료하고 다음과 같습니다:

​![blob.png](1.png)< br >>
그림 (1)


단기 게임에 대한 상도가 IAP 프로세스를 완성하였지만 부정행위가 발생할 수도 있고 개발자는 검증의 절차를 늘릴 수 있으며 다음과 같은 그림:

​![blob.png](2.png)< br >>
그림 (2)

이러한 방식을 거쳐 부정행위를 방지할 수 있기 때문에 개발자는 반드시 검증의 절차를 늘리도록 건의합니다!

##참고 코드

###1. 응용층 자바스크립트 중 코드


```javascript

// JavaScript中 组装充值相关参数. (参数意义参见本文末尾处的附录1)
var json= '{"order_id":"OriderID_20160824_9824","amount":1,"product_id":"Laya.joychina.test","callback_uri":"http://186.152.54.225:8800/Apple.pay"}';
 
// JavaScript中 调用充值函数. (这里会调用原生开发语言中对应的LP_Login方法)
conchMarket.recharge(json,function(jsonString) {
     var pJson = JSON.parse(jsonString);
     console.log("code:"+ pJson .code);
     console.log("product_id:"+ pJson.product_id);
     console.log("amount:"+ pJson.amount);
     console.log("order_id:"+ pJson.order_id);
     console.log("desc:"+ pJson.desc);
});
```


###2. IOS 시스템에서 Objective-C 인코딩

(주: LayaNative 중 소모성 상품의 예례류 IAPManager 종류 참고로)


```javascript

// MarketAppStore.mm文件中的LP_CZ方法中添加内购相关代码, 然后在JavaScript中调用conchMarket.recharge就会执行此方法.
//以前版本叫LP_Recharge，因为怕苹果扫描误伤，改成了不专业的拼音 充值
-(void)LP_CZ:(NSString*) jsonParam
{
    // TODO 添加内购相关代码.
}
```


상술한 절차를 통해 iOS 의 IAP 기능을 쉽게 완성할 수 있습니다.

###3. 충전 인터페이스 및 인자 설명:


  `conchMarket.recharge(jsonParam,callBack);`

`jsonParam`인자 입력 인자, json 문자열, json 대상이 다음 속성을 제공해야 합니다

124대 이름
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
12444테네트 프로듀드 유id
4amount
일렉트릭 (단기판) 네트 문자 (단기판 설치 (일렉트로닉) 네임 문자열
일렉트로닉 서버 검증 주소 (단기판 설치 문자) 124414



`callBack`인자 구매 반향 함수, json 문자열 인자 변수, json 속성 이하

124대 이름
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
하나, 둘, 하나, 둘, 셋
12444테네트 프로듀드 유id
4amount
"string"님"
"Sucess"에 성공하다"

###4. 주의사항:

아이오스의 IAP 기능은 LayaNative 엔진의 핵심 기능이 아닌 일부 코드도 개방된다. 개발자는 자신의 수요에 따라 스스로 수정할 수 있다. 충전 문제가 생기면 Layabox 회사가 bug 을 찾지 않고 법적 관련 문제를 감당하지 않는다.
