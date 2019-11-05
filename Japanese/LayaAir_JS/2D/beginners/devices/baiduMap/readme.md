#Baiduの地図を使って現在の位置を表示します。

>今回は一歩一歩、Watch Positionを使ってBaiduの地図に現在位置を表示するデモを行います。watch Position方法は、Geolocation APIから来ています。**本節を学ぶ前にまずGeolocationの基礎文書またはGeolocation API文書を読んでください。**
>

開始前にindex.にBaiduの地図のスクリプトファイルを導入する必要があります。このurlはBaiduの地図の公式サイトで無料で入手できます。プレゼンテーションで使うurlは[http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6](http://api.map.baidu.com/api?v=2.0&ak=LIhOlvWfdiPYMCsK5wsqlFQD8wW4Bfy6)

### **一、まずメンバー変数を紹介します。**


```java

// 百度地图的API
var map;                              // 地图引用
var marker;                           // 地图标注物
var BMap = Laya.Browser.window.BMap;       // 百度地图命名空间
var convertor = new BMap.Convertor(); // 坐标转换接口
 
var mapDiv; // 包含百度地图的div容器
```


###二、次にコンストラクタです。


```java

Laya.init(1, 1);

// 使用高精度位置
Laya.Geolocation.enableHighAccuracy = true;
Laya.Geolocation.watchPosition(Laya.Handler.create(this, updatePosition), Laya.Handler.create(this, onError));

// 绑定作用域
convertToBaiduCoord = convertToBaiduCoord.bind(this);
```


本例ではLayaAirの表示要素は不要であるため、ステージサイズは1に設定されている。Baiduの地図画面の初期化はinit（）にある。そしてデバイスの位置の変化を傍受します。最後に、関数convert ToBaidu Coord（）は、取得した座標をBaiduの地図座標に変換するものであり、これはconvertor.translate（）のパラメータであるため、トリガ時に作用領域が変更され、ここでこの関数の作用領域が結合されている。

#####2.1 init関数：


```java

function init() {
    mapDiv = Laya.Browser.createElement("div");
    Laya.Browser.document.body.appendChild(mapDiv);

    // 适应窗口尺寸
    refit();
    Laya.stage.on(Laya.Event.RESIZE, this, refit);

    // 初始化地图
    map = new BMap.Map(mapDiv);

    // 禁用部分交互
    //map.disableDragging();
    map.disableKeyboard();
    map.disableScrollWheelZoom();
    map.disableDoubleClickZoom();
    map.disablePinchToZoom();
    // 初始地点北京，缩放系数15
    map.centerAndZoom(new BMap.Point(116.32715863448607, 39.990912172420714), 15);

    // 创建标注物
    marker = new BMap.Marker(new BMap.Point(0, 0));
    map.addOverlay(marker);
}
```


init関数はBaiduの地図を初期化します。ほとんどのインタラクティブ機能をオフにして、地図をドラッグするだけです。地図の初期地点は北京にあり、スケーリング係数は15。そして地図の表示物を追加しました。

#####2.2 refit関数：


```java

function  refit() {
    mapDiv.style.width  =  Laya.Browser.width  /  Laya.Browser.pixelRatio  +  "px";
    mapDiv.style.height  =  Laya.Browser.height  /  Laya.Browser.pixelRatio  +  "px";
}
```


refitはBaiduの地図をウィンドウ全体に充満させ、reizeのイベントを聞いたため、ウィンドウのreizeにもウィンドウを塗りつぶします。

#####2.3 udatePosition関数：


```java

// 更新设备位置
function  updatePosition(p) {
    // 转换为百度地图坐标
    var  point  =  new  BMap.Point(p.longitude,  p.latitude);
    // 把原始坐标转换为百度坐标，部分设备的浏览器可能获取到的是谷歌坐标，这时第三个参数改为3才是正确的。
    convertor.translate([point],  1,  5,  convertToBaiduCoord);
}
```


udatePositionはGeolocation.watPositionのトリガ関数であり、位置が変わるたびに取得した元の座標をBaiduの座標に変換する必要があります。Baiduの地図で正しい位置を表示することができます。

注意あるデバイスブラウザで取得した座標はGoogle座標かもしれません。この場合、convertor.translateの3番目のパラメータは5ではなく、3です。

#####2.4 convert ToBaidu Coord関数：


```java

// 将原始坐标转换为百度坐标
function  convertToBaiduCoord(data) {
    if  (data.status  ==  0) {
        var  position  =  data.points[0];
        // 设置标注物位置
        marker.setPosition(position);

        map.panTo(position);
    }
}
```


変換が完了したら表示物の位置を設定し、表示物を中心とする視角に画角を平行に移動します。

#####2.5オンError関数:


```java

function  onError(e) {
    var  errType;
    if  (e.code  =  Laya.Geolocation.PERMISSION_DENIED)
        errType  =  "Permission Denied";
    else  if  (e.code  ==  Laya.Geolocation.POSITION_UNAVAILABLE)
        errType  =  "Position Unavailable";
    else  if  (e.code  ==  Laya.Geolocation.TIMEOUT)
        errType  =  "Time Out";
    alert('ERROR('  +  errType  +  '): '  +  e.message);
}
```


上記の手順が完了したら、デバイス上のブラウザで効果を確認できます。位置が間違っていたら、取得した座標をGoogle座標として使ってみてください。ブラウザ自体のセキュリティ制限は、ユーザが手動でウェブページの地理的位置を使用できるようにする必要があります。またはChromeはhttpsプロトコルのアドレスを必要として、地理的位置を使用することができます。