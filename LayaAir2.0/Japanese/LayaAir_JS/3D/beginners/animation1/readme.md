#LayaAir 3 Dアニメーション

現在、LayaAir 3 Dエンジンはアニメーション部分に対して多くの調整を行い、古いバージョンのアニメーションを保留していますが、開発者たちに新しいアニメーションコンポーネント方式を使うよう提案しています。新版アニメーションアニメーションアニメーションアニメーションアニメーションのいくつかのタイプを統合し、分類せずに作成し、開発時間を節約しました。骨格アニメーション、材質アニメーション、剛体アニメーション、ビデオカメラアニメーションなどが含まれています。

アニメイトの動画モジュールはユニティが導出した動画をサポートしています。骨格アニメーションモデルはユニティを導入して統合編集ができます。材質アニメーション、剛体アニメーションは直接unityで編集できます。

###キャラクター骨格アニメーション

ゲームキャラクターの骨格隠し動画は3 Dゲームで多く使われており、キャラクターの動画モデルをunityに導入して編集し、LayaAirにエクスポートして使用することができます。

####unityでアニメーション編集ステップ

1、モデルを導入する。ユニティリソースマネージャでは、FBXフォーマットのリソース、スタンプリソースを右クリックして導入し、モデルをシーンにドラッグして、材質のスタンプを調整して保存します。この例では保存シーンの名前は「mokey」です。

2、アニメーションコントローラを作成します。unityリソースマネージャでは、右クリックメニューからアニメーションコントローラ（Animtor Controller）を作成し、アニメーションの名前に基づいて、この例では「mokeyAction」と名づけます。

3、アニメーションコントローラを編集します。アニメーションコントローラをダブルクリックして開くと、ビューエリアにアニメーションコントローラの編集画面が表示されます。ドットオンで導入されたモデルの右側の「小さな三角」が表示されます。「再生フラグ」ファイルはモデルのアニメーションファイルで、デフォルトは「Take 001」と呼ばれ、アニメーションコントローラ編集画面（図1）にドラッグして保存されます。

![1](img/1.png)（図1）<br/>

4、アニメーションコントローラをバインドします。シーン中のキャラクターモデルを選択して、キャラクターアニメーションコントローラを選択したモデルのアニメーションコンポーネント（図2）に付与します。アニメーションコンポーネントがないと、追加する必要があります。そうでないと、エクスポートされたアニメーションは再生できません。

![2](img/2.png)（図2）<br/>

以上の手順を経て、キャラクターアニメーションのunityでの編集が完了しました。unityでボタンを押すと、動画が再生されます。動画再生に問題がなければ、以前の「unityプラグインツール」の教程方法でLayaAirに必要なリソースを導き出すことができます。

**Tips：他のアニメーションもunityでの処理方式が一致しており、シーンモデルにアニメーションコンポーネントを追加する――アニメーションコントローラを作成する――アニメーションをアニメーションコントローラに加える――アニメーションコントローラにモデルを追加するアニメーションコンポーネントにアニメーションを追加するステップが必要です。**

####LayaAirでのキャラクターアニメーションの実現

エクスポートされたリソースはプロジェクトbinディレクトリにコピーされ、コードでキャラクターリソースをロードし、作成後に自動的にアニメーションを再生して循環する（図3）。参照コードは以下の通りである。


```typescript

var Main = (function () {
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();

    //添加3D场景
    var scene = Laya.stage.addChild(new Laya.Scene3D());

    //添加照相机
    var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
    camera.transform.translate(new Laya.Vector3(0, 3, 3));
    camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
    camera.clearColor = null;

    //添加方向光
    var directionLight = scene.addChild(new Laya.DirectionLight());
    directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
    directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

    Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
      //加载到场景
      var hero = scene.addChild(sp);
      //让摄影机指向角色
      camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
    }));
  }
  return Main;
} ());

Main();
```


![3](img/3.gif)（図3）<br/>



####キャラクターアニメーションのコントロールと分解

**アニメーションコンポーネントを取得**

上記の例を通して、アニメーションが自動的に放送されているのを見ました。いくつかの動作が含まれていますが、アニメの放送はどうやって制御されますか？まず、モデル上のアニメーションコンポーネントを取得してから、再生、停止などを制御することができます。

