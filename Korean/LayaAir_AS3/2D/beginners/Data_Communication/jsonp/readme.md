#JSONP 다역 읽기 데이터

웹의 개발자는 기본적으로 JSONP 를 사용했다.그럼 JSONP 는 뭐죠?얘는 아니고 데이터 형식인데?JSON 이랑 무슨 상관이죠?레이어는 JSONP 를 지지하지 않을까요?다음은 이 문제들을 하나하나 해답한다.



###하나, 무엇이 JSONP

JSONP(JSON with Paddding)은 JSON 의'사용 모드'가 다른 도메인 이름(사이트)에서 자료를 얻을 수 있으며, 대역으로 데이터를 읽을 수 있다.왜 우리가 다른 도메인 (사이트) 방문 데이터는 특수한 기술 (JSONP) 이 필요합니까?동원 전략 때문이다.같은 원격 전략은 Netscape 에서 제시한 유명한 보안 전략으로 현재 자바스크립트 브라우저들을 지원합니다.

정의에서 JSON 은 데이터 교환 형식을 알 수 있으며 JSON은 글로벌 데이터 교호 프로토콜이다.메시지를 묘사하는 형식입니다. 하나는 정보 전달 양측의 약속한 방법으로 주류 브라우저의 트랜잭 데이터를 해결할 수 있는 문제입니다.같은 원격 정책 때문에 일반적으로 xxx.com 웹 페이지는 비xxx.com 서버와 소통할 수 없습니다. HTML DOM 원소는 예외입니다. 일반적으로 src 속성을 가진 DOM 원소는 크로스 영역의 제한을 받지 않습니다. 이 때문에 우리는 < script > 라벨을 이용한 src 웹페이지를 이용하여 다른 원적 동태에서 생기는 JSON 자료를 사용할 수 있습니다. 이러한 사용 모드 는 바로 이 사용 패턴입니다.이른바 JSONP.JSONP 로 잡은 자료는 JSON 이 아니라 제멋대로 자바스크립트로 자바스크립트를 사용해 JSON 해상기를 사용한 것이 아니다.



###둘째, 어떻게 사용합니까?

1. JSONP 에서 지원하는 URL Service, JSONP 형식 데이터를 클라이언트 호출합니다.

사용자가 http: / / www.layabox.com/? jsonp= callback Function

고객이 JSON 데이터로 되돌아가기를 기대합니다: ['data1', data2]

그러면 진짜 클라이언트로 되돌아가는 Script Tags:callback Function([data1','data2'])

따라서 클라이언트는 이렇게 쓸 수 있습니다:

html 페이지에 아래와 같은 태그:


```javascript

<script type = "text/javascript" src = ">
```


자바스크립트 파일의 이 반전 방법을 이렇게 쓸 수 있습니다:


```javascript

<script type = "text/javascript">
function callbackFunction(data1,data2)
{
  //这里写你的回调逻辑
}
</script>
```


그러면 Layair에서 어떻게 쓰고 쓰나요?사실 간단합니다. 여기는 서버를 빌려야 효과를 볼 수 있습니다.서버는 Nodejs 간단한 서버를 만들고, nodejs 설치를 선택하여 설명을 하지 않습니다.nodejs 홈페이지나 직접 검색 자료를 참고할 수 있습니다.

nodejs 설치 후 간단한 js 스크립트를 쓰면 간단한 서버를 만들 수 있습니다.코드 다음과 같습니다:


```javascript

var http = require("http");
var sever = http.createServer(function(req,res){
  res.end("LayaSample.onComplete()");
});
sever.listen(9090)
```



```javascript

res.end("LayaSample.onComplete()");
```


이 말은 서버가 클라이언트 Layasample.onComplete () 와 이 함수를 실행한다는 뜻이다.

몇 줄 코드를 통해 간단한 서버를 만들고 명령줄을 열고, nodejs 파일이나 스크립트를 실행합니다.서버가 작동되는 것을 볼 수 있습니다.



다음 우리는 앞부분의 논리를 쓴다.Layaiair IDE 열기 빈 항목 만들기, 언어 선택 as3, 구체적인 코드:


```java

package
{
	import laya.utils.Browser;

	public class LayaSample
	{
		public function LayaSample()
		{
			Laya.init(100,100);
			var script:* = Browser.createElement("script");
			Browser.document.body.appendChild(script);
			script.src = "http://localhost:9090/?a=1";
		}
		public static function onComplete():void{
			trace("JSONP执行到这里");
		}
	}
}
```



```java

var script:* = Browser.createElement("script");//这句话的含义是创建一个脚本的标签，原生的所有dom元素都可以通过这个方法创建。
```



```java

Browser.document.body.appendChild(script);//是把创建的script标签添加到body上。
```



```java

script.src = "http://localhost:9090/?a=1";//设置script的远程访问地址。这句话就可以请求到我们刚才创建的那个服务器。用谷歌打开LayaAirIDE生成的二维码地址。
```


![1](img/1.png)< br >>

그리고 F12 는 구글의 콘솔을 열고'JSONP 가 여기로 실행되었습니다'라는 함수를 발견했습니다. 또한 우리 onComplete 의 함수를 수행했습니다.이렇게 하면 JSONP 의 기능이 완성된다.