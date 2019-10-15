#Introduction to Stat Statistical Panel

###### *version :2.2.0beta4   Update:2019-9-2*

To facilitate developers to optimize performance, LayaAir3D provides a performance statistics panel, Stat Statistics Panel, which allows developers to view relevant performance parameters in real time.

​![图](img/1.png)(Fig. 1)

The performance parameters of the participating statistics are as follows (all parameters are updated every 1 second or so). The lower the Fps, the higher the performance.

​**FPS (WebGL)/FPS (3D):**The higher and more stable the frame rate in Laya2D mode or Laya3D mode, i.e. the number of frames displayed per second, the smoother it feels.

​**Sprite:**Statistics of the number of rendering nodes (including containers) will affect the efficiency of node traversal, data organization and rendering.

​**RenderBatches:**Rendering batch;

​**Saved Render Batches:**Merged rendering batches;

​**CPUMemory:**CPU memory;

​**GPUMemory:**GPU video memory;

​**Shader:**The number of submissions by Shader;

​**TriFaces:**Triangular surface;

​**Frustumculling:**The number of taper clipping of the camera;

​**OctreeNodeCulling:**Octree node clipping times;

###How to Open Stat Statistics Panel

One**Edit Mode - F9 - Preview Settings - Check the Frame Rate Statistics Panel**	

2. Input directly into the console after project start**Laya. Stat. show ()**

##### 	