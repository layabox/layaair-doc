#캡처

프로젝트 개발 과정에서 캡처할 수 있는 수요가 종종 있습니다. 예를 들면: 화면의 내용을 공유하거나 두 번 그립니다.

###1. 캡처 함수

캡처 함수는 LayaPlayer 특유의 함수, 모든 필요는 conch 대상을 통해 호출할 수 있으며, 코드:

```javascript

if( window.conch )
{
    window.conch.captureScreen(function(arrayBuff,width,height){

    }
}
```

**함수 설명**captureScreen 은 메아리 함수에 포함되어 있으며, 메아리 함수는 세 개의 인자, 각각 이미지 아이mageData, 유형은 arrayBuffer, 그림의 넓이와 높습니다.

**Tips**  
*1、conch只能LayaPlayer环境下调用，在网页版本中是没有conch定义的，所有需要判断一下是否存在。*  
*2. as 언어를 사용하면 통과할 수 있다`Browser.window['conch'] `이런 방식은 conch 대상을 받는다.*

###2. 그림 함수 저장

화면을 캡처한 회수 회수 조정 후 conch 의 saveAspng을 통해 그림 저장에 저장할 수 있으며, 구체적인 함수는 다음과 같습니다.


```javascript

conch.saveAsPng( arrayBuff,width,height,conch.getCachePath()+"/test.png" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.png";
```

LayaNative-0.9.13 이후 conch 의 saveAspeg을 통해 그림을 저장할 수 있으며 구체적인 함수는 다음과 같습니다:


```javascript

conch.saveAsJpeg( arrayBuff,width,height,conch.getCachePath()+"/test.jpg" );
//存储后便可以通过 file:///的方式直接进行访问了
var image = window.document.createElement("img");
image.onload=function()
{	
	
}
image.src="file:///" + conch.getCachePath()+"/test.jpg";
```



**함수 설명**saveAspeg 및 saveAsPng 은 3개의 인자를 불러올 수 있으며, 첫 번째는 아이mageData 데이터, 둘째, 세 개의 인자가 각각 넓고 높고, 세 번째 인자가 전체 경로와 파일 이름을 저장합니다.

**Tips**：
*메모리 의 완전한 경로 를 개발자 는 자신 의 수요 에 따라 기입할 수 있지만, 반드시 경로가 정확하고, 코드 실례 중 에 통과하여 통과할 수 있다`conch.getCachePath()`이 프로그램의 캐시 디렉터리가 저장된 디렉터리입니다.*


###3. putImageData 를 통해 그림을 생성한다
화면을 캡처한 후 로컬 이미지를 저장할 수 있는 것 외에도 putImageData 의 방식을 통해 imageData 데이터 put 을 image 대상에서 코드를 아래와 같이 할 수 있습니다:

```javascript

var image = window.document.createElement("img");
image.putImageData(arrayBuff,width,height);
```

**함수 설명**putImagedata 함수는 세 개의 인자가 필요합니다. 각각 2진제 데이터, 그림의 폭, 높다.

**Tips**  
*putImage Data 함수는 동기 함수, putImageData 후 아이mage를 사용할 수 있으며, onload 함수를 기다릴 필요가 없습니다*
###4. 형식 변환 함수
LayaNative-0.9.13 이후에 캡처한 후 그림의 ImageData 데이터를 jpg 또는 png 형식으로 바꿀 수 있으며 코드가 다음과 같습니다:

```javascript

var jpg = conch.convertBitmapToJpeg(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.jpg", jpg);//保存到本地或者其他操作

var png = conch.convertBitmapToPng(arrayBuff,width,height);
window.fs_writeFileSync(conch.getCachePath()+"/test.png", png);//保存到本地或者其他操作
```

###5. 단순 코드 실례


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

