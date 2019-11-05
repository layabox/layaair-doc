#Use Baidu Map to Display Current Location

> This section demonstrates step by step the use of watchPosition () to mark the current location on the Baidu map. The watchPosition method is derived from the Geolocation API.**Read the Geolocation Foundation Document or the Geolocation API Document before you learn this section.**
>

Before we start, we need to introduce the script file of Baidu Map in index. html, which is available free of charge on Baidu Map's official website. The URL used in the demonstration is[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **First, introduce the member variables:**


```java

// 百度地图的API
private var map:*;                              // 地图引用
private var marker:*;                           // 地图标注物
private var BMap:* = Browser.window.BMap;       // 百度地图命名空间
private var convertor:* = new BMap.Convertor(); // 坐标转换接口
 
private var mapDiv:*; // 包含百度地图的div容器
```


###Second, the constructor follows:


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


Since the LayaAir display element is not required in this example, the stage size is set to 1. The initialization of Baidu map interface is in init(). Then it monitors the location of the device. Finally, it should be noted that the function converttobaiducoord() is to convert the acquired coordinates to Baidu map coordinates. As it is a parameter of converter. Translate(), the scope will be changed when triggering, so the scope of this function is bound here.

#####2.1 init function:


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


Init () function initializes Baidu map. Turn off most of the interaction, leaving only the drag map. The map was originally located in Beijing with a zoom factor of 15. And a map annotation was added.

#####2.2 refit function:


```java

private function refit():void
{
mapDiv.style.width = Browser.width / Browser.pixelRatio + "px";
mapDiv.style.height = Browser.height / Browser.pixelRatio + "px";
}
```


Refit () fills the whole window with Baidu Map. Because of listening to resize events, the window will be refilled when resize.

#####2.3 updatePosition function:


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


Updateposition() is the trigger function of geolocation. Watchposition(). After each position change is detected, the original coordinates obtained need to be converted to Baidu coordinates to display the correct position on Baidu map.

Note that some device browsers may get Google coordinates, when convertor. translate's third parameter is not 5, but 3.

#####2.4 ConvertToBaiduCoord function:


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


After the conversion is completed, the position of the tag is set, and the view angle is shifted to the tag-centered view.

#####2.5 onError function:


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


After completing the above steps, you can view the effect in the browser on the device. If the position is wrong, try using the coordinates you get as Google coordinates. Note that browser security restrictions may require users to manually allow web pages to use geographic location, or Chrome needs the address of the HTTPS protocol to use geographic location.