##LayaAir 3 D脚本セット



###親コンポーネントComponent 3 D

LayaAir 3 Dエンジンでは、オブジェクト制御やコードの保守を容易に表示するために、強力なコンポーネント類Component 3 Dを提供しています。私達のアニメーションのコントロールのコンポーネント、衝突器、シナリオ、骨格の掛ける点などはすべてコンポーネントの機能の拡張に基づいて拡張するので、そのサブクラスに属します。また、LayaAir 3 Dエンジンは、1つの3 Dオブジェクトに複数のコンポーネントを追加することにより、コンポーネント制御をより柔軟にすることができる。

以前の技術分野では、アニメーション制御コンポーネントと衝突器コンポーネントの基本的な機能を紹介しました。ここではこれ以上説明しません。この章では、**私たちは主にスクリプトコンポーネントを例に説明します。**コンポーネントクラスに引き継がれているため、ほとんど自分の拡張機能がなく、主に親クラスのComponent 3 D属性と方法を使っています。シナリオ機能は今後もアップデートされますので、ご期待ください。



###コンポーネントの主な属性と方法

**owner**：結合されたコンポーネントが属するSprite 3 Dオブジェクトです。

**enable:**コンポーネントが有効かどうか、コンポーネントをロードする場合、デフォルトでは有効状態であり、falseに変更すると、まず有効変更イベントを送信して、コンポーネントの更新方法を停止します。

**onAwake():**コンポーネントが作成された後に一回だけ実行します。デフォルトではコードがありません。継承クラスでカバーできます。初期化が必要な論理コードを入れます。

**onStart():**ロードコンポーネントの3 Dオブジェクトの実装が完了したら、最初の更新時に実行します。デフォルトではコードがありません。継承クラスでカバーできます。3 Dオブジェクトのロードが完了した後の論理コードを入れます。

また、例えばシナリオ付きの3 Dオブジェクトをクローンし、3 Dオブジェクトの中に複数のサブオブジェクトがあると、シナリオのクローンが先に完了し、シナリオの中のロジックがオンストップ（）メソッドに入れないと、サブオブジェクトを取得する際に空のオブジェクトbugが発生します。

**onUpdate():**コンポーネント更新方法は、フレームサイクルに相当する。継承クラスでカバーすることができ、フレームごとに更新が必要な論理コードをこの方法に入れます。



###コンポーネント関連イベント

＊COMPONENT(※)**コンポーネントがロードされた完了イベントは、コンポーネント所有者Sprite 3 Dによって送信され、コンポーネントがパラメータとして送信される。****
****
**COMPONENTUREMOVE:**コンポーネントが除去された後のイベントは、コンポーネント所有者Sprite 3 Dによって送信され、コンポーネントがパラメータとして送信されます。



###スクリプトコンポーネントScript 3 D

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

package {
	import laya.components.Script3D;
	import laya.d3.core.MeshSprite3D;
	import laya.d3.core.Sprite3D;
	import laya.d3.core.material.RenderState;
	import laya.d3.core.material.PBRStandardMaterial;
	import laya.d3.math.Vector4;
	import laya.d3.math.Vector3;
	import laya.d3.core.material.PBRSpecularMaterial;

	public class BoxControlScript extends Script3D{
		//**************** wq *****************************************
        private var box:MeshSprite3D;
		public function BoxControlScript() {

        }
        /**
		 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
		 */
        override public function onAwake():void{
            //得到3D对象
            box  = this.owner as MeshSprite3D;
        }
        override public function onStart():void{
            //得到3D对象的材质
            var material:PBRSpecularMaterial = box.meshRenderer.material as PBRSpecularMaterial;
            //更改3D对象的材质反射率 （偏红）
            material.albedoColor = new Vector4(1,0,0,1);
        }
        /**
		 * 覆写组件更新方法（相当于帧循环）
		 */	
        override public function onUpdate():void{
            //所属脚本对象旋转更新
            box .transform.rotate(new Vector3(0,0.5,0),false,false)
        }
    }
}
```


そして、「3 Dを速く開く旅」のコードに、上記のスクリプトタイプをboxに追加し、4秒後にスクリプトを削除します。


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
	import laya.d3.core.material.PBRSpecularMaterial;
	public class LayaAir3D {
		//**************** wq *****************************************
		public function LayaAir3D() {

			//初始化引擎
			Laya3D.init(0, 0);

			//适配模式
			Laya.stage.scaleMode = Stage.SCALE_FULL;
			Laya.stage.screenMode = Stage.SCREEN_NONE;

			//开启统计信息
			Stat.show();

			//添加3D场景
			var scene:Scene3D = Laya.stage.addChild(new Scene3D()) as Scene3D;

			//添加照相机
			var camera:Camera = (scene.addChild(new Camera( 0, 0.1, 100))) as Camera;
			//移动摄影机位置
			camera.transform.translate(new Vector3(0, 3, 3));
			//旋转摄影机方向
			camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
			//设置背景颜色
			camera.clearColor = null;

			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			//设置灯光漫反射颜色
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			//设置灯光的方向（弧度）
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));

			//添加自定义模型
			var box:MeshSprite3D = scene.addChild(new MeshSprite3D(new BoxMesh(1,1,1),"MOs")) as MeshSprite3D;
			//设置模型的旋转
			box.transform.rotate(new Vector3(0,45,0),false,false);
			//创建材质
			var material:PBRSpecularMaterial = new PBRSpecularMaterial();
			//加载模型的材质贴图
			Texture2D.load("h5/res/layabox.png",Handler.create(this,function(text:Texture2D):void{
				material.albedoTexture = text;
				//给模型添加材质
				box.meshRenderer.material = material;

				//给box添加自定义脚本组件
				box.addComponent(BoxControlScript);
			}))
			//4秒后删除自定义组件
			Laya.timer.once(4000,this,onLoop,[box]);
		}
		private function onLoop(box:MeshSprite3D):void{
			trace("移除组件")
			// 获取到组件
			var boxContro:BoxControlScript = box.getComponent(BoxControlScript);
			// 移除组件
			boxContro.destroy();
			//如不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
			boxContro.enabled = false;
		}	
	}
}
```


前の列のコードでは、4秒後に開発者がコンポーネントを削除したくない場合、スクリプトの使用を停止するだけで、スクリプトの有効性をfalseに設定できます。



上記のコードをコンパイルして実行すると、以下の効果が得られます。コンポーネントを除去した後、モデルは回転を停止します。

![图1](img/1.gif)<br/>(図1)