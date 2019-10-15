#Traitement et texte défilant au - delà de la zone de texte

Lorsque le texte est inséré, il n 'est pas nécessaire de dépasser la zone de texte que nous avons créée.

Paramètres API utilisés dans laya.display.text:

![1](img/1.png)< / BR >

Les caractères qui dépassent le champ de texte ne sont pas affichés.

Aucune décision n'a été prise.

Les pixels de caractères ne sont pas affichés en dehors du champ de texte et l 'interface Scroll est prise en charge.


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


![2](img/2.png)< / BR >
On peut voir des différences dans le traitement de texte entre les trois procédés, chacun ayant ses avantages et ses inconvénients respectifs, les performances étant supérieures à celles de Hidden.

Outre l 'installation d' overflow dans la zone de texte, tous les contenus textuels peuvent être affichés par défilement de texte au moyen d 'images de texte scrollx et scrolly.

Si vous voulez que le texte défile, utilisez le texte Texte texte texte.scroll.text.hidden, vous n 'avez pas d' effet instantané.


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


![3](img/3.png)< / BR >

![4](img/4.png)< / BR >

Ici, Nous afficherons davantage de contenu de texte par le biais du texte défilant, en utilisant trois modes de traitement overflow pour le codage réel en fonction des besoins du projet, ainsi que des versions automatiques de ligne et de défilement pour le traitement du texte.