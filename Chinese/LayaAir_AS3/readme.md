# LayaAir引擎AS3与Flash原生AS3的开发差异

​        LayaAir引擎支持Flash AS3语言开发HTML5游戏，但是开发者需要注意的是，Flash AS3的原生API，LayaAir引擎是不支持的，由于LayaAir自身拥有非常完善与强大的API，所以引擎仅支持采用AS3的基础语法进行HTML5产品开发。尤其是对于拥有原生Flash AS3开发经验的开发者，除API外，还需要注意以下差异，有少量的Flash AS3的用法，在LayaAir也是不可以使用的。



## 一、LayaAir引擎不支持int();

​        开发者在使用LayaAir引擎的时候，请注意不要再使用int()，该方法在LayaAir引擎中不被支持，如有相关功能的开发需要时，可以采用parseInt()替代。

**原生as3支持，但是不被LayaAir引擎支持的示例：**

```java
var a:int = int(1.5);//int对浮点数取整在原生Flash开发中支持，LayaAir中不被支持
```

**LayaAir引擎中正确的用法示例：**

```java
var a:int = parseInt(1.5)//对浮点数取整，LayaAir引擎中需要采用parseInt方法
```





## 二、mask遮罩的使用差异

​       在LayaAir引擎里，使用Mask有两点需要注意。

​        1、Mask添加在显示对象的内部，也就是说，LayaAir 下的Mask坐标是相对于被遮罩对象的，而并非舞台。

​        2、如果遮罩是动态的，需要调用下被遮罩对象的repaint()方法。

​        下面通过代码查看一下差异。



### 2.1 静态遮罩

**原生as3支持，但是不被LayaAir引擎支持的示例：**

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



**LayaAir引擎中正确的用法示例：**

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



### 2.2 动态遮罩

**原生as3支持，但是不被LayaAir引擎支持的示例：**

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



**LayaAir引擎中正确的用法示例：**

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



## 三、Sprite自身绘制的graphics矢量图形注册事件点击区域差异;

​        在原生Flash AS3中，Sprite精灵创建完成后会自动计算宽高。但是在layaAir引擎中，为了节约性能，默认Sprite精灵是没有宽高的，需要为Sprite设置一个碰撞区域，也就是hitArea 或 size。



**原生as3支持，但是不被LayaAir引擎支持的示例：**

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

实现方法一：

```java
var sprite:Sprite = new Sprite();
 
sprite.graphics.drawRect(100,100,100,100,"#ff9900");
var hitarea:HitArea = new HitArea();
var graphics:Graphics = new Graphics();
graphics.drawRect(100,100,100,100,"#ff9900");
hitarea.hit = graphics;
sprite.hitArea = hitarea;
```

实现方法一：

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



## 四、事件对象派发差异

​        关于事件对象的派发方面，主要是语法差异。LayaAir引擎针对该方法的关键字以及参数做了精简和丰富。LayaAir在派发和监听事件的同时可以携带数据，譬如派发对象.event('自定义事件类型',['数据源'])，监听对象.on('事件类型','事件侦听函数的执行域','事件侦听函数','回调参数')。



**原生as3支持，但是不被LayaAir引擎支持的示例：**

**派发：**

```javascript
dispatchEvent(event:Event);
```

**监听:**  

```javascript
addEventListener(type,listener,useCapture,priority,useWeakReference));
```



**LayaAir引擎中正确的用法示例：**

**派发：**

```
派发对象.event(type:String,data:*=null);
```

**监听:**  

```
派发对象.on(type,caller,listener,args);
```



## 五、LayaAir与AS3的差异

在Flash AS3的原生API写法中可以直接继承Sprite，但是LayaAir引擎里主文档类入口（初始化引擎前）不能直接继承Sprite，按照AS3传统的习惯继承Sprite会导致报错。



**错误的写法：**

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



**正确的写法：**

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





