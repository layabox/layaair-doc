#AS3 과 JS 혼합 코드

AS3 과 JS 는 흔한 수요이며 플래쉬 플러그인은 간단한 인터페이스 함수를 제공했다`ExternalInterface.call`과`ExternalInterface.addCallback`JS 와 교제하다.하지만 HTML5 를 발표하면 이 플래쉬의 인터페이스는 사용할 수 없다.

AS3 언어를 지원하는 HTML5 의 엔진으로 Layair가 통과할 수 있습니다`Browser.windows`과`__JS__`방법으로 JS 와 상호, 또한 레이야아 엔진의 AAAR 번역기에서 특유의 매크로 번역을 지원하며 AS3 개발자가 더 복잡한 AS3 과 JS 혼합 코드를 실현하도록 돕는다.

###1. AS3 과 브라우저 교류

JSDemo.a라는 작동 파일을 만들었다면 AS3 코드에서 JS 의 원생 alert 탄창 효과를 실현합니다.예시 코드 다음과 같습니다:

**방식 1:**


```java

package 
{
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() 
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			Browser.window.alert('我是alert');			
		}		
	}
}
```


**방식 2:**


```java

package 
{
	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			//运行JS alert
			__JS__('alert("我是alert")');
		}
	}
}
```


이상 두 가지 방식은 실행된 결과에서 보면 완전히 일치하는 것이며, 그림 1개처럼 보인다.

![1](1.jpg)< br />
(그림 1)

그 두 가지 방식의 차이는 어디에 있을까?

　　`Browser.window`이것은 브라우저 window 참조, 브라우저 전체 함수입니다`window`이에 따라 Browser.window.alert 로 탄창의 함수를 불러일으킬 수 있다.모든 window 위의 모든 함수와 속성은 이러한 방식으로 진행될 수 있다.

　　`__JS__`LayaCompiller 컴파일러에서 제공하는 매크로 컴파일러 함수,`__JS__()`함수 내의 코드가 번역되지 않으면 js 코드 직역할 것이다.



###2. AS3 과 브라우저와 교차하는 단계

Layaiair 엔진과 브라우저와의 교류는 alert 에 그치지 않았으며, 다음은 시례 코드 를 통해 AS 와 브라우저 의 교호 를 더욱 이해한다.

**방식 1:**


```java

package 
{
	import laya.utils.Browser;

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
	
			var Height:int = Browser.window.innerHeight;
			var width:int = Browser.window.innerWidth;
			Browser.window.console.log("Console Log：浏览器高："+ Height + " 浏览器宽：" + width);
		}
	}
}
```


**방식 2:**


```java

package 
{

	public class JSDemo
	{
		public function JSDemo()
		{
			//初始化引擎
			Laya.init(0, 0);
			
			var BrowserInfo:String = __JS__('"Console Log：浏览器高：" + window.innerHeight + " 浏览器宽："+ window.innerWidth');
			trace(BrowserInfo);
		}
	}
}
```


이상 두 가지 방식은 실행된 결과에서 보면 완전히 일치하는 것이며, 마치 두 가지 방식으로 제시된다.

![2](2.jpg)< br />
(2)

이상 두 가지 방식은 상대적으로 말하자면, 우리는 추천한다.`Browser.window`방식 교호`__JS__`방식은 문자열에 JS 코드를 쓰는 것이기 때문에 잘못 썼다면 제시를 잘못 제시하지 않았다면 원가를 추가할 수 있다.



###3. A3과 JS 혼합 코드

프로젝트에서 우리는 제3의 js 라이브러리 개발에 사용할 수 있다.그럼 AS 에서 어떻게 처리할까요?가장 자주 쓰는 jquery.js 를 가지고 설명을 하겠습니다.

