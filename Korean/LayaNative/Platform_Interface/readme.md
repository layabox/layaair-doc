#반사 메커니즘으로 Native APP 경로

리야네이트는 반사 메커니즘을 통해 개발자에게 연결 채널 인터페이스를 제공했고, 다음 내용은 대합 채널 상가 (conchMarket) 를 통해 반사 메커스를 어떻게 이용할지 자세하게 소개했다.

###1.도선 상가

LayaNative 반사 메커니즘을 통해 자바스크립트와 원생 개발 언어(Android 아래 자바, iOS 아래 Objective-C)의 상호 호출, 개발자는 원생 개발 언어(Android 아래 자바, ios 아래 Objective-C) 부분의 개발 작업이 필요하다.

####1.1 iOS 시스템의 대합 채널 상가가 실현되었습니다:

#####Part.1 - 유명 반사:

LayaaaNANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANANatiVVVV를 통해 구성된 IOOSIOSIOSIOSIOOSS프로프로프로젝트 프로프로프로프로프로프로프로프로젝트 프로PPANAMInnnnnInnnnnnnnnterpppstore목록을 자동생생생생생생생생MMAppppStototototototoore종류종류종류종류종류종류종류종류를 입력하는 것을 볼 수 있습니다. 이 생생생생생생생생생생생생생생생생생생생생생생생생생생생생생생생생생생Pu Login 방법, login 방법의 두 번째 개발

#####Part.2 - 자바스크립트 호출 OC:

또한 이러한 login 방법으로 자바스크립트에서, conchmarket 종류로 호출되는 login 방법은 실제로 LayaPlatform인터페이스의 LP LP Login 방법, 이 과정은 사실 Javascript로 OC 를 호출 하는 과정이다.

#####Part.3 - OC 호출 자바스크립트:

이 같은 login 방법의 예를 들어 Javascript에서 conchmarket 종류를 적용하는 login 방법으로 실행 후 조정 방법을 실행할 수 있습니다. 이 조정 방법은 LayaplatformCallback에서 성명을 하고 LayaplatformInterface의 LPu Layaplagin에서 LaplatformCallback 의 LPu LoginCallback 방법으로 OC Jaccript.

#####Part.4 - 코드 세션:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// TODO 数据处理.
});
```



```javascript

// MarketAppStore.mm文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
-(void)LP_Login:(NSString*)jsonParam{
// TODO 调用第三方平台的登陆的登陆接口
// OC层调用登录结束回调.
[[LayaPlatformCallback GetInstance] LP_LoginCallback:pJsonString];
}
```


####1.2 Android 시스템 아래의 연결 채널 상가가 실현되었습니다:

#####Part.1 - 유명 반사:

LayaNative 구축된 Android 프로젝트 프로젝트에서 layairair.game.Market 가방에 자동으로 만들어진 MarketTest 종류로 LayaplatformInterface 종류를 계승하고 login 방법으로 MarketTest.javava 에서 LP u Login 방법을 다시 쓰기 위해 login 방법의 두 번째 개발을 완성했습니다.

#####Part.2 - 자바스크립트 호출 자바:

또한 이러한 login 방법으로 자바스크립트에서 conchmarket 종류로 호출되는 login 방법은 실제로 LayaPlatform인터페이스의 LP LP 루진 방법으로 이 과정은 사실 자바스크립의 자바스크립을 호출한 과정이다. 즉: conchmarket.login = "LayaplatformInterface의 LPu Login 방법.

#####Part.3 - 자바 자바스크립트 호출

이 같은 login 방법을 예를 사용하JavaScripttttt로 사용하고 있는 login 방식방식을 실행실행후 조정방법을 실행실행할 경우 LayaaayaPlalalalamCalallback에서 성명하고 LayaaayascriplaplatformchMchMchMarketMchMargin 방식방식방식방식을 실행실행실행실행후 리리리윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈윈컴컴컴컴컴컴Callback방법방법에서 JAAAAAAAAAAALalalalalalalalalalalalalalalalalalalayamCallllbackalalalalallbackayaplatform인터페이스의 LP u Login=> LayaPlatformCallback 의 LP u LoginCallback.

#####Part.4 - 코드 세션:


```javascript

