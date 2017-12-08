
# Extended fonts

In mobile devices, there is only one native Chinese font available. If developers want to customize personalized fonts, LayaPlayer-0.9.7 and later versions supports downloading font via XMLHttpRequest, and using this font, the effect is shown below in Figure 1:
![图1](img/1.jpg)


## Implementation steps

1. Through the XMLHttpRequest arraybuffer to download the font file. 
2. After the success of the font download, call `conch.setFontFaceFromBuffer("AA",xhr.response);` function sets the font, the first parameter is the name of the font in the engine, arbitrarily named AA here.
3. Set use of the font, and then draw.


Concrete realization of the code:

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

**TIPS：When you have to wait for the font download to be completed, you set up the setFontFaceFromBuffer to use the font.**






