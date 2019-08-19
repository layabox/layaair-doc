# 超出文本区域的处理&滚动文本

文本在添加内容的时候免不了超出我们所设置的文本区域，这时候我们要对文本进行处理，不处理的话内容有可能超出我们舞台。

Laya.display.text 中所使用的API 参数：

![1](img/1.png)</br>

hidden:不显示超出文本域的字符。

visible:不进行任何裁切。

scroll:不显示文本域外的字符像素，并且支持scroll接口。

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
可以看到3种方法的对文本处理的不同，每种处理都有各自的优缺点，性能比最高的还是hidden。

除了通过对文本区域设置overflow ，还可以通过使用scrollX和scrollY滚动文本视口，通过滚动文本来显示全部的文本内容。

要是想要实现滚动文本需要使用 overflow = Text.SCROLL 使用 Text.HIDDEN的话即时你设置了滚动也没有效果。

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

这里我们就通过滚动文本显示更多的文本内容，在实际编码中根据项目需要使用overflow的3种处理方式，还有自动换行和滚动文本可以对文本进行处理。