#LayaAir 3 D脚本セット

###親コンポーネントComponent 3 D

LayaAir 3 Dエンジンでは、オブジェクト制御やコードの保守を容易に表示するために、強力なコンポーネント類Component 3 Dを提供しています。私達のアニメーションのコントロールのコンポーネント、衝突器、シナリオ、骨格の掛ける点などはすべてコンポーネントの機能の拡張に基づいて拡張するので、そのサブクラスに属します。また、LayaAir 3 Dエンジンは、1つの3 Dオブジェクトに複数のコンポーネントを追加することにより、コンポーネント制御をより柔軟にすることができる。

以前の技術分野では、アニメーション制御コンポーネントと衝突器コンポーネントの基本的な機能を紹介しました。ここではこれ以上説明しません。この章では、**私たちは主にスクリプトコンポーネントを例に説明します。**コンポーネントクラスに引き継がれているため、ほとんど自分の拡張機能がなく、主に親クラスのComponent 3 D属性と方法を使っています。シナリオ機能は今後もアップデートされますので、ご期待ください。



###コンポーネントの主な属性と方法

**owner**：結合されたコンポーネントが属するSprite 3 Dオブジェクトです。

**enable:**は、コンポーネントが有効かどうか、コンポーネントをロードする場合、デフォルトでは有効状態です。falseに変更すると、まずアクティブな変更イベントを送信して、コンポーネントの更新方法を停止します。

**onAwake():**コンポーネントのロード時に方法を実行します。デフォルトではコードがありません。継承クラスでカバーできます。初期化が必要な論理コードを入れます。

**onStart():**ロードコンポーネントの3 Dオブジェクトの実装が完了したら、最初の更新時に実行します。デフォルトではコードがありません。継承クラスでカバーできます。3 Dオブジェクトのロードが完了した後の論理コードを入れます。

例えば、3 D表示オブジェクトが非同期で読み込まれたときにスクリプトが追加されます。そのサブモデルと材質はまだロードされていません。`onAwake()`方法では、論理コードは3 D表示オブジェクトのサブオブジェクトまたはスタンプを取得すると、空のオブジェクトbugが発生します。このとき、これらの論理コードをオンストップに入力して、空のオブジェクトのバグが発生しないようにします。

また、例えばシナリオ付きの3 Dオブジェクトをクローンすると、3 Dオブジェクトの中にも複数のサブオブジェクトがある場合、シナリオのクローンは先に完了し、シナリオ中のロジックがオンストップ（）メソッドに入れないと、サブオブジェクトを取得する際にも空のオブジェクトbugが発生します。

**onUpdate():**コンポーネント更新方法は、フレームサイクルに相当する。継承クラスでカバーすることができ、フレームごとに更新が必要な論理コードをこの方法に入れます。



###コンポーネント関連イベント

＊COMPONENT(※)**コンポーネントがロードされた完了イベントは、コンポーネント所有者Sprite 3 Dによって送信され、コンポーネントがパラメータとして送信される。****
****
**COMPONENTUREMOVE D：**コンポーネントが除去されたイベントは、コンポーネントの所有者Sprite 3 Dによって送信され、コンポーネントはパラメータとして送信される。****
****
**ENABLEUCHANGED:**コンポーネント有効イベントは、プロパティenableの変更を有効にしてコンポーネントによって送信され、パラメータとして属性を有効にして送信されます。



###スクリプトコンポーネントScript

スクリプトはコンポーネントに引き継がれるので、3 D表示オブジェクトにスクリプトを表示オブジェクトのaddComponentメソッドで追加することができます。

公式サイトの3 Dエンジンの例では、多くの例のカメラが使用しているカメラのモバイルスクリプトCamera MoveScriptは、カメラがこのスクリプトを追加した後、マウスで回転及びキーボードを制御して上下左右の移動を制御し、開発者たちがインターネットから例をダウンロードして、研究と修正を行うことができます。スクリプトコンポーネントのメソッドコードを追加します。


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


もちろん、いくつかのロジックが必要であれば、スクリプトをオブジェクトから削除することもできます。スクリプトコンポーネントの削除方法は以下の通りです。


```typescript

//获取摄像机上的脚本
var script:CameraMoveScript = camera.getComponent(CameraMoveScript);
//删除
script.destroy();
```




###自分のスクリプトコンポーネントを作成します。

開発者たちはカメラのスクリプトを参考にして、シーンのオブジェクトを制御するために自分のスクリプトコンポーネントを作成することができます。

LayaAir 3 Dゲーム開発において、私たちは基本的にunityでシーン、キャラクター、アニメーションを作成し、シーンを導き、コードにロードすることで、シーンの異なるオブジェクトにコントロールスクリプトコンポーネントを加えることができます。

例えば、主人公コントロールスクリプト、NPCコントロールスクリプト、シーンオブジェクトコントロールスクリプトなど、一つのゲームレベルがこのように誕生しました。ゲームが次のステージシーンをロードすると、スクリプトが多重され、プロジェクトが維持されやすく、コントロールと表示が分離されます。

次の例では、技術文書の「3 Dの高速オープンツアー」のコードを修正し、コントロールスクリプトをboxに追加し、4秒後にスクリプトコンポーネントを削除します。

まずカスタムスクリプトBoxControl Scriptを作成し、スクリプトが属する対象boxの材質、循環回転を修正します。


```typescript

export default class BoxControlScript extends Laya.Script3D{
    private box:Laya.MeshSprite3D;
    constructor(){
        super();
    }
    /**
	 * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
	 */
    public onAwake():void{
        //绑定对象
        this.box = this.owner as Laya.MeshSprite3D;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public onStart():void{
        //获得3d材质
        var material:Laya.PBRSpecularMaterial = this.box.meshRenderer.material as Laya.PBRSpecularMaterial;
        material.albedoColor = new Laya.Vector4(1,0,0,1);
    }
    /**
     * 覆写组件更新方法(相当于循环)
     */
    public onUpdate():void{
        // 所属脚本对象旋转
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
}
```


そして、「3 Dを速く開く旅」のコードに、上記のスクリプトタイプをboxに追加し、4秒後にスクリプトを削除します。


```typescript

// 程序入口
import BoxControlScript from "./BoxControlScript";

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

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        camera.clearColor = null;

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.PBRSpecularMaterial = new Laya.PBRSpecularMaterial();
		Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
                material.albedoTexture = tex;
                box.meshRenderer.material = material;

                //给box添加自定义脚本
                box.addComponent(BoxControlScript);
        }));
        //4秒后删除组件
        Laya.timer.once(4000,this,function(){
            var script:BoxControlScript = box.getComponent(BoxControlScript);
            // 消除脚本
            // script.destroy();
            //不启用脚本可以有相同的效果（组件onUpdate方法将不会被更新）
            script.enabled=false;
        });
    }
}
new Main();
```


前の列のコードでは、4秒後に開発者がコンポーネントを削除したくない場合、スクリプトの使用を停止するだけで、スクリプトの有効性をfalseに設定できます。

上記のコードをコンパイルして実行すると、以下の効果が得られます。コンポーネントを除去した後、モデルは回転を停止します。

![1](img/1.gif)（図1）<br/>

