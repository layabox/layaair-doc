#BaseMaterial Foundation Material

###### *version :2.1.0beta   Update:2019-5-14*

`BaseMaterial`It is the parent class of all materials. It defines some common attributes, such as some common rendering modes, corresponding loading interfaces, and common rendering modes.

![] (img/1.png)<br> (Figure 1)

The common rendering modes are: * * renderqueue ﹣ opaque**Opaque**RENDERQUEUE_ALPHATEST**Transparent cutting,**RENDERQUEUE_TRANSPARENT** Transparency, these three modes.

> Note: Subclass material`rendermode`Interface is only the encapsulation and implementation of the parent BaseMaterial rendering mode, which requires developers to view the corresponding API interface themselves.

After finishing the basic functions of materials, we will introduce various commonly used materials in detail.
