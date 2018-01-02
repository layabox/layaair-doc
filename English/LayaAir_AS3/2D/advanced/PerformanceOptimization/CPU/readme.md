# Reduce CPU usage



### **1. Reduce the dynamic property search**

Any object in JavaScript is dynamic, and you can add attributes arbitrarily. However, it may be time-consuming to find an attribute in a large number of attributes. If you need to use an attribute value frequently, you can use local variables to save it:

```javascript
private function foo():void
{
    var prop = target.prop;
    // 使用prop
    process1(prop);
    process2(prop);
    process3(prop);
}
```



### 2. Timer

​        LayaAir provides two timer loops to execute code blocks

1. `Laya.timer.frameLoop` execution frequency depends on the frame frequency, which can be checked by Stat.FPS.


2. `Laya.timer.loop` the frequency of execution depends on the parameters specified time.



```javascript
Laya.timer.frameLoop(1, this, animateFrameRateBased);
Laya.stage.on("click", this, dispose);
private function dispose():void 
{
    Laya.timer.clear(this, animateFrameRateBased);
}
```

​        When an object's life cycle ends, remember to clear its internal Timer ：

 

 

### **3.  access to display the boundaries of the object approach**

In the relative layout, it is often necessary to get the display object's boundaries correctly. There are many ways to get the boundaries of the display objects, but the differences are necessary to know.

 

1. Use getBounds/ getGraphicBounds.

   ```javascript
   var sp:Sprite = new Sprite();
   sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
   var bounds:Rectangle  = sp.getGraphicBounds();
   Laya.stage.addChild(sp);
   ```

​        getBounds meets most majority requirements, but is not suitable for frequent calls due to the need to calculate boundaries.

2. The autoSize of the set container is true.

```javascript
var sp:Sprite = new Sprite();
sp.autoSize = true;
sp.graphics.drawRect(0, 0, 100, 100, "#FF0000");
Laya.stage.addChild(sp);
```

​        The above code gets the correct height and width at run time. autoSize recalculates when the width and height are acquired and the status of the display list is changed (autoSize calculates the width and height from getBoudns). So it is not advisable to apply autoSize to a container that has a large number of children. If you set size, autoSize will not work.

​        Using loadImage to obtain width height:

```javascript
var sp:Sprite = new Sprite();
sp.loadImage("res/apes/monkey2.png", 0, 0, 0, 0, Handler.create(this, function()
{
    console.log(sp.width, sp.height);
}));
Laya.stage.addChild(sp);
```

​        LoadImage gets the width exactly after the loaded callback function is triggered.

3. **Call size settings directly:**

```javascript
Laya.loader.load("res/apes/monkey2.png", Handler.create(this, function()
{
    var texture:Texture = Laya.loader.getRes("res/apes/monkey2.png");
    var sp:Spirte = new Sprite();
    sp.graphics.drawTexture(texture, 0, 0);
    sp.size(texture.width, texture.height);
    Laya.stage.addChild(sp);
}));
```

Using Graphics.drawTexture does not automatically set the width and height of the container, but can use the Texture's width height to give the container. Needless to say, this is the most efficient way.

**notes: getGraphicsBounds is used to obtain vector drawing width**



### **4. change the frame rate according to the active state**

​        There are 3 modes of frame rate

- Stage.FRAME_SLOW maintained FPS at  30；
- Stage.FRAME_FAST maintained FPS at  60；
- Stage.FRAME_MOUSE the FPS is selectively maintained at 30 or 60 frame



​        Sometimes it doesn't require games to execute at 60FPS rates, because 30FPS has been able to respond to human vision in most situations, but when the mouse interacts, the 30FPS may cause the picture to be incoherent, and Stage.FRAME_MOUSE emerges as the times require.

 

​        The following example shows the movement of the mouse on the canvas with the frame rate of Stage.FRAME_SLOW, so that the ball follows the mouse movement: 

```javascript
Laya.init(Browser.width, Browser.height);
Stat.show();
Laya.stage.frameRate = Stage.FRAME_SLOW;
  
var sp:Sprite = new Sprite();
sp.graphics.drawCircle(0, 0, 20, "#990000");
Laya.stage.addChild(sp);
  
Laya.stage.on(Event.MOUSE_MOVE, this, function()
{
    sp.pos(Laya.stage.mouseX, Laya.stage.mouseY);
});
```

​         ![图片1.png](img/1.png)<br/>
​        （Picture 1）

​        At this point FPS display 30, and the mouse movement, you can feel the ball position update inconsistent. Set Stage.frameRate to Stage.FRAME_MOUSE：

```javascript
Laya.stage.frameRate = Stage.FRAME_MOUSE;
```

​        ![图片1.png](img/2.png)<br/>
​        （Picture 2）

​        At this point, after the mouse moves, FPS will display 60, and the picture fluency increases. After the mouse is still 2 seconds, the FPS will revert to 30 frames.



### **5. Use callLater**

callLater Delays the code block until this frame is rendered. If the current operation frequently changes the state of an object, then callLater can be considered to reduce repeated computations.

 

​        Considering a graph, setting any attributes that change its appearance will result in redrawing of the graph:

```javascript
var rotation:int = 0,
scale:int = 1,
position:int = 0;
  
private function setRotation(value):void
{
    this.rotation = value;
    update();
}
  
private function setScale(value):void
{
    this.scale = value;
    update();
}
  
private function setPosition(value):void
{
    this.position = value;
    update();
}
  
public function update()
{
    console.log('rotation: ' + this.rotation + '\tscale: ' + this.scale + '\tposition: ' + position);
}
```

 

​        Call the following code to change the state ：

```javascript
setRotation(90);
setScale(2);
setPosition(30);
```

​        The print result of the console is :

```javascript
rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```

Update was called three times, and the final result was correct, but the previous two calls were not needed.

​        Try to change three update to:

```javascript
Laya.timer.callLater(this, update);
```

​        At this point, update will only call once, and that's what we want.



### **6. picture / atlas loading**

Once the picture / atlas is loaded, the engine will begin to process picture resources. If you load an atlas, you can process each of the sub pictures. If you process a large amount of pictures at one time, this process may create a long time and jerky.

 

In the game's resource loading, you can load the resources according to the level, scene and other categories. The better the picture at the same time, the faster the game responds. After the completion of the use of resources, you can also uninstall, release memory..

 
