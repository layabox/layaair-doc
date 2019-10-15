#Eliminate vector drawing



In PC browsers, we often find that the vector graph drawn by LayaAir engine will have some sawtooth. This is because LayaAir engine optimizes the processing based on performance considerations. Because the pixel density of mobile phone is relatively high, the sawtooth problem on PC seems obvious, but in fact it can not be seen on mobile devices.



###Turn on the antialiasing setting

If there is a developer who pursues perfection, it can also be through`"Laya.init();"`Add a line of code before initializing the stage code`“Laya.Config.isAntialias=true;”`Turn on the sawtooth elimination setting, and then you will not see the sawtooth at the mobile phone end. Of course, opening this setting will increase performance consumption. Therefore, it is recommended to use as few vector graphics as possible in the game development process, even after use, based on performance considerations, do not turn on the sawtooth elimination setting as much as possible.

**The sample code is as follows**:


```javascript

    //消除矢量绘制的锯齿，但会增加性能消耗
        Laya.Config.isAntialias=true;
         
        //初始化舞台
        Laya.init(500, 300, WebGL);
```

