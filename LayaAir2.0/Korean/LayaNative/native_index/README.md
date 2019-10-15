# LayaNative首页说明

LayaNative 브라우저 아닙니다!< br />
LayaNative 브라우저 아닙니다!< br />
LayaNative 브라우저 아닙니다!

현재 LayaNative 는 index.js 또는 runtime.json 을 통해 시작하는 Index.html 이 시작된 것이 아닙니다.LayaNative**브라우저 기반**휴지 브라우저나 웹kit 같은 컨트롤을 통해 html 을 실행하는 내용이 아니다.


##프로필 시작 설명

LayaNative index.js 또는 runtime.json 을 통해 시작할 수 있습니다.이 두 파일은 주로 아래의 기능을 제공합니다:

* 프로젝트 실행을 확정할 때 불러올 js 파일입니다.
* 가로 세로 화면 설정을 합니다.

구체적인 수정 방식은 다음과 같습니다:

**1. index.js 실행 파일로 사용하기**

* loadLib 함수를 사용하여 프로젝트 실행을 확정할 때 불러올 js 파일입니다.
* window.screenOrientation 변수의 값을 수정하고 세로 화면 설정을 변경합니다.

예를 들어:


```javascript

window.screenOrientation = "landscape"; // 设置屏幕为横屏
loadLib("libs/matter.js");   // 启动时加载“libs/matter.js”文件
```



**주의:**index.js 파일에 논리적 코드를 작성하지 마십시오. 만약 작성하면 알 수 없는 오류가 발생할 수 있습니다.

**2. runtime.json 을 사용하여 파일을 시작할 때**

프로젝트도 runtime.json 파일을 실행 파일로 사용할 수 있습니다.json 파일 형식을 시작하는 프로필 파일이 index.js 보다 더 쉽게 이해됩니다.

* "scripts" 프로젝트 실행을 확정할 때 불러올 js 파일입니다.
* "screenOrientation": 가로 세로 화면 설정입니다.

예를 들어, 다음 설정을 시작할 때 'temp.js' 파일을 불러오기, 화면을 가로로 설정합니다


```json

{
	"scripts": ["temp.js"],
	"screenOrientation": "landscape"
}

```
