# LayaAir3D概述

Through the example of 3D, we can see that a basic 3D world was born. Of course, the code for the example is relatively simple. To make a rich and colorful game world, we need to know more about the engine's functions.

Following is a brief introduction to the main elements of LayaAir3D. We will introduce these conceptual knowledge in detail in the follow-up tutorial, and gradually lead you to learn 3D knowledge.

###Scene3D Scenes:

Scene is the 3D World Container of LayaAir Engine, which is used to present the 3D picture of the game and load various 3D elements. Cameras, lights, characters and objects in the game need to be placed in the scene to display the picture, which is equivalent to a game 3D player or a 3D view.

###Sprite3D Wizard:

Sprite3D is the basic display list node of graphics in 3D. There are many kinds of elves, like`Sprite3D`Space elf, in the 3D world, causes the object to produce three-dimensional light and shadow changes, projection and other effects.`Light`Light sprites, for rendering`MeshSprite3D`The Grid Wizard,`SkinnedMeshSprite3D`Skin Mesh Elf,`TrailSprite3D`The trailing elf,`ShuriKenParticle`Particle effects elves and so on.

###Camera camera:

Camera cameras are also a genie. In 3D games, Camera is the equivalent of an eye, through which you can see the world. Everything is rendered through Camera.

###Material material:

Material quality is the material texture of objects, such as wood, metal, glass, hair, water, etc. Their roughness, glossiness, reflection, transparency, color, texture and other material properties are different.

###Component components:

​`Component`Components are the base classes attached to the content of all 3D objects. There are many kinds of components, such as`Animator`Animation components,`PhysicsCollider`Physical Collider and Physical Collider`RigidBody3D`Rigid bodies, these physical components, etc.

###Script 3D script:

​`Script3D`Scripts are used very frequently in the development process. A script is a special component that has its own life cycle for the convenience of developers. The function of script is also very large, such as role control script, NPC control script, scene object control script and so on, which achieves the separation of control and display.

##### 		