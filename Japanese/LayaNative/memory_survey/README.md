#LayaPlayer環境下で主要オブジェクトの占有状況を確認する

開発者がメモリの占有状況を調整しやすくするために、LayaPlayer-09.6以降のバージョンでは、よく使われるスクリプトオブジェクトのメモリ内の占有情報を統計しました。イメージ、XMLttpRequest、sprite 2 D、graphics、context 2 D、particleTemplated 2 D、XmlNodeなどの情報を含みます。

###1、どうやって開けますか

config.jsで以下の関数を呼び出すことができます。


```javascript

conch.config.enableMemorySurvey(true);
```


config.jsの位置:
``Android: 工程目录下的assets/scripts/config.js  ``<br>``IOS:工程目录下的resources/scripts/config.js``

**注意：正式に発表する時は消します。性能が消耗するからです。**

###2、どうやって使うか

現在の占有状況は以下の関数で印刷できます。


```javascript

conch.config.printAllMemorySurvey("");//参数为log写入的位置，如果写的是""，默认会写入cache目录下
```


この関数を起動すると、appCacheディレクトリの下でmemoryStatis.txtが生成され、ロゴウィンドウの下でロゴが印刷されます。

！[](img/0.jpg)

この事例のロゴは、sprite 2 D個数が2つ、grphics個数が1つであることを示しています。
最後の行はメモリの情報です。
Reserve texture manager size=128.00 MB、/テクスチャデザインのsize
Reseve alas size=80.00 MB、/内部大図集のsize
Sound size=0.06 MB、/wav占有のsize
Imageのrelease yet=0/未整理のイメージの個数（メモリ占有数ではない）

具体的に現存テクスチャ管理とイメージ関係は参考にしてください。[显存管理](https://ldc.layabox.com/doc/?nav=ch-as-5-2-1)

**TIPS:ロゴ中のsizeとcount Sizeはいずれも既定値で、正確ではなく、主に対象の個数を見ます。**

###3、実際に使う

プロジェクトの実用的なアプリケーションは、プロジェクトのコーナーで、ボタンを押すごとにprintAllMemorySurvey関数を実行します。
例えば、ログインページでクリックして、関連情報を記録します。
本城に入ったらクリックして関連情報を記録してください。
コピーをクリックして、関連情報を記録します。
もう一度本城に戻ったらクリックして関連情報を記録します。

これにより、レプリカを出入りした後、レガシーノードが削除されていないかを対比することができる。

