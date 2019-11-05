#애니메이션 상태

###### *version :2.1.0beta   Update:2019-6-13*

앞**애니메이션**이 중 우리는 애니메이션 애니메이션 상태를 간단하게 사용했다.그는 애니메이션이 어떤 프레임에 이르기까지 한 프레임을 지정할 수 있으며, 기존 애니메이션의 기초에 애니메이션 편집 (편단) 을 생성할 수 있다.이 작은 절에 우리는 애니메이션 상태를 상세히 설명한다.

[] (img/1.png)<br>(1)

API 를 보고 전에 코드를 다시 살펴보면 더 이해가 됩니다.애니메이션 상태는 스크립트를 추가할 수 있습니다. 이것은 뒷부분의 단독 소개입니다.


```typescript

//获取精灵
var monkey:Sprite3D = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
scene.addChild(monkey);
//获取角色动画组件
var ani:Animator = monkey.getChildAt(0).getComponent(Animator);
//创建一个动画动作状态
var state1:AnimatorState = new AnimatorState();
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
ani.addState(state1);
//播放动画
ani.play("hello");
```


