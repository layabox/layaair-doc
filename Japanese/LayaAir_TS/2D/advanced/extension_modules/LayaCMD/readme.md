@ -1,271 +0,0 @@

#layaair-cmd

[TOC]

**layaair-cmd**はい、**layaair**のコマンドラインツールが使用できます。**layaair-cmd**開かない**IDE**の場合は**layaair**プロジェクトはコンパイルリリースなどの操作を行います。これらの機能はサブコマンドに対応しています。

|機能124;子コマンド
|-----------------------|
|コンパイル
|publish 124;を発表する
|がUI𞓜uiを導出する。
リソースバージョン制御
|getzliを使ってjpg|getzliを圧縮する。
|静的ファイルサーバ|open|を開く



##インストール


```shell

$ npm install layaair-cmd -g
```




##CLI

**layaair-cmd**のコマンドが似ています**git**コマンドは、


```shell

$ layaair-cmd [command] [args]
```


たとえば、コンパイル項目:


```shell

$ layaair-cmd compile
```


またはヘルプ情報を表示します。


```shell

$ layaair-cmd --help
```


だけでなく**layaair-cmd**自身、すべてのサブコマンドにはバージョン情報とヘルプ情報があります。サブコマンドヘルプ情報を確認してください。


```shell

$ layaair-cmd command -h
```


**layaair-cmd**の大部分分子コマンドは現在の作業ディレクトリに含まれています。**layaair**項目、少数コマンドは、手動で入力ディレクトリを指定できます。`guetzl`を選択します`atlas`コマンドは直接`$ layaair-cmd atlas`入力ディレクトリを指定することもできます。



##コンパイル


```shell

$ layaair-cmd compile -h

  Usage: layaair-cmd compile [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```


現在のディレクトリがある場合**layaair**アイテムをコンパイルしたコマンドが生成されます。**JavaScript**ファイルコンパイルは**アクションScript**和**Type Script**プロジェクトが必要です。**JavaScript**何もしません。

####使用


```shell

$ layaair-cmd compile
```




##リリース


```shell

$ layaair-cmd publish -h

  Usage: layaair-cmd publish [options]

  Options:

    -V, --version                   output the version number
    -o --compressOptions <options>  压缩选项。留空不处理，'c'表示压缩，'cc'表示压缩并合并
    -n --versionName <name>         version name
    --noCompile                     不重新编译项目
    --noUi                          不重新生成UI代码文件
    --noAtlas                       不重新生成图集
    -h, --help                      output usage information
```


現在のディレクトリがある場合**layaair**このコマンドはリリース後のアイテムを生成します。**JavaScript**ファイル、リリースされたフォルダは*release*の下にあります。

####使用


```shell

$ layaair-cmd publish -o cc # 指定了压缩选项为合并并压缩
```


##エクスポートUI


```shell

$ layaair-cmd ui -h

  Usage: layaair-cmd ui [options]

  Options:

    -V, --version     output the version number
    -c --clear        clear will delete old ui code file.
    -a --atlas        generate atlas
    -d --code         generate ui code files
    -m --mode <mode>  'normal'或者'release'，指定'release'会生成除未使用资源外的UI代码文件
    -h, --help        output usage information
```


現在のディレクトリがある場合**layaair**このコマンドは、UIページに関連するファイルを出力する。

####使用


```shell

$ layaair-cmd ui -c -m release # 导出前清理，并且把mode设置为release
$ layaair-cmd ui -d # 导出UI代码文件
$ layaair-cmd ui -a # 导出图集文件
```




##リソースバージョン制御

**リソースバージョン制御**リソースのバージョンを生成するために使用します。バージョン番号はデフォルトでは数字1000からインクリメントされます。`--versionName`パラメータは、ユーザが指定したバージョン名を使用します。次回バージョンを作成する時に再指定がない場合`--name`バージョン番号は1002です。バージョンを生成するたびに、**リソースバージョン制御**内部バージョンのカウンタが増加します。

