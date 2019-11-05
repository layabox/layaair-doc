#메모리 최적화 방식

###1. 대상 지최적화 메모리

상대 지최화는 게임 개발에서 가장 중요한 최적화 방식이며 게임의 성능에 영향을 주는 중요한 요소 중 하나다.

게임에서 많은 대상이 끊임없이 창립되고, 예를 들면 캐릭터 공격, 특효의 창건과 제거, NPC 의 소멸과 쇄신 등 창설 과정에서 성능을 매우 소모하는 경우가 많다.

대상 지기술은 이상 문제를 해결할 수 있다. 대상을 제거할 때 대상을 회수할 때, 새로운 대상자가 필요할 때 직접 대상지에서 사용한다.

실례화 대상의 지출을 줄이고, 대상을 반복적으로 사용하여 새로운 메모리 분배와 쓰레기 회수기 운행의 기회를 줄이는 것이 장점이다.

**주의하다**대상 이제 시 바로 메모리에서 지워지는 것이 아니라 메모리 부족을 생각할 때만 쓰레기 회수 메커니즘을 사용해 메모리를 소모할 때 카드가 생길 수 있다.**대상 못 을 사용하면 프로그램 의 쓰레기 대상 을 줄이고, 효과적 으로 프로그램 의 운행 속도 와 안정성 을 향상시킨다**.

####1.1 Layair 엔진의 대상 못 종류

Layaiair 엔진에 대상 지류 제공[laya.utils.Pool](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.utils.Pool)대상에 쓰이는 저축, 중복 사용.비교적 자주 쓰는 것은`对象池创建`방법`getItemByClass()`과`回收到对象池`방법`recover()`.그림 1, 그림 2 개.

![1](img/1.png)</br>


(그림 1) 대상 못 만들기 방법

![2](img/2.png)</br>>

(2) 대상지법에 회수하여 사용한 대상자를 상대지에 돌려준다.

####1.2 사용 대상 지최 최적화 사례

이하 코드 시사회는 10프레임당 100프레임 사용 대상 지법에 100개의 눈꽃 만들기, 눈꽃 이동이 국경을 넘어서거나 0시까지 줄여 무대를 이제하고, Pool.recover() 방법을 사용해 지정한 대상을 상대 못으로 회수했다.

##### 


```typescript

class PoolTest {
    private createTime: number = 0;

    constructor() {

        //初始化引擎
        Laya.init(1136, 640, Laya.WebGL);
        //等比缩放
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //背景颜色
        Laya.stage.bgColor = "#232628";
        //帧循环
        Laya.timer.frameLoop(1, this, this.onFrame);

    }
    onFrame(): void {
        //如果创建对象时间为100帧间隔后
        if (this.createTime >= 100) {
            //每200帧间隔创建30个雪花
            for (var i: number = 0; i < 100; i++) {

                //img:Image=new Image(); //不使用对象池的写法
                //通过对象池创建图片，如对象池中无相应的对象，则根据Image类型执行new Image()创建
                var img: Laya.Image = Laya.Pool.getItemByClass("img", Laya.Image);
                //通过锚点设置轴心点
                img.anchorX = img.anchorY = 0.5;
                //图片的资源
                img.skin = "res/snow0.png"
                //在舞台上方随机位置创建
                img.x = Math.random() * 1136;
                img.y = Math.random() * -150;
                //对象池中的图片被缩放了，需重新设置其缩放属性。
                //如果对象中还有其他属性被改变了，
                img.scaleX = img.scaleY = 1;
                //加载到舞台
                Laya.stage.addChild(img);
                //到100帧后创建完对象后时间归0
                this.createTime = 0;
            }
        } else {
            //更新创建时间
            this.createTime++;
        }
        //检测每个舞台中的图片对象，并进行位置更新。
   for(var j:number=0;j<Laya.stage.numChildren;j++)
            {
                //获取舞台中的图片对象
                var img1:Laya.Image=Laya.stage.getChildAt(j) as Laya.Image;
                //位置更新
                img1.y++;
                //缩放更新
                img1.scaleX-=0.001;
                img1.scaleY-=0.001;
                //图片旋转
                img1.rotation++;
                //超出边界或缩放小于0
                if(img1.y>640+20||img1.scaleX<=0)
                {
                    //从舞台中移除
                    Laya.stage.removeChild(img1);
                    //img1.destroy(); //不使用对象池的编写方式,直接用destroy清空             
                    //回收到对象池
                   Laya.Pool.recover("img",img1);
                }
            }
        }
    }

new PoolTest();
//以上代码的说明都在注释里，请详细查看。
```


###2. Handler.create 사용

개발 과정에서 꾸준히 Handler 를 사용해 비동기 조정을 완성한다.Laya.Handler.create 내장 관리를 사용하여 Handler 대상을 사용할 때 Laya.Handler.create 사용 가능합니다.이하 코드 Laya.Handler.create 로 자원을 불러오는 리코더 프로세서:

일.`Laya.loader.load(urls, Laya.Handler.create(this, this.onAssetLoaded));`

우리는 게임에서 게임 논리와 단계에 따라 카탈로그를 배정하고, 1차 자원을 가재 완료하고, Laya.Handler.create () 창건된 complete 이벤트 회수 방법 후 데이터베이스를 되찾는다. 게임을 할 때, 두 번째 자원을 추가할 때, Laya.Handler.create () 가 먼저 상대 못에서 같은 리포트를 검색할 수 있는 프로세서를 찾는다면직접적으로 대상지 중 방법을 사용해 메모리 지출을 절약했다.

