# 场景渲染配置介绍

###### *version :2.0.1beta   Update:2019-3-19*

### Scene3D概述

Scene is the 3D World Container of LayaAir Engine, which is used to present the 3D picture of the game and load various 3D elements. Cameras, lights, characters and objects in the game need to be placed in the scene to display the picture, which is equivalent to a game 3D player or a 3D view.

Through the inheritance relationship of Scene3D, we can see that it inherits from Sprite class. So it can be treated as a display object in 2D.

In the LayaAir engine, 3D and 2D can be mixed, and the Scene 3D scene created and the Prite 2D container or element can be loaded onto the stage at the same time.

###Export Illumination Rendering Configuration in Unity

Developers can edit rendering settings to render better game scenes. Editors in Unity can see the rendering effect more intuitively, so here we recommend developers edit the rendering settings in Unity, and then export the usage scenarios.

####Ligthing Rendering Support

In`window-lighting-settings`Open the Illumination Rendering Panel.

![] (img/1.png)<br> (Figure 1)

**(1) Skybox Material**(material) Sky Box.

​**Tip**Use Shader in the LayaAir3D/Sky directory.

**(2) Environment Lighting**Ambient light

Support the use of Color, Ambient Mode-Realtime (real-time) lighting.

**(3) Environment Reflections**Environmental reflection

Custom custom environment reflection is supported.

**(4) Lightmapping Setting**Illumination mapping settings

Full support, but not Directional Mode

​**Tip**Non-Directional mapping must be used for baking illumination mapping

**(5) other setting**Other settings

Fog Scene Atomization

**(6) Global maps**

Exportable, consistent with PC, Mac&Linux Standalone.

####Export scenario

In the front[Unity插件篇](http://localhost/LayaAir2_Auto/%E5%9C%B0%E5%9D%80)There is a simple use of plug-ins to export scenarios, which will be explained in detail here.

After confirming the scenario to be exported, open the Export Plug-in Panel and click**Browse**Select the export directory, select the export directory, and click**LayaAir Export**Export scenarios.

![] (img/2.png)<br> (Figure 2)

Let's look at the exported scenario (Figure 2):

![] (img/3.png) < br > (fig. 3)

Test. LS is the scene file that we export. It records all kinds of data, models, illumination mapping, location and so on.

Under the Library folder is the default collision box.

The scenario resource directory under Assets folder,.Jpg,.Png and other files are texture maps.

Under the Materials file is the material ball.


