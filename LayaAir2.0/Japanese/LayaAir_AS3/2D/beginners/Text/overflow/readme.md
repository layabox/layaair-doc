#テキスト範囲外の処理&スクロールテキスト

テキストは内容を追加する時、私達が設定したテキストエリアを超えてはいけません。この時テキストを処理します。処理しないと内容が私達の舞台を超えるかもしれません。

Laya.display.textで使用されるAPIパラメータ：

![1](img/1.png)<br/>

hidden:テキスト領域を超えた文字は表示されません。

visible:いかなる裁断も行いません。

scroll:テキスト域外の文字画素を表示せず、scrollインターフェースをサポートします。


```typescript

package
{
	import laya.display.Text;
	import laya.webgl.WebGL;
	public class Text_AutoSize
	{
		public function Text_AutoSize()
		{
			// 不支持WebGL时自动切换至Canvas
			Laya.init(550, 400, WebGL);
			setup();
		}
		private function setup():void
		{
			var t1:Text = createText();
			//设置不进行任何裁剪
			t1.overflow = Text.VISIBLE;
			t1.pos(10, 10);
			var t2:Text= createText();
			//设置不显示文本域外的字符像素
			t2.overflow = Text.SCROLL;
			t2.pos(10, 110);
			var t3 = createText();
			//设置不显示超出文本域的字符
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
			//设置宽高以后自动裁剪会按照这个区域裁剪
			txt.size(300, 50);
			txt.fontSize = 20;
			txt.color = "#ffffff";
			Laya.stage.addChild(txt);
			return txt;
		}
	}
}
```


![2](img/2.png)<br/>

3つの方法のテキスト処理の違いが見られます。それぞれの処理にはそれぞれの長所と短所があります。性能が一番高いのはやはりhiddenです。

テキスト領域にoverflowを設定するだけでなく、scrollXとscrollyを使ってテキストビューをスクロールさせ、テキストをスクロールさせることによってすべてのテキスト内容を表示することもできます。

スクロールテキストを実現するにはoverflow=Text.SCROLLを使ってText.HIDDENを使う必要があります。すぐにスクロールを設定しても効果がありません。


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
			// 不支持WebGL时自动切换至Canvas
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
		/* 开始滚动文本 */
		private function startScrollText(e:Event):void
		{
			prevX = txt.mouseX;
			prevY = txt.mouseY;
			Laya.stage.on(Event.MOUSE_MOVE, this, scrollText);
			Laya.stage.on(Event.MOUSE_UP, this, finishScrollText);
		}
		/* 停止滚动文本 */
		private function finishScrollText(e:Event):void
		{
			Laya.stage.off(Event.MOUSE_MOVE, this, scrollText);
			Laya.stage.off(Event.MOUSE_UP, this, finishScrollText);
		}
		/* 鼠标滚动文本 */
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


![3](img/3.png)<br/>

![4](img/4.png)<br/>

ここでは、テキストをスクロールしてより多くのテキスト内容を表示し、実際のコードの中で項目によってはoverflowの3つの処理方法を使い、自動的に改行したり、テキストをスクロールしたりしてテキストを処理します。