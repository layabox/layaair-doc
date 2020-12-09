# LayaAir引擎播放DragonBones动画

> 本篇采用LayaAirIDE 2.0.0版本截图说明，如有差异，请下载最新稳定版本的LayaAirIDE，并以最新版本为准。

DragonBones（龙骨）骨骼动画，是游戏中经常使用的骨骼动画之一，通过LayaAirIDE自带的转换工具，可以将DragonBones骨骼动画格式转换为LayaAir引擎支持的骨骼动画格式。



### 1、原版DragonBones骨骼动画的导出

#### 1.1 导出时的纹理设置必须为纹理集

LayaAirIDE的DragonBones转换工具只支持图集模式的DragonBones骨骼动画转换，因此，在使用DragonBones骨骼动画编辑工具导出时，必须在`纹理设置`的`纹理类型`选项里选择`纹理集`，如图1所示。

![图1](img/1.png) 

(图1)

#### 1.2 导出的DragonBones版本

LayaAirIDE并非所有DragonBones版本都支持转换。支持的版本号在LayaAirIDE的`龙骨转换工具`面板中有显示，如图2所示。

![图2](img/2.png) 

(图2)

截止到本篇文档时，DragonBones从4.5版本开始，已支持到5.1版本。后续LayaAirIDE会不定期进行DragonBones版本支持的更新，开发者可关注转换工具面板上版本号支持状态的改变。



### 2、将DragonBones动画转换为LayaAir引擎识别的格式

#### 2.1 打开转换工具面板

在LayaAirIDE的`设计模式`中，依次点击菜单栏的 `工具` —> `龙骨动画转换` ，如图3所示，即可打开`DragonBones格式转换`工具。

![图3](img/3.png) 

(图3)



#### 2.2 生成.sk后缀的骨骼动画文件

打开`龙骨格式转换`工具面板后，将DragonBones导出的资源目录`拖入`到转换面板，或者点击`浏览`按钮选择DragonBones导出的资源目录。然后点击`确定` ，即可在原资源目录下生成`.png`和`.sk`后缀的两个同名文件。如图4所示。

![图4](img/4.png) 

(图4)



### 3、DragonBones动画的加载显示

#### 3.1 将转换后的DragonBones动画资源复制到项目对应的目录。

我们将龙骨转换工具生成的同名`.sk`与`.png`后缀的文件复制到项目的目录中，如图5所示。（*龙骨工具导出的原始文件不用管，仅供转换工具使用。*）

![图5](img/5.png) 

(图5)

#### 3.2 DragonBones动画播放示例

下面的示例将用到`laya.ani.bone.Skeleton` 类，具体API说明可直接打开链接查看：[https://layaair.ldc.layabox.com/api/?category=Bone&class=laya.ani.bone.Skeleton](https://layaair2.ldc2.layabox.com/api2/Chinese/index.html?version=2.9.0beta&type=2D&category=Animation&class=laya.ani.bone.Skeleton)

创建 DragonBonesDemo.js，代码编写如下：

```java
//初始化舞台
Laya.init(1334,750);
//创建一个Skeleton对象
var skeleton = new Laya.Skeleton();
//添加到舞台
Laya.stage.addChild(skeleton);

skeleton.pos(600,350);

//通过加载直接创建动画
skeleton.load("res/DragonBones/rooster/Rooster_Ani.sk");
```
运行效果如动图6所示

![动图6](img/6.gif) 

(动图6)