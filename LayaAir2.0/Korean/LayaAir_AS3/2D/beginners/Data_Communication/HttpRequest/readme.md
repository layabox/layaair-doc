#HttpRequest 상세 해명

프로젝트 중 http 요청을 발송할 수 있는 수요가 있습니다. Layaiair 엔진에서 HtttpRequest는 우리가 요청하는 기본 종류입니다.HtttpRequest 종류는 사실 포장이 원생입니다.`XMLHttpRequest `개발자를 더 깊이 이해하기 위해, XMLHttpRequest 부터 시작합니다.

##원생 XMLHttpRequest

####약술하다

XMLHttpRequest 중국어는 초텍스트 전송 요청을 확장할 수 있습니다.클라이언트와 서버 사이의 데이터 전송 기능을 제공합니다.URL 을 통해 데이터를 얻는 간단한 방식을 제공하고 모든 페이지를 새로 고칠 수 없습니다.웹 페이지는 일부 페이지만 업데이트하고 사용자를 방해하지 않습니다.

###속성

일렉트릭 유형
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
12444 onreadystatechange (Tadystate) 가 124tion (Javascript 함수 대상, readystate 속성을 변경할 수 있습니다.124대
"unsigned short"
1244Rresponse`responseType 来指定，`ᄅ 수 있다,...`ArrayBuffer`,`Blob`[/wk`Document`](https://developer.mozilla.org/zh-CN/docs/web/API/Document), 자바스크립트(즉 json), 또는 문자열.만약 완성되지 않았거나 실패를 요청한다면, 이 값은`null`124대
"12444 Responsext"에서 "DOMString" 이 요청한 텍스트나 "이 요청이 성공되지 않았을 때 보내지 않았을 때 보내지 않았습니다`null`**오로지 읽다.**124대
12444 ResponseType (XMLttpRequestRespenseType) 이 설정을 변경할 수 있습니다.서버가 원하는 응답 형식을 알려드립니다.124대
124타 status`unsigned short`이 요청의 응답 상태`状态码`200. 성공한 부탁.**오로지 읽다**124대
124대`statusText`124대`DOMString`이 요청의 응답 상태 정보, 상태 코드와 원인 단어 (예)`200 OK`"읽기만 해라."
124대`upload`124대`XMLHttpRequestUpload`만 2`upload 上添加一个事件监听来跟踪上传过程。`124대
124대`withCredentials`124대`boolean`크로스-site (cross-site) 방문 제어 (Acccccccccess-Control) 을 요청할 때 인증 정보 (예를 들어 쿠키나 수권하는 header) 를 사용할지 여부를 확인합니다.기본`false。`124대
일찌감치
​`withCredentials`이 속성은 일반적으로 많지 않습니다. 여기에서 간단히 소개합니다. 웹에서 같은 지역의 요청 탐색기를 보내겠습니다`cookie`자동 추가`request header`하지만 대역 요청을 보낼 때는 휴대하지 않는다.이게 있으니까.`CORS`표준 중, 기본값의 경우, 브라우저는 대역 요청을 보낼 때 인증 메시지를 보내면 안 됩니다.`credentials`예 ""`cookies`"과".`HTTP authentication schemes`예.… 뿐만 아니라`xhr.withCredentials`되다`true`과`xhr`대상 에 속성 이 있다`withCredentials`기본 값`false`무엇그래서 개발자는 트랜지스터를 만나면 쿠키를 휴대할 수 없을 때 참고해주세요.

###방법

####abort ()

만약 요청이 발송되었다면, 즉시 요청을 중지할 것이다.

####getAllesponse Headers ()

모든 응답 헤드 메시지 (1명과 값 응답) 을 되돌려줍니다. 응답 대가가 아직 받지 못하면 되돌아갑니다`null`1.

####getResponse Header ()

주어진 호응의 대가를 되돌려줍니다. 만약 호응이 받아들여지지 않았거나, 이 호응이 존재하지 않으면 null.

####open ()

요청 초기화

###### 参数

--`method`

요청한 HTTP 방법; 예를 들어, "GET", "POST", "PUT", "DELETE" 등, 다음 인자가 비HTTP (S) URLL을 무시하면 이 변수를 무시합니다.

--`url`

이 요청에서 접근할 URL

--`async`

선택할 수 있는 불값 인자 변수가, 기본적으로 true, 비동기 동작을 실행할 수 있는지 여부를 의미합니다. 만약 false, send () 는 모든 것을 되돌릴 수 없습니다.트루엘 (true) 를 위해 개발자에 대한 투명한 통지회는 관련 사건에 대한 감청자에게 보낼 수 있다.이 값은 true, multipart 속성이 true, 그렇지 않으면 의외의 일이 생길 것이다.

--`user`

사용자 이름, 선택할 수 있는 인자가 사용됩니다. 기본값은 빈 string.

--`password`
암호, 선택할 수 있는 인자를 사용할 수 있습니다. 기본 인자가 빈 string. 암호, 선택할 수 있는 인자를 사용할 수 있으며, 기본 인자가 빈 string.
####overridemimeType ()

다시 쓰기는 서버에서 되돌아가는 MIME type 입니다.이 경우 'text / xml' 으로 강제 응답 을 실행 할 수 있습니다. 웹 서버 에서 데이터 를 가리키지 않 았 지만 이 종류 입니다.주의, 이 방법은 반드시 send () 전에 전용되어야 한다.

####send ()

요청을 보내십시오. 이 요청은 비동기 모드 (기본값) 입니다. 이 방법은 바로 되돌릴 수 있습니다. 반대로 요청 모드를 요청하면 요청의 응답이 완전히 수락될 때까지 이 방법이 되돌아올 수 있습니다. 그 중 send 의 인자 형식은 다음과 같습니다.

--`ArrayBuffer`

--`Blob`

--`Document`

--`DOMString`

--`FormData`

--`null`

####setRequest Header ()

지정한 HTTP 요청 헤딩을 요청합니다. 이 전에 호출을 확인하셔야 합니다.`open()`](https://developer.mozilla.org/zh-CN/docs/web/API/XMLHtpRequest#open 방법은 url.

###사건

기본적인 사건은 대체로 몇 가지 종류가 있다.

--`onloadstart`

--`onprogress`

--`onabort`

--`ontimeout`

--`onerror`

--`onload`

--`onloadend`

우리가 흔히 사용하는 기본은 진도 사건, 사건 완성, 오류 사건 등

하나하나`XMLHttpRequest`안에 하나 있어요.`upload`속성`upload`하나`XMLHttpRequestUpload`대상`XMLHttpRequest`과`XMLHttpRequestUpload`같은 걸 계승했어요.`XMLHttpRequestEventTarget`인터페이스 때문에 upload 도 이런 사건을 가지고 있습니다.

##laya 에서 어떻게 쓰는지

laya 중 HtttpRequest XMLHttpRequest 의 재킷을 사용하여 간단한 재킷, HtttpRequesst가 잇는 것은 EventDispatcher 로 이벤트 발급 기능을 갖추고 있다.우리는 간단한 예를 써서 사용법을 보자:


```java

package {
    import laya.events.Event;
    import laya.net.HttpRequest;

	public class LayaSample {
		
		public function LayaSample() {
			//初始化引擎
			Laya.init(1136, 640);
            var xhr:HttpRequest = new HttpRequest();
            xhr.http.timeout = 10000;//设置超时时间；
            xhr.once(Event.COMPLETE,this,completeHandler);
            xhr.once(Event.ERROR,this,errorHandler);
            xhr.on(Event.PROGRESS,this,processHandler);
            xhr.send("res/data.data","","get","text");
		}
        private function processHandler(data:Object):void
        {
            trace(data);
        }
        private function completeHandler(data:Object):void
        {
            
        }
        private function errorHandler(e:Object):void
        {
            
        }
	}
}
```


이 예는 우리가 간단한 요청을 발송하고, 방식은 get 방식이다.원격 파일을 가져오는 데 사용됩니다. 형식은 텍스트의 형식입니다.만약 우리 동적 요청 원격 데이터가 다음 형식으로 변경될 수 있습니다:


```

 xhr.send("http:xxx.xxx.com?a=xxxx&b=xxx","","get","text");//发送了一个get请求，携带的参数为a = xxxx,b=xxx
```


다음 post 방법으로 데이터 방식을 요청합니다:


```

 xhr.send("http:xxx.xxx.com","a=xxxx&b=xxx","post","text");
```


이곳의 중점은 send 함수입니다. 이 send 함수는 XMLHtttpRequest send 영역과 분리됩니다.봐 인자: 봐

###### 参数

##--`url`요청한 원격 주소data 가 보내는 데이터; 일반 post 방법, 이 인자를 전달해야 합니다.get 방법 인자가 url 과 맞붙는다.
##- method 데이터 보내는 방법은 기본적으로 getresponseType 메시지 되돌아가는 형식
- headers 가 지정한 HTTP 요청 헤딩값


###### 属性

##--`http`원생 XMLHttpRequest 인용으로 XMLHttpRequest 속성을 설정할 수 있습니다. 예를 들어 timeout, xhr.htttp.timeout = 10,000, 설치 시간 10초입니다. `data`: 请求返回的数据。

--`url`요청한 url.

###HttpRequest 확장

개발과정에서 HtttpRequest는 우리의 수요를 만족시킬 수 없습니다. 예를 들어 파일을 올릴 때, 예를 들어 시간 초과 파일을 올릴 수 있습니다.HtttpRequest 확장하기 쉽습니다. HtttpRequest, 아니면 차라리 HtttpRequest 같은 종류를 다시 쓰기 쉽습니다. 개발자의 수요를 보고 HttttpRequestprequest를 다시 쓰기 건의합니다.다시 쓰는 것은 XMLHttpRequest 종류입니다.다음은 간단한 상속 시범:


```java

package
{
    import laya.net.HttpRequest;
    
    public class HttpRequestExtension extends HttpRequest
    {
        public function HttpRequestExtension()
        {
            super();
        }
        public override function send(url:String, data:*=null, method:String="get", responseType:String="text", headers:Array=null):void
        {
            super.send(url,data,method,responseType,headers);
            this._http.upload.onprogress= function(e:Object):void
            {
                //上传进度
            }
            this._http.upload.onload= function(e:Object):void
            {
                
            }
            this._http.upload.onerror= function(e:Object):void
            {
                
            }
            this._http.upload.onabort = function(e:Object):void
            {
                
            }
        }
    }
}
```


위에 파일을 올리는 시범은 XMLHttpRequest upload 의 일부 이벤트를 첨가했고, 이곳의 슈퍼.send 는 아버지의 방식을 간단히 사용하여 개발자를 사용하지 않고 자신의 요구를 만족시킬 수 있다.

##결어

XMLHtttpRequest 이 원생의 종류는 매우 거대하고 기능이 강하고, 레이야의 재킷은 기본적인 수요를 충족할 뿐, 특수한 수요는 스스로 확장해야 한다.

##-상세하다`XMLHttpRequest`보다[W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/); `XMLHttpRequest`여러 가지 유형의 데이터를 보내면 참고할 수 있다[发送数据](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)과[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
##알다`XMLHttpRequest`기본 사용은 참고할 수 있다[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)；다역 요청을 알고 싶으면 참고할 수 있다[W3C的 cors 标准](https://www.w3.org/TR/cors/);




