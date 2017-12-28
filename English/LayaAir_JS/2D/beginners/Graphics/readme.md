# Enable Anti-Aliasing



On the PC's browser, we often find that the vector diagram drawn by the LayaAir engine will have some jaggedness. it is for optimized and performance reason, pixel density on the mobile phone is relatively more than PC, so it can display obvious aliased rasterization problems.



### Enable Anti-aliasing setting

Before you initialize the code in the `"Laya.init();"` you can also add a line of code `“Laya.Config.isAntialias=true;”` to turn on the anti-aliasing setting. On phone side, jaggedness completely disappear. Opening this setting will increase the performance of consumption, therefore it is recommended that the game development process contain vector graphics as less as possible.

**The sample code is as follows**:

```javascript
    //消除矢量绘制的锯齿，但会增加性能消耗
        Laya.Config.isAntialias=true;
         
        //初始化舞台
        Laya.init(500, 300, WebGL);
```
