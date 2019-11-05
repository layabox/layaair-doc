#Orthogonal projection and perspective projection of camera

###### *version :2.0.1beta   Update:2019-3-19*

When we look at the world, we see the world with "near big, far small" perspective effect. In the 3D engine, in order to better simulate the world seen by the human eye, the default camera has the effect of "perspective projection".

![] (img/1.png)<br> (Fig. 1) Effect map of default projection

But there are a large number of games, especially the mixed games of 2D and 3D with 45-degree angle of view. The game picture can not bring perspective effect. At this time, we need to set the camera as "orthogonal projection" so that it does not produce near-large-far perspective effect.


```typescript

//正交投影属性设置
camera.orthographicProjection = true;
//正交垂直矩阵距离,控制3D物体远近与显示大小
camera.orthographicVerticalSize = 7;
//移动摄像机位置
camera.transform.translate(new Vector3(0, 26.5, 45));
//旋转摄像机角度
camera.transform.rotate(new Vector3( -30, 0, 0), true, false);
```


! [] (IMG / 2. PNG) < br > (Fig. 2) renderings of orthogonal projection

