# 其他说明

##1.第三者の地図について

LayaPlayerの下側のレンダリングはopenGLOESを使ってレンダリングされ、androidのGLOSurfaceViewコントロールとiOSのGLOKViewコントロールを使っていますので、Baiduの地図のような第三者マップはサポートできません。

##2.ファイルフォーマットについて

**項目中のテキストフォーマットファイル（例えば、ini、xml、）、json、jsなど）は、すべてutf 8符号化フォーマットである必要があります。iOSデバイスは、非utf 8フォーマット符号化されたファイルをサポートしていません。**

##3.debugモードとreleaseモード

LayaPlayer最下階のLOGは3種類に分けられています。


```java

LOGI 普通流程log
LOGW 警告log
LOGE 错误log
```


jsスクリプトでは、開発者は以下の関数でDebugモードを設定できます。


```javascript

if( window.conch )
{
    //值为1：表示所有LOGE全部弹出alert
    //值为2：表示所有LOGE和LOGW全部弹出alert
    window.conch.config.setDebugLevel(1);
}
```


**Tips**
*1、conchはLayaPlayerの環境下でしか呼び出しできません。ウェブページのバージョンにはconchの定義がありませんので、存在するかどうかを判断する必要があります。*
*2、as言語を使って開発する場合は、Browser.window[conch]という方式でconchオブジェクトを獲得することができます。*

##4.iOS接続のWeChatについて

iOSプラットフォームの下でWeChat SDKとドッキングします。WeChat 1.77バージョン以降は-Objcのパラメータを追加する必要があります。WeChatの公式文書ではデフォルトで追加させます。`-Objc -all_load`ただし、これはコンパイルエラーを引き起こすことがあります。
この場合はパラメータを変更できます。`-Objc -force_load libWeChatSDK.a`を選択し、配置後、図1に示すように、

![1](img/1.png)

##5.iOSシミュレータについて

LayaPlayerは0.9.5以降のバージョンで、iOSシミュレータの動作をサポートし、プロジェクトを構築した後、シミュレータを選択して実行できます。

**Tips：LayaPlayerはiOSシミュレータをサポートしていますが、運転効率が低いので、開発者にiOSの実機を使ってデバッグすることを提案しています。**

##6.各種情報の取得

|関数名|関数は、124;の戻り値説明124;備考|を示しています。
|--------------------------------------------------------------------------------------------|
|get TotalMem（）|取得運転設備総メモリ124;単位はKB 124; 124;
|getUsedMem()124;は、現在のアプリケーションによって占有されているメモリの単位がKB 124であるため、戻り値があまり正確ではないが、参照としても良い。
|getAvalidMem()|取得可能なメモリ単位はKB|戻り値があまり正確ではないが、参照としては良い。
|get NetworkType（）は、ネットワーク状態を取得してint値に戻り、NET NO=0;NET WIFI=1;NET_2G=2;NET_3G=3;NET_4G=4;NETUUNKNOWN=5||
|getRuntimeVersion()yaPlayerのバージョンの戻り値を獲得した文字列は、ios-conch 5-0.9.2、android-conch 5-0.9||のような文字列です。
|getOS()|が現在のシステムの戻り値を取得すると、「Conch-inos」「Conch-android」の文字列124; 124;
|getApple Version()はiOS-Appのバージョン番号を取得し、文字列1.1|iOS-apのバージョン番号を返します。このバージョン番号によって、APPの更新のヒントができます。𞓜
|getApple Local Version()|はiOS-AppのLocalバージョン番号を取得し、文字列1.2|iOS-apのバージョン番号を返します。このバージョン番号によって、APPの更新案内ができます。𞓜

これらの関数はすべてconch.co nfigクラスの関数に属しています。


```javascript

if( window.conch )
{
    window.conch.config.getRuntimeVersion();
}
```


**Tips**
*1、conchはLayaPlayerの環境下でしか呼び出しできません。ウェブページのバージョンにはconchの定義がありませんので、存在するかどうかを判断する必要があります。*
*2、as言語を使って開発する場合は、Browser.window[conch]という方式でconchオブジェクトを獲得することができます。*

##7.AsistantTouch

LayaPlayerエンジンには、次の図のようにAsistantTouchが埋め込まれています。

![2](img/2.png)</br>


開発者は以下の関数で表示と非表示ができます。


```javascript

if( window.conch )
{
    window.conch.showAssistantTouch(false);
}
```

