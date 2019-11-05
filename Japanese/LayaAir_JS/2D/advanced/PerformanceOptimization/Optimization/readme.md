#メモリ最適化

リリース期間：2016-12-30

### **一、対象プール**

対象プールは、繰り返し使用する対象に関連します。アプリケーションを初期化する間、一定数のオブジェクトを作成し、プールに保存します。一つのオブジェクトを操作したら、そのオブジェクトをプールに戻し、新しいオブジェクトが必要なときに検索できます。

実用化対象コストが高いため、対象プールを使ってオブジェクトを再利用することで、実用化対象のニーズを低減することができます。ゴミ回収機の運行機会を減らして、プログラムの運行速度を高めることもできます。

以下のコードのプレゼンテーションを使用します。`Laya.utils.Pool：`


```javascript

var SPRITE_SIGN = 'spriteSign';
var sprites = [];
function initialize()
{
    for (var i = 0; i < 1000; i++)
    {
        var sp = Pool.getItemByClass(SPRITE_SIGN, Sprite)
        sprites.push(sp);
        Laya.stage.addChild(sp);
    }
}
initialize();
```


initializeに1000のサイズのオブジェクトプールを作成します。

以下のコードは、マウスをクリックすると、表示リストのすべての表示オブジェクトを削除し、以降の他のタスクでこれらのオブジェクトを繰り返し使用します。


```javascript

Laya.stage.on("click", this, function()
{
    var sp;
    for(var i = 0, len = sprites.length; i < len; i++)
    {
        sp = sprites.pop();
        Pool.recover(SPRITE_SIGN, sp);
        Laya.stage.removeChild(sp);
    }
});
```


Pool.recoverを呼び出したら、指定されたオブジェクトはプールに回収されます。



 



### **二、Handler.creatを使う**

開発の過程で、よくHandlerを使って、非同期のフィードバックを完成します。Handler.createは内蔵対象プール管理を使用していますので、Handlerオブジェクトを使用する場合は、Handler.createを使用してフィードバックプロセッサを作成します。以下のコードは、Handler.reateを使用してロードされたコールバックプロセッサを作成します。


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded));
```


上記のコードでは、コールバックが実行されると、Handlerは対象プールに回収されます。この時、下記のコードで何が起こるかを考えます。


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading));
```


上記のコードでは、Handler.reateを使用して戻ってきたプロセッサがprogressイベントを処理します。この場合のコールバックは一回実行すると対象プールに回収されます。プログレスイベントは一回だけトリガされます。この場合、4つのオンスというパラメータをfalseに設定する必要があります。


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading, null, false));
```





 



### **三、メモリを釈放する**

JavaScriptの運転中はごみ箱を起動できません。オブジェクトが回収できるようにするには、そのオブジェクトに対するすべての参照を削除してください。Spriteが提供するdestoryは内部参照をnullに設定するのを助けます。

例えば、以下のコードの確保対象はゴミとして回収できる：


```javascript

var sp = new Sprite();
sp.destroy();
```



オブジェクトがnullに設定されている場合、すぐにメモリから削除されません。メモリが十分低いとシステムが考えている場合だけ、ゴミ回収器が作動します。メモリ割り当て（対象削除ではなく）はゴミ回収をトリガします。

ゴミ回収期間はCPUを大量に占有し、性能に影響する可能性があります。対象を再利用することで、ゴミの回収を制限する試みです。また、できるだけ引用をnullに設定して、ゴミ回収器が少ない時間で対象を探すようにします。場合によっては（例えば、2つのオブジェクトが相互参照）、2つの参照をnullとして同時に設定できません。ごみ箱は、訪問できないオブジェクトをスキャンし、それをクリアします。これは参照カウントよりも消費性能が高いです。

### **四、リソースアンインストール**

ゲームの実行時には常に多くのリソースをロードします。これらのリソースは使用が完了したら直ちにアンインストールしなければなりません。

次の例では、リソースをロードした後のリソースのアンインストール前とアンインストール後のリソースの状態を示します。


```javascript

var assets = [];
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
  
Laya.loader.load(assets, Handler.create(this, onAssetsLoaded));
  
function onAssetsLoaded()
{
    for(var i = 0, len = assets.length; i < len; ++i)
    {
        var asset = assets[i];
        console.log(Laya.loader.getRes(asset));
        Laya.loader.clearRes(asset);
        console.log(Laya.loader.getRes(asset));
    }
}
```


### **五、フィルター、カバーについて**


フィルタの効果をできるだけ減らすことを試みます。フィルタ（BlurFilterとGlowFilter）を表示オブジェクトに適用すると、実行時にメモリにビットマップを2枚作成します。各ビットマップのサイズは表示オブジェクトと同じです。最初のビットマップを表示オブジェクトのバリアバージョンとして作成し、アプリケーションフィルタの別のビットマップを生成するために使用します。

​![图片1.png](img/1.png)<br/>
（図1）

フィルタを適用するときのメモリ内の2つのビットマップ

フィルタの属性を変更したり、オブジェクトを表示したりすると、メモリ内の2つのビットマップが更新されて生成されたビットマップを作成します。この2つのビットマップはメモリを大量に占める可能性があります。また、このプロセスはCPU計算に関連し、動的更新時に性能を低下させる（「グラフィックスレンダリング性能–cacheAsについて」参照）。

ColorFiterはCanvasレンダリングの下で各ピクセルポイントを計算する必要がありますが、WebGLの下でのGPU消費は無視できます。

最適な方法は、できるだけ画像作成ツールで作成したビットマップを使ってフィルタをシミュレートすることです。運転中にダイナミックなビットマップを作成しないことで、CPUやGPUの負荷を減らすことができます。特にフィルタが適用されていて、修正されていない画像です。

###  **六、その他の最適化戦略**

1.粒子の使用量を減らし、モバイルプラットフォームCanvasモードでは、粒子を使わないようにする。
2.Canvasモードでは、回転、スケーリング、アルファなどの属性の使用をできるだけ減少させ、これらの属性は性能に対して消費される。（WebGLモードで使用可能）
3.timeloopの中で対象と複雑な計算を作成しないでください。
4.できるだけ容器のautSizeの使用を減らし、get Boundsの使用を減らします。これらの呼び出しは多くの計算が生じるからです。
5.できるだけtry catchを使わないでください。try catchの関数で実行されるととても遅くなります。