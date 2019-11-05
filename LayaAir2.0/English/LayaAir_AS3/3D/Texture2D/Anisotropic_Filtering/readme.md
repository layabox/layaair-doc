# 纹理的各向异性过滤

###### *version :2.1.0   Update:2019-5-25*


​	各向异性过滤 （Anisotropic Filtering ）是用来过滤、处理当视角变化导致3D物体表面倾斜时造成的纹理错误。

The more efficient this attribute is, the more obvious it is. Also, the highest acceptable values for different GPUs are different. The following two screenshots are from the same perspective, different`anisoLevel`Effect under anisotropy level.

! [] (IMG / 1. PNG) < br > (Figure 2) anisolevel = 0

![] (img/2.png) < br > (fig. 2) anisoLevel = 10

Setup code:


```typescript

//设置各向异性等级
texture.anisoLevel = 10;
```


