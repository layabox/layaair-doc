##httpハイジャックの保護
ここでいうhttpハイジャックとは、ネットワークサービスプロバイダまたはあるレベルのルート装置がdnsハイジャックまたはhttpハイジャックを通じてユーザ要求の結果を修正し、現在のページに広告を挿入する行為を意味する。
httpハイジャックにより、ユーザが取得したhtmlデータは動的に修正されます。例えば、要求ページに挿入されます。`<script>`これらのコードは通常LayaPlayerでは実行できません。</script>
この問題に対して、ISPにクレームをする以外に、一つの解決方法はスクリプトタグに特殊な属性を加えることで、挿入されたscriptタグと区別できます。
*用法例：*

```html

<meta name='laya' layajsprotect='true' >

<script src='main.js' loader='laya' ></script>
```

`layajsprotect='true'`この保護を開くことを表します。
`loader='laya'`これは自分のjsです。実行できます。