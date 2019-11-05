##사진과 2진

페이지 유휴 시대에는 자원이 도출되는 것을 방지하기 위해 일반적인 방법은 그림 등 자원을 암호화하는 것이다.암호화란 자원의 본래의 기억 바이트를 혼란시키거나, 약간의 물건을 삽입하는 것이다.그러나 html5 시대가 되면 기본적으로 바로 가재된 그림인데 왜 페이지 시대와 다르지?html5 가 아니라 디코딩 디코딩 바이너로 불러올 수 없나요?물론 아니다.이 단계를 암호화하지 않는 것은 주로 우리 프로젝트의 원코드가 브라우저 엔드에 완전히 노출돼 비밀이 없다. 암호화되어도 스크립트 실행 후에는 너의 원코드를 받을 수 있다.하지만 개발자의 요구를 충족시키기 위해, html5 는 어떻게 이진제 사진을 조작할 것인지를 간단히 말해 보자.

###할 수 없는 XMLHttpRequest

파일을 불러오기 시작하면 어쩔 수 없이 말하는 것은`XMLHttpRequest`여기에서 우리는 간단히 소개하고 자세한 교정을 옮겨 주십시오`HttpRequest`장절.XMLHttpRequest 는 브라우저의 인터페이스와 HTTP (S) 통신이 가능합니다.이것이 우리가 자주 언급하는 Ajax 의 핵심이다.XMLHttpRequest 표준은 Level1 과 Level2 로 나뉜다.이곳은 html5 의 범위로, 그래서 Level1 이 우리의 의미가 크지 않아, Html4, Html5, 우리가 주로 주목하는 것은 Level2.개발자 를 위해 우리 팀 의 두 표준 을 이해하기 위해 대비 하 다.

​**Level1 의 주요 단점:**

-동원적 전략의 제한을 받고, 다역 요청을 보낼 수 없습니다;

