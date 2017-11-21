## Animation with LayaAir3D (part 2)

In the previous chapter, we learned about the unity processing and export of skeletal animation. In this section, we will continue to introduce the production and use of material animation and steel body animation, which are widely used in the special effects of 3D games.

### Material animation

Skeletal animation is mainly to change the model vertex animation, and material animation is to change the color of the material and mapping animation.

In three-dimensional software, such as 3ds max, although you can make material related animation, but exported to FBX format, unity can not identify, and can not be exported to the LayaAir 3D engine identified material animation. Therefore, the material animation of the game model must be made in unity, and some settings can be exported to use for the LayaAir 3D engine.

Here we will use neon light material animation (Figure 1) effect to explain the creation of animation in unity and export method, the steps are as follows.

![图1](img/1.gif)<br>（Picture 1）

#### Import model, modify material type

The air conditioner case and neon lamp band model made in 3ds Max are exported to FBX, and then imported into unity (developers can try to make material animation in 3ds Max and export it, which can be found in unity can not play).

Drag and drop into the scene, select the animation model you need to make, modify the material in the right interface, Shader type is the particle additive color type Particles/Additive (currently only support the type of animation, other types of shader export will be wrong).

![图2](img/2.png)<br>（Picture 2）



#### Drag to create material animation

1. After modifying the material type, choose the animation model, click the menu bar window, open the animation editing interface, shortcut key Ctrl+6, Animation.

2. Click the Create button to create the animation and name it. This example is called uvAnimation. After saving, the animation file uvAnimation will be generated in the resource manager.

3. Select the time axis time, modify the X UV property of Offset material in the direction of the adjustment, every 0.05 seconds a UV position 0.25 (equivalent to 25% map to move to the left, you can see the neon width) model of material changes, according to the time order of adjustment, the formation of an animation cycle.

4. The curve changes of animation frames, the default for the linear sliding animation, does not meet our demand for animation, modify the constant changes, play the view, according to the needs of all material animation. Of course, if you need to make flowing water, floating clouds animation, you can use linear changes.

**tips：Use standard Shader type to make material animation can also, but pay attention to if the animation edit interface left box appeared LayaAir does not support the attribute, such as material Emission attribute, in the resource export will be wrong, can be removed right, you can export normally**

This way of making animation is basically the same as that in 3ds max, which allows the art designer to edit directly in unity (Figure 3).

![图3](img/3.gif)<br>（Picture 3）



#### Creating animation controllers

Create the animation controller and the same as before, to create an animation controller in Explorer button named uvAction, double-click to open, will create a step of the uvAnimation animation file drag into the animation controller.

Select the model, drag the animation controller into the animation component of the model, and click unity to run, so we can see the animation playing according to our requirements (Figure 4).

![图4](img/4.gif)<br>（Picture 4）



#### Exporting and using animation resources

Edit the animation in unity, export the Sprite3D type .lh resource with the LayaAir plug-in. If there is no error in the export, copy the resources to the H5 directory of the project, then you can load or preload the item directly with the Sprite3D.load () method in the project.

Refer to the following code, and finish the animation 2000 milliseconds after the animation stops (Figure 1).

```java
			//创建加载材质动画模型
			var box:Sprite3D=Sprite3D.load("LayaScene_uvAction/uvAction.lh");
			//模型与材质、动画加载完成后回调
			box.on(Event.HIERARCHY_LOADED,null,function():void{
				
				//获取模型上的动画组件
				var ani:Animator=box.getChildAt(0).getComponentByType(Animator) as Animator;
				//动画2000毫秒后停止
				Laya.timer.once(2000,null,function():void{	ani.stop();});
			});
			scene.addChild(box);
```



### Transform animation

Transform animation, refers to the model does not change the vertex, material on the basis of the model only rotate, zoom, displacement animation, this animation is often used in the game, such as the soles of the feet, knife light, etc.. Of course, steel animation and material animation are often used together.
  

Transform animation and material animation are also different in the production, material animation must be made in unity, otherwise it can not identify and play animation, and steel animation can be produced in the 3D software, and then imported into unity, it can be recognized.

It is recommended to edit animation in unity, transform and material animation combined with particle effect animation, the effect is better, 3D software only provides basic model import!

The following is the effect of transform animation (Figure 5), the use of different materials for the four model pieces, and then the model was rotated and scaled to modify animation.

![图5](img/5.gif)<br>（Picture 5） 



### Camera animation

LayaAir camera is not yet exported. In the future version, the camera can be exported to the engine. Therefore, if the camera animation is made in unity, it can be used in the game after export.

Its animation method in unity is consistent with that of steel body animation, and its attributes can be modified by animation. Using the loading method is also consistent.

