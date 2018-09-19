# 场景使用

​      在2.0项目开发中，无论是创建场景Scene，页面View，对话框Dialog，3d场景scene3d，文件类型和后缀都是scene。LayaAir2.0开发思路为组件化，脚本化，场景管理开发，项目采用scene管理方式，来管理场景，LayaAir 已经对scene做了一系列方案，使得开发者无需考虑场景，关卡，页面的资源，内存管理，只需要单纯的调用接口，管理场景，其他的交给引擎去做，只需专注游戏逻辑开发即可。



新建一个2.0项目，打开编辑模式，在工程中创建两个场景，Start场景中放一个按钮如图所示



![1](img\1.png)(图1)



在test目录下创建第二个场景box2d

![1](img\2.png)(图1)

start场景和box2d场景都在laya目录下的pages文件夹内，打开场景只需简单的调用Scene.open("场景名")；

![1](img\3.png)(图1)

我们将Start脚本，挂载到button上， 在box2d场景中选中button，然后 在右侧 属性 面板中，点击添加组件，然后选择Start.js

Start.js代码如上图所示读者自行完成。

然后编辑模式下按 F9 在预览窗口选择启动场景为 Start.scene,点击确定。

![1](img\4.png)



然后在编译运行项目，即可看到如下结果，在启动场景中点击start按钮，即可切换场景，更多内容请参照

APIhttps://layaair.ldc.layabox.com/api2/Chinese/index.html?category=Core&class=laya.display.Scene，

或者访问社区http://ask.layabox.com

![1](img\ide.gif)