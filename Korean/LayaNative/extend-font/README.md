# 扩展字体

이동 장치에서 사용자의 중국어 글꼴은 일반적으로 개인화 글꼴을 설정하려면 LayaPlayer-0.9.7 이후의 버전 지원은 XMLHttpRequest 글꼴을 다운로드하고, 이 글꼴을 사용하면 다음 그림 1에 효과가 나타납니다.
![图1](img/1.jpg)


##절차를 실현하다

1, XMLHttpRequest 를 통해 arraybuffer 를 다운로드하는 방식으로 글꼴 파일을 다운로드합니다.
2, 글꼴 다운로드 성공 후 호출`conch.setFontFaceFromBuffer("AA",xhr.response);`이 함수는 글꼴을 설정하고, 첫 번째 인자가 엔진에 있는 글꼴 이름으로, 이 마음대로 AAA로 이름을 지었다.
3. 이 글꼴을 사용하여 그립니다.


구체적으로 코드 실현:


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


**TIPS: 글꼴 다운로드가 완료되면 세트FontFaceFromBuffer를 설치해야 이 글꼴을 사용할 수 있습니다.**






