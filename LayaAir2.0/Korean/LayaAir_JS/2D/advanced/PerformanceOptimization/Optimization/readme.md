#메모리 최적화

발표 시간: 2016-12-30

### **대상 못**

대상지, 반복 사용 대상에 이르렀다.응용 프로그램을 초기화하는 동안 일정 수량을 생성하고 그 저장소에 저장합니다.한 대상에 대한 작업이 완성된 후 이 대상을 못 안에 두면 새로운 대상이 필요할 때 검색할 수 있다.

실제 예화 대상 비용이 높기 때문에 사용 대상 지중용 대상은 실례화 대상의 수요를 줄일 수 있다.쓰레기 회수기 운행의 기회를 줄여 프로그램의 운행 속도를 높일 수 있다.

이하 코드 사용`Laya.utils.Pool：`


```javascript

var SPRITE_SIGN = 'spriteSign';
var sprites = [];
function initialize()
{
    for (var i = 0; i < 1000; i++)
    {
        var sp = Pool.getItemByClass(SPRITE_SIGN, Sprite)
        sprites.push(sp);
        Laya.stage.addChild(sp);
    }
}
initialize();
```


initialize 에서 크기가 1000개의 대상지입니다.

다음 코드는 마우스를 클릭할 때 목록의 모든 디스플레이 대상을 삭제하고, 이후의 다른 작업에서 이 대상을 반복합니다:


```javascript

Laya.stage.on("click", this, function()
{
    var sp;
    for(var i = 0, len = sprites.length; i < len; i++)
    {
        sp = sprites.pop();
        Pool.recover(SPRITE_SIGN, sp);
        Laya.stage.removeChild(sp);
    }
});
```


Pool.recover 를 호출한 후 지정된 대상은 지내로 회수된다.



 



### **2, Handler.create 사용**

개발 과정에서 꾸준히 Handler 를 사용해 비동기 조정을 완성한다.Handeler.create 는 내장 관리를 사용하여 Handler 대상을 사용할 때 Handler.create를 사용하여 조정 프로세서를 작성해야 합니다.이하 코드가 Handler.create 불러오기 프로세서를 사용합니다:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded));
```


위 코드에서 환율이 집행 후 Handler 는 대상지에 의해 회수된다.이 때 다음 코드가 무슨 일이 생길지 고려해 보세요.


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading));
```


위 코드에서 Handler.create 로 되돌아온 프로세서 처리 프로그래밍을 사용합니다.이 시간의 응답자가 실행된 후 상대 못에서 회수되자 프로그레스 사건은 한 번 건드렸을 때 네 개의 once 인자를 false 로 설정해야 합니다:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading, null, false));
```





 



### **메모리**

자바스크립트가 실행할 때 쓰레기 수거기를 시작할 수 없습니다.대상이 회수될 수 있으니 이 대상에 대한 모든 인용을 삭제하십시오.Sprite 가 제공하는 destory 는 내부를 null 인용할 수 있도록 도와줍니다.

예를 들어 다음 코드 확보 대상은 쓰레기로 회수될 수 있다.


```javascript

var sp = new Sprite();
sp.destroy();
```



해당 대상이 null 설정되어 메모리에서 삭제하지 않습니다.시스템이 메모리가 충분하다고 생각할 때 쓰레기 회수기가 실행될 수 있다.메모리 분배 (상대 삭제) 가 쓰레기 회수를 촉발한다.

쓰레기 회수 기간에 대량의 CPU 점용과 성능에 영향을 줄 수 있다.중용 대상을 통해 쓰레기 회수 제한을 시도한다.쓰레기 회수기는 상대를 적게 찾기 위해 가능한 한 null 인용을 인용할 수 있다.때때로(예를 들어 두 개의 대상을 인용할 수 없고, 두 개의 인용을 null, 쓰레기 회수기는 접근할 수 없는 대상을 제거하고, 이는 인용계수보다 성능을 더 소모할 수 있다.

### **자원 마운트**

게임 실행 시 많은 자원을 다운로드할 수 있습니다. 이 자원은 사용이 완료된 후에 제때에 해제해야 합니다. 그렇지 않으면 메모리에 남아 있습니다.

다음은 자원 복사 후 자원 마운트 전과 마운트 해제 후 자원 상태를 보여 줍니다:


```javascript

var assets = [];
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
  
Laya.loader.load(assets, Handler.create(this, onAssetsLoaded));
  
function onAssetsLoaded()
{
    for(var i = 0, len = assets.length; i < len; ++i)
    {
        var asset = assets[i];
        console.log(Laya.loader.getRes(asset));
        Laya.loader.clearRes(asset);
        console.log(Laya.loader.getRes(asset));
    }
}
```


### **필터, 커버**


필터 효과를 최대한 줄이려고 합니다.필터 (BlurFilter 와 GlowFilter) 를 디스플레이 대상에 적용할 때 메모리 중 두 장의 비트맵을 생성합니다.이 중 각 위치의 크기는 디스플레이 대상과 같다.첫 번째 비트맵을 디스플레이 대상의 격자 버전으로 만든 다음 필터를 생성할 수 있는 다른 비트맵:

​![图片1.png](img/1.png)< br >>
(그림 1)

응용 필터 때 메모리 중 두 비트맵

필터를 수정하는 어떤 속성 또는 디스플레이를 할 때 메모리 중 두 개의 비트맵이 생성된 비트맵을 생성할 수 있습니다. 이 두 개의 비트맵은 대량의 메모리를 점용할 수 있습니다.이 과정은 CPU 계산에 관련되어, 동적 업데이트 시 성능 (그래픽 렌더링 성능 – cacheAs) 을 볼 수 있습니다.

ColorFiter 는 Canvas 를 렌더해서 모든 픽셀을 계산해야 하며 WebGL 의 GPU 소모는 무시할 수 있다.

최선의 방법은 가능한 한 그림 창작 도구를 사용하여 모의 필터를 만드는 것이다.실행할 때 동적 위치를 생성하는 것을 피하면 CPU 또는 GPU 부하를 줄일 수 있다.특히 필터를 적용하고 수정하지 않는 그림입니다.

###  **6, 기타 최적화 전략**

1. 입자 사용량 감소, 플랫폼 Canvas 모드에서 가능한 한 입자를 쓰지 않는다;
2. Canvas 모드에서 회전, 축소, alpha 등 속성 사용, 이 속성은 성능에 소모된다.(WebGL 모드에서 사용할 수 있다);
3. timeloop 에서 대상 및 복잡한 계산을 만들지 마세요;
4. 용기에 대한 autoSize 의 사용을 최대한 줄이고 getBounds () 의 사용을 줄이기 때문에 이 호출은 계산이 많기 때문;
5. try catch 의 사용을 최대한 적게 사용하여 try catch의 함수 실행이 매우 느리게 됩니다;