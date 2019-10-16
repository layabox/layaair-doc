#텍스트 영역을 뛰어넘는 처리 & 스크롤 텍스트

텍스트는 내용을 첨가할 때 우리가 설치한 텍스트 영역을 벗어나지 않을 수 없습니다. 이때 우리는 텍스트 처리를 해야 합니다. 처리를 하지 않으면 내용이 우리의 무대를 넘어설 수 있습니다.

Laya.display.text 에서 사용하는 API 인자:

![1](img/1.png)</br>>

hidden: 텍스트 영역의 문자를 표시하지 않습니다.

visible:아무것도 재단하지 않습니다.

scroll: 텍스트 역외 문자 픽셀을 표시하지 않고 scroll 인터페이스를 지원합니다.


```typescript

//初始化引擎,不支持WebGL时自动切换到Canvas
Laya.init(500,400,Laya.WebGL);
setup();
function setup(){
    var t1 = createText();
    //设置不进行任何裁剪
    t1.overflow = Laya.Text.VISIBLE;
    t1.pos(10,10);

    var t2 = this.createText();
    //设置不显示文本区域外的字符像素
    t2.overflow = Laya.Text.SCROLL;
    t2.pos(10,110);

    var t3 = this.createText();
    //设置不显示超出文本域的字符
    t3.overflow = Laya.Text.HIDDEN;
    t3.pos(10,210);
}
function createText(){
    var txt = new Laya.Text();
    txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
    txt.borderColor = "#ffff00";
    //设置宽高以后的自动裁剪会按照这个区域裁剪
    txt.size(300,50);
    txt.fontSize = 20;
    txt.color = "#ffffff";
    Laya.stage.addChild(txt);
    return txt;
}
```


![2](img/2.png)</br>>
3가지 방법을 볼 수 있는 텍스트 처리에 따라 모든 처리가 각자의 장단점이 있고 성능이 가장 높은 히든이다.

텍스트 영역에 overflow 설정을 통하여 scrollX 와 scrolly를 사용하여 텍스트를 스크롤러치할 수 있습니다.

스크롤 텍스트를 실현하려면 overflow = Text.SCROL이 Text.HIDDEN 을 사용하면 스크롤을 설치해도 효과가 없다.


```typescript

//初始化引擎,不支持WebGL时自动切换到Canvas
Laya.init(500,400,Laya.WebGL);
createText();
function createText(){
    this.txt = new Laya.Text();
    this.txt.overflow = Laya.Text.SCROLL;
    this.txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
    "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
    this.txt.size(200,100);
    this.txt.x = Laya.stage.width - this.txt.width>>1;
    this.txt.y = Laya.stage.height - this.txt.height>>1;
    this.txt.borderColor = "#ffff00";
    this.txt.fontSize = 20;
    this.txt.color = "#ffffff";
    Laya.stage.addChild(this.txt);
    this.txt.on(Laya.Event.MOUSE_DOWN,this,startScrollText);
}
/*开始滚动文本*/
function startScrollText(){
    this.prevX = this.txt.mouseX;
    this.prevY = this.txt.mouseY;
    Laya.stage.on(Laya.Event.MOUSE_MOVE,this,scrollText);
    Laya.stage.on(Laya.Event.MOUSE_UP,this,finishScrollText);
}
/* 停止滚动文本 */
function finishScrollText()
{
    Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
    Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
}
/* 鼠标滚动文本 */
function scrollText()
{
    var nowX = this.txt.mouseX;
    var nowY = this.txt.mouseY;
    this.txt.scrollX += this.prevX - nowX;
    this.txt.scrollY += this.prevY - nowY;
    this.prevX = nowX;
    this.prevY = nowY;
}
```


![3](img/3.png)</br>>

![4](img/4.png)</br>>

스크롤 텍스트를 통해 더 많은 텍스트 내용을 보여 줍니다. 실제 인코딩에 따라 항목에 따라 overflow 의 3가지 처리 방식을 사용하고, 자동으로 바꾸고 스크롤 텍스트를 텍스트에 처리할 수 있습니다.