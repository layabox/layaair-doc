#Layaiar3D 마우스 교호

###마우스 교호 개술

Layaiar2D 엔진에서 2D 디스플레이 대상에는 마우스 이벤트가 사용되며 논리를 작성하기 쉽습니다.Layaiair 3D 엔진에서 이러한 기능을 실현하지 못했습니다. 3D 공간이 더 복잡합니다. 공간에서 넓고 가깝고, 레이어링, 재단, 부자 등 관계와 공간이 계속 바뀌고 있습니다.따라서 3D 엔진은 충돌기, 층과 물리 사선 검출, 충돌 정보의 방식을 채택해 마우스를 판단하고, 다음은 그것들의 개념과 작용을 먼저 파악하도록 한다.



####충돌기 Collider

충돌기는 일종의 물리 구성 요소로 3D 디스플레이 대상에 첨가할 수 있으며, 주로 3D 공간의 물체에서 충돌 검사를 진행하며 3D 디스플레이 대상의 형태에 따라 다른 유형으로 나뉜다.

Layaiar3D 엔진이 지원하는 충돌기는 세 종류로 각각**구형 충돌기 Sphere Collider**,**박스 충돌기 보이스 컬렉터**,**격자 충돌기 MesshCollider**.따르다**충돌 검사 정확도**과**소모 성능**Sphere Collider — BoxCollider — MelshCollider; 게임에 따라 수요를 개발하고 적합한 충돌기를 선택할 수 있다.

3D 디스플레이 대상 코드 충돌기 구성 요소를 추가하는 방법은 다음과 같습니다. 개발자는 코드를 사용하지 말고, 귀찮아서 유니티에 충돌 요소를 추가하여 사용할 수 있습니다.

Tips: 충돌기는 Messprite3D 형식의 디스플레이 대상에 추가할 수 없습니다. 그렇지 않으면 효력을 잃습니다.


```typescript

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加碰撞器组件并获取
var meshCollider:Laya.PhysicsCollider = meshSprite3d1.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
var boxShape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
//获取模型的Mesh网格
boxShape.mesh = meshSprite3d1.meshFilter.sharedMesh as Laya.Mesh;
//把Mesh网格添加到碰撞器
meshCollider.colliderShape = boxShape;

//添加碰撞器组件并获取
var sphereCollider:Laya.PhysicsCollider = meshSprite3d2.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建球型碰撞器
var sphereShape:Laya.SphereColliderShape = new Laya.SphereColliderShape(0.5);
sphereCollider.colliderShape = sphereShape;

//添加碰撞器组件并获取
var boxCollider:Laya.PhysicsCollider = meshSprite3d3.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
//创建盒型碰撞器
var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
boxCollider.colliderShape = boxShape;	
```


엔진 1.7.12와 내보내기 플러그인 1.7.0판부터 유닛에 3D 모형에 추가된 콜리더를 내보내며 엔진을 자동으로 가재합니다.

유니티에서 보이스콜리더와 SphereCollider 를 모형으로 추가한 뒤 충돌함 또는 충돌 볼의 크기에 따라 설정을 할 수 있으며, 충돌상자가 실제 모형보다 작거나 한쪽 크기가 작거나 위치를 변경할 수 있으며, 개발자들의 논리적으로 처리할 수 있다.



###층 Layer

기본 장면에는 32층, 3D 요정을 임의층 안에 버리는 것을 선택할 수 있다.카메라에 사용하면 카메라는 층급에 따라 재단할 수 있다;**충돌 검측에 사용하면 충돌이 어떤 층을 통제할 수 있고, 충돌하지 않는 것은 어떤 층을 맞물지 않는다**.

3D 요정층을 지정하는 방법은 다음과 같습니다:


```typescript

//指定3D精灵的层
meshSprite3d1.layer = 10
```




###사선 레이

사선은 데이터 유형이며, 디스플레이 대상이 아니라, 원점 origin, 방향 direction 속성이 있다.

게임에서 보기 공간이 자주 바뀌기 때문에 마우스의 3D 공간 가운데 위치를 모의 레이야아아일드 엔진은 카메라 Camera 가 사선을 만드는 방법을 제공해 스크린과 세로 세로 선 하나를 만들어냈다.

카메라 복사선 만들기 방법 다음과 같습니다:


```typescript

//射线初始化（必须初始化）
 this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
//获取鼠标在屏幕空间位置
 private point:Laya.Vector2 = new Laya.Vector2();
 this.point.elements[0] = Laya.MouseManager.instance.mouseX;
 this.point.elements[1] = Laya.MouseManager.instance.mouseY;
//详设计产生射线方法，通过2D坐标获取与屏幕垂直的一条射线
this.camera.viewportPointToRay(this.point,this.ray);
```




