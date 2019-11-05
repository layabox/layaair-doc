#Detailed explanation of particle properties

###### *version :2.1.1beta   Update:2019-8-2*

![] (img/1.png)<br> (Figure 1)

Detailed usage of particle systems can be viewed[Unity官方文档](https://docs.unity3d.com/Manual/PartSysReference.html)。 Here is a brief introduction to the part of the LayaAir export tool that supports exports.

**Be careful:**If there are unsupported parts in the export, unpredictable errors may occur after the export.

---

**Foundation panel**

One`Duration`Particle duration
Two`Looping`Whether to circulate
Three`Startdelay`Particle Start Delay
1. * Constant* constant
2. * Random Between Two Constant* Maximum and Minimum Constants
Four`StartLifetime`Particle life
1. * Constant* constant
2. * Random Between Two Constants * Random from the Maximum to the Minimum
Five`StartSpeed`Particle velocity
1. * Constant* constant
2. * Random Between Two Constants * Random from the Maximum to the Minimum
Six`StartSize`Start size
1. * Constant* constant
2. * Random Between Two Constants * Random from the Maximum to the Minimum
Seven`3DStartSize`3D Start Size
1. * Constant* constant
2. * Random Between Two Constants * Random from the Maximum to the Minimum
Eight`StartRotation`Start spinning
1. * Constant* constant
Nine`3DRotaion`3D Rotation Parameters
1. * Constant* constant
2. * Random Between Two Constants * Random from the Maximum to the Minimum
Ten`RandomizeRotation`Probability of Random Rotation
Eleven`StartColor`Start color
1. * Color* Constant Colors
2. * Random Between Two Colors * Random values in two colors
Twelve`GravityModifier`Gravity correction
Thirteen`Simulation Space`Simulation space
1. * local* model
2. * Hierarchy * World
Fourteen`ScalingMode`Zoom mode
1. * Hierarchy * Hierarchy * hierarchical scaling
2. * local * self-scaling
Fifteen`Play On Awake`Play at the beginning
Sixteen`Max Partticles`Maximum number of particles
Seventeen`AutoRandomSeed`Free rotation speed

---

**Emission**Transmitting module

`Rate over Time`Number of emitted particles

`Bursts`Number of emitted particles

---

**Shape**Shape module

The module defines the size and shape of the particle launcher.

One`Sphere`The Ball
1. * Radius* radius
2. * Emit from shell * emitted from shell
3. * Randomize Direction * Randomize Direction * Randomization Direction
Two`Hemisphere`Hemispherical shape
1. * Radius* radius
2. * Emit from shell * emitted from shell
3. * Randomize Direction * Randomize Direction * Randomization Direction
Three`cone`cone
1. * Angle*Angle*Angle
2. * Radius* radius
3. * Emit from * Launch
4. * Base*Foundation
1. * Base Shell* shell-based
2. * Volume * Volume * Volume
3. * Volume Shell * Volume Shell * Volume Shell
5. * Randomize Direction * Randomize Direction * Randomization Direction
Four`Box`Box shape
1. * Box X * Box X
2. * BoxY * Box Y
3. * BoxZ * Box Z
4. * Emitform * Launch
One*Volume*
5. * Randomize Direction * Randomize Direction * Randomization Direction
Five`circle`Annular
1. * Radius* radius
2. * arc * angle
3. * Emit From Edge* Edge-based emission
4. * Randomize Direction * Randomize Direction * Randomization Direction

---

**Velocity over Lifetime**Speed change based on life

One
1. * Constant * Constant * Constant * Constant mode. Velocity is constant.
2. * Curve * line mode, particle velocity moves with lifetime
3. * Random from two Constant* Random velocity model
Two`Space`space
1. * Local* Model Space
2. * World* World Space

---

**Color over Lifetime**Life-based color change

One`Color`colour
1. * Gradient * Gradient * Gradient
2. * Random between two Gradients* Random values in two gradients

---

**Size over Lifetime**Change in size based on life

One`Separate Axes`Axis separation
1. * size*size*
1. * Curve* curve
2. * Random Between Two Contants* Random values in two constants
Two`Separate Axes`Selection of zoom axis
1. * size*size*
1. * Curve* curve
2. * Random Between Two Contants* Random values in two constants

---

**Texture Sheet Animation**Picture animation

One`Tiles`Tiling
Two`Animation`animation
1. * Single Row * single line
2. * whole Sheet * whole table
Three`Random Row`Random row
Four`Frame over Time`Animation frame changes with time
1. * contants * constant
2. * curves* curve
3. * Random Between Two Contants* Random values in two constants
Five`Start Frame`Starting frames
One*Contant*
2. * Random Between Two Contants* Random values in two constants
Six`Cycles`cycle
Seven`Flip U`Flip U
Eight`Flip V`Flip V

---

**Rotation over Lifetime**Rotating Change Based on Life

One`Separate Axes`Axis Separation Unselected
1. * Angular Velocity*Angular Velocity*
2. * Constant* constant
3. * Curve* curve
4. * Random Between Two Contants* Random values in two constants



---

**Render**Render Mode

This mode is supported by rendering mode

One`RenderMode`Render Mode
1. * Billboard * particles are always camera-oriented
Two*Stretched Billboard*
1. * Camera Scale* Camera Ratio
2. * Velocity Scale * Speed Ratio
3. * Length Scale* Length Ratio
3. * Horizontal Billboard* particle plane parallel to the XZ "bottom" plane
4. * Vertical Billboard* particles are upright on the Y axis, but facing the camera
5. * Mesh* particles are rendered from 3D meshes rather than textures.
- (Support) But if you have a model with a very large area, you will report an error because index exceeds 65536.
Two`Sorting Fudge`The smaller the number, the higher the rendering priority.

