#android-APK更新

LayaPlayer-00.97以降のバージョンでは、Androidテンプレートプロジェクトにおいて、appkの自動更新コードが開放されています。開発者はプロジェクトの要求に応じて自らコードを修正したり、コードを閉じたり削除したりすることができます。

**TIPS：この文書を読むには、androidの基本的な開発知識が必要です。**

##1、コード紹介

1、自動更新されたコードパスは`src\main\java\layaair\autoupdateversion`このディレクトリはappkの自動更新コードです。下図1に示すように、
![图1](img/1.jpg)   


2、MainActivity.javaのonCreate関数は、まずcheckUpdateを呼び出します。更新または更新が完了していない場合は、initEngine関数に戻します。開発者がappdate機能を望まない場合は、この関数を削除し、直接init Entineを呼び出してもいいです。


```java

protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        /*
         * 如果不想使用更新流程，可以屏蔽checkApkUpdate函数，直接打开initEngine函数
         */
        checkApkUpdate(this);
        //initEngine();
    }
```


##2、アプリ更新の流れ

更新コードの流れは以下の通りです。
1、プログラムが起動したらまずconfig.iniを読んでから読みます。`IsHandleUpdateAPK`この変数は、値が0なら、自分で処理しない更新プロセスを表して、直接ゲームを起動します。値が1であれば、checkUpdateの流れを継続します。
2、引き続きconfig.iniを読み、読みます。`ApkUpdateUrl`これはxmlファイルで、このxmlファイルには最新バージョン番号と最新バージョンのappkの住所が記録されています。
3、ローカルアプリのバージョン番号がオンラインのバージョン番号より小さい場合、最新バージョンを更新するかどうかを提示し、ユーザーは正しいかどうかを選択することができる。
4、「はい」を選択すると、プログラムは外部ネットワークで最新バージョンのアプリをダウンロードして、更新インストールを行います。
5、「いいえ」を選択すると、そのままゲームに入ります。

**TIPS：開発者が強制的に更新したい場合は、「いいえ」を選択して直接にゲームを終了します。自分のデバッグの元のコードを選択して、自分の需要に応じて修正してください。**

##3、自動更新の設定はどうすればいいですか？

1、astesディレクトリの下でconfig.iniを開いて、内容は以下の通りです。

```

IsHandleUpdateAPK=0
ApkUpdateUrl=http://www.layabox.com/layaplayer/apk/update/conch-layaair/version.xml
UpdateDownloadPath=mnt/sdcard
UpdateAPKFileName=autoupdate.apk
AppVersion=0.9.6
CheckNetwork=1
```

設定`IsHandleUpdateAPK=1`  
version.xmlファイルを自分のサーバーに配置し、設定します。`ApkUpdateUrl`正しいパスのために。

2、version.xmlファイルの設定は以下の通りです。

```

<update>
  <versionCode>13</versionCode>
  <name>LayaBox</name>
  <version>0.9.6</version>
  <url>http://www.layabox.com/layaplayer/apk/update/conch-layaair/AutoUpdate_0.9.6.apk</url>
</update>
```

versionCode：現在のバージョン番号で、タイプはintタイプです。
name:アプリケーション名
バージョン番号情報、タイプは文字列です。
url:appkのダウンロードアドレス**【注意：この行のコードはスペースや車の返却が禁止されています。】**   

3、あなたのプロジェクトのmanifest.xmlまたはbuild.gradleのversioncodeを正しく設定します。以下の通りです。

```

defaultConfig {
        applicationId "com.example.layaboxsdk_demo"
        minSdkVersion 9
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
```


##4、注意事項

1、更新されたappkパッケージは、既存のappkパッケージをカバーするために、二つのappkのパッケージ名と署名が一致する必要があります。
