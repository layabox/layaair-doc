##LayaAir 3 D脚本セット



###親コンポーネントComponent 3 D

LayaAir 3 Dエンジンでは、オブジェクト制御やコードの保守を容易に表示するために、強力なコンポーネント類Component 3 Dを提供しています。私達のアニメーションのコントロールのコンポーネント、衝突器、シナリオ、骨格の掛ける点などはすべてコンポーネントの機能の拡張に基づいて拡張するので、そのサブクラスに属します。また、LayaAir 3 Dエンジンは、1つの3 Dオブジェクトに複数のコンポーネントを追加することにより、コンポーネント制御をより柔軟にすることができる。

以前の技術分野では、アニメーション制御コンポーネントと衝突器コンポーネントの基本的な機能を紹介しました。ここではこれ以上説明しません。この章では、**私たちは主にスクリプトコンポーネントを例に説明します。**コンポーネントクラスに引き継がれているため、ほとんど自分の拡張機能がなく、主に親クラスのComponent 3 D属性と方法を使っています。シナリオ機能は今後もアップデートされますので、ご期待ください。



###コンポーネントの主な属性と方法

**owner**：結合されたコンポーネントが属するSprite 3 Dオブジェクトです。

**enable:**コンポーネントが有効かどうか、コンポーネントをロードする場合、デフォルトでは有効状態であり、fasleに変更すると、まず有効変更イベントを送信して、コンポーネントの更新方法を実行停止します。

＊**load（owner：Sprite 3 D）：**コンポーネントのロード時に方法を実行します。デフォルトではコードがありません。継承クラスでカバーできます。初期化が必要な論理コードを入れます。

＊**start（state：Renderstate）：**ロードコンポーネントの3 Dオブジェクトの実装が完了したら、最初の更新時に実行します。デフォルトではコードがありません。継承クラスでカバーできます。3 Dオブジェクトのロードが完了した後の論理コードを入れます。

例えば、3 D表示オブジェクトが非同期で読み込まれたときにスクリプトが追加されます。そのサブモデルと材質はまだロードされていません。`_load()`方法では、論理コードは3 D表示オブジェクトのサブオブジェクトまたはスタンプを取得すると、空のオブジェクトbugが発生します。この場合は、論理コードを_start()メソッドに入れて、空の対象bugが発生しないようにします。

また、例えばシナリオ付きの3 Dオブジェクトをクローンし、3 Dオブジェクトの中に複数のサブオブジェクトがあれば、シナリオのクローンが先に完了し、シナリオの論理がスクリプトに入れられない場合には、サブオブジェクトを取得する際にも、空のオブジェクトbugが発生します。

＊**udate（state：RenderState）：**コンポーネント更新方法は、フレームサイクルに相当する。継承クラスでカバーすることができ、フレームごとに更新が必要な論理コードをこの方法に入れます。



###コンポーネント関連イベント

＊COMPONENT(※)**コンポーネントがロードされた完了イベントは、コンポーネント所有者Sprite 3 Dによって送信され、コンポーネントがパラメータとして送信される。****
****
**COMPONENTUREMOVE D：**コンポーネントが除去されたイベントは、コンポーネントの所有者Sprite 3 Dによって送信され、コンポーネントはパラメータとして送信される。****
****
**ENABLEUCHANGED:**コンポーネント有効イベントは、プロパティenableの変更を有効にしてコンポーネントによって送信され、パラメータとして属性を有効にして送信されます。



###スクリプトコンポーネントScript

スクリプトはコンポーネントに引き継がれるので、3 D表示オブジェクトにスクリプトを表示オブジェクトのaddComponentメソッドで追加することができます。

公式サイトの3 Dエンジンの例では、多くの例のカメラが使用しているカメラのモバイルスクリプトCamera MoveScriptは、カメラがこのスクリプトを追加した後、マウスで回転及びキーボードを制御して上下左右の移動を制御し、開発者たちがインターネットから例をダウンロードして、研究と修正を行うことができます。スクリプトコンポーネントのメソッドコードを追加します。


```java

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


もちろん、いくつかの論理的な必要がある場合には、シナリオをオブジェクトから削除しても良いし、3 D表示オブジェクトのremoveComponentByType（）方法でスクリプトを削除しても良い。


```java

