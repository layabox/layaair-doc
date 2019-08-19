# 纹理的循环模式

###### *version :2.1.0   Update:2019-5-25*

​	纹理的循环模式（重复或钳制）。LayaAir3D支持`WARPMODE_CLAMP` 纹理的边缘拉伸和`WARPMODE_REPEAT` 纹理重复平铺两种模式。在LayaAir3D中默认是使用 `Repeat` 模式 。

注意示例中的cube模型使用的是自己重写的创建盒子mesh方法。

设置循环模式前的效果图：

![](img/1.png)<br>(图1)

```typescript
//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = BaseTexture.WARPMODE_REPEAT;
```

设置后（图2）:

![](img/2.png)<br>(图2)

