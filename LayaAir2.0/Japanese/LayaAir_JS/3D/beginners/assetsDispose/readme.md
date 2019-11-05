#LayaAir 3 Dの資源放出

###### 修改时间:2019-4-24,version:2.0.1

###なぜ資源を釈放しますか？

LayaAir 3 Dゲームの開発において、資源の放出は非常に重要です。3 Dリソースには、モデル、スタンプ、材質、動画などが含まれており、良い画面効果を達成するためには、ファイルは2 Dよりも大きくなります。3 Dエンジンは基本的にすべてのリソースをGPUに入れて計算してレンダリングするので、多くの表示を占めています。ゲームのレベルがどんどん読み込まれて、ゲームがどんどん深くなって、現存中の資源がだんだん多くなります。資源を解放しないと、ゲームは最終的に崩壊します。

現存はメモリと違って、メモリはゴミ回収の仕組みがあります。現存は違っています。手動で釈放しなければならないので、現存する資源の放出は重視されなければなりません。

図1、図2の統計ツールにおける現存サイズを観察する。

図1はゲーム起動後にロードされる最初のシーンで、表示回数は30527で、69.2 Mを占有している。

![1](img/1.png)(图1)</br>


図2はゲームにロードされた第2のシーンで、面数は7455しかないが、ロード後の現存リソースは118.91 Mである。これはどういう理由ですか？顔なじみが少なく、シーンが小さく、スタンプも図1のシーンより少ないです。写真のスタンプも小さいですが、現存資源がもっと大きいです。

これは第一段階のシーンの資源が解放されていないためで、その資源はまだ現存中で、だから現存占有が大きくなりました。手動でクリアしないと、ゲームは他のシーンに切り替わり続けます。一定量に達すると、携帯のディスプレイは消耗されます。ゲームカードの死、フラッシュバック、発熱などの現象が頻繁に現れます。

![2](img/2.png)（図2）<br/>



###資源をロードする時の処理原則

上の図の例を通して、LayaAir 3 Dエンジンの処理資源と現存の関係を見ることができます。ゲームの性能最適化の目的を達成するために、資源をロードする時も原則を注意しなければなりません。

1、資源をロードする時は、必要な資源だけを一度に全部ロードしないでください。3 Dリソースのロードが完了すると、リソースの拡張子の名前に基づいて直接3 D表示オブジェクトを作成します。例えば.lsはScheneを作成します。lhはSprite 3 Dオブジェクトを作成します。作成した対象リソースはステージに置いていなくても直接に現存に入れるので、資源が多すぎると大量に現存します。

2、合理的に現存を管理し、頻繁に繰り返し使用する資源は現存において釈放する必要がなく、繰り返し使用する資源は使用完了後直ちに釈放して、性能オーバーヘッドを節約する。例えば主役の資源、3 Dの道具の資源、プレーヤーはいつも使って、ずっと現存の中で保管することができて、スピードを抽出するのは速いです。



###現存資源の放出方法

現存リソースを解放する方法は二つあります。一つはオブジェクトを通じて現存リソースを解放することです。ただし、リソースオブジェクトを遍歴するのは面倒です。ここでは紹介しません。もう一つは、リソースアドレスを通じて現存リソースを解放することであり、リソース管理の観点から、リソースアドレス方法を通じてより柔軟に、JSONデータテーブルを構成して管理することができる。

####切り替えシーンとリリースリソースの遷移画面

リソースをロードしてシーンを切り替えるとき、図3に示すように、遷移のための進捗表示画面をIDEで作成します。

![3](img/3.png)（図3）<br/>

IDEリリース後、制御クラスを作成し、論理コードは下記を参照してください。


```typescript

export default Progress = (function(_super){
    var scene1;
    function Progress(){
        Progress.super(this);
    }
    Laya.class(Progress,"Progress",_super);
    //初始化，进度计时
    Progress.prototype.init = function(){
        //JS加载IDE生成页面场景JOSN文件获取场景
        Laya.Scene.load("ProgressBar.scene",Laya.Handler.create(this,function(s){
            this.scene1　= Laya.stage.addChild(s);
            //调整场景层级
            this.scene1.zOrder = 1;
            //设置进度条进度为0
            this.scene1.pro.value = 0;
            //进度增加的帧循环
            Laya.timer.loop(20,this,this.onLoop);
        }));
    }
    Progress.prototype.onLoop = function(){
        //进度增加
        this.scene1.pro.value +=0.01;
        //最高进度100%
        if(this.scene1.pro.value>=1){
            this.scene1.pro.value = 1;
            Laya.timer.clearAll(this);
            //移除自己
            this.scene1.removeSelf();
        }
    }
    return Progress;
}(Laya.Scene));

```




####リソースアドレステーブルを通じて現存リソースを解放する。

