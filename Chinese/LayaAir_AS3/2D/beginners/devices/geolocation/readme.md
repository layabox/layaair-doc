# 用Geolocation获取地理位置信息



## **地理位置**

 如果设备支持Geolocation，并且所使用的浏览器支持，就可以使用Geolocation获取设备的当前地理位置。可以打开网页[http://caniuse.com/#search=geolocation](http://caniuse.com/#search=geolocation)查看有哪些浏览器版本支持Geolocation。显示Supported表示支持。

![1](img/1.png)

** Geolocation返回的GeolocationInfo，包含以下信息：**

• latitude —— 维度（度）。

• longitude —— 经度（度）。

• altitude —— 相对于海平面的海拔高度（米）。如果设备不提供海拔数据，altitude 的值为null。

• accuracy —— 返回经纬度的精度，以米为单位。

• altitudeAccuracy —— 返回海拔的精度，以米为单位。altitudeAccuracy 可能为null。

• heading —— 返回设备的移动方向（角度），指示距离北方的角度。0度表示指向正北方，方向以顺时针旋转（这表示东方是90度，西方是270度）。如果speed是0，heading会是NaN。如果设备无法提供heading信息，值为null。

• speed —— 返回设备每秒的移动速度（米）。speed可能为null。

• timestamp —— 获取信息的时间戳。

** Geolocation静态属性值包含以下通用设置：**

• enableHighAccuracy —— 布尔值，如果设为true并且设备能够提供更精确地位置，则应用尽可能获取最佳结果。注意着可能导致更长的响应时间和更大的电量消耗（如开启了移动设备的GPS）。 

• timeout —— 正整数，代表返回位置的最大时间（毫秒）限制。默认值是Infinity，意味着getCurrentPosition()直到位置可用时才会返回。

• maximumAge —— 32位正整数，代表可返回的可用缓存位置的最大寿命。如果设置为0，意味着设备不使用缓存位置，始终尝试获取实时位置。如果设置为Infinity，设备必须返回缓存位置无论其寿命。默认值：0。

### **一、获取当前定位**

 使用静态方法Geolocation.getCurrentPosition()获取当前的位置，getCurrentPosition()只触发一次。

##### 1.1尝试获取当前位置

```javascript
Geolocation.getCurrentPosition(
Handler.create(this, onSuccess), 
Handler.create(this, onError));
```

##### 1.2成功获取位置后触发

```java
function onSuccess(info:GeolocationInfo):void
{
trace('经纬度: (' + info.longitude + '°, ' + info.latitude + '°)，精确度：' + info.accuracy + 'm');
 
if(info.altitude != null)
trace('海拔：' + info.altitude + 'm' + (info.altitudeAccuracy != null ? ('，精确度：' + info.altitudeAccuracy + 'm') : ''));
 
if(info.heading != null && !isNaN(info.heading))
trace('方向：' + info.heading + "°");
 
if(info.speed != null && !isNaN(info.speed))
trace('速度：' + info.speed + "m/s");
}
```

##### 1.3 获取位置失败后触发


```java
function onError(err:Error):void
{
var errType:String;
if (err.code = Geolocation.PERMISSION_DENIED)
errType = "Permission Denied";
else if (err.code == Geolocation.POSITION_UNAVAILABLE)
errType = "Position Unavailable";
else if (err.code == Geolocation.TIMEOUT)
errType = "Time Out";
trace('ERROR(' + errType + '): ' + err.message);
}
```

以上示例代码演示使用getCurrentPosition()获取当前的位置信息，成功时打印地理位置信息，失败时打印错误信息和错误原因。

### **二、监视位置改变**

 除了获取当前位置之外，还可以监视位置的改变。使用`Geolocation.watchPosition()`监视位置改变，该函数返回一个监视器ID值，可以使用`Geolocation.clearWatch()`并传入该ID值来取消由watchPosition()注册的位置监听器。

```
// Geolocation.watchPosition函数签名
Geolocation.watchPosition(
Handler.create(this, updatePosition),
Handler.create(this, onError));
function updatePosition(info:GeolocationInfo):void { }
function onError(err:Error):void { }
```

 watchPosition()具有和getCurrentPosition()一样的函数签名。