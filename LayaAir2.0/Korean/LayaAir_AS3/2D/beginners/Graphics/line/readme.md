#직선과 접선을 그리다



###직선을 그리다

API 에서 laya.display.Graphics 종류를 검색하면 이 API 의 각종 벡터 그리기 방법을 볼 수 있습니다.그중 drawLine () 는 벡터 직선을 그리는데 사용합니다.이 방법의 상세한 설명은 그림 아래에 제시한 것과 같다:

​![blob.png](img/1.png)< br >>
(그림 1)

다음은 Layair 엔진으로 직선을 그리며 예시 코드:


```java

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画直线
            sp.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
             
        }
    }
}
```


발표 후 하도처럼 우리는 붉은색 직선을 그렸다.

​![blob.png](img/2.png)< br >>
(2)



###접선을 그리다

그럼 접선을 어떻게 그릴까요?drawLines () 를 직접 사용하면 됩니다.이 방법은 drawLine 와 비교해서 인코딩 시 절대 끝의 's'를 빠뜨리지 마라.drawLines 의 인자 자세한 설명은 다음 그림에 제시한 것처럼:

​![blob.png](img/3.png)< br >>
(그림 3)

다음은 Layair 엔진으로 접선을 긋고 예시 코드:



코드 실행


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画折线
            sp.graphics.drawLines(20, 88, [0, 0, 39, -50, 78, 0, 120, -50], "#ff0000", 3);
         
             
        }
    }
}
```


효과:

​![blob.png](img/4.png)< br >>
(그림 4)

코드를 통해 접선과 직선을 그리는 인자 구별은 3위부터 Array 유형의 접선점 집합을 알 수 있다. 그 중 0, 0, 0 은 접점 A 의 시작이다.‘ 39, -50 ’ 은 접점B 의 시작 좌표이다.‘ 78, 0 ’ 은 접점 C 의 시작 좌표로, ‘ 120, -50 ’ 은 종점 D 의 좌표이다.그러나 3위 인자 중 모든 좌표가 상대 좌표로 1위와 2위의'20, 88'에 영향을 받는다.‘ 20, 88 ’ 이 바뀌면 전체 접선은 영향을 받는다.

모두 실제 인코딩 과정에서 수동조절 인자를 통해 구별을 느낄 수 있다.



###3, LayaiarIDE 드래그 컨트롤로 직선을 그립니다

**절차 1**Google LayairIDE, 클릭 모드, View 페이지를 새로 만들기

​![6](img/5.png)< br >>
(그림 5)

**절차 2**구성 요소 중 곡선 구성 요소를 View 페이지에 끌면 자동으로 기본 직선으로 생성됩니다

​![7](img/6.png)< br >>
(그림 6)

**절차 3**수정 (더하기 / 감소) 라인 속성 중 수치, 직선의 길이, 너비, 색상 등을 변경합니다.

​![8](img/7.png)< br >>
(그림 7)

​![9](img/8.png)< br >>
(그림 8)



###4, LayairirIDE 드래그 컨트롤로 접선을 그립니다

**절차 1**Google LayairIDE, 클릭 모드, View 페이지를 새로 만들기

​![6](img/5.png)< br >>
(그림 9)

**절차 2**구성 요소 중 곡선 구성 요소를 View 페이지에 끌면 기본적인 접선을 자동으로 생성할 수 있습니다

​![7](img/9.png)< br >>
(그림 10)

**절차 3**수정 (더하기 / 감소) 리ines 구성 요소 속성 수치, 접선 각도, 색상, 너비, 새로운 할인 추가.

​![8](img/10.png)< br >>
(도 11)

​![9](img/11.png)< br >>
(그림 12)

여기에 LayairirIDE 구성 요소를 통해 직선과 접선을 그립니다.