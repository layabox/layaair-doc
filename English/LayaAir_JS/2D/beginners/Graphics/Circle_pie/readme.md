# Draw circles and fan-shaped



### A. draw circles

The circular drawing is easy to understand, and it can be conveniently implemented by the LayaAir laya.display.Graphics Method API (drawCircle). Give data such as center coordinates and radius of the circle, detailed description of the method is shown below:

​	![blob.png](img/1.png)<br/>
​	(Picture 1)

Below we use the LayaAir engine to draw a circle, the sample code is as follows:

```javascript
(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
  
    (function()
    {
        //初始化舞台
        Laya.init(500, 300);
        drawSomething();
    })();
  
    function drawSomething()
    {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        //画圆
        sp.graphics.drawCircle(80,80,50,"#ff0000");
     }
})();
```

The code runs as shown below:

​	![blob.png](img/2.png)<br/>
​	(Picture 2)

​        Circular drawing is relatively simple, "80, 80" is the central coordinates of the circle. 50 is the radius, and "#ff0000" is the fill color value.



### B. draw fan-shaped

​        To go further, let introduce a fan-shape drawing method that is slightly more complicated than the circle; "drawPie ()"; the method is detailed as shown in the following figure:

​	![blob.png](img/3.png)<br/>
​	(Picture 3)

Here we use the LayaAir engine to draw a fan-shape, the sample code is as follows:

```javascript
(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
  
    (function()
    {
        //初始化舞台
        Laya.init(500, 300);
        drawSomething();
    })();
  
    function drawSomething()
    {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        //画圆
        sp.graphics.drawPie(80,80,50,90,180,"#ff0000");
     }
})();
```

The code runs as shown below:

​	![blob.png](img/4.png)<br/>
​	(Picture 4)
Fan is similar to the circle code example,  the first three arguments are the same,  except increased parameters before the fill color value. It is set for two angle parameters (90 and 180). we adjust the parameters to further understanding.



### C. Drawing circle graphics with LayaAirIDE through control tools

**1**. Open LayaAirIDE and click design mode to create a new View page

​	![6](img/5.png)<br/>
​   	(Picture 5)  

**2**. Drag the curve component into the View page to automatically generate the default circle

​	![7](img/6.png)<br/>
​   	(Picture 6) 

**3**. Modify (add / subtract) the values in the Circle component properties, change the size of the circle, the color, the outer frame, and so on.

​   	![8](img/7.png)<br/>
​   	(Picture 7)  

​   	![9](img/8.png)<br/>
​   	(Picture 8)



### D. Drawing fan-shaped graphics with LayaAirIDE through control tools

**1**. Open LayaAirIDE and click design mode to create a new View page

​	![6](img/5.png)<br/>
​   	(Picture 9)  

**2**. Drag the curve component in the component onto the View page to automatically generate the default fan

​	![7](img/9.png)<br/>
​   	(Picture 10)  

**3**. Modify (add / subtract) the values in the Pie component properties, change the fan's angle, size, color, and so on.

​   	![8](img/10.png)<br/>
​   	(Picture 11)

​   	![9](img/11.png)<br/>
​   	(Picture 12)  

Here we draw the circle and fan-shaped through the LayaAirIDE component.
