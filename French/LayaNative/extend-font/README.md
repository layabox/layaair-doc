# 扩展字体


在移动设备中，自带的中文字体一般只有一种，开发者如果想要定制个性化字体，LayaPlayer-0.9.7以后的版本支持通过XMLHttpRequest下载字体，并使用该字体，效果如下图1所示：
![图1](img/1.jpg)


##Mesures de mise en œuvre

Téléchargement des fichiers de police par xmlhtprequest.
Après avoir téléchargé avec succès la police, appeler`conch.setFontFaceFromBuffer("AA",xhr.response);`Cette fonction définit la police, le premier paramètre étant le nom de la police dans le moteur, auquel vous pouvez appeler aa.
Définit la police à utiliser, puis dessine.


Code de réalisation spécifique:


```javascript

var xhr = new XMLHttpRequest();
xhr.responseType = 'arraybuffer';
xhr.open('GET', "layabox.ttf", true);
xhr.onload = function () 
{
	conch.setFontFaceFromBuffer("AA",xhr.response);
    setInterval(onDrawFrame, 15);
};
xhr.onerror = function (e) 
{
	alert('>>>download ttf error :' + e);
};
xhr.send(null);

//这里以html5标准canvas接口为例
function onDrawFrame()
{
    context.save();
    context.font = "normal 100 50px AA 1 #ff0000 1 #00ff00";
	context.fillStyle = "#00ff00";
	context.fillText( "ABC",100,100 );
    context.restore();
}
```


**Tips: il faut attendre que le téléchargement de la police soit terminé et que setfontfacefrombuffer soit installé pour pouvoir l 'utiliser.**






