#Drawing triangles, polygons and patterns based on data



Drawing triangles, polygons and patterns based on specified path data can be realized by using the "drawpoly ();" method of LayaAir engine laya.display.Graphics class. A detailed description of the method is shown in the following figure:

​![blob.png](img/1.png)<br/>
(Fig. 1)



###I. drawing triangles

Let's start by drawing a triangle with the LayaAir engine. The sample code is as follows:


```javascript

(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
    var WebGL  = Laya.WebGL;
    var sp;
  
    (function()
    {
        //初始化舞台，不支持WebGL时自动切换至Canvas
        Laya.init(500, 300, WebGL);
        drawSomething();
    })();
  
    function drawSomething()
    {
        sp = new Sprite();
        Laya.stage.addChild(sp);
        //画三角形
        sp.graphics.drawPoly(30, 28, [0, 100, 50, 0, 100, 100], "#ffff00");
    }
})();
```


The code runs as shown in the following figure:

​![blob.png](img/2.png)<br/>
(Figure 2)

From the code, we can see that the "0,100" of the third parameter of drawPoly is the coordinate of point A. "50, 0" is the coordinate of point B. "100, 100" is the coordinate of C point. After connecting the three coordinate points, fill in the color value of the fourth parameter, that is to say, draw the yellow triangle of the picture above. But what we need to understand and pay attention to here is that all coordinates in the third parameter are relative coordinates, which will be affected by the first and second coordinate parameters "30,28". Once the "30, 28" changes, the overall shape and position will be affected.





### **Drawing Polygons**

We continue to use the above code example to draw polygons by adding coordinates of the third parameter of drawPoly. The modified code is as follows:


```javascript

//画多边形
sp.graphics.drawPoly(30, 28, [0, 100, 50, 0, 100, 100, 75, 150, 25, 150], "#ffff00");
```


The code runs as shown in the following figure:

​![blob.png](img/3.png)<br/>
(Figure 3)

In the revised code, the D-point coordinates 75, 150 and E-point coordinates 25, 150 are added. By connecting the coordinate points and filling the color, we can draw the polygon we want. To draw polygons with more edges, add coordinate points in the above way.



### **3. Drawing patterns according to specified path data**

Through the triangles and polygons above, we have mastered the drawing usage of drawPoly. Next, we will show you how to draw a Pentagon by specifying a path through an example. The sample code is as follows:


```javascript

(function()
{
    var Sprite = Laya.Sprite;
    var Stage  = Laya.Stage;
    var WebGL   = Laya.WebGL;
    var sp;
     
    (function()
    {
        //消除矢量绘制的锯齿，但会增加性能消耗
        Laya.Config.isAntialias=true;
         
        //初始化舞台
        Laya.init(500, 300, WebGL);
        drawSomething();
    })();
  
    function drawSomething()
    {
       var canvas = new Sprite();
        Laya.stage.addChild(canvas);
 
        var path = [];
        path.push(0, -130);//五角星A点
        path.push(33, -33);//五角星B点
        path.push(137, -30);//五角星C点
        path.push(55, 32);//五角星D点
        path.push(85, 130);//五角星E点
        path.push(0, 73);//五角星F点
        path.push(-85, 130);//五角星G点
        path.push(-55, 32);//五角星H点
        path.push(-137, -30);//五角星I点
        path.push(-33, -33);//五角星J点
 
        canvas.graphics.drawPoly(Laya.stage.width / 2, Laya.stage.height / 2, path, "#FF7F50");   
    }
})();
```


The code runs as shown in the following figure:

​![blob.png](img/4.png)<br/>
(Figure 4)

Through the above example code writing, do you feel that the readability of the code has been enhanced, you can also change the previous triangle or polygon into this way to experience, grasp these foundations, can derive a lot of flexible usage, such as data from the server.



###4. Drawing irregular graphics (including triangles and polygons) by using LayaAirIDE control



**Step one:**Open our Laya air IDE, click design mode, and create a new view page.

​![6](img/5.png)<br/>
(Fig. 5)

**Step two:**Drag the curve component from the component onto the View page and automatically generate the default polygon

​![7](img/6.png)<br/>
(Fig. 6)

**Step three:**Modify (add/reduce) values in Poly component attributes, change the size, color, etc. of polygons.

​![8](img/7.png)<br/>
(Figure 7)

​![9](img/8.png)<br/>
(Figure 8) Triangle

​![9](img/9.png)<br/>
(Figure 9) Irregular polygon



So far, we have finished drawing polygons through the components of LayaAirIDE.