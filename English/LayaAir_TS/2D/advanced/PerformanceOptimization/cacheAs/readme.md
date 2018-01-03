# CacheAs static cache optimization

​        In other general attributes of the attribute setter, we introduce the concept and function of cacheAs cache optimization. Also recommend developers to use it as much as possible in the UI interface, we will use a UI example to demonstrate the use of cacheAs in the project, while we make data analysis before and after the use of cacheAs, for developers to refer to.

​	Let's take a look at the unused cache function of CacheAs, as shown in figure 1. In the debug mode of webgl, we can see that the number of Sprite rendering nodes per frame is 23, the number of DrawCall rendering is 8, and the number of Shader material submission is 7 times in UI.（*This data can be used for performance optimization after optimization*）

 ![imgage](img/1.png)<br/>
（Picture 1）



## 1. cacheAs normal cache optimization

When we use cacheAs, the cacheAs is set to "normal" mode, DrawCall and Shader remain unchanged, the number of Sprite nodes is reduced from 23 to 8, and the node rendering performance is optimized by nearly 3 times. As shown in figure 2.

![图2](img/2.png) <br /> (Picture 2)

**Tips**：

When the cacheAs attribute value is "normal", the canvas cache is carried out under Canvas, and the command cache is executed under the webgl mode. The performance of this pattern is moderate, and it can reduce the number of nodes rendered per frame, but it does not reduce the number of DrawCall and the number of Shader.





## 2. Cache optimization of cacheAs for bitmap

When we use cacheAs, we set cacheAs to "bitmap" mode. The number of Sprite nodes is 8, the DrawCall is reduced to 1, and the Shader number is reduced to 0. Just modifying a configuration, the performance is more than ten times more optimized than not using cacheAs. The effect is shown in figure 3.

![图3](img/3.png) <br /> (Picture 3)

**Tips**：

Canvas is still a canvas cache, in the webgl mode using renderTarget cache, equivalent to cache static bitmap submit graphics rendering. It's important to note that the renderTarget cache mode in webGL has a 2048 size limit, and over 2048 adds extra memory overhead. In addition, the cost of continuous redrawing is relatively large, but it will reduce the drawcall, rendering the highest performance.

In this document, our example UI is relatively simple, for some large games, the number of nodes is more than 50 of the UI is not a few, the use of cacheAs caching technology, rendering performance will increase many times.





## 3. How to choose cache optimization

### 3.1 Memory and CPU considerations

#### Bitmap mode and memory increase

In the example above we can see that when using the Bitmap bitmap caching mode, the increase in CurMem memory value, from the previous 17.22M to 18.27M, because the cache bitmap consumes a part of memory, but as long as the width of the UI is not very high, increased memory will not be too big.

#### Frequent refresh of CPU consumption

The most important thing to notice is whether UI will be refreshed frequently. If it is very frequent, the loss of CPU will be great, because once the sub object is changed in the cache bitmap, the engine will automatically cache the bitmap, and the process of cache bitmap will consume CPU.

So choose to use the cacheAs normal or bitmap mode, or do not use cacheAs, we need to increase the memory and CPU consumption as a key consideration.



### 3.2 Test is frequently redraw

The DebugPanel debugging tool provided by the LayaAir engine can help you to view the game redraw area and add `DebugPanel.init();` in the code; the method will compile and run the project, and the debug window will appear in the browser, as shown in figure 4.

![图3](img/4.png) <br /> (Picture 4)

We check the “`Show current cache redraw`” option or “`Show all redraw  area`”. If the UI is redrawn, the redrawn area will show a green border. The upper left corner of the green box shows repainting times and repainting time, and the Sprite and DrawCall of the performance statistics tool will also change.

In the absence of mouse operation, if the green line box appears frequently, indicating the frequent redraw of  **UI, then it is best not to use bitmap cache mode, normal mode can be considered as appropriate**. Of course, you can also manage the UI hierarchically, with frequently updated layers (without cacheAs) and infrequent updates (with cacheAs), which can also improve performance.


### 3.3 Configuration factors of low-end models

When we do games, we usually take into account the configuration of the phone, most of the game is adapted to the more models the better, the game testers will also be tested with high and low end mobile phones to test, and then provide optimization suggestions. So, in the use of cacheAs, also need to refer to the phone's memory, CPU size.

For some low-end machines, CPU and memory is not high, if you use cacheAs to improve rendering performance, there may be problems.

At this time developers need to do the trade-offs, the choice of performance or to the breadth of the game model, or taken. If you choose to adapt to more low-end models, then you need to repeatedly test whether to use cacheAs, but also compare the normal and bitmap mode is more suitable to optimize the performance of the case to minimize CPU and memory loss.


## 4. Under some circumstances can not use cacheAs

### 4.1 Objects are not available when they are very simple

When the object is very simple, such as a word or a picture, set cacheAs not only does not improve performance, but will lose performance.

### 4.2 Frequent changes content can not be used

There are often changes in the contents of the container, such as the container has an animation or countdown, and then set this container cacheAs, will lose performance.

We can look at the first value of the Canvas statistics in the performance statistics panel. If it changes all the time, it says that it has been redrawn. In this case, cacheAs cannot be used.
