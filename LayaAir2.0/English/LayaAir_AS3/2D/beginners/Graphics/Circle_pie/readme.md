#Drawing circles and sectors



###Drawing a circle

The drawing of a circle is relatively simple to understand. Through the coordinates and radius of the center point of the circle, it can be easily realized by the "drawCircle ();" method of the API LayaAir engine laya. display. Graphics. A detailed description of the method is shown in the following figure:

​![blob.png](img/1.png)<br/>
(Fig. 1)

Next, we use the LayaAir engine to draw a circle. The sample code is as follows:


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
      
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
          
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300);
            drawSomething();
        }
  
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画圆
            sp.graphics.drawCircle(80,80,50,"#ff0000");
              
        }
    }
}
```


The code runs as shown in the following figure:

​![blob.png](img/2.png)<br/>
(Figure 2)

Round drawing is relatively simple, and "80, 80" is the coordinate of the center point of a circle. 50 is the radius.#Ff0000 "is the color value of the circular filler.



###2. Drawing sector

Next, let's go on to introduce the sector drawing method "drawPie ()", which is slightly more complex than the circle.



​	![blob.png](img/3.png)<br/>
(Figure 3)

Next, we use the layaair engine to draw a sector. The example code is as follows:


```javascript

package
{
    import laya.display.Sprite;
    import laya.display.Stage;
      
    public class Sprite_DrawShapes
    {
        private var sp:Sprite;
          
        public function Sprite_DrawShapes()
        {
            Laya.init(500, 300);
            drawSomething();
        }
  
        private function drawSomething():void
        {
            sp = new Sprite();
            Laya.stage.addChild(sp);
            //画扇形
            sp.graphics.drawPie(80,80,50,90,180,"#ff0000");
              
        }
    }
}
```


The code operation effect is shown in the following figure:



​	![blob.png](img/4.png)<br/>
(Figure 4)
Drawing a sector is similar to a circle, and the first three parameters are used the same way, except that the angle of beginning and ending of drawing is increased. In order to let you better understand, the sector drawing code and parameters follow the example of circular code, except for the change of method name, only 90 and 180 angle parameters are added. You can adjust the parameters in the coding process, and further understand.



###3. Drawing a circle by dragging the control of LayaAirIDE

**Step one**: open our Laya air IDE, click design mode, right-click scenes in the box to create a new view page

​![6](img/5.png)<br/>
(Fig. 5)

**Step two**Drag the curve component from the component onto the View page and automatically generate the default circle

​![7](img/6.png)<br/>
(Figure 6)

**Step three**: modify (add / decrease) the values in the circle component properties, change the size, color, outline, and so on of the circle.

​![8](img/7.png)<br/>
(Figure 7)

​![9](img/8.png)<br/>
(Figure 8)



###4. Drawing Sector by Dragging Control of LayaAirIDE

**Step one**Open our LayaAirIDE, click Design Patterns, and create a new View page

​![6](img/5.png)<br/>

(Figure 9)

**Step two**Drag the curve component from the component onto the View page and automatically generate the default sector

​![7](img/9.png)<br/>
(Figure 10)

**Step three**Modify (add/reduce) the values in Pie component properties, change the angle, size, color, etc. of the sector.

​![8](img/10.png)<br/>
(Fig. 11)

​![9](img/11.png)<br/>
(Fig. 12)

So far, we have finished drawing circles and fans through components in LayaAirIDE.