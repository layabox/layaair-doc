#リッチテキストHtml DivElementの使用

**プロジェクト開発においては、富文が本来図文混成を実現する機能が一般的に使われています。この文書では、開発者によくある問題を列挙します。**

**1.Bold、FontSize、Color、下線はどうやって同じテキストに設定しますか？**

**【注意：斜体、エッジ、spanタグ埋め込みは現在サポートされていません】**

例は以下の通りです


```typescript

var div:HTMLDivElement=new HTMLDivElement();
div.innerHTML="<span style='font-weight:bold;" +
  "font:24px Arial' " +
  "color='red' " +
  "href='https://ask.layabox.com/www.baidu.com'>" +
  "LayaBox</span><span>欢迎你的加入</span>"
Laya.stage.addChild(div);
```


**2.どのように同じテキストにフォント、色を設定しますか？**

例は以下の通りです


```typescript

var htmlD:HTMLDivElement = new HTMLDivElement();
Laya.stage.addChild(htmlD);
htmlD.innerHTML = "<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件<br/></font>";
```


**3.htmlテキストの実際の内容はどうやって取得しますか？htmlテキストの実際の幅の高さを取得しますか？**

例は以下の通りです


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


**4.テキストの水平中央揃え(alignはwidthとの併用が必要です)、改行(<br 改行は行の高さが必要です="">)、スペース(;)をどう設定しますか？******
****
**【注意：テキストの縦中央揃えは現在サポートされていません。開発者は、（写真の高さ→テキストの高さ）／2の値をテキストのY値に割り当て、縦中央揃えの代替設定を行います。******


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

**5.ハイパーリンクはどうやって実現しますか？******

例は以下の通りです


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

**6.どのように画像を表示しますか？******

例は以下の通りです


```typescript

var imageHtml:HTMLDivElement=new HTMLDivElement();
imageHtml.innerHTML="<img src="res/boy.png">";
Laya.stage.addChild(imageHtml);
```
****

**7.どのようにしてhtmlページのジャンプを実現しますか？******

例は以下の通りです


```typescript

var iHtml:HTMLIframeElement=new HTMLIframeElement();
Laya.stage.addChild(iHtml);
iHtml.href="res/html/test.html";
```
****

**8.テキストの内容をどう追加しますか？******

例は以下の通りです


```typescript

var appendHtml:HTMLDivElement=new HTMLDivElement();
appendHtml.innerHTML="<span>AAAAAA</span>";
Laya.stage.addChild(appendHtml);
appendHtml.appendHTML("<br>  BBBBBBBBBB");
appendHtml.layout();
```
****

**9.HtmlDivElementの行間隔、leading属性を設定します。valign='middle'を設定しなければならないので注意してください。******

例は以下の通りです


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

**10.IOS携帯の英字が偏っている問題を解決する（styleスタイルに垂直方向に配置するvalign：top属性をプラスする）＊

例は以下の通りです


```typescript

var html:HTMLDivElement=new HTMLDivElement();
html.innerHTML = "<span style='color:#ffffff;valign:top;'>朋友abc11''31ABC朋友</span><span href='http://www.baidu.com' target='_blank'>百度</span>";
Laya.stage.addChild(html);
```


