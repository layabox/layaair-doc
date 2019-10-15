#The Use of Rigid Body Animation

###### *version :2.1.0beta   Update:2019-6-13*

Rigid animation, also known as transformation animation, refers to the animation that only rotates, scales and displaces the model without changing the vertex and material of the model. This animation is often used in games, such as foot halo, knife light, etc. Of course, rigid animation and material animation are often used together.

Rigid animation is different from material animation in production. Material animation must be made in unit, otherwise it can not recognize and play animation. Rigid animation can be produced in 3D software and then imported into unit, which can be recognized.

It is suggested to edit the animation in untiy, use the rigid body animation and material animation together, with particle effect animation, the effect is better. The 3D software only provides basic model import!

The following is the rigid animation effect (Figure 1). The following animation is a mobile selection operation for a Cube.

>Note that when exporting rigid body animation, the corresponding animator component cannot add Avatar

![] (img/1.gif) <br> (Fig. 1)

