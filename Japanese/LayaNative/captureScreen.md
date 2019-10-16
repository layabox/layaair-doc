#スクリーン

プロジェクト開発の過程でスクリーンショットの需要がよくあります。例えば、スクリーン上のコンテンツを切り取って共有したり、二回描画したりします。

###1.スクリーン機能

スクリーン機能はLayaPlayer特有の関数であり、すべてはconchオブジェクトを通じて呼び出す必要があります。コードは以下の通りです。

```javascript

if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){

    }
}
```

**関数の説明**：captureScreenはコールバック関数に入る必要があります。コールバック関数は3つのパラメータがあります。それぞれ画像ImageDataです。タイプはarrayBufferで、画像の幅と高さです。

**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*2、as言語を使って開発する場合は、`Browser.window['conch'] `このようにしてconchオブジェクトを取得します。*

###2.画像の保存関数

スクリーンのコールバック関数がコールバックした後、conchのsaveAspongを通じて画像をローカルに保存できます。具体的な関数は以下の通りです。


```javascript

conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.png";
```

LayaNative-00.93以降は、conchのsaveAsJpegを通じて写真をローカルに保存することもできます。具体的な関数は以下の通りです。


```javascript

conch.saveAsJpeg( arrayBuff,width,height,conch.getCachePath()+"/test.jpg" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.jpg";
```



**関数の説明**：saveAsJpegとsaveAsplangは三つのパラメータに入る必要があります。一番目のパラメータはピクチャのImageDataデータです。二つ目、三つ目のパラメータはそれぞれ幅と高さで、三つ目のパラメータは完全な経路とファイル名を格納するためです。

**Tips**:
*保存された完全なパスは、開発者が自分のニーズに応じて記入することができますが、パスが正しいことを保証しなければなりません。`conch.getCachePath()`このアプリケーションが取得されたキャッシュディレクトリは、記憶ディレクトリである。*


###3.直接putImageDataで画像を生成する
スクリーンショット後は画像をローカルに保存できるほか、イメージデータをイメージオブジェクトには、以下のようにput ImageDataで保存することができます。

```javascript

var image = window.document.createElement("img");
image.putImageData(arrayBuff,width,height);
```

**関数の説明**：putImageData関数は、バイナリデータ、ピクチャの幅、高さの三つのパラメータが必要です。

**Tips**  
*putImageData函数是同步函数，putImageData后可直接使用image，不需要等待onload函数*
###4.フォーマット変換関数
LayaNative-00.93以降、スクリーンショット後、画像のImageDataデータをjpgまたはpng形式に変換できます。コードは以下の通りです。

```javascript

var jpg = conch.convertBitmapToJpeg(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.jpg", jpg);//保存到本地或者其他操作

var png = conch.convertBitmapToPng(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.png", png);//保存到本地或者其他操作
```

###5.シンプルコードの例


```javascript

if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){
        /*
        //存储文件的方式
        conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
        window.globalImage = window.document.createElement("img");
		window.globalImage.onload=function()
		{
			...使用image对象
		}
		window.globalImage.src = "file:///" + conch.getCachePath()+"/test.png";
        */

        //
        window.image = window.document.createElement("img");
        image.putImageData(arrayBuff,width,height);
        //...使用image对象
    }
}

```

