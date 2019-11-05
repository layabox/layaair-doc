#바이두 지도로 현재 위치 보이기

> 이 데이는 1단계 watchPosition()을 백도 지도에 현재 위치를 표시합니다.watchposition 방법은 Geolocation API**텍스트를 배우기 전에 Geolocation 기초 문서나 Geolocation API 문서를 읽으십시오.**
>>

시작하기 전에 index.html 에서 바이두지도를 도입하는 스크립트 파일이 필요합니다. 이 url 은 바이두지도의 공식 사이트에서 무료로 얻을 수 있습니다.시사회에서 사용하는 url 은[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **하나, 우선 멤버 변수를 소개합니다:**


```java

// 百度地图的API
private var map:*;                              // 地图引用
private var marker:*;                           // 地图标注物
private var BMap:* = Browser.window.BMap;       // 百度地图命名空间
private var convertor:* = new BMap.Convertor(); // 坐标转换接口
 
private var mapDiv:*; // 包含百度地图的div容器
```


###둘째, 이어서 구조 함수:


```java

public function WatchPosition()
{
Laya.init(1, 1);
 
init();
 
// 使用高精度位置
Geolocation.enableHighAccuracy = true;
Geolocation.watchPosition(Handler.create(this, updatePosition), Handler.create(this, onError));
 
// 绑定convertToBaiduCoord作用域
__JS__("this.convertToBaiduCoord = this.convertToBaiduCoord.bind(this)");
}
```


Layaiair의 디스플레이 요소를 사용하지 않기 때문에 무대 사이즈는 1.바이두지도 계면의 초기화는 init () 에 넣는다.그리고 감청 장치 위치의 변화.마지막으로 함수 convertToBaiduCoord () 는 바이두지도 좌표로 바뀐 것이며, convertor.translate () 의 인자가 바뀌기 때문에 이 함수의 변경을 위해 이 함수를 묶은 역할 영역을 바꾼다.

#####2.1 init 함수:


```java

private function init():void
{
mapDiv = Browser.createElement("div");
Browser.document.body.appendChild(mapDiv);
 
    // 适应窗口尺寸
refit();
Laya.stage.on(Event.RESIZE, this, refit);
 
// 初始化地图
map = new BMap.Map(mapDiv);
 
// 禁用部分交互
//map.disableDragging();
map.disableKeyboard();
map.disableScrollWheelZoom();
map.disableDoubleClickZoom();
map.disablePinchToZoom();
// 初始地点北京，缩放系数15
map.centerAndZoom(new BMap.Point(116.32715863448607, 39.990912172420714), 15);
 
// 创建标注物
marker = new BMap.Marker(new BMap.Point(0, 0));
map.addOverlay(marker);
}
```


init() 함수 초기화 바이두지도.대부분의 교호 기능을 폐쇄하고 트레이드맵만 남기고 있다.지도 초기 지점은 북경에 위치하고, 축소 계수 15에 있다.또한 지도의 표시물을 하나 추가했다.

#####2.2 refit 함수:


```java

private function refit():void
{
mapDiv.style.width = Browser.width / Browser.pixelRatio + "px";
mapDiv.style.height = Browser.height / Browser.pixelRatio + "px";
}
```


refit () 이 바이두지도를 전체 창으로 가득 채웠고, resize 사건을 정청해서 창 resize 때 창구를 다시 채울 수 있습니다.

#####2.3 updateposition 함수:


```java

// 更新设备位置
private function updatePosition(p:GeolocationInfo):void
{
// 转换为百度地图坐标
var point:* = new BMap.Point(p.longitude, p.latitude);
// 把原始坐标转换为百度坐标，部分设备的浏览器可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
convertor.translate([point], 1, 5, convertToBaiduCoord);
}
```


updateposition() 는 Geolocation.watch Posion () 의 터치 함수입니다. 매번 위치를 변경할 때마다 가져온 원시 좌표를 바이두 좌표로 바꿔야 바이두 지도에 올바른 위치를 표시할 수 있습니다.

어떤 설비 브라우저들이 가져온 좌표는 구글 좌표일 수도 있습니다. 이때 convertor.translate 의 세 번째 인자가 5 가 아니라 3 입니다.

#####2.4 convertToBaiduCoord 함수:


```java

// 将原始坐标转换为百度坐标
private function convertToBaiduCoord(data:*):void
{
if (data.status == 0)
{
var position:* = data.points[0];
// 设置标注物位置
marker.setPosition(position);
 
map.panTo(position);
}
}
```


완료된 후 표시물 위치를 설정하고 표시물을 중심으로 이동합니다.

#####2.5 onerror 함수:


```java

private function onError(e:*):void
{
var errType:String;
if (err.code = Geolocation.PERMISSION_DENIED)
errType = "Permission Denied";
else if (err.code == Geolocation.POSITION_UNAVAILABLE)
errType = "Position Unavailable";
else if (err.code == Geolocation.TIMEOUT)
errType = "Time Out";
alert('ERROR(' + errType + '): ' + err.message);
}
```


이상 단계를 완성한 후 장치에 있는 브라우저에서 효과를 볼 수 있습니다.위치가 잘못되면 얻은 좌표를 구글 좌표로 삼아 보자.브라우저 자체의 안전 제한에 주의하여 사용자가 웹 페이지에 지리적 위치를 사용할 수 있으며, 또는 크로미는 htps 프로토콜이 필요한 주소를 사용해야 지리적 위치를 사용할 수 있다.