##Layaiar3D 마우스 교호

###마우스 교호 개술

Layaiar2D 엔진에서 2D 디스플레이 대상에는 마우스 이벤트가 사용되며 논리를 작성하기 쉽습니다.Layaiair 3D 엔진에서 이러한 기능을 실현하지 못했습니다. 3D 공간이 더 복잡합니다. 공간에서 넓고 가깝고, 레이어링, 재단, 부자 등 관계와 공간이 계속 바뀌고 있습니다.따라서 3D 엔진은 충돌기, 층과 물리 사선 검출, 충돌 정보의 방식을 채택해 마우스를 판단하고, 다음은 그것들의 개념과 작용을 먼저 파악하도록 한다.



####충돌기 Collider

충돌기는 일종의 물리 구성 요소로 3D 디스플레이 대상에 첨가할 수 있으며, 주로 3D 공간의 물체에서 충돌 검사를 진행하며 3D 디스플레이 대상의 형태에 따라 다른 유형으로 나뉜다.

Layaiar3D 엔진이 지원하는 충돌기는 세 종류로 각각**구형 충돌기 Sphere Collider**,**박스 충돌기 보이스 컬렉터**,**격자 충돌기 MesshCollider**.따르다**충돌 검사 정확도**과**소모 성능**Sphere Collider — BoxCollider — MelshCollider; 게임에 따라 수요를 개발하고 적합한 충돌기를 선택할 수 있다.

3D 디스플레이 대상 코드 충돌기 구성 요소를 추가하는 방법은 다음과 같습니다 (엔진 2.0 버전) 을 표시할 때 개발자는 코드 첨가하지 말고, 귀찮아서 유닛에 충돌 요소를 추가하여 사용할 수 있습니다.

Tips: 충돌기는 Messprite3D 형식의 디스플레이 대상에 추가할 수 없습니다. 그렇지 않으면 효력을 잃습니다.


```java

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/

//给模型添加盒子碰撞器
var boxCollider:PhysicsCollider =  box.addComponent(PhysicsCollider)as PhysicsCollider;
var boxShape:BoxColliderShape = new BoxColliderShape(1,1,1);

//给模型添加球碰撞器
var sphereCollider:PhysicsCollider = sphere.addComponent(PhysicsCollider)as PhysicsCollider;
var sphereShape:SphereColliderShape = new SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//给模型添加碰撞组件
var meshCollider:PhysicsCollider = meshSprite3D.addComponent(PhysicsCollider);
//创建网格碰撞器
var meshShape:MeshColliderShape = new MeshColliderShape();
//获取模型的mesh
meshShape.mesh = meshSprite3D.meshFilter.sharedMesh as Mesh
//设置模型的碰撞形状
meshCollider.colliderShape = meshShape;	
```


엔진 1.7.12와 내보내기 플러그인 1.7.0판부터 유닛에 3D 모형에 추가된 콜리더를 내보내며 엔진을 자동으로 가재합니다.

유니티에서 보이스콜리더와 SphereCollider 를 모형으로 추가한 뒤 충돌함 또는 충돌 볼의 크기에 따라 설정을 할 수 있으며, 충돌상자가 실제 모형보다 작거나 한쪽 크기가 작거나 위치를 변경할 수 있으며, 개발자들의 논리적으로 처리할 수 있다.



####층 Layer

기본 장면에는 32층, 3D 요정을 임의층 안에 버리는 것을 선택할 수 있다.카메라에 사용하면 카메라는 층급에 따라 재단할 수 있다;**충돌 검측에 사용하면 충돌이 어떤 층을 통제할 수 있고, 충돌하지 않는 것은 어떤 층을 맞물지 않는다**.

3D 요정층을 지정하는 방법은 다음과 같습니다:


```java

		//指定3D精灵的层
		plane.layer = 10;
		
```




####사선 레이

사선은 데이터 유형이며, 디스플레이 대상이 아니라, 원점 origin, 방향 direction 속성이 있다.

게임에서 보기 공간이 자주 바뀌기 때문에 마우스의 3D 공간 가운데 위치를 모의 레이야아아일드 엔진은 카메라 Camera 가 사선을 만드는 방법을 제공해 스크린과 세로 세로 선 하나를 만들어냈다.

