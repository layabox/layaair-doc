#laya.device.motion詳細：ジャイロスコープと加速計

[TOC]

laya.device.motionには、開発者が使用する4つの種類があります。加速情報Accelleration Info、加速度計Accellerator、ジャイロスコープGyrocope、回転情報RotationInfoを保存します。今回はlaya.device.motion APIの関連内容を詳しく説明します。

##1、ジャイロスコープ

​`Gyroscope`通過する`change`イベントはデバイスの方向を変更して傍受します。このイベントには2つのパラメータがあります。

##を選択します。`absolute`——設備が提供する方位が設備座標システムと地球座標システムの差に基づいている場合、`true`;設備が地球座標システムを検出できない場合、`absolute`を選択します`false`。 `rotationInfo`——RotationInfoタイプ、含む`alpha`を選択します`beta`を選択します`gamma`三つの値については、以下で詳細に検討します。

​`alpha`を選択します`beta`和`gamma`属性は装置の方向を示す必要があり、その表現形式は地球に固定された座標系から装置に固定された座標系への転換である。座標系は以下の説明に従って調整しなければなりません。

地球座標系はユーザーの位置にある「東、北、上」系です。3つの軸を持ち、地上を切断して1984世界測地システムのスフィアのユーザーの位置を持っています。

-東（X）は地面にあり、北軸に垂直で、東に向かってまっすぐです。

-北（Y）は地面にあり、真北に向かって正（北極）を指します。

-上（Z）は地面に垂直で、上にまっすぐです。

一つのモバイルデバイス、例えば電話またはタブレットに対して、デバイス座標系の定義は画面の標準方向に関連している。デバイスがキーボードを回転または展開するときに画面の向きが変わると、デバイスの座標系の方向に影響を与えません。

-xは画面またはキーボードの面で、画面またはキーボードの右側が正です。

-yは画面やキーボード画面、画面やキーボードの上の方がプラスです。

-zは画面やキーボード画面に垂直になり、画面やキーボードから離れます。

回転は右手の規則を使用しなければなりません。つまり、軸の方向から時計回りに回転します。二つの係が重なり合ってから、回転には下記の規則が適用されます。



1. ####デバイス座標系z軸を軸に、回転`alpha`度を返します。`alpha`のスコープは[0,360]です。

![blob.png](img/1.png)<br/>
（図1）

2.####デバイス座標系x軸を軸に、回転`beta`度を返します。`beta`のスコープは[-180,180]です。

![blob.png](img/2.png)<br/>
（図2）

3.####デバイス座標系y軸は軸となり、回転します。`gamma`度を返します。`gamma`の作用域は[-90,90]です。

![blob.png](img/3.png)<br/>
（図3）
回転方位情報の取得について説明します。


```typescript

private var info:Text;
 
public function Gyroscope_Sample() 
{
 Laya.init(550, 400);
  
 info = new Text();
 info.fontSize = 50;
 info.color = "#FFFFFF";
 info.size(Laya.stage.width, Laya.stage.height);
 Laya.stage.addChild(info);
  
 Gyroscope.instance.on(Event.CHANGE, this, onDeviceorientation);
}
 
private function onDeviceorientation(absolute:Boolean, rotationInfo:RotationInfo):void 
{
 info.text = 
 "alpha:" + Math.floor(rotationInfo.alpha) + '\n' +
 "beta :" + Math.floor(rotationInfo.beta) + '\n' +
 "gamma:" + Math.floor(rotationInfo.gamma);
}
```




##2、加速度計

​`Accelerator`クラス定期送信装置の動きセンサ検出の活動。このデータは装置の三次元軸上の動きを表します。デバイスが移動すると、センサはこの移動を検出し、デバイスの加速座標に戻ります。静止していても、重力を含む加速座標が得られます。

​`change`イベントのコールバック関数は以下のパラメータを持っています。

##を選択します。`acceleration`——`AccelerationInfo`を選択します。地球座標系に対する宿主装置の加速情報を提供し、ジャイロスコープの章に定義された主軸座標系として表現されています。単位は`m/s^2`。 `accelerationIncludingGravity`——`AccelerationInfo`を選択します。重力の影響を排除する加速データを提供できない実現（例えば、ジャイロスコープが足りない）の代わりに、重力の影響を受ける加速データを提供することができる。これは多くの応用にとっては使いにくいが、これらの情報を提供することは、最大限の支援を提供することを意味する。この場合、`accelerationIncludingGravity`属性は宿主装置の加速情報を提供し、加速度が等しい方向と反対の反重力加速度を加えます。その表現形式は、ジャイロスコープの章に定義された主座標系です。加速情報の単位は`m/s^2`。
##を選択します。`rotationRate`——`RotationInfo`を選択します。属性は、空間での宿主装置の回転速度を提供し、その表現形式はジャイロチャプタに定義される角度変化速度であり、単位は`deg/s`。 `interval`——ハードウェアからデータを得る間隔は、単位がミリ秒です。

###2.1機器の物理方向の運動情報の取得

加速度計の軸は設備の物理的な方向です。これは設備を回転させると加速度計の軸も回転します。

以下のプレゼンテーションでは、デバイスの動き情報を取得します。


```typescript

private var info:Text;

public function Accelerator_Sample()
{
	Laya.init(Browser.width, Browser.height);
	
	info = new Text();
	info.fontSize = 50;
	info.color = "#FFFFFF";
	info.size(Laya.stage.width, Laya.stage.height);
	Laya.stage.addChild(info);
	
	Accelerator.instance.on(Event.CHANGE, this, onMotoin);
}

private function onMotoin(acceleration:AccelerationInfo, accelerationIncludingGravity:AccelerationInfo, rotationRate:RotationInfo, interval:int):void
{
	info.text = 
		'acceleration:(' + acceleration.x.toFixed(3) + ', ' + acceleration.y.toFixed(3) + ', ' + acceleration.z.toFixed(3) + ')\n' +
		'accelerationIncludingGravity:(' + accelerationIncludingGravity.x.toFixed(3) + ', ' + accelerationIncludingGravity.y.toFixed(3) + ', ' + accelerationIncludingGravity.z.toFixed(3) + ')\n' +
		'rotationRate: alpha ' + Math.floor(rotationRate.alpha) + ', beta ' + Math.floor(rotationRate.beta) + ', gamma ' + Math.floor(rotationRate.gamma) + '\n' +
		'interval: ' + interval;
}
```


### **2.2デバイスの表示方向の運動情報を取得する**

私たちは方向の運転情報を表示する必要があるかもしれません。これは設備を回転させても、加速度計軸が変わらないことを示しています。y軸がずっと垂直に保たれています。使用`Accelerator.getTransformedAcceleration()`表示方向の運転情報を取得できます。

上記のコードの`onMotion`関数で、`AccelerationInfo`先に使う`Accelerator.getTransformedAcceleration()`変換情報:


```typescript

private function onMotoin(acceleration:AccelerationInfo, accelerationIncludingGravity:AccelerationInfo, rotationRate:RotationInfo, interval:int):void
{
	acceleration = Accelerator.getTransformedAcceleration(acceleration);
  	accelerationIncludingGravity = Accelerator.getTransformedAcceleration(accelerationIncludingGravity);
  	......
}
```
