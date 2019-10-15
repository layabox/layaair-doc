#마이크로 개방 데이터 영역

##하나, 위신 개방 데이터 영역 전시 구성 요소

위신 개방 데이터필은 항상 귀찮은 일이고 특수 인코딩이 필요하고 성능 병목, 그리고 마우스 사건에 대한 문제가 자주 발생할 수 있으며, Layair 2.0부터 Laya 공식 위신개방 도메인 UI 구성 요소를 제시하고 이를 해결해 사용이 더 간단하고 성능이 높습니다.

개방 데이터 영역 구성 요소는 프로젝트의 Basics > UI> WXOpenDaViewer에서 찾을 수 있습니다

![wx1](../../AS/openDomain/img/wx1.png) 







###개방 지역 전시 구성 요소의 사용

1. 개방 데이터 도메인 프로그램을 설계하고, 예를 들면 크기가 500*500.

2. 메인 IDE 내에서 WXOpenDataViewer 구성이 적합한 위치로 설정되어 있으며 크기 500*500*

![wx1](../../AS/openDomain/img/wx2.png) 




3. 위챗 디버그에서 살펴보면 개방 데이터 영역의 내용을 볼 수 있고 성능과 마우스 사건은 최적화될 수 있다

![wx1](../../AS/openDomain/img/wx3.png) 




총괄: 새로운 위신 개방 도메인 데이터 구성 요소를 사용하여 인코딩 없이 개방 영역의 내용을 보여주고 성능과 마우스 사건은 모두 최적화될 수 있습니다.

##둘째, 개방 도메인 패스 인터페이스 사용

위신 개방역에서 로컬 싱글 사진만 다운로드할 수 없으며 그림을 사용할 수 없어 사용하기 매우 불편하다.또한 2.0의 장면은 자동으로 화집을 가재할 수 있으며, 이는 Wx 개방 도메인 오픈이 발생할 수 있다.이 문제를 해결하기 위해 개방역 개발을 편리하게 하여 2.0에서 투입포를 제공했다.자역에서 json, 그림 등을 사용할 수 있습니다.

현재 투입된 파일 형식은 단독 그림, JSON 파일, 그래프 파일이 있습니다.

MiniAdapter 인터페이스를 각각 응답합니다:`sendSinglePicToOpenDataContext`,`sendJsonDataToDataContext`,`sendAtlasToOpenDataContext`.

다음은 투전된 예례를 사용합니다:

####메인 부분 선택:

대응 파일을 사용하기 전에 이 인터페이스를 사용하여 * 주역 * 가재된 정보를 자역으로 알려야 합니다.이 패스 인터페이스는 사용하는 위신에서 제공하는 주역으로 문자 메시지를 내보내는 인터페이스 인터페이스, 미니에이터 원코드와 웨이보 공식 문서를 볼 수 있다.


```typescript

if(Laya.Browser.onMiniGame){
    //加载一个json和图集
Laya.loader.load(["json/reward.json","res/atlas/test.atlas"],Laya.Handler.create(null,function(){
    //加载完成
    //使用接口将图集透传到子域
	Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");	
    //使用接口将json投促函到子域
    Laya.MiniAdpter.sendJsonDataToDataContext("json/reward.json");
}));
}
```


####서역 부분 선택:

이 부분의 코드 는 2.0.1bate 판에서 비롯되었다**개방 영역 프로젝트**사례 코드.여기에는 간단한 수정이 있습니다. 두 개의 서류가 전해졌기 때문에 투전된 두 파일을 확인하고 사용해야 합니다.

전송문서를 수신하려면 위신 자역을 사용해야 한다`wx.onMessage`인터페이스.자세한 상황은 위신을 살펴볼 수 있다[官方文档](https://developers.weixin.qq.com/minigame/dev/api/wx.onMessage.html).


```typescript

//用于计数
var mark = 0;
if(Laya.Browser.onMiniGame)
    Laya.Browser.window.wx.onMessage(function(data){//微信接受信息
        if(data.url == "res/atlas/test.atlas" || data.url == "json/reward.json"){
        	mark ++;
            if(mark == 2)//确认数据全部接收后
            	Laya.loader.load([
               		"res/atlas/test.atlas",
                	"json/reward.json"],Laya.Handler.create(this,this.onComplete));
        }
	}.bind(this));
```


onComplete 방법, 원판과 일부 수정을 주의하십시오.


```typescript

onComplete() {
    //获取资源
    var testJosn = Laya.loader.getRes("json/reward.json");
    //输出透传过来的json
    console.log('透传的json信息：', testJosn);
    //加载IDE指定的场景
    var big = new BigRank();
    big.init();
}
```


위신 환경 아래 테스트, 효과 1:

[] (img/1.png)<br>(1)

