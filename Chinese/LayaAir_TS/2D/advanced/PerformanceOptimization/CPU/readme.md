# 减少CPU使用量

### **一、减少动态属性查找**

JavaScript中任何对象都是动态的，你可以任意地添加属性。然而，在大量的属性里查找某属性可能很耗时。如果需要频繁使用某个属性值，可以使用局部变量来保存它：

```typescript
foo()
{
var prop=this.target.prop;
//使用prop
this.process1(prop);
this.process2(prop);
this.process3(prop);
}
```

### 二、计时器

 LayaAir提供两种计时器循环来执行代码块。

1. `Laya.timer.frameLoop`执行频率依赖于帧频率，可通过Stat.FPS查看当前帧频。


1. `Laya.timer.loop`执行频率依赖于参数指定时间。

```typescript
Laya.timer.frameLoop(1, this, this.animateFrameRateBased);
Laya.stage.on("click", this, this.dispose);
dispose() 
{
    Laya.timer.clear(this, this.animateFrameRateBased);
}
```

当一个对象的生命周期结束时，记得清除其内部的Timer：

### **三、获取显示对象边界的做法**

在相对布局中，很经常需要正确地获取显示对象的边界。获取显示对象的边界也有多种做法，而其间差异很有必要知道。

1. 使用getBounds/ getGraphicBounds。

```typescript
var sp=new Laya.Sprite();
sp.graphics.drawRect(0,0,100,100,"#FF0000");
var bounds:Laya.Rectangle=sp.getGraphicBounds();
Laya.stage.addChild(sp);
```

 getBounds可以满足多数多数需求，但由于其需要计算边界，不适合频繁调用。

1. 设置容器的autoSize为true。

```typescript
var sp=new Laya.Sprite();
sp.autoSize=true;
sp.graphics.drawRect(0,0,100,100,"#FF0000");
Laya.stage.addChild(sp);
```

上述代码可以在运行时正确获取宽高。autoSize在获取宽高并且显示列表的状态发生改变时会重新计算（autoSize通过getBoudns计算宽高）。所以对拥有大量子对象的容器应用autoSize是不可取的。如果设置了size，autoSize将不起效。

 使用loadImage后获取宽高：

```typescript
var sp=new Laya.Sprite();
sp.loadImage("res/apes/monkey2.png",0,0,0,0,Laya.Handler.create(this,function()
{
    console.log(sp.width,sp.height);  
}));
Laya.stage.addChild(sp);
```

 loadImage在加载完成的回调函数触发之后才可以正确获取宽高。

1. **直接调用size设置：**

```typescript
Laya.loader.load("res/apes/monkey2.png",Laya.Handler.create(this,function()
{
  var texture=Laya.loader.getRes("res/apes/monkey2.png");
  var sp=new Laya.Sprite();
  sp.graphics.drawTexture(texture,0,0);
  sp.size(texture.width,texture.height);
  Laya.stage.addChild(sp);
}));
```

使用Graphics.drawTexture并不会自动设置容器的宽高，但是可以使用Texture的宽高赋予容器。毋庸置疑，这是最高效的方式。

**注：getGraphicsBounds用于获取矢量绘图宽高。**

### **四、根据活动状态改变帧频**

 帧频有三种模式，

- Stage.FRAME_SLOW维持FPS在30；
- Stage.FRAME_FAST维持FPS在60；
- Stage.FRAME_MOUSE则选择性维持FPS在30或60帧。

 有时并不需要让游戏以60FPS的速率执行，因为30FPS已经能够满足多数情况下人类视觉的响应，但是鼠标交互时，30FPS可能会造成画面的不连贯，于是Stage.FRAME_MOUSE应运而生。

 下例展示以Stage.FRAME_SLOW的帧率，在画布上移动鼠标，使圆球跟随鼠标移动：

```typescript
Laya.init(this.Browser.width,this.Browser.height);
Laya.Stat.show();
Laya.stage.frameRate=Laya.Stage.FRAME_SLOW;

var sp=new Laya.Sprite();
sp.graphics.drawCircle(0,0,20,"#990000");
Laya.stage.addChild(sp);

Laya.stage.on(Laya.Event.MOUSE_MOVE,this,function()
{
  sp.pos(Laya.stage.mouseX,Laya.stage.mouseY);
});
```

![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/1.png)

（图1）

 此时FPS显示30，并且在鼠标移动时，可以感觉到圆球位置的更新不连贯。设置Stage.frameRate为Stage.FRAME_MOUSE：

```typescript
Laya.stage.frameRate = Laya.Stage.FRAME_MOUSE;
```

![图片1.png](https://official.layabox.com/laya_data/Chinese/LayaAir_AS3/2D/advanced/PerformanceOptimization/CPU/img/2.png)

（图2）

 此时在鼠标移动后FPS会显示60，并且画面流畅度提升。在鼠标静止2秒不动后，FPS又会恢复到30帧。

### **五、使用callLater**

callLater使代码块延迟至本帧渲染前执行。如果当前的操作频繁改变某对象的状态，此时可以考虑使用callLater，以减少重复计算。

 考虑一个图形，对它设置任何改变外观的属性都将导致图形重绘：

```typescript
var rotation=0,
scale=1,
position=0;

private function setRotation(value):void
{
  this.rotation=value;
  update();
}

private function setScale(value):void
{
  this.scale = value;
    update();
}
private function setPosition(value):void
{
    this.position = value;
    update();
}
public function update()
{
    console.log('rotation: ' + this.rotation + '\tscale: ' + this.scale + '\tposition: ' + this.position);
}
```

 调用以下代码更改状态：

```
setRotation(90);
setScale(2);
setPosition(30);
```

 控制台的打印结果是:

```
rotation: 90scale: 1position: 0
rotation: 90scale: 2position: 0
rotation: 90scale: 2position: 30
```

update被调用了三次，并且最后的结果是正确的，但是前面两次调用都是不需要的。

 尝试将三处update改为：

```
Laya.timer.callLater(this, update);
```

此时，update只会调用一次，并且是我们想要的结果。

### **六、图片/图集加载**

在完成图片/图集的加载之后，引擎就会开始处理图片资源。如果加载的是一张图集，会处理每张子图片。如果一次性处理大量的图片，这个过程可能会造成长时间的卡顿。

在游戏的资源加载中，可以将资源按照关卡、场景等分类加载。在同一时间处理的图片越好，当时的游戏响应速度也会更快。在资源使用完成后，也可以予以卸载，释放内存。