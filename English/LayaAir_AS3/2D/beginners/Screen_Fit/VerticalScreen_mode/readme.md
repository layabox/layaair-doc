# The game automatically state screen to landscape or portrait mode



​        Through the automatic vertical settings of LayaAir, no matter how the mobile phone rotates, the horizontal direction of the game can always keep perpendicular to the longest edge of the browser display screen.

The API parameters for the screen orientation are shown below:

​	![blob.png](img/1.png)<br/>
​	Figure (1) Screen orientation adaptation

​	![blob.png](img/2.png)<br/>
​	Figure (2) screenMode set the properties



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
            // Initialize the stage, automatically switch to Canvas when WebGL not supported
            Laya.init(200, 300, WebGL);
             
            Laya.stage.alignV = "middle";
            Laya.stage.alignH = "center";
             
            Laya.stage.scaleMode = "showall";
 
            // Automatically vertical screen (portrait mode), so that the horizontal direction of the game is always perpendicular to the longest edge of the browser display screen.
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



LayaAir automatically set vertical screen operation of the mobile phone is as follows:

​	![blob.png](img/3.png)<br/>
​	Figure (3) operation result after setting vertical screen : portrait mode



LayaAir automatically set horizontal screen operation of the mobile phone is as follows:

​	![blob.png](img/4.png)<br/>
​	Figure (4) operation result after setting horizontal screen :  landscape mode



