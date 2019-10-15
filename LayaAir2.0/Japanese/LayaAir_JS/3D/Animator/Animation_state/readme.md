#アニメーション状態

###### *version :2.1.0beta   Update:2019-6-13*

前の方にあります**アニメーションを再生**このセクションでは、アニメーション状態を簡単に使いました。彼はアニメーションを指定してあるフレームを再生してあるフレームに行くことができて、元のアニメーションの基礎の上で増加するアニメーションのクリップを作成することができます。このエピソードはアニメの状態を詳しく説明します。

！[](img/1.png)<br/>(図1)

APIを見てからまた以前のコードを調べたらもっと分かります。アニメーションの状態はシナリオを追加することもできます。これは後のセクションで単独で紹介します。


```typescript

//获取精灵
var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
this.scene.addChild(monkey);
//获取角色动画组件
var ani = monkey.getChildAt(0).getComponent(Laya.Animator);
//创建一个动画动作状态
var state1 = new Laya.AnimatorState();
//设置动作状态的名称
state1.name = "hello";
//设置动作状态播放的起始时间（起始时间与结束时间的设置为0-1的百分比数值）  要截取的时间点 / 动画的总时长
state1.clipStart = 10/40;
//设置动作状态播放的结束时间
state1.clipEnd = 20/40;
//得到默认动画赋值给Clip（getDefaultState默认动画为Unity中animation的数组顺序0下标的动画）
state1.clip = ani.getDefaultState().clip;
//动画播放是否循环
state1.clip.islooping = true;
//添加动画状态到动画组件里
this.ani.addState(state1);
//播放动画
this.ani.play("hello");
```


