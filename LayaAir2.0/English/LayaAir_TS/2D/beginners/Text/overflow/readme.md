#Processing beyond Text Area-Scrolling Text

When adding content, the text can't help but go beyond the text area we set. At this time, we need to process the text. Otherwise, the content may go beyond our stage.

API parameters used in Laya. display. text:

![1](img/1.png)</br>

Hidden: Does not display characters beyond the text field.

Visible: No cutting.

Scroll: Does not display character pixels outside the text domain, and supports scroll interfaces.


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;

    export class HelloLayabox {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(600, 300, WebGL);
 
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
 
            Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
            Laya.stage.bgColor = "#232628";

            this.createTexts();
        }

        private createTexts(): void {
            var t1: Text = this.createText();
            t1.overflow = Text.VISIBLE;
            t1.pos(10, 10);
 
            var t2: Text = this.createText();
            t2.overflow = Text.SCROLL;
            t2.pos(10, 110);

            var t3: Text = this.createText();
            t3.overflow = Text.HIDDEN;
            t3.pos(10, 210);
        }

        private createText(): Text {
            var txt: Text = new Text();
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
    }
}
new laya.HelloLayabox();
```


![2](img/2.png)</br>

It can be seen that there are three different methods for text processing, each of which has its own advantages and disadvantages, and the highest performance ratio is hidden.

In addition to setting overflow for text area, scrollX and scrollY can be used to scroll the text viewport and display the whole text content by scrolling the text.

If you want to scroll text, you need to use overflow = Text. SCROLL to use Text. HIDDEN, even if you set scrolling, it will not work.


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import Event = Laya.Event;
    import Browser = Laya.Browser;
    import WebGL = Laya.WebGL;
    export class HelloLayabox {
      private txt: Text;
      private prevX: number = 0;
      private prevY: number = 0;
   constructor(){
        // 不支持WebGL时自动切换至Canvas
      Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL); 

      Laya.stage.alignV = Stage.ALIGN_MIDDLE;
      Laya.stage.alignH = Stage.ALIGN_CENTER;

      Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
      Laya.stage.bgColor = "#232628";

      this.createText();
}
    private createText(): void {
     this.txt = new Text();
     this.txt.overflow = Text.SCROLL;
     this.txt.text =
      "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +

      "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +

      "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +

      "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +

      "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +

	  "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";

	   this.txt.size(200, 100);

  	   this.txt.x = Laya.stage.width - this.txt.width >> 1;
       this.txt.y = Laya.stage.height - this.txt.height >> 1;

       this.txt.borderColor = "#FFFF00";
       this.txt.fontSize = 20;

       this.txt.color = "#ffffff";
	   Laya.stage.addChild(this.txt);

 	   this.txt.on(Event.MOUSE_DOWN, this, this.startScrollText);

}

        /* 开始滚动文本 */
        private startScrollText(e: Event): void {

	    this.prevX = this.txt.mouseX;
 	    this.prevY = this.txt.mouseY;

	    Laya.stage.on(Event.MOUSE_MOVE, this, this.scrollText);
	    Laya.stage.on(Event.MOUSE_UP, this, this.finishScrollText);

}
        /* 停止滚动文本 */

   private finishScrollText(e: Event): void {

	    Laya.stage.off(Event.MOUSE_MOVE, this, this.scrollText);
	    Laya.stage.off(Event.MOUSE_UP, this, this.finishScrollText);

}
        /* 鼠标滚动文本 */

    private scrollText(e: Event): void {
   		var nowX: number = this.txt.mouseX;
    	var nowY: number = this.txt.mouseY;

    	this.txt.scrollX += this.prevX - nowX;
    	this.txt.scrollY += this.prevY - nowY;

    	this.prevX = nowX;
    	this.prevY = nowY;
      }
   }
}
new laya.HelloLayabox();
```


![3](img/3.png)</br>



![4](img/4.png)</br>

Here we show more text content by scrolling text. In actual coding, overflow is used in three ways according to the needs of the project. There are also automatic line breaking and scrolling text to process the text.