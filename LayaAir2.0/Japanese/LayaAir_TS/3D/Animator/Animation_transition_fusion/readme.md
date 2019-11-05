# 动画过渡融合

###### *version :2.1.0beta   Update:2019-6-13*

アニメーションの過度の融合は、与えられた時間内にアニメーション状態から他のアニメーション状態に滑らかに移行するために使用されます。一つの動作が他の動作にジャンプすると時間がかかりますが、遷移の通常の表現は満足できます。次の例では、ランニング動作と照準動作を混ぜてデモンストレーションします。

アニメーションの融合を使う時、アニメーションを放送して使う必要があります。`crossFade`インターフェース再生

！[](img/1.png)<br/>(図1)

プレゼンテーションの効果は、公式の例に由来します。[demo地址](https://layaair.ldc.layabox.com/demo2/?language=ch&category=3d&group=Animation3D&name=AnimationLayerBlend)を選択します。


```typescript

//正常的动画播放
this.animator.play(this.motions[this.motionIndex], 0);

//在当前动画状态和目标动画状态之间进行融合过渡播放
//第三个参数为layerIndex 层索引，没有使用混合模式，仅仅是使用0层的动画
this.animator.crossFade(this.motions[this.motionIndex], 0.2, 0);
```


以下の効果図では、図2はアニメーション遷移融合を使用しており、図3は使用されていない。動画を使いすぎていない図3は、動作を切り替える際の硬直感がより鮮明に感じられます。

！[](img/2.gif)(図2)！[img/3 gif)(図3)

