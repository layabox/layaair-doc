# LayaNative首页说明

LayaNativeはブラウザではありません！<br/>
LayaNativeはブラウザではありません！<br/>
LayaNativeはブラウザではありません！

現在LayaNativeはプロジェクト内のindex.jsまたはruntime.jsonをロードすることによって起動されます。LayaNative**ブラウザに基づいていません。**の内容は、ブラウザやwebkitなどのコントロールをカプセル化して実行するものではない。


##ブートプロファイルの説明

LayaNativeはindex.jsまたはruntime.jsonで起動することを選択できます。この二つのファイルは主に以下の機能を提供しています。

＊プロジェクト実行時にロードする必要があるjsファイルを確定します。
*縦横スクリーンを設定します。

具体的な修正方法は以下の通りです。

**1.イニシャルファイルとしてindex.jsを使用する**

*loadLib関数を使用してプロジェクトの実行時にロードする必要があるjsファイルを決定します。
*window.screenOrientation変数の値を変更して、縦横スクリーンに設定します。

たとえば:


```javascript

window.screenOrientation = "landscape"; // 设置屏幕为横屏
loadLib("libs/matter.js");   // 启动时加载“libs/matter.js”文件
```



**注意:**index.jsファイルで論理コードを作成しないでください。作成すると未知のエラーが発生する可能性があります。

**2.runtime.jsonをスタートファイルとして使う**

プロジェクトは、スタートファイルとしてruntime.jsonファイルを選択することもできます。jsonファイルフォーマットは起動するプロファイルとしてindex.jsより分かりやすいです。

*「scripts」：プロジェクトの実行時にロードする必要があるjsファイルを確定するために使用します。
＊「screenOrientation」：ワイドスクリーンに設定します。

例えば、以下の設定は起動時に「temp.js」ファイルをロードし、画面を横画面に設定します。


```json

{
	"scripts": ["temp.js"],
	"screenOrientation": "landscape"
}

```
