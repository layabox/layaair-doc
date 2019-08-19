# 纹理的各向异性过滤

###### *version :2.1.0   Update:2019-5-25*

​	各向异性过滤 （Anisotropic Filtering ）是用来过滤、处理当视角变化导致3D物体表面倾斜时造成的纹理错误。

这个属性越高效果越明显。还有就是不同的gpu可以接受的最高数值是不同的。下面两张截图是同个视角，不同的`anisoLevel`各向异性等级下的效果。

![](img/1.png)<br>(图2) anisoLevel = 0

![](img/2.png)<br>(图2) anisoLevel =10

设置代码：

```typescript
//设置各向异性等级
texture.anisoLevel = 10;
```

