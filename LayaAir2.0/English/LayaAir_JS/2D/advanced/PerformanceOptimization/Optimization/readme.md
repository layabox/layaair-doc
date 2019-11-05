#Memory optimization

Release time: 2016-12-30

### **Object pool**

Object pooling involves the continuous reuse of objects. Create a certain number of objects and store them in a pool during initialization of the application. Once an object has been manipulated, it is put back into the pool and retrieved when a new object is needed.

Because of the high cost of instantiating objects, reusing objects with object pools can reduce the need for instantiating objects. It can also reduce the opportunity of garbage collector to run, thereby improving the speed of the program.

The following code demonstrates the use of`Laya.utils.Pool：`


```javascript

var SPRITE_SIGN = 'spriteSign';
var sprites = [];
function initialize()
{
    for (var i = 0; i < 1000; i++)
    {
        var sp = Pool.getItemByClass(SPRITE_SIGN, Sprite)
        sprites.push(sp);
        Laya.stage.addChild(sp);
    }
}
initialize();
```


Create an object pool of size 1000 in initialize.

When you click the mouse, the following code deletes all display objects in the display list and reuses them for other tasks later:


```javascript

Laya.stage.on("click", this, function()
{
    var sp;
    for(var i = 0, len = sprites.length; i < len; i++)
    {
        sp = sprites.pop();
        Pool.recover(SPRITE_SIGN, sp);
        Laya.stage.removeChild(sp);
    }
});
```


After calling Pool. recovery, the specified object is reclaimed into the pool.



 



### **2. Use Handler.create.**

Handler is often used to complete asynchronous callbacks during development. Handler. create uses built-in object pool management, so you should use Handler. create to create a callback processor when using Handler objects. The following code uses Handler. create to create a loaded callback processor:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded));
```


In the above code, after the callback is executed, the handler will be recalled by the object pool. At this point, consider what happens to the following code:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading));
```


In the above code, the handler. create returned is used to process the progress events. At this point, the callback is reclaimed by the object pool after one execution, so the progress event only triggers once. At this point, four parameters named once need to be set to false:


```javascript

Laya.loader.load(urls, Handler.create(this, onAssetLoaded), Handler.create(this, onLoading, null, false));
```





 



### **3. Free memory**

The garbage collector cannot be started at JavaScript runtime. To ensure that an object can be reclaimed, delete all references to that object. Sprite provides destory to help set the internal reference to null.

For example, the following code ensures that objects can be garbage collected:


```javascript

var sp = new Sprite();
sp.destroy();
```



When the object is set to null, it is not immediately removed from memory. The garbage collector will only run if the system considers that the memory is low enough. Memory allocation (rather than object deletion) triggers garbage collection.

Garbage collection can take up a lot of CPUs and affect performance. By reusing objects, try to limit the use of garbage collection. In addition, set the reference to null as much as possible so that the garbage collector spends less time looking up objects. Sometimes (for example, when two objects refer to each other) it is impossible to set two references to null at the same time, and the garbage collector scans the unreachable objects and clears them, which consumes more performance than reference counting.

### **IV. Unloading of Resources**

Many resources will always be loaded when the game is running. These resources should be unloaded in time after they are used. Otherwise, they will remain in memory.

The following example demonstrates comparing resource status before and after unloading after loading resources:


```javascript

var assets = [];
assets.push("res/apes/monkey0.png");
assets.push("res/apes/monkey1.png");
assets.push("res/apes/monkey2.png");
assets.push("res/apes/monkey3.png");
  
Laya.loader.load(assets, Handler.create(this, onAssetsLoaded));
  
function onAssetsLoaded()
{
    for(var i = 0, len = assets.length; i < len; ++i)
    {
        var asset = assets[i];
        console.log(Laya.loader.getRes(asset));
        Laya.loader.clearRes(asset);
        console.log(Laya.loader.getRes(asset));
    }
}
```


### **V. About filters and masks**


Try to minimize the use of filters. When BlurFilter and GlowFilter are applied to display objects, two bitmaps are created in memory at run time. Each bitmap has the same size as the display object. Create the first bitmap as a rasterized version of the display object, and then use it to generate another bitmap of the application filter:

​![图片1.png](img/1.png)<br/>
(Fig. 1)

Two bitmaps in memory when applying filters

When modifying an attribute of a filter or a display object, two bitmaps in memory will be updated to create the generated bitmaps, which may occupy a large amount of memory. In addition, this process involves CPU computing, which will degrade performance when dynamically updated (see "Graphic Rendering Performance - About CacheAs".

ColorFiter needs to compute every pixel in Canvas rendering, while GPU consumption in WebGL is negligible.

The best way to do this is to use bitmaps created by image authoring tools to simulate filters as much as possible. Avoiding creating dynamic bitmaps at runtime can help reduce CPU or GPU load. Especially an image with filters and no modification.

###  **6. Other optimization strategies**

1. Reduce the number of particles used, in the mobile platform Canvas mode, try not to use particles;
2. In Canvas mode, reduce the use of rotation, scaling, alpha and other attributes, which will consume performance. (It can be used in WebGL mode);
3. Do not create objects and complex calculations in timeloop;
4. Minimize the use of autoSize for containers and getBounds () because these calls generate more computation;
5. Use try catch as little as possible, and the function executed by try catch will become very slow.