카메라 복사선 만들기 방법 다음과 같습니다:


```java

//射线初始化（必须初始化）
ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));

//获取鼠标在屏幕空间位置
var point:Vector2 = new Vector2();
point.elements[0] = Laya.stage.mouseX;
point.elements[1] = Laya.stage.mouseY;

camera.viewportPointToRay(point,ray);
		
```




####물리선 검사

우리가 장면 중 3D 디스플레이 대상이 충돌기를 생성하고, 이들을 위해 계층 (기본적으로 0층에 설치하고 사선을 창건한 후 물리사선 충돌로 측정할 수 있으며, 개발자는 수요에 따라 자신의 논리적 판단을 할 수 있으며, 쥐가 주운, 선택, 창건 등을 할 수 있다.

물리 사선은 우리가 Physics 물리 유류를 사용했으며, 우리가 충돌이 발생한 최초의 충돌기 정보를 검출할 수 있는 RayCast () 와 충돌이 발생한 모든 충돌기 정보 rayCastAll () 방법을 검증하였으며, 개발자는 수요에 따라 사용하고, API (1)



 ![图1](img/1.png)< br > (그림 1)



####충돌 정보 HitResult

사선 검사의 충돌 정보는 검사하기 전에 초기화되어야 한다. 사선과 3D 디스플레이 대상이 교차되면 충돌 정보 HitResult 속성에서 교차상대, 교차하는 공간 위치, 교차된 삼각면 정점 등 다양한 정보를 얻을 수 있다.

HitResult.collider.owner 즉 사귀는 Node 대상이다.

point 는 사선과 모형과 교차하는 공간 위치입니다.

suceded가 물체와 교차할지 여부는 트루이다.

normal 은 충돌하는 물체 법선 (Vector3) 이다.



###마우스 습득 예례 (사선 / 복사 스크립트)

####방사선:

이상의 개념과 방법에 따라 마우스 사선 습득의 예를 만들어 다음 단계에 따라 진행합니다.

1, 유닛 장면에서 3D 물품을 만들고, 세 대의 자동차를 예를 들어 플러그인을 내보내기 위해 사용합니다.

2, 씬 세션의 실례.

3, 모형을 얻은 메쉬를 이용해 모형에 충돌기를 추가한다.

4. 일선 초기화.

5, 마우스 클릭 이벤트 가입, 마우스 클릭, 그리고 3D 물품과 교차한다면, 3D 물건을 사라뜨리고 정보를 제시할 수 있도록 합니다.

주 코드 다음과 같습니다:


```java

Scene3D.load("h5/LayaScene_monkey/monkey.ls",Handler.create(this,function(s:Scene3D):void{
  scene = Laya.stage.addChild(s)as Scene3D;

  //添加照相机
  camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
  camera.transform.translate(new Vector3(0, 3, 3));
  camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
  camera.clearColor = null;

  //添加方向光
  var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
  directionLight.color = new Vector3(0.6, 0.6, 0.6);
  directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
//对场景的所有物体进行循环
  for(var i:int = (scene.numChildren-1);i>-1;i--)
  {
    //如果模型为meshsprite3D
    if(scene.getChildAt(i)is MeshSprite3D)
    {
      trace(scene.getChildAt(i).name);
      //获取模型的MeshSprite3D
      var meshSprite3D:MeshSprite3D = scene.getChildAt(i)as MeshSprite3D;
      //给模型添加碰撞组件
      var meshCollider:PhysicsCollider = meshSprite3D.addComponent(PhysicsCollider);
      //创建网格碰撞器
      var meshShape:MeshColliderShape = new MeshColliderShape();
      //获取模型的mesh
      meshShape.mesh = meshSprite3D.meshFilter.sharedMesh as Mesh
        //设置模型的碰撞形状
        meshCollider.colliderShape = meshShape;
    }
  }
}))
  //射线初始化（必须初始化）
  	ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
	addMouseEvent();
}	
public function addMouseEvent():void{
  //鼠标事件监听
  Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
}
public var _outHitResult:HitResult = new HitResult();
public function onMouseDown():void{
	posX = point.elements[0] = MouseManager.instance.mouseX;
	posY = point.elements[1] = MouseManager.instance.mouseY;
  //产生射线
  camera.viewportPointToRay(point,ray);
  //拿到射线碰撞的物体
  scene.physicsSimulation.rayCast(ray,_outHitResult);
  //如果碰撞到物体
  if (_outHitResult.succeeded)
  {
    //删除碰撞到的物体
    _outHitResult.collider.owner.removeSelf();
    trace("碰撞到物体！！")
  }
```


####스크립트 복사:

**Script3D 의 onMouseDown 마우스 감청 사건을 직접 덮어쓰면 마우스가 모형에 눌릴 때 터집니다.**


```java

package common{
  import laya.components.Script;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.material.RenderState;
  import laya.d3.core.material.PBRStandardMaterial;
  import laya.d3.math.Vector4;
  import laya.d3.math.Vector3;
  import laya.d3.core.material.PBRSpecularMaterial;
  import laya.events.Event;
  import laya.d3.component.Script3D;
  import laya.d3.loaders.MeshReader;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.d3.physics.Collision;

  public class SceneScript extends Script3D{
    //**************** wq *****************************************
    public var box :MeshSprite3D ;
    public function SceneScript() {
    }
    /**
		 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
		 */
    override public function onAwake():void{
      box = this.owner as MeshSprite3D;
    }
    /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
    override public function onUpdate():void{

    }
    //物体必须拥有碰撞组件（Collider）
    //当被鼠标点击
    override public function onMouseDown(e:Event):void{
      trace("点击到了我box");
      //从父容器销毁我自己
      box.removeSelf();
    }
    //当产生碰撞
    override public function onCollisionEnter(collision:Collision):void {
      (box.meshRenderer.sharedMaterial as BlinnPhongMaterial).albedoColor = new Vector4(0.0,0.0,0.0,1.0);
      // box.removeSelf();

    }

  }
}
```


컴파일을 번역하면 다음의 효과를 얻을 수 있으며 마우스 클릭은 자동차의 모형을 제거할 수 있다.



 ![图2](img/2.gif)<br>（图2）







###마우스 생성 물체

게임에서 마우스를 사용하여 게임을 설치하는 것을 자주 사용한다. 예를 들면 유형의 게임을 지면에서 건축, 역할, 도구 등을 배치한다.

마우스 방치물체와 물체의 대체적인 방법과 차이가 다르며, 마찬가지로 충돌기, 사선 검사, 충돌 정보 등 3D 원소와 방법을 사용해야 한다.

물건을 만들 때, 모형 사선과 교차한 후, 우리는 충돌 정보 rayCasthit.point 를 통해 클릭한 위치를 누르고, 창건한 물품을 여기에 방치할 수 있다.또한 물품을 창건할 때 우리는 복제방식을 사용하여 개발자들이 그 방법을 주의한다.

검색 예례에서 Google은 상자형 충돌기 보이xCollider를 사용했으며, 생성 예례에서 우리는 격자 충돌기 MelshCollider를 사용했으며, 더 정확하다.

주 코드 수정 다음과 같습니다:

트럭 모형을 만들고 트럭 차체에 격격 충돌기 부품을 추가합니다.


```java

package
{
  import laya.d3.component.physics.MeshCollider;
  import laya.d3.core.Camera;
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.scene.Scene;
  import laya.display.Stage;
  import laya.display.Text;
  import laya.events.Event;
  import laya.utils.Handler;

  public class LayaAir3D_MouseInteraction
  {
    /**自定义场景**/		
    private var gameScene:GameScene;

    public function LayaAir3D_MouseInteraction()
    {
      //初始化引擎
      Laya3D.init(1000, 500,true);

      //适配模式
      Laya.stage.scaleMode = Stage.SCALE_FULL;
      Laya.stage.screenMode = Stage.SCREEN_NONE;

      //加载3D资源
      Laya.loader.create([{url:"LayaScene_truck/truck.lh"},
                          {url:"LayaScene_box/box.lh"}],Handler.create(this,onComplete));	
    }

    private function onComplete():void
    {
      //创建3D场景
      var scene:Scene3D=new Scene3D();
      //初始化场景（摄像机、碰撞相关对象、添加碰撞器等）
      Laya.stage.addChild(scene);
      //为场景添加控制脚本
      scene.addScript(SceneScript);
      //创建货车模型，加载到场景中
      Sprite3D.load("h5/LayaScene_willhero/chengqiang35.lh",Handler.create(this,function(sp:Sprite3D):void{
        var cheng:MeshSprite3D = scene.addChild(sp.getChildAt(0))as MeshSprite3D;
        var chengCollider:PhysicsCollider = cheng.addComponent(PhysicsCollider);
        //添加网格型碰撞器组件
        var chengshape:MeshColliderShape = new MeshColliderShape();
        //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
        chengshape.mesh = cheng.meshFilter.sharedMesh as Mesh; 
      }))
    }
  }
}
```


장면 스크립트 제어 종류 코드 수정 다음과 같습니다:


```java

package common{
  import laya.d3.core.MeshSprite3D;
  import laya.d3.core.Sprite3D;
  import laya.d3.core.material.RenderState;
  import laya.d3.core.material.PBRStandardMaterial;
  import laya.d3.math.Vector4;
  import laya.d3.math.Vector3;
  import laya.d3.core.material.PBRSpecularMaterial;
  import laya.events.Event;
  import laya.d3.component.Script3D;
  import laya.d3.loaders.MeshReader;
  import laya.d3.core.material.BlinnPhongMaterial;
  import laya.d3.physics.Collision;
  import laya.d3.core.scene.Scene3D;
  import laya.d3.core.Camera;
  import laya.d3.math.Ray;
  import laya.d3.physics.HitResult;
  import laya.d3.resource.models.BoxMesh;
  import laya.physics.Physics;
  import laya.d3.math.Vector2;
  import laya.events.MouseManager;
  import laya.d3.physics.PhysicsCollider;
  import laya.d3.physics.shape.BoxColliderShape;

  public class SceneScript extends Script3D{
    //**************** wq *****************************************
    public var scene:Scene3D;
    public var camera:Camera;
    public var ray:Ray;
    public var rayCastHit:HitResult = new HitResult();
    public var box :MeshSprite3D;

    public var point:Vector2 = new Vector2();

    public function SceneScript() {
    }
    override public function onAwake():void
    {
      scene = owner as Scene3D
    }
    override public function onStart():void
    {
      //添加照相机
      camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
      camera.transform.translate(new Vector3(0, 3, 3));
      camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
      camera.clearColor = null;

      ray = new Ray(new Vector3(0,0,0),new Vector3(0,0,0));

      //创建一个货物模型
      box = scene.addChild(new MeshSprite3D(new BoxMesh(0.5,0.5,0.5)))as MeshSprite3D;
      Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
    }
    override public function onUpdate():void{

    }
    private function onMouseDown():void{
      point.x = MouseManager.instance.mouseX;
      point.y = MouseManager.instance.mouseY;

      camera.viewportPointToRay(point,ray);
      scene.physicsSimulation.rayCast(ray,rayCastHit);

      if (rayCastHit.succeeded)
      {
        //克隆一个货物模型
        var cloneBox:MeshSprite3D = Sprite3D.instantiate(box) as MeshSprite3D;
        //给物体添加碰撞组件
        var meshCollider:PhysicsCollider = cloneBox.addComponent(PhysicsCollider);
        var cloneMesh:BoxColliderShape = new BoxColliderShape(0.5,0.5,0.5);
        meshCollider.colliderShape = cloneMesh;

        scene.addChild(cloneBox);
        cloneBox.transform.position = rayCastHit.point;
      }
    }
  }
}
```




컴파일을 실행할 때, 마우스 클릭을 통해 물체를 만들 수 있는 것을 볼 수 있습니다. 또한 사선과 모형상교할 때 모형상교처의 삼각면을 보여줍니다.

![图3](img/3.gif)< br > (그림 3)