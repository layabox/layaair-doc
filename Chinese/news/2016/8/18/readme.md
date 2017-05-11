# 深度测试： LayaAir H5游戏引擎裸跑性能超越Unity3D

2016-08-18 

《醉西游》H5版的出现，让游戏行业认识到HTML5 已经具备实现APP级的MMORPG类型的大型重度游戏的能力。LayaBox旗下第二代H5游戏引擎LayaAir更是在其发布会上展示出超越APP顶级引擎Unity3D的各项性能表现和数据。

但是不少开发者依然质疑H5的3D技术是否可以还原Unity3D引擎的3D游戏体验？本文通过对实际评测报告数据进行逐一分析，验证LayaAir H5游戏引擎的真实性能表现。每个评测DEMO都将提供H5直接体验的二维码，以及Unity3D引擎的APP源码和实录的高清视频网盘下载地址，供开发者实际测试体验和验证，以确保本次测试报告的真实有效性。

 

**本次测试环境的相关信息**

硬件设备：红米1S

系统版本：Android 4.4.2 KOT49H

H5运行环境：微信 软件版本6.3.22

H5运行环境：Chrome浏览器 软件版本 51.0.2704.81

H5测试DEMO采用引擎：LayaAir

APP测试DEMO采用引擎：Unity3D

 

**性能测试标准**

游戏产品在运行过程中是否流畅是核心评测标准，尤其是角色扮演、动作类型、对战类型等大型2D游戏或3D游戏，对操作流畅感要求较高，一旦出现画面卡顿，那就会造成玩家的流失。

 

而从研发技术角度上，FPS是性能评测的指标。FPS指的是画面每秒传输帧数，或者理解为画面刷新率。电影是以每秒24张画面的速度进行播放，而游戏与电影的图像生成原理不同，游戏的画面渲染需要每秒更高的帧速才会感觉流畅，60帧是游戏最高的FPS值。



**HTML5与APP的3D性能对比** 

3D游戏研发商会关心同屏能跑多少个角色，每个角色允许多少根骨骼，每个角色允许多少三角面这些问题。LayaAir H5游戏引擎在性能上的突破让游戏研发商完全可以按APP引擎标准开发HTML５游戏,支持低端手机流畅运行同屏三角面达15万以上。同时，LayaAir全面支持Unity3D编辑器导出，实现开发无缝衔接。

 

在本文的测试用例中，单个角色平均采用50块骨骼，同屏24个角色，并在低端手机红米1中使用微信和谷歌等浏览器进行测试。

**测试结果：**

同屏24个3D角色，在微信环境中，LayaAir H5游戏引擎裸跑的3D测试用例FPS指标在32-33帧之间波动

