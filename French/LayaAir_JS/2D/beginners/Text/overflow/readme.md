#Traitement et texte défilant au - delà de la zone de texte

Lorsque le texte est inséré, il n 'est pas nécessaire de dépasser la zone de texte que nous avons créée.

Paramètres API utilisés dans laya.display.text:

![1](img/1.png)< / BR >

Les caractères qui dépassent le champ de texte ne sont pas affichés.

Aucune décision n'a été prise.

Les pixels de caractères ne sont pas affichés en dehors du champ de texte et l 'interface Scroll est prise en charge.


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


![2](img/2.png)</br>

On peut voir des différences dans le traitement de texte entre les trois procédés, chacun ayant ses avantages et ses inconvénients respectifs, les performances étant supérieures à celles de Hidden.

Outre l 'installation d' overflow dans la zone de texte, tous les contenus textuels peuvent être affichés par défilement de texte au moyen d 'images de texte scrollx et scrolly.

Si vous voulez que le texte défile, utilisez le texte Texte texte texte.scroll.text.hidden, vous n 'avez pas d' effet instantané.


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


![3](img/3.png)< / BR >

![4](img/4.png)< / BR >

Ici, Nous afficherons davantage de contenu de texte par le biais du texte défilant, en utilisant trois modes de traitement overflow pour le codage réel en fonction des besoins du projet, ainsi que des versions automatiques de ligne et de défilement pour le traitement du texte.