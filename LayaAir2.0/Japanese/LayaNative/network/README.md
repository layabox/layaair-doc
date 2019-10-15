#ネットワーク状態監査について
モバイルデバイスのネットワーク環境が不安定なので、ネットワークが変化すると、プロジェクトの中でよくユーザーにヒントを与える必要があります。LayaNativeには二つの方法があり、ネットワーク環境の変化が得られます。

##1.傍受方式

開発者は登録された傍受関数を使ってネットワークの変化をモニターすることができます。コードは以下の通りです。

JSコードは以下の通りです

```javascript

if( conch )
{
    conch.setNetworkEvtFunction(function(type)
    {
	    alert(type)
    });
}
```

ASコードは以下の通りです

```javascript

if ( Render.isConchApp)
{
    Browser.window["conch"].setNetworkEvtFunction(function(type):void
    {
        alert(type)
    });
}
```


**戻り値クラスはintタイプです。**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_YES = 5;
```

**Tips**  
*1、conchはLayaNative環境でしか呼び出しができません。ウェブページのバージョンにはconchの定義がないので、存在するかどうかを判断する必要があります。＊
*2、as言語を使って開発する場合は、Browser.window['conch']という方式でconchオブジェクトを獲得することができます。＊
＊3、またはif（Render.isConchApp）を使って判断しても良いです。＊

##2.照会方法

開発者はまた、ネットワークの状態をアクティブに調べることができます。コードは以下の通りです。


```javascript

if( conch )
{
    var nType = conch.config.getNetworkType();
}
```


**戻り値クラスはintタイプです。**

```

NET_NO = 0;
NET_WIFI = 1;
NET_2G = 2;
NET_3G = 3;
NET_4G = 4;
NET_YES = 5;
```




