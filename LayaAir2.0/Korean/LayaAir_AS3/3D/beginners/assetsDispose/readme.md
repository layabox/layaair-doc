##Layaiar3D 자원 석방

###### 修改时间:2019-4-24,version:2.0.1

###왜 자원 석방

레이어르 3D 게임 개발에서 자원 석방이 중요하다.3D 자원은 모형, 스티커, 재질, 애니메이션 등을 포함해 좋은 화면 효과를 위해 파일이 2D보다 많이 크고, 3D 엔진은 기본 모든 자원을 GPU 에 넣어서 렌더를 계산하기 때문에 많은 현존을 점용한다.게임 관람료가 계속 가재되고, 게임이 끊임없이 깊숙이 들어가 있는 자원이 갈수록 많아지고, 자원을 방출하지 않으면 게임이 결국 무너진다.

메모리 같지 않고 메모리 쓰레기 회수 메커니즘이 있으며, 현존이 다르므로 수동적으로 석방되어야 하기 때문에 현존하는 자원 석방은 중요시되어야 합니다!

관찰도 1, 도 2중 통계 도구 중 현존 크기

그림 1은 게임 시작 후 가재된 첫 장면으로 면 수는 30527, 현존 85.2m이다.

![图1](img/1.png)< br > (그림 1)

2 게임에 게재된 2장면, 면수는 7455 정도였지만 재재 후 현존자원은 118.91m이다.이게 무슨 이유죠?면수가 적고, 장면이 작고, 스티커도 사실 1 중 장면이 적고, 사진만 찍는 것만으로도 많이 작지만, 명존자원이 더 커졌다!

1관의 장면이 석방되지 않았기 때문에 자원이 아직도 남아 있어 현존점용이 커졌다.만약 수동적으로 청소하지 않으면, 게임은 다른 장면을 계속 전환하고, 일정량에 이르렀을 때 휴대폰의 현존은 소모, 게임 카드, 번쩍번쩍, 발열 등의 현상이 빈번히 발생할 수 있다.

![图2](img/2.png)< br > (그림 2)



###자원 재생 시 처리 원칙

Google은 Layaiar3D 엔진을 통해 자원과 현존하는 관계를 볼 수 있습니다. 게임 성능 최적화 목적을 달성하기 위해 자원을 가재할 때도 원칙에 주의해야 합니다.

1. 자원을 연산할 때 모든 자원을 한꺼번에 다운로드하지 말고 자원이 필요한 모드만 가재합니다.3D 자원을 다운로드하면 자원 접미사 이름에 따라 3D 디스플레이를 직접 생성할 수 있으며, 예를 들어 ls 는 Sprite3D 대상 등을 생성할 것이며, 좋은 대상 자원을 생성할 것이고, 무대에 놓지 않았더라도 직접 보관 중 자원이 많이 남아 있다.

2, 합리적 관리 현존, 자주 사용하는 자원은 현존에 석방할 필요가 없으며, 반복하지 않는 자원은 사용하고 즉시 성능을 절약하기 위해 방출한다.예를 들어 주역 자원, 3D 소품 자원, 게이머들이 자주 사용하여 항상 메모 중, 추출 속도가 빠르고, 일부 대형 장면은 교환할 때 자원을 방출할 수 있으며, 장면 관경 체크 스티커, 모형 자원이 커서, 석방 후 수십 조 크기의 현존 비용을 절약할 수 있다.



###현존 자원 방출 방법

재고자원을 방출하는 방법은 두 가지 방법이다. 일종의 대상을 통해 현존자원 대상을 석방할 수 있지만, 자원 대상이 너무 번거롭지 않다는 것을 추천하지 않고, 자원 주소를 통해 현존자원 관리 각도에서 보면 자원 주소를 통해 더 잘 살아 JSON 데이터 목록을 설정할 수 있다.

####광경과 자원의 과도 인터페이스를 전환합니다.

자원과 화면 전환을 가재할 때, IDE 에서 디스플레이 인터페이스를 설정할 때, 그림 3

![图3](img/3.png)< br > (그림 3)

IDE 발표 후 제어 종류를 작성하고 논리적 코드 참조:


```java

package view {
  import ui.ProgressBarUI;

  public class loading extends ProgressBarUI {

    public function loading() {

    }
    public function setValue(num:Number):void{
      this.pro.value = num;
    }
    public function init():void{
      this.pro.value = 0;
      //进度增加帧循环
      Laya.timer.loop(20,this,loop);
    }		
    //资源加载进度模拟*（假进度）
    private function loop():void{
      //进度增加
      this.pro.value +=0.01;
      //最高进度度100%
      if(this.pro.value>=1)
      {
        this.pro.value = 100;
        Laya.timer.clearAll(this);
        this.removeSelf();
      }
    }
  }
}
```




####자원 주소 표 를 통해 현존 자원 을 방출 하다

주류에서 우리는 마우스 복식 무대 방식으로 장소를 바꾸고 자원 주소를 사용하여 현존자원을 풀고 새로운 장면을 가재합니다.

자원 경로 목록을 통해 유연하게 설정된 방식을 통해 표에서 자원을 삭제하는 것도 편리하다.예를 들어 미술을 내보내면 JSON 시계를 새로 지어서 이 장면을 바꿀 때 필요한 자원 경로를 J 시계에 넣어두면 유용한 자원 자원이 불입되지 않으면 자원이 풀리지 않는다. 예를 들어 일부 공용된 NPC, 도구, 특효 등 게임 원소 자원을 사용한다.

