#Cyclic pattern of texture

###### *version :2.1.0   Update:2019-5-25*


​	纹理的循环模式（重复或钳制）。LayaAir3D支持`WARPMODE_CLAMP`Texture edge stretching and`WARPMODE_REPEAT`Texture repeat tiling mode. In LayaAir3D, the default is to use`Repeat`Pattern.

Note that the cube model in the example uses its own override to create the box mesh method.

Effects before setting the loop mode:

![] (img/1.png)<br> (Figure 1)


```typescript

//在U方向上使用WARPMODE_CLAMP
texture.wrapModeU = BaseTexture.WARPMODE_CLAMP;
//在V方向使用WARPMODE_REPEAT
texture.wrapModeV = BaseTexture.WARPMODE_REPEAT;
```


After setting up (Figure 2):

![] (img/2.png)<br> (Figure 2)

