#Reduce CPU usage

### **I. Reducing Dynamic Attribute Search**

Any object in JavaScript is dynamic and you can add attributes at will. However, finding an attribute in a large number of attributes can be time-consuming. If you need to use an attribute value frequently, you can use a local variable to save it:


```javascript

function foo()
{
    var prop = target.prop;
    // 使用prop
    process1(prop);
    process2(prop);
    process3(prop);
}
```


###2. Timer

LayaAir provides two timer loops to execute code blocks.

One`Laya.timer.frameLoop`The execution frequency depends on the frame frequency, and the current frame frequency can be viewed through Stat. FPS.


One`Laya.timer.loop`The execution frequency depends on the specified time of the parameter.


```javascript

Laya.timer.frameLoop(1, this, animateFrameRateBased);
Laya.stage.on("click", this, dispose);
function dispose() 
{
    Laya.timer.clear(this, animateFrameRateBased);
}
```


When an object's life cycle ends, remember to clear its internal Timer:

### **3. The Method of Obtaining Display Object Boundary**

In relative layout, it is often necessary to get the boundaries of display objects correctly. There are many ways to get the boundaries of display objects, and it is necessary to know the differences between them.

1. Use getBounds / getGraphicBounds.


```javascript

var sp=new Laya.Sprite();
sp.graphics.drawRect(0,0,100,100,"#FF0000");
var bounds:Laya.Rectangle=sp.getGraphicBounds();
Laya.stage.addChild(sp);
```


GetBounds can satisfy most of the requirements, but it is not suitable for frequent calls because it needs to compute boundaries.

1. Set the autoSize of the container to true.


```javascript

var sp=new Laya.Sprite();
sp.autoSize=true;
sp.graphics.drawRect(0,0,100,100,"#FF0000");
Laya.stage.addChild(sp);
```


The above code can get the width and height correctly at runtime. AutoSize is recalculated when it acquires width and changes the status of the display list (autoSize calculates width and height through getBoudns). So it is not advisable to apply autosize to containers with a large number of children. If size is set, autoSize will not work.

Get width and height by using loadImage:


```javascript

var sp=new Laya.Sprite();
sp.loadImage("res/apes/monkey2.png",0,0,0,0,Laya.Handler.create(this,function()
{
    console.log(sp.width,sp.height);  
}));
Laya.stage.addChild(sp);
```


Load Image can acquire width and height correctly only after the callback function triggered after loading.

One**Call the size setting directly:**


```javascript

Laya.loader.load("res/apes/monkey2.png",Handler.create(this,function()
{
  var texture=Laya.loader.getRes("res/apes/monkey2.png");
  var sp=new Laya.Sprite();
  sp.graphics.drawTexture(texture,0,0);
  sp.size(texture.width,texture.height);
  Laya.stage.addChild(sp);
}));
```


Using Graphics. drawTexture does not automatically set the width of the container, but it can be given to the container using the width of the text. There is no doubt that this is the most efficient way.

**Note: getGraphics Bounds is used to obtain the width and height of vector drawing.**

### **IV. Change the frame rate according to the active state**

There are three modes of frame frequency.

##- Stage. FRAME_SLOW maintains FPS at 30;Stage. FRAME_FAST maintained FPS at 60;
- Stage. FRAME_MOUSE selectively maintains FPS at 30 or 60 frames.

Sometimes the game does not need to be executed at the rate of 60FPS, because 30FPS can satisfy the human visual response in most cases, but when the mouse interacts, 30FPS may cause incoherence in the picture, so Stage. FRAME_MOUSE came into being.

The following example shows how to move the mouse on the canvas at the frame rate of Stage. FRAME_SLOW so that the ball follows the mouse:


```javascript

Laya.init(Browser.width,Browser.height);
Laya.Stat.show();
Laya.stage.frameRate=Stage.FRAME_SLOW;

var sp=new Laya.Sprite();
sp.graphics.drawCircle(0,0,20,"#990000");
Laya.stage.addChild(sp);

Laya.stage.on(Event.MOUSE_MOVE,this,function()
{
  sp.pos(Laya.stage.mouseX,Laya.stage.mouseY);
});
```


![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/1.png)

(Fig. 1)

At this time, the FPS displays 30, and when the mouse moves, it can feel that the update of the position of the sphere is incoherent. Set Stage. frameRate to Stage. FRAME_MOUSE:


```javascript

Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
```


![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/2.png)

(Fig. 2)

At this time, the FPS will display 60 after the mouse moves, and the picture fluency will be improved. When the mouse is still for 2 seconds, the FPS will be restored to 30 frames.

### **5. Use callLater**

CallLater delays block execution until the frame is rendered. If the current operation frequently changes the state of an object, then callLater can be considered to reduce the duplication of computation.

Consider a graph. Setting any attributes to it that change its appearance will result in the redrawing of the graph:


```javascript

var rotation=0,
scale=1,
position=0;

function setRotation(value)
{
  rotation=value;
  update();
}

function setScale(value)
{
  scale = value;
  update();
}
function setPosition(value)
{
    position = value;
    update();
}
function update()
{
    console.log('rotation: ' + rotation + '\tscale: ' + scale + '\tposition: ' + position);
}
```


Call the following code to change the status:


```javascript

setRotation(90);
setScale(2);
setPosition(30);
```


The printing result of the console is:


```javascript

rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```


Update is called three times and the final result is correct, but neither of the previous two calls is needed.

Try to change three updates to:


```javascript

Laya.timer.callLater(this, update);
```


At this point, update will only be called once, and it is the result we want.

### **VI. Picture/Atlas Loading**

After loading the image/atlas, the engine will start processing the image resources. If a collection is loaded, each sub-image is processed. If a large number of images are processed at one time, this process may result in a long time of carton.

In the resource loading of games, resources can be loaded according to levels, scenarios and other categories. The better the picture is processed at the same time, the faster the game responds at that time. After the resource is used, it can also be unloaded to release memory.