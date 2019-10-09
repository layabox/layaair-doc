# Stat统计面板的介绍

###### *version :2.2.0beta4   Update:2019-9-2*

​	为了方便开发者进行性能优化，LayaAir3D提供了一个性能统计面板——Stat统计面板，开发者可以实时查看相关的性能参数。

​        ![图](img/1.png)(图1)

参与统计的性能参数如下（所有参数都是每大约1秒进行更新），除去Fps都是越低性能越高：

​	 **FPS(WebGL)/FPS(3D)：**Laya2D 模式或者 Laya3D 模式下的帧频，也就是每秒显示的帧数，值越高、越稳定，感觉越流畅；

​	**Sprite：**统计所有渲染节点（包括容器）数量，它的大小会影响引擎进行节点遍历、数据组织和渲染的效率。

​	**RenderBatches：**渲染批次；

​	**SavedRenderBatches：** 合并的渲染批次；

​	**CPUMemory：**  CPU内存;

​	**GPUMemory：** GPU显存 ;

​	**Shader：** Shader提交次数 ;

​	**TriFaces：** 三角面 ;

​	**Frustumculling：**摄像机的视锥裁剪次数；

​	**OctreeNodeCulling：**  八叉树节点裁剪次数；

### 如何开启Stat统计面板

​	1.**编辑模式--F9--预览设置--勾选帧率统计面板**	

​	2.在项目启动后直接在控制台输入 **Laya.Stat.show()**

##### 	