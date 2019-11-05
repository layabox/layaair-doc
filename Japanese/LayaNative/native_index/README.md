##LayaPlayerトップページ説明
LayaPlayerはブラウザではありません！
LayaPlayerはブラウザではありません！
LayaPlayerはブラウザではありません！
今はLayaPlayerはindex.を通じて起動していますが、実際にはこのようにしています。ブラウザとの統一のために。LayaPlayerはブラウザベースではなく、ブラウザやwebkitなどのコントロールをカプセル化して実行しています。LayaPlayer内部はjsの正規表現でこのhtmlページの内容を簡単に解析しています。その中の配置と実行中のスクリプトを取り出して、これ自体が複雑で、しかもエンジンも不要です。これによる問題は：
1.LayaPlayerはhtmlの中だけに関心があります。`<meta>`ラベルと、`<script>`ラベル他のラベルは無視されます。に対する`<meta>`ラベルは現在含まれているだけです。`name='laya'`属性の場合は、縦型スクリーンと他の設定を設定します。</script>

    
```html

    <meta name='laya' screenorientation='landscape' >
    ```

2.scriptタグはsrc='xxx'の形が一番いいです。インライン形式のスクリプトは複雑で、正規表現で解析できないので、解析エラーが発生する可能性があります。
3.その他は一切サポートしていません。だからDOMに依存するjqueryも支持されていません。
4.同じ理由でLayaPlayerもNodeベースではないので、nodeベースのシナリオはすべてサポートされていません。
5.その他はまだ実現されていません。後続のバージョンで実現される機能：

|機能𞓜優先度𞓜
124:--124:---124
124 ws契約書𞓜高𞓜
|Orientation𞓜高𞓜
|WebAssemble𞓜高𞓜
|XMLttpRequest同期取得|低𞓜
|WebVideo𞓜低𞓜
|WebWorkカーが低い
|WebVRが低い
    



**提示:**  
LayaPlayerが実行中にサポートされていないタグがあれば、直接にフレームを弾き間違えます。図1のように
！[](img/1.png)
図1


