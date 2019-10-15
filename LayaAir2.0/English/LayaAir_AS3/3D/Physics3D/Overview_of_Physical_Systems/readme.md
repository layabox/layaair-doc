#An Overview of Physical Systems

###### *version :2.1.1   Update:2019-7-19*

Physical engine calculates motion, rotation and collision responses by giving real physical properties to rigid objects. Developers use physical engines to simulate efficiently and realistically**collision**,**gravity**And so on.

Necessary conditions for collisions between objects in LayaAir3D physical world:

(1) Both objects have rigid bodies.

(2) Two objects, one with Rigidbody rigid body and the other with Physics Collider.

**Rigidbody3D**Rigid bodies enable objects to move under physical control. They are dynamic colliders.

**Physicscollider**They can interact with rigid bodies, but because they do not have rigid bodies, they do not move in response to collisions. They are often used to make ground, scenes, etc. They are static colliders.

At the same time, in layaair3d physical system, there are two ways to detect collision, one is Collider, the other is trigger.

LayaAir3D physical system will be explained in detail in this chapter.

