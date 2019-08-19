# 动画过渡融合

###### *version :2.1.0beta   Update:2019-6-13*

动画过度融合是用于在给定的时间内从一个动画状态平滑过渡到另一个动画状态。如果一个动作跳转到另一个完全不同的动作耗时很短，那么过渡通常的表现令人满意。下面我们的例子演示效果就是将跑步动作与瞄准动作混合起来。

在使用动画过渡融合时，播放动画需要使用 `crossFade` 接口播放。

![](img/1.png)<br>(图1)

演示效果源自于官方示例（[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)）。

```typescript
//正常的动画播放
this.animator.play(this.motions[this.motionIndex], 0);

//在当前动画状态和目标动画状态之间进行融合过渡播放
//第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
```

下面的效果图中，图2使用了动画过渡融合，图3没有使用。可以比较明显的感受到没有使用动画过度的图3，在切换动作时的僵硬感。

![](img/2.gif)(图2)         ![](img/3.gif)(图3)

