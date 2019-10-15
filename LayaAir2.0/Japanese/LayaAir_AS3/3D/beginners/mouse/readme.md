##LayaAir 3 Dマウスの対話

###マウスのインタラクションの概要

LayaAir 2 Dエンジンでは、2 D表示オブジェクトはマウスイベントを使用しています。作成ロジックは簡単で便利です。LayaAir 3 Dエンジンではこのような機能は実現されておらず、3 D空間はより複雑であり、表示対象は空間の中に奥行きがあり、遠近、積層、裁断、親子などの関係があり、空間は絶えず変化している。したがって、3 Dエンジンは、衝突器、層と物理放射線検出、衝突情報を用いてマウスの判断を行います。まず、それらの概念と役割を理解しましょう。



####衝突器Collider

衝突器は、3 D表示オブジェクトに追加することができ、主に3 D空間内の物体に衝突検出を行うために使用され、3 D表示オブジェクトの形状によって異なるタイプに分類される物理的なコンポーネントである。

LayaAir 3 Dエンジンが現在サポートしている衝突器は、3つのタイプがあります。**ボール型の衝突器スフィア・コレッダー**を選択します**ボックス型衝突器BoxCollider**を選択します**メッシュクラッシュMeshCollider**。から**衝突検出精度**和**消耗性能**低いものから高いものまで順にSphere Collider-BoxCollider-MeshColliderです。ゲームの中開発のニーズに合わせて、適当な衝突器を選ぶことができます。

3 D表示の対象コードに衝突器のコンポーネントを追加する方法は以下の通りです。開発者はコードを使ってキューブテストをしないように提案しています。面倒です。直接にユニティに衝突部品を追加してエクスポートして使用することができます。

Tips：衝突器はMesh Sprite 3 Dタイプの表示オブジェクトに追加しなければなりません。Sprite 3 Dオブジェクトに追加できません。そうでないと無効になります。


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


エンジン1.7.12とエクスポートプラグイン1.7.0から、Unityに3 Dモデルに追加されたColliderを導き出すことができ、エンジンの自動ローディングを作成します。

Unityでは、モデルにBoxColliderとスフィアColliderを追加した後、必要に応じて、衝突箱や衝突球の大きさを設定することもできます。衝突箱は実際のモデルより小さいか大きいか、位置も変更できます。開発者たちの論理処理に便利です。



####レイヤーLayer

デフォルトのシーンは32階で、3 D精霊を任意の階に捨てることができます。カメラに使って、カメラはレベルによって裁断できます。**衝突検出に使うと、どの層に衝突するかを制御できます。**。

3 D精霊層を指定する方法は以下の通りです。


```java

		//指定3D精灵的层
		plane.layer = 10;
		
```




####放射線Ray

放射線はデータの種類で、表示対象ではなく、原点orign、方向directionの属性があります。

ゲームでは、ビューの空間が常に変化しているため、マウスの3 D空間における位置をシミュレーションするために、LayaAir 3 DエンジンはカメラカメラカメラカメラCameraに放射線を作成する方法を提供しており、スクリーンに垂直な1本の放射線を発生している。

カメラが放射線を作成する方法は以下の通りです。


```java

//射线初始化（必须初始化）
ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));

//获取鼠标在屏幕空间位置
var point:Vector2 = new Vector2();
point.elements[0] = Laya.stage.mouseX;
point.elements[1] = Laya.stage.mouseY;

camera.viewportPointToRay(point,ray);
		
```




####物理放射線検査

シーン中の3 D表示オブジェクトのために衝突器を作成し、それらの層（デフォルトでは0層）を設置し、放射線を作成した後、物理的な光線衝突で交差検出ができます。開発者は必要に応じて、マウスの採取、選択、作成などの論理判断を行うことができます。

物理放射線検出はPhysics物理クラスを使用しており、衝突が発生した最初の衝突器情報を検出する方法と、衝突が発生したすべての衝突器情報を検出する方法の両方を提供しており、開発者は必要に応じてAPIを選択して使用することができます。



 ![图1](img/1.png)<br/>(図1)



####衝突情報Hit Result

放射線検出の衝突情報は、検出前に初期化しなければならず、3 D表示オブジェクトと交差する場合、衝突情報HitResult属性から、交差するオブジェクト、交差する空間位置、交差する三角面頂点などの各種情報を得ることができる。

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


####上書きスクリプト:

**Script 3 Dを直接書き込むオンモスDownマウスモニターイベントは、マウスがモデルに触れた時にトリガされます。**


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


上のコードをコンパイルすると、次のような効果が得られます（図2）、マウスクリックで車を獲得し、シーンから車のモデルを除去します。



 ![图2](img/2.gif)<br/>(図2)



###マウスでオブジェクトを置く

ゲームの中で私達はまたよくマウスを使ってゲームの物品を置くことを制御して、たとえば種類のゲームを身につけて地面で建物、役、道具などを置きます。

物体をマウスで置く方法は、物体を拾う方法とほぼ同じです。同様に、衝突器、放射線、放射線検出、衝突情報などの3 D元素と方法を使う必要があります。

アイテムを作成する時は、模型線をクリックして交差させた後、私達は衝突情報のrayCastHit.pointを通じてクリック位置を得て、作成したものをここに置くことができます。また、モノを作る時にはクローン方式を使い、開発者たちはその方法に注意しています。

ピックアップ例では、ボックス型衝突器BoxColliderを使用して、作成例では、メッシュ衝突器MeshColliderを使用して、より正確である。

メインコードの修正は以下の通りです。

トラックのモデルを作成し、トラックの車体にメッシュ・クラッシュのセットを追加します。


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


シーンスクリプトコントロールクラスコードの修正は以下の通りです。


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




コンパイル実行上のコードは、マウスでクリックして物体を作成することができます。

![图3](img/3.gif)<br/>(図3)