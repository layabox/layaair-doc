#LayaAir 3 D脚本セット

###親コンポーネントComponent 3 D

LayaAir 3 Dエンジンでは、オブジェクト制御やコードの保守を容易に表示するために、強力なコンポーネント類Component 3 Dを提供しています。私達のアニメーションのコントロールのコンポーネント、衝突器、シナリオ、骨格の掛ける点などはすべてコンポーネントの機能の拡張に基づいて拡張するので、そのサブクラスに属します。また、LayaAir 3 Dエンジンは、1つの3 Dオブジェクトに複数のコンポーネントを追加することにより、コンポーネント制御をより柔軟にすることができる。

以前の技術分野では、アニメーション制御コンポーネントと衝突器コンポーネントの基本的な機能を紹介しました。ここではこれ以上説明しません。この章では、**私たちは主にスクリプトコンポーネントを例に説明します。**コンポーネントクラスに引き継がれているため、ほとんど自分の拡張機能がなく、主に親クラスのComponent 3 D属性と方法を使っています。シナリオ機能は今後もアップデートされますので、ご期待ください。



###コンポーネントの主な属性と方法

**owner**：被绑定组件所属的Sprite3D对象。

**enable:**は、コンポーネントが有効かどうか、コンポーネントをロードする場合、デフォルトでは有効状態であり、fasleに変更すると、まずアクティブな変更イベントを送信し、コンポーネントの更新方法uu udate（）を停止します。

＊**load（owner：Sprite 3 D）：**コンポーネントのロード時に方法を実行します。デフォルトではコードがありません。継承クラスでカバーできます。初期化が必要な論理コードを入れます。

＊**start（state：Renderstate）：**ロードコンポーネントの3 Dオブジェクトの実装が完了したら、最初の更新時に実行します。デフォルトではコードがありません。継承クラスでカバーできます。3 Dオブジェクトのロードが完了した後の論理コードを入れます。

例えば、3 D表示オブジェクトが非同期で読み込まれたときにスクリプトが追加されます。そのサブモデルと材質はまだロードされていません。`_load()`方法では、論理コードは3 D表示オブジェクトのサブオブジェクトまたはスタンプを取得すると、空のオブジェクトbugが発生します。この時にこれらの論理コードを_start()メソッドに入れて、空の対象bugが発生しないようにすることができます。

また、例えばシナリオ付きの3 Dオブジェクトをクローンし、3 Dオブジェクトの中にも複数のサブオブジェクトがある場合、シナリオのクローンは先に完了し、シナリオ中のロジックがスクリプトに入れられない場合は、サブオブジェクトを取得する際にも、空のオブジェクトbugが発生します。

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


```typescript

//添加摄像机脚本组件
camera.addComponent(CameraMoveScript);
```


もちろん、いくつかの論理的な必要がある場合には、シナリオをオブジェクトから削除しても良いし、3 D表示オブジェクトのremoveComponentByType（）方法でスクリプトを削除しても良い。


```typescript

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


```typescript

var BoxControlScript = (function(_super){
    function BoxControlScript(){
        BoxControlScript.super(this);
    }
    Laya.class(BoxControlScript,"BoxControlScript",_super);
    /*3D对象加载组件时的执行方法
    owner加载此组件的3D对象
    */
    BoxControlScript.prototype._load = function(owner){
        //获取脚本所属对象
        this.box = owner;
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    BoxControlScript.prototype._start = function(state){
        //获取模型上的材质
        var material = this.box.meshRender.material;
        //修改材质的反射率颜色，让模型偏红
        material.albedo = new Laya.Vector4(1,0,0,1);
    }
    /*覆写组件更新方法（相当于帧循环）
    *state渲染状态
    */
    BoxControlScript.prototype._update = function(state){
        //所属脚本对象旋转更新
        this.box.transform.rotate(new Laya.Vector3(0,0.5,0),false,false);
    }
    return BoxControlScript;
})(Laya.Script);
```


そして、「3 Dを速く開く旅」のコードに、上記のスクリプトタイプをboxに追加し、4秒後にスクリプトを削除します。


```typescript

//初始化引擎
Laya3D.init(0,0,true);
//适配模式
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
//开启统计信息
Laya.Stat.show();

//添加3D场景
var scene = Laya.stage.addChild(new Laya.Scene());
//添加摄像机
var camera = (scene.addChild(new Laya.Camera(0,0.1,100)));
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0,2,3));
//旋转摄像机方向（角度）
camera.transform.rotate(new Laya.Vector3(-30,0,0),true,false);
//设置背景颜色
camera.clearColor = null;

//添加平行光
var directionLight = scene.addChild(new Laya.DirectionLight());
//灯光的环境色
directionLight.ambientColor = new Laya.Vector3(0.6,0.6,0.6);
//灯光的高光色
directionLight.specularColor = new Laya.Vector3(0.6,0.6,0.6);
//灯光的漫反射颜色
directionLight.diffuseColor = new Laya.Vector3(1.6,1.6,1.6);
//灯光的方向（弧度）
directionLight.direction = new Laya.Vector3(0.3,-1,0);

//添加自定义模型
this.box = scene.addChild(new Laya.MeshSprite3D(new Laya.BoxMesh(1,1,1)));
//模型旋转方向
// box.transform.rotate(new Laya.Vector3(0,45,0),false,false);
//创建模型的材质
var material = new Laya.StandardMaterial();
//材质的漫反射贴图
material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
//为模型赋上材质
this.box.meshRender.material = material;

//添加自定义脚本并实例化脚本对象
this.box.addComponent(BoxControlScript);
//可在添加组件时获取组件对象
// this.boxScript = box.addComponent(BoxControlScript);
//添加定时4秒执行一次回调函数
Laya.timer.once(4000,this,onLoop);

//4秒后回调函数，移除脚本组件
function onLoop(){
    //移除BoxControlScript类型脚本组件
    this.box.removeComponentsByType(BoxControlScript);
    //移除所有组件
    // this.box.removeAllComponent();
    //如果不想移除组件，可设置为不启用能达到同样效果（组件_update方法将不会被更新）
    // this.boxScript.enable = false;
}
```


前の列のコードでは、4秒後に開発者がコンポーネントを削除したくない場合、スクリプトの使用を停止するだけで、スクリプトの有効性をfalseに設定できます。

上記のコードをコンパイルして実行すると、以下の効果が得られます。コンポーネントを除去した後、モデルは回転を停止します。

![1](img/1.gif)（図1）<br/>

