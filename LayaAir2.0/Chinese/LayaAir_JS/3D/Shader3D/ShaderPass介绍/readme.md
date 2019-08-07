# ShaderPass介绍

###### *version :2.1.1   Update:2019-8-7*

​		SubShader 中定义了一系列的 **Pass（通道）** 。每个Pass定义了一次完整的渲染流程。注意Pass数目过多会造成渲染性能的下降。

​		ShaderPass中比较重要的属性：

​		`renderState` 获取渲染状态。获取后还能对此进行修改。
