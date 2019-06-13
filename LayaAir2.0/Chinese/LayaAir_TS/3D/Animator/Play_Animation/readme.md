# 播放动画

###### *version :2.1.0beta   Update:2019-6-13*

#### 获取动画组件

导出后的资源拷贝到项目 `bin/res` 目录下，通过代码加载角色资源。如果直接加载到场景上你会发现动画会自动播放。我们要怎么控制动画的播放呢？

LayaAir 3D引擎的Sprite3D类提供了 `getComponent()` 方法来获取模型上的组件。带动画的模型在加载创建时引擎默认赋予了Animator动画组件，因此我们可以获取它，参考以下代码。

```typescript
//获取角色动画组件
var ani= role3D.getChildAt(0).getComponent(Laya.Animator);
```

打开.lh文件查看，动画组件绑定在模型的子对象上，因此使用了 `getChildAt(0)`，通过它获取子对象模型。然后通过 `getComponent(Laya.Animator)` 方法获取动画组件。

**Tips：有时候在.lh或.ls文件中，存在着多个父子层级关系，动画组件不可能都在第一层级上，可能是第二层，可能是第三层。因此在获取动画组件之前，可以打开.ls或.lh查看有动画组件模型的层级关系，然后通过getChildAt()、或getChildByName()等方法获取模型后，再获取动画组件。否则程序会报错！！**

#### 播放控制

拿到了动画组件后，怎么只播放其中一个动作呢？有两种方法实现对动作的控制与切换。

而且这个例子中，在unity中并未对动画进行拆分，我们使用了模型的默认动画 **Take 001**，插件只导出了一个.lani格式的动画解析文件。

因此控制播放其中某段动画，需要在代码中增加自定义动画剪辑，在动画剪辑中设置开始与结束帧率方式实现。

查看Animator动画组件中` play() `方法，具体方法参数如下：

![](img/1.png)<br>(图1)

如需播放动画的某一帧到某一帧，可在原有动画的基础上创建增加动画状态（片断）`AnimatorState` ，最新Animator类提供了 `addState() `实例方法，可以允许开发者创建动画剪辑并定义名称，然后通过play(动画剪辑名称)方法播放。知道这些后，我们来播放动画。代码如下：

**动画是否循环可以在unity编辑器动画属性中进行勾选设置，导出后引擎将遵循其设置进行动画播放。见图5、6中loop Time选择框！或者创建AnimatorState动画状态设置 isliooping属性为true**

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

编译运行后效果如下，只循环播放了10-20帧的stand站立动画剪辑。

![](img/2.gif)<br>(图2)

#### Unity中定义动画剪辑播放

unity中可以对动画进行分段，并对剪辑的片段取名。 导出的资源在控制时，可通过名称进行动画切换，方便开发者们使用。（这种方式在资源导出时增加了动画解析文件，以致增加Http访问次数，使用哪种方式开发者们可根据实际情况自行选择）

unity中动画片段分段方法如下：

1)、在“资源管理器”中选择模型文件，在右侧 **inspector** 界面中选择 **Animations**，出现了默认的动画 **Take 001**，可点击编辑自定义名称，点击加号增加动画片段，及修改片段的起始与结束帧（图3）。

Tips：如需在游戏中动画循环播放，请勾选下图中 **Loop Time** 选项。

![](img/3.png)<br>(图3)

在本示例中一共4个动作，根据美术提供的动画帧数，修改增加成4个动画片段（图4）。

![](img/4.png)<br>(图4)

修改完成后在资源管理器模型中也会增加相应的动画文件，因此还需修改动画控制器，将新生成的动画片段加入动画控制器中，否则无法导出完整的动画资源解析文件（图5）。

![](img/5.png)<br>(图5)

完成上列步骤后，重新导出，导出的资源里也生成了4个.lani动画解析文件。

修改示例代码，运用播放动画名方式，效果如（图6）。

```typescript
onComplete(){
//.................
		var monkey = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh") as Laya.Sprite3D;
        //加载到场景
       	scene.addChild(monkey);
        //让摄影机指向角色
        camera.transform.lookAt(monkey.transform.position,new Laya.Vector3(0,1,0));
    	//获取动画组件
    	var ani = monkey.getComponent(Laya.Animator) as Laya.Animator;
		//播放攻击状态
        ani.play("attack");
		//等待动画播放完成
        Laya.timer.frameLoop(1,this,function(){
            //如果当前播放state已经播放完了一次
            if(ani.getCurrentAnimatorPlayState().normalizedTime >= 1){
                //回到站立状态
                ani.play("stand");
            } 
        });
}

```

![](img/6.gif)<br>(图6)
