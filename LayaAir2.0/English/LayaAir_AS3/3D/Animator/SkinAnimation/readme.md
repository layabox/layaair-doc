#The Use of Skeletal Animation

###### *version :2.1.0beta   Update:2019-6-13*

Skeletal animation is also called skin animation, which mainly produces animation by changing the vertex of the model. Skeletal animation is also the most commonly used animation, such as the monkey model which often appears in the examples is the use of skeletal animation.

Let's use the monkey model as an example.

First, look at the monkey model prepared beforehand, as shown in Figure 1.

![] (img/1.png)<br> (Figure 1)

Then we create an animation controller (named Laya Monkey Controller) and add Take 001 animation.

![] (img/2.png)<br> (Figure 2)

Add the animator component to the monkey model, and add the animation controller and mesh we prepared in advance to the animator. As shown in Figure 3

! [] (IMG / 3. PNG) < br > (Figure 3)

After the above things are ready, we can choose to preview the animation, confirm that we can export the animation without any problems. Here we choose the way to export the whole scene together. Select the scenario option in the export option and click the Export button to export the scenario.

![] (img/4.png)<br> (Figure 4)

For a more detailed description of the export panel, you can see**Unity plug-in use**Chapter.

>**Note before exporting:**

! [] (IMG / 5. PNG) < br > (Figure 4)

Animation type only supports generic types.

Optimize Game Objects cannot be checked

---

After exporting the scenario, we load it to see the animation effect of the export.


```typescript

//加载我们导出的场景
Scene3D.load("res/LayaScene_LayaMonkey/Conventional/LayaMonkey.ls",Handler.create(this,function(s:Scene3D):void{
	Laya.stage.addChild(s);
}));
```


![] (img/6.gif) < br > (fig. 6)