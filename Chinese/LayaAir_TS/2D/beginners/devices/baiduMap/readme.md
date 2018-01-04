# 使用百度地图显示当前位置

> 本节一步步演示使用watchPosition()在百度地图上标注出当前所在位置。watchPosition方法来自于Geolocation API，**学习本节前请先阅读Geolocation基础文档或Geolocation API文档。**
>

在开始之前需要在index.html中引入百度地图的脚本文件，这个url在百度地图的官方网站可以免费获取到。演示中使用的url是[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **一、首先介绍成员变量：**

```java
// 百度地图的API
private map;                              // 地图引用
private marker;                           // 地图标注物
private BMap = Laya.Browser.window.BMap;       // 百度地图命名空间
private convertor = new this.BMap.Convertor(); // 坐标转换接口
 
private mapDiv; // 包含百度地图的div容器
```

### 二、接着是构造函数：

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

​    由于本例不需要使用LayaAir的显示元素，因此舞台尺寸设置为1。百度地图界面的初始化放在init()中。然后是监听设备位置的变化。最后需要注意，函数convertToBaiduCoord()是将获取到的坐标转换至百度地图坐标，由于它是作为convertor.translate()的参数，所以触发时作用域会被改变，因此在这里绑定了该函数的作用域。

##### 2.1 init函数：

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

 init()函数初始化百度地图。关闭了大部分交互功能，只留下拖动地图。地图初始地点位于北京，缩放系数15。并且添加了一个地图标注物。

##### 2.2 refit函数：

```typescript
private  refit(): void {
  this.mapDiv.style.width  =  Laya.Browser.width  / Laya. Browser.pixelRatio  +  "px";
  this.mapDiv.style.height  = Laya. Browser.height  / Laya. Browser.pixelRatio  +  "px";
}
```

refit()使百度地图充满整个窗口，由于侦听了resize事件，在窗口resize时也会重新填充窗口。

#####    2.3 updatePosition函数：

```typescript
// 更新设备位置
private  updatePosition(p: Laya.GeolocationInfo): void {
  // 转换为百度地图坐标
  var  point:any = new this.BMap.Point(p.longitude,  p.latitude);
  // 把原始坐标转换为百度坐标，部分设备的浏览器可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
  this.convertor.translate([point],  1,  5,  this.convertToBaiduCoord);
}
```

  updatePosition()是Geolocation.watchPosition()的触发函数，在每次监测到位置改变后都需要把获取到的原始坐标转换到百度坐标，才能在百度地图上显示正确的位置。

注意有的设备浏览器获取到的坐标可能是谷歌坐标，这时convertor.translate的第三个参数就不是5，而是3。

##### 2.4 convertToBaiduCoord函数：

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

在转换完成后设置标注物的位置，并且把视角平移到以标注物为中心的视口中。

##### 2.5 onError函数：

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

 完成以上步骤之后就可以在设备上的浏览器查看效果。如果位置错误，把获取到的坐标当成谷歌坐标试试。注意浏览器本身的安全限制可能需要用户手动允许网页使用地理位置，或者Chrome需要https协议的地址才能够使用地理位置。