#ゲームは自動的に縦画面と縦画面の状態を維持します。



LayaAirの自動縦画面設定により、携帯電話がどんなに回転しても、ゲームの水平方向は常にブラウザ表示画面の一番長いところと垂直に維持されます。

画面の方向に関するAPIパラメータは、下図のようになります。

​![blob.png](img/1.png)<br/>
図（1）画面方向の適合

​![blob.png](img/2.png)<br/>
図(2)screenMode設定のプロパティ



LayaAir自動縦スクリーンの例コードは以下の通りです。


```javascript

package 
{
    import laya.display.Stage;
    import laya.display.Text;
    import laya.webgl.WebGL;
 
    public class SmartScale_Portrait
    {
        public function SmartScale_Portrait() 
        {
            //初始化舞台，不支持WebGL时会自动切换至Canvas
            Laya.init(200, 300, WebGL);
             
            Laya.stage.alignV = "middle";
            Laya.stage.alignH = "center";
             
            Laya.stage.scaleMode = "showall";
 
            //自动竖屏，让游戏的水平方向始终与浏览器显示屏幕的最长边保持垂直。
            Laya.stage.screenMode = "vertical";
             
            Laya.stage.bgColor = "#232628";
             
            showText();
        }
         
        private function showText():void 
        {
            var text:Text = new Text();
             
            text.text = "游戏的水平方向";
            text.color = "gray";
            text.fontSize = 20;
             
            text.x = Laya.stage.width - text.width >> 1;
            text.y = Laya.stage.height - text.height >> 1;
             
            Laya.stage.addChild(text);
        }
    }
}

```




携帯電話の縦画面状態のLayaAir自動縦画面の運転効果は下図の通りです。

​![blob.png](img/3.png)<br/>
図（3）縦画面設定後の運転結果



携帯電話の横画面状態のLayaAir自動縦画面の運転効果は下図の通りです。

​![blob.png](img/4.png)<br/>
図（4）一番長い辺を変更した後の運転結果



