#첫 번째 프로그램: 텍스트 'Hello Layabox' 보이기


 **【힌트】 본문을 읽기 전에 < 개발환경 (TS 코드 편집기) >와 < TS 프로젝트 만들기 및 디렉터리 구조 > 두 편을 먼저 읽어야 한다.**



​**절차 1**src 오른쪽 단추를 누르고 왼쪽 단추를 누르고 새 파일을 누르십시오. src 디렉토리 아래에 HelloLabox.ts 파일을 세웁니다.(Tips:Hello Layabox.ts 는 src 디렉터리에 생성되어야 번역)

​![图片](img/1.png)< br >>

그리고 laya 디렉토리 아래 compille.js 파일을 수정하고 실행 종류를 HelloLayabox.ts

![图片](img/111.png)


​**절차 2**src 디렉토리 아래에 있는 Hello Layabox.ts 를 누르고 다음 코드를 작성하기 시작하기:


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色为白色，默认颜色为黑色
txt.color = "#ffffff";  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```


​

​**절차 3**인코딩이 완료된 후 F5 컴파일에 따라 팝업된 페이지에, 우리는 코드 실행 결과를 볼 수 있습니다:

​![图片](img/2.png)< br >>
그림 (2)



​**순서**성공한 후 창 닫기우리는 계속 코드를 편찬하여 문자의 아름다움을 좀 보게 한다.다음과 같습니다:


```typescript

//创建舞台，默认背景色是黑色的
Laya.init(600, 300); 
var txt = new Laya.Text(); 
//设置文本内容
txt.text = "Hello Layabox";  
//设置文本颜色
txt.color = "#FF0000";
//设置文本字体大小，单位是像素
txt.fontSize    = 66;  
//设置字体描边
txt.stroke = 5;//描边为5像素
txt.strokeColor = "#FFFFFF";  
//设置为粗体
txt.bold = true;  
//设置文本的显示起点位置X,Y
txt.pos(60,100);  
//设置舞台背景色
Laya.stage.bgColor  = '#23238E';  
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
```




**단계 5**작성이 완료된 후 다시 F5 컴파일을 누르고, 미화 후 실행 결과는 다음 그림에 표시됩니다:
​![图片](img/3.png)< br >>
그림 (3)

**이로써 본편의 입문 과정을 따라갈 수 있다면, 이 그림을 완성할 수 있다면, 방문 성공을 축하드립니다. Typescript 언어로 개발된 Layair 엔진 HTML5 프로그램을 완성했습니다.더 많은 Layair 엔진이 개발한 API 사용 방법, 홈페이지 Layabox 개발자 센터가 온라인 API 와 엔진 예례를 살펴보세요.**

**Typescript 관련 지식을 방문하십시오[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)중국어 네트워크, 이 인터넷 주소는 보존하고, 상용!많은 문제는 이것을 보고 해결할 수 있습니다.**