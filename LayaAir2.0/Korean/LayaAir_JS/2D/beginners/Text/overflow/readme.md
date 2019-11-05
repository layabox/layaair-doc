#텍스트 영역을 뛰어넘는 처리 & 스크롤 텍스트

텍스트는 내용을 첨가할 때 우리가 설치한 텍스트 영역을 벗어나지 않을 수 없습니다. 이때 우리는 텍스트 처리를 해야 합니다. 처리를 하지 않으면 내용이 우리의 무대를 넘어설 수 있습니다.

Laya.display.text 에서 사용하는 API 인자:

![1](img/1.png)</br>


hidden: 텍스트 영역의 문자를 표시하지 않습니다.

visible:아무것도 재단하지 않습니다.

scroll: 텍스트 역외 문자 픽셀을 표시하지 않고 scroll 인터페이스를 지원합니다.


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


![2](img/2.png)</br>>
3가지 방법을 볼 수 있는 텍스트 처리에 따라 모든 처리가 각자의 장단점이 있고 성능이 가장 높은 히든이다.

텍스트 영역에 overflow 설정을 통하여 scrollX 와 scrolly를 사용하여 텍스트를 스크롤러치할 수 있습니다.

스크롤 텍스트를 실현하려면 overflow = Text.SCROL이 Text.HIDDEN 을 사용하면 스크롤을 설치해도 효과가 없다.


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


![3](img/3.png)</br>>

![4](img/4.png)</br>>

스크롤 텍스트를 통해 더 많은 텍스트 내용을 보여 줍니다. 실제 인코딩에 따라 항목에 따라 overflow 의 3가지 처리 방식을 사용하고, 자동으로 바꾸고 스크롤 텍스트를 텍스트에 처리할 수 있습니다.