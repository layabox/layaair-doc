#Cutting and Vision of Camera

###### *version :2.0.1beta   Update:2019-3-19*

####Close and far tailoring

The camera can also be tailored to show only the scene models between the distance and the distance, and the other models are not rendered. Its greatest advantage is to improve the performance of the game.

When a camera is created, the camera constructor will be clipped by default to a distance of 0.3 meters and 1000 meters. Developers can set it in constructors or through camera properties.

![] (img/1.png)<br> (Figure 1)


```typescript

    //创建摄像机时初始化裁剪(横纵比，近距裁剪，远距裁剪)
    var camera = new Laya.Camera( 0, 0.1, 100);
    //近距裁剪
    camera.nearPlane=0;
    //远距裁剪
    camera.farPlane=100;
```


**Tips**: in general, in the game, we will use the fog effect and camera clipping at the same time. The fog effect can't be seen from far away. At this time, we can set the long-distance clipping to improve the rendering performance of the game.

####Camera vision

Camera field of view is similar to focal length. By adjusting the parameters of field of view, we can see the changes of scene range and perspective. It is adjusted by the angle value. The larger the angle, the larger the field of view, the developers can set it according to their own needs.


```typescript

//设置相机的视野范围90度
camera.fieldOfView = 90;
```

