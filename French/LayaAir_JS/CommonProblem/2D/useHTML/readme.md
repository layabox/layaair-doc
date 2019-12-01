#Utilisation de HTML divelement en texte riche

**Dans ce document, nous énumérons les problèmes communs aux concepteurs.**

**Comment placer bold, font, fontsize, color et soulignement dans le même texte?**

**Remarque: pour l 'instant, il n' y a pas de support pour l 'intégration des étiquettes italiques, de bordure ou span.**

Voici quelques exemples:


```typescript

var div=new Laya.HTMLDivElement();
div.innerHTML="<span style='font-weight:bold;" +
  "font:24px Arial' " +
  "color='red' " +
  "href='https://ask.layabox.com/www.baidu.com'>" +
  "LayaBox</span><span>欢迎你的加入</span>"
```


**Comment les polices et les couleurs sont - elles différentes dans le même texte?**

Voici quelques exemples:


```typescript

var htmlD = new Laya.HTMLDivElement();
Laya.stage.addChild(htmlD);
htmlD.innerHTML = "<font style='fontSize:30' color='#67fc2c'>测试<br/></font><font style='fontSize:20'>html组件<br/></font>";
```


**Comment obtenir le contenu concret du texte html?(contextwidth, contextheight)?**

Voici quelques exemples:


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


* * 4.******
****
**Remarque: l 'alignement vertical central du texte n' est pas actuellement supporté, l 'développeur peut attribuer la valeur (hauteur de l' image - hauteur du texte) / 2 à la valeur y du texte et effectuer un réglage de remplacement de l 'alignement vertical central.******

Voici quelques exemples:


```typescript

var html3 = new Laya.HTMLDivElement();
html3.style.lineHeight = 30;
html3.style.width = 300;
html3.style.align = "center";
html3.innerHTML = "<br><span>  测试水平居中对齐</span>";
Laya.stage.addChild(html3);
```
****

**Comment établir des hyperliens?******


示例如下：


```typescript

Laya.stage.bgColor = "#ffcccc";
var div=new Laya.HTMLDivElement();
div.innerHTML="<span href="http://ask.layabox.com/">LayaBox欢迎你的加入！</span>";
div.on(Laya.Event.LINK,this,onLink);
Laya.stage.addChild(div);
function onLink(data)
{
  // TODO Auto Generated method stub
  Laya.Browser.window.location.href=data;
}
```
****

**Comment les images peuvent - elles être présentées?******

Voici quelques exemples:


```typescript

var imageHtml=new Laya.HTMLDivElement();
imageHtml.innerHTML="<img src="res/boy.png">";
Laya.stage.addChild(imageHtml);
```
****

**Comment réaliser le saut de page HTML?******

Voici quelques exemples:


```typescript

var iHtml=new Laya.HTMLIframeElement();
Laya.stage.addChild(iHtml);
iHtml.href="res/html/test.html";
```
****

**Comment ajouter le texte appendhtml?******

Voici quelques exemples:


```typescript

var appendHtml=new Laya.HTMLDivElement();
appendHtml.innerHTML="<span>AAAAAA</span>";
Laya.stage.addChild(appendHtml);
appendHtml.appendHTML("<br>  BBBBBBBBBB");
appendHtml.layout();
```
****

**Espacement des lignes pour htmldivelement, attributs de Leading, attention à la nécessité de définir la valeur = 'Middle'.******

Voici quelques exemples:


```typescript

var t = new Laya.HTMLDivElement ;
Laya.stage.addChild(t);
t.style.valign = "middle";
t.size(60, 120);
t.style.wordWrap = true;
t.style.leading = 10;
t.innerHTML = "akshfkjashfkjhakshjdfhkasjdfhsaf";
```
****

**10.解决IOS手机上英文字母偏下的问题（在style样式中加垂直向上对齐valign:top属性）**

Voici quelques exemples:


```typescript

var html=new Laya.HTMLDivElement();
html.innerHTML = "<span style='color:#ffffff;valign:top;'>朋友abc11''31ABC朋友</span><span href='http://www.baidu.com' target='_blank'>百度</span>";
Laya.stage.addChild(html);
```


