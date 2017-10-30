# Use Baidu map to show current location

> This section will step-by-step demonstrates the use of watchPosition  in the current location on Baidu map. The watchPosition method comes from Geolocation API.**Before you read this section, read the Geolocation base document or the Geolocation API documentation.**
>

In the beginning before the need to index the introduction of Baidu map script file, the url in Baidu map of the official website can be free to get. The url used in the demo is [http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### 1. Introduce the member variables:

```java
// Baidu map API
private var map:*;                              // Map reference
private var marker:*;                           // Map marker
private var BMap:* = Browser.window.BMap;       // Baidu map namespace
private var convertor:* = new BMap.Convertor(); // Coordinate conversion interface
 
private var mapDiv:*; // A div container containing Baidu maps
```

### 2. Then come with constructor:

```java
public function WatchPosition()
{
Laya.init(1, 1);
 
init();
 
// Use high-precision position
Geolocation.enableHighAccuracy = true;
Geolocation.watchPosition(Handler.create(this, updatePosition), Handler.create(this, onError));
 
// Bind the convertToBaiduCoord scope
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
 
    // Adapt to window size
refit();
Laya.stage.on(Event.RESIZE, this, refit);
 
// Initialize the map
map = new BMap.Map(mapDiv);
 
// Disable partial interaction
//map.disableDragging();
map.disableKeyboard();
map.disableScrollWheelZoom();
map.disableDoubleClickZoom();
map.disablePinchToZoom();
// The initial location is Beijing, with a scaling factor of 15
map.centerAndZoom(new BMap.Point(116.32715863448607, 39.990912172420714), 15);
 
// Create callout
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

 refit () make Baidu map full of the entire window, due to the resize the list of events, the window resize will re-fill the window.

#####    2.3 updatePosition function :

```java
// Update device location
private function updatePosition(p:GeolocationInfo):void
{
// Convert to Baidu map coordinates
var point:* = new BMap.Point(p.longitude, p.latitude);
// Convert the original coordinates to Baidu coordinates, and the browser of some devices may get the Google coordinates, when the third parameter is changed to 3, which is correct.
convertor.translate([point], 1, 5, convertToBaiduCoord);
}
```

Set the position of the marker after the conversion is complete and pan the view angle to the viewport centered on the marker.

##### 2.4 convertToBaiduCoord function :

```java
// Converts the original coordinate to the Baidu coordinate
private function convertToBaiduCoord(data:*):void
{
if (data.status == 0)
{
var position:* = data.points[0];
// Set marker location
marker.setPosition(position);
 
map.panTo(position);
}
}
```

Set the position of the label after the conversion is complete and pan the view angle to the viewport centered on the label.

##### 2.5 onError function :

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