// JavaScript中调用方式: conchMarket.login([参数], [回调函数]) ;
var sData={type:"test"};
window.conchMarket.login(JSON.stringify(sData),function(data){
console.log(data);
// 数据处理.
});
```



```javascript

// MarketTest.java文件中根据自己需求添加相关代码到LP_Login方法中, JavaScript中调用conchMarket.login就会执行LP_Login方法.
public void LP_Login(final String jsonParam)
{
// 调用第三方平台的登陆的登陆接口
// Java层调用登录结束回调.
LayaPlatformCallback.GetInstance().LP_LoginCallback(objCallBack.toString());
}
```


###2. 연결 채널 API 통합

LayaNative 제공된 반사 메커니즘을 통해 개발자는 다른 채널의 API (예를 들어 로그인, 공유, 충전 등) 자바스크립트 계열에서 통일된 인터페이스를 사용한 후 시스템 원생 개발 언어 근거를 사용합니다. LayaNative (conchMarket 전국류로 연결된 API 모두 통합, 개발자 사용을 편리하게 합니다:

(주: 인터페이스 대응 원생 개발 언어(Android 아래 자바, iOS 아래 Objective-C) 부분의 인코딩 작업을 2차 개발에 참조하는 사례 코드 자체 완성.)

1244 API 이름 124테오
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
마르ket`conchMarket.init(JSON.stringify(sData),function(data));`124대
일렉트론`conchMarket.login(JSON.stringify(sData),function(data));`124대
124대 로고ut`conchMarket.logout(JSON.stringify(sData),function(data));`124대
124사 switchuser`conchMarket.switchUser(JSON.stringify(sData),function(data));`124대
1, 2, 1, 2, 4, 2`conchMarket.enterPlatform(JSON.stringify(sData),function(data));`124대
테네스테레오`conchMarket.enterBBS(JSON.stringify(sData),function(data));`124대
1, 2, 2, 4, 4, 4, 2`conchMarket.enterFeedback(JSON.stringify(sData),function(data));`124대
계좌 관리에 들어가다`conchMarket.enterAccountMgr(JSON.stringify(sData),function(data));`124대
124테리어`conchMarket.authorize(JSON.stringify(sData),function(data));`124대
124테네오 네오`conchMarket.refreshToken(JSON.stringify(sData),function(data));`124대
1.0.4 cz 로 바꾸기`conchMarket.recharge(JSON.stringify(sData),function(data));`124대
1, 124, buyprops`conchMarket.buyProps(JSON.stringify(sData),function(data));`124대
1.0.4 (1.0.4) 로 바꾸기`conchMarket.setRechargeInfo(JSON.stringify(sData),function(data));`124대
1, 2, 4, 4, 4, 4`conchMarket.enterShareAndFeed(JSON.stringify(sData),function(data));`124대
1, 2, 4, enterInvite`conchMarket.enterInvite(JSON.stringify(sData),function(data));`124대
124getGameFriends`conchMarket.getGameFriends(JSON.stringify(sData),function(data));`124대
1244대 세인드 ToDesktop`conchMarket.sendToDesktop(JSON.stringify(sData),function(data));`124대
12444사 send MessageToPlatform 124가 메시지 보내기`conchMarket.sendMessageToPlatform(JSON.stringify(sData),function(data));`124대
카nSendond ToDesktop`conchMarket.canSendToDesktop(JSON.stringify(sData),function(data));`124대
1244 openTopicircle 이슈`conchMarket.openTopicCircle(JSON.stringify(sData),function(data));`124대

**부록:**

[对接渠道demo for Eclipse(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForEclipse.zip)

[对接渠道demo for AndroidStudio(Android) 示例下载](http://ldc.layabox.com/download/tools/SampleForAndroidStudio.zip)