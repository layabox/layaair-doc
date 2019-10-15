#Processing beyond Text Area-Scrolling Text

When adding content, the text will inevitably go beyond the text area we set up. At this time, we need to process the text. If not, the content may go beyond our stage.

API parameters used in Laya. display. text:

![1](img/1.png)</br>

Hidden: Does not display characters beyond the text field.

Visible: No cutting.

Scroll: Does not display character pixels outside the text domain, and supports scroll interfaces.


```javascript

(function()
{
    var Stage   = Laya.Stage;
    var Text    = Laya.Text;
    var Browser = Laya.Browser;
    var WebGL   = Laya.WebGL;
    (function()
    {

        // 不支持WebGL时自动切换至Canvas
        Laya.init(600, 300, WebGL);
        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#232628";
        createTexts();
    })();

     function createTexts()
    {
        var t1 = createText();
        t1.overflow = Text.VISIBLE;
        t1.pos(10, 10);

        var t2 = createText();
        t2.overflow = Text.SCROLL;
        t2.pos(10, 110);

        var t3 = createText();
        t3.overflow = Text.HIDDEN;
        t3.pos(10, 210);
    }

     function createText()
    {
        var txt = new Text();
        txt.text =
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";

        txt.borderColor = "#FFFF00";
        txt.size(300, 50);
        txt.fontSize = 20;
        txt.color = "#ffffff";

        Laya.stage.addChild(txt);
        return txt;
    }
})()
```


![2](img/2.png)</br>
It can be seen that there are three different methods for text processing, each of which has its own advantages and disadvantages, and the highest performance ratio is hidden.

In addition to setting overflow for text area, scrollX and scrollY can be used to scroll the text viewport and display the whole text content by scrolling the text.

If you want to scroll text, you need to use overflow = Text. SCROLL to use Text. HIDDEN, even if you set scrolling, it will not work.


```javascript

(function()
{
    var Stage   = Laya.Stage;
    var Text    = Laya.Text;
    var Event   = Laya.Event;
    var Browser = Laya.Browser;
    var WebGL   = Laya.WebGL;

    var txt;
    var prevX = 0;
    var prevY = 0;

    (function()
    {
        // 不支持WebGL时自动切换至Canvas
        Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#232628";

        createText();
    })();

     function createText()
    {
        txt = new Text();
        txt.overflow = Text.SCROLL;
        txt.text =
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";

 
        txt.size(200, 100);
        txt.x = Laya.stage.width - txt.width >> 1;
        txt.y = Laya.stage.height - txt.height >> 1;

        txt.borderColor = "#FFFF00";
        txt.fontSize = 20;
        txt.color = "#ffffff";

        Laya.stage.addChild(txt);
        txt.on(Event.MOUSE_DOWN, this, startScrollText);
    }

     /* 开始滚动文本 */
    function startScrollText(e)
    {
        prevX = txt.mouseX;
        prevY = txt.mouseY;

        Laya.stage.on(Event.MOUSE_MOVE, this, scrollText);
        Laya.stage.on(Event.MOUSE_UP, this, finishScrollText);
    }

     /* 停止滚动文本 */
    function finishScrollText(e)
    {
        Laya.stage.off(Event.MOUSE_MOVE, this, scrollText);
        Laya.stage.off(Event.MOUSE_UP, this, finishScrollText);
    }

 
    /* 鼠标滚动文本 */
    function scrollText(e)
    {
        var nowX = txt.mouseX;
        var nowY = txt.mouseY;

        txt.scrollX += prevX - nowX;
        txt.scrollY += prevY - nowY;

        prevX = nowX;
        prevY = nowY;
    }
})();
```


![3](img/3.png)</br>

![4](img/4.png)</br>

Here we show more text content by scrolling text. In actual coding, overflow is used in three ways according to the needs of the project. There are also automatic line breaking and scrolling text to process the text.