#Draw lines and polylines



###I. Drawing Lines

Search the laya.display.Graphics class in the API to see the various vector drawing methods of the API. Where drawLine (); is used to draw vector lines. A detailed description of the method is shown in the following figure:

​![blob.png](img/1.png)<br/>
(Fig. 1)

Let's draw a straight line with the LayaAir engine. The sample code is as follows:


```java

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画直线
            sp.graphics.drawLine(10, 58, 146, 58, "#ff0000", 3);
             
        }
    }
}
```


After the publication, as shown in the following figure, we drew a red line.

​![blob.png](img/2.png)<br/>
(Figure 2)



###2. Drawing polygons

So how to draw a polyline? Use drawLines (); the method is OK. This method is similar to drawLine, so don't miss the "s" at the end of coding. The drawLines parameters are described in detail as shown in the following figure:

​![blob.png](img/3.png)<br/>
(Figure 3)

Next, we use the LayaAir engine to draw a broken line. The sample code is as follows:



Code operation


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
    import laya.webgl.WebGL;
     
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
         
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300, WebGL);
            drawSomething();
        }
 
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画折线
            sp.graphics.drawLines(20, 88, [0, 0, 39, -50, 78, 0, 120, -50], "#ff0000", 3);
         
             
        }
    }
}
```


Effect:

​![blob.png](img/4.png)<br/>
(Figure 4)

Through the code, we can see that the difference between drawing a polyline and drawing a straight line is starting from the third position, and the third parameter is the array type set of polyline points, where "0, 0" is the starting coordinate of the fold point a. "39,-50" is the starting coordinate of the breakpoint B. "78,0" is the starting coordinate of the breakpoint C, and "120,-50" is the coordinate of the end point D. But what we need to understand and notice here is that all coordinates in the third parameter are relative coordinates, which will be affected by the "20,88" of the first and second parameters. Once the "20,88" changes, the overall broken line will be affected.

You can feel the difference in the actual coding process by manually adjusting the parameters.



###Drawing Lines with LayaAirIDE Drag Controls

**Step one**Open our LayaAirIDE, click Design Patterns, and create a new View page

​![6](img/5.png)<br/>
(Fig. 5)

**Step two**Drag the curve component from the component onto the View page and automatically generate the default line

​![7](img/6.png)<br/>
(Fig. 6)

**Step three**Modify (add/reduce) the values in the Line component properties, change the length, width, color of the line, and so on.

​![8](img/7.png)<br/>
(Figure 7)

​![9](img/8.png)<br/>
(Figure 8)



###4. Drawing Folded Lines with LayaAirIDE Drag Controls

**Step one**Open our LayaAirIDE, click Design Patterns, and create a new View page

​![6](img/5.png)<br/>
(Figure 9)

**Step two**: drag the curve component in the component to the view page, and the default polyline will be generated automatically.

​![7](img/9.png)<br/>
(Fig. 10)

**Step three**Modify (add/reduce) the values in the Lines component properties, change the angle, color, width of the broken line, or add a new discount.

​![8](img/10.png)<br/>
(Fig. 11)

​![9](img/11.png)<br/>
(Fig. 12)

So far we have finished drawing straight lines and broken lines through components in LayaAirIDE.