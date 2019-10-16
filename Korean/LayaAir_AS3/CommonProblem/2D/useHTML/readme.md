#부 텍스트 HtmlDivelment 사용

**프로젝트개발에서는 일반적으로 재래식의 본래의 도문 혼열을 실현할 수 있는 기능을 사용하여 본 문서에서 우리는 몇몇 개발자들의 흔한 문제를 열거한다.**

**1. 같은 텍스트에 볼드, Font, Fontsize, Color, 밑줄을 어떻게 설정합니까?**

**[주목: 현재 사체, 네임, span 태그에 포함된 방식을 지원하지 않습니다!]**

예제가 다음과 같습니다:


```typescript

var div:HTMLDivElement=new HTMLDivElement();
div.innerHTML="<span style='font-weight:bold;" +
  "font:24px Arial' " +
  "color='red' " +
  "href='https://ask.layabox.com/www.baidu.com'>" +
  "LayaBox</span><span>欢迎你的加入</span>"
Laya.stage.addChild(div);
```


**2. 같은 텍스트에 글꼴, 색깔이 다를까?**

예제가 다음과 같습니다:


```typescript

var htmlD:HTMLDivElement = new HTMLDivElement();
Laya.stage.addChild(htmlD);
htmlD.innerHTML = "<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件<br/></font>";
```


**3. html 텍스트의 실제 내용을 어떻게 취득합니까?html 텍스트를 가져오는 실제 크기 (contextWidth, contextHeight)?**

예제가 다음과 같습니다:


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


*4. 텍스트의 수평 정렬 (align 과 width 가 필요합니다), 교환 (< br / 바꿈은 줄 높이 >), 빈칸 (;)?******
****
**[주의: 현재 텍스트의 수직 정렬을 지원하지 않습니다. 개발자는 (그림의 높이 – 텍스트 높이의 높이) / 2의 가치를 텍스트에 주는 Y 수치를 수직 정렬 정렬 정렬 설정]******


示例如下：


```typescript

var html3:HTMLDivElement=new HTMLDivElement();
html3.style.lineHeight=30;
html3.style.width=300;
html3.style.align="center";
html3.innerHTML="<br><span>  测试水平居中对齐</span>";
Laya.stage.addChild(html3);
```
****

**5. 하이퍼링크를 어떻게 실현합니까?******

예제가 다음과 같습니다:


```typescript

var div:HTMLDivElement=new HTMLDivElement();
div.innerHTML="<span href="http://ask.layabox.com/">LayaBox欢迎你的加入！</span>";
div.on(Event.LINK,this,onLink);
Laya.stage.addChild(div);
private function onLink(data:*):void
{
  // TODO Auto Generated method stub
  Browser.window.location.href=data;
}
```
****

**6. 그림을 어떻게 표시합니까?******

예제가 다음과 같습니다:


```typescript

var imageHtml:HTMLDivElement=new HTMLDivElement();
imageHtml.innerHTML="<img src="res/boy.png">";
Laya.stage.addChild(imageHtml);
```
****

**7. html 페이지 다이빙 어떻게 가능할까요?******

예제가 다음과 같습니다:


```typescript

var iHtml:HTMLIframeElement=new HTMLIframeElement();
Laya.stage.addChild(iHtml);
iHtml.href="res/html/test.html";
```
****

**8. 텍스트 내용을 추가하는 appendHtml?******

예제가 다음과 같습니다:


```typescript

var appendHtml:HTMLDivElement=new HTMLDivElement();
appendHtml.innerHTML="<span>AAAAAA</span>";
Laya.stage.addChild(appendHtml);
appendHtml.appendHTML("<br>  BBBBBBBBBB");
appendHtml.layout();
```
****

**9. HtmlDivElement 행렬 간격, leading 속성, 주의, valign='midle'을 설정해야 합니다.******

예제가 다음과 같습니다:


```typescript

var t:HTMLDivElement = new HTMLDivElement ;
Laya.stage.addChild(t);
t.style.valign = "middle";
t.size(60, 120);
t.style.wordWrap = true;
t.style.leading = 10;
t.innerHTML = "akshfkjashfkjhakshjdfhkasjdfhsaf";
```
****

**10. IOS 휴대폰에 알파벳 하의 문제 해결 (style 스타일에 수직으로 수직으로 맞추기 valign:top 속성)*

예제가 다음과 같습니다:


```typescript

var html:HTMLDivElement=new HTMLDivElement();
html.innerHTML = "<span style='color:#ffffff;valign:top;'>朋友abc11''31ABC朋友</span><span href='http://www.baidu.com' target='_blank'>百度</span>";
Laya.stage.addChild(html);
```