####Handler.create 사용에 주의해야 할 곳

![3](img/3.png)</br>>

몇몇 특수한 상황에서 우리는 주의해야 한다`Laya.Hanlder.create()`사용 방식, 3 중`Laya.Hanlder.create()`방법 설명.

대상자 지내에서 Handler 하나를 만들고, 기본값은 한 번 실행하고 즉시 회수한다.

이 메아리를 여러 번 터뜨리는 방법이 필요하다면 맞을 필요가 있다`Laya.Hanlder.create()`방법의`once`인자 설정`false`.또는`new Laya.Handler()`생성 방법.

예를 들어 우리는 게임을 시작하여 인터페이스에 자원을 가재할 필요가 있으며, 다음의 인코딩은 잘못된 것이다.

일.`Laya.loader.load(urls, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading));`

위 코드 중 사용`Laya.Handler.create(this,this.onLoading)`되돌아오는 메아리 방법은 프로그레스 가재 진도 사건을 처리해야 하며, 한 번 조정 후 대상자의 회수가 되자 프로그레스 가재 진도 사건은 한 번 만료되었지만 실제 자원이 재적되지 않았고, 이런 인코딩은 우리의 예상 수요에 이르지 않았다.

정확한 쓰기는:


```

Laya.loader.load(urls, Laya.Handler.create(this,this.onAssetLoaded), Laya.Handler.create(this,this.onLoading, null, false));
```


아니면:

일.`Laya.loader.load(urls, Laya.Handler.create(this,this.onAssetLoaded), new Laya.Handler(this, this.onLoading));`

**Tips**여기 헷갈릴 수 없는 것은`Handler()`대상지 없는 방식으로,`Laya.Handler.create()`기본 사용 대상 못.Handler 관련 헷갈릴 수 없습니다.

**Handler () API 참조 그림 2-2**：

![4](img/4.png)</br>>

(그림 4)

###3. 메모리 방출

자바스크립트가 실행할 때 쓰레기 수거기를 시작할 수 없습니다.대상이 회수될 수 있도록 해당 대상에 대한 모든 인용을 삭제해야 한다.Sprite 제공`destory()`방법은 내부 인용을 null 인용할 수 있도록 도와준다.

예를 들어 다음 코드 확보 대상은 쓰레기로 회수될 수 있다.

일.`//创建一个Sprite实例`
이.`var sp:Laya.Sprite = new Laya.Sprite();`
삼.`//将sp内部引用设置为null`
사.`sp.destroy();`

해당 대상이 null 설정되어 메모리에서 삭제하지 않습니다.시스템이 메모리가 충분하다고 생각할 때 쓰레기 회수기가 실행될 수 있다.메모리 분배 (상대 삭제) 가 쓰레기 회수를 촉발한다.

쓰레기 회수 기간에 대량의 CPU 점용과 성능에 영향을 줄 수 있다.중용 대상을 통해 쓰레기 회수 제한을 시도한다.쓰레기 회수기는 상대를 적게 찾기 위해 가능한 한 null 인용을 인용할 수 있다.때때로(예를 들어 두 개의 대상을 인용할 수 없고, 두 개의 인용을 null, 쓰레기 회수기는 접근할 수 없는 대상을 제거하고, 이는 인용계수보다 성능을 더 소모할 수 있다.

###4、자원 해제

게임 실행 시 많은 자원을 다운로드할 수 있습니다. 이 자원은 사용이 완료된 후에 제때에 해제해야 합니다. 그렇지 않으면 메모리에 남아 있습니다.

다음은 자원 복사 후 자원 마운트 전과 마운트 해제 후 자원 상태를 보여 줍니다:


```typescript

var assets: Array<any> = []
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
Laya.loader.load(assets, Laya.Handler.create(this, onAssetsLoaded));
function onAssetsLoaded():void
{
  for(var i:number = 0, len: number = assets.length; i<len; ++i)
  {
    var asset:string = assets[i];
    //查看log，清理前资源一直在内存中
    console.log(Laya.loader.getRes(asset));
    //调用清理方法
    Laya.loader.clearRes(asset);
    //查看log，清理后，资源被卸载
    console.log(Laya.loader.getRes(asset));
  }
}
```


일.###5. 필터, 커버

필터 효과를 최대한 줄이려고 합니다.필터 (BlurFilter 와 GlowFilter) 를 디스플레이 대상에 적용할 때 메모리 중 두 장의 비트맵을 생성합니다.이 중 각 위치의 크기는 디스플레이 대상과 같다.첫 번째 비트맵을 디스플레이 대상의 격자 버전으로 만든 다음 필터를 생성할 수 있는 다른 비트맵:



   ![5](img/5.png)</br>>

(그림 5)

응용 필터 때 메모리 중 두 비트맵

필터를 수정하는 어떤 속성 또는 디스플레이를 할 때 메모리 중 두 개의 비트맵이 생성된 비트맵을 생성할 수 있습니다. 이 두 개의 비트맵은 대량의 메모리를 점용할 수 있습니다.이 과정은 CPU 에 대한 계산과 동적 업데이트 시 성능을 낮출 것이다.

ColorFiter 는 Canvas 를 렌더해서 모든 픽셀을 계산해야 하며 WebGL 의 GPU 소모는 무시할 수 있다.

최선의 방법은 가능한 한 그림 창작 도구를 사용하여 모의 필터를 만드는 것이다.실행할 때 동적 위치를 생성하는 것을 피하면 CPU 또는 GPU 부하를 줄일 수 있다.특히 필터를 적용하고 수정하지 않는 그림입니다.