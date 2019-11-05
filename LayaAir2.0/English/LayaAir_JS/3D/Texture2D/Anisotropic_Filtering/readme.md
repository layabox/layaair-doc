#Anisotropic filtering of texture

###### *version :2.1.0   Update:2019-5-25*

Anisotropic Filtering is used to filter and deal with texture errors caused by the tilt of 3D object surface caused by the change of view angle.

The more efficient this attribute is, the more obvious it is. Also, the highest acceptable values for different GPUs are different. The following two screenshots are from the same perspective, different`anisoLevel`Effect under anisotropy level.

[] (img/1.png)<br> (Figure 2) anisoLevel = 0

![] (img/2.png) < br > (fig. 2) anisoLevel = 10

Setup code:


```typescript

//设置各向异性等级
texture.anisoLevel = 10;
```