Tips: 광경 사진 스티커 lightmap, 소재, lmat, 모형, 다양한 유형 스티커, png, jpg, 애니메이션, 골격.

다음은 자원 리스트 방법을 소개합니다. 우선 자원 파일 목록에서 json 파일을 만들고, 석방할 경로자원을 편집하고, Json 디지털, 이름은 ls 파일과 일치하여 논리적 호출, 이 예를 들어 loveScen.json 입니다.그림 5, 6.

![图5](img/5.png)< br > (그림 5)

![图6](img/6.png)< br > (그림 6)

Json 이 편집한 후 도구 검출 형식이 올바르지 여부를 검사할 수 있습니다.다음 주 코드 만들기:


```java

package {
  import laya.d3.core.Camera;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.light.DirectionLight;
  import laya.d3.math.Vector3;
  import laya.d3.math.Vector4;
  import laya.d3.resource.models.BoxMesh;
  import laya.display.Stage;
  import laya.utils.Stat;
  import laya.d3.core.scene.Scene3D;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.webgl.resource.Texture2D;
  import laya.utils.Handler;
  import view.loading;
  import laya.events.Event;
  import laya.resource.Resource;
  public class LayaAir3D {
    public var load:loading;
    private var scene:Scene3D;
    public function LayaAir3D() {

      //初始化引擎
      Laya3D.init(0, 0);

      //适配模式
      Laya.stage.scaleMode = Stage.SCALE_FULL;
      Laya.stage.screenMode = Stage.SCREEN_NONE;

      //开启统计信息
      Stat.show();
      //加载2D资源文件
      Laya.loader.load("h5/res/atlas/comp.atlas",Handler.create(this,Complete2D));
    }
    public function Complete2D():void{
      //实例化加载进度界面
      load = new loading();
      Laya.stage.addChild(load);
      load.init();
      //加载场景3D资源(不能全部加载，否则太占显存)
      Laya.loader.create(["h5/LayaScene_test/test.ls","h5/LayaScene_twonScene/twonScene.ls"],Handler.create(this,Complete3D))

    }	
    //加载3D资源完成的回调
    public function	Complete3D():void{
      //添加场景
      scene = Laya.stage.addChild(Laya.loader.getRes("h5/LayaScene_test/test.ls"))as Scene3D;
      Laya.stage.setChildIndex(scene,0);
      //点击游戏画面切换场景
      Laya.stage.on(Event.MOUSE_DOWN,this,ChangeScene);
    }
    //加载第二关场景资源，切换场景
    private function ChangeScene():void{
      //去除场景的点击切换事件
      Laya.stage.off(Event.MOUSE_DOWN,this,ChangeScene);
      //移出之前的场景
      scene.removeSelf();
      load.init();
      Laya.stage.addChild(load);
      scene.destroy();

      //加载第二关场景资源到游戏中
      scene = Laya.loader.getRes("h5/LayaScene_twonScene/twonScene.ls");
      Laya.stage.addChild(scene);
      //设置游戏场景层级
      Laya.stage.setChildIndex(scene,0);

      //列表释放显存资源的方法（利用资源表方式，每个场景配置资源路径表）
      assetsDispose();
    }
    private function assetsDispose():void{
      //加载释放的资源配置表
      Laya.loader.load("loveScene.json",Handler.create(this,this.onAssetOK));
    }
    //加载资源释放表完成后
    private function onAssetOK():void{
      //获取加载的数据（Json数据转换成数组）
      var arr:Array = Laya.loader.getRes("loveScene.json");
      for(var i:Number = arr.length-1;i>-1;i--)
      {
        //根据资源路径获取资源
        var resource:Resource = Laya.loader.getRes(arr[i].url)as Resource;
        //非空
        if(resource)
        {
          //销毁资源
          resource.destroy();
        }
        else
        {
          console.log(arr[i].url);
        }
      }
    }
  }
}
```


이 같은 코드의 asetsdispose (asetsul:String) 방법을 살펴 설정표를 다운로드한 후 우리는 Laya.loader.getRes(arr[i].url) 방법으로 자원을 직접 취득한 대상(창건할 때 url 후두에 따라 다른 유형 대상, getRes 방법은 직접 읽을 수 있다.Layaiar2.0 공식 버전 이후 이미 resource.destroy () 방법으로 통일된 후 자원을 방출할 수 있다.

자원을 풀고 나면 Loader.loade Map 속성을 통해 기존 캐시 중인 자원을 볼 수 있다.

상술한 코드를 번역하는 것은 그림 4 효과를 볼 수 있고, 석방되어 새로운 장면을 가재할 때, 명존은 이전보다 많이 작았다.이전에 자원을 석방하지 않았을 때 118.91m로 석방된 뒤 현존은 56.11M만 차지했다.

![图4](img/4.png)< br > (그림 4)

###자원 자동 석방

Layaiar2.0은 개발자를 위한 3D 자원 석방에 더욱 편리한 석방 방식을 개발했다.

장면 (또는 요정) 소각 (destory 이곳 은 본체 소각체 가 아닌 복제체 소각 후 호출`Resource.destroyUnusedResources()`사용하지 않은 자원을 자동으로 석방할 수 있다.


```typescript

//自动释放没有被使用的资源
Resource.destroyUnusedResources();
```


