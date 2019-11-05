#2.2バージョンのF 5デバッグオープン

LayaAirIDEに内蔵されているコード編集ツールは、VSCコードであり、

F 5デバッグはVSCDEが持参するデバッグツールです。

しかし、2.2バージョンのコンパイル方式が変更されたため、F 5のデバッグをサポートし、binディレクトリが大きくなります。ですから、F 5のデバッグをオフにしました。F 6を使って、chromeデバッグをアクティブにすることをオススメします。（MACシステムの開発者は、F 6を使用して実行する前に、chromeプロセスを開けないでください。そうでないと、F 6がchromeプロセスを調整することに影響します。）

chromeはこれまで推奨されてきた最初のデバッグモードです。開発者にChromeを使ってプロジェクトをデバッグすることを提案します。

開発者が特定のニーズがある場合は、LayaAirIDEのF 5デバッグのサポートを以下のように自ら開いてください。

###一、moduleモードTSプロジェクト（実験版）はF 5をどうやってデバッグしますか？

####1、修正`.laya/compile.js`

見つけました`sourceMap: false`に変更`sourcemap: true`

全部で二つあります`sourcemap`の場所を変更します。`true`。

####2、修正`.laya/launch.json`

見つけました`"sourceMaps": false,`に変更`"sourceMaps": true,`

ここにも二つがあります。一つはlayaAirデバッグで、一つはchromeデバッグです。

chromeでデバッグすることを提案しますので、chromeを変更してデバッグすればいいです。layaAirでデバッグする必要があれば、全部変えてもいいです。あるいはlayaAirデバッグだけ見てもいいです。これは自分の需要によって違います。

####3、修正`src/tsconfig.json`

complerOptionsの下に「sourceMap」を追加します。true

修正後のtsconfig.jsonは以下の通りです。


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "baseUrl": "../libs",
    "outDir": "../build/src",
    "sourceMap": true
  },
  "references": [
    {"path":"../libs"},
  ],
  "exclude": [
    "../node_modules"
  ]
}
```




###二、bundleモードTS項目は、F 5デバッグをどうやってオープンしますか？

####1、修正`.laya/compile.js`

見つけました`sourceMap: false`に変更`sourcemap: true`

全部で二つあります`sourcemap`の場所を変更します。`true`。

####2、修正`src/tsconfig.json`

将`"sourceMap": false`に変更`"sourceMap": true`

修正後のtsconfig.jsonは以下の通りです。


```json

{
  "compilerOptions": {
    "module": "es6",
    "target": "es6",
    "noEmitHelpers": true,
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```




###三、JSプロジェクトは、どうやってF 5を開けてデバッグしますか？

見つけました`sourceMap: false`に変更`sourcemap: true`

全部で二つあります`sourcemap`の場所を変更します。`true`。

>二つ目だけ変更してもいいです。両方とも変更することを勧めます。