# 富文本HtmlDivElement的使用

**在项目开发中通常会使用到富文本来实现图文混排的功能，在本篇文档中我们来列出一些开发者常见的问题。**

**1.如何在同一个文本中设置Bold、Font、FontSize、Color、下划线？**

**【注意：目前不支持斜体、描边、span标签内嵌的方式】**

示例如下：

```typescript
var div=new Laya.HTMLDivElement();
div.innerHTML="<span style='font-weight:bold;" +
  "font:24px Arial' " +
  "color='red' " +
  "href='https://ask.layabox.com/www.baidu.com'>" +
  "LayaBox</span><span>欢迎你的加入</span>"
```

**2.如何在同一个文本中设置字体、颜色不同？**

示例如下：

```typescript
var htmlD = new Laya.HTMLDivElement();
Laya.stage.addChild(htmlD);
htmlD.innerHTML = "<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件<br/></font>";
```

**3.如何获取html文本的实际内容？获取html文本的实际宽高（contextWidth、contextHeight）?**

示例如下：

```typescript
var htmlDiv = new Laya.HTMLDivElement();
var html = "<span color='#e3d26a'>使用</span>";
html += "<span style='color:#FFFFFF;font-weight:bold'>HTMLDivElement</span>";
html += "<span color='#6ad2e3'>创建的</span><br/>";
html += "<span color='#d26ae3'>HTML文本</span>";
htmlDiv.innerHTML = html;
htmlDiv.pos(50, 200);
var txt = "";
for (var i = 0, n = htmlDiv._childs.length; i < n; i++) {
    this.tHTMLElement = htmlDiv.getChildAt(i);
    if (this.tHTMLElement) {
        tTxt = this.tHTMLElement.text;
        if (tTxt) {
            txt += tTxt;
        }
    }
}
console.log("文本内容为" + txt);
console.log("文本的实际宽度为" + htmlDiv.contextWidth, "文本的实际高度为" + htmlDiv.contextHeight)
Laya.stage.addChild(htmlDiv);
```

**4.如何设置文本的水平居中对齐(align需要和width配合使用)、换行(<br/换行需要有行高>)、空格_(;)？**

**【注意：目前不支持文本的垂直居中对齐，开发者可以将(图片的高度-文本的高度)/2的值赋给文本的Y值，进行垂直居中对齐替代设置】**

示例如下：

```typescript
var html3 = new Laya.HTMLDivElement();
html3.style.lineHeight = 30;
html3.style.width = 300;
html3.style.align = "center";
html3.innerHTML = "<br/><span>  测试水平居中对齐</span>";
Laya.stage.addChild(html3);
```

**5.如何实现超链接？**

示例如下：

```typescript
Laya.stage.bgColor = "#ffcccc";
var div=new Laya.HTMLDivElement();
div.innerHTML="<span href='http://ask.layabox.com/'>LayaBox欢迎你的加入！</span>";
div.on(Laya.Event.LINK,this,onLink);
Laya.stage.addChild(div);
function onLink(data)
{
  // TODO Auto Generated method stub
  Laya.Browser.window.location.href=data;
}
```

**6.如何显示图片？**

示例如下：

```typescript
var imageHtml=new Laya.HTMLDivElement();
imageHtml.innerHTML="<img src='res/boy.png'></img>";
Laya.stage.addChild(imageHtml);
```

**7.如何实现html页面跳转？**

示例如下：

```typescript
var iHtml=new Laya.HTMLIframeElement();
Laya.stage.addChild(iHtml);
iHtml.href="res/html/test.html";
```

**8.如何追加文本内容appendHtml？**

示例如下：

```typescript
var appendHtml=new Laya.HTMLDivElement();
appendHtml.innerHTML="<span>AAAAAA</span>";
Laya.stage.addChild(appendHtml);
appendHtml.appendHTML("<br/>  BBBBBBBBBB");
appendHtml.layout();
```

**9.为HtmlDivElement设置行间距，leading属性，注意，必须设置valign='top'**

示例如下：

```typescript
var t = new Laya.HTMLDivElement ;
Laya.stage.addChild(t);
t.style.valign = "middle";
t.size(60, 120);
t.style.wordWrap = true;
t.style.leading = 10;
t.innerHTML = "akshfkjashfkjhakshjdfhkasjdfhsaf";
```

**10.解决IOS手机上英文字母偏下的问题（在style样式中加垂直向上对齐valign:top属性）**

示例如下：

```typescript
var html=new Laya.HTMLDivElement();
html.innerHTML = "<span style='color:#ffffff;valign:top;'>朋友abc11''31ABC朋友</span><span href='http://www.baidu.com' target='_blank'>百度</span>";
Laya.stage.addChild(html);
```

