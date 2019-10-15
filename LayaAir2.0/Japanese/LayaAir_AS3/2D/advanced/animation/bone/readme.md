#骨格アニメーションテンプレート、再生モード、衣替え、切り替え動作

エンジンで骨格アニメーションを使うのはSpineでもDragonBoneでも使い方は同じです。変換の過程で変換ツールが二つのアニメーションをエンジンが使える同じフォーマットに変えたからです。骨格アニメーションの使い方を紹介します。

**一、骨格アニメーションテンプレート**

骨格アニメーションをより良く使うにはテンプレートの概念を言及しなければならない。LayaAirエンジンのテンプレートは特別な概念であり、データ構造を表しています。このデータ構造は多重化されます。骨格アニメーションはテンプレートを使用して、同じアニメーションに対しては一つのアニメーションテンプレートを作成して、それからインスタンスを複数再生することができます。このようにメモリには一つのアニメーションデータしかありませんが、複数のアニメーションをステージ上に表示することができます。

コードの例:


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonTempletSample 
    {
        public var templet:Templet;
        public function SkeletonTempletSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            //创建动画模板
            templet = new Templet();
            templet.on(Event.COMPLETE, this, parseComplete);
            templet.on(Event.ERROR, this, onError);
            //加载动画文件
            templet.loadAni("res/spine/goblins/goblins.sk");
        }
        private function onError():void
        {
            trace("parse error");
        }
        private function parseComplete():void
        {
            //创建第一个动画
            var skeleton0:Skeleton;
            //从动画模板创建动画播放对象
            skeleton0 = templet.buildArmature(0);
            skeleton0.pos(200, 700);
            //切换动画皮肤
            skeleton0.showSkinByIndex(1);
            //播放
            skeleton0.play(0,true);
            Laya.stage.addChild(skeleton0);
             
            //创建第二个动画
            var skeleton1:Skeleton;
            skeleton1 = templet.buildArmature(0);
            skeleton1.pos(500, 700);
            skeleton1.showSkinByIndex(1);
            skeleton1.play(0,true);
            Laya.stage.addChild(skeleton1);
        }
    }
 
}
```




**二、骨格動画再生モード**

前の部分のコード例では、このような行のコードが見られます。


```java

//从动画模板创建动画播放对象
skeleton0 = templet.buildArmature(0);
```


私たちはテンプレートからアニメーションを作成する時にパラメータ0を伝えました。このパラメータはアニメーションの再生モードを表します。動画は3つの再生モードがあります。それぞれ説明します。

0：テンプレートバッファのデータを使用して、テンプレートバッファのデータは、修正が許可されていません（メモリオーバヘッドが小さいので、計算オーバヘッドが小さいので、交換はサポートされていません）

1：アニメーションの自分の緩衝区を使って、すべてのアニメーションはいずれも自分の緩衝区があって、相当してメモリを消費します。（メモリオーバーヘッドが大きく、計算オーバーヘッドが小さいので、交換に対応）

2：ダイナミックな方式を使って、リアルタイムで絵を描きに行きます。（メモリのオーバヘッドが小さいので、計算オーバヘッドが大きいので、交換をサポートします。使用を推奨しません。）

この3つのモードの中で0:お着替えはサポートされていません。1,2はお着替えに対応しています。



**三、骨格アニメの衣替え**

前の例では、このような行コードが見られます。


```java

//切换动画皮肤
skeleton0.showSkinByIndex(1);
```


私たちはここで1番の皮膚に切り替わるというパラメータを伝えました。実はこのアニメは3つの皮膚があります。0番はデフォルトの皮膚です。1番は男性キャラクターの皮膚、2番は女性キャラクターの皮膚です。


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonChangeSkinSample 
    {
        public var templet:Templet;
        public function SkeletonChangeSkinSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            //创建动画模板
            templet = new Templet();
            templet.on(Event.COMPLETE, this, parseComplete);
            templet.on(Event.ERROR, this, onError);
            //加载动画文件
            templet.loadAni("res/spine/goblins/goblins.sk");
        }
        private function onError():void
        {
            trace("parse error");
        }
        private function parseComplete():void
        {
            //创建第一个动画
            var skeleton0:Skeleton;
            //从动画模板创建动画播放对象
            skeleton0 = templet.buildArmature(0);
            skeleton0.pos(200, 700);
            //切换动画皮肤 使用标号为0的皮肤
            skeleton0.showSkinByIndex(0);
            //播放
            skeleton0.play(0,true);
            Laya.stage.addChild(skeleton0);
             
            //创建第二个动画
            var skeleton1:Skeleton;
            skeleton1 = templet.buildArmature(0);
            skeleton1.pos(450, 700);
            //切换动画皮肤 使用标号为1的皮肤
            skeleton1.showSkinByIndex(1);
            skeleton1.play(0,true);
            Laya.stage.addChild(skeleton1);
             
            //创建第三个动画
            var skeleton2:Skeleton;
            skeleton2 = templet.buildArmature(0);
            skeleton2.pos(700, 700);
            //切换动画皮肤 使用标号为2的皮肤
            skeleton2.showSkinByIndex(2);
            skeleton2.play(0,true);
            Laya.stage.addChild(skeleton2);
        }
         
    }
 
}
```




**四、骨格アニメーションの切り替え動作**

皮膚の切り替え以外にも、骨格アニメーションは放送時にアニメーションの動作を切り替えることができます。例えば、キャラクターのランニング攻撃などの動作を同じアニメーションファイルに入れることができます。使う時はコードを使って動作を切り替えるだけでいいです。


```java

package  
{
    import laya.ani.bone.Skeleton;
    import laya.ani.bone.Templet;
    import laya.display.Text;
    import laya.events.Event;
    import laya.webgl.WebGL;
    /**
     * ...
     * @author ww
     */
    public class SkeletonChangeActionSample 
    {
         
        public function SkeletonChangeActionSample() 
        {
            WebGL.enable();
            Laya.init(1000, 900);
            test();
        }
        private var skeleton:Skeleton;
        private var text:Text;
        private function test():void
        {  
            skeleton = new Skeleton();
            skeleton.url = "res/spine/alien/alien.sk";
            skeleton.pos(300, 700);
            Laya.stage.addChild(skeleton);
             
            text = new Text();
            Laya.stage.addChild(text);
            text.color = "#00ff00";
            text.fontSize = 30;
            Laya.stage.addChild(text);
             
            Laya.stage.on(Event.MOUSE_DOWN, this, changeAction);
        }
        private var tActionID:int=0;
        private function changeAction():void
        {
            tActionID++;
            var aniCount:int;
            //获取动画动作数量
            aniCount = skeleton.getAnimNum();
            tActionID = tActionID % aniCount;
            //显示当前要播放的动画名
            text.text = skeleton.getAniNameByIndex(tActionID);
            //切换播放的动画
            skeleton.play(tActionID, true);
        }
    }
 
}
```
