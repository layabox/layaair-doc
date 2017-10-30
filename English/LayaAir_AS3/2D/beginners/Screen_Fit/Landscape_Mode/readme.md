# Automatic lock game to landscape screen mode



Before talking about the automatic landscape mode, we need clarify horizontal display statement for the screen game.

Currently, landscape mode is more "user friendly" for mobile phone device, It is the more natural way to interact with a smartphone.
So from this user experience, we tend to say that vertical screen is theorically  most adapted.  However, should portrait mode should be rejected ? Here is an introduction of three main points for this debate topic.

#### 1. Does horizontal screen games need more performance consumption?

We can wonder whether rotation to Portrait mode cause a lost of resource. Since the processing it does only once at init, it is completely avoidable. Also there is not big difference in amount of rendering in the screen compare to vertical screen state, so the question can be ignored.

#### 2. Horizontal screen game user conversion rate will be lower?

In early stage of first HTML5 games, most of engines didn't support orientation screen, and horizontal mode. So the gameplay should limited to the only vertical screen mode, which can lead loss of some users. LayaAir Engine can support both mode, and depends the game design or content requierement, developers are not limited by the type of the display. So historically, users experience are used to landscape view content. 

#### 3. Game experience of vertical screen game is better than that of horizontal screen game?

The first thing that can't be denied is that there are a lot of great games in the vertical screen game. But horizontal screen games, especially the APP horizontal screen games, also have a lot of successful Games Case. So whether it's a horizontal screen game or a vertical one screen game, as long as the production team is excellent, can be produced out a masterpiece. Depending the gameplay you want to develop or user experience most adapted to your design, will effect significantly the choice. In most of case, portrait display are suitable for casual and portrait for hardcore gamers. 



## How to set auto horizontal screen for LayaAir engine

As mentioned above, the LayaAir engine sets up an automatic horizontal screen that locks to landscape mode. The automatic horizontal screen example code is as follows:  

```javascript
package 
{
    import laya.display.Stage;
    import laya.display.Text;
    import laya.webgl.WebGL;
 
    public class SmartScale
    {
        public function SmartScale() 
        {
            // Automatically switch to Canvas when WebGL is not supported
            Laya.init(500, 300, WebGL);
       
           // Let the  stage in the middle of the screen
            Laya.stage.alignH = "center";
 
            //  Keep the original aspect ratio, the stage will cover with the screen
            Laya.stage.scaleMode = "showall";
  
            // Automatic horizontal screen, the horizontal direction of the game is always perpendicular to the browser screen edge
            Laya.stage.screenMode = "horizontal";
             
            // Set the stage background color
            Laya.stage.bgColor = "#232628";
     
            showText();
        }
         
        private function showText():void 
        {
            var text:Text = new Text();
             
            text.text = "游戏水平方向";
            text.color = "gray";
            text.fontSize = 50;
             
            text.x = Laya.stage.width - text.width >> 1;
            text.y = Laya.stage.height - text.height >> 1;
             
            Laya.stage.addChild(text);
        }
    }
}
```



**The function of the code in the vertical state is as follows: **

​	![blob.png](img/1.png)<br/>
​	Figure (1) Example of setting the horizontal screen mode

**The action of the code in the screen state is as follows: **

​	![blob.png](img/2.png)<br/>
​	Figure (2) to change the effect of the shortest side of the demo



The code for processing the automatic horizontal screen is “Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;” The comment in the sample code has already been described. We can experience in the coding process.
