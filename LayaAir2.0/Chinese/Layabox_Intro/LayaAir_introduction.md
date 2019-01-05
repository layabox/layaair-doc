# LayaAir功能介绍

> LayaAir引擎主要包括 引擎库与LayaAir IDE两大核心部分
>
> LayaCloud与LayaNative是引擎的生态组合部分



## LayaAir2.0引擎库功能

LayaAir2.0引擎不仅保持了1.0的原有功能，比如：

精灵、矢量图、文本、富文本、位图字体、动画、骨骼、音频与视频、滤镜、事件、加载、缓动、时间、网络、UI系统、物理系统、TiledMap、prtocol等API；

还新增内置了box2d物理引擎、组件化支持，以及150多款3D功能，比如：

新增的主要官方材质包括PBRStandardMaterial、PBRSpecularMaterial以及UnlitMaterial材质等。

纹理方面，增加多种纹理参数配置(mipmap、format、wrapModeU、wrapModeV、filterMode、anisoLevel)， 增加纹理上传像素接口， GPU纹理压缩。

动画方面，新增Animator动画融合功能crossFade，新增动画多层混合播放，动画更新机制调整为实时插值，大幅减少内存和动画流畅度表现，新增多种材质属性动画

支持开发2D、3D、VR的产品研发，支持Canvas与WebGL模式，支持同时发布为HTML5、Flash、APP（IOS、安卓）微信小游戏，QQ玩一玩多种版本。


## LayaAir2.0 IDE功能

LayaAir2.0 IDE主要包括`项目管理`、`代码开发编辑器`、`可视化编辑器`、`第三方工具链支持工具`等。

其中主要功能包括：

- 代码开发
- UI与场景编辑器
- 场景管理（2.0新增）
- 粒子编辑器
- 动画编辑器
- 物理编辑器（2.0新增）
- 组件化支持（2.0新增）
- 3D支持（2.0新增）
- LayaCloud项目支持（2.0新增）
- 脚本扩展
- 预设
- APP打包
- JS混淆与压缩
- 第三方工具链转换工具（Unity3D、TiledMap、Spine、龙骨……）



Laya2.0 IDE 兼容LayaAir 1.x版本的写法，在2d项目中，可以不需要太大的改动即可把原有项目升级到2.0引擎（升级前建议备份）

Laya2.0 IDE 采用挂载组件脚本与场景管理的方式进行开发，在ide中编辑场景与页面组件，通过添加脚本的方式，使项目开发更利于程序，美术，策划的协同工作，并且对初次接触Laya的开发者，更易于上手，开发方式更友好。



## LayaNative功能

LayaNative是LayaAir引擎针对移动端原生App的开发、测试、发布的一套完整的开发解决方案，但不局限于LayaAir引擎。LayaNative以LayaPlayer为核心运行时的基础上，利用反射机制、渠道对接方案提供开发者在原生App上进行二次开放和渠道对接，并提供测试器、构建工具，为开发者将html5项目打包、发布成原生App提供便利。

#### LayaNative2.0经过代码重构，性能对比1.0版本有很大的提高。

 1、对比LayaNative1.0

|         | 2D      | 3D       |
| ------- | ------- | -------- |
| Android | 提高10% | 提高90%  |
| IOS     | 提高13% | 提高270% |

2、对比国内其他通用runtime引擎

|         | 2D       | 3D       |
| ------- | -------- | -------- |
| Android | 提高85%  | 提高90%  |
| IOS     | 提高240% | 提高270% |

#### 在扩展方面

1、LayaNative 2.0支持单线程和双线程两种模式，开发者根据自己项目的实际测试结果，决定选择使用哪种模式。

- 单线程模式：JS和Render运行在一个线程中。

- - 优点：操作无延迟（例如：touch、按键）。
  - 缺点：性能不如双线程模式。

- 双线程模式：JS和Render运行在各自的线程中。

- - 优点：性能比单线程版本高。
  - 缺点：操作会有半帧，最大到一帧的延迟（例如：touch、按键）。

2、支持显卡纹理压缩，不仅提高渲染效率还能减少显存的占用。

3、优化的二次开发，更容易理解，方便开发者使用。

#### 在易用性方面，提供更方便的调试功能

**Android平台可以真机调试JavaScript**

在LayaNative1.0版本中，要调试项目中的JavaScript代码只能调用console.log或者alert函数。在layaNative2.0版本中正式支持使用Chrome浏览器调试JavaScript代码。可以在Chrome的调试器里对代码进行断点的添加，代码追踪等功能。

**测试App支持扫码启动项目**

为了让开发者能够更快的调试开发，新版本的测试App添加了扫码启动App的功能，免去了调试时需要手工输入URL的麻烦。



## LayaCloud 功能

LayaCloud是2.0推出的一套云服务解决方案，为开发者提供用户认证（登录或授权等）、服务器数据存取与读取、房间创建与管理、对战匹配、房间内广播、帧同步等基础服务。开发者无需关心服务器的部署与负载等，通过LayaCloud提供的API接口，直接使用前端开发语言轻松快速的实现联网游戏。当面对复杂的服务端需求时，开发者也可以在客户端通过编写配置文件和服务端逻辑脚本，实现LayaCloud基础API未能提供的功能或者其它的游戏业务逻辑。

LayaCloud技术文档页面：https://wiki.cloud.layabox.com/





关于更详细的2.0新特性介绍可以查看Layabox的微信公众号文章：https://mp.weixin.qq.com/s/lHI3tCozcFd_8fZ1PFJ8Xg



如果在开发过程中存在引擎与工具的BUG问题或者建议请访问社区进行提交：http://ask.layabox.com