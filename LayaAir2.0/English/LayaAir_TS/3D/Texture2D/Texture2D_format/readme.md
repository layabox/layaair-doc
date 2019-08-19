# 纹理的格式

###### *version :2.1.0   Update:2019-5-25*

目前LayaAir3D所支持的纹理格式：

**Tip**：在下列的例子中，我们使用了在游戏中纹理的最终大小为256x256像素。

> 平台通用

`FORMAT_R8G8B8` 真彩色，但是没有Alpha值。（192 KB 256x256）

`FORMAT_R8G8B8A8` 真彩色，并带有alpha通道。这是具有alpha通道的最高质量材质格式。这个主要用于透明贴图。（256 KB 256x256）

`FORMAT_ALPHA8` 高质量alpha通道，不带颜色。（64 KB 256x256）

> Windows

`FORMAT_DXT1` 压缩的RGB纹理。这是最常见的漫反射纹理格式。 4位/像素（32 KB 256x256）

`FORMAT_DXT5` 压缩的RGBA纹理。1 字节/像素（64 KB 256x256）

> Android

`FORMAT_ETC1RGB` 压缩的RGB纹理。这是Android工程默认的纹理格式。ETC1是OpenGL ES 2.0标准的一部分，并且支持所有的OpenGL ES 2.0 GPU，但它不支持Alpha。4位/像素（32 KB 256x256）

> IOS

`FORMAT_PVRTCRGB_2BPPV` 压缩的RGB纹理。2位/像素（16 KB 256x256）

`FORMAT_PVRTCRGBA_2BPPV` 压缩的RGBA纹理。2位/像素（16 KB 256x256）

`FORMAT_PVRTCRGB_4BPPV` 压缩的RGB纹理。4位/像素（32 KB 256x256）

`FORMAT_PVRTCRGBA_4BPPV` 压缩的RGBA纹理。4位/像素（32 KB 256x256）