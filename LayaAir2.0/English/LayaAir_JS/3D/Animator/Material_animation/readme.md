# 材质动画的使用

###### *version :2.1.0beta   Update:2019-6-13*

Material animation is animated by changing the color and mapping of material.

In three-dimensional software, such as 3ds max, although material-related animation can be produced, when it is exported to FBX format, unit can not recognize, nor can it be derived to material-related animation recognized by LayaAir 3D engine. Therefore, the material animation of the game model must be made in Unity, and some settings must be exported before it can be used for the LayaAir 3D engine.

Next we will use neon material animation (Figure 1) effect to explain how to create animation in Unity and derive the use method, the steps are as follows.

![] (img/1.gif) <br> (Fig. 1)

####Modify material type

Drag in a cube in Unity and modify the material.

![] (img/2.png)<br> (Figure 2)

####Creating Material Animation

1. After modifying the material type, choose the same model to make animation, click Animation under the menu bar window to open the animation editing interface, and the shortcut key Ctrl+6.

2. Click the Create button to create the animation and name it. In this case, the default name New Animation is used. After saving, the animation file New Animation will be generated in the resource manager.

3. Choose the time on the time axis, modify the diffuse reflection color of the material, and adjust several colors in repeated operations.

4. Modify the curve change of the animation frame, default is linear sliding animation, which does not meet our animation needs. Modify it to constant change, play and view. Material animation is completed as required. Of course, if you need to make animations of running water and floating clouds, you can use the linear mode.

![] (img/3.png) < br > (fig. 3)

####Create an Animation Controller

As before, create an animation controller by right-clicking in Explorer, named Cube 1. Double-click to open and drag the animation file New Animation created in the previous step into the animation controller.

Select the model, drag the animation controller into the animation component of the model, click unity to run, and we can see that the animation plays according to our needs (Figure 4).

![] (img/4.gif) < br > (fig. 4)

####Export and use animation resources

Edit animation in unit, export scenario type. LS resources with LayaAir plug-in. If there is no error when exporting, copy the resources to the project resource directory, then it can be directly used in the project.`Scene3D.load()`Method loading or preloading.

Refer to the following code, because the discoloration is too slow, we adjusted the speed, such as (Figure 1).


```typescript

//加载场景
Laya.Scene3D.load("res/threeDimen/scene/materialScene/Conventional/layaScene.ls", Laya.Handler.create(this, function(scene) {
    Laya.stage.addChild(scene);
    var camera = scene.getChildByName("Main Camera");
    camera.addComponent(CameraMoveScript);
}));

```


