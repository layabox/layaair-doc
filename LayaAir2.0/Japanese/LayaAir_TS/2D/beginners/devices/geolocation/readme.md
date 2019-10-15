#Geolocationで地理位置情報を取得する
[TOC]

##地理的位置

デバイスがGeolocationをサポートし、使用しているブラウザがサポートしているなら、デバイスの現在の地理的位置をGeolocationを使用して取得することができる。ホームページを開くことができます[http://caniuse.com/](http://caniuse.com/#search=geolocation)#[search=geolocation](http://caniuse.com/#search=geolocation)どのブラウザのバージョンがGeolocationをサポートしているかを確認します。Supportedを表示してサポートします。

![1](img/1.png)

Geolocationは、以下の情報を含むGeolocation Infoを返します。

##を選択します。`latitude`——次元。 `longitude` —— 经度（度）。

##を選択します。`altitude`——海面に対する標高（メートル）。設備が海抜データを提供しない場合、`altitude`の値はnullです。 `accuracy`——経緯度の精度を返し、米単位で。
##を選択します。`altitudeAccuracy`——海抜の精度を返します。メートル単位です。`altitudeAccuracy`可能性があります`null`。 `heading`——設備の移動方向（角度）を返し、北からの角度を示します。0度は正の北を指し、方向は時計回りに回転します。（東洋は90度、西洋は270度）。もし`speed`はい、0です`heading`はい、そうです`NaN`。デバイスが提供できない場合`heading`情報、値は`null`。
##を選択します。`speed`——設備の毎秒の移動速度（メートル）を返します。`speed`可能性があります`null`。 `timestamp`——情報のタイムスタンプを取得します。

Geolocation静的属性値は以下の汎用設定を含む。

##を選択します。`enableHighAccuracy`——ブール値は、trueとして設定され、デバイスがより正確な位置を提供することができるなら、できるだけ最適な結果を得るために適用されます。なお、モバイルデバイスのGPSがオンされているような、より長い応答時間と電力消費量が生じる可能性がある。 `timeout`——正の整数は、戻り位置の最大時間（ミリ秒）制限を表します。デフォルトの値は`Infinity`という意味です`getCurrentPosition()`場所が利用可能な時に戻ります。
を選択します。`maximumAge`——32ビット正の整数は、戻り可能なキャッシュ位置の最大寿命を表します。0に設定すると、バッファ位置を使用しないことを意味し、常にリアルタイム位置の取得を試みる。設定が`Infinity`デバイスはキャッシュ位置に戻り、その寿命に関係なく。デフォルトの値:0。

###1、現在の位置決めを取得する

静的な方法を使う`Geolocation.getCurrentPosition()`現在の位置を取得します。`getCurrentPosition()`一度だけトリガします。


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


以上のコードのデモを使用しました。`getCurrentPosition()`現在の位置情報を取得し、成功したら地理位置情報を印刷し、失敗したらエラー情報とエラー原因を印刷します。

###2、監視位置の変更

現在位置の取得に加えて、位置の変更を監視することができます。使用`Geolocation.watchPosition()`位置変更を監視します。この関数はモニタID値を返します。`Geolocation.clearWatch()`このID値が入ってきてキャンセルします。`watchPosition()`登録された位置モニター。


```typescript

// Geolocation.watchPosition函数签名
Geolocation.watchPosition(
	Handler.create(this, updatePosition),
	Handler.create(this, onError));
function updatePosition(info:GeolocationInfo):void { }
function onError(err:Error):void { }
```


​`watchPosition()`和を有する`getCurrentPosition()`同じ関数で署名します。詳細について`watchPosition()`のアプリケーションは、ドキュメントを見ることができます。