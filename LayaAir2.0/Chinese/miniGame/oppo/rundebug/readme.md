# OPPO小游戏发布与调试指南

> update : 2019-07-06
>

## 1、OPPO小游戏发布、调试环境准备

1、OPPO品牌的手机。

2、下载安装OPPO真机测试APP "快应用"（OPPO 小游戏调试器 ）

前往OPPO官网文档（[https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)）我们找到`安装 runtime.apk 包到 OPPO 手机上`这个栏目，通常会选择新版本，进行下载。

要注意的是，调试器的版本，文档中有注明最小平台版本号。LayaAirIDE发布的时候，要和这里最小平台版本号对应上。

3、PC电脑的chrome浏览器与手机数据连接线。

4、安装nodejs 环境，建议安装 8.x 稳定版本 [node官网：[https://nodejs.org/en/](https://nodejs.org/en/)]

就是下载安装，比较简单，也不细介绍。能在命令行里调起npm命令就算是成功了。

5、LayaAirIDE集中开发环境，LayaAir 2.1.0 beta 或以上版本 [ 官网下载: [https://ldc2.layabox.com/layadownload/?type=layaairide](https://ldc2.layabox.com/layadownload/?type=layaairide) ]

6、安装ADB

OPPO发布时，是通过 ADB 把rpk包推到手机的games目录上去，所以这个必须要装。

 [ ADB官网下载:  [http://adbshell.com/downloads](http://adbshell.com/downloads) ]

> 提示一下，下载 ADB Kits，下载后的压缩包，建议解压放到一个路径简单一些的目录（如: `D:\adb`）。要记得添加环境变量（不知如何添加环境变量的可自行百度）。
>

## 2、OPPO小游戏发布与接入完整流程	      

### 1、发布前的准备工作检查。

为了让发布OPPO顺利一些，有一些检查工作我们要做。

第一、PC里，node环境、ADB、Chrome这些，都必须要安装好。

第二、在OPPO的手机里，进入` 设置-> 其它设置-> 开发者选项` ，开发者选项与USB调试必须开启，如图1所示。

![图1](img/1.png) 

(图1)

另外要确保安装好OPPO小游戏调试环境“快应用”，如图2所示。

![图2](img/2.png) 

(图2)

第三、将PC电脑与手机用USB数据线相连，电脑里，可以出现类似图3一样的界面。比如，点击图3左上角的OPPO R9m，就可以进入手机存储。

![图3](img/3.png) 

(图3)

手机里要注意的是，屏幕保持点亮打开，在PC的IDE发布OPPO小游戏时，如果手机出现授权信息请求的时候，一定要点确定允许。如图4所示。

![图4](img/4.png) 

（图4）

### 2、发布OPPO小游戏包(xx.rpk)

LayaAirIDE的发布功能，内置了OPPO小游戏的发布功能，需要先将LayaAir引擎的项目，通过发布功能打成.rpk后缀的包。关于发布功能的使用。这里不重复介绍了。不会的可以前往官网文档查看。

链接：[https://ldc2.layabox.com/doc/?nav=zh-ts-2-0-6](https://ldc2.layabox.com/doc/?nav=zh-ts-2-0-6)

### 3、真机调试与Chrome输出

OPPO的调试必须基于真机调试，PC的chrome只能输出信息，看不到画面。

如果准备工作没问题的话，正常情况下，LayaAirIDE里成功发布OPPO小游戏之后，是rpk的包会自动出现在快游戏的OPPO小游戏列表中的（IDE通过调用ADB推到指定的目录中），如图5所示。

![图5](img/5.png) 

（图5）

图5中的`OPPO测试`就是我们在发布的时候填写的游戏名称。如果我们看到自己对应的游戏名称，说明是正常发布成功了。点击秒开，就可以打开我们发布的游戏。

如果想看调试信息。这时就需要打开chrome浏览器。然后在输入栏里输入：

```
chrome-devtools://devtools/bundled/inspector.html?v8only=true&ws=10.10.82.111:12345/00010002-0003-4004-8005-000600070008
```

上面示例的IP地址`10.10.82.111`替换成自己手机上的IP就行。IP地址不知道怎么查的，自行百度。这里重点提示的是，PC电脑必须要和手机处于同一个网段的局域网环境下。

如果没问题，效果如图6所示。

![图6](img/6.png) 

（图6）

发布与调试，顺利的话至此就完成了。

### 5、发布未成功的处理经验。

发布文档中只讲功能使用，上面的文档是顺利情况下的流程。然而开发者可能不会那么顺利，那这里我们讲一讲经验。

#### 调试列表中未见游戏，是什么情况

如果我们发布的时候没能将rpk自动发到快游戏目录内，那图5的列表中，就没办法直接看到刚发布的小游戏。

这时候就可以使用adb来确认环境了。

在ide的终端或者cmd中 输入 `adb devices` 指令。

##### 1.连接非正常情况：

![图7-1](img/7-1.png)  

（图7-1）

此时就开发者需要检查手机连接，和权限是否正确。

##### 2.在连接正常情况下：

![图7-1](img/7-2.png)  

（图7-2）

这时说明手机已经连接成功，并且已经开起来了开发者模式与usb调试。此时可以尝试重启oppo的快应用apk，再查看列表信息。

**在连接正常的情况下**，如果再出现问题。可能就和windows权限有关系，需要确保使用管理员权限启动LayaAirIDE。

关于adb相关，或者手机权限相关的问题，开发者可以自行了解。

------

另一方案，使我们可以采用手工模式，把rpk包，复制到手机存储的games目录下，如果没有games目录则自己手工创建一下。

rpk包位于项目的release/oppogame/quickgame/dist 目录下，如图8所示。

![图8](img/8.png)  

（图8）

将发布生成的rpk文件，复制到手机存储的games目录下，如图9所示。

![图9](img/9.png)  

（图9）

这种方法稳定性更高。

在  `.rpk` 文件生成成功的情况下，实际上发布流程已经结束。

如果打包流程出现问题，可以把问题反馈给Layabox官方团队，Layabox会与OPPO团队共同处理。

最后提醒一下，本篇文档适用于LayaAir2.x引擎与IDE的发布流程。

如果是1.x引擎，

需要先手工引入适配库，并手工初始化（`QGMiniAdapter.init();`），这是和2.x不太一样的地方。

另外还有其它需要注意的地方，以及细节处理过程。欢迎大家前往观看OPPO接入的免费视频。

视频地址：[https://ke.qq.com/course/409332](https://ke.qq.com/course/409332)

## 本文赞赏

如果您觉得本文对您有帮助，欢迎扫码赞赏作者，您的激励是我们写出更多优质文档的动力。

![wechatPay](../../../wechatPay.jpg)

