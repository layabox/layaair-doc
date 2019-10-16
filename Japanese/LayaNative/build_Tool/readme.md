# LayaBox 构建工具
構築ツールはLayaPlayerのモバイル端末アプリプロジェクトを生成するためのもので、Appプロジェクトウィザードに相当します。Android（Eclipseプロジェクト、Android studioプロジェクト）とiOS（XCodeプロジェクト）に対応しています。

##1.運行ニーズ
####1.1基礎開発環境

プロジェクトを構築するには、開発環境を準備しなければならない。例えば、iOSプロジェクトを構築するには、MacパソコンとXCode、androidはEclipseまたはAndroid studioを準備する必要があります。

##2.ユーザー向け
AndroidやiOSプロジェクトを構築するには、AndroidやiOSのアプリ開発の基礎が必要です。もし備えていないなら、まず関連している基礎知識を学んでください。



##3.LayaAirIDEでアプリを開いて構築する

はい、[Layabox官网](http://localhost/LayaAir2_Auto/Layabox.com)layaAirIDEをダウンロードし、LayaAirIDE-->ツール--アプリ構築を開くと、図1に示すように、


![图1](1.jpg)

（図1）


ツールを構築するために必要なライブラリファイルは大きいので、LayaAirIDEに直接含まれていません。このツールを初めて使う時、SDKパッケージをダウンロードします。

！[](0.gif)

（図2）

**注意**

このファイルは大きいので、ダウンロードする時は我慢して待ってください。

ダウンロードが完了したら、「app構築」を注文すると、構築ダイアログが直接に開きます。

##4.プロジェクト構築画面パラメータ

LayaAirIDEでプロジェクト構築のインターフェースを開き、図3に示すように、

![2](2.jpg)
（図3）

*プラットフォーム

生成したプロジェクトを構築するタイプは、Android Eclipseプロジェクト、Android studioプロジェクト、iOSプロジェクトの3つのオプションがあります。Androidプロジェクトを生成するなら、Android d-eclipseまたはAndroid d-studioを選択できます。XCode(iOS)項目を生成する必要がある場合は、iOSオプションを選択します。


*パーソナル版アプリ：

このオプションをチェックすると、構築したプロジェクトのパッケージ化されたアプリがマシン版でなければオンライン版です。単独版はネット接続が必要ではなく、対応するurlがありません。urlを提供する必要はありません。しかし、ゲームリソースを提供しなければなりません。包装後は実行できません。

＊プロジェクト名：

アプリの名前。構築項目の出力ディレクトリでもあります。

＊パッケージ名:

アプリケーションのパッケージ名は、この通常の状況では見られません。一般的には反ドメイン名命名規則を採用しています。

例えば、comp.layabox.runtime.demo
パッケージ名はxxx.yy.zzz形式でなければなりません。少なくとも2つのレベルがあります。包装が失敗します。

*ゲームurl:

パッケージ化するアプリケーションがオンラインアイテムである場合は、起動urlを提供して、htmlページを指して、アプリケーションの入り口です。LayaAirによって生成されたプロジェクトは起動ページを出力します。一般的にindex.テストの時、便利さのために、通常は使っているローカルURLアドレスがブラウザでテストされます。Androidアプリを打つ時、本物のwebserverのアドレスが必要です。

たとえば:

*LANアドレス:*


```

    http://10.10.20.19:8888/index.html
```

*実際の住所:*

```

    http://layaair.ldc.layabox.com/layaplayer/index.html
```


​**注意**

LayaPlayerのhtmlへのサポートは非常に限られていますので、参考にしてください。[这里](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/native_index);

*出力先:

作成したAppプロジェクトの保存先を構築します。

*リソースパス:

リソースはシナリオ、画像、音声などの資源です。オンラインゲームについては、ゲームのurlがあれば正常に動作しますが、直接にAppパッケージにリソースを入れると、ダウンロードを避けてリソースのロード速度を速められます。シングルゲームであれば、ゲームurlは提供されていませんので、リソースディレクトリに必要なリソースを全部パッケージ化してアプリに入れなければなりません。

パッケージ化されたアプリのリソースは依然として私たちのdccツール（リソースキャッシュ管理）によって更新されます。
リソースパスが設定されていない場合は、プロジェクト構築後も手動でリソースを追加することができます。[LayaDcc工具](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。


   **注意:**  

資源を梱包する欠点は、パッケージのサイズを増やすことです。

パッキングリソースのオンラインゲームは、Serverの端でdccを打つ必要があります。そうでないと、パッケージ化の利点がなくなります。依然としてすべてのリソースをダウンロードします。どのようにdccを打ちますか？参考にしてください。[LayaDcc工具](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。



##5.構築されたプロジェクトプロジェクトの使用

构筑されたAppプロジェクトは、対応する开発ツールで开いて二次开発やパッケージ化などの操作ができます。

##-Android d-eclipe(android)プロジェクトは、eclipseソフトウェアを使って導入と開発ができます。 Android-studio（android）项目可以使用 android-studio软件进行导入和开发。

-XCodeプロジェクトはxcodeソフトウェアを使って導入と開発ができます。XCodeプロジェクトを開くと、本当のiosデバイスを選択してbuildを行う必要があります。（注意：本当の装置は、armv 7、armv 7 s、arm 64アーキテクチャである。また、ios Simullatorを使用するとX 86アーキテクチャであり、現在LayaNativeはiosデバイス上でX 86アーキテクチャをサポートしていません。シミュレータを使ってコンパイルすると、通過できません。（0.9.5版からシミュレータをサポート）



**参照リソース:**

を選択します。[Eclipse搭建Android环境](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/setUpAndroidEnvironment_Eclipse)

を選択します。[Android Studio的使用和配置](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/AndroidStudio_ConfigurationAndApplication)

を選択します。[IOS打包发布App详细流程](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/packagingReleases_IOS)

​

##6.手動で単独版とネットワーク版を切り替える

構築が完了したら、直接プロジェクトでコードを修正することで、マシン版とネットワーク版を切り替えることができます。

1.Androidプロジェクト

構築したプロジェクトでMainActivity.javaを開いて検索します。`mPlugin.game_plugin_set_option("localize","false");`  
シングル版は「true」に設定する必要があります。`mPlugin.game_plugin_set_option("localize","true");`  
ネットワーク版に設定する場合は、次のように変更します。`mPlugin.game_plugin_set_option("localize","false");`を選択し、正しいアドレスを設定します。
     `mPlugin.game_plugin_set_option("gameUrl", "http://你的地址/index.html");`


2.iOS項目

iOSプロジェクトの構築が完了したら、プロジェクトディレクトリのresource/scripts/index.jsスクリプトの最後にloadUrlを実行する関数があります。ここにトップページのアドレスをロードします。ここのアドレスを修正すると、シングルマシン版とネットワーク版が切り替わります。シングル版のアドレスは固定されています。`http://stand.alone.version/index.html`。

例えば、最初はネットワーク版であり、アドレスは以下の通りである。


    `loadUrl(conch.presetUrl||"http://10.10.20.19:7788/index.html");`   
パーソナル版に変更するなら、この文を修正します。
    `loadUrl(conch.presetUrl||"http://stand.alone.version/index.html");`  
逆もまた然り。


   **注意**   
url住所を修正したら、元々包装した資源は全部無効になります。この時、cacheディレクトリの下の内容を手動で削除して、layadccを新たに使ってパッキングリソースを生成します。参照してください。[《LayaDCC工具》](https://github.com/layabox/layaair-doc/tree/master/Chinese/LayaNative/LayaDcc_Tool)。

##7.リソースの更新

IDEによって構築されたプロジェクトは、単一のマシン版とパッケージ化されたリソースバージョンを選択します。resource/cacheディレクトリの下で、h 5プロジェクトのすべてのリソース（スクリプト、画像、html、サウンドなどを含む）をこのディレクトリにまとめました。
``android的目录： assets/cache/  ``<br>``iOS的目录：  resource/cache/  ``<br><br>但是在开发过程中，h5的项目一直在变化，为了避免每次都重新构建工程，在IDE-1.7.6-Beta版本之后，可以通过命令行进行刷新。<br><br>リソースパッケージのバージョン呼び出しコマンド:``layanative refreshres -u http://testgame.layabox.com/index.html``<br>シングルバージョン呼び出しコマンド:``layanative refreshres``

＊**Tips**＊
**1、構築されたappプロジェクトディレクトリの下で、命令を実行しなければなりません。一番明らかなマークはnavtie.jsonのディレクトリの下にあります。**
！[](3.jpg)

layanativeコマンドラインはどうやってインストールして使うかについては、参照してください。[layanative命令行工具使用](https://ldc.layabox.com/doc/?nav=ch-as-5-3-0)


##8.その他の注意事項
Android studioの構築が完了したら、自分の環境に合わせてAndroid sdkのバージョン番号を修正する必要があります。現在設定されているのは23です。修正が必要です。
ファイルはapp/build.gradleです。