###물리선 검사

우리가 장면 중 3D 디스플레이 대상이 충돌기를 생성하고, 이들을 위해 계층 (기본적으로 0층에 설치하고 사선을 창건한 후 물리사선 충돌로 측정할 수 있으며, 개발자는 수요에 따라 자신의 논리적 판단을 할 수 있으며, 쥐가 주운, 선택, 창건 등을 할 수 있다.

물리 사선은 우리가 Physics 물리 유류를 사용했으며, 우리가 충돌이 발생한 최초의 충돌기 정보를 검출할 수 있는 RayCast () 와 충돌이 발생한 모든 충돌기 정보 rayCastAll () 방법을 검증하였으며, 개발자는 수요에 따라 사용하고, API (1)

![1](img/1.png)(1)</br>>



###충돌 정보 HitResult

사선 검사의 충돌 정보는 검사하기 전에 초기화되어야 한다. 사선과 3D 디스플레이 대상이 교차할 경우, 충돌 정보 RayCastHit 속성에서 상대, 교차된 공간 위치, 교차된 삼각 정점 등 다양한 정보를 얻을 수 있다.

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


```typescript

import SceneScript from "./SceneScript";

// 程序入口
class Main {
  private scene:Laya.Scene3D;
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private hitresult:Laya.HitResult = new Laya.HitResult();
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    Laya.Scene3D.load("LayaScene_monkey/monkey.ls",Laya.Handler.create(this,function(s:Laya.Sprite3D):void{
      this.scene = Laya.stage.addChild(s) as Laya.Scene3D;

      //添加照相机
      this.camera = (this.scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
      this.camera.transform.translate(new Laya.Vector3(0, 3, 3));
      this.camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
      this.camera.clearColor = null;

      //添加方向光
      var directionLight: Laya.DirectionLight = this.scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
      directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
      directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
      // 添加自定义模型(box)
      var box:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1))) as Laya.MeshSprite3D;
      box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
      box.transform.translate(new Laya.Vector3(3,2,2));
      //给模型添加碰撞器前需要先给模型添加碰撞组件
      var boxCollider:Laya.PhysicsCollider =  box.addComponent(Laya.PhysicsCollider)as Laya.PhysicsCollider;
      var boxShape:Laya.BoxColliderShape = new Laya.BoxColliderShape(1,1,1);
      //创建物理刚体组件
      var rigidBody:Laya.Rigidbody3D = box.addComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
      //刚体质量
      rigidBody.mass = 10;
      //刚体的摩擦力
      rigidBody.friction = 0.4;
      //刚体的弹力
      rigidBody.restitution = 0.2;
      //刚体碰撞器的形状
      rigidBody.colliderShape = boxShape;
      //给box添加脚本组件
      box.addComponent(SceneScript);
      //给box添加材质
      var planeMat:Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
      Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this, function(tex:Laya.Texture2D):void {
        planeMat.albedoTexture = tex;
        box.meshRenderer.material = planeMat;
      }));
    }));
	//射线初始化（必须初始化）
    this.ray = new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    //鼠标事件监听
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  private onMouseDown():void{
    //获取鼠标位置
    this.point.elements[0] = Laya.MouseManager.instance.mouseX;
    this.point.elements[1] = Laya.MouseManager.instance.mouseY;
	//产生射线
    this.camera.viewportPointToRay(this.point,this.ray);
    //拿到射线碰撞的物体
    this.scene.physicsSimulation.rayCast(this.ray,this.hitresult);
	//如果碰撞到物体
    if (this.hitresult.succeeded)
    {
      //删除碰撞到的物体
      this.hitresult.collider.owner.removeSelf();
      console.log("碰撞到物体！！")
    }
  }
}
new Main();
```


####스크립트 복사:

**Script3D 의 onMouseDown 마우스 감청 사건을 직접 덮어쓰면 마우스가 모형에 눌릴 때 터집니다.**


```typescript

export default class SceneScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
     /**
     * 复写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
     */
    public onAwake():void{
        this.box = this.owner as Laya.MeshSprite3D;
    }
    //物体必须拥有碰撞组件（Collider）
    public onMouseDown():void{
        console.log("点到我了");
        this.box.removeSelf();
    }

    public onCollisionEnter(conllision):void{
        
        (this.box.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0,0,0,1);
    }
}
```


컴파일을 번역하면 다음의 효과를 얻을 수 있으며 마우스 클릭은 자동차의 모형을 제거할 수 있다.

![2](img/2.gif)(2)</br>>



###마우스 생성 물체

게임에서 마우스를 사용하여 게임을 설치하는 것을 자주 사용한다. 예를 들면 유형의 게임을 지면에서 건축, 역할, 도구 등을 배치한다.

마우스 방치물체와 물체의 대체적인 방법과 차이가 다르며, 마찬가지로 충돌기, 사선 검사, 충돌 정보 등 3D 원소와 방법을 사용해야 한다.

물건을 만들 때, 모형 사선과 교차한 후, 우리는 충돌 정보 rayCasthit.point 를 통해 클릭한 위치를 누르고, 창건한 물품을 여기에 방치할 수 있다.또한 물품을 창건할 때 우리는 복제방식을 사용하여 개발자들이 그 방법을 주의한다.

검색 예례에서 Google은 상자형 충돌기 보이xCollider를 사용했으며, 생성 예례에서 우리는 격자 충돌기 MelshCollider를 사용했으며, 더 정확하다.

주 코드 수정 다음과 같습니다:

트럭 모형을 만들고 트럭 차체에 격격 충돌기 부품을 추가합니다.


```typescript

import SceneScript from "./SceneScript";

// 程序入口
class Main {
  constructor() {
    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
    scene.addComponent(SceneScript);

    //添加方向光
    var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    var b:Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(10,1,10)))as Laya.MeshSprite3D;
    var bcollider:Laya.PhysicsCollider = b.addComponent(Laya.PhysicsCollider);
    var bshape:Laya.BoxColliderShape = new Laya.BoxColliderShape(10,1,10);
    bcollider.colliderShape = bshape;
    //创建货车模型，加载到场景中
    Laya.Sprite3D.load("LayaScene_willhero/chengqiang35.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
      var cheng:Laya.MeshSprite3D = scene.addChild(sp.getChildAt(0))as Laya.MeshSprite3D;
      var chengCollider:Laya.PhysicsCollider = cheng.addComponent(Laya.PhysicsCollider);
      //添加网格型碰撞器组件
      var chengshape:Laya.MeshColliderShape = new Laya.MeshColliderShape();
      //为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
      chengshape.mesh = cheng.meshFilter.sharedMesh as Laya.Mesh; 
      chengCollider.colliderShape = chengshape;
    }));
  }
}
new Main();
```


장면 스크립트 제어 종류 코드 수정 다음과 같습니다:


```typescript

export default class SceneScript extends Laya.Script3D{
  private camera:Laya.Camera;
  private ray:Laya.Ray;
  private _HitCastResult:Laya.HitResult;
  private box:Laya.MeshSprite3D;
  private point:Laya.Vector2 = new Laya.Vector2();
  constructor(){
    super();
  }

  public onStart():void {
    //添加一个摄影机
    this.camera =this.owner.addChild(new Laya.Camera(0,0.1,100)) as Laya.Camera;
    this.camera.transform.translate(new Laya.Vector3(0,3,3));
    this.camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
    this.camera.clearColor = null;
    
	//初始化一条射线
    this.ray= new Laya.Ray(new Laya.Vector3(0,0,0),new Laya.Vector3(0,0,0));
    this._HitCastResult = new Laya.HitResult();
    this.box = this.owner.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5))) as Laya.MeshSprite3D;
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
  }

  public onMouseDown():void{
    //获取鼠标位置
    this.point.x = Laya.MouseManager.instance.mouseX;
    this.point.y = Laya.MouseManager.instance.mouseY;
    //发射射线
    this.camera.viewportPointToRay(this.point,this.ray);
    (this.owner as Laya.Scene3D).physicsSimulation.rayCast(this.ray,this._HitCastResult);

    if (this._HitCastResult.succeeded)
    {
      //克隆一个货物模型
      var cloneBox:Laya.MeshSprite3D = Laya.Sprite3D.instantiate(this.box) as Laya.MeshSprite3D;
      //给物体添加碰撞组件
      var meshCollider:Laya.PhysicsCollider = cloneBox.addComponent(Laya.PhysicsCollider);
      var cloneMesh:Laya.BoxColliderShape = new Laya.BoxColliderShape(0.5,0.5,0.5);
      meshCollider.colliderShape = cloneMesh;
		
      //把物体添加到场景
      this.owner.addChild(cloneBox);
      //把物体移动到射线点击的位置
      cloneBox.transform.position = this._HitCastResult.point;
    }
  }
}
```


컴파일을 실행할 때, 마우스 클릭을 통해 물체를 만들 수 있는 것을 볼 수 있습니다. 또한 사선과 모형상교할 때 모형상교처의 삼각면을 보여줍니다.

![3](img/3.gif)(2)</br>>