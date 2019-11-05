# 动画过渡融合

###### *version :2.1.0beta   Update:2019-6-13*

Animation over-fusion is used to smooth transition from one animation state to another animation state in a given time. If it takes a short time for one action to jump to another completely different action, the transition usually performs satisfactorily. The following example demonstrates the effect of mixing running and aiming.

When using animation transition fusion, playing animation needs to use`crossFade`Interface playback.

![] (img/1.png)<br> (Figure 1)

Demonstration results are derived from official examples（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend))


```typescript

//正常的动画播放
this.animator.play(this.motions[this.motionIndex], 0);

//在当前动画状态和目标动画状态之间进行融合过渡播放
//第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
```


In the following rendering, Figure 2 uses animation transition fusion, while Figure 3 does not. Figure 3, which does not use excessive animation, shows the stiffness when switching actions.

![] (img/2.gif) (Figure 2)![] (img/3.gif) (Figure 3)

