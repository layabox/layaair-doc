#The Use of Camera Animation

###### *version :2.1.0beta   Update:2019-6-13*

LayaAir3D plug-in supports camera animation export. It is recommended to edit in Unity before exporting.

The following example we now edit a simple camera animation in Unity, which is just a simple mobile camera. Like material animation, add animator components to the camera and set animation on it. Use after export.

In this animation, we are just constantly changing the location of the camera. Note that the location of Cube is unchanged.

![] (img/1.png)<br> (Figure 1)

After exporting the scenario, you can see the effect by adding it to the scenario.


```typescript

Laya.Scene3D.load('LayaScene_scene/Conventional/scene.ls',Laya.Handler.create(this,function(scene){
    Laya.stage.addChild(scene);
}));
```


![] (img/2.gif) <br> (Figure 2)