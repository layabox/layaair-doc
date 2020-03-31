# Unity插件介绍

###### *version :2.3.0beta   Update:2019-9-27*

> ### 重要提示：从LayaAir引擎2.3开始只能使用Unity 2018.4.7，LayaAir引擎 2.3以前的版本，要使用Unity5.6.x。

**升级时需要注意：** Unity升级之后，将项目目录下的 LayaAir3D 与 StreamingAssets 文件夹删除。然后再安装新版本Unity插件。如果项目中没有老版本插件可以忽略这一步。

### Unity3D简介

Unity3D是由Unity Technologies开发的一个让玩家轻松创建诸如三维视频游戏、建筑可视化、实时三维动画等类型互动内容的多平台的综合型游戏开发工具，是一个全面整合的专业游戏引擎,LayaAir为了减少美术人员的学习成本,让熟悉Unity的开发者能快速上手，LayaAir采用Unity插件作为美术资源编辑的首选工具。

Unity下载地址为：[https://unity3d.com/get-unity/download/archive](https://unity3d.com/get-unity/download/archive)

### 插件面板的基本介绍

插件下载地址：[插件地址](https://ldc2.layabox.com/layadownload/?type=layaairide-LayaAir%20IDE%202.0.0) ，跳转到下载链接,如图1所示。

![](img/1.png)<br>(图1)

#### 	安装导出插件

​	启动unity，新建个项目，并导入游戏需要的资源与材质、贴图等，项目名称可以按照自己的需要来命名。ctrl+s保存我们的场景，我们这里保存名字叫truck。

​	在资源管理界面右键导入LayaAir3D转换工具。插件版本会随着LayaAir引擎功能的增加而更新，但导入的方法是完全一致的。

​	导入工具成功后，在资源管理界面中会出现名为LayaAir3D与StreamingAssets两个文件夹，同时在unity菜单栏中也会出现导出插件菜单LayaAir3D。如图2：

![](img/2.gif)<br>(图2)

点击菜单栏LayaAir3D，会出现导出设置面板，在这我们将详细为大家讲解。

**Tips：**点击菜单LayaAir3D后，下拉菜单中出现了更多的子项，LayaAir Export是指导出资设置面板，可以把它拖拉到unity3D的界面的适合位置上，下次打开这个项目时，它会保持在设定的位置。(图3所示)

**LayaAir => help => Demo、Study、Ansewers，Tutorial等可以点击打开LayaAir官网，分别代表着示例、学习文档、论坛，插件支持导出，方便开发者们解惑，Setting可以设置插件界面语言。**	

![](img/3.gif)<br>(图3)

#### 插件具体功能

插件准备好后，我们来看下插件的面板：

![](img/4.png)<br>(图4)

##### (1) Scene

​	**Scene类别**是指的整个场景，无论场景中的模型、材质、贴图、动画、还是光照贴图全部导出，主要用于场景制作，文件扩展名是.ls，需要用Scene类或它的继承类加载。

##### (2) Sprite3D

​	**Sprite3D类别**比场景少了光照贴图的导出，经常用于角色或游戏中活动物品的单独资源导出，文件扩展名的是.lh，要用Spite3D加载。

它们的加载和使用我们将在后续的 **场景** 与 **精灵** 介绍。

##### (3) GameObject Setting

游戏物品节点设置

`Ignore Not Active Game Objects `
导出时忽略在unity场景中未激活的节点。

`Batch Make The First Level Game Objects ` **（必须选择sprite3D才会有） **
批量导出场景中所有一级节点。

##### (4) MeshSprite3D Setting

网格数据的导出设置，它们的可起到压缩模型网格lm文件大小的作用，建议如项目中不用切线（不用法线贴图）与顶点色，请都勾选，可节省20%左右的模型资源大小。

`Ignore Vertices UV `                忽略UV贴图

`Ignore Vertices Color`           忽略顶点颜色信息

`Ignore Vertices Normal`         忽略法线

`Ignore Vertices Tangent`        忽略切线信息

`Compress`                                模型压缩

##### (5) Terrain Setting

unity地型导出设置

`Convert Terrain To Mesh `
如果场景中有地型，转换地型成网格模型。
untiy的地型制作非常方便，可以用笔刷绘制地型高度，如山川、河沟等，还支持笔刷绘制多张细节贴图，用于几种贴图的地表制作。LayaAir导出插件会把地型转化成Mesh，方便开发者使用。有区别的是材质和普通材质不同，包含了细节贴图。

##### (6) Animation setting

动画设置

`Compress`    动画压缩

##### (7) Assets platform

资源平台设置。

`IOS` 与 ` Android`	各平台的专属资源，由于部分资源不通用所以资源必须分多份。目前支持平台专属纹理压缩格式。

`Conventional`    通用平台，只是普通的JPG和PNG。

##### (8) Other Setting

其他设置

`Customize Export Root Directory Name `
自定义导出文件夹名字，默认的文件夹名字为“layaScene+场景名”。

##### (9) 导出设置

导出设置面板如图5所示。

**Run**       点击可使用LayaAir引擎直接运行该场景。

**Export**  导出当前资源，点击后，将导出当前场景或模型的数据到指定路径上。

**QRCode**  生成二维码。可以在手机端预览，需要在同一局域网内。

**Browse**    保存的文件路径。

**Revert  Config**   初始化配置。

**Config 1-5**  读取配置文件。

![](img/5.png)<br>(图5)

![](img/6.png)<br>(图6)