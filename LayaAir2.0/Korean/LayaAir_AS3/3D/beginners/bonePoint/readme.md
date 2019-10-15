##Layaiar3D의 골격

###골격 개설

골격 단점 기술은 3D 게임에서 매우 보편적이며, 예를 들면 무기가 캐릭터의 손동작에 따라 변화하고, 우리는 무기와 손에 뼈를 묶어 묶고 무기를 손잡고, 무기는 손뼈의 층급으로 자연히 손의 동작과 변화할 수 있다.

물론 바인딩 후 3D 모형도 인코딩을 통해 납치하거나 다른 3D 모델을 바꿀 수 있다. 이런 방식으로 무기나 장비의 환장 기능을 실현할 수 있다.



###유닛 에 골격 을 설치 하다

골격이 유나이티에 설치가 매우 편리하여 장면의 자원 계급에서 직접 조작할 수 있다.다음 그림 (그림 1)

납치해야 할 대상은 3D 용기이며, 3D 모형일 수 있으며, 그 위치를 잘 조정한 뒤 지정 골격 아래로 끌어들이면 스트랩으로 묶어서 묶어 성공했다. 애니메이션 재생 시, 골격 애니메이션에 따라 변화하는 것을 발견할 수 있다.

때로는 우리가 처음 시작할 때 무기가 필요할 때도 있지만, 또 다른 3D 모델 또는 여러 모형을 추가할 수 있다.

![图1](img/1.png)< br > (그림 1)

**Tips: 골격 단점이 설치된 후 골격과 단점 대상은 자동으로 ls 나 lh 파일에서 우리는 getChildByName () 방법을 통해 그것들을 얻을 수 있습니다.그러나 특히 주의해야 한다: 뼈가 걸려 있을 때 빈 컨테이너 대상만 묶으면 나중에 동적 첨가 대상에 쓰일 때 GameObject Setting 중 Ignore Null Game Objects 에서 비어있는 노드 설정을 무시하고, 그렇지 않으면 빈 용기 연결 대상은 ls 나 lh 로 내보내지 않는다.**  



###코드 에서 골격 을 실현 하다

일반적인 상황에서 우리는 모두 유니티에서 골격을 첨가하러 간다.하지만 Layaiair 엔진도 코드의 단장 방식을 제공해 유연하게 첨가와 골격 단점을 제거할 수 있다.

애니메이터 애니메이션 구성 요소는 두 가지 실례 방법을 제공했다**linksprite3DToAvatarNode ()**과**unLinksprite3DToAvatarNode ()**연결점 추가 및 제거 가능 (그림 2, 그림 3).

Tips: 골격 애니메이션 첨가하기 전에 미술은 골격 노드를 필요로 하는 이름이다.

![图2](img/2.png)< br > (그림 2)

![图3](img/3.png)< br > (그림 3)

구체적으로 사용하는 코드 참고는 다음과 같습니다:

장면에서 뼈 애니메이션 모형을 획득한 애니메이션 구성 요소 — 단축점 대상 — 애니메이션 구성을 통해 뼈와 고리를 납치했다.


```typescript

  //从场景中获取动画模型
  var monkey:Sprite3D=scene.getChildByName("monkey") as Sprite3D;
  //获取动画模型中动画组件
  var monkeyAni:Animator=monkey.getComponentByType(Animator) as Animator;

  //需要挂点的3D对象
  var box:MeshSprite3D=new MeshSprite3D(new BoxMesh(1,1,1));
  //将3D对象加载到角色中（一定要加入到角色的Animator模型上）
  monkey.getChildAt(0).addChild(box);
  //将挂点物品添加到某个骨骼上（美术提供骨骼的名称）
  monkeyAni.linkSprite3DToAvatarNode("RHand",box);

  //将挂点物品从骨骼上移除（美术提供骨骼的名称）
  //monkeyAni.unLinkSprite3DToAvatarNode("RHand",box);
```




###골격 접점 운용 사례

다음은 마법 공격의 간단한 예로 골격 걸이의 운용 (도 4) 를 보여 드리겠습니다.

![图4](img/4.gif)< br > (그림 4)

