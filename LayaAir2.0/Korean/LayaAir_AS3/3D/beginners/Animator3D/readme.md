#Laya2.0 모형 애니메이션 사용

laya2.0 중 3D 모형 애니메이션 심도 수정과 최적화, 일부 기능과 1.0의 사용 방법과 달리 인터페이스 추가이 문서는 최근 개발자 피드백이 많은 3D 모형 애니메이션의 방영 문제를 일시 감청 사건 등의 문제의 한 결말을 중단한다.

###애니메이션 타임

1.0 에서 우리 3D 시스템은 애니메이션 재생 의 주동적 으로 멈춰 는 스킨앤애니.player.stop();이 stop 방법은 즉각 애니메이션 을 멈췄다. 이것은 2.0 에서 3D 애니메이션 을 수정하는 속도 를 최적화했다.개발자는 애니메이션의 재생 속도를 직접 사용하여 애니메이션의 일시정지와 재생할 수 있기 때문에 1.0 중 stop 방법을 취소했다.

2.0의 3D 애니메이션 일시정지 애니메이터.sped = 0


```javascript

//添加蒙皮动画角色模型
Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
//加载到场景
var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
//让摄影机指向角色
camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
//获取角色动画组件
var ani:Animator = hero.getChildAt(0).getComponent(Animator);
ani.speed = 0;//暂停动画播放	
}));
```


(그림 1)

###2, 애니메이션 재생 감청 사건!

3D 캐릭터 애니메이션 사용 중 한 캐릭터의 애니메이션 방송 상태를 모니터링해서 원하는 공격이나 행보 효과!2.0에서 우리는 두 가지 새로운 감청 방식을 보여 애니메이션 감청을 했다.

#####1, 현재 애니메이션 재생 백분율

![1](img/1.png)  


(2)

#####애니메이션 비순환 재생 시

주석이 쓴 것처럼 애니메이션**비순환**(비순환모드) 방영할 때 이 normalizedTime 는 0.0~1의 숫자가 현재 애니메이션 1을 대표하는 것은 현재 애니메이션 100퍼센트로 방영된 것이다. 이 수는 현재 애니메이션 재생의 백퍼센트를 이해할 수 있다. 0.1은 현재 10퍼센트로 재생된다.

##### **애니메이션 재생 시**

이 값은 모든 방송 완료 후 + 1도 현재 재생 애니메이션 재생에 몇 번을 완성하고 있으며, 현재 재생 중인 애니메이션의 백분비다.예를 들어 애니메이션 순환 순환으로 3번을 틀었는데 이 숫자는 3.0이 4번을 반으로 틀면 3.5.5.

이렇게 되돌아간다는 뜻은 이 귀환값에 따라 애니메이션의 상태 감청례: 만약 3

내가 감청한 애니메이션은 순환 애니메이션이고, 애니메이션은 매번 60%에서 50%를 넘을 때 나는 배역을 보x 로 생성시키고,


```javascript

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
				
				Laya.timer.frameLoop(1,this,onFrame)
			}));
		}
		private function onFrame():void{ 
		trace(heroAni.getCurrentAnimatorPlayState(0).normalizedTime);
		//当动画播放到百分之五十到六十之间时进行克隆
		if (0.6>(heroAni.getCurrentAnimatorPlayState(0).normalizedTime-Math.floor(heroAni.getCurrentAnimatorPlayState(0).normalizedTime))>0.5)
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
```


(그림 3)

###3, unity 애니메이션 이벤트 설정

유닛의 애니메이터에 우리는 애니메이션 트리밍 이벤트 AAAAA 포맷 4

이 사건은 애니메이션이 이 위치에 방영될 때 우리 AAA 라는 이름을 건드리는 방법이다.

유닛에 이벤트를 설치한 뒤 애니메이션 모형을 마지막으로 내보내겠습니다.

![2](img/2.png) 


(그림 4)

laya 에서 우리는 이 사건을 접수할 수 있는 스크립트를 만들 수 있다.

우선 우리는 레이야에서 스크립트를 만들고, 스크립트 제목은 이벤트의 촉발에 영향을 주지 않기 때문에 무작위로 이름을 지어서 'AAAA' 라는 제목을 유닛에 설치하는 이벤트 제목과 동일, 5

![3](img/3.png) 


(그림 5)

그리고 우리는 이 스크립트를 애니메이션 노드에 추가하면 돼 (* 애니메이션 노드 바로 네가 유닛에 이 animator 구성된 그 물체 노드

![4](img/4.png) 


(그림 6)