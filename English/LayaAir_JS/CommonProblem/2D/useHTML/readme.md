# Use of rich text HtmlDivElement

**In the project development are usually used to achieve rich text by mixed function in this document lists some common problems to our developers.**

**1. How to set up Bold, Font, FontSize, Color, underline in the same text?**

** [Note: italics, strokes, and span tags are not currently supported] **

The examples are as follows :

```typescript
var div:HTMLDivElement=new HTMLDivElement();
div.innerHTML="<span style='font-weight:bold;" +
  "font:24px Arial' " +
  "color='red' " +
  "href='https://ask.layabox.com/www.baidu.com'>" +
  "LayaBox</span><span>欢迎你的加入</span>"
Laya.stage.addChild(div);
```

**2. How to set the font in the same text, different colors ?**

The examples are as follows:

```typescript
var htmlD:HTMLDivElement = new HTMLDivElement();
Laya.stage.addChild(htmlD);
htmlD.innerHTML = "<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件<br/></font>";
```

**3. How to get the actual content of html text? Get the actual height of html text（contextWidth、contextHeight）?**

The examples are as follows :

```typescript
var htmlDiv:HTMLDivElement=new HTMLDivElement();
			var html:String = "<span color='#e3d26a'>使用</span>";
			html += "<span style='color:#FFFFFF;font-weight:bold'>HTMLDivElement</span>";
			html += "<span color='#6ad2e3'>创建的</span><br/>";
			html += "<span color='#d26ae3'>HTML文本</span>";
			htmlDiv.innerHTML=html;
			htmlDiv.pos(50,200);
			var txt:String = "";
			var tTxt:String;
			var tHTMLElement:HTMLElement;
			for(var i:int = 0,n:int = htmlDiv._childs.length;i < n;i++)
			{
				tHTMLElement = htmlDiv.getChildAt(i) as HTMLElement;
				if(tHTMLElement)
				{
					tTxt= tHTMLElement.text;
					if(tTxt)
					{
						txt += tTxt;
					}
				}
			}
			trace("文本内容为"+txt);
			trace("文本的实际宽度为"+htmlDiv.contextWidth,"文本的实际高度为"+htmlDiv.contextHeight)
			Laya.stage.addChild(htmlDiv);
```

**4. How to set up the horizontal alignment of the text (align needs to be used with width), change line (<br/ Line breaks need to have line height >)、Space _(;)？**

** [Note: Currently, vertical alignment of the text is not supported. The developer can assign the value of  (the height of the image - the height of the text) / 2 to the Y value of the text, and center it vertically to replace it.] **

Here is an example :

```typescript
var html3:HTMLDivElement=new HTMLDivElement();
html3.style.lineHeight=30;
html3.style.width=300;
html3.style.align="center";
html3.innerHTML="<br/><span>  测试水平居中对齐</span>";
Laya.stage.addChild(html3);
```

**5. How to implement hyperlinks ? **

The examples are as follows :

```typescript
var div:HTMLDivElement=new HTMLDivElement();
div.innerHTML="<span href='http://ask.layabox.com/'>LayaBox欢迎你的加入！</span>";
div.on(Event.LINK,this,onLink);
Laya.stage.addChild(div);
private function onLink(data:*):void
{
  // TODO Auto Generated method stub
  Browser.window.location.href=data;
}
```

**6. How to display the picture ?**

The examples are as follows : 

```typescript
var imageHtml:HTMLDivElement=new HTMLDivElement();
imageHtml.innerHTML="<img src='res/boy.png'></img>";
Laya.stage.addChild(imageHtml);
```

**7. How to achieve HTML page Jump ?**

The examples are as follows : 

```typescript
var iHtml:HTMLIframeElement=new HTMLIframeElement();
Laya.stage.addChild(iHtml);
iHtml.href="res/html/test.html";
```

**8. How to add text content appendHtml ？**

The examples are as follows :

```typescript
var appendHtml:HTMLDivElement=new HTMLDivElement();
appendHtml.innerHTML="<span>AAAAAA</span>";
Laya.stage.addChild(appendHtml);
appendHtml.appendHTML("<br/>  BBBBBBBBBB");
appendHtml.layout();
```

**9.Setting line spacing for HtmlDivElement, leading property, attention, must be set valign='top'**

The examples are as follows :

```typescript
var t:HTMLDivElement = new HTMLDivElement ;
Laya.stage.addChild(t);
t.style.valign = "middle";
t.size(60, 120);
t.style.wordWrap = true;
t.style.leading = 10;
t.innerHTML = "akshfkjashfkjhakshjdfhkasjdfhsaf";
```

**10. Solve the problem of the English alphabet on the IOS cell phone（with the vertical alignment of the valign:top attributes in the style style）**

The examples are as follows :

```typescript
var html:HTMLDivElement=new HTMLDivElement();
html.innerHTML = "<span style='color:#ffffff;valign:top;'>朋友abc11''31ABC朋友</span><span href='http://www.baidu.com' target='_blank'>百度</span>";
Laya.stage.addChild(html);
```

