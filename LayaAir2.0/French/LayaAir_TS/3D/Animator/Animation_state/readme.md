# 动画状态

###### *version :2.1.0beta   Update:2019-6-13*

Devant**Animation**Dans cette section, nous utilisons simplement l 'état animé d' animatorstate.Il peut spécifier la lecture d 'une trame d' animation sur une trame et créer un montage d 'animation supplémentaire (fragment) sur la base de l' animation originale.Ce sous - chapitre nous donne des détails sur l 'état de l' animation.

[] (IMG / 1.png) <br > (Figure 1)

On comprend mieux quand on regarde l 'API.L 'état de l' animation peut également ajouter un script, qui sera présenté séparément dans la section suivante.


```typescript

//获取精灵
var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Laya.Sprite3D;

this.scene.addChild(monkey);
//获取角色动画组件
var ani = monkey.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;
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


