# Difference between LayaAir engine AS3 and Flash native AS3 

​        LayaAir Flash engine supports AS3 language development  to make HTML5 game, but the developers need to note that , it is not fully compatible  with Flash AS3 native API, but is deeply inspired from architecture and the basic syntax grammar. Some native call of Flash AS3 may not be available in LayaAir engine, or been implemented differently.



## A. the LayaAir engine does not support int ();

​        When developers use the LayaAir engine, be careful not to use int (), which is not supported in the LayaAir engine and can be replaced by parseInt if there is a need for development of related functions.

**Native AS3 example that is not supported by the LayaAir engine:**

```java
var a:int = int(1.5);//convert float number to int in native AS3
```

**The correct usage with LayaAir :**

```java
var a:int = parseInt(1.5)//convert float number to int with parseInt
```





## B. mask usage difference

​       In the LayaAir engine, the use of Mask has two points to note.

​        1. Mask is added inside the display object, and coordinates under LayaAir are relative to the masked object not the stage.

​        2. if the mask is dynamic, you need to call the masked object under the repaint () method.

​        Find below the code implementation difference.



### 2.1 Static mask

**Native AS3 example that is not supported by the LayaAir engine: **

```java
var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.pos(100,100)
mask.graphics.endFill();
sp.mask=mask
```



**The correct usage with LayaAir :**

```java
Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
mask.pos(sp.x+100,sp.y+100)
sp.mask=mask;
```



### 2.2 Dynamic mask

**Native AS3 example that is not supported by the LayaAir engine: **

```java
var sp:Sprite=new Sprite();
sp.graphics.beginFill(0xFFFF00);
sp.graphics.drawRect(0,0,200,200);
sp.graphics.endFill();
addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.beginFill(0xFF0000);
mask.graphics.drawCircle(0,0,50);
mask.graphics.endFill();
sp.mask=mask;
 
addEventListener(Event.ENTER_FRAME,function():void
{
    mask.x++;
    mask.cacheAsBitmap=true;
    sp.cacheAsBitmap=true;
});
```



**The correct usage with LayaAir :**

```java
Laya.init(600,400)
var sp:Sprite=new Sprite();
sp.graphics.drawRect(0,0,200,200,'#FFFF00');
Laya.stage.addChild(sp);
 
var mask:Sprite=new Sprite();
mask.graphics.drawCircle(0,0,50,'#FF0000');
sp.mask=mask;
 
Laya.timer.frameLoop(1,this,function():void
{
    mask.x++;
    sp.repaint();
});
```



## C.  Sprite graphics vector dispatch event click.;

​        In native Flash AS3, the Sprite automatically calculates the width when it is created. But in the layaAir engine, in order to save performance, the default Sprite need define the wide hitArea size implicitly.



**Native AS3 example that is not supported by the LayaAir engine:**

```java
var sprite:Sprite = new Sprite();
sprite.graphics.beginFill(0xffcc00);
sprite.graphics.drawRect(100,100,100,100);
sprite.graphics.endFill();
addChild(sprite);
sprite.addEventListener(MouseEvent.CLICK,onClick);
function onClick(evt:MouseEvent):void
{
    trace("------aaa---------");
 }
```



**LayaAir引擎中正确的用法示例：**

Implementation method 1:

```java
var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```

Implementation method 2:

```java
var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(0,0,100,100,"#ff9900");
sprite.size(100,100);
Laya.stage.addChild(sprite);
sprite.on(Event.CLICK,this,onClick);
function onClick(evt:Event):void
{
    trace("-------click--------");
}
```



## D. the event object distribution differences

​        About the distribution of event objects, it is mainly grammatical differences. LayaAir engine brind details paramaters for the calling method. LayaAir can carry data while distributing and listening events, such as dispatch calls: Event ('custom event type', ['data source']), listening object .on ('event type', 'event listener function execution Domain ',' event listen function ',' callback parameter ').



**Native AS3 example that is not supported by the LayaAir engine: **

**Dispatch:**

```javascript
dispatchEvent(event:Event);
```

**Listener:**  

```javascript
addEventListener(type,listener,useCapture,priority,useWeakReference));
```



**The correct usage with LayaAir :**

**Dispatch：**

```
[OBJECT DISPATCHED].event(type:String,data:*=null);
```

**Listener:**  

```
[OBJECT DISPATCHED].on(type,caller,listener,args);
```



## E. LayaAir and AS3 differences

In Flash AS3 native API, you can inherit Sprite directly. But in the main document class entry in the LayaAir engine (before initialization) , can not directly inherit Sprite, according to AS3 traditional habit of inheriting Sprite will lead to error.



**Wrong writing:**

```
package  {
    import laya.display.Sprite;
     
    //extends Sprite inherits the error before the LayaAir engine is initialized
    public class HelloLayabox extends Sprite {
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```



**Correct writing:**

```
package  {
    import laya.display.Sprite;
      
    public class HelloLayabox{
        public function HelloLayabox() 
        {
            Laya.init(0,0);
        }
    }
```





