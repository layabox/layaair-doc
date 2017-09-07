# Handle properly text area  & scrolling text

When text content is added, and exceed the text area dimension, wordwrap may not be enough to handle your entire content.

The API parameter used in Laya.display.text:

![1](img/1.png)</br>

hidden: Do not show characters beyond the text field.

visible: do not make any cuts.

scroll: does not display character pixels outside the text field, and supports the scroll interface.

```typescript
package
{
	import laya.display.Text;
	import laya.webgl.WebGL;
	public class Text_AutoSize
	{
		public function Text_AutoSize()
		{
			// Automatically switch to Canvas when WebGL is not supported
			Laya.init(550, 400, WebGL);
			setup();
		}
		private function setup():void
		{
			var t1:Text = createText();
			//Set without any clipping
			t1.overflow = Text.VISIBLE;
			t1.pos(10, 10);
			var t2:Text= createText();
			//Set the character pixels outside the text field
			t2.overflow = Text.SCROLL;
			t2.pos(10, 110);
			var t3 = createText();
			//The setting does not display characters beyond the text field
			t3.overflow = Text.HIDDEN;
			t3.pos(10, 210);
		}
		private function createText():Text
		{
			var txt:Text= new Text();
			txt.text = 
				"Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
				"Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
				"Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
			txt.borderColor = "#FFFF00";
			//After setting the width and height, the automatic crop will be cut according to this area
			txt.size(300, 50);
			txt.fontSize = 20;
			txt.color = "#ffffff";
			Laya.stage.addChild(txt);
			return txt;
		}
	}
}
```

![2](img/2.png)</br>

You can see the three methods of different text processing, each treatment has its own advantages and disadvantages, highest performance is hidden.

In addition to the text by setting the overflow area, also can use scrollX and scrollY to scroll text viewport.

If you want to implement scrolling text, you need to use overflow = Text.SCROLL

```typescript
package 
{
	import laya.display.Text;
	import laya.events.Event;
	import laya.utils.Browser;
	import laya.webgl.WebGL;
	public class Text_Scroll 
	{
		private var txt:Text;
		private var prevX:Number = 0;
		private var prevY:Number = 0;
		public function Text_Scroll() 
		{
			//  Automatically switch to Canvas when WebGL is not supported
			Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
			createText();
		}
		private function createText():void
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
		/* Start scrolling text */
		private function startScrollText(e:Event):void
		{
			prevX = txt.mouseX;
			prevY = txt.mouseY;
			Laya.stage.on(Event.MOUSE_MOVE, this, scrollText);
			Laya.stage.on(Event.MOUSE_UP, this, finishScrollText);
		}
		/* Stop scrolling text */
		private function finishScrollText(e:Event):void
		{
			Laya.stage.off(Event.MOUSE_MOVE, this, scrollText);
			Laya.stage.off(Event.MOUSE_UP, this, finishScrollText);
		}
		/* Mouse scrolls the text */
		private function scrollText(e:Event):void
		{
			var nowX:Number = txt.mouseX;
			var nowY:Number = txt.mouseY;
			txt.scrollX += prevX - nowX;
			txt.scrollY += prevY - nowY;
			prevX = nowX;
			prevY = nowY;
		}
	}
}
```

![3](img/3.png)</br>

![4](img/4.png)</br>

In current code sample, Here we display more text content with scrolling text and word wrap.
