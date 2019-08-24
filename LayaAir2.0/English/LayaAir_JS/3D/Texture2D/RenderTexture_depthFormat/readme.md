# RenderTexture的深度格式

###### *version :2.1.0   Update:2019-5-25*

​	在计算机图形学中，**深度缓冲**是在三维图形中处理图像深度坐标的过程，这个过程通常在硬件中完成，它也可以在软件中完成，它是可见性问题的一个解决方法。

​	在LayaAir3D中支持的深度缓冲格式有：

​	`FORMAT_DEPTH_16`

​	`FORMAT_STENCIL_8`

​	`FORMAT_DEPTHSTENCIL_16_8`

#### 	在代码中设置深度格式	

```typescript
......
//选择渲染目标为纹理
renderTargetCamera.renderTarget = new Laya.RenderTexture(2048, 2048);
//设置深度格式
renderTargetCamera.renderTarget.depthStencilFormat = Laya.BaseTexture.FORMAT_DEPTH_16;
......
```

(demo地址)
