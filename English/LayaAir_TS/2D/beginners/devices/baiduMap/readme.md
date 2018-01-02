# Use Baidu map to show current location

> This section will step-by-step demonstrates the use of watchPosition  in the current location on Baidu map. The watchPosition method comes from Geolocation API.**Before you read this section, read the Geolocation base document or the Geolocation API documentation.**
>

In the beginning before the need to index the introduction of Baidu map script file, the url in Baidu map of the official website can be free to get. The url used in the demo is [http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### 1. Introduce the member variables:

```java
// 百度地图的API
private var map:*;                              // 地图引用
private var marker:*;                           // 地图标注物
private var BMap:* = Browser.window.BMap;       // 百度地图命名空间
private var convertor:* = new BMap.Convertor(); // 坐标转换接口
 
private var mapDiv:*; // 包含百度地图的div容器
```

### 2. Then come with constructor:

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

​    this example does not require the display element of LayaAir, the stage size is set to 1. Baidu map interface initialization is in init (). And then monitor the device location changes. Finally, it should be noted that the function convertToBaiduCoord () is to convert the coordinates to Baidu map coordinates, because it is as convertor.translate () parameters, so the scope of the trigger will be changed, so here the function of the binding Scopes.


##### 2.1 init function :

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

 The init () function initializes the Baidu map. Most of the interactive features are closed, leaving only drag maps. The initial site of the map is located in Beijing with a scaling factor of 15. And added a map tag.

##### 2.2 refit function :


```java
private function refit():void
{
mapDiv.style.width = Browser.width / Browser.pixelRatio + "px";
mapDiv.style.height = Browser.height / Browser.pixelRatio + "px";
}
```

Set the position of the marker after the conversion is complete and pan the view angle to the viewport centered on the marker.

##### 2.4 convertToBaiduCoord function :

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

  updatePosition()是Geolocation.watchPosition()的触发函数，在每次监测到位置改变后都需要把获取到的原始坐标转换到百度坐标，才能在百度地图上显示正确的位置。

Set the position of the label after the conversion is complete and pan the view angle to the viewport centered on the label.

##### 2.5 onError function :

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

在转换完成后设置标注物的位置，并且把视角平移到以标注物为中心的视口中。

##### 2.5 onError函数：

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

 After you have completed the above steps, you can view the effect on the browser on the device. If the location is wrong, try to get the coordinates as Google coordinates. Note that the security restrictions of the browser itself may require the user to manually allow the page to use a geographical location, or Chrome needs the address of the HTTPS protocol to be able to use the location.
