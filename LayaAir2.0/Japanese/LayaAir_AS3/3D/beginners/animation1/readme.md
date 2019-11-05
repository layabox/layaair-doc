##LayaAir 3 Dアニメーション

現在、LayaAir 3 Dエンジンはアニメーション部分に対して多くの調整を行い、古いバージョンのアニメーションを保留していますが、開発者たちに新しいアニメーションコンポーネント方式を使うよう提案しています。新版アニメーションアニメーションアニメーションアニメーションアニメーションのいくつかのタイプを統合し、分類せずに作成し、開発時間を節約しました。骨格アニメーション、材質アニメーション、剛体アニメーション、ビデオカメラアニメーションなどが含まれています。

アニメイトの動画モジュールはユニティが導出した動画をサポートしています。骨格アニメーションモデルはユニティを導入して統合編集ができます。材質アニメーション、剛体アニメーションは直接unityで編集できます。



###キャラクター骨格アニメーション

ゲームキャラクターの骨格隠し動画は3 Dゲームで多く使われており、キャラクターの動画モデルをunityに導入して編集し、LayaAirにエクスポートして使用することができます。

####unityでアニメーション編集ステップ

1、モデルを導入する。ユニティリソースマネージャでは、FBXフォーマットのリソース、スタンプリソースを右クリックして導入し、モデルをシーンにドラッグして、材質のスタンプを調整して保存します。この例では保存シーンの名前は「mokey」です。

2、アニメーションコントローラを作成します。unityリソースマネージャでは、右クリックメニューからアニメーションコントローラ（Animtor Controller）を作成し、アニメーションの名前に基づいて、この例では「mokeyAction」と名づけます。

3、アニメーションコントローラを編集します。アニメーションコントローラをダブルクリックして開くと、ビューエリアにアニメーションコントローラの編集画面が表示されます。ドットオンで導入されたモデルの右側の「小さな三角」が表示されます。「再生フラグ」ファイルはモデルのアニメーションファイルで、デフォルトは「Take 001」と呼ばれ、アニメーションコントローラ編集画面（図1）にドラッグして保存されます。

![图片1](img/1.png)<br/>

（図1）

4、アニメーションコントローラをバインドします。シーン中のキャラクターモデルを選択して、キャラクターアニメーションコントローラを選択したモデルのアニメーションコンポーネント（図2）に付与します。アニメーションコンポーネントがないと、追加する必要があります。そうでないと、エクスポートされたアニメーションは再生できません。

![图片2](img/2.png)<br/>(図2)

以上の手順を経て、キャラクターアニメーションのunityでの編集が完了しました。unityでボタンを押すと、動画が再生されます。動画再生に問題がなければ、以前の「unityプラグインツール」の教程方法でLayaAirに必要なリソースを導き出すことができます。

**Tips：他のアニメーションもunityでの処理方式が一致しており、シーンモデルにアニメーションコンポーネントを追加する――アニメーションコントローラを作成する――アニメーションをアニメーションコントローラに加える――アニメーションコントローラにモデルを追加するアニメーションコンポーネントにアニメーションを追加するステップが必要です。**



####LayaAirでのキャラクターアニメーションの実現

エクスポートされたリソースはプロジェクトh 5のディレクトリにコピーされ、コードを通してキャラクターリソースをロードし、作成後に自動的にアニメーションを再生して循環します（図3）。参照コードは以下の通りです。


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
	public class LayaAir3D {
		
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
			camera.transform.translate(new Vector3(0, 3, 3));
			camera.transform.rotate(new Vector3( -10, 0, 0), true, false);
			camera.clearColor = null;

			//添加方向光
			var directionLight:DirectionLight = scene.addChild(new DirectionLight()) as DirectionLight;
			directionLight.color = new Vector3(0.6, 0.6, 0.6);
			directionLight.transform.worldMatrix.setForward(new Vector3(1, -1, 0));
		    //添加蒙皮动画角色模型
			Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
				//加载到场景
				var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
				//让摄影机指向角色
				camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
			}))
		}		
	}
}
```


![动图3](img/3.gif)<br/>(図3)



####キャラクターアニメーションのコントロールと分解

**アニメーションコンポーネントを取得**

上記の例を通して、アニメーションが自動的に放送されているのを見ました。いくつかの動作が含まれていますが、アニメの放送はどうやって制御されますか？まず、モデル上のアニメーションコンポーネントを取得してから、再生、停止などを制御することができます。

LayaAir 3 Dエンジンの3 DモデルSprite 3 Dクラスは、get ComponentByType（）方法を提供して、モデル上のコンポーネントを取得します。動画付きモデルは、ロード作成時にデフォルトでアニメイトに付与されていますので、以下のコードを参照してください。

開く.lhファイルを見ると、アニメーションコンポーネントはモデルのサブオブジェクトに結合されているので、「get ChildAt（0）」を使用して、サブオブジェクトモデルを取得します。そして、アニメーションコンポーネントをget ComponentByTypeで取得します。


```java

