#CPUの使用量を減らす

### **一、動的属性の検索を減らす**

JavaScriptのどのオブジェクトもダイナミックです。属性を任意に追加できます。しかし、大量の属性で属性を検索するのは時間がかかります。頻繁に属性値を使う必要がある場合は、ローカル変数を使って保存できます。


```typescript

foo()
{
var prop=this.target.prop;
//使用prop
this.process1(prop);
this.process2(prop);
this.process3(prop);
}
```


###二、タイマー

LayaAirはコードブロックを実行するために2つのタイマサイクルを提供する。

1.`Laya.timer.frameLoop`実行周波数はフレーム周波数に依存し、現在のフレーム周波数はStatit.FPSによって確認され得る。


1.`Laya.timer.loop`実行周波数はパラメータ指定時間に依存します。


```typescript

Laya.timer.frameLoop(1, this, this.animateFrameRateBased);
Laya.stage.on("click", this, this.dispose);
dispose() 
{
    Laya.timer.clear(this, this.animateFrameRateBased);
}
```


オブジェクトのライフサイクルが終了したら、内部のTimerをクリアしてください。

### **三、表示対象境界の取得方法**

相対配置では、表示オブジェクトの境界を正確に取得する必要がある場合が多い。表示オブジェクトの境界を取得するには様々な方法がありますが、その違いを知る必要があります。

1.get Bounds/get Graphic Boundsを使用します。


```typescript

var sp=new Laya.Sprite();
sp.graphics.drawRect(0,0,100,100,"#FF0000");
var bounds:Laya.Rectangle=sp.getGraphicBounds();
Laya.stage.addChild(sp);
```


get Boundsは多数の需要を満たすことができますが、境界を計算する必要があるので、頻繁に起動するのには適していません。

1.容器を設置するatoSizeはtrueです。


```typescript

var sp=new Laya.Sprite();
sp.autoSize=true;
sp.graphics.drawRect(0,0,100,100,"#FF0000");
Laya.stage.addChild(sp);
```


上記のコードは、運転時に正確に幅の高さを取得することができます。autSizeは、幅が高く、表示リストの状態が変化した場合に再計算されます。大量のサブオブジェクトを持つ容器にatoSizeを適用することはできません。sizeを設定すると、atoSizeは効果がありません。

loadImageを使用して、幅の高さを取得します。


```typescript

var sp=new Laya.Sprite();
sp.loadImage("res/apes/monkey2.png",0,0,0,0,Laya.Handler.create(this,function()
{
    console.log(sp.width,sp.height);  
}));
Laya.stage.addChild(sp);
```


loadImageは、ロードが完了したコールバック関数がトリガされた後に、幅の高さを正しく取得することができます。

1.**直接呼び出しsize設定:**


```typescript

Laya.loader.load("res/apes/monkey2.png",Laya.Handler.create(this,function()
{
  var texture=Laya.loader.getRes("res/apes/monkey2.png");
  var sp=new Laya.Sprite();
  sp.graphics.drawTexture(texture,0,0);
  sp.size(texture.width,texture.height);
  Laya.stage.addChild(sp);
}));
```


Graphcs.drawTextureを使うと自動的に容器の幅が高く設定されませんが、Textureの幅の高いコンテナを使用することができます。もちろん、これは一番効率的な方法です。

**注：getGraphics Boundsは、ベクトルの描画幅の高さを取得します。**

### **四、活動状態に応じてフレームレートを変更する。**

フレーム周波数は3つのモードがあり、

##-Stage.FRAMEWWはFPSを30に維持します。Stage.FRAMEuFASTはFPSを60に維持します。
−Stage.FRAMEmoUSEは、FPSが30または60フレームで選択的に維持される。

60 FPSの速度でゲームを実行させる必要がない場合があります。30 FPSは多くの場合、人間の視覚的な応答を満たすことができますが、マウスのインタラクションでは30 FPSは画面の不連続を引き起こす可能性があります。

次の例はStage.FRAMEuSLOWのフレームレートで、キャンバスの上でマウスを動かして、ボールをマウスに従って移動させます。


```typescript

Laya.init(this.Browser.width,this.Browser.height);
Laya.Stat.show();
Laya.stage.frameRate=Laya.Stage.FRAME_SLOW;

var sp=new Laya.Sprite();
sp.graphics.drawCircle(0,0,20,"#990000");
Laya.stage.addChild(sp);

Laya.stage.on(Laya.Event.MOUSE_MOVE,this,function()
{
  sp.pos(Laya.stage.mouseX,Laya.stage.mouseY);
});
```


![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/1.png)

（図1）

このときFPSは30を表示し、マウス移動時にボール位置の更新が不連続であることを感じることができる。Stage.frame RateをStage.FRAMEuMOUSEに設定:


```typescript

Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
```


![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/2.png)

（図2）

この場合、マウス移動後にはFPSに60が表示され、画面の滑らかさが向上します。マウスが2秒静止するとFPSは30フレームに戻ります。

### **五、calLaterを使う**

call Laterはコードブロックを本フレームレンダリング前に遅延させて実行する。現在の操作があるオブジェクトの状態を頻繁に変える場合、繰り返し計算を減らすためにコールLaterを使うことが考えられます。

図を考慮して、外観を変更する属性を設定すると、図の再描画につながります。


```typescript

var rotation=0,
scale=1,
position=0;

private function setRotation(value):void
{
  this.rotation=value;
  update();
}

private function setScale(value):void
{
  this.scale = value;
    update();
}
private function setPosition(value):void
{
    this.position = value;
    update();
}
public function update()
{
    console.log('rotation: ' + this.rotation + '\tscale: ' + this.scale + '\tposition: ' + this.position);
}
```


以下のコードの変更状態を呼び出します。


```

setRotation(90);
setScale(2);
setPosition(30);
```


コンソールの印刷結果は：


```

rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```


udateは3回呼び出されました。最後の結果は正しいですが、前の2回の呼び出しは必要ありません。

3つのアップデートを以下に変えてみます。


```

Laya.timer.callLater(this, update);
```


この時、udateは一回だけ呼び出します。そして私達が欲しい結果です。

### **六、写真/図集の読み込み**

画像/図セットの読み込みが完了すると、エンジンが画像リソースの処理を開始します。読み込むものが図セットであれば、各サブ画像を処理します。大量の画像を一度に処理すれば、このプロセスは成長時間のカートンを作るかもしれない。

ゲームのリソースローディングでは、ステージ、シーンなどによってリソースを分類してロードすることができます。同じ時間に処理した写真がいいです。その時のゲームの応答速度ももっと速いです。リソースの使用が完了したら、アンマウントしてメモリを解放することもできます。