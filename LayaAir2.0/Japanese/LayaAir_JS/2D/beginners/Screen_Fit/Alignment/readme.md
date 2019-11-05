#配置モード：水平方向の配置と垂直方向の配置

>配置モードに関しては、主に従来の水平方向の配置が垂直方向に配置されています。LayaAirエンジンは便利で効率的な構成ができます。APIのパラメータ説明を確認してからコード例を紹介します。
>

パラメータの説明は、図1、図2に示すように、

​![image.png](img/1.png)<br/>
図（1）画面にフィットする配置モード



​![blob.png](img/2.png)<br/>
図（2）配置モードのプロパティ



水平中央と垂直中央のデモを用いて実証した。


```javascript

(function()
{
    var Stage = Laya.Stage;
    var WebGL  = Laya.WebGL;
  
    (function()
    {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
        
            //垂直居中对齐，另一种写法：Laya.stage.alignV = Stage.ALIGN_MIDDLE
            Laya.stage.alignV = "middle";
              
            //水平居中对齐，另一种写法：Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.alignH = "center";
  
            Laya.stage.bgColor = "#FF0000";
    })();
})();
```


運転効果は図3に示す通りです。

​![blob.png](img/3.png)<br/>
図（3）の例の運転結果

他の配置モードは、AlignHおよびAlignVの値を修正し、実際に符号化する過程で異なる配置パターンを体験することができる。