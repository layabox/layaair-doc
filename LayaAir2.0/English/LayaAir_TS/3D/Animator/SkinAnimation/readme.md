#The Use of Skeletal Animation

###### *version :2.1.0beta   Update:2019-6-13*

Skeletal animation is also called skin animation, which mainly produces animation by changing the vertex of the model. Skeletal animation is also the most commonly used animation, such as the monkey model which often appears in the examples is the use of skeletal animation.

Let's use the monkey model as an example.

First, look at the monkey model prepared beforehand, as shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

Then we create an animation controller (named layamonkeycontroller) and add the take 001 animation.

! [] (IMG / 2. PNG) < br > (Figure 2)

Add the Animator component to the monkey model, and add our pre-prepared animation controller and grid to the Animator. As shown in Figure 3

![] (img/3.png) < br > (fig. 3)

After the above things are ready, we can choose to preview the animation, confirm that we can export the animation without any problems. Here we choose the way to export the whole scene together. Select the scenario option in the export option and click the Export button to export the scenario.

![] (img/4.png)<br> (Figure 4)

For a more detailed description of the export panel, you can see**Unity plug-in uses**Chapter.

>**Note before exporting:**

![] (img/5.png) < br > (fig. 4)

Animation Type supports only Generic types.

Optimize Game Objects cannot be checked

---

After exporting the scenario, we load it to see the animation effect of the export.


```typescript

//加载我们导出的场景
Laya.Scene3D.load("res/LayaScene_LayaMonkey/Conventional/LayaMonkey.ls",Laya.Handler.create(this,function(s){
	Laya.stage.addChild(s);
}));
```


![] (img/6.gif) < br > (fig. 6)