//获取角色动画组件
var ani:Animator=role3D.getChildAt(0).getComponentByType(Animator) as Animator;
```


**Tips：場合によっては.lhまたは.lsファイルには複数の親子レベルの関係が存在しています。アニメーションコンポーネントはすべて第1の階層にあり得ません。第2の層かもしれません。第3の層かもしれません。したがって、アニメーションコンポーネントを取得する前に、lsまたは.lhを開いてアニメーションコンポーネントモデルの階層関係を調べ、get ChildAt()、またはget ChildByName()などの方法でモデルを取得してからアニメーションコンポーネントを取得することができます。プログラムが間違っています。**



**コントロール**

アニメーションのセットがあったら、どのように一つの動作だけを再生しますか？動作の制御と切り替えを実現する方法は二つあります。

####1.コード定義アニメーションクリップ再生

上記の例では、unityではアニメーションを分離していません。モデルのデフォルトアニメーションTake 001を使用して、プラグインは一つのlani形式のアニメーション解析ファイルだけを導出しました。

そのため、あるアニメーションの再生を制御し、コードにカスタムアニメーションクリップを追加し、アニメーションクリップに開始と終了フレームレートを設定して実現する必要がある。

アニメイトのアニメーションコンポーネントでのプレイ方法を見て、具体的な方法は以下の通りです。

**Tips：1.7.10版の後、play（）方法はloopがループするかどうか、フレームレートの開始、フレームレートの終了パラメータをキャンセルしました。アニメーションがループされているかどうかはunityエディタのアニメーション属性にチェックを付けて設定してください。エクスポート後はエンジンが設定に従ってアニメーションを再生します。図5、6のloop Time選択ボックスを参照してください。**


```java

/**
* 播放动画。
* @param	name 如果为null则播放默认动画，否则按名字播放动画片段。
* @param	playbackRate 播放速率。
*/
play(name:String=null,playbackRate:Number=1.0)
 
```


**アニメーションを再生するフレームがあるフレームにある場合、既存のアニメーションに基づいてアニメーションクリップを追加したAnimation Clipを作成することができます。最新のAnimationカテゴリーはaddClipを提供します。**


```java

//创建一个动画动作状态
    var state1:AnimatorState = new AnimatorState();
    //设置动作状态的名称
    state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
    state1.clipStart = 10/40;
    //设置动作状态播放的结束时间
    state1.clipEnd = 20/40;
    //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
    state1.clip = ani.getDefaultState().clip;
    //动画播放是否循环
    state1.clip.islooping = true;
    //添加动画状态到动画组件里
    ani.addState(state1);
    //播放动画
    ani.play("hello");
```


変更例のコードは以下の通りです。


```java

//添加蒙皮动画角色模型
Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
	//加载到场景
	var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
    //让摄影机指向角色
    camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
        //获取角色动画组件
        var ani:Animator = hero.getChildAt(0).getComponent(Animator);
    // ani.play("fly");

    //创建一个动画动作状态
    var state1:AnimatorState = new AnimatorState();
    //设置动作状态的名称
    state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
    state1.clipStart = 10/40;
    //设置动作状态播放的结束时间
    state1.clipEnd = 20/40;
    //得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
    state1.clip = ani.getDefaultState().clip;
    //动画播放是否循环
    state1.clip.islooping = true;
    //添加动画状态到动画组件里
    ani.addState(state1);
    //播放动画
    ani.play("hello");
}));
```


コンパイル運転後の効果は以下の通りです。10-20フレームのスタンディング動画クリップだけを循環して再生しました。

![动图4](img/4.gif)<br/>(図4)



####2.ユニティでアニメクリップ再生を定義する

unityでは、アニメーションをセグメント化し、クリップのセグメントを名前にすることができます。エクスポートされたリソースは、コントロール時に、名前でアニメーションに切り替わり、開発者たちが使いやすいです。（このような方法では、リソースをエクスポートする時にアニメーション解析ファイルを追加し、Httpアクセス回数を増やすために、どのような方法で開発者が状況に応じて自分で考えてもいいです。）

unityにおけるアニメーションセグメントの区分方法は以下の通りである。

1）「リソースマネージャ」でモデルファイルを選択し、右側のinspector画面でAnimationsを選択し、デフォルトのアニメーションTake 001が現れました。ユーザー定義の名前を編集し、プラス記号をクリックしてアニメーションセグメントを追加し、セグメントの開始と終了フレームを修正します（図5）。

Tips：ゲーム中の動画の循環再生は、下図の「Loop Time」にチェックしてください。

![图5](img/5.png)<br/>(図5)

この例では全部で4つの動作が、美術によって提供されるアニメーションフレーム数に応じて4つのアニメーションセグメントに追加されるように修正される（図6）。

![图6](img/6.png)<br/>(図6)

2）修正が完了すると、リソースマネージャモデルにも対応する動画ファイルが追加されますので、アニメーションコントローラを変更して、新しく生成したアニメーションセグメントをアニメーションコントローラに追加します。そうでないと、完全なアニメーションリソース解析ファイルをエクスポートできません。

![图7](img/7.png)<br/>(図7)

前のステップを完了したら、再エクスポートし、出力されたリソースにも4つのlaniアニメーション解析ファイルが生成されます。

例コードを修正して、動画名の再生方式を適用します。


```java

Sprite3D.load("h5/LayaScene_monkey/ACG_man.lh",Handler.create(this,function(sp:Sprite3D):void{
    //加载到场景
    var hero:Sprite3D = scene.addChild(sp)as Sprite3D;
    //让摄影机指向角色
    camera.transform.lookAt(hero.transform.position,new Vector3(0,1,0))
    //获取角色动画组件
    var ani:Animator = hero.getChildAt(0).getComponent(Animator);
}));
//监听默认动画完成后播放站立动画
ani.on(Event.COMPLETE,this,onAniComplete,[ani]);
//播放攻击动画
ani.play("attack");
/***当前动画播放完成后回调***/
private function onAniComplete(ani:Animator):void
{
  //切换站立动画
  ani.play("stand");
}
```

![图8](img/8.gif)<br/>(図8)


