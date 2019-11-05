##LayaAir 3 Dマウスの対話

###マウスのインタラクションの概要

LayaAir 2 Dエンジンでは、2 D表示オブジェクトはマウスイベントを使用しています。作成ロジックは簡単で便利です。LayaAir 3 Dエンジンではこのような機能は実現されておらず、3 D空間はより複雑であり、表示対象は空間の中に奥行きがあり、遠近、積層、裁断、親子などの関係があり、空間は絶えず変化している。したがって、3 Dエンジンは、衝突器、層と物理放射線検出、衝突情報を用いてマウスの判断を行います。まず、それらの概念と役割を理解しましょう。



####衝突器Collider

衝突器は、3 D表示オブジェクトに追加することができ、主に3 D空間内の物体に衝突検出を行うために使用され、3 D表示オブジェクトの形状によって異なるタイプに分類される物理的なコンポーネントである。

LayaAir 3 Dエンジンが現在サポートしている衝突器は、3つのタイプがあります。**ボール型の衝突器スフィア・コレッダー**を選択します**ボックス型衝突器BoxCollider**を選択します**メッシュクラッシュMeshCollider**。から**衝突検出精度**和**消耗性能**低いものから高いものまで順にSphere Collider-BoxCollider-MeshColliderです。ゲームの中開発のニーズに合わせて、適当な衝突器を選ぶことができます。

3 D表示オブジェクトコードに衝突器のコンポーネントを追加する方法は以下の通りです。開発者はコードを使ってキューブテストをしないほうがいいと提案しています。面倒です。直接にユニティに衝突コンポーネントを追加してエクスポートして使用してもいいです。

Tips：衝突器はMesh Sprite 3 Dタイプの表示オブジェクトに追加しなければなりません。Sprite 3 Dオブジェクトに追加できません。そうでないと無効になります。


```java

/**
* 给3D精灵添加碰撞器组件
* BoxCollider    : 盒型碰撞器
* SphereCollider : 球型碰撞器
* MeshCollider   : 网格碰撞器
*/
//添加Mesh碰撞器组件并获取
var meshCollider:MeshCollider=meshSprite3d1.addComponent(MeshCollider);
//设置mesh碰撞器网格属性（否则无法被检测）
meshCollider.mesh=meshSprite3d1.meshFilter.sharedMesh;

//添加球形碰撞器组件并获取
var sphereCollider:SphereCollider = meshSprite3d2.addComponent(SphereCollider);
//设置球形碰撞器中心位置
sphereCollider.center = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.center.clone();
//设置球形碰撞器半径
sphereCollider.radius = meshSprite3d2.meshFilter.sharedMesh.boundingSphere.radius;

//添加盒形碰撞器
var boxCollider:BoxCollider =meshSprite3d3.addComponent(BoxCollider);
boxCollider.setFromBoundBox(meshSprite3d3.meshFilter.sharedMesh.boundingBox);		
```


エンジン1.7.12とエクスポートプラグイン1.7.0から、Unityに3 Dモデルに追加されたColliderを導き出すことができ、エンジンの自動ローディングを作成します。しかし、現時点ではMeshColliderの導出はサポートされておらず、今後のバージョンではこの機能を完全にする。

Unityでは、モデルにBoxColliderとスフィアColliderを追加した後、必要に応じて、衝突箱や衝突球の大きさを設定することもできます。衝突箱は実際のモデルより小さいか大きいか、位置も変更できます。開発者たちの論理処理に便利です。

Tips：Unityエディタでは、3 Dオブジェクトは複数の衝突器をサポートすることができますが、LayaAirエクスポートプラグイン（1.7.0版）は現在、最初の衝突器の導出のみをサポートしています。モデルに複数の衝突器を追加することが望ましいならば、モデルを作る時に複数のサブグリッドモデルに分解し、サブグリッドモデルにそれぞれ衝突器を追加して検出することができる。後続の1.7.13バージョンでは、サブグリッドなしの3 D物体複数の衝突器の導出をサポートします。



####レイヤーLayer

デフォルトのシーンは32階で、3 D精霊を任意の階に捨てることができます。カメラに使って、カメラはレベルによって裁断できます。**衝突検出に使うと、どの層に衝突するかを制御できます。**。

