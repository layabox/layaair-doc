# LayaNative2.0

For developers, the biggest improvement of LayaNative 2.0 is full support for LayaAir3D, which facilitates the release of 3D-App versions for developers. In addition, LayaNative 2.0 overturns the five-generation LayaBox Native solution, aiming to be faster, more open, simpler and better 3D-enabled. Laya Native 2.0 adopts the patent technology design concept of WebGL+and is more advanced and open. Like WebGL protocol, it is a compact and expansible solution with indefinite function rules. The following is a brief introduction from four aspects: engine structure, performance, function and ease of use.

##I. Engine Architecture
The project developed by the developer with LayaAir engine can be published into either browser or native App. The following is the structure diagram of the engine and the flow chart of the developer's development.
![图](img/1.jpg)

![图](img/2.png)

##Two, performance

After code refactoring, LayaNative 2.0 has greatly improved its performance compared with version 1.0.
1. Contrast Laya Native 1.0

|| 2D | 3D|
|:---:::::::::::::::::::---::|
| Android | Increase by 10% | Increase by 90%.|
| IOS | Increase by 13%| Increase by 270%.|

2. Comparing with other general-purpose runtime engines in China

|| 2D | 3D|
|:---:::::::::::::::::::::::----::::::::::.|
| Android | Increase by 85% | Increase by 90%.|
| IOS | Increase by 240% | Increase by 270%.|



##III. Extended Functions

1. LayaNative 2.0 supports single-threaded and double-threaded modes. Developers decide which mode to use according to the actual test results of their projects.

* Single thread mode: JS and Render run in one thread.
* Advantages: No delay in operation (e.g. touch, key).
* Disadvantage: Performance is not as good as dual-threaded mode.
* Two-threaded mode: JS and Render run in their respective threads.
* Advantages: Performance is higher than single-threaded versions.
* Disadvantage: The operation will have half a frame, the maximum delay to one frame (e.g. touch, key).

2. Supporting graphics card texture compression not only improves the rendering efficiency, but also reduces the memory occupation.

3. Optimized secondary development makes it easier to understand and easy for developers to use. See the documentation for details:
Https://github.com/layabox/layaair-doc/tree/master/layaair2.0/chinese/layanenative/secondary_development


##IV. Usability

###1. Provide more convenient debugging function

1) Android platform can debug JavaScript on-line

In LayaNative 1.0, you can only call console. log or alert functions to debug JavaScript code in your project. Debugging JavaScript code using Chrome browser is officially supported in layaNative 2.0. Chrome debugger can add breakpoints to the code, code tracking and other functions.

![图](img/debug_connected.png)

See the documentation for details:
Https://github.com/layabox/layaair-doc/tree/master/LayaAir2.0/China/LayaNative/real_device_debugging

2) Test App support scanner startup project

In order to enable developers to debug and develop faster, the new version of test App adds the function of scanner to start App, eliminating the trouble of manually entering the URL when debugging.

![图](img/app_debug_1_0.png)

See the documentation for details:
Https://github.com/layabox/layaair-doc/tree/master/LayaAir2.0/China/LayaNative/How_To_Use_Runtime



###2. You can customize a more content-rich startup interface

LayaNative 2.0's loading view is developed in platform native language, Android uses Java language and IOS uses Objective-C language. Compared with Loading View developed in JavaScript language in 1.0, 2.0 provides richer customization capabilities. Not only can you change pictures, but developers can also use platform language to achieve the functions they want.

![图](img/loadingview_2_0.png)

See the documentation for details:
Https://github.com/layabox/layaair-doc/tree/master/layaair2.0/chinese/laynative/loading'view'new