일단 jquerry에서.[官网下载](http://jquery.com/download/)jquery.js 버전`jquery-3.2.0.min.js`.항목 입구에 있는 index.html 페이지 (통상적으로 '(일반적으로')`bin\h5\`"디렉토리에 추가`<script type="text/javascript" src="jquery-3.2.0.min.js"></script>`.

​*Tips: 제3자 라이브러리 도입은 Layaiar 엔진 저장소에 추가하기 전에 추가합니다.*

입구 페이지에 저장된 인용을 추가한 후 AS3 입구 라이브러리에서 다음과 같은 코드를 작성합니다:


```java

package {
	import laya.utils.Browser;
	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
          	//Browser.window后的$(Browser.document)为第三方库jquery的方法。
			Browser.window.$(Browser.document).ready(function():void{
				
				Browser.window.alert("jquery调用成功");
			});
			
		}
		
	}
}
```


컴파일이 실행된 후, 우리는 탄창의 성공을 볼 수 있으며, 이미 호출되었음을 나타낼 수 있다.우리는 AS3 종목에서 혼합 인코딩을 성공적으로 실현했다.



###4. JS AS 인터페이스 호출

가끔씩 우리 개발사업은 웹 개발자와 교차 호출, 위쪽 방법으로 웹 개발자의 js 방법을 호출할 수 있다. 그렇다면 웹 개발자는 어떻게 우리가 쓴 논리를 호출할 수 있을까?사실 개발자는 AS3로 H5 를 개발할 수 있다. 사실 번역기를 통해 js 로 직접 번역한 것이기 때문에 인터페이스를 폭로하고, 웹 개발자가 우리 js 코드를 바로 사용하면 된다.다음은 간단한 사례 코드 하나로 용법을 설명하자.

**JSDemo.as 코드 다음과 같습니다:**


```java

package {
	import laya.webgl.WebGL;

	public class JSDemo {
		
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			
		}
      //定义一个静态函数 对外暴露给web调用者。
		public static function getGameName():String
		{
			return "myGame";
		}
		
	}
}
```


컴파일을 실행한 다음 브라우저 콘솔을 열고 입력하십시오`JSDemo.getGameName()`출력 발견`"myGame"`만일 3 시에 제시한 것처럼.호출 성공을 밝히고 웹 개발자와 교차했다.

![图片](3.jpg)< br />
(그림 3)



위쪽의 예는 단지 정적 방법을 정의한 것이고, 우리는 내부의 모든 방법과 속성을 개방할 수 있다.

JSDemo.as 코드 수정:


```java

package {
	import laya.utils.Browser;

	public class JSDemo {
		
		private var name:String = "Game";
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
         	//定义一个命名空间的属性为app；
			Browser.window.app = this;
			
		}
		public static function getGameName():String
		{
			return "myGame";
		}
		public function getVersion():String
		{
			return "1.2.0";
		}
		
	}
}
```


컴파일 실행, 브라우저 콘솔 열기`app`、`app.name`、`app.getVersion()`볼 수 있는 효과는 그림 4개처럼 우리의 호출 효과에 이르렀다.이로써 Layair 엔진의 AS 개발과 웹 개발자 교호식 무결함을 알아봤다.

![图4](4.jpg)< br />
(그림 4)



###5. 코드 지능 힌트

상표의 예시에는 JS 원생의 방법을 호출할 수 있지만 원생의 JS 방법은 AS3 종목에서 코드가 없다.따라서 우리는 매크로 컴파일을 결합하여 함수 성명을 추가하여 코드 힌트를 얻었다.

예를 들어 우리가 window 종류 (*`window.as`*) 브라우저 상용 함수를 봉쇄합니다.

window.as 코드 다음과 같습니다:


```java

/*[IF-FLASH]*/package
{
	public class window
	{
		public function window()
		{
		}
		public static function alert(msg:Object):void
		{			
		}
	}
}
```


`/*[IF-FLASH]*/`LayaCompiller 컴파일러입니다. 그 이후의 종류는 JS 로 편역되지 않습니다. 잘 모르니 먼저 알아보십시오[宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md).



이 종류가 있으면 우리는 바로 window 방법을 쓸 수 있고, 또한 힌트가 있다 (* 전제는 쓸 함수를 미리 봉쇄해야 한다 *)

이제 바로 js 방법으로 쓰도록 하겠습니다.`alert()`,

JSDemo.s 코드 다음과 같습니다.


```java

package {
	public class JSDemo {
		public function JSDemo() {
			//初始化引擎
			Laya.init(0, 0);
			window.alert("我是alert");
		}
	}
}
```


컴파일 실행 효과는 그림 5개처럼, alert 실행에 성공했습니다.그래서 우리는 상용적인 윈도우의 방법을 개발자를 모두 봉쇄할 수 있다.이후 JS 와 혼합 인코딩을 할 때 코드의 스마트 힌트가 나올 수 있다.

![图5](5.jpg)< br />

(그림 5)





###6. AS Nodejs

우선 AS 를 새로 짓는 공사는 AS의 원생의 프로젝트입니다. Layair의 라이브러리는 일시적으로 무시할 수 있습니다. 항목의 시작 종류는 Main.aas로 설정됩니다. 그리고 새로 새로 세운 다음 새로 만들기`require.as`.

require.as 코드 다음과 같습니다:


```java

package
{
	/*[IF-FLASH-BEGIN]*/
	public class require
	{
		
		public function require(path:String)
		{
		}
		
	}
	/*[IF-FLASH-END]*/
}
```


​

항목의 시작 종류 Main.as 코드 다음과 같습니다:


```java

package
{
	public class Main
	{
		public var http:Object = require('http');
		public var net:Object = require('net');
		public var url:Object = require('url');
		public function Main()
		{
			var server:Object = this.http.createServer(clientHandler);
			server.listen(8989);
		}
		private function clientHandler(req:Object,respose:Object):void
		{
			trace("收到消息");
			respose.writeHead(200, {'Content-Type': 'text/plain'});
			respose.end('Hello Laya');
		}
	}
}
```


​*Tips:node 서버를 만드는 api[https://nodejs.org/](https://nodejs.org/)*



　　`Main.as`동적 서버를 만들었습니다. 포트는 8989, 서버가 클라이언트의 요청을 받고 Hello Laya 로 되돌아갑니다.

　　`require.as`이 종류는 LayaCompiller 컴파일러의 매크로 번역되고,`/*[IF-FLASH-BEGIN]*/`과`/*[IF-FLASH-END]*/`이 두 탭 사이의 코드는 문법 힌트에 사용되며, 편집에 참여하지 않으니, 먼저 가서 알아보세요.[宏编译教程文档](https://github.com/layabox/layaair-doc/blob/master/Chinese/LayaAir_AS3/LayaCompile_Macros.md)무엇

​**프로필:**

이 프로젝트를 번역한 Js 파일을 node 로 시작하였습니다.현재 디렉토리 아래 명령줄 입력 열기`node Main.max.js`.그리고 브라우저 입력[http://localhost:8989/](http://localhost:8989/)페이지 표시: Hello Laya.

이로써 우리는 AS 코드로 성공적으로 동적 서버를 썼음을 보여준다.