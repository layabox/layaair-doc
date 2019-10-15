#An Overview of Physical Systems

###### *version :2.1.1   Update:2019-7-19*

Physical engine calculates motion, rotation and collision responses by giving real physical properties to rigid objects. Developers use physical engines to simulate efficiently and realistically**collision**,**gravity**And so on physical effect.

Necessary conditions for collisions between objects in LayaAir3D physical world:

(1) Both objects have rigid bodies.

(2) Two objects, one with Rigidbody rigid body and the other with Physics Collider.

**Rigidbody3D**Rigid bodies enable objects to move under physical control. They are dynamic colliders.

**Physics Collider**They can interact with rigid bodies, but because they do not have rigid bodies, they do not move in response to collisions. They are often used to make ground, scenes, etc. They are static colliders.

At the same time, in LayaAir3D physical system, there are two ways to detect collision, one is collider, the other is trigger.

In this chapter, we will explain the layaair3d physical system in detail.

