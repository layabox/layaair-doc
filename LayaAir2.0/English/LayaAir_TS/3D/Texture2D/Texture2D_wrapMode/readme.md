# 纹理的循环模式

###### *version :2.1.0   Update:2019-5-25*

The cyclic pattern of texture (repetition or clamping). LayaAir3D support`WARPMODE_CLAMP`Texture edge stretching and`WARPMODE_REPEAT`Texture repeat tiling mode. In LayaAir3D, the default is to use`Repeat`Pattern.

Note that the cube model in the example uses its own rewritten method of creating box mesh.

Effects before setting the loop mode:

![] (img/1.png)<br> (Figure 1)


```typescript

//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = Laya.BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = Laya.BaseTexture.WARPMODE_REPEAT;
```


After setting up (Figure 2):

![] (img/2.png)<br> (Figure 2)

