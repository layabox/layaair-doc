# 从Unity中编辑并导出模型动画

######  *version :2.1.1beta   Update:2019-7-27 插件版本：2.1.0*

Skeletal animation of character skins is widely used in 3D games. The animation model of character can be imported into unit to edit, and then exported to LayaAir for use.

> Here we use the skinned skeleton animated monkey as an example

####Import model

In Unity Explorer, right-click Import New Assets FBX format model resources, mapping resources, and drag the model to the scene, adjust the texture map and save it. In this case, save the scene named "monkey".

![] (img/1.png)<br> (Figure 1)

####Create an Animation Controller

In Unity Explorer, right-click Create Animator Controller and name it according to the animation. In this case, it is called LayaMonkey Controller.

![] (img/2.png)<br> (Figure 2)

####Edit Animation Controller

Double-click to open the animation controller, the view area will appear animation controller editing interface; click on the right side of the imported model "triangle", where the "playback flag" file is the animation file of the model, default name is "Take 001", drag it to the animation controller editing interface (Figure 3), save it.

![] (img/3.png)<br>

(Fig. 3)

####Binding animation controller

Select the character model in the scene, and assign the character animation controller to the animation component of the selected model (Figure 4). If there is no animation component, you need to bind one to the character, otherwise the exported animation cannot be played.

![] (img/4.png)<br> (Figure 4)

After the above steps, we finished editing the character animation in Unity, click the button to run in Unity, then we can see the animation playing. If there is no problem with animation playback, you can export the resources required by LayaAir according to the previous "Unity Plug-in Tools Use" tutorial method.

**Tips: Other animations are processed in the same way in Unity. The following steps are needed: adding animation components to scene models - creating animation controllers - adding animation controllers to animation controllers - adding animation controllers to animation components of models.**

###Attention should be paid to animation export

#####Animation File Relevance

Multiple animation files cannot be renamed.

#####Rigid-body animation correlation

When using rigid animation, the Animator Controller of the animated object does not add Avatar

#####Skin Skeleton Animation Related

1. There can be no nodes with different names in the skeleton of an object associated with a skeletal node.

2. Animation type only supports Generic type.

3. Do not check the Optimize Game Object option

![] (img/6.png)<br> (fig. 6)

#####Animation Controller Type

Animator override Controller animation controller is not supported

![] (img/7.png)<br>