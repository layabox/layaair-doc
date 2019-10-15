#Development Differences between LayaAir Engine AS3 and Flash Native AS3


​        LayaAir引擎支持Flash AS3语言开发HTML5游戏，但是开发者需要注意的是，Flash AS3的原生API，LayaAir引擎是不支持的，由于LayaAir自身拥有非常完善与强大的API，所以引擎仅支持采用AS3的基础语法进行HTML5产品开发。尤其是对于拥有原生Flash AS3开发经验的开发者，除API外，还需要注意以下差异，有少量的Flash AS3的用法，在LayaAir也是不可以使用的。



##First, the LayaAir engine does not support int ();

Developers should be careful not to use int () when using LayaAir engine. This method is not supported in LayaAir engine. ParseInt () can be used to replace it when the development of related functions is needed.

**Examples supported by native AS3 but not by LayaAir engine:**


```java

var a:int = int(1.5);//int对浮点数取整在原生Flash开发中支持，LayaAir中不被支持
```


**Examples of correct usage in the layaair engine:**


```java

var a:int = parseInt(1.5)//对浮点数取整，LayaAir引擎中需要采用parseInt方法
```






##II. Differences in the Use of Mask Masks

In the LayaAir engine, there are two points to note when using Mask.

1. Mask is added inside the display object, that is to say, the Mask coordinates under LayaAir are relative to the masked object, not the stage.

2. If the masking is dynamic, the repaint () method of the masked object needs to be called.

Let's look at the differences in the code below.



###2.1 Static Mask

**Examples supported by native AS3 but not by LayaAir engine:**


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




**Examples of correct usage in the LayaAir engine:**


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




###2.2 Dynamic Mask

**Examples supported by native AS3 but not by LayaAir engine:**


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




**Examples of correct usage in the LayaAir engine:**


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




##Third, the click area difference of Graphics Vector Graphics registration events drawn by Sprite itself;

In native Flash AS3, the Sprite wizard automatically calculates width and height after creation. However, in the layaAir engine, in order to save performance, the default Sprite wizard is not wide and tall. It is necessary to set a collision area for Sprite, that is, hitArea or size.



**Examples supported by native AS3 but not by LayaAir engine:**


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




**Examples of correct usage in the LayaAir engine:**

Method 1:


```java

var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```


Method 1:


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




##IV. DIFFERENCES IN THE DISTRIBUTION OF EVENT OBJECTS

In terms of the distribution of event objects, grammatical differences are the main ones. LayaAir engine simplifies and enriches the keywords and parameters of this method. LayaAir can carry data while dispatching and listening for events, such as dispatch object. event ('custom event type', ['data source']), listen object. on ('event type','execution domain of event listener function','event listener function','callback parameter').



**Examples supported by native AS3 but not by LayaAir engine:**

**Distribution:**


```javascript

dispatchEvent(event:Event);
```


**Monitor:**  


```javascript

addEventListener(type,listener,useCapture,priority,useWeakReference));
```




**Examples of correct usage in the LayaAir engine:**

**Distribution:**


```

派发对象.event(type:String,data:*=null);
```


**Monitor:**  


```

派发对象.on(type,caller,listener,args);
```




##V. Differences between LayaAir and AS3

Sprite can be directly inherited in native API writing of Flash AS3, but Sprite cannot be directly inherited by the main document class entry (before the engine is initialized) in the LayaAir engine. Inheriting Sprite according to AS3's traditional custom will cause errors.



**Wrong Writing:**


```

package  {
    import laya.display.Sprite;
     
    //extends Sprite在LayaAir引擎初始化之前继承会报错
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






