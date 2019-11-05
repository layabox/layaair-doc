#直線と折れ線を引く



###一、直線を描く

APIでlaya.display.Graphics類を検索すると、APIの様々なベクトル描画方法が見られます。drawLine()は、ベクトルの直線を描くために使用されます。この方法の詳細は下図の通りです。



​	![blob.png](img/1.png)<br/>
（図1）

次にLayaAirエンジンで直線を描きます。コード例は以下の通りです。


```javascript

(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
    var WebGL  = Laya.WebGL;
    var sp;
 
    (function()
    {
        //初始化舞台
        Laya.init(500, 300, WebGL);
        drawSomething();
    })();
 
    function drawSomething()
    {
        sp = new Sprite();
        Laya.stage.addChild(sp);
        //画直线
        sp.graphics.drawLine(10, 58, 167, 58, "#ff0000", 5);
    }
})();
```


発表後は下図のように赤い直線を描きました。

​![blob.png](img/2.png)<br/>
（図2）



###二、折れ線を引く

折れ線はどうやって描きますか？直接drawLines()を使ってもいいです。この方法はdrawLineに似ています。コードを作る時は最後の「s」を落とさないようにしてください。drawLinesのパラメータ詳細は下図の通りです。

​![blob.png](img/3.png)<br/>
（図3）

次にLayaAirエンジンで折れ線を描きます。コード例は以下の通りです。



コード実行


```javascript

(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
    var WebGL  = Laya.WebGL;
    var sp;
 
    (function()
    {
        //初始化舞台
        Laya.init(500, 300, WebGL);
        drawSomething();
    })();
 
    function drawSomething()
    {
        sp = new Sprite();
        Laya.stage.addChild(sp);
        //画折线
        sp.graphics.drawLines(20, 88, [0, 0, 39, -50, 78, 0, 120, -50],  "#ff0000", 5);
    }
})();
```


効果:

​![blob.png](img/4.png)<br/>
（図4）

コードにより、折れ線と直線を描くパラメータの違いは3番目から、3番目のパラメータはArayタイプの折れ線点セットであり、そのうちの「0，0」は折れ曲がった点Aの開始座標であることが分かります。「39、-50」は折り返し点Bの開始座標です。「78，0」は折り返し点Cの開始座標であり、「120，−50」は終点Dの座標である。しかし、ここでは、3番目のパラメータのすべての座標は相対座標であり、1番目と2番目のパラメータの「20，88」に影響されます。「20、88」が変わると、全体の折れ線が影響します。

実際に符号化する過程で、手動でパラメータを調整して違いを感じることができます。



###三、LayaAirIDEでコントロールをドラッグして直線を描きます。

**ステップ1:**LayaAirIDEを開いて、デザインモードをクリックして、Viewページを新規作成します。



​	![6](img/5.png)<br/>
（図5）

**ステップ2:**コンポーネント内の曲線コンポーネントをViewページにドラッグすると、自動的にデフォルトの直線が生成されます。

​![7](img/6.png)<br/>
（図6）

**ステップ3:**ラインの属性の値を変更（追加/減少）し、直線の長さ、幅、色などを変更します。

​![8](img/7.png)<br/>
（図7）

​![9](img/8.png)<br/>
（図8）



###四、LayaAirIDEでコントロールをドラッグして折れ線を描きます。

**ステップ1:**LayaAirIDEを開いて、デザインモードをクリックして、Viewページを新規作成します。

​![6](img/5.png)<br/>
（図9）

**ステップ2:**コンポーネントの曲線コンポーネントをViewページにドラッグすると、自動的にデフォルトの折れ線が生成されます。

​![7](img/9.png)<br/>
（図10）

**ステップ3:**ラインの属性の値を変更（追加/減少）し、折れ線の角度、色、幅を変更するか、または新しい割引を追加します。

​![8](img/10.png)<br/>
（図11）

​![9](img/11.png)<br/>
（図12）

ここでLayaAirIDEのコンポーネントを通して直線と折れ線を描きます。