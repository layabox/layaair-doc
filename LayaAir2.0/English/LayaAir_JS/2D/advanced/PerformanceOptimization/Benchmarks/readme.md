#Benchmark test



LayaAir engine built-in performance statistics tools can be used for benchmarking, real-time detection of current performance. Developers can use`laya.utils.Stat`Class that displays the statistics panel through Stat. show (). Write the code as follows:




```javascript

   Stat.show(0,0);             //AS3的面板调用写法       

    Laya.Stat.show(0,0);        //TS与JS的面板调用写法
```


Canvas rendering statistics:

​![1](img/1.png)<br/>
(Figure 1)

Statistical information for WebGL rendering:

​![图片1.png](img/2.png)<br/>
(Fig. 1)


 



**Significance of Statistical Parameters**:

·**FPS**Number of frames per second (the higher the number, the better).
When using Canvas to render, the description field is displayed as FPS (Canvas), and when using WebGL to render, the description field is displayed as FPS (WebGL).

·**Sprite**: number of render nodes (the lower the number, the better).
Sprite counts all rendering nodes (including containers), and the size of this number affects the number of times the engine nodes traverse, organize and render.

·**DrawCall**DrawCall represents different meanings in Canvas and WebGL rendering (less is better):

Under canvas, it indicates the drawing times of each frame, including picture, text and vector diagram. Limit it to less than 100.

The process of rendering submission batches under WebGL is called DrawCall, which prepares data and informs GPU of rendering batches. In addition to informing GPU of rendering time-consuming, switching material and shader is also a very time-consuming operation in each DrawCall. The number of DrawCalls is an important indicator of performance and should be limited to less than 100.

·**Canvas**Three values - the number of canvas redrawn per frame / the number of canvas cached with the "normal" type / the number of canvas cached with the "bitmap" type.

·**CurMem**WebGL rendering only, representing memory and memory usage (the lower the better).

·**Shader**WebGL rendering only, indicating the number of Shader submissions per frame.

***Tips:**Whether Canvas mode or WebGL mode, we need to focus on DrawCall, Sprite, Canvas three parameters, and then targeted optimization. (See "Graphic Rendering Performance")*


 