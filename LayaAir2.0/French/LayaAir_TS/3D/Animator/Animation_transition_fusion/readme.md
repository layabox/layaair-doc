#Animation transition Fusion

###### *version :2.1.0beta   Update:2019-6-13*

La surfusion d 'animation est utilisée pour une transition sans heurt d' un état d 'animation à un autre pendant une période donnée.Si le passage d 'un mouvement à un autre est très court, la transition se déroule normalement de manière satisfaisante.Notre exemple suivant illustre l 'effet combiné des mouvements de course et de visée.

Lors de la transition d 'une animation, la lecture d' une animation doit être utilisée`crossFade`Interface.

[] (IMG / 1.png) <br > (Figure 1)

Les résultats de la démonstration proviennent d'exemples officiels ()[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)).


```typescript

//正常的动画播放
this.animator.play(this.motions[this.motionIndex], 0);

//在当前动画状态和目标动画状态之间进行融合过渡播放
//第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
```


Dans la figure 2 ci - dessous, la fusion de transition animée est utilisée et la figure 3 n 'est pas utilisée.La rigidité de l 'action de commutation est plus évidente lorsque l' on n 'utilise pas la figure 3 d' une animation excessive.

[] (IMG / 2.gif) (Figure 2) [] (IMG / 3.gif) (Figure 3)

