#Flash Builder開発環境構成

###第一歩：LayaAir Egineダウンロード

####1.1エンジンのダウンロード

LayaAirIDEを使って開発すれば、LayaAirIDEをダウンロードしてエンジンパックを持参します。各バージョンはAS 3、TS、JSの3つの開発言語を提供し、対応する開発言語パッケージを選択します。

####1.2エンジンパッケージの構造紹介

AS 3バージョンのエンジンパックをダウンロードします。ダウンロードして解凍すると、AS 3バージョンのディレクトリ構造が下図のように見えます。

![图1](img/1.png)<br/>(図1)

-「jslibs」「libs」はエンジンコードディレクトリで、LayaAirエンジンライブラリコードはこのディレクトリにあります。

-「laya.js.exe」はWindowsシステムのAS 3コードコンパイラで、AS 3コードをJSコードにコンパイルします。

-「LayaJSMac」はアップルMACシステムのAS 3コードコンパイラで、AS 3コードをJSコードにコンパイルします。

​


###二番目のステップはGoogle Chromeブラウザをインストールします。

AS 3コードコンパイルを実行すると、デフォルトでChromeブラウザを呼び出して実行項目を開きます。このブラウザをインストールしてプロジェクトのデバッグを行う必要があります。インストールされたものはこのステップをスキップできます。



###第3段階Flash BuilderのAS 3コンパイル環境を設定します。

​**ステップ1**：Flash Builderを開き、「外部ツールの設定」を見つけ、設定ウィンドウを開きます。

​![2.jpg](img/2.jpg)<br/>
図(2)


​**ステップ2**：設定ウィンドウで、右クリックで「プログラム」を選択し、「新規作成」をクリックして、新規設定ウィンドウを開きます。

​![3.jpg](img/3.jpg)<br/>
図(3)



**ステップ3**:

まず外部プログラムの名前を変更します。`LayaCompiler`」をクリックします。

そして「ファイルシステムをブラウズ」をクリックして「`laya.js.exe`」または直接コピーします。`laya.js.exe`」のパスを「位置」入力欄に貼り付けます。

最後に「引数」欄に入力します。`"${project_loc}\.actionScriptProperties;iflash=false;chromerun=true;quickcompile=true;out=bin/js/bundle.js;subpath="`をクリックします。

もし私たちが毎回コンパイルしたくないなら、新しいGoogleブラウザのプロセスを起動して、先ほどの構成で再度外部プログラムを作成します。変数パラメータを変更するだけでいいです。`"${project_loc}\.actionScriptProperties;iflash=false;chromerun=false;quickcompile=true;out=bin/js/bundle.js;subpath="`図4、図5に示すように。

![4](img/4.png)<br/>(図4)

![图5](img/5.png)<br/>(図5)


 



**Tips：「D:\layaide 2.0\laya airide\resource\app\out\vs\laya Editor\laya\libs\2.0 beta\as\laya.js.exe」はlaya.js.exeの実際の所在経路であるべきです。MACシステムでは「」userPath「\layaairide\resorce\app\out\vs\laya Editor\laya\libs\2.0 beta\as\Laya JSMac」となります。**



これでプロジェクトを立ち上げる前のLayaAirエンジンのダウンロード、ブラウザのダウンロード、Flash Builderの環境下のAS 3コンパイラの配置が終わりました。開発者が他の章で引き続き勉強することを歓迎します。