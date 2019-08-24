# 基准测试



LayaAir引擎内置的性能统计工具可用于基准测试，实时检测当前性能。开发者可以使用`laya.utils.Stat`类，通过Stat.show() 显示统计面板。具体编写代码如下例所示：



```javascript
   Stat.show(0,0);             //AS3的面板调用写法       

    Laya.Stat.show(0,0);        //TS与JS的面板调用写法
```

Canvas渲染的统计信息：

​	![1](img/1.png)<br/>
​	（图1）

WebGL渲染的统计信息：

​	![图片1.png](img/2.png)<br/>
​	（图1）

 

**统计参数的意义**：

· **FPS**：每秒呈现的帧数(数字越高越好)。
使用Canvas渲染时，描述字段显示为FPS(Canvas)，使用WebGL渲染时，描述字段显示为FPS(WebGL)。

· **Sprite**：渲染节点数量（数字越低越好）。
Sprite统计所有渲染节点（包括容器），这个数字的大小会影响引擎节点遍历，数据组织和渲染的次数。

· **DrawCall**：DrawCall在Canvas和WebGL渲染下代表不同的意义（越少越好）：

 Canvas下表示每帧的绘制次数，包括图片、文字、矢量图。尽量限制在100之下。

WebGL下表示渲染提交批次，每次准备数据并通知GPU渲染绘制的过程称为1次DrawCall，在每1次DrawCall中除了在通知GPU的渲染上比较耗时之外，切换材质与shader也是非常耗时的操作。 DrawCall的次数是决定性能的重要指标，尽量限制在100之下。

· **Canvas**：三个数值 —— 每帧重绘的画布数量 / 缓存类型为“normal”类型的画布数量 / 缓存类型为“bitmap”类型的画布数量”。

· **CurMem**：仅限WebGL渲染，表示内存与显存占用（越低越好）。

· **Shader**：仅限WebGL渲染，表示每帧Shader提交次数。

***Tips：**无论是Canvas模式还是WebGL模式，我们都需要重点关注DrawCall，Sprite，Canvas这三个参数，然后针对性地进行优化。（参见“图形渲染性能”）*

 