メインクラスでは、マウスで舞台をダブルクリックして場面を切り替え、リソースアドレスを使って現存リソースを解放する方法を使って、新しいシーンをロードします。

リソースパスのリスト方法が柔軟で、テーブルを構成することによって、テーブル内の削除リソースを増やすことができます。例えば美術はシーンをエクスポートする時、JSON表を新たに作って、このシーンの中で切り替えた後に必要でない資源のルートをすべてJ表の中に置いて、役に立つ資源は表に入れないで、資源は釈放しないで、たとえばいくつかの公共のNPC、道具、特効などのゲームの元素の資源。

Tips：リソースは、シーン光のスタンプlightmap、材質、lmat、モデル、lm、様々なタイプのスタンプ、pngまたは.jpg、動画、lani、骨格、lavなどの資源を含みます。

ここでは、リソース表の方法を紹介します。まず、エクスポートされたリソースファイルディレクトリにjsonファイルを作成し、リリースするパスリソースを編集し、Json配列を形成します。名前はlsファイルと一致しています。図5、6のように。

![5](img/5.png)（図5）<br/>

![6](img/6.png)（図6）<br/>

Json編集が完了したら、チェックツールでフォーマットが正しいかどうかを確認できます。次にメインクラスのコードを作成します。


```typescript

import Progress from "./Progress";
var Main = (function () {
  var scene;
  var load;
  function Main() {

    //初始化引擎
    Laya3D.init(0, 0);

    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

    //开启统计信息
    Laya.Stat.show();
    Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,on2DComplete));
  }

  /*加载2D资源完成回调*/
  function on2DComplete(){
    this.load = new Progress();
    this.load.init();
    //加载第一关场景角色3D资源（不能全部加载，否则太占显存）
    Laya.loader.create(["LayaScene_test/test.ls","LayaScene_twonScene/twonScene.ls"],Laya.Handler.create(this,this.on3DComplete));
  }

  var _proto = Main.prototype; 
  /*加载3D资源完成回调*/
  _proto.on3DComplete = function(){
    //实例化场景
    this.scene = Laya.loader.getRes("LayaScene_test/test.ls");
    this.scene.enableFog = true;
    this.scene.fogColor = new Laya.Vector3(0,0,0.6);
    this.scene.fogStart= 2;
    this.scene.fogRange = 4;
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);
    //监听屏幕的鼠标事件切换场景
    Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.ChangeScene);
  }
  _proto.ChangeScene = function(){
    //关闭鼠标事件的监听
    Laya.stage.off(Laya.Event.MOUSE_DOWN,this,this.ChangeScene);
    //删除第一个场景
    this.scene.removeSelf();
    this.load.init();
    //加载第二个场景
    this.scene = Laya.loader.getRes("LayaScene_twonScene/twonScene.ls");
    Laya.stage.addChild(this.scene);
    Laya.stage.setChildIndex(this.scene,0);
    this.assetsDispose();
  }
  _proto.assetsDispose = function(){
    Laya.loader.load("loveScene.json",Laya.Handler.create(this,this.onAssetOK));//,null,null,1,true,"Scene1");
  }
  _proto.onAssetOK = function(){

    console.log("现有显存中的资源：",Laya.Loader.loadedMap);
    //获取加载的数据（Json数据转换成数组）
    var arr=new Array()
    this.arr = Laya.loader.getRes("loveScene.json");
    for(var i = this.arr.length-1;i>-1;i--)
    {
      var resource = Laya.loader.getRes(this.arr[i].url)
      if (resource)
      {
        //按路径销毁资源
        resource.destroy();
      }
      else {
        console.log(this.arr[i].url);
      }
    }
  }
  return Main;
})();
new Main();

```


上記コードassites Displaseを観察して、配置表をロードした後、Laya.loader.getsRes（arr[i].url）方法で直接にリソースによって生成されたオブジェクトを取得します。LayaAir 2.0の正式版の後で、もう一つの方法でresource.destroyを呼び出しました。

リソースをリリースした後、Loader.loadeMap属性によってキャッシュ中のリソースを確認することもできます。

上記のコードをコンパイルして実行すると、図4の効果が見られます。リリースが完了し、新しいフィールドシーンをロードすると、グラフィック占有率は前よりずっと小さくなります。これまでリリースされていなかったリソースは118.91 mで、リリース後の現存は59.68 Mのみを占めています。

![4](img/4.png)

###リソースの自動リリース

LayaAir 2.0は開発者の開発を容易にするために、3 D資源のリリースに便利なリリース方式を追加しました。

シーン（または精霊）を破壊した後に呼び出します。`Laya.Resource.destroyUnusedResources()`使用していないリソースは自動的に放出されます。


```typescript

//自动释放没有被使用的资源
Laya.Resource.destroyUnusedResources();
```


