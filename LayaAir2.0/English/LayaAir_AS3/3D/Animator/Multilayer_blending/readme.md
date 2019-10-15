# 动画多层混合

###### *version :2.1.0beta   Update:2019-6-13*

Multilayer animation mixing is also used in the above rendering. LayaAir3D uses the "animation layer" to manage complex state machines in different parts of the body. For example, you can use the lower body (animation) layer to manage walking / running, and the upper body (animation) layer to control throwing / design actions.

We can demo here.（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)) Replace some operations to see the effect.


```typescript

//在混合模式的按钮监听事件中改变播放层
blendType++;

//在切换动作的按钮监听事件中播放动作
switch (blendType) {
    case 0: 
        if (motionCross) {
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引使用混合模式，混合了0层和1层的动画
            animator.crossFade(motions[motionIndex], 0.2, 0);
            animator.crossFade(motions[motionIndex], 0.2, 1);
        } else {
            //使用普通模式播放
            animator.play(motions[motionIndex], 0);
            animator.play(motions[motionIndex], 1);
        }
        break;
    case 1: 
        if (motionCross)
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
            animator.crossFade(motions[motionIndex], 0.2, 0);
        else
            animator.play(motions[motionIndex], 0);
        break;
    case 2: 
        if (motionCross)
            //在当前动画状态和目标动画状态之间进行融合过渡播放
            //第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用1层的动画
            animator.crossFade(motions[motionIndex], 0.2, 1);
        else
            animator.play(motions[motionIndex], 1);
        break;
}
```


![] (img/1.gif) <br> (Fig. 1)

The animation multi-layer mixes more effect, or hope that the developer can go to the actual operation example to switch a few actions to feel for himself.
