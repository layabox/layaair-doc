#その他の説明

##1.第三者の地図について

LayaNativeの下部にはオプンGreESを使ってレンダリングが施されています。androidのGLOSurfaceViewコントロールとiOSのGLOKViewコントロールを使っていますので、Baiduの地図のような第三者地図はサポートできません。

##2.ファイルフォーマットについて

**項目中のテキストフォーマットファイル（例えば、ini、xml、）、json、jsなど）は、すべてutf 8符号化フォーマットである必要があります。iOSデバイスは、非utf 8フォーマット符号化されたファイルをサポートしていません。**

##3.debugモードとreleaseモード

LayaNative最下層のLOGは三つに分けられています。


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
*1、conchはLayaNative環境でしか呼び出しできません。ウェブページのバージョンにはconchの定義がないので、存在するかどうか判断する必要があります。*
*2、as言語を使って開発する場合は、Browser.window[conch]という方式でconchオブジェクトを獲得することができます。*

##4.iOS接続のWeChatについて

iOSプラットフォームの下でWeChat SDKとドッキングします。WeChat 1.77バージョン以降は-Objcのパラメータを追加する必要があります。WeChatの公式文書ではデフォルトで追加させます。`-Objc -all_load`ただし、これはコンパイルエラーを引き起こすことがあります。
この場合はパラメータを変更できます。`-Objc -force_load libWeChatSDK.a`を選択し、配置後、図1に示すように、

![1](img/1.png)

##5.iOSシミュレータについて

LayaNativeはiOSシミュレータをサポートしていますが、シミュレータの動作効率が低いため、開発者にiOSの実機を使ってデバッグすることを提案しています。

##6.各種情報の取得

|関数名|関数は、124;の戻り値説明124;備考|を示しています。
|--------------------------------------------------------------------------------------------|
|get TotalMem（）|取得運転設備総メモリ124;単位はKB 124; 124;
|getUsedMem()124;は、現在のアプリケーションによって占有されているメモリの単位がKB 124であるため、戻り値があまり正確ではないが、参照としても良い。
|getAvalidMem()|取得可能なメモリ単位はKB|戻り値があまり正確ではないが、参照としては良い。
|get NetworkType（）は、ネットワーク状態を取得してint値に戻り、NET NO=0;NET WIFI=1;NET_2G=2;NET_3G=3;NET_4G=4;NETUUNKNOWN=5||
|getRuntimeVersion()Runtimeのバージョンの戻り値を取得する文字列は、ios-conch 5-0.9.2、android-conch 5-0.9||のような文字列です。
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
*1、conchはLayaNative環境でしか呼び出しできません。ウェブページのバージョンにはconchの定義がないので、存在するかどうか判断する必要があります。*
*2、as言語を使って開発する場合は、Browser.window[conch]という方式でconchオブジェクトを獲得することができます。*

##7.屏蔽内容中のエラーボックス

プロジェクトの運行中に時々エラーのヒントが出ます。これらのヒントはプロジェクトのコードが間違っています。私達の提案はこれらの間違いを解決することです。もし本当に解決できないなら、また遮断します。エラーコードは以下の通りです。


```java

window.showAlertOnJsException(false);
```


##8.エンジン初期化またはスクリプトのローディング中の異常処理
LayaNative 2.0のバージョンでは、エンジンが初期化され、起動スクリプトがロードされるとき、異常が発生すると、エンジンは自動的にwindow.onLayaInitErr関数に呼び出されます。この関数はデフォルトではconfig.jsで定義されています。コードは以下の通りです。

```javascript

window.onLayaInitError=function(e)
{
	console.log("onLayaInitError error=" + e);
	alert("加载游戏失败，可能由于您的网络不稳定，请退出重进");
}
```

開発者は自分の要求に応じて、エラーメッセージとエラーメッセージの訂正を行うことができます。

##9.取得機器型式
LayaNative 2.0では、iOSは、conch.co nfig.get DeviceInfo（）を呼び出してデバイスの型番を取得することができる。iPhone Xに使えるヘッドコードは以下の通りです。

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
