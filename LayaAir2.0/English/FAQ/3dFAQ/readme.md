# 引擎常见3D问题Frequently Asked Questions



### 3，引擎的3d资源用什么工具导出和注意事项有哪些？

**答**： LayaAir 引擎的3d 使用的资源，比如模型，动画等，需要用3D制作软件，3Dmax ，maya等制作之后导出FBX格式文件，然后导入到Unity中，并在Unity中安装LayaAir提供的3d导出插件，目前最新版为beta5，下载地址为https://ldc.layabox.com/download/2.0.0beta5/unityplugin/LayaAirUnityPlugin_beta.unitypackage

以后有更新可以去官网下载，或者修改连接版本号。

插件的使用规则及注意事项的介绍，已经包含在插件里，

![](img/1.gif)

 Animator 动画支持（可以制作骨骼动画，刚体动画，材质动画等复合动画）
​             现支持的属性 
​                    骨骼动画：*暂不支持unity中自己创建的Humanoid类型的骨骼动画*，**Animator组件中的Avatar不能为空。**
​                    材质动画/刚体动画：只支持对物理的旋转平移缩放属性，材质的基本属性，不支持组件跟节点的开启/失效。如果开发者对新的属性有要求，请跟帖反馈，并提供资源文件，我们会根据情况添加**。Animator组件中的Avatar必须为空。**

**         LayaAirRun使用须知：                1.必须安装Node环境，express拓展模块（工具内置了express，如果无法正常使用，请自行安装）；                2.场景中确保有一个照相机,自行调整照相机位置，角度，最终layaAir运行效果会与Unity运行结果保持一致。**