#Introduction to Performance Statistics Panel

At the beginning of LayaAir engine design, performance was the first goal, and a lot of performance optimization was done in the engine. Reasonable use of the engine can make the game and other engine products achieve the original APP experience. If the developer can't take advantage of the engine, the final performance experience of the game will be out of the question. Therefore, in the process of making games, it is very necessary to master the skills of game and engine optimization.



> To understand the performance of the engine, we first need to understand the performance statistics panel, which will be described in detail below.



##1. Call of Performance Statistics Panel

LayaAir engine built-in performance statistics panel can real-time detect the current performance. The call statistics panel varies with the development language.

TS language input directly in code`Laya.Stat.show(0,0);`You can call out the performance statistics panel.

The example Demo.ts code is as follows:


```typescript

//初始化舞台
Laya.init(1136, 640);
//调用性能统计面板方法，(0,0)为面板位置坐标
Laya.Stat.show(0,0);
```


**Tips**Pay attention to case.



##2. Introduction of FPS

###2.1 Overview of FPS

FPS is the abbreviation of Frames Per Second. Assuming the frame speed of the game is 60FPS, the execution time of each frame is 1/60 seconds when the game is running. The higher the frame speed, the more fluent the visual sense.

![图1](img/1.png)<br/> (Fig. 1)

At present, the full frame of PC and mobile devices is 60 frames, as shown in Figure 1. However, some games do not require high picture fluidity, and the frame speed limit method of engine can also be used.`Stage.FRAME_SLOW`The FPS frame rate is limited to a maximum of 30 frames.

Since the actual operating environment is in the browser, performance also depends on the efficiency of the JavaScript interpreter, so the FPS value of the same game may vary in different browsers. This part is not for developers to decide. What developers can do is to use engines and optimize projects as well as possible to improve FPS frame speed in low-end devices or low-performance browsers.

####2.2 FPS in different modes

LayaAir engine supports two rendering modes: Canvas and WebGL. So when looking at FPS frame speed, we should pay attention to which mode.`FPS(Canvas)`The description is the frame rate in Canvas mode, as shown in Figure 1.`FPS(WebGL)`The description is the frame rate in WebGL mode, as shown in Figure 2.

![图片2.png](img/2.png)<br/> (Figure 2)

####2.3 Numerical Explanation of FPS

In Figures 1 and 2, the first yellow value of FPS`60`For the current**FPS frame rate**The higher the better.

Second yellow value`16`by**Time consumed per frame rendering**In milliseconds, the smaller the value, the better.

If these two values can not be maintained in full frame, they will change during product operation, as shown in Figure 3.

![动图3](img/3.gif) <br /> (动图3)











##3. Introduction to Sprite

Sprite counts the number of rendering nodes (including containers) that affect the number of times the engine nodes traverse, organize and render. The lower the number, the better. Therefore, it is suggested to reduce rendering nodes as much as possible in project design.





##4. Introduction to DrawCall


 **The number of DrawCalls is an important indicator of performance**In the third line of the statistics panel, as shown in Figure 4. DrawCall represents different meanings in Canvas and WebGL rendering, but the fewer, the better.**Developers are advised to limit themselves to less than 100**。

![图4](img/4.png) <br /> (图4)







####4.1 DrawCall under Canvas

DrawCall in Canvas mode represents the number of times each frame is drawn, including pictures, text, vector graphics.

####4.2 DrawCall under WebGL

DrawCall represents rendering submission batch in WebGL mode. The process of preparing data and notifying GPU to render is called DrawCall once. In addition to notifying GPU to render, switching material and shader is also a time-consuming operation in every DrawCall.



##5. Introduction to CurMem

In WebGL mode, CurMem represents the occupancy of memory and memory, and the lower the value, the better.

In Canvas mode, there is no concept of memory. CurMem only represents the occupancy of memory. The lower the value, the better.



##6. Introduction of Shader

Shader is a unique performance indicator of WebGL mode, indicating the number of Shader submissions per frame, the lower the value, the better.



##7. Introduction to Canvas

There are three values in Canvas, as shown in Figure 5, where only CacheAs is set will have a value, which defaults to`0/0/0`。 The values from left to right are:`每帧重绘的画布数量`/`缓存类型为“normal”类型的画布数量`/`缓存类型为“bitmap”类型的画布数量`。


![图5](img/5.png) <br /> (图5)



**Tips**For more information on CacheAs optimization, see the document "CacheAs static cache optimization"










 