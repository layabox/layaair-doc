# 摄像机的正交投影和透视投影

###### *version :2.0.1beta   Update:2019-3-19*

En regardant le monde, on voit le monde avec un effet de vision "proche et lointain", dans un moteur 3D, pour mieux simuler le monde vu par les yeux, des caméras par défaut avec un effet de "projection visuelle".

[] (IMG / 1.png) <br > (Figure 1) Diagramme d 'effet d' une projection par défaut

Mais il y a beaucoup de jeux, en particulier les jeux mixtes 2D et 3D avec un angle de 45 degrés oblique, dont l 'image ne peut pas avoir un effet de vision, alors il faut mettre en place une caméra en quadrature pour qu' elle ne produise pas d 'effet de vision de grande portée.


```typescript

//正交投影属性设置
camera.orthographicProjection = true;
//正交垂直矩阵距离,控制3D物体远近与显示大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Laya.Vector3(0, 26.5, 45));
//旋转摄像机角度
camera.transform.rotate(new Laya.Vector3( -30, 0, 0), true, false);
```


[] (IMG / 2.png) <br > (Figure 2) orthogonal projection

