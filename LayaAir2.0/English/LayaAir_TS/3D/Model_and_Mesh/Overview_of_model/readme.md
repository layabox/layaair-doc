# 模型概述

###### *version :2.0.2beta   Update:2019-4-26*

​	模型由Mesh（网格）与 Material（材质）2个部分组合而成。本篇会着重介绍Mesh网格，而材质会在后面的材质篇专门讲解。

LayaAir3D中的模型精灵有两种。MeshSprite3D（静态网格精灵）与 SkinnedMeshSprite3D（蒙皮动画网格精灵）。

#### MeshSprite3D

​	MeshSprite3D是引擎中最常用的 **静态网格精灵** ,可根据于美术软件预制作或自定义的网格数据渲染模型。游戏中绝大多数地图都包含静态网格体，例如场景中的各种建筑模型、山体岩石一般均为MeshSprite3D。

#### SkinnedMeshSprite3D

​	SkinnedMeshSprite3D是引擎中的 **蒙皮动画网格精灵**,可根据美术软件预制作的网格数据和Animator组件的动画数据产生动作形变。常用于带蒙皮动画的角色、怪物等。和MeshSprite3D相比具产生网格形变的能力。

