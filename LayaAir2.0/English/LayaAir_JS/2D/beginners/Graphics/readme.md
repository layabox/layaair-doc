#Eliminating Vector Graph Drawing



In PC browsers, we often find that the vector graph drawn by LayaAir engine will have some sawtooth. This is because LayaAir engine optimizes the processing based on performance considerations. Because the pixel density of mobile phone is relatively high, the sawtooth problem on PC seems obvious, but in fact it can not be seen on mobile devices.



###Open Sawtooth Elimination Settings

If there is a developer who pursues perfection, it can also be through`"Laya.init();"`Before initializing the stage code, add a line of code`“Laya.Config.isAntialias=true;”`Turn on the Sawtooth Elimination Settings, and you can't see the Sawtooth at the end of the phone at all. Of course, opening this setting will increase performance consumption. Therefore, it is suggested that vector graphics should be used as little as possible in the process of game development. Even after using vector graphics, the sawtooth elimination setting should not be turned on as much as possible based on performance considerations.

**The sample code is as follows**:


```javascript

    //消除矢量绘制的锯齿，但会增加性能消耗
        Laya.Config.isAntialias=true;
         
        //初始化舞台
        Laya.init(500, 300, WebGL);
```

