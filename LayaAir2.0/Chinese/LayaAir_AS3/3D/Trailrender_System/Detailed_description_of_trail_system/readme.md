# 拖尾系统详解

###### *version :2.1.1beta   Update:2019-8-2*

​	**在LayaAir3D 中，拖尾系统是由 TrailSprite3D 构成。且拖尾在这里只推荐从Unity中编辑并导出使用。**

我们来看下拖尾界面

![](img/1.png)<br>(图1)

目前已经支持导出的属性详解：

------

`Time` 拖尾生存时长

`minVertexDistance` 最小拖尾片段距离

`width` 拖尾宽度设置（可以为宽度曲线）

`Color` 采用 colorGradient 方式设置，有两个可选模式

​		`Fixed` 固定模式

​		`Blend` 混合模式

`texture Mode`  纹理模式，与普通纹理模式相同。

​		`Stretch` 可沿着轨迹的整个长度应用纹理贴图

​		`Tile` 使纹理沿着轨迹的长度平铺

`alignment` 轨迹准线

​		`ALIGNMENT_VIEW` 可以使轨迹面向摄像机

​		`ALIGNMENT_TRANSFORM_Z  ` 根据轨迹的变换组件的方向对齐