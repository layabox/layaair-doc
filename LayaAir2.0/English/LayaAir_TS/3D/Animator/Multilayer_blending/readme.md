#Multilayer Mixing of Animation

###### *version :2.1.0beta   Update:2019-6-13*


​	在上面的效果图中，同时还使用到了动画多层混合。LayaAir3D使用“动画层”来管理身体不同部分的复杂状态机。比如：你可以使用下半身（动画）层来管理走动/跑动；使用上半身(动画)层来控制投掷/设计动作。

We can demo here.（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)) Replace some operations to see the effect.


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


![] (img/1.gif) <br> (Fig. 1)

The animation multi-layer mixes more effect, or hope that the developer can go to the actual operation example to switch a few actions to feel for himself.
