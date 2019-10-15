#メモリ最適化方式

###1、対象池を通じてメモリを最適化する

対象プールの最適化はゲーム開発において非常に重要な最適化方式であり、ゲームの性能に影響を与える重要な要素の一つでもある。

ゲームの中には、キャラクターの攻撃弾、特殊効果の作成と除去、NPCの消滅とリフレッシュなど、作成過程で非常に性能が消耗されます。特に数が多い場合。

対象プールの技術は上記の問題をうまく解決できます。対象を取り除いて消えた時に対象プールに回収して、新しい対象が必要な時に直接対象プールから取り出して使用します。

対象を実用化する際の出費を減らし、対象を繰り返して使うことができ、新たなメモリ分配とゴミ回収器の運転の機会を減らすことができるという利点があります。

**注意**：対象を削除する時はすぐにメモリから消去するのではなく、メモリが不足していると思えば、ゴミ回収機構を使って空になり、空き時間にメモリが消耗してしまい、カートン現象が発生する可能性があります。**対象プールを使ったら、プログラムのごみの対象を減らして、プログラムの運行速度と安定性を効果的に高めます。**。

####1.1 LayaAirエンジンの対象プール類

LayaAirエンジンは対象プール類を提供しています。[laya.utils.Pool](http://layaair.ldc.layabox.com/api/index.html?category=Core&class=laya.utils.Pool)を選択します。よく使われているのは`对象池创建`方法`getItemByClass()`を選択します`回收到对象池`方法`recover()`。 図1、図2に示すように。

![1](img/1.png)</br>


（図1）対象プールの作成方法

![2](img/2.png)<br/>

（図2）対象プール方法に回収し、使用する対象を対象池に戻す。

####1.2対象プールを使用した最適化の例

以下のコードのデモは100フレームごとに対象プール法を用いて100個の雪片を作成し、雪片が境界を超えて移動する場合やズームが0未満の場合はステージを除去し、Pool.recover（）方法を呼び出して、指定されたオブジェクトを対象プールに回収する。

##### 


```typescript

class PoolTest {
    private createTime: number = 0;

    constructor() {

        //初始化引擎
        Laya.init(1136, 640, Laya.WebGL);
        //等比缩放
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //背景颜色
        Laya.stage.bgColor = "#232628";
        //帧循环
        Laya.timer.frameLoop(1, this, this.onFrame);

    }
    onFrame(): void {
        //如果创建对象时间为100帧间隔后
        if (this.createTime >= 100) {
            //每200帧间隔创建30个雪花
            for (var i: number = 0; i < 100; i++) {

                //img:Image=new Image(); //不使用对象池的写法
                //通过对象池创建图片，如对象池中无相应的对象，则根据Image类型执行new Image()创建
                var img: Laya.Image = Laya.Pool.getItemByClass("img", Laya.Image);
                //通过锚点设置轴心点
                img.anchorX = img.anchorY = 0.5;
                //图片的资源
                img.skin = "res/snow0.png"
                //在舞台上方随机位置创建
                img.x = Math.random() * 1136;
                img.y = Math.random() * -150;
                //对象池中的图片被缩放了，需重新设置其缩放属性。
                //如果对象中还有其他属性被改变了，
                img.scaleX = img.scaleY = 1;
                //加载到舞台
                Laya.stage.addChild(img);
                //到100帧后创建完对象后时间归0
                this.createTime = 0;
            }
        } else {
            //更新创建时间
            this.createTime++;
        }
        //检测每个舞台中的图片对象，并进行位置更新。
   for(var j:number=0;j<Laya.stage.numChildren;j++)
            {
                //获取舞台中的图片对象
                var img1:Laya.Image=Laya.stage.getChildAt(j) as Laya.Image;
                //位置更新
                img1.y++;
                //缩放更新
                img1.scaleX-=0.001;
                img1.scaleY-=0.001;
                //图片旋转
                img1.rotation++;
                //超出边界或缩放小于0
                if(img1.y>640+20||img1.scaleX<=0)
                {
                    //从舞台中移除
                    Laya.stage.removeChild(img1);
                    //img1.destroy(); //不使用对象池的编写方式,直接用destroy清空             
                    //回收到对象池
                   Laya.Pool.recover("img",img1);
                }
            }
        }
    }

new PoolTest();
//以上代码的说明都在注释里，请详细查看。
```


###2、Handler.creatを使う

開発の過程で、よくHandlerを使って、非同期のフィードバックを完成します。Laya.Handler.createは内蔵対象プール管理を使用していますので、Handlerオブジェクトを使用する場合はLaya.Handler.createを使用して、レプリカプロセッサを作成することができます。以下のコードはLaya.Handler.reateを使用してリソースローディングのコールバックプロセッサを作成します。

1.`Laya.loader.load(urls, Laya.Handler.create(this, this.onAssetLoaded));`

私達はゲームの論理と段階によってリソースを大量にロードし、最初のリソースのロードが完了し、Laya.Handler.create（）が作成したcompleeteイベントのコールバック方法をトリガして、対象プールに回収されます。ゲームがある時、第二陣のリソースをロードする必要がある時、Laya.Handler.create（）はまず対象プールで同じコールプロセッサを検索します。対象のプールを直接使う方法で、メモリオーバヘッドを節約しました。

####Handler.creatを使うには注意すべき点

![3](img/3.png)<br/>

いくつかの特別な状況で注意が必要です。`Laya.Hanlder.create()`私たちは図3の使い方をよく見ます。`Laya.Hanlder.create()`方法説明。

対象のプールからHandlerを作成します。デフォルトは一回実行してすぐに回収します。

つまり、このコールバック方法を何回か触発する必要があれば、正しいです。`Laya.Hanlder.create()`方法の中の`once`パラメータ設定は`false`。または`new Laya.Handler()`の方式で作成します。

例えば、ゲーム開始画面にリソースをロードする必要があります。ロードリソースの進捗度を表示する必要があります。以下のコードはエラーです。

1.`Laya.loader.load(urls, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading));`

上のコードの中で、使用します。`Laya.Handler.create(this,this.onLoading)`戻ってきたコールバック方法は、プログレスロードの進捗イベントを処理するため、コールバック実行後に対象プールに回収されたため、プログレスロードの進捗イベントは一回で終了しましたが、実際にはリソースがロードされていません。

正しい書き方は：


```

Laya.loader.load(urls, Laya.Handler.create(this,this.onAssetLoaded), Laya.Handler.create(this,this.onLoading, null, false));
```


または:

1.`Laya.loader.load(urls, Laya.Handler.create(this,this.onAssetLoaded), new Laya.Handler(this, this.onLoading));`

**Tips**ここで混同できないのは、`Handler()`対象の池を使わない方式です。`Laya.Handler.create()`デフォルトでは対象プールが使用されています。Handlerについては混同できません。

**Handler（）APIは、図2−2に示すように参照される。**:

![4](img/4.png)<br/>

（図4）

###3、メモリを解放する

JavaScriptの運転中はごみ箱を起動できません。オブジェクトを回収できるようにするには、そのオブジェクトに対するすべての参照を削除する必要があります。Sprite提供の`destory()`メソッドは内部参照がnullに設定されます。

例えば、以下のコードの確保対象はゴミとして回収できる：

1.`//创建一个Sprite实例`
2.`var sp:Laya.Sprite = new Laya.Sprite();`
3.`//将sp内部引用设置为null`
4.`sp.destroy();`

オブジェクトがnullに設定されている場合、すぐにメモリから削除されません。メモリが十分低いとシステムが考えている場合だけ、ゴミ回収器が作動します。メモリ割り当て（対象削除ではなく）はゴミ回収をトリガします。

ゴミ回収期間はCPUを大量に占有し、性能に影響する可能性があります。対象を再利用することで、ゴミの回収を制限する試みです。また、できるだけ引用をnullに設定して、ゴミ回収器が少ない時間で対象を探すようにします。場合によっては（例えば、2つのオブジェクトが相互参照）、2つの参照をnullとして同時に設定できません。ごみ箱は、訪問できないオブジェクトをスキャンし、それをクリアします。これは参照カウントよりも消費性能が高いです。

###4、リソースアンインストール

ゲームの実行時には常に多くのリソースをロードします。これらのリソースは使用が完了したら直ちにアンインストールしなければなりません。

次の例では、リソースをロードした後のリソースのアンインストール前とアンインストール後のリソースの状態を示します。


```typescript

var assets: Array<any> = []
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
Laya.loader.load(assets, Laya.Handler.create(this, onAssetsLoaded));
function onAssetsLoaded():void
{
  for(var i:number = 0, len: number = assets.length; i<len; ++i)
  {
    var asset:string = assets[i];
    //查看log，清理前资源一直在内存中
    console.log(Laya.loader.getRes(asset));
    //调用清理方法
    Laya.loader.clearRes(asset);
    //查看log，清理后，资源被卸载
    console.log(Laya.loader.getRes(asset));
  }
}
```


1.###5、フィルター、カバーについて

フィルタの効果をできるだけ減らすことを試みます。フィルタ（BlurFilterとGlowFilter）を表示オブジェクトに適用すると、実行時にメモリにビットマップを2枚作成します。各ビットマップのサイズは表示オブジェクトと同じです。最初のビットマップを表示オブジェクトのバリアバージョンとして作成し、アプリケーションフィルタの別のビットマップを生成するために使用します。



   ![5](img/5.png)<br/>

（図5）

フィルタを適用するときのメモリ内の2つのビットマップ

フィルタの属性を変更したり、オブジェクトを表示したりすると、メモリ内の2つのビットマップが更新されて生成されたビットマップを作成します。この2つのビットマップはメモリを大量に占める可能性があります。また、このプロセスはCPU計算に関連しており、動的な更新により性能が低下します。

ColorFiterはCanvasレンダリングの下で各ピクセルポイントを計算する必要がありますが、WebGLの下でのGPU消費は無視できます。

最適な方法は、できるだけ画像作成ツールで作成したビットマップを使ってフィルタをシミュレートすることです。運転中にダイナミックなビットマップを作成しないことで、CPUやGPUの負荷を減らすことができます。特にフィルタが適用されていて、修正されていない画像です。