//根据类型移除脚本组件
camera.removeComponentByType(CameraMoveScript);
//移除所有组件(包括动画、脚本、碰撞器等，注意，此方法不能移除子对象节点上的组件)
camera.removeAllComponent();
```




###自分のスクリプトコンポーネントを作成します。

開発者たちはカメラのスクリプトを参考にして、シーンのオブジェクトを制御するために自分のスクリプトコンポーネントを作成することができます。

LayaAir 3 Dゲーム開発において、私たちは基本的にunityでシーン、キャラクター、アニメーションを作成し、シーンを導き、コードにロードすることで、シーンの異なるオブジェクトにコントロールスクリプトコンポーネントを加えることができます。

例えば、主人公コントロールスクリプト、NPCコントロールスクリプト、シーンオブジェクトコントロールスクリプトなど、一つのゲームレベルがこのように誕生しました。ゲームが次のステージシーンをロードすると、スクリプトが多重され、プロジェクトが維持されやすく、コントロールと表示が分離されます。

次の例では、技術文書の「3 Dの高速オープンツアー」のコードを修正し、コントロールスクリプトをboxに追加し、4秒後にスクリプトコンポーネントを削除します。

まずカスタムスクリプトBoxControl Scriptを作成し、スクリプトが属する対象boxの材質、循環回転を修正します。


```java

package
{
	import laya.d3.component.Script;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.render.RenderState;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	
	public class BoxControlScript extends Script
	{
      	/**脚本所属的3D对象***/
		private var box:MeshSprite3D;
		
		public function BoxControlScript()
		{
		}
		/**
		 * 覆写3D对象加载组件时的执行方法
		 * @param owner 加载此组件的3D对象
		 */	
		override public function  _load(owner:Sprite3D):void
		{
			//获取脚本所属对象
			box=owner as MeshSprite3D;
		}
		/**
		 * 覆写组件所属3D对象实例化完成后，第一次更新时的执行方法
		 */	
		override public function _start(state:RenderState):void
		{
			//获取模型上的材质
			var material:StandardMaterial=box.meshRender.material;
			//修改材质的反射率颜色，让模型偏红
			material.albedo=new Vector4(1,0,0,1);
		}
		
		/**
		 * 覆写组件更新方法（相当于帧循环）
		 * @param state 渲染状态
		 */	
		override public function _update(state:RenderState):void
		{
			//所属脚本对象旋转更新
			box.transform.rotate(new Vector3(0,0.5,0),false,false);
		}
	}
}
```


そして、「3 Dを速く開く旅」のコードに、上記のスクリプトタイプをboxに追加し、4秒後にスクリプトを削除します。


```java

package {
	import laya.d3.component.Script;
	import laya.d3.core.Camera;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.light.DirectionLight;
	import laya.d3.core.material.StandardMaterial;
	import laya.d3.core.scene.Scene;
	import laya.d3.math.Vector3;
	import laya.d3.math.Vector4;
	import laya.d3.resource.Texture2D;
	import laya.d3.resource.models.BoxMesh;
	import laya.display.Stage;
	import laya.utils.Stat;
	
	public class LayaAir3D_Script 
	{
		public function LayaAir3D_Script() 
		{
			//初始化引擎
			Laya3D.init(0, 0,true);
			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;
			//开启统计信息
			Stat.show();
			
			//添加3D场景---------------------------------
			var scene:Scene = Laya.stage.addChild(new Scene()) as Scene;
			//添加摄像机---------------------------------
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄像机位置
			camera.transform.translate(new Vector3(0, 2, 3));
			//旋转摄像机方向（角度）
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;
			
			//添加平行光----------------------------------
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//灯光的漫反射颜色
			directionLight.color = new Vector3(1.6, 1.6, 1.6);
			//灯光的方向(弧度)
			directionLight.direction = new Vector3(0.3, -1, 0);
          
          	//灯光的环境色
			scene.ambientColor = new Vector3(0.6, 0.6, 0.6);
			
			//添加自定义模型------------------------------
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1))) as MeshSprite3D;
			//模型旋转方向
//			box.transform.rotate(new Vector3(0,45,0),false,false);
			//创建模型的材质
			var material:StandardMaterial = new StandardMaterial();
			//材质的漫反射贴图
			material.diffuseTexture = Texture2D.load("res/layabox.png");
			//为模型赋上材质
			box.meshRender.material = material;
			
          
			//添加自定义脚本并实例化脚本对象------------------------------------------
			box.addComponent(BoxControlScript);
            //可在添加组件时获取组件对象
         	//var boxScript:Script=box.addComponent(BoxControlScript);
          
			//添加定时4秒执行一次回调函数
			Laya.timer.once(4000,this,onLoop,[box,boxScript]);
		}
		
      	//4秒后回调函数，移除脚本组件
		private function onLoop(box:MeshSprite3D,boxScript:Script):void
		{
			//移除BoxControlScript类型脚本组件
			box.removeComponentsByType(BoxControlScript);
			//移除所有组件
//			box.removeAllComponent();
            //如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
//          boxScript.enable=false;
		}
	}
}
```


前の列のコードでは、4秒後に開発者がコンポーネントを削除したくない場合、スクリプトの使用を停止するだけで、スクリプトの有効性をfalseに設定できます。



上記のコードをコンパイルして実行すると、以下の効果が得られます。コンポーネントを除去した後、モデルは回転を停止します。

![图1](img/1.gif)<br/>(図1)