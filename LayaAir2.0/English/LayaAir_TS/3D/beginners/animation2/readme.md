#LayaAir3D Animation II

In the last chapter of the course, we learned about the unit processing and export of skeletal animation. In this section, we will continue to introduce the production and use of material animation and rigid animation, which are widely used in the special effects of 3D games.

###Material animation

Skeletal animation mainly produces animation by changing the vertex of the model, while material animation produces animation by changing the color and mapping of the material.

In three-dimensional software, such as 3ds max, although material-related animation can be produced, when it is exported to FBX format, unit can not recognize, nor can it be derived to material-related animation recognized by LayaAir 3D engine. Therefore, the material animation of the game model must be made in Unity, and some settings must be exported before it can be used for the LayaAir 3D engine.

Next we will use neon material animation (Figure 1) effect to explain how to create animation in Unity and derive the use method, the steps are as follows.

![1](img/1.gif)(Fig. 1) </br>



###Import model, modify material type

After the air-conditioning case and neon light belt made in 3ds Max are exported to FBX, they are imported into untiy (developers can try to make material animation in 3ds Max and export it for use, and it can be found that they cannot play it in unity).

Drag and drop into the scene, select the animation model that needs to be made, modify its material in the right interface, Shader type is Particles/Additive (currently only supporting animation of this material type, other shader types will report errors when exported).

![2](img/2.png)(Fig. 2) </br>



###Creating Material Animation

1. After modifying the material type, select the model to be animated, click animation under the menu bar window to open the animation editing interface, and press Ctrl + 6.

2. Click the Create button to create the animation and name it. In this case, it is named uvAnimation. After saving, the animation file uvAnimation will be generated in the resource manager.

3. Select the time on the time axis, modify the X direction in the UV attribute Offset of the material, adjust the position of the UV 0.25 every 0.05 seconds (equivalent to 25% width of the map moving to the left), you can see that the material of the neon model has changed, and adjust it in turn according to the time, forming an animation cycle.

4. Modify the curve change of the animation frame, default is linear sliding animation, which does not meet our animation needs. Modify it to constant change, play and view. Material animation is completed as required. Of course, if you need to make animations of running water and floating clouds, you can use the linear mode.

**Tips: Making material animation using standard Shader type is also possible, but note that if there are attributes that LayaAir does not support in the left box of the animation editing interface, such as material Emission attribute, when resources are exported, an error will be reported, and it can be removed by right-click to export normally.**

This method of animation production is basically the same as that in 3ds max, which allows art designers to edit directly in unit (Figure 3).

![3](img/3.gif)(Fig. 3) </br>



###Create an Animation Controller

Similar to previous animation controllers, right-click in Explorer to create an animation controller, named uvAction, double-click open, drag and drop the animation file uvAnimation created in the previous step into the animation controller.

Select the model, drag the animation controller into the animation component of the model, click Unity to run, we can see that the animation is playing according to our needs (Figure 4).

![4](img/4.gif)(Fig. 4) </br>



###Export and use animation resources

Edit the animation in unit, export Sprite3D type.lh resources with LayaAir plug-in. If there is no error when exporting, copy the resources to the project's H5 directory, then you can directly use Sprite3D. load () method to load or preload in the project.

Referring to the following code, the animation stops after loading the animation for 2000 milliseconds (Figure 1).


```typescript

......
//添加自定义模型
Laya.Sprite3D.load("h5/LayaScene_CeShiDemo/Cube.lh",Laya.Handler.create(this,function(sp:Laya.Sprite3D):void{
            var box:Laya.Sprite3D = scene.addChild(sp) as Laya.Sprite3D;
            // 获取模型上的动画组件
            this.ani:Laya.Animator = sp.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
            //动画2000ms后停止
            Laya.timer.once(2000,this,this.onLoop);
}));
......
private onLoop(){
 	 //停止动画播放 （把动画的播放帧速改为零）
     this.ani.speed = 0;
}
```




###Rigid Body Animation (Transform Animation)

Rigid animation, also known as transformation animation, refers to the animation that only rotates, scales and displaces the model without changing the vertex and material of the model. This animation is often used in games, such as foot halo, knife light, etc. Of course, rigid animation and material animation are often used together.

Rigid animation is different from material animation in production. Material animation must be made in unit, otherwise it can not recognize and play animation. Rigid animation can be produced in 3D software and then imported into unit, which can be recognized.

It is suggested to edit animation in unty, combine rigid animation with material animation, and add particle special effect animation. The effect is better. Three-dimensional software only provides basic model import.

The following is the rigid animation effect (Fig. 5). Different materials are used for the four model films, and then the model is rotated and scaled to produce animation.

![5](img/5.gif)(Fig. 5) </br>



###Camera animation

The layaair camera cannot be exported at present. In future versions, the camera can be exported to the engine for use. Therefore, if the camera animation is made in unity, the exported camera can also be used for control in the game.

Its animation method in Unity is consistent with rigid animation, and its attributes can be modified by animation. The same loading method is used.