**Tips:**
*1、AsitantTouchがもっと早く消えたら、config.jsで設定できます。*
*2、LayaPlayer-00.5.5以前のバージョンでは、デフォルトでは開いています。0.9.5以降のバージョンは、デフォルトではクローズされています。*

##8.Local Strageについて

LayaNativeはLocal Strageの使用をサポートしていますが、フォーマット上の要求があります。getItem（）、setItem（）を使用して保存し、値を取る必要があります。

###ASの下の用法


```java

//存储指定键名和键值，字符串类型。
LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
LocalStorage.getItem("LayaBox");
```




###JSとTSの使い方


```java

//存储指定键名和键值，字符串类型。
Laya.LocalStorage.setItem("LayaBox","H5引擎！");
//获取指定键名的值。
Laya.LocalStorage.getItem("LayaBox");
```




###間違った使い方:

以下のjs文法の使い方はPC端末のブラウザやモバイル端末（ブラウザ裸走）でサポートしていますが、LayaNativeではサポートされていません。


```java

//存储，LayaNative下不支持
localStorage.test = 100;
//取值，LayaNative下不支持
alert(localStorage.test);
```




##9.屏蔽内容中のエラーボックス

プロジェクトの運行中に時々エラーのヒントが出ます。これらのヒントはプロジェクトのコードが間違っています。私達の提案はこれらの間違いを解決することです。もし本当に解決できないなら、また遮断します。エラーコードは以下の通りです。


```java

window.showAlertOnJsException(false);
```


##10.スローモード設定（30フレーム）
LayaPlayerではFPSはデフォルトでは60ですが、リアルタイム性に対する要求が多くないゲームに対しては30フレームまで更新すればいいです。この場合は以下の関数で設定できます。

```javascript

conch.config.setSlowFrame(true);
```

**Tips**  
**1、conch.co nfigはLayaPlayerの環境でしか呼び出しできません。ウェブページのバージョンにはconchの定義がありませんので、存在するかどうかを判断する必要があります。**  
**2、as言語を使って開発する場合は、Browser.window[conch]という方式でconchオブジェクトを獲得することができます。**

LayaNative-09.13とLayaAir-1.7.14以降のLayaNativeとLayaAirブラウザバージョンの書き方が統一されました。今後は下記の書き方を使うようにします。

```javascript

Laya.stage.frameRate = "slow";//"fast" "slow" "mouse" "sleep"
```


##11.androidの後退ボタンを引き継ぐ
（LayaNativeバージョン>=0.9.8）
以前のバージョンのLayaNativeは、後退キーに対して2回連続して後退ボタンを押してAppを終了します。0.9.8以降、LayaNativeは2つの関数conch.set OnBackPresedFunctionとconch.exitを導入し、スクリプトでバックホールキーの処理を受けることができます。インターフェースの定義:


```javascript

interface conch {
    ...
    setOnBackPressedFunction(onBack:()=>void);
    exit():void;
    ...
}
```


*set OnBackPresedFunction(f)*
fは、ユーザが後退キーを押すと実行される関数である。
この関数を呼出したら、2回の機能を遮断します。この場合、アプリケーションを終了するには、exit()関数を呼び出すしかないです。

*exit()*
この関数を呼び出して直接Appを終了します。

*注意*
この二つの関数はAndroid版だけです。

jsの例：

```javascript

var n=3;
if(window.conch && window.conch.setOnBackPressedFunction){
    window.conch.setOnBackPressedFunction(()=>{
        console.log('press back '+n);
        if(n-- <=0){
            window.conch.exit();
        }
    });
}
```

##12.エンジン初期化またはスクリプトのローディング中の異常処理
LayaPlayer-09.11バージョン以降、エンジンが初期化され、起動スクリプトがロードされると、異常が発生すると、エンジンは自動的にwindow.onLayaInitErr関数に呼び出されます。この関数はデフォルトではconfig.jsで定義されています。コードは以下の通りです。

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

開発者は自分の要求に応じて、エラーメッセージとエラーメッセージの訂正を行うことができます。

##13.取得機器型式
LayaPlayer-00.92以降、iOSはconch.co.fig.get DeviceInfo（）を呼び出してデバイスの型番を取得することができます。iPhone Xに適応できるコードは以下の通りです。

```javascript

if( window.conch )
{
    var devInfo = JSON.parse(window.conch.config.getDeviceInfo());

    if (devInfo.devicename === 'iPhone10,3' || devInfo.devicename === 'iPhone10,6')
    {
        // iPhone X适配
    }
}
```
