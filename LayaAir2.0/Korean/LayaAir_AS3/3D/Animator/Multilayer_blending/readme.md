#애니메이션 다층 혼합

###### *version :2.1.0beta   Update:2019-6-13*

위 효과도에 애니메이션 다층 혼합도 사용했다.Layaiair3D는 ‘애니메이션’을 사용하여 신체 다른 부분의 복잡한 상태기를 관리한다.예를 들어: 하체(애니메이션)층을 사용하여 이동/달리기를 관리할 수 있다. 상반신(애니메이션)층을 사용하여 투척/설계 동작을 제어할 수 있다.

저희가 이 데모에서...[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)동작을 바꾸어 효과를 보다.


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


[] (img/1.gif)<br>(1)

애니메이션 다층이 섞여 더 많은 효과를 볼 수 있도록 개발자는 자신이 실제 조작 사례를 몇 가지 바꾸어 직접 체험할 수 있기를 바란다.
