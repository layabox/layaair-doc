# 动画多层混合

###### *version :2.1.0beta   Update:2019-6-13*

Dans le diagramme d 'effet ci - dessus, on utilise également un mélange multicouche d' animation.Layaair3d utilise une "couche d 'animation" pour gérer des machines d' état complexes dans différentes parties du corps.Par exemple, vous pouvez utiliser la couche inférieure (animation) pour gérer les mouvements et les mouvements; utiliser la couche supérieure (animation) pour contrôler les mouvements de jet / design.

On peut être ici, Demo.[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)) remplace certaines opérations pour voir les effets.


```typescript

//在混合模式的按钮监听事件中改变播放层
this.blendType++;

//在切换动作的按钮监听事件中播放动作
switch (this.blendType) {
    case 0: 
        if (this.motionCross) {
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引使用混合模式，混合了0层和1层的动画
            this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
            this.animator.crossFade(this.motions[this.motionIndex], 0.2, 1);
        } else {
            //使用普通模式播放
            this.animator.play(this.motions[this.motionIndex], 0);
            this.animator.play(this.motions[this.motionIndex], 1);
        }
        break;
    case 1: 
        if (this.motionCross)
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
            this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
        else
            this.animator.play(this.motions[this.motionIndex], 0);
        break;
    case 2: 
        if (this.motionCross)
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用1层的动画
            this.animator.crossFade(this.motions[this.motionIndex], 0.2, 1);
        else
            this.animator.play(this.motions[this.motionIndex], 1);
        break;
}
```


[] (IMG / 1.gif) <br > (Figure 1)

Le mélange multicouche d 'animation produit plus d' effet, ou l 'on espère que le développeur pourra lui - même opérer un transfert de plusieurs actions pour les sentir.
