#기준 테스트



Layaiair 엔진 내치의 성능 통계 도구는 기준 테스트에 사용할 수 있으며 현재 성능을 실시간으로 검사할 수 있습니다.개발자가 사용할 수 있다`laya.utils.Stat`종류, Stat.show () 를 통해 통계 패널을 표시합니다.구체적인 작성 코드 다음과 같습니다:




```javascript

   Stat.show(0,0);             //AS3的面板调用写法       

    Laya.Stat.show(0,0);        //TS与JS的面板调用写法
```


Canvas 렌더에 대한 통계 정보:

​![1](img/1.png)< br >>
(그림 1)

WebGL 렌더의 통계 정보:

​![图片1.png](img/2.png)< br >>
(그림 1)


 



**통계 인자 의미**：

과**FPS**초당 프레임 (숫자가 높을수록 좋다):
Canvas 렌더를 사용할 때 FPS (Canvaas) 를 사용하여 WebGL 렌더를 사용하면 FPS (WebGL) 로 표시합니다.

과**Sprite**보카시 노드 수량(숫자가 낮을수록 좋다).
Sprite 통계는 모든 렌더링 노드 (용기 포함), 이 숫자의 크기는 엔진 노드 도우미, 데이터 조직과 과장 횟수에 영향을 미친다.

과**DrawCall**DrawCall Canvas 와 WebGL 에서 대표적인 의미 (적을수록 좋다):

Canvas 에서 프레임마다 그리는 횟수를 나타내며 그림, 텍스트, 벡터도 포함합니다.최대한 100에 제한하다.

WebGL 아래에서 스펙트럼을 제출하고 데이터를 준비하면서 GPU 렌더를 그릴 때 1회 DrawCall, 1회 DrawCall 중 GPU 렌더를 알릴 때를 제외하고 재질과 shader 를 교체하는 것도 시간이 많이 걸렸다.DrawCall 의 횟수는 성능을 결정하는 중요한 지표로 100에 제한된다.

과**캔비스**세 개의 수치 — 매 프레임 재생된 화포 수량 / 캐시 유형은 "normal" 형식의 화보 수량 / 캐시 유형 "bitmap" 형식의 화보 수량 "이다.

과**Curmem**WebGL 렌더만 메모리 및 현존 점용만 표시합니다.

과**Shader**WebGL 렌더만 프레임 Shader 제출 횟수를 표시합니다.

***Tips:**Canvas 패턴이든 WebGL 패턴이든 DrawCall, Sprite, Canvas 3개 패턴을 집중적으로 최적화할 필요가 있다.(도형 렌더링 성능)*


 