![图1.gif](http://www.layabox.com/uploadfile/image/20160818/1471486139135084.gif)

同屏24个3D角色，在谷歌浏览器环境中，LayaAir H5游戏引擎裸跑的3D测试用例FPS指标在38-42帧之间波动

![图2.gif](http://www.layabox.com/uploadfile/image/20160818/1471486181260235.gif)

同屏24个3D角色，采用Unity3D引擎打包成原生APP运行，FPS指标在37-41帧之间波动。

![图3.gif](http://www.layabox.com/uploadfile/image/20160818/1471486197770206.gif)

![WechatIMG1.jpeg](http://www.layabox.com/uploadfile/image/20160818/1471486415704601.jpeg)

通过测试结果，我们可以看出，LayaAir H5游戏引擎的3D性能在Chrome浏览器环境下性能超越APP，微信环境中也拥有着接近原生的性能表现，至于打包成APP的性能，下文将会继续展开测试。

 性能测试 HTML5 体验二维码： 

![图5.png](http://www.layabox.com/uploadfile/image/20160818/1471486439848963.png)

扫描二维码体验

 

**性能测试APP下载地址：**https://pan.baidu.com/s/1hrQWUR6

 

 

**LayaAir APP与Unity3D APP性能对比**

**作为基于HTML5技术的三端游戏引擎，LayaAir可同时发布H5版、APP版、Flash版。基于LayaPlayer打包的LayaAir APP版性能体验比肩Native APP，尤其在2D方面，LayaAir H5游戏引擎APP产品性能甚至可达到Unity3D引擎APP产品的2倍以上。**

在APP测试用例方面，我们采用同屏500个角色动画+500血条+500文字，整体随机速度平移。

 

**测试结果**

基于微信环境下，LayaAir H5游戏引擎裸跑的测试用例FPS指标在23-24帧之间波动。

![图6.gif](http://www.layabox.com/uploadfile/image/20160818/1471486631406153.gif)

基于**LayaPlayer****打包的LayaAir H5游戏引擎APP**测试用例FPS指标在41-47帧之间波动。

![图7.gif](http://www.layabox.com/uploadfile/image/20160818/1471486652599544.gif)

基于**Unity3D**引擎的**APP**测试用例FPS指标在18-20帧之间波动。

![图8.gif](http://www.layabox.com/uploadfile/image/20160818/1471486673148963.gif)

 

![WechatIMG4.jpeg](http://www.layabox.com/uploadfile/image/20160818/1471486707594127.jpeg)

**性能测试HTML5体验二维码：**

![图9.png](http://www.layabox.com/uploadfile/image/20160818/1471486733502643.png)

长按二维码体验

 

**性能测试APP下载地址：**https://pan.baidu.com/s/1hrQWUR6

 

 LayaAirH5游戏引擎的优势 

在LayaAir 1.0发布会上，LayaBox创始人谢成鸿说出了一个被自己称为幻想的目标：超越Unity3D，做全球顶级游戏引擎。那么实现这个目标的底气仅仅是性能吗？我们将从三个方面来讨论：

**1、 产品的应用广度**

尽管Unity3D引擎是当之无愧的手游引擎霸主，然而一个新生时代必然会催生一个新领域的全新机会。随着LayaAir H5游戏引擎的技术突破，HTML5行业的技术瓶颈已然全部打破，2D、3D、VR的HTML5产品研发均可达到**Native **APP水准，并且可实现一次开发， Flash、APP、H5三端同发。

那么，三端同发到底有什么价值呢？作为APP手游研发商，在使用LayaAir H5游戏引擎后，不仅可以继续开发APP手游产品，还可以同时将H5版本作为其APP版本营销试玩的市场推广手段。如此一来，既可以在H5蓝海市场里试水起航。还可以通过H5点击即玩的特性，以H5试玩的模式增加同版本APP产品曝光机会和为APP产品进行用户导流。另外，手游模拟器1亿以上的用户市场证明，手游的PC场景需求很强，而同时发布Flash版本将大幅提升用户的游戏体验，甚至可衍生出多端数据互通的新玩法。

由于Unity3D引擎的引擎库非常庞大，不支持浏览器环境中的HTML5版本，也不支持发布Flash版本，因此在HTML5技术需求日益增长的形势下，Unity3D引擎需求当逐步会萎缩。

 **2、 引擎的工具链**

选择Unity3D引擎很重要的一个理由是IDE工具链较为成熟，作为新兴的HTML5产业，要超越Unity3D引擎的工具链，还需要一些时间来进行打磨。LayaAir H5游戏引擎的不仅拥有为引擎量身定制的IDE，还支持大量第三方IDE工具，包括在Unity3D编辑器工具中可直接导出LayaAir H5游戏引擎支持的资源。

**3、 本土化引擎的技术支持力度**

相较于国际引擎，LayaAir作为国产引擎，在线技术支持（QQ\社区），问题反馈与响应速度，甚至是上门的技术指导等多个方面，提供引擎服务保障，有着明显的本土化优势。而在LayaAir H5游戏引擎发布会上，LayaBox发起成立了教育联盟，汇众教育、触控未来、龙图教育作为第一批成员单位，将很快启动LayaAir H5游戏引擎相关的培训课程与就业教育推动。

 

**视频与源码的下载地址： https://pan.baidu.com/s/1bo54ooB**