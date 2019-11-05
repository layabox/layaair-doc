#첫 번째 프로그램: 텍스트 'Hello Layabox' 보이기


 **【힌트】 본문을 읽기 전에 JS 프로젝트를 창설하고 디렉터리 구조를 상세히 읽어야 한다.**



단계: src 오른쪽 단추를 누르고 왼쪽 단추를 누르면 '새 파일' 을 누르십시오. src 디렉토리 아래에 HelloLabox.js 파일을 세웁니다.



​	![图片](img/1.png)< br >>




스텝 2: src 디렉토리 아래에 있는 HelloLayabox.js 를 클릭하여 다음 코드를 작성하기 시작합니다:


```javascript

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




단계 3: 인코딩이 완료된 후 저장하고 F5 컴파일에 따라 팝업된 페이지에, 우리는 코드 실행 결과를 볼 수 있습니다.
​![图片](img/2.png)< br >>




단계 4: 성공을 표시한 후 창 닫기우리는 계속 코드를 편찬하여 문자의 아름다움을 좀 보게 한다.다음과 같습니다:


```java

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




단계 5: 작성이 완료된 후에 저장하고, F5 컴파일을 다시 누르고, 미화 후 실행 결과는 다음 그림에 표시됩니다:
​![图片](img/3.png)< br >>


이로써 당신이 본편의 입문 과정을 따라갈 수 있다면, 이 그림을 완성할 수 있다면, 방문 성공을 축하합니다. 자바스크립트 언어로 개발한 Layair 엔진 HTML5 프로그램을 완성했습니다.더 많은 Layair 엔진이 개발한 API 사용 방법, 홈페이지 Layabox 개발자 중심으로 교정을 살펴보세요.