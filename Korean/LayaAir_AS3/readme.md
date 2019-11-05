#Layair 엔진 A3과 Flash 원생 A3의 개발 차이

Layaiaia 엔진 Flash AS3 언어 개발 HTML5 게임을 지지하는데 개발자는 주의해야 할 것은 Flash AS3 의 원생 API, Layair 엔진이 지지하지 않는 상황이다. Layaiaiaia 자체로 완벽하고 강력한 API 를 가지고 있기 때문에 엔진은 AS3의 기초문법으로 HTML5 제품 개발을 지원한다.특히 원생 플래쉬 AS3 개발 경험을 가진 개발자에게 API 외에도 이하 차이를 주의해야 하며 소량의 플래쉬 A3의 용법은 레이야아에서도 사용할 수 없다.



##하나, Layair 엔진은 int();

개발자는 Layair 엔진을 사용할 때 int () 를 사용하지 않도록 주의하십시오. Layair 엔진에서 지원되지 않습니다. 만약 관련 기능이 있는 개발에 필요한 경우 parseInt () 대체할 수 있습니다.

**원생 as3 지지를 받지만 Layair 엔진에 지원되지 않는 사례:**


```java

var a:int = int(1.5);//int对浮点数取整在原生Flash开发中支持，LayaAir中不被支持
```


**Layaia 엔진에서 올바른 용법 예제:**


```java

var a:int = parseInt(1.5)//对浮点数取整，LayaAir引擎中需要采用parseInt方法
```






##둘째, 마스크 커버의 사용 차이

Layair 엔진에서 마스크를 사용하는 데 주의해야 한다.

1, 마스크는 대상의 내부에 첨가돼 있고, 레이야아 밑의 마크 좌표는 커버대상에 비해 무대가 아니다.

2, 커버가 동태라면 커버 대상을 가리는 리패닛() 방법을 적용해야 한다.

다음은 코드를 통해 차이를 살펴보세요.



###2.1 정적 커버

**원생 as3 지지를 받지만 Layair 엔진에 지원되지 않는 사례:**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.pos(100,100)
mask.graphics.endFill();
sp.mask=mask
```




**Layaia 엔진에서 올바른 용법 예제:**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
mask.pos(sp.x+100,sp.y+100)
sp.mask=mask;
```




###2.2 동적 커버

**원생 as3 지지를 받지만 Layair 엔진에 지원되지 않는 사례:**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.graphics.endFill();
sp.mask=mask;
 
addEventListener(Event.ENTER_FRAME,function():void
{
    mask.x++;
    mask.cacheAsBitmap=true;
    sp.cacheAsBitmap=true;
});
```




**Layaia 엔진에서 올바른 용법 예제:**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
sp.mask=mask;
 
Laya.timer.frameLoop(1,this,function():void
{
    mask.x++;
    sp.repaint();
});
```




##3, Sprite 자신이 그린 graphics 벡터 도형 등록 이벤트 클릭

원생 플래쉬 A3에서 Sprite 요정이 만들어지면 자동으로 계산이 높습니다.하지만 라야아 엔진에서 성능을 절약하기 위해 기본적으로 Sprite 요정은 넓지 않은 것으로 스프릿릿을 위해 충돌 영역을 설치해야 하는 것은 hitArea 또는 size.



**원생 as3 지지를 받지만 Layair 엔진에 지원되지 않는 사례:**


```java

var sprite:Sprite = new Sprite();
sprite.graphics.beginFill(0xffcc00);
sprite.graphics.drawRect(100,100,100,100);
sprite.graphics.endFill();
addChild(sprite);
sprite.addEventListener(MouseEvent.CLICK,onClick);
function onClick(evt:MouseEvent):void
{
    trace("------aaa---------");
 }
```




**Layaia 엔진에서 올바른 용법 예제:**

실행 방법 1:


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```


실행 방법 1:


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(0,0,100,100,"#ff9900");
sprite.size(100,100);
Laya.stage.addChild(sprite);
sprite.on(Event.CLICK,this,onClick);
function onClick(evt:Event):void
{
    trace("-------click--------");
}
```




##사건 상대 파견 차이

사건 대상에 대한 파발 방면은 주로 문법 차이다.Layair 엔진은 이 방법의 키워드 및 인자를 간결하고 풍부하게 만들었다.레이어는 파견과 감청 사건과 함께 데이터를 휴대할 수 있으며, 예를 들어 이벤트 대상 ('자체 정의 사건 형식', ['데이터 원본'), 감청 대상 ('사건 수사함수 수행', '사건 수사함수', '사건 수사함수',' 회송 참수 '"



**원생 as3 지지를 받지만 Layair 엔진에 지원되지 않는 사례:**

**파견:**


```javascript

dispatchEvent(event:Event);
```


**모니터링:**  


```javascript

addEventListener(type,listener,useCapture,priority,useWeakReference));
```




**Layaia 엔진에서 올바른 용법 예제:**

**파견:**


```

派发对象.event(type:String,data:*=null);
```


**모니터링:**  


```

派发对象.on(type,caller,listener,args);
```




##5, 레이어와 A3의 차이

Flash AS3 의 원생 API 쓰기에는 직접 Sprite 를 계승할 수 있지만 Layair 엔진에 메인 문서 입구 (초기화 엔진 전) 이 Sprite를 계승할 수 없다. AS3 전통의 습관에 따라 Sprite를 계승하면 오류가 발생한다.



**잘못된 쓰기:**


```

package  {
    import laya.display.Sprite;
     
    //extends Sprite在LayaAir引擎初始化之前继承会报错
    public class HelloLayabox extends Sprite {
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```




**올바른 쓰기:**


```

package  {
    import laya.display.Sprite;
      
    public class HelloLayabox{
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```






