#Transitional Fusion of Animation

###### *version :2.1.0beta   Update:2019-6-13*


动画过度融合是用于在给定的时间内从一个动画状态平滑过渡到另一个动画状态。如果一个动作跳转到另一个完全不同的动作耗时很短，那么过渡通常的表现令人满意。下面我们的例子演示效果就是将跑步动作与瞄准动作混合起来。

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

