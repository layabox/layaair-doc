#Deep Format of RenderTexture

###### *version :2.1.0   Update:2019-5-25*

In computer graphics,**Depth buffer**It is a process of processing image depth coordinates in three-dimensional graphics. This process is usually completed in hardware, it can also be completed in software. It is a solution to the visibility problem.

The deep buffer formats supported in LayaAir3D are:

​`FORMAT_DEPTH_16`

​`FORMAT_STENCIL_8`

​`FORMAT_DEPTHSTENCIL_16_8`

####Depth formatting in code


```typescript

......
//选择渲染目标为纹理
renderTargetCamera.renderTarget = new RenderTexture(2048, 2048);
//设置深度格式
renderTargetCamera.renderTarget.depthStencilFormat = BaseTexture.FORMAT_DEPTH_16;
......
```


(Demo address)
