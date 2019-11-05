#Frequently Asked Questions



###3. What tools are used to export the 3D resources of the engine and what are the considerations?

**answer**LayaAir Engine's 3D resources, such as model, animation, etc., need to export FBX format files using 3D production software, 3D max, Maya and so on, then import them into Unity, and install the 3D export plug-in provided by LayaAir in Unity. The latest version is beta5, and the download address is https://ldc.abox.com/load/2.0.0beta5/unityplugin/Layagin Plugin_Airbeta.un. Itypackage

Later updates can be downloaded from the official website, or the connection version number can be modified.

A description of the rules and precautions for the use of plug-ins has been included in the plug-ins.

![] (img/1.gif)

Animator animation support (can produce skeleton animation, rigid animation, material animation and other composite animation)
Currently supported attributes
Skeletal animation: * does not support the Humanoid type of skeletal animation created by oneself in Unity for the time being.**Avatar in the Animator component cannot be empty.**
Material animation/rigid body animation: only support the physical rotation, translation and scaling attributes, the basic attributes of material, not support the opening/failure of components and nodes. If developers have requirements for new properties, please post feedback and provide resource files. We will add them according to the situation.**。 Avatar in the Animator component must be empty.**

**LayaAirRun instructions: 1. Node environment must be installed, express expansion module (tool built-in express, if not normal use, please install it); 2. Ensure that there is a camera in the scene, adjust the camera position, angle, and eventually layaAir will run in accordance with the results of Unity.**