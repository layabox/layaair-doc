#정렬 모드: 수평 정렬과 수직 정렬

> 정렬 모드에 관해서는 일반적인 수준의 정렬과 수직 정렬이다.Layaiair 엔진은 빠른 설정을 편리하게 할 수 있습니다. API 인자 설명을 먼저 파악하고, 예를 들어 코드를 통해 소개합니다.
>>

매개 변수 설명은 그림 1, 그림 2의 표시:

​![image.png](img/1.png)< br >>
그림 (1) 화면 알맞은 정렬 모드



​![blob.png](img/2.png)< br >>
그림 (2) 정렬 모드 속성



수평 거중과 수직에 있는 Demo 를 사용하여 시사합니다:


```javascript

(function()
{
    var Stage = Laya.Stage;
    var WebGL  = Laya.WebGL;
  
    (function()
    {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
        
            //垂直居中对齐，另一种写法：Laya.stage.alignV = Stage.ALIGN_MIDDLE
            Laya.stage.alignV = "middle";
              
            //水平居中对齐，另一种写法：Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.alignH = "center";
  
            Laya.stage.bgColor = "#FF0000";
    })();
})();
```


실행 효과는 그림 3의 시사와 같다:

​![blob.png](img/3.png)< br >>
그림 (3) 예시 실행 결과

다른 정렬 패턴은 AlignH 와 AlignV 의 값을 수정하고 실제 인코딩 과정에서 다른 정렬 모드를 체험할 수 있다.