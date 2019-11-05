#webview
LayaPlayerは標準のhtmlファイルをサポートしていませんので、プロジェクトによっては完全なhtmlページを表示する必要があります。この場合はLayaPlayerが提供するwebviewインターフェースを表示することで実現できます。
**インターフェース定義**  

```typescript

    /**
     * 显示一个webview
     * @param url {string} 要显示的url地址。
     * @param posx {number} weview的左上角位置
     * @param posy {number} webivew的左上角位置
     * @param width {number} webview的宽度
     * @param height {number} webview的高度
     * @param canclose {boolean} webview是否可以被关掉。
     */ 
    setExternalLinkEx(url:string,posx:number,posy:number,width:number,height:number,canclose:boolean):void;
```


この関数はキャンバスの一番上に新しいviewを表示します。そこにurlの内容が表示されます。
cancloseパラメータはこのwebviewがオフになるかどうかを制御します。
`false`このwebviewはいったん開けられたら、消すことができなくなります。
`true`このボタンを押すとwebviewはオフになります。androidの下ではオフボタンがありません。バックボタンでwebviewはオフになります。閉じるボタンは一部のページの内容をカバーしますので、表示しないようにします。


**制限**
1.現在のwebviewはappとの対話ができません。
2.webviewの実現はシステムに依存しており、低バージョンのandroidは表示できないかもしれない。

**Tips**  
*1、conchはLayaPlayerの環境でしか呼び出しできません。ウェブページのバージョンにはconchの定義がありません。存在するかどうかを判断する必要があります。＊
*2、as言語を使って開発する場合は、`Browser.window['conch'] `このようにしてconchオブジェクトを取得します。*


##実際の効果
![ios webview](img/1.png)  

図1
webviewの左上のxは、cancloseがtrueに設定されている場合に対応するクローズボタンです。canclose=falseなら、このボタンはありません。

![android webview](img/2.png)  

図2

##サンプルコード

```javascript

//@ts-check

conch && conch.showAssistantTouch(false);
var ctx = document.createElement('canvas').getContext('2d');
function render(){
    ctx.fillStyle='#99d9ea';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

document.addEventListener('touchstart',()=>{
    if(conch){
        var l = 50;
        var t = 50;
        var w = window.innerWidth-l*2;
        var h = window.innerHeight-t*2;
        conch.setExternalLinkEx('http://www.layabox.com',l,t,w,h,true);
        //conch.setExternalLink('http://www.baidu.com');
    }
});
```


##どうやってコードの中でwebviewページを動的に閉じますか？


```javascript

conch.closeExternalLink();
```
