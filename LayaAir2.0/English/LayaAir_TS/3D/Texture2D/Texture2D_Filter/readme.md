# 纹理的过滤器

###### *version :2.1.0   Update:2019-5-25*

Our texture is to be affixed to the surface of the three-dimensional graphics, and the center of the pixel on the three-dimensional graphics and the center of the texture element on the texture are not the same, and the size is not necessarily the same. When the texture is larger than the surface of a three-dimensional graph, the leading pixel is mapped to many texture pixels; when the dimension is smaller than the surface of a three-dimensional graph, many pixels are mapped to the same texture.

When these situations occur, the maps become blurred or misaligned. To solve this problem, we must smooth the correspondence between texture elements and pixels through technology. This technology is texture filtering.

Three commonly used filtering modes are supported in LayaAir3D:

`FILTERMODE_POINT`,**Nearest Point Sampling**(Less used, but you can use this mode if you need to play pixel-style games)

`FILTERMODE_BILINEAR`,**bilinear filtering** (最常用,性能挺好的)

`FILTERMODE_TRILINEAR`,**Trilinear filtration**The effect is ideal.

####Setting Texture Filtering Mode

In LayaAir3D, the texture filtering mode needs to be set for the corresponding material.


```typescript

//设置过滤方式
texture.filterMode = Laya.BaseTexture.FILTERMODE_BILINEAR;
```


