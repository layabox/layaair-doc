#LayaAirエンジンAS 3とFlash原生AS 3の開発の違い

LayaAirエンジンはFlash AS 3言語開発HTML 5ゲームをサポートしていますが、開発者が注意するべきなのは、Flash AS 3の生API、LayaAirエンジンはサポートされていません。LayaAir自身は非常に完璧で強力なAPIを持っていますので、エンジンはAS 3の基礎文法を使ってHTML 5製品の開発をサポートしています。特に、Flash AS 3の開発経験を持つ開発者には、API以外に、以下のような違いに注意しなければならない。Flash AS 3の使用法は少量あり、LayaAirでも使用できない。



##一、LayaAirエンジンはサポートしていませんint()

開発者はLayaAirエンジンを使用する際に、LayaAirエンジンではサポートされていませんので、ご注意ください。関連する機能の開発が必要な場合は、パーrseInt（）で代替できます。

**原生as 3はサポートされていますが、LayaAirエンジンによってサポートされていない例：**


```java

var a:int = int(1.5);//int对浮点数取整在原生Flash开发中支持，LayaAir中不被支持
```


**LayaAirエンジンにおける正しい使い方例：**


```java

var a:int = parseInt(1.5)//对浮点数取整，LayaAir引擎中需要采用parseInt方法
```






##二、markカバーの使用差異

LayaAirエンジンでMaskを使うには2つの注意が必要です。

1、Maskは表示オブジェクトの内部に追加されています。つまり、LayaAirの下のMask座標は、舞台ではなくカバー対象に対してです。

2、カバーがダイナミックであれば、カバー対象のrepaint（）を呼び出す必要があります。

コードで差を調べてみます。



###2.1スタティックフード

**原生as 3はサポートされていますが、LayaAirエンジンによってサポートされていない例：**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.pos(100,100)
mask.graphics.endFill();
sp.mask=mask
```




**LayaAirエンジンにおける正しい使い方例：**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
mask.pos(sp.x+100,sp.y+100)
sp.mask=mask;
```




###2.2ダイナミックカバー

**原生as 3はサポートされていますが、LayaAirエンジンによってサポートされていない例：**


```java

var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.graphics.endFill();
sp.mask=mask;
 
addEventListener(Event.ENTER_FRAME,function():void
{
    mask.x++;
    mask.cacheAsBitmap=true;
    sp.cacheAsBitmap=true;
});
```




**LayaAirエンジンにおける正しい使い方例：**


```java

Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
sp.mask=mask;
 
Laya.timer.frameLoop(1,this,function():void
{
    mask.x++;
    sp.repaint();
});
```




##三、Sprite自身が描いたgraphicsベクトルパターン登録イベントのクリックエリアの違い。

オリジナルFlash AS 3では、Spriteの精霊が作成されたら自動的に幅の高さを計算します。しかし、layaAirエンジンでは、性能を節約するために、デフォルトSpriteの精霊は幅が高くなく、Spriteのために衝突エリア、つまりhitAreaまたはsizeを設定する必要があります。



**原生as 3はサポートされていますが、LayaAirエンジンによってサポートされていない例：**


```java

var sprite:Sprite = new Sprite();
sprite.graphics.beginFill(0xffcc00);
sprite.graphics.drawRect(100,100,100,100);
sprite.graphics.endFill();
addChild(sprite);
sprite.addEventListener(MouseEvent.CLICK,onClick);
function onClick(evt:MouseEvent):void
{
    trace("------aaa---------");
 }
```




**LayaAirエンジンにおける正しい使い方例：**

実現方法一：


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```


実現方法一：


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(0,0,100,100,"#ff9900");
sprite.size(100,100);
Laya.stage.addChild(sprite);
sprite.on(Event.CLICK,this,onClick);
function onClick(evt:Event):void
{
    trace("-------click--------");
}
```




##四、事件の対象派出の差異

事件の対象の配布については、主に文法的な違いがあります。LayaAirエンジンはこの方法のキーワードとパラメータに対して簡潔で豊富である。LayaAirは、イベントを配信したり、傍受したりする際に、データを携帯したりすることができます。例えば、配布対象・イベントタイプ、［データソース］、傍受対象・on（'イベントタイプ'、'イベントリスニング関数の実行領域'、'イベントリスニング関数'、'コールパラメータ'）。



**原生as 3はサポートされていますが、LayaAirエンジンによってサポートされていない例：**

**髪を送る:**


```javascript

dispatchEvent(event:Event);
```


**待ち受け:**  


```javascript

addEventListener(type,listener,useCapture,priority,useWeakReference));
```




**LayaAirエンジンにおける正しい使い方例：**

**髪を送る:**


```

派发对象.event(type:String,data:*=null);
```


**待ち受け:**  


```

派发对象.on(type,caller,listener,args);
```




##五、LayaAirとAS 3の違い

Flash AS 3の生APIの書き方ではそのままSpriteを継承することができますが、LayaAirエンジン内の主な文書類の入口（初期化エンジン前）は直接Spriteを継承することができず、AS 3の伝統的な習慣に従ってSpriteを継承するとエラーが発生します。



**間違った書き方：**


```

package  {
    import laya.display.Sprite;
     
    //extends Sprite在LayaAir引擎初始化之前继承会报错
    public class HelloLayabox extends Sprite {
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```




**正しい書き方：**


```

package  {
    import laya.display.Sprite;
      
    public class HelloLayabox{
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```






