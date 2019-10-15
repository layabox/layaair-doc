#LayaAir 3 Dマウスの対話

###マウスのインタラクションの概要

LayaAir 2 Dエンジンでは、2 D表示オブジェクトはマウスイベントを使用しています。作成ロジックは簡単で便利です。LayaAir 3 Dエンジンではこのような機能は実現されておらず、3 D空間はより複雑であり、表示対象は空間の中に奥行きがあり、遠近、積層、裁断、親子などの関係があり、空間は絶えず変化している。したがって、3 Dエンジンは、衝突器、層と物理放射線検出、衝突情報を用いてマウスの判断を行います。まず、それらの概念と役割を理解しましょう。



####衝突器Collider

衝突器は、3 D表示オブジェクトに追加することができ、主に3 D空間内の物体に衝突検出を行うために使用され、3 D表示オブジェクトの形状によって異なるタイプに分類される物理的なコンポーネントである。

LayaAir 3 Dエンジンが現在サポートしている衝突器は、3つのタイプがあります。**ボール型の衝突器スフィア・コレッダー**を選択します**ボックス型衝突器BoxCollider**を選択します**メッシュクラッシュMeshCollider**。から**衝突検出精度**和**消耗性能**低いものから高いものまで順にSphere Collider-BoxCollider-MeshColliderです。ゲームの中開発のニーズに合わせて、適当な衝突器を選ぶことができます。

3 D表示オブジェクトコードに衝突器のコンポーネントを追加する方法は、開発者がコードを使ってキューブテストをしないように提案しています。面倒なので、ユニティに直接衝突コンポーネントを追加してエクスポートして使用することができます。

Tips：衝突器はMesh Sprite 3 Dタイプの表示オブジェクトに追加しなければなりません。Sprite 3 Dオブジェクトに追加できません。そうでないと無効になります。


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


エンジン1.7.12とエクスポートプラグイン1.7.0から、Unityに3 Dモデルに追加されたColliderを導き出すことができ、エンジンの自動ローディングを作成します。

Unityでは、モデルにBoxColliderとスフィアColliderを追加した後、必要に応じて、衝突箱や衝突球の大きさを設定することもできます。衝突箱は実際のモデルより小さいか大きいか、位置も変更できます。開発者たちの論理処理に便利です。



###レイヤーLayer

デフォルトのシーンは32階で、3 D精霊を任意の階に捨てることができます。カメラに使って、カメラはレベルによって裁断できます。**衝突検出に使うと、どの層に衝突するかを制御できます。**。

3 D精霊層を指定する方法は以下の通りです。


```typescript

//指定3D精灵的层
meshSprite3d1.layer = 10
```




###放射線Ray

放射線はデータの種類で、表示対象ではなく、原点orign、方向directionの属性があります。

ゲームでは、ビューの空間が常に変化しているため、マウスの3 D空間における位置をシミュレーションするために、LayaAir 3 DエンジンはカメラカメラカメラカメラCameraに放射線を作成する方法を提供しており、スクリーンに垂直な1本の放射線を発生している。

カメラが放射線を作成する方法は以下の通りです。


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




###物理放射線検査

シーン中の3 D表示オブジェクトのために衝突器を作成し、それらの層（デフォルトでは0層）を設置し、放射線を作成した後、物理的な光線衝突で交差検出ができます。開発者は必要に応じて、マウスの採取、選択、作成などの論理判断を行うことができます。

物理放射線検出はPhysics物理クラスを使用しており、衝突が発生した最初の衝突器情報を検出する方法と、衝突が発生したすべての衝突器情報を検出する方法の両方を提供しており、開発者は必要に応じてAPIを選択して使用することができます。

![1](img/1.png)（図1）<br/>



###衝突情報Hit Result

放射線検出の衝突情報は、検出前に初期化しなければならず、3 D表示オブジェクトと交差する場合、衝突情報RayCastHit属性から、交差するオブジェクト、交差する空間位置、交差する三角面頂点などの各種情報を得ることができる。

HitResult.co llider.ownerは交わっているNodeの対象です。

pointは放射線とモデルが交差する点の空間位置である。

succededが物体と交差するかどうかはtrueとなります。

normalは衝突する物体法線です。



###マウスのピック例（放射線/上書きスクリプト）

####放射線:

上記の概念と方法に従って、マウスの放射線撮像の例を作成し、以下の手順で行います。

1、unityシーンでいくつかの3 Dアイテムを作成し、3台の自動車を例に挙げて、エクスポートプラグインを通じて使用します。

2、シーンSceneの実例を作成する。

3、モデルのMeshを取得し、Meshを利用してモデルに衝突器を追加する。

4、放射線を初期化します。

5、マウスを入れてクリックして、マウスをクリックして、また3 Dアイテムと交差すると、3 Dアイテムが消えて、情報の取得を促す。

メインクラスのコードは以下の通りです。


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


####上書きスクリプト:

**Script 3 Dを直接書き込むオンモスDownマウスモニターイベントは、マウスがモデルに触れた時にトリガされます。**


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


上のコードをコンパイルすると、次のような効果が得られます（図2）、マウスクリックで車を獲得し、シーンから車のモデルを除去します。

![2](img/2.gif)(图2)</br>







###マウスでオブジェクトを置く

ゲームの中で私達はまたよくマウスを使ってゲームの物品を置くことを制御して、たとえば種類のゲームを身につけて地面で建物、役、道具などを置きます。

物体をマウスで置く方法は、物体を拾う方法とほぼ同じです。同様に、衝突器、放射線、放射線検出、衝突情報などの3 D元素と方法を使う必要があります。

アイテムを作成する時は、模型線をクリックして交差させた後、私達は衝突情報のrayCastHit.pointを通じてクリック位置を得て、作成したものをここに置くことができます。また、モノを作る時にはクローン方式を使い、開発者たちはその方法に注意しています。

ピックアップ例では、ボックス型衝突器BoxColliderを使用して、作成例では、メッシュ衝突器MeshColliderを使用して、より正確である。

メインコードの修正は以下の通りです。

トラックのモデルを作成し、トラックの車体にメッシュ・クラッシュのセットを追加します。


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


シーンスクリプトコントロールクラスコードの修正は以下の通りです。


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


コンパイル実行上のコードは、マウスでクリックして物体を作成することができます。

![3](img/3.gif)（図3）<br/>