LayaAir 3 Dエンジンの3 DモデルSprite 3 Dクラスは、get ComponentByType（）方法を提供して、モデル上のコンポーネントを取得します。動画付きモデルは、ロード作成時にデフォルトでアニメイトに付与されていますので、以下のコードを参照してください。

開く.lhファイルを見ると、アニメーションコンポーネントはモデルのサブオブジェクトに結合されているので、「get ChildAt（0）」を使用して、サブオブジェクトモデルを取得します。そして、アニメーションコンポーネントをget ComponentByTypeで取得します。


```typescript

//获取角色动画组件
var ani = hero.getChildAt(0).getComponent(Laya.Animator);
```


**Tips：場合によっては.lhまたは.lsファイルには、複数の親子レベルの関係が存在し、アニメーションコンポーネントはすべて第1の階層にあることが不可能であり、それぞれの2層であり、おそらく第3層である。したがって、アニメーションコンポーネントを取得する前に、lsまたは.lhを開いてアニメーションコンポーネントモデルの階層関係を調べ、get ChildAt()、またはget ChildByName()などの方法でモデルを取得してからアニメーションコンポーネントを取得することができます。プログラムが間違っています。**

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
var state1 = new Laya.AnimatorState();
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


```typescript

Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
  //加载到场景
  var hero = scene.addChild(sp);
  //让摄影机指向角色
  camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
  //获取角色动画组件
  var ani = hero.getChildAt(0).getComponent(Laya.Animator);
  //创建一个动画动作状态
  var state1 = new Laya.AnimatorState();
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


コンパイル運転後の効果は以下の通りで、0-34フレームの立ち動画のみを循環的に再生しました。

![4](img/4.gif)（図4）<br/>



####2.ユニティでアニメクリップ再生を定義する

unityでは、アニメーションをセグメント化し、クリップのセグメントを名前にすることができます。エクスポートされたリソースは、コントロール時に、名前でアニメーションに切り替わり、開発者たちが使いやすいです。（このような方法では、リソースをエクスポートする時にアニメーション解析ファイルを追加し、Httpアクセス回数を増やすために、どのような方法で開発者が状況に応じて自分で考えてもいいです。）

unityにおけるアニメーションセグメントの区分方法は以下の通りである。

1）「リソースマネージャ」でモデルファイルを選択し、右側のinspector画面でAnimationsを選択し、デフォルトのアニメーションTake 001が現れました。ユーザー定義の名前を編集し、プラス記号をクリックしてアニメーションセグメントを追加し、セグメントの開始と終了フレームを修正します（図5）。

Tips：ゲーム中の動画の循環再生は、下図の「Loop Time」にチェックしてください。

![5](img/5.png)（図5）<br/>

この例では、一つの攻撃動作が、美術によって提供されるアニメーションフレーム数に応じて4つのアニメーションセグメントに追加されるように修正される（図6）。

![6](img/6.png)（図6）<br/>

2）修正が完了すると、リソースマネージャモデルにも対応する動画ファイルが追加されますので、アニメーションコントローラを変更して、新しく生成したアニメーションセグメントをアニメーションコントローラに追加します。そうでないと、完全なアニメーションリソース解析ファイルをエクスポートできません。

![7](img/7.png)（図7）<br/>

前のステップを完了したら、再エクスポートし、出力されたリソースにも4つのlaniアニメーション解析ファイルが生成されます。

例コードを修正して、動画名の再生方式を適用します。


```typescript

Laya.Sprite3D.load("LayaScene_monkey/ACG_man.lh",Laya.Handler.create(this,function(sp){
  //加载到场景
  var hero = scene.addChild(sp);
  //让摄影机指向角色
  camera.transform.lookAt(hero.transform.position,new Laya.Vector3(0,1,0))
  //获取角色动画组件
   this.ani = hero.getChildAt(0).getComponent(Laya.Animator);
}));
//监听默认动画完成后播放站立动画
this.ani.on(Laya.Event.COMPLETE,this,onAniComplete);
//播放攻击动画
this.ani.play("attack");
/***当前动画播放完成后回调***/
function onAniComplete()
{
  //切换站立动画
  this.ani.play("stand");
}
```


![8](img/8.gif)（図8）<br/>