#Introduction to LayaAir's Functions

> LayaAir engine mainly includes two core parts: engine library and LayaAir IDE.
>
> LayaCloud and LayaNative are the ecological components of the engine



##LayaAir2.0 Engine Library Function

The LayaAir2.0 engine not only maintains the original functions of 1.0, such as:

APIs such as Wizard, Vector Map, Text, Rich Text, Bitmap Font, Animation, Skeleton, Audio and Video, Filter, Event, Load, Slow, Time, Network, UI System, Physical System, Tiled Map, prtocol, etc.

Box 2 D physical engine, component support and more than 150 3D functions have been added, such as:

The new official materials include PBRStandard Material, PBRSpecular Material and UnlitMaterial.

For texture, we add a variety of texture parameter configurations (mipmap, format, wrapModeU, wrapModeV, filter mode, anisoLevel), increase the texture upload pixel interface, GPU texture compression.

In animation, new animation integration function crossFade, new animation multi-layer mixed playback, animation update mechanism adjusted to real-time interpolation, greatly reducing memory and animation fluency performance, adding a variety of material properties animation

Support the development of 2D, 3D, VR products, support Canvas and WebGL mode, support the simultaneous release of HTML5, Flash, APP (IOS, Android) Wechat games, QQ play a variety of versions.


##LayaAir2.0 IDE function

LayaAir2.0 IDE mainly includes`项目管理`,`代码开发编辑器`,`可视化编辑器`,`第三方工具链支持工具`And so on.

The main functions include:

##-Code developmentUI and Scene Editor
##- Scenario Management (2.0 Added)Particle Editor
##- Animation EditorPhysical Editor (2.0 Added)
##- Componentization Support (2.0 Added)3D Support (2.0 Added)
##- LayaCloud Project Support (2.0 Added)Script extension
##- presetAPP packing
##- JS confusion and compressionThird party tool chain conversion tools (unity3d, tiledmap, spine, keel...)



Laya 2.0 IDE is compatible with LayaAir 1.x version. In a 2D project, you can upgrade the original project to 2.0 engine without much change.

Laya 2.0 IDE is developed by mounting component scripts and scene management. Scene and page components are edited in ide. By adding scripts, project development is more conducive to the collaboration of program, art and planning. It is also easier for developers who first contact Laya to get started and develop in a more friendly way.



##LayaNative function

LayaNative is a complete development solution of LayaAir engine for the development, testing and release of native App on mobile end, but it is not limited to LayaAir engine. Based on LayaPlayer as the core runtime, LayaNative uses reflection mechanism and channel docking scheme to provide developers with secondary opening and channel docking on native App, and provides testers and build tools to facilitate developers to package and publish HTML 5 projects into native App.

####After code refactoring, LayaNative 2.0 has greatly improved its performance compared with version 1.0.

1. Contrast Laya Native 1.0

|| 2D | 3D|
| ----------------------------------------------------------------------------------------------------------------------------------------|
| Android | Increase by 10% | Increase by 90%.|
| IOS | Increased by 13% | Increased by 270%.|

2. Comparing with other general-purpose runtime engines in China

|| 2D | 3D|
| ---------|------------------------------------------------------------------------------------------------------------------------------|
| Android | Increase by 85% | Increase by 90%.|
| IOS | Increased by 240% | Increased by 270%.|

####In terms of expansion

1. LayaNative 2.0 supports single-threaded and double-threaded modes. Developers decide which mode to use according to the actual test results of their projects.

- Single thread mode: JS and Render run in one thread.

Advantages: No delay in operation (e.g. touch, key).
- Disadvantage: Performance is not as good as dual-threaded mode.

- Two-threaded mode: JS and Render run in their respective threads.

-- advantage: higher performance than single threaded version.
- Disadvantage: The operation will have half a frame, the maximum delay to one frame (e.g. touch, key).

2. Supporting graphics card texture compression not only improves the rendering efficiency, but also reduces the memory occupation.

3. Optimized secondary development makes it easier to understand and easy for developers to use.

####Provide more convenient debugging function in ease of use

**Android platform can debug JavaScript on-line**

In LayaNative 1.0, you can only call console. log or alert functions to debug JavaScript code in your project. Debugging JavaScript code using Chrome browser is officially supported in layaNative 2.0. Chrome debugger can add breakpoints to the code, code tracking and other functions.

**Test App Support Scanning Start Project**

In order to enable developers to debug and develop faster, the new version of test App adds the function of scanner to start App, eliminating the trouble of manually entering the URL when debugging.



##Layacloud features

LayaCloud is a cloud service solution launched in 2.0. It provides basic services for developers, such as user authentication (login or authorization), server data access and reading, room creation and management, matching, in-room broadcasting, frame synchronization, etc. Developers don't need to care about the deployment and load of servers. Through the API interface provided by LayaCloud, they can easily and quickly implement online games by using the front-end development language directly. When faced with complex server-side requirements, developers can also write configuration files and server-side logic scripts on the client side to implement functions that LayaCloud basic API does not provide or other game business logic.

LayaCloud Technical Document Page: https://wiki.cloud.layabox.com/





For a more detailed introduction to the new 2.0 features, see Layabox's Public Document on Microsoft: https://mp.weixin.qq.com/s/lHI3tCozcFd_8fZ1PFJ8Xg



If there are BUG problems with engines and tools in the development process or suggestions, please visit the community for submission: http://ask.layabox.com