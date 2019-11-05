#Game auto vertical screen and keep vertical screen status



? with the automatic vertical screen setting of layaair, no matter how the mobile phone rotates, the horizontal direction of the game can always be vertical to the longest side of the browser display screen.

API parameters for screen orientation are shown in the following figure:

​![blob.png](img/1.png)<br/>
Figure (1) Screen orientation adaptation

​![blob.png](img/2.png)<br/>
Figure (2) Properties of screenMode settings



The example code of LayaAir automatic vertical screen is as follows:


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




The operation effect of Laaya Air automatic vertical screen in mobile phone vertical screen state is shown as follows:



​	![blob.png](img/3.png)<br/>
Figure (3) Running results after setting up the vertical screen



The effect of Laaya Air automatic vertical screen in mobile phone's horizontal screen is shown as follows:

​![blob.png](img/4.png)<br/>
Figure (4) Operation results after changing the longest edge



