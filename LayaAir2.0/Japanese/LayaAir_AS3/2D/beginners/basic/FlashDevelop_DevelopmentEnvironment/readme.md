# FlashDevelop开发环境配置

###第一歩：LayaAir Egineダウンロード

####1.1エンジンのダウンロード

LayaAirIDEを使って開発すれば、LayaAirIDEをダウンロードしてエンジンパックを持参します。開発者が第三者ツールを使って開発するなら、まずエンジンをダウンロードする必要があります。公式サイトのトップページや開発者センターメニューには、エンジンからダウンロードされたリンクの入り口があり、リンクを開くとエンジンの各バージョンのダウンロードリストが表示されます。各バージョンはAS 3、TS、JSの3つの開発言語を提供しています。対応する開発言語パッケージを選択し、公式サイトでダウンロードしてください。

####1.2エンジンパッケージの構造紹介

本記事ではFlash Develop開発環境を紹介していますので、AS 3のエンジンパックをダウンロードします。ダウンロードして解凍すると、AS 3バージョンのディレクトリ構造が下図のように見えます。

​![图片1.jpg](img/1.png)<br/>
図(1)

-「jslibs」「libs」はエンジンコードディレクトリで、LayaAirエンジンライブラリコードはこのディレクトリにあります。

-「laya.js.exe」はWindowsシステムのAS 3コードコンパイラで、AS 3コードをJSコードにコンパイルします。

-「Layajs」はアップルMACシステムのAS 3コードコンパイラで、AS 3コードをJSコードにコンパイルします。

​




###二番目のステップはGoogle Chromeブラウザをインストールします。

AS 3コードコンパイルを実行すると、デフォルトでChromeブラウザを呼び出して実行項目を開きます。このブラウザをインストールしてプロジェクトのデバッグを行う必要があります。インストールされたものはこのステップをスキップできます。



 



###第3段階Flash DevelopのAS 3コンパイル環境を設定します。

​**ステップ1**：Flash Developを開き、メニューバーでマクロを見つけ、マクロを編集するパネルを開きます。

​![blob.png](img/2.png)<br/>
図(2)

​**ステップ2**：まず「追加」をクリックしてマクロコマンドを追加し、先ほど追加したマクロコマンドを選択して、「Label」欄でマクロコマンドのメニュー名を変更します。「LayaCommpiler」をクリックして、マクロメニューショートカットを「Alt+F 5」に設定します。

​![blob.png](img/3.png)<br/>
図(3)

​**ステップ3**：「Enttries」欄の右側の位置で「...」操作エリアをクリックし、「文字列セットエディタ」画面を開きます。

​![blob.png](img/4.png)<br/>
図(4)

​**ステップ4**：文字列セットエディタパネルにマクロコマンドを入力します。


```

SaveAllModified
RunProcessCaptured|D:\layaide2.0\layaairide\resources\app\out\vs\layaEditor\laya\libs\2.0.0beta1\as\layajs.exe;"$(ProjectPath)";iflash=false;quickcompile=true;out=bin/js/bundle.js;subpath=
```


もしコンパイルがGoogleブラウザを起動しないなら、上にchromern=falseを加入すればいいです。


```

SaveAllModified
RunProcessCaptured|D:\layaide2.0\layaairide\resources\app\out\vs\layaEditor\laya\libs\2.0.0beta1\as\layajs.exe;"$(ProjectPath)";iflash=false;chromerun=false;quickcompile=true;out=bin/js/bundle.js;subpath=
```


​![blob.png](img/5.png)<br/>
図(5)

**Tips：「D:\layaide 2.0\laya airide\resource\app\out\vs\laya Editor\laya\libs\2.0 beta 1\as\laya.js.exe」はlaya.js.exeの実際の所在経路であるべきです。**




​**ステップ5**：「マクロコマンドの設定が完了したら、マクロコマンド「LayaJs Compler」の全設定が完了し、即時に有効になります。直接に「閉じる」ボタンをクリックすればいいです。


  



**これでプロジェクトを立ち上げる前のLayaAirエンジンのダウンロード、ブラウザのダウンロード、Flash Develop環境下のAS 3コンパイラの配置は終了しました。開発者が他の章で引き続き勉強することを歓迎します。**

