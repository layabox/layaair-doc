#Game Auto Vertical Screen and Maintain Vertical Screen Status



With the automatic vertical screen setup of LayaAir, no matter how the mobile phone rotates, the horizontal direction of the game is always perpendicular to the longest side of the browser screen.

API parameters for screen orientation are shown in the following figure:



​![blob.png](img/1.png)<br/>

Figure (1) Screen orientation adaptation

​![blob.png](img/2.png)<br/>
Figure (2) Properties of screenMode settings



The example code of LayaAir automatic vertical screen is as follows:


```typescript

module laya {
    import Stage = Laya.Stage;
    import Text = Laya.Text;
    import WebGL = Laya.WebGL;
 
    export class SmartScale_Portrait {
        constructor() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(200, 300, WebGL);
 
            Laya.stage.alignV = "middle";
            Laya.stage.alignH = "center";
 
            Laya.stage.scaleMode = "showall";
 
            //自动竖屏，让游戏的水平方向始终与浏览器显示屏幕的最长边保持垂直。
            Laya.stage.screenMode = "vertical";
 
            Laya.stage.bgColor = "#232628";
 
            this.showText();
        }
 
        private showText(): void {
            var text: Text = new Text();
 
            text.text = "游戏的水平方向";
            text.color = "gray";
            text.fontSize = 20;
 
            text.x = Laya.stage.width - text.width >> 1;
            text.y = Laya.stage.height - text.height >> 1;
 
            Laya.stage.addChild(text);
        }
    }
}
new laya.SmartScale_Portrait();
```




The operation effect of Laaya Air automatic vertical screen in mobile phone vertical screen state is shown as follows:

​![blob.png](img/3.png)<br/>

Figure (3) Running results after setting up the vertical screen



The effect of Laaya Air automatic vertical screen in mobile phone's horizontal screen is shown as follows:

​![blob.png](img/4.png)<br/>
Figure (4) Operation results after changing the longest edge



