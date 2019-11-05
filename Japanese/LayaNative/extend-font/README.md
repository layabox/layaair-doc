# 扩展字体

モバイル機器では、中国語のフォントは普通1つしかないです。開発者がカスタマイズしたいならば、LayaPlayer-00.97以降のバージョンはXMLHttpRequestでフォントをダウンロードして、このフォントを使って、効果は下図1の通りです。
![图1](img/1.jpg)


##ステップを実行

1、XMLHttpRequestを通じてアラビバフでフォントファイルをダウンロードします。
2、フォントのダウンロードが成功したら、呼び出します。`conch.setFontFaceFromBuffer("AA",xhr.response);`この関数はフォントを設定します。最初のパラメータはエンジンのフォント名です。ここではAAと名前をつけてください。
3、このフォントを使って描画するように設定します。


具体的な実現コード：


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


**TIPS：フォントのダウンロードが完了するのを待って、set Font FaceFroomBufferを設置してこそ、このフォントを使うことができます。**






