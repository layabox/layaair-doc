#アニメーションマルチプレックス

###### *version :2.1.0beta   Update:2019-6-13*

上の効果図では、同時に複数のアニメーションミックスを使用しています。LayaAir 3 Dは「アニメ層」を使って、体の異なる部分を管理する複雑な状態機です。例えば、下半身（動画）層を使って移動・ランニングを管理したり、上半身（動画）層を使って投擲・設計動作を制御したりします。

私たちはこれでデモができます。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)をクリックします。


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


！[](img/1.gif)<br/>(図1)

複数のアニメーションの効果をミックスするか、それとも開発者自身が実際の操作例に行っていくつかの動作を切り替えて自分で感じてほしいです。
