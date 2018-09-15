# LayaNative2.0

LayaNative2.0对开发者而言，最大的改进就是全面支持LayaAir3D，为开发者发布3D-App版本，提供了便利。另外，LayaNative2.0推翻了LayaBox延续5代的Native解决方案，目的是更快、更开放、更简单以及更好的支持3D为设计目标。LayaNative2.0采用WebGL+的专利技术设计理念，更先进、更开放，如同WebGL协议，只定函数不定规则，是一种小巧而且扩展性强的解决方案。下面从引擎结构、性能、功能、易用性四个层面做一下简单介绍。

## 1、引擎架构



## 2、性能

1、对比LayaNative1.0

2、对比国内其他通用runtime引擎


## 3、扩展功能

1、LayaNative2.0支持单线程和双线程两种模式，开发者根据自己的项目实际测试结果，决定选择哪种模式。
单线程模式：JS和Render运行在一个线程中，优点：操作（例如：touch、按键）无延迟，缺点：性能不如双线程模式。
双线程模式：JS和Render运行在各自的线程中，优点：性能比单线程版本高，缺点：操作（touch、按键）会有半帧，最大到一帧的延迟。

2、支持显卡纹理压缩，不仅提高渲染效率还能减少显存占用。

3、优化的二次开发，更容易理解，方便开发者使用，详见文档：
https://github.com/layabox/layaair-doc/tree/master/LayaAir2.0/Chinese/LayaNative/Secondary_Development


## 4、易用性

1、Android可以真机调试JavaScript

2、LoadingView启动页面

3、测试器支持扫码功能