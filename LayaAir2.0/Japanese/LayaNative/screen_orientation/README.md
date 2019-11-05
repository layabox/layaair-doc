#縦横スクリーンの設定

##一、プロジェクト構築前の縦横画面の設定

###1.index.jsまたはruntime.jsonに設定する

*index.js

index.jsを使ってスクリーンの方向を設定すれば、screenOrientationの値を変更すればいいです。


```javascript

window.screenOrientation = "sensor_landscape";
```


設定可能なパラメータは以下の通りです。

|取値𞓜画面方向𞓜
|:--：|：
𞓜ladscap𞓜の横画面
|ポルトガルit縦画面
|sensor landscapeまたはsensorLandscpe横画面（両方に向けて）124;
ハンセントラーまたはsensorPortrat縦スクリーン（両方に向けて）

*runtime.json

runtime.jsonを使ってスクリーンの方向を設定すれば、screenOrientationの値を変更すればいいです。


```json

"screenOrientation":"sensor_landscape"
```


screenOrientationの評価はindex.jsのwindow.screenOrientationと同じです。

##二、プロジェクト構築後のワイドスクリーンの設定

###1.iOS

iOSプロジェクトの構築に成功したら、レスポンス/config.iniファイルを開いて、修正する。`orientation=16`の値は、下図のようになります。

![图1](img/1.png)

パラメータの意味は以下の通りです。

```

orientation=2   //竖屏：IOS home键在下   
orientation=4   //竖屏：IOS home键在上   
orientation=8   //横屏：IOS home键在左   
orientation=16  //横屏：IOS home键在右   
```

orentationの値は使えます。`按位或`のように設定します。例えば、

```

orientation=6   //代表竖屏可以任意旋转  
orientation=24  //代表横屏可以任意旋转  
```


**注意:**iOSプロジェクト内の縦横スクリーンの設定は、config.iniの設定と一致することが望ましい。設定が一致しないと未知の場合があります。設定は下の図のようです

![图](img/2.png)

###2.android

Android Manifest.xmlファイルを開いて、Androidプロジェクトの構築に成功しました。activityタグの中にscreenOrientationパラメータがあります。開発者は自分のニーズに応じて修正できます。下図のように。
![图2](img/3.jpg)

設定可能なパラメータはandroidの標準であり、これには過多な説明は行われません。以下の通りです。


```

"landscape","portrait","full_sensor","sensor_landscape","sensor_portrait","reverse_landscape","reverse_portrait"
```


##三、実行順

アプリケーションは、起動時にiOSのconfig.iniに設定されている画面の方向またはandroidのAndroid Manifest.xmlに設定されている画面の方向を先に読み取ります。index.jsまたはruntime.jsonに解析した場合、スクリーンの縦横スクリーンの設定値を読み出して、スクリーンの方向を再設定します。

例えば、AndroidのAndroid Manifest.xmlはポータブルに設定されています。index.jsのタグはlandscapeに設定されています。運転中にAndroid設備の上で画面が回転して、縦画面から横画面に回転しています。

**Tips：開発者は二つの値を同じに設定することを提案します。このようにプログラムが実行中に画面が回転する現象が発生しないようにします。**