3 D精霊層を指定する方法は以下の通りです。


```java

		//指定3D精灵的层
		meshSprite3d1.layer = Layer.getLayerByNumber(10);
		meshSprite3d2.layer = Layer.getLayerByNumber(13);
		
```




####放射線Ray

放射線はデータの種類で、表示対象ではなく、原点orign、方向directionの属性があります。

ゲームでは、ビューの空間が常に変化しているため、マウスの3 D空間における位置をシミュレーションするために、LayaAir 3 DエンジンはカメラカメラカメラカメラCameraに放射線を作成する方法を提供しており、スクリーンに垂直な1本の放射線を発生している。

カメラが放射線を作成する方法は以下の通りです。


```java

      //射线初始化（必须初始化）
      var ray:Ray = new Ray(Vector3.ZERO,Vector3.ZERO);
      //获取鼠标在屏幕空间位置
      var point:Vector2 = new Vector2();
      point.elements[0] = Laya.stage.mouseX;
      point.elements[1] = Laya.stage.mouseY;
      //摄像机产生射线方法，通过2D座标获取与屏幕垂直的一条射线
      camera.viewportPointToRay(point, ray);
		
```




####物理放射線検査

シーン中の3 D表示オブジェクトのために衝突器を作成し、それらの層（デフォルトでは0層）を設置し、放射線を作成した後、物理的な光線衝突で交差検出ができます。開発者は必要に応じて、マウスの採取、選択、作成などの論理判断を行うことができます。

物理放射線検出はPhysics物理クラスを使用しており、衝突が発生した最初の衝突器情報を検出する方法と、衝突が発生したすべての衝突器情報を検出する方法の両方を提供しており、開発者は必要に応じてAPIを選択して使用することができます。



 ![图1](img/1.png)<br/>(図1)



####衝突情報RayCastHit

放射線検出の衝突情報は、検出前に初期化しなければならず、3 D表示オブジェクトと交差する場合、衝突情報RayCastHit属性から、交差するオブジェクト、交差する空間位置、交差する三角面頂点などの各種情報を得ることができる。

sprite 3 Dとは交差する3 D表示オブジェクトであり、交差対象がない場合はnullとなります。

positionは，放射線とモデルが交差する点の空間位置である。

trianglePositions属性は交差する三角面の頂点位置配列であるが、当然、衝突器のタイプはMeshColliderでなければならないという前提が必要であり、そうでなければ頂点位置の属性は0である。



###マウスピックの例

上記の概念と方法に従って、マウスピックアップの例を作成し、以下の手順で行います。

1、unityシーンでいくつかの3 Dアイテムを作成し、3台の自動車を例に挙げて、エクスポートプラグインを通じて使用します。

2、シーンScheneの実例を作成し、シーンスクリプトコントロールクラスScheneScriptを作成し、シーンをロードする時にアドホックScript（）を使用してスクリプトに参加する。

2、脚本を書く`_start()`方法として、レイヤーを設置し、放射線、衝突情報などを作成し、シーンの3 Dアイテムに衝突器を追加します。

3、脚本の書き直し後処理方法`_postRenderUpdate()`方法では、放射線原点に基づいてベクトルを引いて直線を参照して観察し、放射線と3 D物品が交差しているかどうかを判断することができます。

Tips：スクリプト更新方法も使用できます。`_update()`ただし、参考線は模型の後、マウスのクリック位置の参照線が見えないので、描画後の方法を使用しています。`_postRenderUpdate()`シーンを描画してからベクトル参照線を描画するという意味です。

4、マウスを入れてクリックした場合、マウスをクリックして3 Dアイテムと交差すると、3 Dアイテムが消えて情報を得るように提示します。

メインクラスのコードは以下の通りです。


