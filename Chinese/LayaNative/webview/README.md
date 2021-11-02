
# webview
由于LayaPlayer不支持标准的html，有时候项目需要显示一个完整的html页面，这时候可以通过LayaPlayer提供的一个显示webview界面的接口来实现。  
**接口定义**  
```typescript
    /**
     * 显示一个webview
     * @param url {string} 要显示的url地址。
     * @param posx {number} webview的左上角位置
     * @param posy {number} webview的左上角位置
     * @param width {number} webview的宽度
     * @param height {number} webview的高度
     * @param canclose {boolean} webview是否可以被关掉。
     */ 
    setExternalLinkEx(url:string,posx:number,posy:number,width:number,height:number,canclose:boolean):void;
```

这个函数会在画布的最上层显示一个新的view，在其中显示url的内容。  
canclose参数用来控制这个webview是否能被关掉：  
`false`则这个webview一旦被打开就无法关掉了。  
`true` 则在ios下，会有一个小关闭按钮，点击这个按钮，就可以关闭webview（见图1）；在android下没有关闭按钮，通过后退键来关闭webview（见图2），因为关闭按钮会覆盖部分页面内容，所以尽量不显示。


**限制**
1. 目前webview无法与app进行交互。
2. webview的实现依赖于系统，低版本的android可能无法显示。

**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*2、如果使用as语言开发的时候，可以通过 `Browser.window['conch'] `这种方式获得conch对象。*


## 实际效果
![ios webview](img/1.png)  
图1  
webview左上角的x，就是当canclose设置为true的时候，对应的关闭按钮。如果 canclose=false, 则没有这个按钮。

![android webview](img/2.png)  
图2  

## 示例代码
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

## 如何在代码中动态关闭webview页面

```javascript
conch.closeExternalLink();
```