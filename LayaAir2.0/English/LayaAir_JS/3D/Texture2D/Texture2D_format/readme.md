#Texture Format

###### *version :2.1.0   Update:2019-5-25*

Texture formats currently supported by LayaAir3D:

**Tip**In the following example, we used the final size of the texture in the game to be 256 x 256 pixels.

> General Platform

`FORMAT_R8G8B8`True color, but no Alpha value. (192 KB 256 x256)

`FORMAT_R8G8B8A8`True color with alpha channel. This is the highest quality material format with alpha channel. This is mainly used for transparent mapping. (256 KB 256 x256)

`FORMAT_ALPHA8`High quality alpha channel, no color. (64 KB 256 x256)

> Windows

`FORMAT_DXT1`Compressed RGB texture. This is the most common diffuse reflection texture format. 4-bit/pixel (32 KB 256 x256)

`FORMAT_DXT5`Compressed RGB texture. 1 byte/pixel (64 KB 256 x256)

> Android

`FORMAT_ETC1RGB`Compressed RGB texture. This is the default texture format for the Android project. ETC1 is part of the OpenGL ES 2.0 standard and supports all OpenGL ES 2.0 GPUs, but it does not support Alpha. 4-bit/pixel (32 KB 256 x256)

> IOS

`FORMAT_PVRTCRGB_2BPPV`Compressed RGB texture. 2-bit/pixel (16 KB 256 x256)

`FORMAT_PVRTCRGBA_2BPPV`Compressed RGB texture. 2-bit/pixel (16 KB 256 x256)

`FORMAT_PVRTCRGB_4BPPV`Compressed RGB texture. 4-bit/pixel (32 KB 256 x256)

`FORMAT_PVRTCRGBA_4BPPV`Compressed RGB texture. 4-bit/pixel (32 KB 256 x256)