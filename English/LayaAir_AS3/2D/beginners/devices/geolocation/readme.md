# Using Geolocation to get geographic location information
[TOC]

## Location

If the device supports Geolocation and is supported by the browser, you can use Geolocation to get the current geographic location of the device. You can open the web page [http://caniuse.com/#search=geolocation](http://caniuse.com/#search=geolocation)Geolocation. Display and Indicates support.

![1](img/1.png)

​	Geolocation Returns GeolocationInfo, which contains the following information:

- `latitude` —— Latitude - value (in degree).
- `longitude` —— Longitude - value (in degrees).
- `altitude` —— Relative to sea level altitude (m). If the device does not provide elevation data, the value of `altitude` is null.
- `accuracy` —— Returns the precision of latitude and longitude in meters.
- `altitudeAccuracy` ——  Returns the precision of the altitude, in meters. `altitudeAccuracy` may be `null`。
- `heading` —— Heading - returns the moving direction (angle) of the device, indicating the distance from the north. 0 degrees from north point reference, and clockwise in rotation direction (this means that the East is 90 degrees, west is 270 degrees). If `speed`is 0，`heading` will be`NaN`. If the device cannot provide `heading` information, the value is `null`。
- `speed` —— Returns the device speed movement  per second (m). `speed` may be `null`。
- `timestamp` —— time stamp for getting information feedback.

​	Geolocation  static attribute value contains the following general settings:

- `enableHighAccuracy` —— A Boolean value ,if set to true, device can provide a more precise location, as much as possible.  Note that you may cause longer response times and greater power consumption (such as opening the GPS of your mobile device).
- `timeout` —— the positive integer, which represents the maximum time (milliseconds) limit for the return position. The default value is `Infinity`, which means that `getCurrentPosition()` will not return until the location is available.

- `maximumAge` —— 32 bit positive integers represent the maximum lifetime of the available cache locations that can be returned. If set to 0, it means that the device does not use the cache location and always tries to get the real-time location. If set to `Infinity`, the device must return to the cache location regardless of its lifetime. Default: 0.

### 1. get the current location

Use the static method `Geolocation.getCurrentPosition()` to get the current location, and `getCurrentPosition()`  fires only once.

```java
// Try to get the current location
Geolocation.getCurrentPosition(
				Handler.create(this, onSuccess), 
				Handler.create(this, onError)
);

// Triggered after successful acquisition of location
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

// Failed to get the location failed
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

The above example code demonstrates using `getCurrentPosition()` to obtain the current location information, print the location information when successful, print error information and cause of error when it fails.

### 2. monitor location changes

​	In addition to getting the current location, you can also monitor changes in location. Use `Geolocation.watchPosition()`location change, which returns a monitor ID value. you can use the `Geolocation.clearWatch()` to cancel the position listener registered by `watchPosition()`, and pass in the ID value to cancel the location listener registered.

```typescript
// Geolocation.watchPosition function signature
Geolocation.watchPosition(
	Handler.create(this, updatePosition),
	Handler.create(this, onError));
function updatePosition(info:GeolocationInfo):void { }
function onError(err:Error):void { }
```

​	`watchPosition()`  has the same function signature as `getCurrentPosition()` For more information on `watchPosition()` functionalities, you can view the document "using Baidu maps to display current location"
