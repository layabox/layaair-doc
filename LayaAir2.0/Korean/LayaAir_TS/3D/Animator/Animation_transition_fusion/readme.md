# 动画过渡融合

###### *version :2.1.0beta   Update:2019-6-13*

애니메이션 과도한 융합은 주어진 시간 내에 애니메이션 상태에서 다른 애니메이션 상태로 이동하는 것이다.한 동작이 다른 다른 다른 동작으로 전개된다면 시간이 짧다면, 통상적인 표현이 만족스럽다.다음 우리의 예시 효과는 달리기 동작과 조준동작을 혼합하는 것이다.

애니메이션 과도 융합 시 애니메이션 재생`crossFade`인터페이스 재생.

[] (img/1.png)<br>(1)

시연 효과는 공식 예례에서 비롯된다[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)무엇


```typescript

//正常的动画播放
this.animator.play(this.motions[this.motionIndex], 0);

//在当前动画状态和目标动画状态之间进行融合过渡播放
//第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
```


아래의 효과도 중 2는 애니메이션 과도 융합, 그림 3은 사용하지 않았다.애니메이션 과도한 그림을 사용하지 않은 그림 3, 동작을 전환할 때 경직감을 뚜렷하게 느낄 수 있다.

[] (img/2.gif)(도 2)![] (img/3.gif)(도 3)