우선 1 중 유나이티에는 마법광권이 오른손 뼈의 노드 등급을 설치해 오른손 뼈 뼈를'RHand', 마법광권은'weapon'으로 바꾸며 ls 자원 파일로 내보내는 것이다.내보내면 수골격과 광권이 모형에 나타난 하위 파일 중 (도 5) 에 따라 수용할 수 있다.

![图5](img/5.png)< br > (그림 5)

그림 4 마법 공격 효과 에 따라 두 종류 를 통해 실현 할 수 있다. 하나 는 주류 La3Du Bonpoint.aint.as, 애니메이션 재생 및 생성 마법 무기를 실현하는 방안: 공격 애니메이션 에서 36 프레임 좌우로 방영될 때, 복제는 점과 같은 신마법무기를 추가하고 무기를 추가하여 비행, 원시에는 무기를 잠시 숨기고, 애니메이션 이 완료된 후다시 보기로 모의는 마법이 생기고 마법의 효과를 던진다.

무기 스크립트 Weaponscript.a가 마법 비행과 소각을 실현한다.모든 코드 다음과 같습니다:


```typescript

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
  import laya.d3.component.Animator;
  import laya.d3.component.Script3D;
  public class LayaAir3D {
    public var box :MeshSprite3D;
  public var scene:Scene3D;
  public var weaponIsClone:Boolean = false;
  public var heroAni:Animator;
  public function LayaAir3D() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Stage.SCALE_FULL;
    Laya.stage.screenMode = Stage.SCREEN_NONE;

    //开启统计信息
    Stat.show();

    //添加3D场景
    scene = Laya.stage.addChild(new Scene3D()) as Scene3D;

    //添加照相机
    var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
    camera.transform.translate(new Vector3(0, 3, 3));
    camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
    directionLight.color = new Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

    box = new MeshSprite3D(new BoxMesh(0.3,0.3,0.3));

    Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
      var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
      hero.getChildAt(0).addChild(box);
      heroAni = hero.getChildAt(0).getComponent(Animator)
      heroAni.linkSprite3DToAvatarNode("Dummy002",box);

      Laya.timer.frameLoop(1,this,function():void{
        onFrame();
      })
    }));
  }
  private function onFrame():void{ 
    //当动画播放到百分之五十到六十之间时进行克隆
    if (0.6>(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.5)
    {
      if(weaponIsClone)return;
      trace("sssssss")
      //克隆模型（位置，矩阵，等信息全被克隆）
      var weaponClone:Sprite3D = Sprite3D.instantiate(this.box);
      //为模型添加在定义脚本
      weaponClone.addComponent(WeaponScript);		
      //把克隆的武器放入场景中
      scene.addChild(weaponClone);
      weaponIsClone = true;
    }
    else if ((heroAni.getCurrentAnimatorPlayState(0)._normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0)._normalizedTime))>0.98)
    {
      weaponIsClone = false;
    }

  }
}
}
```



```typescript

package {
	import laya.components.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.RenderState;
	import laya.d3.core.material.PBRStandardMaterial;
	import laya.d3.math.Vector4;
	import laya.d3.math.Vector3;
	import laya.d3.core.material.PBRSpecularMaterial;
	import laya.d3.component.Script3D;

	public class WeaponScript extends Script3D {
		//**************** wq *****************************************
        //被脚本绑定的物体
        private var weapon:MeshSprite3D;
        //武器生命周期
        public var lifeTime:int = 30;
		public function WeaponScript() {

        }
        /**
		 * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
		 */
        override public function onAwake():void{
            //得到3D对象
            weapon  = this.owner as MeshSprite3D;
        }
        /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
        override public function onUpdate():void{
            //所属脚本对象旋转更新
            weapon .transform.rotate(new Vector3(0,0.5,0),false,false);
            weapon.transform.translate(new Vector3(0,0,0.2),false);
            lifeTime--;
            if (lifeTime<0)
            {
                lifeTime = 100;
                //直接销毁脚本保定对象会报错（对象销毁后脚本还会在更新一次，找不到绑定对象会错误）
                //因此延迟一帧销毁
                Laya.timer.frameOnce(1,this,function():void{
                    weapon.destroy();
                })
            }
        }
    }
}
```