```java

package
{
	import laya.d3.core.Camera;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.scene.Scene;
	import laya.display.Stage;
	import laya.display.Text;
	import laya.events.Event;
	import laya.utils.Handler;

	public class LayaAir3D_MouseInteraction
	{
		/**提示信息文本框**/
		public static var txt:Text;
		
		public function LayaAir3D_MouseInteraction()
		{
			//初始化引擎
			Laya3D.init(1000, 500,true);
			
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			
			//加载3D资源
            Laya.loader.create(["LayaScene_collider3D/collider3D.ls",
                            "LayaScene_truck/truck.lh",
                            "LayaScene_box/box.lh"],Laya.Handler.create(this,this.onComplete));
			
			//创建信息提示框
			txt=new Text();
			txt.text="还未获得汽车！！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,50);
			Laya.stage.addChild(txt);			
		}
		
		private function onComplete():void
		{
			//添加3D场景
			var scene:Scene = Laya.loader.getRes("LayaScene_collider3D/collider3D.ls");
			Laya.stage.addChild(scene);
			//为场景添加控制脚本			
			scene.addScript(SceneScript);
		}
	}
}
```


スクリプトクラスScenese Scriptコードは以下の通りです。

＊Tips：1.7.10バージョンから、シーン自体の更新方法やレンダリング後の処理lateRenderなどの方法がキャンセルされましたが、シーンはスクリプトコンポーネント制御機能が追加されましたので、シナリオコンポーネントのレンダリングの最後の実行方法でマウス参照線の描画が可能です。＊＊


```java

package
{
	
	import laya.d3.component.Script;
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector2;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.events.Event;
	import laya.events.MouseManager;
	import laya.webgl.WebGLContext;
	
	public class SceneScript extends Script
	{
		private var scene:Scene;
		/**3D摄像机**/
		private var camera:Camera;
		/**用于鼠标检测的射线**/
		private var ray:Ray;
		/**画矢量线的3D显示对象**/
		private var phasorSprite3D:PhasorSpriter3D;
		/**碰撞信息**/
		private var rayCastHit:RaycastHit;	
		
		
		/**鼠标点击创建的3D对象**/
		public static var box:Sprite3D;
		/***获得的物品***/
		private var nameArray:Array=[];
		
		public function SceneScript()
		{
		}
		
		/**
		 * 覆写3D对象加载组件时执行的方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function _load(owner:ComponentNode):void
		{
			//获取脚本所属对象
			scene=owner as Scene;
		}
		
		/**
		 * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
		 */	
		override public function _start(state:RenderState):void
		{
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(1,7,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//创建一条射线
			ray = new Ray(new Vector3(),new Vector3());
			//创建矢量3D精灵
			phasorSprite3D = new PhasorSpriter3D();
			//创建碰撞信息
			rayCastHit =new RaycastHit();
			
			
			//为场景中3D对象添加组件
			for(var i:int=scene.numChildren-1;i>-1;i--)
			{
				var meshSprite3D:MeshSprite3D=scene.getChildAt(i) as MeshSprite3D;
				//添加网格型碰撞器组件
				var boxCollider:BoxCollider=meshSprite3D.addComponent(BoxCollider);
              	//为盒形碰撞器设置盒子大小（否则没有尺寸，无法被射线检测）
                boxCollider.setFromBoundBox(meshSprite3D.meshFilter.sharedMesh.boundingBox);
			}
			
			//鼠标点击事件回调
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
		}
				
		/**
		 * 渲染的最后阶段执行
		 * @param	state 渲染状态参数。
		 */		
		override public function _postRenderUpdate(state:RenderState):void
		{

			//根据鼠标屏幕2D座标修改生成射线数据 
//			camera.viewportPointToRay(new 	Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);		
			camera.viewportPointToRay(new Vector2(MouseManager.instance.mouseX,
                                                  MouseManager.instance.mouseY),ray);
			
			//射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
			Physics.rayCast(ray,rayCastHit,300);			
			
          	//画参考线-----------------------------------------------------
			//摄像机位置
			var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
			//开始绘制矢量3D精灵，类型为线型
			phasorSprite3D.begin(WebGLContext.LINES, camera);
			//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
			phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
			//结束绘制
			phasorSprite3D.end();
		}
		
       	/**
		 * 鼠标点击拾取
		 */
		private function onMouseDown():void
		{
			//如果碰撞信息中的模型不为空,删除模型
			if(rayCastHit.sprite3D)
			{
				//从场景中移除模型
				scene.removeChild(rayCastHit.sprite3D);
				//将模型名字存入数组
				nameArray.push(rayCastHit.sprite3D.name);
				//文件提示信息
				LayaAir3D_MouseInteraction.txt.text="你获得了汽车"+
                  							rayCastHit.sprite3D.name+"!，现有的汽车为："+nameArray;
				//销毁物体(如不销毁还能被检测)
				rayCastHit.sprite3D.destroy();
			}	
		}
	}
}
```