-바이너리 파일을 보낼 수 없습니다 (# 그림, 영상, 오디오 등), 순수 텍스트 데이터를 보내는 것만 보낼 수 있습니다;

- 발송과 데이터 가져오는 과정에서 실시간 진행 정보를 찾을 수 없음을 판단할 수 있습니다;


   **Level2 가 Level1 에 대한 개선 장소:**

- 다역 요청을 보내며 서버에서 허용되는 상황에서;

-보내기 지원과 이진수 데이터

- 추가 formData 대상, 서킷 발송 데이터 지원

- 데이터를 발송할 때 진도 정보를 얻을 수 있습니다;

-요청을 할 수 있는 시간을 설정합니다.

위에서 대비해서 저희가 가장 주목하는 점은 지지입니다.**송신 및 접수**.이것은 중대한 돌파다. 이것은 우리가 원격 2진제 사진을 태우게 하는 것이 가능하다.

###어떻게 추가

이에 대해 우리가 먼저 원생부터 Layair 엔진으로 옮겨 가재합니다. 이 개발자는 그 뜻을 이해할 수 있습니다.2진류 방식으로 불러오기 위해 XMLHttpRequest 2진류 방식을 적용합니다.XMLHttpRequest 에 대한 작업은 우리가 더 이상 진술하지 않으며, 단독 장절에 넣어 설명할 것이다.우리는 우선 2진제 방식에 따라 가재해 보자.여기에 우리는 먼저 js 스크립트를 사용해서 조작한다.코드 다음과 같습니다:


```javascript

var xhr = new XMLHttpRequest();
xhr.open("get", "res/atlas/comp.png", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
	if (this.status == 200) {
		var blob = new Blob([this.response], { type: "image/png" });
		var img = document.createElement("img");
		img.onload = function (e) {
			window.URL.revokeObjectURL(img.src); // 清除释放;
		};
		img.src = window.URL.createObjectURL(blob);
		document.body.appendChild(img);
	}
}
xhr.send();
```


이 방법 은 브라우저 가 제공 하는 방법 을 사용해서 이진제 를 그림 으로 전환 하는 것 이 사실 여러 가지 방법 이 있다. 예를 들어 바이너마이너스 로 분해 하 여 디렉터 를 입력 한 뒤 에센스 64 로 부과한 다음, 2진 데이터 를 canvass 로 그려 낸 뒤 todadataURL 부가가치 를 img 에 줄 수 있는 src 등등 이 많 은 방법 이 많 을 것 이다. 여기 는 바로 이 곳 에 있다가장 간단한 방법으로 그림을 전환하다.

그림% 1개의 XMLHttpRequest 대상 xhr`responseType`속성 설정`arraybuffer`블러비 대상`blob`img 태그 만들기 위해`window.URL.createObjectURL(blob)`이 인자 대상을 가리키는 URL 을 생성하여 만든 img 대상을 웹 페이지의 body 에 추가합니다.이 부분의 코드를 index.html 파일에 새겨서 웹 페이지가 정상적으로 표시된 그림을 볼 수 있습니다.

###Laya 중 어떻게 사용하나요?

위의 간단한 예는 우리가 사용하는 js 스크립트를 쓰는데, 항목에서 어떻게 dom 원소의 img 을 사용합니까?다음은 AS 의 프로젝트로 설명하겠습니다.

Laya AS 항목을 새로 만들기, 다음과 같습니다:


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;
    import laya.utils.Browser;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
			var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/monkey2.png","","get","arraybuffer");
		}
        private function completeHandler(data:Object):void
        {
            //加载完成返回的data是arraybuffer；
          	//.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
            //.......解密逻辑开始处理数据。
            var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
            byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
            var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
            var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
            ////我们先用第一种方式显示图片到舞台；
            var sp:Sprite = new Sprite();
            sp.loadImage(url);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


두 번째 텍스처를 그려 볼 수 있습니다:


```java

  private function completeHandler(data:Object):void
  {
      //加载完成返回的data是arraybuffer；
      //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
      //.......解密逻辑开始处理数据。
      var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
      byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
      var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
      var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
      //用loader来加载url
      Laya.loader.load(url, Handler.create(this,showImg,[url]),null,Loader.IMAGE);
  }
 private function showImg(url:String):void
 {
     var t:Texture = Laya.loader.getRes(url);
     var ape:Sprite = new Sprite();
     ape.graphics.drawTexture(t,0,0);
     Laya.stage.addChild(ape);
     ape.pos(200, 0);
 }
```


세 번째는 바로 텍스처를 만들어보도록 하겠습니다.


```java

private function completeHandler(data:Object):void
{
    //加载完成返回的data是arraybuffer；
    //.......这里处理我们加密的图片数据，假设我们的图片加密数据是在图片的前面写入了四个字节的数据
    //.......解密逻辑开始处理数据。
    var byte:Byte = new Byte(data);//Byte数组接收arraybuffer
    byte.writeArrayBuffer(data,4);//从第四个字节开始读取数据
    var blob:Object = new Browser.window.Blob([byte.buffer], { type: "image/png" });
    var url:String = Browser.window.URL.createObjectURL(blob);//创建一个url对象；
  
    var htmlImg:HTMLImage = HTMLImage.create(url);//这里创建HTMLImage 这里要用HTMLImage.create；
    htmlImg.onload = function():void
    {
      var t:Texture =new Texture(htmlImg);
      var ape:Sprite = new Sprite();
      ape.graphics.drawTexture(t,0,0);
      Laya.stage.addChild(ape);
      ape.pos(200, 0);
    }
}
```


이 방법은 이진제가 처리되는 방법인데, 원격 그림자원이 base64 + 데이터로 처리되어 있으며 앞부분에 다운로드 완료되어 직접 섞인 데이터를 제거하는 방법들이 많습니다.다음으로 우리는 그 중 한 가지 방법으로 무대에 나타난다.


```java

package {
    import laya.display.Sprite;
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var sp:Sprite = new Sprite();
            var xhr:HttpRequest = new HttpRequest();
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function completeHandler(data:String):void
        {
            //.....加载完成 把base64字符串的图片数据提取出来；
            //.....提取base64字符串；
            //.......假设得到的数据是data；
            var sp:Sprite = new Sprite();
            sp.loadImage(data);
            Laya.stage.addChild(sp);//添加到舞台
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


이상의 예는 우리가 쓰는 것은 모두`HttpRequest`가재 를 하면 개발자 도 쓸 수 있다`Laya.loader.load`방법 불러오기`Laya.loader.load`자세하게 사용하면 관련 교과서 문서로 이동하십시오.이곳은 더 이상 진술하지 않는다.

위에 있는 예는 저희가 썼어요.`HttpRequest`싱글 라인과 가재, html5 에는 사실 여러 라인이 있으며, 페이지의 카튼의 무응답을 방지하기 위해 사용자 체험을 높일 수 있습니다. Worker를 사용하여 다운로드할 수 있습니다. 관련 교정은 Worker 장절에서 설명합니다.

