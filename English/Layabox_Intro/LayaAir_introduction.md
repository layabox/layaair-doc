# LayaAir功能介绍

![1](1.png)



LayaAir包括引擎库与LayaAir IDE两大核心部分



## LayaAir引擎库功能

LayaAir引擎支持精灵、矢量图、文本、富文本、位图字体、动画、骨骼、音频与视频、滤镜、事件、加载、缓动、时间、网络、UI系统、物理系统、TiledMap、prtocol等API；支持开发2D、3D、VR的产品研发，支持Canvas与WebGL模式，支持同时发布为HTML5、Flash、APP（IOS、安卓）多种版本。



**其中：**

- laya.core是核心包，封装了显示对象渲染，事件，时间管理，时间轴动画，缓动，消息交互，socket，本地存储，鼠标触摸，声音，加载，颜色滤镜，位图字体等。

- laya.webgl 包封装了webgl渲染管线，如果使用webgl渲染，可以在初始化时调用Laya.init(1000,800,laya.webgl.WebGL);

- laya.ani.js是动画模块，包含了swf动画，骨骼动画等。

- laya.filter.js包含更多webgl滤镜，比如外发光，阴影，模糊以及更多。

- laya.html.js封装了html动态排版功能。

- laya.ui.js提供了制作UI的各种组件实现。

- laya.tilemap.js提供tileMap解析支持。

  ​



## LayaAir IDE功能

LayaAir IDE主要包括代码开发编辑器、可视化编辑器、第三方工具链支持工具等。

其中主要功能包括：

- 代码开发
- UI编辑器
- 粒子编辑器
- 时间轴动画
- 场景编辑器
- 3D支持
- 脚本扩展
- 预设
- APP打包
- Flash发布
- JS混淆与压缩
- 第三方工具链转换工具（SWF、Unity3D、3Dmax、TiledMap、Spine、龙骨……）