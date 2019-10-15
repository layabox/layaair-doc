#CPU 사용량 감소



### **동적 속성 찾기**

자바스크립트의 어떤 대상도 동태입니다. 당신은 제멋대로 속성을 추가할 수 있습니다.그러나 대량의 속성에서 어떤 속성을 찾아보면 시간이 많이 걸리게 된다.몇몇 속성치를 빈번히 사용하려면 일부 변수를 사용하여 저장할 수 있습니다:


```javascript

function foo()
{
    var prop = target.prop;
    // 使用prop
    process1(prop);
    process2(prop);
    process3(prop);
}
```




###타이머

레이어는 두 개의 타이머 순환을 제공하여 코딩 블록을 실행한다.

일.`Laya.timer.frameLoop`프레임 주파수에 의존하여 Stat.FPS 를 통해 현재 프레임 주파수를 볼 수 있습니다.


이.`Laya.timer.loop`실행 주파수는 인자 지정 시간에 의존한다.




```javascript

Laya.timer.frameLoop(1, this, animateFrameRateBased);
Laya.stage.on("click", this, dispose);
function dispose() 
{
    Laya.timer.clear(this, animateFrameRateBased);
}
```


한 대상의 생명 주기가 끝나면 내부의 Timer 를 제거하는 것을 기억합니다:



 

 



### **3, 디스플레이 대상 변경의 방법**

상대 레이아웃에서 디스플레이 대상의 경계를 정확하게 얻어야 한다.디스플레이 대상을 얻는 경계도 여러 가지 방법이 있지만, 그 차이는 알 필요가 있다.

일.**getBounds/getGraphicbounds 사용**



   
```javascript

   var sp = new Sprite();
   sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
   var bounds = sp.getGraphicBounds();
   Laya.stage.addChild(sp);
   ```


getBounds 는 다수의 수요를 만족시킬 수 있지만, 국경을 계산해야 하기 때문에 빈번한 호출에 적합하지 않다.

이.**용기를 설정하는 autoSize true.**


```javascript

var sp = new Sprite();
sp.autoSize = true;
sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
Laya.stage.addChild(sp);
```


상술한 코드 는 실행 시 정확하게 얻을 수 있다.autosize (autosize) 가 높고 목록의 상태가 바뀌면 다시 계산 (autosize getBoudns 로 계산할 수 있습니다.그래서 많은 자녀 대상을 가진 용기에 대한 응용 autosize는 얻지 못할 것이다.size 설정이 되면, autosize가 효과를 볼 수 없습니다.

​**loadImage 사용 후 가져오기 폭:**


```javascript

var sp = new Sprite();
sp.loadImage("res/apes/monkey2.png", 0, 0, 0, 0, Handler.create(this, function()
{
    console.log(sp.width, sp.height);
}));
Laya.stage.addChild(sp);
```


loadImage 는 완성된 회답 함수를 가재한 후 폭 높게 얻을 수 있다.

삼.**직접 size 설정:**


```javascript

Laya.loader.load("res/apes/monkey2.png", Handler.create(this, function()
{
    var texture = Laya.loader.getRes("res/apes/monkey2.png");
    var sp = new Sprite();
    sp.graphics.drawTexture(texture, 0, 0);
    sp.size(texture.width, texture.height);
    Laya.stage.addChild(sp);
}));
```


Graphics.drawTexture 를 사용하여 용기의 넓이를 자동으로 설정하지 않습니다. 하지만 Texture 의 넓이를 사용하면 용기를 부여할 수 있습니다.이것은 가장 효율적인 방식이다.

**주: getGraphicsBounds 는 벡터 그리기 크기가 높습니다.**



### **4. 활동 상태에 따라 프레임 주파수를 바꾼다**

프레임은 세 가지 패턴이 있다.

##- Stage.FRAMEu SLOW FPS 유지Stage.FRAMEu FAST 유지 FPS 는 60;
- Stage.FRAMEu MuSE는 FPS 를 선택하여 30이나 60프레임을 유지한다.



때로는 게임이 60FPS의 속률로 실행될 필요는 없다. 30FPS는 이미 많은 상황에서 인간의 시각을 만족시킬 수 있지만 마우스가 교차할 때, 30FPS는 화면의 연결이 되지 않을 수 있기 때문에 Stage.FRAME 무무스가 출동한다.

다음은 Stage.FRAMEu SLOW 의 프레임율을 보여 그림천에서 마우스를 이동시켜 동그랗게 이동시키기:


```javascript

Laya.init(Browser.width, Browser.height);
Stat.show();
Laya.stage.frameRate = Stage.FRAME_SLOW;
  
var sp = new Sprite();
sp.graphics.drawCircle(0, 0, 20, "#990000");
Laya.stage.addChild(sp);
  
Laya.stage.on(Event.MOUSE_MOVE, this, function()
{
    sp.pos(Laya.stage.mouseX, Laya.stage.mouseY);
});
```


​![图片1.png](img/1.png)< br >>
(그림 1)

이 때 FPS 는 30을 표시하고 마우스를 이동할 때 동그랗게 된 업데이트와 연결되지 않는 것을 느낄 수 있다.Stage.frameRate. Stage.FRAMEu MOUSE:


```javascript

Laya.stage.frameRate = Stage.FRAME_MOUSE;
```


​![图片1.png](img/2.png)< br >>
(2)

이때 마우스 이동 후 FPS 는 60을 나타내고 화면이 원활하게 높아진다.마우스가 2초 이상 움직이지 않는 상태에서 FPS 는 30프레임으로 회복된다.



### **5, callLater 사용**

callLater 는 코드 블록을 본 프레임 렌더로 연기합니다.현재 조작이 빈번히 어떤 대상의 상태를 바꾼다면, 이 때 콜렛 사용을 고려해 중복 계산을 줄일 수 있다.

하나의 도형을 고려하여, 다른 외관을 바꾸는 속성을 설정하면 도형을 다시 그릴 수 있습니다.


```javascript

var rotation = 0,
scale = 1,
position = 0;
  
function setRotation(value)
{
    this.rotation = value;
    update();
}
  
function setScale(value)
{
    this.scale = value;
    update();
}
  
function setPosition(value)
{
    this.position = value;
    update();
}
  
function update()
{
    console.log('rotation: ' + this.rotation + '\tscale: ' + this.scale + '\tposition: ' + position);
}
```


다음 코드 변경 상태:


```javascript

setRotation(90);
setScale(2);
setPosition(30);
```


콘솔의 인쇄 결과는:


```javascript

rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```


update 는 세 번 호출되었고, 마지막 결과는 옳았지만, 두 번 호출은 필요 없다.

세 군데 update 변경 시도:


```javascript

Laya.timer.callLater(this, update);
```


이때 update 는 한 번밖에 호출할 수 없고 우리가 원하는 결과입니다.



### **6、그림/도집 가재**

그림 / 그림의 다운로드가 완료되면 엔진은 그림 자원을 처리하기 시작한다.그림 한 장을 다운로드하면 모든 그림을 처리합니다.한 번에 대량의 그림을 처리하면, 이 과정은 성장 시간의 카드를 만들 수 있다.

게임의 자원을 다운로드하는 중 자원은 관문, 장면 등에 따라 분류할 수 있다.같은 시간에 처리한 그림이 좋아질수록, 당시의 게임 응답 속도도 빨라진다.자원 사용이 완료된 후에도 해제되어 메모리를 석방할 수 있다.


 