
# webview
Because LayaPlayer does not support standard HTML, sometimes a project needs to display a complete HTML page, which can be realized by LayaPlayer's interface displaying WebView interface. 
**Interface definition**  
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

This function displays a new view at the top of the canvas, which displays the content of the URL. 
canclose parameter is used to control whether the WebView can be turned off:
`false` webview can not be turned off once it is opened.  
`true` In IOS, there will be a small close button, click this button, you can turn off the WebView (see Figure 1); no close button in the Android, through the back button to shut down the WebView (see Figure 2), because of the close button will cover part of the page content, so try not to show.


**limit**
1. WebView is currently unable to interact with app.
2. The implementation of WebView depends on the system, and the lower version of the Android may not be displayed.

**Tips**  
*1. Conch can only be called under the LayaPlayer environmentl,there is no conch definition in the web version.*  
*2. If you use ActionScript language development, you can through `Browser.window['conch'] ` can get conch object.*


## current effect
![ios webview](img/1.png)  
Picture 1  
X in the upper left corner of WebView, it is when the canclose is set to true, corresponding close button. if canclose=false , doesn't have this button.

![android webview](img/2.png)  
Picture 2  

## Sample code
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

