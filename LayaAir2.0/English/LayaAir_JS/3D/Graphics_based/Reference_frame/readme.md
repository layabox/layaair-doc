#LayaAir3D coordinate system

In the 2-D engine, we directly adjust the coordinates of X and y to control the position and rotation direction of the display object. In the 3-D engine, the display object is more complex, and z-axis coordinates are added. So we use Vector 3 three-dimensional vector, whose values represent x, y and Z respectively.

However, the definitions of coordinate directions in various 3D engine and 3D model animation software will be different, so beginners need to master their differences.

LayaAir 3D engine coordinates belong in technical terms**Right-handed coordinate system**(Fig. 1). Simply speaking, the screen is positively Z-axis to the viewer (negative Z-axis to the rear of the screen), positively X-axis to the right of the screen and positively Y-axis to the top. Some 3D engines belong to the left-hand coordinate system, which is not introduced here. Interested beginners can learn from Baidu.

​![图](img/1.png)<br>(图1)右手坐标系


The engine is also divided into the world coordinate system and the local coordinate system:

​**World coordinate system**It's the coordinates of a 3D scene, and the direction of the three axes will never change (Fig. 1).

​**Local coordinate system**It is a coordinate system in which the origin of the object is the coordinate origin, and the initial direction is the same as that of the world coordinate system. The local coordinate system changes with the rotation of the object (relative to the world coordinate), but the local coordinate system of the object itself does not change. So we can recognize the local coordinate direction by right-hand coordinate gesture (Figure 2).

![图](img/2.png)<br> (Fig. 2)