バージョンを作成するときは、前回のバージョンに対して、修正されたファイルまたは新規のファイルが新しいバージョンに記録されます。ファイルが追加されていない場合や変更されていない場合は、新しいバージョンが生成されません。

>最終的にリソースを使用する場合、上位の相対パス、すなわちパスに「.」が含まれてはいけません。


```shell

$ layaair-cmd resourceVersion -h

  Usage: layaair-cmd resourceVersion [options]

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -i --input <input>               资源目录
    -o --output <output>             导出目录
    -n --versionName <version name>  版本名称，默认是从1000开始递增的数字
```


このコマンドは現在のディレクトリを含む必要はありません。**layaair**代わりに、入力ディレクトリを指定する必要があります。



####使用


```shell

$ layaair-cmd resourceVersion -i input_dir -o output_dir -n 1.1.0
# 指定了输入目录、输出目录和版本名称
```




####生成されたファイル

>1000
>
>>レスポンス…
>
>1001
>
>>レスポンス…
>
>1002
>
>>レスポンス…
>
>.レコード
>
>manifest.json



####リソースバージョン

名前が＊1000＊＊＊1001＊＊＊1002＊というフォルダはデフォルトのリソースバージョンの名前です。中には対応バージョンが修正されたリソースが保存されています。から得られた各リソースの最新バージョン番号に基づいて、これらのフォルダから*manifest.json*対応のバージョンリソースを読み取ります。



####レコードファイル

*.record*は**Unix-like**システムでは隠しファイルです。このファイルは最近のバージョン確立情報を保存します。**リソースバージョン制御**これにより、新しいバージョンを作成する際にどのファイルが修正されたかを判定します。このファイルは削除できません。このファイルが無くなれば、前に作成したバージョンは失われます。バージョンの再構築を開始するのに相当します。



####manifist.json資源リスト

ユーザーは*manifist.json*によって最新の資源を獲得します。このファイルにはリソースキーのペアが含まれています。


```json

{
    "res1": "1000",
    "res2": "1000",
    "res3": "1002",
    "sub\\res3": "1000",
    "sub\\res4": "1000"
}
```


ユーザは、マッピングからリソースに対応するバージョン番号を取得し、`资源根目录/版本号/相对文件路径`資源のurlを得て、ロードして使用します。



####リソースバージョンの切り替え

のため、各バージョンのファイルバージョン番号を保存します。ですから、歴史*manifest.json*を保留するだけで対応バージョンのリソースが使えます。


##Getzli

**Getzli**はい、**google**オープンソース**jpeg**エンコーダその紹介、注意事項などは公式https:/githb.com/google/gutzliを参照してください。

**Getzli**圧縮プロセスが遅く、資源が大きいので、待ち時間がかかります。

一番いいのは**リソースバージョン制御**作成したフォルダで使用します。**Getzli**圧縮は、図面を繰り返し圧縮しないことを保証することができます。


```shell

$ layaair-cmd guetzli -h

  Usage: layaair-cmd guetzli [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i --input <input>      resource directory.
    -q --quality <quality>  quality, more than 84.
```


このコマンドは現在のディレクトリを含む必要はありません。**layaair**代わりに、入力ディレクトリを指定する必要があります。圧縮に成功すると、ソースファイルが修正されます。圧縮に失敗した場合、ソースファイルはそのままです。

####使用


```shell

$ layaair-cmd guetzli -i input_dir -q 95
# 指定了压缩率95
```




##静的ファイルサーバを開く


```shell

$ layaair-cmd open -h

  Usage: layaair-cmd open [port] [args]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p <port>      resource directory.
    -s             don't open browser
```


このコマンドは**layaair**プロジェクトが同じ構造を持つディレクトリで使用します。に対する**アクションScript**プロジェクトは、*/bin/h 5*に静的ファイルサーバをオープンします。**JavaScript**和**Type Script**プロジェクトは**./bin**静的ファイルサーバをオープンします。