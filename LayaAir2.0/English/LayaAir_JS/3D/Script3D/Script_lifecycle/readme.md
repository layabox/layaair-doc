#Script life cycle

###### *version :2.1.0beta   Update:2019-6-26*

Script components have a complete life cycle, scripts need to be hung on any game object, and the same object can be hung different scripts, each executes its own life cycle, they are combined with each other and do not interfere with each other. All the methods in the script life cycle are self-tuned by LayaAir3D system. There is no need to call them manually. The main methods are initialization, physical events, update callbacks, rendering and destruction.

In the life cycle function diagram below, the red life cycle function can be taken over by developers themselves.

![] (img/1.png)<br>

(Figure 1) Life cycle function