#Geolocation 으로 지리적 위치 정보 가져오기
[TOC]

##지리적 위치

Geolocation 을 지원하고 있는 브라우저 지원을 지원한다면 Geolocation 장치의 현재 지리적 위치를 사용할 수 있습니다.홈페이지 열기[http://caniuse.com/](http://caniuse.com/#search=geolocation)#[search=geolocation](http://caniuse.com/#search=geolocation)어떤 브라우저 버전이 Geolocation 을 지원하는지 확인하십시오.Supported 지원을 표시합니다.

![1](img/1.png)

Geolocationfo, 다음 정보를 포함합니다:

##--`latitude`차원. `longitude` —— 经度（度）。

##--`altitude`——해수면의 해발 고도(미).설비가 해발 데이터를 제공하지 않는다면`altitude`null. `accuracy`—경위도의 정밀도를 되돌려 쌀을 단위로 한다.
##--`altitudeAccuracy`—해발의 정도를 되돌려 쌀을 단위로 한다.`altitudeAccuracy`이 가능하다, ~할 수 있다,...`null`. `heading`——장치의 이동방향(각도), 북측의 각도를 지시합니다.0도 정북쪽을 가리키며 방향을 순시침으로 회전한다.하면, 만약, 만약...`speed`0 이고,`heading`아마`NaN`.장치가 제공되지 않으면`heading`메시지`null`.
##--`speed`——되돌아가는 속도(쌀).`speed`이 가능하다, ~할 수 있다,...`null`. `timestamp`—정보를 얻는 시간 스탬프.

Geolocation 정적 속성 값은 이하 통용 설정을 포함합니다:

##--`enableHighAccuracy`True, 장치가 더 정확한 위치를 제공할 수 있다면 가능한 한 좋은 결과를 얻을 수 있다.더 긴 응답 시간과 더 큰 전력 소모 (이동 장치의 GPS) 를 열고 있다. `timeout`—정수, 대표가 위치로 돌아오는 최대 시간(밀리초)제한.기본 값은`Infinity`의미하다`getCurrentPosition()`위치가 필요할 때만 돌아갈 수 있다.
--`maximumAge`32위 정수, 되돌아올 수 있는 캐시 위치의 최대 수명.만약 0을 설정한다면, 장치가 캐시 위치를 사용하지 않는다는 것을 의미하며, 항상 실시간 위치를 가져오려고 시도한다.하면, 만약, 만약...`Infinity`장비는 반드시 캐시 위치를 되돌려야 한다. 수명을 막론한다.기본 값: 0.

###1, 현재 위치 가져오기

정적 방법 사용`Geolocation.getCurrentPosition()`현재 위치 가져오기`getCurrentPosition()`단 한 번만 촉발한다.


```java

// 尝试获取当前位置
Geolocation.getCurrentPosition(
				Handler.create(this, onSuccess), 
				Handler.create(this, onError)
);

// 成功获取位置后触发
function onSuccess(info:GeolocationInfo):void
{
	trace('经纬度: (' + info.longitude + '°, ' + info.latitude + '°)，精确度：' + info.accuracy + 'm');
	
	if(info.altitude != null)
		trace('海拔：' + info.altitude + 'm' + (info.altitudeAccuracy != null ? ('，精确度：' + info.altitudeAccuracy + 'm') : ''));
		
	if(info.heading != null && !isNaN(info.heading))
		trace('方向：' + info.heading + "°");
		
	if(info.speed != null && !isNaN(info.speed))
		trace('速度：' + info.speed + "m/s");
}

// 获取位置失败后触发
function onError(err:Error):void
{
	var errType:String;
	if (err.code = Geolocation.PERMISSION_DENIED)
		errType = "Permission Denied";
	else if (err.code == Geolocation.POSITION_UNAVAILABLE)
		errType = "Position Unavailable";
	else if (err.code == Geolocation.TIMEOUT)
		errType = "Time Out";
	trace('ERROR(' + errType + '): ' + err.message);
}
```


이상 예시 코드 사용`getCurrentPosition()`현재 위치 정보를 가져오고, 성공할 때 지리적 위치 정보를 인쇄하고 실패할 때 오류 정보와 오류 원인을 인쇄합니다.

###2. 감시 위치 변경

현재 위치를 얻는 것 외에도 위치의 변화를 감시할 수 있다.사용하다`Geolocation.watchPosition()`관찰 위치 변경, 이 함수는 모니터 ID 값을 되돌려 사용할 수 있습니다`Geolocation.clearWatch()`이 ID 값을 불러오기`watchPosition()`등록된 위치 모니터.


```typescript

// Geolocation.watchPosition函数签名
Geolocation.watchPosition(
	Handler.create(this, updatePosition),
	Handler.create(this, onError));
function updatePosition(info:GeolocationInfo):void { }
function onError(err:Error):void { }
```


​`watchPosition()`가지다`getCurrentPosition()`같은 함수 서명.보다`watchPosition()`<바이두지도 사용 현재 위치 보이기>