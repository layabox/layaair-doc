#도형 렌더링 성능

### **1、최적화 Sprite**

1. 불필요한 점퍼를 최대한 줄이고 Sprite 수를 줄인다.

2. 비견적인 영역의 대상은 가능한 한 목록에서 삭제하거나 visible = false 를 설정합니다.

3. 용기 안에 대량의 정적 내용이나 자주 변하지 않는 내용(예를 들어 버튼)을 포함해 전체 용기에 cacheAs 속성을 설정해 Sprite 의 수를 많이 줄여 성능을 높일 수 있다.동적 내용이 있다면 정적 내용과 분리되는 것이 좋다.

4. Panel 내에서는 패널 영역 밖의 직접자 대상(자 대상 대상 대상)을 가리지 않고, 팩 영역을 뛰어넘는 자녀 대상은 소모를 낳지 않는다.

​

### **둘째, DrawCall 최적화**

1. 복잡한 정적 콘텐츠에 CcheAS를 설치하면 DrawCall 을 대량으로 줄일 수 있으며, 좋은 cacheAs 를 사용하는 것은 게임 최적화의 관건이다.

2. 도화와 같은 이미지 렌더순서를 최대한 보장하는 것이 맞을 것이며, 도화교차 교차 렌더를 하면 DrawCall 수를 증가시킨다.

3. 같은 패널에 있는 모든 자원을 하나로 담아 도화를 줄일 수 있다.

​

### **Canvas 최적화**

Canvas 를 최적화할 때, 다음 장소에서 cacheA스를 사용하지 않도록 주의해야 합니다.

1. 대상은 매우 간단하다. 예를 들면 한 글자나 한 개의 그림, cacheAs = bitmap 설정은 성능을 높이지 않을 뿐만 아니라 오히려 성능이 손실된다.
2. 용기 안에 자주 변화하는 내용이 있다. 예를 들면 용기 안에 애니메이션 혹은 카운트다운 이 장치를 설치하면 cacheAs = bitmap '' bitmap ', 성능이 손실된다.

Canvas 통계 정보의 첫 번째 값을 확인하여 캐리어 캐시 캐시 캐시 캐시 캐시 경신여부를 판단할 수 있습니다.

### **cacheAs**

CcheAs를 대상으로 정적 이미지로 저장할 수 있으며, CcheAs의 대상이 바뀌면 자동으로 캐시를 재생할 수 있으며, 리Cache 방법으로 캐시를 업데이트할 수 있습니다.자주 변하지 않는 복잡한 내용을 정적 이미지로 캐시, 과장 성능, cacheAs'none','normal'과'bitmap'3가지 값을 높일 수 있도록 권장합니다.

1. 기본적으로'none'이라고 한다. 어떤 캐시 도 하지 않는다.
2. 당첨되는 것은'normal'때 Canvas 밑에서 화보 캐시, webgl 모드에서 명령 캐시 명령 캐시.
3. BItmap '때 Canvas 하에서는 여전히 화보 캐시, webGL 모드에서 renderTarget 캐시를 사용합니다.여기에는 webGL 아래 rendertarget 캐시 모드가 2048 크기 제한을 넘어 2048이 초과 메모리 지출을 늘린다.또 재회할 때 지출이 크지만, drawcall 을 줄이고, 과장 성능이 가장 높다.webGL 의 명령 캐시 모드가 노드 및 명령 조직을 줄일 뿐, drawcall, 성능 중등은 줄지 않습니다.

CcheAS를 설치한 후, statticCache = true = 자동업데이트 캐시 업데이트를 막기 위해 리Cache 방법으로 캐시 업데이트를 변경할 수 있습니다.

카치스는 주로 두 방면으로 성능을 향상시킨다.노드 줄임과 정점 계산, 둘째는 drawCall 감소.카치어스는 엔진 최적화 성능의 이기적이다.

10,000개의 텍스트를 그리기 (컴퓨터의 성능에 따라 결정, 본 예는 10,000):


```javascript

Laya.init(550,400,Laya.WebGL);
Laya.Stat.show();
var textBox = new Laya.Sprite();
for(var i=0;i<10000;i++){
    txt=new Text();
    txt.text=(Math.random()*100).toFixed(0);
    txt.color="#CCCCCC";
    txt.x=Math.random()*550;
    txt.y=Math.random()*400;
    textBox.addChild(txt);
}
Laya.stage.addChild(textBox);
```


다음은 필자 컴퓨터의 운영 시 캡처, FPS 는 52위로 안정됐다.

![1](img/1.png)</br>>

(그림 1)

텍스트가 있는 용기를 cacheAs 로 설정한 후 다음과 같은 예를 들어 성능이 높은 승진을 받으며 FPS 는 60프레임에 이르렀다.


```javascript

//...省略其他代码...
var textBox=new Laya.Sprite();
textBox.cacheAs="bitmap";
//...省略其他代码...
```


![2](img/2.png)</br>>

(2)

### **다섯글자**

실행할 때, 사각이 없는 텍스트보다 한 번 더 호출 명령을 설정했습니다.이때 CPU 사용량과 텍스트의 수량은 정비례다.따라서 대체방안을 최대한 사용하여 같은 수요를 완성할 수 있다.

· 거의 변동되지 않는 텍스트 내용에 대해 cacheAs 가 성능을 낮춰'도형 렌더 성능-cacheAs'를 볼 수 있다.

· 내용이 자주 변동되지만, 사용하는 문자 수가 적은 텍스트 필드를 선택할 수 있습니다.

### **6、텍스트 버전 건너뛰기, 직접 렌더링**

대다수의 경우 많은 텍스트가 복잡한 조판을 필요로 하지 않고 단순히 한 줄만 표시한다.이 요구에 맞게 Text 가 제공한 이름은 changgeText라는 방법으로 바로 순위를 뛰어넘을 수 있다.


```javascript

var txt=new Laya.Text();
txt.text="text";
Laya.stage.addChild(txt);
//后面只是更新文字内容，使用changeText能提高性能
txt.changeText("text changed.");
```


Text.change Text 는 그림 지령을 직접 수정할 수 있습니다. 이 앞의 그림 지령은 여전히 존재하는 행동으로 change Text 이하 상황에만 사용됩니다:

· 텍스트는 한줄밖에 없다.

· 텍스트의 스타일은 시종 변하지 않는다 (색상, 굵기, 사체, 정렬 등) 이다.

그럼에도 실제 프로그래밍에는 이런 수요를 자주 사용한다.