上のコードをコンパイルすると、次のような効果が得られます（図2）、マウスクリックで車を獲得し、シーンから車のモデルを除去します。



 ![图2](img/2.gif)<br/>(図2)



###マウスでオブジェクトを置く

ゲームの中で私達はまたよくマウスを使ってゲームの物品を置くことを制御して、たとえば種類のゲームを身につけて地面で建物、役、道具などを置きます。

物体をマウスで置く方法は、物体を拾う方法とほぼ同じです。同様に、衝突器、放射線、放射線検出、衝突情報などの3 D元素と方法を使う必要があります。

アイテムを作成する時は、模型線をクリックして交差させた後、私達は衝突情報のrayCastHit.positionを通じてクリック位置を得て、作成したものをここに置くことができます。また、モノを作る時にはクローン方式を使い、開発者たちはその方法に注意しています。

ピックアップの例では、ボックス型衝突器BoxColliderを使用して、作成例ではグリッド衝突器MeshColliderを使用して、より正確にモデル上の交差三角面の頂点を得ることができます。方法はrayCastHi.trianglePositionsです。頂点位置に応じて、それをかいて観察することができます。

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
		/**提示信息文本框**/
		public static var txt:Text;
		
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
			
			//创建信息提示框
			txt=new Text();
			txt.text="还未装载货物！";
			txt.color="#ff0000";
			txt.bold=true;
			txt.fontSize=30;
			txt.pos(100,50);
			Laya.stage.addChild(txt);			
		}
		
		private function onComplete():void
		{
			//创建3D场景
			var scene:Scene=new Scene();
			//初始化场景（摄像机、碰撞相关对象、添加碰撞器等）
			Laya.stage.addChild(scene);
			//为场景添加控制脚本
			scene.addScript(SceneScript);
			
			//创建货车模型，加载到场景中
			var truck3D:Sprite3D=Laya.loader.getRes("LayaScene_truck/truck.lh");
			gameScene.addChild(truck3D);
			//获取货车的车身（车头不进行装货）
			var meshSprite3D:MeshSprite3D=truck3D.getChildAt(0).getChildByName("body") as MeshSprite3D;
          	//添加网格型碰撞器组件
          	var meshCollider:MeshCollider=meshSprite3D.addComponent(MeshCollider);
          	//为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
         	boxCollider.mesh=meshSprite3D.meshFilter.sharedMesh;
		}
	}
}
```


シーンスクリプトコントロールクラスコードの修正は以下の通りです。


```java

