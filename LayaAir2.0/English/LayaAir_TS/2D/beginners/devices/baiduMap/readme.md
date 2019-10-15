#Use Baidu Map to Display Current Location

> This section demonstrates step by step the use of watchPosition () to mark the current location on the Baidu map. The watchPosition method is derived from the Geolocation API.**Read the Geolocation Foundation Document or the Geolocation API Document before you learn this section.**
>

Before we start, we need to introduce the script file of Baidu Map in index. html, which is available free of charge on Baidu Map's official website. The URL used in the demonstration is[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **First, introduce the member variables:**


```java

// 百度地图的API
private map;                              // 地图引用
private marker;                           // 地图标注物
private BMap = Laya.Browser.window.BMap;       // 百度地图命名空间
private convertor = new this.BMap.Convertor(); // 坐标转换接口
 
private mapDiv; // 包含百度地图的div容器
```


###Second, the constructor follows:


```typescript

class WatchPosition {
    constructor() {
        Laya.init(1, 1);

        this.init();

        // 使用高精度位置
        Laya.Geolocation.enableHighAccuracy = true;
        Laya.Geolocation.watchPosition(Laya.Handler.create(this, this.updatePosition), Laya.Handler.create(this, this.onError));

        // 绑定convertToBaiduCoord作用域
        this.convertToBaiduCoord = this.convertToBaiduCoord.bind(this);
    }
}
new WatchPosition();
```


Since the LayaAir display element is not required in this example, the stage size is set to 1. The initialization of Baidu map interface is put in init (). Then it monitors the location of the device. Finally, it should be noted that the function convertToBaiduCoord () converts the obtained coordinates to Baidu map coordinates. Since it is a parameter of convertor. translate (), the trigger scope will be changed, so the scope of the function is bound here.

#####2.1 init function:


```typescript

private  init(): void {
  this.mapDiv = Laya.Browser.createElement("div");
  Laya.Browser.document.body.appendChild(this.mapDiv);

  // 适应窗口尺寸
  this.refit();
  Laya.stage.on(Laya.Event.RESIZE, this, this.refit);

  // 初始化地图
  this.map = new this.BMap.Map(this.mapDiv);

  // 禁用部分交互
  //this.map.disableDragging();
  this.map.disableKeyboard();
  this.map.disableScrollWheelZoom();
  this.map.disableDoubleClickZoom();
  this.map.disablePinchToZoom();
  // 初始地点北京，缩放系数15
  this.map.centerAndZoom(new this.BMap.Point(116.32715863448607, 39.990912172420714), 15);

  // 创建标注物
  this.marker = new this.BMap.Marker(new this.BMap.Point(0, 0));
  this.map.addOverlay(this.marker);
}
```


Init () function initializes Baidu map. Turn off most of the interaction, leaving only the drag map. The map was originally located in Beijing with a zoom factor of 15. And a map annotation was added.

#####2.2 refit function:


```typescript

private  refit(): void {
  this.mapDiv.style.width  =  Laya.Browser.width  / Laya. Browser.pixelRatio  +  "px";
  this.mapDiv.style.height  = Laya. Browser.height  / Laya. Browser.pixelRatio  +  "px";
}
```


Refit () fills the whole window with Baidu Map. Because of listening to resize events, the window will be refilled when resize.

#####2.3 updatePosition function:


```typescript

// 更新设备位置
private  updatePosition(p: Laya.GeolocationInfo): void {
  // 转换为百度地图坐标
  var  point:any = new this.BMap.Point(p.longitude,  p.latitude);
  // 把原始坐标转换为百度坐标，部分设备的浏览器可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
  this.convertor.translate([point],  1,  5,  this.convertToBaiduCoord);
}
```


UpdatePosition () is the trigger function of Geolocation. watchPosition (). After each change of position is monitored, the original coordinates acquired need to be converted to Baidu coordinates in order to display the correct position on Baidu map.

Note that some device browsers may get Google coordinates, when convertor. translate's third parameter is not 5, but 3.

#####2.4 ConvertToBaiduCoord function:


```typescript

// 将原始坐标转换为百度坐标
private  convertToBaiduCoord(data: any): void {
  if  (data.status  ==  0) {
    var  position: any  =  data.points[0];
    // 设置标注物位置
    this.marker.setPosition(position);

    this.map.panTo(position);
  }
}
```


After the conversion is completed, the position of the tag is set, and the view angle is shifted to the tag-centered view.

#####2.5 onError function:


```java

private onError(e: any): void {
        var errType: string;
        if (e.code = Laya.Geolocation.PERMISSION_DENIED)
            errType = "Permission Denied";
        else if (e.code == Laya.Geolocation.POSITION_UNAVAILABLE)
            errType = "Position Unavailable";
        else if (e.code == Laya.Geolocation.TIMEOUT)
            errType = "Time Out";
        alert('ERROR(' + errType + '): ' + e.message);
    }
```


After completing the above steps, you can view the effect in the browser on the device. If the position is wrong, try using the coordinates you get as Google coordinates. Note that browser security restrictions may require users to manually allow web pages to use geographic location, or Chrome needs the address of the HTTPS protocol to use geographic location.