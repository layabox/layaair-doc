##다중 코스 worker

> 본 문서의 worker 는 브라우저 모드에 제한된 HTML5 모드 지원, LayaNative 패키지 APP 프로젝트에서 worker 지원하지 않기

전통적 의미에서 브라우저 는 단일 코스 를 강제 응용 프로그램 의 모든 스크립트 를 함께 단일 UI 라인 에서 실행 했 다.문서 대상 모형 (DOM) 사건과 setTimeout 등 API 를 통해 여러 가지 미션을 동시에 실행하는 허상을 조성하지만, 계산 밀집형 작업만 사용하면 계열 체험이 급전할 수 있다.html5 에서 worker 기능을 도입하고 웹 Web Worker 를 사용하여 브라우저 배경에서 자바스크립트를 실행할 수 있습니다. 브라우저 사용자 프로세스를 사용하지 않습니다.웹 Worker 는 응용의 전체 성능을 높여 사용자 체험을 향상시킬 수 있다.노선 작업은 사용자 인터페이스를 방해하지 않습니다.

###원생 worker

web worker 는 두 종류로 나뉜다. 전용 코스 dedicated web worker, 공유 라인 shared web worker.Dedicated web worker 가 현재 페이지의 종료됨에 따라 종료됩니다. Dedicated web worker가 페이지를 만들 수 밖에 없습니다.상대적으로 대응하는 Shared web worker 는 여러 페이지에 방문할 수 있습니다.하지만 웹 worker 는 모든 인터페이스와 방법을 사용할 수 있는 제한이 있다.

##- Web Worker 가 DOM 노드를 방문할 수 없습니다; Web Worker无法访问全局变量或是全局函数；

##- Web Worker alert() 또는 confirm 같은 함수를 사용할 수 없습니다;Web Worker 는 window, document 같은 브라우저에 접근할 수 없습니다.;


 [workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)페이지에 worker 가 지원하는 전체 함수 목록을 제공합니다.개발자는 스스로 상응하는 방법을 볼 수 있다.

####방법 개술

#####구조함수 Worker ()

