#Texture mipmap

###### *version :2.1.0   Update:2019-5-25*


​	LayaAir3D是支持纹理的mipmap的。在我们对一个模型的贴图使用了MipMap技术之时，游戏运行中这个模型的贴图会根据摄像机距离模型的远近而调整不同质量的贴图显示。

In LayaAir3D, texture mipmap is turned on by default.

The effect of Plane in the following two motion pictures when it is far from the camera begins to get closer from the distance with the camera.

![] (img/1.gif) < br > (Figure 1) uses mipmap

![] (img/2.gif) < br > (Figure 2) No mipmap is used

The effect of mipmap can be seen from these two moving maps drawn far and near. And when the distance from the camera is long, the effect of texture without mipmap is very poor.