package
{
	
	import laya.d3.component.Script;
	import laya.d3.component.physics.BoxCollider;
	import laya.d3.component.physics.MeshCollider;
	import laya.d3.core.Camera;
	import laya.d3.core.ComponentNode;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.PhasorSpriter3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.render.RenderState;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Ray;
	import laya.d3.math.Vector2;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.utils.Physics;
	import laya.d3.utils.RaycastHit;
	import laya.events.Event;
	import laya.events.MouseManager;
	import laya.webgl.WebGLContext;
	
	public class SceneScript extends Script
	{
		private var scene:Scene;
		/**3D摄像机**/
		private var camera:Camera;
		/**用于鼠标检测的射线**/
		private var ray:Ray;
		/**画矢量线的3D显示对象**/
		private var phasorSprite3D:PhasorSpriter3D;
		/**碰撞信息**/
		private var rayCastHit:RaycastHit;	
		
		
		/**鼠标点击创建的3D对象**/
		public static var box:Sprite3D;
		/***获得的物品***/
		private var nameArray:Array=[];
		
		public function SceneScript()
		{
		}
		
		/**
		 * 覆写3D对象加载组件时执行的方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function _load(owner:ComponentNode):void
		{
			//获取脚本所属对象
			scene=owner as Scene;
		}
		
		/**
		 * 覆写加载组件的3D对象实例化完成后，第一次更新时执行
		 */	
		override public function _start(state:RenderState):void
		{
			//创建摄像机(横纵比，近距裁剪，远距裁剪)
			camera= new Camera( 0, 0.1, 1000);
			camera.transform.position = new Vector3(1,7,10);
			camera.transform.rotate(new Vector3(-30,0,0),false,false);
			//加载到场景
			scene.addChild(camera);
			//加入摄像机移动控制脚本
			camera.addComponent(CameraMoveScript);
			
			//创建一条射线
			ray = new Ray(new Vector3(),new Vector3());
			//创建矢量3D精灵
			phasorSprite3D = new PhasorSpriter3D();
			//创建碰撞信息
			rayCastHit =new RaycastHit();
	
			
			//鼠标点击需要创建的物品，用于克隆使用（货车上的货物）
			box=Laya.loader.getRes("LayaScene_box/box.lh");
			//鼠标点击事件回调
			Laya.stage.on(Event.MOUSE_DOWN,this,onMouseDown);
		}		
		
		/**
		 * 渲染的最后阶段执行
		 * @param	state 渲染状态参数。
		 */		
		override public function _postRenderUpdate(state:RenderState):void
		{
			//根据鼠标屏幕2D座标修改生成射线数据 
//			camera.viewportPointToRay(new Vector2(Laya.stage.mouseX,Laya.stage.mouseY),ray);
			
			camera.viewportPointToRay(new Vector2(MouseManager.instance.mouseX,
                                                  MouseManager.instance.mouseY),ray);
			
			//射线检测，最近物体碰撞器信息，最大检测距离为300米，默认检测第0层
			Physics.rayCast(ray,rayCastHit,300);			
			
          	//画参考线-----------------------------------------------------
			//摄像机位置
			var position:Vector3=new Vector3(camera.position.x, 0, camera.position.z);
			//开始绘制矢量3D精灵，类型为线型
			phasorSprite3D.begin(WebGLContext.LINES, camera);
			//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
			phasorSprite3D.line(ray.origin, new Vector4(1,0,0,1), position , new Vector4(1,0,0,1));
			
			//如果与物品相交,画三面边线
			if(rayCastHit.sprite3D)
			{ 
				//从碰撞信息中获取碰撞处的三角面顶点
				var trianglePositions:Array= rayCastHit.trianglePositions;
				//矢量绘制三角面边线
				phasorSprite3D.line(trianglePositions[0], new Vector4(1,0,0,1), 
                                    trianglePositions[1], new Vector4(1,0,0,1));
				phasorSprite3D.line(trianglePositions[1], new Vector4(1,0,0,1), 
                                    trianglePositions[2], new Vector4(1,0,0,1));
				phasorSprite3D.line(trianglePositions[2], new Vector4(1,0,0,1),
                                    trianglePositions[0], new Vector4(1,0,0,1));
			}			
			//结束绘制
			phasorSprite3D.end();
		}		
		
		/**
		 * 鼠标放置
		 */
		private function onMouseDown():void
		{
			//如果点击时有相交的3D物体，则创建物体
			if(rayCastHit.sprite3D)
			{
				//克隆一个货物模型 
				var cloneBox:MeshSprite3D=Sprite3D.instantiate(box).getChildAt(0) as MeshSprite3D;

			    //添加网格型碰撞器组件
          		var meshCollider:MeshCollider=meshSprite3D.addComponent(MeshCollider);
          		//为Mesh碰撞器mesh网格（否则没有尺寸，无法被射线检测）
         	 	meshCollider.mesh=meshSprite3D.meshFilter.sharedMesh;	
                            
				scene.addChild(cloneBox);
				//修改位置到碰撞点处
				cloneBox.transform.position=rayCastHit.position;
				
				//更新提示信息
				nameArray.push(cloneBox.name);
				LayaAir3D_MouseInteraction.txt.text="您在货车上装载了 "+nameArray.length+" 件货物!";
			}
		}
	}
}
```




コンパイル実行上のコードは、マウスでクリックして物体を作成することができます。

![图3](img/3.gif)<br/>(図3)