이 구조 함수는 웹 web worker 생성, 지정된 URL 에 있는 스크립트를 실행할 수 있습니다.스크립트는 반드시 따라야 한다[同源策略](https://developer.mozilla.org/en/Same_origin_policy_for_JavaScript).

#####postMessage ():

worker 내부 역할 역내에 메시지를 전달합니다.이 방법은 1개의 인자를 접수하여 Worker 데이터를 전달해야 한다.데이터는 어떠한 값도 지나칠 수 있다[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)알고리즘 처리된 자바스크립트 대상은 순환 인용을 포함할 수 있다.

#######인자

- aMessage

worker 에 전송되는 대상; 이것은 onmessage 처리 함수에 포함된 data 필드에 포함됩니다.당신은 임의치 또는 경과를 전달할 수 있습니다[结构化拷贝](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-dom-interfaces.html%3Ch1%3Etransferable)알고리즘 처리된 자바스크립트 대상, 바로 순환 인용을 포함할 수 있습니다.

- transferList

선택할 만한 대상 배열은 소유권을 양도하는 데 사용된다.한 대상의 소유권이 양도된다면, 원래의 윗부분에서 사용할 수 없을 것이며, 전달된 worker 내에서만 사용할 수 있다.

#####terminate ()

즉시 worker 종료.이 방법은 Worker에게 어떠한 완성 작업을 남길 수 있는 기회를 주지 않을 것이다; 간단한 즉시 정지하는 것이다

###속성

"Typeperty" 124장 "Description"
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
124대`onmessage`[124대`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListeener)124개의 이벤트 감청 함수`message 属性的 ``MessageEvent`Worker 에서 거품이 날 때 이 함수를 실행할 수 있다.사건의`data`속성에는 메시지 내용이 있다.124대
124대`onerror`[124대`EventListener`] (https://developer.mozilla.org/zh-CN/docs/Web/API/EventListeener)124개의 이벤트 모니터링 함수`error `의`ErrorEvent 从 worker 中冒泡出来时就会执行该函数。`124대

다음은 원생 js 로 어떻게 쓰는지 살펴보자.

새 js 파일을 만들고 index.html 코드 다음과 같습니다:


```javascript

var myWorker = new Worker("my_task.js");

myWorker.onmessage = function (oEvent) {
  console.log("Called back by the worker!\n");
};
myWorker.postMessage("start"); // start the worker.
```


새 myu task.js 파일


```javascript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


이 예는 Worker에서 파일을 다운로드하고 메인 프로세스를 가재하고, 이 예는 브라우저 콘솔에서 데이터를 볼 수 있습니다.

`var myWorker = new Worker("my_task.js")`worker, js 파일로 실행`myWorker.postMessage("start")`worker 라인 실행에 통지합니다.

​`self.addEventListener('message',xxx)`주선거리 통지하는 소식 감청.

​`self.postMessage(data);`메인 라인에 데이터 보내기.

주의: web worker 의 파일 프로토콜을 지원하지 않기 때문에 직접 열면 실행할 수 없습니다. 개발자는 IDE 내장 서버에 맞춰 인터넷 주소를 통해 실행할 수 있습니다.콘솔을 열면 데이터가 인쇄되어 있는 것을 볼 수 있습니다.



##리야에 적용

Laya 에서 내부 봉본은 worker, 디코딩 카드 카톤 현상을 해결하고 개발자는 스위치를 열어도 worker, 프로젝트에서 cpu 소비를 해결할 수 있는 곳에서 각각 소개합니다.

새 프로젝트를 만들기 위해서 우리는 새로운 유i 프로젝트를 세웁니다.간단한 호출 인터페이스는 다음과 같습니다:


```java

package {
	import laya.net.Loader;
	import laya.utils.Handler;
	import view.TestView;
	import laya.net.WorkerLoader;
	import laya.webgl.WebGL;
	public class LayaUISample {
		
		public function LayaUISample() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			//设置Laya提供的worker.js的路径
			WorkerLoader.workerPath = "libs/worker.js";
			//开启worker线程
            WorkerLoader.enable = true;
			//加载引擎需要的资源
			Laya.loader.load([{url: "res/atlas/comp.json", type: Loader.ATLAS}], Handler.create(this, onLoaded));
		}
		
		private function onLoaded():void {
			//实例UI界面
			var testView:TestView = new TestView();
			Laya.stage.addChild(testView);
		}
	}
}
```


​`WorkerLoader.workerPath = "libs/worker.js";`worker.js 경로를 설정합니다. 이 worker.js 는 Laya 관측에서 제공합니다. 우리가 직접 설치한 경로로 복사합니다.제가 이곳에 설치한 것은 libs 아래입니다.

`WorkerLoader.enable = true;`worker 모드 해코딩 이미지 불러오기, 홈 라인 디코딩 압력을 크게 해방했다.

위쪽의 방법은 공식 디코딩의 방법이다. 우리도 worker 를 최적화하는 항목 중 소비 cpu 를 적정할 수 있다.다음은 간단한 예로 사용법을 보여 준다.우리는 교정을 시작하는 js 스크립트를 이식할 수 있다.


```java

package {
	import laya.utils.Browser;
	import laya.webgl.WebGL;

	public class WokerDemo {
		
		public function WokerDemo() {
			//初始化引擎
			Laya.init(600, 400,WebGL);
			var worker:* = Browser.window.Worker("my_task.js");
            worker.onmessage = function (oEvent):void {
                console.log("Called back by the worker!\n");
            };
            worker.postMessage("start"); // start the worker.
		}
	}
}
```


my u task.js 코드가 파일을 추가합니다.코드 다음과 같습니다:


```javascript

self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
        self.postMessage(data);
    }
    xmlreq.open("get","res/atlas/comp.json");
    xmlreq.send()
}, false);
```


컴파일을 실행하면 컨트롤 콘솔에서 comp.json 의 데이터를 가재할 수 있습니다.

총괄: 웹 worker 우리는 일반적으로 크기의 파일을 해제할 수 있으며, 예를 들어 많은 json 파일을 사용할 때 계산을 사용하거나, 즉시 재고할 수 있는 일부 자원은 백스테이지 라인으로 완성할 수 있으며, 사용자는 기본적으로 홈 프로세스를 느낄 수 없습니다.사업의 유창성을 증강하다.사용자 체험을 향상시키다.

##-상세하다`Web Workers`보다[W3C的xhr 标准](https://www.w3.org/TR/workers/); 详细的api和介绍参考[这里](https://developer.mozilla.org/en-US/docs/Web/API/Worker/)
--[workder 支持的函数](https://developer.mozilla.org/En/DOM/Worker/Functions_available_to_workers)페이지에 worker 가 지원하는 전체 함수 목록을 제공합니다.