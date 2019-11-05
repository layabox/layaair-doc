#LayaiarIDE로 AS3 프로젝트 만들기 및 디렉터리 구조

현재 추천 AS3 개발자는 FlashDevelop 및 플래쉬비더환경 개발 Layair 엔진의 HTML5 항목을 사용합니다.하지만 LayairirIDE 프로젝트를 통해 프로젝트를 만드는 것을 권장합니다. FlashDevelop 또는 FlashBuilder 를 통해 편집을 열기 바랍니다.LayaiairIDE 프로젝트를 통해 기본적으로 명확한 디렉터리 구조를 만들 수 있습니다.다음은 LayairirIDE 도구로 AS3 의 프로젝트를 만들기 시작으로 프로젝트를 만들기 위한 구조를 소개합니다.



##하나, LayairierIDE 로 AS3 프로젝트 만들기

단계: LayairIDE 열기, 새 프로젝트를 누르면 그림 1

![图片](img/1.jpg)< br / > (그림 1)



절차 2: Layaiair 프로젝트 이름, 경로, 유형, 엔진 버전을 선택하면 '생성' 을 클릭하여 새로운 공항목을 세울 수 있습니다.그림 2

![图片](img/2.jpg)< br / > (그림 2)



절차 3: "생성" 을 클릭한 후 항목의 구조를 볼 수 있으며, 항목 폴더 구조는 그림 3에 따라 나타납니다.

![图片](img/3.png)< br / > (그림 3)



이 때문에 Google은 AS3 프로젝트를 성공적으로 만들었습니다. FlashDevelop 또는 Flash Builder 프로젝트를 도입하는 것을 추천합니다.





##둘째, AS3 프로젝트 구조 소개

**다음은 지난 명절에 만들어진 프로젝트 구조를 결합시켜 디렉터리의 역할을 소개한다.**

​

###2.1 프로젝트 디렉터리 설정 (.laya 폴더)

laya 폴더에 저장된 항목은 실행 중인 일부 프로필 정보들이 포토그래픽 4개와 같다.

![4](img/4.jpg)< br />
(그림 4)



####2.1.1`.laya/launch.json`파일 소개


 `.laya/launch.json`프로젝트의 디버그 디버그 디버그 디버그 디버그 설정과 chrome 브라우저 디버그 설정을 저장했습니다.쉽게 바꾸지 말고 잘못을 고치면 항목의 디버깅에 영향을 줄 것이다.

　　`configurations`속성 아래`layaAir`과`chrome`두 가지 디버그 설정은 사용할 수 있다.

　　`"name": "layaAir"`레이어이더로 내장된 디버그 방식을 표시합니다.

　　`"name": "chrome调试"`로컬 chrome 브라우저로 디버깅을 표시합니다.

　　`"file": "${workspaceRoot}/bin/h5/index.html"`항목이 실행된 입구 파일 경로를 표시합니다.

　　`"runtimeExecutable": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"`로컬 chrome 브라우저 경로를 위해 개발자는 자신의 필요에 따라 이 경로를 설정합니다.

　　`"userDataDir": "${tmpdir}"`chrome 디버깅 캐시 디렉터리를 표시합니다. 기본 사용자의 임시 디렉터리로 설정을 변경할 수 있습니다. 예를 들어 현재 항목 루트 디렉터리에 설정된 cache 디렉토리:`"userDataDir": "${workspaceRoot}/cache"`.

​

####2, 1, 2.`tasks.json`파일 소개

`tasks.json`작업 설정 파일입니다. 열기 후 내용 하도에서 제시한 것 같습니다:

![图片](img/7.jpg)< br / > (7)

**args 인자 설명:**

　　`command`속성은 어느 파일을 시작하고 AS 프로젝트를 시작하는 것이 LayaCompiler 번역기 도구입니다.

　　`args`속성 대표의 전달 인자, 기본값은 전송됩니다. action ScriptProperties 이 파일입니다.

만약 당신이 fd 의 프로필 파일이라면 수정할 수 있습니다:


```

"args": ["${workspaceRoot}/LayaUISample.as3proj;iflash=false;windowshow=false;chromerun=false"];
```


####2, 1, 3.`astool`디렉토리

​`astool`LayaCompiler 번역기 보관 디렉터리입니다.`layajs`MAC 시스템의 AS3 번역기입니다.`layajs.exe`windows 시스템 아래 AS3 번역기입니다.



###2.2 항목의 출력 디렉터리 (bin/h5)

​`bin/h5`디렉터리가 저장된 것은 현재 항목의 출력 파일이다.프로젝트에 저장하는 Action Script3.0 파일이 생성된 js 파일과 HTML5 페이지를 번역합니다.

​*Tips: 개발자가 새 자원 등의 실행 디렉터리나 파일이 필요합니다.`bin/h5`동급이나 자급 디렉토리 중.*



 



###2.3 UI 프로젝트 디렉터리 (laya)

예.`laya`"LayairIDE 현재 UI 프로젝트를 저장하는 데 사용됩니다.

예.`laya/assets`"UI 페이지, 입자 등 구성 요소에 필요한 그림 자원을 저장합니다.

예.`laya/pages`LayairierIDE 페이지 레이아웃을 생성하는 파일을 저장하기 위해 디렉터리에 저장합니다.

예.`laya/.laya`"파일은 LayairIDE UI 프로젝트 프로필 파일입니다.



 



###2.4 프로젝트 라이브러리 디렉터리 (libs)

예.`libs`"디렉터리 내에서 항목의 라이브러리 디렉터리를 저장하기 위해 사용된 라이브러리 파일입니다.

예.`libs/laya/src`"디렉터리 메모리 Layair 엔진 엔진 라이브러리 파일을 저장합니다.



###2.5 항목의 AS3 코드 디렉터리 (src)

항목에 사용된 AS3 코드 파일 (.as 파일) 은 기본적으로 src 디렉터리에 저장합니다.







##프로젝트 프로필 소개

###3.1 LayairierIDE 프로젝트 프로필 (항목명.laya)

​`项目名.laya`LayaiairIDE 프로젝트의 프로필 파일에 현재 항목의 명칭, 사용 라이브러리 버전과 항목 종류를 기록했습니다.

예를 들어:


```json

{"proName":"myLaya","version":"1.5.4","proType":0}
```




###3.2 FlashDevelop 프로젝트 프로필 (항목명.as3proj)

​`项目名.as3proj`파일은 FlashDevelop 프로젝트 프로필입니다.FlashDevelop 편집기를 사용하여 AS3 프로젝트를 개발할 때 자원 관리자를 열고 디렉터리에 파일을 더블 클릭하여 FlashDevelop 프로그램을 엽니다.

![图片](img/8.png)< br / > (그림 8)

플래쉬 Develop 도구를 열어 메뉴 표시줄에서 파일을 통해 '열기' 항목을 찾을 수 있습니다.

![图片](img/9.png)< br / > (그림 9)



###3.3 Flash Builder 프로젝트 프로필

​`.settings`폴더`.actionScriptProperties`파일`.project`파일은 Flash Builder 프로젝트 프로필입니다.Flash Builder 를 사용할 때 메뉴판 '파일' 파일을 통해 'Flash Builder 항목 가져오기 (LayairiderIDE) 로 만든 AS3 항목을 도입할 수 있습니다.Flash Builder 항목을 다음 그림처럼 가져오기:



 ![图片](img/10.png)< br / > (그림 10)


 